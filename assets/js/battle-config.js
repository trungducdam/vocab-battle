const BATTLE_MODES = {
  10: { questionCount: 10, maxHp: 100, damage: 20, wrongDamage: 10, pointsPerCorrect: 100, label: "Trận nhanh" },
  50: { questionCount: 50, maxHp: 300, damage: 12, wrongDamage: 6, pointsPerCorrect: 20, label: "Tiêu chuẩn" },
  100: { questionCount: 100, maxHp: 500, damage: 10, wrongDamage: 5, pointsPerCorrect: 10, label: "Thử thách" }
};

function getBattleSettings() {
  const saved = JSON.parse(sessionStorage.getItem("vb_battle_settings") || "null");
  const mode = BATTLE_MODES[saved?.questionCount] || BATTLE_MODES[10];
  return { ...mode, type: saved?.type || "private", bankType: saved?.bankType || "public" };
}

function saveBattleSettings(questionCount, type = "private", bankType = "public") {
  const settings = { ...(BATTLE_MODES[questionCount] || BATTLE_MODES[10]), type, bankType };
  sessionStorage.setItem("vb_battle_settings", JSON.stringify(settings));
  sessionStorage.removeItem("vb_match_questions");
  return settings;
}

function battleModeSummary(mode) {
  return `<span>❤️ ${mode.maxHp} HP</span><span>⚔️ ${mode.damage} sát thương</span><span>⭐ ${mode.pointsPerCorrect} điểm/câu</span>`;
}
