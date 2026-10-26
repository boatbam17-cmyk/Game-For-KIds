/**
 * Google Apps Script สำหรับเกม "ผจญภัยอาณาจักรพยัญชนะไทย"
 * Google Sheets ID: 15IYfST5tLsyXD42vD8zrdovX0QYYYCcSuTPihUWiEMQ
 * 
 * ความสามารถ:
 * 1. ตรวจสอบและสร้างชีต 'Questions' และ 'Results' อัตโนมัติเมื่อยังไม่มี
 * 2. รองรับทั้ง Container-bound script (เปิดผ่าน Extensions > Apps Script) และ Standalone script
 * 3. ลงข้อมูลโจทย์ตั้งต้น 10 ข้อในชีต Questions อัตโนมัติ
 * 4. ให้บริการ API (GET & POST) สำหรับดึงรายการคำถามและบันทึกผลคะแนนอย่างปลอดภัย
 * 5. ป้องกันข้อผิดพลาดกรณี Run ฟังก์ชันทดสอบตรงๆ จากตัว Editor
 */

// รหัส Google Sheets ของโครงการ
const SPREADSHEET_ID = "15IYfST5tLsyXD42vD8zrdovX0QYYYCcSuTPihUWiEMQ";

/**
 * ฟังก์ชันเปิด Spreadsheet:
 * ลำดับ 1: ใช้ Active Spreadsheet ของชีตที่เปิดอยู่ก่อนเสมอ (กรณีเปิดผ่าน Extensions > Apps Script)
 * ลำดับ 2: หากไม่มี ให้เปิดตาม SPREADSHEET_ID
 */
function getSpreadsheet() {
  try {
    const active = SpreadsheetApp.getActiveSpreadsheet();
    if (active) return active;
  } catch (e) {
    // ข้ามไป fallback
  }

  try {
    if (SPREADSHEET_ID && SPREADSHEET_ID.trim() !== "") {
      return SpreadsheetApp.openById(SPREADSHEET_ID.trim());
    }
  } catch (err) {
    console.error("เกิดข้อผิดพลาดในการเปิดชีตตาม ID: " + err);
  }

  throw new Error("ไม่สามารถเปิด Google Spreadsheet ได้ กรุณาเปิดสคริปต์นี้จากเมนู 'ส่วนขยาย (Extensions) > Apps Script' ใน Google Sheets หรือตรวจสอบ Spreadsheet ID");
}

/**
 * ฟังก์ชันเตรียมชีต Questions และ Results อัตโนมัติ
 * สามารถกดปุ่ม 'เรียกใช้ (Run)' ฟังก์ชันนี้ใน Apps Script ได้ทันที
 */
