/* ══════════════════════════════════════════════════
   DIARY — MYKONOS UTOPIA  |  script.js
   ══════════════════════════════════════════════════

   SECTIONS:
   1. DATA          — quotes, page titles, dates
   2. BUILD SLIDES  — diary pages injected into DOM
   3. SURPRISE PAGE — envelope + letter + countdown
   4. NAVIGATION    — slider, dots, keyboard, swipe
   5. LIGHTBOX      — tap-to-expand quote sheet
   6. MUSIC         — Web Audio pentatonic toggle
   7. PETALS        — falling jasmine petal spawner

   ══════════════════════════════════════════════════ */


/* ──────────────────────────────────────────────────
   1. DATA
   ──────────────────────────────────────────────────
   Edit quotes below — change t: (text) and m: (mood tag)
   Edit T[] for page titles, D[] for page dates.
   ────────────────────────────────────────────────── */

const Q = [
  { t: "Temukan cinta yang lebih baik dariku ya, dengan siapapun kamu nantinya, semoga orang itu lebih baik dariku, sejuta maaf untukmu.", m: "ikhlas" },
  { t: "Aku tidak minta kamu kembali. Aku hanya minta kamu bahagia — bahkan tanpa aku.", m: "melepas" },
  { t: "Ada banyak hal yang ingin kukatakan, tapi beberapa kata memang lebih indah bila tetap tersimpan dalam diam.", m: "rindu" },
  { t: "Maafkan aku karena tidak bisa menjadi seseorang yang kamu butuhkan. Mungkin memang bukan aku orangnya.", m: "menyesal" },
  { t: "Kamu pantas mendapat cinta yang tidak ragu-ragu, yang tidak perlu kamu pertanyakan setiap malamnya.", m: "tulus" },
  { t: "Kehilangan kamu bukan berarti dunia berhenti berputar — tapi rasanya seperti itu untuk sementara waktu.", m: "patah" },
  { t: "Semua yang baik pasti akan sampai kepadamu suatu hari nanti, percayalah.", m: "harap" },
  { t: "Aku belajar bahwa mencintai seseorang juga berarti siap untuk melepaskannya pergi.", m: "belajar" },
  { t: "Tidak apa-apa bila kamu lupa. Aku yang akan mengingat kita berdua untuk selamanya.", m: "kenangan" },
  { t: "Luka ini bukan tentang siapa yang salah. Ini tentang dua orang yang saling sayang tapi tidak saling cocok.", m: "damai" },
  { t: "Suatu malam nanti, ketika hujan turun dan kamu mendengar lagu lama — semoga kamu tersenyum, bukan menangis.", m: "doa" },
  { t: "Aku tidak akan pernah menyesal pernah mencintaimu. Itu bagian terbaik dari hidupku.", m: "syukur" },
  { t: "Pergi baik-baik ya. Jalani hidupmu dengan penuh, dan jangan biarkan siapapun membuatmu merasa kecil.", m: "ikhlas" },
  { t: "Kamu terlalu berharga untuk cinta yang setengah-setengah. Jangan mau kurang dari itu.", m: "kuat" },
  { t: "Waktu terbaik bersamamu adalah waktu yang tidak akan pernah bisa kuganti — dan aku tidak ingin menggantinya.", m: "kenangan" },
  { t: "Ada bagian dari diriku yang akan selalu mendoakanmu, diam-diam, dari kejauhan.", m: "doa" },
  { t: "Mungkin kita bukan untuk bersama, tapi aku yakin kita pernah benar-benar saling mencintai.", m: "jujur" },
  { t: "Setiap kali angin bertiup kencang, bayangkan itu pelukan terakhirku yang tak sempat kuberikan.", m: "rindu" },
  { t: "Hiduplah untuk dirimu sendiri. Jangan tunggu aku. Aku sudah dengan ikhlas melepasmu.", m: "bebas" },
  { t: "Semoga orang yang mencintaimu selanjutnya tidak pernah membuat kamu bertanya-tanya apakah dirimu cukup.", m: "harap" },
  { t: "Terima kasih sudah pernah hadir. Kamu mengajarkanku banyak hal — tentang cinta, dan tentang diriku sendiri.", m: "terima kasih" },
  { t: "Di ujung segalanya, aku hanya ingin kamu tahu: kamu tidak pernah sendirian dalam cerita ini.", m: "tulus" },
];

