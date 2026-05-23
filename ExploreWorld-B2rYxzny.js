import{c as ReactCjs,r as jsxRuntime,u as interop}from"./index-Ci1vgiUU.js";import{t as logo}from"./Craiova fest logo-CWRGMAK0.js";var React=interop(ReactCjs(),1),j=jsxRuntime();
const GLOBE_HTML=`
    <div class="aurora aurora-one"></div>
    <div class="aurora aurora-two"></div>
    <div class="noise-layer"></div>

    

    <section class="hero-stage" id="theatre">
      <div class="hero-copy">
        <p class="eyebrow">Behold! the world becomes a stage...</p>
        <h1>Shakespearean cultural globe</h1>

        <div class="persona-tags" aria-label="Design tags">
          <span>The Thinker</span>
          <span>The Dreamer</span>
          <span>The Seeker of Truth</span>
        </div>

        <blockquote class="hero-quote">“All the world’s a stage, and every country waits its cue.”</blockquote>

        <div class="hero-actions">
          <label class="select-wrap" for="countrySelect">
            <span>Choose thy country</span>
            <select id="countrySelect">
              <option value="">Select a country</option>
            </select>
          </label>
          <button class="secondary-journey" type="button" id="continueJourneyBtn">
            ✦ Continue your journey
          </button>
        </div>
      </div>

      <aside class="portrait-frame" aria-label="Featured theatre card">
  <div class="portrait-card">
    <div class="portrait-glow"></div>

    <img
      class="portrait-image"
      src="" data-globe-portrait="true"
      alt="Dramatic Shakespeare portrait"
    />

    <div class="portrait-caption">
      <strong>Act III, Scene I</strong>
    </div>
  </div>
</aside>
    </section>

    <section class="status-row" aria-label="Prototype status">
      <button id="resetBtn" class="reset-globe-btn" type="button">↺ Reset Globe</button>
    </section>

    <section id="globeSection" class="experience-layout">
      <div class="globe-card" aria-label="Interactive 3D globe">
        <div class="floating-label top-left">Globe</div>
        <div class="floating-label bottom-right">Theatre atlas</div>

        <div id="globe"></div>
        <div class="globe-overlay"></div>

        <div class="loading-curtain" id="loadingCurtain">
          <div class="loader-mark">✦</div>
          <p>Preparing the atlas…</p>
        </div>

        <div class="hint-pill"></div>
      </div>

      <aside id="infoPanel" class="info-panel is-open" aria-hidden="false">
        <button id="closePanelBtn" class="close-btn" type="button" aria-label="Toggle country panel">×</button>

        <div class="panel-inner">
          <div class="panel-topline">
            <span id="countryFlag" class="country-flag">🎭</span>
            <span class="panel-kicker">Country result</span>
          </div>

          <h2 id="countryName">World Stage</h2>
          <h3 id="countryTitle">Select a country to begin</h3>

          <p id="countryDescription" class="country-description">
            Choose from the dropdown or click the globe to reveal a modern cultural card inspired by Shakespearean storytelling.
          </p>

          <blockquote id="countryQuote">“All the world’s a stage…”</blockquote>

          <div class="detail-grid">
            <div class="detail-card">
              <span>Landmark</span>
              <strong id="countryLandmark">Choose a country</strong>
            </div>

            <div class="detail-card">
              <span>Festival concept</span>
              <strong id="countryFestival">Cultural performance concept</strong>
            </div>

            <div class="detail-card">
              <span>Play pairing</span>
              <strong id="countryPlay">Shakespearean mood match</strong>
            </div>
          </div>
        </div>
      </aside>
    </section>

  `;
function loadScript(src,id){return new Promise((resolve,reject)=>{if(id&&document.getElementById(id)){resolve();return}const s=document.createElement("script");if(id)s.id=id;s.src=src;s.async=false;s.onload=resolve;s.onerror=()=>reject(new Error("Failed to load "+src));document.body.appendChild(s);})}
function GlobePage(){
  const holder=(0,React.useRef)(null);
  (0,React.useEffect)(()=>{
    const base=new URL("../globe-page/",import.meta.url).href;
    window.SH_GLOBE_ASSET_BASE=base;
    let css=document.getElementById("sh-globe-page-css");let cssCreated=false;if(!css){css=document.createElement("link");css.rel="stylesheet";css.href=base+"style.css";css.id="sh-globe-page-css";document.head.appendChild(css);cssCreated=true;}
    const portrait=holder.current&&holder.current.querySelector("[data-globe-portrait]"); if(portrait) portrait.src=base+"shakespeare.png";
    const continueBtn=holder.current&&holder.current.querySelector("#continueJourneyBtn");
    const continueHandler=()=>{const el=document.getElementById("globeSection"); if(el) el.scrollIntoView({behavior:"smooth"})};
    if(continueBtn) continueBtn.addEventListener("click",continueHandler);
    let mounted=true;
    loadScript("https://unpkg.com/three@0.149.0/build/three.min.js","sh-globe-three")
      .then(()=>loadScript("https://unpkg.com/three-globe@2.27.2/dist/three-globe.min.js","sh-globe-three-globe"))
      .then(()=>loadScript("https://unpkg.com/globe.gl@2.29.0/dist/globe.gl.min.js","sh-globe-globegl"))
      .then(()=>{ if(mounted) return loadScript(base+"script.js?mount="+Date.now(), null); })
      .catch(err=>console.error(err));
    return()=>{mounted=false; if(continueBtn) continueBtn.removeEventListener("click",continueHandler); if(cssCreated&&css) css.remove();};
  },[]);
  return (0,j.jsxs)(`div`,{className:`min-h-screen bg-black text-white font-body overflow-x-hidden`,children:[
    (0,j.jsx)(`div`,{ref:holder,className:`app-shell`,dangerouslySetInnerHTML:{__html:GLOBE_HTML}}),
    (0,j.jsx)(`footer`,{className:`relative py-16 px-6 text-center`,style:{background:`rgba(0,0,0,0.95)`,borderTop:`1px solid rgba(255,255,255,0.06)`},children:(0,j.jsxs)(`div`,{className:`max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6`,children:[(0,j.jsxs)(`div`,{className:`flex items-center gap-4`,children:[(0,j.jsx)(`img`,{src:logo,alt:`Logo`,className:`w-10 h-10 object-contain opacity-70 mix-blend-screen`}),(0,j.jsx)(`p`,{className:`text-xs tracking-widest uppercase text-white/30`,children:`Craiova International Shakespeare Festival`})]}),(0,j.jsxs)(`p`,{className:`text-xs tracking-widest uppercase text-white/20`,children:[`© `,new Date().getFullYear(),` Shakespeare Erasmus Initiative • Craiova International Shakespeare Festival. All rights reserved.`]})]})})
  ]})
}
export{GlobePage as default};