function setupSheets() {
  const ss = getSpreadsheet();
  
  // 1. จัดการชีต Questions
  let questionSheet = ss.getSheetByName("Questions");
  if (!questionSheet) {
    questionSheet = ss.insertSheet("Questions");
  }

  // หากยังไม่มีข้อมูลหรือมีแค่หัว ให้ใส่ข้อมูลตั้งต้น 10 ข้อ
  if (questionSheet.getLastRow() === 0) {
    const headers = [
      "ID",
      "Question",
      "TargetWord",
      "CorrectAnswer",
      "Distractor1",
      "Distractor2",
      "Hint",
      "ImageKey"
    ];
    questionSheet.appendRow(headers);
    questionSheet.getRange(1, 1, 1, headers.length)
      .setBackground("#4CAF50")
      .setFontColor("#FFFFFF")
      .setFontWeight("bold")
      .setHorizontalAlignment("center");

    const initialQuestions = [
      [1, "ไก่ อ่านขึ้นต้นด้วยพยัญชนะใด?", "ไก่", "ก", "ข", "ค", "ลองนึกถึง 'กอ ไก่' กุ๊กกุ๊ก ดูนะจ๊ะ", "chicken"],
      [2, "ไข่ ขึ้นต้นด้วยพยัญชนะใด?", "ไข่", "ข", "ฃ", "ค", "ไข่กลมๆ เริ่มต้นด้วย 'ขอ ไข่' ในเล้าจ้า", "egg"],
      [3, "งู ขึ้นต้นด้วยพยัญชนะใด?", "งู", "ง", "จ", "ฉ", "งูเลื้อยตัวยาว ฟู่ๆ คือ 'งอ งู' ใจกล้า", "snake"],
      [4, "จาน ขึ้นต้นด้วยพยัญชนะใด?", "จาน", "จ", "ฉ", "ช", "จานใส่อาหารอร่อย คือ 'จอ จาน' ใช้ดี", "plate"],
      [5, "ช้าง ขึ้นต้นด้วยพยัญชนะใด?", "ช้าง", "ช", "ซ", "ฌ", "ช้างตัวโตงวงยาว แป๋นๆ คือ 'ชอ ช้าง' จ้า", "elephant"],
      [6, "ปลา ขึ้นต้นด้วยพยัญชนะใด?", "ปลา", "ป", "ผ", "ฝ", "ปลาว่ายน้ำดุ๊กดิ๊ก คือ 'ปอ ปลา' ตากลม", "fish"],
      [7, "ม้า ขึ้นต้นด้วยพยัญชนะใด?", "ม้า", "ม", "ย", "น", "ม้าวิ่งกุบกับ ฮี้ๆ คือ 'มอ ม้า' คึกคัก", "horse"],
      [8, "รถ ขึ้นต้นด้วยพยัญชนะใด?", "รถ", "ร", "ล", "ว", "รถแล่นฉิว บรื้นๆ คือ 'รอ เรือ' หรือ 'รถ' ขึ้นต้นด้วย รอ", "car"],
      [9, "ลิง ขึ้นต้นด้วยพยัญชนะใด?", "ลิง", "ล", "ว", "ส", "ลิงจ๋อชอบกินกล้วย เจี๊ยกๆ คือ 'ลอ ลิง' ไต่ราว", "monkey"],
      [10, "หมี ขึ้นต้นด้วยพยัญชนะใด?", "หมี", "ห", "ฮ", "อ", "หมีน้อยขนฟู ตัวอ้วนกลม คือ 'หอ หีบ' จ้า", "bear"]
    ];

    initialQuestions.forEach(row => questionSheet.appendRow(row));
    questionSheet.autoResizeColumns(1, headers.length);
  }

  // 2. จัดการชีต Results
  let resultsSheet = ss.getSheetByName("Results");
  if (!resultsSheet) {
    resultsSheet = ss.insertSheet("Results");
  }

  if (resultsSheet.getLastRow() === 0) {
    const headers = [
      "วันเวลา (Timestamp)",
      "ชื่อเล่นนักเรียน (Nickname)",
      "คะแนนที่ได้ (Score)",
      "จำนวนดาว (Stars)",
      "จำนวนครั้งที่ตอบผิด (WrongAttempts)",
      "จำนวนด่านทั้งหมด (TotalStages)",
      "เวลาที่ใช้ (TimeSpentSec)",
      "สถานะการประเมิน (Evaluation)"
    ];
    resultsSheet.appendRow(headers);
    resultsSheet.getRange(1, 1, 1, headers.length)
      .setBackground("#2196F3")
      .setFontColor("#FFFFFF")
      .setFontWeight("bold")
      .setHorizontalAlignment("center");
    resultsSheet.autoResizeColumns(1, headers.length);
  }

  console.log("ตั้งค่าชีต Questions และ Results เรียบร้อยแล้ว");
  return { questionSheet, resultsSheet };
}

/**
 * Web App GET endpoint:
 * รองรับการดึงคำถาม (action=getQuestions) หรือบันทึกผล (action=saveResult)
 */
function doGet(e) {
  setupSheets();

  const action = (e && e.parameter && e.parameter.action) ? e.parameter.action : "getQuestions";

  if (action === "setup") {
    return createJsonResponse({
      status: "success",
      message: "ตั้งค่าชีต Questions และ Results เรียบร้อยแล้ว!"
    });
  }

  if (action === "getQuestions") {
    const questions = fetchQuestionsFromSheet();
    return createJsonResponse({
      status: "success",
      data: questions
    });
  }

  // รองรับการบันทึกผ่าน GET fallback ในกรณีที่เบราว์เซอร์มีข้อจำกัด CORS
  if (action === "saveResult" && e && e.parameter && e.parameter.nickname) {
    const result = savePlayerResult({
      nickname: e.parameter.nickname,
      score: e.parameter.score || 10,
      stars: e.parameter.stars || 10,
      wrongAttempts: e.parameter.wrongAttempts || 0,
      totalStages: e.parameter.totalStages || 10,
      timeSpent: e.parameter.timeSpent || 0,
      evaluation: e.parameter.evaluation || "ยอดเยี่ยม"
    });
    return createJsonResponse(result);
  }

  return createJsonResponse({
    status: "ok",
    message: "API ผจญภัยอาณาจักรพยัญชนะไทย พร้อมใช้งาน",
    spreadsheetName: getSpreadsheet().getName()
  });
}

