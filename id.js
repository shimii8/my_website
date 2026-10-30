// id.js - Glassmorphism & Modern Tech Edition

// リロード時の自動スクロール復元を無効にする
if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}

// ページ読み込み時に最上部へ移動
window.scrollTo(0, 0);

// -------------------------------
// 背景にランダムな三角形を生成する関数
// -------------------------------
function createGeometricBackground() {
  const bgContainer = document.createElement("div");
  bgContainer.id = "geometric-bg";
  const target = document.getElementById("intro-section");
  if (target) {
    target.prepend(bgContainer);
  } else {
    document.body.prepend(bgContainer);
  }

  const triangleCount = 36;
  const colors = [
    "rgba(59, 130, 246, 0.16)",
    "rgba(14, 165, 233, 0.14)",
    "rgba(99, 102, 241, 0.12)",
    "rgba(125, 211, 252, 0.20)"
  ];

  for (let i = 0; i < triangleCount; i++) {
    const triangle = document.createElement("div");
    triangle.className = "bg-triangle";

    const size = Math.random() * 180 + 80;
    const top = Math.random() * 100;
    const left = Math.random() * 100;
    const rotation = Math.random() * 360;
    const color = colors[Math.floor(Math.random() * colors.length)];

    Object.assign(triangle.style, {
      position: "absolute",
      width: "0",
      height: "0",
      borderLeft: `${size / 2}px solid transparent`,
      borderRight: `${size / 2}px solid transparent`,
      borderBottom: `${size}px solid ${color}`,
      top: `${top}%`,
      left: `${left}%`,
      transform: `rotate(${rotation}deg)`,
      zIndex: "0",
      pointerEvents: "none"
    });

    bgContainer.appendChild(triangle);
  }
}

// -------------------------------
// 本文（メインコンテンツ）用の淡い水彩・オーロラ背景を生成する関数
// -------------------------------
function applyThemedBackground(parent, colorSet) {
  if (document.getElementById("main-geometric-bg")) return;
  const bgContainer = document.createElement("div");
  bgContainer.id = "main-geometric-bg";
  parent.prepend(bgContainer);

  const shapeCount = 14;
  for (let i = 0; i < shapeCount; i++) {
    const shape = document.createElement("div");
    shape.className = "main-bg-shape";
    const size = Math.random() * 420 + 340;
    const top = Math.random() * 110 - 5;
    const left = Math.random() * 110 - 5;
    const rotation = Math.random() * 360;
    const color = colorSet[Math.floor(Math.random() * colorSet.length)];

    Object.assign(shape.style, {
      position: "fixed",
      width: `${size}px`,
      height: `${size}px`,
      backgroundColor: color,
      top: `${top}%`,
      left: `${left}%`,
      transform: `rotate(${rotation}deg)`,
      filter: "blur(68px)",
      borderRadius: "40% 60% 70% 30% / 40% 50% 60% 50%",
      zIndex: "-1",
      pointerEvents: "none"
    });
    bgContainer.appendChild(shape);
  }
}

// -------------------------------
// 初期化処理（ホーム画面＆作品詳細ページ共通）
// -------------------------------
window.addEventListener("DOMContentLoaded", () => {
  const intro = document.getElementById("intro-section");
  const mainContent = document.getElementById("main-content");

  const blueColors = [
    "rgba(59, 130, 246, 0.12)",
    "rgba(14, 165, 233, 0.12)",
    "rgba(165, 243, 252, 0.16)",
    "rgba(99, 102, 241, 0.09)"
  ];

  const subPageColors = [
    "rgba(56, 189, 248, 0.12)",
    "rgba(59, 130, 246, 0.10)",
    "rgba(251, 191, 36, 0.08)"
  ];

  if (intro && mainContent) {
    createGeometricBackground();
    applyThemedBackground(mainContent, blueColors);

    // Scroll ↓ クリックでメインコンテンツへスムーズスクロール
    const scrollHint = intro.querySelector(".scroll-hint");
    if (scrollHint) {
      scrollHint.addEventListener("click", () => {
        mainContent.scrollIntoView({ behavior: "smooth" });
      });
    }

    // イントロの要素を削除せずスムーズにフェードさせることで画面ジャンプを防止
    const updateScrollEffect = () => {
      const y = window.scrollY;
      const ratio = Math.min(1, Math.max(0, y / 420));
      intro.style.opacity = String(1 - ratio * 0.85);
      intro.style.transform = `translateY(${y * 0.18}px)`;
    };

    window.addEventListener("scroll", updateScrollEffect, { passive: true });
    updateScrollEffect();
  } else {
    applyThemedBackground(document.body, subPageColors);
  }
});

