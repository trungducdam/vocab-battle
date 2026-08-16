function getPublicVocabulary() {
  const current = JSON.parse(localStorage.getItem("vb_words_v3") || "null");
  const seedByKey = new Map(vocabularySeed.map(item => [`${item.level}|${item.word}`.toLowerCase(), item]));
  if (Array.isArray(current)) {
    const hydrated = current.map(item => {
      const seed = seedByKey.get(`${item.level}|${item.word}`.toLowerCase());
      return { ...seed, ...item, example: item.example || seed?.example || "" };
    });
    localStorage.setItem("vb_words_v3", JSON.stringify(hydrated));
    return hydrated;
  }

  const legacy = JSON.parse(localStorage.getItem("vb_words_v2") || "null");
  const savedWords = Array.isArray(legacy) ? legacy : vocabularySeed;
  const merged = savedWords.map(item => {
    const seed = seedByKey.get(`${item.level}|${item.word}`.toLowerCase());
    return { ...seed, ...item, example: item.example || seed?.example || "" };
  });
  const existingKeys = new Set(merged.map(item => `${item.level}|${item.word}`.toLowerCase()));
  vocabularySeed.forEach(item => {
    const key = `${item.level}|${item.word}`.toLowerCase();
    if (!existingKeys.has(key)) merged.push({ ...item });
  });
  localStorage.setItem("vb_words_v3", JSON.stringify(merged));
  return merged;
}

function savePublicVocabulary(words) {
  localStorage.setItem("vb_words_v3", JSON.stringify(words));
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
