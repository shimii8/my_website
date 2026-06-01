// index.js

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
  // イントロセクションの中に配置
  const target = document.getElementById("intro-section");
  if (target) {
    target.prepend(bgContainer);
  } else {
    document.body.prepend(bgContainer);
  }

  const triangleCount = 40; // 生成する三角形の数
  const colors = [
    "rgba(74, 144, 226, 0.2)",  // 薄い青
    "rgba(44, 108, 176, 0.15)", // 濃い青
    "rgba(200, 200, 200, 0.1)", // グレー
    "rgba(173, 216, 230, 0.2)"  // 水色
  ];

  for (let i = 0; i < triangleCount; i++) {
    const triangle = document.createElement("div");
    triangle.className = "bg-triangle";
    
    // ランダムなサイズ、位置、色を設定
    const size = Math.random() * 200 + 100; // 100px〜300px
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
// 本文（メインコンテンツ）用の淡い背景を生成する関数
// -------------------------------
function createMainContentBackground(parent) {
  const bgContainer = document.createElement("div");
  bgContainer.id = "main-geometric-bg";
  parent.prepend(bgContainer);
  
  const shapeCount = 15; // 本文用なので数は少なめに
  const colors = [
    "rgba(173, 216, 230, 0.1)", // 極めて薄い水色
    "rgba(240, 248, 255, 0.15)", // アリスブルー
    "rgba(224, 240, 255, 0.1)"  // 淡い青
  ];

  for (let i = 0; i < shapeCount; i++) {
    const shape = document.createElement("div");
    shape.className = "main-bg-shape";
    
    // 水彩画のような淡い広がりを出すための設定
    const size = Math.random() * 400 + 300; // 300px〜700pxの大きな塊
    const top = Math.random() * 100;
    const left = Math.random() * 100;
    const rotation = Math.random() * 360;
    const color = colors[Math.floor(Math.random() * colors.length)];

    Object.assign(shape.style, {
      position: "absolute",
      width: `${size}px`,
      height: `${size}px`,
      backgroundColor: color,
      top: `${top}%`,
      left: `${left}%`,
      transform: `rotate(${rotation}deg)`,
      filter: "blur(60px)", // ぼかしを強くして水彩風にする
      borderRadius: "40% 60% 70% 30% / 40% 50% 60% 50%", // 歪んだ円
      zIndex: "-1",
      pointerEvents: "none"
    });

    bgContainer.appendChild(shape);
  }
}

// 全ページ共通でメイン背景を生成する処理（index.html以外でも動くようにする）
window.addEventListener("DOMContentLoaded", () => {
  // すでに背景があるかチェック（二重生成防止）
  if (document.getElementById("main-geometric-bg")) return;

  // 背景色を判定（index.htmlなら青系、それ以外ならオレンジ系）
  const isIndex = window.location.pathname === "/" || window.location.pathname.endsWith("index.html") || window.location.pathname.endsWith("/index.html");
  
  const orangeColors = [
    "rgba(255, 165, 0, 0.08)",  // オレンジ
    "rgba(255, 220, 150, 0.1)", // 薄いオレンジ
    "rgba(255, 140, 0, 0.08)"   // 濃いめのオレンジ
  ];
  
  const blueColors = [
    "rgba(173, 216, 230, 0.1)",
    "rgba(240, 248, 255, 0.15)",
    "rgba(224, 240, 255, 0.1)"
  ];

  // 選ばれた色セットを引数に渡せるように createMainContentBackground を少し拡張して呼び出す
  // ※ index.html の場合は mainContent 要素に、それ以外は body に直接入れる
  if (!isIndex) {
    applyThemedBackground(document.body, orangeColors);
  }
});

// 既存の関数を少し拡張（色の配列を引数で受け取れるようにする）
function applyThemedBackground(parent, colorSet) {
  const bgContainer = document.createElement("div");
  bgContainer.id = "main-geometric-bg";
  parent.prepend(bgContainer);

  const shapeCount = 15;
  for (let i = 0; i < shapeCount; i++) {
    const shape = document.createElement("div");
    shape.className = "main-bg-shape";
    const size = Math.random() * 500 + 500;
    const top = Math.random() * 120-10;
    const left = Math.random() * 120-10;
    const rotation = Math.random() * 360;
    const color = colorSet[Math.floor(Math.random() * colorSet.length)];

    Object.assign(shape.style, {
      position: "fixed", // 画面全体に固定
      width: `${size}px`,
      height: `${size}px`,
      backgroundColor: color,
      top: `${top}%`,
      left: `${left}%`,
      transform: `rotate(${rotation}deg)`,
      filter: "blur(60px)",
      borderRadius: "40% 60% 70% 30% / 40% 50% 60% 50%",
      zIndex: "-1",
      pointerEvents: "none"
    });
    bgContainer.appendChild(shape);
  }
}

// -------------------------------
// ホーム画面用処理
// -------------------------------
window.addEventListener("DOMContentLoaded", () => {

  const intro = document.getElementById("intro-section");
  const mainContent = document.getElementById("main-content");

  if (!intro || !mainContent) return;

  // 背景生成
  createGeometricBackground();
  createMainContentBackground(mainContent);

  // 初期状態
  mainContent.style.opacity = "0";
  mainContent.style.visibility = "hidden";

const handleScroll = () => {

  if (window.scrollY > 180) {

    intro.style.transition = "opacity 0.8s ease";
    intro.style.opacity = "0";

    mainContent.style.visibility = "visible";
    mainContent.style.opacity = "1";

    setTimeout(() => {
      intro.remove();
    }, 800);

    window.removeEventListener("scroll", handleScroll);
  }
};
  window.addEventListener("scroll", handleScroll);
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
