(function(){
/* =========================================================
   Shakespearasmus Cultural Globe
   Modern Stitch-inspired globe implementation
   ========================================================= */

const COUNTRY_DATA = {
  Algeria: {
    aliases: ["Algeria", "People's Democratic Republic of Algeria"],
    name: "Algeria",
    flag: "🇩🇿",
    title: "The Desert Court of Moonlit Verse",
    description: "Algeria enters with Saharan grandeur, Ottoman arches, Amazigh memory, coastal light, and music that moves like wind across ancient stone.",
    quote: "Where sand and sea keep counsel, the noble spirit speaks in rhythm and fire.",
    landmark: "Sahara Desert and Casbah of Algiers",
    festivalIdea: "Saharan procession, chaâbi music cues, embroidered robes, lantern shadows, and desert-gold lighting.",
    playPairing: "The Tempest"
  },
  Egypt: {
    aliases: ["Egypt", "Arab Republic of Egypt"],
    name: "Egypt",
    flag: "🇪🇬",
    title: "The Pharaoh’s Theatre of Eternity",
    description: "Egypt rises like a prologue carved in stone, carrying Nile mystery, golden dynasties, sacred geometry, and the solemn drama of time.",
    quote: "Let pyramids be pillars, and let the Nile recite what kings have long forgotten.",
    landmark: "The Pyramids of Giza and the Nile",
    festivalIdea: "Golden procession, hieroglyphic projections, river-blue fabrics, and ceremonial chorus movement.",
    playPairing: "Antony and Cleopatra"
  },
  Cambodia: {
    aliases: ["Cambodia", "Kingdom of Cambodia"],
    name: "Cambodia",
    flag: "🇰🇭",
    title: "The Temple Stage of Celestial Dance",
    description: "Cambodia glides forward with Angkor’s sacred silhouettes, apsara grace, carved myth, and gestures delicate enough to make silence bow.",
    quote: "The hand becomes a poem, the temple becomes a stage, and dawn applauds in gold.",
    landmark: "Angkor Wat",
    festivalIdea: "Apsara-inspired movement, lotus motifs, temple projection mapping, and candlelit ceremonial staging.",
    playPairing: "A Midsummer Night’s Dream"
  },
  Togo: {
    aliases: ["Togo", "Togolese Republic"],
    name: "Togo",
    flag: "🇹🇬",
    title: "The Bright Drumline of the Coast",
    description: "Togo steps into the light with coastal markets, woven color, spirited rhythms, and storytelling that feels communal, direct, and alive.",
    quote: "Beat the drum once, and the village answers; beat it twice, and the stage awakens.",
    landmark: "Koutammakou and Lomé coast",
    festivalIdea: "Drum-led entrances, patterned textiles, marketplace staging, call-and-response chorus, and warm amber light.",
    playPairing: "Much Ado About Nothing"
  },
  Tunisia: {
    aliases: ["Tunisia", "Republic of Tunisia"],
    name: "Tunisia",
    flag: "🇹🇳",
    title: "The Mediterranean Mask of Carthage",
    description: "Tunisia carries Carthaginian echoes, whitewashed towns, blue doors, desert edges, and a Mediterranean elegance fit for intrigue and romance.",
    quote: "By blue door and ancient harbor, wit takes ship and destiny follows.",
    landmark: "Carthage and Sidi Bou Said",
    festivalIdea: "Blue-and-white set pieces, Roman columns, sea-wind fabrics, oud music, and masked court scenes.",
    playPairing: "Twelfth Night"
  },
  Kenya: {
    aliases: ["Kenya", "Republic of Kenya"],
    name: "Kenya",
    flag: "🇰🇪",
    title: "Where the Savannah Meets the Stage",
    description: "Kenya enters like a noble character beneath the golden sun, carrying rhythm, story, ancestral memory, and the proud colors of living tradition.",
    quote: "All the world’s a stage, and Kenya strides upon it with drums, color, and courage.",
    landmark: "Mount Kenya and the Maasai Mara",
    festivalIdea: "Open-air performance, Maasai-inspired costume design, oral storytelling, dance, and drum-led entrances.",
    playPairing: "A Midsummer Night’s Dream"
  },
  Moldova: {
    aliases: ["Moldova", "Republic of Moldova"],
    name: "Moldova",
    flag: "🇲🇩",
    title: "The Vineyard Court of Quiet Song",
    description: "Moldova arrives with embroidered shirts, vineyard hills, folk melody, and a gentle dignity that turns village memory into lyrical theatre.",
    quote: "In the vineyard’s hush, the cup is raised and every song becomes a vow.",
    landmark: "Cricova wine cellars and Orheiul Vechi",
    festivalIdea: "Folk embroidery, wine-cellar ambience, circle dances, pastoral staging, and warm harvest lighting.",
    playPairing: "As You Like It"
  },
  India: {
    aliases: ["India", "Republic of India"],
    name: "India",
    flag: "🇮🇳",
    title: "The Monsoon Masque of Color",
    description: "India bursts forth in silk, rhythm, spice, epic memory, and sacred spectacle, as though the stage itself had become a festival of color.",
    quote: "Let drums speak, let colors fly, and let the tale dance before the king.",
    landmark: "The Taj Mahal and Jaipur’s palaces",
    festivalIdea: "Dance-theatre fusion, vibrant textile design, epic narration, and festival-inspired lighting.",
    playPairing: "Twelfth Night"
  },
  Ukraine: {
    aliases: ["Ukraine"],
    name: "Ukraine",
    flag: "🇺🇦",
    title: "The Sunflower Chorus of Resolve",
    description: "Ukraine stands with embroidered strength, golden fields, blue skies, folk song, and a resilient stage presence full of heart and defiance.",
    quote: "Though winter speak harshly, the sunflower still lifts its face to the light.",
    landmark: "Kyiv, Lviv, and sunflower fields",
    festivalIdea: "Vyshyvanka motifs, choral harmonies, wheat-gold lighting, folk dance, and poetic monologues.",
    playPairing: "Henry V"
  },
  "South Africa": {
    aliases: ["South Africa", "Republic of South Africa"],
    name: "South Africa",
    flag: "🇿🇦",
    title: "The Rainbow Stage of Many Voices",
    description: "South Africa commands the scene with layered languages, mountain silhouettes, protest theatre, bright beadwork, and a chorus of many histories.",
    quote: "Many voices enter, yet the stage becomes one thunderous song.",
    landmark: "Table Mountain and Robben Island",
    festivalIdea: "Multilingual ensemble performance, protest theatre, choral soundscapes, and symbolic costume palettes.",
    playPairing: "The Tempest"
  },
  Romania: {
    aliases: ["Romania", "România"],
    name: "Romania",
    flag: "🇷🇴",
    title: "The Carpathian Court of Shadows",
    description: "Romania appears like a moonlit scene between mountain and myth, where folklore, castles, and poetic melancholy gather at the edge of the stage.",
    quote: "In these hills, the night itself rehearses lines of wonder, longing, and fate.",
    landmark: "Bran Castle and the Carpathian Mountains",
    festivalIdea: "Gothic stage lighting, folklore masks, castle projections, and shadow-theatre storytelling.",
    playPairing: "Macbeth"
  },
  Montenegro: {
    aliases: ["Montenegro"],
    name: "Montenegro",
    flag: "🇲🇪",
    title: "The Mountain Crown by the Sea",
    description: "Montenegro enters with dramatic cliffs, Adriatic blue, stone towns, and a heroic mountain mood that feels carved for tragedy and honor.",
    quote: "The sea below keeps secrets, while the mountain above speaks of kings.",
    landmark: "Bay of Kotor and Lovćen",
    festivalIdea: "Cliff-like set levels, maritime lanterns, warrior cloaks, and echoing mountain chorus work.",
    playPairing: "King Lear"
  },
  France: {
    aliases: ["France", "French Republic"],
    name: "France",
    flag: "🇫🇷",
    title: "The Court of Wit, Silk, and Revolution",
    description: "France sweeps in with courtly elegance, café intellect, grand architecture, and the sharp sparkle of dialogue fit for lovers and rivals.",
    quote: "Let wit be sharpened like a rapier, and let beauty enter without apology.",
    landmark: "Paris, Versailles, and the Loire Valley",
    festivalIdea: "Courtly ballroom staging, rococo patterns, café dialogue scenes, and revolution-red accents.",
    playPairing: "Love’s Labour’s Lost"
  },
  Japan: {
    aliases: ["Japan"],
    name: "Japan",
    flag: "🇯🇵",
    title: "The Silent Garden of Moonlit Honor",
    description: "Japan appears with disciplined beauty, theatre masks, cherry blossoms, lantern glow, and the precise stillness of a blade before action.",
    quote: "In one measured step, the moon, the warrior, and the blossom share a secret.",
    landmark: "Kyoto temples and Mount Fuji",
    festivalIdea: "Noh-inspired masks, kabuki gestures, lantern corridors, cherry-blossom projections, and controlled stage rhythm.",
    playPairing: "Hamlet"
  },

  Argentina: {
    aliases: ["Argentina", "Argentine Republic"],
    name: "Argentina",
    flag: "🇦🇷",
    title: "The Tango of the Southern Court",
    description: "Argentina enters with a dramatic turn, where pampas wind, silver light, gaucho pride, and tango passion meet beneath a theatrical sky.",
    quote: "One step of tango, one glance of fate, and the whole court holds its breath.",
    landmark: "Buenos Aires and Patagonia",
    festivalIdea: "Tango choreography, gaucho costume references, poetic duels, and dramatic spotlight staging.",
    playPairing: "Much Ado About Nothing"
  }
};

/*
  Portrait image update:
  Keep the image in the same folder as index.html and script.js.
  If the image is inside an assets folder, change this to:
  const portraitImage = "assets/a_dramatic_cinematic_black_and_white_portrait_sce.png";
*/
const portraitImage = (window.SH_GLOBE_ASSET_BASE || "") + "shakespeare.png";

const COUNTRY_LOOKUP = {};
Object.values(COUNTRY_DATA).forEach((country) => {
  country.aliases.forEach((alias) => {
    COUNTRY_LOOKUP[normalizeName(alias)] = country;
  });
});

const globeEl = document.getElementById("globe");
const infoPanel = document.getElementById("infoPanel");
const closePanelBtn = document.getElementById("closePanelBtn");
const journeyBtn = document.getElementById("journeyBtn");
const resetBtn = document.getElementById("resetBtn");
const countrySelect = document.getElementById("countrySelect");
const statusPill = document.getElementById("statusPill");
const loadingCurtain = document.getElementById("loadingCurtain");

const countryFlag = document.getElementById("countryFlag");
const countryName = document.getElementById("countryName");
const countryTitle = document.getElementById("countryTitle");
const countryDescription = document.getElementById("countryDescription");
const countryQuote = document.getElementById("countryQuote");
const countryLandmark = document.getElementById("countryLandmark");
const countryFestival = document.getElementById("countryFestival");
const countryPlay = document.getElementById("countryPlay");

let globe;
let countries = [];
let hoveredCountry = null;
let selectedCountry = null;

const COUNTRIES_GEOJSON_URL =
  "https://raw.githubusercontent.com/datasets/geo-boundaries-world-110m/main/countries.geojson";

init();

async function init() {
  populateCountrySelect();
  updatePortrait();
  createGlobe();
  setupEvents();
  await loadCountries();
  observeResize();
}

function populateCountrySelect() {
  if (!countrySelect) return;

  const featuredCountries = Object.values(COUNTRY_DATA).sort((a, b) =>
    a.name.localeCompare(b.name)
  );

  featuredCountries.forEach((country) => {
    const option = document.createElement("option");
    option.value = country.name;
    option.textContent = `${country.flag} ${country.name}`;
    countrySelect.appendChild(option);
  });
}

function updatePortrait() {
  const portrait = document.querySelector(".portrait-image");

  if (!portrait) return;

  portrait.src = portraitImage;
  portrait.alt = "Dramatic Shakespeare portrait";
}

function createGlobe() {
  globe = Globe()(globeEl)
    .backgroundColor("rgba(0,0,0,0)")
    .globeImageUrl("https://unpkg.com/three-globe/example/img/earth-dark.jpg")
    .bumpImageUrl("https://unpkg.com/three-globe/example/img/earth-topology.png")
    .showAtmosphere(true)
    .atmosphereColor("#d92bb7")
    .atmosphereAltitude(0.18)
    .polygonAltitude((feature) => {
      const info = getCountryInfo(feature);
      if (!info) return 0.003;
      if (feature === hoveredCountry || feature === selectedCountry) return 0.055;
      return 0.022;
    })
    .polygonCapColor((feature) => {
      const info = getCountryInfo(feature);

      if (!info) return "rgba(7, 8, 16, 0.86)";
      if (feature === selectedCountry) return "rgba(239, 52, 45, 0.94)";
      if (feature === hoveredCountry) return "rgba(255, 74, 216, 0.76)";

      return "rgba(217, 43, 183, 0.46)";
    })
    .polygonSideColor((feature) => {
      return getCountryInfo(feature)
        ? "rgba(125, 55, 255, 0.28)"
        : "rgba(0, 0, 0, 0.38)";
    })
    .polygonStrokeColor((feature) => {
      const info = getCountryInfo(feature);

      if (!info) return "rgba(255, 255, 255, 0.025)";
      if (feature === hoveredCountry || feature === selectedCountry) {
        return "rgba(255, 255, 255, 0.96)";
      }

      return "rgba(95, 202, 193, 0.70)";
    })
    .polygonLabel((feature) => {
      const info = getCountryInfo(feature);
      if (!info) return "";

      return `<div class="scene-tooltip">❦ ${info.name}</div>`;
    })
    .onPolygonHover((feature) => {
      hoveredCountry = feature && getCountryInfo(feature) ? feature : null;
      document.body.style.cursor = hoveredCountry ? "pointer" : "default";
      refreshPolygonStyles();
    })
    .onPolygonClick((feature) => {
      if (!feature || !getCountryInfo(feature)) {
        if (statusPill) {
          statusPill.textContent = "Locked country — choose a highlighted country";
        }
        return;
      }

      selectFeature(feature);
    });

  const controls = globe.controls();
  controls.enableDamping = true;
  controls.dampingFactor = 0.08;
  controls.rotateSpeed = 0.55;
  controls.zoomSpeed = 0.72;
  controls.autoRotate = true;
  controls.autoRotateSpeed = 0.28;

  resizeGlobe();
}

async function loadCountries() {
  try {
    const response = await fetch(COUNTRIES_GEOJSON_URL);
    if (!response.ok) throw new Error("Could not load GeoJSON country data.");

    const geojson = await response.json();
    countries = geojson.features.filter(Boolean);
    globe.polygonsData(countries);

    globe.pointOfView({ lat: 15, lng: 25, altitude: 2.25 }, 1200);

    if (loadingCurtain) {
      loadingCurtain.classList.add("is-hidden");
    }

    if (statusPill) {
      statusPill.textContent = `${Object.keys(COUNTRY_DATA).length} highlighted countries active · other countries locked`;
    }

    openDefaultPanel();
  } catch (error) {
    console.error(error);

    if (statusPill) {
      statusPill.textContent = "Country map failed to load";
    }

    if (loadingCurtain) {
      loadingCurtain.classList.add("is-hidden");
    }

    openCountryPanel({
      name: "Offline Stage",
      flag: "⚠️",
      title: "The Globe Could Not Enter",
      description: "The country boundary file failed to load. Check your internet connection or replace the GeoJSON URL with a local file.",
      quote: "Even the grandest curtain waits upon its ropes.",
      landmark: "GeoJSON data unavailable",
      festivalIdea: "Use a local countries.geojson file for offline previews",
      playPairing: "The Comedy of Errors"
    });
  }
}

function setupEvents() {
  if (closePanelBtn) {
    closePanelBtn.addEventListener("click", () => {
      infoPanel.classList.toggle("is-open");
    });
  }

  if (journeyBtn) {
    journeyBtn.addEventListener("click", () => {
      const globeSection = document.getElementById("globeSection");
      if (!globeSection) return;

      globeSection.scrollIntoView({ behavior: "smooth" });
    });
  }

  if (resetBtn) {
    resetBtn.addEventListener("click", resetGlobe);
  }

  if (countrySelect) {
    countrySelect.addEventListener("change", (event) => {
      const selectedName = event.target.value;
      if (!selectedName) return;

      selectCountryByDataName(selectedName);
    });
  }

  window.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && infoPanel) {
      infoPanel.classList.remove("is-open");
    }
  });
}

