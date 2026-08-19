document.addEventListener("DOMContentLoaded", () => {
  const createButton = document.querySelector("#createRoom");
  const joinForm = document.querySelector("#joinRoomForm");
  const codeInput = document.querySelector("#roomCode");
  const roomPanel = document.querySelector("#roomPanel");
  const emptyPanel = document.querySelector("#emptyRoomPanel");
  const modeInputs = [...document.querySelectorAll('input[name="roomMode"]')];
  const bankInputs = [...document.querySelectorAll('input[name="roomBank"]')];
  const difficultyInputs = [...document.querySelectorAll('input[name="roomDifficulty"]')];
  const modeSummary = document.querySelector("#roomModeSummary");
  const personalWords = getPersonalVocabulary();

  const savedSettings = getBattleSettings();
  const activeInput = modeInputs.find(input => Number(input.value) === savedSettings.questionCount) || modeInputs[0];
  activeInput.checked = true;
  const activeBankInput = bankInputs.find(input => input.value === savedSettings.bankType) || bankInputs[0];
  activeBankInput.checked = true;
  const activeDifficultyInput = difficultyInputs.find(input => input.value === savedSettings.difficulty) || difficultyInputs.find(input => input.value === "normal") || difficultyInputs[0];
  activeDifficultyInput.checked = true;
  document.querySelector("#roomPersonalCount").textContent = personalWords.length ? `${personalWords.length} từ của bạn` : "Chưa có bộ từ";
  document.querySelector("#roomBankPersonal").disabled = personalWords.length < 4;

  function syncMode() {
    const count = Number(modeInputs.find(input => input.checked)?.value || 10);
    const bankType = bankInputs.find(input => input.checked)?.value || "public";
    const difficulty = difficultyInputs.find(input => input.checked)?.value || "normal";
    if (bankType === "personal" && personalWords.length < count) {
      VB.toast(`Kho riêng cần ít nhất ${count} từ cho chế độ đã chọn.`, "warning");
      return null;
    }
    const settings = saveBattleSettings(count, "private", bankType, difficulty);
    modeSummary.innerHTML = `${battleModeSummary(settings)}<span>📚 ${bankType === "personal" ? "Kho riêng" : "Kho chung"}</span>`;
    return settings;
  }

  modeInputs.forEach(input => input.addEventListener("change", syncMode));
  bankInputs.forEach(input => input.addEventListener("change", syncMode));
  difficultyInputs.forEach(input => input.addEventListener("change", syncMode));
  modeSummary.innerHTML = `${battleModeSummary(savedSettings)}<span>📚 ${savedSettings.bankType === "personal" ? "Kho riêng" : "Kho chung"}</span>`;

  function openRoom(code, isHost) {
    if (!VB.requireLogin()) return;
    if (!syncMode()) return;
    emptyPanel.classList.add("d-none");
    roomPanel.classList.remove("d-none");
    roomPanel.querySelector("[data-room-code]").textContent = code;
    roomPanel.querySelector("#hostActions").classList.toggle("d-none", !isHost);
    roomPanel.scrollIntoView({ behavior: "smooth", block: "center" });
    VB.toast(isHost ? "Đã tạo phòng mới" : `Đã tham gia phòng ${code}`, "success");
  }

  createButton?.addEventListener("click", () => {
    const code = Math.random().toString(36).slice(2, 8).toUpperCase();
    openRoom(code, true);
  });

  joinForm?.addEventListener("submit", (event) => {
    event.preventDefault();
    const code = codeInput.value.trim().toUpperCase();
    if (!/^[A-Z0-9]{6}$/.test(code)) {
      codeInput.classList.add("is-invalid");
      return;
    }
    openRoom(code, false);
  });

  codeInput?.addEventListener("input", () => {
    codeInput.value = codeInput.value.toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 6);
    codeInput.classList.remove("is-invalid");
  });

  document.querySelector("#copyCode")?.addEventListener("click", async () => {
    const code = roomPanel.querySelector("[data-room-code]").textContent;
    try { await navigator.clipboard.writeText(code); } catch (_) { /* fallback is unnecessary in the demo */ }
    VB.toast("Đã sao chép mã phòng");
  });

  document.querySelector("#startBattle")?.addEventListener("click", () => {
    VB.navigate("battle.html", "Đang vào trận đấu");
  });
});
