document.addEventListener("DOMContentLoaded", () => {
  const settings = getBattleSettings();
  const botDifficulty = BOT_DIFFICULTIES[settings.difficulty] || BOT_DIFFICULTIES.normal;
  const publicVocabulary = getPublicVocabulary();
  let round = 0;
  let seconds = 10;
  let playerHp = settings.maxHp;
  let opponentHp = settings.maxHp;
  let playerScore = 0;
  let botScore = 0;
  let correctCount = 0;
  let botCorrectCount = 0;
  let currentStreak = 0;
  let bestStreak = 0;
  let playerAnswered = false;
  let botAnswered = false;
  let transitionQueued = false;
  let timer;
  let botTimer;
  let streakFxTimer;

  const word = document.querySelector("#battleWord");
  const answers = document.querySelector("#answers");
  const questionCard = document.querySelector(".battle-question-card");
  const timerLabel = document.querySelector("#timerLabel");
  const roundLabel = document.querySelector("#roundLabel");
  const modeLabel = document.querySelector("#battleModeLabel");
  const playerHpBar = document.querySelector("#playerHp");
  const opponentHpBar = document.querySelector("#opponentHp");
  const playerHpValue = document.querySelector("#playerHpValue");
  const opponentHpValue = document.querySelector("#opponentHpValue");
  const playerScoreLabel = document.querySelector("#playerScore");
  const playerStreakLabel = document.querySelector("#playerStreak");
  const playerStreakBadge = document.querySelector("#playerStreakBadge");
  const streakFx = document.querySelector("#battleStreakFx");
  const botCard = document.querySelector("#botPlayerCard");
  const botStatus = document.querySelector("#botStatus");
  const botDifficultyBadge = document.querySelector("#botDifficultyBadge");
  const botAnswerChips = [...document.querySelectorAll("[data-bot-answer]")];

  function escapeHtml(value) {
    return String(value).replace(/[&<>'"]/g, character => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      "'": "&#39;",
      '"': "&quot;"
    })[character]);
  }

  function normalize(value) {
    return String(value || "").normalize("NFKC").trim().toLowerCase();
  }

  function shuffle(items) {
    const result = [...items];
    for (let index = result.length - 1; index > 0; index -= 1) {
      const target = Math.floor(Math.random() * (index + 1));
      [result[index], result[target]] = [result[target], result[index]];
    }
    return result;
  }

  function uniqueEntries(items) {
    const seen = new Set();
    return items.filter(item => {
      const key = `${normalize(item.word)}|${normalize(item.meaning)}`;
      if (!normalize(item.word) || !normalize(item.meaning) || seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  }

  function uniqueDistractors(entry, sourceWords) {
    const selected = [];
    const usedMeanings = new Set([normalize(entry.meaning)]);
    const candidates = uniqueEntries([...sourceWords, ...publicVocabulary]).filter(item => item.id !== entry.id);
    const priorities = [
      candidate => candidate.level === entry.level && candidate.category === entry.category,
      candidate => candidate.level === entry.level,
      () => true
    ];

    for (const predicate of priorities) {
      for (const candidate of shuffle(candidates.filter(predicate))) {
        const meaning = normalize(candidate.meaning);
        if (!meaning || usedMeanings.has(meaning) || normalize(candidate.word) === normalize(entry.word)) continue;
        usedMeanings.add(meaning);
        selected.push(candidate.meaning);
        if (selected.length === 3) return selected;
      }
    }
    return selected;
  }

  function createSharedQuestions() {
    const selectedBank = settings.bankType === "personal" ? getPersonalVocabulary() : publicVocabulary;
    const uniqueSelectedBank = uniqueEntries(shuffle(selectedBank));
    const sourceWords = uniqueSelectedBank.length >= settings.questionCount
      ? uniqueSelectedBank
      : uniqueEntries(shuffle(publicVocabulary));
    if (settings.bankType === "personal" && sourceWords !== uniqueSelectedBank) {
      VB.toast("Kho riêng không đủ từ duy nhất, trận đấu đã chuyển sang kho chung.", "warning");
    }
    const selectedWords = sourceWords.slice(0, settings.questionCount);
    return selectedWords.map(entry => {
      const distractors = uniqueDistractors(entry, sourceWords);
      const options = shuffle([
        { text: entry.meaning, correct: true },
        ...distractors.map(text => ({ text, correct: false }))
      ]);
      return {
        id: entry.id,
        word: String(entry.word || "").trim(),
        level: entry.level,
        answers: options.map(option => option.text),
        correct: options.findIndex(option => option.correct)
      };
    });
  }

  function hasValidQuestions(items) {
    return Array.isArray(items)
      && items.length === settings.questionCount
      && items.every(question => Array.isArray(question.answers)
        && question.answers.length === 4
        && new Set(question.answers.map(normalize)).size === 4
        && question.correct >= 0
        && question.correct < 4);
  }

  let questions;
  try {
    questions = JSON.parse(sessionStorage.getItem("vb_match_questions") || "null");
  } catch {
    questions = null;
  }
  if (!hasValidQuestions(questions)) {
    questions = createSharedQuestions();
    sessionStorage.setItem("vb_match_questions", JSON.stringify(questions));
  }

  function setHp(element, label, value) {
    const percentage = Math.max(0, Math.min(100, (value / settings.maxHp) * 100));
    element.style.width = `${percentage}%`;
    label.textContent = value;
    element.style.background = percentage <= 30
      ? "linear-gradient(90deg,#e11d48,#fb7185)"
      : "linear-gradient(90deg,#10b981,#34d399)";
  }

  function showStreakEffect(streak, brokenStreak = 0) {
    clearTimeout(streakFxTimer);
    const isBroken = brokenStreak >= 2;
    if (!isBroken && streak < 2) {
      streakFx.replaceChildren();
      streakFx.className = "battle-streak-fx";
      return;
    }

    const tier = isBroken ? "is-broken" : streak >= 7 ? "is-legendary" : streak >= 5 ? "is-electric" : "is-hot";
    const message = isBroken
      ? "Chuỗi đã bị ngắt"
      : streak >= 7
        ? "KHÔNG THỂ CẢN!"
        : streak >= 5
          ? "BÙNG NỔ!"
          : streak >= 3
            ? "QUÁ CHÁY!"
            : "TIẾP TỤC NÀO!";
    const displayedStreak = isBroken ? brokenStreak : streak;

    streakFx.className = `battle-streak-fx ${tier}`;
    streakFx.innerHTML = `
      <div class="battle-streak-burst">
        <i class="bi ${isBroken ? "bi-lightning-charge-fill" : streak >= 7 ? "bi-stars" : "bi-fire"}" aria-hidden="true"></i>
        <strong>${isBroken ? `MẤT CHUỖI x${displayedStreak}` : `${displayedStreak} CHUỖI!`}</strong>
        <span>${message}</span>
      </div>
      ${Array.from({ length: 16 }, (_, index) => `<i class="battle-streak-spark" style="--spark-angle:${index * 22.5}deg;--spark-delay:${(index % 4) * 24}ms"></i>`).join("")}`;
    streakFx.classList.add("is-visible");
    streakFxTimer = window.setTimeout(() => {
      streakFx.className = "battle-streak-fx";
      streakFx.replaceChildren();
    }, isBroken ? 850 : 1150);
  }

  function updateStreak(isCorrect) {
    const previousStreak = currentStreak;
    currentStreak = isCorrect ? currentStreak + 1 : 0;
    bestStreak = Math.max(bestStreak, currentStreak);
    playerStreakLabel.textContent = currentStreak;
    playerStreakBadge.classList.toggle("is-active", currentStreak >= 2);
    playerStreakBadge.classList.remove("is-bumped", "is-broken");
    void playerStreakBadge.offsetWidth;
    playerStreakBadge.classList.add(isCorrect ? "is-bumped" : "is-broken");
    window.setTimeout(() => playerStreakBadge.classList.remove("is-bumped", "is-broken"), 520);
    showStreakEffect(currentStreak, isCorrect ? 0 : previousStreak);
  }

  function botPlan(question) {
    const levelModifier = {
      A1: { accuracy: 0.08, delay: 0 },
      A2: { accuracy: 0.05, delay: 120 },
      B1: { accuracy: 0.02, delay: 260 },
      B2: { accuracy: 0, delay: 420 },
      C1: { accuracy: -0.05, delay: 700 },
      C2: { accuracy: -0.1, delay: 950 }
    }[question.level] || { accuracy: 0, delay: 350 };
    const accuracy = Math.max(0.2, Math.min(0.98, botDifficulty.accuracy + levelModifier.accuracy));
    const correct = Math.random() < accuracy;
    const wrongOptions = question.answers.map((_, index) => index).filter(index => index !== question.correct);
    const selected = correct ? question.correct : wrongOptions[Math.floor(Math.random() * wrongOptions.length)];
    const delay = Math.min(9300, Math.round(
      botDifficulty.minDelay
      + Math.random() * (botDifficulty.maxDelay - botDifficulty.minDelay)
      + levelModifier.delay
    ));
    return { selected, delay, accuracy };
  }

  function resetBotVisual() {
    botCard.classList.remove("is-thinking", "is-bot-correct", "is-bot-wrong");
    botAnswerChips.forEach(chip => chip.classList.remove("is-selected", "is-correct", "is-wrong"));
    botStatus.textContent = "Đang suy nghĩ...";
    botCard.classList.add("is-thinking");
  }

  function renderQuestion() {
    if (round >= questions.length) {
      finish();
      return;
    }
    playerAnswered = false;
    botAnswered = false;
    transitionQueued = false;
    seconds = 10;
    const question = questions[round];
    word.textContent = question.word;
    const displayWord = String(question.word || "").trim();
    word.classList.toggle("is-long", displayWord.length > 22 && displayWord.length <= 34);
    word.classList.toggle("is-very-long", displayWord.length > 34);
    questionCard.classList.remove("answer-state-correct", "answer-state-wrong");
    questionCard.querySelector(".practice-answer-fx")?.remove();
    document.querySelector("#questionLevel").textContent = `CEFR ${question.level}`;
    roundLabel.textContent = `Câu ${round + 1}/${questions.length}`;
    timerLabel.textContent = seconds;
    answers.innerHTML = question.answers.map((answer, index) => `
      <div class="col-md-6">
        <button class="answer-btn" type="button" data-answer="${index}">
          <span class="answer-key">${String.fromCharCode(65 + index)}</span>
          <span>${escapeHtml(answer)}</span>
        </button>
      </div>`).join("");

    clearInterval(timer);
    clearTimeout(botTimer);
    resetBotVisual();
    const plan = botPlan(question);
    botStatus.textContent = `Đang suy nghĩ · ${Math.round(plan.accuracy * 100)}% chính xác`;
    botTimer = window.setTimeout(() => resolveBotAnswer(plan.selected), plan.delay);
    timer = window.setInterval(() => {
      seconds -= 1;
      timerLabel.textContent = seconds;
      if (seconds <= 0) {
        clearInterval(timer);
        if (!playerAnswered) resolvePlayerAnswer(null);
        if (!botAnswered) resolveBotAnswer(plan.selected);
      }
    }, 1000);
  }

  function maybeAdvanceRound() {
    if (!playerAnswered || !botAnswered || transitionQueued) return;
    transitionQueued = true;
    clearInterval(timer);
    clearTimeout(botTimer);
    round += 1;
    window.setTimeout(renderQuestion, 1250);
  }

  function resolvePlayerAnswer(selected) {
    if (playerAnswered) return;
    playerAnswered = true;
    const question = questions[round];
    const buttons = [...answers.querySelectorAll("button")];
    const isCorrect = selected === question.correct;
    questionCard.classList.add(isCorrect ? "answer-state-correct" : "answer-state-wrong");
    VB.playAnswerEffect(questionCard, buttons[selected] || buttons[question.correct], isCorrect);
    buttons.forEach(button => {
      button.disabled = true;
      const index = Number(button.dataset.answer);
      if (index === question.correct) button.classList.add("correct");
      if (index === selected && selected !== question.correct) button.classList.add("wrong");
    });

    updateStreak(isCorrect);
    if (isCorrect) {
      correctCount += 1;
      playerScore += settings.pointsPerCorrect;
      opponentHp = Math.max(0, opponentHp - settings.damage);
      setHp(opponentHpBar, opponentHpValue, opponentHp);
      playerScoreLabel.textContent = playerScore.toLocaleString("vi-VN");
      VB.toast(`Chính xác! +${settings.pointsPerCorrect} điểm, đối thủ mất ${settings.damage} HP.`, "success");
    } else {
      VB.toast(selected === null ? "Hết giờ! Bạn không gây được sát thương." : "Chưa đúng! Bạn không gây được sát thương.", "danger");
    }
    maybeAdvanceRound();
  }

  function resolveBotAnswer(selected) {
    if (botAnswered) return;
    botAnswered = true;
    clearTimeout(botTimer);
    const question = questions[round];
    const isCorrect = selected === question.correct;
    const selectedChip = botAnswerChips[selected];
    botCard.classList.remove("is-thinking");
    botCard.classList.add(isCorrect ? "is-bot-correct" : "is-bot-wrong");
    selectedChip?.classList.add("is-selected", isCorrect ? "is-correct" : "is-wrong");

    if (isCorrect) {
      const botDamage = Math.max(1, Math.round(settings.damage * botDifficulty.damageMultiplier));
      botCorrectCount += 1;
      botScore += settings.pointsPerCorrect;
      playerHp = Math.max(0, playerHp - botDamage);
      setHp(playerHpBar, playerHpValue, playerHp);
      botStatus.textContent = `Chọn ${String.fromCharCode(65 + selected)} · Chính xác · -${botDamage} HP`;
    } else {
      botStatus.textContent = `Chọn ${String.fromCharCode(65 + selected)} · Sai`;
    }
    maybeAdvanceRound();
  }

  function finish() {
    clearInterval(timer);
    clearTimeout(botTimer);
    const playerResult = [playerHp, playerScore, correctCount];
    const botResult = [opponentHp, botScore, botCorrectCount];
    let comparison = 0;
    for (let index = 0; index < playerResult.length && comparison === 0; index += 1) {
      comparison = Math.sign(playerResult[index] - botResult[index]);
    }
    const draw = comparison === 0;
    const won = comparison > 0;
    VB.recordLearningActivity("battle", questions.length);
    const user = VB.getUser();
    if (user) {
      user.matches = (user.matches || 0) + 1;
      user.wins = (user.wins || 0) + (won ? 1 : 0);
      user.winRate = Math.round((user.wins / user.matches) * 100);
      user.elo = Math.max(0, (user.elo || 0) + (won ? 24 : draw ? 0 : -12));
      VB.setUser(user);
    }

    const result = draw ? "Hòa!" : won ? "Chiến thắng!" : "Thất bại!";
    document.querySelector("#resultIcon").className = `bi ${won ? "bi-trophy-fill text-warning" : draw ? "bi-dash-circle text-info" : "bi-shield-x text-danger"} display-2`;
    document.querySelector("#resultTitle").textContent = result;
    document.querySelector("#resultCopy").textContent = `Đã hoàn thành đủ ${questions.length} câu ở mức ${botDifficulty.label}. Bạn đúng ${correctCount}, bot đúng ${botCorrectCount}; HP ${playerHp}-${opponentHp}; điểm ${playerScore.toLocaleString("vi-VN")}-${botScore.toLocaleString("vi-VN")}; chuỗi cao nhất ${bestStreak}${won ? " và nhận +24 Elo" : ""}.`;
    new bootstrap.Modal(document.querySelector("#resultModal"), { backdrop: "static", keyboard: false }).show();
  }

  answers.addEventListener("click", event => {
    const button = event.target.closest("[data-answer]");
    if (button) resolvePlayerAnswer(Number(button.dataset.answer));
  });

  document.addEventListener("keydown", event => {
    const index = ["a", "b", "c", "d"].indexOf(event.key.toLowerCase());
    if (index >= 0) resolvePlayerAnswer(index);
  });

  modeLabel.textContent = `${settings.type === "public" ? "Public" : "Private"} · ${settings.questionCount} câu · ${settings.maxHp} HP · Bot ${botDifficulty.label} · ${settings.bankType === "personal" ? "Kho riêng" : "Kho chung"}`;
  botDifficultyBadge.textContent = botDifficulty.label;
  botDifficultyBadge.classList.add(`is-${botDifficulty.key}`);
  setHp(playerHpBar, playerHpValue, playerHp);
  setHp(opponentHpBar, opponentHpValue, opponentHp);
  renderQuestion();
});
