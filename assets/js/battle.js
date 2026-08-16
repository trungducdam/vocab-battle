document.addEventListener("DOMContentLoaded", () => {
  const settings = getBattleSettings();
  let round = 0;
  let seconds = 10;
  let playerHp = settings.maxHp;
  let opponentHp = settings.maxHp;
  let playerScore = 0;
  let correctCount = 0;
  let locked = false;
  let timer;

  const word = document.querySelector("#battleWord");
  const answers = document.querySelector("#answers");
  const timerLabel = document.querySelector("#timerLabel");
  const roundLabel = document.querySelector("#roundLabel");
  const modeLabel = document.querySelector("#battleModeLabel");
  const playerHpBar = document.querySelector("#playerHp");
  const opponentHpBar = document.querySelector("#opponentHp");
  const playerHpValue = document.querySelector("#playerHpValue");
  const opponentHpValue = document.querySelector("#opponentHpValue");
  const playerScoreLabel = document.querySelector("#playerScore");

  function shuffle(items) {
    const result = [...items];
    for (let index = result.length - 1; index > 0; index -= 1) {
      const target = Math.floor(Math.random() * (index + 1));
      [result[index], result[target]] = [result[target], result[index]];
    }
    return result;
  }

  function createSharedQuestions() {
    const selectedBank = getVocabularyForBattle(settings.bankType);
    const sourceWords = selectedBank.length >= settings.questionCount ? selectedBank : getPublicVocabulary();
    if (settings.bankType === "personal" && sourceWords !== selectedBank) {
      VB.toast("Kho riêng không đủ từ, trận đấu đã chuyển sang kho chung.", "warning");
    }
    const selectedWords = shuffle(sourceWords).slice(0, settings.questionCount);
    return selectedWords.map(entry => {
      const sameLevel = sourceWords.filter(item => item.level === entry.level && item.id !== entry.id);
      const distractorPool = sameLevel.length >= 3 ? sameLevel : sourceWords.filter(item => item.id !== entry.id);
      const distractors = shuffle(distractorPool).slice(0, 3);
      const options = shuffle([
        { text: entry.meaning, correct: true },
        ...distractors.map(item => ({ text: item.meaning, correct: false }))
      ]);
      return {
        id: entry.id,
        word: entry.word.toUpperCase(),
        level: entry.level,
        answers: options.map(option => option.text),
        correct: options.findIndex(option => option.correct)
      };
    });
  }

  let questions = JSON.parse(sessionStorage.getItem("vb_match_questions") || "null");
  if (!Array.isArray(questions) || questions.length !== settings.questionCount) {
    questions = createSharedQuestions();
    sessionStorage.setItem("vb_match_questions", JSON.stringify(questions));
  }

  function setHp(element, label, value) {
    const percentage = Math.max(0, Math.min(100, (value / settings.maxHp) * 100));
    element.style.width = `${percentage}%`;
    label.textContent = value;
    element.style.background = percentage <= 30 ? "linear-gradient(90deg,#e11d48,#fb7185)" : "linear-gradient(90deg,#10b981,#34d399)";
  }

  function renderQuestion() {
    if (round >= questions.length || playerHp <= 0 || opponentHp <= 0) return finish();
    locked = false;
    seconds = 10;
    const question = questions[round];
    word.textContent = question.word;
    document.querySelector("#questionLevel").textContent = `CEFR ${question.level}`;
    roundLabel.textContent = `Câu ${round + 1}/${questions.length}`;
    timerLabel.textContent = seconds;
    answers.innerHTML = question.answers.map((answer, index) => `
      <div class="col-md-6">
        <button class="answer-btn" data-answer="${index}">
          <span class="answer-key">${String.fromCharCode(65 + index)}</span>
          <span>${answer}</span>
        </button>
      </div>`).join("");
    clearInterval(timer);
    timer = setInterval(() => {
      seconds -= 1;
      timerLabel.textContent = seconds;
      if (seconds <= 0) resolveAnswer(null);
    }, 1000);
  }

  function resolveAnswer(selected) {
    if (locked) return;
    locked = true;
    clearInterval(timer);
    const question = questions[round];
    const buttons = [...answers.querySelectorAll("button")];
    buttons.forEach(button => {
      button.disabled = true;
      const index = Number(button.dataset.answer);
      if (index === question.correct) button.classList.add("correct");
      if (index === selected && selected !== question.correct) button.classList.add("wrong");
    });

    if (selected === question.correct) {
      correctCount += 1;
      playerScore += settings.pointsPerCorrect;
      opponentHp = Math.max(0, opponentHp - settings.damage);
      setHp(opponentHpBar, opponentHpValue, opponentHp);
      playerScoreLabel.textContent = playerScore.toLocaleString("vi-VN");
      VB.toast(`Chính xác! +${settings.pointsPerCorrect} điểm, đối thủ mất ${settings.damage} HP.`, "success");
    } else {
      playerHp = Math.max(0, playerHp - settings.wrongDamage);
      setHp(playerHpBar, playerHpValue, playerHp);
      VB.toast(selected === null ? `Hết giờ! Bạn mất ${settings.wrongDamage} HP.` : `Chưa đúng! Bạn mất ${settings.wrongDamage} HP.`, "danger");
    }

    round += 1;
    setTimeout(renderQuestion, 1050);
  }

  function finish() {
    clearInterval(timer);
    const won = opponentHp <= 0 || (playerHp > opponentHp && playerScore > 0);
    const draw = playerHp === opponentHp;
    const user = VB.getUser();
    if (user) {
      user.matches = (user.matches || 0) + 1;
      user.wins = (user.wins || 0) + (won && !draw ? 1 : 0);
      user.winRate = Math.round((user.wins / user.matches) * 100);
      user.elo = Math.max(0, (user.elo || 0) + (won && !draw ? 24 : draw ? 0 : -12));
      VB.setUser(user);
    }
    const result = draw ? "Hòa!" : won ? "Chiến thắng!" : "Trận đấu kết thúc";
    document.querySelector("#resultIcon").className = `bi ${won && !draw ? "bi-trophy-fill text-warning" : draw ? "bi-dash-circle text-info" : "bi-shield-x text-danger"} display-2`;
    document.querySelector("#resultTitle").textContent = result;
    document.querySelector("#resultCopy").textContent = `Chế độ ${settings.questionCount} câu: đúng ${correctCount}/${Math.min(round, questions.length)} câu, đạt ${playerScore.toLocaleString("vi-VN")} điểm${won && !draw ? " và nhận +24 Elo" : ""}.`;
    new bootstrap.Modal(document.querySelector("#resultModal"), { backdrop: "static", keyboard: false }).show();
  }

  answers.addEventListener("click", event => {
    const button = event.target.closest("[data-answer]");
    if (button) resolveAnswer(Number(button.dataset.answer));
  });

  document.addEventListener("keydown", event => {
    const index = ["a", "b", "c", "d"].indexOf(event.key.toLowerCase());
    if (index >= 0) resolveAnswer(index);
  });

  modeLabel.textContent = `${settings.type === "public" ? "Public" : "Private"} · ${settings.questionCount} câu · ${settings.maxHp} HP · ${settings.bankType === "personal" ? "Kho riêng" : "Kho chung"}`;
  setHp(playerHpBar, playerHpValue, playerHp);
  setHp(opponentHpBar, opponentHpValue, opponentHp);
  renderQuestion();
});
