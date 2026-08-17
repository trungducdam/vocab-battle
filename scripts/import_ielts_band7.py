"""Convert the 26 topic tables in the IELTS Band 7 DOCX into website seed data."""

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


def category_from_code(code: str) -> str:
    normalized = code.lower().replace(" ", "")
    if normalized == "n.":
        return "Danh từ"
    if normalized == "v.":
        return "Động từ"
    if normalized == "adj.":
        return "Tính từ"
    if normalized == "adv.":
        return "Trạng từ"
    if normalized in {"v./n.", "n./v."}:
        return "Danh từ / Động từ"
    return "Cụm từ"


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
        for position, row in enumerate(block.rows[1:], start=1):
            word, part_of_speech, meaning, collocation = [clean(cell.text) for cell in row.cells[:4]]
            if not word:
                continue
            records.append(
                {
                    "id": f"ielts-band7-{topic_key}-{position:02d}",
                    "sourceKey": f"ielts-band7:{topic_key}:{position:02d}",
                    "word": word,
                    "meaning": meaning,
                    "level": "C1",
                    "partOfSpeech": part_of_speech,
                    "category": category_from_code(part_of_speech),
                    "collocation": collocation,
                    "topic": topic["name"],
                    "topicKey": topic_key,
                    "source": "IELTS Vocabulary Band 7.0+",
                }
            )

    if len(topics) != 26:
        raise ValueError(f"Expected 26 topics, found {len(topics)}")
    if len(records) != 312:
        raise ValueError(f"Expected 312 topic records, found {len(records)}")

    counts = {item["name"]: 0 for item in topics}
    for record in records:
        counts[record["topic"]] += 1
    invalid = {name: count for name, count in counts.items() if count != 12}
    if invalid:
        raise ValueError(f"Every topic must contain 12 records: {invalid}")

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
    content = f"""// Generated from IELTS_Vocabulary_Band_7_Trungdz.docx.
// 26 topics x 12 entries = 312 C1 records. Topic duplicates are intentionally preserved.
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
