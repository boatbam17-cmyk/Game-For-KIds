/**
 * ตรรกะหลักของเกม "ผจญภัยอาณาจักรพยัญชนะไทย"
 * ออกแบบเพื่อการเรียนรู้ของเด็กปฐมวัย (อนุบาล 3 อายุ 5-6 ปี)
 */

class ConsonantAdventureGame {
  constructor() {
    this.questions = [];
    this.currentIndex = 0;
    this.score = 0;
    this.stars = 0;
    this.wrongAttempts = 0;
    this.questionWrongCount = 0; // นับการตอบผิดเฉพาะข้อปัจจุบัน
    this.playerNickname = "";
    this.playerAvatar = "boy"; // 'boy' หรือ 'girl'
    this.startTime = null;
    this.isAnswering = false; // ป้องกันการกดรัวขณะแอนิเมชันกำลังเล่น
    this.confettiInterval = null;

    // ผูก Element ต่างๆ
    this.bindElements();
    this.attachEventListeners();
    this.init();
  }

  bindElements() {
    // Screens
    this.startScreen = document.getElementById("start-screen");
    this.gameScreen = document.getElementById("game-screen");
    this.endScreen = document.getElementById("end-screen");

    // Start Screen Elements
    this.nicknameInput = document.getElementById("player-nickname");
    this.avatarButtons = document.querySelectorAll(".avatar-btn");
    this.btnStart = document.getElementById("btn-start");
    this.btnSettings = document.getElementById("btn-settings");

    // Game Screen Header
    this.stageLabel = document.getElementById("current-stage-label");
    this.starCounter = document.getElementById("star-counter-text");
    this.btnSoundToggle = document.getElementById("btn-sound-toggle");
    this.btnBgmToggle = document.getElementById("btn-bgm-toggle");
    this.btnReadQuestion = document.getElementById("btn-read-question");

    // Adventure Map
    this.mapPathContainer = document.getElementById("map-path-container");
    this.mapAvatar = document.getElementById("map-avatar");

    // Question Area
    this.questionText = document.getElementById("question-text");
    this.targetWordBadge = document.getElementById("target-word-badge");
    this.illustrationContainer = document.getElementById("illustration-container");
    this.choicesContainer = document.getElementById("choices-container");

    // Praise & Hint Popups
    this.praiseOverlay = document.getElementById("praise-overlay");
    this.praiseText = document.getElementById("praise-text");
    this.hintOverlay = document.getElementById("hint-overlay");
    this.hintText = document.getElementById("hint-text");
    this.btnHintClose = document.getElementById("btn-hint-close");

    // End Screen Elements
    this.endPlayerName = document.getElementById("end-player-name");
    this.endScoreText = document.getElementById("end-score-text");
    this.endStarsContainer = document.getElementById("end-stars-container");
    this.endWrongCount = document.getElementById("end-wrong-count");
    this.endEvaluationText = document.getElementById("end-evaluation-text");
    this.sheetsStatusBadge = document.getElementById("sheets-status-badge");
    this.btnPlayAgain = document.getElementById("btn-play-again");
    this.btnPrintCert = document.getElementById("btn-print-cert");

    // Settings Modal
    this.settingsModal = document.getElementById("settings-modal");
    this.btnSettingsClose = document.getElementById("btn-settings-close");
    this.inputScriptUrl = document.getElementById("settings-script-url");
    this.btnSaveSettings = document.getElementById("btn-save-settings");
    this.btnTestConnection = document.getElementById("btn-test-connection");
    this.connectionStatus = document.getElementById("connection-status");
    this.localResultsTable = document.getElementById("local-results-tbody");
  }

