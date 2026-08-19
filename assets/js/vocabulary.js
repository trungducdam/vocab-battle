document.addEventListener("DOMContentLoaded", () => {
  const user = VB.getUser();
  const isAdmin = user?.role === "Admin";
  let activeBank = "public";
  let publicWords = getPublicVocabulary();
  let publicIdioms = getPublicIdioms();
  let personalWords = getPersonalVocabulary();
  let currentPage = 1;
  const pageSize = 25;

  const list = document.querySelector("#wordList");
  const search = document.querySelector("#wordSearch");
  const level = document.querySelector("#levelFilter");
  const levelButtons = document.querySelector("#levelFilterButtons");
  const searchColumn = document.querySelector("#wordSearchColumn");
  const levelFilterColumn = document.querySelector("#levelFilterColumn");
  const resultCount = document.querySelector("#wordResultCount");
  const pagination = document.querySelector("#wordPagination");
  const form = document.querySelector("#wordForm");
  const modalElement = document.querySelector("#wordModal");
  const modal = new bootstrap.Modal(modalElement);
  const importModalElement = document.querySelector("#importModal");
  const importModal = new bootstrap.Modal(importModalElement);
  const publicTab = document.querySelector("#publicBankTab");
  const idiomTab = document.querySelector("#idiomBankTab");
  const personalTab = document.querySelector("#personalBankTab");
  const addButton = document.querySelector("#addWord");
  const uploadButton = document.querySelector("#uploadWords");
  const levelField = document.querySelector("#levelField");
  const categoryField = document.querySelector("#categoryField");
  const wordFieldLabel = document.querySelector("#wordFieldLabel");

  function escapeHtml(value) {
    return String(value).replace(/[&<>'"]/g, character => ({
      "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;"
    })[character]);
  }

  function pronunciationDetails(term) {
    const pronunciation = typeof VBPronunciation === "undefined" ? null : VBPronunciation.get(term);
    const cambridgeUrl = typeof VBPronunciation === "undefined" ? "https://dictionary.cambridge.org/vi/dictionary/english/" : VBPronunciation.cambridgeUrl(term);
    const variants = [
      pronunciation?.uk ? `<span class="pronunciation-variant"><b>UK</b> <span class="ipa-text">${escapeHtml(pronunciation.uk)}</span></span>` : "",
      pronunciation?.us ? `<span class="pronunciation-variant"><b>US</b> <span class="ipa-text">${escapeHtml(pronunciation.us)}</span></span>` : ""
    ].filter(Boolean).join("");
    const missing = variants ? "" : '<span class="pronunciation-missing">Chưa có IPA trong nguồn mở</span>';
    return `<div class="word-pronunciation-row"><i class="bi bi-soundwave" aria-hidden="true"></i>${variants}${missing}<a class="cambridge-lookup" href="${escapeHtml(cambridgeUrl)}" target="_blank" rel="noopener noreferrer" aria-label="Kiểm tra phát âm của ${escapeHtml(term)} trên Cambridge Dictionary"><i class="bi bi-box-arrow-up-right"></i> Cambridge</a></div>`;
  }

  function currentWords() {
    if (activeBank === "personal") return personalWords;
    if (activeBank === "idioms") return publicIdioms;
    return publicWords;
  }

  function canEditCurrentBank() {
    return ((activeBank === "public" || activeBank === "idioms") && isAdmin) || (activeBank === "personal" && Boolean(user) && !isAdmin);
  }

  function persist() {
    if (activeBank === "public") savePublicVocabulary(publicWords);
    else if (activeBank === "idioms") savePublicIdioms(publicIdioms);
    else savePersonalVocabulary(personalWords);
    render();
  }

  function updatePermissions() {
    const personalMode = activeBank === "personal";
    const idiomMode = activeBank === "idioms";
    const showLevelFilter = activeBank === "public";
    levelFilterColumn.classList.toggle("d-none", !showLevelFilter);
    searchColumn.classList.toggle("col-lg-6", showLevelFilter);
    searchColumn.classList.toggle("col-lg-12", !showLevelFilter);
    publicTab.classList.toggle("active", activeBank === "public");
    idiomTab.classList.toggle("active", idiomMode);
    personalTab.classList.toggle("active", personalMode);
    addButton.classList.toggle("d-none", !canEditCurrentBank());
    uploadButton.classList.toggle("d-none", !(personalMode && user && !isAdmin));
    addButton.innerHTML = idiomMode ? '<i class="bi bi-plus-lg me-2"></i>Thêm idiom' : '<i class="bi bi-plus-lg me-2"></i>Thêm từ';
    search.placeholder = idiomMode ? "Tìm theo idiom, nghĩa hoặc ví dụ..." : "Tìm theo từ, nghĩa hoặc ví dụ...";

    if (isAdmin) {
      personalTab.classList.add("d-none");
    }
  }

  function render() {
    const words = currentWords();
    const query = search.value.trim().toLowerCase();
    const selectedLevel = activeBank === "public" ? level.value : "";
    const filtered = words.filter(item =>
      (!query || `${item.word} ${item.meaning} ${(item.meanings || []).join(" ")} ${item.example || ""} ${item.collocation || ""} ${item.topic || ""} ${(item.topics || []).join(" ")}`.toLowerCase().includes(query)) &&
      (!selectedLevel || String(item.level) === selectedLevel)
    );
    const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
    currentPage = Math.min(currentPage, totalPages);
    const visibleWords = filtered.slice((currentPage - 1) * pageSize, currentPage * pageSize);
    const idiomMode = activeBank === "idioms";
    const bankLabel = activeBank === "personal" ? "trong kho riêng" : idiomMode ? "trong mục Idioms" : "trong kho chung";
    resultCount.textContent = `${filtered.length} ${idiomMode ? "idiom" : "từ"} ${bankLabel}${selectedLevel ? ` · CEFR ${selectedLevel}` : ""}`;

    list.innerHTML = visibleWords.length ? visibleWords.map(item => {
      const usageText = String(item.example || item.collocation || "").trim();
      const usageLabel = item.example ? "Ví dụ" : "Collocation";
      const hasUsage = Boolean(usageText);
      const detailId = `word-example-${activeBank}-${String(item.id).replace(/[^a-zA-Z0-9_-]/g, "-")}`;
      const pronunciationHtml = pronunciationDetails(item.word);
      const icon = activeBank === "personal" ? "bi-folder2-open" : idiomMode ? "bi-chat-quote" : "bi-translate";
      const summary = `
        <div class="word-summary-content d-flex align-items-center gap-3">
          <div class="feature-icon mb-0"><i class="bi ${icon}"></i></div>
          <div class="flex-grow-1">
            <div class="d-flex flex-wrap align-items-center gap-2">
              <h5 class="mb-0">${escapeHtml(item.word)}</h5>
              ${idiomMode ? "" : `<span class="badge badge-soft-primary">CEFR ${escapeHtml(item.sourceLevel || item.level || "A1")}</span>`}
              <span class="badge badge-soft-success">${escapeHtml(item.category || item.partOfSpeech || "Từ vựng")}</span>
              ${item.topic ? `<span class="badge practice-topic-badge">${escapeHtml(item.topic)}${item.topics?.length > 1 ? ` +${item.topics.length - 1}` : ""}</span>` : ""}
            </div>
            <p class="text-muted-vb mb-0 mt-1">${escapeHtml(item.meaning)}</p>
          </div>
          <i class="bi bi-chevron-down word-toggle-icon" aria-hidden="true"></i>
        </div>`;
      return `
        <div class="word-list-item" data-id="${escapeHtml(item.id)}">
          <div class="word-list-summary d-flex align-items-center gap-2">
            <button class="word-toggle flex-grow-1" type="button" aria-expanded="false" aria-controls="${detailId}">${summary}</button>
            ${canEditCurrentBank() ? `<div class="d-flex gap-2"><button class="btn btn-sm btn-outline-vb edit-word" aria-label="Sửa ${escapeHtml(item.word)}"><i class="bi bi-pencil"></i></button><button class="btn btn-sm btn-outline-danger delete-word" aria-label="Xóa ${escapeHtml(item.word)}"><i class="bi bi-trash"></i></button></div>` : ""}
          </div>
          <div class="word-example" id="${detailId}" hidden>${pronunciationHtml}${hasUsage ? `<div class="word-example-label"><i class="bi bi-lightbulb me-2"></i>${usageLabel}</div><p class="mb-0">${escapeHtml(usageText)}</p>` : ""}</div>
        </div>`;
    }).join("") : `<div class="text-center py-5 text-muted-vb"><i class="bi bi-${activeBank === "personal" ? "folder-plus" : idiomMode ? "chat-quote" : "search"} fs-1"></i><p class="mt-2">${activeBank === "personal" ? "Kho riêng chưa có từ. Hãy tải DOCX/PDF hoặc thêm thủ công." : idiomMode ? "Không tìm thấy idiom phù hợp." : "Không tìm thấy từ phù hợp."}</p></div>`;

    pagination.innerHTML = totalPages > 1 ? `<button class="btn btn-sm btn-outline-vb" data-page="${currentPage - 1}" ${currentPage === 1 ? "disabled" : ""}><i class="bi bi-chevron-left"></i></button><span class="small text-muted-vb px-2">Trang ${currentPage}/${totalPages}</span><button class="btn btn-sm btn-outline-vb" data-page="${currentPage + 1}" ${currentPage === totalPages ? "disabled" : ""}><i class="bi bi-chevron-right"></i></button>` : "";
    updatePermissions();
  }

  function switchBank(bank) {
    if (bank === "personal" && !user) {
      sessionStorage.setItem("vb_redirect", "vocabulary.html");
      VB.navigate("login.html", "Đang mở trang đăng nhập");
      return;
    }
    if (bank === "personal" && isAdmin) return;
    activeBank = bank;
    currentPage = 1;
    search.value = "";
    level.value = "";
    levelButtons.querySelectorAll("[data-level]").forEach(button => button.classList.toggle("active", button.dataset.level === ""));
    render();
  }

  function categoryFromCode(code) {
    const normalized = String(code || "").trim().toLowerCase();
    return ({ n: "Danh từ", v: "Động từ", adj: "Tính từ", adv: "Trạng từ", "n/v": "Danh từ / Động từ", "v/n": "Động từ / Danh từ" })[normalized] || code || "Từ vựng";
  }

  function createImportedWord(word, meaning, partOfSpeech, defaultLevel, index) {
    return {
      id: Date.now() + index,
      word: String(word).trim(),
      meaning: String(meaning).trim(),
      level: defaultLevel,
      partOfSpeech: String(partOfSpeech || "").trim(),
      category: categoryFromCode(partOfSpeech)
    };
  }

  function isHeader(word, meaning) {
    const joined = `${word} ${meaning}`.toLowerCase();
    return joined.includes("từ vựng") || joined.includes("nghĩa tiếng việt") || joined.includes("vocabulary meaning");
  }

  function parseTextLines(text, defaultLevel) {
    const results = [];
    String(text).split(/\r?\n/).forEach((rawLine, index) => {
      const line = rawLine.replace(/^\s*\d+[.)]?\s*/, "").trim();
      if (!line || line.length > 400) return;
      let word = "";
      let meaning = "";
      let partOfSpeech = "";
      const coded = line.match(/^([A-Za-z][A-Za-z' -]*?)\s+(n\/v|v\/n|adj|adv|prep|conj|pron|n|v)\s+(.+)$/i);
      const separated = line.split(/\t+|\s{2,}|\s+[-–—:]\s+/).map(item => item.trim()).filter(Boolean);
      if (coded) {
        [, word, partOfSpeech, meaning] = coded;
      } else if (separated.length >= 2 && /^[A-Za-z][A-Za-z' -]*$/.test(separated[0])) {
        word = separated[0];
        meaning = separated.at(-1);
        partOfSpeech = separated.length > 2 ? separated[1] : "";
      }
      if (word && meaning && !isHeader(word, meaning)) results.push(createImportedWord(word, meaning, partOfSpeech, defaultLevel, index));
    });
    return results;
  }

  async function parseDocx(file, defaultLevel) {
    if (!window.mammoth) throw new Error("Không tải được bộ đọc Word.");
    const result = await mammoth.convertToHtml({ arrayBuffer: await file.arrayBuffer() });
    const container = document.createElement("div");
    container.innerHTML = result.value;
    const records = [];
    container.querySelectorAll("table tr").forEach((row, index) => {
      const cells = [...row.querySelectorAll("th,td")].map(cell => cell.textContent.trim()).filter(Boolean);
      if (cells.length < 2) return;
      const hasNumber = /^\d+$/.test(cells[0]);
      const word = hasNumber ? cells[1] : cells[0];
      const meaning = cells.at(-1);
      const partOfSpeech = cells.length >= 4 ? cells[2] : cells.length === 3 && !hasNumber ? cells[1] : "";
      if (word && meaning && word !== meaning && !isHeader(word, meaning)) records.push(createImportedWord(word, meaning, partOfSpeech, defaultLevel, index));
    });
    return records.length ? records : parseTextLines(container.innerText, defaultLevel);
  }

  async function parsePdf(file, defaultLevel) {
    if (!window.pdfjsLib) throw new Error("Không tải được bộ đọc PDF.");
    pdfjsLib.GlobalWorkerOptions.workerSrc = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";
    const pdf = await pdfjsLib.getDocument({ data: new Uint8Array(await file.arrayBuffer()) }).promise;
    const lines = [];
    for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber += 1) {
      const page = await pdf.getPage(pageNumber);
      const content = await page.getTextContent();
      const rows = new Map();
      content.items.forEach(item => {
        const y = Math.round(item.transform[5]);
        if (!rows.has(y)) rows.set(y, []);
        rows.get(y).push({ x: item.transform[4], text: item.str });
      });
      [...rows.entries()].sort((a, b) => b[0] - a[0]).forEach(([, items]) => lines.push(items.sort((a, b) => a.x - b.x).map(item => item.text).join("\t")));
    }
    return parseTextLines(lines.join("\n"), defaultLevel);
  }

  function mergeImportedWords(imported) {
    const existingKeys = new Set(personalWords.map(item => `${item.word}|${item.meaning}`.toLowerCase()));
    const unique = imported.filter(item => {
      const key = `${item.word}|${item.meaning}`.toLowerCase();
      if (existingKeys.has(key)) return false;
      existingKeys.add(key);
      return true;
    });
    personalWords = [...unique, ...personalWords];
    savePersonalVocabulary(personalWords);
    return unique.length;
  }

  publicTab.addEventListener("click", () => switchBank("public"));
  idiomTab.addEventListener("click", () => switchBank("idioms"));
  personalTab.addEventListener("click", () => switchBank("personal"));
  search.addEventListener("input", () => { currentPage = 1; render(); });
  level.addEventListener("change", () => { currentPage = 1; render(); });
  levelButtons.addEventListener("click", event => {
    const button = event.target.closest("[data-level]");
    if (!button) return;
    level.value = button.dataset.level;
    levelButtons.querySelectorAll("[data-level]").forEach(item => item.classList.toggle("active", item === button));
    level.dispatchEvent(new Event("change"));
  });
  pagination.addEventListener("click", event => {
    const button = event.target.closest("[data-page]");
    if (!button || button.disabled) return;
    currentPage = Number(button.dataset.page);
    render();
    list.scrollIntoView({ behavior: "smooth", block: "start" });
  });

  addButton.addEventListener("click", () => {
    if (!canEditCurrentBank()) return;
    const idiomMode = activeBank === "idioms";
    form.reset();
    form.wordId.value = "";
    levelField.classList.toggle("d-none", idiomMode);
    categoryField.classList.toggle("d-none", idiomMode);
    wordFieldLabel.textContent = idiomMode ? "Idiom tiếng Anh" : "Từ tiếng Anh";
    document.querySelector("#wordModalLabel").textContent = idiomMode ? "Thêm idiom" : activeBank === "public" ? "Thêm từ vào kho chung" : "Thêm từ vào kho riêng";
    modal.show();
  });

  uploadButton.addEventListener("click", () => {
    document.querySelector("#importForm").reset();
    document.querySelector("#importStatus").textContent = "";
    importModal.show();
  });

  list.addEventListener("click", event => {
    const item = event.target.closest("[data-id]");
    if (!item) return;
    const toggle = event.target.closest(".word-toggle");
    if (toggle) {
      const detail = document.querySelector(`#${toggle.getAttribute("aria-controls")}`);
      const expanded = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", String(!expanded));
      detail.hidden = expanded;
      toggle.querySelector(".word-toggle-icon")?.classList.toggle("is-open", !expanded);
      return;
    }
    if (!canEditCurrentBank()) return;
    const words = currentWords();
    const selectedWord = words.find(entry => String(entry.id) === item.dataset.id);
    if (!selectedWord) return;
    if (event.target.closest(".edit-word")) {
      const idiomMode = activeBank === "idioms";
      form.wordId.value = selectedWord.id;
      form.word.value = selectedWord.word;
      form.meaning.value = selectedWord.meaning;
      form.example.value = selectedWord.example || "";
      form.level.value = idiomMode ? "A1" : selectedWord.level || "A1";
      form.category.value = idiomMode ? "Danh từ" : selectedWord.category || "Danh từ";
      levelField.classList.toggle("d-none", idiomMode);
      categoryField.classList.toggle("d-none", idiomMode);
      wordFieldLabel.textContent = idiomMode ? "Idiom tiếng Anh" : "Từ tiếng Anh";
      document.querySelector("#wordModalLabel").textContent = idiomMode ? "Chỉnh sửa idiom" : "Chỉnh sửa từ";
      modal.show();
    }
    if (event.target.closest(".delete-word")) {
      if (activeBank === "public") publicWords = publicWords.filter(entry => String(entry.id) !== item.dataset.id);
      else if (activeBank === "idioms") publicIdioms = publicIdioms.filter(entry => String(entry.id) !== item.dataset.id);
      else personalWords = personalWords.filter(entry => String(entry.id) !== item.dataset.id);
      persist();
      VB.toast(`Đã xóa “${selectedWord.word}”`, "danger");
    }
  });

  form.addEventListener("submit", event => {
    event.preventDefault();
    if (!canEditCurrentBank() || !form.checkValidity()) {
      form.classList.add("was-validated");
      return;
    }
    const idiomMode = activeBank === "idioms";
    const payload = {
      id: form.wordId.value || (idiomMode ? `idiom-${Date.now()}` : Date.now()),
      word: form.word.value.trim(),
      meaning: form.meaning.value.trim(),
      example: form.example.value.trim(),
      level: idiomMode ? "IDIOM" : form.level.value,
      partOfSpeech: idiomMode ? "idiom" : "",
      category: idiomMode ? "Idiom" : form.category.value
    };
    const words = currentWords();
    const index = words.findIndex(entry => String(entry.id) === String(payload.id));
    if (index >= 0) words[index] = payload; else words.unshift(payload);
    if (activeBank === "public") publicWords = words;
    else if (activeBank === "idioms") publicIdioms = words;
    else if (activeBank === "personal") personalWords = words;
    persist();
    modal.hide();
    form.classList.remove("was-validated");
    VB.toast(index >= 0 ? "Đã cập nhật từ" : "Đã thêm từ mới", "success");
  });

  document.querySelector("#importForm").addEventListener("submit", async event => {
    event.preventDefault();
    const file = document.querySelector("#vocabularyFile").files[0];
    const defaultLevel = document.querySelector("#importLevel").value;
    const status = document.querySelector("#importStatus");
    if (!file) return;
    if (file.size > 10 * 1024 * 1024) {
      status.className = "small text-danger";
      status.textContent = "File vượt quá giới hạn 10 MB.";
      return;
    }
    status.className = "small text-info";
    status.textContent = `Đang đọc ${file.name}...`;
    try {
      const extension = file.name.split(".").pop().toLowerCase();
      const imported = extension === "docx" ? await parseDocx(file, defaultLevel) : extension === "pdf" ? await parsePdf(file, defaultLevel) : [];
      if (!imported.length) throw new Error("Không nhận diện được cặp từ và nghĩa. Hãy kiểm tra định dạng file.");
      const added = mergeImportedWords(imported);
      status.className = "small text-success";
      status.textContent = `Đã nhận diện ${imported.length} dòng và thêm ${added} từ mới sau khi loại trùng.`;
      activeBank = "personal";
      currentPage = 1;
      render();
      VB.toast(`Đã thêm ${added} từ vào kho riêng`, "success");
    } catch (error) {
      status.className = "small text-danger";
      status.textContent = error.message || "Không thể đọc file này.";
    }
  });

  render();
});