function selectCountryByDataName(countryNameValue) {
  const data = Object.values(COUNTRY_DATA).find(
    (country) => country.name === countryNameValue
  );

  if (!data) return;

  const feature = countries.find((item) => {
    const featureName = normalizeName(getFeatureName(item));
    return data.aliases.some((alias) => normalizeName(alias) === featureName);
  });

  if (feature) {
    selectFeature(feature);
  } else {
    selectedCountry = null;
    openCountryPanel(data);

    if (statusPill) {
      statusPill.textContent = `${data.name} card opened`;
    }
  }
}

function selectFeature(feature) {
  const info = getCountryInfo(feature);

  if (!info) {
    if (statusPill) {
      statusPill.textContent = "Locked country — no information card available";
    }

    return;
  }

  selectedCountry = feature;
  focusCountry(feature);
  openCountryPanel(info);

  if (statusPill) {
    statusPill.textContent = `${info.name} selected`;
  }

  if (countrySelect) {
    countrySelect.value = info.name;
  }

  refreshPolygonStyles();
}

function openCountryPanel(info) {
  if (countryFlag) countryFlag.textContent = info.flag;
  if (countryName) countryName.textContent = info.name;
  if (countryTitle) countryTitle.textContent = info.title;
  if (countryDescription) countryDescription.textContent = info.description;
  if (countryQuote) countryQuote.textContent = `“${info.quote.replace(/[“”]/g, "")}”`;
  if (countryLandmark) countryLandmark.textContent = info.landmark;
  if (countryFestival) countryFestival.textContent = info.festivalIdea;
  if (countryPlay) countryPlay.textContent = info.playPairing;

  if (infoPanel) {
    infoPanel.classList.add("is-open");
    infoPanel.setAttribute("aria-hidden", "false");
  }
}