  attachEventListeners() {
    // เลือกตัวละคร Avatar
    this.avatarButtons.forEach(btn => {
      btn.addEventListener("click", () => {
        soundCtrl.playClick();
        this.avatarButtons.forEach(b => b.classList.remove("selected"));
        btn.classList.add("selected");
        this.playerAvatar = btn.dataset.avatar || "boy";
      });
    });

    // เริ่มเกม
    this.btnStart.addEventListener("click", () => {
      soundCtrl.playClick();
      this.startGame();
    });

    // กด Enter ในช่องกรอกชื่อ
    this.nicknameInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        this.startGame();
      }
    });

    // ปุ่มอ่านโจทย์
    this.btnReadQuestion.addEventListener("click", () => {
      soundCtrl.playClick();
      this.readCurrentQuestion();
    });

    // ปุ่มเปิดปิดเสียงเอฟเฟกต์
    this.btnSoundToggle.addEventListener("click", () => {
      const enabled = soundCtrl.toggleSound();
      this.btnSoundToggle.innerHTML = enabled ? "🔔 เสียง: เปิด" : "🔕 เสียง: ปิด";
      this.btnSoundToggle.classList.toggle("muted", !enabled);
      if (enabled) soundCtrl.playClick();
    });

    // ปุ่มเปิดปิดดนตรีประกอบ (BGM)
    this.btnBgmToggle.addEventListener("click", () => {
      soundCtrl.playClick();
      if (soundCtrl.bgmPlaying) {
        soundCtrl.stopBgm();
        this.btnBgmToggle.innerHTML = "🎵 เพลง: ปิด";
        this.btnBgmToggle.classList.add("muted");
      } else {
        soundCtrl.startBgm();
        this.btnBgmToggle.innerHTML = "🎵 เพลง: เปิด";
        this.btnBgmToggle.classList.remove("muted");
      }
    });

    // ปิดป๊อปอัปคำใบ้
    this.btnHintClose.addEventListener("click", () => {
      soundCtrl.playClick();
      this.hintOverlay.classList.remove("show");
    });

    // เล่นใหม่อีกครั้ง
    this.btnPlayAgain.addEventListener("click", () => {
      soundCtrl.playClick();
      this.stopConfetti();
      this.showScreen(this.startScreen);
    });

    // พิมพ์เกียรติบัตร
    this.btnPrintCert.addEventListener("click", () => {
      soundCtrl.playClick();
      window.print();
    });

    // หน้าต่างตั้งค่าคุณครู
    this.btnSettings.addEventListener("click", () => {
      soundCtrl.playClick();
      this.openSettingsModal();
    });

    this.btnSettingsClose.addEventListener("click", () => {
      soundCtrl.playClick();
      this.settingsModal.classList.remove("show");
    });

    this.btnSaveSettings.addEventListener("click", () => {
      soundCtrl.playClick();
      const newUrl = this.inputScriptUrl.value.trim();
      gameAPI.setScriptUrl(newUrl);
      this.showToast("บันทึกการตั้งค่า URL เรียบร้อย!");
      this.settingsModal.classList.remove("show");
    });

    this.btnTestConnection.addEventListener("click", async () => {
      soundCtrl.playClick();
      const testUrl = this.inputScriptUrl.value.trim();
      this.connectionStatus.textContent = "กำลังทดสอบเชื่อมต่อ Google Sheets...";
      this.connectionStatus.className = "status-indicator testing";
      try {
        const res = await gameAPI.testConnection(testUrl);
        this.connectionStatus.textContent = `✅ เชื่อมต่อสำเร็จ! (${res.message || "ชีตพร้อมใช้งาน"})`;
        this.connectionStatus.className = "status-indicator success";
      } catch (err) {
        this.connectionStatus.textContent = `❌ เชื่อมต่อไม่สำเร็จ: ${err.message}`;
        this.connectionStatus.className = "status-indicator error";
      }
    });

    // อัปเดตตำแหน่ง avatar เมื่อหน้าจอย่อ-ขยาย
    window.addEventListener("resize", () => {
      this.updateMapPosition();
    });
  }

  async init() {
    // โหลดชื่อเล่นเดิมที่เคยใส่ไว้
    const savedName = localStorage.getItem(STORAGE_KEYS.PLAYER_NAME);
    if (savedName) {
      this.nicknameInput.value = savedName;
    }

    // โหลดชุดคำถามล่วงหน้า
    this.questions = await gameAPI.loadQuestions();
    this.buildMapTrack();
  }

  // สร้างจุดผจญภัย 10 จุดบนแผนที่
  buildMapTrack() {
    this.mapPathContainer.innerHTML = "";
    const total = 10;
    for (let i = 0; i < total; i++) {
      const stone = document.createElement("div");
      stone.className = `map-stone ${i === 0 ? "active" : ""}`;
      stone.id = `map-stone-${i}`;
      stone.innerHTML = `
        <span class="stone-num">${i + 1}</span>
        <span class="stone-star">⭐</span>
      `;
      this.mapPathContainer.appendChild(stone);
    }
  }

  // สลับหน้าจอ
  showScreen(targetScreen) {
    [this.startScreen, this.gameScreen, this.endScreen].forEach(screen => {
      screen.classList.remove("active");
    });
    targetScreen.classList.add("active");
  }

  // เริ่มต้นเกมใหม่
  startGame() {
    const rawName = this.nicknameInput.value.trim();
    this.playerNickname = rawName || "ผู้กล้าน้อย";
    localStorage.setItem(STORAGE_KEYS.PLAYER_NAME, this.playerNickname);

    this.currentIndex = 0;
    this.score = 0;
    this.stars = 0;
    this.wrongAttempts = 0;
    this.questionWrongCount = 0;
    this.startTime = Date.now();
    this.isAnswering = false;

    // อัปเดต Avatar ตัวละครบนแผนที่
    this.updateAvatarVisual();

    // แสดงหน้าเล่นเกม
    this.showScreen(this.gameScreen);
    this.renderCurrentQuestion();
    this.updateProgressUI();

    // เริ่มเล่นเพลงคลอเบาๆ หากเปิดไว้
    soundCtrl.startBgm();
  }

  // แสดงผลคำถามปัจจุบัน
  renderCurrentQuestion() {
    if (this.currentIndex >= this.questions.length) {
      this.endGame();
      return;
    }

    this.isAnswering = false;
    this.questionWrongCount = 0;
    const q = this.questions[this.currentIndex];

    // ข้อความคำถาม & สัญลักษณ์
    this.stageLabel.textContent = `ด่านที่ ${this.currentIndex + 1} / ${this.questions.length}`;
    this.questionText.textContent = q.question;
    this.targetWordBadge.textContent = `คำว่า "${q.targetWord}"`;

    // ภาพประกอบ SVG น่ารักคมชัด
    this.illustrationContainer.innerHTML = q.svg || `<div class="word-fallback">${q.targetWord}</div>`;

    // เตรียมตัวเลือก 3 ข้อ โดยสุ่มตำแหน่งทุกรอบ
    const choiceList = [q.correctAnswer, ...q.distractors];
    const shuffledChoices = shuffleArray(choiceList);

    this.choicesContainer.innerHTML = "";
    shuffledChoices.forEach(choice => {
      const btn = document.createElement("button");
      btn.className = "choice-btn";
      btn.setAttribute("type", "button");
      btn.setAttribute("aria-label", `เลือกพยัญชนะ ${choice}`);
      btn.innerHTML = `
        <span class="choice-consonant">${choice}</span>
        <span class="choice-phonetic">${this.getPhoneticHint(choice)}</span>
      `;

      btn.addEventListener("click", () => {
        if (this.isAnswering) return;
        this.handleAnswer(choice, btn, q);
      });

      this.choicesContainer.appendChild(btn);
    });

    // เลื่อน Avatar บนแผนที่
    this.updateMapPosition();

    // อ่านโจทย์เสียงภาษาไทยอัตโนมัติอย่างชัดเจน
    setTimeout(() => {
      this.readCurrentQuestion();
    }, 400);
  }

  // ตัวช่วยคำอ่านพยัญชนะเพื่อการจดจำ
  getPhoneticHint(char) {
    const table = {
      "ก": "กอ ไก่",
      "ข": "ขอ ไข่",
      "ฃ": "ฃอ ขวด",
      "ค": "คอ ควาย",
      "ฅ": "ฅอ คน",
      "ฆ": "ฆอ ระฆัง",
      "ง": "งอ งู",
      "จ": "จอ จาน",
      "ฉ": "ฉอ ฉิ่ง",
      "ช": "ชอ ช้าง",
      "ซ": "ซอ โซ่",
      "ฌ": "ฌอ เฌอ",
      "ญ": "ญอ หญิง",
      "ด": "ดอ เด็ก",
      "ต": "ตอ เต่า",
      "ถ": "ถอ ถุง",
      "ท": "ทอ ทหาร",
      "ธ": "ธอ ธง",
      "น": "นอ หนู",
      "บ": "บอ ใบไม้",
      "ป": "ปอ ปลา",
      "ผ": "ผอ ผึ้ง",
      "ฝ": "ฝอ ฝา",
      "พ": "พอ พาน",
      "ฟ": "ฟอ ฟัน",
      "ภ": "ภอ สำเภา",
      "ม": "มอ ม้า",
      "ย": "ยอ ยักษ์",
      "ร": "รอ เรือ",
      "ล": "ลอ ลิง",
      "ว": "วอ แหวน",
      "ศ": "ศอ ศาลา",
      "ษ": "ษอ ฤๅษี",
      "ส": "สอ เสือ",
      "ห": "หอ หีบ",
      "ฬ": "ฬอ จุฬา",
      "อ": "ออ อ่าง",
      "ฮ": "ฮอ นกฮูก"
    };
    return table[char] || char;
  }

  // จัดการเมื่อเด็กคลิกเลือกตัวเลือก
  handleAnswer(selectedChoice, buttonElement, questionData) {
    if (selectedChoice === questionData.correctAnswer) {
      // ===== ตอบถูก =====
      this.isAnswering = true;
      buttonElement.classList.add("correct");

      soundCtrl.playCorrect();
      setTimeout(() => soundCtrl.playStarEarn(), 250);

      this.score += 1;
      this.stars += 1;
      this.updateProgressUI();

      // สุ่มคำชมที่สดใส
      const randomPraise = PRAISE_MESSAGES[Math.floor(Math.random() * PRAISE_MESSAGES.length)];
      this.showPraiseOverlay(randomPraise);
      soundCtrl.speakText(`ถูกต้อง เก่งมากเลย! ${questionData.targetWord} ขึ้นต้นด้วย ${this.getPhoneticHint(selectedChoice)}`);

      // มาร์กหินบนแผนที่ว่าผ่านแล้ว
      const currentStone = document.getElementById(`map-stone-${this.currentIndex}`);
      if (currentStone) {
        currentStone.classList.add("completed");
      }

      // ไปด่านถัดไปหลังแอนิเมชันคำชม
      setTimeout(() => {
        this.praiseOverlay.classList.remove("show");
        this.currentIndex += 1;
        this.renderCurrentQuestion();
      }, 1800);

    } else {
      // ===== ตอบผิด =====
      // เงื่อนไข: แสดงคำใบ้ ไม่หักคะแนน ไม่เปลี่ยนด่าน และให้ตอบใหม่ได้จนกว่าจะถูก
      this.wrongAttempts += 1;
      this.questionWrongCount += 1;
      buttonElement.classList.add("wrong");
      soundCtrl.playWrong();

      setTimeout(() => {
        buttonElement.classList.remove("wrong");
      }, 700);

      // แสดงคำใบ้น่ารักไม่ทำให้เด็กเสียกำลังใจ
      const hintMsg = questionData.hint || `ลองฟังเสียงอีกครั้งนะจ๊ะ ${questionData.targetWord} ขึ้นต้นด้วยเสียงอะไรเอ่ย?`;
      this.showHintOverlay(hintMsg);
      soundCtrl.speakText(`เกือบลอยแล้วคนเก่ง! ${hintMsg}`);
    }
  }

  // ป๊อปอัปคำชม
  showPraiseOverlay(message) {
    this.praiseText.textContent = message;
    this.praiseOverlay.classList.add("show");
  }

  // ป๊อปอัปคำใบ้
  showHintOverlay(message) {
    this.hintText.textContent = message;
    this.hintOverlay.classList.add("show");
  }

  // อัปเดตตัวเลขคะแนนและดาว
  updateProgressUI() {
    this.starCounter.textContent = `${this.stars} / ${this.questions.length}`;
  }

  // อัปเดตตำแหน่งและสัญลักษณ์ Avatar
  updateAvatarVisual() {
    const isGirl = this.playerAvatar === "girl";
    this.mapAvatar.innerHTML = isGirl ? "👧🎒" : "👦🎒";
  }

  // เลื่อน Avatar บนแถบผจญภัย
  updateMapPosition() {
    const totalStones = 10;
    for (let i = 0; i < totalStones; i++) {
      const stone = document.getElementById(`map-stone-${i}`);
      if (!stone) continue;
      stone.classList.toggle("active", i === this.currentIndex);
    }

    const currentStone = document.getElementById(`map-stone-${this.currentIndex}`);
    if (currentStone && this.mapPathContainer && this.mapPathContainer.parentElement) {
      const wrapperRect = this.mapPathContainer.parentElement.getBoundingClientRect();
      const stoneRect = currentStone.getBoundingClientRect();
      if (wrapperRect.width > 0 && stoneRect.width > 0) {
        const offsetLeft = stoneRect.left - wrapperRect.left + (stoneRect.width / 2);
        this.mapAvatar.style.left = `${offsetLeft}px`;
        return;
      }
    }

    // Fallback หากยังไม่ได้คำนวณ DOM Layout
    const percentage = (this.currentIndex / (totalStones - 1)) * 82;
    this.mapAvatar.style.left = `${percentage}%`;
  }

  // อ่านโจทย์ด้วยเสียงภาษาไทย
  readCurrentQuestion() {
    if (this.currentIndex >= this.questions.length) return;
    const q = this.questions[this.currentIndex];
    const textToRead = `${q.question} คำว่า ${q.targetWord}`;
    soundCtrl.speakText(textToRead);
  }

  // จบเกม นำทางไปสู่หน้าสรุปผล
  async endGame() {
    this.showScreen(this.endScreen);
    soundCtrl.stopBgm();
    soundCtrl.playVictory();
    this.startConfetti();

    const timeSpentSec = Math.round((Date.now() - (this.startTime || Date.now())) / 1000);
    const totalQuestions = this.questions.length;

    // แสดงข้อมูลในหน้าจอสรุป
    this.endPlayerName.textContent = `ยินดีด้วย ${this.playerNickname} ผู้กล้าน้อย!`;
    this.endScoreText.textContent = `${this.score} / ${totalQuestions}`;
    this.endWrongCount.textContent = `${this.wrongAttempts} ครั้ง`;

    // แสดงดาว 10 ดวงเต็ม
    this.endStarsContainer.innerHTML = "";
    for (let i = 0; i < this.stars; i++) {
      const starSpan = document.createElement("span");
      starSpan.className = "result-star animated";
      starSpan.style.animationDelay = `${i * 0.1}s`;
      starSpan.textContent = "⭐";
      this.endStarsContainer.appendChild(starSpan);
    }

    // คำประเมินผล
    let evalText = "สุดยอดอัจฉริยะแห่งอาณาจักรพยัญชนะไทย 🏆";
    if (this.wrongAttempts === 0) {
      evalText = "สมบูรณ์แบบ ตอบถูกรวดเดียวครบ 10 ข้อ! รับเหรียญทองคำขาว 🌟";
    } else if (this.wrongAttempts <= 3) {
      evalText = "ยอดเยี่ยมมาก มีความพยายามสูงยิ่ง! รับเหรียญทองผู้กล้า 🥇";
    } else {
      evalText = "เก่งมากเลย ไม่ย่อท้อจนพิชิตครบทุกด่าน! รับเหรียญเงินเกียรติยศ 🥈";
    }
    this.endEvaluationText.textContent = evalText;

    // อ่านคำประกาศชัยชนะ
    setTimeout(() => {
      soundCtrl.speakText(`ยินดีด้วยจ้า ${this.playerNickname} ปลดล็อกปราสาทพยัญชนะสำเร็จแล้ว คุณครูภูมิใจในตัวหนูมากเลยจ้า!`);
    }, 600);

    // บันทึกคะแนนลง Google Sheets อย่างปลอดภัย
    this.sheetsStatusBadge.textContent = "กำลังบันทึกคะแนนลง Google Sheets... ⏳";
    this.sheetsStatusBadge.className = "status-badge saving";

    const saveResult = await gameAPI.saveResult({
      nickname: this.playerNickname,
      score: this.score,
      stars: this.stars,
      wrongAttempts: this.wrongAttempts,
      totalStages: totalQuestions,
      timeSpent: timeSpentSec,
      evaluation: evalText
    });

    if (saveResult.success) {
      this.sheetsStatusBadge.textContent = saveResult.offline
        ? "✅ บันทึกในเครื่องเรียบร้อย (พร้อมซิงค์ขึ้นชีตเมื่อเชื่อมต่อ)"
        : "✅ บันทึกคะแนนลง Google Sheets เรียบร้อยแล้ว!";
      this.sheetsStatusBadge.className = "status-badge success";
    } else {
      this.sheetsStatusBadge.textContent = "⚠️ ไม่สามารถส่งขึ้น Google Sheets ได้ (บันทึกในเครื่องแล้ว)";
      this.sheetsStatusBadge.className = "status-badge warning";
    }
  }

  // เอฟเฟกต์กระดาษสายรุ้งโปรยปราย (Confetti)
  startConfetti() {
    this.stopConfetti();
    const container = document.getElementById("confetti-container");
    if (!container) return;

    const colors = ["#FF5252", "#FF4081", "#E040FB", "#7C4DFF", "#536DFE", "#40C4FF", "#18FFFF", "#64FFDA", "#69F0AE", "#B2FF59", "#EEFF41", "#FFFF00", "#FFD740", "#FFAB40", "#FF6E40"];
    
    const createPiece = () => {
      const piece = document.createElement("div");
      piece.className = "confetti-piece";
      piece.style.left = `${Math.random() * 100}%`;
      piece.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      piece.style.transform = `rotate(${Math.random() * 360}deg)`;
      piece.style.animationDuration = `${2 + Math.random() * 2}s`;
      piece.style.width = `${8 + Math.random() * 10}px`;
      piece.style.height = `${12 + Math.random() * 14}px`;
      container.appendChild(piece);

      setTimeout(() => {
        piece.remove();
      }, 4000);
    };

    // โปรยชุดแรก 60 ชิ้น
    for (let i = 0; i < 60; i++) {
      setTimeout(createPiece, i * 35);
    }

    // โปรยต่อเนื่อง
    this.confettiInterval = setInterval(() => {
      createPiece();
      createPiece();
    }, 250);
  }

  stopConfetti() {
    if (this.confettiInterval) {
      clearInterval(this.confettiInterval);
      this.confettiInterval = null;
    }
    const container = document.getElementById("confetti-container");
    if (container) container.innerHTML = "";
  }

  // หน้าต่างการตั้งค่าของคุณครู/ผู้ปกครอง
  openSettingsModal() {
    this.inputScriptUrl.value = gameAPI.getScriptUrl();
    this.connectionStatus.textContent = "";
    this.connectionStatus.className = "status-indicator";
    this.renderLocalResults();
    this.settingsModal.classList.add("show");
  }

  // แสดงตารางประวัติผลการเล่นล่าสุด
  renderLocalResults() {
    const list = gameAPI.getLocalResults();
    this.localResultsTable.innerHTML = "";

    if (list.length === 0) {
      this.localResultsTable.innerHTML = `<tr><td colspan="5" class="text-center">ยังไม่มีประวัติการเล่น</td></tr>`;
      return;
    }

    list.slice(-10).reverse().forEach(item => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${item.timestamp || "-"}</td>
        <td><strong>${item.nickname}</strong></td>
        <td>${item.score}/${item.totalStages || 10}</td>
        <td>⭐ ${item.stars}</td>
        <td>${item.wrongAttempts} ครั้ง</td>
      `;
      this.localResultsTable.appendChild(tr);
    });
  }

  showToast(msg) {
    const toast = document.createElement("div");
    toast.className = "game-toast";
    toast.textContent = msg;
    document.body.appendChild(toast);
    setTimeout(() => toast.classList.add("show"), 50);
    setTimeout(() => {
      toast.classList.remove("show");
      setTimeout(() => toast.remove(), 400);
    }, 2500);
  }
}

// เริ่มต้นเกมเมื่อหน้าเว็บพร้อมทำงาน
document.addEventListener("DOMContentLoaded", () => {
  window.gameApp = new ConsonantAdventureGame();
});