// Page titles (one per diary page, 5 quotes each)
const T = [
  "Kata-kata yang Tersisa",
  "Bisikan Malam",
  "Di Tepian Laut",
  "Catatan Terakhir",
  "Surat Tanpa Nama"
];

// Page dates shown top-right of each page
const D = [
  "Maret 2025",
  "April 2025",
  "Mei 2025",
  "Juni 2025",
  "Juli 2025"
];

// Quotes per page
const PER = 5;

// ─────────────── SURPRISE PAGE TEXT ───────────────
// Edit the message, title, and signature below:

const SURPRISE_TITLE   = "Untuk kamu yang selalu<br>ada di doa-doaku";
const SURPRISE_MSG     = `Ini bukan selamat tinggal yang menyedihkan.<br>
Ini doa yang dikirim lewat bunga-bunga jasmine,<br>
lewat angin laut Mykonos, lewat setiap halaman<br>
yang kamu baca sampai ke sini.<br><br>
Kamu berharga. Kamu dicintai.<br>
Dan dunia lebih indah karena kamu ada di dalamnya. 🌸`;
const SURPRISE_SIG     = "— dengan sepenuh hati ✦";

// ─────────────── DANA KAGET LINK ───────────────────
// Paste your Dana Kaget link here:
const DANA_URL = "GANTI_LINK_DANA_KAGET_DISINI";

// ─────────────── SONG LABEL ────────────────────────
// Change the song name shown when music plays:
const SONG_NAME = "Jatuh Suka — Tulus";


/* ──────────────────────────────────────────────────
   2. BUILD SLIDES
   ────────────────────────────────────────────────── */

const pages = [];
for (let i = 0; i < Q.length; i += PER) pages.push(Q.slice(i, i + PER));

const stEl = document.getElementById('st');

pages.forEach((pg, pi) => {
  const off = pi * PER;
  const slide = document.createElement('div');
  slide.className = 'slide';
  slide.innerHTML = `
    <div class="pgh">
      <div>
        <div class="pgt">${T[pi]}</div>
        <div class="pgs">✦ EA ✦</div>
      </div>
      <div class="pgd">${D[pi]}</div>
    </div>
    <div class="ql">
      ${pg.map((q, qi) => `
        <div class="qi" onclick="oLb(${off + qi})" style="animation-delay:${qi * .08}s">
          <span class="qn">${String(off + qi + 1).padStart(2, '0')}.</span>
          <div>
            <p class="qt">${q.t}</p>
            <span class="qtag">◦ ${q.m}</span>
          </div>
        </div>`).join('')}
    </div>`;
  stEl.appendChild(slide);
});


/* ──────────────────────────────────────────────────
   3. SURPRISE PAGE
   ────────────────────────────────────────────────── */

