document.addEventListener("DOMContentLoaded", () => {
  const levels = ["A1", "A2", "B1", "B2", "C1", "C2"];
  const levelDetails = {
    A1: { title: "Nền tảng", description: "Từ quen thuộc dùng trong giao tiếp hằng ngày.", icon: "bi-1-circle-fill" },
    A2: { title: "Sơ cấp", description: "Mở rộng vốn từ cho các tình huống phổ biến.", icon: "bi-2-circle-fill" },
    B1: { title: "Trung cấp", description: "Luyện diễn đạt rõ ràng trong học tập và công việc.", icon: "bi-3-circle-fill" },
    B2: { title: "Trung cao", description: "Tăng độ chính xác với nhóm từ nhiều sắc thái.", icon: "bi-4-circle-fill" },
    C1: { title: "Nâng cao", description: "Chinh phục vốn từ học thuật và IELTS chuyên sâu.", icon: "bi-5-circle-fill" },
    C2: { title: "Thành thạo", description: "Luyện sắc thái học thuật và thuật ngữ chuyên biệt.", icon: "bi-6-circle-fill" }
  };

  const topics = typeof ieltsBand7Topics === "undefined" ? [] : ieltsBand7Topics;
  const publicWords = getPublicVocabulary();
  const levelGrid = document.querySelector("#practiceLevelGrid");
  const topicGrid = document.querySelector("#practiceTopicGrid");
  const intro = document.querySelector("#practiceIntro");
  const levelSection = document.querySelector("#practiceLevelSection");
  const session = document.querySelector("#practiceSession");
  const result = document.querySelector("#practiceResult");
  const answers = document.querySelector("#practiceAnswers");
  const questionCard = document.querySelector(".practice-question-card");
  const wordLabel = document.querySelector("#practiceWord");
  const categoryLabel = document.querySelector("#practiceCategory");
  const levelBadge = document.querySelector("#practiceLevelBadge");
  const roundLabel = document.querySelector("#practiceRoundLabel");
  const progressBar = document.querySelector("#practiceProgressBar");
  const correctLabel = document.querySelector("#practiceCorrect");
  const wrongLabel = document.querySelector("#practiceWrong");
  const accuracyLabel = document.querySelector("#practiceAccuracy");
  const feedback = document.querySelector("#practiceFeedback");
  const feedbackHeading = document.querySelector("#practiceFeedbackHeading");
  const feedbackWord = document.querySelector("#practiceFeedbackWord");
  const feedbackMeaning = document.querySelector("#practiceFeedbackMeaning");
  const feedbackPronunciation = document.querySelector("#practiceFeedbackPronunciation");
  const exampleLabel = document.querySelector("#practiceExample");
  const nextButton = document.querySelector("#nextPracticeQuestion");
  const resumeSection = document.querySelector("#practiceResumeSection");
  const resumeTitle = document.querySelector("#practiceResumeTitle");
  const resumeMeta = document.querySelector("#practiceResumeMeta");
  const resumeButton = document.querySelector("#resumePractice");
  const discardButton = document.querySelector("#discardPractice");
  const progressStorageKey = "vb_practice_progress_v1";

  let activeSet = null;
  let questions = [];
  let currentIndex = 0;
  let correctCount = 0;
  let mistakes = [];
  let locked = false;

  function escapeHtml(value) {
    return String(value ?? "").replace(/[&<>'"]/g, character => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      "'": "&#039;",
      '"': "&quot;"
    })[character]);
  }

  function shuffle(items) {
    const shuffled = [...items];
    for (let index = shuffled.length - 1; index > 0; index -= 1) {
      const target = Math.floor(Math.random() * (index + 1));
      [shuffled[index], shuffled[target]] = [shuffled[target], shuffled[index]];
    }
    return shuffled;
  }

  function pronunciationMarkup(term) {
    const pronunciation = typeof VBPronunciation === "undefined" ? null : VBPronunciation.get(term);
    const cambridgeUrl = typeof VBPronunciation === "undefined" ? "https://dictionary.cambridge.org/vi/dictionary/english/" : VBPronunciation.cambridgeUrl(term);
    const variants = [
      pronunciation?.uk ? `<span class="pronunciation-variant"><b>UK</b> <span class="ipa-text">${escapeHtml(pronunciation.uk)}</span></span>` : "",
      pronunciation?.us ? `<span class="pronunciation-variant"><b>US</b> <span class="ipa-text">${escapeHtml(pronunciation.us)}</span></span>` : ""
    ].filter(Boolean).join("");
    const missing = variants ? "" : '<span class="pronunciation-missing">Chưa có IPA trong nguồn mở</span>';
    return `${variants}${missing}<a class="cambridge-lookup" href="${escapeHtml(cambridgeUrl)}" target="_blank" rel="noopener noreferrer" aria-label="Kiểm tra phát âm trên Cambridge Dictionary"><i class="bi bi-box-arrow-up-right"></i> Cambridge</a>`;
  }

  function getBestScores() {
    try {
      return JSON.parse(localStorage.getItem("vb_practice_best_v1") || "{}") || {};
    } catch {
      return {};
    }
  }

  function wordsForLevel(level) {
    return publicWords.filter(item => String(item.level || "").toUpperCase() === level);
  }

  function wordsForTopic(topicKey) {
    return publicWords.filter(item => item.topicKey === topicKey || item.topicKeys?.includes(topicKey));
  }

  function getPracticeSet(type, key) {
    if (type === "topic") {
      const topic = topics.find(item => item.key === key);
      if (!topic) return null;
      return {
        type,
        key,
        title: topic.name,
        badge: `IELTS · ${topic.name}`,
        words: wordsForTopic(key).map(item => {
          const membership = item.topicMemberships?.find(entry => entry.topicKey === key);
          return membership ? {
            ...item,
            level: membership.level || item.level,
            meaning: membership.meaning || item.meaning,
            partOfSpeech: membership.partOfSpeech || item.partOfSpeech,
            category: membership.category || item.category
          } : item;
        })
      };
    }

    if (!levels.includes(key)) return null;
    return {
      type: "level",
      key,
      title: `CEFR ${key}`,
      badge: `CEFR ${key}`,
      words: wordsForLevel(key)
    };
  }

  function scoreKey(type, key) {
    return `${type}:${key}`;
  }

  function bestScore(bestScores, type, key) {
    const current = bestScores[scoreKey(type, key)];
    if (current !== undefined) return Number(current || 0);
    return type === "level" ? Number(bestScores[key] || 0) : 0;
  }

  function getSavedProgress() {
    try {
      const saved = JSON.parse(localStorage.getItem(progressStorageKey) || "null");
      if (!saved || !saved.activeSet || !Array.isArray(saved.questions) || saved.questions.length < 4) return null;
      const current = Number(saved.currentIndex);
      if (!Number.isInteger(current) || current < 0 || current > saved.questions.length) return null;
      return saved;
    } catch {
      return null;
    }
  }

  function saveProgress(nextIndex = currentIndex) {
    if (!activeSet || !questions.length) return;
    const answered = Math.max(0, Math.min(nextIndex, questions.length));
    localStorage.setItem(progressStorageKey, JSON.stringify({
      version: 1,
      activeSet: {
        type: activeSet.type,
        key: activeSet.key,
        title: activeSet.title,
        badge: activeSet.badge
      },
      questions,
      currentIndex: answered,
      correctCount,
      wrongCount: Math.max(0, answered - correctCount),
      mistakes,
      updatedAt: new Date().toISOString()
    }));
    renderResumeCard();
  }

  function clearProgress() {
    localStorage.removeItem(progressStorageKey);
    renderResumeCard();
  }

  function renderResumeCard() {
    const saved = getSavedProgress();
    resumeSection.classList.toggle("d-none", !saved || !session.classList.contains("d-none") || !result.classList.contains("d-none"));
    if (!saved) return;
    const answered = Math.min(saved.currentIndex, saved.questions.length);
    const updated = saved.updatedAt ? new Date(saved.updatedAt) : null;
    resumeTitle.textContent = `Continue ${saved.activeSet.title} — ${answered}/${saved.questions.length}`;
    resumeMeta.textContent = `${saved.correctCount || 0} đúng · ${saved.wrongCount || 0} sai${updated && !Number.isNaN(updated.getTime()) ? ` · Cập nhật ${updated.toLocaleString("vi-VN")}` : ""}`;
  }

  function renderLevelCards() {
    const bestScores = getBestScores();
    levelGrid.innerHTML = levels.map(level => {
      const count = wordsForLevel(level).length;
      const best = Math.min(bestScore(bestScores, "level", level), count);
      const detail = levelDetails[level];
      return `
        <button class="practice-level-card" type="button" data-practice-level="${level}" aria-label="Luyện ${count} từ bậc ${level}">
          <span class="practice-level-icon"><i class="bi ${detail.icon}"></i></span>
          <span class="practice-level-code">${level}</span>
          <strong>${detail.title}</strong>
          <span class="practice-level-description">${detail.description}</span>
          <span class="practice-level-footer">
            <span><i class="bi bi-collection me-1"></i>${count} từ</span>
            <span>${best ? `Tốt nhất ${best}/${count}` : "Chưa luyện"}</span>
          </span>
        </button>`;
    }).join("");
  }

  function renderTopicCards() {
    const bestScores = getBestScores();
    topicGrid.innerHTML = topics.map(topic => {
      const count = wordsForTopic(topic.key).length;
      const best = Math.min(bestScore(bestScores, "topic", topic.key), count);
      return `
        <button class="practice-topic-card" type="button" data-practice-topic="${topic.key}" aria-label="Luyện ${count} từ chủ đề ${escapeHtml(topic.name)}">
          <span class="practice-topic-number">${String(topic.number).padStart(2, "0")}</span>
          <span class="practice-topic-icon"><i class="bi ${topic.icon}"></i></span>
          <span class="practice-topic-copy">
            <strong>${escapeHtml(topic.name)}</strong>
            <span>${count} từ · ${best ? `Tốt nhất ${best}/${count}` : "Chưa luyện"}</span>
          </span>
          <i class="bi bi-arrow-right-short practice-topic-arrow" aria-hidden="true"></i>
        </button>`;
    }).join("");
  }

  function uniqueDistractors(entry, setWords) {
    const selected = [];
    const entryWord = String(entry.word || "").trim().toLowerCase();
    const usedMeanings = new Set([String(entry.meaning || "").trim().toLowerCase()]);
    const entryCategory = String(entry.category || entry.partOfSpeech || "").trim().toLowerCase();
    const entryMeaningLength = String(entry.meaning || "").trim().length;
    const candidateMap = new Map();
    [...setWords, ...publicWords].forEach(candidate => {
      const key = candidate.sourceKey || candidate.id || `${candidate.level}|${candidate.word}|${candidate.meaning}`;
      if (candidate !== entry && !candidateMap.has(String(key))) candidateMap.set(String(key), candidate);
    });

    const candidates = [...candidateMap.values()];
    const categoryOf = candidate => String(candidate.category || candidate.partOfSpeech || "").trim().toLowerCase();
    const hasSimilarLength = candidate => Math.abs(entryMeaningLength - String(candidate.meaning || "").trim().length) <= 12;
    const entryTopicKeys = new Set(entry.topicKeys || [entry.topicKey].filter(Boolean));
    const sameTopic = candidate => (candidate.topicKeys || [candidate.topicKey].filter(Boolean)).some(key => entryTopicKeys.has(key));
    const sameCategory = candidate => Boolean(entryCategory && categoryOf(candidate) === entryCategory);
    const priorityPredicates = [
      candidate => sameTopic(candidate) && sameCategory(candidate) && hasSimilarLength(candidate),
      candidate => sameTopic(candidate) && sameCategory(candidate),
      sameTopic,
      candidate => candidate.level === entry.level && sameCategory(candidate) && hasSimilarLength(candidate),
      candidate => candidate.level === entry.level && sameCategory(candidate),
      sameCategory,
      () => true
    ];

    for (const predicate of priorityPredicates) {
      for (const candidate of shuffle(candidates.filter(predicate))) {
        const candidateWord = String(candidate.word || "").trim().toLowerCase();
        const meaningKey = String(candidate.meaning || "").trim().toLowerCase();
        if (!meaningKey || candidateWord === entryWord || usedMeanings.has(meaningKey)) continue;
        usedMeanings.add(meaningKey);
        selected.push(candidate.meaning);
        if (selected.length === 3) return selected;
      }
    }
    return selected;
  }

  function buildQuestions(practiceSet) {
    return shuffle(practiceSet.words).map(entry => {
      const options = shuffle([
        { text: entry.meaning, correct: true },
        ...uniqueDistractors(entry, practiceSet.words).map(meaning => ({ text: meaning, correct: false }))
      ]);
      return {
        word: entry.word,
        meaning: entry.meaning,
        example: entry.example || "",
        collocation: entry.collocation || "",
        category: entry.category || entry.partOfSpeech || "Từ vựng",
        answers: options.map(option => option.text),
        correct: options.findIndex(option => option.correct)
      };
    });
  }

  function setProgress(answered) {
    const total = questions.length || 1;
    const percentage = Math.round((answered / total) * 100);
    progressBar.style.width = `${percentage}%`;
    progressBar.parentElement.setAttribute("aria-valuenow", String(percentage));
  }

  function updateStats(answered) {
    const wrongCount = Math.max(0, answered - correctCount);
    const accuracy = answered ? Math.round((correctCount / answered) * 100) : 0;
    correctLabel.textContent = correctCount;
    wrongLabel.textContent = wrongCount;
    accuracyLabel.textContent = `${accuracy}%`;
  }

  function renderQuestion() {
    if (currentIndex >= questions.length) {
      finishPractice();
      return;
    }

    locked = false;
    const question = questions[currentIndex];
    levelBadge.textContent = activeSet.badge;
    roundLabel.textContent = `Từ ${currentIndex + 1}/${questions.length}`;
    const displayWord = String(question.word || "").trim();
    wordLabel.textContent = displayWord;
    wordLabel.classList.toggle("is-long", displayWord.length > 22 && displayWord.length <= 34);
    wordLabel.classList.toggle("is-very-long", displayWord.length > 34);
    categoryLabel.textContent = question.category;
    questionCard.classList.remove("answer-state-correct", "answer-state-wrong");
    questionCard.querySelector(".practice-answer-fx")?.remove();
    feedback.classList.add("d-none");
    feedback.classList.remove("is-correct", "is-wrong");
    nextButton.classList.add("d-none");
    nextButton.innerHTML = currentIndex === questions.length - 1
      ? 'Xem kết quả <i class="bi bi-flag-fill ms-1"></i>'
      : 'Từ tiếp theo <i class="bi bi-arrow-right ms-1"></i>';

    answers.innerHTML = question.answers.map((answer, index) => `
      <div class="col-md-6">
        <button class="answer-btn" type="button" data-practice-answer="${index}">
          <span class="answer-key">${String.fromCharCode(65 + index)}</span>
          <span>${escapeHtml(answer)}</span>
        </button>
      </div>`).join("");

    setProgress(currentIndex);
    updateStats(currentIndex);
  }

  function resolveAnswer(selectedIndex) {
    if (locked || session.classList.contains("d-none")) return;
    locked = true;
    const question = questions[currentIndex];
    const buttons = [...answers.querySelectorAll("[data-practice-answer]")];
    const isCorrect = selectedIndex === question.correct;
    questionCard.classList.add(isCorrect ? "answer-state-correct" : "answer-state-wrong");
    VB.playAnswerEffect(questionCard, buttons[selectedIndex], isCorrect);

    buttons.forEach(button => {
      button.disabled = true;
      const answerIndex = Number(button.dataset.practiceAnswer);
      if (answerIndex === question.correct) button.classList.add("correct");
      if (answerIndex === selectedIndex && !isCorrect) button.classList.add("wrong");
    });

    if (isCorrect) {
      correctCount += 1;
      feedback.classList.add("is-correct");
      feedbackHeading.innerHTML = '<i class="bi bi-check-circle-fill me-2"></i>Chính xác!';
    } else {
      mistakes.push({
        word: question.word,
        meaning: question.meaning,
        selected: question.answers[selectedIndex],
        usage: question.example || question.collocation,
        usageLabel: question.example ? "Ví dụ" : "Collocation"
      });
      feedback.classList.add("is-wrong");
      feedbackHeading.innerHTML = '<i class="bi bi-lightbulb-fill me-2"></i>Ghi nhớ đáp án đúng';
    }

    const usage = question.example || question.collocation;
    const usageLabel = question.example ? "Ví dụ" : "Collocation";
    feedbackWord.textContent = question.word;
    feedbackMeaning.textContent = question.meaning;
    feedbackPronunciation.innerHTML = pronunciationMarkup(question.word);
    feedbackPronunciation.classList.remove("d-none");
    exampleLabel.textContent = usage ? `${usageLabel}: ${usage}` : "";
    exampleLabel.classList.toggle("d-none", !usage);
    feedback.classList.remove("d-none");
    nextButton.classList.remove("d-none");
    setProgress(currentIndex + 1);
    updateStats(currentIndex + 1);
    saveProgress(currentIndex + 1);
    nextButton.focus({ preventScroll: true });
  }

  function startPractice(type, key) {
    const practiceSet = getPracticeSet(type, key);
    if (!practiceSet || practiceSet.words.length < 4) {
      VB.toast("Bộ từ này chưa đủ dữ liệu để tạo bài luyện.", "warning");
      return;
    }

    activeSet = practiceSet;
    questions = buildQuestions(practiceSet);
    currentIndex = 0;
    correctCount = 0;
    mistakes = [];
    intro.classList.add("d-none");
    levelSection.classList.add("d-none");
    result.classList.add("d-none");
    session.classList.remove("d-none");
    resumeSection.classList.add("d-none");
    window.scrollTo({ top: 0, behavior: "smooth" });
    saveProgress(0);
    renderQuestion();
  }

  function resumePractice() {
    const saved = getSavedProgress();
    if (!saved) {
      VB.toast("Không tìm thấy phiên luyện để tiếp tục.", "warning");
      renderResumeCard();
      return;
    }
    const restoredSet = getPracticeSet(saved.activeSet.type, saved.activeSet.key);
    activeSet = restoredSet ? { ...restoredSet, title: saved.activeSet.title, badge: saved.activeSet.badge } : saved.activeSet;
    questions = saved.questions;
    currentIndex = saved.currentIndex;
    correctCount = Number(saved.correctCount) || 0;
    mistakes = Array.isArray(saved.mistakes) ? saved.mistakes : [];
    locked = false;
    intro.classList.add("d-none");
    levelSection.classList.add("d-none");
    result.classList.add("d-none");
    resumeSection.classList.add("d-none");
    session.classList.remove("d-none");
    window.scrollTo({ top: 0, behavior: "smooth" });
    renderQuestion();
    VB.toast(`Tiếp tục ${activeSet.title} tại câu ${Math.min(currentIndex + 1, questions.length)}/${questions.length}.`, "info");
  }

  function showSetSelection() {
    locked = true;
    session.classList.add("d-none");
    result.classList.add("d-none");
    intro.classList.remove("d-none");
    levelSection.classList.remove("d-none");
    renderLevelCards();
    renderTopicCards();
    renderResumeCard();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function finishPractice() {
    locked = true;
    session.classList.add("d-none");
    result.classList.remove("d-none");
    const total = questions.length;
    const accuracy = total ? Math.round((correctCount / total) * 100) : 0;
    const bestScores = getBestScores();
    const key = scoreKey(activeSet.type, activeSet.key);
    const best = Math.max(Math.min(bestScore(bestScores, activeSet.type, activeSet.key), total), correctCount);
    bestScores[key] = best;
    localStorage.setItem("vb_practice_best_v1", JSON.stringify(bestScores));
    clearProgress();

    document.querySelector("#practiceResultLevel").textContent = `Hoàn thành ${activeSet.title}`;
    document.querySelector("#practiceResultCopy").textContent = `Bạn đã luyện đủ ${total} từ trong bộ ${activeSet.title} và trả lời đúng ${correctCount} từ.`;
    document.querySelector("#resultCorrect").textContent = `${correctCount}/${total}`;
    document.querySelector("#resultAccuracy").textContent = `${accuracy}%`;
    document.querySelector("#resultBest").textContent = `${best}/${total}`;

    const mistakeSection = document.querySelector("#practiceMistakes");
    const mistakeList = document.querySelector("#practiceMistakeList");
    mistakeSection.classList.toggle("d-none", mistakes.length === 0);
    mistakeList.innerHTML = mistakes.map(item => `
      <div class="practice-mistake-item">
        <div><strong>${escapeHtml(item.word)}</strong><span>${escapeHtml(item.meaning)}</span></div>
        <small>Bạn chọn: ${escapeHtml(item.selected)}</small>
        ${item.usage ? `<small class="practice-mistake-example">${escapeHtml(item.usageLabel)}: ${escapeHtml(item.usage)}</small>` : ""}
      </div>`).join("");

    renderLevelCards();
    renderTopicCards();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  levelGrid.addEventListener("click", event => {
    const button = event.target.closest("[data-practice-level]");
    if (button) startPractice("level", button.dataset.practiceLevel);
  });

  topicGrid.addEventListener("click", event => {
    const button = event.target.closest("[data-practice-topic]");
    if (button) startPractice("topic", button.dataset.practiceTopic);
  });

  answers.addEventListener("click", event => {
    const button = event.target.closest("[data-practice-answer]");
    if (button) resolveAnswer(Number(button.dataset.practiceAnswer));
  });

  nextButton.addEventListener("click", () => {
    if (!locked) return;
    currentIndex += 1;
    renderQuestion();
  });

  resumeButton.addEventListener("click", resumePractice);
  discardButton.addEventListener("click", () => {
    clearProgress();
    VB.toast("Đã xóa phiên luyện đang dở.", "info");
  });

  document.querySelector("#leavePractice").addEventListener("click", showSetSelection);
  document.querySelector("#chooseAnotherLevel").addEventListener("click", showSetSelection);
  document.querySelector("#practiceAgain").addEventListener("click", () => startPractice(activeSet.type, activeSet.key));

  document.addEventListener("keydown", event => {
    if (session.classList.contains("d-none")) return;
    if (locked && event.key === "Enter") {
      event.preventDefault();
      nextButton.click();
      return;
    }
    if (locked) return;
    const answerIndex = ["a", "b", "c", "d"].indexOf(event.key.toLowerCase());
    if (answerIndex >= 0 && answerIndex < questions[currentIndex].answers.length) resolveAnswer(answerIndex);
  });

  renderLevelCards();
  renderTopicCards();
  renderResumeCard();
});
