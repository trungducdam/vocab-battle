const VBPageTransition = (() => {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const startedAt = performance.now();
  const loader = document.createElement("div");
  loader.className = "page-loader";
  loader.setAttribute("role", "status");
  loader.setAttribute("aria-live", "polite");
  loader.innerHTML = `
    <div class="page-loader-card">
      <div class="page-loader-logo-wrap">
        <span class="page-loader-ring" aria-hidden="true"></span>
        <img class="page-loader-logo" src="assets/images/pororo.jpg" alt="Pororo">
      </div>
      <strong class="page-loader-title">Vocab Battle</strong>
      <span class="page-loader-message">Đang tải trang</span>
      <span class="page-loader-dots" aria-hidden="true"><i></i><i></i><i></i></span>
    </div>`;
  document.body.appendChild(loader);
  document.body.classList.add("page-is-loading");

  const message = loader.querySelector(".page-loader-message");

  function show(text = "Đang tải trang") {
    message.textContent = text;
    loader.classList.remove("is-hidden");
    loader.setAttribute("aria-hidden", "false");
    document.body.classList.add("page-is-loading");
  }

  function hide() {
    loader.classList.add("is-hidden");
    loader.setAttribute("aria-hidden", "true");
    document.body.classList.remove("page-is-loading", "page-is-leaving");
    document.body.classList.add("page-is-ready");
  }

  function finishInitialLoad() {
    const remaining = reduceMotion ? 0 : Math.max(0, 380 - (performance.now() - startedAt));
    window.setTimeout(hide, remaining);
  }

  function navigate(href, text = "Đang chuyển trang") {
    if (document.body.classList.contains("page-is-leaving")) return;
    show(text);
    document.body.classList.add("page-is-leaving");
    window.setTimeout(() => {
      window.location.href = href;
    }, reduceMotion ? 0 : 220);
  }

  if (document.readyState === "complete") finishInitialLoad();
  else window.addEventListener("load", finishInitialLoad, { once: true });

  window.addEventListener("pageshow", event => {
    if (event.persisted) hide();
  });

  document.addEventListener("click", event => {
    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    const link = event.target.closest("a[href]");
    if (!link || link.hasAttribute("download") || (link.target && link.target !== "_self")) return;
    const rawHref = link.getAttribute("href").trim();
    if (!rawHref || /^(#|mailto:|tel:|javascript:)/i.test(rawHref)) return;

    const target = new URL(link.href, window.location.href);
    if (!["http:", "https:", "file:"].includes(target.protocol) || target.origin !== window.location.origin) return;
    const sameDocument = target.pathname === window.location.pathname && target.search === window.location.search;
    if (sameDocument && target.hash) return;

    event.preventDefault();
    navigate(link.href);
  });

  return { show, hide, navigate };
})();

const VB = {
  getUser() {
    const user = JSON.parse(localStorage.getItem("vb_user") || "null");
    if (user && !user.role) user.role = "User";
    return user;
  },

  setUser(user) {
    localStorage.setItem("vb_user", JSON.stringify(user));
    this.renderLayout();
  },

  navigate(href, message) {
    VBPageTransition.navigate(href, message);
  },

  logout() {
    localStorage.removeItem("vb_user");
    this.navigate("index.html", "Đang đăng xuất");
  },

  toast(message, type = "primary") {
    let container = document.querySelector(".toast-container");
    if (!container) {
      container = document.createElement("div");
      container.className = "toast-container position-fixed top-0 end-0 p-3";
      document.body.appendChild(container);
    }

    const toast = document.createElement("div");
    toast.className = `toast text-bg-${type} border-0`;
    toast.setAttribute("role", "alert");
    toast.innerHTML = `
      <div class="d-flex">
        <div class="toast-body">${message}</div>
        <button class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Đóng"></button>
      </div>`;
    container.appendChild(toast);
    const instance = new bootstrap.Toast(toast, { delay: 2600 });
    toast.addEventListener("hidden.bs.toast", () => toast.remove());
    instance.show();
  },

  renderLayout() {
    const user = this.getUser();
    const current = document.body.dataset.page || "home";
    const navItems = [
      ["home", "index.html", "Trang chủ"],
      ["vocabulary", "vocabulary.html", "Từ vựng"],
      ["room", "room.html", "Đấu trường"],
      ["leaderboard", "leaderboard.html", "Xếp hạng"]
    ];
    const nav = document.querySelector("#siteNav");
    const footer = document.querySelector("#siteFooter");

    if (nav) {
      nav.innerHTML = `
        <nav class="navbar navbar-expand-lg navbar-dark navbar-vb sticky-top">
          <div class="container">
            <a class="navbar-brand d-flex align-items-center" href="index.html" aria-label="Pororo Vocab Battle - Trang chủ">
              <img class="brand-mark" src="assets/images/pororo.jpg" alt="Pororo">
              <span class="brand-name">Poro<span>ro</span></span>
            </a>
            <button class="navbar-toggler border-0" type="button" data-bs-toggle="collapse" data-bs-target="#mainNav" aria-controls="mainNav" aria-expanded="false" aria-label="Mở menu">
              <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="mainNav">
              <ul class="navbar-nav mx-auto gap-lg-2">
                ${navItems.map(([key, href, label]) => `<li class="nav-item"><a class="nav-link px-3 ${current === key ? "active" : ""}" href="${href}">${label}</a></li>`).join("")}
              </ul>
              <div class="d-flex align-items-center gap-2">
                ${user ? `
                  <a class="btn btn-outline-vb rounded-pill px-3" href="profile.html"><i class="bi ${user.role === "Admin" ? "bi-shield-lock" : "bi-person-circle"} me-1"></i>${user.username}${user.role === "Admin" ? '<span class="role-pill ms-1">Admin</span>' : ""}</a>
                  <button class="btn btn-vb rounded-pill px-3" id="logoutButton">Đăng xuất</button>
                ` : `
                  <a class="btn btn-outline-vb rounded-pill px-3" href="login.html">Đăng nhập</a>
                  <a class="btn btn-vb rounded-pill px-3" href="register.html">Tham gia</a>
                `}
              </div>
            </div>
          </div>
        </nav>`;
      document.querySelector("#logoutButton")?.addEventListener("click", () => this.logout());
    }

    if (footer) {
      footer.innerHTML = `
        <footer class="site-footer">
          <div class="container d-flex flex-column flex-md-row justify-content-between gap-2">
            <span>© 2026 Pororo Vocab Battle. Học nhanh, đấu chất.</span>
          </div>
        </footer>`;
    }
  },

  requireLogin() {
    if (!this.getUser()) {
      sessionStorage.setItem("vb_redirect", window.location.pathname.split("/").pop());
      this.navigate("login.html", "Đang mở trang đăng nhập");
      return false;
    }
    return true;
  }
};

document.addEventListener("DOMContentLoaded", () => VB.renderLayout());