const surpriseSlide = document.createElement('div');
surpriseSlide.className = 'slide';
surpriseSlide.innerHTML = `
<div class="sp-wrap">
  <canvas id="flowerCanvas"></canvas>
  <div class="sp-content">

    <div class="sp-envelope" id="envelope" onclick="openEnvelope()">
      <svg viewBox="0 0 64 50" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="1" y="1" width="62" height="48" rx="5" fill="#fdfaf6" stroke="#c4714a" stroke-width="1.5"/>
        <path d="M1,1 L32,28 L63,1" stroke="#c4714a" stroke-width="1.5" fill="none"/>
        <path d="M1,49 L22,26" stroke="#c4714a" stroke-width="1" opacity=".5"/>
        <path d="M63,49 L42,26" stroke="#c4714a" stroke-width="1" opacity=".5"/>
        <circle cx="32" cy="32" r="9" fill="#c4714a" opacity=".85"/>
        <text x="32" y="36" text-anchor="middle" font-size="8" fill="rgba(255,255,255,.7)">✦</text>
      </svg>
    </div>

    <p class="sp-tap" id="spTap">ketuk untuk membuka ✦</p>

    <div class="sp-letter" id="spLetter">
      <span class="sp-star">✦</span>
      <h2 class="sp-title">${SURPRISE_TITLE}</h2>

      <div class="sp-flowers" id="spFlowers">
        <svg width="28" height="28" viewBox="0 0 30 30"><circle cx="15" cy="7" r="4.5" fill="#f8f0c0"/><circle cx="22" cy="11" r="4.5" fill="#f8f0c0"/><circle cx="22" cy="19" r="4.5" fill="#f8f0c0"/><circle cx="15" cy="23" r="4.5" fill="#f8f0c0"/><circle cx="8" cy="19" r="4.5" fill="#f8f0c0"/><circle cx="8" cy="11" r="4.5" fill="#f8f0c0"/><circle cx="15" cy="15" r="4" fill="#e8d860"/></svg>
        <svg width="28" height="28" viewBox="0 0 30 30"><circle cx="15" cy="7" r="4.5" fill="#f0eac0"/><circle cx="22" cy="11" r="4.5" fill="#f0eac0"/><circle cx="22" cy="19" r="4.5" fill="#f0eac0"/><circle cx="15" cy="23" r="4.5" fill="#f0eac0"/><circle cx="8" cy="19" r="4.5" fill="#f0eac0"/><circle cx="8" cy="11" r="4.5" fill="#f0eac0"/><circle cx="15" cy="15" r="4" fill="#d8c850"/></svg>
        <svg width="32" height="32" viewBox="0 0 30 30"><circle cx="15" cy="7" r="5" fill="#fdfaf0"/><circle cx="22" cy="11" r="5" fill="#fdfaf0"/><circle cx="22" cy="19" r="5" fill="#fdfaf0"/><circle cx="15" cy="23" r="5" fill="#fdfaf0"/><circle cx="8" cy="19" r="5" fill="#fdfaf0"/><circle cx="8" cy="11" r="5" fill="#fdfaf0"/><circle cx="15" cy="15" r="4.5" fill="#c9a84c"/></svg>
        <svg width="28" height="28" viewBox="0 0 30 30"><circle cx="15" cy="7" r="4.5" fill="#f8f0c0"/><circle cx="22" cy="11" r="4.5" fill="#f8f0c0"/><circle cx="22" cy="19" r="4.5" fill="#f8f0c0"/><circle cx="15" cy="23" r="4.5" fill="#f8f0c0"/><circle cx="8" cy="19" r="4.5" fill="#f8f0c0"/><circle cx="8" cy="11" r="4.5" fill="#f8f0c0"/><circle cx="15" cy="15" r="4" fill="#e8d860"/></svg>
        <svg width="28" height="28" viewBox="0 0 30 30"><circle cx="15" cy="7" r="4.5" fill="#f0eca8"/><circle cx="22" cy="11" r="4.5" fill="#f0eca8"/><circle cx="22" cy="19" r="4.5" fill="#f0eca8"/><circle cx="15" cy="23" r="4.5" fill="#f0eca8"/><circle cx="8" cy="19" r="4.5" fill="#f0eca8"/><circle cx="8" cy="11" r="4.5" fill="#f0eca8"/><circle cx="15" cy="15" r="4" fill="#c9a84c"/></svg>
      </div>

      <p class="sp-msg">${SURPRISE_MSG}</p>
      <span class="sp-sig">${SURPRISE_SIG}</span>

      <div class="sp-dana-wrap" id="spDanaWrap">
        <p class="sp-dana-label" id="danaLabel">sedang menyiapkan sesuatu untukmu</p>
        <div class="sp-dana-dots" id="danaDots">
          <span></span><span></span><span></span>
        </div>
      </div>
    </div>

  </div>
</div>`;
stEl.appendChild(surpriseSlide);


/* ──────────────────────────────────────────────────
   4. NAVIGATION — slider, dots, keyboard, swipe
   ────────────────────────────────────────────────── */

const TOT = pages.length + 1; // +1 for surprise

// Build dots
const dotsEl = document.getElementById('dotsEl');
for (let i = 0; i < TOT; i++) {
  const d = document.createElement('div');
  d.className = 'dot' + (i === 0 ? ' active' : '') + (i === TOT - 1 ? ' surprise-dot' : '');
  d.onclick = () => goTo(i);
  dotsEl.appendChild(d);
}

