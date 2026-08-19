document.addEventListener("DOMContentLoaded", () => {
  const modeInputs = [...document.querySelectorAll('input[name="homeMode"]')];
  const bankInputs = [...document.querySelectorAll('input[name="homeBank"]')];
  const difficultyInputs = [...document.querySelectorAll('input[name="homeDifficulty"]')];
  const summary = document.querySelector("#modeSummary");
  const personalWords = getPersonalVocabulary();
  const personalBankInput = document.querySelector("#homeBankPersonal");
  const personalCount = document.querySelector("#homePersonalCount");

  personalCount.textContent = personalWords.length ? `${personalWords.length} từ của bạn` : "Chưa có bộ từ";
  personalBankInput.disabled = personalWords.length < 4;

  function selectedMode() {
    return BATTLE_MODES[Number(modeInputs.find(input => input.checked)?.value || 10)];
  }

  function updateSummary() {
    const mode = selectedMode();
    const bankType = bankInputs.find(input => input.checked)?.value || "public";
    const difficulty = difficultyInputs.find(input => input.checked)?.value || "normal";
    summary.innerHTML = `${battleModeSummary({ ...mode, difficulty })}<span>📚 ${bankType === "personal" ? "Kho riêng" : "Kho chung"}</span>`;
  }

  function begin(type) {
    if (!VB.requireLogin()) return;
    const bankType = bankInputs.find(input => input.checked)?.value || "public";
    const difficulty = difficultyInputs.find(input => input.checked)?.value || "normal";
    const mode = selectedMode();
    if (bankType === "personal" && personalWords.length < mode.questionCount) {
      VB.toast(`Kho riêng cần ít nhất ${mode.questionCount} từ cho chế độ này.`, "warning");
      return;
    }
    saveBattleSettings(mode.questionCount, type, bankType, difficulty);
    VB.navigate(type === "public" ? "battle.html" : "room.html", type === "public" ? "Đang tìm đối thủ" : "Đang tạo phòng");
  }

  modeInputs.forEach(input => input.addEventListener("change", updateSummary));
  bankInputs.forEach(input => input.addEventListener("change", updateSummary));
  difficultyInputs.forEach(input => input.addEventListener("change", updateSummary));
  document.querySelector("#publicMatch")?.addEventListener("click", () => begin("public"));
  document.querySelector("#privateMatch")?.addEventListener("click", () => begin("private"));
  updateSummary();
});
