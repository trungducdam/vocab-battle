const BATTLE_MODES = {
  10: { questionCount: 10, maxHp: 100, damage: 8, pointsPerCorrect: 100, label: "Trận nhanh" },
  50: { questionCount: 50, maxHp: 300, damage: 5, pointsPerCorrect: 20, label: "Tiêu chuẩn" },
  100: { questionCount: 100, maxHp: 500, damage: 4, pointsPerCorrect: 10, label: "Thử thách" }
};

const BOT_DIFFICULTIES = {
  easy: { key: "easy", label: "Easy", accuracy: 0.55, minDelay: 5200, maxDelay: 8200, damageMultiplier: 0.7 },
  normal: { key: "normal", label: "Normal", accuracy: 0.72, minDelay: 3200, maxDelay: 6800, damageMultiplier: 1 },
  hard: { key: "hard", label: "Hard", accuracy: 0.88, minDelay: 1400, maxDelay: 4300, damageMultiplier: 1.25 }
};

function getBattleSettings() {
  let saved = null;
  try {
    saved = JSON.parse(sessionStorage.getItem("vb_battle_settings") || "null");
  } catch {
    sessionStorage.removeItem("vb_battle_settings");
  }
  const mode = BATTLE_MODES[saved?.questionCount] || BATTLE_MODES[10];
  const difficulty = BOT_DIFFICULTIES[saved?.difficulty] || BOT_DIFFICULTIES.normal;
  return { ...mode, type: saved?.type || "private", bankType: saved?.bankType || "public", difficulty: difficulty.key };
}

function saveBattleSettings(questionCount, type = "private", bankType = "public", difficulty = "normal") {
  const bot = BOT_DIFFICULTIES[difficulty] || BOT_DIFFICULTIES.normal;
  const settings = { ...(BATTLE_MODES[questionCount] || BATTLE_MODES[10]), type, bankType, difficulty: bot.key };
  sessionStorage.setItem("vb_battle_settings", JSON.stringify(settings));
  sessionStorage.removeItem("vb_match_questions");
  return settings;
}

function battleModeSummary(mode) {
  const bot = BOT_DIFFICULTIES[mode.difficulty] || BOT_DIFFICULTIES.normal;
  return `<span>❤️ ${mode.maxHp} HP</span><span>⚔️ ${mode.damage} sát thương</span><span>⭐ ${mode.pointsPerCorrect} điểm/câu</span><span>🤖 ${bot.label}</span>`;
}