// Init counter labels
document.getElementById('pgl').textContent = `1 / ${TOT}`;
document.getElementById('pgf').textContent = `halaman 1 dari ${TOT}`;

let cur = 0, busy = false;

function goTo(idx, dir) {
  if (idx < 0 || idx >= TOT || busy) return;
  busy = true;
  const prev = cur; cur = idx;

  // Page-turn flash
  const ov = document.getElementById('pto');
  const cl = (dir === 1 || idx > prev) ? 'tr' : 'tl';
  ov.classList.add(cl);

  // Slide
  const st = document.getElementById('st');
  st.style.willChange = 'transform';
  st.style.transform  = `translateX(-${cur * 100}%)`;

  setTimeout(() => {
    ov.classList.remove(cl);
    st.style.willChange = 'auto';
    busy = false;
  }, 480);

  // Update UI
  document.getElementById('pb').disabled  = cur === 0;
  document.getElementById('nb2').disabled = cur === TOT - 1;
  document.getElementById('pgl').textContent = `${cur + 1} / ${TOT}`;
  document.getElementById('pgf').textContent = `halaman ${cur + 1} dari ${TOT}`;
  document.querySelectorAll('.dot').forEach((d, i) => d.classList.toggle('active', i === cur));

  // Re-stagger quote items
  if (cur < pages.length) {
    document.querySelectorAll(`.slide:nth-child(${cur + 1}) .qi`).forEach((el, i) => {
      el.style.animation = 'none';
      void el.offsetWidth;
      el.style.animation = `qIn .42s cubic-bezier(.34,1.56,.64,1) ${i * .08}s both`;
    });
  }

  // Entering surprise page
  if (cur === TOT - 1) triggerSurpriseEntrance();
}

function go(d) { goTo(cur + d, d); }

// Keyboard
document.addEventListener('keydown', e => {
  if (e.key === 'ArrowRight') go(1);
  else if (e.key === 'ArrowLeft') go(-1);
  else if (e.key === 'Escape') cLb();
});

// Touch swipe on book
let tx = 0, ty = 0, drag = false;
const bkEl = document.getElementById('bk');
bkEl.addEventListener('touchstart', e => { tx = e.touches[0].clientX; ty = e.touches[0].clientY; drag = false; }, { passive: true });
bkEl.addEventListener('touchmove',  e => { if (Math.abs(e.touches[0].clientX - tx) > Math.abs(e.touches[0].clientY - ty)) drag = true; }, { passive: true });
bkEl.addEventListener('touchend',   e => { const dx = e.changedTouches[0].clientX - tx; if (drag && Math.abs(dx) > 44) go(dx < 0 ? 1 : -1); drag = false; });


/* ──────────────────────────────────────────────────
   SURPRISE — envelope open + countdown
   ────────────────────────────────────────────────── */

let envelopeOpened = false;

function triggerSurpriseEntrance() {
  const env = document.getElementById('envelope');
  if (env) {
    env.style.animation = 'none';
    void env.offsetWidth;
    env.style.animation = 'envFloat 3s ease-in-out infinite';
  }
}

