/**
 * ไฟล์การตั้งค่าหลัก (Configuration)
 * สำหรับเกม "ผจญภัยอาณาจักรพยัญชนะไทย"
 */

const APP_CONFIG = {
  // ชื่อและเวอร์ชันของเกม
  GAME_NAME: "ผจญภัยอาณาจักรพยัญชนะไทย",
  VERSION: "1.0.0",

  // รหัส Google Spreadsheet ของโครงการ
  SPREADSHEET_ID: "15IYfST5tLsyXD42vD8zrdovX0QYYYCcSuTPihUWiEMQ",

  /**
   * วาง URL ของ Google Apps Script Web App ที่ Deploy แล้วที่นี่:
   * ตัวอย่าง: "https://script.google.com/macros/s/AKfycbx.../exec"
   * (หากยังไม่ได้ใส่ ระบบจะใช้ชุดคำถามออฟไลน์ในเครื่อง และบันทึกคะแนนในเครื่องให้ก่อนอัตโนมัติ)
   */
  GOOGLE_APPS_SCRIPT_URL: "",

  // จำนวนข้อคำถามทั้งหมด
  TOTAL_QUESTIONS: 10,

  // ความเร็วในการอ่านเสียงภาษาไทย (0.8 = ช้าฟังง่ายสำหรับเด็กอนุบาล)
  SPEECH_RATE: 0.85,
  SPEECH_PITCH: 1.15
};
