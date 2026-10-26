/**
 * ระบบเสียงสำหรับเกมเด็กอนุบาล 3 "ผจญภัยอาณาจักรพยัญชนะไทย"
 * 1. Web Audio API สำหรับเอฟเฟกต์เสียง (ไม่ต้องดาวน์โหลดไฟล์เสียงภายนอก โหลดเร็ว เล่นได้ทุกอุปกรณ์)
 * 2. Web Speech API (เสียงอ่านภาษาไทย th-TH) สำหรับอ่านโจทย์ คำถาม และพยัญชนะ
 */

class SoundController {
  constructor() {
    this.audioCtx = null;
    this.soundEnabled = true;
    this.bgmPlaying = false;
    this.bgmTimer = null;
    this.synth = window.speechSynthesis;
    this.thaiVoice = null;

    // หาเสียงภาษาไทย
    if (this.synth) {
      this.initVoices();
      if (speechSynthesis.onvoiceschanged !== undefined) {
        speechSynthesis.onvoiceschanged = () => this.initVoices();
      }
    }
  }

  // เตรียมเสียงพูดภาษาไทย
  initVoices() {
    if (!this.synth) return;
    const voices = this.synth.getVoices();
    this.thaiVoice = voices.find(v => v.lang === "th-TH" || v.lang.startsWith("th")) || null;
  }

  // เริ่มต้น AudioContext เมื่อมีการคลิก (ตามนโยบายเบราว์เซอร์)
  getAudioContext() {
    if (!this.audioCtx) {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (AudioContextClass) {
        this.audioCtx = new AudioContextClass();
      }
    }
    if (this.audioCtx && this.audioCtx.state === "suspended") {
      this.audioCtx.resume();
    }
    return this.audioCtx;
  }

  // สลับเปิด/ปิดเสียงทั้งหมด
  toggleSound() {
    this.soundEnabled = !this.soundEnabled;
    if (!this.soundEnabled && this.synth) {
      this.synth.cancel();
      this.stopBgm();
    }
    return this.soundEnabled;
  }

  // 1. เสียงคลิกปุ่มทั่วไป (Pop เบาๆ น่ารัก)
  playClick() {
    if (!this.soundEnabled) return;
    const ctx = this.getAudioContext();
    if (!ctx) return;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(450, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(800, ctx.currentTime + 0.08);

    gain.gain.setValueAtTime(0.2, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.08);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.08);
  }

