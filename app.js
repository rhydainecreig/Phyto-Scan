(function(){

  // ---------------------------------------------------------------
  // Order the Field Guide cards appear in (matches CONDITIONS keys)
  // ---------------------------------------------------------------
  const GUIDE_ORDER = [
    'healthy',
    'earlyBlight',
    'lateBlight',
    'bacterialSpot',
    'powderyMildew',
    'rust',
    'chlorosis',
    'mosaicVirus'
  ];

  // ---------------------------------------------------------------
  // Condition reference data
  // ---------------------------------------------------------------
  const CONDITIONS_EN = {
    healthy: {
      name: "Healthy Tissue",
      tone: "good",
      desc: "Pigment signature falls within the normal range for healthy foliage — predominantly even green with little discoloration.",
      guide: "No visible discoloration, blotching, or spotting. Leaf color is even and saturated.",
      swatch: "var(--green-px)",
      treatment: [
        "No corrective action needed.",
        "Keep a regular watering schedule and avoid wetting foliage late in the day.",
        "Check weekly for early signs of yellowing, spotting, or wilting."
      ]
    },
    earlyBlight: {
      name: "Early Blight",
      tone: "mid",
      desc: "A fungal pattern of moderate, clustered brown lesions — often with darker concentric rings — typical of early blight.",
      guide: "Brown, target-like spots with concentric rings, usually starting on lower/older leaves.",
      swatch: "var(--brown-px)",
      treatment: [
        "Remove and destroy affected leaves rather than composting them.",
        "Apply a copper-based or chlorothalonil fungicide, following the label.",
        "Water at the base of the plant; avoid wetting foliage.",
        "Rotate planting location next season to reduce soil-borne spores."
      ]
    },
    lateBlight: {
      name: "Late Blight",
      tone: "bad",
      desc: "Large, dark, water-soaked blotches with pale margins — a fast-moving fungal pattern that favors cool, damp conditions.",
      guide: "Large dark-green to brown blotches, sometimes with a pale fuzzy edge; spreads quickly in wet weather.",
      swatch: "var(--dark-px)",
      treatment: [
        "Remove and destroy infected plants promptly — this disease spreads fast.",
        "Apply a protectant fungicide before it spreads to neighboring plants.",
        "Avoid working among wet plants, which spreads spores on contact.",
        "Choose resistant varieties for the next planting."
      ]
    },
    bacterialSpot: {
      name: "Bacterial Leaf Spot",
      tone: "mid",
      desc: "Many small, dark, water-soaked spots scattered across the leaf — a pattern more consistent with bacterial infection than fungal blotching.",
      guide: "Small, numerous dark spots, sometimes with a yellow halo, often on both leaf surfaces.",
      swatch: "var(--dark-px)",
      treatment: [
        "Prune and discard infected foliage.",
        "Avoid overhead irrigation and handling plants while wet.",
        "Apply a copper-based bactericide as a preventive measure.",
        "Disinfect pruning tools between plants."
      ]
    },
    powderyMildew: {
      name: "Powdery Mildew",
      tone: "mid",
      desc: "A pale, dusty coating across the leaf surface — the signature pattern of powdery mildew.",
      guide: "White to gray powdery patches on leaves, stems, or buds; leaf may curl as it spreads.",
      swatch: "var(--pale-px)",
      treatment: [
        "Improve air circulation by pruning dense growth.",
        "Apply a sulfur or potassium-bicarbonate fungicide.",
        "Reduce nitrogen fertilizer, which encourages soft, susceptible growth.",
        "Water at the soil line rather than over the foliage."
      ]
    },
    rust: {
      name: "Rust",
      tone: "mid",
      desc: "Numerous small orange-brown pustules scattered evenly across the leaf, characteristic of rust fungi.",
      guide: "Small orange, yellow, or rust-colored raised pustules, often on the underside of leaves.",
      swatch: "#B0742E",
      treatment: [
        "Remove and dispose of infected leaves away from the planting area.",
        "Apply a fungicide labeled for rust, such as a sulfur or myclobutanil product.",
        "Avoid wetting foliage in the evening, when spores spread most easily.",
        "Space plants further apart to reduce humidity around leaves."
      ]
    },
    chlorosis: {
      name: "Nutrient Deficiency",
      tone: "mid",
      desc: "Broad yellowing with little spotting — a pattern more consistent with a nutrient imbalance than disease.",
      guide: "Yellowing between leaf veins while veins stay green, often starting on older or newer growth depending on the nutrient involved.",
      swatch: "var(--yellow-px)",
      treatment: [
        "Test soil pH and nutrient levels before treating.",
        "Interveinal yellowing often points to iron, magnesium, or nitrogen deficiency.",
        "Apply a balanced fertilizer or a targeted micronutrient amendment based on the soil test."
      ]
    },
    mosaicVirus: {
      name: "Mosaic Virus",
      tone: "bad",
      desc: "A mottled patchwork of light and dark green with no true spotting — a pattern typical of viral mosaic.",
      guide: "Mottled light and dark green or yellow patches in an irregular, marbled pattern; leaves may be distorted.",
      swatch: "#A8B36A",
      treatment: [
        "There is no cure once a plant is infected — remove and destroy it to prevent spread.",
        "Control aphids and other insects that commonly carry the virus between plants.",
        "Disinfect tools and wash hands after handling infected plants.",
        "Choose virus-resistant varieties for future plantings."
      ]
    }
  };

  const CONDITIONS_TL = {
    healthy: {
      name: "Malusog na Tisyu",
      tone: "good",
      desc: "Ang signature ng kulay ay nasa normal na saklaw para sa malusog na dahon — pangunahing pantay na berde na may kaunting pagbabago ng kulay.",
      guide: "Walang nakikitang pagbabago ng kulay, batik, o spot. Pantay at matingkad ang kulay ng dahon.",
      swatch: "var(--green-px)",
      treatment: [
        "Walang kailangang gawin.",
        "Panatilihin ang regular na iskedyul ng pagdidilig at iwasang basain ang mga dahon sa gabi.",
        "Suriin lingguhan para sa unang senyales ng paninilaw, batik, o paglanta."
      ]
    },
    earlyBlight: {
      name: "Early Blight",
      tone: "mid",
      desc: "Isang fungal pattern ng katamtamang kumpol ng kayumangging sugat — na may mas madidilim na singsing sa gitna — karaniwan sa early blight.",
      guide: "Kayumanggi, parang-target na mga batik na may concentric rings, karaniwang nagsisimula sa ibaba o matandang mga dahon.",
      swatch: "var(--brown-px)",
      treatment: [
        "Alisin at itapon ang apektadong mga dahon sa halip na i-compost.",
        "Maglagay ng copper-based o chlorothalonil na fungicide, sundin ang label.",
        "Magdilig sa ugat ng halaman; iwasang basain ang mga dahon.",
        "Palitan ang lokasyon ng pagtatanim sa susunod na season para mabawasan ang mga spora sa lupa."
      ]
    },
    lateBlight: {
      name: "Late Blight",
      tone: "bad",
      desc: "Malalaking, madidilim, parang-basang mga batik na may maputlang gilid — isang mabilis kumalat na fungal pattern na paborable sa malamig at basang kondisyon.",
      guide: "Malalaking madilim-berde hanggang kayumangging batik, minsan may maputla at malabo na gilid; mabilis kumalat sa basang panahon.",
      swatch: "var(--dark-px)",
      treatment: [
        "Alisin at itapon agad ang mga apektadong halaman — mabilis kumalat ang sakit na ito.",
        "Maglagay ng protectant fungicide bago ito kumalat sa kalapit na halaman.",
        "Iwasang magtrabaho sa gitna ng basang halaman, dahil doon kumakalat ang spora.",
        "Pumili ng resistant na variety para sa susunod na pagtatanim."
      ]
    },
    bacterialSpot: {
      name: "Bacterial Leaf Spot",
      tone: "mid",
      desc: "Maraming maliliit, madilim, parang-basang batik na kalat sa buong dahon — isang pattern na mas tugma sa bacterial infection kaysa fungal blotching.",
      guide: "Maliit, marami, madilim na batik, minsan may dilaw na halo, kadalasan sa magkabilang gilid ng dahon.",
      swatch: "var(--dark-px)",
      treatment: [
        "Putulin at itapon ang apektadong mga dahon.",
        "Iwasan ang overhead irrigation at paghawak ng halaman kung basa.",
        "Maglagay ng copper-based na bactericide bilang pag-iwas.",
        "I-disinfect ang mga gamit sa pagputol sa pagitan ng mga halaman."
      ]
    },
    powderyMildew: {
      name: "Powdery Mildew",
      tone: "mid",
      desc: "Isang maputla, alikabok na takip sa ibabaw ng dahon — ang signature pattern ng powdery mildew.",
      guide: "Puti hanggang abo na pulbos na patak sa mga dahon, tangkay, o buko; maaaring mangulot ang dahon habang kumakalat.",
      swatch: "var(--pale-px)",
      treatment: [
        "Pagbutihin ang sirkulasyon ng hangin sa pamamagitan ng pag-prune ng siksik na tubo.",
        "Maglagay ng sulfur o potassium-bicarbonate na fungicide.",
        "Bawasan ang nitrogen fertilizer, na nagpapalambot at nagpapahina sa halaman.",
        "Magdilig sa linya ng lupa sa halip na sa mga dahon."
      ]
    },
    rust: {
      name: "Kalawang (Rust)",
      tone: "mid",
      desc: "Maraming maliliit na orange-kayumangging pustule na pantay na kalat sa dahon, katangian ng rust fungi.",
      guide: "Maliliit na orange, dilaw, o kalawang na kulay na nakausling pustule, kadalasan sa ilalim ng dahon.",
      swatch: "#B0742E",
      treatment: [
        "Alisin at itapon ang mga apektadong dahon palayo sa lugar ng pagtatanim.",
        "Maglagay ng fungicide na para sa rust, tulad ng sulfur o myclobutanil na produkto.",
        "Iwasang basain ang mga dahon sa gabi, kung kailan mas madaling kumalat ang spora.",
        "Palakihin ang agwat ng mga halaman para mabawasan ang halumigmig sa paligid ng mga dahon."
      ]
    },
    chlorosis: {
      name: "Kakulangan sa Sustansya",
      tone: "mid",
      desc: "Malawak na paninilaw na may kaunting batik — isang pattern na mas tugma sa kakulangan sa sustansya kaysa sakit.",
      guide: "Paninilaw sa pagitan ng ugat ng dahon habang berde pa rin ang ugat, kadalasan nagsisimula sa matanda o bagong tubo depende sa sustansyang kulang.",
      swatch: "var(--yellow-px)",
      treatment: [
        "Suriin ang pH at antas ng sustansya ng lupa bago gamutin.",
        "Ang interveinal na paninilaw ay kadalasang senyales ng kakulangan sa iron, magnesium, o nitrogen.",
        "Maglagay ng balanced fertilizer o targeted micronutrient amendment batay sa soil test."
      ]
    },
    mosaicVirus: {
      name: "Mosaic Virus",
      tone: "bad",
      desc: "Isang guhit-guhit na pagsasama ng maliwanag at madilim na berde na walang tunay na batik — isang pattern na tipikal sa viral mosaic.",
      guide: "Guhit-guhit na maliwanag at madilim na berde o dilaw na patse sa hindi regular, parang-marmol na anyo; maaaring baluktot ang mga dahon.",
      swatch: "#A8B36A",
      treatment: [
        "Walang lunas kapag nahawa na ang halaman — alisin at itapon ito para maiwasan ang paglaganap.",
        "Kontrolin ang mga peste tulad ng aphids na karaniwang nagdadala ng virus mula sa isang halaman patungo sa iba.",
        "I-disinfect ang mga gamit at maghugas ng kamay pagkatapos hawakan ang mga apektadong halaman.",
        "Pumili ng virus-resistant na variety para sa susunod na pagtatanim."
      ]
    }
  };

  const CONDITIONS_BY_LANG = { en: CONDITIONS_EN, tl: CONDITIONS_TL };

  // ---------------------------------------------------------------
  // UI translations
  // ---------------------------------------------------------------
  const I18N = {
    en: {
      welcomeEyebrow: "Field Specimen Log",
      welcomeTitle: 'Welcome to <em>PhytoScan</em>',
      welcomeLede: "Photograph a leaf and read its pigment and pattern signature against common field symptoms — fungal, bacterial, viral, and nutritional.",
      continueBtn: "Continue",
      eyebrowLabel: "Field Specimen Log · No.",
      headerLede: "Photograph a leaf, and this log reads its pigment and pattern signature against common field symptoms — fungal, bacterial, viral, and nutritional.",
      howto1: "Fill the frame with a single leaf, in even daylight.",
      howto2: "Avoid harsh shadows or glare across the surface.",
      howto3: "Include both healthy and affected areas if visible.",
      takePhoto: "Take Photo",
      chooseLibrary: "Choose from Library",
      matchLabel: "match",
      pigmentAnalysisLabel: "Pigment Analysis",
      otherMatchesLabel: "Other Possible Matches",
      recommendedActionLabel: "Recommended Action",
      downloadReportLabel: "Download Report",
      downloadingLabel: "Preparing…",
      reportTitle: "PhytoScan Field Report",
      reportMatchLabel: "Match",
      reportGeneratedLabel: "Generated",
      loadingLabel: "Reading pigment and pattern signature…",
      welcomeLoadingLabel: "Preparing your field kit…",
      fileErrorMsg: "Couldn't read that photo. Try a different image, or take a new one.",
      noLeafMsg: "No leaf detected. Please scan a leaf — fill the frame with a single leaf and try again.",
      fieldGuideTitle: "Field Guide",
      fieldGuideSub: "Common conditions this tool reads for",
      tapToLearnMore: "Tap to learn more →",
      guideModalSignsLabel: "Field Signs",
      guideModalActionLabel: "Recommended Action",
      methodTitle: "Field Notes — How This Reading Works",
      methodP1: "This tool combines two readings. First it analyzes the photograph pixel by pixel — converting color to hue, saturation, and brightness, then grouping pixels into healthy green, chlorotic yellow, necrotic brown, blackened, and powdery-pale tissue, and mapping the size and number of discolored clusters. Second, when a connection is available, an AI vision model looks at the same photo and gives its own read, which the app blends with the pixel reading.",
      methodP2: "Both readings are estimates, not a clinical diagnosis. Confidence scores reflect how clearly the visual evidence matches a given pattern — not a guarantee of correctness. Lighting, soil staining, overlapping symptoms, and photo quality can all skew a reading, for either method. For valuable crops or an uncertain case, confirm with a local agricultural extension office or plant pathologist before treating.",
      historyTitle: "Scan History",
      historySub: "Recent specimens, kept for 60 minutes",
      historyEmpty: "No scans yet this session.",
      footerText: "Specimen Log — for field reference only, not a substitute for professional plant pathology.",
      specimenLabel: "Specimen —",
      legend: { green:'Green', yellow:'Yellow', brown:'Brown', dark:'Dark/Black', pale:'Pale/Powdery' },
      justNow: "just now",
      oneMinAgo: "1 min ago",
      minAgo: n => `${n} min ago`
    },
    tl: {
      welcomeEyebrow: "Talaan ng Speismen sa Bukid",
      welcomeTitle: 'Maligayang Pagdating sa <em>PhytoScan</em>',
      welcomeLede: "Kumuha ng larawan ng dahon at basahin ang kulay at anyo nito laban sa mga karaniwang sintomas sa bukid — fungal, bacterial, viral, at kakulangan sa sustansya.",
      continueBtn: "Magpatuloy",
      eyebrowLabel: "Talaan ng Speismen sa Bukid · Blg.",
      headerLede: "Kumuha ng larawan ng dahon, at babasahin ng talaang ito ang kulay at anyo nito laban sa mga karaniwang sintomas sa bukid — fungal, bacterial, viral, at kakulangan sa sustansya.",
      howto1: "Punuin ang frame ng iisang dahon, sa pantay na liwanag ng araw.",
      howto2: "Iwasan ang matinding anino o kislap sa ibabaw.",
      howto3: "Isama ang malusog at apektadong bahagi kung nakikita.",
      takePhoto: "Kumuha ng Larawan",
      chooseLibrary: "Pumili mula sa Album",
      matchLabel: "tugma",
      pigmentAnalysisLabel: "Pagsusuri ng Kulay",
      otherMatchesLabel: "Iba Pang Posibleng Tugma",
      recommendedActionLabel: "Inirerekomendang Aksyon",
      downloadReportLabel: "I-download ang Ulat",
      downloadingLabel: "Inihahanda…",
      reportTitle: "PhytoScan Ulat sa Bukid",
      reportMatchLabel: "Tugma",
      reportGeneratedLabel: "Ginawa noong",
      loadingLabel: "Binabasa ang kulay at anyo ng dahon…",
      welcomeLoadingLabel: "Inihahanda ang iyong field kit…",
      fileErrorMsg: "Hindi mabasa ang larawang iyon. Sumubok ng ibang larawan, o kumuha ng bago.",
      noLeafMsg: "Walang nakitang dahon. Mangyaring mag-scan ng dahon — punuin ang frame ng isang dahon at subukan muli.",
      fieldGuideTitle: "Gabay sa Bukid",
      fieldGuideSub: "Karaniwang mga kondisyong nababasa ng tool na ito",
      tapToLearnMore: "Pindutin para malaman pa →",
      guideModalSignsLabel: "Mga Palatandaan sa Dahon",
      guideModalActionLabel: "Inirerekomendang Aksyon",
      methodTitle: "Mga Tala sa Bukid — Paano Gumagana ang Pagbasang Ito",
      methodP1: "Pinagsasama ng tool na ito ang dalawang pagbasa. Una, sinusuri nito ang larawan nang pixel by pixel — kino-convert ang kulay tungo sa hue, saturation, at brightness, pagkatapos ay pinapangkat ang mga pixel bilang malusog na berde, dilaw na chlorotic, kayumangging necrotic, itim, at maputlang tisyu, at sinusukat ang laki at bilang ng mga kumpol na may pagbabago ng kulay. Pangalawa, kapag may koneksyon, tinitingnan din ng isang AI vision model ang parehong larawan at nagbibigay ng sarili nitong pagbasa, na pinagsasama ng app sa pixel reading.",
      methodP2: "Parehong tantiya lamang ang dalawang pagbasa, hindi klinikal na diagnosis. Ang confidence score ay sumasalamin sa kung gaano kalinaw na tumutugma ang biswal na ebidensya sa isang pattern — hindi ito garantiya ng tamang sagot. Ang liwanag, mantsa mula sa lupa, magkakapatong na sintomas, at kalidad ng larawan ay maaaring makaapekto sa resulta, sa alinmang paraan. Para sa mahahalagang pananim o kung hindi sigurado, kumonsulta muna sa lokal na tanggapan ng agrikultura o plant pathologist bago gamutin.",
      historyTitle: "Kasaysayan ng Scan",
      historySub: "Mga huling speismen, itinatago ng 60 minuto",
      historyEmpty: "Wala pang scan sa session na ito.",
      footerText: "Talaan ng Speismen — para sa sanggunian sa bukid lamang, hindi kapalit ng propesyonal na plant pathology.",
      specimenLabel: "Speismen —",
      legend: { green:'Berde', yellow:'Dilaw', brown:'Kayumanggi', dark:'Madilim/Itim', pale:'Maputla/Pulbos' },
      justNow: "ngayon lang",
      oneMinAgo: "1 minuto ang nakalipas",
      minAgo: n => `${n} minuto ang nakalipas`
    }
  };

  let currentLang = 'en';
  let CONDITIONS = CONDITIONS_BY_LANG[currentLang];
  let currentLogNumber = String(Math.floor(Math.random()*900000)+100000).slice(0,6);
  let lastShown = null; // { ratio, scores, imgSrc, dateLabel, aiExplanation, aiUsed } for re-render on language switch

  function applyTranslations(){
    const t = I18N[currentLang];
    document.getElementById('welcomeEyebrow').textContent = t.welcomeEyebrow;
    document.getElementById('welcomeTitle').innerHTML = t.welcomeTitle;
    document.getElementById('welcomeLede').textContent = t.welcomeLede;
    document.getElementById('continueBtnLabel').textContent = t.continueBtn;
    document.getElementById('welcomeLoadingLabel').textContent = t.welcomeLoadingLabel;
    document.getElementById('headerEyebrow').innerHTML = `${t.eyebrowLabel} <span id="logNumber">${currentLogNumber}</span>`;
    document.getElementById('headerLede').textContent = t.headerLede;
    document.getElementById('howto1').textContent = t.howto1;
    document.getElementById('howto2').textContent = t.howto2;
    document.getElementById('howto3').textContent = t.howto3;
    document.getElementById('takePhotoLabel').textContent = t.takePhoto;
    document.getElementById('chooseLibraryLabel').textContent = t.chooseLibrary;
    document.getElementById('matchLabel').textContent = t.matchLabel;
    document.getElementById('pigmentAnalysisLabel').textContent = t.pigmentAnalysisLabel;
    document.getElementById('otherMatchesLabel').textContent = t.otherMatchesLabel;
    document.getElementById('recommendedActionLabel').textContent = t.recommendedActionLabel;
    document.getElementById('downloadReportLabel').textContent = t.downloadReportLabel;
    document.getElementById('loadingLabel').textContent = t.loadingLabel;
    document.getElementById('fieldGuideTitle').textContent = t.fieldGuideTitle;
    document.getElementById('fieldGuideSub').textContent = t.fieldGuideSub;
    document.getElementById('methodTitle').textContent = t.methodTitle;
    document.getElementById('methodP1').textContent = t.methodP1;
    document.getElementById('methodP2').textContent = t.methodP2;
    document.getElementById('historyTitle').textContent = t.historyTitle;
    document.getElementById('historySub').textContent = t.historySub;
    document.getElementById('footerText').textContent = t.footerText;

    document.querySelectorAll('.lang-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.lang === currentLang);
    });

    const errEl = document.getElementById('fileError');
    if(errEl && !errEl.hidden && currentErrorKey) errEl.textContent = t[currentErrorKey];

    buildGuide();
    renderHistory();
    if(lastShown){
      displayDiagnosis(lastShown.ratio, lastShown.scores, lastShown.dateLabel);
    } else {
      document.getElementById('fieldId').textContent = t.specimenLabel;
    }
  }

  function setLanguage(lang){
    if(!CONDITIONS_BY_LANG[lang] || lang === currentLang){
      if(!CONDITIONS_BY_LANG[lang]) return;
    }
    currentLang = lang;
    CONDITIONS = CONDITIONS_BY_LANG[currentLang];
    applyTranslations();
  }

  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', () => setLanguage(btn.dataset.lang));
  });

  function buildGuide(){
    const t = I18N[currentLang];
    const grid = document.getElementById('guideGrid');
    grid.innerHTML = GUIDE_ORDER.map(key => {
      const c = CONDITIONS[key];
      return `<button type="button" class="guide-card" data-key="${key}">
        <div class="swatch" style="background:${c.swatch}"></div>
        <h4>${c.name}</h4>
        <p>${c.guide}</p>
        <span class="tap-hint">${t.tapToLearnMore}</span>
      </button>`;
    }).join('');

    grid.querySelectorAll('.guide-card').forEach(btn => {
      btn.addEventListener('click', () => openGuideModal(btn.dataset.key));
    });
  }

  // ---------------------------------------------------------------
  // Field Guide detail modal
  // ---------------------------------------------------------------
  const guideModalOverlay = document.getElementById('guideModalOverlay');
  const guideModalClose = document.getElementById('guideModalClose');
  let lastFocusedGuideBtn = null;

  function openGuideModal(key){
    const c = CONDITIONS[key];
    if(!c) return;
    const t = I18N[currentLang];

    document.getElementById('guideModalSwatch').style.background = c.swatch;
    document.getElementById('guideModalTitle').textContent = c.name;
    document.getElementById('guideModalDesc').textContent = c.desc;
    document.getElementById('guideModalSignsLabel').textContent = t.guideModalSignsLabel;
    document.getElementById('guideModalSigns').textContent = c.guide;
    document.getElementById('guideModalActionLabel').textContent = t.guideModalActionLabel;
    document.getElementById('guideModalTreatment').innerHTML = c.treatment.map(item => `<li>${item}</li>`).join('');

    lastFocusedGuideBtn = document.activeElement;
    guideModalOverlay.hidden = false;
    guideModalClose.focus();
  }

  function closeGuideModal(){
    guideModalOverlay.hidden = true;
    if(lastFocusedGuideBtn && typeof lastFocusedGuideBtn.focus === 'function'){
      lastFocusedGuideBtn.focus();
    }
  }

  guideModalClose.addEventListener('click', closeGuideModal);
  guideModalOverlay.addEventListener('click', e => {
    if(e.target === guideModalOverlay) closeGuideModal();
  });
  document.addEventListener('keydown', e => {
    if(e.key === 'Escape' && !guideModalOverlay.hidden) closeGuideModal();
  });

  // ---------------------------------------------------------------
  // File intake — drag/drop, library picker, and native camera
  // ---------------------------------------------------------------
  const fileInput = document.getElementById('fileInput');
  const cameraInput = document.getElementById('cameraInput');
  const cameraBtn = document.getElementById('cameraBtn');
  const libraryBtn = document.getElementById('libraryBtn');
  const resultCard = document.getElementById('resultCard');
  const loadingNote = document.getElementById('loadingNote');
  const previewImg = document.getElementById('previewImg');

  // ---------------------------------------------------------------
  // Scan history — kept in memory only, each entry expires after 60 min
  // ---------------------------------------------------------------
  const HISTORY_LIMIT_MS = 60 * 60 * 1000;
  const historyEntries = [];
  const historyGrid = document.getElementById('historyGrid');
  const historyEmpty = document.getElementById('historyEmpty');

  function addHistoryEntry(imgSrc, conditionKey, pct, ratio, scores, dateLabel, aiExplanation){
    historyEntries.unshift({ imgSrc, conditionKey, pct, ratio, scores, dateLabel, aiExplanation, timestamp: Date.now() });
    renderHistory();
  }

  function timeAgoLabel(timestamp){
    const t = I18N[currentLang];
    const minutes = Math.max(0, Math.round((Date.now() - timestamp) / 60000));
    if(minutes < 1) return t.justNow;
    if(minutes === 1) return t.oneMinAgo;
    return t.minAgo(minutes);
  }

  function renderHistory(){
    pruneHistoryNoRender();
    if(historyEntries.length === 0){
      historyEmpty.style.display = 'block';
      historyGrid.innerHTML = '';
      return;
    }
    historyEmpty.style.display = 'none';
    historyGrid.innerHTML = historyEntries.map((entry, i) => {
      const cond = CONDITIONS[entry.conditionKey];
      return `
      <button type="button" class="history-card" data-index="${i}" aria-label="${cond.name}">
        <img src="${entry.imgSrc}" alt="${cond.name}" />
        <div class="history-name">${cond.name}</div>
        <div class="history-meta"><span>${entry.pct}%</span><span>${timeAgoLabel(entry.timestamp)}</span></div>
      </button>
    `;
    }).join('');

    historyGrid.querySelectorAll('.history-card').forEach(card => {
      card.addEventListener('click', () => {
        const entry = historyEntries[Number(card.dataset.index)];
        if(!entry) return;
        viewHistoryEntry(entry);
      });
    });
  }

  function viewHistoryEntry(entry){
    previewImg.src = entry.imgSrc;
    loadingNote.classList.remove('active');
    displayDiagnosis(entry.ratio, entry.scores, entry.dateLabel, entry.aiExplanation);
    resultCard.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  // internal prune used inside render to avoid recursive re-render loop
  function pruneHistoryNoRender(){
    const now = Date.now();
    for(let i = historyEntries.length - 1; i >= 0; i--){
      if(now - historyEntries[i].timestamp > HISTORY_LIMIT_MS) historyEntries.splice(i, 1);
    }
  }

  // Refresh timestamps and expire old entries once a minute
  setInterval(renderHistory, 60 * 1000);

  // Welcome screen -> Continue reveals the app, with a brief loading animation
  const welcomeScreen = document.getElementById('welcomeScreen');
  const continueBtn = document.getElementById('continueBtn');
  const welcomeLoading = document.getElementById('welcomeLoading');
  continueBtn.addEventListener('click', () => {
    if(continueBtn.classList.contains('is-loading')) return;
    continueBtn.classList.add('is-loading');
    continueBtn.disabled = true;
    welcomeLoading.hidden = false;
    setTimeout(() => {
      welcomeScreen.classList.add('is-transitioning');
      welcomeScreen.addEventListener('animationend', () => {
        document.body.classList.remove('pre-welcome');
        welcomeScreen.style.display = 'none';
      }, { once:true });
    }, 850);
  });

  // "Take Photo" opens the phone's built-in camera app directly via
  // the capture="environment" file input (rear camera preferred).
  cameraBtn.addEventListener('click', () => cameraInput.click());
  cameraInput.addEventListener('change', e => {
    if(e.target.files && e.target.files[0]) handleFile(e.target.files[0]);
    cameraInput.value = '';
  });

  // "Choose from Library" opens the standard photo picker
  libraryBtn.addEventListener('click', () => fileInput.click());
  fileInput.addEventListener('change', e => {
    if(e.target.files && e.target.files[0]) handleFile(e.target.files[0]);
    fileInput.value = '';
  });

  const IMAGE_EXT_RE = /\.(heic|heif|jpg|jpeg|png|webp|gif|bmp|tiff|tif)$/i;

  function looksLikeImage(file){
    if(file.type && file.type.startsWith('image/')) return true;
    // Some iOS HEIC/HEIF files report an empty or generic type — fall back to extension.
    if(!file.type || file.type === 'application/octet-stream') return IMAGE_EXT_RE.test(file.name || '');
    return false;
  }

  const loadingPreview = document.getElementById('loadingPreview');

  function setCaptureBusy(isBusy){
    cameraBtn.disabled = isBusy;
    libraryBtn.disabled = isBusy;
    cameraBtn.classList.toggle('is-busy', isBusy);
    libraryBtn.classList.toggle('is-busy', isBusy);
  }

  function handleFile(file){
    hideFileError();
    if(!looksLikeImage(file)){
      showFileError();
      return;
    }
    const reader = new FileReader();
    reader.onerror = () => showFileError();
    reader.onload = ev => {
      const img = new Image();
      img.onload = () => {
        previewImg.src = ev.target.result;
        loadingPreview.src = ev.target.result;
        resultCard.hidden = true;
        loadingNote.classList.add('active');
        setCaptureBusy(true);
        loadingNote.scrollIntoView({ behavior:'smooth', block:'center' });
        analyzeImage(img).finally(() => setCaptureBusy(false));
      };
      img.onerror = () => showFileError();
      img.src = ev.target.result;
    };
    reader.readAsDataURL(file);
  }

  let currentErrorKey = null; // 'fileErrorMsg' | 'noLeafMsg' — keeps the message in sync with language switches

  function showError(key){
    loadingNote.classList.remove('active');
    setCaptureBusy(false);
    const el = document.getElementById('fileError');
    if(el){
      currentErrorKey = key;
      el.textContent = I18N[currentLang][key];
      el.hidden = false;
    }
  }

  function showFileError(){ showError('fileErrorMsg'); }

  // Not a leaf: clear any previous result and ask for a leaf scan.
  function rejectNonLeaf(){
    resultCard.hidden = true;
    lastShown = null;
    showError('noLeafMsg');
    const el = document.getElementById('fileError');
    if(el) el.scrollIntoView({ behavior:'smooth', block:'center' });
  }

  function hideFileError(){
    const el = document.getElementById('fileError');
    currentErrorKey = null;
    if(el) el.hidden = true;
  }

  // ---------------------------------------------------------------
  // Pixel analysis
  // ---------------------------------------------------------------
  function rgbToHsv(r, g, b){
    r/=255; g/=255; b/=255;
    const max = Math.max(r,g,b), min = Math.min(r,g,b);
    const d = max - min;
    let h = 0;
    if(d !== 0){
      if(max === r) h = ((g-b)/d) % 6;
      else if(max === g) h = (b-r)/d + 2;
      else h = (r-g)/d + 4;
      h *= 60;
      if(h < 0) h += 360;
    }
    const s = max === 0 ? 0 : d/max;
    const v = max;
    return [h, s, v];
  }

  function classifyPixel(h, s, v){
    if(v < 0.22) return 'dark';
    if(s < 0.16 && v > 0.55) return 'pale';
    if(h >= 70 && h <= 170 && s > 0.18) return 'green';
    if(h >= 35 && h < 70) return 'yellow';
    if((h >= 10 && h < 35) || (h >= 340)) return 'brown';
    return 'other';
  }

  // ---------------------------------------------------------------
  // AI-assisted reading — calls a server-side endpoint (see /api/diagnose)
  // that forwards the photo to a vision-capable model. The API key never
  // touches the browser. If the endpoint is unreachable or errors out,
  // callers fall back to the pixel heuristic alone.
  // ---------------------------------------------------------------
  const CONDITION_KEYS = ['healthy','earlyBlight','lateBlight','bacterialSpot','powderyMildew','rust','chlorosis','mosaicVirus'];

  function dataUrlToParts(dataUrl){
    const match = /^data:([^;]+);base64,(.+)$/.exec(dataUrl || '');
    if(!match) return null;
    return { mediaType: match[1], base64: match[2] };
  }

  async function callAIDiagnosis(dataUrl){
    const parts = dataUrlToParts(dataUrl);
    if(!parts) return null;
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 20000);
    try{
      const resp = await fetch('/api/diagnose', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ imageBase64: parts.base64, mediaType: parts.mediaType, lang: currentLang }),
        signal: controller.signal
      });
      clearTimeout(timer);
      if(!resp.ok) return null;
      const json = await resp.json();
      if(!json || json.error) return null;
      if(json.isLeaf === false) return { isLeaf:false };
      if(!CONDITION_KEYS.includes(json.conditionKey)) return null;
      return json;
    }catch(e){
      clearTimeout(timer);
      return null;
    }
  }

  // Blend the AI's classification (one primary key + a few alternates,
  // each 0-100) with the full 8-way heuristic distribution, so the rest
  // of the UI (which expects a normalized score per key) needs no changes.
  function mergeAIScores(aiResult, heuristicScores){
    const scores = {};
    CONDITION_KEYS.forEach(k => scores[k] = 0);

    scores[aiResult.conditionKey] = Math.max(0, Math.min(100, Number(aiResult.confidence) || 0)) / 100;
    (aiResult.alternates || []).forEach(alt => {
      if(alt && CONDITION_KEYS.includes(alt.key)){
        const v = Math.max(0, Math.min(100, Number(alt.confidence) || 0)) / 100;
        scores[alt.key] = Math.max(scores[alt.key], v);
      }
    });

    const assignedSum = Object.values(scores).reduce((a,b) => a+b, 0);
    const remaining = Math.max(0, 1 - assignedSum);
    const unassignedKeys = CONDITION_KEYS.filter(k => scores[k] === 0);
    const heuristicUnassignedSum = unassignedKeys.reduce((s,k) => s + (heuristicScores[k]||0), 0) || 1;
    unassignedKeys.forEach(k => {
      scores[k] = remaining * ((heuristicScores[k]||0) / heuristicUnassignedSum);
    });

    const sum = Object.values(scores).reduce((a,b) => a+b, 0) || 1;
    CONDITION_KEYS.forEach(k => scores[k] = scores[k] / sum);
    return scores;
  }

  // Offline fallback only — needs some real green / yellow-green in frame.
  function looksLeafLike(ratio){
    return (ratio.green + ratio.yellow) >= 0.12;
  }

  async function analyzeImage(img){
    const size = 220;
    const canvas = document.createElement('canvas');
    canvas.width = size; canvas.height = size;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });

    // center-crop the image to a square before sampling
    const s = Math.min(img.width, img.height);
    const sx = (img.width - s) / 2, sy = (img.height - s) / 2;
    ctx.drawImage(img, sx, sy, s, s, 0, 0, size, size);

    const data = ctx.getImageData(0, 0, size, size).data;
    const counts = { green:0, yellow:0, brown:0, dark:0, pale:0, other:0 };
    const grid = new Array(size*size);
    let total = 0;

    for(let i = 0, p = 0; i < data.length; i += 4, p++){
      const r = data[i], g = data[i+1], b = data[i+2];
      const [h, sat, v] = rgbToHsv(r, g, b);
      const cls = classifyPixel(h, sat, v);
      counts[cls]++;
      grid[p] = cls;
      total++;
    }

    const ratio = {};
    Object.keys(counts).forEach(k => ratio[k] = counts[k] / total);

    // Spot pattern: count connected blotches of non-green, non-pale-background pixels
    const spotClasses = new Set(['brown','dark','yellow']);
    const visited = new Uint8Array(size*size);
    let clusterCount = 0;
    let largestCluster = 0;
    const stack = [];
    for(let idx = 0; idx < grid.length; idx++){
      if(visited[idx] || !spotClasses.has(grid[idx])) continue;
      let clusterSize = 0;
      stack.push(idx);
      visited[idx] = 1;
      while(stack.length){
        const cur = stack.pop();
        clusterSize++;
        const cx = cur % size, cy = Math.floor(cur / size);
        const neighbors = [
          [cx-1,cy],[cx+1,cy],[cx,cy-1],[cx,cy+1]
        ];
        for(const [nx, ny] of neighbors){
          if(nx < 0 || ny < 0 || nx >= size || ny >= size) continue;
          const nIdx = ny*size + nx;
          if(!visited[nIdx] && grid[nIdx] === grid[cur]){
            visited[nIdx] = 1;
            stack.push(nIdx);
          }
        }
      }
      if(clusterSize >= 3){
        clusterCount++;
        largestCluster = Math.max(largestCluster, clusterSize);
      }
    }

    const heuristicScores = scoreConditions(ratio, clusterCount, largestCluster, size*size);
    const dateLabel = new Date().toLocaleDateString(undefined,{month:'short',day:'numeric',year:'numeric'});

    let scores = heuristicScores;
    let aiExplanation = null;
    const aiResult = await callAIDiagnosis(previewImg.src);

    // Leaf gate: the AI decides when it's reachable; otherwise a loose color
    // check still turns away obviously non-plant photos.
    if(aiResult && aiResult.isLeaf === false){ rejectNonLeaf(); return; }
    if(!aiResult && !looksLeafLike(ratio)){ rejectNonLeaf(); return; }

    if(aiResult){
      scores = mergeAIScores(aiResult, heuristicScores);
      aiExplanation = aiResult.explanation || null;
    }

    displayDiagnosis(ratio, scores, dateLabel, aiExplanation);

    const ranked = Object.entries(scores).sort((a,b) => b[1]-a[1]);
    const [topKey, topScore] = ranked[0];
    const pct = Math.round(topScore * 100);
    addHistoryEntry(previewImg.src, topKey, pct, ratio, scores, dateLabel, aiExplanation);
  }

  function scoreConditions(ratio, clusterCount, largestCluster, totalPx){
    const clusterDensity = clusterCount / (totalPx / 2000); // clusters per unit area
    const largestFrac = largestCluster / totalPx;
    const scores = {};

    scores.healthy = Math.max(0, ratio.green * 100 - (ratio.brown + ratio.dark + ratio.yellow + ratio.pale) * 140);

    scores.earlyBlight = (ratio.brown * 160) + (clusterDensity > 1 && clusterDensity < 9 ? 22 : 0) - ratio.pale*80 - ratio.yellow*30;

    scores.lateBlight = (ratio.dark * 130) + (largestFrac > 0.05 ? 30 : 0) + (ratio.brown * 40) - ratio.pale*60;

    scores.bacterialSpot = (ratio.dark * 90) + (clusterDensity > 7 ? 35 : 0) - largestFrac*200 - ratio.pale*60;

    scores.powderyMildew = (ratio.pale * 170) - ratio.brown*60 - ratio.dark*40;

    scores.rust = (ratio.brown * 100) + (clusterDensity > 10 ? 30 : 0) - largestFrac*250 - ratio.pale*50;

    scores.chlorosis = (ratio.yellow * 150) - (clusterDensity * 8) - ratio.dark*60 - ratio.brown*40;

    scores.mosaicVirus = (ratio.yellow * 60) + (ratio.green * 40) - ratio.brown*100 - ratio.dark*100 - ratio.pale*80
      + (ratio.yellow > 0.08 && ratio.yellow < 0.4 && ratio.green > 0.3 ? 25 : 0);

    // normalize to non-negative
    Object.keys(scores).forEach(k => { scores[k] = Math.max(0, scores[k]); });

    const sum = Object.values(scores).reduce((a,b) => a+b, 0) || 1;
    const normalized = {};
    Object.keys(scores).forEach(k => { normalized[k] = scores[k] / sum; });
    return normalized;
  }

  // ---------------------------------------------------------------
  // Render
  // ---------------------------------------------------------------
  function displayDiagnosis(ratio, scores, dateLabel, aiExplanation){
    const t = I18N[currentLang];
    loadingNote.classList.remove('active');
    lastShown = { ratio, scores, dateLabel, aiExplanation };

    const ranked = Object.entries(scores).sort((a,b) => b[1]-a[1]);
    const [topKey, topScore] = ranked[0];
    const top = CONDITIONS[topKey];
    const pct = Math.round(topScore * 100);

    document.getElementById('fieldId').textContent = `${t.specimenLabel} ${dateLabel}`;
    document.getElementById('diagName').textContent = top.name;
    document.getElementById('diagDesc').textContent = aiExplanation || top.desc;

    const stampEl = document.getElementById('stamp');
    stampEl.className = 'stamp tone-' + top.tone;
    document.getElementById('stampPct').textContent = pct + '%';

    // pigment bar
    const barColors = {
      green: 'var(--green-px)', yellow: 'var(--yellow-px)',
      brown: 'var(--brown-px)', dark: 'var(--dark-px)', pale: 'var(--pale-px)'
    };
    const barKeys = ['green','yellow','brown','dark','pale'];
    const bar = document.getElementById('pigmentBar');
    bar.innerHTML = barKeys.map(k =>
      `<span style="width:${(ratio[k]*100).toFixed(1)}%;background:${barColors[k]}"></span>`
    ).join('');

    document.getElementById('pigmentLegend').innerHTML = barKeys.map(k =>
      `<li><span class="dot" style="background:${barColors[k]}"></span>${t.legend[k]} ${(ratio[k]*100).toFixed(0)}%</li>`
    ).join('');

    // alternates
    const altList = document.getElementById('altList');
    altList.innerHTML = ranked.slice(1, 4).map(([key, score]) =>
      `<li><span>${CONDITIONS[key].name}</span><span>${Math.round(score*100)}%</span></li>`
    ).join('');

    // treatment
    document.getElementById('treatmentList').innerHTML = top.treatment.map(item => `<li>${item}</li>`).join('');

    resultCard.hidden = false;
  }

  // ---------------------------------------------------------------
  // Download Report — renders a self-contained PNG summary of the
  // current diagnosis (photo, match, pigment bar, matches, treatment)
  // entirely on-device via Canvas, no network required.
  // ---------------------------------------------------------------
  const downloadReportBtn = document.getElementById('downloadReportBtn');

  function wrapText(ctx, text, x, y, maxWidth, lineHeight){
    const words = String(text).split(' ');
    let line = '';
    for(let n = 0; n < words.length; n++){
      const testLine = line + words[n] + ' ';
      if(ctx.measureText(testLine).width > maxWidth && n > 0){
        ctx.fillText(line.trim(), x, y);
        line = words[n] + ' ';
        y += lineHeight;
      } else {
        line = testLine;
      }
    }
    if(line.trim()) ctx.fillText(line.trim(), x, y);
    return y + lineHeight;
  }

  function buildReportCanvas(ratio, scores, dateLabel, imgEl, aiExplanation){
    const t = I18N[currentLang];
    const ranked = Object.entries(scores).sort((a,b) => b[1]-a[1]);
    const [topKey, topScore] = ranked[0];
    const top = CONDITIONS[topKey];
    const pct = Math.round(topScore * 100);

    const W = 1000;
    const PAD = 64;
    const contentW = W - PAD * 2;

    const work = document.createElement('canvas');
    work.width = W;
    work.height = 2800; // oversized scratch canvas, cropped to content at the end
    const ctx = work.getContext('2d');

    ctx.fillStyle = '#F8F4E9';
    ctx.fillRect(0, 0, work.width, work.height);
    ctx.textBaseline = 'alphabetic';

    let y = PAD;

    // Eyebrow + title
    ctx.fillStyle = '#B5471B';
    ctx.font = '600 14px "IBM Plex Mono", monospace';
    ctx.fillText((t.reportTitle || 'PhytoScan Field Report').toUpperCase(), PAD, y);
    y += 40;

    ctx.fillStyle = '#2F3B26';
    ctx.font = '600 44px Fraunces, serif';
    ctx.fillText('PhytoScan', PAD, y);
    y += 20;

    ctx.strokeStyle = 'rgba(47,59,38,0.18)';
    ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(PAD, y + 20); ctx.lineTo(W - PAD, y + 20); ctx.stroke();
    y += 60;

    // Specimen photo, centered
    const photoSize = 420;
    const photoX = (W - photoSize) / 2;
    try{ ctx.drawImage(imgEl, photoX, y, photoSize, photoSize); }catch(e){}
    ctx.strokeStyle = 'rgba(47,59,38,0.2)';
    ctx.lineWidth = 1.5;
    ctx.strokeRect(photoX, y, photoSize, photoSize);
    y += photoSize + 28;

    ctx.fillStyle = '#5B6650';
    ctx.font = '400 14px "IBM Plex Mono", monospace';
    ctx.textAlign = 'center';
    ctx.fillText(`${t.specimenLabel} ${dateLabel}`, W / 2, y);
    ctx.textAlign = 'left';
    y += 46;

    // Diagnosis name + match %
    ctx.fillStyle = '#2F3B26';
    ctx.font = '600 32px Fraunces, serif';
    ctx.fillText(top.name, PAD, y);
    ctx.fillStyle = top.tone === 'good' ? '#3C5A40' : (top.tone === 'bad' ? '#B5471B' : '#8C6A14');
    ctx.font = '600 20px "IBM Plex Mono", monospace';
    ctx.textAlign = 'right';
    ctx.fillText(`${pct}% ${t.matchLabel}`, W - PAD, y);
    ctx.textAlign = 'left';
    y += 34;

    // Description
    ctx.fillStyle = '#5B6650';
    ctx.font = '400 16px Inter, sans-serif';
    y = wrapText(ctx, aiExplanation || top.desc, PAD, y, contentW, 24);
    y += 20;

    // Pigment Analysis
    ctx.fillStyle = '#5B6650';
    ctx.font = '600 13px "IBM Plex Mono", monospace';
    ctx.fillText((t.pigmentAnalysisLabel || 'Pigment Analysis').toUpperCase(), PAD, y);
    y += 20;

    const barColors = {
      green: '#6B8F4E', yellow: '#D8B23A', brown: '#9A5A2A', dark: '#3A332B', pale: '#D9D2BE'
    };
    const barKeys = ['green','yellow','brown','dark','pale'];
    const barH = 22;
    let bx = PAD;
    barKeys.forEach(k => {
      const w = contentW * (ratio[k] || 0);
      ctx.fillStyle = barColors[k];
      ctx.fillRect(bx, y, w, barH);
      bx += w;
    });
    ctx.strokeStyle = 'rgba(47,59,38,0.18)';
    ctx.strokeRect(PAD, y, contentW, barH);
    y += barH + 24;

    ctx.font = '400 14px Inter, sans-serif';
    barKeys.forEach(k => {
      ctx.fillStyle = barColors[k];
      ctx.beginPath(); ctx.arc(PAD + 6, y - 5, 6, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = '#5B6650';
      ctx.fillText(`${t.legend[k]} ${Math.round((ratio[k]||0)*100)}%`, PAD + 20, y);
      y += 26;
    });
    y += 20;

    // Other Possible Matches
    ctx.fillStyle = '#5B6650';
    ctx.font = '600 13px "IBM Plex Mono", monospace';
    ctx.fillText((t.otherMatchesLabel || 'Other Possible Matches').toUpperCase(), PAD, y);
    y += 26;
    ctx.font = '400 15px "IBM Plex Mono", monospace';
    ranked.slice(1, 4).forEach(([key, score]) => {
      ctx.fillStyle = '#5B6650';
      ctx.fillText(CONDITIONS[key].name, PAD, y);
      ctx.fillStyle = '#2F3B26';
      ctx.textAlign = 'right';
      ctx.fillText(`${Math.round(score*100)}%`, W - PAD, y);
      ctx.textAlign = 'left';
      y += 18;
      ctx.strokeStyle = 'rgba(47,59,38,0.14)';
      ctx.beginPath(); ctx.moveTo(PAD, y); ctx.lineTo(W - PAD, y); ctx.stroke();
      y += 18;
    });
    y += 16;

    // Recommended Action
    ctx.fillStyle = '#5B6650';
    ctx.font = '600 13px "IBM Plex Mono", monospace';
    ctx.fillText((t.recommendedActionLabel || 'Recommended Action').toUpperCase(), PAD, y);
    y += 26;
    ctx.font = '400 16px Inter, sans-serif';
    top.treatment.forEach(item => {
      ctx.fillStyle = '#6B7F4F';
      ctx.fillText('–', PAD, y);
      ctx.fillStyle = '#2F3B26';
      y = wrapText(ctx, item, PAD + 20, y, contentW - 20, 23);
      y += 4;
    });
    y += 24;

    // Footer disclaimer
    ctx.strokeStyle = 'rgba(47,59,38,0.18)';
    ctx.beginPath(); ctx.moveTo(PAD, y); ctx.lineTo(W - PAD, y); ctx.stroke();
    y += 30;
    ctx.fillStyle = '#5B6650';
    ctx.font = 'italic 400 13px Inter, sans-serif';
    y = wrapText(ctx, t.footerText, PAD, y, contentW, 20);
    y += 10;

    ctx.font = '400 12px "IBM Plex Mono", monospace';
    ctx.fillStyle = '#5B6650';
    const generatedOn = new Date().toLocaleDateString(undefined, {month:'short', day:'numeric', year:'numeric'});
    ctx.fillText(`${t.reportGeneratedLabel || 'Generated'}: ${generatedOn}`, PAD, y);
    y += PAD;

    // Crop the scratch canvas down to the content that was actually drawn
    const finalCanvas = document.createElement('canvas');
    finalCanvas.width = W;
    finalCanvas.height = Math.min(y, work.height);
    finalCanvas.getContext('2d').drawImage(work, 0, 0, W, finalCanvas.height, 0, 0, W, finalCanvas.height);
    return finalCanvas;
  }

  async function downloadReport(){
    if(!lastShown){
      return;
    }
    downloadReportBtn.classList.add('is-busy');
    const label = document.getElementById('downloadReportLabel');
    const originalLabel = label.textContent;
    label.textContent = I18N[currentLang].downloadingLabel;

    try{
      if(document.fonts && document.fonts.ready){
        await document.fonts.ready;
      }
      const canvas = buildReportCanvas(lastShown.ratio, lastShown.scores, lastShown.dateLabel, previewImg, lastShown.aiExplanation);
      canvas.toBlob(blob => {
        if(blob){
          const url = URL.createObjectURL(blob);
          const safeDate = (lastShown.dateLabel || 'specimen').replace(/[^a-z0-9]+/gi, '-').toLowerCase();
          const a = document.createElement('a');
          a.href = url;
          a.download = `phytoscan-report-${safeDate}.png`;
          document.body.appendChild(a);
          a.click();
          a.remove();
          setTimeout(() => URL.revokeObjectURL(url), 4000);
        }
        downloadReportBtn.classList.remove('is-busy');
        label.textContent = originalLabel;
      }, 'image/png');
    }catch(e){
      downloadReportBtn.classList.remove('is-busy');
      label.textContent = originalLabel;
    }
  }

  downloadReportBtn.addEventListener('click', downloadReport);

  // ---------------------------------------------------------------
  // Initial render
  // ---------------------------------------------------------------
  buildGuide();
  applyTranslations();

})();
