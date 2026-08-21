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
  const practiceModes = {
    mixed: { label: "Hỗn hợp", icon: "bi-shuffle" },
    typing: { label: "Nhập từ", icon: "bi-keyboard-fill" },
    listening: { label: "Nghe & điền", icon: "bi-volume-up-fill" },
    matching: { label: "Ghép cặp", icon: "bi-intersect" }
  };
  const mixedModeCycle = ["typing", "listening"];
  const progressStorageKey = "vb_practice_progress_v1";
  const modeStorageKey = "vb_practice_mode_v1";

  const topics = typeof ieltsBand7Topics === "undefined" ? [] : ieltsBand7Topics;
  const publicWords = getPublicVocabulary();
  const levelGrid = document.querySelector("#practiceLevelGrid");
  const topicGrid = document.querySelector("#practiceTopicGrid");
  const intro = document.querySelector("#practiceIntro");
  const modeSection = document.querySelector("#practiceModeSection");
  const modeButtons = [...document.querySelectorAll("[data-practice-mode]")];
  const levelSection = document.querySelector("#practiceLevelSection");
  const session = document.querySelector("#practiceSession");
  const result = document.querySelector("#practiceResult");
  const questionCard = document.querySelector(".practice-question-card");
  const promptLabel = document.querySelector("#practicePromptLabel");
  const wordLabel = document.querySelector("#practiceWord");
  const categoryLabel = document.querySelector("#practiceCategory");
  const levelBadge = document.querySelector("#practiceLevelBadge");
  const modeBadge = document.querySelector("#practiceModeBadge");
  const roundLabel = document.querySelector("#practiceRoundLabel");
  const progressBar = document.querySelector("#practiceProgressBar");
  const correctLabel = document.querySelector("#practiceCorrect");
  const wrongLabel = document.querySelector("#practiceWrong");
  const accuracyLabel = document.querySelector("#practiceAccuracy");
  const listenButton = document.querySelector("#practiceListenButton");
  const typingForm = document.querySelector("#practiceTypingForm");
  const typingHint = document.querySelector("#practiceTypingHint");
  const typingInput = document.querySelector("#practiceTypingInput");
  const typingSubmit = document.querySelector("#practiceTypingSubmit");
  const matchingBoard = document.querySelector("#practiceMatchingBoard");
  const matchingWords = document.querySelector("#practiceMatchingWords");
  const matchingMeanings = document.querySelector("#practiceMatchingMeanings");
  const matchingStatus = document.querySelector("#practiceMatchingStatus");
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

  const storedMode = localStorage.getItem(modeStorageKey);
  let selectedMode = practiceModes[storedMode] ? storedMode : "mixed";
  let activeMode = selectedMode;
  let activeSet = null;
  let questions = [];
  let currentIndex = 0;
  let correctCount = 0;
  let wrongCount = 0;
  let mistakes = [];
  let locked = false;
  let matchingLocked = false;
  let awaitingMatchingAdvance = false;
  let selectedMatchingWordId = "";
  let selectedMatchingMeaningId = "";
  let matchingSolvedIds = new Set();
  let matchingFailedIds = new Set();
  let matchingMeaningOrder = [];

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
    const cambridgeUrl = typeof VBPronunciation === "undefined"
      ? "https://dictionary.cambridge.org/vi/dictionary/english/"
      : VBPronunciation.cambridgeUrl(term);
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

  function modeLabel(mode) {
    return practiceModes[mode]?.label || practiceModes.typing.label;
  }

  function scoreKey(type, key, mode = selectedMode) {
    return `${type}:${key}:${mode}`;
  }

  function bestScore(bestScores, type, key, mode = selectedMode) {
    const current = bestScores[scoreKey(type, key, mode)];
    return current === undefined ? 0 : Number(current || 0);
  }

  function normalizeAnswer(value) {
    return String(value || "")
      .normalize("NFKC")
      .toLocaleLowerCase("en")
      .replace(/[‘’]/g, "'")
      .replace(/\s+/g, " ")
      .trim();
  }

  function getSavedProgress() {
    try {
      const saved = JSON.parse(localStorage.getItem(progressStorageKey) || "null");
      if (!saved || !saved.activeSet || !Array.isArray(saved.questions) || saved.questions.length < 4) return null;
      if (!practiceModes[saved.mode]) return null;
      const current = Number(saved.currentIndex);
      if (!Number.isInteger(current) || current < 0 || current > saved.questions.length) return null;
      return saved;
    } catch {
      return null;
    }
  }

  function saveProgress(savedIndex = currentIndex, answeredCount = savedIndex) {
    if (!activeSet || !questions.length) return;
    const safeIndex = Math.max(0, Math.min(savedIndex, questions.length));
    const safeAnswered = Math.max(0, Math.min(answeredCount, questions.length));
    localStorage.setItem(progressStorageKey, JSON.stringify({
      version: 2,
      mode: activeMode,
      activeSet: {
        type: activeSet.type,
        key: activeSet.key,
        title: activeSet.title,
        badge: activeSet.badge
      },
      questions,
      currentIndex: safeIndex,
      answeredCount: safeAnswered,
      correctCount,
      wrongCount,
      mistakes,
      matching: activeMode === "matching" ? {
        solvedIds: [...matchingSolvedIds],
        failedIds: [...matchingFailedIds],
        meaningOrder: matchingMeaningOrder
      } : null,
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
    const shouldShow = saved && session.classList.contains("d-none") && result.classList.contains("d-none");
    resumeSection.classList.toggle("d-none", !shouldShow);
    if (!saved) return;
    const answered = Math.min(Number(saved.answeredCount ?? saved.currentIndex) || 0, saved.questions.length);
    const updated = saved.updatedAt ? new Date(saved.updatedAt) : null;
    const savedMode = practiceModes[saved.mode] ? saved.mode : "typing";
    resumeTitle.textContent = `Continue ${saved.activeSet.title} — ${answered}/${saved.questions.length}`;
    resumeMeta.textContent = `${modeLabel(savedMode)} · ${saved.correctCount || 0} đúng · ${saved.wrongCount || 0} sai${updated && !Number.isNaN(updated.getTime()) ? ` · Cập nhật ${updated.toLocaleString("vi-VN")}` : ""}`;
  }

  function updateModeSelection() {
    modeButtons.forEach(button => {
      const isActive = button.dataset.practiceMode === selectedMode;
      button.classList.toggle("is-active", isActive);
      button.setAttribute("aria-checked", String(isActive));
    });
  }

  function setSelectedMode(mode) {
    if (!practiceModes[mode]) return;
    selectedMode = mode;
    localStorage.setItem(modeStorageKey, mode);
    updateModeSelection();
    renderLevelCards();
    renderTopicCards();
  }

  function renderLevelCards() {
    const bestScores = getBestScores();
    levelGrid.innerHTML = levels.map(level => {
      const practiceSet = getPracticeSet("level", level);
      const count = practiceSet.words.length;
      const best = Math.min(bestScore(bestScores, "level", level), count);
      const detail = levelDetails[level];
      const unavailable = count < 4;
      return `
        <button class="practice-level-card${unavailable ? " is-unavailable" : ""}" type="button" data-practice-level="${level}" ${unavailable ? "disabled" : ""} aria-label="Luyện ${count} từ bậc ${level} bằng dạng ${modeLabel(selectedMode)}">
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
      const practiceSet = getPracticeSet("topic", topic.key);
      const count = practiceSet.words.length;
      const best = Math.min(bestScore(bestScores, "topic", topic.key), count);
      const unavailable = count < 4;
      return `
        <button class="practice-topic-card${unavailable ? " is-unavailable" : ""}" type="button" data-practice-topic="${topic.key}" ${unavailable ? "disabled" : ""} aria-label="Luyện ${count} từ chủ đề ${escapeHtml(topic.name)} bằng dạng ${modeLabel(selectedMode)}">
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

  function isHintCharacter(character) {
    return /[\p{L}\p{N}]/u.test(character);
  }

  function createTypingHint(term) {
    return String(term || "")
      .trim()
      .split(/\s+/)
      .map(part => [...part].map(character => isHintCharacter(character) ? "_" : character).join(" "))
      .join("   ");
  }

  function modeForMixedQuestion(index) {
    return mixedModeCycle[index % mixedModeCycle.length];
  }

  function buildQuestion(entry, mode, index) {
    const questionMode = mode === "mixed" ? modeForMixedQuestion(index) : mode;
    return {
      id: `${index}-${entry.sourceKey || entry.id || `${entry.level}|${entry.word}|${entry.meaning}`}`,
      mode: questionMode,
      word: entry.word,
      meaning: entry.meaning,
      example: entry.example || "",
      collocation: entry.collocation || "",
      category: entry.category || entry.partOfSpeech || "Từ vựng"
    };
  }

  function buildQuestions(practiceSet, mode) {
    return shuffle(practiceSet.words).map((entry, index) => buildQuestion(entry, mode, index));
  }

  function normalizeSavedQuestions(savedQuestions) {
    return savedQuestions.map((question, index) => ({
      ...question,
      id: question.id || `${index}-${question.word}|${question.meaning}`,
      mode: ["typing", "listening", "matching"].includes(question.mode) ? question.mode : "typing"
    }));
  }

  function setProgress(answered) {
    const total = questions.length || 1;
    const percentage = Math.round((answered / total) * 100);
    progressBar.style.width = `${percentage}%`;
    progressBar.parentElement.setAttribute("aria-valuenow", String(percentage));
  }

  function updateStats() {
    const answered = correctCount + wrongCount;
    const accuracy = answered ? Math.round((correctCount / answered) * 100) : 0;
    correctLabel.textContent = correctCount;
    wrongLabel.textContent = wrongCount;
    accuracyLabel.textContent = `${accuracy}%`;
  }

  function resetQuestionUi() {
    questionCard.classList.remove("answer-state-correct", "answer-state-wrong", "is-sentence-question", "is-listening-question", "is-matching-question");
    questionCard.querySelector(".practice-answer-fx")?.remove();
    feedback.classList.add("d-none");
    feedback.classList.remove("is-correct", "is-wrong");
    feedbackPronunciation.classList.add("d-none");
    exampleLabel.classList.add("d-none");
    typingForm.classList.add("d-none");
    typingHint.classList.add("d-none");
    typingHint.textContent = "";
    typingInput.value = "";
    typingInput.placeholder = "Nhập từ tiếng Anh...";
    typingInput.disabled = false;
    typingSubmit.disabled = false;
    typingInput.classList.remove("is-invalid", "is-correct", "is-wrong");
    listenButton.classList.add("d-none");
    listenButton.classList.remove("is-speaking");
    matchingBoard.classList.add("d-none");
    matchingWords.innerHTML = "";
    matchingMeanings.innerHTML = "";
    matchingStatus.textContent = "Chọn một từ, sau đó chọn nghĩa tương ứng.";
    nextButton.classList.add("d-none");
    selectedMatchingWordId = "";
    selectedMatchingMeaningId = "";
    window.speechSynthesis?.cancel();
  }

  function setQuestionText(text, sentence = false) {
    const displayText = String(text || "").trim();
    wordLabel.textContent = displayText;
    wordLabel.classList.toggle("is-long", !sentence && displayText.length > 22 && displayText.length <= 34);
    wordLabel.classList.toggle("is-very-long", !sentence && displayText.length > 34);
    questionCard.classList.toggle("is-sentence-question", sentence);
  }

  function canUseSpeechSynthesis() {
    return "speechSynthesis" in window && "SpeechSynthesisUtterance" in window;
  }

  function speakCurrentWord() {
    const question = questions[currentIndex];
    if (!question || question.mode !== "listening") return;
    if (!canUseSpeechSynthesis()) {
      VB.toast("Trình duyệt này chưa hỗ trợ phát âm tự động.", "warning");
      return;
    }
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(question.word);
    utterance.lang = "en-US";
    utterance.rate = 0.82;
    utterance.pitch = 1;
    utterance.onstart = () => listenButton.classList.add("is-speaking");
    utterance.onend = () => listenButton.classList.remove("is-speaking");
    utterance.onerror = () => listenButton.classList.remove("is-speaking");
    window.speechSynthesis.speak(utterance);
  }

  function renderStandardQuestion(question) {
    categoryLabel.textContent = question.category;
    if (question.mode === "typing") {
      promptLabel.textContent = "Nhập từ tiếng Anh phù hợp với nghĩa";
      setQuestionText(question.meaning, true);
      typingHint.textContent = createTypingHint(question.word);
      const characterCount = [...String(question.word || "")].filter(isHintCharacter).length;
      typingHint.setAttribute("aria-label", `Từ cần nhập có ${characterCount} ký tự`);
      typingHint.classList.remove("d-none");
      typingForm.classList.remove("d-none");
      requestAnimationFrame(() => typingInput.focus({ preventScroll: true }));
    } else if (question.mode === "listening") {
      promptLabel.textContent = "Nghe phát âm và điền từ bạn nghe được";
      categoryLabel.textContent = "English listening";
      setQuestionText("Nghe kỹ và nhập lại từ", true);
      questionCard.classList.add("is-listening-question");
      listenButton.classList.remove("d-none");
      typingInput.placeholder = "Nhập từ bạn nghe được...";
      typingForm.classList.remove("d-none");
      speakCurrentWord();
      requestAnimationFrame(() => typingInput.focus({ preventScroll: true }));
    }
  }

  function currentMatchingBatch() {
    return questions.slice(currentIndex, currentIndex + 5);
  }

  function ensureMatchingOrder(batch) {
    const batchIds = new Set(batch.map(question => question.id));
    const orderIsValid = matchingMeaningOrder.length === batch.length
      && matchingMeaningOrder.every(id => batchIds.has(id));
    if (!orderIsValid) matchingMeaningOrder = shuffle(batch.map(question => question.id));
  }

  function renderMatchingQuestion() {
    const batch = currentMatchingBatch();
    ensureMatchingOrder(batch);
    promptLabel.textContent = "Ghép từ với nghĩa tương ứng";
    categoryLabel.textContent = `Nhóm ${Math.floor(currentIndex / 5) + 1}`;
    setQuestionText(`Ghép ${batch.length} cặp từ`, true);
    questionCard.classList.add("is-matching-question");
    matchingBoard.classList.remove("d-none");
    matchingStatus.textContent = matchingSolvedIds.size
      ? `Đã ghép ${matchingSolvedIds.size}/${batch.length} cặp. Tiếp tục nhé!`
      : "Chọn một từ, sau đó chọn nghĩa tương ứng.";

    matchingWords.innerHTML = batch.map(question => `
      <button class="practice-match-item${matchingSolvedIds.has(question.id) ? " is-matched" : ""}" type="button" data-match-word="${escapeHtml(question.id)}" ${matchingSolvedIds.has(question.id) ? "disabled" : ""}>
        <i class="bi bi-alphabet-uppercase"></i><span>${escapeHtml(question.word)}</span>
      </button>`).join("");
    matchingMeanings.innerHTML = matchingMeaningOrder.map(id => {
      const question = batch.find(item => item.id === id);
      if (!question) return "";
      return `
        <button class="practice-match-item${matchingSolvedIds.has(question.id) ? " is-matched" : ""}" type="button" data-match-meaning="${escapeHtml(question.id)}" ${matchingSolvedIds.has(question.id) ? "disabled" : ""}>
          <i class="bi bi-chat-left-text-fill"></i><span>${escapeHtml(question.meaning)}</span>
        </button>`;
    }).join("");

    const answered = currentIndex + matchingSolvedIds.size;
    roundLabel.textContent = `Cặp ${Math.min(answered + 1, questions.length)}/${questions.length}`;
    setProgress(answered);
    updateStats();
    saveProgress(currentIndex, answered);
  }

  function renderQuestion() {
    if (currentIndex >= questions.length) {
      finishPractice();
      return;
    }

    locked = false;
    matchingLocked = false;
    awaitingMatchingAdvance = false;
    resetQuestionUi();
    const question = questions[currentIndex];
    levelBadge.textContent = activeSet.badge;
    modeBadge.textContent = modeLabel(activeMode);
    nextButton.innerHTML = currentIndex === questions.length - 1
      ? 'Xem kết quả <i class="bi bi-flag-fill ms-1"></i>'
      : 'Từ tiếp theo <i class="bi bi-arrow-right ms-1"></i>';

    if (activeMode === "matching") {
      renderMatchingQuestion();
      return;
    }

    roundLabel.textContent = `Từ ${currentIndex + 1}/${questions.length}`;
    renderStandardQuestion(question);
    setProgress(currentIndex);
    updateStats();
  }

  function addMistake(question, selected) {
    mistakes.push({
      word: question.word,
      meaning: question.meaning,
      selected: selected || "Không nhập đáp án",
      usage: question.example || question.collocation,
      usageLabel: question.example ? "Ví dụ" : "Collocation"
    });
  }

  function showQuestionFeedback(question, isCorrect) {
    feedback.classList.add(isCorrect ? "is-correct" : "is-wrong");
    feedbackHeading.innerHTML = isCorrect
      ? '<i class="bi bi-check-circle-fill me-2"></i>Chính xác!'
      : '<i class="bi bi-lightbulb-fill me-2"></i>Ghi nhớ đáp án đúng';
    const usage = question.example || question.collocation;
    const usageLabel = question.example ? "Ví dụ" : "Collocation";
    feedbackWord.textContent = question.word;
    feedbackMeaning.textContent = question.meaning;
    feedbackPronunciation.innerHTML = pronunciationMarkup(question.word);
    feedbackPronunciation.classList.remove("d-none");
    exampleLabel.textContent = usage ? `${usageLabel}: ${usage}` : "";
    exampleLabel.classList.toggle("d-none", !usage);
    feedback.classList.remove("d-none");
  }

  function completeStandardQuestion(isCorrect, selectedText, effectTarget) {
    const question = questions[currentIndex];
    locked = true;
    window.speechSynthesis?.cancel();
    questionCard.classList.add(isCorrect ? "answer-state-correct" : "answer-state-wrong");
    VB.playAnswerEffect(questionCard, effectTarget, isCorrect);
    if (isCorrect) {
      correctCount += 1;
    } else {
      wrongCount += 1;
      addMistake(question, selectedText);
    }
    showQuestionFeedback(question, isCorrect);
    nextButton.classList.remove("d-none");
    setProgress(currentIndex + 1);
    updateStats();
    saveProgress(currentIndex + 1, currentIndex + 1);
    nextButton.focus({ preventScroll: true });
  }

  function resolveTypedAnswer() {
    if (locked || session.classList.contains("d-none")) return;
    const question = questions[currentIndex];
    if (!question || !["typing", "listening"].includes(question.mode)) return;
    const typed = typingInput.value.trim();
    if (!typed) {
      typingInput.classList.add("is-invalid");
      typingInput.focus();
      return;
    }
    typingInput.classList.remove("is-invalid");
    typingInput.disabled = true;
    typingSubmit.disabled = true;
    const isCorrect = normalizeAnswer(typed) === normalizeAnswer(question.word);
    typingInput.classList.add(isCorrect ? "is-correct" : "is-wrong");
    completeStandardQuestion(isCorrect, typed, typingSubmit);
  }

  function updateMatchingSelection() {
    matchingWords.querySelectorAll("[data-match-word]").forEach(button => {
      button.classList.toggle("is-selected", button.dataset.matchWord === selectedMatchingWordId);
    });
    matchingMeanings.querySelectorAll("[data-match-meaning]").forEach(button => {
      button.classList.toggle("is-selected", button.dataset.matchMeaning === selectedMatchingMeaningId);
    });
  }

  function resolveMatchingPair() {
    if (!selectedMatchingWordId || !selectedMatchingMeaningId || matchingLocked) return;
    matchingLocked = true;
    const batch = currentMatchingBatch();
    const question = batch.find(item => item.id === selectedMatchingWordId);
    const wordButton = matchingWords.querySelector(`[data-match-word="${CSS.escape(selectedMatchingWordId)}"]`);
    const meaningButton = matchingMeanings.querySelector(`[data-match-meaning="${CSS.escape(selectedMatchingMeaningId)}"]`);
    const isCorrect = selectedMatchingWordId === selectedMatchingMeaningId;
    questionCard.classList.add(isCorrect ? "answer-state-correct" : "answer-state-wrong");
    VB.playAnswerEffect(questionCard, meaningButton, isCorrect);

    if (!isCorrect) {
      wordButton?.classList.add("is-wrong");
      meaningButton?.classList.add("is-wrong");
      matchingStatus.textContent = "Chưa đúng — thử ghép lại cặp này nhé.";
      if (question && !matchingFailedIds.has(question.id)) {
        matchingFailedIds.add(question.id);
        addMistake(question, meaningButton?.textContent.trim() || "Ghép sai nghĩa");
      }
      window.setTimeout(() => {
        wordButton?.classList.remove("is-wrong");
        meaningButton?.classList.remove("is-wrong");
        questionCard.classList.remove("answer-state-wrong");
        selectedMatchingWordId = "";
        selectedMatchingMeaningId = "";
        matchingLocked = false;
        updateMatchingSelection();
        saveProgress(currentIndex, currentIndex + matchingSolvedIds.size);
      }, 650);
      return;
    }

    wordButton?.classList.add("is-correct");
    meaningButton?.classList.add("is-correct");
    matchingSolvedIds.add(question.id);
    if (matchingFailedIds.has(question.id)) wrongCount += 1;
    else correctCount += 1;
    matchingStatus.textContent = `${question.word} — ${question.meaning}`;
    setProgress(currentIndex + matchingSolvedIds.size);
    updateStats();

    window.setTimeout(() => {
      questionCard.classList.remove("answer-state-correct");
      selectedMatchingWordId = "";
      selectedMatchingMeaningId = "";
      matchingLocked = false;
      if (matchingSolvedIds.size === batch.length) {
        currentIndex += batch.length;
        matchingSolvedIds = new Set();
        matchingFailedIds = new Set();
        matchingMeaningOrder = [];
        awaitingMatchingAdvance = true;
        locked = true;
        matchingStatus.textContent = currentIndex >= questions.length
          ? "Bạn đã ghép xong toàn bộ từ!"
          : "Hoàn thành nhóm này! Sẵn sàng cho 5 cặp tiếp theo.";
        nextButton.innerHTML = currentIndex >= questions.length
          ? 'Xem kết quả <i class="bi bi-flag-fill ms-1"></i>'
          : '5 cặp tiếp theo <i class="bi bi-arrow-right ms-1"></i>';
        nextButton.classList.remove("d-none");
        setProgress(currentIndex);
        saveProgress(currentIndex, currentIndex);
        nextButton.focus({ preventScroll: true });
      } else {
        renderMatchingQuestion();
      }
    }, 520);
  }

  function startPractice(type, key, mode = selectedMode) {
    const practiceSet = getPracticeSet(type, key);
    if (!practiceSet || practiceSet.words.length < 4) {
      VB.toast("Bộ từ này chưa đủ dữ liệu để tạo bài luyện.", "warning");
      return;
    }

    activeMode = practiceModes[mode] ? mode : "mixed";
    selectedMode = activeMode;
    localStorage.setItem(modeStorageKey, activeMode);
    updateModeSelection();
    activeSet = practiceSet;
    questions = buildQuestions(practiceSet, activeMode);
    currentIndex = 0;
    correctCount = 0;
    wrongCount = 0;
    mistakes = [];
    matchingSolvedIds = new Set();
    matchingFailedIds = new Set();
    matchingMeaningOrder = [];
    awaitingMatchingAdvance = false;
    intro.classList.add("d-none");
    modeSection.classList.add("d-none");
    levelSection.classList.add("d-none");
    result.classList.add("d-none");
    session.classList.remove("d-none");
    resumeSection.classList.add("d-none");
    window.scrollTo({ top: 0, behavior: "smooth" });
    saveProgress(0, 0);
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
    activeMode = practiceModes[saved.mode] ? saved.mode : "typing";
    selectedMode = activeMode;
    localStorage.setItem(modeStorageKey, selectedMode);
    updateModeSelection();
    questions = normalizeSavedQuestions(saved.questions);
    currentIndex = Number(saved.currentIndex) || 0;
    correctCount = Number(saved.correctCount) || 0;
    wrongCount = Number(saved.wrongCount);
    if (!Number.isFinite(wrongCount)) wrongCount = Math.max(0, currentIndex - correctCount);
    mistakes = Array.isArray(saved.mistakes) ? saved.mistakes : [];
    matchingSolvedIds = new Set(saved.matching?.solvedIds || []);
    matchingFailedIds = new Set(saved.matching?.failedIds || []);
    matchingMeaningOrder = Array.isArray(saved.matching?.meaningOrder) ? saved.matching.meaningOrder : [];
    locked = false;
    awaitingMatchingAdvance = false;
    intro.classList.add("d-none");
    modeSection.classList.add("d-none");
    levelSection.classList.add("d-none");
    result.classList.add("d-none");
    resumeSection.classList.add("d-none");
    session.classList.remove("d-none");
    window.scrollTo({ top: 0, behavior: "smooth" });
    renderQuestion();
    const answered = Math.min(Number(saved.answeredCount ?? currentIndex) || 0, questions.length);
    VB.toast(`Tiếp tục ${activeSet.title} tại ${answered}/${questions.length} · ${modeLabel(activeMode)}.`, "info");
  }

  function showSetSelection() {
    locked = true;
    window.speechSynthesis?.cancel();
    session.classList.add("d-none");
    result.classList.add("d-none");
    intro.classList.remove("d-none");
    modeSection.classList.remove("d-none");
    levelSection.classList.remove("d-none");
    renderLevelCards();
    renderTopicCards();
    renderResumeCard();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function finishPractice() {
    locked = true;
    window.speechSynthesis?.cancel();
    session.classList.add("d-none");
    result.classList.remove("d-none");
    const total = questions.length;
    const accuracy = total ? Math.round((correctCount / total) * 100) : 0;
    const bestScores = getBestScores();
    const key = scoreKey(activeSet.type, activeSet.key, activeMode);
    const best = Math.max(Math.min(bestScore(bestScores, activeSet.type, activeSet.key, activeMode), total), correctCount);
    bestScores[key] = best;
    localStorage.setItem("vb_practice_best_v1", JSON.stringify(bestScores));
    clearProgress();

    document.querySelector("#practiceResultLevel").textContent = `Hoàn thành ${activeSet.title} · ${modeLabel(activeMode)}`;
    document.querySelector("#practiceResultCopy").textContent = `Bạn đã hoàn thành ${total} câu trong bộ ${activeSet.title} và trả lời đúng ${correctCount} câu.`;
    document.querySelector("#resultCorrect").textContent = `${correctCount}/${total}`;
    document.querySelector("#resultAccuracy").textContent = `${accuracy}%`;
    document.querySelector("#resultBest").textContent = `${best}/${total}`;

    const mistakeSection = document.querySelector("#practiceMistakes");
    const mistakeList = document.querySelector("#practiceMistakeList");
    mistakeSection.classList.toggle("d-none", mistakes.length === 0);
    mistakeList.innerHTML = mistakes.map(item => `
      <div class="practice-mistake-item">
        <div><strong>${escapeHtml(item.word)}</strong><span>${escapeHtml(item.meaning)}</span></div>
        <small>Đáp án của bạn: ${escapeHtml(item.selected)}</small>
        ${item.usage ? `<small class="practice-mistake-example">${escapeHtml(item.usageLabel)}: ${escapeHtml(item.usage)}</small>` : ""}
      </div>`).join("");

    renderLevelCards();
    renderTopicCards();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  modeSection.addEventListener("click", event => {
    const button = event.target.closest("[data-practice-mode]");
    if (button) setSelectedMode(button.dataset.practiceMode);
  });

  levelGrid.addEventListener("click", event => {
    const button = event.target.closest("[data-practice-level]");
    if (button && !button.disabled) startPractice("level", button.dataset.practiceLevel);
  });

  topicGrid.addEventListener("click", event => {
    const button = event.target.closest("[data-practice-topic]");
    if (button && !button.disabled) startPractice("topic", button.dataset.practiceTopic);
  });

  typingForm.addEventListener("submit", event => {
    event.preventDefault();
    resolveTypedAnswer();
  });
  typingInput.addEventListener("input", () => typingInput.classList.remove("is-invalid"));
  listenButton.addEventListener("click", speakCurrentWord);

  matchingBoard.addEventListener("click", event => {
    if (matchingLocked || awaitingMatchingAdvance) return;
    const wordButton = event.target.closest("[data-match-word]");
    const meaningButton = event.target.closest("[data-match-meaning]");
    if (wordButton && !wordButton.disabled) selectedMatchingWordId = wordButton.dataset.matchWord;
    if (meaningButton && !meaningButton.disabled) selectedMatchingMeaningId = meaningButton.dataset.matchMeaning;
    updateMatchingSelection();
    resolveMatchingPair();
  });

  nextButton.addEventListener("click", () => {
    if (!locked) return;
    if (activeMode === "matching" && awaitingMatchingAdvance) {
      awaitingMatchingAdvance = false;
      renderQuestion();
      return;
    }
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
  document.querySelector("#practiceAgain").addEventListener("click", () => startPractice(activeSet.type, activeSet.key, activeMode));

  document.addEventListener("keydown", event => {
    if (session.classList.contains("d-none")) return;
    if (locked && event.key === "Enter" && !nextButton.classList.contains("d-none")) {
      event.preventDefault();
      nextButton.click();
      return;
    }
  });

  updateModeSelection();
  renderLevelCards();
  renderTopicCards();
  renderResumeCard();
});
