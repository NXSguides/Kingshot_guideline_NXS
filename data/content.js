/* =========================================================================
   Kingshot 攻略內容 / Guide content
   -------------------------------------------------------------------------
   新增語言：
     1. 在 LANGS 加 { code, label, htmlLang }
     2. 在 UI 物件補該語言字串
     3. 每個 guide 的 name / sections / leaders notes 補翻譯
        （還沒翻的語言就先不要加 key，網站會顯示「尚未加入」）

   遊戲用語：一律放在 GLOSSARY（照對照表），內文用 {id} 引用。
   ========================================================================= */

const LANGS = [
  { code: "en", label: "English", htmlLang: "en" },
  { code: "zh", label: "中文", htmlLang: "zh-Hant" },
  { code: "ko", label: "한국어", htmlLang: "ko" },
  { code: "de", label: "Deutsch", htmlLang: "de" },
  { code: "fr", label: "Français", htmlLang: "fr" },
  { code: "tr", label: "Türkçe", htmlLang: "tr" },
  { code: "id", label: "Bahasa Indonesia", htmlLang: "id" },
  { code: "ru", label: "Русский", htmlLang: "ru" },
  { code: "th", label: "ภาษาไทย", htmlLang: "th" },
  { code: "ar", label: "العربية", htmlLang: "ar", dir: "rtl" }
];

const UI = {
  siteTitle: {
    zh: "NXS Guidelines",
    en: "NXS Guidelines",
    ko: "NXS Guidelines",
    de: "NXS Guidelines"
  },
  footerNote: {
    zh: "各語言由聯盟成員協助翻譯，持續更新中。",
    en: "Translated by alliance volunteers. Still growing.",
    ko: "연맹원들이 번역해주고 있어요.",
    de: "Übersetzt von Allianzmitgliedern."
  },
  missingLang: {
    zh: "版本尚未加入，歡迎稍後再回來看看。",
    en: "version not added yet — check back soon.",
    ko: "버전이 아직 없어요.",
    de: "Version noch nicht vorhanden."
  },
  tags: {
    best: { zh: "最佳", en: "BEST", ko: "주요", de: "BESTE" },
    alt: { zh: "替代", en: "ALT", ko: "대체", de: "ALT" },
    f2p: { zh: "免費", en: "F2P", ko: "무과금", de: "F2P" }
  },
  roles: {
    lethality: { zh: "致命主將", en: "Lead for Lethality", ko: "치명 리드", de: "Lead für Letalität" },
    attack: { zh: "攻擊主將", en: "Lead for Attack", ko: "공격 리드", de: "Lead für Angriff" }
  }
};

/* 新增語言的介面字串 */
Object.assign(UI.siteTitle, { fr: "Guide d'alliance" });
Object.assign(UI.footerNote, { fr: "Traduit par des membres de l'alliance. En cours d'enrichissement." });
Object.assign(UI.missingLang, { fr: "version pas encore disponible — revenez bientôt." });
Object.assign(UI.tags.best, { fr: "MEILLEUR" });
Object.assign(UI.tags.alt, { fr: "ALT." });
Object.assign(UI.tags.f2p, { fr: "F2P" });
Object.assign(UI.roles.lethality, { fr: "Chef pour la létalité" });
Object.assign(UI.roles.attack, { fr: "Chef pour l'attaque" });
Object.assign(UI.siteTitle, { tr: "İttifak Rehberi" });
Object.assign(UI.footerNote, { tr: "İttifak üyeleri tarafından çevrildi. Gelişmeye devam ediyor." });
Object.assign(UI.missingLang, { tr: "sürümü henüz eklenmedi — yakında tekrar bakın." });
Object.assign(UI.tags.best, { tr: "EN İYİ" });
Object.assign(UI.tags.alt, { tr: "ALT." });
Object.assign(UI.tags.f2p, { tr: "F2P" });
Object.assign(UI.roles.lethality, { tr: "Öldürücülük için lider" });
Object.assign(UI.roles.attack, { tr: "Saldırı için lider" });
Object.assign(UI.siteTitle, { id: "Panduan Aliansi" });
Object.assign(UI.footerNote, { id: "Diterjemahkan oleh anggota aliansi. Terus berkembang." });
Object.assign(UI.missingLang, { id: "versi belum ditambahkan — cek lagi nanti." });
Object.assign(UI.tags.best, { id: "TERBAIK" });
Object.assign(UI.tags.alt, { id: "ALT" });
Object.assign(UI.tags.f2p, { id: "F2P" });
Object.assign(UI.roles.lethality, { id: "Lead untuk Lethality" });
Object.assign(UI.roles.attack, { id: "Lead untuk Serangan" });
Object.assign(UI.siteTitle, { ru: "Путеводитель альянса" });
Object.assign(UI.footerNote, { ru: "Переведено участниками альянса. Продолжает пополняться." });
Object.assign(UI.missingLang, { ru: "версия пока не добавлена — загляните позже." });
Object.assign(UI.tags.best, { ru: "ЛУЧШИЙ" });
Object.assign(UI.tags.alt, { ru: "АЛЬТ." });
Object.assign(UI.tags.f2p, { ru: "F2P" });
Object.assign(UI.roles.lethality, { ru: "Лидер по смертоносности" });
Object.assign(UI.roles.attack, { ru: "Лидер по атаке" });
Object.assign(UI.siteTitle, { th: "คู่มือพันธมิตร" });
Object.assign(UI.footerNote, { th: "แปลโดยสมาชิกพันธมิตร และยังคงเพิ่มเติมอย่างต่อเนื่อง" });
Object.assign(UI.missingLang, { th: "ยังไม่มีเวอร์ชันนี้ — โปรดกลับมาดูใหม่เร็ว ๆ นี้" });
Object.assign(UI.tags.best, { th: "ดีที่สุด" });
Object.assign(UI.tags.alt, { th: "ทางเลือก" });
Object.assign(UI.tags.f2p, { th: "F2P" });
Object.assign(UI.roles.lethality, { th: "ตัวนำสายสังหาร" });
Object.assign(UI.roles.attack, { th: "ตัวนำสายโจมตี" });
Object.assign(UI.siteTitle, { ar: "دليل التحالف" });
Object.assign(UI.footerNote, { ar: "ترجمة أعضاء التحالف، ويتم تحديثها باستمرار." });
Object.assign(UI.missingLang, { ar: "هذه النسخة لم تُضف بعد — عد قريبًا." });
Object.assign(UI.tags.best, { ar: "الأفضل" });
Object.assign(UI.tags.alt, { ar: "بديل" });
Object.assign(UI.tags.f2p, { ar: "F2P" });
Object.assign(UI.roles.lethality, { ar: "قائد للفتك" });
Object.assign(UI.roles.attack, { ar: "قائد للهجوم" });

/* 英雄顯示名：編組只存英文 id，畫面依語言換成譯名
   （已依對照表修正：Jabel 中/韓、Yeonwoo 中、Marlin 韓）
   Petra、Rosa 不在對照表，保留原寫法，待核對 */
const HEROES = {
  Amadeus: { zh: "阿瑪迪斯", en: "Amadeus", ko: "아마데우스", de: "Amadeus" },
  Jabel: { zh: "潔貝爾", en: "Jabel", ko: "제이벨", de: "Jabel" },
  Quinn: { zh: "奎恩", en: "Quinn", ko: "퀸", de: "Quinn" },
  Helga: { zh: "赫爾加", en: "Helga", ko: "헬가", de: "Helga" },
  Howard: { zh: "霍華德", en: "Howard", ko: "하워드", de: "Howard" },
  Hilde: { zh: "希爾德", en: "Hilde", ko: "힐데", de: "Hilde" },
  Marlin: { zh: "馬林", en: "Marlin", ko: "마린", de: "Marlin" },
  Zoe: { zh: "佐伊", en: "Zoe", ko: "조이", de: "Zoe" },
  Petra: { zh: "佩特拉", en: "Petra", ko: "페트라", de: "Petra" },
  Rosa: { zh: "羅莎", en: "Rosa", ko: "로사", de: "Rosa" },
  Chenko: { zh: "琴科", en: "Chenko", ko: "첸코", de: "Chenko" },
  Yeonwoo: { zh: "妍羽", en: "Yeonwoo", ko: "연우", de: "Yeonwoo" },
  Amane: { zh: "雨音", en: "Amane", ko: "아마네", de: "Amane" }
};

HEROES.Zoe.fr = "Zoé"; /* 對照表法文 */

/* 遊戲用語：一律照對照表。內文用 {id} 引用 */
const GLOSSARY = {
  /* 城鎮增益畫面確認的用語（反偵察、部隊＝Squad 等） */
  counterRecon: { zh:"反偵察", en:"Counter-recon", de:"Gegenaufklärung", ko:"정찰 방지", fr:"Anti-repérage", ar:"الاستطلاع المضاد", id:"Kontra-pengintaian", th:"หน่วยป้องกันพิเศษ", ru:"Контрразведка", tr:"Gözetleme Önleyen" },
  squad: { zh:"部隊", en:"Squad", de:"Schwadron", ko:"부대", fr:"Escouade", ar:"الفرقة", id:"Skuad", th:"ทีม", ru:"Войска", tr:"Ekip" },
  shield: { zh:"防護罩", en:"Shield", de:"Schild", ko:"보호막", fr:"Bouclier", ar:"درع", id:"Perisai", th:"โล่", ru:"Щит", tr:"Kalkan" },
  lethality: { zh:"殺傷力", en:"Lethality", de:"Tödlichkeit", ko:"파괴력", fr:"Létalité", ar:"قوة فتك", id:"Lethality", th:"ความแรงพลัง", ru:"Смертоносность", tr:"Öldürücülük" },
  health: { zh:"生命值", en:"Health", de:"Gesundheit", ko:"HP", fr:"Santé", ar:"صحة", id:"Health", th:"พลังชีวิต", ru:"Здоровье", tr:"Sağlık" },
  /* 遊戲截圖確認的用語（背包、熊獵畫面） */
  rally: { zh:"集結", en:"Rally", de:"Rally", ko:"집결", fr:"Ralliement", ar:"الحشد", id:"Reli", th:"ทีมระดมพล", ru:"Рейд", tr:"Seferberlik" },
  teleporterAdv: { zh:"高級遷城", en:"Advanced Teleporter", de:"Fortgeschrittene Umsiedlung", ko:"고급 도시 이전", fr:"Relocalisation Avancée", ar:"ناقل متقدم", id:"Teleporter Lanjutan", th:"การย้ายถิ่นฐานขั้นสูง", ru:"Продвинутый телепорт", tr:"Gelişmiş Işınlayıcı" },
  marching: { zh:"行軍", en:"Marching", de:"Marschieren", ko:"행군", fr:"Marche", ar:"زحف", id:"Barisan", th:"เดินทัพ", ru:"Марш", tr:"İntikal" },
  gathering: { zh:"採集", en:"Gathering", de:"Sammeln", ko:"채집", fr:"Collecte", ar:"الجمع", id:"Mengumpulkan", th:"การเก็บทรัพยากร", ru:"Сбор", tr:"Toplanıyor" },
  /* 俄文格變化形（僅俄文使用）：由對照表的原形依語法變格，句中需要時引用 */
  allianceRelicG: { ru:"очков реликвий альянса" },
  swordshrineG: { ru:"Святилища меча" },
  reformationG: { ru:"Зала искупления" },
  sanctumPl: { ru:"святилища" },
  abbeyPl: { ru:"Монастыри" },
  abbeyG: { ru:"монастырей" },
  swordlandP: { ru:"Стране мечей" },
  swordland: { zh:"聖劍戰場", en:"Swordland", de:"Schwertland", ko:"성검 전장", fr:"Terres du Glaive", ar:"أرض السيوف", id:"Swordland", th:"ดินแดนดาบ", ru:"Страна мечей", tr:"Kılıçdiyarı" },
  swordshrine: { zh:"聖劍祭壇", en:"Swordshrine", de:"Schwertschrein", ko:"성검 제단", fr:"Tombeau du Glaive", ar:"ضريح السيوف", id:"Swordshrine", th:"วิหารดาบ", ru:"Святилище меча", tr:"Kılıç Altarı" },
  mercenary: { zh:"傭兵駐地", en:"Mercenary Camp", de:"Söldnerlager", ko:"용병 주둔지", fr:"Camp de Mercenaires", ar:"معسكر المرتزقة", id:"Kamp Tentara Bayaran", th:"ค่ายทหารรับจ้าง", ru:"Лагерь наемников", tr:"Paralı Asker Kampı" },
  reformation: { zh:"教化大廳", en:"Hall of Reformation", de:"Reformationshalle", ko:"교화의 홀", fr:"Salle des Réformes", ar:"قاعة الإصلاح", id:"Aula Reformasi", th:"หอปฏิรูป", ru:"Зал искупления", tr:"Devrim Salonu" },
  sanctum: { zh:"聖所", en:"Sanctum", de:"Heiligtum", ko:"성소", fr:"Sanctuaire", ar:"مزار", id:"Sanctum", th:"วิหารศักดิ์สิทธิ์", ru:"Святилище", tr:"Tapınak" },
  sanctumNW: { zh:"西北聖所", en:"Northwest Sanctum", de:"Nordwestliches Heiligtum", ko:"북서 성소", fr:"Sanctuaire Nord-Ouest", ar:"مزار الشمالي الغربي", id:"Sanctum Barat Laut", th:"วิหารศักดิ์สิทธิ์ตะวันตกเฉียงเหนือ", ru:"Северо-западное святилище", tr:"Kuzeybatı Tapınağı" },
  sanctumSE: { zh:"東南聖所", en:"Southeast Sanctum", de:"Südwestliches Heiligtum" /* 遊戲德文版本身的錯誤，照截圖 */, ko:"남동 성소", fr:"Sanctuaire Sud-Est", ar:"مزار الجنوبي الشرقي", id:"Sanctum Tenggara", th:"วิหารศักดิ์สิทธิ์ตะวันออกเฉียงใต้", ru:"Юго-восточное святилище", tr:"Güneydoğu Tapınağı" },
  abbey: { zh:"修道院", en:"Abbey", de:"Abtei", ko:"수도원", fr:"Abbaye", ar:"دير", id:"Biara", th:"อาราม", ru:"Монастырь", tr:"Manastır" },
  belltower: { zh:"鐘塔", en:"Belltower", de:"Glockenturm", ko:"시계탑", fr:"Clocher", ar:"برج الجرس", id:"Menara Lonceng", th:"หอระฆัง", ru:"Колокольня", tr:"Çan Kulesi" },
  stables: { zh:"馬廄", en:"Royal Stables", de:"Königliche Ställe", ko:"마구간", fr:"Écuries Royales", ar:"الاسطبلات الملكية", id:"Kandang Kuda Kerajaan", th:"คอกม้าหลวง", ru:"Королевский конный двор", tr:"Kraliyet Ahırları" },
  undercellar: { zh:"隱蔽地窖", en:"Undercellar", de:"Untergewölbe", ko:"땅굴", fr:"Caves", ar:"الأقبية السفلية", id:"Undercellar", th:"ห้องใต้ดินลับ", ru:"подземелья", tr:"Gizli Mahzenler" },
  arsenal: { zh:"輜重", en:"Arsenal Supplies", de:"Frachtzugvorräte", ko:"군수 물자", fr:"Provisions de Train de bagages", ar:"إمدادات أمتعة القطار", id:"Suplai Kereta Bagasi", th:"เสบียงขบวนสัมภาระ", ru:"военные запасы", tr:"Bagaj Treni Malzemeleri" },
  allianceRelic: { zh:"聯盟聖契積分", en:"Alliance Relic Points", de:"Allianz-Reliktpunkte", ko:"연맹 성스러운 계약 포인트", fr:"Points de Relique d'Alliance", ar:"نقاط الآثار للتحالف", id:"Poin Relik Aliansi", th:"คะแนนวัตถุโบราณพันธมิตร", ru:"Очки реликвий альянса", tr:"İttifak Yadigâr Puanı" },
  personalRelic: { zh:"個人聖契積分", en:"Personal Relic Points", de:"Persönliche Reliktpunkte", ko:"개인 성스러운 계약 포인트", fr:"Points de Relique Individuels", ar:"نقاط الآثار الشخصية", id:"Poin Relik Pribadi", th:"คะแนนวัตถุโบราณส่วนบุคคล", ru:"Личные очки реликвий", tr:"Kişisel Yadigâr Puanı" }
};

