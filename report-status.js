(() => {
  const storageKey = "ipi-report-submission";
  let submissionState = null;

  const isZh = () => document.documentElement.lang.toLowerCase().startsWith("zh");
  const clearSavedSubmission = () => {
    try {
      localStorage.removeItem(storageKey);
    } catch (error) {
      // File previews can block storage; each page load should still start clean.
    }
  };
  const readSubmission = () => {
    return submissionState;
  };
  const writeSubmission = () => {
    const payload = { submitted: true, updatedAt: new Date().toISOString() };
    submissionState = payload;
    return payload;
  };

  const copy = () => {
    const zh = isZh();
    return {
      confirmTitle: zh ? "确认提交报告？" : "Submit this report?",
      confirmBody: zh
        ? "提交后，IPI 合规与福利团队将会跟进处理。你之后仍可返回本页补充或更新内容。"
        : "Once submitted, IPI's Compliance & Welfare team will review your report. You can return to this page at any time to add or update information.",
      cancel: zh ? "取消" : "Cancel",
      confirm: zh ? "确认提交" : "Confirm submission",
      submittedTitle: zh ? "感谢您的报告" : "Thank you for your report",
      submittedBody: zh
        ? 'IPI 已收到您的报告，我们的合规与福利团队将会跟进处理。如需了解进度，请在举报页面点击"查看报告状态"，并保留您的参考编号。'
        : "Your report has been received by IPI. Our Compliance & Welfare team will follow up in due course. To check progress, use the Track report status button on the report page and keep your reference number.",
      close: zh ? "完成" : "Done",
      submit: zh ? "提交报告" : "Submit report",
      update: zh ? "更新报告信息" : "Update report information",
      status: zh ? "已提交。你可以继续补充或更新报告信息。" : "Submitted. You can continue adding or updating report information.",
      updatedStat: zh ? "已提交内容，可继续更新" : "Submitted content can be updated",
      updatedNext: zh ? "已提交内容可更新" : "Submitted content available for update"
    };
  };

  const ensureModal = () => {
    let modal = document.querySelector("[data-report-modal]");
    if (modal) return modal;

    modal = document.createElement("div");
    modal.className = "preview-modal report-modal";
    modal.hidden = true;
    modal.dataset.reportModal = "";
    modal.innerHTML = `
      <div class="preview-dialog report-dialog" role="dialog" aria-modal="true" aria-labelledby="reportModalTitle">
        <button class="preview-close" type="button" aria-label="Close" data-report-modal-close>×</button>
        <div class="phase-num" data-report-modal-kicker>Report</div>
        <h2 id="reportModalTitle" data-report-modal-title></h2>
        <p class="preview-age" data-report-modal-body></p>
        <div class="report-modal-actions">
          <button class="btn btn-ghost" type="button" data-report-cancel></button>
          <button class="btn btn-primary" type="button" data-report-confirm></button>
        </div>
      </div>
    `;
    document.body.append(modal);

    modal.addEventListener("click", (event) => {
      if (event.target === modal || event.target.closest("[data-report-modal-close], [data-report-cancel]")) {
        modal.hidden = true;
      }
    });
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") modal.hidden = true;
    });
    return modal;
  };

  const showStatus = () => {
    const formActions = document.querySelector(".form-actions");
    if (!formActions) return;
    let status = document.querySelector("[data-report-submit-status]");
    if (!status) {
      status = document.createElement("div");
      status.className = "report-submit-status";
      status.dataset.reportSubmitStatus = "";
      formActions.before(status);
    }
    status.textContent = copy().status;
  };

  const applySubmittedState = () => {
    const submitted = !!readSubmission();
    const c = copy();

    document.querySelectorAll(".btn, a, button").forEach((node) => {
      const text = node.textContent.replace(/\s+/g, " ").trim();
      const isReportSubmit = node.matches("[data-report-submit]") || (location.pathname.endsWith("report.html") && text === c.submit);
      const isUploadEntry = [
        "Upload application documents instead",
        "改为上传申请文件"
      ].includes(text);

      if (isReportSubmit) {
        node.textContent = submitted ? c.update : c.submit;
        node.dataset.reportSubmit = "";
      } else if (submitted && isUploadEntry) {
        node.textContent = c.update;
        if (node.tagName === "A") node.setAttribute("href", "report.html");
      }
    });

    if (submitted) {
      document.querySelectorAll(".course-stats span").forEach((node) => {
        if (/Reflection upload required|反思/.test(node.textContent)) node.textContent = c.updatedStat;
      });
      document.querySelectorAll(".next-item strong").forEach((node) => {
        if (/Mealtime|进餐/.test(node.textContent)) node.textContent = c.updatedNext;
      });
      if (location.pathname.endsWith("report.html")) showStatus();
    }
  };

  const handleReportSubmitClick = () => {
    const modal = ensureModal();
    const c = copy();
    modal.querySelector("[data-report-modal-title]").textContent = c.confirmTitle;
    modal.querySelector("[data-report-modal-body]").textContent = c.confirmBody;
    modal.querySelector("[data-report-cancel]").hidden = false;
    modal.querySelector("[data-report-cancel]").textContent = c.cancel;
    modal.querySelector("[data-report-confirm]").textContent = c.confirm;
    modal.hidden = false;

    const confirm = modal.querySelector("[data-report-confirm]");
    confirm.onclick = () => {
      writeSubmission();
      applySubmittedState();
      window.dispatchEvent(new Event("reportstatuschange"));
      modal.querySelector("[data-report-modal-title]").textContent = c.submittedTitle;
      modal.querySelector("[data-report-modal-body]").textContent = c.submittedBody;
      modal.querySelector("[data-report-cancel]").hidden = true;
      confirm.textContent = c.close;
      confirm.onclick = () => { modal.hidden = true; };
    };
  };

  window.__ipiReportSubmit = handleReportSubmitClick;
  window.__ipiReportSubmission = readSubmission;

  document.addEventListener("click", (event) => {
    if (event.target.closest("[data-report-submit]")) handleReportSubmitClick();
  });

  clearSavedSubmission();
  applySubmittedState();
  window.addEventListener("languagechange", applySubmittedState);
})();
