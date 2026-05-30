(() => {
  const storageKey = "ipi-task-status";

  const tasks = [
    {
      id: "confirm-attendance",
      title: "Confirm assessment attendance",
      titleZh: "确认评估出席",
      detail: "Due 27 June 2026. Required before the written examination.",
      detailZh: "截止 2026 年 6 月 27 日。笔试前必须完成。",
      href: "assessment.html",
      priority: "Action required"
    },
    {
      id: "income-id-upload",
      title: "Upload income and ID documents",
      titleZh: "上传收入和身份证明文件",
      detail: "Upload supporting documents before 27 June 2026.",
      detailZh: "请在 2026 年 6 月 27 日前上传支持文件。",
      href: "submission.html",
      priority: "Documents"
    },
    {
      id: "lab3-reflection",
      title: "Submit Lab 3 reflection",
      titleZh: "提交 Lab 3 反思",
      detail: "Mealtime & Feeding practical reflection due by 18:00.",
      detailZh: "Mealtime & Feeding 实践反思需在 18:00 前提交。",
      href: "submission.html",
      priority: "Today"
    },
    {
      id: "coapplicant-declaration",
      title: "Review co-applicant signed declaration",
      titleZh: "检查共同申请人签署声明",
      detail: "Attach this with the home observation or reflection upload.",
      detailZh: "可与家庭观察记录或反思文件一起上传。",
      href: "submission.html",
      priority: "Form"
    },
    {
      id: "exam-guidelines",
      title: "Read Toddlerhood examination guidelines",
      titleZh: "阅读 Toddlerhood 考试指南",
      detail: "Review the centre rules before the written exam.",
      detailZh: "笔试前请查看中心考试规则。",
      href: "assessment.html",
      priority: "Exam prep"
    }
  ];

  const isZh = () => document.documentElement.lang.toLowerCase().startsWith("zh");
  const isReportSubmitted = () => {
    try {
      return !!localStorage.getItem("ipi-report-submission");
    } catch (error) {
      return false;
    }
  };
  const isDocumentsSubmitted = () => {
    try {
      return !!localStorage.getItem("ipi-document-submission");
    } catch (error) {
      return false;
    }
  };
  let timeLabels = null;

  const taskDetail = (task, zh) => {
    if (!timeLabels) return zh ? task.detailZh : task.detail;
    if (task.id === "confirm-attendance") {
      return zh
        ? `截止 ${timeLabels.docZhShort}。笔试前必须完成。`
        : `Due ${timeLabels.docShortDate}. Required before the written examination.`;
    }
    if (task.id === "income-id-upload") {
      return zh
        ? `请在 ${timeLabels.docZhShort} 前上传支持文件。`
        : `Upload supporting documents before ${timeLabels.docShortDate}.`;
    }
    return zh ? task.detailZh : task.detail;
  };

  const readStatus = () => {
    try {
      return JSON.parse(localStorage.getItem(storageKey) || "{}");
    } catch (error) {
      return {};
    }
  };

  const writeStatus = (status) => {
    try {
      localStorage.setItem(storageKey, JSON.stringify(status));
    } catch (error) {
      // Local file previews can block storage; the current page state still updates.
    }
  };

  const setTaskDone = (taskId, done) => {
    const status = readStatus();
    status[taskId] = !!done;
    writeStatus(status);
    syncTaskElements();
    renderAllMenus();
  };

  const pendingTasks = () => {
    const status = readStatus();
    return tasks.filter((task) => !status[task.id]);
  };

  const syncTaskElements = () => {
    const status = readStatus();
    document.querySelectorAll("[data-task-id]").forEach((item) => {
      const done = !!status[item.dataset.taskId] || item.getAttribute("aria-pressed") === "true";
      item.setAttribute("aria-pressed", String(done));
      item.querySelector(".goal-check")?.classList.toggle("done", done);
      item.querySelector(".goal-text")?.classList.toggle("done", done);
    });
  };

  const renderMenu = (selector) => {
    const menu = selector.querySelector("[data-notification-menu]");
    const badge = selector.querySelector("[data-notification-badge]");
    if (!menu || !badge) return;

    const pending = pendingTasks();
    const zh = isZh();
    badge.textContent = pending.length ? String(pending.length) : "";
    badge.hidden = pending.length === 0;

    menu.textContent = "";

    const head = document.createElement("div");
    head.className = "notification-head";
    head.innerHTML = `<strong>${zh ? "提醒" : "Reminders"}</strong><span>${pending.length ? (zh ? `${pending.length} 项未完成` : `${pending.length} pending`) : (zh ? "全部完成" : "All clear")}</span>`;
    menu.append(head);

    if (!pending.length) {
      const empty = document.createElement("div");
      empty.className = "notification-empty";
      empty.textContent = zh ? "目前没有未完成事项。" : "No pending tasks right now.";
      menu.append(empty);
      return;
    }

    pending.forEach((task) => {
      const documentSubmitted = isDocumentsSubmitted() && ["income-id-upload", "lab3-reflection", "coapplicant-declaration"].includes(task.id);
      const reportSubmitted = isReportSubmitted() && !documentSubmitted && ["income-id-upload", "lab3-reflection", "coapplicant-declaration"].includes(task.id);
      const item = document.createElement("div");
      item.className = "notification-item";

      const link = document.createElement("a");
      link.href = documentSubmitted ? "submission.html" : (reportSubmitted ? "report.html" : task.href);
      link.className = "notification-link";
      link.innerHTML = documentSubmitted
        ? `<span>${zh ? "已提交" : "Submitted"}</span><strong>${zh ? "更新文件" : "Update documents"}</strong><small>${zh ? "申请文件已提交，可返回表格继续更新。" : "Application documents have been submitted. Return to the form to update them."}</small>`
        : reportSubmitted
        ? `<span>${zh ? "已提交" : "Submitted"}</span><strong>${zh ? "更新已提交内容" : "Update submitted content"}</strong><small>${zh ? "报告已提交，可返回表格继续更新内容。" : "The report has been submitted. Return to the form to update content."}</small>`
        : `<span>${task.priority}</span><strong>${zh ? task.titleZh : task.title}</strong><small>${taskDetail(task, zh)}</small>`;

      const done = document.createElement("button");
      done.type = "button";
      done.className = "notification-done";
      done.textContent = zh ? "完成" : "Done";
      done.addEventListener("click", () => setTaskDone(task.id, true));

      item.append(link, done);
      menu.append(item);
    });
  };

  const renderAllMenus = () => {
    document.querySelectorAll("[data-notification-selector]").forEach(renderMenu);
  };

  document.querySelectorAll("[data-notification-selector]").forEach((selector) => {
    const button = selector.querySelector("[data-notification-toggle]");
    if (!button) return;

    button.addEventListener("click", () => {
      const isOpen = selector.classList.toggle("open");
      button.setAttribute("aria-expanded", String(isOpen));
      renderMenu(selector);
    });
  });

  document.addEventListener("click", (event) => {
    document.querySelectorAll("[data-notification-selector].open").forEach((selector) => {
      if (selector.contains(event.target)) return;
      selector.classList.remove("open");
      selector.querySelector("[data-notification-toggle]")?.setAttribute("aria-expanded", "false");
    });
  });

  document.addEventListener("keydown", (event) => {
    if (event.key !== "Escape") return;
    document.querySelectorAll("[data-notification-selector].open").forEach((selector) => {
      selector.classList.remove("open");
      selector.querySelector("[data-notification-toggle]")?.setAttribute("aria-expanded", "false");
    });
  });

  document.querySelectorAll("[data-task-id]").forEach((item) => {
    item.addEventListener("click", () => {
      setTimeout(() => setTaskDone(item.dataset.taskId, item.getAttribute("aria-pressed") === "true"));
    });
    item.addEventListener("keydown", (event) => {
      if (event.key !== "Enter" && event.key !== " ") return;
      setTimeout(() => setTaskDone(item.dataset.taskId, item.getAttribute("aria-pressed") === "true"));
    });
  });

  document.querySelectorAll('input[type="file"]').forEach((input) => {
    input.addEventListener("change", () => {
      const labelText = input.closest("label")?.textContent.toLowerCase() || "";
      if (labelText.includes("income") || labelText.includes("id document")) setTaskDone("income-id-upload", true);
      if (labelText.includes("reflection")) setTaskDone("lab3-reflection", true);
    });
  });

  window.addEventListener("languagechange", renderAllMenus);
  window.addEventListener("reportstatuschange", renderAllMenus);
  window.addEventListener("documentsubmissionchange", () => {
    setTaskDone("income-id-upload", true);
    setTaskDone("lab3-reflection", true);
    setTaskDone("coapplicant-declaration", true);
    renderAllMenus();
  });
  window.addEventListener("ipitimechange", (event) => {
    timeLabels = event.detail;
    renderAllMenus();
  });
  syncTaskElements();
  renderAllMenus();
})();
