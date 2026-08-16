document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("#authForm");
  if (!form) return;
  let pendingUser = null;

  const password = document.querySelector("#password");
  const confirmPassword = document.querySelector("#confirmPassword");
  const toggle = document.querySelector("#togglePassword");

  toggle?.addEventListener("click", () => {
    const nextType = password.type === "password" ? "text" : "password";
    password.type = nextType;
    if (confirmPassword) confirmPassword.type = nextType;
    toggle.innerHTML = `<i class="bi bi-eye${nextType === "text" ? "-slash" : ""}"></i>`;
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    form.classList.add("was-validated");
    if (!form.checkValidity()) return;

    if (confirmPassword && password.value !== confirmPassword.value) {
      confirmPassword.setCustomValidity("Mật khẩu không khớp");
      form.classList.add("was-validated");
      confirmPassword.addEventListener("input", () => confirmPassword.setCustomValidity(""), { once: true });
      return;
    }

    const usernameField = document.querySelector("#username");
    const emailField = document.querySelector("#email");
    const username = usernameField?.value.trim() || emailField.value.split("@")[0];
    const userData = { username, email: emailField.value.trim(), role: "User", elo: 0, matches: 0, wins: 0, winRate: 0, avatar: null };

    if (form.dataset.mode === "register") {
      pendingUser = userData;
      new bootstrap.Modal(document.querySelector("#registerOtpModal")).show();
      VB.toast("Đã gửi mã xác nhận demo 123456 tới email của bạn", "info");
      return;
    }

    VB.setUser(userData);
    VB.toast("Đăng nhập thành công!", "success");

    setTimeout(() => {
      const redirect = sessionStorage.getItem("vb_redirect") || "profile.html";
      sessionStorage.removeItem("vb_redirect");
      VB.navigate(redirect, "Đăng nhập thành công");
    }, 500);
  });

  document.querySelector("#registerOtpForm")?.addEventListener("submit", event => {
    event.preventDefault();
    const code = document.querySelector("#registerOtpCode");
    if (!pendingUser || code.value !== "123456") {
      code.classList.add("is-invalid");
      return;
    }
    VB.setUser(pendingUser);
    bootstrap.Modal.getInstance(document.querySelector("#registerOtpModal"))?.hide();
    VB.toast("Email đã được xác nhận. Tạo tài khoản thành công!", "success");
    setTimeout(() => VB.navigate("profile.html", "Đang mở hồ sơ"), 500);
  });

  document.querySelectorAll("[data-social-login]").forEach(button => {
    button.addEventListener("click", () => {
      const provider = button.dataset.socialLogin;
      const isFacebook = provider === "facebook";
      VB.setUser({
        username: isFacebook ? "Facebook Player" : "Google Player",
        email: isFacebook ? "player@facebook.demo" : "player@gmail.demo",
        elo: 0,
        matches: 0,
        wins: 0,
        winRate: 0,
        avatar: isFacebook ? "assets/images/pororo.jpg" : null,
        role: "User",
        provider
      });
      VB.toast(`Đã xác thực ${isFacebook ? "Facebook" : "Google"} ở chế độ demo`, "success");
      setTimeout(() => VB.navigate("profile.html", "Đang mở hồ sơ"), 500);
    });
  });

  const otpModalElement = document.querySelector("#otpModal");
  const otpForm = document.querySelector("#otpForm");
  const otpEmail = document.querySelector("#otpEmail");
  const otpCode = document.querySelector("#otpCode");
  let otpSent = false;

  document.querySelector("#sendOtp")?.addEventListener("click", () => {
    if (!otpEmail.checkValidity()) {
      otpEmail.classList.add("is-invalid");
      return;
    }
    otpSent = true;
    otpEmail.classList.remove("is-invalid");
    otpCode.disabled = false;
    otpCode.focus();
    VB.toast("Mã demo là 123456. Bản production sẽ gửi mã qua Gmail.", "info");
  });

  otpForm?.addEventListener("submit", event => {
    event.preventDefault();
    if (!otpSent || otpCode.value !== "123456") {
      otpCode.classList.add("is-invalid");
      return;
    }
    const email = otpEmail.value.trim();
    VB.setUser({ username: email.split("@")[0], email, role: "User", elo: 0, matches: 0, wins: 0, winRate: 0, avatar: null, provider: "otp" });
    bootstrap.Modal.getInstance(otpModalElement)?.hide();
    VB.toast("Xác thực OTP thành công", "success");
    setTimeout(() => VB.navigate("profile.html", "Đang mở hồ sơ"), 500);
  });

  document.querySelector("#adminLoginForm")?.addEventListener("submit", event => {
    event.preventDefault();
    const adminEmail = document.querySelector("#adminEmail");
    const adminPassword = document.querySelector("#adminPassword");
    const isValid = adminEmail.value.trim().toLowerCase() === "admin@pororo.vn" && adminPassword.value === "Admin@123";
    if (!isValid) {
      adminPassword.classList.add("is-invalid");
      return;
    }
    VB.setUser({ username: "Pororo Admin", email: adminEmail.value.trim(), role: "Admin", elo: 0, matches: 0, wins: 0, winRate: 0, avatar: "assets/images/pororo.jpg" });
    bootstrap.Modal.getInstance(document.querySelector("#adminLoginModal"))?.hide();
    VB.toast("Đăng nhập quản trị thành công", "success");
    setTimeout(() => VB.navigate("vocabulary.html", "Đang mở kho từ vựng"), 500);
  });
});
