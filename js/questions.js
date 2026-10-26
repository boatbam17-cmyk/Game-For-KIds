/**
 * ฐานข้อมูลคำถามเริ่มต้นและภาพประกอบเวกเตอร์การ์ตูนสุดน่ารัก
 * ออกแบบพิเศษสำหรับเด็กอนุบาล 3 (5-6 ปี) สีสันสดใส ชัดเจน โหลดไว ไม่ต้องพึ่งพาไฟล์ภายนอก
 */

const DEFAULT_QUESTIONS = [
  {
    id: 1,
    question: "ไก่ อ่านขึ้นต้นด้วยพยัญชนะใด?",
    targetWord: "ไก่",
    correctAnswer: "ก",
    distractors: ["ข", "ค"],
    hint: "ฟังเสียงดูนะจ๊ะ 'กุ๊กๆ ก.ไก่' ตัวเอกของฟาร์มจ้า!",
    imageKey: "chicken",
    svg: `
      <svg viewBox="0 0 200 200" class="game-illustration-svg" role="img" aria-label="ภาพไก่การ์ตูน">
        <defs>
          <linearGradient id="chickenBody" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#FFD54F"/>
            <stop offset="100%" stop-color="#FFA000"/>
          </linearGradient>
          <linearGradient id="combGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#FF5252"/>
            <stop offset="100%" stop-color="#D50000"/>
          </linearGradient>
        </defs>
        <!-- เงาใต้ตัว -->
        <ellipse cx="100" cy="180" rx="65" ry="14" fill="#000000" opacity="0.12"/>
        <!-- หงอนไก่บนหัว -->
        <circle cx="82" cy="42" r="14" fill="url(#combGrad)"/>
        <circle cx="100" cy="34" r="17" fill="url(#combGrad)"/>
        <circle cx="118" cy="42" r="14" fill="url(#combGrad)"/>
        <!-- ขาไก่ -->
        <path d="M85 155 L85 175 M85 175 L75 180 M85 175 L85 182 M85 175 L95 180" stroke="#FF8F00" stroke-width="5" stroke-linecap="round"/>
        <path d="M115 155 L115 175 M115 175 L105 180 M115 175 L115 182 M115 175 L125 180" stroke="#FF8F00" stroke-width="5" stroke-linecap="round"/>
        <!-- ตัวไก่กลมน่ารัก -->
        <ellipse cx="100" cy="115" rx="60" ry="52" fill="url(#chickenBody)"/>
        <!-- ปีกไก่ -->
        <ellipse cx="65" cy="120" rx="22" ry="30" transform="rotate(-15 65 120)" fill="#FFB300"/>
        <!-- หางไก่ -->
        <path d="M150 100 Q175 90 170 120 Q165 135 150 135 Z" fill="#FF8F00"/>
        <!-- ตาไก่โตแป๋วแหวว -->
        <circle cx="82" cy="95" r="10" fill="#FFFFFF"/>
        <circle cx="84" cy="95" r="6" fill="#212121"/>
        <circle cx="86" cy="92" r="2.5" fill="#FFFFFF"/>
        <circle cx="118" cy="95" r="10" fill="#FFFFFF"/>
        <circle cx="116" cy="95" r="6" fill="#212121"/>
        <circle cx="114" cy="92" r="2.5" fill="#FFFFFF"/>
        <!-- แก้มชมพู -->
        <circle cx="68" cy="108" r="8" fill="#FF8A80" opacity="0.6"/>
        <circle cx="132" cy="108" r="8" fill="#FF8A80" opacity="0.6"/>
        <!-- ปากไก่ -->
        <polygon points="100,102 90,114 110,114" fill="#FF6D00"/>
        <!-- เหนียงไก่ -->
        <ellipse cx="100" cy="122" rx="6" ry="9" fill="url(#combGrad)"/>
      </svg>
    `
  },
  {
    id: 2,
    question: "ไข่ ขึ้นต้นด้วยพยัญชนะใด?",
    targetWord: "ไข่",
    correctAnswer: "ข",
    distractors: ["ฃ", "ค"],
    hint: "ไข่กลมๆ ต้มอร่อย เริ่มด้วย 'ข.ไข่' อยู่ในเล้าจ้า",
    imageKey: "egg",
    svg: `
      <svg viewBox="0 0 200 200" class="game-illustration-svg" role="img" aria-label="ภาพไข่การ์ตูน">
        <defs>
          <linearGradient id="eggGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#FFF9C4"/>
            <stop offset="60%" stop-color="#FFE082"/>
            <stop offset="100%" stop-color="#FFCA28"/>
          </linearGradient>
          <linearGradient id="nestGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#8D6E63"/>
            <stop offset="100%" stop-color="#5D4037"/>
          </linearGradient>
        </defs>
        <!-- เงา -->
        <ellipse cx="100" cy="180" rx="70" ry="14" fill="#000000" opacity="0.12"/>
        <!-- รังหญ้าอบอุ่น -->
        <path d="M40 155 Q100 190 160 155 Q130 145 100 148 Q70 145 40 155 Z" fill="url(#nestGrad)"/>
        <!-- เส้นหญ้าฟาง -->
        <path d="M45 160 Q70 145 95 162 M105 162 Q130 146 155 160 M60 168 Q100 155 140 168" stroke="#D7CCC8" stroke-width="4" stroke-linecap="round" fill="none"/>
        <!-- รูปทรงไข่สุดน่ารัก -->
        <path d="M100 35 C65 35 55 90 55 125 C55 160 75 165 100 165 C125 165 145 160 145 125 C145 90 135 35 100 35 Z" fill="url(#eggGrad)"/>
        <!-- แสงสะท้อนประกาย -->
        <ellipse cx="80" cy="65" rx="12" ry="20" transform="rotate(-25 80 65)" fill="#FFFFFF" opacity="0.75"/>
        <circle cx="86" cy="90" r="4" fill="#FFFFFF" opacity="0.6"/>
        <!-- ดวงตาสดใส -->
        <circle cx="86" cy="118" r="7" fill="#3E2723"/>
        <circle cx="88" cy="116" r="2.5" fill="#FFFFFF"/>
        <circle cx="114" cy="118" r="7" fill="#3E2723"/>
        <circle cx="112" cy="116" r="2.5" fill="#FFFFFF"/>
        <!-- รอยยิ้มหวาน -->
        <path d="M94 130 Q100 138 106 130" stroke="#3E2723" stroke-width="3" stroke-linecap="round" fill="none"/>
        <!-- แก้มชมพูระเรื่อ -->
        <circle cx="75" cy="126" r="6" fill="#FF80AB" opacity="0.7"/>
        <circle cx="125" cy="126" r="6" fill="#FF80AB" opacity="0.7"/>
        <!-- ประกายวิ้งวับ -->
        <polygon points="145,55 148,63 156,66 148,69 145,77 142,69 134,66 142,63" fill="#FFF59D"/>
      </svg>
    `
  },
  {
    id: 3,
    question: "งู ขึ้นต้นด้วยพยัญชนะใด?",
    targetWord: "งู",
    correctAnswer: "ง",
    distractors: ["จ", "ฉ"],
    hint: "งูเลื้อยตัวยาว ฟู่ๆ คือ 'ง.งู' ใจกล้าจ้า!",
    imageKey: "snake",
    svg: `
      <svg viewBox="0 0 200 200" class="game-illustration-svg" role="img" aria-label="ภาพงูการ์ตูน">
        <defs>
          <linearGradient id="snakeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#81C784"/>
            <stop offset="100%" stop-color="#388E3C"/>
          </linearGradient>
        </defs>
        <ellipse cx="100" cy="178" rx="65" ry="12" fill="#000000" opacity="0.12"/>
        <!-- ลำตัวงูขดเป็นเกลียวน่ารัก -->
        <path d="M60 160 Q40 140 55 120 Q70 100 95 115 Q120 130 145 120 Q165 110 160 145 Q150 170 100 170 Q75 170 60 160 Z" fill="url(#snakeGrad)"/>
        <!-- ท้องงูสีเหลืองอ่อน -->
        <path d="M65 160 Q85 168 115 165 Q140 160 145 145" stroke="#FFF59D" stroke-width="8" stroke-linecap="round" fill="none"/>
        <!-- ลายจุดบนตัวงู -->
        <circle cx="80" cy="125" r="5" fill="#C8E6C9"/>
        <circle cx="130" cy="125" r="6" fill="#C8E6C9"/>
        <circle cx="150" cy="140" r="5" fill="#C8E6C9"/>
        <!-- หัวงูกลมมน -->
        <circle cx="75" cy="80" r="32" fill="url(#snakeGrad)"/>
        <!-- ลิ้นสองแฉกสีแดง -->
        <path d="M48 85 L32 88 M32 88 L24 82 M32 88 L25 94" stroke="#E53935" stroke-width="3" stroke-linecap="round" fill="none"/>
        <!-- ดวงตาสดใสยิ้มแป๋ว -->
        <circle cx="65" cy="74" r="9" fill="#FFFFFF"/>
        <circle cx="63" cy="74" r="5.5" fill="#1B5E20"/>
        <circle cx="61" cy="71" r="2" fill="#FFFFFF"/>
        <circle cx="88" cy="74" r="9" fill="#FFFFFF"/>
        <circle cx="86" cy="74" r="5.5" fill="#1B5E20"/>
        <circle cx="84" cy="71" r="2" fill="#FFFFFF"/>
        <!-- แก้มชมพู -->
        <circle cx="58" cy="88" r="6" fill="#FF8A80" opacity="0.7"/>
        <circle cx="95" cy="88" r="6" fill="#FF8A80" opacity="0.7"/>
        <!-- รอยยิ้ม -->
        <path d="M68 90 Q75 97 82 90" stroke="#1B5E20" stroke-width="2.5" stroke-linecap="round" fill="none"/>
      </svg>
    `
  },
  {
    id: 4,
    question: "จาน ขึ้นต้นด้วยพยัญชนะใด?",
    targetWord: "จาน",
    correctAnswer: "จ",
    distractors: ["ฉ", "ช"],
    hint: "จานใส่อาหารอร่อยๆ คือ 'จ.จาน' ใช้ดีนะเด็กๆ",
    imageKey: "plate",
    svg: `
      <svg viewBox="0 0 200 200" class="game-illustration-svg" role="img" aria-label="ภาพจานการ์ตูน">
        <defs>
          <linearGradient id="plateRim" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#81D4FA"/>
            <stop offset="100%" stop-color="#0288D1"/>
          </linearGradient>
          <linearGradient id="plateCenter" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#FFFFFF"/>
            <stop offset="100%" stop-color="#E1F5FE"/>
          </linearGradient>
        </defs>
        <ellipse cx="100" cy="180" rx="75" ry="12" fill="#000000" opacity="0.12"/>
        <!-- ช้อนและส้อมประกอบข้างๆ -->
        <!-- ช้อนซ้าย -->
        <g transform="rotate(-20 35 110)">
          <path d="M35 155 L35 95 Q35 70 25 70 Q15 70 15 95 L15 155 Z" fill="#B0BEC5"/>
          <ellipse cx="25" cy="65" rx="14" ry="20" fill="#CFD8DC"/>
        </g>
        <!-- ส้อมขวา -->
        <g transform="rotate(20 165 110)">
          <path d="M165 155 L165 95 L155 95 L155 155 Z" fill="#B0BEC5"/>
          <path d="M153 60 L153 85 M160 60 L160 85 M167 60 L167 85" stroke="#90A4AE" stroke-width="3" stroke-linecap="round"/>
        </g>
        <!-- ขอบจานนอก -->
        <circle cx="100" cy="105" r="68" fill="url(#plateRim)"/>
        <!-- ขอบจานใน -->
        <circle cx="100" cy="105" r="50" fill="url(#plateCenter)"/>
        <!-- ลวดลายดาวเล็กๆ รอบขอบจาน -->
        <circle cx="100" cy="45" r="3" fill="#FFF59D"/>
        <circle cx="150" cy="85" r="3" fill="#FFF59D"/>
        <circle cx="150" cy="125" r="3" fill="#FFF59D"/>
        <circle cx="100" cy="165" r="3" fill="#FFF59D"/>
        <circle cx="50" cy="125" r="3" fill="#FFF59D"/>
        <circle cx="50" cy="85" r="3" fill="#FFF59D"/>
        <!-- หน้าตายิ้มหวานบนจาน -->
        <circle cx="85" cy="100" r="6" fill="#0277BD"/>
        <circle cx="87" cy="98" r="2" fill="#FFFFFF"/>
        <circle cx="115" cy="100" r="6" fill="#0277BD"/>
        <circle cx="113" cy="98" r="2" fill="#FFFFFF"/>
        <!-- แก้มชมพู -->
        <circle cx="75" cy="108" r="6" fill="#FF80AB" opacity="0.6"/>
        <circle cx="125" cy="108" r="6" fill="#FF80AB" opacity="0.6"/>
        <path d="M92 112 Q100 122 108 112" stroke="#0277BD" stroke-width="3" stroke-linecap="round" fill="none"/>
      </svg>
    `
  },
  {
    id: 5,
    question: "ช้าง ขึ้นต้นด้วยพยัญชนะใด?",
    targetWord: "ช้าง",
    correctAnswer: "ช",
    distractors: ["ซ", "ฌ"],
    hint: "ช้างตัวโตงวงยาว แป๋นๆ คือ 'ช.ช้าง' จ้า",
    imageKey: "elephant",
    svg: `
      <svg viewBox="0 0 200 200" class="game-illustration-svg" role="img" aria-label="ภาพช้างการ์ตูน">
        <defs>
          <linearGradient id="eleGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#90CAF9"/>
            <stop offset="100%" stop-color="#42A5F5"/>
          </linearGradient>
        </defs>
        <ellipse cx="100" cy="180" rx="70" ry="12" fill="#000000" opacity="0.12"/>
        <!-- หูใหญ่ด้านหลังซ้าย-ขวา -->
        <circle cx="48" cy="88" r="30" fill="#64B5F6"/>
        <circle cx="48" cy="88" r="18" fill="#F8BBD0"/>
        <circle cx="152" cy="88" r="30" fill="#64B5F6"/>
        <circle cx="152" cy="88" r="18" fill="#F8BBD0"/>
        <!-- ตัวช้างกลมปุ๊ก -->
        <ellipse cx="100" cy="130" rx="55" ry="45" fill="url(#eleGrad)"/>
        <!-- ขาช้าง 2 ข้างหน้า -->
        <rect x="70" y="145" width="22" height="30" rx="10" fill="#1E88E5"/>
        <rect x="108" y="145" width="22" height="30" rx="10" fill="#1E88E5"/>
        <circle cx="76" cy="172" r="3" fill="#FFFFFF"/>
        <circle cx="86" cy="172" r="3" fill="#FFFFFF"/>
        <circle cx="114" cy="172" r="3" fill="#FFFFFF"/>
        <circle cx="124" cy="172" r="3" fill="#FFFFFF"/>
        <!-- หัวช้าง -->
        <circle cx="100" cy="88" r="40" fill="url(#eleGrad)"/>
        <!-- งวงช้างม้วนขึ้นพ่นน้ำชื่นใจ -->
        <path d="M100 100 Q100 135 125 130 Q138 125 130 110" stroke="url(#eleGrad)" stroke-width="15" stroke-linecap="round" fill="none"/>
        <!-- หยดน้ำพ่นจากงวง -->
        <circle cx="138" cy="98" r="4" fill="#00E5FF"/>
        <circle cx="146" cy="88" r="3" fill="#00E5FF"/>
        <circle cx="132" cy="82" r="2.5" fill="#00E5FF"/>
        <!-- งาขาวเล็กๆ -->
        <path d="M92 112 Q85 122 80 120" stroke="#FFFFFF" stroke-width="5" stroke-linecap="round" fill="none"/>
        <!-- ตาแป๋ว -->
        <circle cx="82" cy="78" r="7" fill="#0D47A1"/>
        <circle cx="84" cy="76" r="2.5" fill="#FFFFFF"/>
        <circle cx="118" cy="78" r="7" fill="#0D47A1"/>
        <circle cx="116" cy="76" r="2.5" fill="#FFFFFF"/>
        <!-- แก้มชมพู -->
        <circle cx="70" cy="92" r="7" fill="#FF80AB" opacity="0.7"/>
        <circle cx="130" cy="92" r="7" fill="#FF80AB" opacity="0.7"/>
      </svg>
    `
  },
  {
    id: 6,
    question: "ปลา ขึ้นต้นด้วยพยัญชนะใด?",
    targetWord: "ปลา",
    correctAnswer: "ป",
    distractors: ["ผ", "ฝ"],
    hint: "ปลาว่ายน้ำดุ๊กดิ๊ก คือ 'ป.ปลา' ตากลมจ้า",
    imageKey: "fish",
    svg: `
      <svg viewBox="0 0 200 200" class="game-illustration-svg" role="img" aria-label="ภาพปลาการ์ตูน">
        <defs>
          <linearGradient id="fishGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#FF7043"/>
            <stop offset="100%" stop-color="#F4511E"/>
          </linearGradient>
        </defs>
        <ellipse cx="100" cy="180" rx="60" ry="10" fill="#000000" opacity="0.1"/>
        <!-- ฟองอากาศน้ำปุ๋งๆ -->
        <circle cx="45" cy="55" r="7" fill="#80D8FF" opacity="0.6"/>
        <circle cx="35" cy="40" r="4.5" fill="#80D8FF" opacity="0.7"/>
        <circle cx="50" cy="30" r="3" fill="#80D8FF" opacity="0.8"/>
        <!-- หางปลา -->
        <path d="M140 100 Q180 60 175 100 Q180 140 140 100 Z" fill="#FF5722"/>
        <!-- ครีบบนล่าง -->
        <path d="M95 58 Q115 40 125 60 Z" fill="#FF7043"/>
        <path d="M95 142 Q115 160 125 140 Z" fill="#FF7043"/>
        <!-- ลำตัวปลากลมน่ารัก -->
        <ellipse cx="95" cy="100" rx="55" ry="42" fill="url(#fishGrad)"/>
        <!-- แถบคาดสีขาวสไตล์ปลานีโม -->
        <path d="M85 62 Q95 100 85 138" stroke="#FFFFFF" stroke-width="12" stroke-linecap="round" fill="none"/>
        <path d="M125 72 Q130 100 125 128" stroke="#FFFFFF" stroke-width="8" stroke-linecap="round" fill="none"/>
        <!-- ครีบข้างแก้มดุ๊กดิ๊ก -->
        <ellipse cx="98" cy="112" rx="14" ry="9" transform="rotate(-15 98 112)" fill="#FFA726"/>
        <!-- ตาปลาตากลมโต -->
        <circle cx="62" cy="92" r="11" fill="#FFFFFF"/>
        <circle cx="60" cy="92" r="6.5" fill="#263238"/>
        <circle cx="58" cy="89" r="2.5" fill="#FFFFFF"/>
        <!-- ปากจุ๊บๆ -->
        <ellipse cx="40" cy="104" rx="6" ry="4" fill="#D84315"/>
        <!-- แก้มชมพู -->
        <circle cx="68" cy="108" r="6" fill="#FF8A80" opacity="0.8"/>
      </svg>
    `
  },
  {
    id: 7,
    question: "ม้า ขึ้นต้นด้วยพยัญชนะใด?",
    targetWord: "ม้า",
    correctAnswer: "ม",
    distractors: ["ย", "น"],
    hint: "ม้าวิ่งกุบกับ ฮี้ๆ แสนว่องไว คือ 'ม.ม้า' คึกคักนะจ๊ะ",
    imageKey: "horse",
    svg: `
      <svg viewBox="0 0 200 200" class="game-illustration-svg" role="img" aria-label="ภาพม้าการ์ตูน">
        <defs>
          <linearGradient id="horseGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#BCAAA4"/>
            <stop offset="100%" stop-color="#8D6E63"/>
          </linearGradient>
          <linearGradient id="maneGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#6D4C41"/>
            <stop offset="100%" stop-color="#4E342E"/>
          </linearGradient>
        </defs>
        <ellipse cx="100" cy="180" rx="65" ry="12" fill="#000000" opacity="0.12"/>
        <!-- แผงคอม้าด้านหลัง -->
        <path d="M125 50 Q145 70 135 110 Q145 85 130 65 Z" fill="url(#maneGrad)"/>
        <!-- หูม้าชูชัน 2 ข้าง -->
        <polygon points="85,38 95,20 105,42" fill="url(#horseGrad)"/>
        <polygon points="90,36 96,24 102,39" fill="#FFAB91"/>
        <polygon points="115,44 125,26 132,48" fill="url(#horseGrad)"/>
        <!-- ตัวและคอของม้า -->
        <ellipse cx="100" cy="135" rx="50" ry="38" fill="url(#horseGrad)"/>
        <path d="M85 70 L115 70 L125 125 L75 125 Z" fill="url(#horseGrad)"/>
        <!-- หัวม้า -->
        <ellipse cx="88" cy="70" rx="28" ry="32" transform="rotate(-15 88 70)" fill="url(#horseGrad)"/>
        <!-- จมูกและปากม้า -->
        <ellipse cx="70" cy="85" rx="18" ry="16" fill="#D7CCC8"/>
        <circle cx="64" cy="85" r="3" fill="#5D4037"/>
        <circle cx="74" cy="88" r="3" fill="#5D4037"/>
        <!-- ขาม้าพร้อมเกือกม้า -->
        <rect x="75" y="145" width="14" height="28" rx="6" fill="#795548"/>
        <rect x="75" y="167" width="14" height="6" fill="#3E2723"/>
        <rect x="110" y="145" width="14" height="28" rx="6" fill="#795548"/>
        <rect x="110" y="167" width="14" height="6" fill="#3E2723"/>
        <!-- แผงคอม้าด้านหน้าเท่ๆ -->
        <path d="M98 32 Q108 45 95 55" stroke="url(#maneGrad)" stroke-width="8" stroke-linecap="round" fill="none"/>
        <!-- ตาแป๋วโต -->
        <circle cx="92" cy="62" r="7" fill="#3E2723"/>
        <circle cx="94" cy="60" r="2.5" fill="#FFFFFF"/>
        <!-- แก้มชมพู -->
        <circle cx="85" cy="82" r="6" fill="#FF8A80" opacity="0.7"/>
      </svg>
    `
  },
  {
    id: 8,
    question: "รถ ขึ้นต้นด้วยพยัญชนะใด?",
    targetWord: "รถ",
    correctAnswer: "ร",
    distractors: ["ล", "ว"],
    hint: "รถยนต์สีแดงแล่นฉิว บรื้นๆ เริ่มด้วย 'ร.เรือ' / 'ร' จ้า",
    imageKey: "car",
    svg: `
      <svg viewBox="0 0 200 200" class="game-illustration-svg" role="img" aria-label="ภาพรถการ์ตูน">
        <defs>
          <linearGradient id="carGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#FF5252"/>
            <stop offset="100%" stop-color="#D50000"/>
          </linearGradient>
        </defs>
        <ellipse cx="100" cy="180" rx="75" ry="12" fill="#000000" opacity="0.12"/>
        <!-- ล้อรถ 2 ล้อ -->
        <circle cx="60" cy="155" r="20" fill="#37474F"/>
        <circle cx="60" cy="155" r="10" fill="#CFD8DC"/>
        <circle cx="140" cy="155" r="20" fill="#37474F"/>
        <circle cx="140" cy="155" r="10" fill="#CFD8DC"/>
        <!-- ตัวถังรถยนต์กลมน่ารัก -->
        <path d="M35 145 C35 115 50 115 65 115 L75 80 C80 68 120 68 128 80 L140 115 C160 115 170 120 170 145 C170 152 165 155 155 155 L45 155 C38 155 35 152 35 145 Z" fill="url(#carGrad)"/>
        <!-- หน้าต่างกระจกหน้า-หลัง -->
        <path d="M78 85 L96 85 L96 110 L68 110 Z" fill="#E0F7FA"/>
        <path d="M102 85 L124 85 L134 110 L102 110 Z" fill="#E0F7FA"/>
        <!-- ไฟหน้ารถยิ้มตาโต -->
        <circle cx="42" cy="132" r="8" fill="#FFF59D"/>
        <circle cx="42" cy="132" r="5" fill="#FFEE58"/>
        <!-- หน้ารถยิ้ม -->
        <path d="M48 142 Q58 148 68 142" stroke="#FFFFFF" stroke-width="3" stroke-linecap="round" fill="none"/>
        <!-- ไฟท้าย -->
        <rect x="164" y="128" width="6" height="12" rx="3" fill="#FFB300"/>
        <!-- ควันปุ๋งๆ หลังรถ -->
        <circle cx="180" cy="148" r="6" fill="#B0BEC5" opacity="0.5"/>
        <circle cx="192" cy="142" r="4" fill="#B0BEC5" opacity="0.4"/>
      </svg>
    `
  },
  {
    id: 9,
    question: "ลิง ขึ้นต้นด้วยพยัญชนะใด?",
    targetWord: "ลิง",
    correctAnswer: "ล",
    distractors: ["ว", "ส"],
    hint: "ลิงจ๋อชอบกินกล้วย กระโดดไว คือ 'ล.ลิง' ไต่ราวจ้า",
    imageKey: "monkey",
    svg: `
      <svg viewBox="0 0 200 200" class="game-illustration-svg" role="img" aria-label="ภาพลิงการ์ตูน">
        <defs>
          <linearGradient id="monkBody" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#A1887F"/>
            <stop offset="100%" stop-color="#6D4C41"/>
          </linearGradient>
        </defs>
        <ellipse cx="100" cy="180" rx="65" ry="12" fill="#000000" opacity="0.12"/>
        <!-- หางลิงม้วนกลม -->
        <path d="M135 145 Q175 140 170 105 Q165 85 150 95" stroke="#6D4C41" stroke-width="9" stroke-linecap="round" fill="none"/>
        <!-- หูลิง 2 ข้าง -->
        <circle cx="50" cy="78" r="20" fill="#6D4C41"/>
        <circle cx="50" cy="78" r="12" fill="#FFCCBC"/>
        <circle cx="150" cy="78" r="20" fill="#6D4C41"/>
        <circle cx="150" cy="78" r="12" fill="#FFCCBC"/>
        <!-- ลำตัวลิง -->
        <ellipse cx="100" cy="138" rx="46" ry="38" fill="url(#monkBody)"/>
        <!-- พุงลิงสีครีม -->
        <ellipse cx="100" cy="142" rx="30" ry="24" fill="#FFECB3"/>
        <!-- กล้วยหอมในมือลิง -->
        <path d="M125 145 Q145 130 148 115 Q142 125 125 135 Z" fill="#FFEB3B"/>
        <path d="M148 115 L151 112" stroke="#8D6E63" stroke-width="3" stroke-linecap="round"/>
        <!-- หัวลิง -->
        <circle cx="100" cy="80" r="38" fill="url(#monkBody)"/>
        <!-- โครงหน้าลิงสีเนื้อรูปหัวใจ -->
        <path d="M100 68 C80 50 65 65 65 85 C65 105 85 110 100 110 C115 110 135 105 135 85 C135 65 120 50 100 68 Z" fill="#FFE0B2"/>
        <!-- ตาแป๋วแวววาว -->
        <circle cx="85" cy="80" r="6" fill="#3E2723"/>
        <circle cx="87" cy="78" r="2" fill="#FFFFFF"/>
        <circle cx="115" cy="80" r="6" fill="#3E2723"/>
        <circle cx="113" cy="78" r="2" fill="#FFFFFF"/>
        <!-- จมูกและปากยิ้มกว้าง -->
        <ellipse cx="100" cy="92" rx="4" ry="2.5" fill="#5D4037"/>
        <path d="M92 98 Q100 106 108 98" stroke="#5D4037" stroke-width="3" stroke-linecap="round" fill="none"/>
        <!-- แก้มชมพู -->
        <circle cx="74" cy="94" r="6" fill="#FF8A80" opacity="0.7"/>
        <circle cx="126" cy="94" r="6" fill="#FF8A80" opacity="0.7"/>
      </svg>
    `
  },
  {
    id: 10,
    question: "หมี ขึ้นต้นด้วยพยัญชนะใด?",
    targetWord: "หมี",
    correctAnswer: "ห",
    distractors: ["ฮ", "อ"],
    hint: "หมีน้อยขนฟู ตัวอ้วนกลม คือ 'ห.หีบ' หรือ 'ห' จ้า",
    imageKey: "bear",
    svg: `
      <svg viewBox="0 0 200 200" class="game-illustration-svg" role="img" aria-label="ภาพหมีตัวอ้วนกลมการ์ตูน">
        <defs>
          <linearGradient id="bearGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#8D6E63"/>
            <stop offset="100%" stop-color="#5D4037"/>
          </linearGradient>
        </defs>
        <ellipse cx="100" cy="180" rx="68" ry="12" fill="#000000" opacity="0.12"/>
        <!-- หูหมีกลมน่ารัก 2 ข้าง -->
        <circle cx="62" cy="48" r="18" fill="url(#bearGrad)"/>
        <circle cx="62" cy="48" r="10" fill="#D7CCC8"/>
        <circle cx="138" cy="48" r="18" fill="url(#bearGrad)"/>
        <circle cx="138" cy="48" r="10" fill="#D7CCC8"/>
        <!-- ลำตัวหมีอ้วนกลม -->
        <ellipse cx="100" cy="135" rx="55" ry="46" fill="url(#bearGrad)"/>
        <!-- พุงหมี -->
        <ellipse cx="100" cy="142" rx="38" ry="30" fill="#BCAAA4"/>
        <!-- อุ้งเท้าหมี -->
        <ellipse cx="68" cy="165" rx="14" ry="10" fill="#4E342E"/>
        <ellipse cx="132" cy="165" rx="14" ry="10" fill="#4E342E"/>
        <!-- หัวหมี -->
        <circle cx="100" cy="80" r="42" fill="url(#bearGrad)"/>
        <!-- สันจมูกและปากสีครีม -->
        <ellipse cx="100" cy="92" rx="20" ry="16" fill="#D7CCC8"/>
        <ellipse cx="100" cy="85" rx="7" ry="5" fill="#3E2723"/>
        <path d="M94 95 Q100 102 106 95" stroke="#3E2723" stroke-width="3" stroke-linecap="round" fill="none"/>
        <!-- ตาหมีแป๋วใจดี -->
        <circle cx="82" cy="74" r="6" fill="#212121"/>
        <circle cx="84" cy="72" r="2" fill="#FFFFFF"/>
        <circle cx="118" cy="74" r="6" fill="#212121"/>
        <circle cx="116" cy="72" r="2" fill="#FFFFFF"/>
        <!-- แก้มชมพู -->
        <circle cx="70" cy="90" r="6" fill="#FF8A80" opacity="0.7"/>
        <circle cx="130" cy="90" r="6" fill="#FF8A80" opacity="0.7"/>
      </svg>
    `
  }
];

// ชุดคำชมตอบถูกแบบสุ่มสำหรับเด็กอนุบาล
const PRAISE_MESSAGES = [
  "เก่งมากเลยคนดี! ⭐",
  "ถูกต้องนะคร้าบ! ยอดเยี่ยมมาก 🎉",
  "สุดยอดไปเลย! รับดาวเพิ่ม 1 ดวง 🌟",
  "เก่งที่สุดในโลกเลย! ลุยต่อเลย 🚀",
  "ยอดเยี่ยมนักผจญภัยน้อย! 👏",
  "ตอบถูกเป๊ะเลย! น่ารักที่สุดเลย ✨"
];

// สุ่มลำดับอาเรย์ (Fisher-Yates Shuffle)
function shuffleArray(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}