function resetGlobe() {
  selectedCountry = null;
  hoveredCountry = null;

  if (countrySelect) {
    countrySelect.value = "";
  }

  if (globe) {
    globe.pointOfView({ lat: 15, lng: 25, altitude: 2.25 }, 1000);
    globe.controls().autoRotate = true;
  }

  if (statusPill) {
    statusPill.textContent = `${Object.keys(COUNTRY_DATA).length} highlighted countries active · other countries locked`;
  }

  openDefaultPanel();
  refreshPolygonStyles();
}

function openDefaultPanel() {
  openCountryPanel({
    name: "World Stage",
    flag: "🎭",
    title: "Select a highlighted country to begin",
    description: "Only the magenta-highlighted countries are active. Dark blocked countries are intentionally locked and will not open information cards.",
    quote: "All the world’s a stage, yet only chosen scenes are lit.",
    landmark: "Choose a highlighted country",
    festivalIdea: "Click an active country or use the dropdown",
    playPairing: "Shakespearean mood match"
  });
}

function focusCountry(feature) {
  const center = getFeatureCenter(feature);
  if (!center || !globe) return;

  globe.controls().autoRotate = false;

  globe.pointOfView(
    {
      lat: center.lat,
      lng: center.lng,
      altitude: window.innerWidth < 760 ? 1.9 : 1.55
    },
    1200
  );
}