const GUIDES = {
  "bear-hunt": {
    emoji: "🐻",
    name: { zh: "狩獵巨熊", en: "Bear Hunt", ko: "곰사냥", de: "Bärenjagd" },
    sections: {
      zh: {
        title: "狩獵巨熊",
        when_label: "時間",
        when: "每 2 天，依聯盟排定的時間進行。",
        why_label: "重要性",
        why: "英雄裝備材料（鍛造錘）與強化經驗部件的主要來源。",
        prep_label: "準備事項",
        prep: [
          "每次熊窩狩獵前更新部隊編組。",
          { callout: true, text: "可選擇：使用 <a href=\"https://frakinator.streamlit.app\" target=\"_blank\" rel=\"noopener\">frakinator.streamlit.app</a> 測試士兵比例，找出最強部隊編組。" },
          "活動開始前記得召回採集中的部隊。",
          "切記：在最後 5–7 分鐘，所有人都應發起集結。這樣能讓部隊返回的玩家有更多集結位可加入，進行最後的傷害衝刺。"
        ],
        leaders_label: "集結指揮",
        joiners_label: "集結參與者",
        joiners_ratio: "標準／安全比例：10% 步兵、10% 騎兵、80% 弓兵（也可用 20-30-50 等變化版本）"
      },
      en: {
        title: "Bear Hunt",
        when_label: "WHEN",
        when: "Every 2 days at your Alliance's scheduled time.",
        why_label: "WHY IT MATTERS",
        why: "Major source of Hero Gear materials (Forge Hammers), Enhancement XP.",
        prep_label: "PREP",
        prep: [
          "Update your formations before every Bear Hunt.",
          { callout: true, text: "Optional: use <a href=\"https://frakinator.streamlit.app/\" target=\"_blank\" rel=\"noopener\">frakinator.streamlit.app</a> to test troop ratios and find your strongest formation." },
          "Recall gathering troops before the event starts.",
          "Remember: In the final 5–7 minutes, everyone should launch a rally. This creates more spots for players whose troops are returning, allowing for a final damage push."
        ],
        leaders_label: "RALLY LEADERS",
        joiners_label: "RALLY JOINERS",
        joiners_ratio: "Standard / Safe Ratio: 10% Infantry, 10% Cavalry, and 80% Archers (or a variation like 20-30-50)"
      },
      ko: {
        title: "곰사냥",
        when_label: "일시",
        when: "연맹에 지정된 시간에 2일마다 진행됩니다.",
        why_label: "중요성",
        why: "영웅 장비 재료(대장간 망치) 및 강화 경험치의 주요 획득처입니다.",
        prep_label: "준비 사항",
        prep: [
          "매번 곰사냥 시작 전에 부대 진형을 업데이트하세요.",
          { callout: true, text: "선택 사항: <a href=\"https://frakinator.streamlit.app/\" target=\"_blank\" rel=\"noopener\">frakinator.streamlit.app</a>를 사용하여 병사 비율을 테스트하고 가장 강력한 진형을 찾아보세요." },
          "이벤트가 시작되기 전에 채집 중인 부대를 회수하세요.",
          "기억하세요: 마지막 5~7분 동안에는 모든 플레이어가 집결을 열어야 합니다. 이렇게 하면 병력이 복귀하는 플레이어들을 위한 자리가 더 많이 생겨 마지막 데미지 몰아치기가 가능해집니다."
        ],
        leaders_label: "집결 영웅 세대별 조합",
        joiners_label: "집결 참여 영웅",
        joiners_ratio: "표준 / 안전 비율: 보병 10%, 기병 10%, 궁병 80% (또는 20-30-50과 같은 변형 비율)"
      },
      de: {
        title: "Bärenjagd",
        when_label: "WANN",
        when: "Alle 2 Tage zur geplanten Zeit eurer Allianz.",
        why_label: "WARUM ES ZÄHLT",
        why: "Hauptquelle für Heldenausrüstungs-Material (Schmiedehammer) und Aufwertungserfahrung.",
        prep_label: "VORBEREITUNG",
        prep: [
          "Aktualisiert eure Formationen vor jeder Bärenjagd.",
          { callout: true, text: "Optional: Mit <a href=\"https://frakinator.streamlit.app\" target=\"_blank\" rel=\"noopener\">frakinator.streamlit.app</a> Truppenverhältnisse testen und die stärkste Formation finden." },
          "Ruft sammelnde Truppen vor Eventbeginn zurück.",
          "In den letzten 5–7 Minuten sollte jeder einen Rally starten. So entstehen mehr Plätze für Spieler, deren Truppen zurückkehren — für den finalen Schadensschub."
        ],
        leaders_label: "RALLY-ANFÜHRER",
        joiners_label: "RALLY-TEILNEHMER",
        joiners_ratio: "Standard / sicheres Verhältnis: 10% Infanterie, 10% Kavallerie, und 80% Bogenschützen (oder Varianten wie 20-30-50)"
      }
    },
    joiners: [
      { hero: "Chenko", role: "lethality" },
      { hero: "Yeonwoo", role: "lethality" },
      { hero: "Amane", role: "attack" },
      { hero: "Amadeus", role: "lethality" }
    ],
    leaders: [
      {
        gen: { zh: "第 1 代", en: "GEN 1", ko: "1세대", de: "GEN 1" },
        rows: [
          {
            tag: "best",
            heroes: ["Amadeus", "Jabel", "Quinn"],
            ratio: "30-30-40",
            note: {
              zh: "多數情況步兵最強，因阿瑪迪斯數值高；弓兵稍多的平均編組效果最好。",
              en: "Troop formation: 30-30-40%. In most cases you will have best stats on infantry due to Amadeus's raw stats, so an ultra-equal formation with slightly more archer troops works best.",
              ko: "아마데우스는 기본적으로 훌륭한 보병 및 기병 능력치를 갖추고 있어, 궁병 중심의 진형에서 가장 뛰어난 효율을 발휘합니다.",
              de: "Infanterie ist hier oft am stärksten, weil Amadeus stark ist; eine etwa gleiche Aufteilung mit etwas mehr Bogenschützen funktioniert am besten."
            }
          },
          {
            tag: "alt",
            heroes: ["Helga", "Jabel", "Quinn"],
            ratio: "20-40-40",
            note: {
              zh: "適合尚未抽到阿瑪迪斯的玩家，同時讓阿瑪迪斯保留給集結。",
              en: "Troop formation: 20-40-40%. Mainly for people that didn't go for Amadeus yet, and keeps the opportunity to use Amadeus for joining rallies.",
              ko: "과금 유저에게도 훌륭한 선택이지만, 헬가의 궁병 관련 능력치는 다소 부족합니다. 레벨이 낮은 아마데우스는 집결 참여 영웅으로 활용하세요.",
              de: "Für Spieler ohne Amadeus — so bleibt Amadeus frei, um fremde Rallys zu joinen."
            }
          },
          {
            tag: "f2p",
            heroes: ["Howard", "Jabel", "Quinn"],
            ratio: "30-30-40",
            note: {
              zh: "免費玩家建議永遠用手上最強的三位英雄擔任指揮。",
              en: "Troop formation: 30-30-40%. For F2P it is recommended to always use the 3 heroes you have for hosting a rally.",
              ko: "무과금 유저에게 권장되는 집결장 영웅 조합입니다. 집결 공격 시, 항상 가장 강력한 세 영웅 조합을 사용하는 것이 좋습니다.",
              de: "F2P-Spieler sollten immer ihre drei stärksten verfügbaren Helden als Anführer nehmen."
            }
          }
        ]
      },
      {
        gen: { zh: "第 2 代", en: "GEN 2", ko: "2세대", de: "GEN 2" },
        rows: [
          {
            tag: "best",
            heroes: ["Amadeus", "Hilde", "Marlin"],
            ratio: "20-30-50",
            note: {
              zh: "馬林能大幅提升傷害，因為擁有集結專屬裝備（致命加成）；步兵固定用阿瑪迪斯或赫爾加。",
              en: "Troop formation: 20-30-50%. Marlin will boost damage a lot due to his widget. From Gen 2 up, infantry will always be Amadeus or Helga — they are the only infantry heroes with rally widgets (lethality bonus). You send fewer infantry, so the infantry hero covers archer damage via the widget rather than matching infantry stats.",
              ko: "말린은 집결 전용 치명 장비로 피해를 크게 올립니다. 보병은 아마데우스 또는 헬가.",
              de: "Marlin steigert den Schaden durch seine Rally-exklusive Letalitätsausrüstung; Infanterie bleibt Amadeus oder Helga."
            }
          },
          {
            tag: "alt",
            heroes: ["Helga", "Jabel", "Marlin"],
            ratio: "20-30-50",
            note: {
              zh: "若馬林不夠強可換成奎恩；赫爾加只在阿瑪迪斯未滿裝時使用。",
              en: "Troop formation: 20-30-50%. Other alternative is swapping Quinn for Marlin if he isn't better yet. Use Helga in Gen 2+ only if Amadeus isn't 5-star + max widget level; also an opportunity to use Amadeus for joining rallies.",
              ko: "말린이 약하면 퀸으로 바꾸세요. 헬가는 아마데우스 장비가 덜 갖춰졌을 때만.",
              de: "Quinn statt Marlin, wenn Marlin noch nicht stark genug ist; Helga nur, wenn Amadeus noch nicht voll ausgerüstet ist."
            }
          },
          {
            tag: "f2p",
            heroes: ["Zoe", "Jabel", "Quinn"],
            ratio: "30-30-40",
            note: {
              zh: "目前免費玩家仍無擁有集結裝備的弓兵，弓兵屬性最弱。",
              en: "Troop formation: 30-30-40%. Still no F2P hero with a rally widget, so again an even formation with slightly more archers, as archer stats will be lowest due to not having an SSR archer hero.",
              ko: "아직 집결 장비가 있는 무과금 궁병이 없어 궁병 스탯이 가장 약합니다.",
              de: "Noch kein F2P-Bogenschützenheld mit Rally-Ausrüstung, daher bleiben Bogenschützen der schwächste Stat."
            }
          }
        ]
      },
      {
        gen: { zh: "第 3 代", en: "GEN 3", ko: "3세대", de: "GEN 3" },
        rows: [
          {
            tag: "best",
            heroes: ["Helga", "Petra", "Marlin"],
            ratio: "10-20-70",
            note: {
              zh: "滿等赫爾加（2 致命＋1 攻擊）表現優於阿瑪迪斯（1 致命＋2 攻擊）。",
              en: "Troop formation: 10-20-70%. Maxed-out Helga performs better than Amadeus in Gen 3, due to having 2 lethality widgets and 1 attack widget compared to 1 lethality widget and 2 attack widgets in this setup.",
              ko: "풀 장비 헬가(치명 2 + 공격 1)가 아마데우스(치명 1 + 공격 2)보다 강합니다.",
              de: "Voll ausgerüstete Helga (2 Letalität + 1 Angriff) übertrifft hier Amadeus (1 Letalität + 2 Angriff)."
            }
          },
          {
            tag: "alt",
            heroes: ["Amadeus", "Petra", "Marlin"],
            ratio: "20-30-50",
            note: {
              zh: "若赫爾加尚未練滿，改用阿瑪迪斯較好。",
              en: "Troop formation: 20-30-50%. If you don't have maxed-out Helga (5-star + widget) it is better to use Amadeus.",
              ko: "헬가가 아직 덜 갖춰졌으면 아마데우스를 쓰세요.",
              de: "Amadeus nehmen, wenn Helga noch nicht voll ausgerüstet ist."
            }
          },
          {
            tag: "f2p",
            heroes: ["Zoe", "Petra", "Quinn"],
            ratio: "20-40-40",
            note: {
              zh: "終於拿到第一位集結裝備英雄（Petra），弓兵屬性仍最低；滿級騎兵能發揮很好。",
              en: "Troop formation: 20-40-40%. In Gen 3, F2P get their first hero with a rally widget (Petra). Try even archer/cav numbers because Petra improves archer troops a lot. Archer stats are still lowest without an SSR archer. If you unlock T10 cavalry, the T10 skill pairs well with Petra's stats.",
              ko: "첫 무과금 집결 장비 영웅(페트라)이 나옵니다. 궁병은 여전히 약하지만, 만렙 기병이 페트라와 잘 맞습니다.",
              de: "Erster F2P-Held mit Rally-Ausrüstung (Petra); Bogenschützen bleiben am schwächsten, maxed Kavallerie passt aber gut zu Petra."
            }
          }
        ]
      },
      {
        gen: { zh: "第 4 代", en: "GEN 4", ko: "4세대", de: "GEN 4" },
        rows: [
          {
            tag: "best",
            heroes: ["Amadeus", "Petra", "Rosa"],
            ratio: "10-10-80",
            note: {
              zh: "盡量拉高弓兵數量，滿級弓兵尤佳；Rosa 三技能可能提升弓兵總攻擊 30%。",
              en: "Troop formation: 10-10-80%. Force as many archer troops as you can, especially if they are T10. With a bit of luck Rosa's 3rd skill will do the work for you (Increasing Archers' total Attack by 30%).",
              ko: "이제부터는 궁병 중심의 진형을 운영합니다. 티어 TG5 기병과 함께 로사의 3번째 스킬이 부여하는 궁병 전체 공격력 30% 증가는 매우 강력한 효과입니다.",
              de: "So viele (idealerweise maxed) Bogenschützen wie möglich; Rosas 3. Skill kann den Bogenschützen-Gesamtschaden um 30% steigern."
            }
          },
          {
            tag: "alt",
            heroes: ["Helga", "Petra", "Rosa"],
            ratio: "10-10-80",
            note: {
              zh: "若赫爾加星級裝備高於阿瑪迪斯可替代使用。",
              en: "Troop formation: 10-10-80%. Use Helga as alternative if she has better stars and widget level than Amadeus. Still force as many archers as you can, especially T10, for Rosa's 3rd skill (Increasing Archers' total Attack by 30%).",
              ko: "헬가의 성급이나 전용 무기 레벨이 아마데우스보다 높다면 헬가를 대체 영웅으로 기용하세요. 티어 TG5 기병과 함께 로사의 3번째 스킬이 부여하는 궁병 전체 공격력 30% 증가는 매우 강력한 효과입니다.",
              de: "Helga nehmen, wenn ihr Stern-/Ausrüstungsgrad über Amadeus liegt."
            }
          },
          {
            tag: "f2p",
            heroes: ["Zoe", "Petra", "Rosa"],
            ratio: "10-10-80",
            note: {
              zh: "與替代組合相同，Rosa 三技能在重弓兵編組下效果最佳。",
              en: "Troop formation: 10-10-80%. Same as alternative best heroes — Rosa's 3rd skill bonuses best if you focus on heavy archer formations (Increasing Archers' total Attack by 30%).",
              ko: "위의 대체 영웅 조합과 같은 병력 비율을 사용합니다. 로사의 3번째 스킬과 높은 궁병 비율의 조합은 궁병 전체 공격력을 30% 증가시킵니다.",
              de: "Gleiche Idee wie die Alternative — Rosas 3. Skill glänzt am stärksten in bogenschützenlastigen Formationen."
            }
          }
        ]
      },
      {
        gen: { zh: "第 5 代", en: "GEN 5", ko: "5세대", de: "GEN 5" },
        rows: [
          {
            tag: "best",
            heroes: ["Amadeus", "", ""],
            ratio: "",
            note: {
              zh: "其餘指揮欄位尚未公布。",
              en: "Remaining host slots not released yet.",
              ko: "나머지 지휘 자리는 아직 미공개입니다.",
              de: "Die übrigen Anführer-Plätze sind noch nicht veröffentlicht."
            }
          }
        ]
      }
    ]
  },

  "swordland-showdown": {
    emoji: "⚔️",
    name: { zh: "聖劍爭奪", en: "Swordland Showdown", ko: "성검 쟁탈", de: "Schwertland-Showdown", fr: "Choc du Glaive", tr: "Kılıçdiyarı Hesaplaşması", id: "Swordland Showdown", ru: "Битва за Страну мечей", th: "ศึกดวลดินแดนดาบ", ar: "مواجهة أرض السيوف" },
    buildings: [
      { id: "swordshrine", first: [9000, 4500], hold: [1800, 900], opens: 15, priority: "top" },
      { id: "mercenary",   first: [1200, 600],  hold: [240, 120],  opens: 15, priority: "med" },
      { id: "reformation", first: [1200, 600],  hold: [240, 120],  opens: 15, priority: "high" },
      { id: "sanctum",     first: [6000, 3000], hold: [1200, 600], opens: 0,  priority: "high" },
      { id: "abbey",       first: [3000, 1500], hold: [600, 300],  opens: 0,  priority: "med" },
      { id: "stables",     first: [1200, 600],  hold: [240, 120],  opens: 0,  priority: "high" },
      { id: "belltower",   first: [1200, 600],  hold: [240, 120],  opens: 0,  priority: "high" },
      { id: "undercellar", gather: true }
    ],
    zones: [
      { color: "purple", items: [{ n: 4, id: "belltower" }, { n: 5, id: "abbey" }, { n: 2, id: "mercenary" }, { id: "undercellar", x: 2 }] },
      { color: "blue",   items: [{ n: 8, id: "sanctumNW" }, { n: 9, id: "abbey" }] },
      { color: "yellow", items: [{ n: 6, id: "abbey" }, { n: 7, id: "stables" }, { n: 3, id: "reformation" }, { id: "undercellar", x: 2 }] },
      { color: "green",  items: [{ n: 10, id: "sanctumSE" }, { n: 11, id: "abbey" }] },
      { color: "center", items: [{ n: 1, id: "swordshrine" }] }
    ],
    sections: {
      zh: {
        title: "聖劍爭奪",
        blocks: [
          { type: "h", text: "時間" },
          { type: "p", text: "每 2 週一次，60 分鐘的聯盟對聯盟戰場活動。" },

          { type: "h", text: "報名" },
          { type: "callout", text: "⚠️ **只有確定會參加才報名。** 報了名卻沒出席會佔走寶貴名額，也可能影響配對。" },
          { type: "list", items: ["**100% 能參加 → 送出參戰申請**", "**不確定 → 棄權**"] },

          { type: "h", text: "主要目標" },
          { type: "p", text: "比對方聯盟獲得更多{allianceRelic}即可獲勝。" },
          { type: "list", items: [
            "佔領並守住重要建築",
            "保護已累積的積分",
            "建築易主時，立刻撿取散落的{arsenal}",
            "{undercellar}出現時前往採集",
            "沒有參與集結時，就去增援附近的駐防",
            "不要讓部隊閒置",
            "**不要滿地圖追殺。** 隨機 PvP 會讓我們兵力分散、效率降低。適時攻擊等級較低的城池即可，並優先削弱靠近據點建築的敵人。"
          ]},

          { type: "h", text: "建築一覽" },
          { type: "buildings",
            legend: "數字依序為：{allianceRelic}／{personalRelic}",
            cols: { first: "首次控制", hold: "持續佔領", open: "開放時間", min: "分鐘", perMin: "/分鐘" },
            priority: { top: "最高", high: "高", med: "中" },
            gather: "週期性出現的採集點（共兩波）",
            purposes: {
              swordshrine: "積分價值最高的建築",
              mercenary: "削弱敵方持有的建築",
              reformation: "聯盟戰鬥增益",
              sanctum: "高價值{allianceRelic}",
              abbey: "產出{allianceRelic}",
              stables: "遷城恢復時間 -50%",
              belltower: "建築佔領時長 -50%"
            }
          },

          { type: "h", text: "分配區域" },
          { type: "p", text: "R4 會在開戰前，把確定參加的成員分成小隊／區域。" },
          { type: "p", text: "我們**最強的攻擊手**會先被分配到以下區域：" },
          { type: "list", items: [
            "🟣 **紫色 — {belltower}**",
            "🟡 **黃色 — {stables}**",
            "🔵 **藍色 — {sanctumNW}**",
            "🟢 **綠色 — {sanctumSE}**"
          ]},
          { type: "p", text: "其餘成員會被分配去支援其中一區。視戰況可能需要輪調，請隨時關注小隊聊天頻道。" },
          { type: "p", text: "除非幹部指示移動，否則請留在自己的區域。" },
          { type: "zones", labels: {
            purple: "🟣 紫色區域 — {belltower}／{mercenary}",
            blue: "🔵 藍色區域 — {sanctumNW}／{abbey}",
            yellow: "🟡 黃色區域 — {stables}／{abbey}",
            green: "🟢 綠色區域 — {sanctumSE}／{abbey}",
            center: "⚪ 中央"
          }},

          { type: "h", text: "職責分工" },
          { type: "p", text: "R4 會依戰力，把確定參加的成員分成 3 種職責：**攻擊手、防守者、支援／集結參與者**。" },

          { type: "sub", text: "⚔️ 1）攻擊手" },
          { type: "p", text: "**人選：** 戰力最強的玩家，備有充足的高級遷城。" },
          { type: "p", text: "**任務：**" },
          { type: "list", items: [
            "遷城到分配的區域與建築",
            "佔領優先建築",
            "單打落單的脆弱敵方城池",
            "主導重要集結",
            "防守者接手後，立刻移往下一個目標",
            "敵人遷城到你負責的建築附近時，鎖定較弱或暴露的城池"
          ]},

          { type: "sub", text: "🛡️ 2）防守者" },
          { type: "p", text: "**人選：** 戰力次強、集結／駐防容量佳的玩家。" },
          { type: "p", text: "**任務：**" },
          { type: "list", items: [
            "跟著分配到的攻擊手（區域）",
            "攻擊手拿下建築後接手駐防，需要時呼叫增援",
            "增援受威脅的目標",
            "讓攻擊手能空出手前往下一個目標"
          ]},

          { type: "sub", text: "🤝 3）支援／集結參與者" },
          { type: "p", text: "**人選：** 一般為戰力較低的成員與集結參與者。" },
          { type: "p", text: "**任務：**" },
          { type: "list", items: [
            "**必須**加入所分配防守者的集結",
            "增援已佔領的建築",
            "被要求時急行軍增援",
            "沒有其他需要時，待在**安全區**或離敵方較遠的地方"
          ]},
          { type: "callout", text: "**重要：** 若敵方攻下我方佔領的建築、控制權易主，**立刻遷城到附近或急行軍前往**，搶在對方之前撿取散落的{arsenal}。" },
          { type: "list", items: [
            "**開戰滿 20 分鐘後**，{undercellar}開始出現，派出手上有空的部隊前往採集，賺取額外積分。",
            "不要讓部隊閒置。"
          ]},

          { type: "h", text: "戰前準備" },
          { type: "list", items: [
            "清空傷兵營，確保所有部隊都可出動",
            "裝備你最強的英雄與裝備",
            "啟用部隊容量、攻擊與防禦增益，以及反偵察",
            "若你的職責需要，備妥高級遷城",
            "盡量開著 Discord（查看地圖、分配，也可選擇加入語音）",
            "檢查聯盟聊天與私訊"
          ]},
          { type: "callout", text: "⚠️ **重要：** 開戰當天會出現新的**小隊聊天**分頁。**整場戰鬥期間請隨時關注。**" },

          { type: "h", text: "戰鬥時間軸" },
          { type: "timeline", items: [
            { time: "0:00–15:00", title: "開場", groups: [
              { title: "立刻拿下", lines: ["**#4 {belltower}**", "**#7 {stables}**"] },
              { title: "爭奪", lines: ["**#8 {sanctumNW}**", "**#10 {sanctumSE}**"] },
              { title: "", lines: [
                "有餘力時可拿{abbey}，但不要為了{abbey}犧牲核心目標。",
                "**14:30**，最強的玩家準備前往中央。"
              ]}
            ]},
            { time: "15:00", title: "強力建築開啟", lines: [
              "**#1 {swordshrine}**、**#2 {mercenary}**、**#3 {reformation}**",
              "幹部會依戰況指定優先順序。"
            ], groups: [
              { title: "⭐ {swordshrine}", lines: [
                "最強的攻擊手／防守者遷城前往中央（不是全部）",
                "佔領{swordshrine}",
                "拿下後由一位強力防守者駐守",
                "支援／集結參與者需急行軍並派出增援"
              ]}
            ], warn: "⚠️ 正在駐防的成員：除非幹部指示，否則不要為了{swordshrine}放棄自己的建築，請繼續守護{sanctum}與其他重要建築。" },
            { time: "15:00–45:00", title: "💪 控制階段", lines: [
              "主要目標：**守住{swordshrine}＋{sanctumNW}＋{sanctumSE}**",
              "維持{belltower}／{stables}的有效控制",
              "重要交戰時善用{reformation}的增益",
              "用{mercenary}對敵方建築施壓",
              "每次建築易主後，都要撿取散落的{arsenal}",
              "增援防守薄弱的駐防點"
            ]},
            { time: "20:00–60:00", title: "⛏️ {undercellar}", lines: [
              "{undercellar}開始出現。",
              "支援玩家與任何有空閒部隊的人，都應前往採集，賺取額外積分。",
              "**不要為了採集而放棄重要防守或集結。**"
            ]},
            { time: "最後 15 分鐘", title: "🏁 收尾", groups: [
              { title: "若我方領先", lines: ["守住{swordshrine}與{sanctum}", "增援有累積積分的建築", "避免不必要的 PvP", "立刻回收散落的{arsenal}", "不要冒不必要的風險"] },
              { title: "若我方落後", lines: ["對敵方核心建築施壓", "集中攻擊前，先動用{mercenary}", "集中集結火力，不要亂打", "鎖定敵方持有的高價值建築", "每次成功翻盤後，撿光所有掉落的積分"] }
            ], warn: "**最後 5 分鐘：積分 > 擊殺。**" }
          ]},

          { type: "h", text: "總結" },
          { type: "p", text: "成員分成 3 種職責並分配區域：" },
          { type: "list", items: [
            "**攻擊手** → 佔領＋施壓",
            "**防守者** → 守住＋保護",
            "**支援** → 增援＋集結＋撿{arsenal}＋採集"
          ]},
          { type: "list", items: [
            "遵守你分配到的區域與職責。",
            "隨時關注小隊聊天頻道。",
            "目標優先於亂打擊殺。",
            "攻擊手負責攻下，防守者負責守住，支援負責增援。",
            "有用的部隊絕不閒置。",
            "立刻撿取散落的{arsenal}。",
            "用有空的部隊採集{undercellar}。",
            "守護{swordshrine}與{sanctum}。",
            "不要為了{abbey}或擊殺放棄核心建築。",
            "幹部呼叫輪調時，立刻移動。"
          ]},
          { type: "callout", text: "⚔️ **團結協作，贏得聖劍爭奪**" }
        ]
      },

      en: {
        title: "Swordland Showdown",
        blocks: [
          { type: "h", text: "WHEN" },
          { type: "p", text: "Every 2 weeks — a 60-minute Alliance vs Alliance battlefield event." },

          { type: "h", text: "REGISTRATION" },
          { type: "callout", text: "⚠️ **Only register if you plan to attend.** Registered players who don't show up take a valuable spot and may affect matchmaking." },
          { type: "list", items: ["**100% can attend → Submit Battle Request**", "**Not sure → Abstain**"] },

          { type: "h", text: "MAIN OBJECTIVE" },
          { type: "p", text: "Win by earning more {allianceRelic} than the opposing alliance." },
          { type: "list", items: [
            "Capture and hold important buildings",
            "Protect accumulated points",
            "Collect scattered {arsenal} immediately when buildings switch sides",
            "Gather {undercellar} when they appear",
            "Reinforce nearby garrisons when not rallying",
            "Do not let marches sit idle",
            "**DO NOT chase kills across the map.** Random PvP spreads us out and reduces our effectiveness. Attack lower-level cities when it makes sense, weakening them near a holding building."
          ]},

          { type: "h", text: "BUILDINGS AT A GLANCE" },
          { type: "buildings",
            legend: "Numbers shown as: {allianceRelic} / {personalRelic}",
            cols: { first: "First Control", hold: "Ongoing Occupation", open: "Opens", min: "min", perMin: "/m", sep: ": " },
            priority: { top: "HIGHEST", high: "HIGH", med: "MED" },
            gather: "Gathering sites which periodically appear (two waves)",
            purposes: {
              swordshrine: "Highest-value point building",
              mercenary: "Weakens enemy-held buildings",
              reformation: "Alliance combat buff",
              sanctum: "High-value {allianceRelic}",
              abbey: "Generates {allianceRelic}",
              stables: "-50% teleport cooldown",
              belltower: "-50% building capture time"
            }
          },

          { type: "h", text: "ASSIGNED ZONES" },
          { type: "p", text: "R4 will divide confirmed members into teams/zones before battle." },
          { type: "p", text: "Our **strongest Attackers** will initially be assigned a zone:" },
          { type: "list", items: [
            "🟣 **Purple — {belltower}**",
            "🟡 **Yellow — {stables}**",
            "🔵 **Blue — {sanctumNW}**",
            "🟢 **Green — {sanctumSE}**"
          ]},
          { type: "p", text: "Remaining members will be assigned to support one of these zones/teams. Rotation may be needed based on battle conditions — always monitor Squad Chat for details." },
          { type: "p", text: "Stay with your assigned zone unless leadership tells you to move." },
          { type: "zones", labels: {
            purple: "🟣 Purple Zone — {belltower} / {mercenary}",
            blue: "🔵 Blue Zone — {sanctumNW} / {abbey}",
            yellow: "🟡 Yellow Zone — {stables} / {abbey}",
            green: "🟢 Green Zone — {sanctumSE} / {abbey}",
            center: "⚪ Center"
          }},

          { type: "h", text: "ROLES & RESPONSIBILITIES" },
          { type: "p", text: "R4 will divide confirmed members into 3 functions based on power: **Attackers, Defenders and Support/Joiners**." },

          { type: "sub", text: "⚔️ 1) ATTACKERS" },
          { type: "p", text: "**Who:** Our strongest players. Have plenty of advanced teleports." },
          { type: "p", text: "**Your job:**" },
          { type: "list", items: [
            "Teleport to your assigned zone & building",
            "Capture priority buildings",
            "Solo attack vulnerable enemy castles",
            "Lead important rallies",
            "Move to the next objective once a Defender takes over",
            "When enemies teleport near your assigned building, target weaker or exposed castles"
          ]},

          { type: "sub", text: "🛡️ 2) DEFENDERS" },
          { type: "p", text: "**Who:** Our next strongest players with good rally/garrison capacity." },
          { type: "p", text: "**Your job:**" },
          { type: "list", items: [
            "Follow your assigned Attackers (zone)",
            "Once an Attacker has captured a building, take over garrisons and call for reinforcements if needed",
            "Reinforce threatened objectives",
            "Free Attackers to move to their next target"
          ]},

          { type: "sub", text: "🤝 3) SUPPORT / JOINERS" },
          { type: "p", text: "**Who:** Generally lower-power members and rally joiners." },
          { type: "p", text: "**Your job:**" },
          { type: "list", items: [
            "**Must** join assigned Defenders' rallies",
            "Reinforce captured buildings",
            "Speed-march reinforcements when requested",
            "Operate from the **Safe Zone** when not needed elsewhere or further from enemy reach"
          ]},
          { type: "callout", text: "**IMPORTANT:** If the enemy attacks one of our captured buildings and control switches to the enemy, **teleport nearby or speed-march immediately** and collect the scattered {arsenal} before they do." },
          { type: "list", items: [
            "**20 minutes into the battle**, {undercellar} appear. Send available troops to gather them for additional points.",
            "Do not leave marches idle."
          ]},

          { type: "h", text: "BEFORE BATTLE" },
          { type: "list", items: [
            "Clear your Infirmary. Have all marches available",
            "Equip your strongest heroes/gear",
            "Activate Deployment Capacity, Attack & Defense buffs, and Counter-recon",
            "Have Advanced Teleports available if your role requires them",
            "Keep Discord open if possible (for reference to map, assignments, optional VC)",
            "Check Alliance Chat and Private Messages"
          ]},
          { type: "callout", text: "⚠️ **IMPORTANT:** A new **Squad Chat** tab will appear on battle day. **Monitor Squad Chat throughout the entire battle.**" },

          { type: "h", text: "BATTLE TIMELINE" },
          { type: "timeline", items: [
            { time: "0:00–15:00", title: "OPENING", groups: [
              { title: "Immediately secure", lines: ["**#4 {belltower}**", "**#7 {stables}**"] },
              { title: "Contest", lines: ["**#8 {sanctumNW}**", "**#10 {sanctumSE}**"] },
              { title: "", lines: [
                "Take {abbey} when practical, but do not sacrifice core objectives for them.",
                "**14:30**, strongest players get ready for the center."
              ]}
            ]},
            { time: "15:00", title: "POWER BUILDINGS OPEN", lines: [
              "**#1 {swordshrine}**, **#2 {mercenary}**, **#3 {reformation}**",
              "Leadership will call priorities based on battlefield conditions."
            ], groups: [
              { title: "⭐ {swordshrine}", lines: [
                "Strongest Attackers/Defenders teleport toward the center (not all)",
                "Capture {swordshrine}",
                "Once secured, a strong Defender maintains the garrison",
                "Support/Joiners must speed-march and send reinforcements"
              ]}
            ], warn: "⚠️ Garrisoning members: do not abandon your building for {swordshrine} unless leadership advises. Continue protecting {sanctum} and other important buildings." },
            { time: "15:00–45:00", title: "💪 CONTROL PHASE", lines: [
              "Primary goal: **Hold {swordshrine} + {sanctumNW} + {sanctumSE}**",
              "Maintain useful {belltower}/{stables} control",
              "Use {reformation}'s buff for major engagements",
              "Use {mercenary} to pressure enemy buildings",
              "Collect scattered {arsenal} after EVERY building flip",
              "Reinforce weakened garrisons"
            ]},
            { time: "20:00–60:00", title: "⛏️ {undercellar}", lines: [
              "{undercellar} begin appearing.",
              "Support players and anyone with available marches should gather them for additional points.",
              "**Do not abandon a critical defense or rally just to gather.**"
            ]},
            { time: "FINAL 15 MINUTES", title: "🏁 CLOSING", groups: [
              { title: "IF WE ARE AHEAD", lines: ["Protect {swordshrine} and {sanctum}", "Reinforce accumulated-point buildings", "Avoid unnecessary PvP", "Recover scattered {arsenal} immediately", "Don't take unnecessary risks"] },
              { title: "IF WE ARE BEHIND", lines: ["Pressure enemy core buildings", "Use {mercenary} before coordinated attacks", "Concentrate rallies instead of attacking randomly", "Target valuable enemy-held buildings", "Collect every dropped point after a successful flip"] }
            ], warn: "**Last 5 minutes: Points > kills.**" }
          ]},

          { type: "h", text: "SUMMARY" },
          { type: "p", text: "Groups will be divided into 3 functions and assigned a zone:" },
          { type: "list", items: [
            "**ATTACKERS** → TAKE + PRESSURE",
            "**DEFENDERS** → HOLD + PROTECT",
            "**SUPPORT** → REINFORCE + RALLY + LOOT + GATHER"
          ]},
          { type: "list", items: [
            "Follow your assigned zone and role.",
            "Monitor Squad Chat.",
            "Objectives > random kills.",
            "Attackers take — Defenders hold — Support reinforces.",
            "Never leave useful marches idle.",
            "Collect scattered {arsenal} immediately.",
            "Gather {undercellar} with available marches.",
            "Protect {swordshrine} + {sanctum}.",
            "Don't abandon core buildings for {abbey} or kills.",
            "If leadership calls a rotation, MOVE."
          ]},
          { type: "callout", text: "⚔️ **COORDINATION WINS SWORDLAND**" }
        ]
      },

      ko: {
        title: "성검 쟁탈 (SWORDLAND SHOWDOWN)",
        blocks: [
          { type: "h", text: "📅 언제" },
          { type: "p", text: "2주마다 — 60분 동안 진행되는 연맹 대 연맹 전장 이벤트." },

          { type: "h", text: "📋 등록" },
          { type: "callout", text: "⚠️ **참석할 수 있는 경우에만 등록해 주세요.** 등록해놓고 참석하지 않으면 소중한 자리를 차지하게 되며 매칭에 악영향을 줄 수 있습니다." },
          { type: "list", items: [
            "**100% 참석 가능 → 전투 신청 제출 (Submit Battle Request)**",
            "**불확실함 → 기권 (Abstain)**"
          ]},

          { type: "h", text: "🎯 주요 목표" },
          { type: "p", text: "상대 연맹보다 더 많은 **연맹 유물 점수(Alliance Relic Points)**를 획득하여 승리하세요." },
          { type: "list", items: [
            "주요 건물을 점령하고 유지하기",
            "누적된 점수 보호하기",
            "건물의 소유권이 바뀔 때 흩어진 전리품 즉시 수집하기",
            "숨겨진 땅굴 (Undercellars)이 나타나면 수집하기",
            "집결중이 아닐 때는 근처 주둔지 지원하기",
            "부대가 대기 상태로 방치되지 않도록 하기",
            "**맵 전체를 돌아다니며 킬을 쫓지 마세요.** 무작위 PvP는 아군의 대형을 흩어지게 하고 전투 효율을 떨어뜨립니다. 점령 건물 근처의 적을 약화시키는 등 의미가 있을 때만 저렙 도시에 공격을 가하세요."
          ]},

          { type: "h", text: "🏛️ 주요 건물 및 점수 정보" },
          { type: "sub", text: "성검제단(Swordshrine)" },
          { type: "list", items: ["최초 점령 보상: 연맹 9,000점 / 개인 4,500점", "점령 유지 보상: 연맹 +1,800/분 / 개인 +900/분"] },
          { type: "sub", text: "성소(Sanctum)" },
          { type: "list", items: ["최초 점령 보상: 연맹 6,000점 / 개인 3,000점", "점령 유지 보상: 연맹 +1,200/분 / 개인 +600/분"] },
          { type: "sub", text: "수도원(Abbey)" },
          { type: "list", items: ["최초 점령 보상: 연맹 3,000점 / 개인 1,500점", "점령 유지 보상: 연맹 +600/분 / 개인 +300/분"] },
          { type: "sub", text: "용병 주둔지(Mercenary)" },
          { type: "list", items: ["최초 점령 보상: 연맹 1,200점 / 개인 600점", "점령 유지 보상: 연맹 +240/분 / 개인 +120/분"] },
          { type: "sub", text: "교화의 홀(Reformation)" },
          { type: "list", items: ["최초 점령 보상: 연맹 1,200점 / 개인 600점", "점령 유지 보상: 연맹 +240/분 / 개인 +120/분"] },
          { type: "sub", text: "마구간(Stables)" },
          { type: "list", items: ["최초 점령 보상: 연맹 1,200점 / 개인 600점", "점령 유지 보상: 연맹 +240/분 / 개인 +120/분"] },
          { type: "sub", text: "시계탑(Bell Tower)" },
          { type: "list", items: ["최초 점령 보상: 연맹 1,200점 / 개인 600점", "점령 유지 보상: 연맹 +240/분 / 개인 +120/분"] },
          { type: "sub", text: "숨겨진 땅굴(Undercellars)" },
          { type: "list", items: ["주기적으로(총 2번의 웨이브로) 생성되는 채집 장소"] },

          { type: "h", text: "🏛️ 건물 오픈 시간 및 우선순위" },
          { type: "sub", text: "🐎 마구간" },
          { type: "list", items: ["오픈 시간: 0분", "우선순위: 🔴 높음 (HIGH)", "효과: 도시 이전 쿨다운 -50%"] },
          { type: "sub", text: "🔔 시계탑" },
          { type: "list", items: ["오픈 시간: 0분", "우선순위: 🔴 높음 (HIGH)", "효과: 건물 점령 시간 -50%"] },
          { type: "sub", text: "🏛️ 성소" },
          { type: "list", items: ["오픈 시간: 0분", "우선순위: 🔴 높음 (HIGH)", "효과: 고가치 연맹 점수 획득"] },
          { type: "sub", text: "⛪ 수도원" },
          { type: "list", items: ["오픈 시간: 0분", "우선순위: 🟡 보통 (MED)", "효과: 연맹 점수 생성"] },
          { type: "sub", text: "⚔️ 성검제단" },
          { type: "list", items: ["오픈 시간: 15분", "우선순위: ⭐ 최고 (HIGHEST)", "효과: 가장 가치 높은 점수 건물"] },
          { type: "sub", text: "💪 교화의 홀 (Hall of Reformation)" },
          { type: "list", items: ["오픈 시간: 15분", "우선순위: 🔴 높음 (HIGH)", "효과: 연맹 전투 버프"] },
          { type: "sub", text: "⛺ 용병 주둔지 (Mercenary Camp)" },
          { type: "list", items: ["오픈 시간: 15분", "우선순위: 🟡 보통 (MED)", "효과: 적이 점령한 건물 약화"] },

          { type: "h", text: "🗺️ 배정 구역" },
          { type: "p", text: "R4(임원진)가 전투 전에 참석이 확인된 멤버들을 팀과 구역으로 나눌 예정입니다." },
          { type: "p", text: "우리 연맹의 **최정예 공격수들**은 처음에 다음 구역 중 하나에 배치됩니다:" },
          { type: "list", items: [
            "🟣 **보라색(Purple) — 시계탑 (Bell Tower)**",
            "🟡 **노란색(Yellow) — 마구간 (Royal Stables)**",
            "🔵 **파란색(Blue) — 서쪽 성소 (West Sanctum)**",
            "🟢 **초록색(Green) — 동쪽 성소 (East Sanctum)**"
          ]},
          { type: "p", text: "나머지 멤버들은 위 구역/팀 중 한 곳을 지원하도록 배정됩니다. 전황에 따라 로테이션이 필요할 수 있으니 — 항상 스쿼드 채팅을 예의 주시해 주세요." },
          { type: "p", text: "리더십의 지시가 있기 전까지는 배정된 구역에 머물러 주세요." },

          { type: "h", text: "👥 역할 및 책임" },
          { type: "p", text: "R4(임원진)가 전투력을 기준으로 참석이 확인된 멤버들을 **공격수, 방어수, 지원/참여자**의 3가지 역할로 나눌 것입니다." },

          { type: "sub", text: "1) ⚔️ 공격수 (ATTACKERS)" },
          { type: "p", text: "**대상:** 가장 강력한 플레이어들. 고급 도시 이전이 충분히 있는 분들." },
          { type: "p", text: "**임무:**" },
          { type: "list", items: [
            "배정된 구역 및 건물로 도시 이전하기",
            "우선순위 건물 점령하기",
            "방어력이 취약한 적의 성을 단독으로 공격하기",
            "주요 집결(rally) 주도하기",
            "방어수가 건물을 이어받으면 다음 목표로 이동하기",
            "배정된 건물 근처로 적이 도시 이전해 오면, 약하거나 노출된 성을 타겟으로 삼기"
          ]},

          { type: "sub", text: "2) 🛡️ 방어수 (DEFENDERS)" },
          { type: "p", text: "**대상:** 그다음으로 강력하며, 좋은 집결 및 주둔 수용량을 가진 플레이어들." },
          { type: "p", text: "**임무:**" },
          { type: "list", items: [
            "배정된 공격수(구역)를 따라가기",
            "공격수가 건물을 점령하면 주둔부대를 이어받고, 필요할 경우 지원 요청하기",
            "위협받는 목표물 지원하기"
          ]},
          { type: "p", text: "*공격수가 다음 목표로 이동할 수 있도록 길을 터주기*" },

          { type: "sub", text: "3) 🤝 지원 및 참여자 (SUPPORT / JOINERS)" },
          { type: "p", text: "**대상:** 주로 전투력이 낮거나 집결에 참여하는 멤버들." },
          { type: "p", text: "**임무:**" },
          { type: "list", items: [
            "배정된 방어수의 집결에 반드시 참여하기",
            "점령한 건물 지원하기",
            "지원 요청 시 가속 행군을 사용하여 지원하기",
            "다른 곳에 필요하지 않거나 적의 손이 닿지 않는 곳에 있다면 **안전 구역(Safe Zone)**에서 활동하기"
          ]},
          { type: "p", text: "**중요 사항**:" },
          { type: "list", items: [
            "적이 우리가 점령한 건물을 공격하여 소유권이 적에게 넘어가면, **즉시 근처로 도시 이전하거나 가속 행군을 사용하여** **적이 가져가기 전에 흩어진 전리품/포인트를 수집하기.**",
            "**전투 시작 후 20분이 지나면** 숨겨진 땅굴(Undercellars)이 남. 가용한 병력을 보내 추가 포인트를 위해 채집하기.",
            "부대를 대기 상태로 방치하지 않기."
          ]},

          { type: "h", text: "⏲️ 전투 전 준비 사항" },
          { type: "list", items: [
            "야전병원 비우기. 모든 부대를 출동 가능한 상태로 만들기",
            "가장 강력한 영웅과 장비 장착하기",
            "부대 수용량, 공격력/방어력 버프, 정찰 방지 활성화하기",
            "역할에 필요한 경우 고급 도시 이전 준비해 두기",
            "가능한 경우 디스코드 켜두기 (맵, 배정 내용, 음성 채널 참고용)",
            "연맹 채팅 및 귓속말 확인하기"
          ]},
          { type: "callout", text: "⚠️ **중요:** 전투 당일 새로운 **스쿼드 채팅(Squad Chat)** 탭이 생성됩니다. **전투가 진행되는 동안 스쿼드 채팅을 계속 모니터링해 주세요.**" },

          { type: "h", text: "⏱️ 전투 타임라인" },
          { type: "timeline", items: [
            { time: "⏱️ 0:00–15:00", title: "오프닝 단계", groups: [
              { title: "즉시 확보해야 할 건물:", lines: ["**#4 시계탑 (Bell Tower)**", "**#7 마구간 (Royal Stables)**"] },
              { title: "경쟁 구역:", lines: ["**#8 서쪽 성소 (West Sanctum)**", "**#10 동쪽 성소 (East Sanctum)**"] },
              { title: "", lines: [
                "수도원(Abbey)은 여유가 될 때 점령하되, 이를 위해 핵심 목표를 희생하지 마세요.",
                "**14:30**, 최정예 플레이어들은 중앙 지역을 준비하세요."
              ]}
            ]},
            { time: "‼️ 15:00", title: "핵심 건물 오픈", lines: [
              "**#1 성검제단 (Swordshrine)**",
              "**#2 용병 주둔지 (Mercenary Camp)**",
              "**#3 교화의 홀 (Hall of Reformation)**",
              "리더십(임원진)이 전황에 따라 우선순위를 지시할 것입니다."
            ], groups: [
              { title: "⭐ 성검 제단 (SWORDSHRINE)", lines: [
                "최정예 공격수/방어수들은 중앙을 향해 도시 이전 (전원이 다 이동하는 것은 아님)",
                "성검 제단 점령하기",
                "일단 확보되면 강력한 방어수가 주둔부대를 유지하기",
                "지원/참여자들은 가속 행군을 사용해 증원 보내기"
              ]}
            ], warn: "⚠️ 주둔 중인 멤버들 — 임원진의 지시가 없는 한 성검제단을 위해 본인의 건물을 포기하지 마세요. 성소 및 기타 중요 건물들을 계속 보호해야 합니다." },
            { time: "💪 15:00–45:00", title: "통제 단계", lines: [
              "주요 목표: **성검제단 + 서쪽 성소 + 동쪽 성소를 사수하세요.**",
              "시계탑/마구간 통제 유지하기",
              "주요 교전 시 교화의 홀 버프 활용하기",
              "적 건물을 압박하기 위해 용병 주둔지 활용하기",
              "건물의 소유권이 바뀔 때마다(flip) 흩어진 전리품/ 즉시 수집하기",
              "약화된 주둔부대 지원하기"
            ]},
            { time: "⛏️ 20:00–60:00", title: "숨겨진 땅굴 (UNDERCELLARS)", lines: [
              "숨겨진 땅굴이 생성되기 시작합니다.",
              "지원 플레이어들과 가용한 부대가 있는 누구나 추가 점수를 위해 땅굴을 채집하세요.",
              "채집만을 위해 중요한 방어나 집결을 포기하지 마세요."
            ]},
            { time: "🏁 마지막 15분", title: "", groups: [
              { title: "우리가 이기고 있을 때", lines: [
                "성검제단과 소 사수하기",
                "누적 점수 건물 지원하기",
                "불필요한 PvP 피하기",
                "흩어진 전리품 즉시 회수하기",
                "불필요한 위험 감수하지 않기"
              ]},
              { title: "우리가 지고 있을 때", lines: [
                "적의 핵심 건물 압박하기",
                "협동 공격 전 용병 주둔지 활용하기",
                "무작위 공격 대신 집결 집중하기",
                "적이 점령한 가치 있는 건물 타겟팅하기",
                "성공적으로 소유권을 뒤집은 후 드랍된 모든 포인트 수집하기"
              ]}
            ], warn: "**마지막 5분: 무작위 킬보다 목표(Objectives)가 우선입니다.**" }
          ]},

          { type: "h", text: "기억해 주세요" },
          { type: "sub", text: "📦 건물 소유권 변경 및 흩어진 전리품" },
          { type: "p", text: "건물의 소유권이 바뀌면, **주위에 흩어진 포인트가 나타날 수 있습니다.**" },
          { type: "p", text: "**우리가 건물을 뺏겼을 때:** 떨어진 전리품을 최대한 빠르게 수집하세요." },
          { type: "p", text: "**우리가 적의 건물을 점령했을 때:** 적이 되찾기 전에 흩어진 전리품을 먼저 수집하세요." },
          { type: "callout", text: "건물의 소유권이 바뀐 후 드랍된 포인트를 절대 그냥 지나치지 마세요." },
          { type: "sub", text: "추가 전술" },
          { type: "list", items: [
            "**피해 방지**: 내 성이 공격받기 직전이라면: 1) 공격받기 전에 근처에 부대를 주둔(Encamp)시키기, 2) 성 밖으로 부대를 빼기 위해 집결(rally) 시작하기",
            "**정찰 정보 수집**: 정찰 방지로 정찰이 불가능할 경우, 집결을 시작하면 적의 증원 상황을 파악하는 데 도움이 될 수 있습니다. 공격이 실익이 없다면 이후에 취소하세요.",
            "**성의 취약점**: 적의 움직임을 주시하세요. 적의 가장 강한 영웅이나 병력의 대다수가 성 밖에 있다면 방어력이 취약해진 상태일 수 있습니다. 이럴 때 단독 공격이 효과적일 수 있습니다."
          ]},

          { type: "h", text: "요약" },
          { type: "p", text: "그룹은 3가지 역할로 나뉘며 지정된 구역에 배치됩니다:" },
          { type: "list", items: [
            "**공격수 (ATTACKERS)** → 점령 + 압박",
            "**방어수 (DEFENDERS)** → 사수 + 보호",
            "**지원 (SUPPORT)** → 증원 + 집결 + 전리품 획득 + 채집"
          ]},
          { type: "list", items: [
            "배정된 구역과 역할을 따르세요.",
            "스쿼드 채팅(Squad Chat)을 모니터링하세요.",
            "무작위 킬보다 목표가 우선입니다.",
            "공격수는 점령하고 — 방어수는 사수하며 — 지원은 증원합니다.",
            "유용한 부대를 유휴 상태로 방치하지 마세요.",
            "흩어진 전리품을 즉시 수집하세요.",
            "가용한 부대로 땅굴을 채집하세요.",
            "성검 제단 + 성소를 사수하세요.",
            "수도원이나 킬을 위해 핵심 건물을 포기하지 마세요.",
            "리더십이 로테이션을 지시하면 이동하세요."
          ]},
          { type: "callout", text: "⚔️ 협력이 소드랜드의 승리를 만듭니다" },
          { type: "p", text: "한글 지도 출처: https://m.dcinside.com/board/kingshot/9878?page=5&s_type=subject_m&serval=%EC%84%B1%EA%B2%80" }
        ]
      },

      de: {
        title: "SWORDLAND SHOWDOWN",
        blocks: [
          { type: "h", text: "📅 WANN" },
          { type: "p", text: "Alle 2 Wochen — 60-minütiges Allianz-gegen-Allianz-Schlachtfeldevent." },

          { type: "h", text: "📋 ANMELDUNG" },
          { type: "callout", text: "⚠️ **Nur anmelden, wenn du teilnehmen willst.** Angemeldete Spieler, die nicht erscheinen, nehmen einen wertvollen Platz ein und können das Matchmaking beeinflussen." },
          { type: "list", items: [
            "**100 % können teilnehmen → Battle Request senden**",
            "**Nicht sicher → Enthalten**"
          ]},

          { type: "h", text: "🎯 HAUPTZIEL" },
          { type: "p", text: "Gewinne, indem du mehr Allianz-Reliktpunkte sammelst als die gegnerische Allianz." },
          { type: "list", items: [
            "Wichtige Gebäude einnehmen und halten",
            "Angesammelte Punkte schützen",
            "Verstreute Beute sofort einsammeln, wenn Gebäude die Seiten wechseln",
            "Undercellars sammeln, wenn sie erscheinen",
            "Verstärke nahegelegene Garnisonen, wenn du nicht gerade eine Rally startest",
            "Lass Märsche nicht untätig herumstehen",
            "**JAGE KEINE Kills quer über die Karte.** Zufälliges PvP zerstreut uns und verringert unsere Effektivität. Greife Städte niedrigeren Levels an, wenn es sinnvoll ist; schwäche sie in der Nähe eines gehaltenen Gebäudes."
          ]},

          { type: "h", text: "🗺️ ZUGEWIESENE ZONEN" },
          { type: "p", text: "R4 wird bestätigte Mitglieder vor der Schlacht in Teams/Zonen aufteilen." },
          { type: "p", text: "Unsere **Stärksten Angreifer** werden zunächst einer Zone zugewiesen:" },
          { type: "list", items: [
            "🟣 **Lila — Glockenturm**",
            "🟡 **Gelb — Königliche Stallungen**",
            "🔵 **Blau — Westliches Sanktum**",
            "🟢 **Grün — Östliches Sanktum**"
          ]},
          { type: "p", text: "Verbleibende Mitglieder werden zugewiesen, eine dieser Zonen/Teams zu unterstützen. Rotation kann je nach Schlachtbedingungen erforderlich sein - überwache immer den Squad Chat für Details." },
          { type: "p", text: "Bleib bei deiner zugewiesenen Zone, es sei denn, die Führung sagt dir, dass du dich bewegen sollst." },

          { type: "h", text: "👥 ROLLEN & VERANTWORTLICHKEITEN" },
          { type: "p", text: "R4 wird bestätigte Mitglieder in 3 Funktionen aufteilen: **Angreifer, Verteidiger und Unterstützer/Joiner** basierend auf Stärke." },

          { type: "sub", text: "1) ⚔️ ANGREIFER" },
          { type: "p", text: "**Wer:** Unsere stärksten Spieler. Haben reichlich Fortgeschrittene Umsiedlungen." },
          { type: "p", text: "**Deine Aufgabe:**" },
          { type: "list", items: [
            "Teleportiere dich in deine zugewiesene Zone & dein Gebäude",
            "Erobere vorrangige Gebäude",
            "Greife verwundbare feindliche Burgen im Solo-Angriff an",
            "Führe wichtige Rallys an",
            "Bewege dich zum nächsten Ziel, sobald ein Verteidiger übernimmt",
            "Wenn Feinde in die Nähe deines zugewiesenen Gebäudes teleportieren, ziele auf schwächere oder ungeschützte Burgen"
          ]},

          { type: "sub", text: "2) 🛡️ VERTEIDIGER" },
          { type: "p", text: "**Wer:** Unsere nächststärksten Spieler mit guter Rally-/Garnisonskapazität." },
          { type: "p", text: "**Deine Aufgabe:**" },
          { type: "list", items: [
            "Folge deinen zugewiesenen Angreifern (Zone)",
            "Sobald ein Angreifer ein Gebäude erobert hat, übernimm die Garnisonen, rufe bei Bedarf Verstärkung",
            "Verstärke bedrohte Ziele",
            "Befreie Angreifer, damit sie sich zu ihrem nächsten Ziel bewegen können"
          ]},

          { type: "sub", text: "3) 🤝 UNTERSTÜTZER / JOINER" },
          { type: "p", text: "**Wer:** Im Allgemeinen Mitglieder mit geringerer Stärke und Rally-Joiner." },
          { type: "p", text: "**Deine Aufgabe:**" },
          { type: "list", items: [
            "Müssen den Rallys der zugewiesenen Verteidiger beitreten",
            "Verstärke eroberte Gebäude",
            "Führe Verstärkungen bei Aufforderung im Schnellmarsch aus.",
            "Operiere aus der **Safe Zone** heraus, wenn du nicht woanders gebraucht wirst oder weiter von der Reichweite des Feindes entfernt bist"
          ]},
          { type: "p", text: "**WICHTIG:**" },
          { type: "list", items: [
            "Wenn der Feind eines unserer eroberten Gebäude angreift und die Kontrolle zum Feind wechselt, **teleportiere in die Nähe oder führe sofort einen Schnellmarsch aus** und sammle die **verstreute Beute/Punkte, bevor sie es tun.**",
            "**20 Minuten nach Beginn der Schlacht**, Undercellars erscheinen. Sende verfügbare Truppen, um sie für zusätzliche Punkte zu sammeln.",
            "Lass Märsche nicht untätig."
          ]},

          { type: "h", text: "⏲️ VOR DER SCHLACHT" },
          { type: "list", items: [
            "Leere dein Lazarett. Halte alle Märsche verfügbar",
            "Rüste deine stärksten Helden/Ausrüstung aus",
            "Aktiviere Einsatzcapacity, Angriffs- & Verteidigungsbuffs und Gegenaufklärung",
            "Halte Fortgeschrittene Umsiedlungen bereit, falls deine Rolle sie erfordert",
            "Halte Discord nach Möglichkeit geöffnet (zur Referenz für Karte, Zuweisungen, optionaler VC)",
            "Überprüfe den Allianz-Chat und private Nachrichten"
          ]},
          { type: "callout", text: "⚠️ **WICHTIG:** Am Schlachttag erscheint ein neuer **Squad-Chat**-Tab. **Überwache den Squad-Chat während der gesamten Schlacht.**" },

          { type: "h", text: "⏱️ SCHLACHT-ZEITPLAN" },
          { type: "timeline", items: [
            { time: "0:00–15:00", title: "ERÖFFNUNG", groups: [
              { title: "Sofort sichern:", lines: ["**#4 Glockenturm**", "**#7 Königliche Stallungen**"] },
              { title: "Umkämpfen:", lines: ["**#8 Westliches Sanktum**", "**#10 Östliches Sanktum**"] },
              { title: "", lines: [
                "Nehmt Abteien, wenn es praktikabel ist, aber opfert dafür keine Kernziele.",
                "~ **14:30**, stärkste Spieler machen sich für das Zentrum bereit."
              ]}
            ]},
            { time: "15:00", title: "MACHTGEBÄUDE ÖFFNEN", lines: [
              "**#1 Schwertschrein**",
              "**#2 Söldnerlager**",
              "**#3 Halle der Reformation**",
              "Die Führung wird Prioritäten basierend auf den Schlachtbedingungen ansagen."
            ], groups: [
              { title: "⭐ SCHWERTSCHREIN", lines: [
                "Stärkste Angreifer/Verteidiger teleportieren sich zum Zentrum (nicht alle)",
                "Erobert den Schwertschrein",
                "Sobald gesichert, hält ein starker Verteidiger die Garnison",
                "Unterstützer/Joiner müssen im Schnellmarsch Verstärkung senden"
              ]}
            ], warn: "⚠️ Mitglieder in Garnison - verlasst euer Gebäude nicht für den Schwertschrein, es sei denn, die Führung rät dazu. Schützt weiterhin die Sanktums und andere wichtige Gebäude." },
            { time: "💪 15:00–45:00", title: "KONTROLLPHASE", lines: [
              "Hauptziel: **Haltet Schwertschrein + Westliches Sanktum + Östliches Sanktum.**",
              "Haltet nützliche Kontrolle über Glockenturm/Königliche Stallungen aufrecht",
              "Nutzt den Buff der Halle der Reformation für große Gefechte",
              "Nutzt das Söldnerlager, um feindliche Gebäude unter Druck zu setzen",
              "Sammelt verstreute Beute nach JEDEM Gebäudewechsel ein",
              "Verstärkt geschwächte Garnisonen"
            ]},
            { time: "⛏️ 20:00-60:00", title: "UNDERCELLARS", lines: [
              "Undercellars erscheinen.",
              "Unterstützer und alle mit verfügbaren Märschen sollten sie für zusätzliche Punkte sammeln.",
              "**Verlasst nicht eine kritische Verteidigung oder Rally, nur um zu sammeln.**"
            ]},
            { time: "🏁 LETZTE 15 MINUTEN", title: "", groups: [
              { title: "WENN WIR VORNE LIEGEN", lines: [
                "Schützt Schwertschrein und Sanktums",
                "Verstärkt Gebäude mit angesammelten Punkten",
                "Vermeidet unnötiges PvP",
                "Holt verstreute Beute sofort zurück",
                "Geht keine unnötigen Risiken ein"
              ]},
              { title: "WENN WIR HINTEN LIEGEN", lines: [
                "Setzt feindliche Kerngebäude unter Druck",
                "Nutzt das Söldnerlager vor koordinierten Angriffen",
                "Konzentriert Rallys, anstatt wahllos anzugreifen",
                "Zielt auf wertvolle feindliche Gebäude",
                "Sammelt jeden gefallenen Punkt nach einem erfolgreichen Wechsel ein"
              ]}
            ], warn: "**Letzte 5 Minuten: Ziele > zufällige Kills.**" }
          ]}
        ]
      },

      fr: {
        title: "Choc du Glaive",
        blocks: [
          { type: "h", text: "QUAND" },
          { type: "p", text: "Toutes les 2 semaines — bataille de 60 minutes, alliance contre alliance." },

          { type: "h", text: "INSCRIPTION" },
          { type: "callout", text: "⚠️ **Ne vous inscrivez que si vous comptez participer.** Un joueur inscrit qui ne se présente pas prend une place précieuse et peut fausser l'appariement." },
          { type: "list", items: ["**100 % disponible → Envoyer la demande de participation**", "**Pas sûr → S'abstenir**"] },

          { type: "h", text: "OBJECTIF PRINCIPAL" },
          { type: "p", text: "Remportez la victoire en obtenant plus de {allianceRelic} que l'alliance adverse." },
          { type: "list", items: [
            "Capturer et tenir les bâtiments importants",
            "Protéger les points accumulés",
            "Récupérer immédiatement les {arsenal} dispersées quand un bâtiment change de camp",
            "Récolter les {undercellar} dès qu'elles apparaissent",
            "Renforcer les garnisons proches quand vous ne participez pas à un ralliement",
            "Ne laisser aucune marche inactive",
            "**NE COUREZ PAS après les éliminations à travers la carte.** Le PvP désordonné nous disperse et réduit notre efficacité. Attaquez les villes de niveau inférieur quand cela a du sens, en affaiblissant celles proches d'un bâtiment tenu."
          ]},

          { type: "h", text: "APERÇU DES BÂTIMENTS" },
          { type: "buildings",
            legend: "Chiffres dans l'ordre : {allianceRelic} / {personalRelic}",
            cols: { first: "Premier Contrôle", hold: "Occupation en Cours", open: "Ouverture", min: "min", perMin: "/m", sep: " : " },
            priority: { top: "MAXIMALE", high: "HAUTE", med: "MOYENNE" },
            gather: "Sites de récolte qui apparaissent périodiquement (deux vagues)",
            purposes: {
              swordshrine: "Bâtiment qui rapporte le plus de points",
              mercenary: "Affaiblit les bâtiments tenus par l'ennemi",
              reformation: "Bonus de combat pour l'alliance",
              sanctum: "{allianceRelic} de grande valeur",
              abbey: "Génère des {allianceRelic}",
              stables: "-50 % d'intervalle entre les téléportations",
              belltower: "-50 % du temps nécessaire pour contrôler les bâtiments"
            }
          },

          { type: "h", text: "ZONES ASSIGNÉES" },
          { type: "p", text: "Les R4 répartiront les membres confirmés en équipes/zones avant la bataille." },
          { type: "p", text: "Nos **meilleurs attaquants** se verront d'abord attribuer une zone :" },
          { type: "list", items: [
            "🟣 **Violet — {belltower}**",
            "🟡 **Jaune — {stables}**",
            "🔵 **Bleu — {sanctumNW}**",
            "🟢 **Vert — {sanctumSE}**"
          ]},
          { type: "p", text: "Les autres membres seront affectés au soutien de l'une de ces zones/équipes. Une rotation peut être nécessaire selon la situation : surveillez toujours le chat d'escouade pour les détails." },
          { type: "p", text: "Restez dans votre zone assignée, sauf ordre contraire des officiers." },
          { type: "zones", labels: {
            purple: "🟣 Zone violette — {belltower} / {mercenary}",
            blue: "🔵 Zone bleue — {sanctumNW} / {abbey}",
            yellow: "🟡 Zone jaune — {stables} / {abbey}",
            green: "🟢 Zone verte — {sanctumSE} / {abbey}",
            center: "⚪ Centre"
          }},

          { type: "h", text: "RÔLES ET RESPONSABILITÉS" },
          { type: "p", text: "Les R4 répartiront les membres confirmés, selon leur puissance, en 3 fonctions : **attaquants, défenseurs et soutien/participants aux ralliements**." },

          { type: "sub", text: "⚔️ 1) ATTAQUANTS" },
          { type: "p", text: "**Qui :** nos joueurs les plus puissants, avec de nombreuses Relocalisations Avancées." },
          { type: "p", text: "**Votre mission :**" },
          { type: "list", items: [
            "Vous téléporter vers votre zone et votre bâtiment assignés",
            "Capturer les bâtiments prioritaires",
            "Attaquer en solo les châteaux ennemis vulnérables",
            "Mener les ralliements importants",
            "Passer à l'objectif suivant dès qu'un défenseur prend le relais",
            "Quand des ennemis se téléportent près de votre bâtiment assigné, viser les châteaux plus faibles ou exposés"
          ]},

          { type: "sub", text: "🛡️ 2) DÉFENSEURS" },
          { type: "p", text: "**Qui :** nos joueurs suivants les plus puissants, avec une bonne capacité de ralliement et de garnison." },
          { type: "p", text: "**Votre mission :**" },
          { type: "list", items: [
            "Suivre les attaquants qui vous sont assignés (zone)",
            "Une fois qu'un attaquant a capturé un bâtiment, prendre le relais de la garnison et demander des renforts si nécessaire",
            "Renforcer les objectifs menacés",
            "Libérer les attaquants pour qu'ils puissent passer à leur cible suivante"
          ]},

          { type: "sub", text: "🤝 3) SOUTIEN / PARTICIPANTS AUX RALLIEMENTS" },
          { type: "p", text: "**Qui :** en général les membres moins puissants et les participants aux ralliements." },
          { type: "p", text: "**Votre mission :**" },
          { type: "list", items: [
            "**Doivent** rejoindre les ralliements des défenseurs assignés",
            "Renforcer les bâtiments capturés",
            "Envoyer des renforts en marche accélérée sur demande",
            "Rester dans la **zone sûre** quand vous n'êtes pas nécessaire ailleurs, ou plus loin de la portée de l'ennemi"
          ]},
          { type: "callout", text: "**IMPORTANT :** si l'ennemi attaque l'un de nos bâtiments capturés et en prend le contrôle, **téléportez-vous à proximité ou lancez immédiatement une marche accélérée** pour récupérer les {arsenal} dispersées avant lui." },
          { type: "list", items: [
            "**20 minutes après le début de la bataille**, les {undercellar} apparaissent. Envoyez les troupes disponibles les récolter pour obtenir des points supplémentaires.",
            "Ne laissez aucune marche inactive."
          ]},

          { type: "h", text: "AVANT LA BATAILLE" },
          { type: "list", items: [
            "Videz votre infirmerie. Gardez toutes vos marches disponibles",
            "Équipez vos meilleurs héros et votre meilleur équipement",
            "Activez la capacité de troupes, les bonus d'attaque et de défense, et la Anti-repérage",
            "Gardez des Relocalisations Avancées si votre rôle l'exige",
            "Gardez Discord ouvert si possible (carte, affectations, vocal facultatif)",
            "Consultez le chat d'alliance et vos messages privés"
          ]},
          { type: "callout", text: "⚠️ **IMPORTANT :** un nouvel onglet **chat d'escouade** apparaît le jour de la bataille. **Surveillez-le pendant toute la bataille.**" },

          { type: "h", text: "CHRONOLOGIE DE LA BATAILLE" },
          { type: "timeline", items: [
            { time: "0:00–15:00", title: "OUVERTURE", groups: [
              { title: "À sécuriser immédiatement", lines: ["**#4 {belltower}**", "**#7 {stables}**"] },
              { title: "À disputer", lines: ["**#8 {sanctumNW}**", "**#10 {sanctumSE}**"] },
              { title: "", lines: [
                "Capturez les {abbey}s quand c'est réalisable, mais ne sacrifiez pas les objectifs principaux pour elles.",
                "**14:30**, les joueurs les plus forts se préparent pour le centre."
              ]}
            ]},
            { time: "15:00", title: "OUVERTURE DES BÂTIMENTS PUISSANTS", lines: [
              "**#1 {swordshrine}**, **#2 {mercenary}**, **#3 {reformation}**",
              "Les officiers annonceront les priorités selon la situation."
            ], groups: [
              { title: "⭐ {swordshrine}", lines: [
                "Les meilleurs attaquants/défenseurs se téléportent vers le centre (pas tous)",
                "Capturez le {swordshrine}",
                "Une fois sécurisé, un défenseur solide tient la garnison",
                "Le soutien et les participants doivent envoyer des renforts en marche accélérée"
              ]}
            ], warn: "⚠️ Membres en garnison : n'abandonnez pas votre bâtiment pour le {swordshrine}, sauf consigne des officiers. Continuez à protéger les {sanctum}s et les autres bâtiments importants." },
            { time: "15:00–45:00", title: "💪 PHASE DE CONTRÔLE", lines: [
              "Objectif principal : **tenir le {swordshrine} + le {sanctumNW} + le {sanctumSE}**",
              "Conserver un contrôle utile du {belltower} et des {stables}",
              "Utiliser le bonus de la {reformation} pour les grands affrontements",
              "Utiliser le {mercenary} pour mettre la pression sur les bâtiments ennemis",
              "Récupérer les {arsenal} dispersées après CHAQUE changement de camp d'un bâtiment",
              "Renforcer les garnisons affaiblies"
            ]},
            { time: "20:00–60:00", title: "⛏️ {undercellar}", lines: [
              "Les {undercellar} commencent à apparaître.",
              "Le soutien et tous ceux qui ont des marches disponibles doivent les récolter pour obtenir des points supplémentaires.",
              "**N'abandonnez pas une défense ou un ralliement critique juste pour récolter.**"
            ]},
            { time: "DERNIÈRES 15 MINUTES", title: "🏁 FINALE", groups: [
              { title: "SI NOUS SOMMES EN TÊTE", lines: ["Protégez le {swordshrine} et les {sanctum}s", "Renforcez les bâtiments qui accumulent des points", "Évitez le PvP inutile", "Récupérez immédiatement les {arsenal} dispersées", "Ne prenez aucun risque inutile"] },
              { title: "SI NOUS SOMMES DERRIÈRE", lines: ["Mettez la pression sur les bâtiments principaux ennemis", "Utilisez le {mercenary} avant les attaques coordonnées", "Concentrez les ralliements au lieu d'attaquer au hasard", "Visez les bâtiments de valeur tenus par l'ennemi", "Récupérez chaque point tombé après un changement de camp réussi"] }
            ], warn: "**5 dernières minutes : points > éliminations.**" }
          ]},

          { type: "h", text: "RÉSUMÉ" },
          { type: "p", text: "Les membres sont répartis en 3 fonctions et assignés à une zone :" },
          { type: "list", items: [
            "**ATTAQUANTS** → CAPTURER + PRESSER",
            "**DÉFENSEURS** → TENIR + PROTÉGER",
            "**SOUTIEN** → RENFORCER + RALLIER + RÉCUPÉRER + RÉCOLTER"
          ]},
          { type: "list", items: [
            "Suivez votre zone et votre rôle assignés.",
            "Surveillez le chat d'escouade.",
            "Objectifs > éliminations au hasard.",
            "Les attaquants capturent, les défenseurs tiennent, le soutien renforce.",
            "Ne laissez jamais de marches utiles inactives.",
            "Récupérez immédiatement les {arsenal} dispersées.",
            "Récoltez les {undercellar} avec les marches disponibles.",
            "Protégez le {swordshrine} + les {sanctum}s.",
            "N'abandonnez pas les bâtiments principaux pour les {abbey}s ou les éliminations.",
            "Si les officiers ordonnent une rotation, BOUGEZ."
          ]},
          { type: "callout", text: "⚔️ **LA COORDINATION, CLÉ DE LA VICTOIRE AUX {swordland}**" }
        ]
      },

      tr: {
        title: "Kılıçdiyarı Hesaplaşması",
        blocks: [
          { type: "h", text: "NE ZAMAN" },
          { type: "p", text: "2 haftada bir — 60 dakikalık, ittifaka karşı ittifak savaş alanı etkinliği." },

          { type: "h", text: "KAYIT" },
          { type: "callout", text: "⚠️ **Yalnızca katılmayı planlıyorsan kaydol.** Kayıt olup gelmeyen oyuncular değerli bir yer kaplar ve eşleşmeyi etkileyebilir." },
          { type: "list", items: ["**%100 katılabilirsen → Savaş Başvurusu Gönder**", "**Emin değilsen → Çekimser Kal**"] },

          { type: "h", text: "ANA HEDEF" },
          { type: "p", text: "Rakip ittifaktan daha fazla {allianceRelic} kazanarak zafer elde et." },
          { type: "list", items: [
            "Önemli binaları ele geçirmek ve elde tutmak",
            "Biriken puanları korumak",
            "Bir bina el değiştirdiği anda etrafa saçılan {arsenal}'ni hemen toplamak",
            "{undercellar} belirdiğinde onları toplamak",
            "Seferberlikte değilken yakındaki garnizonlara takviye göndermek",
            "Birlik intikallerini boşta bırakmamak",
            "**Haritada ölüm avlamak için koşturma.** Rastgele PvP bizi dağıtır ve etkinliğimizi düşürür. Mantıklı olduğunda düşük seviyeli şehirlere saldır; bunları elde tutulan bir binanın yakınında zayıflat."
          ]},

          { type: "h", text: "BİNALARA GENEL BAKIŞ" },
          { type: "buildings",
            legend: "Sayılar sırasıyla: {allianceRelic} / {personalRelic}",
            cols: { first: "İlk Kontrol", hold: "Süren İşgal", open: "Açılış", min: "dk", perMin: "/dk", sep: ": " },
            priority: { top: "EN YÜKSEK", high: "YÜKSEK", med: "ORTA" },
            gather: "Periyodik olarak beliren toplama noktaları (iki dalga)",
            purposes: {
              swordshrine: "En yüksek puan değerine sahip bina",
              mercenary: "Düşmanın elindeki binaları zayıflatır",
              reformation: "İttifak savaş bonusu",
              sanctum: "Yüksek değerli {allianceRelic}",
              abbey: "{allianceRelic} üretir",
              stables: "Işınlanmalar arasındaki süre -%50",
              belltower: "Binaları kontrol etme süresi -%50"
            }
          },

          { type: "h", text: "ATANAN BÖLGELER" },
          { type: "p", text: "R4, savaştan önce onaylı üyeleri takımlara/bölgelere ayıracak." },
          { type: "p", text: "En **güçlü Hücumcularımız** önce bir bölgeye atanacak:" },
          { type: "list", items: [
            "🟣 **Mor — {belltower}**",
            "🟡 **Sarı — {stables}**",
            "🔵 **Mavi — {sanctumNW}**",
            "🟢 **Yeşil — {sanctumSE}**"
          ]},
          { type: "p", text: "Kalan üyeler bu bölgelerden/takımlardan birini desteklemek üzere atanacak. Savaş koşullarına göre rotasyon gerekebilir; ayrıntılar için her zaman Ekip Sohbeti'ni takip et." },
          { type: "p", text: "Yönetim başka yere geçmeni söylemedikçe atandığın bölgede kal." },
          { type: "zones", labels: {
            purple: "🟣 Mor Bölge — {belltower} / {mercenary}",
            blue: "🔵 Mavi Bölge — {sanctumNW} / {abbey}",
            yellow: "🟡 Sarı Bölge — {stables} / {abbey}",
            green: "🟢 Yeşil Bölge — {sanctumSE} / {abbey}",
            center: "⚪ Merkez"
          }},

          { type: "h", text: "ROLLER VE SORUMLULUKLAR" },
          { type: "p", text: "R4, onaylı üyeleri güce göre 3 göreve ayıracak: **Hücumcular, Savunucular ve Destek/Katılımcılar**." },

          { type: "sub", text: "⚔️ 1) HÜCUMCULAR" },
          { type: "p", text: "**Kimler:** En güçlü oyuncularımız. Yeterince Gelişmiş Işınlayıcı'ya sahip olanlar." },
          { type: "p", text: "**Görevin:**" },
          { type: "list", items: [
            "Atandığın bölgeye ve binaya ışınlanmak",
            "Öncelikli binaları ele geçirmek",
            "Savunmasız düşman şehirlerine tek başına saldırmak",
            "Önemli seferberlikleri yönetmek",
            "Bir Savunucu devraldığında sonraki hedefe geçmek",
            "Düşmanlar atandığın binanın yakınına ışınlandığında daha zayıf veya açıkta kalan şehirleri hedef almak"
          ]},

          { type: "sub", text: "🛡️ 2) SAVUNUCULAR" },
          { type: "p", text: "**Kimler:** Sonraki en güçlü oyuncular; iyi seferberlik/garnizon kapasitesine sahip olanlar." },
          { type: "p", text: "**Görevin:**" },
          { type: "list", items: [
            "Atandığın Hücumcuları (bölgeyi) takip etmek",
            "Hücumcu bir binayı ele geçirdiğinde garnizonu devralmak ve gerekirse takviye çağırmak",
            "Tehdit altındaki hedeflere takviye yapmak",
            "Hücumcuların sonraki hedeflerine geçebilmesi için onları serbest bırakmak"
          ]},

          { type: "sub", text: "🤝 3) DESTEK / KATILIMCILAR" },
          { type: "p", text: "**Kimler:** Genellikle gücü daha düşük üyeler ve seferberliklere katılanlar." },
          { type: "p", text: "**Görevin:**" },
          { type: "list", items: [
            "Atanan Savunucuların seferberliklerine **mutlaka** katılmak",
            "Ele geçirilen binalara takviye yapmak",
            "İstendiğinde hızlı yürüyüşle takviye göndermek",
            "Başka yerde ihtiyaç olmadığında veya düşmanın menzilinden uzakken **Güvenli Bölge**'de beklemek"
          ]},
          { type: "callout", text: "**ÖNEMLİ:** Düşman ele geçirdiğimiz binalardan birine saldırıp kontrol düşmana geçerse, **hemen yakına ışınlan veya hızlı yürüyüşle git** ve saçılan {arsenal}'ni onlardan önce topla." },
          { type: "list", items: [
            "**Savaşın 20. dakikasında** {undercellar} belirir. Boştaki birlikleri göndererek onları ek puan için topla.",
            "Birlik intikallerini boşta bırakma."
          ]},

          { type: "h", text: "SAVAŞ ÖNCESİ" },
          { type: "list", items: [
            "Revirini boşalt. Tüm intikallerini kullanılabilir tut",
            "En güçlü kahramanlarını ve donanımını kuşan",
            "Birlik Kapasitesi'ni, saldırı ve savunma bonuslarını ve Gözetleme Önleyen'i etkinleştir",
            "Görevin gerektiriyorsa Gelişmiş Işınlayıcılarını hazır tut",
            "Mümkünse Discord'u açık tut (harita ve atamalar için; sesli kanal isteğe bağlı)",
            "İttifak sohbetini ve özel mesajları kontrol et"
          ]},
          { type: "callout", text: "⚠️ **ÖNEMLİ:** Savaş günü yeni bir **Ekip Sohbeti** sekmesi belirir. **Savaş boyunca Ekip Sohbeti'ni takip et.**" },

          { type: "h", text: "SAVAŞ ZAMAN ÇİZELGESİ" },
          { type: "timeline", items: [
            { time: "0:00–15:00", title: "AÇILIŞ", groups: [
              { title: "Hemen ele geçir", lines: ["**#4 {belltower}**", "**#7 {stables}**"] },
              { title: "Mücadele et", lines: ["**#8 {sanctumNW}**", "**#10 {sanctumSE}**"] },
              { title: "", lines: [
                "Uygun olduğunda {abbey}lar da alınabilir, ancak bunlar için ana hedeflerden vazgeçme.",
                "**14:30**'da en güçlü oyuncular merkez için hazırlanır."
              ]}
            ]},
            { time: "15:00", title: "GÜÇLÜ BİNALAR AÇILIR", lines: [
              "**#1 {swordshrine}**, **#2 {mercenary}**, **#3 {reformation}**",
              "Yönetim, savaş durumuna göre öncelikleri bildirecek."
            ], groups: [
              { title: "⭐ {swordshrine}", lines: [
                "En güçlü Hücumcular/Savunucular merkeze ışınlanır (hepsi değil)",
                "{swordshrine} ele geçirilir",
                "Ele geçirildikten sonra güçlü bir Savunucu garnizonu tutar",
                "Destek/Katılımcılar hızlı yürüyüşle takviye göndermelidir"
              ]}
            ], warn: "⚠️ Garnizondaki üyeler: Yönetim önermedikçe binanızı {swordshrine} için terk etmeyin. {sanctum}ları ve diğer önemli binaları korumaya devam edin." },
            { time: "15:00–45:00", title: "💪 KONTROL AŞAMASI", lines: [
              "Ana hedef: **{swordshrine} + {sanctumNW} + {sanctumSE} elde tutulacak.**",
              "{belltower} ve {stables} üzerindeki faydalı kontrolü sürdür",
              "Büyük çatışmalarda {reformation}'nun bonusundan yararlan",
              "Düşman binalarına baskı kurmak için {mercenary}'ndan yararlan",
              "HER bina el değiştirdiğinde saçılan {arsenal}'ni topla",
              "Zayıflayan garnizonlara takviye yap"
            ]},
            { time: "20:00–60:00", title: "⛏️ {undercellar}", lines: [
              "{undercellar} belirmeye başlar.",
              "Destek oyuncuları ve boşta intikali olan herkes ek puan için onları toplamalı.",
              "**Sırf toplamak için kritik bir savunmayı veya seferberliği bırakma.**"
            ]},
            { time: "SON 15 DAKİKA", title: "🏁 FİNAL", groups: [
              { title: "ÖNDEYSEK", lines: ["{swordshrine}'nı ve {sanctum}ları koru", "Puan biriktiren binalara takviye yap", "Gereksiz PvP'den kaçın", "Saçılan {arsenal}'ni hemen geri topla", "Gereksiz risk alma"] },
              { title: "GERİDEYSEK", lines: ["Düşmanın ana binalarına baskı kur", "Koordineli saldırılardan önce {mercenary}'ndan yararlan", "Rastgele saldırmak yerine seferberliklere odaklan", "Düşmanın elindeki değerli binaları hedef al", "Başarılı bir el değiştirmeden sonra düşen tüm puanları topla"] }
            ], warn: "**Son 5 dakika: Puanlar > ölümler.**" }
          ]},

          { type: "h", text: "ÖZET" },
          { type: "p", text: "Üyeler 3 göreve ayrılır ve bir bölgeye atanır:" },
          { type: "list", items: [
            "**HÜCUMCULAR** → ELE GEÇİR + BASKI KUR",
            "**SAVUNUCULAR** → TUT + KORU",
            "**DESTEK** → TAKVİYE + SEFERBERLİK + {arsenal} + {undercellar}"
          ]},
          { type: "list", items: [
            "Atandığın bölgeyi ve görevi takip et.",
            "Ekip Sohbeti'ni takip et.",
            "Hedefler > rastgele ölümler.",
            "Hücumcular ele geçirir — Savunucular tutar — Destek takviye eder.",
            "Faydalı intikalleri asla boşta bırakma.",
            "Saçılan {arsenal}'ni hemen topla.",
            "Boştaki birliklerle {undercellar}'i topla.",
            "{swordshrine}'nı ve {sanctum}ları koru.",
            "{abbey}lar veya ölümler uğruna ana binaları terk etme.",
            "Yönetim rotasyon çağırırsa HEMEN HAREKET ET."
          ]},
          { type: "callout", text: "⚔️ **KOORDİNASYON, {swordland}'nda ZAFERİN ANAHTARIDIR**" }
        ]
      },

      id: {
        title: "Swordland Showdown",
        blocks: [
          { type: "h", text: "KAPAN" },
          { type: "p", text: "Setiap 2 minggu — event medan perang aliansi lawan aliansi selama 60 menit." },

          { type: "h", text: "PENDAFTARAN" },
          { type: "callout", text: "⚠️ **Daftar hanya jika kamu berencana hadir.** Pemain terdaftar yang tidak hadir akan mengambil slot berharga dan bisa memengaruhi matchmaking." },
          { type: "list", items: ["**100% bisa hadir → Kirim Permintaan Pertempuran**", "**Belum yakin → Tidak Ikut**"] },

          { type: "h", text: "TUJUAN UTAMA" },
          { type: "p", text: "Menangkan pertempuran dengan mengumpulkan lebih banyak {allianceRelic} daripada aliansi lawan." },
          { type: "list", items: [
            "Kuasai dan pertahankan bangunan penting",
            "Lindungi poin yang sudah terkumpul",
            "Kumpulkan {arsenal} yang berserakan segera setelah bangunan berpindah tangan",
            "Kumpulkan {undercellar} saat muncul",
            "Perkuat garnisun terdekat saat tidak sedang reli",
            "Jangan biarkan march menganggur",
            "**JANGAN mengejar kill ke seluruh peta.** PvP acak membuat kita tersebar dan mengurangi efektivitas. Serang kota level lebih rendah bila masuk akal, lemahkan mereka di dekat bangunan yang sedang dikuasai."
          ]},

          { type: "h", text: "RINGKASAN BANGUNAN" },
          { type: "buildings",
            legend: "Urutan angka: {allianceRelic} / {personalRelic}",
            cols: { first: "Penguasaan Pertama", hold: "Pendudukan Berlangsung", open: "Dibuka", min: "menit", perMin: "/m", sep: ": " },
            priority: { top: "TERTINGGI", high: "TINGGI", med: "SEDANG" },
            gather: "Lokasi pengumpulan yang muncul secara berkala (dua gelombang)",
            purposes: {
              swordshrine: "Bangunan dengan nilai poin tertinggi",
              mercenary: "Melemahkan bangunan yang dikuasai musuh",
              reformation: "Buff tempur aliansi",
              sanctum: "{allianceRelic} bernilai tinggi",
              abbey: "Menghasilkan {allianceRelic}",
              stables: "-50% interval teleportasi",
              belltower: "-50% waktu yang diperlukan untuk menguasai bangunan"
            }
          },

          { type: "h", text: "ZONA YANG DITUGASKAN" },
          { type: "p", text: "R4 akan membagi anggota yang terkonfirmasi ke dalam tim/zona sebelum pertempuran." },
          { type: "p", text: "**Penyerbu terkuat** kita akan lebih dulu ditugaskan ke satu zona:" },
          { type: "list", items: [
            "🟣 **Ungu — {belltower}**",
            "🟡 **Kuning — {stables}**",
            "🔵 **Biru — {sanctumNW}**",
            "🟢 **Hijau — {sanctumSE}**"
          ]},
          { type: "p", text: "Anggota lainnya akan ditugaskan untuk mendukung salah satu zona/tim ini. Rotasi mungkin diperlukan sesuai kondisi pertempuran — selalu pantau Chat Skuad untuk detailnya." },
          { type: "p", text: "Tetap di zona yang ditugaskan kecuali pimpinan menyuruhmu berpindah." },
          { type: "zones", labels: {
            purple: "🟣 Zona Ungu — {belltower} / {mercenary}",
            blue: "🔵 Zona Biru — {sanctumNW} / {abbey}",
            yellow: "🟡 Zona Kuning — {stables} / {abbey}",
            green: "🟢 Zona Hijau — {sanctumSE} / {abbey}",
            center: "⚪ Tengah"
          }},

          { type: "h", text: "PERAN DAN TANGGUNG JAWAB" },
          { type: "p", text: "R4 akan membagi anggota yang terkonfirmasi ke dalam 3 fungsi berdasarkan kekuatan: **Penyerbu, Pembela, dan Pendukung/Joiner**." },

          { type: "sub", text: "⚔️ 1) PENYERBU" },
          { type: "p", text: "**Siapa:** Pemain terkuat kita. Punya banyak Teleporter Lanjutan." },
          { type: "p", text: "**Tugasmu:**" },
          { type: "list", items: [
            "Teleportasi ke zona dan bangunan yang ditugaskan",
            "Kuasai bangunan prioritas",
            "Serang kastil musuh yang rentan secara solo",
            "Pimpin reli penting",
            "Pindah ke target berikutnya setelah Pembela mengambil alih",
            "Saat musuh teleportasi ke dekat bangunanmu, incar kastil yang lebih lemah atau terbuka"
          ]},

          { type: "sub", text: "🛡️ 2) PEMBELA" },
          { type: "p", text: "**Siapa:** Pemain terkuat berikutnya dengan kapasitas reli/garnisun yang baik." },
          { type: "p", text: "**Tugasmu:**" },
          { type: "list", items: [
            "Ikuti Penyerbu yang ditugaskan (zona)",
            "Setelah Penyerbu menguasai bangunan, ambil alih garnisun dan minta bala bantuan jika perlu",
            "Perkuat target yang terancam",
            "Bebaskan Penyerbu agar bisa pindah ke target berikutnya"
          ]},

          { type: "sub", text: "🤝 3) PENDUKUNG / JOINER" },
          { type: "p", text: "**Siapa:** Umumnya anggota dengan kekuatan lebih rendah dan joiner reli." },
          { type: "p", text: "**Tugasmu:**" },
          { type: "list", items: [
            "**Wajib** bergabung ke reli Pembela yang ditugaskan",
            "Perkuat bangunan yang sudah dikuasai",
            "Kirim bala bantuan dengan march cepat saat diminta",
            "Beroperasi dari **Zona Aman** saat tidak dibutuhkan di tempat lain atau lebih jauh dari jangkauan musuh"
          ]},
          { type: "callout", text: "**PENTING:** Jika musuh menyerang salah satu bangunan yang kita kuasai dan kontrol berpindah ke musuh, **segera teleportasi ke dekat sana atau lakukan march cepat** dan kumpulkan {arsenal} yang berserakan sebelum mereka." },
          { type: "list", items: [
            "**20 menit setelah pertempuran dimulai**, {undercellar} muncul. Kirim pasukan yang tersedia untuk mengumpulkannya demi poin tambahan.",
            "Jangan biarkan march menganggur."
          ]},

          { type: "h", text: "SEBELUM PERTEMPURAN" },
          { type: "list", items: [
            "Kosongkan Rumah Sakit. Pastikan semua march tersedia",
            "Pakai hero dan gear terkuatmu",
            "Aktifkan Kapasitas Pasukan, buff Serangan & Pertahanan, dan Kontra-pengintaian",
            "Siapkan Teleporter Lanjutan jika perananmu membutuhkannya",
            "Biarkan Discord terbuka jika memungkinkan (untuk referensi peta, penugasan, VC opsional)",
            "Periksa Chat Aliansi dan Pesan Pribadi"
          ]},
          { type: "callout", text: "⚠️ **PENTING:** Tab **Chat Skuad** baru akan muncul pada hari pertempuran. **Pantau Chat Skuad selama seluruh pertempuran.**" },

          { type: "h", text: "LINI MASA PERTEMPURAN" },
          { type: "timeline", items: [
            { time: "0:00–15:00", title: "PEMBUKAAN", groups: [
              { title: "Segera amankan", lines: ["**#4 {belltower}**", "**#7 {stables}**"] },
              { title: "Perebutkan", lines: ["**#8 {sanctumNW}**", "**#10 {sanctumSE}**"] },
              { title: "", lines: [
                "Ambil {abbey} jika memungkinkan, tetapi jangan korbankan target inti demi itu.",
                "**14:30**, pemain terkuat bersiap menuju tengah."
              ]}
            ]},
            { time: "15:00", title: "BANGUNAN KUAT DIBUKA", lines: [
              "**#1 {swordshrine}**, **#2 {mercenary}**, **#3 {reformation}**",
              "Pimpinan akan menentukan prioritas sesuai kondisi pertempuran."
            ], groups: [
              { title: "⭐ {swordshrine}", lines: [
                "Penyerbu/Pembela terkuat teleportasi ke tengah (tidak semuanya)",
                "Kuasai {swordshrine}",
                "Setelah aman, satu Pembela kuat menjaga garnisun",
                "Pendukung/Joiner harus march cepat dan mengirim bala bantuan"
              ]}
            ], warn: "⚠️ Anggota yang menjaga garnisun: jangan tinggalkan bangunanmu demi {swordshrine} kecuali pimpinan menyarankan. Terus lindungi {sanctum} dan bangunan penting lainnya." },
            { time: "15:00–45:00", title: "💪 FASE KONTROL", lines: [
              "Tujuan utama: **Pertahankan {swordshrine} + {sanctumNW} + {sanctumSE}**",
              "Jaga kontrol yang berguna atas {belltower}/{stables}",
              "Gunakan buff {reformation} untuk pertempuran besar",
              "Gunakan {mercenary} untuk menekan bangunan musuh",
              "Kumpulkan {arsenal} yang berserakan setelah SETIAP perpindahan bangunan",
              "Perkuat garnisun yang melemah"
            ]},
            { time: "20:00–60:00", title: "⛏️ {undercellar}", lines: [
              "{undercellar} mulai muncul.",
              "Pemain pendukung dan siapa pun yang punya march tersedia sebaiknya mengumpulkannya demi poin tambahan.",
              "**Jangan tinggalkan pertahanan atau reli penting hanya untuk mengumpulkan.**"
            ]},
            { time: "15 MENIT TERAKHIR", title: "🏁 PENUTUP", groups: [
              { title: "JIKA KITA UNGGUL", lines: ["Lindungi {swordshrine} dan {sanctum}", "Perkuat bangunan penghasil poin", "Hindari PvP yang tidak perlu", "Segera ambil kembali {arsenal} yang berserakan", "Jangan mengambil risiko yang tidak perlu"] },
              { title: "JIKA KITA TERTINGGAL", lines: ["Tekan bangunan inti musuh", "Gunakan {mercenary} sebelum serangan terkoordinasi", "Pusatkan reli alih-alih menyerang secara acak", "Incar bangunan bernilai tinggi yang dikuasai musuh", "Kumpulkan semua poin yang jatuh setelah perpindahan yang berhasil"] }
            ], warn: "**5 menit terakhir: Poin > kill.**" }
          ]},

          { type: "h", text: "RINGKASAN" },
          { type: "p", text: "Anggota dibagi ke dalam 3 fungsi dan ditugaskan ke zona:" },
          { type: "list", items: [
            "**PENYERBU** → KUASAI + TEKAN",
            "**PEMBELA** → PERTAHANKAN + LINDUNGI",
            "**PENDUKUNG** → PERKUAT + RALLY + {arsenal} + {undercellar}"
          ]},
          { type: "list", items: [
            "Ikuti zona dan peran yang ditugaskan.",
            "Pantau Chat Skuad.",
            "Target > kill acak.",
            "Penyerbu menguasai — Pembela bertahan — Pendukung memperkuat.",
            "Jangan biarkan march yang berguna menganggur.",
            "Segera kumpulkan {arsenal} yang berserakan.",
            "Kumpulkan {undercellar} dengan march yang tersedia.",
            "Lindungi {swordshrine} + {sanctum}.",
            "Jangan tinggalkan bangunan inti demi {abbey} atau kill.",
            "Jika pimpinan memanggil rotasi, BERGERAK."
          ]},
          { type: "callout", text: "⚔️ **KOORDINASI MEMENANGKAN {swordland}**" }
        ]
      },

      ru: {
        title: "Битва за Страну мечей",
        blocks: [
          { type: "h", text: "КОГДА" },
          { type: "p", text: "Раз в 2 недели — 60-минутная битва альянса против альянса." },

          { type: "h", text: "РЕГИСТРАЦИЯ" },
          { type: "callout", text: "⚠️ **Регистрируйтесь, только если планируете участвовать.** Зарегистрированные игроки, которые не пришли, занимают ценное место и могут повлиять на подбор соперников." },
          { type: "list", items: ["**100% могу участвовать → подать заявку на битву**", "**Не уверен → воздержаться**"] },

          { type: "h", text: "ГЛАВНАЯ ЦЕЛЬ" },
          { type: "p", text: "Победите, набрав больше {allianceRelicG}, чем альянс противника." },
          { type: "list", items: [
            "Захватывать важные здания и удерживать их",
            "Защищать накопленные очки",
            "Немедленно собирать разбросанные {arsenal}, когда здание переходит к другой стороне",
            "Собирать {undercellar}, когда они появляются",
            "Усиливать ближайшие гарнизоны, когда вы не участвуете в рейде",
            "Не оставлять марши без дела",
            "**НЕ гоняйтесь за убийствами по всей карте.** Случайные PvP-стычки распыляют наши силы и снижают эффективность. Атакуйте города более низкого уровня, когда это разумно, ослабляя их рядом с удерживаемым зданием."
          ]},

          { type: "h", text: "ОБЗОР ЗДАНИЙ" },
          { type: "buildings",
            legend: "Числа по порядку: {allianceRelic} / {personalRelic}",
            cols: { first: "Захват (1)", hold: "Длит. удерж.", open: "Открытие", min: "мин.", perMin: "/мин.", sep: ": " },
            priority: { top: "МАКСИМАЛЬНЫЙ", high: "ВЫСОКИЙ", med: "СРЕДНИЙ" },
            gather: "Места сбора, которые периодически появляются (две волны)",
            purposes: {
              swordshrine: "Здание с самой высокой ценностью очков",
              mercenary: "Ослабляет здания, удерживаемые врагом",
              reformation: "Боевые усиления альянса",
              sanctum: "Ценные {allianceRelic}",
              abbey: "Приносит {allianceRelic}",
              stables: "-50% времени перезарядки телепорта",
              belltower: "-50% времени захвата зданий"
            }
          },

          { type: "h", text: "НАЗНАЧЕННЫЕ ЗОНЫ" },
          { type: "p", text: "Офицеры R4 перед битвой разделят подтвержденных участников на команды/зоны." },
          { type: "p", text: "Наши **сильнейшие атакующие** сначала будут назначены в одну из зон:" },
          { type: "list", items: [
            "🟣 **Фиолетовая — {belltower}**",
            "🟡 **Жёлтая — {stables}**",
            "🔵 **Синяя — {sanctumNW}**",
            "🟢 **Зелёная — {sanctumSE}**"
          ]},
          { type: "p", text: "Остальные участники будут назначены поддерживать одну из этих зон/команд. В зависимости от ситуации может потребоваться ротация — всегда следите за чатом отряда." },
          { type: "p", text: "Оставайтесь в назначенной зоне, если офицеры не скажут перемещаться." },
          { type: "zones", labels: {
            purple: "🟣 Фиолетовая зона — {belltower} / {mercenary}",
            blue: "🔵 Синяя зона — {sanctumNW} / {abbey}",
            yellow: "🟡 Жёлтая зона — {stables} / {abbey}",
            green: "🟢 Зелёная зона — {sanctumSE} / {abbey}",
            center: "⚪ Центр"
          }},

          { type: "h", text: "РОЛИ И ОБЯЗАННОСТИ" },
          { type: "p", text: "R4 разделит подтвержденных участников по силе на 3 функции: **атакующие, защитники и поддержка/присоединяющиеся**." },

          { type: "sub", text: "⚔️ 1) АТАКУЮЩИЕ" },
          { type: "p", text: "**Кто:** наши сильнейшие игроки. Имеют много продвинутых телепортов." },
          { type: "p", text: "**Ваша задача:**" },
          { type: "list", items: [
            "Телепортироваться в назначенную зону и к назначенному зданию",
            "Захватывать приоритетные здания",
            "В одиночку атаковать уязвимые вражеские замки",
            "Возглавлять важные рейды",
            "Переходить к следующей цели, как только защитник принимает здание",
            "Когда враги телепортируются рядом с вашим зданием, атаковать более слабые или открытые замки"
          ]},

          { type: "sub", text: "🛡️ 2) ЗАЩИТНИКИ" },
          { type: "p", text: "**Кто:** следующие по силе игроки с хорошей вместимостью для рейдов и гарнизона." },
          { type: "p", text: "**Ваша задача:**" },
          { type: "list", items: [
            "Следовать за назначенными атакующими (зона)",
            "Когда атакующий захватил здание, принять гарнизон и при необходимости звать подкрепление",
            "Усиливать находящиеся под угрозой цели",
            "Освобождать атакующих, чтобы они могли идти к следующей цели"
          ]},

          { type: "sub", text: "🤝 3) ПОДДЕРЖКА / ПРИСОЕДИНЯЮЩИЕСЯ" },
          { type: "p", text: "**Кто:** как правило, участники с меньшей силой и те, кто присоединяется к рейдам." },
          { type: "p", text: "**Ваша задача:**" },
          { type: "list", items: [
            "**Обязательно** присоединяться к рейдам назначенных защитников",
            "Усиливать захваченные здания",
            "По запросу отправлять подкрепление ускоренным маршем",
            "Находиться в **безопасной зоне**, когда вы не нужны в другом месте или находитесь дальше от досягаемости врага"
          ]},
          { type: "callout", text: "**ВАЖНО:** если враг атакует одно из захваченных нами зданий и контроль переходит к нему, **немедленно телепортируйтесь рядом или отправьте ускоренный марш** и соберите разбросанные {arsenal} раньше врага." },
          { type: "list", items: [
            "**Через 20 минут после начала битвы** появляются {undercellar}. Отправьте свободные войска собирать их ради дополнительных очков.",
            "Не оставляйте марши без дела."
          ]},

          { type: "h", text: "ПЕРЕД БИТВОЙ" },
          { type: "list", items: [
            "Освободите лазарет. Держите все марши доступными",
            "Экипируйте самых сильных героев и снаряжение",
            "Активируйте вместимость войска, усиления атаки и защиты и контрразведку",
            "Держите продвинутые телепорты наготове, если этого требует ваша роль",
            "По возможности держите Discord открытым (карта, назначения, голосовой чат по желанию)",
            "Проверьте чат альянса и личные сообщения"
          ]},
          { type: "callout", text: "⚠️ **ВАЖНО:** в день битвы появится новая вкладка **чата отряда**. **Следите за чатом отряда на протяжении всей битвы.**" },

          { type: "h", text: "ХРОНОЛОГИЯ БИТВЫ" },
          { type: "timeline", items: [
            { time: "0:00–15:00", title: "ОТКРЫТИЕ", groups: [
              { title: "Немедленно захватить", lines: ["**#4 {belltower}**", "**#7 {stables}**"] },
              { title: "Бороться за", lines: ["**#8 {sanctumNW}**", "**#10 {sanctumSE}**"] },
              { title: "", lines: [
                "Захватывайте {abbeyPl}, когда это удобно, но не жертвуйте ради них основными целями.",
                "**14:30** — сильнейшие игроки готовятся к центру."
              ]}
            ]},
            { time: "15:00", title: "ОТКРЫВАЮТСЯ СИЛЬНЫЕ ЗДАНИЯ", lines: [
              "**#1 {swordshrine}**, **#2 {mercenary}**, **#3 {reformation}**",
              "Офицеры объявят приоритеты в зависимости от ситуации."
            ], groups: [
              { title: "⭐ {swordshrine}", lines: [
                "Сильнейшие атакующие/защитники телепортируются к центру (не все)",
                "Захватите {swordshrine}",
                "После захвата сильный защитник удерживает гарнизон",
                "Поддержка/присоединяющиеся должны ускоренным маршем отправлять подкрепление"
              ]}
            ], warn: "⚠️ Участники в гарнизоне: не покидайте свое здание ради {swordshrineG}, если офицеры не скажут иначе. Продолжайте защищать {sanctumPl} и другие важные здания." },
            { time: "15:00–45:00", title: "💪 ФАЗА КОНТРОЛЯ", lines: [
              "Главная цель: **удерживать {swordshrine} + {sanctumNW} + {sanctumSE}**",
              "Сохранять полезный контроль: {belltower} / {stables}",
              "Использовать бонус {reformationG} в крупных столкновениях",
              "Использовать {mercenary}, чтобы давить на вражеские здания",
              "Собирать разбросанные {arsenal} после КАЖДОЙ смены владельца здания",
              "Усиливать ослабленные гарнизоны"
            ]},
            { time: "20:00–60:00", title: "⛏️ {undercellar}", lines: [
              "Начинают появляться {undercellar}.",
              "Игроки поддержки и все, у кого есть свободные марши, должны собирать их ради дополнительных очков.",
              "**Не бросайте критически важную оборону или рейд только ради того, чтобы собирать.**"
            ]},
            { time: "ПОСЛЕДНИЕ 15 МИНУТ", title: "🏁 ФИНАЛ", groups: [
              { title: "ЕСЛИ МЫ ВПЕРЕДИ", lines: ["Защищайте {swordshrine} и {sanctumPl}", "Усиливайте здания, накапливающие очки", "Избегайте лишнего PvP", "Сразу возвращайте разбросанные {arsenal}", "Не рискуйте без необходимости"] },
              { title: "ЕСЛИ МЫ ПОЗАДИ", lines: ["Давите на основные здания врага", "Используйте {mercenary} перед скоординированными атаками", "Концентрируйте рейды вместо беспорядочных атак", "Нацельтесь на ценные здания, удерживаемые врагом", "Собирайте каждое упавшее очко после успешной смены владельца"] }
            ], warn: "**Последние 5 минут: очки > убийства.**" }
          ]},

          { type: "h", text: "ИТОГ" },
          { type: "p", text: "Участники делятся на 3 функции и получают зону:" },
          { type: "list", items: [
            "**АТАКУЮЩИЕ** → ЗАХВАТ + ДАВЛЕНИЕ",
            "**ЗАЩИТНИКИ** → УДЕРЖАНИЕ + ЗАЩИТА",
            "**ПОДДЕРЖКА** → ПОДКРЕПЛЕНИЕ + РЕЙД + {arsenal} + {undercellar}"
          ]},
          { type: "list", items: [
            "Следуйте назначенной зоне и роли.",
            "Следите за чатом отряда.",
            "Цели > случайные убийства.",
            "Атакующие захватывают — защитники удерживают — поддержка усиливает.",
            "Никогда не оставляйте полезные марши без дела.",
            "Сразу собирайте разбросанные {arsenal}.",
            "Собирайте {undercellar} свободными маршами.",
            "Защищайте {swordshrine} + {sanctumPl}.",
            "Не бросайте основные здания ради {abbeyG} или убийств.",
            "Если офицеры объявляют ротацию — ДВИГАЙТЕСЬ."
          ]},
          { type: "callout", text: "⚔️ **КООРДИНАЦИЯ ПРИНОСИТ ПОБЕДУ В {swordlandP}**" }
        ]
      },

      th: {
        title: "ศึกดวลดินแดนดาบ",
        blocks: [
          { type: "h", text: "เมื่อไหร่" },
          { type: "p", text: "ทุก 2 สัปดาห์ — อีเวนต์สนามรบพันธมิตรปะทะพันธมิตร 60 นาที" },

          { type: "h", text: "การลงทะเบียน" },
          { type: "callout", text: "⚠️ **ลงทะเบียนเมื่อตั้งใจจะเข้าร่วมเท่านั้น** ผู้เล่นที่ลงทะเบียนแล้วไม่มา จะแย่งที่นั่งอันมีค่าและอาจกระทบการจับคู่" },
          { type: "list", items: ["**เข้าร่วมได้ 100% → ส่งคำขอเข้าร่วมศึก**", "**ไม่แน่ใจ → สละสิทธิ์**"] },

          { type: "h", text: "เป้าหมายหลัก" },
          { type: "p", text: "ชนะด้วยการได้ {allianceRelic} มากกว่าพันธมิตรฝ่ายตรงข้าม" },
          { type: "list", items: [
            "ยึดครองและรักษาสิ่งปลูกสร้างสำคัญไว้",
            "ปกป้องคะแนนที่สะสมไว้",
            "เก็บ {arsenal} ที่กระจัดกระจายทันทีที่สิ่งปลูกสร้างเปลี่ยนมือ",
            "ไปเก็บ {undercellar} เมื่อปรากฏขึ้น",
            "เสริมกำลังกองรักษาการณ์ใกล้เคียงเมื่อไม่ได้ระดมพล",
            "อย่าปล่อยให้การเดินทัพว่างเปล่า",
            "**ห้ามไล่ล่าการสังหารทั่วแผนที่** PvP แบบสุ่มทำให้เรากระจัดกระจายและลดประสิทธิภาพ โจมตีเมืองเลเวลต่ำกว่าเมื่อเหมาะสม โดยลดกำลังพวกเขาใกล้สิ่งปลูกสร้างที่ยึดครองอยู่"
          ]},

          { type: "h", text: "ภาพรวมสิ่งปลูกสร้าง" },
          { type: "buildings",
            legend: "ตัวเลขเรียงตาม: {allianceRelic} / {personalRelic}",
            cols: { first: "การควบคุมครั้งแรก", hold: "การยึดครองที่ยังคงดำเนินอยู่", open: "เปิด", min: "นาที", perMin: "/น.", sep: ": " },
            priority: { top: "สูงสุด", high: "สูง", med: "ปานกลาง" },
            gather: "จุดเก็บทรัพยากรที่ปรากฏเป็นระยะ (สองระลอก)",
            purposes: {
              swordshrine: "สิ่งปลูกสร้างที่ให้คะแนนมากที่สุด",
              mercenary: "ลดกำลังสิ่งปลูกสร้างที่ศัตรูยึดครอง",
              reformation: "เอฟเฟกต์เสริมการต่อสู้ของพันธมิตร",
              sanctum: "{allianceRelic} มูลค่าสูง",
              abbey: "ผลิต {allianceRelic}",
              stables: "ลดคูลดาวน์การย้ายถิ่นฐาน 50%",
              belltower: "ลดเวลาที่ใช้ในการยึดครองสิ่งปลูกสร้าง 50%"
            }
          },

          { type: "h", text: "โซนที่กำหนด" },
          { type: "p", text: "R4 จะแบ่งสมาชิกที่ยืนยันแล้วเป็นกลุ่ม/โซนก่อนการสู้รบ" },
          { type: "p", text: "**หน่วยบุกที่แข็งแกร่งที่สุด**ของเราจะได้รับมอบหมายโซนก่อน:" },
          { type: "list", items: [
            "🟣 **ม่วง — {belltower}**",
            "🟡 **เหลือง — {stables}**",
            "🔵 **น้ำเงิน — {sanctumNW}**",
            "🟢 **เขียว — {sanctumSE}**"
          ]},
          { type: "p", text: "สมาชิกที่เหลือจะถูกมอบหมายให้สนับสนุนโซน/กลุ่มใดกลุ่มหนึ่งเหล่านี้ อาจต้องสลับหมุนเวียนตามสถานการณ์ — ติดตามแชททีมเพื่อดูรายละเอียดเสมอ" },
          { type: "p", text: "อยู่ในโซนที่ได้รับมอบหมาย เว้นแต่ผู้บริหารสั่งให้ย้าย" },
          { type: "zones", labels: {
            purple: "🟣 โซนม่วง — {belltower} / {mercenary}",
            blue: "🔵 โซนน้ำเงิน — {sanctumNW} / {abbey}",
            yellow: "🟡 โซนเหลือง — {stables} / {abbey}",
            green: "🟢 โซนเขียว — {sanctumSE} / {abbey}",
            center: "⚪ ศูนย์กลาง"
          }},

          { type: "h", text: "บทบาทและหน้าที่" },
          { type: "p", text: "R4 จะแบ่งสมาชิกที่ยืนยันแล้วตามพลังเป็น 3 หน้าที่: **หน่วยบุก หน่วยรับ และหน่วยสนับสนุน/ผู้เข้าร่วมระดมพล**" },

          { type: "sub", text: "⚔️ 1) หน่วยบุก" },
          { type: "p", text: "**ใคร:** ผู้เล่นที่แข็งแกร่งที่สุดของเรา มีการย้ายถิ่นฐานขั้นสูงเพียงพอ" },
          { type: "p", text: "**หน้าที่ของคุณ:**" },
          { type: "list", items: [
            "ย้ายถิ่นฐานไปยังโซนและสิ่งปลูกสร้างที่ได้รับมอบหมาย",
            "ยึดครองสิ่งปลูกสร้างที่มีความสำคัญสูง",
            "โจมตีปราสาทศัตรูที่อ่อนแอเดี่ยว ๆ",
            "นำการระดมพลที่สำคัญ",
            "ไปยังเป้าหมายถัดไปเมื่อหน่วยรับเข้ามารับช่วง",
            "เมื่อศัตรูย้ายถิ่นฐานมาใกล้สิ่งปลูกสร้างของคุณ ให้เล็งปราสาทที่อ่อนแอหรือไร้การป้องกัน"
          ]},

          { type: "sub", text: "🛡️ 2) หน่วยรับ" },
          { type: "p", text: "**ใคร:** ผู้เล่นที่แข็งแกร่งรองลงมา มีความจุการระดมพล/กองรักษาการณ์ที่ดี" },
          { type: "p", text: "**หน้าที่ของคุณ:**" },
          { type: "list", items: [
            "ตามหน่วยบุกที่ได้รับมอบหมาย (โซน)",
            "เมื่อหน่วยบุกยึดสิ่งปลูกสร้างได้แล้ว ให้รับช่วงกองรักษาการณ์ และเรียกกำลังเสริมหากจำเป็น",
            "เสริมกำลังเป้าหมายที่ถูกคุกคาม",
            "ปล่อยให้หน่วยบุกเป็นอิสระเพื่อไปยังเป้าหมายถัดไป"
          ]},

          { type: "sub", text: "🤝 3) หน่วยสนับสนุน / ผู้เข้าร่วมระดมพล" },
          { type: "p", text: "**ใคร:** โดยทั่วไปคือสมาชิกที่มีพลังต่ำกว่าและผู้เข้าร่วมระดมพล" },
          { type: "p", text: "**หน้าที่ของคุณ:**" },
          { type: "list", items: [
            "**ต้อง**เข้าร่วมการระดมพลของหน่วยรับที่ได้รับมอบหมาย",
            "เสริมกำลังสิ่งปลูกสร้างที่ยึดได้",
            "ส่งกำลังเสริมด้วยการเดินทัพเร่งเมื่อถูกร้องขอ",
            "ปฏิบัติการจาก **เขตปลอดภัย** เมื่อไม่ได้เป็นที่ต้องการที่อื่น หรืออยู่ไกลจากระยะของศัตรู"
          ]},
          { type: "callout", text: "**สำคัญ:** หากศัตรูโจมตีสิ่งปลูกสร้างที่เรายึดไว้และการควบคุมตกเป็นของศัตรู **ให้ย้ายถิ่นฐานไปใกล้ ๆ หรือเดินทัพเร่งทันที** และเก็บ {arsenal} ที่กระจัดกระจายก่อนพวกเขา" },
          { type: "list", items: [
            "**เมื่อการสู้รบผ่านไป 20 นาที** {undercellar} จะปรากฏขึ้น ส่งกองกำลังที่ว่างไปเก็บเพื่อรับคะแนนเพิ่ม",
            "อย่าปล่อยให้การเดินทัพว่างเปล่า"
          ]},

          { type: "h", text: "ก่อนการสู้รบ" },
          { type: "list", items: [
            "ทำโรงพยาบาลสนามให้ว่าง และทำให้การเดินทัพทั้งหมดพร้อมใช้งาน",
            "สวมฮีโร่และอุปกรณ์ที่แข็งแกร่งที่สุดของคุณ",
            "เปิดใช้ความจุทีม บัฟโจมตีและป้องกัน และหน่วยป้องกันพิเศษ",
            "เตรียมการย้ายถิ่นฐานขั้นสูงไว้หากบทบาทของคุณต้องใช้",
            "เปิด Discord ไว้หากเป็นไปได้ (เพื่ออ้างอิงแผนที่ การมอบหมาย และช่องเสียงที่เลือกได้)",
            "ตรวจสอบแชทพันธมิตรและข้อความส่วนตัว"
          ]},
          { type: "callout", text: "⚠️ **สำคัญ:** แท็บ **แชททีม** ใหม่จะปรากฏในวันสู้รบ **ติดตามแชททีมตลอดการสู้รบ**" },

          { type: "h", text: "ไทม์ไลน์การสู้รบ" },
          { type: "timeline", items: [
            { time: "0:00–15:00", title: "เปิดฉาก", groups: [
              { title: "ยึดให้ได้ทันที", lines: ["**#4 {belltower}**", "**#7 {stables}**"] },
              { title: "ช่วงชิง", lines: ["**#8 {sanctumNW}**", "**#10 {sanctumSE}**"] },
              { title: "", lines: [
                "ยึด {abbey} เมื่อสะดวก แต่อย่าเสียเป้าหมายหลักเพื่อมัน",
                "**14:30** ผู้เล่นที่แข็งแกร่งที่สุดเตรียมตัวไปยังศูนย์กลาง"
              ]}
            ]},
            { time: "15:00", title: "สิ่งปลูกสร้างทรงพลังเปิด", lines: [
              "**#1 {swordshrine}**, **#2 {mercenary}**, **#3 {reformation}**",
              "ผู้บริหารจะประกาศลำดับความสำคัญตามสถานการณ์การสู้รบ"
            ], groups: [
              { title: "⭐ {swordshrine}", lines: [
                "หน่วยบุก/หน่วยรับที่แข็งแกร่งที่สุดย้ายถิ่นฐานไปยังศูนย์กลาง (ไม่ใช่ทุกคน)",
                "ยึดครอง {swordshrine}",
                "เมื่อยึดได้แล้ว หน่วยรับที่แข็งแกร่งคนหนึ่งรักษากองรักษาการณ์",
                "หน่วยสนับสนุน/ผู้เข้าร่วมต้องเดินทัพเร่งและส่งกำลังเสริม"
              ]}
            ], warn: "⚠️ สมาชิกที่ประจำกองรักษาการณ์: อย่าทิ้งสิ่งปลูกสร้างของตนเพื่อ {swordshrine} เว้นแต่ผู้บริหารแนะนำ ปกป้อง {sanctum} และสิ่งปลูกสร้างสำคัญอื่น ๆ ต่อไป" },
            { time: "15:00–45:00", title: "💪 ช่วงควบคุม", lines: [
              "เป้าหมายหลัก: **รักษา {swordshrine} + {sanctumNW} + {sanctumSE}**",
              "รักษาการควบคุม {belltower} / {stables} ที่เป็นประโยชน์",
              "ใช้เอฟเฟกต์ของ {reformation} ในการปะทะครั้งใหญ่",
              "ใช้ {mercenary} กดดันสิ่งปลูกสร้างของศัตรู",
              "เก็บ {arsenal} ที่กระจัดกระจายหลังสิ่งปลูกสร้างเปลี่ยนมือ**ทุกครั้ง**",
              "เสริมกำลังกองรักษาการณ์ที่อ่อนแอลง"
            ]},
            { time: "20:00–60:00", title: "⛏️ {undercellar}", lines: [
              "{undercellar} เริ่มปรากฏขึ้น",
              "หน่วยสนับสนุนและทุกคนที่มีการเดินทัพว่างควรไปเก็บเพื่อรับคะแนนเพิ่ม",
              "**อย่าทิ้งการป้องกันหรือการระดมพลที่สำคัญเพียงเพื่อไปเก็บ**"
            ]},
            { time: "15 นาทีสุดท้าย", title: "🏁 ช่วงปิดท้าย", groups: [
              { title: "หากเรานำอยู่", lines: ["ปกป้อง {swordshrine} และ {sanctum}", "เสริมกำลังสิ่งปลูกสร้างที่สะสมคะแนน", "หลีกเลี่ยง PvP ที่ไม่จำเป็น", "เก็บ {arsenal} ที่กระจัดกระจายคืนทันที", "อย่าเสี่ยงโดยไม่จำเป็น"] },
              { title: "หากเราตามอยู่", lines: ["กดดันสิ่งปลูกสร้างหลักของศัตรู", "ใช้ {mercenary} ก่อนการโจมตีแบบประสานงาน", "รวมกำลังในการระดมพลแทนการโจมตีมั่ว", "เล็งสิ่งปลูกสร้างมูลค่าสูงที่ศัตรูยึดครอง", "เก็บทุกคะแนนที่ตกหลังเปลี่ยนมือสำเร็จ"] }
            ], warn: "**5 นาทีสุดท้าย: คะแนน > การสังหาร**" }
          ]},

          { type: "h", text: "สรุป" },
          { type: "p", text: "สมาชิกจะถูกแบ่งเป็น 3 หน้าที่และมอบหมายโซน:" },
          { type: "list", items: [
            "**หน่วยบุก** → ยึด + กดดัน",
            "**หน่วยรับ** → รักษา + ปกป้อง",
            "**หน่วยสนับสนุน** → เสริมกำลัง + ระดมพล + {arsenal} + {undercellar}"
          ]},
          { type: "list", items: [
            "ทำตามโซนและบทบาทที่ได้รับมอบหมาย",
            "ติดตามแชททีม",
            "เป้าหมาย > การสังหารมั่ว ๆ",
            "หน่วยบุกยึด — หน่วยรับรักษา — หน่วยสนับสนุนเสริมกำลัง",
            "อย่าปล่อยให้การเดินทัพที่มีประโยชน์ว่างเปล่า",
            "เก็บ {arsenal} ที่กระจัดกระจายทันที",
            "เก็บ {undercellar} ด้วยการเดินทัพที่ว่าง",
            "ปกป้อง {swordshrine} + {sanctum}",
            "อย่าทิ้งสิ่งปลูกสร้างหลักเพื่อ {abbey} หรือการสังหาร",
            "หากผู้บริหารเรียกสลับหมุนเวียน ให้ขยับทันที"
          ]},
          { type: "callout", text: "⚔️ **การประสานงานคือกุญแจสู่ชัยชนะใน {swordland}**" }
        ]
      },

      ar: {
        title: "مواجهة أرض السيوف",
        blocks: [
          { type: "h", text: "الموعد" },
          { type: "p", text: "كل أسبوعين — فعالية ساحة معركة بين تحالفين مدتها 60 دقيقة." },

          { type: "h", text: "التسجيل" },
          { type: "callout", text: "⚠️ **سجّل فقط إذا كنت تنوي الحضور.** اللاعبون المسجلون الذين لا يحضرون يشغلون مكانًا ثمينًا وقد يؤثرون على التوفيق بين المتنافسين." },
          { type: "list", items: ["**100% أستطيع الحضور ← أرسل طلب المشاركة في المعركة**", "**غير متأكد ← امتنع**"] },

          { type: "h", text: "الهدف الرئيسي" },
          { type: "p", text: "افز بجمع {allianceRelic} أكثر من التحالف المعادي." },
          { type: "list", items: [
            "السيطرة على المباني المهمة والاحتفاظ بها",
            "حماية النقاط المتراكمة",
            "جمع {arsenal} المتناثرة فور تغيّر ملكية المبنى",
            "جمع {undercellar} عند ظهورها",
            "تعزيز الحاميات القريبة عندما لا تشارك في الحشد",
            "لا تترك أي طابور خاملًا",
            "**لا تطارد عمليات القتل في أنحاء الخريطة.** اللعب العشوائي ضد اللاعبين يشتتنا ويقلل فعاليتنا. هاجم المدن الأقل مستوى عندما يكون ذلك منطقيًا، وأضعفها بالقرب من المبنى الذي نسيطر عليه."
          ]},

          { type: "h", text: "نظرة عامة على المباني" },
          { type: "buildings",
            legend: "ترتيب الأرقام: {allianceRelic} / {personalRelic}",
            cols: { first: "التحكم الأول", hold: "الاحتلال المستمر", open: "الافتتاح", min: "دقيقة", perMin: "/د", sep: ": " },
            priority: { top: "الأعلى", high: "عالية", med: "متوسطة" },
            gather: "مواقع جمع تظهر بشكل دوري (موجتان)",
            purposes: {
              swordshrine: "أعلى مبنى قيمةً من حيث النقاط",
              mercenary: "يُضعف المباني التي يسيطر عليها العدو",
              reformation: "تعزيز قتالي للتحالف",
              sanctum: "{allianceRelic} عالية القيمة",
              abbey: "ينتج {allianceRelic}",
              stables: "تقليل الفاصل الزمني بين عمليات الانتقال بنسبة 50%",
              belltower: "تقليل الوقت المطلوب للسيطرة على المباني بنسبة 50%"
            }
          },

          { type: "h", text: "المناطق المخصصة" },
          { type: "p", text: "سيقسّم R4 الأعضاء المؤكدين إلى مجموعات/مناطق قبل المعركة." },
          { type: "p", text: "سيُخصَّص **أقوى المقتحمين** لدينا لمنطقة في البداية:" },
          { type: "list", items: [
            "🟣 **البنفسجية — {belltower}**",
            "🟡 **الصفراء — {stables}**",
            "🔵 **الزرقاء — {sanctumNW}**",
            "🟢 **الخضراء — {sanctumSE}**"
          ]},
          { type: "p", text: "سيُخصَّص بقية الأعضاء لدعم إحدى هذه المناطق/المجموعات. قد يلزم التناوب بحسب ظروف المعركة — راقب دردشة الفرقة دائمًا لمعرفة التفاصيل." },
          { type: "p", text: "ابقَ في منطقتك المخصصة ما لم تطلب منك القيادة الانتقال." },
          { type: "zones", labels: {
            purple: "🟣 المنطقة البنفسجية — {belltower} / {mercenary}",
            blue: "🔵 المنطقة الزرقاء — {sanctumNW} / {abbey}",
            yellow: "🟡 المنطقة الصفراء — {stables} / {abbey}",
            green: "🟢 المنطقة الخضراء — {sanctumSE} / {abbey}",
            center: "⚪ الوسط"
          }},

          { type: "h", text: "الأدوار والمسؤوليات" },
          { type: "p", text: "سيقسّم R4 الأعضاء المؤكدين بحسب القوة إلى 3 وظائف: **المقتحمون والحماة والدعم/المنضمون**." },

          { type: "sub", text: "⚔️ 1) المقتحمون" },
          { type: "p", text: "**من هم:** أقوى لاعبينا. لديهم الكثير من الناقلات المتقدمة." },
          { type: "p", text: "**مهمتك:**" },
          { type: "list", items: [
            "الانتقال إلى منطقتك ومبناك المخصصين",
            "السيطرة على المباني ذات الأولوية",
            "مهاجمة قلاع العدو الضعيفة منفردًا",
            "قيادة الحشود المهمة",
            "الانتقال إلى الهدف التالي بمجرد أن يتولى أحد الحماة المبنى",
            "عندما ينتقل الأعداء بالقرب من مبناك المخصص، استهدف القلاع الأضعف أو المكشوفة"
          ]},

          { type: "sub", text: "🛡️ 2) الحماة" },
          { type: "p", text: "**من هم:** اللاعبون الأقوى بعدهم، ولديهم قدرة جيدة على الحشد والحامية." },
          { type: "p", text: "**مهمتك:**" },
          { type: "list", items: [
            "اتبع المقتحمين المخصصين لك (المنطقة)",
            "بعد أن يسيطر المقتحم على مبنى، تولَّ الحاميات واطلب التعزيزات عند الحاجة",
            "عزّز الأهداف المهددة",
            "حرّر المقتحمين ليتمكنوا من الانتقال إلى هدفهم التالي"
          ]},

          { type: "sub", text: "🤝 3) الدعم / المنضمون" },
          { type: "p", text: "**من هم:** عمومًا الأعضاء الأقل قوة والمنضمون إلى الحشود." },
          { type: "p", text: "**مهمتك:**" },
          { type: "list", items: [
            "**يجب** الانضمام إلى حشود الحماة المخصصين",
            "تعزيز المباني التي تمت السيطرة عليها",
            "إرسال التعزيزات بمسيرة سريعة عند الطلب",
            "العمل من **المنطقة الآمنة** عندما لا تكون مطلوبًا في مكان آخر أو تكون بعيدًا عن متناول العدو"
          ]},
          { type: "callout", text: "**مهم:** إذا هاجم العدو أحد مبانينا التي سيطرنا عليها وانتقلت السيطرة إلى العدو، **فانتقل إلى القرب منه أو قم بمسيرة سريعة فورًا** واجمع {arsenal} المتناثرة قبلهم." },
          { type: "list", items: [
            "**بعد مرور 20 دقيقة على بدء المعركة** تظهر {undercellar}. أرسل القوات المتاحة لجمعها للحصول على نقاط إضافية.",
            "لا تترك أي طابور خاملًا."
          ]},

          { type: "h", text: "قبل المعركة" },
          { type: "list", items: [
            "أفرغ المشفى. اجعل جميع الطوابير متاحة",
            "جهّز أقوى أبطالك وعتادك",
            "فعّل قدرة القوات وتعزيزات الهجوم والدفاع والاستطلاع المضاد",
            "أبقِ الناقلات المتقدمة جاهزة إذا كان دورك يتطلبها",
            "أبقِ Discord مفتوحًا إن أمكن (للرجوع إلى الخريطة والتكليفات، والدردشة الصوتية اختيارية)",
            "تحقق من دردشة التحالف والرسائل الخاصة"
          ]},
          { type: "callout", text: "⚠️ **مهم:** ستظهر يوم المعركة تبويبة **دردشة الفرقة** جديدة. **راقب دردشة الفرقة طوال المعركة.**" },

          { type: "h", text: "الجدول الزمني للمعركة" },
          { type: "timeline", items: [
            { time: "0:00–15:00", title: "الافتتاح", groups: [
              { title: "أمّن فورًا", lines: ["**#4 {belltower}**", "**#7 {stables}**"] },
              { title: "نافس على", lines: ["**#8 {sanctumNW}**", "**#10 {sanctumSE}**"] },
              { title: "", lines: [
                "استولِ على {abbey} عندما يكون ذلك عمليًا، لكن لا تضحِّ بالأهداف الأساسية من أجلها.",
                "**14:30**، يستعد أقوى اللاعبين للتوجه إلى الوسط."
              ]}
            ]},
            { time: "15:00", title: "افتتاح المباني القوية", lines: [
              "**#1 {swordshrine}**، **#2 {mercenary}**، **#3 {reformation}**",
              "ستحدد القيادة الأولويات بحسب ظروف المعركة."
            ], groups: [
              { title: "⭐ {swordshrine}", lines: [
                "ينتقل أقوى المقتحمين/الحماة إلى الوسط (ليس الجميع)",
                "السيطرة على {swordshrine}",
                "بعد تأمينه يحافظ أحد الحماة الأقوياء على الحامية",
                "على الدعم/المنضمين القيام بمسيرة سريعة وإرسال التعزيزات"
              ]}
            ], warn: "⚠️ الأعضاء في الحاميات: لا تتخلَّ عن مبناك من أجل {swordshrine} إلا إذا نصحت القيادة بذلك. واصل حماية {sanctum} والمباني المهمة الأخرى." },
            { time: "15:00–45:00", title: "💪 مرحلة التحكم", lines: [
              "الهدف الرئيسي: **حافظ على {swordshrine} + {sanctumNW} + {sanctumSE}**",
              "أبقِ سيطرتك مفيدة على {belltower} / {stables}",
              "استخدم تعزيز {reformation} في الاشتباكات الكبرى",
              "استخدم {mercenary} للضغط على مباني العدو",
              "اجمع {arsenal} المتناثرة بعد **كل** تغيير في ملكية مبنى",
              "عزّز الحاميات الضعيفة"
            ]},
            { time: "20:00–60:00", title: "⛏️ {undercellar}", lines: [
              "تبدأ {undercellar} بالظهور.",
              "على لاعبي الدعم وكل من لديه طوابير متاحة جمعها للحصول على نقاط إضافية.",
              "**لا تترك دفاعًا حاسمًا أو حشدًا لمجرد الجمع.**"
            ]},
            { time: "آخر 15 دقيقة", title: "🏁 الختام", groups: [
              { title: "إذا كنا متقدمين", lines: ["احمِ {swordshrine} و{sanctum}", "عزّز المباني التي تراكم النقاط", "تجنّب معارك اللاعبين غير الضرورية (PvP)", "استرجع {arsenal} المتناثرة فورًا", "لا تخاطر دون داعٍ"] },
              { title: "إذا كنا متأخرين", lines: ["اضغط على مباني العدو الأساسية", "استخدم {mercenary} قبل الهجمات المنسقة", "ركّز الحشود بدل الهجوم العشوائي", "استهدف المباني الثمينة التي يسيطر عليها العدو", "اجمع كل نقطة سقطت بعد كل تغيير ناجح"] }
            ], warn: "**آخر 5 دقائق: النقاط > عمليات القتل.**" }
          ]},

          { type: "h", text: "الملخص" },
          { type: "p", text: "يُقسَّم الأعضاء إلى 3 وظائف ويُخصَّص لكل منهم منطقة:" },
          { type: "list", items: [
            "**المقتحمون** ← السيطرة + الضغط",
            "**الحماة** ← الحفاظ + الحماية",
            "**الدعم** ← التعزيز + الحشد + {arsenal} + {undercellar}"
          ]},
          { type: "list", items: [
            "اتبع منطقتك ودورك المخصصين.",
            "راقب دردشة الفرقة.",
            "الأهداف > عمليات القتل العشوائية.",
            "المقتحمون يستولون — الحماة يحافظون — الدعم يعزّز.",
            "لا تترك الطوابير المفيدة خاملة أبدًا.",
            "اجمع {arsenal} المتناثرة فورًا.",
            "اجمع {undercellar} بالطوابير المتاحة.",
            "احمِ {swordshrine} + {sanctum}.",
            "لا تتخلَّ عن المباني الأساسية من أجل {abbey} أو عمليات القتل.",
            "إذا طلبت القيادة التناوب، تحرّك فورًا."
          ]},
          { type: "callout", text: "⚔️ **التنسيق يحقق النصر في {swordland}**" }
        ]
      }
    }
  }
};
