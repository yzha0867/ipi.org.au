(() => {
  const records = [
    {
      title: "My Learning dashboard",
      category: "Dashboard",
      url: "index.html",
      keywords: "home dashboard goals learning plan progress modules Jane Toddlerhood"
    },
    {
      title: "Learning Pathway",
      category: "Courses",
      url: "courses.html",
      keywords: "courses curriculum pathway development phases infancy toddlerhood preschool school age adolescence"
    },
    {
      title: "Infancy curriculum review",
      category: "Completed course",
      url: "courses.html#infancy-curriculum",
      keywords: "infancy completed review infant safety attachment sleep feeding hygiene health checks"
    },
    {
      title: "Toddlerhood curriculum",
      category: "Current course",
      url: "courses.html#toddlerhood-curriculum",
      keywords: "toddlerhood current phase development milestones daily care language behaviour co parenting"
    },
    {
      title: "Foundations of Toddler Development",
      category: "Resume course",
      url: "course_resume.html",
      keywords: "IPI TD 101 foundations toddler development language milestones resume module"
    },
    {
      title: "Infant Safety, Attachment and Sleep Foundations",
      category: "Review course",
      url: "course_review.html",
      keywords: "IPI IN 101 infant safety attachment sleep foundations review completed"
    },
    {
      title: "Assessment Centre",
      category: "Assessments",
      url: "assessment.html",
      keywords: "written examination test cover schedule practical test date attendance Sydney"
    },
    {
      title: "Concern report form",
      category: "Report",
      url: "report.html",
      keywords: "report concern welfare child licence holder physical abuse psychological abuse neglect non compliance anonymous evidence"
    },
    {
      title: "Application document upload",
      category: "Documents",
      url: "submission.html",
      keywords: "submission documents upload income id identity supporting document form"
    },
    {
      title: "About IPI",
      category: "Institute",
      url: "about.html",
      keywords: "about international parenting institute Geneva affiliated member states accessibility contact"
    }
  ];

  const normalize = (value) => value.toLowerCase().trim();

  const scoreRecord = (record, query) => {
    const title = normalize(record.title);
    const category = normalize(record.category);
    const haystack = normalize(`${record.title} ${record.category} ${record.keywords}`);
    const terms = normalize(query).split(/\s+/).filter(Boolean);
    if (!terms.length) return 0;
    return terms.reduce((score, term) => {
      if (title.includes(term)) return score + 6;
      if (category.includes(term)) return score + 4;
      if (haystack.includes(term)) return score + 2;
      return score;
    }, 0);
  };

  const render = (form, results, matches) => {
    results.innerHTML = "";
    if (!matches.length) {
      const empty = document.createElement("div");
      empty.className = "search-empty";
      empty.textContent = "No matching courses, modules, or documents.";
      results.append(empty);
      form.classList.add("open");
      return;
    }

    matches.slice(0, 6).forEach((item) => {
      const link = document.createElement("a");
      link.className = "search-result";
      link.href = item.url;
      link.innerHTML = `<span>${item.category}</span><strong>${item.title}</strong>`;
      results.append(link);
    });
    form.classList.add("open");
  };

  document.querySelectorAll("[data-site-search]").forEach((form) => {
    const input = form.querySelector(".search-input");
    const results = form.querySelector("[data-search-results]");
    if (!input || !results) return;

    const getMatches = () => {
      const query = input.value;
      if (!query.trim()) return records.slice(0, 5);
      return records
        .map((record) => ({ ...record, score: scoreRecord(record, query) }))
        .filter((record) => record.score > 0)
        .sort((a, b) => b.score - a.score || a.title.localeCompare(b.title));
    };

    input.addEventListener("focus", () => render(form, results, getMatches()));
    input.addEventListener("input", () => render(form, results, getMatches()));

    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const [first] = getMatches();
      if (first) window.location.href = first.url;
    });

    form.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        form.classList.remove("open");
        input.blur();
      }
    });

    document.addEventListener("click", (event) => {
      if (!form.contains(event.target)) form.classList.remove("open");
    });
  });
})();
