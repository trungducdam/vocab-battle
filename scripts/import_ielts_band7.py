"""Convert the verified 26-topic C1/C2 DOCX into website seed data."""

from __future__ import annotations

import argparse
import json
import re
import unicodedata
from pathlib import Path

from docx import Document
from docx.document import Document as DocumentObject
from docx.oxml.table import CT_Tbl
from docx.oxml.text.paragraph import CT_P
from docx.table import Table
from docx.text.paragraph import Paragraph


TOPIC_ICONS = [
    "bi-mortarboard-fill",
    "bi-tree-fill",
    "bi-cpu-fill",
    "bi-heart-pulse-fill",
    "bi-briefcase-fill",
    "bi-graph-up-arrow",
    "bi-shield-check",
    "bi-bank2",
    "bi-buildings-fill",
    "bi-bus-front-fill",
    "bi-megaphone-fill",
    "bi-palette-fill",
    "bi-globe2",
    "bi-flask-fill",
    "bi-basket2-fill",
    "bi-airplane-fill",
    "bi-people-fill",
    "bi-universal-access-circle",
    "bi-brush-fill",
    "bi-trophy-fill",
    "bi-chat-dots-fill",
    "bi-person-walking",
    "bi-lightning-charge-fill",
    "bi-feather",
    "bi-rocket-takeoff-fill",
    "bi-water",
]


def iter_blocks(document: DocumentObject):
    for child in document.element.body.iterchildren():
        if isinstance(child, CT_P):
            yield Paragraph(child, document)
        elif isinstance(child, CT_Tbl):
            yield Table(child, document)


def clean(value: str) -> str:
    return " ".join(value.split())


def slugify(value: str) -> str:
    normalized = unicodedata.normalize("NFKD", value)
    ascii_value = normalized.encode("ascii", "ignore").decode("ascii")
    return re.sub(r"[^a-z0-9]+", "-", ascii_value.lower()).strip("-")


def extract_topic_data(source: Path):
    document = Document(source)
    topic = None
    topics = []
    records = []

    for block in iter_blocks(document):
        if isinstance(block, Paragraph):
            text = clean(block.text)
            topic_match = re.match(r"^(\d+)\.\s+(.+)$", text)
            if block.style.name == "Heading 1" and topic_match:
                topic = {
                    "number": int(topic_match.group(1)),
                    "name": topic_match.group(2),
                }
                topics.append(topic)
            elif text.startswith("Phần II."):
                topic = None
            continue

        if not topic or len(block.columns) != 4:
            continue

        topic_key = slugify(topic["name"])
        header = [clean(cell.text) for cell in block.rows[0].cells[:4]]
        if header != ["STT", "Từ / cụm từ", "Mức", "Nghĩa tiếng Việt"]:
            raise ValueError(f"Unexpected table header for {topic['name']}: {header}")

        for position, row in enumerate(block.rows[1:], start=1):
            number, word, source_level, meaning = [clean(cell.text) for cell in row.cells[:4]]
            if number != str(position):
                raise ValueError(
                    f"Unexpected item number in {topic['name']}: expected {position}, found {number!r}"
                )
            if not word or not meaning:
                raise ValueError(f"Blank word or meaning in {topic['name']} row {position}")
            if source_level not in {"C1", "C2", "C1/C2"}:
                raise ValueError(
                    f"Unsupported CEFR label in {topic['name']} row {position}: {source_level!r}"
                )

            # Hybrid C1/C2 entries are included in C1 practice while the exact
            # source label remains available in sourceLevel.
            level = "C1" if source_level == "C1/C2" else source_level
            is_phrase = position >= 37
            records.append(
                {
                    "id": f"ielts-verified-{topic_key}-{position:02d}",
                    "sourceKey": f"ielts-verified:{topic_key}:{position:02d}",
                    "word": word,
                    "meaning": meaning,
                    "level": level,
                    "sourceLevel": source_level,
                    "partOfSpeech": "phrase" if is_phrase else "word",
                    "category": "Cụm từ học thuật" if is_phrase else "Từ vựng IELTS",
                    "topic": topic["name"],
                    "topicKey": topic_key,
                    "source": "IELTS C1-C2 26 Topics (Verified)",
                    "seedVersion": 6,
                }
            )

    if len(topics) != 26:
        raise ValueError(f"Expected 26 topics, found {len(topics)}")
    if len(records) != 1040:
        raise ValueError(f"Expected 1040 topic records, found {len(records)}")

    counts = {item["name"]: 0 for item in topics}
    for record in records:
        counts[record["topic"]] += 1
    invalid = {name: count for name, count in counts.items() if count != 40}
    if invalid:
        raise ValueError(f"Every topic must contain 40 records: {invalid}")

    for item in topics:
        topic_words = [
            record["word"].casefold()
            for record in records
            if record["topic"] == item["name"]
        ]
        duplicates = sorted({word for word in topic_words if topic_words.count(word) > 1})
        if duplicates:
            raise ValueError(f"Duplicate words in {item['name']}: {duplicates}")

    topic_data = [
        {
            "number": item["number"],
            "key": slugify(item["name"]),
            "name": item["name"],
            "icon": TOPIC_ICONS[index],
            "count": counts[item["name"]],
        }
        for index, item in enumerate(topics)
    ]
    return topic_data, records


def write_javascript(output: Path, topics, records) -> None:
    topic_json = json.dumps(topics, ensure_ascii=False, indent=2)
    record_json = json.dumps(records, ensure_ascii=False, indent=2)
    content = f"""// Generated from IELTS_C1_C2_26_Topics_40_Words_Each_VERIFIED.docx.
// 26 topics x 40 entries = 1,040 verified C1/C2 records.
// Source labels C1/C2 are mapped to C1 for the website filter and retained in sourceLevel.
const replacedCefrLevels = new Set(["C1", "C2", "C1/C2"]);
for (let index = vocabularySeed.length - 1; index >= 0; index -= 1) {{
  if (replacedCefrLevels.has(String(vocabularySeed[index].level || "").toUpperCase())) {{
    vocabularySeed.splice(index, 1);
  }}
}}

const ieltsBand7Topics = {topic_json};

const ieltsBand7Seed = {record_json};

vocabularySeed.push(...ieltsBand7Seed.map(item => ({{ ...item }})));
"""
    output.parent.mkdir(parents=True, exist_ok=True)
    output.write_text(content, encoding="utf-8", newline="\n")


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("source", type=Path)
    parser.add_argument("output", type=Path)
    args = parser.parse_args()
    topics, records = extract_topic_data(args.source)
    write_javascript(args.output, topics, records)
    print(f"Imported {len(records)} entries across {len(topics)} topics into {args.output}")


if __name__ == "__main__":
    main()