function openEnvelope() {
  if (envelopeOpened) return;
  envelopeOpened = true;

  const env    = document.getElementById('envelope');
  const tap    = document.getElementById('spTap');
  const letter = document.getElementById('spLetter');
  const flowers = document.getElementById('spFlowers');
  const canvas = document.getElementById('flowerCanvas');

  // Hide envelope
  env.style.transition = 'opacity .3s, transform .3s';
  env.style.opacity    = '0';
  env.style.transform  = 'scale(.7) translateY(-10px)';
  tap.style.opacity    = '0';

  setTimeout(() => {
    env.style.display = 'none';
    tap.style.display = 'none';

    // Show letter
    letter.classList.add('open');
    flowers.classList.add('show');
    canvas.classList.add('show');
    startBloom(canvas);
    spawnConfetti(letter);

    // Countdown → auto-open Dana Kaget
    const label = document.getElementById('danaLabel');
    const dots  = document.getElementById('danaDots');
    let count = 3;

    const tick = () => {
      if      (count === 3) label.textContent = 'sedang menyiapkan hadiah untukmu...';
      else if (count === 2) label.textContent = 'sebentar lagi ✦';
      else if (count === 1) label.textContent = 'ini untukmu 🎁';
      count--;

      if (count < 0) {
        dots.style.display  = 'none';
        label.textContent   = 'semoga suka ya 🌸';

        // Show button
        const btn = document.createElement('a');
        btn.className = 'sp-dana-btn visible';
        btn.href      = DANA_URL;
        btn.target    = '_blank';
        btn.rel       = 'noopener';
        btn.innerHTML = '<span class="sp-dana-icon">✨</span><span>untukmu</span>';

        const wrap = document.getElementById('spDanaWrap');
        wrap.appendChild(btn);

        const sub = document.createElement('p');
        sub.className = 'sp-dana-sub';
        wrap.appendChild(sub);
        setTimeout(() => sub.classList.add('show'), 100);

        // Auto open
        setTimeout(() => { window.open(DANA_URL, '_blank'); }, 800);
        return;
      }
      setTimeout(tick, 1000);
    };

    // Start after letter fully appears
    setTimeout(tick, 900);
  }, 320);
}


/* ──────────────────────────────────────────────────
   BLOOM CANVAS — jasmine flowers bloom on surprise
   ────────────────────────────────────────────────── */

function startBloom(canvas) {
  const wrap = canvas.parentElement;
  canvas.width  = wrap.offsetWidth  || 300;
  canvas.height = wrap.offsetHeight || 480;
  const ctx = canvas.getContext('2d');
  const W = canvas.width, H = canvas.height;

  const flowerList = [];
  const cols = ['#f8f0c0','#f0e8a0','#fdfaf0','#f4f0b8','#e8f0a8','#c9a84c'];

  function spawnFlower(x, y, delay) {
    flowerList.push({
      x, y, r: 0,
      maxR: 12 + Math.random() * 14,
      alpha: 0,
      col:  cols[Math.floor(Math.random() * cols.length)],
      born: performance.now() + delay,
      petals: 6
    });
  }

  for (let i = 0; i < 28; i++) {
    spawnFlower(Math.random() * W, Math.random() * H, i * 120);
  }

  function draw(now) {
    ctx.clearRect(0, 0, W, H);
    let allDone = true;

    flowerList.forEach(f => {
      if (now < f.born) return;
      allDone = false;
      const age  = now - f.born;
      const prog = Math.min(1, age / 700);
      f.r     = f.maxR * prog;
      f.alpha = prog < .5 ? prog * 2 : 1;

      ctx.save();
      ctx.globalAlpha = f.alpha * .55;
      ctx.translate(f.x, f.y);

      for (let p = 0; p < f.petals; p++) {
        const a = (p / f.petals) * Math.PI * 2;
        ctx.beginPath();
        ctx.arc(Math.cos(a) * f.r * .7, Math.sin(a) * f.r * .7, f.r * .55, 0, Math.PI * 2);
        ctx.fillStyle = f.col;
        ctx.fill();
      }

      ctx.beginPath();
      ctx.arc(0, 0, f.r * .38, 0, Math.PI * 2);
      ctx.fillStyle  = '#e8d860';
      ctx.globalAlpha = f.alpha * .7;
      ctx.fill();
      ctx.restore();
    });

    if (!allDone || flowerList.some(f => now < f.born + 700)) {
      requestAnimationFrame(draw);
    }
  }
  requestAnimationFrame(draw);
}


/* ──────────────────────────────────────────────────
   CONFETTI BURST
   ────────────────────────────────────────────────── */

function spawnConfetti(parent) {
  const colors = ['#f8f0c0','#a8c48a','#6aaad8','#c4714a','#c9a84c','#f0eac0'];
  for (let i = 0; i < 18; i++) {
    const el    = document.createElement('div');
    el.className = 'confetti-piece';
    const angle = Math.random() * Math.PI * 2;
    const dist  = 60 + Math.random() * 80;
    el.style.cssText = `
      left: 50%; top: 30%;
      background: ${colors[Math.floor(Math.random() * colors.length)]};
      border-radius: ${Math.random() > .5 ? '50%' : '3px'};
      width: ${4 + Math.random() * 5}px;
      height: ${4 + Math.random() * 5}px;
      --tx: translate(${Math.cos(angle) * dist}px, ${Math.sin(angle) * dist}px);
      animation-delay: ${i * .04}s;
      animation-duration: .9s;
    `;
    parent.appendChild(el);
    setTimeout(() => el.remove(), 1200);
  }
}


