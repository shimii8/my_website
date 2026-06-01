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
// ホーム画面のみイントロを表示（2重表示修正版）
// -------------------------------
if (window.location.pathname === "/" || window.location.pathname.endsWith("index.html") || window.location.pathname.endsWith("/index.html")) {
  
  // 1. 既存の要素（bodyの中身）をすべて取得し、一旦すべて非表示にする
  const initialChildren = Array.from(document.body.children);
  initialChildren.forEach(el => {
    if (el.tagName !== "SCRIPT") el.style.display = "none";
  });

  // 2. イントロセクションの作成
  const intro = document.createElement("section");
  intro.id = "intro-section";
  intro.innerHTML = `
    <div class="intro-content">
      <h1 class="intro-left">自己紹介</h1>
      <span class="intro-slash">／</span>
      <h1 class="intro-right">谷 俊磨</h1>
    </div>
    <p class="scroll-hint">Scroll ↓</p>
  `;
  document.body.prepend(intro);

  // 背景の三角形生成
  if (typeof createGeometricBackground === "function") {
    createGeometricBackground();
  }

  // 3. メインコンテンツの器を作成し、非表示にしていた要素をそちらへ移動
  const mainContent = document.createElement("div");
  mainContent.id = "main-content";
  
  initialChildren.forEach((el) => {
    if (el.tagName !== "SCRIPT" && el.id !== "clock-container") {
      el.style.display = ""; // 非表示を解除
      mainContent.appendChild(el);
    }
    createMainContentBackground(mainContent);
  });
  document.body.appendChild(mainContent);

  // 初期の見え方を制御
  mainContent.style.opacity = "0";
  mainContent.style.visibility = "hidden"; // 完全に存在を隠す

  // 4. スクロールイベント
  const handleScroll = () => {
    if (window.scrollY > window.innerHeight * 0.5) {
      // メインコンテンツを表示
      mainContent.style.visibility = "visible";
      mainContent.style.transition = "opacity 0.8s ease-in-out";
      mainContent.style.opacity = "1";

      // イントロセクション（タイトル画面）を削除して、戻れないようにする
      intro.remove();

      // スクロール位置をリセット（ガタつき防止）
      window.scrollTo(0, 0);

      // スクロール監視を解除（一度実行すれば良いため）
      window.removeEventListener("scroll", handleScroll);
    }
  };

  window.addEventListener("scroll", handleScroll);
}

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
// スタイル
// -------------------------------
const style = document.createElement("style");
style.textContent = `
/* ====== イントロセクション ====== */
#intro-section {
  height: 100vh;
  background: #ffffff;
  color: #000000;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  font-family: "Helvetica Neue", sans-serif;
  text-align: center;
  position: relative;
}

.intro-content {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 30px;
  flex-wrap: wrap;
  animation: fadeIn 2s ease-in-out;
}

.intro-left {
  font-size: 54px;
  font-weight: 700;
}

.intro-slash {
  font-size: 52px;
  font-weight: 300;
  color: #888;
}

.intro-right {
  font-size: 54px;
  font-weight: 400;
}

.scroll-hint {
  position: absolute;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 16px;
  color: #666;
  animation: fadeMove 2s ease-in-out infinite;
  pointer-events: none;
}

/* ====== 自己紹介本文 ====== */
#main-content {
  background-color: #fff;
  padding-top: 60px;
}

/* ====== 時計＋挨拶 ====== */
#clock-container {
  position: fixed;
  top: 20px;
  right: 25px;
  background: rgba(255,255,255,0.7);
  padding: 8px 14px;
  border-radius: 8px;
  font-family: monospace;
  text-align: center;
  z-index: 999;
  box-shadow: 0 2px 6px rgba(0,0,0,0.15);
}

#clock {
  font-size: 20px;
  color: #111;
}

#greeting {
  font-size: 14px;
  color: #333;
  margin-top: 4px;
  font-weight: bold;
}

/* ====== ボタン風リンク ====== */
.button-link {
  position: relative;
  overflow: hidden;
  display: inline-block;
  background-color: #4a90e2;
  color: #fff;
  padding: 18px 28px;
  border-radius: 12px;
  text-decoration: none;
  font-weight: bold;
  font-size: 20px;
  transition: all 0.2s ease;
  box-shadow: 0 6px 0 #2c6cb0;
}

.button-link:hover {
  background-color: #5aa3f2;
}

.button-link.pressed {
  transform: translateY(4px);
  box-shadow: 0 2px 0 #2c6cb0;
}

/* ====== 波紋エフェクト ====== */
.ripple {
  position: absolute;
  border-radius: 50%;
  background: rgba(255,255,255,0.7);
  transform: scale(0);
  animation: rippleEffect 0.6s linear;
  pointer-events: none;
}

@keyframes rippleEffect {
  to {
    transform: scale(4);
    opacity: 0;
  }
}

/* ====== アニメーション ====== */
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes fadeMove {
  0%, 100% { opacity: 0.7; transform: translateY(0); }
  50% { opacity: 1; transform: translateY(8px); }
}
`;
document.head.appendChild(style);

