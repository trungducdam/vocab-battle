function getPublicVocabulary() {
  const storageKey = "vb_words_v6";
  const wordKey = item => item.sourceKey || `${item.level}|${item.word}`.toLowerCase();
  const current = JSON.parse(localStorage.getItem(storageKey) || "null");
  const seedByKey = new Map(vocabularySeed.map(item => [wordKey(item), item]));
  if (Array.isArray(current)) {
    const hydrated = current.map(item => {
      const seed = seedByKey.get(wordKey(item));
      return {
        ...seed,
        ...item,
        example: item.example || seed?.example || "",
        collocation: item.collocation || seed?.collocation || ""
      };
    });
    localStorage.setItem(storageKey, JSON.stringify(hydrated));
    return hydrated;
  }

  const previousV5 = JSON.parse(localStorage.getItem("vb_words_v5") || "null");
  const previousV4 = JSON.parse(localStorage.getItem("vb_words_v4") || "null");
  const previousV3 = JSON.parse(localStorage.getItem("vb_words_v3") || "null");
  const legacy = JSON.parse(localStorage.getItem("vb_words_v2") || "null");
  const previousWords = [previousV5, previousV4, previousV3, legacy].find(Array.isArray);
  const hasPreviousWords = Array.isArray(previousWords);
  const isReplacedCefrSeed = item => {
    const sourceKey = String(item.sourceKey || "").toLowerCase();
    const source = String(item.source || "").toLowerCase();
    const numericId = Number(item.id);
    const isLegacyC1Seed = !item.sourceKey && Number.isInteger(numericId) && numericId >= 201 && numericId <= 250;
    return Boolean(
      item.topicKey ||
      sourceKey.startsWith("ielts-band7:") ||
      sourceKey.startsWith("ielts-advanced:") ||
      source.includes("ielts") ||
      isLegacyC1Seed
    );
  };
  const savedWords = hasPreviousWords ? previousWords.filter(item => !isReplacedCefrSeed(item)) : [];
  const merged = savedWords.map(item => {
    const seed = seedByKey.get(wordKey(item));
    return {
      ...seed,
      ...item,
      example: item.example || seed?.example || "",
      collocation: item.collocation || seed?.collocation || ""
    };
  });
  const existingKeys = new Set(merged.map(wordKey));
  const seedAdditions = hasPreviousWords
    ? vocabularySeed.filter(item => Number(item.seedVersion || 0) >= 6)
    : vocabularySeed;
  seedAdditions.forEach(item => {
    const key = wordKey(item);
    if (!existingKeys.has(key)) merged.push({ ...item });
  });
  localStorage.setItem(storageKey, JSON.stringify(merged));
  return merged;
}

function savePublicVocabulary(words) {
  localStorage.setItem("vb_words_v6", JSON.stringify(words));
}

function getPublicIdioms() {
  const saved = JSON.parse(localStorage.getItem("vb_idioms_v1") || "null");
  return Array.isArray(saved) ? saved : idiomSeed.map(item => ({ ...item }));
}

function savePublicIdioms(idioms) {
  localStorage.setItem("vb_idioms_v1", JSON.stringify(idioms));
}

function personalVocabularyKey() {
  const user = VB.getUser();
  return user ? `vb_personal_words:${user.email.toLowerCase()}` : null;
}

function getPersonalVocabulary() {
  const key = personalVocabularyKey();
  return key ? JSON.parse(localStorage.getItem(key) || "[]") : [];
}

function savePersonalVocabulary(words) {
  const key = personalVocabularyKey();
  if (!key) return false;
  localStorage.setItem(key, JSON.stringify(words));
  return true;
}

function getVocabularyForBattle(bankType = "public") {
  const personal = bankType === "personal" ? getPersonalVocabulary() : [];
  return personal.length >= 4 ? personal : getPublicVocabulary();
}