/* ──────────────────────────────────────────────────
   5. LIGHTBOX
   ────────────────────────────────────────────────── */

function oLb(idx) {
  const q = Q[idx];
  document.getElementById('lbt').textContent  = q.t;
  document.getElementById('lbn').textContent  = `Catatan #${String(idx + 1).padStart(2, '0')}`;
  document.getElementById('lbtg').textContent = q.m;
  document.getElementById('lbs').style.animation = 'sUp .36s cubic-bezier(.34,1.56,.64,1) both';
  document.getElementById('lb').classList.add('show');
}

function cLb(e) {
  if (!e || e.target === document.getElementById('lb') || e.currentTarget.tagName === 'BUTTON') {
    const s = document.getElementById('lbs');
    s.style.animation = 'sDn .25s ease both';
    setTimeout(() => { document.getElementById('lb').classList.remove('show'); s.style.animation = ''; }, 260);
  }
}

// Swipe down to close lightbox
let ly = 0;
const lbsEl = document.getElementById('lbs');
lbsEl.addEventListener('touchstart', e => { ly = e.touches[0].clientY; }, { passive: true });
lbsEl.addEventListener('touchend',   e => { if (e.changedTouches[0].clientY - ly > 60) cLb({ target: document.getElementById('lb') }); }, { passive: true });


/* ──────────────────────────────────────────────────
   6. MUSIC — Web Audio pentatonic arpeggios
   ──────────────────────────────────────────────────
   To use a real MP3 instead, replace toggleMusic() with:*/




  /* And add <audio id="bgMusic" src="YOUR_SONG.mp3" loop></audio> to index.html
   ────────────────────────────────────────────────── */

   document.getElementById('songLabel').textContent = SONG_NAME;

   const musicBtn  = document.getElementById('musicBtn');
   const songLabel = document.getElementById('songLabel');
   const audio     = document.getElementById('bgMusic');
   let playing = false, labelTimer;
   
   function toggleMusic() {
     playing = !playing;
     musicBtn.classList.toggle('playing', playing);
     if (playing) {
       audio.play();
       songLabel.classList.add('show');
       clearTimeout(labelTimer);
       labelTimer = setTimeout(() => songLabel.classList.remove('show'), 4000);
     } else {
       audio.pause();
       songLabel.classList.remove('show');
     }
   }

/* ──────────────────────────────────────────────────
   7. PETALS — falling jasmine petals
   ────────────────────────────────────────────────── */

const PC  = ['#f8f0c0','#f0e8a0','#fdfaf0','#f4f0b8'];
const peEl = document.getElementById('petals');

for (let i = 0; i < 8; i++) {
  const p   = document.createElement('div');
  p.className = 'pt';
  const sz  = Math.random() * 9 + 7;
  const col = PC[i % PC.length];
  p.innerHTML = `<svg width="${sz * 2.8}" height="${sz * 2.8}" viewBox="0 0 28 28">
    <circle cx="14" cy="6.5"  r="4.5" fill="${col}" opacity=".82"/>
    <circle cx="20.5" cy="10.5" r="4.5" fill="${col}" opacity=".82"/>
    <circle cx="20.5" cy="17.5" r="4.5" fill="${col}" opacity=".82"/>
    <circle cx="14" cy="21.5" r="4.5" fill="${col}" opacity=".82"/>
    <circle cx="7.5"  cy="17.5" r="4.5" fill="${col}" opacity=".82"/>
    <circle cx="7.5"  cy="10.5" r="4.5" fill="${col}" opacity=".82"/>
    <circle cx="14" cy="14"   r="4"   fill="#e8d860" opacity=".9"/>
  </svg>`;
  p.style.cssText = `left:${10 + i * 10}%; animation-duration:${14 + i * 2.5}s; animation-delay:${i * 2.2}s;`;
  peEl.appendChild(p);
}
