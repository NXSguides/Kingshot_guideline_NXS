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
  { code: "pt", label: "Português", htmlLang: "pt-BR" },
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
    lethality: { zh: "殺傷力主將", en: "Lead for Lethality", ko: "파괴력 리드", de: "Lead für Tödlichkeit" },
    attack: { zh: "攻擊主將", en: "Lead for Attack", ko: "공격 리드", de: "Lead für Angriff" }
  }
};

/* 新增語言的介面字串 */
Object.assign(UI.siteTitle, { fr: "NXS Guidelines" });
Object.assign(UI.footerNote, { fr: "Traduit par des membres de l'alliance. En cours d'enrichissement." });
Object.assign(UI.missingLang, { fr: "version pas encore disponible — revenez bientôt." });
Object.assign(UI.tags.best, { fr: "MEILLEUR" });
Object.assign(UI.tags.alt, { fr: "ALT." });
Object.assign(UI.tags.f2p, { fr: "F2P" });
Object.assign(UI.roles.lethality, { fr: "Chef pour la létalité" });
Object.assign(UI.roles.attack, { fr: "Chef pour l'attaque" });
Object.assign(UI.siteTitle, { tr: "NXS Guidelines" });
Object.assign(UI.footerNote, { tr: "İttifak üyeleri tarafından çevrildi. Gelişmeye devam ediyor." });
Object.assign(UI.missingLang, { tr: "sürümü henüz eklenmedi — yakında tekrar bakın." });
Object.assign(UI.tags.best, { tr: "EN İYİ" });
Object.assign(UI.tags.alt, { tr: "ALT." });
Object.assign(UI.tags.f2p, { tr: "F2P" });
Object.assign(UI.roles.lethality, { tr: "Öldürücülük için lider" });
Object.assign(UI.roles.attack, { tr: "Saldırı için lider" });
Object.assign(UI.siteTitle, { id: "NXS Guidelines" });
Object.assign(UI.footerNote, { id: "Diterjemahkan oleh anggota aliansi. Terus berkembang." });
Object.assign(UI.missingLang, { id: "versi belum ditambahkan — cek lagi nanti." });
Object.assign(UI.tags.best, { id: "TERBAIK" });
Object.assign(UI.tags.alt, { id: "ALT" });
Object.assign(UI.tags.f2p, { id: "F2P" });
Object.assign(UI.roles.lethality, { id: "Lead untuk Lethality" });
Object.assign(UI.roles.attack, { id: "Lead untuk Serangan" });
Object.assign(UI.siteTitle, { ru: "NXS Guidelines" });
Object.assign(UI.footerNote, { ru: "Переведено участниками альянса. Продолжает пополняться." });
Object.assign(UI.missingLang, { ru: "версия пока не добавлена — загляните позже." });
Object.assign(UI.tags.best, { ru: "ЛУЧШИЙ" });
Object.assign(UI.tags.alt, { ru: "АЛЬТ." });
Object.assign(UI.tags.f2p, { ru: "F2P" });
Object.assign(UI.roles.lethality, { ru: "Лидер по смертоносности" });
Object.assign(UI.roles.attack, { ru: "Лидер по атаке" });
Object.assign(UI.siteTitle, { th: "NXS Guidelines" });
Object.assign(UI.footerNote, { th: "แปลโดยสมาชิกพันธมิตร และยังคงเพิ่มเติมอย่างต่อเนื่อง" });
Object.assign(UI.missingLang, { th: "ยังไม่มีเวอร์ชันนี้ — โปรดกลับมาดูใหม่เร็ว ๆ นี้" });
Object.assign(UI.tags.best, { th: "ดีที่สุด" });
Object.assign(UI.tags.alt, { th: "ทางเลือก" });
Object.assign(UI.tags.f2p, { th: "F2P" });
Object.assign(UI.roles.lethality, { th: "ตัวนำสายสังหาร" });
Object.assign(UI.roles.attack, { th: "ตัวนำสายโจมตี" });
Object.assign(UI.siteTitle, { ar: "NXS Guidelines"});
Object.assign(UI.footerNote, { ar: "ترجمة أعضاء التحالف، ويتم تحديثها باستمرار." });
Object.assign(UI.missingLang, { ar: "هذه النسخة لم تُضف بعد — عد قريبًا." });
Object.assign(UI.tags.best, { ar: "الأفضل" });
Object.assign(UI.tags.alt, { ar: "بديل" });
Object.assign(UI.tags.f2p, { ar: "F2P" });
Object.assign(UI.roles.lethality, { ar: "قائد للفتك" });
Object.assign(UI.roles.attack, { ar: "قائد للهجوم" });
Object.assign(UI.siteTitle, { pt: "NXS Guidelines" });
Object.assign(UI.footerNote, { pt: "Traduzido por membros da aliança. Ainda em crescimento." });
Object.assign(UI.missingLang, { pt: "versão ainda não adicionada — volte em breve." });
Object.assign(UI.tags.best, { pt: "MELHOR" });
Object.assign(UI.tags.alt, { pt: "ALT." });
Object.assign(UI.tags.f2p, { pt: "F2P" });
Object.assign(UI.roles.lethality, { pt: "Líder de Letalidade" });
Object.assign(UI.roles.attack, { pt: "Líder de Ataque" });

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
  counterRecon: { zh:"反偵察", en:"Counter-recon", de:"Gegenaufklärung", ko:"정찰 방지", fr:"Anti-repérage", ar:"الاستطلاع المضاد", id:"Kontra-pengintaian", th:"หน่วยป้องกันพิเศษ", ru:"Контрразведка", tr:"Gözetleme Önleyen", pt:"Antirreconhecimento" },
  squad: { zh:"部隊", en:"Squad", de:"Schwadron", ko:"부대", fr:"Escouade", ar:"الفرقة", id:"Skuad", th:"ทีม", ru:"Войска", tr:"Ekip", pt:"Esquadrão" },
  shield: { zh:"防護罩", en:"Shield", de:"Schild", ko:"보호막", fr:"Bouclier", ar:"درع", id:"Perisai", th:"โล่", ru:"Щит", tr:"Kalkan", pt:"Escudo" },
  lethality: { zh:"殺傷力", en:"Lethality", de:"Tödlichkeit", ko:"파괴력", fr:"Létalité", ar:"قوة فتك", id:"Lethality", th:"ความแรงพลัง", ru:"Смертоносность", tr:"Öldürücülük", pt:"Letalidade" },
  health: { zh:"生命值", en:"Health", de:"Gesundheit", ko:"HP", fr:"Santé", ar:"صحة", id:"Health", th:"พลังชีวิต", ru:"Здоровье", tr:"Sağlık", pt:"Vida" },
  /* 遊戲截圖確認的用語（背包、熊獵畫面） */
  rally: { zh:"集結", en:"Rally", de:"Rally", ko:"집결", fr:"Ralliement", ar:"الحشد", id:"Reli", th:"ทีมระดมพล", ru:"Рейд", tr:"Seferberlik", pt:"Rally" },
  teleporterAdv: { zh:"高級遷城", en:"Advanced Teleporter", de:"Fortgeschrittene Umsiedlung", ko:"고급 도시 이전", fr:"Relocalisation Avancée", ar:"ناقل متقدم", id:"Teleporter Lanjutan", th:"การย้ายถิ่นฐานขั้นสูง", ru:"Продвинутый телепорт", tr:"Gelişmiş Işınlayıcı", pt:"Teletransportador Avançado" },
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
  swordland: { zh:"聖劍戰場", en:"Swordland", de:"Schwertland", ko:"성검 전장", fr:"Terres du Glaive", ar:"أرض السيوف", id:"Swordland", th:"ดินแดนดาบ", ru:"Страна мечей", tr:"Kılıçdiyarı", pt:"Terra das Espadas" },
  swordshrine: { zh:"聖劍祭壇", en:"Swordshrine", de:"Schwertschrein", ko:"성검 제단", fr:"Tombeau du Glaive", ar:"ضريح السيوف", id:"Swordshrine", th:"วิหารดาบ", ru:"Святилище меча", tr:"Kılıç Altarı", pt:"Templo da Espada" },
  mercenary: { zh:"傭兵駐地", en:"Mercenary Camp", de:"Söldnerlager", ko:"용병 주둔지", fr:"Camp de Mercenaires", ar:"معسكر المرتزقة", id:"Kamp Tentara Bayaran", th:"ค่ายทหารรับจ้าง", ru:"Лагерь наемников", tr:"Paralı Asker Kampı", pt:"Acampamento Mercenário" },
  reformation: { zh:"教化大廳", en:"Hall of Reformation", de:"Reformationshalle", ko:"교화의 홀", fr:"Salle des Réformes", ar:"قاعة الإصلاح", id:"Aula Reformasi", th:"หอปฏิรูป", ru:"Зал искупления", tr:"Devrim Salonu", pt:"Salão da Reforma" },
  sanctum: { zh:"聖所", en:"Sanctum", de:"Heiligtum", ko:"성소", fr:"Sanctuaire", ar:"مزار", id:"Sanctum", th:"วิหารศักดิ์สิทธิ์", ru:"Святилище", tr:"Tapınak", pt:"Santuário" },
  sanctumNW: { zh:"西北聖所", en:"Northwest Sanctum", de:"Nordwestliches Heiligtum", ko:"북서 성소", fr:"Sanctuaire Nord-Ouest", ar:"مزار الشمالي الغربي", id:"Sanctum Barat Laut", th:"วิหารศักดิ์สิทธิ์ตะวันตกเฉียงเหนือ", ru:"Северо-западное святилище", tr:"Kuzeybatı Tapınağı", pt:"Santuário do Noroeste" },
  sanctumSE: { zh:"東南聖所", en:"Southeast Sanctum", de:"Südwestliches Heiligtum" /* 遊戲德文版本身的錯誤，照截圖 */, ko:"남동 성소", fr:"Sanctuaire Sud-Est", ar:"مزار الجنوبي الشرقي", id:"Sanctum Tenggara", th:"วิหารศักดิ์สิทธิ์ตะวันออกเฉียงใต้", ru:"Юго-восточное святилище", tr:"Güneydoğu Tapınağı", pt:"Santuário do Sudeste" },
  abbey: { zh:"修道院", en:"Abbey", de:"Abtei", ko:"수도원", fr:"Abbaye", ar:"دير", id:"Biara", th:"อาราม", ru:"Монастырь", tr:"Manastır", pt:"Abadia" },
  belltower: { zh:"鐘塔", en:"Belltower", de:"Glockenturm", ko:"시계탑", fr:"Clocher", ar:"برج الجرس", id:"Menara Lonceng", th:"หอระฆัง", ru:"Колокольня", tr:"Çan Kulesi", pt:"Torre do Sino" },
  stables: { zh:"馬廄", en:"Royal Stables", de:"Königliche Ställe", ko:"마구간", fr:"Écuries Royales", ar:"الاسطبلات الملكية", id:"Kandang Kuda Kerajaan", th:"คอกม้าหลวง", ru:"Королевский конный двор", tr:"Kraliyet Ahırları", pt:"Estábulos da Realeza" },
  undercellar: { zh:"隱蔽地窖", en:"Undercellar", de:"Untergewölbe", ko:"땅굴", fr:"Caves", ar:"الأقبية السفلية", id:"Undercellar", th:"ห้องใต้ดินลับ", ru:"подземелья", tr:"Gizli Mahzenler", pt:"Porões" },
  arsenal: { zh:"輜重", en:"Arsenal Supplies", de:"Frachtzugvorräte", ko:"군수 물자", fr:"Provisions de Train de bagages", ar:"إمدادات أمتعة القطار", id:"Suplai Kereta Bagasi", th:"เสบียงขบวนสัมภาระ", ru:"военные запасы", tr:"Bagaj Treni Malzemeleri", pt:"Suprimentos de Trem de Bagagem" },
  allianceRelic: { zh:"聯盟聖契積分", en:"Alliance Relic Points", de:"Allianz-Reliktpunkte", ko:"연맹 성스러운 계약 포인트", fr:"Points de Relique d'Alliance", ar:"نقاط الآثار للتحالف", id:"Poin Relik Aliansi", th:"คะแนนวัตถุโบราณพันธมิตร", ru:"Очки реликвий альянса", tr:"İttifak Yadigâr Puanı", pt:"Pontos de Relíquia da Aliança" },
  personalRelic: { zh:"個人聖契積分", en:"Personal Relic Points", de:"Persönliche Reliktpunkte", ko:"개인 성스러운 계약 포인트", fr:"Points de Relique Individuels", ar:"نقاط الآثار الشخصية", id:"Poin Relik Pribadi", th:"คะแนนวัตถุโบราณส่วนบุคคล", ru:"Личные очки реликвий", tr:"Kişisel Yadigâr Puanı", pt:"Pontos de Relíquia Individuais" },
  bearHunt: { zh:"狩獵巨熊", en:"Bear Hunt", ko:"자이언트 베어 사냥", de:"Bärenjagd", fr:"Chasse à l'Ours", pt:"Caça ao Urso", tr:"Ayı Avı", id:"Bear Hunt", ru:"Охота на медведя", th:"ล่าหมี", ar:"صيد الدببة" },
  castleBattle: { zh:"決戰王城", en:"Castle Battle", ko:"캐슬 전투", de:"Schlacht um das Schloss", fr:"Bataille du Château", pt:"Batalha do Castelo", tr:"Şato Savaşı", id:"Pertempuran Istana", ru:"Битва за замок", th:"การต่อสู้ชิงปราสาท", ar:"معركة القلعة" },
  sanctuary: { zh:"遺跡", en:"Sanctuary", ko:"유적", de:"Heiligtum", fr:"Sanctuaire", pt:"Santuário", tr:"Tapınak", id:"Sanctuary", ru:"святилище", th:"วิหาร", ar:"المأوى" },
  infantry: { zh:"步兵", en:"Infantry", ko:"보병", de:"Infanterie", fr:"Infanterie", pt:"Infantaria", tr:"Piyade", id:"Infanteri", ru:"Пехотинец", th:"ทหารราบ", ar:"المشاة" },
  cavalry: { zh:"騎兵", en:"Cavalry", ko:"기병", de:"Kavallerie", fr:"Cavalerie", pt:"Cavalaria", tr:"Süvari", id:"Kavaleri", ru:"Кавалерист", th:"ทหารม้า", ar:"الفرسان" },
  archer: { zh:"弓兵", en:"Archer", ko:"궁병", de:"Bogenschütze", fr:"Archer", pt:"Arquearia", tr:"Okçu", id:"Pemanah", ru:"Стрелок", th:"พลธนู", ar:"الرماة" },
  chenko: { zh:"琴科", en:"Chenko", ko:"첸코", de:"Chenko", fr:"Chenko", pt:"Chenko", tr:"Chenko", id:"Chenko", ru:"Ченко", th:"เชนโกะ", ar:"تشينكو" },
  amane: { zh:"雨音", en:"Amane", ko:"아마네", de:"Amane", fr:"Amane", pt:"Amane", tr:"Amane", id:"Amane", ru:"Амане", th:"อามาเนะ", ar:"أماني" },
  yeonwoo: { zh:"妍羽", en:"Yeonwoo", ko:"연우", de:"Yeonwoo", fr:"Yeonwoo", pt:"Yeonwoo", tr:"Yeonwoo", id:"Yeonwoo", ru:"Ёну", th:"ยอนอู", ar:"يونوو" },
  amadeus: { zh:"阿瑪迪斯", en:"Amadeus", ko:"아마데우스", de:"Amadeus", fr:"Amadeus", pt:"Amadeus", tr:"Amadeus", id:"Amadeus", ru:"Амадей", th:"อมาดีอุส", ar:"أماديوس" },
  howard: { zh:"霍華德", en:"Howard", ko:"하워드", de:"Howard", fr:"Howard", pt:"Howard", tr:"Howard", id:"Howard", ru:"Говард", th:"ฮาวเวิร์ด", ar:"هاورد" },
  gordon: { zh:"戈登", en:"Gordon", ko:"고든", de:"Gordon", fr:"Gordon", pt:"Gordon", tr:"Gordon", id:"Gordon", ru:"Гордон", th:"กอร์ดอน", ar:"جوردن" },
  diana: { zh:"狄安娜", en:"Diana", ko:"다이애나", de:"Diana", fr:"Diana", pt:"Diana", tr:"Diana", id:"Diana", ru:"Диана", th:"ไดอาน่า", ar:"ديانا" },
  fahd: { zh:"法赫德", en:"Fahd", ko:"파드", de:"Fahd", fr:"Fahd", pt:"Fahd", tr:"Fahd", id:"Fahd", ru:"Фад", th:"ฟาฮ์ด", ar:"فهد" },
  jabel: { zh:"潔貝爾", en:"Jabel", ko:"제이벨", de:"Jabel", fr:"Jabel", pt:"Jabel", tr:"Jabel", id:"Jabel", ru:"Явель", th:"จาเบล", ar:"جبل" },
  quinn: { zh:"奎恩", en:"Quinn", ko:"퀸", de:"Quinn", fr:"Quinn", pt:"Quinn", tr:"Quinn", id:"Quinn", ru:"Куинн", th:"ควินน์", ar:"كوين" },
  helga: { zh:"赫爾加", en:"Helga", ko:"헬가", de:"Helga", fr:"Helga", pt:"Helga", tr:"Helga", id:"Helga", ru:"Хельга", th:"เฮลก้า", ar:"هيلجا" },
  saul: { zh:"薩洛", en:"Saul", ko:"살로", de:"Saul", fr:"Saul", pt:"Saul", tr:"Saul", id:"Saul", ru:"Соул", th:"ซอล", ar:"شاول" },
};

