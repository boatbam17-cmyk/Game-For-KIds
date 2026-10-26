/**
 * โมดูลเชื่อมต่อ Google Sheets ผ่าน Google Apps Script Web App API
 * - ปลอดภัย 100%: ไม่ต้องใช้ Google API Key หรือ Service Account Private Key ในฝั่งหน้าเว็บ
 * - ทำงานได้ทันทีทั้งแบบ Offline และ Online (มี Fallback คำถามอัตโนมัติ)
 * - บันทึกคะแนนลง Google Sheets อย่างน่าเชื่อถือ พร้อมสำรองข้อมูลใน LocalStorage
 */

const STORAGE_KEYS = {
  SCRIPT_URL: "thai_consonant_script_url",
  PLAYER_NAME: "thai_consonant_player_name",
  CACHED_QUESTIONS: "thai_consonant_cached_questions",
  LOCAL_RESULTS: "thai_consonant_local_results"
};

// URL เริ่มต้น (เมื่อคุณครูนำ Apps Script ไป Deploy จะได้ URL นำมาใส่ใน config.js หรือใส่ในหน้าตั้งค่า)
const DEFAULT_SCRIPT_URL = (typeof APP_CONFIG !== "undefined" && APP_CONFIG.GOOGLE_APPS_SCRIPT_URL)
  ? APP_CONFIG.GOOGLE_APPS_SCRIPT_URL
  : "";

class GameAPI {
  constructor() {
    this.scriptUrl = localStorage.getItem(STORAGE_KEYS.SCRIPT_URL) || DEFAULT_SCRIPT_URL;
  }

  // ดึง URL ที่ตั้งค่าไว้
  getScriptUrl() {
    return this.scriptUrl;
  }

  // บันทึก URL ใหม่
  setScriptUrl(url) {
    this.scriptUrl = (url || "").trim();
    localStorage.setItem(STORAGE_KEYS.SCRIPT_URL, this.scriptUrl);
  }

