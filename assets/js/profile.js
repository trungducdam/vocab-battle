document.addEventListener("DOMContentLoaded", () => {
  if (!VB.requireLogin()) return;

  const user = VB.getUser();
  const elements = {
    profileName: document.querySelector("#profileName"), profileEmail: document.querySelector("#profileEmail"),
    profileInitial: document.querySelector("#profileInitial"), displayName: document.querySelector("#displayName"),
    profileEmailInput: document.querySelector("#profileEmailInput"), bio: document.querySelector("#bio"),
    profileForm: document.querySelector("#profileForm"), profileElo: document.querySelector("#profileElo"),
    profileMatches: document.querySelector("#profileMatches"), profileWinRate: document.querySelector("#profileWinRate"),
    profileRole: document.querySelector("#profileRole")
  };
  const monthNames = ["Thg 1", "Thg 2", "Thg 3", "Thg 4", "Thg 5", "Thg 6", "Thg 7", "Thg 8", "Thg 9", "Thg 10", "Thg 11", "Thg 12"];
  const dateFormatter = new Intl.DateTimeFormat("vi-VN", { day: "numeric", month: "long", year: "numeric" });

  function renderAvatar() {
    elements.profileInitial.replaceChildren();
    if (user.avatar) {
      const image = document.createElement("img");
      image.src = user.avatar;
      image.alt = `Ảnh đại diện ${user.username}`;
      elements.profileInitial.appendChild(image);
      return;
    }
    elements.profileInitial.textContent = user.username.slice(0, 3).toUpperCase();
  }

  function renderProfile() {
    elements.profileName.textContent = user.username;
    elements.profileEmail.textContent = user.email;
    elements.displayName.value = user.username;
    elements.profileEmailInput.value = user.email;
    elements.bio.value = user.bio || "";
    elements.profileElo.textContent = user.elo ?? 0;
    elements.profileMatches.textContent = user.matches ?? 0;
    elements.profileWinRate.textContent = `${user.winRate ?? 0}%`;
    elements.profileRole.textContent = user.role === "Admin" ? "Administrator" : "User";
    elements.profileRole.className = `badge ${user.role === "Admin" ? "badge-soft-warning" : "badge-soft-primary"} rounded-pill px-3 py-2`;
    document.querySelector("#firstVictoryBadge").textContent = Number(user.wins || 0) > 0 ? "Đã mở khóa" : "Chưa mở khóa";
    renderAvatar();
  }

  function heatmapLevel(count) {
    if (count <= 0) return 0;
    if (count <= 2) return 1;
    if (count <= 5) return 2;
    if (count <= 9) return 3;
    return 4;
  }

  function createCalendarWeeks(today) {
    const firstDate = new Date(today);
    firstDate.setDate(firstDate.getDate() - 364);
    firstDate.setDate(firstDate.getDate() - firstDate.getDay());
    const lastDate = new Date(today);
    lastDate.setDate(lastDate.getDate() + (6 - lastDate.getDay()));
    const weeks = [];
    const cursor = new Date(firstDate);
    while (cursor <= lastDate) {
      const week = [];
      for (let day = 0; day < 7; day += 1) {
        week.push(new Date(cursor));
        cursor.setDate(cursor.getDate() + 1);
      }
      weeks.push(week);
    }
    return weeks;
  }

  function renderHeatmap() {
    const activity = VB.getLearningActivity();
    const stats = VB.getLearningStats(activity);
    const today = new Date();
    today.setHours(12, 0, 0, 0);
    const weeks = createCalendarWeeks(today);
    const heatmap = document.querySelector("#learningHeatmap");
    const months = document.querySelector("#learningHeatmapMonths");
    const fragment = document.createDocumentFragment();
    heatmap.style.setProperty("--heatmap-weeks", weeks.length);
    months.style.setProperty("--heatmap-weeks", weeks.length);
    heatmap.replaceChildren();
    months.replaceChildren();

    let previousMonth = -1;
    weeks.forEach((week, weekIndex) => {
      const monthMarker = week.find(date => date.getDate() <= 7) || (weekIndex === 0 ? week[0] : null);
      const label = document.createElement("span");
      if (monthMarker && monthMarker.getMonth() !== previousMonth) {
        label.textContent = monthNames[monthMarker.getMonth()];
        previousMonth = monthMarker.getMonth();
      }
      months.appendChild(label);

      week.forEach(date => {
        const dateKey = VB.getLocalDateKey(date);
        const isFuture = date > today;
        const count = isFuture ? 0 : Number(activity.days[dateKey]?.total || 0);
        const cell = document.createElement("button");
        cell.type = "button";
        cell.tabIndex = -1;
        cell.className = `heatmap-cell ${isFuture ? "is-future" : `level-${heatmapLevel(count)}`}`;
        cell.setAttribute("role", "gridcell");
        if (isFuture) {
          cell.disabled = true;
          cell.setAttribute("aria-hidden", "true");
        } else {
          const labelText = `${dateFormatter.format(date)}: ${count} hoạt động`;
          cell.title = labelText;
          cell.setAttribute("aria-label", labelText);
        }
        fragment.appendChild(cell);
      });
    });
    heatmap.appendChild(fragment);

    const visibleStart = weeks[0][0];
    const visibleActivities = Object.entries(activity.days).reduce((sum, [dateKey, value]) => {
      const [year, month, day] = dateKey.split("-").map(Number);
      const date = new Date(year, month - 1, day, 12);
      return date >= visibleStart && date <= today ? sum + Number(value.total || 0) : sum;
    }, 0);
    document.querySelector("#learningActivitySummary").textContent = visibleActivities
      ? `${visibleActivities.toLocaleString("vi-VN")} lượt học trong 365 ngày qua`
      : "Chưa có hoạt động trong 365 ngày qua.";
    document.querySelector("#profileCurrentStreak").textContent = `${stats.currentStreak} ngày`;
    document.querySelector("#profileLongestStreak").textContent = `${stats.longestStreak} ngày`;
    document.querySelector("#activityCurrentStreak").textContent = stats.currentStreak;
    document.querySelector("#activityLongestStreak").textContent = stats.longestStreak;
    document.querySelector("#activityActiveDays").textContent = stats.activeDays;
    document.querySelector("#streakAchievementTitle").textContent = stats.currentStreak ? `Chuỗi ${stats.currentStreak} ngày` : "Bắt đầu chuỗi học";
    document.querySelector("#streakAchievementCopy").textContent = stats.todayActivities
      ? `Hôm nay bạn đã hoàn thành ${stats.todayActivities} lượt học`
      : stats.currentStreak ? "Học hôm nay để duy trì chuỗi hiện tại" : "Hoàn thành một câu luyện tập hôm nay";
    document.querySelector("#streakAchievementBadge").textContent = `${stats.currentStreak} ngày`;

    const latestDateKey = Object.keys(activity.days).sort().at(-1);
    const updatedLabel = document.querySelector("#learningActivityUpdated");
    if (!latestDateKey) updatedLabel.textContent = "Hãy hoàn thành một câu luyện tập để bắt đầu chuỗi.";
    else if (latestDateKey === VB.getLocalDateKey(today)) updatedLabel.textContent = `Hôm nay: ${stats.todayActivities} lượt học`;
    else {
      const [year, month, day] = latestDateKey.split("-").map(Number);
      updatedLabel.textContent = `Lần học gần nhất: ${dateFormatter.format(new Date(year, month - 1, day, 12))}`;
    }
  }

  elements.profileForm.addEventListener("submit", event => {
    event.preventDefault();
    user.username = elements.displayName.value.trim();
    user.bio = elements.bio.value.trim();
    VB.setUser(user);
    renderProfile();
    VB.toast("Đã cập nhật hồ sơ", "success");
  });

  renderProfile();
  renderHeatmap();
});
