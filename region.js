(function () {
  const regionCodes = [
    "AF", "AX", "AL", "DZ", "AS", "AD", "AO", "AI", "AQ", "AG", "AR", "AM", "AW", "AU", "AT", "AZ",
    "BS", "BH", "BD", "BB", "BY", "BE", "BZ", "BJ", "BM", "BT", "BO", "BQ", "BA", "BW", "BV", "BR",
    "IO", "BN", "BG", "BF", "BI", "KH", "CM", "CA", "CV", "KY", "CF", "TD", "CL", "CN", "CX", "CC",
    "CO", "KM", "CG", "CD", "CK", "CR", "CI", "HR", "CU", "CW", "CY", "CZ", "DK", "DJ", "DM", "DO",
    "EC", "EG", "SV", "GQ", "ER", "EE", "SZ", "ET", "FK", "FO", "FJ", "FI", "FR", "GF", "PF", "TF",
    "GA", "GM", "GE", "DE", "GH", "GI", "GR", "GL", "GD", "GP", "GU", "GT", "GG", "GN", "GW", "GY",
    "HT", "HM", "VA", "HN", "HK", "HU", "IS", "IN", "ID", "IR", "IQ", "IE", "IM", "IL", "IT", "JM",
    "JP", "JE", "JO", "KZ", "KE", "KI", "KP", "KR", "KW", "KG", "LA", "LV", "LB", "LS", "LR", "LY",
    "LI", "LT", "LU", "MO", "MG", "MW", "MY", "MV", "ML", "MT", "MH", "MQ", "MR", "MU", "YT", "MX",
    "FM", "MD", "MC", "MN", "ME", "MS", "MA", "MZ", "MM", "NA", "NR", "NP", "NL", "NC", "NZ", "NI",
    "NE", "NG", "NU", "NF", "MK", "MP", "NO", "OM", "PK", "PW", "PS", "PA", "PG", "PY", "PE", "PH",
    "PN", "PL", "PT", "PR", "QA", "RE", "RO", "RU", "RW", "BL", "SH", "KN", "LC", "MF", "PM", "VC",
    "WS", "SM", "ST", "SA", "SN", "RS", "SC", "SL", "SG", "SX", "SK", "SI", "SB", "SO", "ZA", "GS",
    "SS", "ES", "LK", "SD", "SR", "SJ", "SE", "CH", "SY", "TW", "TJ", "TZ", "TH", "TL", "TG", "TK",
    "TO", "TT", "TN", "TR", "TM", "TC", "TV", "UG", "UA", "AE", "GB", "US", "UM", "UY", "UZ", "VU",
    "VE", "VN", "VG", "VI", "WF", "EH", "YE", "ZM", "ZW", "XK"
  ];

  const displayNames = new Intl.DisplayNames(["en"], { type: "region" });
  const regions = regionCodes
    .map((code) => ({ code, label: displayNames.of(code) || code }))
    .sort((a, b) => a.label.localeCompare(b.label, "en", { sensitivity: "base" }));

  const languages = [
    { code: "en", label: "English", english: "English", short: "EN", htmlLang: "en", suggested: true, supported: true },
    { code: "zh", label: "简体中文", english: "Chinese (Simplified)", short: "中文", htmlLang: "zh-CN", suggested: true, supported: true },
    { code: "zh-Hant", label: "繁體中文", english: "Chinese (Traditional)", short: "中文", htmlLang: "zh-Hant" },
    { code: "fr", label: "Français", english: "French", short: "FR", htmlLang: "fr", suggested: true, supported: true },
    { code: "es", label: "Español", english: "Spanish", short: "ES", htmlLang: "es", suggested: true, supported: true },
    { code: "ar", label: "العربية", english: "Arabic", short: "AR", htmlLang: "ar" },
    { code: "de", label: "Deutsch", english: "German", short: "DE", htmlLang: "de" },
    { code: "hi", label: "हिन्दी", english: "Hindi", short: "HI", htmlLang: "hi" },
    { code: "id", label: "Bahasa Indonesia", english: "Indonesian", short: "ID", htmlLang: "id" },
    { code: "it", label: "Italiano", english: "Italian", short: "IT", htmlLang: "it" },
    { code: "ja", label: "日本語", english: "Japanese", short: "JA", htmlLang: "ja" },
    { code: "ko", label: "한국어", english: "Korean", short: "KO", htmlLang: "ko" },
    { code: "ms", label: "Bahasa Melayu", english: "Malay", short: "MS", htmlLang: "ms" },
    { code: "pt", label: "Português", english: "Portuguese", short: "PT", htmlLang: "pt" },
    { code: "ru", label: "Русский", english: "Russian", short: "RU", htmlLang: "ru" },
    { code: "th", label: "ไทย", english: "Thai", short: "TH", htmlLang: "th" },
    { code: "tr", label: "Türkçe", english: "Turkish", short: "TR", htmlLang: "tr" },
    { code: "vi", label: "Tiếng Việt", english: "Vietnamese", short: "VI", htmlLang: "vi" }
  ];

  const languageByRegion = {
    AU: "en",
    NZ: "en",
    GB: "en",
    IE: "en",
    US: "en",
    CA: "en",
    SG: "en",
    IN: "hi",
    ID: "id",
    MY: "ms",
    JP: "ja",
    KR: "ko",
    TH: "th",
    VN: "vi",
    DE: "de",
    AT: "de",
    IT: "it",
    PT: "pt",
    BR: "pt",
    RU: "ru",
    TR: "tr",
    SA: "ar",
    AE: "ar",
    EG: "ar",
    CN: "zh",
    HK: "zh",
    MO: "zh",
    TW: "zh",
    FR: "fr",
    BE: "fr",
    CH: "fr",
    ES: "es",
    MX: "es",
    AR: "es",
    CL: "es",
    CO: "es",
    PE: "es"
  };

  const textTranslations = {
    zh: {
      "International Parenting Institute": "国际亲职研究院",
      "UN Affiliated · Geneva": "联合国附属 · 日内瓦",
      "Application status": "申请状态",
      "Toddlerhood · In Progress": "Toddlerhood · 进行中",
      "Completion": "完成度",
      "Valid through Dec 2026": "有效期至 2026 年 12 月",
      "Good afternoon,": "下午好，",
      "Jane": "Jane",
      "You are working towards your": "你正在完成",
      "Couples Licence — Toddlerhood": "伴侣照护许可 — Toddlerhood",
      "with co-applicant": "共同申请人为",
      "M. Chen": "M. Chen",
      "Three modules remain before your scheduled written examination on 30 May.": "距离 6 月 30 日的笔试前还剩 3 个模块。",
      "Action required.": "需要处理。",
      "Your Toddlerhood written examination is scheduled for": "你的 Toddlerhood 笔试已安排在",
      "Tuesday, 30 June 2026 · 10:00 AM": "2026 年 6 月 30 日星期二 · 上午 10:00",
      "at IPI Centre Sydney. Confirm your attendance by 30 June.": "地点为 IPI 悉尼中心。请在 6 月 30 日前确认出席。",
      "Confirm now": "立即确认",
      "Today's Goals": "今日目标",
      "Edit": "编辑",
      "Complete Module 5 reading": "完成模块 5 阅读",
      "Development": "发展",
      "20 min": "20 分钟",
      "Submit Lab 3 reflection — Mealtime & Feeding": "提交 Lab 3 反思 — 进餐与喂养",
      "Practical": "实践",
      "Due 18:00": "18:00 截止",
      "Review co-applicant signed declaration": "检查共同申请人签署声明",
      "Admin": "行政",
      "5 min": "5 分钟",
      "Read Toddlerhood examination guidelines": "阅读 Toddlerhood 考试指南",
      "Exam prep": "考试准备",
      "15 min": "15 分钟",
      "Learning Plan": "学习计划",
      "Edit plan": "编辑计划",
      "May 2026": "2026 年 5 月",
      "Selected: 30 June 2026": "已选择：2026 年 6 月 30 日",
      "Edit mode off": "编辑模式关闭",
      "Upcoming Assessments": "即将到来的评估",
      "Toddlerhood Written Examination": "Toddlerhood 笔试",
      "90 minutes · MCQ · Centre Sydney": "90 分钟 · 选择题 · 悉尼中心",
      "Practical Test — Toddler Care": "实践测试 — Toddler 照护",
      "In-person · 45 minutes": "线下 · 45 分钟",
      "Couples Interview": "伴侣面谈",
      "Joint session · 60 minutes": "联合面谈 · 60 分钟",
      "Your modules": "你的模块",
      "4 active · Toddlerhood phase": "4 个进行中 · Toddlerhood 阶段",
      "In Progress": "进行中",
      "Completed": "已完成",
      "Required": "必修",
      "Recommended": "推荐",
      "Toddlerhood · Required": "Toddlerhood · 必修",
      "Toddlerhood · Recommended": "Toddlerhood · 推荐",
      "Foundations of Toddler Development (12–36 months)": "Toddler 发展基础（12–36 个月）",
      "Course · 8 modules": "课程 · 8 个模块",
      "Course · 12 modules": "课程 · 12 个模块",
      "Est. completion 17 May": "预计 5 月 17 日完成",
      "Dr. A. Karim": "A. Karim 博士",
      "Next up": "下一项",
      "Language Milestones at 18–24 Months": "18–24 个月语言里程碑",
      "Resume": "继续",
      "Practical Assessment: Toddler Daily Care": "实践评估：Toddler 日常照护",
      "Lab series · 6 sessions": "实验课 · 6 次课程",
      "In-person · Centre Sydney": "线下 · 悉尼中心",
      "Instructor M. Okafor": "讲师 M. Okafor",
      "Mealtime, Self-feeding & Choking Response": "进餐、自主进食与噎 choking 应对",
      "Submit reflection": "提交反思",
      "Upload work": "上传作业",
      "Responding to Tantrums & Big Emotions": "应对发脾气与强烈情绪",
      "Behavioural": "行为",
      "Co-parenting": "共同养育",
      "Co-Parenting Through the Toddler Years": "Toddler 年龄段的共同养育",
      "Learning Pathway": "学习路径",
      "Early childhood pathway": "早期儿童发展路径",
      "Development phases": "发展阶段",
      "Phase 1 · Completed": "阶段 1 · 已完成",
      "Phase 2 · Current": "阶段 2 · 当前",
      "Phase 3 · Upcoming": "阶段 3 · 即将开放",
      "Phase 4 · Upcoming": "阶段 4 · 即将开放",
      "Phase 5 · Upcoming": "阶段 5 · 即将开放",
      "Infancy": "Infancy",
      "Toddlerhood": "Toddlerhood",
      "Preschool": "Preschool",
      "School-age": "School-age",
      "Adolescence": "Adolescence",
      "0-12 months. Foundational care, sleep safety, feeding, hygiene, health checks, attachment, and emergency response. This phase is complete and available for review only.": "0–12 个月。基础照护、睡眠安全、喂养、卫生、健康检查、依恋关系和紧急应对。该阶段已完成，仅供复习。",
      "12-36 months. Development milestones, daily care, mealtime safety, language, behaviour, and co-parenting. This is the active phase for Jane's application.": "12–36 个月。发展里程碑、日常照护、进餐安全、语言、行为与共同养育。这是 Jane 当前申请中的进行阶段。",
      "3-4 years. Independence, social routines, early literacy, emotional expression, group play, and preparing children for structured learning environments.": "3–4 岁。独立性、社交常规、早期读写、情绪表达、集体游戏，以及为结构化学习环境做准备。",
      "5-12 years. School routines, peer relationships, digital safety, resilience, learning support, and parent-school communication across primary years.": "5–12 岁。学校常规、同伴关系、数字安全、韧性、学习支持，以及小学阶段的家校沟通。",
      "13-18 years. Identity, autonomy, mental wellbeing, family communication, study pressure, risk awareness, and preparation for independent adulthood.": "13–18 岁。身份认同、自主性、心理健康、家庭沟通、学习压力、风险意识，以及独立成人生活准备。",
      "Review Infancy": "复习 Infancy",
      "Open Toddlerhood": "打开 Toddlerhood",
      "Preview": "预览",
      "Prev": "上一个",
      "Next": "下一个",
      "Infancy curriculum": "Infancy 课程大纲",
      "Toddlerhood curriculum": "Toddlerhood 课程大纲",
      "3 completed · review only": "3 个已完成 · 仅供复习",
      "4 active · 2 required for next assessment": "4 个进行中 · 下一次评估需完成 2 个",
      "Status": "状态",
      "Completed phase material": "已完成阶段材料",
      "Completed practical": "已完成实践",
      "Review": "复习",
      "Infant Safety, Attachment & Sleep Foundations": "婴儿安全、依恋与睡眠基础",
      "Feeding, Hygiene & Health Checks": "喂养、卫生与健康检查",
      "Infant Emergency Response Lab": "婴儿紧急应对实践课",
      "100% complete · Review available": "100% 完成 · 可复习",
      "100% complete · Certificate recorded": "100% 完成 · 证书已记录",
      "75% complete · Module 6 of 8": "75% 完成 · 8 个模块中的第 6 个",
      "30% complete · Lab 2 of 6": "30% 完成 · 6 个实验中的第 2 个",
      "18% complete · Module 2 of 12": "18% 完成 · 12 个模块中的第 2 个",
      "50% complete · Session 3 of 5": "50% 完成 · 5 次课程中的第 3 次",
      "Assessment Centre": "评估中心",
      "Official assessment entry page for Jane Doe, application IPI-PA-2026-001256. Use this page to check the exam cover details and upcoming schedule.": "Jane Doe 的官方评估入口页，申请编号 IPI-PA-2026-001256。可在此查看考试封面信息和后续日程。",
      "Action required": "需要处理",
      "Confirm attendance by 30 June 2026 and upload supporting documents before 30 June 2026.": "请在 2026 年 6 月 30 日前确认出席，并在 6 月 30 日前上传支持文件。",
      "Upload documents": "上传文件",
      "Applicant": "申请人",
      "Co-applicant": "共同申请人",
      "Application number": "申请编号",
      "Course code": "课程代码",
      "Date and time": "日期和时间",
      "Location": "地点",
      "Bring government ID, printed or digital application confirmation, and approved calculator if required. Phones and notes must remain outside the examination room.": "请携带政府身份证件、纸质或电子申请确认，如有要求请携带获准计算器。手机和笔记必须留在考场外。",
      "Assessment schedule": "评估日程",
      "Date": "日期",
      "Assessment": "评估",
      "Format": "形式",
      "Attendance pending": "出席待确认",
      "Scheduled": "已安排",
      "Final Review Board": "最终审核委员会",
      "Document review": "文件审核",
      "Not yet opened": "尚未开放",
      "Before the test": "考试前",
      "Confirm attendance by 30 May": "5 月 30 日前确认出席",
      "Upload income and ID documents": "上传收入和身份证明文件",
      "Report a concern": "提交问题报告",
      "Use this form to report a welfare concern or possible licence non-compliance involving a child and an IPI licence holder.": "使用此表格报告涉及儿童和 IPI 许可持有人的福利担忧或可能的许可违规。",
      "Good faith reporting": "善意报告",
      "Reports can be submitted with contact details or anonymously. Anonymous reports may require stronger supporting evidence before action can be taken.": "报告可附联系方式，也可匿名提交。匿名报告可能需要更强的证据支持后才能采取行动。",
      "Reporter Information": "报告人信息",
      "Complete this section if you are willing to be contacted. You may leave these fields blank for an anonymous report.": "如果你愿意被联系，请填写此部分。匿名报告可留空。",
      "Full name": "姓名",
      "Contact details": "联系方式",
      "Relationship to the child": "与儿童的关系",
      "Family member": "家庭成员",
      "Neighbour": "邻居",
      "Educator": "教育工作者",
      "Healthcare professional": "医疗专业人员",
      "Member of public": "公众成员",
      "Other": "其他",
      "Child Information": "儿童信息",
      "Child's name": "儿童姓名",
      "Full name known": "知道全名",
      "Nickname only": "只知道小名",
      "Name unknown": "不知道姓名",
      "Full name, nickname, or identifying name": "全名、小名或可识别称呼",
      "Nickname or name used by others": "小名或他人常用称呼",
      "Date of birth or approximate age": "出生日期或大致年龄",
      "Unknown": "未知",
      "Address or location of the child": "儿童地址或所在位置",
      "Exact address unknown": "具体地址未知",
      "Licence Holder Information": "许可持有人信息",
      "Name of licence holder being reported": "被报告的许可持有人姓名",
      "Licence number": "许可编号",
      "Mother": "母亲",
      "Father": "父亲",
      "Guardian": "监护人",
      "Nature of the Report": "报告性质",
      "Type of concern — select all that apply": "担忧类型 — 可多选",
      "Physical abuse": "身体虐待",
      "Psychological abuse or aggression": "心理虐待或攻击",
      "Neglect": "忽视",
      "Licence non-compliance": "许可违规",
      "Other welfare concern": "其他福利担忧",
      "Description of the incident or concern": "事件或担忧描述",
      "Date or period the concern relates to": "相关日期或时间段",
      "Reported to another authority?": "是否已向其他机构报告？",
      "No": "否",
      "Yes": "是",
      "Unsure": "不确定",
      "If yes, which authority?": "如是，请说明机构",
      "Supporting Evidence": "支持证据",
      "File upload": "文件上传",
      "Optional: photos, documents, screenshots, or other supporting materials.": "可选：照片、文件、截图或其他支持材料。",
      "Declaration": "声明",
      "If anyone is in immediate danger, contact local emergency services first. This form is for IPI review and licence compliance follow-up.": "如有人面临即时危险，请先联系当地紧急服务。本表格用于 IPI 审查和许可合规跟进。",
      "I confirm this report is submitted in good faith and to the best of my knowledge is accurate.": "我确认本报告为善意提交，并据我所知内容准确。",
      "Submit anonymously. I understand anonymous reports may be subject to a higher evidential threshold.": "匿名提交。我理解匿名报告可能需要更高的证据门槛。",
      "Submit report": "提交报告",
      "Upload application documents instead": "改为上传申请文件",
      "Clear form": "清空表格",
      "Report form": "报告表格",
      "Clear all entered information?": "确认清空所有已填写内容？",
      "This will remove the information currently typed into the report form. Submitted report status and site reminders will not be deleted.": "这会移除当前报告表格中已填写的内容，但不会删除已提交状态和网站提醒。",
      "Cancel": "取消",
      "Learn": "学习",
      "Support": "支持",
      "About": "关于",
      "All courses": "全部课程",
      "Infancy review": "Infancy 复习",
      "Assessment schedule": "评估日程",
      "Application documents": "申请文件",
      "Help centre": "帮助中心",
      "Accessibility": "无障碍",
      "Our mission": "我们的使命",
      "Member states": "成员国",
      "Reports & research": "报告与研究",
      "Privacy · Terms · Cookies": "隐私 · 条款 · Cookie"
    },
    fr: {},
    es: {}
  };

  const copy = {
    en: {
      myLearning: "My Learning",
      courses: "Courses",
      assessments: "Assessments",
      report: "Report",
      about: "About IPI",
      all: "All",
      searchPlaceholder: "Search courses, modules, documents...",
      countryRegion: "Country / Region",
      language: "Language",
      current: "Current",
      pathwayTitle: "Learning Pathway",
      pathwayIntro: "You have completed the Infancy phase and are now working through Toddlerhood. Completed phases remain available for review, while active Toddlerhood courses drive the current learning plan and assessments.",
      regionalSetting: "Regional course setting",
      courseLanguage: "Course language",
      courseDocuments: "Documents",
      pathwayNote: (region) => `${region}-specific course pathway`,
      regionalTitle: (region) => `${region} pathway`,
      regionalSummary: (profile) => profile.summary,
      documentsText: (profile) => profile.documents
    },
    zh: {
      myLearning: "我的学习",
      courses: "课程",
      assessments: "评估",
      report: "报告",
      about: "关于 IPI",
      all: "全部",
      searchPlaceholder: "搜索课程、模块、文件...",
      countryRegion: "国家 / 地区",
      language: "语言",
      current: "当前",
      pathwayTitle: "学习路径",
      pathwayIntro: "你已完成 Infancy 阶段，目前正在进行 Toddlerhood 阶段。已完成阶段可作为复习材料，当前 Toddlerhood 课程会同步影响学习计划和评估安排。",
      regionalSetting: "地区课程设置",
      courseLanguage: "课程语言",
      courseDocuments: "所需文件",
      pathwayNote: (region) => `${region}地区课程路径`,
      regionalTitle: (region) => `${region}课程路径`,
      regionalSummary: (profile) => profile.summaryZh || profile.summary,
      documentsText: (profile) => profile.documentsZh || profile.documents
    },
    fr: {
      myLearning: "Mon apprentissage",
      courses: "Cours",
      assessments: "Évaluations",
      report: "Rapport",
      about: "À propos d'IPI",
      all: "Tout",
      searchPlaceholder: "Rechercher cours, modules, documents...",
      countryRegion: "Pays / Région",
      language: "Langue",
      current: "Actuel",
      pathwayTitle: "Parcours d'apprentissage",
      pathwayIntro: "Vous avez terminé la phase Infancy et progressez maintenant dans Toddlerhood. Les phases terminées restent disponibles pour révision.",
      regionalSetting: "Paramètres régionaux du cours",
      courseLanguage: "Langue du cours",
      courseDocuments: "Documents",
      pathwayNote: (region) => `Parcours adapté à ${region}`,
      regionalTitle: (region) => `Parcours ${region}`,
      regionalSummary: (profile) => profile.summary,
      documentsText: (profile) => profile.documents
    },
    es: {
      myLearning: "Mi aprendizaje",
      courses: "Cursos",
      assessments: "Evaluaciones",
      report: "Informe",
      about: "Acerca de IPI",
      all: "Todo",
      searchPlaceholder: "Buscar cursos, módulos, documentos...",
      countryRegion: "País / Región",
      language: "Idioma",
      current: "Actual",
      pathwayTitle: "Ruta de aprendizaje",
      pathwayIntro: "Has completado la etapa Infancy y ahora avanzas por Toddlerhood. Las etapas completadas siguen disponibles para repaso.",
      regionalSetting: "Configuración regional del curso",
      courseLanguage: "Idioma del curso",
      courseDocuments: "Documentos",
      pathwayNote: (region) => `Ruta específica para ${region}`,
      regionalTitle: (region) => `Ruta de ${region}`,
      regionalSummary: (profile) => profile.summary,
      documentsText: (profile) => profile.documents
    }
  };

  const regionalProfiles = {
    AU: {
      summary: "Aligned with Australian family support settings, centre-based assessments, and local document requirements.",
      summaryZh: "课程内容对应澳洲家庭支持体系、线下中心评估安排和本地文件要求。",
      language: "English",
      languageZh: "英语",
      documents: "Australian ID, income evidence, and centre attendance confirmation",
      documentsZh: "澳洲身份证明、收入证明和中心出席确认"
    },
    CN: {
      summary: "Uses the same IPI phase logic with China regional examples, identity guidance, and document upload requirements adapted for local applicants.",
      summaryZh: "保留 IPI 阶段逻辑，同时加入中国地区案例、身份材料指引和本地申请文件上传要求。",
      language: "Mandarin Chinese with English reference terms",
      languageZh: "中文普通话，保留英文术语对照",
      documents: "National ID or passport, income evidence, and translated supporting documents where required",
      documentsZh: "居民身份证或护照、收入证明，以及必要时的翻译支持材料"
    },
    US: {
      summary: "Adapted for United States centre scheduling, caregiver documentation, and state-level family support terminology.",
      summaryZh: "课程对应美国中心预约、照护者材料和州级家庭支持术语。",
      language: "English",
      languageZh: "英语",
      documents: "Government ID, household income evidence, and local centre confirmation",
      documentsZh: "政府身份证明、家庭收入证明和本地中心确认"
    },
    GB: {
      summary: "Adapted for United Kingdom family service wording, identity checks, and regional assessment scheduling.",
      summaryZh: "课程对应英国地区家庭服务表述、身份核验和评估预约流程。",
      language: "English",
      languageZh: "英语",
      documents: "Photo ID, income evidence, and assessment attendance confirmation",
      documentsZh: "照片身份证明、收入证明和评估出席确认"
    },
    SG: {
      summary: "Adapted for Singapore centre delivery, bilingual family guidance, and local supporting-document expectations.",
      summaryZh: "课程对应新加坡中心授课、双语家庭指导和本地支持文件要求。",
      language: "English with Mandarin support",
      languageZh: "英语，提供中文支持",
      documents: "NRIC or passport, income evidence, and centre attendance record",
      documentsZh: "NRIC 或护照、收入证明和中心出席记录"
    }
  };

  const timezoneRegion = {
    "Australia/Sydney": "AU",
    "Australia/Melbourne": "AU",
    "Australia/Brisbane": "AU",
    "America/New_York": "US",
    "America/Chicago": "US",
    "America/Denver": "US",
    "America/Los_Angeles": "US",
    "Europe/Zurich": "CH",
    "Europe/Paris": "FR",
    "Europe/Berlin": "DE",
    "Asia/Singapore": "SG"
  };

  const readSavedRegion = () => {
    try {
      return localStorage.getItem("ipi-region");
    } catch (error) {
      return null;
    }
  };

  const saveRegion = (regionCode) => {
    try {
      localStorage.setItem("ipi-region", regionCode);
    } catch (error) {
      // Some local file previews block storage; selection still works on screen.
    }
  };

  const readSavedLanguage = () => {
    try {
      return localStorage.getItem("ipi-language");
    } catch (error) {
      return null;
    }
  };

  const saveLanguage = (languageCode) => {
    try {
      localStorage.setItem("ipi-language", languageCode);
    } catch (error) {
      // Local previews can block storage; on-screen state still updates.
    }
  };

  const applyDefaultRegionOnce = () => {
    const defaultVersion = "AU-default-2026-05-30";
    try {
      if (localStorage.getItem("ipi-region") || localStorage.getItem("ipi-language")) return;
      if (localStorage.getItem("ipi-default-region-version") === defaultVersion) return;
      localStorage.setItem("ipi-region", "AU");
      localStorage.setItem("ipi-language", "en");
      localStorage.setItem("ipi-default-region-version", defaultVersion);
    } catch (error) {
      // Local file previews can block storage; getInitialRegion still falls back to AU.
    }
  };

  const findRegion = (regionCode) => regions.find((region) => region.code === regionCode);
  const findLanguage = (languageCode) => languages.find((language) => language.code === languageCode);

  const getInitialRegion = () => {
    applyDefaultRegionOnce();
    const saved = readSavedRegion();
    if (saved && findRegion(saved)) return saved;

    return "AU";
  };

  let activeRegion = getInitialRegion();
  let activeLanguage = findLanguage(readSavedLanguage()) ? readSavedLanguage() : (languageByRegion[activeRegion] || "en");

  const updateOptions = () => {
    document.querySelectorAll("[data-region-option]").forEach((option) => {
      option.setAttribute("aria-current", option.dataset.regionOption === activeRegion ? "true" : "false");
    });
  };

  const updateLanguageOptions = () => {
    document.querySelectorAll("[data-language-option]").forEach((option) => {
      option.setAttribute("aria-current", option.dataset.languageOption === activeLanguage ? "true" : "false");
    });
  };

  const activeCopy = () => copy[activeLanguage] || (activeLanguage === "zh-Hant" ? copy.zh : null) || copy.en;
  const pageTextNodes = new WeakMap();
  const originalAttributes = new WeakMap();

  const translateValue = (value, dictionary) => {
    if (!dictionary || !value) return value;
    const trimmed = value.replace(/\s+/g, " ").trim();
    if (!trimmed) return value;
    return dictionary[trimmed] || value;
  };

  const translateTextNodes = () => {
    const dictionary = textTranslations[activeLanguage] || (activeLanguage === "zh-Hant" ? textTranslations.zh : null);
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
      acceptNode(node) {
        const parent = node.parentElement;
        if (!parent) return NodeFilter.FILTER_REJECT;
        if (parent.closest("script, style, svg, [data-no-translate], .region-menu, .language-menu, .search-results, .notification-menu, .profile-menu")) {
          return NodeFilter.FILTER_REJECT;
        }
        return node.nodeValue.trim() ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
      }
    });

    const nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);

    nodes.forEach((node) => {
      if (!pageTextNodes.has(node)) pageTextNodes.set(node, node.nodeValue);
      const original = pageTextNodes.get(node);
      const translated = translateValue(original, dictionary);
      node.nodeValue = translated === original ? original : original.replace(original.trim(), translated);
    });
  };

  const translateAttributes = () => {
    const dictionary = textTranslations[activeLanguage] || (activeLanguage === "zh-Hant" ? textTranslations.zh : null);
    document.querySelectorAll("input[placeholder], textarea[placeholder], [aria-label]").forEach((node) => {
      if (!originalAttributes.has(node)) {
        originalAttributes.set(node, {
          placeholder: node.getAttribute("placeholder"),
          ariaLabel: node.getAttribute("aria-label")
        });
      }
      const original = originalAttributes.get(node);
      if (original.placeholder !== null) {
        node.setAttribute("placeholder", translateValue(original.placeholder, dictionary));
      }
      if (original.ariaLabel !== null) {
        node.setAttribute("aria-label", translateValue(original.ariaLabel, dictionary));
      }
    });
  };

  const applyPageTranslations = () => {
    translateTextNodes();
    translateAttributes();
  };

  const getRegionName = (regionCode) => {
    const region = findRegion(regionCode) || findRegion("AU");
    if (activeLanguage === "zh" && regionCode === "CN") return "中国";
    if (activeLanguage === "zh" && regionCode === "AU") return "澳洲";
    return region.label;
  };

  const getRegionalProfile = (regionCode) => regionalProfiles[regionCode] || {
    summary: "Uses the IPI international core curriculum with local scheduling, document upload, and family-support examples adapted to the selected region.",
    summaryZh: "使用 IPI 国际核心课程，并根据所选地区调整预约、文件上传和家庭支持案例。",
    language: "English with local-language support where available",
    languageZh: "英语，按地区提供本地语言支持",
    documents: "Government ID, income evidence, and region-specific supporting documents",
    documentsZh: "政府身份证明、收入证明和地区所需支持材料"
  };

  const applyRegionalCourseDisplay = () => {
    const t = activeCopy();
    const regionName = getRegionName(activeRegion);
    const profile = getRegionalProfile(activeRegion);

    document.querySelectorAll("[data-region-course-note]").forEach((note) => {
      const label = t.pathwayNote(regionName);
      note.textContent = label;
      note.dataset.activeRegion = activeRegion;
      note.setAttribute("aria-label", label);
    });
    document.querySelectorAll("[data-regional-course-title]").forEach((title) => {
      title.textContent = t.regionalTitle(regionName);
      title.dataset.activeRegion = activeRegion;
    });
    document.querySelectorAll("[data-regional-course-summary]").forEach((summary) => {
      summary.textContent = t.regionalSummary(profile);
    });
    document.querySelectorAll("[data-regional-course-language]").forEach((language) => {
      language.textContent = activeLanguage === "zh" ? (profile.languageZh || profile.language) : profile.language;
    });
    document.querySelectorAll("[data-regional-course-docs]").forEach((docs) => {
      docs.textContent = t.documentsText(profile);
    });
  };

  const applyLanguage = (languageCode, options = {}) => {
    activeLanguage = findLanguage(languageCode) ? languageCode : "en";
    if (options.persist) saveLanguage(activeLanguage);

    const language = findLanguage(activeLanguage);
    const t = activeCopy();
    document.documentElement.lang = language.htmlLang;

    document.querySelectorAll("[data-language-label]").forEach((label) => {
      label.textContent = language.label;
    });
    document.querySelectorAll("[data-region-label]").forEach((label) => {
      label.textContent = getRegionName(activeRegion);
    });
    document.querySelectorAll("[data-nav-label]").forEach((link) => {
      link.textContent = t[link.dataset.navLabel] || link.textContent;
    });
    document.querySelectorAll(".search-scope").forEach((scope) => {
      scope.textContent = t.all;
    });
    document.querySelectorAll(".search-input").forEach((input) => {
      input.placeholder = t.searchPlaceholder;
      input.setAttribute("aria-label", t.searchPlaceholder);
    });
    document.querySelectorAll(".region-kicker").forEach((label) => {
      label.textContent = t.countryRegion;
    });
    document.querySelectorAll(".language-kicker").forEach((label) => {
      label.textContent = t.language;
    });
    document.querySelectorAll("[data-i18n]").forEach((node) => {
      const value = t[node.dataset.i18n];
      if (typeof value === "string") node.textContent = value;
    });

    applyPageTranslations();
    updateLanguageOptions();
    applyRegionalCourseDisplay();
    window.dispatchEvent(new Event("languagechange"));
  };

  const applyRegion = (regionCode) => {
    activeRegion = findRegion(regionCode) ? regionCode : "AU";
    const region = findRegion(activeRegion);

    document.querySelectorAll("[data-region-label]").forEach((label) => {
      label.textContent = getRegionName(activeRegion) || region.label;
    });

    updateOptions();
    applyRegionalCourseDisplay();
    window.dispatchEvent(new CustomEvent("regionchange", {
      detail: { region: activeRegion, regionName: getRegionName(activeRegion) }
    }));
  };

  const buildMenu = (menu) => {
    menu.textContent = "";

    const search = document.createElement("input");
    search.className = "region-search";
    search.type = "search";
    search.placeholder = "Search country or region";
    search.setAttribute("aria-label", "Search country or region");

    const list = document.createElement("div");
    list.className = "region-list";

    regions.forEach((region) => {
      const option = document.createElement("button");
      option.className = "region-option";
      option.type = "button";
      option.role = "menuitem";
      option.dataset.regionOption = region.code;

      const name = document.createElement("strong");
      name.textContent = region.label;

      const code = document.createElement("span");
      code.textContent = region.code;

      option.append(name, code);
      list.appendChild(option);
    });

    search.addEventListener("input", () => {
      const query = search.value.trim().toLowerCase();
      list.querySelectorAll("[data-region-option]").forEach((option) => {
        const label = option.querySelector("strong").textContent.toLowerCase();
        const code = option.dataset.regionOption.toLowerCase();
        option.hidden = query && !label.includes(query) && !code.includes(query);
      });
    });

    menu.append(search, list);
  };

  const buildLanguageMenu = (menu) => {
    menu.textContent = "";

    const search = document.createElement("input");
    search.className = "language-search";
    search.type = "search";
    search.placeholder = "Search languages";
    search.setAttribute("aria-label", "Search languages");

    const suggestedTitle = document.createElement("div");
    suggestedTitle.className = "language-section-title";
    suggestedTitle.textContent = "Suggested languages";

    const suggested = document.createElement("div");
    suggested.className = "language-list";

    const allTitle = document.createElement("div");
    allTitle.className = "language-section-title";
    allTitle.textContent = "All languages";

    const all = document.createElement("div");
    all.className = "language-list language-list-scroll";

    const makeOption = (language) => {
      const option = document.createElement("button");
      option.className = "language-option";
      option.type = "button";
      option.role = "menuitem";
      option.dataset.languageOption = language.code;
      option.dataset.languageSearch = `${language.label} ${language.english} ${language.short}`.toLowerCase();

      const name = document.createElement("strong");
      name.textContent = language.label;

      const meta = document.createElement("span");
      meta.textContent = language.supported ? language.english : `${language.english} · preference`;

      option.append(name, meta);
      return option;
    };

    languages.filter((language) => language.suggested).forEach((language) => {
      suggested.appendChild(makeOption(language));
    });

    [...languages]
      .sort((a, b) => a.english.localeCompare(b.english, "en", { sensitivity: "base" }))
      .forEach((language) => {
        all.appendChild(makeOption(language));
      });

    search.addEventListener("input", () => {
      const query = search.value.trim().toLowerCase();
      menu.querySelectorAll("[data-language-option]").forEach((option) => {
        option.hidden = query && !option.dataset.languageSearch.includes(query);
      });
    });

    menu.append(search, suggestedTitle, suggested, allTitle, all);
  };

  document.querySelectorAll("[data-region-selector]").forEach((selector) => {
    const button = selector.querySelector("[data-region-toggle]");
    const menu = selector.querySelector("[data-region-menu]");
    if (!button || !menu) return;

    buildMenu(menu);

    button.addEventListener("click", () => {
      const isOpen = selector.classList.toggle("open");
      button.setAttribute("aria-expanded", String(isOpen));
      if (isOpen) menu.querySelector(".region-search")?.focus();
    });

    selector.querySelectorAll("[data-region-option]").forEach((option) => {
      option.addEventListener("click", () => {
        if (!findRegion(option.dataset.regionOption)) return;
        saveRegion(option.dataset.regionOption);
        applyRegion(option.dataset.regionOption);
        applyLanguage(languageByRegion[activeRegion] || "en", { persist: true });
        selector.classList.remove("open");
        button.setAttribute("aria-expanded", "false");
      });
    });
  });

  document.querySelectorAll("[data-language-selector]").forEach((selector) => {
    const button = selector.querySelector("[data-language-toggle]");
    const menu = selector.querySelector("[data-language-menu]");
    if (!button || !menu) return;

    buildLanguageMenu(menu);

    button.addEventListener("click", () => {
      const isOpen = selector.classList.toggle("open");
      button.setAttribute("aria-expanded", String(isOpen));
      if (isOpen) menu.querySelector(".language-search")?.focus();
    });

    selector.querySelectorAll("[data-language-option]").forEach((option) => {
      option.addEventListener("click", () => {
        if (!findLanguage(option.dataset.languageOption)) return;
        applyLanguage(option.dataset.languageOption, { persist: true });
        selector.classList.remove("open");
        button.setAttribute("aria-expanded", "false");
      });
    });
  });

  document.addEventListener("click", (event) => {
    document.querySelectorAll("[data-region-selector].open").forEach((selector) => {
      if (selector.contains(event.target)) return;
      selector.classList.remove("open");
      selector.querySelector("[data-region-toggle]")?.setAttribute("aria-expanded", "false");
    });
    document.querySelectorAll("[data-language-selector].open").forEach((selector) => {
      if (selector.contains(event.target)) return;
      selector.classList.remove("open");
      selector.querySelector("[data-language-toggle]")?.setAttribute("aria-expanded", "false");
    });
  });

  document.addEventListener("keydown", (event) => {
    if (event.key !== "Escape") return;
    document.querySelectorAll("[data-region-selector].open").forEach((selector) => {
      selector.classList.remove("open");
      selector.querySelector("[data-region-toggle]")?.setAttribute("aria-expanded", "false");
    });
    document.querySelectorAll("[data-language-selector].open").forEach((selector) => {
      selector.classList.remove("open");
      selector.querySelector("[data-language-toggle]")?.setAttribute("aria-expanded", "false");
    });
  });

  applyRegion(activeRegion);
  applyLanguage(activeLanguage);
})();