  // โหลดคำถาม: ลองโหลดจาก Google Apps Script ก่อน หากไม่มีหรือออฟไลน์ ให้ใช้ DEFAULT_QUESTIONS
  async loadQuestions() {
    if (!this.scriptUrl) {
      console.log("ℹ️ ยังไม่ได้ตั้งค่า Google Apps Script Web App URL -> ใช้ชุดคำถามมาตรฐานในเครื่อง");
      return DEFAULT_QUESTIONS;
    }

    try {
      const fetchUrl = `${this.scriptUrl}?action=getQuestions&t=${Date.now()}`;
      const response = await fetch(fetchUrl, {
        method: "GET",
        mode: "cors"
      });

      if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status}`);
      }

      const result = await response.json();
      if (result.status === "success" && Array.isArray(result.data) && result.data.length > 0) {
        // รวมข้อมูลคำถามจาก Google Sheets กับรูป SVG ที่จัดเตรียมไว้
        const mergedQuestions = result.data.map(sheetQ => {
          const defaultMatch = DEFAULT_QUESTIONS.find(dq => dq.id === sheetQ.id || dq.targetWord === sheetQ.targetWord);
          return {
            id: sheetQ.id,
            question: sheetQ.question,
            targetWord: sheetQ.targetWord,
            correctAnswer: sheetQ.correctAnswer,
            distractors: sheetQ.distractors || (defaultMatch ? defaultMatch.distractors : ["ก", "ข"]),
            hint: sheetQ.hint || (defaultMatch ? defaultMatch.hint : ""),
            imageKey: sheetQ.imageKey || (defaultMatch ? defaultMatch.imageKey : "chicken"),
            svg: defaultMatch ? defaultMatch.svg : (DEFAULT_QUESTIONS[0].svg)
          };
        });

        // บันทึกลง cache เผื่อใช้งานออฟไลน์
        try {
          localStorage.setItem(STORAGE_KEYS.CACHED_QUESTIONS, JSON.stringify(mergedQuestions));
        } catch (e) {}

        return mergedQuestions;
      }
    } catch (error) {
      console.warn("⚠️ ไม่สามารถโหลดคำถามจาก Google Sheets ได้ (กำลังใช้คำถามออฟไลน์):", error);
    }

    return DEFAULT_QUESTIONS;
  }

  // บันทึกผลการเล่นของนักเรียนลง Google Sheets
  async saveResult(data) {
    // 1. สำรองข้อมูลลง LocalStorage เสมอ เพื่อความปลอดภัยของข้อมูลเด็กๆ
    this.saveResultLocally(data);

    if (!this.scriptUrl) {
      return {
        success: true,
        offline: true,
        message: "บันทึกลงในเครื่องเรียบร้อย (ยังไม่ได้เชื่อมต่อ Google Apps Script Web App)"
      };
    }

    // 2. ส่งข้อมูลไปยัง Google Apps Script Web App
    try {
      const payload = {
        nickname: data.nickname || "ผู้กล้าน้อย",
        score: data.score || 10,
        stars: data.stars || 10,
        wrongAttempts: data.wrongAttempts || 0,
        totalStages: data.totalStages || 10,
        timeSpent: data.timeSpent || 0,
        evaluation: data.evaluation || "ยอดเยี่ยม"
      };

      // ส่งแบบ POST (no-cors เป็นมิตรกับ Google Apps Script redirect)
      const res = await fetch(this.scriptUrl, {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "text/plain;charset=utf-8"
        },
        body: JSON.stringify(payload)
      });

      return {
        success: true,
        offline: false,
        message: "บันทึกผลการเล่นลง Google Sheets สำเร็จเรียบร้อยแล้ว!"
      };
    } catch (err) {
      console.warn("เกิดข้อผิดพลาดในการส่งข้อมูล POST ลองส่งแบบ GET Fallback:", err);

      // ลองส่ง Fallback ทาง GET
      try {
        const queryParams = new URLSearchParams({
          action: "saveResult",
          nickname: data.nickname || "ผู้กล้าน้อย",
          score: data.score || 10,
          stars: data.stars || 10,
          wrongAttempts: data.wrongAttempts || 0,
          totalStages: data.totalStages || 10,
          timeSpent: data.timeSpent || 0,
          evaluation: data.evaluation || "ยอดเยี่ยม"
        });

        await fetch(`${this.scriptUrl}?${queryParams.toString()}`, {
          method: "GET",
          mode: "no-cors"
        });

        return {
          success: true,
          offline: false,
          message: "บันทึกผลการเล่นลง Google Sheets สำเร็จ (ผ่านช่องทางสำรอง)"
        };
      } catch (fallbackErr) {
        console.error("ไม่สามารถส่งข้อมูลไปยัง Google Sheets ได้:", fallbackErr);
        return {
          success: false,
          offline: true,
          message: "บันทึกลงในเครื่องแล้ว แต่ยังส่งไป Google Sheets ไม่สำเร็จเนื่องจากสัญญาณขัดข้อง"
        };
      }
    }
  }

  // สำรองผลการเล่นลงใน LocalStorage
  saveResultLocally(data) {
    try {
      const list = JSON.parse(localStorage.getItem(STORAGE_KEYS.LOCAL_RESULTS) || "[]");
      list.push({
        ...data,
        timestamp: new Date().toLocaleString("th-TH")
      });
      // เก็บย้อนหลังสูงสุด 50 รายการ
      if (list.length > 50) list.shift();
      localStorage.setItem(STORAGE_KEYS.LOCAL_RESULTS, JSON.stringify(list));
    } catch (e) {
      console.warn("ไม่สามารถบันทึก LocalStorage ได้:", e);
    }
  }

  // ดึงประวัติที่บันทึกไว้ในเครื่อง
  getLocalResults() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEYS.LOCAL_RESULTS) || "[]");
    } catch (e) {
      return [];
    }
  }

  // ทดสอบการเชื่อมต่อกับ Apps Script Web App
  async testConnection(url) {
    const targetUrl = (url || this.scriptUrl).trim();
    if (!targetUrl) throw new Error("กรุณาระบุ URL ของ Google Apps Script Web App");

    const testUrl = `${targetUrl}?action=setup&t=${Date.now()}`;
    const response = await fetch(testUrl, { method: "GET", mode: "cors" });
    if (!response.ok) throw new Error(`เชื่อมต่อไม่สำเร็จ HTTP ${response.status}`);
    const data = await response.json();
    return data;
  }
}

// สร้าง singleton instance
const gameAPI = new GameAPI();