/**
 * Web App POST endpoint:
 * สำหรับรับข้อมูลผลการเล่นของนักเรียนและบันทึกลงชีต Results
 */
function doPost(e) {
  try {
    setupSheets();
    
    let payload = {};
    if (e && e.postData && e.postData.contents) {
      try {
        payload = JSON.parse(e.postData.contents);
      } catch (err) {
        payload = e.parameter || {};
      }
    } else if (e && e.parameter) {
      payload = e.parameter;
    }

    const result = savePlayerResult(payload);
    return createJsonResponse(result);
  } catch (error) {
    return createJsonResponse({
      status: "error",
      message: error.toString()
    });
  }
}

/**
 * ฟังก์ชันอ่านรายการคำถามจากชีต Questions
 */
function fetchQuestionsFromSheet() {
  const ss = getSpreadsheet();
  const sheet = ss.getSheetByName("Questions");
  if (!sheet) return [];

  const data = sheet.getDataRange().getValues();
  if (data.length <= 1) return [];

  const questions = [];
  for (let i = 1; i < data.length; i++) {
    const row = data[i];
    if (!row[0] && !row[1]) continue;
    questions.push({
      id: Number(row[0]),
      question: String(row[1]),
      targetWord: String(row[2]),
      correctAnswer: String(row[3]),
      distractors: [String(row[4]), String(row[5])],
      hint: String(row[6] || ""),
      imageKey: String(row[7] || "")
    });
  }
  return questions;
}

/**
 * ฟังก์ชันบันทึกผลการเล่นลงชีต Results
 * ปลอดภัยจากการเรียกแบบไม่มีพารามิเตอร์ (Safe default)
 */
function savePlayerResult(data) {
  data = data || {};
  const ss = getSpreadsheet();
  let sheet = ss.getSheetByName("Results");
  if (!sheet) {
    setupSheets();
    sheet = ss.getSheetByName("Results");
  }

  const now = new Date();
  const formattedTime = Utilities.formatDate(now, "Asia/Bangkok", "yyyy-MM-dd HH:mm:ss");

  const nickname = (data.nickname || "ผู้กล้าน้อย").toString().trim();
  const score = Number(data.score) || 0;
  const stars = Number(data.stars) || 0;
  const wrongAttempts = Number(data.wrongAttempts) || 0;
  const totalStages = Number(data.totalStages) || 10;
  const timeSpent = Number(data.timeSpent) || 0;
  const evaluation = (data.evaluation || (wrongAttempts === 0 ? "ยอดเยี่ยม ระดับ 3 ดาวทอง" : "เก่งมาก ผ่านการทดสอบ")).toString();

  sheet.appendRow([
    formattedTime,
    nickname,
    score,
    stars,
    wrongAttempts,
    totalStages,
    timeSpent,
    evaluation
  ]);

  return {
    status: "success",
    message: "บันทึกผลการเล่นสำเร็จ!",
    timestamp: formattedTime,
    nickname: nickname
  };
}

/**
 * ฟังก์ชันช่วยแปลงข้อมูลเป็น JSON Output
 */
function createJsonResponse(data) {
  return ContentService.createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}

/**
 * ฟังก์ชันทดสอบการทำงาน (สำหรับกด Run ใน Apps Script Editor เพื่อทดสอบได้ทันที)
 */
function testRun() {
  console.log("=== เริ่มทดสอบระบบ ===");
  setupSheets();
  const sampleResult = savePlayerResult({
    nickname: "น้องทดสอบ",
    score: 10,
    stars: 10,
    wrongAttempts: 0,
    totalStages: 10,
    timeSpent: 45,
    evaluation: "สมบูรณ์แบบ ตอบถูกรวดเดียวครบ 10 ข้อ!"
  });
  console.log("ผลการทดสอบบันทึกคะแนน:", sampleResult);
  console.log("=== การทดสอบเสร็จสิ้น ตรวจสอบแถวใหม่ในชีต Results ได้ทันที ===");
}