  // 2. เสียงตอบถูก (Melodic Major Arpeggio ไพเราะ ปลุกเร้าใจ)
  playCorrect() {
    if (!this.soundEnabled) return;
    const ctx = this.getAudioContext();
    if (!ctx) return;

    // C5, E5, G5, C6
    const notes = [523.25, 659.25, 783.99, 1046.50];
    notes.forEach((freq, index) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      const startTime = ctx.currentTime + (index * 0.09);
      const duration = 0.25;

      osc.type = "triangle";
      osc.frequency.setValueAtTime(freq, startTime);

      gain.gain.setValueAtTime(0.25, startTime);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + duration);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(startTime);
      osc.stop(startTime + duration);
    });
  }

  // 3. เสียงตอบผิด (Boing นุ่มนวล การ์ตูน ให้กำลังใจ ไม่น่ากลัว)
  playWrong() {
    if (!this.soundEnabled) return;
    const ctx = this.getAudioContext();
    if (!ctx) return;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    const startTime = ctx.currentTime;
    const duration = 0.35;

    osc.type = "sine";
    // สไลด์ความถี่แบบการ์ตูน
    osc.frequency.setValueAtTime(320, startTime);
    osc.frequency.exponentialRampToValueAtTime(180, startTime + duration);

    gain.gain.setValueAtTime(0.2, startTime);
    gain.gain.exponentialRampToValueAtTime(0.01, startTime + duration);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(startTime);
    osc.stop(startTime + duration);
  }

  // 4. เสียงรับดาว (Magical Sparkle Shimmer)
  playStarEarn() {
    if (!this.soundEnabled) return;
    const ctx = this.getAudioContext();
    if (!ctx) return;

    const notes = [659.25, 830.61, 987.77, 1318.51, 1567.98];
    notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      const startTime = ctx.currentTime + (idx * 0.06);
      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, startTime);

      gain.gain.setValueAtTime(0.2, startTime);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.3);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(startTime);
      osc.stop(startTime + 0.3);
    });
  }

  // 5. เสียงเฉลิมฉลองจบเกม (Victory Fanfare ชนะด่าน 10)
  playVictory() {
    if (!this.soundEnabled) return;
    const ctx = this.getAudioContext();
    if (!ctx) return;

    // G4, C5, E5, G5, C6 ชนะเลิศ
    const fanfare = [
      { f: 392.00, d: 0.15, wait: 0 },
      { f: 523.25, d: 0.15, wait: 0.15 },
      { f: 659.25, d: 0.15, wait: 0.30 },
      { f: 783.99, d: 0.35, wait: 0.45 },
      { f: 659.25, d: 0.15, wait: 0.85 },
      { f: 1046.50, d: 0.70, wait: 1.05 }
    ];

    fanfare.forEach(item => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      const startTime = ctx.currentTime + item.wait;
      osc.type = "triangle";
      osc.frequency.setValueAtTime(item.f, startTime);

      gain.gain.setValueAtTime(0.3, startTime);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + item.d);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(startTime);
      osc.stop(startTime + item.d);
    });
  }

  // 6. ดนตรีเบื้องหลังแสนอบอุ่น (BGM Loop สังเคราะห์นุ่มนวล)
  startBgm() {
    if (!this.soundEnabled || this.bgmPlaying) return;
    this.bgmPlaying = true;
    this.scheduleBgmLoop();
  }

  scheduleBgmLoop() {
    if (!this.bgmPlaying || !this.soundEnabled) return;
    const ctx = this.getAudioContext();
    if (!ctx) return;

    // ท่วงทำนองสดใสสำหรับเด็กๆ
    const melody = [
      { f: 261.63, d: 0.3 }, // C4
      { f: 329.63, d: 0.3 }, // E4
      { f: 392.00, d: 0.3 }, // G4
      { f: 329.63, d: 0.3 }, // E4
      { f: 349.23, d: 0.3 }, // F4
      { f: 392.00, d: 0.3 }, // G4
      { f: 440.00, d: 0.5 }, // A4
      { f: 392.00, d: 0.5 }  // G4
    ];

    let current = ctx.currentTime;
    melody.forEach(n => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(n.f, current);

      gain.gain.setValueAtTime(0.04, current);
      gain.gain.exponentialRampToValueAtTime(0.001, current + n.d);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(current);
      osc.stop(current + n.d);
      current += n.d + 0.1;
    });

    const loopTime = (current - ctx.currentTime) * 1000;
    this.bgmTimer = setTimeout(() => {
      if (this.bgmPlaying) this.scheduleBgmLoop();
    }, loopTime + 500);
  }

  stopBgm() {
    this.bgmPlaying = false;
    if (this.bgmTimer) {
      clearTimeout(this.bgmTimer);
      this.bgmTimer = null;
    }
  }

  // 7. เสียงอ่านภาษาไทย (TTS)
  speakText(text, onEndCallback = null) {
    if (!this.soundEnabled || !this.synth) return;
    
    // ยกเลิกข้อความก่อนหน้า
    this.synth.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "th-TH";
    utterance.rate = 0.9; // ช้าลงเล็กน้อยเพื่อให้เด็กอนุบาลฟังชัดเจน
    utterance.pitch = 1.15; // เสียงสดใสโทนสูงเล็กน้อยสไตล์คุณครูใจดี

    if (this.thaiVoice) {
      utterance.voice = this.thaiVoice;
    }

    if (onEndCallback) {
      utterance.onend = onEndCallback;
    }

    try {
      this.synth.speak(utterance);
    } catch (e) {
      console.warn("SpeechSynthesis error:", e);
    }
  }
}

// สร้าง singleton instance
const soundCtrl = new SoundController();