// -------------------------------
// 時計＋挨拶を右上に追加（全ページ共通）
// -------------------------------
const clockContainer = document.createElement("div");
clockContainer.id = "clock-container";

const clock = document.createElement("div");
clock.id = "clock";

const greeting = document.createElement("div");
greeting.id = "greeting";

clockContainer.appendChild(clock);
clockContainer.appendChild(greeting);
document.body.appendChild(clockContainer);

function updateClockAndGreeting() {
  const now = new Date();
  const hours = now.getHours().toString().padStart(2, "0");
  const minutes = now.getMinutes().toString().padStart(2, "0");
  const seconds = now.getSeconds().toString().padStart(2, "0");
  clock.textContent = `${hours}:${minutes}:${seconds}`;

  let msg = "";
  if (now.getHours() >= 3 && now.getHours() < 9) {
    msg = "おはよう！";
  } else if (now.getHours() >= 9 && now.getHours() < 16) {
    msg = "こんにちは！";
  } else {
    msg = "こんばんは！";
  }
  greeting.textContent = msg;
}
setInterval(updateClockAndGreeting, 1000);
updateClockAndGreeting();

// -------------------------------
// ボタン風リンク＋波紋エフェクト
// -------------------------------
const workLinks = document.querySelectorAll("ul li a");
workLinks.forEach((link) => {
  link.classList.add("button-link");

  link.addEventListener("mousedown", () => link.classList.add("pressed"));
  link.addEventListener("mouseup", () => link.classList.remove("pressed"));

  link.addEventListener("click", function (e) {
    const ripple = document.createElement("span");
    ripple.classList.add("ripple");
    const rect = this.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    ripple.style.width = ripple.style.height = `${size}px`;
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;
    this.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
  });
});


// -------------------------------
// PWS Cup 2026 スライドビューア＆画像拡大ライトボックス
// -------------------------------
function initPwsInteractiveFeatures() {
  document.querySelectorAll(".pws-slider-card").forEach((sliderCard) => {
    const slides = sliderCard.querySelectorAll(".pws-slide-img");
    const dots = sliderCard.querySelectorAll(".pws-dot");
    const counter = sliderCard.querySelector(".pws-slide-counter");
    const prevBtn = sliderCard.querySelector(".pws-slider-btn.prev");
    const nextBtn = sliderCard.querySelector(".pws-slider-btn.next");

    if (slides.length > 0) {
      let currentSlide = 0;
      const showSlide = (idx) => {
        currentSlide = (idx + slides.length) % slides.length;
        slides.forEach((s, i) => {
          s.classList.toggle("active-slide", i === currentSlide);
        });
        dots.forEach((d, i) => {
          d.classList.toggle("active-dot", i === currentSlide);
        });
        if (counter) {
          counter.textContent = `${currentSlide + 1} / ${slides.length}`;
        }
      };

      if (prevBtn) {
        prevBtn.addEventListener("click", () => showSlide(currentSlide - 1));
      }
      if (nextBtn) {
        nextBtn.addEventListener("click", () => showSlide(currentSlide + 1));
      }
      dots.forEach((dot) => {
        dot.addEventListener("click", () => {
          const targetIdx = parseInt(dot.getAttribute("data-slide-to") || "0", 10);
          showSlide(targetIdx);
        });
      });
    }
  });

  // 画像拡大ライトボックス
  if (!document.getElementById("pws-lightbox")) {
    const lb = document.createElement("div");
    lb.id = "pws-lightbox";
    const closeBtn = document.createElement("button");
    closeBtn.type = "button";
    closeBtn.id = "pws-lightbox-close";
    closeBtn.textContent = "✕ 閉じる";
    const lbImg = document.createElement("img");
    lbImg.id = "pws-lightbox-img";
    lbImg.alt = "拡大表示";
    const lbCap = document.createElement("div");
    lbCap.id = "pws-lightbox-caption";
    lb.appendChild(closeBtn);
    lb.appendChild(lbImg);
    lb.appendChild(lbCap);
    document.body.appendChild(lb);

    const closeLightbox = () => lb.classList.remove("open");
    lb.addEventListener("click", closeLightbox);
    closeBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      closeLightbox();
    });

    document.querySelectorAll(".zoomable-img").forEach((img) => {
      img.addEventListener("click", () => {
        lbImg.src = img.src;
        lbCap.textContent = img.getAttribute("data-caption") || img.alt || "";
        lb.classList.add("open");
      });
    });
  }
}

if (document.readyState === "loading") {
  window.addEventListener("DOMContentLoaded", initPwsInteractiveFeatures);
} else {
  initPwsInteractiveFeatures();
}
