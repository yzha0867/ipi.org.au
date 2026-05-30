(() => {
  const timeZone = "Australia/Sydney";
  const listeners = [];
  let currentDate = null;

  const pad = (value) => String(value).padStart(2, "0");
  const monthLong = (date) => new Intl.DateTimeFormat("en-AU", { month: "long", timeZone }).format(date);
  const weekdayLong = (date) => new Intl.DateTimeFormat("en-AU", { weekday: "long", timeZone }).format(date);
  const partsFor = (date) => {
    const parts = new Intl.DateTimeFormat("en-AU", {
      timeZone,
      year: "numeric",
      month: "numeric",
      day: "numeric"
    }).formatToParts(date);
    return {
      year: Number(parts.find((part) => part.type === "year")?.value),
      month: Number(parts.find((part) => part.type === "month")?.value),
      day: Number(parts.find((part) => part.type === "day")?.value)
    };
  };
  const makeLocalDate = ({ year, month, day }) => new Date(year, month - 1, day);
  const mondayIndex = (date) => (date.getDay() + 6) % 7;
  const addDays = (date, days) => {
    const next = new Date(date);
    next.setDate(next.getDate() + days);
    return next;
  };
  const sameDay = (a, b) => a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();

  const formatShort = (date) => `${date.getDate()} ${monthLong(date)} ${date.getFullYear()}`;
  const formatDayMonth = (date) => `${date.getDate()} ${monthLong(date)}`;
  const formatLong = (date) => `${weekdayLong(date)}, ${formatShort(date)}`;
  const formatMonth = (date) => `${monthLong(date)} ${date.getFullYear()}`;
  const formatZhShort = (date) => `${date.getFullYear()} 年 ${date.getMonth() + 1} 月 ${date.getDate()} 日`;
  const formatZhLong = (date) => `${formatZhShort(date)}${new Intl.DateTimeFormat("zh-CN", { weekday: "long", timeZone }).format(date)}`;

  const getNetworkDate = async () => {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 1500);
    try {
      const response = await fetch(`https://worldtimeapi.org/api/timezone/${timeZone}`, {
        cache: "no-store",
        signal: controller.signal
      });
      if (!response.ok) throw new Error("Time service unavailable");
      const data = await response.json();
      return new Date(data.datetime);
    } finally {
      clearTimeout(timeout);
    }
  };

  const getCurrentDate = async () => {
    try {
      return await getNetworkDate();
    } catch (error) {
      return new Date();
    }
  };

  const setDateField = (labelText, value) => {
    document.querySelectorAll(".cover-field").forEach((field) => {
      const label = field.querySelector("span");
      if (!label || label.textContent.trim() !== labelText) return;
      [...field.childNodes].forEach((node) => {
        if (node.nodeType === Node.TEXT_NODE) node.remove();
      });
      field.append(value);
    });
  };

  const updateCalendar = (date) => {
    const card = document.querySelector(".learning-plan-card");
    const grid = card?.querySelector(".cal-grid");
    if (!card || !grid) return;

    const base = makeLocalDate(partsFor(date));
    const monthStart = new Date(base.getFullYear(), base.getMonth(), 1);
    const start = addDays(monthStart, -mondayIndex(monthStart));
    const selectedDate = card.querySelector(".plan-selected-date");
    const editHint = card.querySelector(".plan-edit-hint");

    card.querySelector(".cal-month").textContent = formatMonth(base);
    grid.querySelectorAll(".cal-day").forEach((day) => day.remove());

    for (let index = 0; index < 42; index += 1) {
      const dayDate = addDays(start, index);
      const day = document.createElement("div");
      day.className = "cal-day";
      day.role = "button";
      day.tabIndex = 0;
      day.dataset.date = formatShort(dayDate);
      day.textContent = String(dayDate.getDate());
      if (dayDate.getMonth() !== base.getMonth()) day.classList.add("muted");
      if ([2, 6, 9, 13, 16, 20, 23, 27].includes(dayDate.getDate()) && dayDate.getMonth() === base.getMonth()) {
        day.classList.add("scheduled");
      }
      if (sameDay(dayDate, base)) day.classList.add("today", "scheduled", "selected");
      grid.append(day);
    }

    const selectDay = (day) => {
      grid.querySelectorAll(".cal-day").forEach((item) => item.classList.remove("selected"));
      day.classList.add("selected");
      if (selectedDate) selectedDate.textContent = `Selected: ${day.dataset.date}`;
    };

    grid.querySelectorAll(".cal-day").forEach((day) => {
      const choose = () => {
        selectDay(day);
        if (card.classList.contains("editing") && editHint) {
          day.classList.toggle("scheduled");
          editHint.textContent = day.classList.contains("scheduled")
            ? "Plan added for selected date"
            : "Plan removed for selected date";
        }
      };
      day.addEventListener("click", choose);
      day.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          choose();
        }
      });
    });

    if (selectedDate) selectedDate.textContent = `Selected: ${formatShort(base)}`;
  };

  const updatePage = (date) => {
    const longDate = formatLong(date);
    const shortDate = formatShort(date);
    const dayMonth = formatDayMonth(date);

    document.querySelectorAll(".greeting-text .sub").forEach((node) => {
      node.innerHTML = `
        You are working towards your
        <span class="track">Couples Licence — Toddlerhood</span>
        with co-applicant <strong>M. Chen</strong>. Three modules remain before your scheduled written examination on ${dayMonth}.
      `;
    });

    document.querySelectorAll(".alert-content").forEach((node) => {
      node.innerHTML = `<strong>Action required.</strong> Your Toddlerhood written examination is scheduled for <strong>${longDate} · 10:00 AM</strong> at IPI Centre Sydney. Confirm your attendance by ${dayMonth}. <a href="assessment.html">Confirm now</a>`;
    });

    document.querySelectorAll(".hero-note p").forEach((node) => {
      const text = node.textContent;
      if (/Confirm attendance|upload supporting documents/.test(text)) {
        node.textContent = `Confirm attendance by ${shortDate} and upload supporting documents before ${shortDate}.`;
      }
      if (/All files must be submitted/.test(text)) {
        node.textContent = `All files must be submitted by ${shortDate}, 6:00 PM Sydney time.`;
      }
    });

    setDateField("Date and time", `${longDate} · 10:00 AM`);

    document.querySelectorAll(".schedule-table tbody tr:first-child td:first-child").forEach((node) => {
      node.textContent = shortDate;
    });
    document.querySelectorAll(".goal-text").forEach((node) => {
      if (/Confirm attendance by/.test(node.textContent)) node.textContent = `Confirm attendance by ${dayMonth}`;
    });
    document.querySelectorAll('input[aria-label="Assessment date"]').forEach((input) => {
      input.value = shortDate;
    });

    updateCalendar(date);
    window.dispatchEvent(new CustomEvent("ipitimechange", {
      detail: { date, shortDate, dayMonth, longDate, zhShort: formatZhShort(date), zhLong: formatZhLong(date) }
    }));
  };

  window.IPITime = {
    addListener(callback) {
      listeners.push(callback);
      if (currentDate) callback(currentDate);
    },
    get currentDate() {
      return currentDate;
    },
    formatShort,
    formatDayMonth,
    formatLong,
    formatZhShort,
    formatZhLong
  };

  getCurrentDate().then((date) => {
    currentDate = makeLocalDate(partsFor(date));
    updatePage(currentDate);
    listeners.forEach((callback) => callback(currentDate));
  });
})();