function refreshPolygonStyles() {
  if (!globe) return;

  globe
    .polygonAltitude(globe.polygonAltitude())
    .polygonCapColor(globe.polygonCapColor())
    .polygonStrokeColor(globe.polygonStrokeColor());
}

function getFeatureCenter(feature) {
  const coordinates = feature.geometry && feature.geometry.coordinates;
  if (!coordinates) return null;

  const points = [];
  collectCoordinatePairs(coordinates, points);

  if (!points.length) return null;

  let lngSum = 0;
  let latSum = 0;

  points.forEach(([lng, lat]) => {
    lngSum += lng;
    latSum += lat;
  });

  return {
    lng: lngSum / points.length,
    lat: latSum / points.length
  };
}

function collectCoordinatePairs(coords, points) {
  if (!Array.isArray(coords)) return;

  if (typeof coords[0] === "number" && typeof coords[1] === "number") {
    points.push(coords);
    return;
  }

  coords.forEach((child) => collectCoordinatePairs(child, points));
}

function getCountryInfo(feature) {
  const featureName = getFeatureName(feature);
  return COUNTRY_LOOKUP[normalizeName(featureName)] || null;
}

function getFeatureName(feature) {
  const properties = feature.properties || {};

  return (
    properties.ADMIN ||
    properties.name ||
    properties.NAME ||
    properties.NAME_EN ||
    properties.SOVEREIGNT ||
    properties.sovereignt ||
    "Unknown Country"
  );
}

function createFallbackCountryInfo(feature) {
  const name = getFeatureName(feature);

  return {
    name,
    flag: "🎭",
    title: "A Stage Yet to Be Written",
    description: `${name} awaits its own Shakespearasmus scene. Add this country to COUNTRY_DATA in script.js to give it a title, quote, landmark, festival idea, and play pairing.`,
    quote: "The map is but a prologue; the story begins when culture takes the stage.",
    landmark: "Add a famous landmark",
    festivalIdea: "Add a performance or cultural festival idea",
    playPairing: "Choose a Shakespeare play"
  };
}

function normalizeName(name) {
  return String(name)
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function observeResize() {
  if (!globeEl) return;

  const resizeObserver = new ResizeObserver(resizeGlobe);
  resizeObserver.observe(globeEl);
}

function resizeGlobe() {
  if (!globe || !globeEl) return;

  globe.width(globeEl.clientWidth || window.innerWidth);
  globe.height(globeEl.clientHeight || window.innerHeight);
}
})();
