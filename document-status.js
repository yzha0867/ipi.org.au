(() => {
  const storageKey = "ipi-document-submission";

  const isZh = () => document.documentElement.lang.toLowerCase().startsWith("zh");
  const readSubmission = () => {
    try {
      return JSON.parse(localStorage.getItem(storageKey) || "null");
    } catch (error) {
      return null;
    }
  };
  const writeSubmission = () => {
    const payload = { submitted: true, updatedAt: new Date().toISOString() };
    try {
      localStorage.setItem(storageKey, JSON.stringify(payload));
    } catch (error) {
      // Local file previews may block storage; keep the visible flow working.
    }
    return payload;
  };

  const copy = () => {
    const zh = isZh();
    return {
      kicker: zh ? "文件" : "Documents",
      confirmTitle: zh ? "确认提交文件？" : "Submit these documents?",
      confirmBody: zh
        ? “提交后，评估页和课程页的按钮会更新为”更新文件”，你可以随时回来替换或补充材料。”
        : “Once submitted, the button on your assessment and course pages will change to Update documents — you can come back any time to replace or add files.”,
      cancel: zh ? "取消" : "Cancel",
      confirm: zh ? "确认提交" : "Confirm submission",
      submittedTitle: zh ? "文件已提交" : "Documents submitted",
      submittedBody: zh
        ? “你的文件已提交成功。点击完成将返回上一页，日后可随时通过”更新文件”按钮补充或替换材料。”
        : “Your documents have been received. Click Done to go back — you can update your files any time using the Update documents button.”,
      close: zh ? "完成并返回" : "Done and return",
      submit: zh ? "提交文件" : "Submit documents",
      update: zh ? "更新文件" : "Update documents",
      status: zh ? "文件已提交。你可以继续替换材料，并再次点击更新文件。" : "Documents submitted. You can replace materials and use Update documents again.",
      updatedStat: zh ? "文件已提交，可继续更新" : "Documents submitted and available for update",
      updatedNext: zh ? "文件可继续更新" : "Documents available for update"
    };
  };

  const ensureModal = () => {
    let modal = document.querySelector("[data-document-modal]");
    if (modal) return modal;

    modal = document.createElement("div");
    modal.className = "preview-modal report-modal";
    modal.hidden = true;
    modal.dataset.documentModal = "";
    modal.innerHTML = `
      <div class="preview-dialog report-dialog" role="dialog" aria-modal="true" aria-labelledby="documentModalTitle">
        <button class="preview-close" type="button" aria-label="Close" data-document-modal-close>×</button>
        <div class="phase-num" data-document-modal-kicker></div>
        <h2 id="documentModalTitle" data-document-modal-title></h2>
        <p class="preview-age" data-document-modal-body></p>
        <div class="report-modal-actions">
          <button class="btn btn-ghost" type="button" data-document-cancel></button>
          <button class="btn btn-primary" type="button" data-document-confirm></button>
        </div>
      </div>
    `;
    document.body.append(modal);

    const closeOnly = () => {
      modal.hidden = true;
    };
    const closeModal = () => {
      if (modal.dataset.documentSuccess === "true") {
        returnToPreviousPage();
      } else {
        closeOnly();
      }
    };
    modal.addEventListener("click", (event) => {
      if (event.target === modal || event.target.closest("[data-document-modal-close], [data-document-cancel]")) {
        closeModal();
      }
    });
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") closeModal();
    });
    return modal;
  };

  const returnToPreviousPage = () => {
    if (document.referrer && document.referrer !== window.location.href) {
      history.back();
    } else {
      window.location.href = "assessment.html";
    }
  };

  const showStatus = () => {
    const formActions = document.querySelector(".form-actions");
    if (!formActions) return;
    let status = document.querySelector("[data-document-submit-status]");
    if (!status) {
      status = document.createElement("div");
      status.className = "report-submit-status";
      status.dataset.documentSubmitStatus = "";
      formActions.before(status);
    }
    status.textContent = copy().status;
  };

  const isDocumentEntry = (node) => {
    const text = node.textContent.replace(/\s+/g, " ").trim();
    const href = node.getAttribute?.("href") || "";
    if (!node.classList?.contains("btn")) return false;
    const isKnownDocumentText = [
      "Upload documents",
      "Upload work",
      "Submit reflection",
      "Update documents",
      "Update content",
      "上传文件",
      "上传作业",
      "提交反思",
      "更新文件",
      "更新内容"
    ].includes(text);
    const isDocumentSurface = node.closest(".hero-note, .course-action");
    return isKnownDocumentText && (href === "submission.html" || isDocumentSurface);
  };

  const applySubmittedState = () => {
    const submitted = !!readSubmission();
    const c = copy();

    document.querySelectorAll(".btn, a, button").forEach((node) => {
      const text = node.textContent.replace(/\s+/g, " ").trim();
      const isSubmitButton = location.pathname.endsWith("submission.html") &&
        /^(Submit documents|提交文件|Update documents|更新文件)$/.test(text);

      if (isSubmitButton) {
        node.textContent = submitted ? c.update : c.submit;
        node.dataset.documentSubmit = "";
      } else if (submitted && isDocumentEntry(node)) {
        node.textContent = c.update;
        node.setAttribute("href", "submission.html");
      }
    });

    if (submitted) {
      document.querySelectorAll(".course-stats span").forEach((node) => {
        if (/Reflection upload required|反思|文件/.test(node.textContent)) node.textContent = c.updatedStat;
      });
      document.querySelectorAll(".next-item strong").forEach((node) => {
        if (/Mealtime|进餐|Submitted content|已提交/.test(node.textContent)) node.textContent = c.updatedNext;
      });
      if (location.pathname.endsWith("submission.html")) showStatus();
    }
  };

  const attachSubmitHandler = () => {
    const button = document.querySelector("[data-document-submit]") || [...document.querySelectorAll(".form-actions .btn-primary")]
      .find((node) => /Submit documents|提交文件|Update documents|更新文件/.test(node.textContent.trim()));
    if (!button) return;
    button.dataset.documentSubmit = "";

    button.addEventListener("click", () => {
      const modal = ensureModal();
      const c = copy();
      modal.dataset.documentSuccess = "false";
      modal.querySelector("[data-document-modal-kicker]").textContent = c.kicker;
      modal.querySelector("[data-document-modal-title]").textContent = c.confirmTitle;
      modal.querySelector("[data-document-modal-body]").textContent = c.confirmBody;
      modal.querySelector("[data-document-cancel]").hidden = false;
      modal.querySelector("[data-document-cancel]").textContent = c.cancel;
      modal.querySelector("[data-document-confirm]").textContent = c.confirm;
      modal.hidden = false;

      const confirm = modal.querySelector("[data-document-confirm]");
      confirm.onclick = () => {
        writeSubmission();
        applySubmittedState();
        window.dispatchEvent(new Event("documentsubmissionchange"));
        modal.dataset.documentSuccess = "true";
        modal.querySelector("[data-document-modal-title]").textContent = c.submittedTitle;
        modal.querySelector("[data-document-modal-body]").textContent = c.submittedBody;
        modal.querySelector("[data-document-cancel]").hidden = true;
        confirm.textContent = c.close;
        confirm.onclick = returnToPreviousPage;
      };
    });
  };

  attachSubmitHandler();
  applySubmittedState();
  window.addEventListener("languagechange", applySubmittedState);
})();