const GUIDES = {
  "recent-events": {
    emoji: "📢",
    name: {
      en: "Recent Events", zh: "近期活動", ko: "최근 이벤트",
      de: "Aktuelle Events", fr: "Événements récents",
      pt: "Eventos Recentes", tr: "Son Etkinlikler",
      id: "Acara Terbaru", ru: "Последние события",
      th: "กิจกรรมล่าสุด", ar: "أحدث الفعاليات"
    },
    sections: {
      en: { title: "Recent Events", blocks: [
        { type: "guideLink", guide: "viking-vengeance" },
        { type: "guideLink", guide: "eternity-reach" },
        { type: "announcements" }
      ]},
      zh: { title: "近期活動", blocks: [
        { type: "guideLink", guide: "viking-vengeance" },
        { type: "guideLink", guide: "eternity-reach" },
        { type: "announcements" }
      ]},
      ko: { title: "최근 이벤트", blocks: [
        { type: "guideLink", guide: "viking-vengeance" },
        { type: "guideLink", guide: "eternity-reach" },
        { type: "announcements" }
      ]},
      de: { title: "Aktuelle Events", blocks: [
        { type: "guideLink", guide: "viking-vengeance" },
        { type: "guideLink", guide: "eternity-reach" },
        { type: "announcements" }
      ]},
      fr: { title: "Événements récents", blocks: [
        { type: "guideLink", guide: "viking-vengeance" },
        { type: "guideLink", guide: "eternity-reach" },
        { type: "announcements" }
      ]},
      pt: { title: "Eventos Recentes", blocks: [
        { type: "guideLink", guide: "viking-vengeance" },
        { type: "guideLink", guide: "eternity-reach" },
        { type: "announcements" }
      ]},
      tr: { title: "Son Etkinlikler", blocks: [
        { type: "guideLink", guide: "viking-vengeance" },
        { type: "guideLink", guide: "eternity-reach" },
        { type: "announcements" }
      ]},
      id: { title: "Acara Terbaru", blocks: [
        { type: "guideLink", guide: "viking-vengeance" },
        { type: "guideLink", guide: "eternity-reach" },
        { type: "announcements" }
      ]},
      ru: { title: "Последние события", blocks: [
        { type: "guideLink", guide: "viking-vengeance" },
        { type: "guideLink", guide: "eternity-reach" },
        { type: "announcements" }
      ]},
      th: { title: "กิจกรรมล่าสุด", blocks: [
        { type: "guideLink", guide: "viking-vengeance" },
        { type: "guideLink", guide: "eternity-reach" },
        { type: "announcements" }
      ]},
      ar: { title: "أحدث الفعاليات", blocks: [
        { type: "guideLink", guide: "viking-vengeance" },
        { type: "guideLink", guide: "eternity-reach" },
        { type: "announcements" }
      ]}
    }
  },
  "viking-vengeance": {
    emoji: "🧯",
    name: {
      en: "Viking Vengeance", zh: "維京人的掠奪", ko: "바이킹의 약탈", de: "Wikinger-Rache", fr: "Vengeance Viking", pt: "Vingança Viking", tr: "Viking İntikamı", id: "Viking Vengeance", ru: "Месть викингов", th: "การล้างแค้นของไวกิ้ง", ar: "انتقام الفايكنغ"
    },
    sections: {
      en: {
        title: "Viking Vengeance",
        blocks: [
          { type: "h", text: "WHEN" },
          { type: "p", text: "Every 2 weeks — two 30-minute sessions on Day 1 & Day 3. Scheduled by leadership, usually close to {bearHunt} times." },
          { type: "h", text: "📌 PREPARATION" },
          { type: "sub", text: "Empty Your City" },
          { type: "list", items: ["Send **ALL** {infantry} & {cavalry} out to reinforce alliance members.", "Extra Archers can stay home — they won't steal reinforcement points.", "Even if you'll be offline during the event, empty your city beforehand! You can still earn points while giving other members the opportunity to earn points by reinforcing you."] },
          { type: "sub", text: "Keep Best 3 Heroes Home" },
          { type: "p", text: "Leave your best 3 Defense/Offense heroes in your Guard Station." },
          { type: "list", items: ["**F2P:** {jabel} / {howard} / {quinn}", "**P2W:** {amadeus} or {helga} / {jabel} / {saul}"] },
          { type: "sub", text: "DO NOT HEAL" },
          { type: "p", text: "Healed troops return home and can steal kills/points from the members reinforcing you." },
          { type: "sub", text: "Prioritize Active Members" },
          { type: "p", text: "Reinforce online members first. Waves 7, 14 & 17 only attack online players." },
          { type: "h", text: "⚔️ REINFORCING ALLIES" },
          { type: "p", text: "Use {bearHunt} joiner heroes in slot 1 to maximize kill points." },
          { type: "p", text: "**Recommended:** {chenko} / {amane} / {yeonwoo} / {amadeus}" },
          { type: "callout", text: "Avoid defensive heroes such as {howard} or {gordon} in reinforcement marches." },
          { type: "h", text: "🏛️ HQ — WAVES 10 & 20" },
          { type: "p", text: "Waves 10 & 20 attack HQ **ONLY**. City attacks pause during these waves." },
          { type: "p", text: "After Wave 9 / 19 finishes:" },
          { type: "list", items: ["Recall **ONE** strong march.", "Send it directly to HQ.", "Max 68K troops per member.", "Use {chenko} or {amadeus} in slot 1, or your strongest raw-damage hero.", "After the HQ wave, recall and return to reinforcing your assigned member."] },
          { type: "callout", text: "⚠️ **IMPORTANT:** You can reinforce HQ for Wave 10 **OR** Wave 20 — **NOT BOTH.**" },
          { type: "p", text: "Coordinate with R4/R5 so everyone gets a turn and we fill HQ efficiently." }
        ]
      },
      zh: {
        title: "維京人的掠奪",
        blocks: [
          { type: "h", text: "活動時間" },
          { type: "p", text: "每 2 週一次——第 1 天與第 3 天各進行一場，每場 30 分鐘。由幹部安排時間，通常接近{bearHunt}的時段。" },
          { type: "h", text: "📌 準備工作" },
          { type: "sub", text: "清空你的城鎮" },
          { type: "list", items: ["把**所有**{infantry}和{cavalry}派出去增援盟友。", "多出來的{archer}可以留在家裡——不會搶走增援積分。", "就算活動期間你不在線，也要先清空城鎮！這樣你仍然能得分，同時也讓其他成員有機會透過增援你來得分。"] },
          { type: "sub", text: "把最強的 3 名英雄留在家" },
          { type: "p", text: "把你最強的 3 名防守／進攻英雄留在你的防衛所。" },
          { type: "list", items: ["**免費：** {jabel} / {howard} / {quinn}", "**課金：** {amadeus} 或 {helga} / {jabel} / {saul}"] },
          { type: "sub", text: "不要治療" },
          { type: "p", text: "治療後的部隊會回到家中，並可能搶走增援你的成員的擊殺／積分。" },
          { type: "sub", text: "優先照顧在線成員" },
          { type: "p", text: "優先增援在線的成員。第 7、14、17 波只會攻擊在線的玩家。" },
          { type: "h", text: "⚔️ 增援盟友" },
          { type: "p", text: "在第一個位置使用你在{bearHunt}中當參與者（joiner）的英雄，以取得最高的擊殺積分。" },
          { type: "p", text: "**推薦：** {chenko} / {amane} / {yeonwoo} / {amadeus}" },
          { type: "callout", text: "增援行軍中請避免使用{howard}或{gordon}這類防守型英雄。" },
          { type: "h", text: "🏛️ 總部——第 10 與第 20 波" },
          { type: "p", text: "第 10 與第 20 波**只**會攻擊總部。這兩波期間，城鎮不會受到攻擊。" },
          { type: "p", text: "第 9／19 波結束後：" },
          { type: "list", items: ["召回**一支**強力行軍。", "直接派往總部。", "每位成員最多 68K 兵力。", "第一個位置使用{chenko}或{amadeus}，或你最強的純輸出英雄。", "總部這波結束後，召回並回去繼續增援你被分配到的成員。"] },
          { type: "callout", text: "⚠️ **重要：** 第 10 波或第 20 波，你只能選其中一波增援總部——**不能兩波都增援。**" },
          { type: "p", text: "請與 R4／R5 協調，讓每個人都輪得到，並有效率地填滿總部。" }
        ]
      },
      ko: {
        title: "바이킹의 약탈",
        blocks: [
          { type: "h", text: "일정" },
          { type: "p", text: "2주마다 — 1일 차와 3일 차에 각각 30분씩 진행됩니다. 임원진이 시간을 정하며, 보통 {bearHunt} 시간대와 가깝습니다." },
          { type: "h", text: "📌 준비" },
          { type: "sub", text: "도시 비우기" },
          { type: "list", items: ["{infantry}과 {cavalry}은 **모두** 내보내 연맹원을 증원하세요.", "남는 {archer}은 집에 두어도 됩니다 — 증원 포인트를 빼앗지 않습니다.", "이벤트 중 오프라인이더라도 미리 도시를 비우세요! 그래도 포인트를 얻을 수 있고, 다른 연맹원이 당신을 증원해서 포인트를 얻을 기회도 생깁니다."] },
          { type: "sub", text: "최강 영웅 3명은 집에 두기" },
          { type: "p", text: "가장 강한 방어/공격 영웅 3명을 방위소에 남겨 두세요." },
          { type: "list", items: ["**무과금:** {jabel} / {howard} / {quinn}", "**과금:** {amadeus} 또는 {helga} / {jabel} / {saul}"] },
          { type: "sub", text: "치료하지 마세요" },
          { type: "p", text: "치료된 부대는 집으로 돌아와 당신을 증원하는 연맹원의 처치/포인트를 빼앗을 수 있습니다." },
          { type: "sub", text: "활동 중인 연맹원 우선" },
          { type: "p", text: "온라인 연맹원을 먼저 증원하세요. 7·14·17 웨이브는 온라인 플레이어만 공격합니다." },
          { type: "h", text: "⚔️ 연맹원 증원" },
          { type: "p", text: "처치 포인트를 극대화하려면 첫 번째 자리에 {bearHunt} 참여용 영웅을 사용하세요." },
          { type: "p", text: "**추천:** {chenko} / {amane} / {yeonwoo} / {amadeus}" },
          { type: "callout", text: "증원 행군에는 {howard}나 {gordon} 같은 방어형 영웅은 피하세요." },
          { type: "h", text: "🏛️ 본부 — 10·20 웨이브" },
          { type: "p", text: "10·20 웨이브는 **본부만** 공격합니다. 이 웨이브 동안 도시 공격은 멈춥니다." },
          { type: "p", text: "9/19 웨이브가 끝난 뒤:" },
          { type: "list", items: ["강력한 행군 **하나**를 소환하세요.", "곧바로 본부로 보내세요.", "인원당 최대 68K 병력.", "첫 번째 자리에 {chenko}나 {amadeus}, 또는 가장 강한 순수 딜 영웅을 사용하세요.", "본부 웨이브가 끝나면 소환한 뒤, 배정된 연맹원을 다시 증원하세요."] },
          { type: "callout", text: "⚠️ **중요:** 10웨이브 **또는** 20웨이브 중 한 번만 본부를 증원할 수 있습니다 — **둘 다는 불가.**" },
          { type: "p", text: "모두가 차례를 갖고 본부를 효율적으로 채울 수 있도록 R4/R5와 조율하세요." }
        ]
      },
      de: {
        title: "Wikinger-Rache",
        blocks: [
          { type: "h", text: "WANN" },
          { type: "p", text: "Alle 2 Wochen — zwei 30-Minuten-Sitzungen an Tag 1 und Tag 3. Die Führung legt die Zeiten fest, meist in der Nähe der {bearHunt}-Zeiten." },
          { type: "h", text: "📌 VORBEREITUNG" },
          { type: "sub", text: "Leere deine Stadt" },
          { type: "list", items: ["Schicke **ALLE** {infantry} und {cavalry} los, um Allianzmitglieder zu verstärken.", "Überzählige Bogenschützen können zu Hause bleiben — sie stehlen keine Verstärkungspunkte.", "Auch wenn du während des Events offline bist: Leere deine Stadt vorher! Du kannst trotzdem Punkte sammeln und gibst anderen Mitgliedern die Chance, Punkte zu sammeln, indem sie dich verstärken."] },
          { type: "sub", text: "Die besten 3 Helden bleiben zu Hause" },
          { type: "p", text: "Lass deine besten 3 Verteidigungs-/Angriffshelden in deinem Wachposten." },
          { type: "list", items: ["**F2P:** {jabel} / {howard} / {quinn}", "**P2W:** {amadeus} oder {helga} / {jabel} / {saul}"] },
          { type: "sub", text: "NICHT HEILEN" },
          { type: "p", text: "Geheilte Truppen kehren nach Hause zurück und können den Mitgliedern, die dich verstärken, Kills/Punkte wegnehmen." },
          { type: "sub", text: "Aktive Mitglieder zuerst" },
          { type: "p", text: "Verstärke zuerst Online-Mitglieder. Die Wellen 7, 14 und 17 greifen nur Online-Spieler an." },
          { type: "h", text: "⚔️ VERBÜNDETE VERSTÄRKEN" },
          { type: "p", text: "Nutze deine {bearHunt}-Joiner-Helden an Position 1, um die Kill-Punkte zu maximieren." },
          { type: "p", text: "**Empfohlen:** {chenko} / {amane} / {yeonwoo} / {amadeus}" },
          { type: "callout", text: "Vermeide Verteidigungshelden wie {howard} oder {gordon} in Verstärkungsmärschen." },
          { type: "h", text: "🏛️ HQ — WELLEN 10 & 20" },
          { type: "p", text: "Die Wellen 10 und 20 greifen **NUR** das HQ an. Angriffe auf Städte pausieren in diesen Wellen." },
          { type: "p", text: "Nachdem Welle 9 / 19 vorbei ist:" },
          { type: "list", items: ["Rufe **EINEN** starken Marsch zurück.", "Schicke ihn direkt zum HQ.", "Maximal 68K Truppen pro Mitglied.", "Nutze {chenko} oder {amadeus} an Position 1 oder deinen stärksten Helden mit reinem Schaden.", "Rufe nach der HQ-Welle zurück und verstärke wieder das dir zugewiesene Mitglied."] },
          { type: "callout", text: "⚠️ **WICHTIG:** Du kannst das HQ in Welle 10 **ODER** Welle 20 verstärken — **NICHT BEIDE.**" },
          { type: "p", text: "Stimme dich mit R4/R5 ab, damit jeder an die Reihe kommt und wir das HQ effizient füllen." }
        ]
      },
      fr: {
        title: "Vengeance Viking",
        blocks: [
          { type: "h", text: "QUAND" },
          { type: "p", text: "Toutes les 2 semaines — deux sessions de 30 minutes, au jour 1 et au jour 3. Les horaires sont fixés par la direction, généralement proches de ceux de la {bearHunt}." },
          { type: "h", text: "📌 PRÉPARATION" },
          { type: "sub", text: "Videz votre village" },
          { type: "list", items: ["Envoyez **TOUTE** l'infanterie et la cavalerie renforcer les membres de l'alliance.", "Les archers en trop peuvent rester à la maison — ils ne volent pas de points de renfort.", "Même si vous serez hors ligne pendant l'événement, videz votre village avant ! Vous pouvez quand même marquer des points, et vous laissez aux autres membres la possibilité d'en marquer en vous renforçant."] },
          { type: "sub", text: "Gardez vos 3 meilleurs héros à la maison" },
          { type: "p", text: "Laissez vos 3 meilleurs héros de défense/attaque dans votre Poste de Garde." },
          { type: "list", items: ["**F2P :** {jabel} / {howard} / {quinn}", "**P2W :** {amadeus} ou {helga} / {jabel} / {saul}"] },
          { type: "sub", text: "NE SOIGNEZ PAS" },
          { type: "p", text: "Les troupes soignées rentrent à la maison et peuvent voler des éliminations/points aux membres qui vous renforcent." },
          { type: "sub", text: "Priorité aux membres actifs" },
          { type: "p", text: "Renforcez d'abord les membres en ligne. Les vagues 7, 14 et 17 n'attaquent que les joueurs en ligne." },
          { type: "h", text: "⚔️ RENFORCER LES ALLIÉS" },
          { type: "p", text: "Utilisez vos héros de participants à la {bearHunt} en position 1 pour maximiser les points d'élimination." },
          { type: "p", text: "**Recommandés :** {chenko} / {amane} / {yeonwoo} / {amadeus}" },
          { type: "callout", text: "Évitez les héros défensifs comme {howard} ou {gordon} dans les marches de renfort." },
          { type: "h", text: "🏛️ QG — VAGUES 10 ET 20" },
          { type: "p", text: "Les vagues 10 et 20 attaquent **UNIQUEMENT** le QG. Les attaques sur les villages font une pause pendant ces vagues." },
          { type: "p", text: "Une fois la vague 9 / 19 terminée :" },
          { type: "list", items: ["Rappelez **UNE** marche puissante.", "Envoyez-la directement au QG.", "Maximum 68K troupes par membre.", "Utilisez {chenko} ou {amadeus} en position 1, ou votre héros aux dégâts bruts les plus élevés.", "Après la vague du QG, rappelez et retournez renforcer le membre qui vous est assigné."] },
          { type: "callout", text: "⚠️ **IMPORTANT :** Vous pouvez renforcer le QG pour la vague 10 **OU** la vague 20 — **PAS LES DEUX.**" },
          { type: "p", text: "Coordonnez-vous avec les R4/R5 pour que chacun ait son tour et que le QG se remplisse efficacement." }
        ]
      },
      pt: {
        title: "Vingança Viking",
        blocks: [
          { type: "h", text: "QUANDO" },
          { type: "p", text: "A cada 2 semanas — duas sessões de 30 minutos, no Dia 1 e no Dia 3. Agendadas pela liderança, geralmente perto dos horários da {bearHunt}." },
          { type: "h", text: "📌 PREPARAÇÃO" },
          { type: "sub", text: "Esvazie sua cidade" },
          { type: "list", items: ["Envie **TODA** a infantaria e a cavalaria para reforçar os membros da aliança.", "A arquearia extra pode ficar em casa — ela não rouba pontos de reforço.", "Mesmo que você fique offline durante o evento, esvazie sua cidade antes! Você ainda pode ganhar pontos e dá aos outros membros a chance de ganhar pontos ao reforçar você."] },
          { type: "sub", text: "Mantenha os 3 melhores heróis em casa" },
          { type: "p", text: "Deixe seus 3 melhores heróis de Defesa/Ataque na sua Estação de Guarda." },
          { type: "list", items: ["**F2P:** {jabel} / {howard} / {quinn}", "**P2W:** {amadeus} ou {helga} / {jabel} / {saul}"] },
          { type: "sub", text: "NÃO CURE" },
          { type: "p", text: "As tropas curadas voltam para casa e podem roubar mortes/pontos dos membros que estão reforçando você." },
          { type: "sub", text: "Priorize os membros ativos" },
          { type: "p", text: "Reforce primeiro os membros online. As ondas 7, 14 e 17 só atacam jogadores online." },
          { type: "h", text: "⚔️ REFORÇAR ALIADOS" },
          { type: "p", text: "Use heróis de participantes da {bearHunt} na posição 1 para maximizar os pontos de mortes." },
          { type: "p", text: "**Recomendados:** {chenko} / {amane} / {yeonwoo} / {amadeus}" },
          { type: "callout", text: "Evite heróis defensivos como {howard} ou {gordon} nas marchas de reforço." },
          { type: "h", text: "🏛️ QG — ONDAS 10 E 20" },
          { type: "p", text: "As ondas 10 e 20 atacam **SOMENTE** o QG. Os ataques às cidades pausam durante essas ondas." },
          { type: "p", text: "Depois que a onda 9 / 19 terminar:" },
          { type: "list", items: ["Revogue **UMA** marcha forte.", "Envie-a diretamente ao QG.", "Máximo de 68K tropas por membro.", "Use {chenko} ou {amadeus} na posição 1, ou seu herói de maior dano bruto.", "Depois da onda do QG, revogue e volte a reforçar o membro designado a você."] },
          { type: "callout", text: "⚠️ **IMPORTANTE:** Você pode reforçar o QG na onda 10 **OU** na onda 20 — **NÃO NAS DUAS.**" },
          { type: "p", text: "Combine com os R4/R5 para que todos tenham sua vez e o QG seja preenchido com eficiência." }
        ]
      },
      tr: {
        title: "Viking İntikamı",
        blocks: [
          { type: "h", text: "NE ZAMAN" },
          { type: "p", text: "2 haftada bir — 1. ve 3. günde 30'ar dakikalık iki oturum. Yönetim tarafından planlanır, genellikle {bearHunt} saatlerine yakındır." },
          { type: "h", text: "📌 HAZIRLIK" },
          { type: "sub", text: "Şehrinizi boşaltın" },
          { type: "list", items: ["**TÜM** piyade ve süvarileri ittifak üyelerini güçlendirmeye gönderin.", "Fazla okçular evde kalabilir — güçlendirme puanlarını çalmazlar.", "Etkinlik sırasında çevrimdışı olsanız bile şehrinizi önceden boşaltın! Yine de puan kazanabilirsiniz ve diğer üyelere sizi güçlendirerek puan kazanma fırsatı verirsiniz."] },
          { type: "sub", text: "En iyi 3 kahramanı evde tutun" },
          { type: "p", text: "En iyi 3 Savunma/Saldırı kahramanınızı Muhafız İstasyonunuzda bırakın." },
          { type: "list", items: ["**F2P:** {jabel} / {howard} / {quinn}", "**P2W:** {amadeus} veya {helga} / {jabel} / {saul}"] },
          { type: "sub", text: "İYİLEŞTİRME YAPMAYIN" },
          { type: "p", text: "İyileştirilen birlikler eve döner ve sizi güçlendiren üyelerin öldürme/puanlarını çalabilir." },
          { type: "sub", text: "Aktif üyelere öncelik verin" },
          { type: "p", text: "Önce çevrimiçi üyeleri güçlendirin. 7., 14. ve 17. dalgalar yalnızca çevrimiçi oyunculara saldırır." },
          { type: "h", text: "⚔️ MÜTTEFİKLERİ GÜÇLENDİRME" },
          { type: "p", text: "Öldürme puanlarını en üst düzeye çıkarmak için {bearHunt} etkinliğinde katılımcı olarak kullandığınız kahramanları 1. konumda kullanın." },
          { type: "p", text: "**Önerilen:** {chenko} / {amane} / {yeonwoo} / {amadeus}" },
          { type: "callout", text: "Güçlendirme intikallerinde {howard} veya {gordon} gibi savunma kahramanlarından kaçının." },
          { type: "h", text: "🏛️ KARARGAH — 10. VE 20. DALGA" },
          { type: "p", text: "10. ve 20. dalgalar **YALNIZCA** karargaha saldırır. Bu dalgalar sırasında şehir saldırıları durur." },
          { type: "p", text: "9. / 19. dalga bittikten sonra:" },
          { type: "list", items: ["**BİR** güçlü intikali geri çağırın.", "Doğrudan karargaha gönderin.", "Üye başına en fazla 68K birlik.", "1. konumda {chenko} veya {amadeus}, ya da en güçlü saf hasar kahramanınızı kullanın.", "Karargah dalgasından sonra geri çağırın ve size atanan üyeyi güçlendirmeye geri dönün."] },
          { type: "callout", text: "⚠️ **ÖNEMLİ:** Karargahı 10. dalgada **VEYA** 20. dalgada güçlendirebilirsiniz — **İKİSİNDE BİRDEN DEĞİL.**" },
          { type: "p", text: "Herkesin sırası gelsin ve karargahı verimli dolduralım diye R4/R5 ile koordine olun." }
        ]
      },
      id: {
        title: "Viking Vengeance",
        blocks: [
          { type: "h", text: "KAPAN" },
          { type: "p", text: "Setiap 2 minggu — dua sesi 30 menit pada Hari 1 & Hari 3. Dijadwalkan oleh pimpinan, biasanya dekat dengan waktu {bearHunt}." },
          { type: "h", text: "📌 PERSIAPAN" },
          { type: "sub", text: "Kosongkan Kotamu" },
          { type: "list", items: ["Kirim **SEMUA** {infantry} & {cavalry} keluar untuk memperkuat anggota aliansi.", "Pemanah tambahan boleh tetap di rumah — mereka tidak akan mencuri poin penguatan.", "Meski kamu offline selama event, kosongkan kotamu lebih dulu! Kamu tetap bisa mendapat poin sekaligus memberi anggota lain kesempatan mendapat poin dengan memperkuatmu."] },
          { type: "sub", text: "Simpan 3 Hero Terbaik di Rumah" },
          { type: "p", text: "Sisakan 3 hero Pertahanan/Serangan terbaikmu di Pos Penjaga." },
          { type: "list", items: ["**F2P:** {jabel} / {howard} / {quinn}", "**P2W:** {amadeus} atau {helga} / {jabel} / {saul}"] },
          { type: "sub", text: "JANGAN DISEMBUHKAN" },
          { type: "p", text: "Pasukan yang sudah sembuh kembali ke rumah dan bisa mencuri pembunuhan/poin dari anggota yang memperkuatmu." },
          { type: "sub", text: "Utamakan Anggota Aktif" },
          { type: "p", text: "Perkuat anggota yang online lebih dulu. Gelombang 7, 14 & 17 hanya menyerang pemain yang online." },
          { type: "h", text: "⚔️ MEMPERKUAT SEKUTU" },
          { type: "p", text: "Gunakan hero joiner {bearHunt} di posisi pertama untuk memaksimalkan poin pembunuhan." },
          { type: "p", text: "**Direkomendasikan:** {chenko} / {amane} / {yeonwoo} / {amadeus}" },
          { type: "callout", text: "Hindari hero bertahan seperti {howard} atau {gordon} di barisan penguatan." },
          { type: "h", text: "🏛️ MARKAS — GELOMBANG 10 & 20" },
          { type: "p", text: "Gelombang 10 & 20 **HANYA** menyerang markas. Serangan ke kota berhenti sementara selama gelombang ini." },
          { type: "p", text: "Setelah Gelombang 9 / 19 selesai:" },
          { type: "list", items: ["Panggil Kembali **SATU** barisan kuat.", "Kirim langsung ke markas.", "Maksimal 68K pasukan per anggota.", "Gunakan {chenko} atau {amadeus} di posisi pertama, atau hero dengan damage mentah terkuatmu.", "Setelah gelombang markas, panggil kembali dan kembali memperkuat anggota yang ditugaskan kepadamu."] },
          { type: "callout", text: "⚠️ **PENTING:** Kamu bisa memperkuat markas untuk Gelombang 10 **ATAU** Gelombang 20 — **BUKAN KEDUANYA.**" },
          { type: "p", text: "Koordinasikan dengan R4/R5 agar semua kebagian giliran dan markas terisi secara efisien." }
        ]
      },
      ru: {
        title: "Месть викингов",
        blocks: [
          { type: "h", text: "КОГДА" },
          { type: "p", text: "Раз в 2 недели — две 30-минутные сессии в день 1 и день 3. Время назначает руководство, обычно близко к времени события «{bearHunt}»." },
          { type: "h", text: "📌 ПОДГОТОВКА" },
          { type: "sub", text: "Опустошите город" },
          { type: "list", items: ["Отправьте **ВСЕХ** пехотинцев и кавалеристов в подкрепление участникам альянса.", "Лишние стрелки могут остаться дома — они не заберут очки подкрепления.", "Даже если вас не будет в сети во время события, опустошите город заранее! Вы всё равно сможете получать очки, а другие участники получат возможность зарабатывать очки, отправляя подкрепление вам."] },
          { type: "sub", text: "Оставьте 3 лучших героев дома" },
          { type: "p", text: "Оставьте трёх лучших героев защиты/атаки в «Крепостной стене»." },
          { type: "list", items: ["**F2P:** {jabel} / {howard} / {quinn}", "**P2W:** {amadeus} или {helga} / {jabel} / {saul}"] },
          { type: "sub", text: "НЕ ЛЕЧИТЕ ВОЙСКА" },
          { type: "p", text: "Вылеченные войска возвращаются домой и могут забрать убийства/очки у участников, отправивших вам подкрепление." },
          { type: "sub", text: "Приоритет активным участникам" },
          { type: "p", text: "Сначала отправляйте подкрепление участникам, которые в сети. Волны 7, 14 и 17 атакуют только игроков в сети." },
          { type: "h", text: "⚔️ ПОДКРЕПЛЕНИЕ СОЮЗНИКАМ" },
          { type: "p", text: "Ставьте в первую позицию героев, которых вы используете как участников события «{bearHunt}», чтобы получить максимум очков убийств." },
          { type: "p", text: "**Рекомендуются:** {chenko} / {amane} / {yeonwoo} / {amadeus}" },
          { type: "callout", text: "Не используйте защитных героев, таких как {howard} или {gordon}, в маршах подкрепления." },
          { type: "h", text: "🏛️ ШТАБ — ВОЛНЫ 10 И 20" },
          { type: "p", text: "Волны 10 и 20 атакуют **ТОЛЬКО** штаб. Атаки на города в эти волны приостанавливаются." },
          { type: "p", text: "После окончания волны 9 / 19:" },
          { type: "list", items: ["Отзовите **ОДИН** сильный марш.", "Отправьте его прямо в штаб.", "Не более 68K войск на участника.", "В первую позицию поставьте {chenko} или {amadeus}, либо вашего сильнейшего героя по чистому урону.", "После волны штаба отзовите марш и вернитесь к подкреплению закреплённого за вами участника."] },
          { type: "callout", text: "⚠️ **ВАЖНО:** Отправлять подкрепление в штаб можно в волне 10 **ИЛИ** в волне 20 — **НЕ В ОБЕ.**" },
          { type: "p", text: "Согласуйте с R4/R5, чтобы каждому досталась очередь и штаб заполнялся эффективно." }
        ]
      },
      th: {
        title: "การล้างแค้นของไวกิ้ง",
        blocks: [
          { type: "h", text: "เมื่อไหร่" },
          { type: "p", text: "ทุก 2 สัปดาห์ — 2 รอบ รอบละ 30 นาที ในวันที่ 1 และวันที่ 3 ผู้นำเป็นผู้กำหนดเวลา ซึ่งมักใกล้เคียงกับเวลา{bearHunt}" },
          { type: "h", text: "📌 การเตรียมตัว" },
          { type: "sub", text: "ทำให้เมืองว่าง" },
          { type: "list", items: ["ส่ง{infantry}และ{cavalry}**ทั้งหมด**ออกไปส่งกำลังเสริมให้สมาชิกพันธมิตร", "{archer}ส่วนเกินอยู่ที่บ้านได้ — จะไม่แย่งคะแนนจากการเสริมกำลัง", "แม้คุณจะออฟไลน์ระหว่างอีเวนต์ ก็ให้ทำให้เมืองว่างไว้ก่อน! คุณยังได้รับคะแนนได้ และยังเปิดโอกาสให้สมาชิกคนอื่นได้คะแนนจากการส่งกำลังเสริมให้คุณ"] },
          { type: "sub", text: "เก็บฮีโร่ที่ดีที่สุด 3 ตัวไว้ที่บ้าน" },
          { type: "p", text: "ให้ฮีโร่ป้องกัน/โจมตีที่ดีที่สุด 3 ตัวอยู่ในด่านรักษาการณ์ (Guard Station) ของคุณ" },
          { type: "list", items: ["**F2P:** {jabel} / {howard} / {quinn}", "**P2W:** {amadeus} หรือ {helga} / {jabel} / {saul}"] },
          { type: "sub", text: "ห้ามรักษา" },
          { type: "p", text: "ทหารที่รักษาแล้วจะกลับบ้านและอาจแย่งการสังหาร/คะแนนจากสมาชิกที่ส่งกำลังเสริมให้คุณ" },
          { type: "sub", text: "ให้ความสำคัญกับสมาชิกที่ออนไลน์" },
          { type: "p", text: "ส่งกำลังเสริมให้สมาชิกที่ออนไลน์ก่อน ระลอกที่ 7, 14 และ 17 โจมตีเฉพาะผู้เล่นที่ออนไลน์" },
          { type: "h", text: "⚔️ ส่งกำลังเสริมให้พันธมิตร" },
          { type: "p", text: "ใช้ฮีโร่ที่คุณใช้เป็นผู้เข้าร่วมใน{bearHunt}ในตำแหน่งแรก เพื่อให้ได้คะแนนการสังหารสูงสุด" },
          { type: "p", text: "**แนะนำ:** {chenko} / {amane} / {yeonwoo} / {amadeus}" },
          { type: "callout", text: "หลีกเลี่ยงฮีโร่สายป้องกันอย่าง{howard}หรือ{gordon}ในการเดินทัพเสริมกำลัง" },
          { type: "h", text: "🏛️ ศูนย์บัญชาการ — ระลอกที่ 10 และ 20" },
          { type: "p", text: "ระลอกที่ 10 และ 20 โจมตี**เฉพาะ**ศูนย์บัญชาการ การโจมตีเมืองจะหยุดชั่วคราวในระลอกเหล่านี้" },
          { type: "p", text: "หลังจากระลอกที่ 9 / 19 จบลง:" },
          { type: "list", items: ["เรียกกลับการเดินทัพที่แข็งแกร่ง**หนึ่ง**ชุด", "ส่งตรงไปยังศูนย์บัญชาการ", "ทหารสูงสุด 68K ต่อสมาชิก", "ใช้{chenko}หรือ{amadeus}ในตำแหน่งแรก หรือฮีโร่ที่มีความเสียหายดิบสูงที่สุดของคุณ", "หลังจบระลอกของศูนย์บัญชาการ ให้เรียกกลับแล้วกลับไปส่งกำลังเสริมให้สมาชิกที่ได้รับมอบหมาย"] },
          { type: "callout", text: "⚠️ **สำคัญ:** คุณส่งกำลังเสริมให้ศูนย์บัญชาการได้ในระลอกที่ 10 **หรือ** ระลอกที่ 20 — **ไม่ใช่ทั้งสองระลอก**" },
          { type: "p", text: "ประสานงานกับ R4/R5 เพื่อให้ทุกคนได้ถึงคิวและเติมศูนย์บัญชาการได้อย่างมีประสิทธิภาพ" }
        ]
      },
      ar: {
        title: "انتقام الفايكنغ",
        blocks: [
          { type: "h", text: "متى" },
          { type: "p", text: "كل أسبوعين — جلستان مدة كل منهما 30 دقيقة، في اليوم 1 واليوم 3. تحددها القيادة، وغالبًا تكون قريبة من مواعيد {bearHunt}." },
          { type: "h", text: "📌 التحضير" },
          { type: "sub", text: "أخلِ مدينتك" },
          { type: "list", items: ["أرسل **كل** {infantry} و{cavalry} لتعزيز أعضاء التحالف.", "يمكن أن يبقى الرماة الزائدون في المنزل — لن يسرقوا نقاط التعزيز.", "حتى لو كنت غير متصل أثناء الفعالية، أخلِ مدينتك مسبقًا! ما زال بإمكانك كسب النقاط، كما تمنح الأعضاء الآخرين فرصة كسب النقاط بتعزيزك."] },
          { type: "sub", text: "أبقِ أفضل 3 أبطال في المنزل" },
          { type: "p", text: "اترك أفضل 3 أبطال دفاع/هجوم في محطة الحراسة الخاصة بك." },
          { type: "list", items: ["**F2P:** {jabel} / {howard} / {quinn}", "**P2W:** {amadeus} أو {helga} / {jabel} / {saul}"] },
          { type: "sub", text: "لا تعالج القوات" },
          { type: "p", text: "القوات المعالجة تعود إلى المنزل وقد تسرق القتلى/النقاط من الأعضاء الذين يعززونك." },
          { type: "sub", text: "أعطِ الأولوية للأعضاء النشطين" },
          { type: "p", text: "عزز الأعضاء المتصلين أولًا. الموجات 7 و14 و17 تهاجم اللاعبين المتصلين فقط." },
          { type: "h", text: "⚔️ تعزيز الحلفاء" },
          { type: "p", text: "استخدم أبطال المنضمين إلى {bearHunt} في الموضع الأول لتحقيق أقصى نقاط القتلى." },
          { type: "p", text: "**موصى به:** {chenko} / {amane} / {yeonwoo} / {amadeus}" },
          { type: "callout", text: "تجنب الأبطال الدفاعيين مثل {howard} أو {gordon} في طوابير التعزيز." },
          { type: "h", text: "🏛️ المقر — الموجتان 10 و20" },
          { type: "p", text: "الموجتان 10 و20 تهاجمان المقر **فقط**. تتوقف الهجمات على المدن خلال هاتين الموجتين." },
          { type: "p", text: "بعد انتهاء الموجة 9 / 19:" },
          { type: "list", items: ["استدعِ طابورًا قويًا **واحدًا**.", "أرسله مباشرة إلى المقر.", "بحد أقصى 68K من القوات لكل عضو.", "استخدم {chenko} أو {amadeus} في الموضع الأول، أو أقوى بطل لديك من حيث الضرر الخام.", "بعد موجة المقر، استدعِ الطابور وعُد إلى تعزيز العضو المخصص لك."] },
          { type: "callout", text: "⚠️ **مهم:** يمكنك تعزيز المقر في الموجة 10 **أو** الموجة 20 — **وليس كلتيهما.**" },
          { type: "p", text: "نسّق مع R4/R5 ليأخذ الجميع دورهم ونملأ المقر بكفاءة." }
        ]
      }
    }
  },
  "bear-hunt": {
    emoji: "🐻",
    name: { zh: "狩獵巨熊", en: "Bear Hunt", ko: "자이언트 베어 사냥", de: "Bärenjagd", fr: "Chasse à l'Ours", pt: "Caça ao Urso", tr: "Ayı Avı", id: "Bear Hunt", ru: "Охота на медведя", th: "ล่าหมี", ar: "صيد الدببة" },
    sections: {
      zh: {
        title: "狩獵巨熊",
        when_label: "時間",
        when: "每 2 天，依聯盟排定的時間進行。",
        why_label: "重要性",
        why: "英雄裝備材料（鍛造錘）與強化經驗值的主要來源。",
        prep_label: "準備事項",
        prep: [
          "每次狩獵巨熊前更新部隊編組。",
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
        title: "자이언트 베어 사냥",
        when_label: "일시",
        when: "연맹에 지정된 시간에 2일마다 진행됩니다.",
        why_label: "중요성",
        why: "영웅 장비 재료(제작 망치) 및 강화 경험치의 주요 획득처입니다.",
        prep_label: "준비 사항",
        prep: [
          "매번 자이언트 베어 사냥 시작 전에 부대 편성을 업데이트하세요.",
          { callout: true, text: "선택 사항: <a href=\"https://frakinator.streamlit.app/\" target=\"_blank\" rel=\"noopener\">frakinator.streamlit.app</a>를 사용하여 병사 비율을 테스트하고 가장 강력한 부대 편성을 찾아보세요." },
          "이벤트가 시작되기 전에 채집 중인 부대를 소환하세요.",
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
        why: "Hauptquelle für Heldenausrüstungs-Material (Forgehammer) und Verbesserungs-XP.",
        prep_label: "VORBEREITUNG",
        prep: [
          "Aktualisiert eure Trupp Formationen vor jeder Bärenjagd.",
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
              ko: "아마데우스는 기본적으로 훌륭한 보병 및 기병 능력치를 갖추고 있어, 궁병 중심의 부대 편성에서 가장 뛰어난 효율을 발휘합니다.",
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
              zh: "馬林能大幅提升傷害，因為擁有集結專屬裝備（殺傷力加成）；步兵固定用阿瑪迪斯或赫爾加。",
              en: "Troop formation: 20-30-50%. Marlin will boost damage a lot due to his widget. From Gen 2 up, infantry will always be Amadeus or Helga — they are the only infantry heroes with rally widgets (lethality bonus). You send fewer infantry, so the infantry hero covers archer damage via the widget rather than matching infantry stats.",
              ko: "마린은 집결 전용 파괴력 장비로 피해를 크게 올립니다. 보병은 아마데우스 또는 헬가.",
              de: "Marlin steigert den Schaden durch seine Rally-exklusive Tödlichkeitsausrüstung; Infanterie bleibt Amadeus oder Helga."
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
              zh: "滿等赫爾加（2 殺傷力＋1 攻擊）表現優於阿瑪迪斯（1 殺傷力＋2 攻擊）。",
              en: "Troop formation: 10-20-70%. Maxed-out Helga performs better than Amadeus in Gen 3, due to having 2 lethality widgets and 1 attack widget compared to 1 lethality widget and 2 attack widgets in this setup.",
              ko: "풀 장비 헬가(파괴력 2 + 공격 1)가 아마데우스(파괴력 1 + 공격 2)보다 강합니다.",
              de: "Voll ausgerüstete Helga (2 Tödlichkeit + 1 Angriff) übertrifft hier Amadeus (1 Tödlichkeit + 2 Angriff)."
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
              ko: "이제부터는 궁병 중심의 부대 편성을 운영합니다. 티어 TG5 기병과 함께 로사의 3번째 스킬이 부여하는 궁병 전체 공격력 30% 증가는 매우 강력한 효과입니다.",
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
    name: { zh: "聖劍爭奪", en: "Swordland Showdown", ko: "성검 쟁탈", de: "Schwertland-Showdown", fr: "Choc du Glaive", tr: "Kılıçdiyarı Hesaplaşması", id: "Swordland Showdown", ru: "Битва за Страну мечей", th: "ศึกดวลดินแดนดาบ", ar: "مواجهة أرض السيوف", pt: "Confronto entre Espadas" },
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
          { type: "img", src: "figures/NEXUS_SwordlanShowdown_Map.jpeg", alt: "Assigned zones" },

          { type: "h", text: "分配區域" },
          { type: "p", text: "R4 會在開戰前，把確定參加的成員分成小隊／區域。" },
          { type: "p", text: "我們**最強的攻擊手**會先被分配到以下區域：" },
          { type: "list", items: [
            "🟣 **紫色 — {belltower}**",
            "🟡 **黃色 — {stables}**",
            "🔵 **藍色 — {sanctumNW}**",
            "🟢 **綠色 — {sanctumSE}**"
          ]},
          { type: "p", text: "其餘成員會被分配去支援其中一區。視戰況可能需要輪調，請隨時關注戰場聊天頻道。" },
          { type: "p", text: "除非幹部指示移動，否則請留在自己的區域。" },
          { type: "zones", labels: {
            purple: "🟣 紫色區域 — {belltower}／{mercenary}",
            blue: "🔵 藍色區域 — {sanctumNW}／{abbey}",
            yellow: "🟡 黃色區域 — {stables}／{abbey}",
            green: "🟢 綠色區域 — {sanctumSE}／{abbey}",
            center: "⚪ 中央"
          }},
          { type: "img", src: "figures/assigned_zone.png", alt: "Assigned zones" },

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
          { type: "callout", text: "⚠️ **重要：** 開戰當天會出現新的**戰場聊天**分頁。**整場戰鬥期間請隨時關注。**" },

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
            "隨時關注戰場聊天頻道。",
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
        title: "Schwertland-Showdown",
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
          { type: "img", src: "figures/NEXUS_SwordlanShowdown_Map.jpeg", alt: "Assigned zones" },
           
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
          { type: "img", src: "figures/assigned_zone.png", alt: "Assigned zones" },

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
          { type: "p", text: "상대 연맹보다 더 많은 **연맹 성스러운 계약 포인트(Alliance Relic Points)**를 획득하여 승리하세요." },
          { type: "list", items: [
            "주요 건물을 점령하고 유지하기",
            "누적된 점수 보호하기",
            "건물의 소유권이 바뀔 때 군수 물자 즉시 수집하기",
            "땅굴 (Untergewölbe)이 나타나면 수집하기",
            "집결중이 아닐 때는 근처 주둔지 지원하기",
            "부대가 대기 상태로 방치되지 않도록 하기",
            "**맵 전체를 돌아다니며 킬을 쫓지 마세요.** 무작위 PvP는 아군의 대형을 흩어지게 하고 전투 효율을 떨어뜨립니다. 점령 건물 근처의 적을 약화시키는 등 의미가 있을 때만 저렙 도시에 공격을 가하세요."
          ]},

          { type: "h", text: "🏛️ 주요 건물 및 점수 정보" },
          { type: "sub", text: "성검 제단(Swordshrine)" },
          { type: "list", items: ["첫 점령 보상: 연맹 9,000점 / 개인 4,500점", "지속 점령 보상: 연맹 +1,800/분 / 개인 +900/분"] },
          { type: "sub", text: "성소(Sanctum)" },
          { type: "list", items: ["첫 점령 보상: 연맹 6,000점 / 개인 3,000점", "지속 점령 보상: 연맹 +1,200/분 / 개인 +600/분"] },
          { type: "sub", text: "수도원(Abbey)" },
          { type: "list", items: ["첫 점령 보상: 연맹 3,000점 / 개인 1,500점", "지속 점령 보상: 연맹 +600/분 / 개인 +300/분"] },
          { type: "sub", text: "용병 주둔지(Mercenary)" },
          { type: "list", items: ["첫 점령 보상: 연맹 1,200점 / 개인 600점", "지속 점령 보상: 연맹 +240/분 / 개인 +120/분"] },
          { type: "sub", text: "교화의 홀(Reformation)" },
          { type: "list", items: ["첫 점령 보상: 연맹 1,200점 / 개인 600점", "지속 점령 보상: 연맹 +240/분 / 개인 +120/분"] },
          { type: "sub", text: "마구간(Stables)" },
          { type: "list", items: ["첫 점령 보상: 연맹 1,200점 / 개인 600점", "지속 점령 보상: 연맹 +240/분 / 개인 +120/분"] },
          { type: "sub", text: "시계탑(Bell Tower)" },
          { type: "list", items: ["첫 점령 보상: 연맹 1,200점 / 개인 600점", "지속 점령 보상: 연맹 +240/분 / 개인 +120/분"] },
          { type: "sub", text: "땅굴(Untergewölbe)" },
          { type: "list", items: ["주기적으로(총 2번의 웨이브로) 생성되는 채집 장소"] },
          { type: "img", src: "figures/NEXUS_SwordlanShowdown_Map.jpeg", alt: "Assigned zones" },
           
          { type: "h", text: "🏛️ 건물 오픈 시간 및 우선순위" },
          { type: "sub", text: "🐎 마구간" },
          { type: "list", items: ["오픈 시간: 0분", "우선순위: 🔴 높음 (HIGH)", "효과: 도시 이전 쿨다운 -50%"] },
          { type: "sub", text: "🔔 시계탑" },
          { type: "list", items: ["오픈 시간: 0분", "우선순위: 🔴 높음 (HIGH)", "효과: 건물 점령 시간 -50%"] },
          { type: "sub", text: "🏛️ 성소" },
          { type: "list", items: ["오픈 시간: 0분", "우선순위: 🔴 높음 (HIGH)", "효과: 고가치 연맹 점수 획득"] },
          { type: "sub", text: "⛪ 수도원" },
          { type: "list", items: ["오픈 시간: 0분", "우선순위: 🟡 보통 (MED)", "효과: 연맹 점수 생성"] },
          { type: "sub", text: "⚔️ 성검 제단" },
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
            "🔵 **파란색(Blue) — 북서 성소 (Northwest Sanctum)**",
            "🟢 **초록색(Green) — 남동 성소 (Southeast Sanctum)**"
          ]},
          { type: "p", text: "나머지 멤버들은 위 구역/팀 중 한 곳을 지원하도록 배정됩니다. 전황에 따라 로테이션이 필요할 수 있으니 — 항상 스쿼드 채팅을 예의 주시해 주세요." },
          { type: "p", text: "리더십의 지시가 있기 전까지는 배정된 구역에 머물러 주세요." },
          { type: "img", src: "figures/assigned_zone.png", alt: "Assigned zones" },

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
            "적이 우리가 점령한 건물을 공격하여 소유권이 적에게 넘어가면, **즉시 근처로 도시 이전하거나 가속 행군을 사용하여** **적이 가져가기 전에 군수 물자/포인트를 수집하기.**",
            "**전투 시작 후 20분이 지나면** 땅굴(Untergewölbe)이 남. 가용한 병력을 보내 추가 포인트를 위해 채집하기.",
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
              { title: "경쟁 구역:", lines: ["**#8 북서 성소 (Northwest Sanctum)**", "**#10 남동 성소 (Southeast Sanctum)**"] },
              { title: "", lines: [
                "수도원(Abbey)은 여유가 될 때 점령하되, 이를 위해 핵심 목표를 희생하지 마세요.",
                "**14:30**, 최정예 플레이어들은 중앙 지역을 준비하세요."
              ]}
            ]},
            { time: "‼️ 15:00", title: "핵심 건물 오픈", lines: [
              "**#1 성검 제단 (Swordshrine)**",
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
            ], warn: "⚠️ 주둔 중인 멤버들 — 임원진의 지시가 없는 한 성검 제단을 위해 본인의 건물을 포기하지 마세요. 성소 및 기타 중요 건물들을 계속 보호해야 합니다." },
            { time: "💪 15:00–45:00", title: "통제 단계", lines: [
              "주요 목표: **성검 제단 + 북서 성소 + 남동 성소를 사수하세요.**",
              "시계탑/마구간 통제 유지하기",
              "주요 교전 시 교화의 홀 버프 활용하기",
              "적 건물을 압박하기 위해 용병 주둔지 활용하기",
              "건물의 소유권이 바뀔 때마다(flip) 군수 물자/ 즉시 수집하기",
              "약화된 주둔부대 지원하기"
            ]},
            { time: "⛏️ 20:00–60:00", title: "땅굴 (Untergewölbe)", lines: [
              "땅굴이 생성되기 시작합니다.",
              "지원 플레이어들과 가용한 부대가 있는 누구나 추가 점수를 위해 땅굴을 채집하세요.",
              "채집만을 위해 중요한 방어나 집결을 포기하지 마세요."
            ]},
            { time: "🏁 마지막 15분", title: "", groups: [
              { title: "우리가 이기고 있을 때", lines: [
                "성검 제단과 소 사수하기",
                "누적 점수 건물 지원하기",
                "불필요한 PvP 피하기",
                "군수 물자 즉시 회수하기",
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
          { type: "sub", text: "📦 건물 소유권 변경 및 군수 물자" },
          { type: "p", text: "건물의 소유권이 바뀌면, **주위에 흩어진 포인트가 나타날 수 있습니다.**" },
          { type: "p", text: "**우리가 건물을 뺏겼을 때:** 떨어진 전리품을 최대한 빠르게 수집하세요." },
          { type: "p", text: "**우리가 적의 건물을 점령했을 때:** 적이 되찾기 전에 군수 물자을 먼저 수집하세요." },
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
            "군수 물자을 즉시 수집하세요.",
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
        title: "Schwertland-Showdown",
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
            "Frachtzugvorräte sofort einsammeln, wenn Gebäude die Seiten wechseln",
            "Untergewölbe sammeln, wenn sie erscheinen",
            "Verstärke nahegelegene Garnisonen, wenn du nicht gerade eine Rally startest",
            "Lass Märsche nicht untätig herumstehen",
            "**JAGE KEINE Kills quer über die Karte.** Zufälliges PvP zerstreut uns und verringert unsere Effektivität. Greife Städte niedrigeren Levels an, wenn es sinnvoll ist; schwäche sie in der Nähe eines gehaltenen Gebäudes."
          ]},
          { type: "h", text: "🏛️ GEBÄUDE IM ÜBERBLICK" },
          { type: "buildings",
            legend: "Zahlen in der Reihenfolge: {allianceRelic} / {personalRelic}",
            cols: { first: "Erste Eroberung", hold: "Fortwährende Besatzung", open: "Öffnet", min: "Min.", perMin: "/M", sep: ": " },
            priority: { top: "HÖCHSTE", high: "HOCH", med: "MITTEL" },
            gather: "Sammelstellen, die regelmäßig erscheinen (zwei Wellen)",
            purposes: {
              swordshrine: "Gebäude mit dem höchsten Punktwert",
              mercenary: "Schwächt vom Feind gehaltene Gebäude",
              reformation: "Kampfbonus für die Allianz",
              sanctum: "Hochwertige {allianceRelic}",
              abbey: "Erzeugt {allianceRelic}",
              stables: "-50 % Teleport-Cooldown",
              belltower: "-50 % Zeit für die Kontrolle von Gebäuden"
            } },
          { type: "img", src: "figures/NEXUS_SwordlanShowdown_Map.jpeg", alt: "Assigned zones" },
           
          { type: "h", text: "🗺️ ZUGEWIESENE ZONEN" },
          { type: "p", text: "R4 wird bestätigte Mitglieder vor der Schlacht in Teams/Zonen aufteilen." },
          { type: "p", text: "Unsere **Stärksten Angreifer** werden zunächst einer Zone zugewiesen:" },
          { type: "list", items: [
            "🟣 **Lila — Glockenturm**",
            "🟡 **Gelb — Königliche Ställe**",
            "🔵 **Blau — {sanctumNW}**",
            "🟢 **Grün — {sanctumSE}**"
          ]},
          { type: "p", text: "Verbleibende Mitglieder werden zugewiesen, eine dieser Zonen/Teams zu unterstützen. Rotation kann je nach Schlachtbedingungen erforderlich sein - überwache immer den Squad Chat für Details." },
          { type: "p", text: "Bleib bei deiner zugewiesenen Zone, es sei denn, die Führung sagt dir, dass du dich bewegen sollst." },
          { type: "zones", labels: { purple: "🟣 Lila Zone — {belltower} / {mercenary}", blue: "🔵 Blaue Zone — {sanctumNW} / {abbey}", yellow: "🟡 Gelbe Zone — {stables} / {abbey}", green: "🟢 Grüne Zone — {sanctumSE} / {abbey}", center: "⚪ Mitte" } },
          { type: "img", src: "figures/assigned_zone.png", alt: "Assigned zones" },

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
            "Wenn der Feind eines unserer eroberten Gebäude angreift und die Kontrolle zum Feind wechselt, **teleportiere in die Nähe oder führe sofort einen Schnellmarsch aus** und sammle die **Frachtzugvorräte/Punkte, bevor sie es tun.**",
            "**20 Minuten nach Beginn der Schlacht**, Untergewölbe erscheinen. Sende verfügbare Truppen, um sie für zusätzliche Punkte zu sammeln.",
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
              { title: "Sofort sichern:", lines: ["**#4 Glockenturm**", "**#7 Königliche Ställe**"] },
              { title: "Umkämpfen:", lines: ["**#8 {sanctumNW}**", "**#10 {sanctumSE}**"] },
              { title: "", lines: [
                "Nehmt Abteien, wenn es praktikabel ist, aber opfert dafür keine Kernziele.",
                "~ **14:30**, stärkste Spieler machen sich für das Zentrum bereit."
              ]}
            ]},
            { time: "15:00", title: "MACHTGEBÄUDE ÖFFNEN", lines: [
              "**#1 Schwertschrein**",
              "**#2 Söldnerlager**",
              "**#3 Reformationshalle**",
              "Die Führung wird Prioritäten basierend auf den Schlachtbedingungen ansagen."
            ], groups: [
              { title: "⭐ SCHWERTSCHREIN", lines: [
                "Stärkste Angreifer/Verteidiger teleportieren sich zum Zentrum (nicht alle)",
                "Erobert den Schwertschrein",
                "Sobald gesichert, hält ein starker Verteidiger die Garnison",
                "Unterstützer/Joiner müssen im Schnellmarsch Verstärkung senden"
              ]}
            ], warn: "⚠️ Mitglieder in Garnison - verlasst euer Gebäude nicht für den Schwertschrein, es sei denn, die Führung rät dazu. Schützt weiterhin die Heiligtums und andere wichtige Gebäude." },
            { time: "💪 15:00–45:00", title: "KONTROLLPHASE", lines: [
              "Hauptziel: **Haltet Schwertschrein + {sanctumNW} + {sanctumSE}.**",
              "Haltet nützliche Kontrolle über Glockenturm/Königliche Ställe aufrecht",
              "Nutzt den Buff der Reformationshalle für große Gefechte",
              "Nutzt das Söldnerlager, um feindliche Gebäude unter Druck zu setzen",
              "Sammelt Frachtzugvorräte nach JEDEM Gebäudewechsel ein",
              "Verstärkt geschwächte Garnisonen"
            ]},
            { time: "⛏️ 20:00-60:00", title: "Untergewölbe", lines: [
              "Untergewölbe erscheinen.",
              "Unterstützer und alle mit verfügbaren Märschen sollten sie für zusätzliche Punkte sammeln.",
              "**Verlasst nicht eine kritische Verteidigung oder Rally, nur um zu sammeln.**"
            ]},
            { time: "🏁 LETZTE 15 MINUTEN", title: "", groups: [
              { title: "WENN WIR VORNE LIEGEN", lines: [
                "Schützt Schwertschrein und Heiligtums",
                "Verstärkt Gebäude mit angesammelten Punkten",
                "Vermeidet unnötiges PvP",
                "Holt Frachtzugvorräte sofort zurück",
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
          ]},
          { type: "h", text: "📌 ZUSAMMENFASSUNG" },
          { type: "p", text: "Die Gruppen werden in 3 Funktionen aufgeteilt und einer Zone zugewiesen:" },
          { type: "list", items: [
            "**ANGREIFER** → EINNEHMEN + DRUCK MACHEN",
            "**VERTEIDIGER** → HALTEN + SCHÜTZEN",
            "**UNTERSTÜTZER** → VERSTÄRKEN + RALLY + AUFSAMMELN + SAMMELN"
          ] },
          { type: "list", items: [
            "Folge deiner zugewiesenen Zone und Rolle.",
            "Überwache den Squad-Chat.",
            "Ziele > zufällige Kills.",
            "Angreifer erobern — Verteidiger halten — Unterstützer verstärkt.",
            "Lass nützliche Märsche nie untätig.",
            "Sammle verstreute {arsenal} sofort ein.",
            "Sammle {undercellar} mit verfügbaren Märschen.",
            "Schütze {swordshrine} + {sanctum}.",
            "Verlasse Kerngebäude nicht für {abbey} oder Kills.",
            "Wenn die Führung eine Rotation ausruft, BEWEGE DICH."
          ] },
          { type: "callout", text: "⚔️ **KOORDINATION GEWINNT {swordland}**" }
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
          { type: "img", src: "figures/NEXUS_SwordlanShowdown_Map.jpeg", alt: "Assigned zones" },
           
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
          { type: "img", src: "figures/assigned_zone.png", alt: "Assigned zones" },

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
            "Activez la capacité de troupes, les bonus d'attaque et de défense, et l'Anti-repérage",
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
          { type: "img", src: "figures/NEXUS_SwordlanShowdown_Map.jpeg", alt: "Assigned zones" },
           
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
          { type: "img", src: "figures/assigned_zone.png", alt: "Assigned zones" },

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
        title: "Schwertland-Showdown",
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
          { type: "img", src: "figures/NEXUS_SwordlanShowdown_Map.jpeg", alt: "Assigned zones" },
           
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
          { type: "img", src: "figures/assigned_zone.png", alt: "Assigned zones" },

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
          { type: "img", src: "figures/NEXUS_SwordlanShowdown_Map.jpeg", alt: "Assigned zones" },
           
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
          { type: "img", src: "figures/assigned_zone.png", alt: "Assigned zones" },

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
          { type: "img", src: "figures/NEXUS_SwordlanShowdown_Map.jpeg", alt: "Assigned zones" },
           
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
          { type: "img", src: "figures/assigned_zone.png", alt: "Assigned zones" },

          { type: "h", text: "บทบาทและหน้าที่" },
          { type: "p", text: "R4 จะแบ่งสมาชิกที่ยืนยันแล้วตามพลังเป็น 3 หน้าที่: **หน่วยบุก หน่วยรับ และหน่วยสนับสนุน/ผู้เข้าร่วมระดมพล**" },

          { type: "sub", text: "⚔️ 1) หน่วยบุก" },
          { type: "p", text: "**ใคร:** ผู้เล่นที่แข็งแกร่งที่สุดของเรา มีการย้ายถิ่นฐานขั้นสูงเพียงพอ" },
          { type: "p", text: "**หน้าที่ของคุณ:**" },
          { type: "list", items: [
            "ย้ายถิ่นฐานไปยังโซนและสิ่งปลูกสร้างที่ได้รับมอบหมาย",
            "ยึดครองสิ่งปลูกสร้างที่มีความสำคัญสูง",
            "โจมตีปราสาทศัตรูที่อ่อนแอเดี่ยว ๆ",
            "นำทีมระดมพลที่สำคัญ",
            "ไปยังเป้าหมายถัดไปเมื่อหน่วยรับเข้ามารับช่วง",
            "เมื่อศัตรูย้ายถิ่นฐานมาใกล้สิ่งปลูกสร้างของคุณ ให้เล็งปราสาทที่อ่อนแอหรือไร้การป้องกัน"
          ]},

          { type: "sub", text: "🛡️ 2) หน่วยรับ" },
          { type: "p", text: "**ใคร:** ผู้เล่นที่แข็งแกร่งรองลงมา มีความจุทีมระดมพล/กองรักษาการณ์ที่ดี" },
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
            "**ต้อง**เข้าร่วมทีมระดมพลของหน่วยรับที่ได้รับมอบหมาย",
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
              "**อย่าทิ้งการป้องกันหรือทีมระดมพลที่สำคัญเพียงเพื่อไปเก็บ**"
            ]},
            { time: "15 นาทีสุดท้าย", title: "🏁 ช่วงปิดท้าย", groups: [
              { title: "หากเรานำอยู่", lines: ["ปกป้อง {swordshrine} และ {sanctum}", "เสริมกำลังสิ่งปลูกสร้างที่สะสมคะแนน", "หลีกเลี่ยง PvP ที่ไม่จำเป็น", "เก็บ {arsenal} ที่กระจัดกระจายคืนทันที", "อย่าเสี่ยงโดยไม่จำเป็น"] },
              { title: "หากเราตามอยู่", lines: ["กดดันสิ่งปลูกสร้างหลักของศัตรู", "ใช้ {mercenary} ก่อนการโจมตีแบบประสานงาน", "รวมกำลังในทีมระดมพลแทนการโจมตีมั่ว", "เล็งสิ่งปลูกสร้างมูลค่าสูงที่ศัตรูยึดครอง", "เก็บทุกคะแนนที่ตกหลังเปลี่ยนมือสำเร็จ"] }
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
          { type: "img", src: "figures/NEXUS_SwordlanShowdown_Map.jpeg", alt: "Assigned zones" },
           
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
          { type: "img", src: "figures/assigned_zone.png", alt: "Assigned zones" },

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
      },

      pt: {
        title: "Confronto entre Espadas",
        blocks: [
          { type: "h", text: "QUANDO" },
          { type: "p", text: "A cada 2 semanas — evento de campo de batalha de aliança contra aliança, com 60 minutos de duração." },

          { type: "h", text: "INSCRIÇÃO" },
          { type: "callout", text: "⚠️ **Inscreva-se apenas se você pretende participar.** Jogadores inscritos que não comparecem ocupam uma vaga valiosa e podem afetar o pareamento." },
          { type: "list", items: ["**100% disponível → Enviar solicitação de participação**", "**Não tenho certeza → Abster-se**"] },

          { type: "h", text: "OBJETIVO PRINCIPAL" },
          { type: "p", text: "Vença conquistando mais {allianceRelic} do que a aliança adversária." },
          { type: "list", items: [
            "Capturar e manter as construções importantes",
            "Proteger os pontos acumulados",
            "Recolher imediatamente os {arsenal} espalhados quando uma construção mudar de lado",
            "Coletar os {undercellar} quando aparecerem",
            "Reforçar as guarnições próximas quando não estiver em um rally",
            "Não deixar nenhuma marcha parada",
            "**NÃO persiga abates pelo mapa.** PvP aleatório nos dispersa e reduz nossa eficácia. Ataque cidades de nível mais baixo quando fizer sentido, enfraquecendo-as perto de uma construção que estamos mantendo."
          ]},

          { type: "h", text: "VISÃO GERAL DAS CONSTRUÇÕES" },
          { type: "buildings",
            legend: "Números na ordem: {allianceRelic} / {personalRelic}",
            cols: { first: "Primeiro Controle", hold: "Ocupação Contínua", open: "Abertura", min: "min", perMin: "/m", sep: ": " },
            priority: { top: "MÁXIMA", high: "ALTA", med: "MÉDIA" },
            gather: "Locais de coleta que aparecem periodicamente (duas ondas)",
            purposes: {
              swordshrine: "Construção que rende mais pontos",
              mercenary: "Enfraquece construções mantidas pelo inimigo",
              reformation: "Bônus de combate para a aliança",
              sanctum: "{allianceRelic} de alto valor",
              abbey: "Gera {allianceRelic}",
              stables: "-50% no intervalo entre teletransportes",
              belltower: "-50% no tempo necessário para assumir o controle das construções"
            }
          },
          { type: "img", src: "figures/NEXUS_SwordlanShowdown_Map.jpeg", alt: "Assigned zones" },
           
          { type: "h", text: "ZONAS DESIGNADAS" },
          { type: "p", text: "Os R4 dividirão os membros confirmados em equipes/zonas antes da batalha." },
          { type: "p", text: "Nossos **melhores atacantes** serão designados primeiro para uma zona:" },
          { type: "list", items: [
            "🟣 **Roxa — {belltower}**",
            "🟡 **Amarela — {stables}**",
            "🔵 **Azul — {sanctumNW}**",
            "🟢 **Verde — {sanctumSE}**"
          ]},
          { type: "p", text: "Os demais membros serão designados para apoiar uma dessas zonas/equipes. Pode ser necessário fazer rodízio conforme a situação da batalha — acompanhe sempre o Chat do Esquadrão para saber os detalhes." },
          { type: "p", text: "Permaneça na zona designada, a menos que a liderança mande você se mover." },
          { type: "zones", labels: {
            purple: "🟣 Zona Roxa — {belltower} / {mercenary}",
            blue: "🔵 Zona Azul — {sanctumNW} / {abbey}",
            yellow: "🟡 Zona Amarela — {stables} / {abbey}",
            green: "🟢 Zona Verde — {sanctumSE} / {abbey}",
            center: "⚪ Centro"
          }},
          { type: "img", src: "figures/assigned_zone.png", alt: "Assigned zones" },
           
          { type: "h", text: "FUNÇÕES E RESPONSABILIDADES" },
          { type: "p", text: "Os R4 dividirão os membros confirmados, conforme o poder, em 3 funções: **Assaltantes, Guardiões e Apoio/Participantes**." },

          { type: "sub", text: "⚔️ 1) ASSALTANTES" },
          { type: "p", text: "**Quem:** nossos jogadores mais fortes, com bastantes Teletransportadores Avançados." },
          { type: "p", text: "**Sua missão:**" },
          { type: "list", items: [
            "Teletransportar-se para a zona e a construção designadas",
            "Capturar as construções prioritárias",
            "Atacar sozinho castelos inimigos vulneráveis",
            "Liderar os rallies importantes",
            "Passar para o próximo objetivo assim que um Guardião assumir",
            "Quando inimigos se teletransportarem para perto da sua construção designada, mirar castelos mais fracos ou expostos"
          ]},

          { type: "sub", text: "🛡️ 2) GUARDIÕES" },
          { type: "p", text: "**Quem:** nossos próximos jogadores mais fortes, com boa capacidade de rally/guarnição." },
          { type: "p", text: "**Sua missão:**" },
          { type: "list", items: [
            "Seguir os Assaltantes designados (zona)",
            "Quando um Assaltante capturar uma construção, assumir a guarnição e pedir reforços se necessário",
            "Reforçar os objetivos ameaçados",
            "Liberar os Assaltantes para irem ao próximo alvo"
          ]},

          { type: "sub", text: "🤝 3) APOIO / PARTICIPANTES" },
          { type: "p", text: "**Quem:** geralmente membros com menos poder e participantes de rally." },
          { type: "p", text: "**Sua missão:**" },
          { type: "list", items: [
            "**Devem** entrar nos rallies dos Guardiões designados",
            "Reforçar as construções capturadas",
            "Enviar reforços em marcha acelerada quando solicitado",
            "Atuar a partir da **Zona Segura** quando não forem necessários em outro lugar ou estiverem mais longe do alcance do inimigo"
          ]},
          { type: "callout", text: "**IMPORTANTE:** se o inimigo atacar uma das construções que capturamos e o controle passar para ele, **teletransporte-se para perto ou faça uma marcha acelerada imediatamente** e recolha os {arsenal} espalhados antes dele." },
          { type: "list", items: [
            "**20 minutos após o início da batalha**, os {undercellar} aparecem. Envie as tropas disponíveis para coletá-los e ganhar pontos extras.",
            "Não deixe nenhuma marcha parada."
          ]},

          { type: "h", text: "ANTES DA BATALHA" },
          { type: "list", items: [
            "Esvazie sua enfermaria. Deixe todas as marchas disponíveis",
            "Equipe seus melhores heróis e equipamentos",
            "Ative a capacidade de tropas, os bônus de Ataque e Defesa e o Antirreconhecimento",
            "Deixe os Teletransportadores Avançados à mão, se sua função exigir",
            "Mantenha o Discord aberto, se possível (para consultar o mapa, as designações e o chat de voz opcional)",
            "Confira o chat da Aliança e as mensagens privadas"
          ]},
          { type: "callout", text: "⚠️ **IMPORTANTE:** uma nova aba de **Chat do Esquadrão** aparecerá no dia da batalha. **Acompanhe o Chat do Esquadrão durante toda a batalha.**" },

          { type: "h", text: "LINHA DO TEMPO DA BATALHA" },
          { type: "timeline", items: [
            { time: "0:00–15:00", title: "ABERTURA", groups: [
              { title: "Garanta imediatamente", lines: ["**#4 {belltower}**", "**#7 {stables}**"] },
              { title: "Dispute", lines: ["**#8 {sanctumNW}**", "**#10 {sanctumSE}**"] },
              { title: "", lines: [
                "Capture as {abbey}s quando for viável, mas não sacrifique os objetivos principais por elas.",
                "**14:30**, os jogadores mais fortes se preparam para o centro."
              ]}
            ]},
            { time: "15:00", title: "CONSTRUÇÕES PODEROSAS ABREM", lines: [
              "**#1 {swordshrine}**, **#2 {mercenary}**, **#3 {reformation}**",
              "A liderança definirá as prioridades conforme a situação do campo de batalha."
            ], groups: [
              { title: "⭐ {swordshrine}", lines: [
                "Os Assaltantes/Guardiões mais fortes se teletransportam para o centro (nem todos)",
                "Capture o {swordshrine}",
                "Depois de garantido, um Guardião forte mantém a guarnição",
                "Apoio/Participantes devem fazer marcha acelerada e enviar reforços"
              ]}
            ], warn: "⚠️ Membros em guarnição: não abandonem sua construção pelo {swordshrine}, a menos que a liderança oriente. Continuem protegendo os {sanctum}s e as outras construções importantes." },
            { time: "15:00–45:00", title: "💪 FASE DE CONTROLE", lines: [
              "Objetivo principal: **manter o {swordshrine} + o {sanctumNW} + o {sanctumSE}**",
              "Manter o controle útil da {belltower} e dos {stables}",
              "Usar o bônus do {reformation} nos grandes confrontos",
              "Usar o {mercenary} para pressionar as construções inimigas",
              "Recolher os {arsenal} espalhados após TODA troca de lado de uma construção",
              "Reforçar as guarnições enfraquecidas"
            ]},
            { time: "20:00–60:00", title: "⛏️ {undercellar}", lines: [
              "Os {undercellar} começam a aparecer.",
              "O Apoio e qualquer pessoa com marchas disponíveis devem coletá-los para ganhar pontos extras.",
              "**Não abandone uma defesa crítica ou um rally só para coletar.**"
            ]},
            { time: "ÚLTIMOS 15 MINUTOS", title: "🏁 FINAL", groups: [
              { title: "SE ESTIVERMOS À FRENTE", lines: ["Proteja o {swordshrine} e os {sanctum}s", "Reforce as construções que acumulam pontos", "Evite PvP desnecessário", "Recolha imediatamente os {arsenal} espalhados", "Não corra riscos desnecessários"] },
              { title: "SE ESTIVERMOS ATRÁS", lines: ["Pressione as construções principais do inimigo", "Use o {mercenary} antes de ataques coordenados", "Concentre os rallies em vez de atacar aleatoriamente", "Mire as construções valiosas mantidas pelo inimigo", "Recolha cada ponto que cair após uma troca bem-sucedida"] }
            ], warn: "**Últimos 5 minutos: pontos > abates.**" }
          ]},

          { type: "h", text: "RESUMO" },
          { type: "p", text: "Os membros serão divididos em 3 funções e designados para uma zona:" },
          { type: "list", items: [
            "**ASSALTANTES** → CAPTURAR + PRESSIONAR",
            "**GUARDIÕES** → MANTER + PROTEGER",
            "**APOIO** → REFORÇAR + RALLY + {arsenal} + {undercellar}"
          ]},
          { type: "list", items: [
            "Siga sua zona e sua função designadas.",
            "Acompanhe o Chat do Esquadrão.",
            "Objetivos > abates aleatórios.",
            "Assaltantes capturam — Guardiões mantêm — Apoio reforça.",
            "Nunca deixe marchas úteis paradas.",
            "Recolha imediatamente os {arsenal} espalhados.",
            "Colete os {undercellar} com as marchas disponíveis.",
            "Proteja o {swordshrine} + os {sanctum}s.",
            "Não abandone as construções principais por {abbey}s ou abates.",
            "Se a liderança pedir um rodízio, MOVA-SE."
          ]},
          { type: "callout", text: "⚔️ **A COORDENAÇÃO É A CHAVE PARA A VITÓRIA NA {swordland}**" }
        ]
      }
    }
  },
     "formations-rally-tips": {
    emoji: "🛡️",
    name: { en: "Formations & Rally Tips", zh: "部隊編組與集結技巧", ko: "부대 편성 및 집결 팁", de: "Trupp-Formationen & Rally-Tipps", fr: "Formations de troupe et conseils de ralliement", pt: "Formações das Tropas e dicas de rally", tr: "Birlik Dizilişleri ve Seferberlik İpuçları", id: "Formasi Pasukan & Tips Reli", ru: "Войско и советы по рейдам", th: "รูปแบบการจัดวางทหารและเคล็ดลับทีมระดมพล", ar: "القوات ونصائح الحشد" },
    sections: {
      en: {
        title: "Formations & Rally Tips",
        blocks: [
          { type: "h", text: "🔬 RESEARCH & UPGRADE PRIORITIES" },
          { type: "p", text: "Prioritize these combat stats for research and upgrading governor charms:" },
          { type: "list", items: ["Infantry {health}", "Archer {lethality}"] },

          { type: "h", text: "💾 SAVE YOUR PRESETS" },
          { type: "p", text: "Depending on your progression, you can unlock up to 8 slots to pre-save your troop formations. Recommended formations to save:" },
          { type: "callout", text: "All troop ratios are **Infantry : Cavalry : Archers**. Save separate presets with each hero in the far-left / first position." },
          { type: "callout", text: "💡 The far-left hero matters when joining rallies because their relevant Expedition skill contributes to the rally." },
          { type: "list", items: [
            "1) Bear Hunt: Chenko — **10 : 10 : 80**",
            "2) Bear Hunt: Amane — **10 : 10 : 80** (or closest possible)",
            "3) Bear Hunt: Yeonwoo — **10 : 10 : 80** (or closest possible)",
            "4) Bear Hunt: Amadeus — **10 : 10 : 80** (or closest possible)",
            "5) Attack (General PvP): Amadeus (if built) or Chenko — **50 : 20 : 30**",
            "6) Defense: Howard / Gordon — **60 : 20 : 20** is our balanced default. Adjust when leadership calls for a specific formation."
          ]},
          { type: "p", text: "**Rally Leaders:** Use your strongest complete offensive hero lineup." },
          { type: "p", text: "**Rally Joiners:** Please follow any troop limits posted by leadership." },
          { type: "list", items: [
            "7) Viking HQ: Howard / Gordon — **60 : 40** Follow troop limit (~68,000)",
            "8) PvE – Beasts / Hunting: Diana + Fahd — **50 : 20 : 30**"
          ]},

          { type: "h", text: "🐺 PvE — BEASTS / HUNTING" },
          { type: "p", text: "Remember for Dreadwolf: Not a lot of damage is needed, so send the minimum number of troops (even 1) so more alliance members can join and benefit from the rally rewards." },

          { type: "h", text: "🏰 CASTLE BATTLE / SANCTUARY / BUILDINGS" },
          { type: "p", text: "When capturing buildings, be ready to quickly switch:" },
          { type: "callout", text: "**ATTACK → DEFENSE**" },
          { type: "sub", text: "⚔️ 1. CAPTURE" },
          { type: "p", text: "Join the initial rally using your ATTACK preset." },
          { type: "p", text: "**Example:** Amadeus / Chenko **50 : 20 : 30**" },
          { type: "sub", text: "🛡️ 2. SWITCH TO DEFENSE" },
          { type: "p", text: "Once the building is captured:" },
          { type: "list", items: [
            "**1.** Immediately send another march using your DEFENSE preset. **Example:** Gordon / Howard **60 : 20 : 20**",
            "**2.** Watch your defense march travel toward the captured building.",
            "**3.** When approximately 5 seconds of march time remain — or as instructed by leadership — recall your original ATTACK march.",
            "**4.** Your DEFENSE march arrives and replaces your offensive march in the garrison."
          ]},
          { type: "callout", text: "🚫 **DO NOT recall your attack march too early.**" },
          { type: "p", text: "**Capture → Send Defense → ~5 sec → Recall Attack → Defense Arrives**" },
          { type: "p", text: "This allows us to transition from an offensive setup to a defensive garrison without unnecessarily weakening the building." },

          { type: "h", text: "🪖 GARRISON TROOP CAP" },
          { type: "p", text: "Only 15 governors can enter HQ / Sanctuary. So don’t automatically send your maximum march to HQ, Sanctuary, or other contested buildings." },
          { type: "p", text: "Follow the troop cap announced by leadership." },
          { type: "p", text: "**Typical alliance target: ~68,000 troops per player**" },
          { type: "p", text: "This allows more alliance members with properly configured defensive marches to fit inside the garrison and get rewards." },
          { type: "callout", text: "⚠️ If leadership announces a different cap, always follow the announced amount." },

          { type: "h", text: "🎬 HOW TO SWITCH FROM ATTACKING TO DEFENSIVE HEROES" },
          { type: "video", src: "figures/switch_hero.mp4", caption: "📎 Video found online (TikTok @yelloe_hair) — not our own footage." }
        ]
      },
      zh: {
        title: "部隊編組與集結技巧",
        blocks: [
          { type: "h", text: "🔬 研究與升級優先順序" },
          { type: "p", text: "研究與升級領主寶石時，請優先提升以下戰鬥屬性：" },
          { type: "list", items: [
            "{infantry}{health}",
            "{archer}{lethality}"
          ]},
          { type: "h", text: "💾 儲存你的預設編組" },
          { type: "p", text: "依照你的進度，最多可解鎖 8 個欄位，預先儲存你的部隊編組。建議儲存以下編組：" },
          { type: "callout", text: "所有兵種比例皆為 **{infantry} : {cavalry} : {archer}**。請為每位英雄各存一組預設，並將該英雄放在最左邊／第一個位置。" },
          { type: "callout", text: "💡 參加集結時，最左邊的英雄很重要，因為他對應的遠征技能會加成該次集結。" },
          { type: "list", items: [
            "1) {bearHunt}：{chenko} — **10 : 10 : 80**",
            "2) {bearHunt}：{amane} — **10 : 10 : 80**（或盡量接近）",
            "3) {bearHunt}：{yeonwoo} — **10 : 10 : 80**（或盡量接近）",
            "4) {bearHunt}：{amadeus} — **10 : 10 : 80**（或盡量接近）",
            "5) 進攻（一般 PvP）：{amadeus}（若已養成）或 {chenko} — **50 : 20 : 30**",
            "6) 防守：{howard} / {gordon} — **60 : 20 : 20** 是我們的平衡預設。幹部要求特定編組時再調整。"
          ]},
          { type: "p", text: "**集結隊長：** 使用你最強、最完整的進攻英雄陣容。" },
          { type: "p", text: "**集結參與者：** 請遵守幹部公告的兵力上限。" },
          { type: "list", items: [
            "7) 維京總部（Viking HQ）：{howard} / {gordon} — **60 : 40** 請遵守兵力上限（約 68,000）",
            "8) PvE — 野獸／狩獵：{diana} + {fahd} — **50 : 20 : 30**"
          ]},
          { type: "h", text: "🐺 PvE — 野獸／狩獵" },
          { type: "p", text: "打恐狼時請記得：不需要太多傷害，所以只要派出最少的兵力（甚至 1 個兵也可以），讓更多聯盟成員能加入集結，領取集結獎勵。" },
          { type: "h", text: "🏰 {castleBattle}／{sanctuary}／建築" },
          { type: "p", text: "佔領建築時，請準備好快速切換：" },
          { type: "callout", text: "**進攻 → 防守**" },
          { type: "sub", text: "⚔️ 1. 佔領" },
          { type: "p", text: "使用你的「進攻」預設加入最初的集結。" },
          { type: "p", text: "**範例：** {amadeus} / {chenko} **50 : 20 : 30**" },
          { type: "sub", text: "🛡️ 2. 切換為防守" },
          { type: "p", text: "建築佔領後：" },
          { type: "list", items: [
            "**1.** 立刻使用你的「防守」預設再派出一支部隊。**範例：** {gordon} / {howard} **60 : 20 : 20**",
            "**2.** 看著你的防守部隊朝已佔領的建築前進。",
            "**3.** 當行軍時間剩下約 5 秒——或依幹部指示——召回你原本的「進攻」部隊。",
            "**4.** 你的防守部隊抵達，取代進攻部隊留在駐防中。"
          ]},
          { type: "callout", text: "🚫 **千萬不要太早召回進攻部隊。**" },
          { type: "p", text: "**佔領 → 派出防守 → 約 5 秒 → 召回進攻 → 防守抵達**" },
          { type: "p", text: "這樣我們就能從進攻編組平順切換為防守駐防，而不會不必要地削弱建築。" },
          { type: "h", text: "🪖 駐防兵力上限" },
          { type: "p", text: "只有 15 位領主能進入總部（HQ）／{sanctuary}。所以請不要自動把你的最大部隊派去總部、{sanctuary}或其他爭奪中的建築。" },
          { type: "p", text: "請遵守幹部公告的兵力上限。" },
          { type: "p", text: "**聯盟一般目標：每位玩家約 68,000 兵力**" },
          { type: "p", text: "這樣能讓更多已配置好防守部隊的聯盟成員擠進駐防，一起領取獎勵。" },
          { type: "callout", text: "⚠️ 若幹部公告了不同的上限，請一律以公告的數字為準。" },
          { type: "h", text: "🎬 如何從進攻英雄切換為防守英雄" },
          { type: "video", src: "figures/switch_hero.mp4", caption: "📎 影片來自網路（TikTok @yelloe_hair），並非我們自己拍攝。" }
        ]
      },
      ko: {
        title: "부대 편성 및 집결 팁",
        blocks: [
          { type: "h", text: "🔬 연구 및 업그레이드 우선순위" },
          { type: "p", text: "연구와 영주 보석 레벨업 시 다음 전투 능력치를 우선하세요:" },
          { type: "list", items: [
            "{infantry} {health}",
            "{archer} {lethality}"
          ]},
          { type: "h", text: "💾 프리셋 저장" },
          { type: "p", text: "진행 상황에 따라 최대 8개의 슬롯을 열어 부대 편성을 미리 저장할 수 있습니다. 저장을 권장하는 편성:" },
          { type: "callout", text: "모든 병력 비율은 **{infantry} : {cavalry} : {archer}** 순서입니다. 각 영웅을 맨 왼쪽(첫 번째) 자리에 두고 프리셋을 따로 저장하세요." },
          { type: "callout", text: "💡 집결에 참여할 때는 맨 왼쪽 영웅이 중요합니다. 해당 영웅의 원정 스킬이 집결에 적용되기 때문입니다." },
          { type: "list", items: [
            "1) {bearHunt}: {chenko} — **10 : 10 : 80**",
            "2) {bearHunt}: {amane} — **10 : 10 : 80** (또는 최대한 근접하게)",
            "3) {bearHunt}: {yeonwoo} — **10 : 10 : 80** (또는 최대한 근접하게)",
            "4) {bearHunt}: {amadeus} — **10 : 10 : 80** (또는 최대한 근접하게)",
            "5) 공격(일반 PvP): {amadeus}(육성된 경우) 또는 {chenko} — **50 : 20 : 30**",
            "6) 방어: {howard} / {gordon} — **60 : 20 : 20**이 기본 균형 편성입니다. 임원진이 특정 편성을 요청하면 조정하세요."
          ]},
          { type: "p", text: "**집결 리더:** 가장 강력한 공격 영웅 조합을 완성된 상태로 사용하세요." },
          { type: "p", text: "**집결 참여자:** 임원진이 공지한 병력 제한을 따라주세요." },
          { type: "list", items: [
            "7) 바이킹 본부(Viking HQ): {howard} / {gordon} — **60 : 40** 병력 제한(약 68,000) 준수",
            "8) PvE — 야수/사냥: {diana} + {fahd} — **50 : 20 : 30**"
          ]},
          { type: "h", text: "🐺 PvE — 야수/사냥" },
          { type: "p", text: "스케어 울프를 잡을 때 기억하세요: 많은 피해가 필요하지 않으므로 최소한의 병력(1명도 가능)만 보내서 더 많은 연맹원이 집결에 참여해 집결 보상을 받을 수 있게 하세요." },
          { type: "h", text: "🏰 {castleBattle} / {sanctuary} / 건물" },
          { type: "p", text: "건물을 점령할 때는 빠르게 전환할 준비를 하세요:" },
          { type: "callout", text: "**공격 → 방어**" },
          { type: "sub", text: "⚔️ 1. 점령" },
          { type: "p", text: "공격 프리셋으로 처음 집결에 참여하세요." },
          { type: "p", text: "**예시:** {amadeus} / {chenko} **50 : 20 : 30**" },
          { type: "sub", text: "🛡️ 2. 방어로 전환" },
          { type: "p", text: "건물을 점령한 뒤:" },
          { type: "list", items: [
            "**1.** 즉시 방어 프리셋으로 행군을 하나 더 보내세요. **예시:** {gordon} / {howard} **60 : 20 : 20**",
            "**2.** 방어 행군이 점령한 건물을 향해 이동하는 것을 지켜보세요.",
            "**3.** 행군 시간이 약 5초 남았을 때 — 또는 임원진의 지시에 따라 — 기존 공격 행군을 소환하세요.",
            "**4.** 방어 행군이 도착해 주둔부대에서 공격 행군을 대체합니다."
          ]},
          { type: "callout", text: "🚫 **공격 행군을 너무 일찍 소환하지 마세요.**" },
          { type: "p", text: "**점령 → 방어 파견 → 약 5초 → 공격 소환 → 방어 도착**" },
          { type: "p", text: "이렇게 하면 건물이 불필요하게 약해지지 않고 공격 구성에서 방어 주둔으로 전환할 수 있습니다." },
          { type: "h", text: "🪖 주둔 병력 상한" },
          { type: "p", text: "본부(HQ) / {sanctuary}에는 영주 15명만 들어갈 수 있습니다. 그러니 본부, {sanctuary}, 그 밖의 격전 건물에 무작정 최대 행군을 보내지 마세요." },
          { type: "p", text: "임원진이 공지한 병력 상한을 따르세요." },
          { type: "p", text: "**일반적인 연맹 목표: 1인당 약 68,000 병력**" },
          { type: "p", text: "이렇게 하면 방어 행군을 제대로 구성한 더 많은 연맹원이 주둔지에 들어가 보상을 받을 수 있습니다." },
          { type: "callout", text: "⚠️ 임원진이 다른 상한을 공지하면 항상 공지된 수치를 따르세요." },
          { type: "h", text: "🎬 공격 영웅에서 방어 영웅으로 전환하는 방법" },
          { type: "video", src: "figures/switch_hero.mp4", caption: "📎 이 영상은 인터넷에서 가져온 것으로(TikTok @yelloe_hair), 우리가 직접 촬영한 것이 아닙니다." }
        ]
      },
      de: {
        title: "Trupp-Formationen & Rally-Tipps",
        blocks: [
          { type: "h", text: "🔬 FORSCHUNGS- & UPGRADE-PRIORITÄTEN" },
          { type: "p", text: "Priorisiere diese Kampfwerte bei der Forschung und beim Aufwerten der Gouverneur-Talismane:" },
          { type: "list", items: [
            "{infantry} — {health}",
            "{archer} — {lethality}"
          ]},
          { type: "h", text: "💾 SPEICHERE DEINE PRESETS" },
          { type: "p", text: "Je nach Fortschritt kannst du bis zu 8 Slots freischalten, um deine Truppenformationen vorab zu speichern. Empfohlene Formationen zum Speichern:" },
          { type: "callout", text: "Alle Truppenverhältnisse gelten als **{infantry} : {cavalry} : {archer}**. Speichere für jeden Helden ein eigenes Preset, mit dem Helden ganz links / an erster Position." },
          { type: "callout", text: "💡 Der Held ganz links ist beim Beitreten zu Rallys wichtig, weil seine passende Expeditionsfähigkeit zur Rally beiträgt." },
          { type: "list", items: [
            "1) {bearHunt}: {chenko} — **10 : 10 : 80**",
            "2) {bearHunt}: {amane} — **10 : 10 : 80** (oder so nah wie möglich)",
            "3) {bearHunt}: {yeonwoo} — **10 : 10 : 80** (oder so nah wie möglich)",
            "4) {bearHunt}: {amadeus} — **10 : 10 : 80** (oder so nah wie möglich)",
            "5) Angriff (allgemeines PvP): {amadeus} (falls ausgebaut) oder {chenko} — **50 : 20 : 30**",
            "6) Verteidigung: {howard} / {gordon} — **60 : 20 : 20** ist unser ausgewogener Standard. Passe es an, wenn die Führung eine bestimmte Formation verlangt."
          ]},
          { type: "p", text: "**Rally-Anführer:** Nutze deine stärkste, vollständige Angriffs-Heldenaufstellung." },
          { type: "p", text: "**Rally-Joiner:** Bitte halte dich an die von der Führung angegebenen Truppenlimits." },
          { type: "list", items: [
            "7) Wikinger-HQ (Viking HQ): {howard} / {gordon} — **60 : 40** Truppenlimit beachten (~68.000)",
            "8) PvE – Bestien / Jagd: {diana} + {fahd} — **50 : 20 : 30**"
          ]},
          { type: "h", text: "🐺 PvE — BESTIEN / JAGD" },
          { type: "p", text: "Denk beim Höllenwolf daran: Es ist nicht viel Schaden nötig, also schicke so wenige Truppen wie möglich (sogar nur 1), damit mehr Allianzmitglieder der Rally beitreten und von den Rally-Belohnungen profitieren können." },
          { type: "h", text: "🏰 {castleBattle} / {sanctuary} / GEBÄUDE" },
          { type: "p", text: "Beim Erobern von Gebäuden musst du bereit sein, schnell zu wechseln:" },
          { type: "callout", text: "**ANGRIFF → VERTEIDIGUNG**" },
          { type: "sub", text: "⚔️ 1. EROBERN" },
          { type: "p", text: "Tritt der ersten Rally mit deinem ANGRIFFS-Preset bei." },
          { type: "p", text: "**Beispiel:** {amadeus} / {chenko} **50 : 20 : 30**" },
          { type: "sub", text: "🛡️ 2. ZUR VERTEIDIGUNG WECHSELN" },
          { type: "p", text: "Sobald das Gebäude erobert ist:" },
          { type: "list", items: [
            "**1.** Sende sofort einen weiteren Marsch mit deinem VERTEIDIGUNGS-Preset. **Beispiel:** {gordon} / {howard} **60 : 20 : 20**",
            "**2.** Beobachte, wie dein Verteidigungsmarsch zum eroberten Gebäude unterwegs ist.",
            "**3.** Wenn noch etwa 5 Sekunden Marschzeit übrig sind — oder nach Anweisung der Führung — rufe deinen ursprünglichen ANGRIFFS-Marsch zurück.",
            "**4.** Dein VERTEIDIGUNGS-Marsch kommt an und ersetzt deinen Angriffsmarsch in der Garnison."
          ]},
          { type: "callout", text: "🚫 **Rufe deinen Angriffsmarsch NICHT zu früh zurück.**" },
          { type: "p", text: "**Erobern → Verteidigung senden → ~5 Sek. → Angriff zurückrufen → Verteidigung kommt an**" },
          { type: "p", text: "So können wir von einer Angriffsaufstellung zu einer Verteidigungsgarnison wechseln, ohne das Gebäude unnötig zu schwächen." },
          { type: "h", text: "🪖 GARNISONS-TRUPPENLIMIT" },
          { type: "p", text: "Nur 15 Gouverneure können in das HQ / {sanctuary} gelangen. Schicke deshalb nicht automatisch deinen maximalen Marsch ins HQ, ins {sanctuary} oder zu anderen umkämpften Gebäuden." },
          { type: "p", text: "Halte dich an das von der Führung angekündigte Truppenlimit." },
          { type: "p", text: "**Typisches Allianzziel: ~68.000 Truppen pro Spieler**" },
          { type: "p", text: "So passen mehr Allianzmitglieder mit richtig konfigurierten Verteidigungsmärschen in die Garnison und erhalten Belohnungen." },
          { type: "callout", text: "⚠️ Wenn die Führung ein anderes Limit ankündigt, halte dich immer an die angekündigte Zahl." },
          { type: "h", text: "🎬 SO WECHSELST DU VON ANGRIFFS- ZU VERTEIDIGUNGSHELDEN" },
          { type: "video", src: "figures/switch_hero.mp4", caption: "📎 Video aus dem Internet (TikTok @yelloe_hair) – nicht unser eigenes Material." }
        ]
      },
      fr: {
        title: "Formations de troupe et conseils de ralliement",
        blocks: [
          { type: "h", text: "🔬 PRIORITÉS DE RECHERCHE ET D'AMÉLIORATION" },
          { type: "p", text: "Donnez la priorité à ces stats de combat pour la recherche et l'amélioration des talismans du Chef :" },
          { type: "list", items: [
            "{infantry} — {health}",
            "{archer} — {lethality}"
          ] },
          { type: "h", text: "💾 ENREGISTREZ VOS PRESETS" },
          { type: "p", text: "Selon votre progression, vous pouvez débloquer jusqu'à 8 emplacements pour pré-enregistrer vos formations de troupe. Formations recommandées à enregistrer :" },
          { type: "callout", text: "Tous les ratios de troupes suivent l'ordre **{infantry} : {cavalry} : {archer}**. Enregistrez un preset distinct pour chaque héros, en le plaçant tout à gauche / en première position." },
          { type: "callout", text: "💡 Le héros tout à gauche est important quand vous rejoignez un ralliement, car sa compétence d'expédition pertinente contribue au ralliement." },
          { type: "list", items: [
            "1) {bearHunt} : {chenko} — **10 : 10 : 80**",
            "2) {bearHunt} : {amane} — **10 : 10 : 80** (ou au plus proche)",
            "3) {bearHunt} : {yeonwoo} — **10 : 10 : 80** (ou au plus proche)",
            "4) {bearHunt} : {amadeus} — **10 : 10 : 80** (ou au plus proche)",
            "5) Attaque (PvP général) : {amadeus} (si monté) ou {chenko} — **50 : 20 : 30**",
            "6) Défense : {howard} / {gordon} — **60 : 20 : 20** est notre configuration équilibrée par défaut. Ajustez-la quand la direction demande une formation précise."
          ] },
          { type: "p", text: "**Leaders de ralliement :** utilisez votre meilleure composition de héros offensifs, au complet." },
          { type: "p", text: "**Participants au ralliement :** merci de respecter les limites de troupes publiées par la direction." },
          { type: "list", items: [
            "7) QG Viking (Viking HQ) : {howard} / {gordon} — **60 : 40** Respectez la limite de troupes (~68 000)",
            "8) PvE – Bêtes / CHASSE : {diana} + {fahd} — **50 : 20 : 30**"
          ] },
          { type: "h", text: "🐺 PvE — BÊTES / CHASSE" },
          { type: "p", text: "Pour le Loup Redoutable : peu de dégâts sont nécessaires, alors envoyez le minimum de troupes (même 1) afin que davantage de membres de l'alliance puissent rejoindre et profiter des récompenses du ralliement." },
          { type: "h", text: "🏰 {castleBattle} / {sanctuary} / BÂTIMENTS" },
          { type: "p", text: "Quand vous capturez des bâtiments, soyez prêt à basculer rapidement :" },
          { type: "callout", text: "**ATTAQUE → DÉFENSE**" },
          { type: "sub", text: "⚔️ 1. CAPTURE" },
          { type: "p", text: "Rejoignez le ralliement initial avec votre preset d'ATTAQUE." },
          { type: "p", text: "**Exemple :** {amadeus} / {chenko} **50 : 20 : 30**" },
          { type: "sub", text: "🛡️ 2. PASSER EN DÉFENSE" },
          { type: "p", text: "Une fois le bâtiment capturé :" },
          { type: "list", items: [
            "**1.** Envoyez immédiatement une autre marche avec votre preset de DÉFENSE. **Exemple :** {gordon} / {howard} **60 : 20 : 20**",
            "**2.** Regardez votre marche de défense se diriger vers le bâtiment capturé.",
            "**3.** Quand il reste environ 5 secondes de temps de marche — ou sur instruction de la direction — rappelez votre marche d'ATTAQUE d'origine.",
            "**4.** Votre marche de DÉFENSE arrive et remplace votre marche offensive dans la garnison."
          ] },
          { type: "callout", text: "🚫 **NE rappelez PAS votre marche d'attaque trop tôt.**" },
          { type: "p", text: "**Capture → Envoyer la défense → ~5 s → Rappeler l'attaque → La défense arrive**" },
          { type: "p", text: "Cela nous permet de passer d'un dispositif offensif à une garnison défensive sans affaiblir inutilement le bâtiment." },
          { type: "h", text: "🪖 LIMITE DE TROUPES EN GARNISON" },
          { type: "p", text: "Seuls 15 chefs peuvent entrer dans le QG / le sanctuaire. N'envoyez donc pas automatiquement votre marche maximale vers le QG, le sanctuaire ou d'autres bâtiments disputés." },
          { type: "p", text: "Respectez la limite de troupes annoncée par la direction." },
          { type: "p", text: "**Objectif d'alliance habituel : ~68 000 troupes par joueur**" },
          { type: "p", text: "Cela permet à davantage de membres de l'alliance dont les marches défensives sont bien configurées de tenir dans la garnison et d'obtenir des récompenses." },
          { type: "callout", text: "⚠️ Si la direction annonce une limite différente, suivez toujours le montant annoncé." },
          { type: "h", text: "🎬 COMMENT PASSER DES HÉROS D'ATTAQUE AUX HÉROS DE DÉFENSE" },
          { type: "video", src: "figures/switch_hero.mp4", caption: "📎 Vidéo trouvée en ligne (TikTok @yelloe_hair) — pas notre propre séquence." }
        ]
      },
      pt: {
        title: "Formações das Tropas e dicas de rally",
        blocks: [
          { type: "h", text: "🔬 PRIORIDADES DE PESQUISA E APRIMORAMENTO" },
          { type: "p", text: "Priorize estes atributos de combate na pesquisa e no aprimoramento dos acessórios do Governador:" },
          { type: "list", items: [
            "{infantry} — {health}",
            "{archer} — {lethality}"
          ] },
          { type: "h", text: "💾 SALVE SEUS PRESETS" },
          { type: "p", text: "Dependendo do seu progresso, você pode desbloquear até 8 espaços para salvar previamente suas formações de tropas. Formações recomendadas para salvar:" },
          { type: "callout", text: "Todas as proporções de tropas seguem **{infantry} : {cavalry} : {archer}**. Salve presets separados com cada herói na posição mais à esquerda / primeira." },
          { type: "callout", text: "💡 O herói mais à esquerda importa ao entrar em rallies, porque a habilidade de expedição relevante dele contribui para o rally." },
          { type: "list", items: [
            "1) {bearHunt}: {chenko} — **10 : 10 : 80**",
            "2) {bearHunt}: {amane} — **10 : 10 : 80** (ou o mais próximo possível)",
            "3) {bearHunt}: {yeonwoo} — **10 : 10 : 80** (ou o mais próximo possível)",
            "4) {bearHunt}: {amadeus} — **10 : 10 : 80** (ou o mais próximo possível)",
            "5) Ataque (PvP geral): {amadeus} (se desenvolvido) ou {chenko} — **50 : 20 : 30**",
            "6) Defesa: {howard} / {gordon} — **60 : 20 : 20** é o nosso padrão equilibrado. Ajuste quando a liderança pedir uma formação específica."
          ] },
          { type: "p", text: "**Líderes de Rally:** use sua melhor formação ofensiva de heróis, completa." },
          { type: "p", text: "**Participantes de Rally:** siga os limites de tropas publicados pela liderança." },
          { type: "list", items: [
            "7) QG Viking (Viking HQ): {howard} / {gordon} — **60 : 40** Siga o limite de tropas (~68.000)",
            "8) PvE – Feras / Caça: {diana} + {fahd} — **50 : 20 : 30**"
          ] },
          { type: "h", text: "🐺 PvE — FERAS / CAÇA" },
          { type: "p", text: "Lembre-se para o Lobo Medonho: não é preciso muito dano, então envie o mínimo de tropas (até 1) para que mais membros da aliança possam entrar e aproveitar as recompensas do rally." },
          { type: "h", text: "🏰 {castleBattle} / {sanctuary} / CONSTRUÇÕES" },
          { type: "p", text: "Ao capturar construções, esteja pronto para trocar rapidamente:" },
          { type: "callout", text: "**ATAQUE → DEFESA**" },
          { type: "sub", text: "⚔️ 1. CAPTURA" },
          { type: "p", text: "Entre no rally inicial usando seu preset de ATAQUE." },
          { type: "p", text: "**Exemplo:** {amadeus} / {chenko} **50 : 20 : 30**" },
          { type: "sub", text: "🛡️ 2. TROCAR PARA DEFESA" },
          { type: "p", text: "Assim que a construção for capturada:" },
          { type: "list", items: [
            "**1.** Envie imediatamente outra marcha usando seu preset de DEFESA. **Exemplo:** {gordon} / {howard} **60 : 20 : 20**",
            "**2.** Observe sua marcha de defesa se deslocar até a construção capturada.",
            "**3.** Quando faltarem cerca de 5 segundos de marcha — ou conforme a liderança instruir — use **Revogar** na sua marcha de ATAQUE original.",
            "**4.** Sua marcha de DEFESA chega e substitui sua marcha ofensiva na guarnição."
          ] },
          { type: "callout", text: "🚫 **NÃO use Revogar na marcha de ataque cedo demais.**" },
          { type: "p", text: "**Capturar → Enviar Defesa → ~5 s → Revogar Ataque → Defesa Chega**" },
          { type: "p", text: "Isso nos permite passar de uma formação ofensiva para uma guarnição defensiva sem enfraquecer a construção desnecessariamente." },
          { type: "h", text: "🪖 LIMITE DE TROPAS NA GUARNIÇÃO" },
          { type: "p", text: "Apenas 15 governadores podem entrar no QG / Santuário. Por isso, não envie automaticamente sua marcha máxima para o QG, o Santuário ou outras construções disputadas." },
          { type: "p", text: "Siga o limite de tropas anunciado pela liderança." },
          { type: "p", text: "**Meta comum da aliança: ~68.000 tropas por jogador**" },
          { type: "p", text: "Isso permite que mais membros da aliança com marchas defensivas bem configuradas caibam na guarnição e recebam recompensas." },
          { type: "callout", text: "⚠️ Se a liderança anunciar um limite diferente, siga sempre o valor anunciado." },
          { type: "h", text: "🎬 COMO TROCAR DE HERÓIS DE ATAQUE PARA HERÓIS DE DEFESA" },
          { type: "video", src: "figures/switch_hero.mp4", caption: "📎 Vídeo encontrado online (TikTok @yelloe_hair) — não é filmagem nossa." }
        ]
      },
      tr: {
        title: "Birlik Dizilişleri ve Seferberlik İpuçları",
        blocks: [
          { type: "h", text: "🔬 ARAŞTIRMA VE YÜKSELTME ÖNCELİKLERİ" },
          { type: "p", text: "Araştırma ve Vali Tılsımlarını yükseltirken şu savaş niteliklerine öncelik verin:" },
          { type: "list", items: [
            "{infantry} — {health}",
            "{archer} — {lethality}"
          ] },
          { type: "h", text: "💾 PRESETLERİNİZİ KAYDEDİN" },
          { type: "p", text: "İlerlemenize bağlı olarak, birlik dizilişlerinizi önceden kaydetmek için en fazla 8 slot açabilirsiniz. Kaydedilmesi önerilen dizilişler:" },
          { type: "callout", text: "Tüm birlik oranları **{infantry} : {cavalry} : {archer}** şeklindedir. Her kahraman için, o kahraman en soldaki / ilk konumda olacak şekilde ayrı preset kaydedin." },
          { type: "callout", text: "💡 Seferberliklere katılırken en soldaki kahraman önemlidir, çünkü ilgili sefer yeteneği seferberliğe katkı sağlar." },
          { type: "list", items: [
            "1) {bearHunt}: {chenko} — **10 : 10 : 80**",
            "2) {bearHunt}: {amane} — **10 : 10 : 80** (veya olabildiğince yakın)",
            "3) {bearHunt}: {yeonwoo} — **10 : 10 : 80** (veya olabildiğince yakın)",
            "4) {bearHunt}: {amadeus} — **10 : 10 : 80** (veya olabildiğince yakın)",
            "5) Saldırı (genel PvP): {amadeus} (geliştirildiyse) veya {chenko} — **50 : 20 : 30**",
            "6) Savunma: {howard} / {gordon} — **60 : 20 : 20** dengeli varsayılanımızdır. Yönetim belirli bir dizilişi istediğinde ayarlayın."
          ] },
          { type: "p", text: "**Seferberlik Liderleri:** En güçlü, eksiksiz saldırı kahraman kadronuzu kullanın." },
          { type: "p", text: "**Seferberliğe Katılanlar:** Lütfen yönetimin duyurduğu birlik sınırlarına uyun." },
          { type: "list", items: [
            "7) Viking Karargahı (Viking HQ): {howard} / {gordon} — **60 : 40** Birlik sınırına uyun (~68.000)",
            "8) PvE – Hayvanlar / Av: {diana} + {fahd} — **50 : 20 : 30**"
          ] },
          { type: "h", text: "🐺 PvE — HAYVANLAR / AV" },
          { type: "p", text: "Korkunç Kurt için hatırlayın: çok fazla hasar gerekmez, bu yüzden daha fazla ittifak üyesi katılıp seferberlik ödüllerinden yararlanabilsin diye en az sayıda birlik gönderin (1 bile olur)." },
          { type: "h", text: "🏰 {castleBattle} / {sanctuary} / BİNALAR" },
          { type: "p", text: "Binaları ele geçirirken hızla geçiş yapmaya hazır olun:" },
          { type: "callout", text: "**SALDIRI → SAVUNMA**" },
          { type: "sub", text: "⚔️ 1. ELE GEÇİRME" },
          { type: "p", text: "İlk seferberliğe SALDIRI presetinizle katılın." },
          { type: "p", text: "**Örnek:** {amadeus} / {chenko} **50 : 20 : 30**" },
          { type: "sub", text: "🛡️ 2. SAVUNMAYA GEÇİŞ" },
          { type: "p", text: "Bina ele geçirildikten sonra:" },
          { type: "list", items: [
            "**1.** SAVUNMA presetinizle hemen bir intikal daha gönderin. **Örnek:** {gordon} / {howard} **60 : 20 : 20**",
            "**2.** Savunma intikalinizin ele geçirilen binaya doğru ilerleyişini izleyin.",
            "**3.** Yaklaşık 5 saniyelik intikal süresi kaldığında — veya yönetimin talimatıyla — ilk SALDIRI intikalinizi geri çağırın.",
            "**4.** SAVUNMA intikaliniz varır ve garnizonda saldırı intikalinizin yerini alır."
          ] },
          { type: "callout", text: "🚫 **Saldırı intikalinizi ÇOK ERKEN geri çağırmayın.**" },
          { type: "p", text: "**Ele geçirme → Savunmayı gönder → ~5 sn → Saldırıyı geri çağır → Savunma varır**" },
          { type: "p", text: "Bu sayede binayı gereksiz yere zayıflatmadan saldırı düzeninden savunma garnizonuna geçebiliriz." },
          { type: "h", text: "🪖 GARNİZON BİRLİK SINIRI" },
          { type: "p", text: "Karargaha / Tapınağa yalnızca 15 vali girebilir. Bu yüzden maksimum intikalinizi otomatik olarak karargaha, Tapınağa veya diğer çekişmeli binalara göndermeyin." },
          { type: "p", text: "Yönetimin duyurduğu birlik sınırına uyun." },
          { type: "p", text: "**Tipik ittifak hedefi: oyuncu başına ~68.000 birlik**" },
          { type: "p", text: "Bu sayede savunma intikalleri doğru yapılandırılmış daha fazla ittifak üyesi garnizona sığar ve ödül alır." },
          { type: "callout", text: "⚠️ Yönetim farklı bir sınır duyurursa her zaman duyurulan miktara uyun." },
          { type: "h", text: "🎬 SALDIRI KAHRAMANLARINDAN SAVUNMA KAHRAMANLARINA NASIL GEÇİLİR" },
          { type: "video", src: "figures/switch_hero.mp4", caption: "📎 Video internetten alınmıştır (TikTok @yelloe_hair) — kendi çekimimiz değil." }
        ]
      },
      id: {
        title: "Formasi Pasukan & Tips Reli",
        blocks: [
          { type: "h", text: "🔬 PRIORITAS RISET & PENINGKATAN" },
          { type: "p", text: "Prioritaskan stat tempur berikut untuk riset dan peningkatan charm Gubernur:" },
          { type: "list", items: [
            "{infantry} — {health}",
            "{archer} — {lethality}"
          ] },
          { type: "h", text: "💾 SIMPAN PRESET-MU" },
          { type: "p", text: "Tergantung progresmu, kamu bisa membuka hingga 8 slot untuk menyimpan formasi pasukan lebih dulu. Formasi yang direkomendasikan untuk disimpan:" },
          { type: "callout", text: "Semua rasio pasukan berurutan **{infantry} : {cavalry} : {archer}**. Simpan preset terpisah dengan setiap hero di posisi paling kiri / pertama." },
          { type: "callout", text: "💡 Hero paling kiri penting saat bergabung ke reli karena Skill Ekspedisi yang relevan darinya menyumbang untuk reli." },
          { type: "list", items: [
            "1) {bearHunt}: {chenko} — **10 : 10 : 80**",
            "2) {bearHunt}: {amane} — **10 : 10 : 80** (atau sedekat mungkin)",
            "3) {bearHunt}: {yeonwoo} — **10 : 10 : 80** (atau sedekat mungkin)",
            "4) {bearHunt}: {amadeus} — **10 : 10 : 80** (atau sedekat mungkin)",
            "5) Serangan (PvP umum): {amadeus} (jika sudah dikembangkan) atau {chenko} — **50 : 20 : 30**",
            "6) Pertahanan: {howard} / {gordon} — **60 : 20 : 20** adalah standar seimbang kita. Sesuaikan bila pimpinan meminta formasi tertentu."
          ] },
          { type: "p", text: "**Pemimpin Reli:** Gunakan susunan hero ofensif terkuat dan lengkapmu." },
          { type: "p", text: "**Peserta Reli:** Ikuti batas pasukan yang diumumkan pimpinan." },
          { type: "list", items: [
            "7) Markas Viking (Viking HQ): {howard} / {gordon} — **60 : 40** Ikuti batas pasukan (~68.000)",
            "8) PvE – binatang buas / Berburu: {diana} + {fahd} — **50 : 20 : 30**"
          ] },
          { type: "h", text: "🐺 PvE — BINATANG BUAS / BERBURU" },
          { type: "p", text: "Ingat untuk Netherfiend: tidak perlu banyak damage, jadi kirim pasukan sesedikit mungkin (bahkan 1) supaya lebih banyak anggota aliansi bisa bergabung dan mendapat hadiah reli." },
          { type: "h", text: "🏰 {castleBattle} / {sanctuary} / BANGUNAN" },
          { type: "p", text: "Saat merebut bangunan, bersiaplah untuk berganti dengan cepat:" },
          { type: "callout", text: "**SERANGAN → PERTAHANAN**" },
          { type: "sub", text: "⚔️ 1. REBUT" },
          { type: "p", text: "Bergabunglah ke reli awal menggunakan preset SERANGAN-mu." },
          { type: "p", text: "**Contoh:** {amadeus} / {chenko} **50 : 20 : 30**" },
          { type: "sub", text: "🛡️ 2. BERALIH KE PERTAHANAN" },
          { type: "p", text: "Setelah bangunan berhasil direbut:" },
          { type: "list", items: [
            "**1.** Segera kirim satu barisan lagi menggunakan preset PERTAHANAN-mu. **Contoh:** {gordon} / {howard} **60 : 20 : 20**",
            "**2.** Perhatikan barisan pertahananmu bergerak menuju bangunan yang direbut.",
            "**3.** Saat waktu barisan tersisa sekitar 5 detik — atau sesuai instruksi pimpinan — Panggil Kembali barisan SERANGAN awalmu.",
            "**4.** Barisan PERTAHANAN-mu tiba dan menggantikan barisan ofensifmu di garnisun."
          ] },
          { type: "callout", text: "🚫 **JANGAN Panggil Kembali barisan serangan terlalu cepat.**" },
          { type: "p", text: "**Rebut → Kirim Pertahanan → ~5 dtk → Panggil Kembali Serangan → Pertahanan Tiba**" },
          { type: "p", text: "Ini memungkinkan kita beralih dari formasi ofensif ke garnisun defensif tanpa melemahkan bangunan secara tidak perlu." },
          { type: "h", text: "🪖 BATAS PASUKAN GARNISUN" },
          { type: "p", text: "Hanya 15 gubernur yang bisa masuk ke markas / Sanctuary. Jadi jangan otomatis mengirim barisan maksimalmu ke markas, Sanctuary, atau bangunan lain yang diperebutkan." },
          { type: "p", text: "Ikuti batas pasukan yang diumumkan pimpinan." },
          { type: "p", text: "**Target aliansi umum: ~68.000 pasukan per pemain**" },
          { type: "p", text: "Ini memungkinkan lebih banyak anggota aliansi dengan barisan pertahanan yang terkonfigurasi baik masuk ke garnisun dan mendapat hadiah." },
          { type: "callout", text: "⚠️ Jika pimpinan mengumumkan batas yang berbeda, selalu ikuti angka yang diumumkan." },
          { type: "h", text: "🎬 CARA BERALIH DARI HERO SERANGAN KE HERO PERTAHANAN" },
          { type: "video", src: "figures/switch_hero.mp4", caption: "📎 Video ditemukan di internet (TikTok @yelloe_hair) — bukan rekaman kami sendiri." }
        ]
      },
      ru: {
        title: "Войско и советы по рейдам",
        blocks: [
          { type: "h", text: "🔬 ПРИОРИТЕТЫ ИССЛЕДОВАНИЙ И УЛУЧШЕНИЙ" },
          { type: "p", text: "Отдавайте приоритет этим боевым показателям при исследованиях и улучшении талисманов губернатора:" },
          { type: "list", items: [
            "{infantry} — {health}",
            "{archer} — {lethality}"
          ] },
          { type: "h", text: "💾 СОХРАНЯЙТЕ ПРЕСЕТЫ" },
          { type: "p", text: "В зависимости от прогресса можно открыть до 8 слотов для предварительного сохранения составов войск. Рекомендуемые составы для сохранения:" },
          { type: "callout", text: "Все соотношения войск указаны в порядке **{infantry} : {cavalry} : {archer}**. Сохраняйте отдельный пресет для каждого героя, ставя его в крайнюю левую / первую позицию." },
          { type: "callout", text: "💡 Крайний левый герой важен при присоединении к рейдам, так как его соответствующий навык экспедиции усиливает рейд." },
          { type: "list", items: [
            "1) {bearHunt}: {chenko} — **10 : 10 : 80**",
            "2) {bearHunt}: {amane} — **10 : 10 : 80** (или максимально близко)",
            "3) {bearHunt}: {yeonwoo} — **10 : 10 : 80** (или максимально близко)",
            "4) {bearHunt}: {amadeus} — **10 : 10 : 80** (или максимально близко)",
            "5) Атака (общий PvP): {amadeus} (если прокачан) или {chenko} — **50 : 20 : 30**",
            "6) Защита: {howard} / {gordon} — **60 : 20 : 20** — наш сбалансированный вариант по умолчанию. Меняйте, если руководство просит определённый состав."
          ] },
          { type: "p", text: "**Лидеры рейда:** используйте свою сильнейшую полную атакующую связку героев." },
          { type: "p", text: "**Участники рейда:** соблюдайте лимиты войск, объявленные руководством." },
          { type: "list", items: [
            "7) Штаб викингов (Viking HQ): {howard} / {gordon} — **60 : 40** Соблюдайте лимит войск (~68 000)",
            "8) PvE – Звери / Охота: {diana} + {fahd} — **50 : 20 : 30**"
          ] },
          { type: "h", text: "🐺 PvE — ЗВЕРИ / ОХОТА" },
          { type: "p", text: "Помните про Ужасного волка: урона нужно немного, поэтому отправляйте минимум войск (даже 1), чтобы больше участников альянса могло присоединиться и получить награды за рейд." },
          { type: "h", text: "🏰 {castleBattle} / {sanctuary} / ЗДАНИЯ" },
          { type: "p", text: "При захвате зданий будьте готовы быстро переключиться:" },
          { type: "callout", text: "**АТАКА → ЗАЩИТА**" },
          { type: "sub", text: "⚔️ 1. ЗАХВАТ" },
          { type: "p", text: "Присоединяйтесь к первому рейду с пресетом АТАКИ." },
          { type: "p", text: "**Пример:** {amadeus} / {chenko} **50 : 20 : 30**" },
          { type: "sub", text: "🛡️ 2. ПЕРЕКЛЮЧЕНИЕ НА ЗАЩИТУ" },
          { type: "p", text: "Когда здание захвачено:" },
          { type: "list", items: [
            "**1.** Сразу отправьте ещё один марш с пресетом ЗАЩИТЫ. **Пример:** {gordon} / {howard} **60 : 20 : 20**",
            "**2.** Следите, как ваш марш защиты движется к захваченному зданию.",
            "**3.** Когда останется примерно 5 секунд времени марша — или по указанию руководства — отзовите свой исходный марш АТАКИ.",
            "**4.** Ваш марш ЗАЩИТЫ прибывает и заменяет наступательный марш в гарнизоне."
          ] },
          { type: "callout", text: "🚫 **НЕ отзывайте марш атаки слишком рано.**" },
          { type: "p", text: "**Захват → Отправка защиты → ~5 сек → Отзыв атаки → Защита прибывает**" },
          { type: "p", text: "Так мы переходим от наступательного состава к оборонительному гарнизону, не ослабляя здание без необходимости." },
          { type: "h", text: "🪖 ЛИМИТ ВОЙСК В ГАРНИЗОНЕ" },
          { type: "p", text: "В штаб / святилище могут войти только 15 губернаторов. Поэтому не отправляйте автоматически свой максимальный марш в штаб, святилище или другие спорные здания." },
          { type: "p", text: "Соблюдайте лимит войск, объявленный руководством." },
          { type: "p", text: "**Обычная цель альянса: ~68 000 войск на игрока**" },
          { type: "p", text: "Так в гарнизон поместится больше участников альянса с правильно настроенными маршами защиты, и они получат награды." },
          { type: "callout", text: "⚠️ Если руководство объявит другой лимит, всегда следуйте объявленной цифре." },
          { type: "h", text: "🎬 КАК ПЕРЕКЛЮЧИТЬСЯ С АТАКУЮЩИХ ГЕРОЕВ НА ЗАЩИТНЫХ" },
          { type: "video", src: "figures/switch_hero.mp4", caption: "📎 Видео найдено в интернете (TikTok @yelloe_hair) — не наши собственные съёмки." }
        ]
      },
      th: {
        title: "รูปแบบการจัดวางทหารและเคล็ดลับทีมระดมพล",
        blocks: [
          { type: "h", text: "🔬 ลำดับความสำคัญของการวิจัยและอัปเกรด" },
          { type: "p", text: "จัดลำดับความสำคัญของค่าสถานะการต่อสู้เหล่านี้สำหรับการวิจัยและอัปเกรดเครื่องรางของเจ้าเมือง:" },
          { type: "list", items: [
            "{infantry} — {health}",
            "{archer} — {lethality}"
          ] },
          { type: "h", text: "💾 บันทึกพรีเซ็ตของคุณ" },
          { type: "p", text: "ขึ้นอยู่กับความก้าวหน้าของคุณ คุณสามารถปลดล็อกได้สูงสุด 8 ช่องเพื่อบันทึกรูปแบบการจัดวางทหารไว้ล่วงหน้า รูปแบบที่แนะนำให้บันทึก:" },
          { type: "callout", text: "อัตราส่วนทหารทั้งหมดเรียงตาม **{infantry} : {cavalry} : {archer}** บันทึกพรีเซ็ตแยกสำหรับฮีโร่แต่ละตัว โดยวางฮีโร่ไว้ซ้ายสุด / ตำแหน่งแรก" },
          { type: "callout", text: "💡 ฮีโร่ซ้ายสุดสำคัญเมื่อเข้าร่วมทีมระดมพล เพราะทักษะ (Expedition skill) ที่เกี่ยวข้องจะช่วยเสริมทีมระดมพลนั้น" },
          { type: "list", items: [
            "1) {bearHunt}: {chenko} — **10 : 10 : 80**",
            "2) {bearHunt}: {amane} — **10 : 10 : 80** (หรือใกล้เคียงที่สุด)",
            "3) {bearHunt}: {yeonwoo} — **10 : 10 : 80** (หรือใกล้เคียงที่สุด)",
            "4) {bearHunt}: {amadeus} — **10 : 10 : 80** (หรือใกล้เคียงที่สุด)",
            "5) โจมตี (PvP ทั่วไป): {amadeus} (หากพัฒนาแล้ว) หรือ {chenko} — **50 : 20 : 30**",
            "6) ป้องกัน: {howard} / {gordon} — **60 : 20 : 20** คือค่าเริ่มต้นที่สมดุลของเรา ปรับเปลี่ยนเมื่อผู้นำต้องการรูปแบบเฉพาะ"
          ] },
          { type: "p", text: "**ผู้นำทีมระดมพล:** ใช้ทีมฮีโร่โจมตีที่แข็งแกร่งและครบชุดที่สุดของคุณ" },
          { type: "p", text: "**ผู้เข้าร่วมทีมระดมพล:** โปรดปฏิบัติตามขีดจำกัดทหารที่ผู้นำประกาศ" },
          { type: "list", items: [
            "7) ศูนย์บัญชาการไวกิ้ง (Viking HQ): {howard} / {gordon} — **60 : 40** ปฏิบัติตามขีดจำกัดทหาร (~68,000)",
            "8) PvE – สัตว์อสูร / ล่า: {diana} + {fahd} — **50 : 20 : 30**"
          ] },
          { type: "h", text: "🐺 PvE — สัตว์อสูร / ล่า" },
          { type: "p", text: "จำไว้เกี่ยวกับหมาป่าสยองขวัญ: ไม่ต้องใช้ความเสียหายมาก ดังนั้นส่งทหารให้น้อยที่สุด (แม้แต่ 1) เพื่อให้สมาชิกพันธมิตรเข้าร่วมและได้รับรางวัลจากทีมระดมพลมากขึ้น" },
          { type: "h", text: "🏰 {castleBattle} / {sanctuary} / สิ่งปลูกสร้าง" },
          { type: "p", text: "เมื่อยึดสิ่งปลูกสร้าง ให้พร้อมสลับอย่างรวดเร็ว:" },
          { type: "callout", text: "**โจมตี → ป้องกัน**" },
          { type: "sub", text: "⚔️ 1. ยึดครอง" },
          { type: "p", text: "เข้าร่วมทีมระดมพลแรกด้วยพรีเซ็ตโจมตีของคุณ" },
          { type: "p", text: "**ตัวอย่าง:** {amadeus} / {chenko} **50 : 20 : 30**" },
          { type: "sub", text: "🛡️ 2. สลับเป็นป้องกัน" },
          { type: "p", text: "เมื่อยึดสิ่งปลูกสร้างได้แล้ว:" },
          { type: "list", items: [
            "**1.** ส่งการเดินทัพอีกชุดทันทีด้วยพรีเซ็ตป้องกันของคุณ **ตัวอย่าง:** {gordon} / {howard} **60 : 20 : 20**",
            "**2.** ดูการเดินทัพป้องกันของคุณเคลื่อนไปยังสิ่งปลูกสร้างที่ยึดได้",
            "**3.** เมื่อเหลือเวลาเดินทัพประมาณ 5 วินาที — หรือตามคำสั่งของผู้นำ — ให้เรียกกลับการเดินทัพโจมตีชุดเดิมของคุณ",
            "**4.** การเดินทัพป้องกันของคุณมาถึงและเข้าประจำการคุ้มกันแทนการเดินทัพโจมตี"
          ] },
          { type: "callout", text: "🚫 **ห้ามเรียกกลับการเดินทัพโจมตีเร็วเกินไป**" },
          { type: "p", text: "**ยึดครอง → ส่งป้องกัน → ~5 วินาที → เรียกกลับโจมตี → ป้องกันมาถึง**" },
          { type: "p", text: "วิธีนี้ทำให้เราเปลี่ยนจากรูปแบบโจมตีเป็นการคุ้มกันเชิงป้องกันได้ โดยไม่ทำให้สิ่งปลูกสร้างอ่อนแอลงโดยไม่จำเป็น" },
          { type: "h", text: "🪖 ขีดจำกัดทหารในการคุ้มกัน" },
          { type: "p", text: "มีเพียงเจ้าเมือง 15 คนเท่านั้นที่เข้าศูนย์บัญชาการ / วิหารได้ ดังนั้นอย่าส่งการเดินทัพสูงสุดของคุณไปยังศูนย์บัญชาการ วิหาร หรือสิ่งปลูกสร้างที่ต้องแย่งชิงอื่น ๆ โดยอัตโนมัติ" },
          { type: "p", text: "ปฏิบัติตามขีดจำกัดทหารที่ผู้นำประกาศ" },
          { type: "p", text: "**เป้าหมายทั่วไปของพันธมิตร: ~68,000 ทหารต่อผู้เล่น**" },
          { type: "p", text: "วิธีนี้ทำให้สมาชิกพันธมิตรที่ตั้งค่าการเดินทัพป้องกันอย่างถูกต้องเข้าไปได้มากขึ้นและได้รับรางวัล" },
          { type: "callout", text: "⚠️ หากผู้นำประกาศขีดจำกัดที่ต่างออกไป ให้ทำตามจำนวนที่ประกาศเสมอ" },
          { type: "h", text: "🎬 วิธีสลับจากฮีโร่โจมตีเป็นฮีโร่ป้องกัน" },
          { type: "video", src: "figures/switch_hero.mp4", caption: "📎 วิดีโอจากอินเทอร์เน็ต (TikTok @yelloe_hair) — ไม่ใช่ฟุตเทจของเราเอง" }
        ]
      },
      ar: {
        title: "القوات ونصائح الحشد",
        blocks: [
          { type: "h", text: "🔬 أولويات البحث والترقية" },
          { type: "p", text: "أعطِ الأولوية لهذه السمات القتالية عند البحث وترقية تمائم الحاكم:" },
          { type: "list", items: [
            "{infantry} — {health}",
            "{archer} — {lethality}"
          ] },
          { type: "h", text: "💾 احفظ إعداداتك المسبقة (Presets)" },
          { type: "p", text: "حسب تقدمك، يمكنك فتح ما يصل إلى 8 خانات لحفظ تشكيلات القوات مسبقًا. التشكيلات الموصى بحفظها:" },
          { type: "callout", text: "جميع نسب القوات بترتيب **{infantry} : {cavalry} : {archer}**. احفظ إعدادًا مسبقًا منفصلًا لكل بطل، مع وضعه في أقصى اليسار / الموضع الأول." },
          { type: "callout", text: "💡 البطل في أقصى اليسار مهم عند الانضمام إلى الحشود، لأن مهارة الحملة المرتبطة به تساهم في الحشد." },
          { type: "list", items: [
            "1) {bearHunt}: {chenko} — **10 : 10 : 80**",
            "2) {bearHunt}: {amane} — **10 : 10 : 80** (أو أقرب ما يمكن)",
            "3) {bearHunt}: {yeonwoo} — **10 : 10 : 80** (أو أقرب ما يمكن)",
            "4) {bearHunt}: {amadeus} — **10 : 10 : 80** (أو أقرب ما يمكن)",
            "5) الهجوم (PvP عام): {amadeus} (إن تم تطويره) أو {chenko} — **50 : 20 : 30**",
            "6) الدفاع: {howard} / {gordon} — **60 : 20 : 20** هو إعدادنا الافتراضي المتوازن. عدّله عندما تطلب القيادة تشكيلًا محددًا."
          ] },
          { type: "p", text: "**قادة الحشد:** استخدم أقوى تشكيلة أبطال هجومية كاملة لديك." },
          { type: "p", text: "**المنضمون إلى الحشد:** يُرجى الالتزام بحدود القوات التي تعلنها القيادة." },
          { type: "list", items: [
            "7) مقر الفايكنغ (Viking HQ): {howard} / {gordon} — **60 : 40** التزم بحد القوات (~68,000)",
            "8) PvE – الوحوش / الصيد: {diana} + {fahd} — **50 : 20 : 30**"
          ] },
          { type: "h", text: "🐺 PvE — الوحوش / الصيد" },
          { type: "p", text: "تذكّر بخصوص الذئب المخيف: لا حاجة إلى ضرر كبير، لذا أرسل أقل عدد ممكن من القوات (حتى 1) ليتمكن مزيد من أعضاء التحالف من الانضمام والاستفادة من مكافآت الحشد." },
          { type: "h", text: "🏰 {castleBattle} / {sanctuary} / المباني" },
          { type: "p", text: "عند السيطرة على المباني، كن مستعدًا للتبديل بسرعة:" },
          { type: "callout", text: "**هجوم ← دفاع**" },
          { type: "sub", text: "⚔️ 1. السيطرة" },
          { type: "p", text: "انضم إلى الحشد الأول باستخدام إعداد الهجوم المسبق." },
          { type: "p", text: "**مثال:** {amadeus} / {chenko} **50 : 20 : 30**" },
          { type: "sub", text: "🛡️ 2. التبديل إلى الدفاع" },
          { type: "p", text: "بعد السيطرة على المبنى:" },
          { type: "list", items: [
            "**1.** أرسل فورًا طابورًا آخر باستخدام إعداد الدفاع المسبق. **مثال:** {gordon} / {howard} **60 : 20 : 20**",
            "**2.** راقب طابور الدفاع وهو يتجه نحو المبنى الذي تمت السيطرة عليه.",
            "**3.** عندما يتبقى نحو 5 ثوانٍ من وقت الطابور — أو حسب تعليمات القيادة — قم بـ**استدعاء** طابور الهجوم الأصلي.",
            "**4.** يصل طابور الدفاع ويحل محل طابور الهجوم في الحامية."
          ] },
          { type: "callout", text: "🚫 **لا تقم بـ استدعاء طابور الهجوم مبكرًا جدًا.**" },
          { type: "p", text: "**السيطرة ← إرسال الدفاع ← ~5 ثوانٍ ← استدعاء الهجوم ← وصول الدفاع**" },
          { type: "p", text: "يتيح لنا ذلك الانتقال من التشكيل الهجومي إلى حامية دفاعية دون إضعاف المبنى دون داعٍ." },
          { type: "h", text: "🪖 الحد الأقصى للقوات في الحامية" },
          { type: "p", text: "يمكن لـ15 حاكمًا فقط دخول المقر / المأوى. لذا لا ترسل طابورك الأقصى تلقائيًا إلى المقر أو المأوى أو غيرهما من المباني المتنازع عليها." },
          { type: "p", text: "التزم بالحد الأقصى للقوات الذي تعلنه القيادة." },
          { type: "p", text: "**الهدف المعتاد للتحالف: ~68,000 من القوات لكل لاعب**" },
          { type: "p", text: "يتيح ذلك لعدد أكبر من أعضاء التحالف ممن أعدّوا طوابير دفاع مضبوطة جيدًا أن يدخلوا الحامية ويحصلوا على المكافآت." },
          { type: "callout", text: "⚠️ إذا أعلنت القيادة حدًا مختلفًا، فالتزم دائمًا بالرقم المعلن." },
          { type: "h", text: "🎬 كيف تبدّل من أبطال الهجوم إلى أبطال الدفاع" },
          { type: "video", src: "figures/switch_hero.mp4", caption: "📎 فيديو من الإنترنت (TikTok @yelloe_hair) — ليس من تصويرنا." }
        ]
      },
    }
  },
  "eternity-reach": {
    emoji: "⛏️",
    name: {
      en: "Eternity's Reach", zh: "失落的遺跡", ko: "사라진 유적",
      de: "Weiten der Ewigkeit", fr: "l'Éternité à Portée", pt: "Alcance da Eternidade",
      tr: "Sonsuzluğun Erişimi", id: "Eternity's Reach", ru: "Предел бесконечности",
      th: "ขอบเขตนิรันดร์", ar: "وصول الأبدية"
    },
    sections: {
      en: { title: "Eternity's Reach", blocks: [
        { type: "h", text: "WHEN" },
        { type: "p", text: "Every 2 weeks — a 30-minute solo event." },
        { type: "h", text: "WHY IT MATTERS" },
        { type: "p", text: "One of the best recurring sources of Governor Charm materials." },
        { type: "h", text: "STRATEGY" },
        { type: "sub", text: "Skills" },
        { type: "p", text: "For each skill level, select:" },
        { type: "list", items: ["Level 1 → Right", "Level 2 → Right", "Level 3 → Left", "Level 4 → Left", "Level 5 → Right"] },
        { type: "sub", text: "Start" },
        { type: "p", text: "Attack Cesares Guards → Rush until Skill 3 is unlocked." },
        { type: "p", text: "Target Lv.2 Cesares Guards when possible, and skip ones already being attacked." },
        { type: "sub", text: "Every 60 Seconds" },
        { type: "p", text: "Enter a Copper Vein → Get 5,000 Copper → Recall immediately → Note the time → Repeat every 1 minute." },
        { type: "callout", text: "Only one march is needed to trigger the 5,000 Copper bonus." },
        { type: "sub", text: "Fracture Veins" },
        { type: "p", text: "When they appear → Send available marches immediately → Gather until they disappear." },
        { type: "sub", text: "Loot Wagon" },
        { type: "p", text: "Keep it collecting loose Copper throughout the event. It does not use a march slot." },
        { type: "sub", text: "Skill 5" },
        { type: "p", text: "Activate the 5th skill during a vein outburst and send all troops to gather at veins." },
        { type: "sub", text: "Peak of Eternity" },
        { type: "p", text: "Opens during the final 7 minutes." },
        { type: "p", text: "Avoid unnecessary PvP if you are not strong enough to contest it → Capture only when worthwhile." },
        { type: "sub", text: "Positioning" },
        { type: "p", text: "Use the free teleport to move near 3 Veins or into a less crowded area." },
        { type: "img", src: "figures/eternity_reach.jpg", alt: "Eternity's Reach" }
      ]},
      zh: { title: "失落的遺跡", blocks: [
        { type: "h", text: "開放時間" },
        { type: "p", text: "每兩週一次，個人挑戰，時長30分鐘。" },
        { type: "h", text: "為什麼重要" },
        { type: "p", text: "是領主寶石材料最好的常態來源之一。" },
        { type: "h", text: "攻略策略" },
        { type: "sub", text: "技能加點" },
        { type: "p", text: "每一級技能請依序選擇：" },
        { type: "list", items: ["第1級 → 右", "第2級 → 右", "第3級 → 左", "第4級 → 左", "第5級 → 右"] },
        { type: "sub", text: "開局" },
        { type: "p", text: "攻擊切薩雷守衛 → 快速推進直到解鎖第3級技能。" },
        { type: "p", text: "盡量鎖定2級的切薩雷守衛，並跳過已經有人在攻擊的目標。" },
        { type: "sub", text: "每60秒" },
        { type: "p", text: "進入銅礦脈 → 取得5,000銅礦 → 立刻召回 → 記下時間 → 每1分鐘重複一次。" },
        { type: "callout", text: "只需要一支部隊就能觸發5,000銅礦獎勵。" },
        { type: "sub", text: "不穩定礦脈" },
        { type: "p", text: "出現時 → 立刻派出可用部隊 → 持續採集直到消失。" },
        { type: "sub", text: "運寶車" },
        { type: "p", text: "讓它在整場活動中持續收集散落的銅礦，它不會佔用行軍隊列。" },
        { type: "sub", text: "第5級技能" },
        { type: "p", text: "在礦脈爆發時啟動第5級技能，並派出所有部隊前往礦脈採集。" },
        { type: "sub", text: "失落宮殿" },
        { type: "p", text: "於最後7分鐘開放。" },
        { type: "p", text: "若實力不足以爭奪，請避免不必要的PvP → 只在划算時才佔領。" },
        { type: "sub", text: "走位技巧" },
        { type: "p", text: "利用免費傳送移動到靠近3個礦脈或人較少的區域。" },
        { type: "img", src: "figures/eternity_reach.jpg", alt: "失落的遺跡" }
      ]},
      ko: { title: "사라진 유적", blocks: [
        { type: "h", text: "개최 시기" },
        { type: "p", text: "2주마다 진행되는 30분짜리 개인 이벤트입니다." },
        { type: "h", text: "중요한 이유" },
        { type: "p", text: "영주 보석 재료를 얻을 수 있는 최고의 반복 수급처 중 하나입니다." },
        { type: "h", text: "전략" },
        { type: "sub", text: "스킬" },
        { type: "p", text: "각 스킬 레벨마다 다음과 같이 선택하세요:" },
        { type: "list", items: ["1레벨 → 오른쪽", "2레벨 → 오른쪽", "3레벨 → 왼쪽", "4레벨 → 왼쪽", "5레벨 → 오른쪽"] },
        { type: "sub", text: "시작" },
        { type: "p", text: "체사레 수비병을 공격 → 3레벨 스킬이 해제될 때까지 빠르게 진행하세요." },
        { type: "p", text: "가능하면 2레벨 체사레 수비병을 목표로 하고, 이미 공격받고 있는 대상은 건너뛰세요." },
        { type: "sub", text: "매 60초마다" },
        { type: "p", text: "구리 광맥에 진입 → 구리 5,000 획득 → 즉시 소환 → 시간을 기록 → 1분마다 반복하세요." },
        { type: "callout", text: "5,000 구리 보너스를 발동하는 데는 부대 1개면 충분합니다." },
        { type: "sub", text: "불안정한 광맥" },
        { type: "p", text: "등장하면 → 가용 부대를 즉시 보내세요 → 사라질 때까지 채집하세요." },
        { type: "sub", text: "전리품 수레" },
        { type: "p", text: "이벤트 내내 흩어진 구리를 계속 모으게 하세요. 행군 대열을 차지하지 않습니다." },
        { type: "sub", text: "5레벨 스킬" },
        { type: "p", text: "광맥이 폭발할 때 5레벨 스킬을 발동하고, 모든 부대를 광맥으로 보내 채집하세요." },
        { type: "sub", text: "사라진 궁전" },
        { type: "p", text: "마지막 7분 동안 개방됩니다." },
        { type: "p", text: "경쟁할 만큼 강하지 않다면 불필요한 PvP는 피하세요 → 가치가 있을 때만 점령하세요." },
        { type: "sub", text: "위치 선정" },
        { type: "p", text: "무료 텔레포트를 이용해 광맥 3개 근처나 사람이 적은 지역으로 이동하세요." },
        { type: "img", src: "figures/eternity_reach.jpg", alt: "사라진 유적" }
      ]},
      de: { title: "Weiten der Ewigkeit", blocks: [
        { type: "h", text: "WANN" },
        { type: "p", text: "Alle 2 Wochen — ein 30-minütiges Solo-Event." },
        { type: "h", text: "WARUM ES WICHTIG IST" },
        { type: "p", text: "Eine der besten wiederkehrenden Quellen für Gouverneurs Talisman-Materialien." },
        { type: "h", text: "STRATEGIE" },
        { type: "sub", text: "Fähigkeiten" },
        { type: "p", text: "Wähle für jede Fähigkeitsstufe:" },
        { type: "list", items: ["Stufe 1 → Rechts", "Stufe 2 → Rechts", "Stufe 3 → Links", "Stufe 4 → Links", "Stufe 5 → Rechts"] },
        { type: "sub", text: "Start" },
        { type: "p", text: "Greife Cesares Wächter an → Rushe, bis Fähigkeit 3 freigeschaltet ist." },
        { type: "p", text: "Ziele nach Möglichkeit auf Stufe-2-Cesares-Wächter und überspringe bereits angegriffene." },
        { type: "sub", text: "Alle 60 Sekunden" },
        { type: "p", text: "Betrete eine Kupferader → Erhalte 5.000 Kupfer → Sofort zurückrufen → Zeit notieren → Alle 1 Minute wiederholen." },
        { type: "callout", text: "Nur ein Marsch ist nötig, um den 5.000-Kupfer-Bonus auszulösen." },
        { type: "sub", text: "Gebrochene Adern" },
        { type: "p", text: "Wenn sie erscheinen → Schicke sofort verfügbare Märsche → Sammle, bis sie verschwinden." },
        { type: "sub", text: "Beutewagen" },
        { type: "p", text: "Lasse ihn während des gesamten Events lose Kupfer sammeln. Er belegt keinen Marschplatz." },
        { type: "sub", text: "Fähigkeit 5" },
        { type: "p", text: "Aktiviere die 5. Fähigkeit während eines Ader-Ausbruchs und schicke alle Truppen zu den Adern." },
        { type: "sub", text: "Gipfel der Ewigkeit" },
        { type: "p", text: "Öffnet sich in den letzten 7 Minuten." },
        { type: "p", text: "Vermeide unnötiges PvP, wenn du nicht stark genug bist, um mitzuhalten → Erobere nur, wenn es sich lohnt." },
        { type: "sub", text: "Positionierung" },
        { type: "p", text: "Nutze den kostenlosen Teleport, um dich in die Nähe von 3 Adern oder in ein weniger überfülltes Gebiet zu bewegen." },
        { type: "img", src: "figures/eternity_reach.jpg", alt: "Weiten der Ewigkeit" }
      ]},
      fr: { title: "l'Éternité à Portée", blocks: [
        { type: "h", text: "QUAND" },
        { type: "p", text: "Toutes les 2 semaines — un événement solo de 30 minutes." },
        { type: "h", text: "POURQUOI C'EST IMPORTANT" },
        { type: "p", text: "L'une des meilleures sources récurrentes de matériaux pour le Talisman du Gouverneur." },
        { type: "h", text: "STRATÉGIE" },
        { type: "sub", text: "Compétences" },
        { type: "p", text: "Pour chaque niveau de compétence, choisis :" },
        { type: "list", items: ["Niveau 1 → Droite", "Niveau 2 → Droite", "Niveau 3 → Gauche", "Niveau 4 → Gauche", "Niveau 5 → Droite"] },
        { type: "sub", text: "Début" },
        { type: "p", text: "Attaque les Gardes Césarès → Fonce jusqu'à débloquer la Compétence 3." },
        { type: "p", text: "Vise les Gardes Césarès de niveau 2 quand c'est possible, et évite ceux déjà attaqués." },
        { type: "sub", text: "Toutes les 60 secondes" },
        { type: "p", text: "Entre dans un Filon de Cuivre → Obtiens 5 000 cuivre → Rappelle immédiatement → Note l'heure → Répète toutes les 1 minute." },
        { type: "callout", text: "Une seule marche suffit pour déclencher le bonus de 5 000 cuivre." },
        { type: "sub", text: "Filons Fracturés" },
        { type: "p", text: "Quand ils apparaissent → Envoie immédiatement les marches disponibles → Récolte jusqu'à leur disparition." },
        { type: "sub", text: "Chariot de Butin" },
        { type: "p", text: "Laisse-le collecter le cuivre au sol pendant tout l'événement. Il n'occupe pas de place de marche." },
        { type: "sub", text: "Compétence 5" },
        { type: "p", text: "Active la 5e compétence pendant une éruption de filon et envoie toutes tes troupes récolter aux filons." },
        { type: "sub", text: "Pic de l'Éternité" },
        { type: "p", text: "S'ouvre pendant les 7 dernières minutes." },
        { type: "p", text: "Évite les PvP inutiles si tu n'es pas assez fort pour rivaliser → Capture uniquement quand cela en vaut la peine." },
        { type: "sub", text: "Positionnement" },
        { type: "p", text: "Utilise la téléportation gratuite pour te rapprocher de 3 filons ou vers une zone moins fréquentée." },
        { type: "img", src: "figures/eternity_reach.jpg", alt: "l'Éternité à Portée" }
      ]},
      pt: { title: "Alcance da Eternidade", blocks: [
        { type: "h", text: "QUANDO" },
        { type: "p", text: "A cada 2 semanas — um evento solo de 30 minutos." },
        { type: "h", text: "POR QUE É IMPORTANTE" },
        { type: "p", text: "Uma das melhores fontes recorrentes de materiais para o Talismã do Governador." },
        { type: "h", text: "ESTRATÉGIA" },
        { type: "sub", text: "Habilidades" },
        { type: "p", text: "Para cada nível de habilidade, escolha:" },
        { type: "list", items: ["Nível 1 → Direita", "Nível 2 → Direita", "Nível 3 → Esquerda", "Nível 4 → Esquerda", "Nível 5 → Direita"] },
        { type: "sub", text: "Início" },
        { type: "p", text: "Ataque os Guardas Césares → Avance rapidamente até desbloquear a Habilidade 3." },
        { type: "p", text: "Foque nos Guardas Césares de Nv.2 quando possível, e evite os que já estão sendo atacados." },
        { type: "sub", text: "A cada 60 segundos" },
        { type: "p", text: "Entre em um Veio de Cobre → Ganhe 5.000 de Cobre → Recolha imediatamente → Anote o horário → Repita a cada 1 minuto." },
        { type: "callout", text: "Apenas uma marcha é necessária para ativar o bônus de 5.000 de Cobre." },
        { type: "sub", text: "Veios Fraturados" },
        { type: "p", text: "Quando aparecerem → Envie marchas disponíveis imediatamente → Colete até desaparecerem." },
        { type: "sub", text: "Carroça de Espólio" },
        { type: "p", text: "Deixe-a coletando o Cobre solto durante todo o evento. Ela não ocupa uma vaga na fila de marcha." },
        { type: "sub", text: "Habilidade 5" },
        { type: "p", text: "Ative a 5ª habilidade durante uma explosão de veio e envie todas as tropas para coletar nos veios." },
        { type: "sub", text: "Pico da Eternidade" },
        { type: "p", text: "Abre nos últimos 7 minutos." },
        { type: "p", text: "Evite PvP desnecessário se você não for forte o suficiente para disputar → Capture apenas quando valer a pena." },
        { type: "sub", text: "Posicionamento" },
        { type: "p", text: "Use a teletransportação gratuita para se mover perto de 3 Veios ou para uma área menos lotada." },
        { type: "img", src: "figures/eternity_reach.jpg", alt: "Alcance da Eternidade" }
      ]},
      tr: { title: "Sonsuzluğun Erişimi", blocks: [
        { type: "h", text: "NE ZAMAN" },
        { type: "p", text: "Her 2 haftada bir — 30 dakikalık bireysel etkinlik." },
        { type: "h", text: "NEDEN ÖNEMLİ" },
        { type: "p", text: "Vali Tılsımı malzemeleri için en iyi tekrarlanan kaynaklardan biri." },
        { type: "h", text: "STRATEJİ" },
        { type: "sub", text: "Yetenekler" },
        { type: "p", text: "Her yetenek seviyesi için seç:" },
        { type: "list", items: ["Seviye 1 → Sağ", "Seviye 2 → Sağ", "Seviye 3 → Sol", "Seviye 4 → Sol", "Seviye 5 → Sağ"] },
        { type: "sub", text: "Başlangıç" },
        { type: "p", text: "Cesares Muhafızlarına saldır → Yetenek 3 açılana kadar hızla ilerle." },
        { type: "p", text: "Mümkün olduğunda Sv.2 Cesares Muhafızlarını hedef al ve zaten saldırılanları atla." },
        { type: "sub", text: "Her 60 Saniyede Bir" },
        { type: "p", text: "Bir Bakır Damarına gir → 5.000 Bakır kazan → Hemen geri çağır → Zamanı not et → Her 1 dakikada bir tekrarla." },
        { type: "callout", text: "5.000 Bakır bonusunu tetiklemek için tek bir sefer yeterlidir." },
        { type: "sub", text: "Çatlak Damarlar" },
        { type: "p", text: "Ortaya çıktıklarında → Mevcut seferleri hemen gönder → Kaybolana kadar topla." },
        { type: "sub", text: "Ganimet Arabası" },
        { type: "p", text: "Etkinlik boyunca serbest Bakırı toplamaya devam etsin. Sefer slotu kullanmaz." },
        { type: "sub", text: "Yetenek 5" },
        { type: "p", text: "Damar patlaması sırasında 5. yeteneği etkinleştir ve tüm birlikleri damarlarda toplanmaya gönder." },
        { type: "sub", text: "Sonsuzluğun Zirvesi" },
        { type: "p", text: "Son 7 dakika içinde açılır." },
        { type: "p", text: "Rekabet edecek kadar güçlü değilsen gereksiz PvP'den kaçın → Sadece değdiğinde ele geçir." },
        { type: "sub", text: "Konumlandırma" },
        { type: "p", text: "Ücretsiz ışınlanmayı kullanarak 3 Damara yakın veya daha az kalabalık bir bölgeye taşın." },
        { type: "img", src: "figures/eternity_reach.jpg", alt: "Sonsuzluğun Erişimi" }
      ]},
      id: { title: "Eternity's Reach", blocks: [
        { type: "h", text: "KAPAN" },
        { type: "p", text: "Setiap 2 minggu sekali — event solo berdurasi 30 menit." },
        { type: "h", text: "KENAPA PENTING" },
        { type: "p", text: "Salah satu sumber terbaik dan berulang untuk material Charm Gubernur." },
        { type: "h", text: "STRATEGI" },
        { type: "sub", text: "Skill" },
        { type: "p", text: "Untuk setiap level skill, pilih:" },
        { type: "list", items: ["Level 1 → Kanan", "Level 2 → Kanan", "Level 3 → Kiri", "Level 4 → Kiri", "Level 5 → Kanan"] },
        { type: "sub", text: "Mulai" },
        { type: "p", text: "Serang Cesares Guards → Rush sampai Skill 3 terbuka." },
        { type: "p", text: "Targetkan Cesares Guards Lv.2 jika memungkinkan, dan lewati yang sudah diserang." },
        { type: "sub", text: "Setiap 60 Detik" },
        { type: "p", text: "Masuk ke Vein Tembaga → Dapatkan 5.000 Tembaga → Segera tarik pulang → Catat waktunya → Ulangi setiap 1 menit." },
        { type: "callout", text: "Hanya perlu satu pasukan untuk memicu bonus 5.000 Tembaga." },
        { type: "sub", text: "Fracture Vein" },
        { type: "p", text: "Saat muncul → Segera kirim pasukan yang tersedia → Kumpulkan sampai menghilang." },
        { type: "sub", text: "Gerobak Jarahan" },
        { type: "p", text: "Biarkan terus mengumpulkan Tembaga yang berserakan sepanjang event. Tidak menggunakan slot barisan." },
        { type: "sub", text: "Skill 5" },
        { type: "p", text: "Aktifkan skill ke-5 saat vein meletus dan kirim semua pasukan untuk mengumpulkan di vein." },
        { type: "sub", text: "Peak of Eternity" },
        { type: "p", text: "Terbuka pada 7 menit terakhir." },
        { type: "p", text: "Hindari PvP yang tidak perlu jika kamu belum cukup kuat untuk memperebutkannya → Rebut hanya jika sepadan." },
        { type: "sub", text: "Posisi" },
        { type: "p", text: "Gunakan teleport gratis untuk pindah dekat 3 Vein atau ke area yang lebih sepi." },
        { type: "img", src: "figures/eternity_reach.jpg", alt: "Eternity's Reach" }
      ]},
      ru: { title: "Предел бесконечности", blocks: [
        { type: "h", text: "КОГДА" },
        { type: "p", text: "Раз в 2 недели — сольное событие продолжительностью 30 минут." },
        { type: "h", text: "ПОЧЕМУ ЭТО ВАЖНО" },
        { type: "p", text: "Один из лучших регулярных источников материалов для талисмана губернатора." },
        { type: "h", text: "СТРАТЕГИЯ" },
        { type: "sub", text: "Навыки" },
        { type: "p", text: "Для каждого уровня навыка выбирайте:" },
        { type: "list", items: ["Уровень 1 → Право", "Уровень 2 → Право", "Уровень 3 → Лево", "Уровень 4 → Лево", "Уровень 5 → Право"] },
        { type: "sub", text: "Начало" },
        { type: "p", text: "Атакуйте стражей цесарцев → Быстро продвигайтесь, пока не откроется 3-й навык." },
        { type: "p", text: "По возможности выбирайте стражей цесарцев 2-го уровня и пропускайте тех, кого уже атакуют." },
        { type: "sub", text: "Каждые 60 секунд" },
        { type: "p", text: "Войдите в медную жилу → Получите 5000 меди → Немедленно отзовите войска → Запомните время → Повторяйте каждую минуту." },
        { type: "callout", text: "Для получения бонуса в 5000 меди достаточно одного марша." },
        { type: "sub", text: "Прорыв жил" },
        { type: "p", text: "Когда они появляются → Немедленно отправьте доступные марши → Собирайте, пока они не исчезнут." },
        { type: "sub", text: "Повозка добычи" },
        { type: "p", text: "Пусть она собирает рассыпанную медь на протяжении всего события. Она не занимает место в очереди марша." },
        { type: "sub", text: "5-й навык" },
        { type: "p", text: "Активируйте 5-й навык во время прорыва жилы и отправьте все войска собирать ресурсы у жил." },
        { type: "sub", text: "Пик бесконечности" },
        { type: "p", text: "Открывается в последние 7 минут." },
        { type: "p", text: "Избегайте ненужного PvP, если вы недостаточно сильны для борьбы → Захватывайте только тогда, когда это того стоит." },
        { type: "sub", text: "Позиционирование" },
        { type: "p", text: "Используйте бесплатную телепортацию, чтобы переместиться ближе к 3 жилам или в менее людное место." },
        { type: "img", src: "figures/eternity_reach.jpg", alt: "Предел бесконечности" }
      ]},
      th: { title: "ขอบเขตนิรันดร์", blocks: [
        { type: "h", text: "เมื่อไหร่" },
        { type: "p", text: "ทุก 2 สัปดาห์ — กิจกรรมเดี่ยว ระยะเวลา 30 นาที" },
        { type: "h", text: "ทำไมถึงสำคัญ" },
        { type: "p", text: "เป็นหนึ่งในแหล่งที่ดีที่สุดในการรับวัสดุเครื่องรางเจ้าเมืองแบบต่อเนื่อง" },
        { type: "h", text: "กลยุทธ์" },
        { type: "sub", text: "สกิล" },
        { type: "p", text: "สำหรับสกิลแต่ละเลเวล ให้เลือก:" },
        { type: "list", items: ["เลเวล 1 → ขวา", "เลเวล 2 → ขวา", "เลเวล 3 → ซ้าย", "เลเวล 4 → ซ้าย", "เลเวล 5 → ขวา"] },
        { type: "sub", text: "เริ่มต้น" },
        { type: "p", text: "โจมตีทหารยามซีซาเรส → เร่งไปจนกว่าจะปลดล็อกสกิลระดับ 3" },
        { type: "p", text: "เล็งเป้าทหารยามซีซาเรสเลเวล 2 ให้ได้มากที่สุด และข้ามเป้าที่มีคนโจมตีอยู่แล้ว" },
        { type: "sub", text: "ทุก 60 วินาที" },
        { type: "p", text: "เข้าไปในสายแร่ทองแดง → รับทองแดง 5,000 → เรียกกลับทันที → จดเวลาไว้ → ทำซ้ำทุก 1 นาที" },
        { type: "callout", text: "ใช้กองทัพแค่ 1 กองก็สามารถรับโบนัสทองแดง 5,000 ได้" },
        { type: "sub", text: "สายแร่ประทุ" },
        { type: "p", text: "เมื่อปรากฏขึ้น → ส่งกองทัพที่ว่างทันที → เก็บไปเรื่อยๆ จนกว่าจะหายไป" },
        { type: "sub", text: "รถลากของปล้น" },
        { type: "p", text: "ให้มันเก็บทองแดงที่กระจายอยู่ตลอดกิจกรรม มันไม่ใช้คิวเดินทัพ" },
        { type: "sub", text: "สกิลระดับ 5" },
        { type: "p", text: "เปิดใช้งานสกิลระดับ 5 ตอนสายแร่ประทุ แล้วส่งกองทัพทั้งหมดไปเก็บที่สายแร่" },
        { type: "sub", text: "ยอดเขานิรันดร์" },
        { type: "p", text: "จะเปิดในช่วง 7 นาทีสุดท้าย" },
        { type: "p", text: "หลีกเลี่ยง PvP ที่ไม่จำเป็นหากยังไม่แข็งแกร่งพอที่จะแย่งชิง → ยึดเมื่อคุ้มค่าเท่านั้น" },
        { type: "sub", text: "การจัดตำแหน่ง" },
        { type: "p", text: "ใช้การเทเลพอร์ตฟรีเพื่อย้ายไปใกล้สายแร่ 3 จุด หรือไปยังพื้นที่ที่มีคนน้อยกว่า" },
        { type: "img", src: "figures/eternity_reach.jpg", alt: "ขอบเขตนิรันดร์" }
      ]},
      ar: { title: "وصول الأبدية", blocks: [
        { type: "h", text: "متى" },
        { type: "p", text: "كل أسبوعين — فعالية فردية مدتها 30 دقيقة." },
        { type: "h", text: "لماذا هذا مهم" },
        { type: "p", text: "أحد أفضل المصادر المتكررة لمواد تميمة الحاكم." },
        { type: "h", text: "الاستراتيجية" },
        { type: "sub", text: "المهارات" },
        { type: "p", text: "لكل مستوى مهارة، اختر:" },
        { type: "list", items: ["المستوى 1 → يمين", "المستوى 2 → يمين", "المستوى 3 → يسار", "المستوى 4 → يسار", "المستوى 5 → يمين"] },
        { type: "sub", text: "البداية" },
        { type: "p", text: "هاجم حراس سيزاريس → تقدّم بسرعة حتى يتم فتح المهارة 3." },
        { type: "p", text: "استهدف حراس سيزاريس من المستوى 2 عند الإمكان، وتجاوز من يتم مهاجمتهم بالفعل." },
        { type: "sub", text: "كل 60 ثانية" },
        { type: "p", text: "ادخل عرق النحاس → احصل على 5,000 نحاس → استدعِ فورًا → دوّن الوقت → كرر كل دقيقة واحدة." },
        { type: "callout", text: "يكفي جيش واحد فقط لتفعيل مكافأة 5,000 نحاس." },
        { type: "sub", text: "العروق المتصدعة" },
        { type: "p", text: "عند ظهورها → أرسل الجيوش المتاحة فورًا → اجمع حتى تختفي." },
        { type: "sub", text: "عربة الغنائم" },
        { type: "p", text: "اجعلها تجمع النحاس المتناثر طوال الفعالية. لا تشغل مكانًا في طابور الزحف." },
        { type: "sub", text: "المهارة 5" },
        { type: "p", text: "فعّل المهارة 5 أثناء تفجّر العرق وأرسل كل الجيوش لتجميع الموارد عند العروق." },
        { type: "sub", text: "قمة الأبدية" },
        { type: "p", text: "يُفتح خلال آخر 7 دقائق." },
        { type: "p", text: "تجنب الاشتباكات غير الضرورية إذا لم تكن قويًا بما يكفي للتنافس → استولِ فقط عندما يستحق الأمر." },
        { type: "sub", text: "تحديد الموقع" },
        { type: "p", text: "استخدم النقل الآني المجاني للانتقال بالقرب من 3 عروق أو إلى منطقة أقل ازدحامًا." },
        { type: "img", src: "figures/eternity_reach.jpg", alt: "وصول الأبدية" }
      ]}
    }
  }
};

/* ===== Bear Hunt: extra languages (fr, pt, tr) ===== */
function addBear(lang, d) {
  const g = GUIDES["bear-hunt"];
  g.sections[lang] = d.section;
  let k = 0;
  g.leaders.forEach((gen, i) => {
    gen.gen[lang] = d.gen + " " + (i + 1);
    gen.rows.forEach((r) => { r.note[lang] = d.notes[k++]; });
  });
}
HEROES.Marlin.pt = "Peixe Marlin"; /* 對照表葡文 */

addBear("fr", {
  gen: "GEN",
  section: {
    title: "Chasse à l'Ours",
    when_label: "QUAND",
    when: "Tous les 2 jours, à l'heure prévue par votre Alliance.",
    why_label: "POURQUOI C'EST IMPORTANT",
    why: "Source principale de matériaux d'Équipement de héros (Marteaux de Forge) et d'EXP d'Amélioration.",
    prep_label: "PRÉPARATION",
    prep: [
      "Mettez à jour vos formations de troupe avant chaque Chasse à l'Ours.",
      { callout: true, text: "Optionnel : utilisez <a href=\"https://frakinator.streamlit.app/\" target=\"_blank\" rel=\"noopener\">frakinator.streamlit.app</a> pour tester les ratios de troupes et trouver votre meilleure formation." },
      "Rappelez les troupes en collecte avant le début de l'événement.",
      "N'oubliez pas : pendant les 5 à 7 dernières minutes, tout le monde devrait lancer un ralliement. Cela libère davantage de places pour les joueurs dont les troupes reviennent et permet un dernier coup de collier de dégâts."
    ],
    leaders_label: "LEADERS DE RALLIEMENT",
    joiners_label: "PARTICIPANTS AU RALLIEMENT",
    joiners_ratio: "Ratio standard / sûr : 10 % d'Infanterie, 10 % de Cavalerie et 80 % d'Archers (ou une variante comme 20-30-50)"
  },
  notes: [
    "Formation de troupe : 30-30-40 %. Dans la plupart des cas, l'Infanterie aura les meilleures stats grâce aux stats brutes d'Amadeus, donc une formation ultra-équilibrée avec un peu plus d'Archers fonctionne le mieux.",
    "Formation de troupe : 20-40-40 %. Principalement pour ceux qui n'ont pas encore misé sur Amadeus, et cela permet d'utiliser Amadeus pour rejoindre des ralliements.",
    "Formation de troupe : 30-30-40 %. Pour les F2P, il est recommandé d'utiliser toujours les 3 héros dont vous disposez pour lancer un ralliement.",
    "Formation de troupe : 20-30-50 %. Marlin augmentera fortement les dégâts grâce à son équipement exclusif de ralliement. À partir de la Gen 2, l'Infanterie sera toujours Amadeus ou Helga : ce sont les seuls héros d'Infanterie avec un équipement exclusif de ralliement (bonus de Létalité). Vous envoyez moins d'Infanterie, donc le héros d'Infanterie compense les dégâts des Archers grâce à cet équipement plutôt qu'en égalant les stats d'Infanterie.",
    "Formation de troupe : 20-30-50 %. Autre option : remplacer Quinn par Marlin s'il n'est pas encore meilleur. N'utilisez Helga à partir de la Gen 2 que si Amadeus n'est pas à 5 étoiles avec l'équipement exclusif au niveau maximum ; c'est aussi l'occasion d'utiliser Amadeus pour rejoindre des ralliements.",
    "Formation de troupe : 30-30-40 %. Toujours aucun héros F2P avec un équipement exclusif de ralliement, donc encore une formation équilibrée avec un peu plus d'Archers, car les stats d'Archer seront les plus basses faute de héros Archer SSR.",
    "Formation de troupe : 10-20-70 %. Helga au maximum est plus performante qu'Amadeus en Gen 3, avec 2 équipements de Létalité et 1 d'Attaque, contre 1 de Létalité et 2 d'Attaque pour Amadeus dans cette configuration.",
    "Formation de troupe : 20-30-50 %. Si vous n'avez pas Helga au maximum (5 étoiles + équipement exclusif), il vaut mieux utiliser Amadeus.",
    "Formation de troupe : 20-40-40 %. En Gen 3, les F2P obtiennent leur premier héros avec un équipement exclusif de ralliement (Petra). Essayez des nombres équilibrés d'Archers et de Cavalerie, car Petra améliore beaucoup les Archers. Les stats d'Archer restent les plus basses sans Archer SSR. Si vous débloquez la Cavalerie T10, la compétence T10 s'accorde bien avec les stats de Petra.",
    "Formation de troupe : 10-10-80 %. Alignez autant d'Archers que possible, surtout s'ils sont T10. Avec un peu de chance, la 3e compétence de Rosa fera le travail pour vous (augmente l'Attaque totale des Archers de 30 %).",
    "Formation de troupe : 10-10-80 %. Utilisez Helga en alternative si elle a plus d'étoiles et un meilleur niveau d'équipement exclusif qu'Amadeus. Alignez toujours autant d'Archers que possible, surtout T10, pour la 3e compétence de Rosa (augmente l'Attaque totale des Archers de 30 %).",
    "Formation de troupe : 10-10-80 %. Comme pour les héros alternatifs — les bonus de la 3e compétence de Rosa sont meilleurs si vous misez sur des formations très orientées Archers (augmente l'Attaque totale des Archers de 30 %).",
    "Les autres emplacements de leader ne sont pas encore disponibles."
  ]
});

addBear("pt", {
  gen: "GEN",
  section: {
    title: "Caça ao Urso",
    when_label: "QUANDO",
    when: "A cada 2 dias, no horário marcado pela sua Aliança.",
    why_label: "POR QUE IMPORTA",
    why: "Principal fonte de materiais de Equipamento do Herói (Martelos de Forja) e XP de Aprimoramento.",
    prep_label: "PREPARAÇÃO",
    prep: [
      "Atualize suas Formações das Tropas antes de cada Caça ao Urso.",
      { callout: true, text: "Opcional: use <a href=\"https://frakinator.streamlit.app/\" target=\"_blank\" rel=\"noopener\">frakinator.streamlit.app</a> para testar proporções de tropas e encontrar sua formação mais forte." },
      "Revogue as tropas que estão coletando antes do início do evento.",
      "Lembre-se: nos últimos 5–7 minutos, todos devem iniciar um rally. Isso cria mais vagas para jogadores cujas tropas estão retornando, permitindo um último impulso de dano."
    ],
    leaders_label: "LÍDERES DE RALLY",
    joiners_label: "PARTICIPANTES DE RALLY",
    joiners_ratio: "Proporção padrão / segura: 10% Infantaria, 10% Cavalaria e 80% Arquearia (ou uma variação como 20-30-50)"
  },
  notes: [
    "Formação de tropas: 30-30-40%. Na maioria dos casos, você terá os melhores atributos na Infantaria por causa dos atributos base do Amadeus, então uma formação super equilibrada com um pouco mais de Arquearia funciona melhor.",
    "Formação de tropas: 20-40-40%. Principalmente para quem ainda não investiu no Amadeus, e mantém a possibilidade de usar o Amadeus para entrar em rallies.",
    "Formação de tropas: 30-30-40%. Para F2P, recomenda-se usar sempre os 3 heróis que você tiver para liderar um rally.",
    "Formação de tropas: 20-30-50%. O Peixe Marlin aumenta muito o dano por causa do equipamento exclusivo de rally dele. A partir da Gen 2, a Infantaria será sempre o Amadeus ou a Helga — são os únicos heróis de Infantaria com equipamento exclusivo de rally (bônus de Letalidade). Você envia menos Infantaria, então o herói de Infantaria cobre o dano dos Arquearia por meio desse equipamento, e não igualando os atributos de Infantaria.",
    "Formação de tropas: 20-30-50%. Outra alternativa é trocar o Quinn pelo Peixe Marlin, se ele ainda não for melhor. Use a Helga na Gen 2+ apenas se o Amadeus não estiver com 5 estrelas + equipamento exclusivo no nível máximo; também é uma chance de usar o Amadeus para entrar em rallies.",
    "Formação de tropas: 30-30-40%. Ainda não há herói F2P com equipamento exclusivo de rally, então novamente uma formação equilibrada com um pouco mais de Arquearia, já que os atributos dos Arquearia serão os mais baixos sem um herói de Arquearia SSR.",
    "Formação de tropas: 10-20-70%. A Helga no máximo rende mais que o Amadeus na Gen 3, por ter 2 equipamentos de Letalidade e 1 de Ataque, contra 1 de Letalidade e 2 de Ataque do Amadeus nesta configuração.",
    "Formação de tropas: 20-30-50%. Se você não tem a Helga no máximo (5 estrelas + equipamento exclusivo), é melhor usar o Amadeus.",
    "Formação de tropas: 20-40-40%. Na Gen 3, os F2P recebem o primeiro herói com equipamento exclusivo de rally (Petra). Tente números equilibrados de Arquearia e Cavalaria, porque a Petra melhora muito os Arquearia. Os atributos dos Arquearia continuam os mais baixos sem uma Arquearia SSR. Se você desbloquear a Cavalaria T10, a habilidade T10 combina bem com os atributos da Petra.",
    "Formação de tropas: 10-10-80%. Force o máximo de Arquearia possível, principalmente se forem T10. Com um pouco de sorte, a 3ª habilidade da Rosa fará o trabalho por você (aumenta o Ataque total dos Arquearia em 30%).",
    "Formação de tropas: 10-10-80%. Use a Helga como alternativa se ela tiver mais estrelas e um nível de equipamento exclusivo melhor que o do Amadeus. Continue forçando o máximo de Arquearia possível, principalmente T10, para a 3ª habilidade da Rosa (aumenta o Ataque total dos Arquearia em 30%).",
    "Formação de tropas: 10-10-80%. Igual aos melhores heróis alternativos — os bônus da 3ª habilidade da Rosa rendem mais se você focar em formações pesadas de Arquearia (aumenta o Ataque total dos Arquearia em 30%).",
    "Os demais espaços de líder ainda não foram divulgados."
  ]
});

addBear("tr", {
  gen: "GEN",
  section: {
    title: "Ayı Avı",
    when_label: "NE ZAMAN",
    when: "2 günde bir, İttifakınızın belirlediği saatte.",
    why_label: "NEDEN ÖNEMLİ",
    why: "Kahraman Donanımı malzemelerinin (Demirci Çekiçleri) ve Geliştirme TP'sinin ana kaynağı.",
    prep_label: "HAZIRLIK",
    prep: [
      "Her Ayı Avı'ndan önce birlik dizilişlerinizi güncelleyin.",
      { callout: true, text: "İsteğe bağlı: birlik oranlarını test edip en güçlü dizilişinizi bulmak için <a href=\"https://frakinator.streamlit.app/\" target=\"_blank\" rel=\"noopener\">frakinator.streamlit.app</a> adresini kullanın." },
      "Etkinlik başlamadan önce kaynak toplayan birlikleri geri çağırın.",
      "Unutmayın: son 5–7 dakikada herkes bir seferberlik başlatmalı. Bu, birlikleri geri dönen oyuncular için daha fazla yer açar ve son bir hasar atağına olanak tanır."
    ],
    leaders_label: "SEFERBERLİK LİDERLERİ",
    joiners_label: "SEFERBERLİĞE KATILANLAR",
    joiners_ratio: "Standart / Güvenli Oran: %10 Piyade, %10 Süvari ve %80 Okçu (veya 20-30-50 gibi bir varyasyon)"
  },
  notes: [
    "Birlik dizilişi: %30-30-40. Çoğu durumda Amadeus'un ham nitelikleri sayesinde en iyi niteliklere Piyade'de sahip olacaksınız; bu yüzden biraz daha fazla Okçu içeren, neredeyse eşit bir dizilim en iyi sonucu verir.",
    "Birlik dizilişi: %20-40-40. Amadeus'u henüz tercih etmemiş oyuncular için; ayrıca Amadeus'u seferberliklere katılmak için kullanma imkânı bırakır.",
    "Birlik dizilişi: %30-30-40. F2P için seferberlik başlatırken her zaman elinizdeki 3 kahramanı kullanmanız önerilir.",
    "Birlik dizilişi: %20-30-50. Marlin, seferberliğe özel donanımı sayesinde hasarı çok artırır. 2. Nesil'den itibaren Piyade her zaman Amadeus veya Helga olacaktır — seferberliğe özel donanımı (Öldürücülük bonusu) olan tek Piyade kahramanları onlardır. Daha az Piyade gönderirsiniz; bu yüzden Piyade kahramanı, Piyade niteliklerine denk gelmek yerine bu donanım sayesinde Okçu hasarını karşılar.",
    "Birlik dizilişi: %20-30-50. Diğer alternatif, Marlin henüz daha iyi değilse Quinn yerine onu koymaktır. Helga'yı 2. Nesil ve sonrasında yalnızca Amadeus 5 yıldızlı + özel donanım azami seviyede değilse kullanın; ayrıca Amadeus'u seferberliklere katılmak için kullanma fırsatıdır.",
    "Birlik dizilişi: %30-30-40. Seferberliğe özel donanımı olan bir F2P kahraman hâlâ yok; bu yüzden yine biraz daha fazla Okçu içeren dengeli bir dizilim kullanın, çünkü SSR Okçu kahramanı olmadığı için Okçu nitelikleri en düşük olacaktır.",
    "Birlik dizilişi: %10-20-70. Azami seviyedeki Helga, bu dizilimde 2 Öldürücülük ve 1 Saldırı donanımına sahipken Amadeus'un 1 Öldürücülük ve 2 Saldırı donanımı olması nedeniyle 3. Nesil'de Amadeus'tan daha iyi performans gösterir.",
    "Birlik dizilişi: %20-30-50. Azami seviyede Helga'nız (5 yıldız + özel donanım) yoksa Amadeus kullanmak daha iyidir.",
    "Birlik dizilişi: %20-40-40. 3. Nesil'de F2P oyuncular seferberliğe özel donanımı olan ilk kahramanlarını (Petra) alır. Okçu ve Süvari sayılarını dengeli tutmayı deneyin; çünkü Petra Okçuları çok güçlendirir. SSR Okçu olmadan Okçu nitelikleri hâlâ en düşüktür. T10 Süvari açarsanız, T10 becerisi Petra'nın nitelikleriyle iyi uyum sağlar.",
    "Birlik dizilişi: %10-10-80. Özellikle T10 iseler, olabildiğince fazla Okçu koyun. Biraz şansla Rosa'nın 3. becerisi işi sizin yerinize halleder (Okçuların toplam Saldırısını %30 artırır).",
    "Birlik dizilişi: %10-10-80. Helga'nın yıldızı ve özel donanım seviyesi Amadeus'tan iyiyse alternatif olarak kullanın. Rosa'nın 3. becerisi için yine olabildiğince fazla Okçu, özellikle T10 koyun (Okçuların toplam Saldırısını %30 artırır).",
    "Birlik dizilişi: %10-10-80. Alternatif en iyi kahramanlarla aynı — Rosa'nın 3. becerisi, ağırlıklı Okçu dizilişlerine odaklanırsanız en iyi bonusu verir (Okçuların toplam Saldırısını %30 artırır).",
    "Kalan lider slotları henüz açıklanmadı."
  ]
});


/* ===== Bear Hunt: extra languages (id, ru, th, ar) ===== */
/* 英雄名字（對照表；Petra、Rosa 對照表沒有，維持英文） */
Object.assign(HEROES.Amadeus, { ru: "Амадей", th: "อมาดีอุส", ar: "أماديوس" });
Object.assign(HEROES.Jabel, { ru: "Явель", th: "จาเบล", ar: "جبل" });
Object.assign(HEROES.Quinn, { ru: "Куинн", th: "ควินน์", ar: "كوين" });
Object.assign(HEROES.Helga, { ru: "Хельга", th: "เฮลก้า", ar: "هيلجا" });
Object.assign(HEROES.Howard, { ru: "Говард", th: "ฮาวเวิร์ด", ar: "هاورد" });
Object.assign(HEROES.Hilde, { ru: "Хильда", th: "ฮิลเดอร์", ar: "هيلدي" });
Object.assign(HEROES.Marlin, { ru: "Марлин", th: "มาร์ลิน", ar: "مارلين" });
Object.assign(HEROES.Zoe, { ru: "Зои", th: "โซอี้", ar: "زوي" });
Object.assign(HEROES.Chenko, { ru: "Ченко", th: "เชนโกะ", ar: "تشينكو" });
Object.assign(HEROES.Yeonwoo, { ru: "Ёну", th: "ยอนอู", ar: "يونوو" });
Object.assign(HEROES.Amane, { ru: "Амане", th: "อามาเนะ", ar: "أماني" });
/* 主將標籤：泰文、阿拉伯文改成對照表用詞 */
UI.roles.lethality.th = "ตัวนำสายความแรงพลัง";
UI.roles.attack.th = "ตัวนำสายพลังโจมตี";
UI.roles.lethality.ar = "قائد قوة الفتك";

addBear("id", {
  gen: "GEN",
  section: {
    title: "Bear Hunt",
    when_label: "KAPAN",
    when: "Setiap 2 hari pada waktu yang dijadwalkan Aliansimu.",
    why_label: "MENGAPA PENTING",
    why: "Sumber utama material Gear Hero (Forgehammer) dan Enhancement XP.",
    prep_label: "PERSIAPAN",
    prep: [
      "Perbarui Formasi Pasukanmu sebelum setiap Bear Hunt.",
      { callout: true, text: "Opsional: gunakan <a href=\"https://frakinator.streamlit.app/\" target=\"_blank\" rel=\"noopener\">frakinator.streamlit.app</a> untuk menguji rasio pasukan dan menemukan formasi terkuatmu." },
      "Panggil Kembali pasukan yang sedang mengumpulkan sebelum event dimulai.",
      "Ingat: di 5–7 menit terakhir, semua orang sebaiknya memulai reli. Ini membuka lebih banyak slot bagi pemain yang pasukannya sedang kembali, sehingga bisa melakukan dorongan damage terakhir."
    ],
    leaders_label: "PEMIMPIN RELI",
    joiners_label: "PESERTA RELI",
    joiners_ratio: "Rasio Standar / Aman: 10% Infanteri, 10% Kavaleri, dan 80% Pemanah (atau variasi seperti 20-30-50)"
  },
  notes: [
    "Formasi pasukan: 30-30-40%. Pada kebanyakan kasus, Infanteri akan punya stat terbaik berkat stat dasar Amadeus, jadi formasi yang hampir seimbang dengan Pemanah sedikit lebih banyak bekerja paling baik.",
    "Formasi pasukan: 20-40-40%. Terutama untuk yang belum memilih Amadeus, dan tetap membuka peluang memakai Amadeus untuk bergabung ke reli.",
    "Formasi pasukan: 30-30-40%. Untuk F2P, disarankan selalu memakai 3 hero yang dimiliki untuk memimpin reli.",
    "Formasi pasukan: 20-30-50%. Marlin akan menambah damage besar berkat perlengkapan khusus reli miliknya. Mulai Gen 2, Infanteri akan selalu Amadeus atau Helga — mereka satu-satunya hero Infanteri dengan perlengkapan khusus reli (bonus Lethality). Kamu mengirim lebih sedikit Infanteri, jadi hero Infanteri menutup damage Pemanah lewat perlengkapan itu, bukan dengan menyamai stat Infanteri.",
    "Formasi pasukan: 20-30-50%. Alternatif lain adalah mengganti Quinn dengan Marlin jika ia belum lebih baik. Pakai Helga di Gen 2+ hanya jika Amadeus belum bintang 5 + perlengkapan khusus level maks; ini juga kesempatan memakai Amadeus untuk bergabung ke reli.",
    "Formasi pasukan: 30-30-40%. Masih belum ada hero F2P dengan perlengkapan khusus reli, jadi sekali lagi formasi seimbang dengan Pemanah sedikit lebih banyak, karena stat Pemanah akan paling rendah tanpa hero Pemanah SSR.",
    "Formasi pasukan: 10-20-70%. Helga yang sudah maksimal lebih baik daripada Amadeus di Gen 3, karena punya 2 perlengkapan Lethality dan 1 perlengkapan Attack, dibandingkan 1 Lethality dan 2 Attack milik Amadeus pada susunan ini.",
    "Formasi pasukan: 20-30-50%. Jika kamu belum punya Helga maksimal (bintang 5 + perlengkapan khusus), lebih baik pakai Amadeus.",
    "Formasi pasukan: 20-40-40%. Di Gen 3, F2P mendapat hero pertama dengan perlengkapan khusus reli (Petra). Coba jumlah Pemanah dan Kavaleri yang seimbang karena Petra sangat meningkatkan Pemanah. Stat Pemanah tetap paling rendah tanpa Pemanah SSR. Jika kamu membuka Kavaleri T10, skill T10 cocok dengan stat Petra.",
    "Formasi pasukan: 10-10-80%. Paksakan sebanyak mungkin Pemanah, terutama jika T10. Dengan sedikit keberuntungan, skill ke-3 Rosa akan bekerja untukmu (meningkatkan total Attack Pemanah sebesar 30%).",
    "Formasi pasukan: 10-10-80%. Pakai Helga sebagai alternatif jika bintang dan level perlengkapan khususnya lebih baik dari Amadeus. Tetap paksakan sebanyak mungkin Pemanah, terutama T10, untuk skill ke-3 Rosa (meningkatkan total Attack Pemanah sebesar 30%).",
    "Formasi pasukan: 10-10-80%. Sama seperti hero alternatif terbaik — bonus skill ke-3 Rosa paling maksimal jika kamu fokus pada formasi yang berat di Pemanah (meningkatkan total Attack Pemanah sebesar 30%).",
    "Slot pemimpin lainnya belum dirilis."
  ]
});

addBear("ru", {
  gen: "ПОКОЛЕНИЕ",
  section: {
    title: "Охота на медведя",
    when_label: "КОГДА",
    when: "Каждые 2 дня в назначенное вашим альянсом время.",
    why_label: "ПОЧЕМУ ЭТО ВАЖНО",
    why: "Основной источник материалов для снаряжения героя (Кузнечные молоты) и опыта усиления.",
    prep_label: "ПОДГОТОВКА",
    prep: [
      "Обновляйте свои составы войск перед каждой Охотой на медведя.",
      { callout: true, text: "Необязательно: используйте <a href=\"https://frakinator.streamlit.app/\" target=\"_blank\" rel=\"noopener\">frakinator.streamlit.app</a>, чтобы проверить соотношения войск и найти свой сильнейший состав." },
      "Отзовите войска, находящиеся на сборе, до начала события.",
      "Помните: в последние 5–7 минут каждый должен запустить рейд. Это освобождает больше мест для игроков, чьи войска возвращаются, и позволяет сделать финальный рывок по урону."
    ],
    leaders_label: "ЛИДЕРЫ РЕЙДА",
    joiners_label: "УЧАСТНИКИ РЕЙДА",
    joiners_ratio: "Стандартное / безопасное соотношение: 10% пехотинцев, 10% кавалеристов и 80% стрелков (или вариант вроде 20-30-50)"
  },
  notes: [
    "Состав войск: 30-30-40%. В большинстве случаев лучшие показатели будут у пехотинцев благодаря базовым показателям героя Амадей, поэтому лучше всего работает почти равный состав с чуть большим числом стрелков.",
    "Состав войск: 20-40-40%. В основном для тех, кто ещё не выбрал героя Амадей; также сохраняет возможность использовать героя Амадей для присоединения к рейдам.",
    "Состав войск: 30-30-40%. Для F2P рекомендуется всегда использовать 3 имеющихся героя для проведения рейда.",
    "Состав войск: 20-30-50%. Герой Марлин сильно повышает урон благодаря своему эксклюзивному для рейдов снаряжению. Начиная со 2-го поколения пехотинцами всегда командует герой Амадей или Хельга — только у них среди героев-пехотинцев есть эксклюзивное для рейдов снаряжение (бонус Смертоносности). Вы отправляете меньше пехотинцев, поэтому герой-пехотинец компенсирует урон стрелков за счёт этого снаряжения, а не за счёт равных показателей пехотинцев.",
    "Состав войск: 20-30-50%. Другой вариант — поменять Куинн на Марлин, если он пока не лучше. Используйте героя Хельга со 2-го поколения и выше, только если у героя Амадей нет 5 звёзд и максимального уровня эксклюзивного снаряжения; это также возможность использовать героя Амадей для присоединения к рейдам.",
    "Состав войск: 30-30-40%. У героев F2P по-прежнему нет эксклюзивного для рейдов снаряжения, поэтому снова подходит равномерный состав с чуть большим числом стрелков, так как показатели стрелков будут самыми низкими из-за отсутствия SSR-героя-стрелка.",
    "Состав войск: 10-20-70%. Герой Хельга с максимальной прокачкой в 3-м поколении показывает себя лучше, чем герой Амадей, так как в этой связке у неё 2 снаряжения Смертоносности и 1 снаряжение Атаки против 1 снаряжения Смертоносности и 2 снаряжений Атаки у героя Амадей.",
    "Состав войск: 20-30-50%. Если у вас нет героя Хельга с максимальной прокачкой (5 звёзд + эксклюзивное снаряжение), лучше использовать героя Амадей.",
    "Состав войск: 20-40-40%. В 3-м поколении F2P получают первого героя с эксклюзивным для рейдов снаряжением (Petra). Старайтесь держать баланс между числом стрелков и кавалеристов, так как Petra сильно усиливает стрелков. Показатели стрелков всё равно самые низкие без SSR-стрелка. Если вы откроете кавалеристов T10, навык T10 хорошо сочетается с показателями Petra.",
    "Состав войск: 10-10-80%. Отправляйте как можно больше стрелков, особенно если они T10. При некоторой удаче 3-й навык героя Rosa сделает всё за вас (увеличивает общую Атаку стрелков на 30%).",
    "Состав войск: 10-10-80%. Используйте героя Хельга как альтернативу, если у неё больше звёзд и выше уровень эксклюзивного снаряжения, чем у героя Амадей. По-прежнему отправляйте как можно больше стрелков, особенно T10, ради 3-го навыка героя Rosa (увеличивает общую Атаку стрелков на 30%).",
    "Состав войск: 10-10-80%. То же, что и у альтернативных лучших героев: бонусы 3-го навыка героя Rosa максимальны, если делать упор на составы с большим числом стрелков (увеличивает общую Атаку стрелков на 30%).",
    "Остальные места лидеров пока не опубликованы."
  ]
});

addBear("th", {
  gen: "เจน",
  section: {
    title: "ล่าหมี",
    when_label: "เมื่อไหร่",
    when: "ทุก 2 วัน ตามเวลาที่พันธมิตรของคุณกำหนด",
    why_label: "ทำไมถึงสำคัญ",
    why: "แหล่งวัสดุอุปกรณ์ฮีโร่หลัก (ค้อนตีเหล็ก) และ XP การพัฒนา",
    prep_label: "การเตรียมตัว",
    prep: [
      "อัปเดตรูปแบบการจัดวางทหารของคุณก่อนล่าหมีทุกครั้ง",
      { callout: true, text: "ตัวเลือกเสริม: ใช้ <a href=\"https://frakinator.streamlit.app/\" target=\"_blank\" rel=\"noopener\">frakinator.streamlit.app</a> เพื่อทดสอบอัตราส่วนทหารและหารูปแบบที่แข็งแกร่งที่สุดของคุณ" },
      "เรียกกลับทหารที่กำลังเก็บทรัพยากรก่อนอีเวนต์เริ่ม",
      "โปรดจำไว้: ใน 5–7 นาทีสุดท้าย ทุกคนควรเปิดทีมระดมพล ซึ่งจะเพิ่มที่ว่างให้ผู้เล่นที่ทหารกำลังเดินทางกลับ ทำให้ปิดท้ายด้วยความเสียหายอีกระลอกได้"
    ],
    leaders_label: "ผู้นำทีมระดมพล",
    joiners_label: "ผู้เข้าร่วมทีมระดมพล",
    joiners_ratio: "อัตราส่วนมาตรฐาน / ปลอดภัย: ทหารราบ 10%, ทหารม้า 10% และพลธนู 80% (หรือรูปแบบอื่นเช่น 20-30-50)"
  },
  notes: [
    "รูปแบบทหาร: 30-30-40% ในกรณีส่วนใหญ่ ทหารราบจะมีค่าสถานะดีที่สุดเพราะค่าสถานะพื้นฐานของอมาดีอุส ดังนั้นรูปแบบที่เกือบเท่ากันโดยมีพลธนูมากกว่าเล็กน้อยให้ผลดีที่สุด",
    "รูปแบบทหาร: 20-40-40% เหมาะสำหรับคนที่ยังไม่ได้เลือกอมาดีอุส และยังเปิดโอกาสให้ใช้อมาดีอุสเข้าร่วมทีมระดมพลได้",
    "รูปแบบทหาร: 30-30-40% สำหรับ F2P แนะนำให้ใช้ฮีโร่ทั้ง 3 ตัวที่มีอยู่เสมอเมื่อเปิดทีมระดมพล",
    "รูปแบบทหาร: 20-30-50% มาร์ลินช่วยเพิ่มความเสียหายได้มากเพราะอุปกรณ์เฉพาะทีมระดมพลของเขา ตั้งแต่เจน 2 ขึ้นไป ทหารราบจะเป็นอมาดีอุสหรือเฮลก้าเสมอ — สองคนนี้เป็นฮีโร่ทหารราบเพียงกลุ่มเดียวที่มีอุปกรณ์เฉพาะทีมระดมพล (โบนัสความแรงพลัง) คุณส่งทหารราบน้อยลง ฮีโร่ทหารราบจึงชดเชยความเสียหายของพลธนูด้วยอุปกรณ์นี้ แทนที่จะเทียบค่าสถานะทหารราบ",
    "รูปแบบทหาร: 20-30-50% อีกทางเลือกคือสลับควินน์เป็นมาร์ลิน หากเขายังไม่ดีกว่า ใช้เฮลก้าในเจน 2 ขึ้นไปเฉพาะเมื่ออมาดีอุสยังไม่ได้ 5 ดาว + อุปกรณ์เฉพาะระดับสูงสุด และยังเป็นโอกาสใช้อมาดีอุสเข้าร่วมทีมระดมพลด้วย",
    "รูปแบบทหาร: 30-30-40% ยังไม่มีฮีโร่ F2P ที่มีอุปกรณ์เฉพาะทีมระดมพล จึงใช้รูปแบบที่สมดุลโดยมีพลธนูมากกว่าเล็กน้อยอีกครั้ง เพราะค่าสถานะพลธนูจะต่ำที่สุดเนื่องจากไม่มีฮีโร่พลธนู SSR",
    "รูปแบบทหาร: 10-20-70% เฮลก้าที่พัฒนาเต็มที่ทำได้ดีกว่าอมาดีอุสในเจน 3 เพราะมีอุปกรณ์ความแรงพลัง 2 ชิ้นและอุปกรณ์พลังโจมตี 1 ชิ้น เทียบกับความแรงพลัง 1 ชิ้นและพลังโจมตี 2 ชิ้นของอมาดีอุสในชุดนี้",
    "รูปแบบทหาร: 20-30-50% หากคุณไม่มีเฮลก้าที่พัฒนาเต็มที่ (5 ดาว + อุปกรณ์เฉพาะ) ควรใช้อมาดีอุสจะดีกว่า",
    "รูปแบบทหาร: 20-40-40% ในเจน 3 ผู้เล่น F2P จะได้ฮีโร่ตัวแรกที่มีอุปกรณ์เฉพาะทีมระดมพล (Petra) ลองใช้จำนวนพลธนูและทหารม้าให้สมดุล เพราะ Petra เสริมพลธนูได้มาก ค่าสถานะพลธนูยังต่ำที่สุดหากไม่มีพลธนู SSR หากคุณปลดล็อกทหารม้า T10 ทักษะ T10 เข้ากับค่าสถานะของ Petra ได้ดี",
    "รูปแบบทหาร: 10-10-80% ใส่พลธนูให้มากที่สุดเท่าที่ทำได้ โดยเฉพาะถ้าเป็น T10 หากโชคดี ทักษะที่ 3 ของ Rosa จะช่วยได้เอง (เพิ่มพลังโจมตีรวมของพลธนู 30%)",
    "รูปแบบทหาร: 10-10-80% ใช้เฮลก้าเป็นทางเลือกหากเธอมีดาวและระดับอุปกรณ์เฉพาะดีกว่าอมาดีอุส ยังคงใส่พลธนูให้มากที่สุดเท่าที่ทำได้ โดยเฉพาะ T10 เพื่อทักษะที่ 3 ของ Rosa (เพิ่มพลังโจมตีรวมของพลธนู 30%)",
    "รูปแบบทหาร: 10-10-80% เหมือนกับฮีโร่ทางเลือกที่ดีที่สุด — โบนัสทักษะที่ 3 ของ Rosa ได้ผลดีที่สุดหากคุณเน้นรูปแบบที่มีพลธนูจำนวนมาก (เพิ่มพลังโจมตีรวมของพลธนู 30%)",
    "ช่องผู้นำที่เหลือยังไม่เปิดเผย"
  ]
});

addBear("ar", {
  gen: "الجيل",
  section: {
    title: "صيد الدببة",
    when_label: "متى",
    when: "كل يومين في الوقت الذي يحدده تحالفك.",
    why_label: "لماذا هو مهم",
    why: "مصدر رئيسي لمواد عتاد البطل (مطرقة الحدادة) وخبرة تحسين.",
    prep_label: "التحضير",
    prep: [
      "حدّث تشكيلات القوات قبل كل صيد للدببة.",
      { callout: true, text: "اختياري: استخدم <a href=\"https://frakinator.streamlit.app/\" target=\"_blank\" rel=\"noopener\">frakinator.streamlit.app</a> لاختبار نسب القوات وإيجاد أقوى تشكيلة لديك." },
      "قم باستدعاء القوات التي تقوم بالجمع قبل بدء الفعالية.",
      "تذكّر: في آخر 5–7 دقائق، على الجميع إطلاق حشد. يوفّر هذا أماكن أكثر للاعبين الذين تعود قواتهم، مما يتيح دفعة ضرر أخيرة."
    ],
    leaders_label: "قادة الحشد",
    joiners_label: "المنضمون إلى الحشد",
    joiners_ratio: "النسبة القياسية / الآمنة: 10% مشاة، 10% فرسان، و80% رماة (أو تنويع مثل 20-30-50)"
  },
  notes: [
    "تشكيلة القوات: 30-30-40%. في معظم الحالات ستكون أفضل سمات لديك في المشاة بسبب سمات أماديوس الأساسية، لذا تعمل التشكيلة المتقاربة جدًا مع زيادة طفيفة في الرماة بأفضل شكل.",
    "تشكيلة القوات: 20-40-40%. مخصصة أساسًا لمن لم يستثمروا في أماديوس بعد، وتُبقي إمكانية استخدام أماديوس للانضمام إلى الحشود.",
    "تشكيلة القوات: 30-30-40%. للاعبين F2P يُنصح دائمًا باستخدام الأبطال الثلاثة المتاحين لديك لإطلاق الحشد.",
    "تشكيلة القوات: 20-30-50%. سيزيد مارلين الضرر كثيرًا بفضل عتاده الخاص بالحشد. ابتداءً من الجيل 2، سيكون قائد المشاة دائمًا أماديوس أو هيلجا — فهما البطلان الوحيدان من المشاة اللذان يملكان عتادًا خاصًا بالحشد (مكافأة قوة فتك). ترسل عددًا أقل من المشاة، لذا يغطي بطل المشاة ضرر الرماة عبر هذا العتاد بدلًا من مجاراة سمات المشاة.",
    "تشكيلة القوات: 20-30-50%. بديل آخر هو استبدال كوين بمارلين إذا لم يكن أفضل بعد. استخدم هيلجا في الجيل 2 وما بعده فقط إذا لم يكن أماديوس بـ 5 نجوم مع عتاد خاص بأعلى مستوى؛ وهي أيضًا فرصة لاستخدام أماديوس للانضمام إلى الحشود.",
    "تشكيلة القوات: 30-30-40%. لا يزال لا يوجد بطل F2P بعتاد خاص بالحشد، لذا مرة أخرى تشكيلة متوازنة مع زيادة طفيفة في الرماة، لأن سمات الرماة ستكون الأدنى لعدم وجود بطل رماة SSR.",
    "تشكيلة القوات: 10-20-70%. تتفوق هيلجا المكتملة التطوير على أماديوس في الجيل 3، لأن لديها قطعتي عتاد قوة فتك وقطعة عتاد هجوم واحدة، مقابل قطعة قوة فتك واحدة وقطعتي هجوم لدى أماديوس في هذه التشكيلة.",
    "تشكيلة القوات: 20-30-50%. إذا لم تكن لديك هيلجا مكتملة التطوير (5 نجوم + عتاد خاص)، فمن الأفضل استخدام أماديوس.",
    "تشكيلة القوات: 20-40-40%. في الجيل 3، يحصل لاعبو F2P على أول بطل بعتاد خاص بالحشد (Petra). جرّب أعدادًا متوازنة من الرماة والفرسان لأن Petra تحسّن الرماة كثيرًا. تبقى سمات الرماة الأدنى بدون رماة SSR. إذا فتحت فرسان T10، فإن مهارة T10 تتناسب جيدًا مع سمات Petra.",
    "تشكيلة القوات: 10-10-80%. ادفع بأكبر عدد ممكن من الرماة، خاصة إذا كانوا T10. مع قليل من الحظ ستقوم المهارة الثالثة لـ Rosa بالمهمة عنك (تزيد إجمالي هجوم الرماة بنسبة 30%).",
    "تشكيلة القوات: 10-10-80%. استخدم هيلجا كبديل إذا كانت نجومها ومستوى عتادها الخاص أفضل من أماديوس. واصل الدفع بأكبر عدد ممكن من الرماة، خاصة T10، من أجل المهارة الثالثة لـ Rosa (تزيد إجمالي هجوم الرماة بنسبة 30%).",
    "تشكيلة القوات: 10-10-80%. مثل الأبطال البدلاء الأفضل — تحقق المهارة الثالثة لـ Rosa أفضل مكافأة إذا ركّزت على تشكيلات ثقيلة بالرماة (تزيد إجمالي هجوم الرماة بنسبة 30%).",
    "خانات القادة المتبقية لم تُعلن بعد."
  ]
});
