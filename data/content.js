/* =========================================================================
   Kingshot 攻略內容 / Guide content
   -------------------------------------------------------------------------
   新增語言：
     1. 在 LANGS 加 { code, label, htmlLang }
     2. 在 UI 物件補該語言字串
     3. 每個 guide 的 name / sections / leaders notes 補翻譯
        （還沒翻的語言就先不要加 key，網站會顯示「尚未加入」）

   遊戲用語：一律放在 （照對照表），內文用 {id} 引用。
   ========================================================================= */

const LANGS = [
  { code: "en", label: "English", htmlLang: "en" },
  { code: "zh", label: "中文", htmlLang: "zh-Hant" },
  { code: "ko", label: "한국어", htmlLang: "ko" },
  { code: "de", label: "Deutsch", htmlLang: "de" },
  { code: "fr", label: "Français", htmlLang: "fr" },
  { code: "pt", label: "Português", htmlLang: "pt-BR" },
  { code: "es", label: "Español", htmlLang: "es" },
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
  },
moreInfo: {
    zh: "想看更多內容？", en: "Want to learn more?", ko: "더 알아보고 싶으세요?", de: "Mehr erfahren?"
  }
};
Object.assign(UI.moreInfo, { fr: "Envie d'en savoir plus ?" });
Object.assign(UI.moreInfo, { pt: "Quer saber mais?" });
Object.assign(UI.moreInfo, { tr: "Daha fazla bilgi mi istiyorsun?" });
Object.assign(UI.moreInfo, { id: "Ingin tahu lebih lanjut?" });
Object.assign(UI.moreInfo, { ru: "Хотите узнать больше?" });
Object.assign(UI.moreInfo, { th: "อยากรู้เพิ่มเติมไหม?" });
Object.assign(UI.moreInfo, { ar: "هل تريد معرفة المزيد؟" });


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
Object.assign(UI.siteTitle, { es: "NXS Guidelines" });
Object.assign(UI.footerNote, { es: "Traducido por voluntarios de la alianza. Sigue creciendo." });
Object.assign(UI.missingLang, { es: "versión aún no añadida — vuelve pronto." });
Object.assign(UI.tags.best, { es: "MEJOR" });
Object.assign(UI.tags.alt, { es: "ALT." });
Object.assign(UI.tags.f2p, { es: "F2P" });
Object.assign(UI.roles.lethality, { es: "Líder de Letalidad" });
Object.assign(UI.roles.attack, { es: "Líder de Ataque" });
Object.assign(UI.moreInfo, { es: "¿Quieres saber más?" });

/* 英雄顯示名：編組只存英文 id，畫面依語言換成譯名
   （已依對照表修正：Jabel 中/韓、Yeonwoo 中、Marlin 韓）
   Petra、Rosa 不在對照表，尚未驗證，一律顯示英文，待截圖確認後再補上其他語言 */
const HEROES = {
  Amadeus: { zh: "阿瑪迪斯", en: "Amadeus", ko: "아마데우스", de: "Amadeus", fr: "Amadeus", pt: "Amadeus", tr: "Amadeus", id: "Amadeus", ru: "Амадей", th: "อมาดีอุส", ar: "أماديوس", es: "Amadeus" },
  Jabel: { zh: "潔貝爾", en: "Jabel", ko: "제이벨", de: "Jabel", fr: "Jabel", pt: "Jabel", tr: "Jabel", id: "Jabel", ru: "Явель", th: "จาเบล", ar: "جبل", es: "Jabel" },
  Quinn: { zh: "奎恩", en: "Quinn", ko: "퀸", de: "Quinn", fr: "Quinn", pt: "Quinn", tr: "Quinn", id: "Quinn", ru: "Куинн", th: "ควินน์", ar: "كوين", es: "Quinn" },
  Helga: { zh: "赫爾加", en: "Helga", ko: "헬가", de: "Helga", fr: "Helga", pt: "Helga", tr: "Helga", id: "Helga", ru: "Хельга", th: "เฮลก้า", ar: "هيلجا", es: "Helga" },
  Howard: { zh: "霍華德", en: "Howard", ko: "하워드", de: "Howard", fr: "Howard", pt: "Howard", tr: "Howard", id: "Howard", ru: "Говард", th: "ฮาวเวิร์ด", ar: "هاورد", es: "Howard" },
  Hilde: { zh: "希爾德", en: "Hilde", ko: "힐데", de: "Hilde", fr: "Hilde", pt: "Hilde", tr: "Hilde", id: "Hilde", ru: "Хильда", th: "ฮิลเดอร์", ar: "هيلدي", es: "Hilde" },
  Marlin: { zh: "馬林", en: "Marlin", ko: "마린", de: "Marlin", fr: "Marlin", pt: "Peixe Marlin", tr: "Marlin", id: "Marlin", ru: "Марлин", th: "มาร์ลิน", ar: "مارلين", es: "Marlin" },
  Zoe: { zh: "佐伊", en: "Zoe", ko: "조이", de: "Zoe", fr: "Zoé", pt: "Zoe", tr: "Zoe", id: "Zoe", ru: "Зои", th: "โซอี้", ar: "زوي", es: "Zoe" },
  Petra: { en: "Petra"},
  Rosa: { en: "Rosa"},
  Chenko: { zh: "琴科", en: "Chenko", ko: "첸코", de: "Chenko", fr: "Chenko", pt: "Chenko", tr: "Chenko", id: "Chenko", ru: "Ченко", th: "เชนโกะ", ar: "تشينكو", es: "Chenko" },
  Yeonwoo: { zh: "妍羽", en: "Yeonwoo", ko: "연우", de: "Yeonwoo", fr: "Yeonwoo", pt: "Yeonwoo", tr: "Yeonwoo", id: "Yeonwoo", ru: "Ёну", th: "ยอนอู", ar: "يونوو", es: "Yeonwoo" },
  Amane: { zh: "雨音", en: "Amane", ko: "아마네", de: "Amane", fr: "Amane", pt: "Amane", tr: "Amane", id: "Amane", ru: "Амане", th: "อามาเนะ", ar: "أماني", es: "Amane" }
};

/* 遊戲用語：一律照對照表。內文用 {id} 引用 */
const GLOSSARY = {
  /* 城鎮增益畫面確認的用語（反偵察、部隊＝Squad 等） */
  counterRecon: { zh:"反偵察", en:"Counter-recon", de:"Gegenaufklärung", ko:"정찰 방지", fr:"Anti-repérage", ar:"الاستطلاع المضاد", id:"Kontra-pengintaian", th:"หน่วยป้องกันพิเศษ", ru:"Контрразведка", tr:"Gözetleme Önleyen", pt:"Antirreconhecimento", es:"Antirreconocimiento" },
  squad: { zh:"部隊", en:"Squad", de:"Schwadron", ko:"부대", fr:"Escouade", ar:"الفرقة", id:"Skuad", th:"ทีม", ru:"Войска", tr:"Ekip", pt:"Esquadrão", es:"Escuadrón" },
  shield: { zh:"防護罩", en:"Shield", de:"Schild", ko:"보호막", fr:"Bouclier", ar:"درع", id:"Perisai", th:"โล่", ru:"Щит", tr:"Kalkan", pt:"Escudo", es:"Escudo" },
  lethality: { zh:"殺傷力", en:"Lethality", de:"Tödlichkeit", ko:"파괴력", fr:"Létalité", ar:"قوة فتك", id:"Lethality", th:"ความแรงพลัง", ru:"Смертоносность", tr:"Öldürücülük", pt:"Letalidade", es:"Letalidad" },
  health: { zh:"生命值", en:"Health", de:"Gesundheit", ko:"HP", fr:"Santé", ar:"صحة", id:"Health", th:"พลังชีวิต", ru:"Здоровье", tr:"Sağlık", pt:"Vida", es:"Salud" },
  /* 遊戲截圖確認的用語（背包、熊獵畫面） */
  rally: { zh:"集結", en:"Rally", de:"Rally", ko:"집결", fr:"Ralliement", ar:"الحشد", id:"Reli", th:"ทีมระดมพล", ru:"Рейд", tr:"Seferberlik", pt:"Rally", es:"Ataque Conjunto" },
  teleporterAdv: { zh:"高級遷城", en:"Advanced Teleporter", de:"Fortgeschrittene Umsiedlung", ko:"고급 도시 이전", fr:"Relocalisation Avancée", ar:"ناقل متقدم", id:"Teleporter Lanjutan", th:"การย้ายถิ่นฐานขั้นสูง", ru:"Продвинутый телепорт", tr:"Gelişmiş Işınlayıcı", pt:"Teletransportador Avançado", es:"Reubicación avanzada" },
  marching: { zh:"行軍", en:"Marching", de:"Marschieren", ko:"행군", fr:"Marche", ar:"زحف", id:"Barisan", th:"เดินทัพ", ru:"Марш", tr:"İntikal", es:"En marcha" },
  gathering: { zh:"採集", en:"Gathering", de:"Sammeln", ko:"채집", fr:"Collecte", pt:"Coletando", ar:"الجمع", id:"Mengumpulkan", th:"การเก็บทรัพยากร", ru:"Сбор", tr:"Toplanıyor", es:"Recolectando" },
  /* 俄文格變化形（僅俄文使用）：由對照表的原形依語法變格，句中需要時引用 */
  allianceRelicG: { ru:"очков реликвий альянса" },
  swordshrineG: { ru:"Святилища меча" },
  reformationG: { ru:"Зала искупления" },
  sanctumPl: { ru:"святилища" },
  abbeyPl: { ru:"Монастыри" },
  abbeyG: { ru:"монастырей" },
  swordlandP: { ru:"Стране мечей" },
  swordland: { zh:"聖劍戰場", en:"Swordland", de:"Schwertland", ko:"성검 전장", fr:"Terres du Glaive", ar:"أرض السيوف", id:"Swordland", th:"ดินแดนดาบ", ru:"Страна мечей", tr:"Kılıçdiyarı", pt:"Terra das Espadas", es:"Tierra de espadas" },
  swordshrine: { zh:"聖劍祭壇", en:"Swordshrine", de:"Schwertschrein", ko:"성검 제단", fr:"Tombeau du Glaive", ar:"ضريح السيوف", id:"Swordshrine", th:"วิหารดาบ", ru:"Святилище меча", tr:"Kılıç Altarı", pt:"Templo da Espada", es:"Ermita de la Espada" },
  mercenary: { zh:"傭兵駐地", en:"Mercenary Camp", de:"Söldnerlager", ko:"용병 주둔지", fr:"Camp de Mercenaires", ar:"معسكر المرتزقة", id:"Kamp Tentara Bayaran", th:"ค่ายทหารรับจ้าง", ru:"Лагерь наемников", tr:"Paralı Asker Kampı", pt:"Acampamento Mercenário", es:"Campamento de Mercenarios" },
  reformation: { zh:"教化大廳", en:"Hall of Reformation", de:"Reformationshalle", ko:"교화의 홀", fr:"Salle des Réformes", ar:"قاعة الإصلاح", id:"Aula Reformasi", th:"หอปฏิรูป", ru:"Зал искупления", tr:"Devrim Salonu", pt:"Salão da Reforma", es:"Salón de la Reforma" },
  sanctum: { zh:"聖所", en:"Sanctum", de:"Heiligtum", ko:"성소", fr:"Sanctuaire", ar:"مزار", id:"Sanctum", th:"วิหารศักดิ์สิทธิ์", ru:"Святилище", tr:"Tapınak", pt:"Santuário", es:"Santuario" },
  sanctumNW: { zh:"西北聖所", en:"Northwest Sanctum", de:"Nordwestliches Heiligtum", ko:"북서 성소", fr:"Sanctuaire Nord-Ouest", ar:"مزار الشمالي الغربي", id:"Sanctum Barat Laut", th:"วิหารศักดิ์สิทธิ์ตะวันตกเฉียงเหนือ", ru:"Северо-западное святилище", tr:"Kuzeybatı Tapınağı", pt:"Santuário do Noroeste", es:"Santuario del Noroeste" },
  sanctumSE: { zh:"東南聖所", en:"Southeast Sanctum", de:"Südwestliches Heiligtum" /* 遊戲德文版本身的錯誤，照截圖 */, ko:"남동 성소", fr:"Sanctuaire Sud-Est", ar:"مزار الجنوبي الشرقي", id:"Sanctum Tenggara", th:"วิหารศักดิ์สิทธิ์ตะวันออกเฉียงใต้", ru:"Юго-восточное святилище", tr:"Güneydoğu Tapınağı", pt:"Santuário do Sudeste", es:"Santuario del Sureste" },
  abbey: { zh:"修道院", en:"Abbey", de:"Abtei", ko:"수도원", fr:"Abbaye", ar:"دير", id:"Biara", th:"อาราม", ru:"Монастырь", tr:"Manastır", pt:"Abadia", es:"Abadía" },
  belltower: { zh:"鐘塔", en:"Belltower", de:"Glockenturm", ko:"시계탑", fr:"Clocher", ar:"برج الجرس", id:"Menara Lonceng", th:"หอระฆัง", ru:"Колокольня", tr:"Çan Kulesi", pt:"Torre do Sino", es:"Campanario" },
  stables: { zh:"馬廄", en:"Royal Stables", de:"Königliche Ställe", ko:"마구간", fr:"Écuries Royales", ar:"الاسطبلات الملكية", id:"Kandang Kuda Kerajaan", th:"คอกม้าหลวง", ru:"Королевский конный двор", tr:"Kraliyet Ahırları", pt:"Estábulos da Realeza", es:"Establos Reales" },
  undercellar: { zh:"隱蔽地窖", en:"Undercellar", de:"Untergewölbe", ko:"땅굴", fr:"Caves", ar:"الأقبية السفلية", id:"Undercellar", th:"ห้องใต้ดินลับ", ru:"подземелья", tr:"Gizli Mahzenler", pt:"Porões", es:"Bodegas subterráneas" },
  arsenal: { zh:"輜重", en:"Arsenal Supplies", de:"Frachtzugvorräte", ko:"군수 물자", fr:"Provisions de Train de bagages", ar:"إمدادات أمتعة القطار", id:"Suplai Kereta Bagasi", th:"เสบียงขบวนสัมภาระ", ru:"военные запасы", tr:"Bagaj Treni Malzemeleri", pt:"Suprimentos de Trem de Bagagem" },
  allianceRelic: { zh:"聯盟聖契積分", en:"Alliance Relic Points", de:"Allianz-Reliktpunkte", ko:"연맹 성스러운 계약 포인트", fr:"Points de Relique d'Alliance", ar:"نقاط الآثار للتحالف", id:"Poin Relik Aliansi", th:"คะแนนวัตถุโบราณพันธมิตร", ru:"Очки реликвий альянса", tr:"İttifak Yadigâr Puanı", pt:"Pontos de Relíquia da Aliança", es:"Puntos de Reliquia de Alianza" },
  personalRelic: { zh:"個人聖契積分", en:"Personal Relic Points", de:"Persönliche Reliktpunkte", ko:"개인 성스러운 계약 포인트", fr:"Points de Relique Individuels", ar:"نقاط الآثار الشخصية", id:"Poin Relik Pribadi", th:"คะแนนวัตถุโบราณส่วนบุคคล", ru:"Личные очки реликвий", tr:"Kişisel Yadigâr Puanı", pt:"Pontos de Relíquia Individuais", es:"Puntos de Reliquia personales" },
  bearHunt: { zh:"狩獵巨熊", en:"Bear Hunt", ko:"자이언트 베어 사냥", de:"Bärenjagd", fr:"Chasse à l'Ours", pt:"Caça ao Urso", tr:"Ayı Avı", id:"Bear Hunt", ru:"Охота на медведя", th:"ล่าหมี", ar:"صيد الدببة", es:"Cacería del Oso" },
  castleBattle: { zh:"決戰王城", en:"Castle Battle", ko:"캐슬 전투", de:"Schlacht um das Schloss", fr:"Bataille du Château", pt:"Batalha do Castelo", tr:"Şato Savaşı", id:"Pertempuran Istana", ru:"Битва за замок", th:"การต่อสู้ชิงปราสาท", ar:"معركة القلعة", es:"Batalla del castillo" },
  sanctuary: { zh:"遺跡", en:"Sanctuary", ko:"유적", de:"Heiligtum", fr:"Sanctuaire", pt:"Santuário", tr:"Tapınak", id:"Sanctuary", ru:"святилище", th:"วิหาร", ar:"المأوى", es:"santuario" },
  infantry: { zh:"步兵", en:"Infantry", ko:"보병", de:"Infanterie", fr:"Infanterie", pt:"Infantaria", tr:"Piyade", id:"Infanteri", ru:"Пехотинец", th:"ทหารราบ", ar:"المشاة", es:"Infantería" },
  cavalry: { zh:"騎兵", en:"Cavalry", ko:"기병", de:"Kavallerie", fr:"Cavalerie", pt:"Cavalaria", tr:"Süvari", id:"Kavaleri", ru:"Кавалерист", th:"ทหารม้า", ar:"الفرسان", es:"Caballería" },
  archer: { zh:"弓兵", en:"Archer", ko:"궁병", de:"Bogenschütze", fr:"Archer", pt:"Arquearia", tr:"Okçu", id:"Pemanah", ru:"Стрелок", th:"พลธนู", ar:"الرماة", es:"Arquero" },
  chenko: { zh:"琴科", en:"Chenko", ko:"첸코", de:"Chenko", fr:"Chenko", pt:"Chenko", tr:"Chenko", id:"Chenko", ru:"Ченко", th:"เชนโกะ", ar:"تشينكو", es:"Chenko" },
  amane: { zh:"雨音", en:"Amane", ko:"아마네", de:"Amane", fr:"Amane", pt:"Amane", tr:"Amane", id:"Amane", ru:"Амане", th:"อามาเนะ", ar:"أماني", es:"Amane" },
  yeonwoo: { zh:"妍羽", en:"Yeonwoo", ko:"연우", de:"Yeonwoo", fr:"Yeonwoo", pt:"Yeonwoo", tr:"Yeonwoo", id:"Yeonwoo", ru:"Ёну", th:"ยอนอู", ar:"يونوو", es:"Yeonwoo" },
  amadeus: { zh:"阿瑪迪斯", en:"Amadeus", ko:"아마데우스", de:"Amadeus", fr:"Amadeus", pt:"Amadeus", tr:"Amadeus", id:"Amadeus", ru:"Амадей", th:"อมาดีอุส", ar:"أماديوس", es:"Amadeus" },
  zoe: { zh:"佐伊", en:"Zoe", ko:"조이", de:"Zoe", fr:"Zoé", pt:"Zoe", tr:"Zoe", id:"Zoe", ru:"Зои", th:"โซอี้", ar:"زوي", es:"Zoe" },
  hilde: { zh:"希爾德", en:"Hilde", ko:"힐데", de:"Hilde", fr:"Hilde", pt:"Hilde", tr:"Hilde", id:"Hilde", ru:"Хильда", th:"ฮิลเดอร์", ar:"هيلدي", es:"Hilde" },
  marlin: { zh:"馬林", en:"Marlin", ko:"마린", de:"Marlin", fr:"Marlin", pt:"Peixe Marlin", tr:"Marlin", id:"Marlin", ru:"Марлин", th:"มาร์ลิน", ar:"مارلين", es:"Marlin" },
  howard: { zh:"霍華德", en:"Howard", ko:"하워드", de:"Howard", fr:"Howard", pt:"Howard", tr:"Howard", id:"Howard", ru:"Говард", th:"ฮาวเวิร์ด", ar:"هاورد", es:"Howard" },
  gordon: { zh:"戈登", en:"Gordon", ko:"고든", de:"Gordon", fr:"Gordon", pt:"Gordon", tr:"Gordon", id:"Gordon", ru:"Гордон", th:"กอร์ดอน", ar:"جوردن", es:"Gordon" },
  diana: { zh:"狄安娜", en:"Diana", ko:"다이애나", de:"Diana", fr:"Diana", pt:"Diana", tr:"Diana", id:"Diana", ru:"Диана", th:"ไดอาน่า", ar:"ديانا", es:"Diana" },
  fahd: { zh:"法赫德", en:"Fahd", ko:"파드", de:"Fahd", fr:"Fahd", pt:"Fahd", tr:"Fahd", id:"Fahd", ru:"Фад", th:"ฟาฮ์ด", ar:"فهد", es:"Fahd" },
  jabel: { zh:"潔貝爾", en:"Jabel", ko:"제이벨", de:"Jabel", fr:"Jabel", pt:"Jabel", tr:"Jabel", id:"Jabel", ru:"Явель", th:"จาเบล", ar:"جبل", es:"Jabel" },
  quinn: { zh:"奎恩", en:"Quinn", ko:"퀸", de:"Quinn", fr:"Quinn", pt:"Quinn", tr:"Quinn", id:"Quinn", ru:"Куинн", th:"ควินน์", ar:"كوين", es:"Quinn" },
  helga: { zh:"赫爾加", en:"Helga", ko:"헬가", de:"Helga", fr:"Helga", pt:"Helga", tr:"Helga", id:"Helga", ru:"Хельга", th:"เฮลก้า", ar:"هيلجا", es:"Helga" },
  saul: { zh:"薩洛", en:"Saul", ko:"살로", de:"Saul", fr:"Saul", pt:"Saul", tr:"Saul", id:"Saul", ru:"Соул", th:"ซอล", ar:"شاول", es:"Saul" },
  academy: { zh:"學院", en:"Academy", ko:"아카데미", de:"Akademie", fr:"Académie", pt:"Academia", tr:"Akademi", id:"Akademi", ru:"Университет", th:"อาคาเดมี", ar:"الأكاديمية", es:"Academia" },
  truegold: { zh:"黃金", en:"Truegold", ko:"순금", de:"Echtgold", fr:"Or Véritable", pt:"Adamante", tr:"Hasaltın", id:"Truegold", ru:"Аурум", th:"ทรูโกลด์", ar:"الذهب الخالص", es:"Adamantina" },
  truegoldDust: { zh:"黃金研究粉塵", en:"Truegold Dust", ko:"황금 연구 가루", de:"Echtgold-Staub", fr:"Poussière d'Or Véritable", pt:"Pó de Ouro Verdadeiro", tr:"Gerçek Altın Tozu", id:"Debu Truegold", ru:"Пыль истинного золота", th:"ผงทองแท้", ar:"غبار الذهب الحقيقي" },
  governorGear: { zh:"領主裝備", en:"Governor Gear", ko:"영주 장비", de:"Gouverneur-Ausrüstung", fr:"Équipement Chef", pt:"Equipamento do Chefe", tr:"Şef Donanımı", id:"Gear Gubernur", ru:"Снаряжение губернатора", th:"อุปกรณ์ผู้นำค่าย", ar:"عتاد الحاكم", es:"Equipo de gobernador" },
  governorCharm: { zh:"領主寶石", en:"Governor Charm", ko:"영주 보석", de:"Gouverneur-Talisman", fr:"Talisman du Chef", pt:"Talismã do Chefe", tr:"Şef Tılsımı", id:"Charm Gubernur", ru:"Талисман губернатора", th:"เครื่องรางผู้นำค่าย", ar:"تميمة الحاكم", es:"Talismán del Gobernador" },
  satin: { zh:"進貢綢緞", en:"Satin", ko:"비단", de:"Satin", fr:"Satin", pt:"Cetim", tr:"Saten", id:"Satin", ru:"Атлас", th:"ผ้าซาติน", ar:"نسيج أطلس", es:"Satén" },
  gildedThreads: { zh:"金絲線", en:"Gilded Threads", ko:"금사", de:"Vergoldete Fäden", fr:"Fils Dorés", pt:"Fios Dourados", tr:"Yaldızlı İplikler", id:"Gilded Threads", ru:"Золоченые нити", th:"ด้ายทองคำ", ar:"خيوط مذهبة", es:"Hilos dorados" },
  forgehammer: { zh:"鍛造錘", en:"Forgehammer", ko:"제작 망치", de:"Schmiedehammer", fr:"Marteau de Forge", pt:"Martelo de forja", tr:"Demirci Çekici", id:"Forgehammer", ru:"кузнечный молот", th:"ค้อนตีเหล็ก", ar:"مطرقة الحدادة", es:"Martillo de Forja" },
  widget: { zh:"零件", en:"Widget", ko:"부속품", de:"Element", fr:"Composant", pt:"Ferramenta", tr:"Alet", id:"Widget", ru:"поделка", th:"อุปกรณ์เสริม", ar:"جزء", es:"Complemento" },
  heroExclusiveGear: { zh:"英雄專屬裝備", en:"Hero Exclusive Gear", ko:"영웅 전용 장비", de:"Helden Exklusive Ausrüstung", fr:"Équipement Exclusif de Héros", pt:"Equipamento Exclusivo do Herói", tr:"Kahraman Özel Donanımı", id:"Gear Ekslusif Hero", ru:"эксклюзивное снаряжение героя", th:"อุปกรณ์พิเศษฮีโร่", ar:"عتاد البطل الحصري", es:"Equipo Exclusivo de Héroe" },
  heroShard: { zh:"英雄碎片", en:"Hero Shard", ko:"영웅 파편", de:"Helden-Fragment", fr:"Fragment de Héros", pt:"Fragmento de Herói", tr:"Kahraman Parçası", id:"Fragmen Hero", ru:"фрагмент героя", th:"ชิ้นส่วนฮีโร่", ar:"شظية بطل", es:"Fragmento de Héroe" },
  heroRoulette: { zh:"英雄轉盤", en:"Hero Roulette", ko:"영웅 룰렛", de:"Helden Roulette", fr:"Roulette de Héros", pt:"Roleta de Herói", tr:"Kahraman Ruleti", id:"Rolet Hero", ru:"Геройская рулетка", th:"รูเล็ตฮีโร่", ar:"روليت البطل" },
  intel: { zh:"情報任務", en:"Intel Missions", ko:"정보 임무", de:"Geheimdienstmissionen", fr:"Missions de Renseignement", pt:"Missões de Inteligência", tr:"İstihbarat Görevleri", id:"Misi Intel", ru:"разведывательные задания", th:"ภารกิจข่าวกรอง", ar:"مهام الاستخبارات" },
  petAdvancement: { zh:"寵物突破", en:"Pet advancement", ko:"펫 돌파", de:"Begleittier-Förderungswert", fr:"avancement des animaux", pt:"pontuação de avanço do animal de estimação", tr:"Pet ilerletme puanı", id:"kemajuan hewan peliharaan", ru:"улучшение питомца", th:"ความก้าวหน้าสัตว์เลี้ยง", ar:"تقدم الحيوان الأليف", es:"avance de mascota" },
  advancedTamingMarks: { zh:"高級馴化印記", en:"Advanced Taming Marks", ko:"고급 훈련 기록", de:"Fortgeschrittene Zähmungszeichen", fr:"Marque de Dressage Avancée", pt:"Marca de Domesticação Avançada", tr:"Gelişmiş Evcilleştirme İşareti", id:"Tanda Penjinakan Advanced", ru:"продвинутая метка приручения", th:"ตราฝึกสัตว์ขั้นสูง", ar:"علامة ترويض متقدمة", es:"Marcas de Domesticación Avanzadas" },
  commonTamingMarks: { zh:"普通馴化印記", en:"Common Taming Marks", ko:"일반 훈련 기록", de:"Gewöhnliche Zähmungszeichen", fr:"Marque de Dressage Commune", pt:"Marca de Domesticação Comum", tr:"Sıradan Evcilleştirme İşareti", id:"Tanda Penjinakan Common", ru:"обычная метка приручения", th:"ตราฝึกสัตว์ทั่วไป", ar:"علامة ترويض شائعة", es:"Marcas de Domesticación Comunes" },
  kingsCastle: { zh:"王城", en:"King's Castle", ko:"캐슬", de:"Königliches Schloss", fr:"Château Royal", pt:"Castelo da Realeza", tr:"Kralın Şatosu", id:"Kastil Raja", ru:"Королевский замок", th:"ปราสาทกษัตริย์", ar:"قلعة الملك", es:"Castillo del Rey" },
  turret: { zh:"砲台", en:"Turret", ko:"포탑", de:"Geschützturm", fr:"tourelle", pt:"torreão", tr:"taret", id:"meriam", ru:"орудийная башня", th:"ป้อมปืน", ar:"البرج", es:"torreta" },
  medicalSatchels: { zh:"醫療包", en:"Medical Satchels", ko:"구급낭", de:"Medizinbeutel", fr:"Sacoches Médicales", pt:"Bolsas Médicas", tr:"Tıbbi Çantalar", id:"Tas Medis", ru:"Медицинские сумки", th:"กระเป๋ายา", ar:"حقائب طبية" },
  rescueOrders: { zh:"救援令", en:"Rescue Orders", ko:"구조 명령서", de:"Rettungsbefehle", fr:"Ordres de Secours", pt:"Ordens de Resgate", tr:"Kurtarma Emirleri", id:"Perintah Penyelamatan", ru:"Приказы о спасении", th:"คำสั่งช่วยเหลือ", ar:"أوامر الإنقاذ" },
  useIcon: { zh:"使用", en:"use", ko:"사용", de:"nutzen", fr:"utiliser", pt:"usar", tr:"kullan", id:"gunakan", ru:"использовать", th:"ใช้", ar:"استخدم", es:"usar" },
  okayIfNeeded: { zh:"需要時可以用", en:"okay if needed", ko:"필요하면 사용 가능", de:"bei Bedarf okay", fr:"acceptable si besoin", pt:"ok se necessário", tr:"gerekirse uygun", id:"boleh jika perlu", ru:"допустимо при необходимости", th:"ใช้ได้หากจำเป็น", ar:"مقبول عند الحاجة", es:"aceptable si es necesario" },
  dontUseIcon: { zh:"不要使用", en:"don't use", ko:"사용 금지", de:"nicht nutzen", fr:"ne pas utiliser", pt:"não usar", tr:"kullanma", id:"jangan digunakan", ru:"не использовать", th:"ห้ามใช้", ar:"لا تستخدم", es:"no usar" },
  needDaily: { zh:"每天都要做", en:"need to do daily", ko:"매일 필요", de:"täglich nötig", fr:"à faire chaque jour", pt:"fazer diariamente", tr:"her gün gerekli", id:"perlu dilakukan setiap hari", ru:"нужно делать ежедневно", th:"ต้องทำทุกวัน", ar:"يجب فعله يوميًا", es:"hacer a diario" },
  mithril: { zh:"秘銀", en:"Mithril", ko:"미스릴", de:"Mithril", fr:"Mithril", pt:"Mithril", tr:"Mithril", id:"Mithril", ru:"Мифрил", th:"มิธริล", ar:"ميثريل", es:"Mitrilo" },
  construction: { zh:"建造", en:"Construction", ko:"건설", de:"Bau", fr:"Construction", pt:"Construção", tr:"İnşaat", id:"Konstruksi", ru:"Строительство", th:"การสร้าง", ar:"البناء", es:"Construcción" },
  training: { zh:"訓練", en:"Training", ko:"훈련", de:"Training", fr:"Entraînement", pt:"Treinamento", tr:"Eğitim", id:"Pelatihan", ru:"Тренировки", th:"การฝึก", ar:"التدريب", es:"Entrenamiento" },
  research: { zh:"研究", en:"Research", ko:"연구", de:"Forschung", fr:"Recherche", pt:"Pesquisa", tr:"Araştırma", id:"Penelitian", ru:"Исследование", th:"การวิจัย", ar:"البحث", es:"Investigación" },
  healing: { zh:"治療", en:"Healing", ko:"치료", de:"Heilung", fr:"Soins", pt:"Cura", tr:"Tedavi", id:"Penyembuhan", ru:"лечение", th:"การรักษา", ar:"الشفاء", es:"Curación" },
  /* 全軍出擊活動、野外採集點、聯盟資源建築（地圖與聯盟信件截圖確認） */
  allOut: { zh:"全軍出擊", en:"All Out", ko:"전군 출격", de:"Aufs Ganze", fr:"Tous dehors", pt:"Vai com Tudo", tr:"Topyekün", id:"Serangan Penuh", ru:"Полный вперед", th:"ลุยเลย", ar:"جميع القوات تهاجم", es:"A la batalla" },
  bread: { zh:"麵包", en:"Bread", ko:"빵", de:"Brot", fr:"Pain", pt:"Pão", tr:"Ekmek", id:"Roti", ru:"Хлеб", th:"ขนมปัง", ar:"الخبز", es:"Pan" },
  wood: { zh:"木材", en:"Wood", ko:"목재", de:"Holz", fr:"Bois", pt:"Madeira", tr:"Odun", id:"Kayu", ru:"Древесина", th:"ไม้", ar:"خشب", es:"Madera" },
  stone: { zh:"石材", en:"Stone", ko:"석재", de:"Stein", fr:"Pierre", pt:"Pedra", tr:"Taş", id:"Batu", ru:"Камень", th:"หิน", ar:"الحجر", es:"Piedra" },
  iron: { zh:"鐵礦", en:"Iron", ko:"철광", de:"Eisen", fr:"Fer", pt:"Ferro", tr:"Demir", id:"Besi", ru:"Железо", th:"แร่เหล็ก", ar:"حديد", es:"Hierro" },
  greatMill: { zh:"大型磨坊", en:"Great Mill", ko:"대형 방앗간", de:"Große Mühle", fr:"Grand Moulin", pt:"Grande Moinho", tr:"Büyük Değirmen", id:"Lumbung Besar", ru:"Большая мельница", th:"โรงโม่ใหญ่", ar:"طاحونة عظيمة", es:"Gran Molino" },
  greatSawmill: { zh:"大型伐木場", en:"Great Sawmill", ko:"대형 벌목장", de:"Großes Sägewerk", fr:"Grande Scierie", pt:"Grande Serraria", tr:"Büyük Odun Fabrikası", id:"Penggergajian Kayu Besar", ru:"Большая лесопилка", th:"โรงเลื่อยใหญ่", ar:"منشرة عظيمة", es:"Gran Aserradero" },
  greatIronMine: { zh:"大型鐵礦場", en:"Great Iron Mine", ko:"대형 철광장", de:"Großes Eisenbergwerk", fr:"Grande Mine de Fer", pt:"Grande Mina de Ferro", tr:"Büyük Demir Madeni", id:"Tambang Besi Besar", ru:"Большой железный рудник", th:"เหมืองเหล็กใหญ่", ar:"منجم حديد عظيم", es:"Gran Mina de hierro" },
  greatQuarry: { zh:"大型採石場", en:"Great Quarry", ko:"대형 채석장", de:"Großer Steinbruch", fr:"Grande Carrière", pt:"Grande Pedreira", tr:"Büyük Taş Ocağı", id:"Tambang Batu Besar", ru:"Большая каменоломня", th:"เหมืองหินใหญ่", ar:"محجر عظيم", es:"Gran Cantera" },
  mill: { zh:"磨坊", en:"Mill", ko:"방앗간", de:"Mühle", fr:"Moulin", pt:"Moinho", tr:"Değirmen", id:"Lumbung", ru:"Мельница", th:"โรงโม่", ar:"طاحونة", es:"Molino" },
  sawmill: { zh:"伐木場", en:"Sawmill", ko:"벌목장", de:"Sägewerk", fr:"Scierie", pt:"Serraria", tr:"Odun Fabrikası", id:"Penggergajian Kayu", ru:"Лесопилка", th:"โรงเลื่อย", ar:"منشرة", es:"Aserradero" },
  ironMine: { zh:"鐵礦場", en:"Iron Mine", ko:"철광장", de:"Eisenbergwerk", fr:"Mine de Fer", pt:"Mina de Ferro", tr:"Demir Madeni", id:"Tambang Besi", ru:"Железный рудник", th:"เหมืองเหล็ก", ar:"منجم حديد", es:"Mina de hierro" },
  quarry: { zh:"採石場", en:"Quarry", ko:"채석장", de:"Steinbruch", fr:"Carrière", pt:"Pedreira", tr:"Taş Ocağı", id:"Tambang Batu", ru:"Каменоломня", th:"เหมืองหิน", ar:"محجر", es:"Cantera" },
  securedAllianceNode: { zh:"聯盟安全採集點", en:"Secured Alliance Node", ko:"연맹 안전 채집 포인트", de:"Allianzknoten", fr:"Point d'Alliance Sécurisé", pt:"Nó de Aliança Protegido", tr:"Korumalı İttifak Toplama Noktası", id:"Node Aliansi Aman", ru:"защищенный узел сбора альянса", th:"จุดพันธมิตรปลอดภัย", ar:"نقطة تجميع تحالف مؤمنة", es:"Nodo de Recolección Segura de la Alianza" },
  armory: { zh:"防具庫", en:"Armory", ko:"방어구 창고", de:"Waffenkammer", fr:"Armurerie", pt:"Arsenal", tr:"Cephanelik", id:"Armory", ru:"Оружейная", th:"คลังแสง", ar:"مخزن الدروع", es:"Armería" },
  /* 釣魚大賽（活動規則截圖確認，12 語言） */
  fishingTournament: { zh:"釣魚大賽", en:"Fishing Tournament", ko:"낚시 선수권 대회", de:"Fischerturnier", fr:"Tournoi de Pêche", pt:"Torneio de Pesca", tr:"Balık Avı Turnuvası", id:"Turnamen Memancing", ru:"Рыболовный турнир", th:"ทัวร์นาเมนต์ตกปลา", ar:"مسابقة الصيد", es:"Torneo de Pesca" },
  oceanProspector: { zh:"寶藏釣魚", en:"Ocean Prospector", ko:"보물 낚시", de:"Ozean-Goldsucher", fr:"Chercheur des Mers", pt:"Prospecção do Oceano", tr:"Okyanus Kaşifi", id:"Ocean Prospector", ru:"Океанический поиск сокровищ", th:"การสำรวจมหาสมุทร", ar:"مستكشف المحيط", es:"Prospector Oceánico" },
  regularFishing: { zh:"普通釣魚", en:"Regular Fishing", ko:"일반 낚시", de:"Normales Fischen", fr:"Pêche Classique", pt:"Pesca Normal", tr:"Normal Balık Avı", id:"Memancing Reguler", ru:"Обычная рыбалка", th:"การตกปลาปกติ", ar:"صيد الأسماك العادي", es:"Pesca común" },
  fishingKit: { zh:"漁具", en:"Fishing Kit", ko:"낚시 도구", de:"Angelausrüstung", fr:"Kit", pt:"Kit de Pesca", tr:"Balık Avı Kiti", id:"Peralatan Memancing", ru:"рыболовный набор", th:"อุปกรณ์ตกปลา", ar:"أدوات الصيد", es:"Equipo de Pesca" },
  fishLine: { zh:"魚線", en:"Line", ko:"낚싯줄", de:"Schnur", fr:"Ligne", pt:"Linha", tr:"Misina", id:"Tali pancing", ru:"Леска", th:"สายเบ็ด", ar:"الخيط", es:"Sedal" },
  fishHook: { zh:"魚鉤", en:"Hook", ko:"낚싯바늘", de:"Haken", fr:"Hameçon", pt:"Anzol", tr:"Kanca", id:"Pengait", ru:"Крючок", th:"ตะขอเบ็ด", ar:"الصنارة", es:"Anzuelo" },
  fishSinker: { zh:"魚墜", en:"Sinker", ko:"낚시추", de:"Senkblei", fr:"Plomb", pt:"Chumbada", tr:"Kurşun", id:"Pemberat", ru:"Грузило", th:"ตะกั่วถ่วง", ar:"الثقال", es:"Plomo" },
  strugglingMermaid: { zh:"受困的美人魚", en:"Struggling Mermaid", ko:"곤경에 처한 인어", de:"Meerjungfrau in Schwierigkeiten", fr:"Sirène en Difficulté", pt:"Sereia em dificuldades", tr:"Yardıma Muhtaç Deniz Kızı", id:"Putri Duyung Terperangkap", ru:"попавшая в беду русалка", th:"นางเงือกมีปัญหา", ar:"حورية البحر المكافحة", es:"Sirena en Dificultades" },
  hornOfTheTide: { zh:"海潮號角", en:"Horn of the Tide", ko:"조수 나팔", de:"Horn der Gezeiten", fr:"Corne des Mers", pt:"Trombeta da Maré", tr:"Gelgit Boynuzu", id:"Trompet Samudra", ru:"Рог прилива", th:"แตรแห่งกระแสน้ำ", ar:"بوق الموج", es:"Cuerno de la Marea" },
  retreat: { zh:"退出", en:"Retreat", ko:"나가기", de:"Rückzug", fr:"Retraite", pt:"Bater em Retirada", tr:"Geri Çekil", id:"Mundur", ru:"Отступить", th:"ถอย", ar:"تراجع", es:"Retirarse" },
  artisansVision: { zh:"設計圖紙", en:"Artisan's Vision", ko:"설계 스케치", de:"Die Vision des Handwerkers", fr:"Vision de l'Artisan", pt:"Visão do Artesão", tr:"Zanaatkâr Vizyonu", id:"Artisan's Vision", ru:"Ремесленный чертеж", th:"วิสัยทัศน์ของช่างฝีมือ", ar:"رؤية الحرفي", es:"Visión del Artesano" },
  heroGear: { zh:"英雄裝備", en:"Hero Gear", ko:"영웅 장비", de:"Heldenausrüstung", fr:"Équipement de héros", pt:"Equipamento do Herói", tr:"Kahraman Donanımı", id:"Gear Hero", ru:"Снаряжение героя", th:"อุปกรณ์ฮีโร่", ar:"عتاد البطل", es:"Equipo de Héroe" },
  enhancementXp: { zh:"強化經驗值", en:"Enhancement XP", ko:"강화 경험치", de:"Verbesserungs-XP", fr:"EXP d'Amélioration", pt:"XP de Aprimoramento", tr:"Geliştirme TP", id:"Enhancement XP", ru:"опыт усиления", th:"XP การพัฒนา", ar:"خبرة تحسين", es:"EXP de mejora" },
  gems: { zh:"鑽石", en:"Gems", ko:"다이아", de:"Edelsteine", fr:"Gemmes", pt:"Gemas", tr:"Elmas", id:"Permata", ru:"Алмазы", th:"เพชร", ar:"الجواهر", es:"Gemas" },
  /* 三盟爭霸（活動規則截圖確認，12 語言） */
  triAllianceClash: { zh:"三盟爭霸", en:"Tri-Alliance Clash", ko:"삼대 연맹전", de:"Drei-Allianz-Wettkampf", fr:"Conflit Tri-Alliance", pt:"Confronto Tri-Aliança", es:"Choque de Tres Alianzas", tr:"Üçlü İttifak Çarpışması", id:"Clash Tiga Aliansi", ru:"Битва трех альянсов", th:"สงครามสามพันธมิตร", ar:"صراع التحالف الثلاثي" },
  tacPreparations: { zh:"準備階段", en:"Preparations", ko:"준비 단계", de:"Vorbereitung", fr:"Préparations", pt:"Preparação", es:"Preparativos", tr:"Hazırlıklar", id:"Persiapan", ru:"Подготовка", th:"ช่วงเตรียมตัว", ar:"الاستعدادات" },
  seizeConquer: { zh:"攻城掠地", en:"Seize & Conquer", ko:"공성 약탈", de:"Ergreifen & Erobern", fr:"Capture & Conquête", pt:"Capturar e conquistar", es:"Capturar y Conquistar", tr:"Ele Geçir ve Fethet", id:"Rebut & Taklukkan", ru:"Осада", th:"พิชิตและยึดครอง", ar:"الاستيلاء والسيطرة" },
  garrisonOccupation: { zh:"爭奪各方兵營", en:"Garrison Occupation", ko:"각 병영 쟁탈", de:"Garnisonsbesetzung", fr:"Occupation de Garnison", pt:"Ocupação da Guarnição", es:"Ocupación de Guarniciones", tr:"Garnizon İşgali", id:"Penguasaan Garnisun", ru:"Захват форта", th:"การยึดป้อม", ar:"احتلال الحامية" },
  templeOnslaught: { zh:"進軍潮汐神殿", en:"Temple Onslaught", ko:"파도 신전으로 진군", de:"Ansturm auf Tempel", fr:"Assaut du Temple", pt:"Atacar o Templo", es:"Asalto al Templo", tr:"Tapınağa Hücum", id:"Penyerangan Kuil", ru:"Натиск на храм", th:"โจมตีวิหาร", ar:"هجوم المعبد" },
  templeOfTides: { zh:"潮汐神殿", en:"Temple of Tides", ko:"파도 신전", de:"Tempel der Gezeiten", fr:"Temple des Marées", pt:"Templo das Marés", es:"Templo de las Mareas", tr:"Gelgitler Tapınağı", id:"Kuil Dewa Laut", ru:"Храм приливов", th:"วิหารแห่งกระแสน้ำ", ar:"معبد المد" },
  tacHeadquarters: { zh:"總部", en:"Headquarters", ko:"본부", de:"Hauptquartier", fr:"Quartier Général", pt:"Quartéis-generais", es:"Cuartel General", tr:"Karargahlar", id:"HQ", ru:"Штаб", th:"ฐานทัพ", ar:"المقر" },
  tacGarrison: { zh:"戍衛兵營", en:"Garrisons", ko:"수비대 병영", de:"Garnisonen", fr:"Garnison", pt:"Guarnições", es:"Guarniciones", tr:"Garnizonlar", id:"Garnisun", ru:"Гарнизоны", th:"ป้อม", ar:"الحامية" },
  transitHub: { zh:"中轉樞紐", en:"Transit Hub", ko:"중계 거점", de:"Knotenpunkt", fr:"Pôle de Transit", pt:"Centro de Trânsito", es:"Centro de Tránsito", tr:"Transit Merkezi", id:"Pusat Transit", ru:"Перевалочный пункт", th:"ศูนย์การขนส่ง", ar:"مركز النقل" },
  tacEnergy: { zh:"能量", en:"Energy", ko:"에너지", de:"Energie", fr:"énergie", pt:"Energia", es:"Energía", tr:"Enerji", id:"Energi", ru:"энергия", th:"พลังงาน", ar:"الطاقة" },
  tacCaptain: { zh:"指揮官", en:"Captain", ko:"지휘관", de:"Kapitän", fr:"Capitaine", pt:"Capitão", es:"Capitán", tr:"Önder", id:"Kapten", ru:"капитан", th:"กัปตัน", ar:"كابتن" },
  tacConscript: { zh:"徵兵", en:"Conscript", ko:"징집", de:"Einberufen", fr:"recruter", pt:"recrutar", es:"reclutar", tr:"görevlendirmek", id:"wajib militer", ru:"пополнение", th:"เกณฑ์", ar:"تجنيد" },
  masters: { en:"Masters" },
  masterItems: { en:"Master items" },
  manuscript: { en:"Manuscript" },
  masterSpeeds: { en:"Master speeds" },
  masterAcademy: { zh:"大師學院", en:"Master Academy", ko:"거장 아카데미", de:"Meisterakademie", fr:"Académie des Experts", pt:"Academia dos Mestres", tr:"Usta Akademisi", ru:"Университет мастеров", th:"สถาบันมาสเตอร์", ar:"أكاديمية المتخصصين", es:"Academia de Maestros" },
  pan: { zh:"潘", en:"Pan", ko:"판", de:"Pan", fr:"Pan", pt:"Pan", tr:"Pan", id:"Pan", ru:"Пан", th:"แพน", ar:"بان", es:"Pan" },
  valora: { zh:"維拉", en:"Valora", ko:"베라", de:"Valora", fr:"Valora", pt:"Valora", tr:"Valora", id:"Valora", ru:"Валора", th:"วาโลร่า", ar:"فالورا", es:"Valora" },
  roman: { en:"Roman" },
  petra: { zh:"小佩拉", en:"Petra", ko:"리틀 페라", de:"Petra", fr:"Petra", pt:"Petra", tr:"Petra", ru:"Петра", th:"เพตรา", ar:"بيترا", es:"Petra" },
  realmJourney: { zh:"荒野冒險", en:"Realm Journey", ko:"황야 모험", de:"Reichsreise", fr:"Voyage dans le royaume", pt:"Jornada do Reino", tr:"Krallık Yolculuğu", id:"Perjalanan Alam", ru:"Тропа приключений", th:"การเดินทางอาณาจักร", ar:"رحلة العالم", es:"Travesía por el reino" },
  journeySupplies: { zh:"冒險物資", en:"Journey Supplies", ko:"모험 물자", de:"Reisevorräte", fr:"Provisions de voyage", pt:"Suprimentos da Jornada", tr:"Yolculuk Malzemeleri", id:"Perbekalan Perjalanan", ru:"Припасы путешествия", th:"เสบียงการเดินทาง", ar:"إمدادات الرحلة", es:"Suministros de Travesía" },
  adventureSupply: { zh:"征程補給", en:"Adventure Supply", ko:"원정 보급", de:"Abenteuervorrat", fr:"Provision d'Aventure", pt:"Suprimentos de Aventura", tr:"Macera Tedariki", id:"Suplai Petualangan", ru:"Припасы для приключений", th:"เสบียงการผจญภัย", ar:"إمدادات المغامرة", es:"Suministro de Aventura" },
  lostlands: { zh:"遺忘之地", en:"Lostlands", ko:"잊혀버린 땅", de:"Verlorene Lande", fr:"Terres Perdues", pt:"Terras Perdidas", tr:"Kayıp Diyarlar", id:"Tanah Terlupakan", ru:"Забытые земли", th:"ดินแดนสาบสูญ", ar:"الأراضي المفقودة", es:"Tierras Perdidas" },
  reserveChests: { zh:"儲備寶箱", en:"Reserve Chests", ko:"예비 보물상자", de:"Reserve-Truhen", fr:"Coffres de Réserve", pt:"Baús de Reserva", tr:"Yedek Sandık", id:"Peti Cadangan", ru:"сундуки резервов", th:"หีบกองหนุน", ar:"صناديق الاحتياطي", es:"cofres de reserva" },
  mysteryBadge: { zh:"神秘徽章", en:"Mystery Badges", ko:"신비한 휘장", de:"mysteriöse Abzeichen", fr:"insignes mystères", pt:"Insígnias Misteriosas", tr:"Gizem Rozeti", id:"Lencana Misteri", ru:"тайные жетоны", th:"ตราปริศนา", ar:"الشارات الغامضة", es:"insignias de misterio" },
  ragingBear: { zh:"暴怒巨熊", en:"Raging Bear", ko:"분노한 곰", de:"Wütender Bär", fr:"Ours Enragé", pt:"Urso Furioso", tr:"Öfkeli Ayı", id:"Raging Bear", ru:"свирепый медведь", th:"หมีคลั่ง", ar:"الدب الهائج", es:"Oso Enfurecido" },
  acquaintance: { zh:"點頭之交", en:"Acquaintance", ko:"깊지 않은 교제", de:"Bekannter", fr:"Relation", pt:"Conhecido", tr:"Tanıdık", ru:"Знакомый", th:"คนรู้จัก", ar:"معرفة", es:"Conocido" },
  casual: { zh:"志同道合", en:"Casual", ko:"의기투합", de:"Zwanglos", fr:"Connaissance", pt:"Casual", tr:"Sıradan", ru:"Друг", th:"ผิวเผิน", ar:"عابرة", es:"Cordial" },
  savageAdvantage: { zh:"人數優勢", en:"Savage Advantage", ko:"수적 우위", de:"Vorteil des Wilden", fr:"Avantage primitif", pt:"Vantagem Selvagem", tr:"Vahşi Avantaj", id:"Savage Advantage", ru:"Беспощадное преимущество", th:"ความได้เปรียบอันดุร้าย", ar:"الأفضلية الوحشية", es:"Ventaja salvaje" },
  leaderByExample: { zh:"經驗傳承", en:"Leader By Example", ko:"경험 전승", de:"Vorbildlicher Anführer", fr:"Donner l'exemple", pt:"Líder por Exemplo", tr:"Örnek Lider", id:"Leader By Example", ru:"Образцовый лидер", th:"ผู้นำตัวอย่าง", ar:"القائد القدوة", es:"Liderazgo ejemplar" },
  weaponObsession: { zh:"武器專精", en:"Weapon Obsession", ko:"무기 마스터리", de:"Waffenbesessenheit", fr:"Attrait pour les armes", pt:"Obsessão por Armas", tr:"Silah Takıntısı", id:"Weapon Obsession", ru:"Одержимость снаряжением", th:"ความหลงไหลในอาวุธ", ar:"هوس السلاح", es:"Obsesión por las armas" },
  danceOfTheHunt: { zh:"狩獵之舞", en:"Dance of the Hunt", ko:"사냥의 춤", de:"Tanz der Jagd", fr:"Danse de la chasse", pt:"Dança da Caçada", tr:"Av Dansı", id:"Dance of the Hunt", ru:"Танец охоты", th:"ระบำแห่งการล่า", ar:"رقصة الصيد", es:"Danza de la cacería" },
  falconer: { zh:"獵鷹偵查", en:"Falconer", ko:"사냥용 매 정찰", de:"Falkner", fr:"Fauconnier", pt:"Falcoeiro", tr:"Doğancı", id:"Falconer", ru:"Сокольник", th:"ผู้ฝึกเหยี่ยว", ar:"الصقار", es:"Cetrero" },
  waysAndMeans: { zh:"特殊管道", en:"Ways and Means", ko:"특별한 경로", de:"Mittel und Wege", fr:"L'art et la manière", pt:"Jeitos e Maneiras", tr:"Yollar ve Yöntemler", id:"Ways and Means", ru:"Методы и средства", th:"วิธีการและหนทาง", ar:"السبل والوسائل", es:"Formas y medios" },
  vipXp: { zh:"VIP經驗值", en:"VIP XP", ko:"VIP 경험치", de:"VIP XP", fr:"EXP VIP", pt:"XP VIP", tr:"VIP XP", id:"XP VIP", ru:"VIP-опыт", th:"XP VIP", ar:"خبرة VIP", es:"EXP VIP" },
  trialCrystal: { zh:"試煉晶石", en:"Trial Crystal", ko:"시련 결정", de:"Prüfungskristall", fr:"Cristal du défi", pt:"Cristal da Prova", tr:"İmtihan Kristali", id:"Kristal Ujian", ru:"Кристалл баталий", th:"คริสตัลบททดสอบ", ar:"كريستال الاختبارات", es:"Cristal de Pruebas" },
  customMythicGearChest: { zh:"傳說英雄裝備客製化箱子", en:"Custom Mythic Hero Gear Chest", ko:"레전드 영웅 장비 상자", de:"Mythische Heldenausrüstungs Kiste", fr:"Caisse d'Équipement de Héros Mythique Personnalisée", pt:"Baú de Equip. de Herói Mítico Personalizado", tr:"Özel Mitik Kahraman Donanımı Sandığı", id:"Peti Perlengkapan Pahlawan Mitos Khusus", ru:"Личное мифическое снаряжение героя", th:"หีบอุปกรณ์ฮีโร่ขั้นเทพกำหนดเอง", ar:"صندوق عتاد البطل الخيالي المخصص", es:"Caja de equipo de héroe mítico personalizada" },
  widgetChest: { zh:"第2代英雄零件客製化箱子", en:"Gen 2 Custom Hero Widget Chest", ko:"제2세대 영웅 부속품 선택 상자", de:"2. Gen.Held Elementkiste", fr:"Boîte Comp Héros Myth Pers Gén. 2", pt:"Baú de Ferramenta do Herói Personalizado 2ª Geração", tr:"2. Nesil Özel Kahraman Aleti Sandığı", id:"Peti Widget Custom Gen 2", ru:"Персонализированный ящик 2-го поколения с поделкой героя", th:"หีบอุปกรณ์เสริมฮีโร่กำหนดเองรุ่นที่ 2", ar:"صندوق أجزاء البطل المخصص من الجيل الثاني", es:"Cofre Compl Héroe Pers Gen 2" },
  transferPass: { zh:"移民授權書", en:"Transfer Pass", ko:"이민 허가증", de:"Transfer-Pass", fr:"Passe de Transfert", pt:"Passe de Transferência", tr:"Transfer Bileti", id:"Transfer Pass", ru:"Пропуск переноса", th:"บัตรผ่านการย้าย", ar:"تذكرة الانتقال", es:"Pase de transferencia" },
  hallOfHeroes: { zh:"英雄殿堂", en:"Hall of Heroes", ko:"영웅의 전당", de:"Halle der Helden", fr:"Temple des Héros", pt:"Hall dos Heróis", tr:"Kahraman Salonu", id:"Aula Pahlawan", ru:"Зал героев", th:"หอฮีโร่", ar:"قاعة الأبطال", es:"Sala de los héroes" },
  arenaOfGlory: { zh:"萬國競技場", en:"Arena of Glory", ko:"만국 경기장", de:"Arena des Ruhms", fr:"Arène de la Gloire", pt:"Arena da Glória", tr:"Şan Arenası", id:"Arena Kemuliaan", ru:"Арена славы", th:"อารีน่าแห่งเกียรติยศ", ar:"ساحة المجد", es:"Arena de la gloria" },
  intelMission: { zh:"情報事件", en:"Intel Mission", ko:"정보 이벤트", de:"Geheimdienst-Mission", fr:"Mission de renseignements", pt:"Missão de Informação", tr:"Bilgi Görevi", id:"Misi Intel", ru:"Разведывательная миссия", th:"ภารกิจข่าวกรอง", ar:"مهمة المعلومات", es:"Misión de Inteligencia" },
  waterEssence: { zh:"生命之水", en:"Water Essence", ko:"생명의 물", de:"Wasser-Essenz", fr:"Essence d'Eau", pt:"Essência da Água", tr:"Su Özü", id:"Esensi Air", ru:"Водная эссенция", th:"แก่นน้ำ", ar:"جوهر الماء", es:"Esencia de Agua" },
  petAdventure: { zh:"寵物尋寶", en:"Pet Adventure", ko:"펫 보물찾기", de:"Begleittier Abenteuer", fr:"Aventure Animalière", pt:"Aventura do Pet", tr:"Evcil Hayvan Macerası", id:"Petualangan Hewan Peliharaan", ru:"Приключение питомца", th:"การผจญภัยสัตว์เลี้ยง", ar:"مغامرة الحيوان الأليف", es:"Aventura de Mascotas" },
  conquerorsCamp: { zh:"討伐小隊營地", en:"Conquerors' Camp", ko:"소대 영지 토벌", de:"Lager der Eroberer", fr:"Camp des Conquérants", pt:"Acampamento dos Conquistadores", tr:"Fatihler Kampı", id:"Kamp Penakluk", ru:"Лагерь завоевателя", th:"ค่ายผู้พิชิต", ar:"معسكر الغزاة", es:"Campamento de Conquistadores" },
  dailyMissions: { zh:"每日任務", en:"Daily", ko:"일일 임무", de:"Täglich", fr:"Quotidien", pt:"Diário", tr:"Günlük", id:"Harian", ru:"Ежедневные миссии", th:"ประจำวัน", ar:"يومياً", es:"Diario" },
  allianceHelp: { zh:"聯盟互助", en:"Help", ko:"연맹 협조", de:"Hilfe", fr:"Aide", pt:"Ajuda", tr:"Yardım", id:"Bantuan", ru:"Помощь", th:"การช่วยเหลือ", ar:"المساعدة", es:"Ayuda" },
  allianceTech: { zh:"聯盟科技", en:"Tech", ko:"연맹 과학 기술", de:"Technologie", fr:"Tech", pt:"Tecnologia", tr:"Teknoloji", id:"Teknologi", ru:"Технологии", th:"เทคโนโลยี", ar:"التقنيات", es:"Tecnología" },
  allianceToken: { zh:"聯盟幣", en:"Alliance Token", ko:"연맹 코인", de:"Allianz-Token", pt:"Token da Aliança", tr:"İttifak Jetonu", id:"Token Aliansi", ru:"Жетон альянса", th:"เหรียญพันธมิตร", ar:"رمز التحالف", es:"Ficha de la alianza" },
  houseOfCacti: { zh:"仙人掌小屋", en:"House of Cacti", ko:"선인장 오두막", de:"Haus der Kakteen", fr:"Maison des Cactus", pt:"Casa dos Cactos", tr:"Kaktüs Evi", id:"House of Cacti", ru:"Обитель кактусов", th:"อาณาจักรกระบองเพชร", ar:"بيت الصبار", es:"Casa de los cactus" },
  squadsAttack: { zh:"部隊攻擊力", en:"Squads' Attack", ko:"부대 공격력", de:"Schwadron Angriff", fr:"Attaque des escouades", pt:"Ataque dos Esquadrões", tr:"Ekiplerin Saldırısı", id:"Attack Skuad", ru:"Атака войск", th:"พลังโจมตีทีม", ar:"هجوم الفرق", es:"Ataque de los Escuadrones" },
  charmDesign: { zh:"寶石圖紙", en:"Charm Design", ko:"보석 도면", de:"Talismanpläne", fr:"Plans de Talisman", pt:"Design do Talismã", tr:"Tılsım Tasarımı", id:"Desain Charm", ru:"Чертеж талисмана", th:"แผนเครื่องราง", ar:"تصميم تميمة", es:"Planos de talismán" },
  masterEmblem: { zh:"大師徽記", en:"Master Emblems", ko:"거장 배지", de:"Meister-Embleme", fr:"emblèmes d'expert", pt:"Emblemas Mestres", tr:"Usta Amblemleri", ru:"эмблемы мастера", th:"ตรามาสเตอร์", ar:"شعارات المتخصصين", es:"emblemas de maestro" },
  nomadicMerchant: { zh:"流浪商人", en:"Nomadic Merchant", ko:"떠돌이 상인", de:"Nomaden Händler", fr:"Marchand Nomade", pt:"Comerciante Nômade", tr:"Göçebe Tüccar", id:"Pedagang Nomaden", ru:"Торговец-кочевник", th:"พ่อค้าพเนจร", ar:"تاجر بدوي", es:"Mercader nómade" },
  mysteryShop: { zh:"神秘商店", en:"Mystery Shop", ko:"신비한 상점", de:"Rätsel", fr:"Mystère", pt:"Mistério", tr:"Gizem", id:"Misteri", ru:"Тайный магазин", th:"ปริศนา", ar:"الغموض", es:"Misterio" },
  arenaShop: { zh:"競技商店", en:"Arena Shop", ko:"경기장 상점", de:"Arena", fr:"Arène", pt:"Arena", tr:"Arena", id:"Arena", ru:"Магазин арены", th:"อารีน่า", ar:"الساحة", es:"Arena" },
  vipShop: { zh:"VIP商店", en:"VIP Shop", ko:"VIP 상점", de:"VIP", fr:"VIP", pt:"VIP", tr:"VIP", id:"VIP", ru:"VIP-магазин", th:"VIP", ar:"VIP", es:"VIP" },
  championshipShop: { zh:"爭霸賽商店", en:"Alliance Championship Shop", ko:"챔피언십 상점", de:"Meisterschafts Laden", fr:"Magasin du Championnat de l'Alliance", pt:"Loja do Campeonato da Aliança", tr:"İttifak Şampiyonası Mağazası", id:"Tingkat Kejuaraan Aliansi", ru:"Магазин чемпионата альянса", th:"ร้านค้าการแข่งขันชิงแชมป์พันธมิตร", ar:"متجر بطولة التحالف", es:"Tienda de Campeonato de alianza" },
  swordlandShop: { zh:"聖劍商店", en:"Swordland Shop", ko:"성검 상점", de:"Schwertland", fr:"Glaive", pt:"Terra das Espadas", tr:"Kılıçdiyarı", id:"Swordland", ru:"Магазин Страны мечей", th:"ดินแดนดาบ", ar:"أرض السيوف", es:"Tierra de Espadas" },
  kopShop: { zh:"最強王國商店", en:"Kingdom of Power Shop", ko:"최강 왕국 상점", de:"Königreich der Macht", fr:"Royaume au Pouvoir", pt:"Reino de Poder", tr:"En Güçlü Krallık", id:"Kerajaan Kekuatan", ru:"Мощь государств", th:"อาณาจักรแห่งอำนาจ", ar:"مملكة القوة", es:"Reino del Poder" },
  skinShop: { zh:"裝扮商店", en:"Skin Shop", ko:"스킨 상점", de:"Verkleidung", fr:"Thème", pt:"Skin", tr:"Görünüm", id:"Skin", ru:"Магазин обликов", th:"สกิน", ar:"مظهر", es:"Apariencias" },
  trialShop: { zh:"試煉挑戰商店", en:"Trial Shop", ko:"시련 도전 상점", de:"Prüfungsladen", fr:"Magasin du Défi", pt:"Loja da Prova", tr:"İmtihan Mağazası", id:"Toko Ujian", ru:"Магазин испытания", th:"ร้านค้าบททดสอบ", ar:"متجر الاختبارات", es:"Tienda de Pruebas" },
  gemShop: { zh:"鑽石商店", en:"Gem Shop", ko:"다이아 상점", de:"Edelstein", fr:"Gemme", pt:"Gema", tr:"Elmas", id:"Gem", ru:"Магазин алмазов", th:"เพชร", ar:"الجوهرة", es:"Gemas" },
  allianceShop: { zh:"聯盟商店", en:"Alliance Shop", ko:"연맹 상점", de:"Laden", fr:"Magasin", pt:"Loja", tr:"Mağaza", id:"Toko", ru:"Магазин", th:"ร้านค้า", ar:"متجر", es:"Tienda" },
  mysticTrial: { zh:"秘境試煉", en:"Mystic Trial", ko:"신비한 시련", de:"Mystische Prüfung", fr:"Épreuve Mystique", pt:"Prova Mística", tr:"Mistik İmtihan", id:"Ujian Mistis", ru:"Волшебное испытание", th:"บททดสอบลี้ลับ", ar:"الاختبارات الغامضة", es:"Prueba Mística" },
  coliseum: { zh:"角鬥賽場", en:"Coliseum", ko:"결투장", de:"Kolosseum", fr:"Colisée", pt:"Coliseu", tr:"Kolezyum", id:"Koloseum", ru:"Колизей", th:"โคลอสเซียม", ar:"الكولوسيوم", es:"Coliseo" },
  forestOfLife: { zh:"生命森林", en:"Forest of Life", ko:"생명의 숲", de:"Wald des Lebens", fr:"Forêt de la Vie", pt:"Floresta da Vida", tr:"Yaşam Ormanı", id:"Alas Kehidupan", ru:"Лес жизни", th:"ป่าแห่งชีวิต", ar:"غابة الحياة", es:"Bosque de la Vida" },
  crystalCave: { zh:"水晶礦洞", en:"Crystal Cave", ko:"수정 광산", de:"Kristallhöhle", fr:"Grotte de Cristal", pt:"Caverna de Cristal", tr:"Kristal Mağara", id:"Gua Kristal", ru:"Кристальная пещера", th:"ถ้ำคริสตัล", ar:"كهف الكريستال", es:"Cueva de Cristal" },
  knowledgeNexus: { zh:"知識樞紐", en:"Knowledge Nexus", ko:"지식의 전당", de:"Wissensverbund", fr:"Nexus de la Connaissance", pt:"Nexo do Conhecimento", tr:"Bilgi Noktası", id:"Nexus Pengetahuan", ru:"Очаг знаний", th:"เน็กซัสความรู้", ar:"مركز المعرفة", es:"Nexo del Conocimiento" },
  moltenFort: { zh:"熔岩要塞", en:"Molten Fort", ko:"용암 요새", de:"Geschmolzenes Fort", fr:"Fort en Fusion", pt:"Forte Derretido", tr:"Erimiş Kale", id:"Benteng Lava", ru:"Раскалённый форт", th:"ป้อมเพลิงหลอม", ar:"الحصن المصهور", es:"Fuerte Fundido" },
  radiantSpire: { zh:"輝光尖塔", en:"Radiant Spire", ko:"빛나는 첨탑", de:"Strahlende Spitze", fr:"Flèche Éclatante", pt:"Pináculo Radiante", tr:"Parlayan Kule", id:"Menara Radiant", ru:"Блистающий шпиль", th:"เจดีย์ส่องสว่าง", ar:"برج الإشعاع", es:"Aguja Radiante" },
  trialExplorers: { zh:"試煉探險隊", en:"Trial Explorers", ko:"시련 탐험대", de:"Prüferkunder", fr:"Explorateurs de l'Épreuve", pt:"Exploradores de Prova", tr:"İmtihan Kaşifleri", id:"Penjelajah Ujian", ru:"исследователи испытаний", th:"นักสำรวจบททดสอบ", ar:"مستكشفو الاختبارات", es:"Exploradores de la Prueba" },
  pets: { zh:"寵物", en:"Pets", ko:"펫", de:"Begleittiere", fr:"Animaux", pt:"Mascotes", tr:"Pet", id:"Peliharaan", ru:"питомцы", th:"สัตว์เลี้ยง", ar:"الحيوانات الأليفة", es:"Mascotas" },
  petSkills: { zh:"寵物技能", en:"Pet Skills", ko:"펫 스킬", de:"Begleittierfähigkeiten", fr:"Compétences animalières", pt:"Habilidades dos Mascotes", tr:"Pet Yetenekleri", id:"Skill Peliharaan", ru:"навыки питомцев", th:"ทักษะของสัตว์เลี้ยง", ar:"مهارات الحيوانات الأليفة", es:"Habilidades de las Mascotas" },
  tech: { zh:"科技", en:"Tech", ko:"과학 기술", de:"Technologien", fr:"Techs", pt:"Tecnologia", tr:"Teknoloji", id:"Teknologi", ru:"технологии", th:"เทคโนโลยี", ar:"التقنية", es:"Tecnología" },
  truegoldTech: { zh:"黃金科技", en:"Truegold Tech", ko:"순금 과학 기술", de:"Echtgold-Technologie", fr:"Techs d'Or Véritable", pt:"Tecnologia Ouro Verdadeiro", tr:"Hasaltın Teknolojisi", ru:"аурумные технологии", th:"เทคโนโลยีทรูโกลด์", ar:"تقنية الذهب الحقيقي", es:"Tecnología de Oro Puro" },
  skins: { zh:"裝扮", en:"Skins", ko:"스킨", de:"Verkleidung", fr:"Thèmes", pt:"Visuais", tr:"Görünümler", ru:"облики", th:"สกิน", ar:"المظاهر", es:"Apariencias" },
  oasisIsland: { zh:"綠洲島", en:"Oasis Island", ko:"오아시스", de:"Oasen Insel", fr:"Île Oasis", pt:"Ilha Oásis", tr:"Vaha Adası", ru:"остров Оазиса", th:"เกาะโอเอซิส", ar:"جزيرة الواحة", es:"Isla del Oasis" },
  vipLevel: { zh:"VIP等級", en:"VIP level", ko:"VIP레벨", de:"VIP-Level", fr:"niveau VIP", pt:"nível VIP", tr:"VIP seviyesi", ru:"VIP-уровень", th:"เลเวล VIP", ar:"مستوى VIP", es:"nivel VIP" },
  warAcademy: { zh:"戰爭學院", en:"War Academy", ko:"전쟁 아카데미", de:"Kriegsakademie", fr:"Académie de Guerre", pt:"Academia de Guerra", tr:"Savaş Akademisi", id:"Akademi Perang", ru:"Военная академия", th:"วิทยาลัยสงคราม", ar:"أكاديمية الحرب", es:"Academia de Guerra" },
  raid: { zh:"關卡掃蕩", en:"Raid", ko:"스테이지 소탕", de:"Überfall", fr:"Pillage", pt:"Ataque", tr:"Yağmala", id:"Raid", ru:"Рейд", th:"บุกโจมตี", ar:"الغارة", es:"Asalto" },
};

const GUIDES = {
  "recent-events": {
    emoji: "📢",
    name: {
      en: "Recent Events", zh: "近期活動", ko: "최근 이벤트",
      de: "Aktuelle Events", fr: "Événements récents",
      pt: "Eventos Recentes", tr: "Son Etkinlikler",
      id: "Acara Terbaru", ru: "Последние события",
      th: "กิจกรรมล่าสุด", ar: "أحدث الفعاليات", es: "Eventos Recientes"
    },
    sections: {
      en: { title: "Recent Events", blocks: [
        { type: "guideLink", guide: "all-out" },
        { type: "guideLink", guide: "fishing-tournament" },
        { type: "guideLink", guide: "tri-alliance-clash" },
        { type: "guideLink", guide: "viking-vengeance" },
        { type: "guideLink", guide: "eternity-reach" },
        { type: "announcements" }
      ]},
      zh: { title: "近期活動", blocks: [
        { type: "guideLink", guide: "all-out" },
        { type: "guideLink", guide: "fishing-tournament" },
        { type: "guideLink", guide: "tri-alliance-clash" },
        { type: "guideLink", guide: "viking-vengeance" },
        { type: "guideLink", guide: "eternity-reach" },
        { type: "announcements" }
      ]},
      ko: { title: "최근 이벤트", blocks: [
        { type: "guideLink", guide: "all-out" },
        { type: "guideLink", guide: "fishing-tournament" },
        { type: "guideLink", guide: "tri-alliance-clash" },
        { type: "guideLink", guide: "viking-vengeance" },
        { type: "guideLink", guide: "eternity-reach" },
        { type: "announcements" }
      ]},
      de: { title: "Aktuelle Events", blocks: [
        { type: "guideLink", guide: "all-out" },
        { type: "guideLink", guide: "fishing-tournament" },
        { type: "guideLink", guide: "tri-alliance-clash" },
        { type: "guideLink", guide: "viking-vengeance" },
        { type: "guideLink", guide: "eternity-reach" },
        { type: "announcements" }
      ]},
      fr: { title: "Événements récents", blocks: [
        { type: "guideLink", guide: "all-out" },
        { type: "guideLink", guide: "fishing-tournament" },
        { type: "guideLink", guide: "tri-alliance-clash" },
        { type: "guideLink", guide: "viking-vengeance" },
        { type: "guideLink", guide: "eternity-reach" },
        { type: "announcements" }
      ]},
      pt: { title: "Eventos Recentes", blocks: [
        { type: "guideLink", guide: "all-out" },
        { type: "guideLink", guide: "fishing-tournament" },
        { type: "guideLink", guide: "tri-alliance-clash" },
        { type: "guideLink", guide: "viking-vengeance" },
        { type: "guideLink", guide: "eternity-reach" },
        { type: "announcements" }
      ]},
      es: { title: "Eventos Recientes", blocks: [
        { type: "guideLink", guide: "all-out" },
        { type: "guideLink", guide: "fishing-tournament" },
        { type: "guideLink", guide: "tri-alliance-clash" },
        { type: "guideLink", guide: "viking-vengeance" },
        { type: "guideLink", guide: "eternity-reach" },
        { type: "announcements" }
      ]},
      tr: { title: "Son Etkinlikler", blocks: [
        { type: "guideLink", guide: "all-out" },
        { type: "guideLink", guide: "fishing-tournament" },
        { type: "guideLink", guide: "tri-alliance-clash" },
        { type: "guideLink", guide: "viking-vengeance" },
        { type: "guideLink", guide: "eternity-reach" },
        { type: "announcements" }
      ]},
      id: { title: "Acara Terbaru", blocks: [
        { type: "guideLink", guide: "all-out" },
        { type: "guideLink", guide: "fishing-tournament" },
        { type: "guideLink", guide: "tri-alliance-clash" },
        { type: "guideLink", guide: "viking-vengeance" },
        { type: "guideLink", guide: "eternity-reach" },
        { type: "announcements" }
      ]},
      ru: { title: "Последние события", blocks: [
        { type: "guideLink", guide: "all-out" },
        { type: "guideLink", guide: "fishing-tournament" },
        { type: "guideLink", guide: "tri-alliance-clash" },
        { type: "guideLink", guide: "viking-vengeance" },
        { type: "guideLink", guide: "eternity-reach" },
        { type: "announcements" }
      ]},
      th: { title: "กิจกรรมล่าสุด", blocks: [
        { type: "guideLink", guide: "all-out" },
        { type: "guideLink", guide: "fishing-tournament" },
        { type: "guideLink", guide: "tri-alliance-clash" },
        { type: "guideLink", guide: "viking-vengeance" },
        { type: "guideLink", guide: "eternity-reach" },
        { type: "announcements" }
      ]},
      ar: { title: "أحدث الفعاليات", blocks: [
        { type: "guideLink", guide: "all-out" },
        { type: "guideLink", guide: "fishing-tournament" },
        { type: "guideLink", guide: "tri-alliance-clash" },
        { type: "guideLink", guide: "viking-vengeance" },
        { type: "guideLink", guide: "eternity-reach" },
        { type: "announcements" }
      ]}
    }
  },
  "viking-vengeance": {
    emoji: "🧯",
    name: {
      en: "Viking Vengeance", zh: "維京人的掠奪", ko: "바이킹의 약탈", de: "Wikinger-Rache", fr: "Vengeance Viking", pt: "Vingança Viking", es: "Venganza Vikinga", tr: "Viking İntikamı", id: "Viking Vengeance", ru: "Месть викингов", th: "การล้างแค้นของไวกิ้ง", ar: "انتقام الفايكنغ"
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
      es: {
        title: "Venganza Vikinga",
        blocks: [
          { type: "h", text: "CUÁNDO" },
          { type: "p", text: "Cada 2 semanas — dos sesiones de 30 minutos, el Día 1 y el Día 3. Programado por el liderazgo, generalmente cerca de los horarios de {bearHunt}." },
          { type: "h", text: "📌 PREPARACIÓN" },
          { type: "sub", text: "Vacía tu ciudad" },
          { type: "list", items: ["Envía **TODA** tu {infantry} y {cavalry} a reforzar a miembros de la alianza.", "Los arqueros extra pueden quedarse en casa — no roban puntos de refuerzo.", "Aunque vayas a estar desconectado durante el evento, ¡vacía tu ciudad antes! Aun así podrás ganar puntos, y le das a otros miembros la oportunidad de ganar puntos reforzándote."] },
          { type: "sub", text: "Deja a tus 3 mejores héroes en casa" },
          { type: "p", text: "Deja a tus 3 mejores héroes de Defensa/Ataque en tu Puesto de Guardia." },
          { type: "list", items: ["**F2P:** {jabel} / {howard} / {quinn}", "**P2W:** {amadeus} o {helga} / {jabel} / {saul}"] },
          { type: "sub", text: "NO CURES" },
          { type: "p", text: "Las tropas curadas vuelven a casa y pueden robar bajas/puntos a los miembros que te están reforzando." },
          { type: "sub", text: "Prioriza a los miembros activos" },
          { type: "p", text: "Refuerza primero a los miembros conectados. Las oleadas 7, 14 y 17 solo atacan a jugadores conectados." },
          { type: "h", text: "⚔️ REFORZAR ALIADOS" },
          { type: "p", text: "Usa tus héroes de participante de {bearHunt} en la posición 1 para maximizar los puntos de bajas." },
          { type: "p", text: "**Recomendados:** {chenko} / {amane} / {yeonwoo} / {amadeus}" },
          { type: "callout", text: "Evita héroes defensivos como {howard} o {gordon} en las marchas de refuerzo." },
          { type: "h", text: "🏛️ CUARTEL GENERAL — OLEADAS 10 Y 20" },
          { type: "p", text: "Las oleadas 10 y 20 atacan **SOLO** el Cuartel General. Los ataques a la ciudad se pausan durante estas oleadas." },
          { type: "p", text: "Después de que termine la oleada 9 / 19:" },
          { type: "list", items: ["Recupera **UNA** marcha fuerte.", "Envíala directamente al Cuartel General.", "Máximo 68K tropas por miembro.", "Usa {chenko} o {amadeus} en la posición 1, o tu héroe con mayor daño puro.", "Después de la oleada del Cuartel General, recupérala y vuelve a reforzar al miembro que se te asignó."] },
          { type: "callout", text: "⚠️ **IMPORTANTE:** Puedes reforzar el Cuartel General en la oleada 10 **O** la oleada 20 — **NO AMBAS.**" },
          { type: "p", text: "Coordínate con R4/R5 para que todos tengan su turno y llenemos el Cuartel General de forma eficiente." }
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
  "master-academy": {
    emoji: "🎓",
    name: { en: "Gen 3 Master Academy Guide", zh: "第3代大師學院指南", ko: "3세대 거장 아카데미 가이드", de: "Gen-3-Meisterakademie-Leitfaden", fr: "Guide de l'Académie des Experts (Gén 3)", pt: "Guia da Academia dos Mestres (Gen 3)", tr: "3. Nesil Usta Akademisi Rehberi", id: "Panduan Akademi Master Gen 3", ru: "Гайд по Университету мастеров (3-е поколение)", th: "คู่มือสถาบันมาสเตอร์รุ่นที่ 3", ar: "دليل أكاديمية المتخصصين (الجيل الثالث)", es: "Guía de la Academia de Maestros (Gen 3)" },
    sections: {
      en: { title: "Gen 3 Master Academy Guide", blocks: [
        { type: "h", text: "WHEN" },
        { type: "p", text: "Gen 3 arrives on Sep 28 and unlocks the {masterAcademy} at Town Center 25. Masters give permanent passive account buffs, extra resources and event rewards. They are separate from Heroes." },
        { type: "h", text: "HOW UNLOCKING WORKS" },
        { type: "list", items: [
          "{valora} is ALWAYS your first Master, discovered through normal {realmJourney}s.",
          "Do NOT spend {adventureSupply} on {valora} — the free {journeySupplies} (20 per day, refreshed at 00:00 UTC) will unlock her naturally.",
          "SAVE your {adventureSupply} for {pan} and Roman in the {lostlands} once they are discovered.",
          "A Master settles in your Town once you reach 1,000 Affinity."
        ] },
        { type: "h", text: "PRIORITY FOR F2P & LOW SPENDERS" },
        { type: "callout", text: "**{pan} ➔ {valora} ➔ Roman**" },
        { type: "sub", text: "1. {pan} — the economy Master (top priority)" },
        { type: "list", items: [
          "Push {pan} to **Lv. 60**.",
          "Talent: 5 {reserveChests} for every 120 minutes of gathering (up to 30 per day) — free {truegold}, {gems} and speedups.",
          "Skill 1 **{falconer}**: +8 {intelMission}s per day → lots of free daily {truegold}.",
          "Skill 4 **{waysAndMeans}**: +120 {mysteryBadge} from daily missions and +4 free {mysteryShop} refreshes → discounted {widget}s."
        ] },
        { type: "sub", text: "2. {valora} — Bear Hunt gear materials" },
        { type: "list", items: [
          "Get her to **Lv. 30** ({acquaintance} 3 / {casual} 1).",
          "Skill 2 **{leaderByExample}**: +5 × 100 {enhancementXp} per {bearHunt}.",
          "Skill 3 **{weaponObsession}**: +5 {forgehammer}s per {bearHunt}."
        ] },
        { type: "sub", text: "3. Roman — Arena passive" },
        { type: "list", items: [
          "Just unlock him (1,000 Affinity): his passive gives a 50% chance to drop Arena Chests ({heroShard}s & {forgehammer}s). No heavy {masterEmblem} investment needed early on."
        ] },
        { type: "h", text: "PRIORITY FOR WHALES & RALLY LEADERS" },
        { type: "callout", text: "**{valora} ➔ Roman ➔ {pan}**" },
        { type: "list", items: [
          "**{valora}**: max **{savageAdvantage}** and **{danceOfTheHunt}** for huge leaderboard scores.",
          "**{danceOfTheHunt}** (Skill 1): when you launch the {ragingBear} rally, the whole rally's squad capacity +30,000 per level (Lv.10: +300,000) — more members' troops fit in.",
          "**{savageAdvantage}** (Skill 4): your own march squad capacity when taking part in {bearHunt} +3,000 per level (Lv.10: +30,000).",
          "**Roman**: push for Arena battle stats, {arenaShop} discounts and extra token generation.",
          "**{pan}**: level him up second for passive {truegold}."
        ] },
        { type: "callout", text: "ℹ️ Skill 1 {danceOfTheHunt} raises the capacity of the whole rally you launch. Skill 4 {savageAdvantage} only raises your own squad — the rally's total capacity still depends on what the rally leader can open." }
      ]},
      zh: { title: "第3代大師學院指南", blocks: [
        { type: "h", text: "開放時間" },
        { type: "p", text: "第3代於 9/28 開放，城鎮中心 25 級解鎖{masterAcademy}。大師提供永久的帳號被動加成、額外資源和活動獎勵，和英雄是分開的系統。" },
        { type: "h", text: "解鎖方式" },
        { type: "list", items: [
          "第一位大師**一定是{valora}**，透過一般的{realmJourney}就會遇到。",
          "**不要**把{adventureSupply}用在{valora}身上——每天免費的{journeySupplies}（每日 20 個，UTC 00:00 恢復）就會自然解鎖她。",
          "把{adventureSupply}**存起來**，等發現{pan}和 Roman 後在{lostlands}使用。",
          "好感度達到 1,000，大師就會進駐城鎮。"
        ] },
        { type: "h", text: "無課與小課玩家的優先順序" },
        { type: "callout", text: "**{pan} ➔ {valora} ➔ Roman**" },
        { type: "sub", text: "1. {pan}——經濟型大師（最優先）" },
        { type: "list", items: [
          "把{pan}練到 **Lv. 60**。",
          "天賦：每採集 120 分鐘獲得 5 個{reserveChests}（每日上限 30）——免費的{truegold}、{gems}和加速。",
          "技能 1 **{falconer}**：每天多 8 個{intelMission}→ 每天大量免費{truegold}。",
          "技能 4 **{waysAndMeans}**：完成每日任務多得 120 個{mysteryBadge}，{mysteryShop}免費更新多 4 次 → 買折扣{widget}。"
        ] },
        { type: "sub", text: "2. {valora}——狩獵巨熊的裝備材料" },
        { type: "list", items: [
          "練到 **Lv. 30**（{acquaintance}3／{casual}1）。",
          "技能 2 **{leaderByExample}**：每次{bearHunt}多 5 個 100 點{enhancementXp}。",
          "技能 3 **{weaponObsession}**：每次{bearHunt}多 5 個{forgehammer}。"
        ] },
        { type: "sub", text: "3. Roman——競技場被動" },
        { type: "list", items: [
          "只要解鎖他（好感度 1,000）：被動有 50% 機率掉落競技場寶箱（{heroShard}和{forgehammer}）。前期不用大量投入{masterEmblem}。"
        ] },
        { type: "h", text: "大課與集結指揮的優先順序" },
        { type: "callout", text: "**{valora} ➔ Roman ➔ {pan}**" },
        { type: "list", items: [
          "**{valora}**：**{savageAdvantage}**和**{danceOfTheHunt}**練滿，衝排行榜高分。",
          "**{danceOfTheHunt}**（技能 1）：發動{ragingBear}集結時，整個集結的部隊容量上限每級 +30,000（10 級 +300,000），能讓更多盟友的部隊加入。",
          "**{savageAdvantage}**（技能 4）：參與{bearHunt}時，自己的出征部隊容量上限每級 +3,000（10 級 +30,000）。",
          "**Roman**：衝競技場戰鬥屬性、{arenaShop}折扣和額外代幣產出。",
          "**{pan}**：第二順位升級，拿被動{truegold}。"
        ] },
        { type: "callout", text: "ℹ️ 技能 1 {danceOfTheHunt}提升的是自己發動的整個集結容量；技能 4 {savageAdvantage}只增加自己的部隊，整體集結能裝多少還是看發動的人能開多少。" }
      ]},
      ko: { title: "3세대 거장 아카데미 가이드", blocks: [
        { type: "h", text: "일시" },
        { type: "p", text: "3세대는 9/28에 오픈되며, 도시 센터 25레벨에서 {masterAcademy}가 해제됩니다. 거장은 영구적인 계정 패시브 버프, 추가 자원, 이벤트 보상을 제공하며 영웅과는 별개입니다." },
        { type: "h", text: "해제 방법" },
        { type: "list", items: [
          "첫 번째 거장은 **항상 {valora}**이며, 일반 {realmJourney}에서 만납니다.",
          "{valora}에게 {adventureSupply}를 **쓰지 마세요** — 무료 {journeySupplies}(매일 20개, UTC 00:00 회복)로 자연스럽게 해제됩니다.",
          "{adventureSupply}는 {pan}과 Roman을 발견한 뒤 {lostlands}에서 쓰도록 **모아 두세요**.",
          "호감도 1,000에 도달하면 거장이 도시에 입주합니다."
        ] },
        { type: "h", text: "무과금·소과금 우선순위" },
        { type: "callout", text: "**{pan} ➔ {valora} ➔ Roman**" },
        { type: "sub", text: "1. {pan} — 경제형 거장 (최우선)" },
        { type: "list", items: [
          "{pan}을 **Lv. 60**까지 올리세요.",
          "재능: 채집 120분마다 {reserveChests} 5개 (하루 최대 30개) — 무료 {truegold}, {gems}, 가속.",
          "스킬 1 **{falconer}**: {intelMission} 하루 +8개 → 매일 많은 무료 {truegold}.",
          "스킬 4 **{waysAndMeans}**: 일일 임무 완료 시 {mysteryBadge} +120개, {mysteryShop} 무료 새로고침 +4회 → 할인 {widget} 구매."
        ] },
        { type: "sub", text: "2. {valora} — 베어 사냥 장비 재료" },
        { type: "list", items: [
          "**Lv. 30**까지 올리세요 ({acquaintance} 3 / {casual} 1).",
          "스킬 2 **{leaderByExample}**: {bearHunt}마다 100 {enhancementXp} 부품 +5개.",
          "스킬 3 **{weaponObsession}**: {bearHunt}마다 {forgehammer} +5개."
        ] },
        { type: "sub", text: "3. Roman — 경기장 패시브" },
        { type: "list", items: [
          "해제만 하세요 (호감도 1,000): 패시브로 50% 확률로 경기장 상자({heroShard}, {forgehammer})가 드롭됩니다. 초반에 {masterEmblem}을 많이 투자할 필요는 없습니다."
        ] },
        { type: "h", text: "고과금·집결장 우선순위" },
        { type: "callout", text: "**{valora} ➔ Roman ➔ {pan}**" },
        { type: "list", items: [
          "**{valora}**: **{savageAdvantage}**과 **{danceOfTheHunt}**을 최대로 올려 랭킹 점수를 크게 올리세요.",
          "**{danceOfTheHunt}** (스킬 1): {ragingBear} 집결을 발동하면 집결 전체의 부대 수용량이 레벨당 +30,000 (Lv.10: +300,000) — 더 많은 연맹원의 부대가 들어갈 수 있습니다.",
          "**{savageAdvantage}** (스킬 4): {bearHunt} 참여 시 자신의 출정 부대 수용량 레벨당 +3,000 (Lv.10: +30,000).",
          "**Roman**: 경기장 전투 속성, {arenaShop} 할인, 추가 토큰 획득 위주로.",
          "**{pan}**: 두 번째로 올려서 패시브 {truegold}를 챙기세요."
        ] },
        { type: "callout", text: "ℹ️ 스킬 1 {danceOfTheHunt}은 자신이 발동한 집결 전체의 수용량을 올립니다. 스킬 4 {savageAdvantage}은 자신의 부대만 늘리며, 집결 전체 수용량은 집결을 발동한 사람에 따라 정해집니다." }
      ]},
      de: { title: "Gen-3-Meisterakademie-Leitfaden", blocks: [
        { type: "h", text: "WANN" },
        { type: "p", text: "Gen 3 startet am 28.09. und schaltet die {masterAcademy} ab Stadtzentrum 25 frei. Meister geben dauerhafte passive Konto-Boni, zusätzliche Ressourcen und Event-Belohnungen. Sie sind unabhängig von den Helden." },
        { type: "h", text: "SO FUNKTIONIERT DAS FREISCHALTEN" },
        { type: "list", items: [
          "{valora} ist IMMER dein erster Meister und wird über die normale {realmJourney} entdeckt.",
          "Verwende KEINEN {adventureSupply} für {valora} — die kostenlosen {journeySupplies} (20 pro Tag, Reset um 00:00 UTC) schalten sie von selbst frei.",
          "SPARE deinen {adventureSupply} für {pan} und Roman in den {lostlands}, sobald sie entdeckt sind.",
          "Ab 1.000 Affinität lässt sich ein Meister in deiner Stadt nieder."
        ] },
        { type: "h", text: "PRIORITÄT FÜR F2P & WENIGZAHLER" },
        { type: "callout", text: "**{pan} ➔ {valora} ➔ Roman**" },
        { type: "sub", text: "1. {pan} — der Wirtschafts-Meister (höchste Priorität)" },
        { type: "list", items: [
          "Bring {pan} auf **Lv. 60**.",
          "Talent: 5 {reserveChests} pro 120 Minuten Sammeln (max. 30 pro Tag) — gratis {truegold}, {gems} und Beschleunigungen.",
          "Fertigkeit 1 **{falconer}**: +8 {intelMission}en pro Tag → viel kostenloses tägliches {truegold}.",
          "Fertigkeit 4 **{waysAndMeans}**: +120 {mysteryBadge} aus täglichen Missionen und +4 kostenlose Aktualisierungen im {mysteryShop}-Laden → vergünstigte {widget}e."
        ] },
        { type: "sub", text: "2. {valora} — Bärenjagd-Ausrüstungsmaterialien" },
        { type: "list", items: [
          "Bring sie auf **Lv. 30** ({acquaintance} 3 / {casual} 1).",
          "Fertigkeit 2 **{leaderByExample}**: +5 × 100 {enhancementXp} pro {bearHunt}.",
          "Fertigkeit 3 **{weaponObsession}**: +5 {forgehammer} pro {bearHunt}."
        ] },
        { type: "sub", text: "3. Roman — Arena-Passiv" },
        { type: "list", items: [
          "Nur freischalten (1.000 Affinität): Sein Passiv hat eine 50%-Chance, Arena-Truhen ({heroShard}e & {forgehammer}) fallen zu lassen. Früh ist keine große {masterEmblem}-Investition nötig."
        ] },
        { type: "h", text: "PRIORITÄT FÜR WALE & RALLY-ANFÜHRER" },
        { type: "callout", text: "**{valora} ➔ Roman ➔ {pan}**" },
        { type: "list", items: [
          "**{valora}**: **{savageAdvantage}** und **{danceOfTheHunt}** maximieren — für hohe Ranglistenpunkte.",
          "**{danceOfTheHunt}** (Fertigkeit 1): Wenn du den Rally gegen den {ragingBear} startest, steigt die Kapazität des gesamten Rallys um +30.000 pro Stufe (Stufe 10: +300.000) — mehr Truppen deiner Mitglieder passen hinein.",
          "**{savageAdvantage}** (Fertigkeit 4): Kapazität deiner eigenen Schwadron bei Teilnahme an der {bearHunt} +3.000 pro Stufe (Stufe 10: +30.000).",
          "**Roman**: auf Arena-Kampfwerte, Rabatte in der {arenaShop} und zusätzliche Token setzen.",
          "**{pan}**: als Zweites leveln für passives {truegold}."
        ] },
        { type: "callout", text: "ℹ️ Fertigkeit 1 {danceOfTheHunt} erhöht die Kapazität des gesamten Rallys, den du startest. Fertigkeit 4 {savageAdvantage} erhöht nur deine eigene Schwadron — wie viel der Rally insgesamt fasst, hängt vom Rally-Leiter ab." }
      ]},
      fr: { title: "Guide de l'Académie des Experts (Gén 3)", blocks: [
        { type: "h", text: "QUAND" },
        { type: "p", text: "La Gén 3 arrive le 28/09 et débloque l'{masterAcademy} au Centre niv. 25. Les experts donnent des bonus passifs permanents au compte, des ressources en plus et des récompenses d'événements. Ils sont distincts des héros." },
        { type: "h", text: "COMMENT LES DÉBLOQUER" },
        { type: "list", items: [
          "{valora} est TOUJOURS votre premier expert, découvert via le {realmJourney} normal.",
          "Ne dépensez PAS de {adventureSupply} pour {valora} — les {journeySupplies} gratuites (20 par jour, réinitialisées à 00:00 UTC) la débloquent naturellement.",
          "GARDEZ vos {adventureSupply} pour {pan} et Roman dans les {lostlands} une fois découverts.",
          "Un expert s'installe dans votre village à 1 000 d'affinité."
        ] },
        { type: "h", text: "PRIORITÉ POUR LES F2P & PETITS PAYEURS" },
        { type: "callout", text: "**{pan} ➔ {valora} ➔ Roman**" },
        { type: "sub", text: "1. {pan} — l'expert économie (priorité absolue)" },
        { type: "list", items: [
          "Montez {pan} au **niv. 60**.",
          "Talent : 5 {reserveChests} toutes les 120 min de collecte (max. 30 par jour) — {truegold}, {gems} et accélérateurs gratuits.",
          "Compétence 1 **{falconer}** : +8 {intelMission} par jour → beaucoup d'{truegold} gratuit chaque jour.",
          "Compétence 4 **{waysAndMeans}** : +120 {mysteryBadge} via les missions quotidiennes et +4 actualisations gratuites du magasin {mysteryShop} → {widget}s à prix réduit."
        ] },
        { type: "sub", text: "2. {valora} — matériaux d'équipement de la Chasse à l'Ours" },
        { type: "list", items: [
          "Montez-la au **niv. 30** ({acquaintance} 3 / {casual} 1).",
          "Compétence 2 **{leaderByExample}** : +5 × 100 {enhancementXp} par {bearHunt}.",
          "Compétence 3 **{weaponObsession}** : +5 {forgehammer}s par {bearHunt}."
        ] },
        { type: "sub", text: "3. Roman — passif d'Arène" },
        { type: "list", items: [
          "Débloquez-le simplement (1 000 d'affinité) : son passif a 50 % de chances de faire tomber des coffres d'Arène ({heroShard}s & {forgehammer}s). Pas besoin d'investir beaucoup d'{masterEmblem} au début."
        ] },
        { type: "h", text: "PRIORITÉ POUR LES GROS PAYEURS & LEADERS DE RALLIEMENT" },
        { type: "callout", text: "**{valora} ➔ Roman ➔ {pan}**" },
        { type: "list", items: [
          "**{valora}** : maximisez **{savageAdvantage}** et **{danceOfTheHunt}** pour de gros scores au classement.",
          "**{danceOfTheHunt}** (compétence 1) : quand vous lancez le ralliement contre l'{ragingBear}, la capacité de tout le ralliement augmente de +30 000 par niveau (niv. 10 : +300 000) — plus de troupes de vos membres peuvent y entrer.",
          "**{savageAdvantage}** (compétence 4) : capacité de votre propre escouade en participant à la {bearHunt} +3 000 par niveau (niv. 10 : +30 000).",
          "**Roman** : visez les stats de combat d'Arène, les réductions du {arenaShop} et la génération de jetons en plus.",
          "**{pan}** : à monter en second pour l'{truegold} passif."
        ] },
        { type: "callout", text: "ℹ️ La compétence 1 {danceOfTheHunt} augmente la capacité de tout le ralliement que vous lancez. La compétence 4 {savageAdvantage} n'augmente que votre propre escouade — la capacité totale du ralliement dépend de celui qui le lance." }
      ]},
      pt: { title: "Guia da Academia dos Mestres (Gen 3)", blocks: [
        { type: "h", text: "QUANDO" },
        { type: "p", text: "A Gen 3 chega em 28/09 e desbloqueia a {masterAcademy} no Centro da Cidade 25. Os Mestres dão bônus passivos permanentes à conta, recursos extras e recompensas de eventos. Eles são separados dos Heróis." },
        { type: "h", text: "COMO DESBLOQUEAR" },
        { type: "list", items: [
          "{valora} é SEMPRE o seu primeiro Mestre, encontrada na {realmJourney} normal.",
          "NÃO gaste {adventureSupply} com {valora} — os {journeySupplies} grátis (20 por dia, renovados às 00:00 UTC) a desbloqueiam naturalmente.",
          "GUARDE seus {adventureSupply} para {pan} e Roman nas {lostlands} depois de descobri-los.",
          "Um Mestre se estabelece na sua cidade com 1.000 de Afinidade."
        ] },
        { type: "h", text: "PRIORIDADE PARA F2P & QUEM GASTA POUCO" },
        { type: "callout", text: "**{pan} ➔ {valora} ➔ Roman**" },
        { type: "sub", text: "1. {pan} — o Mestre da economia (prioridade máxima)" },
        { type: "list", items: [
          "Leve {pan} ao **Nv. 60**.",
          "Talento: 5 {reserveChests} a cada 120 minutos de coleta (até 30 por dia) — {truegold}, {gems} e aceleradores grátis.",
          "Habilidade 1 **{falconer}**: +8 {intelMission} por dia → muito {truegold} grátis todo dia.",
          "Habilidade 4 **{waysAndMeans}**: +120 {mysteryBadge} nas missões diárias e +4 atualizações grátis na loja {mysteryShop} → {widget}s com desconto."
        ] },
        { type: "sub", text: "2. {valora} — materiais de equipamento da Caça ao Urso" },
        { type: "list", items: [
          "Leve-a ao **Nv. 30** ({acquaintance} 3 / {casual} 1).",
          "Habilidade 2 **{leaderByExample}**: +5 × 100 {enhancementXp} por {bearHunt}.",
          "Habilidade 3 **{weaponObsession}**: +5 {forgehammer}s por {bearHunt}."
        ] },
        { type: "sub", text: "3. Roman — passiva da Arena" },
        { type: "list", items: [
          "Só desbloqueie (1.000 de Afinidade): a passiva dele tem 50% de chance de dropar Baús da Arena ({heroShard}s e {forgehammer}s). Não precisa investir muito em {masterEmblem} no começo."
        ] },
        { type: "h", text: "PRIORIDADE PARA BALEIAS & LÍDERES DE RALLY" },
        { type: "callout", text: "**{valora} ➔ Roman ➔ {pan}**" },
        { type: "list", items: [
          "**{valora}**: maximize **{savageAdvantage}** e **{danceOfTheHunt}** para grandes pontuações no ranking.",
          "**{danceOfTheHunt}** (habilidade 1): ao iniciar o rally contra o {ragingBear}, a capacidade de todo o rally aumenta +30.000 por nível (Nv. 10: +300.000) — cabem mais tropas dos membros.",
          "**{savageAdvantage}** (habilidade 4): capacidade do seu próprio esquadrão ao participar da {bearHunt} +3.000 por nível (Nv. 10: +30.000).",
          "**Roman**: foque em atributos de batalha da Arena, descontos na {arenaShop} e geração extra de fichas.",
          "**{pan}**: suba em segundo para {truegold} passivo."
        ] },
        { type: "callout", text: "ℹ️ A habilidade 1 {danceOfTheHunt} aumenta a capacidade de todo o rally que você inicia. A habilidade 4 {savageAdvantage} só aumenta o seu próprio esquadrão — a capacidade total do rally depende de quem o inicia." }
      ]},
      tr: { title: "3. Nesil Usta Akademisi Rehberi", blocks: [
        { type: "h", text: "NE ZAMAN" },
        { type: "p", text: "3. Nesil 28 Eylül'de geliyor ve {masterAcademy} Şehir Merkezi 25'te açılıyor. Ustalar kalıcı pasif hesap bonusları, ekstra kaynak ve etkinlik ödülleri verir. Kahramanlardan ayrıdır." },
        { type: "h", text: "NASIL AÇILIR" },
        { type: "list", items: [
          "İlk Ustan HER ZAMAN {valora}'dır; normal {realmJourney} ile bulunur.",
          "{valora} için {adventureSupply} HARCAMA — ücretsiz {journeySupplies} (günde 20, UTC 00:00'da yenilenir) onu kendiliğinden açar.",
          "{adventureSupply}'ni {pan} ve Roman keşfedildiğinde {lostlands}'da kullanmak için SAKLA.",
          "1.000 Yakınlığa ulaşınca Usta şehrine yerleşir."
        ] },
        { type: "h", text: "F2P VE AZ HARCAYANLAR İÇİN ÖNCELİK" },
        { type: "callout", text: "**{pan} ➔ {valora} ➔ Roman**" },
        { type: "sub", text: "1. {pan} — ekonomi Ustası (en yüksek öncelik)" },
        { type: "list", items: [
          "{pan}'ı **Sv. 60**'a çıkar.",
          "Yetenek: her 120 dakikalık toplamada 5 {reserveChests} (günde en fazla 30) — ücretsiz {truegold}, {gems} ve hızlandırmalar.",
          "Yetenek 1 **{falconer}**: günde +8 {intelMission} → her gün bol ücretsiz {truegold}.",
          "Yetenek 4 **{waysAndMeans}**: günlük görevlerden +120 {mysteryBadge} ve {mysteryShop} mağazasında +4 ücretsiz yenileme → indirimli {widget}."
        ] },
        { type: "sub", text: "2. {valora} — Ayı Avı donanım malzemeleri" },
        { type: "list", items: [
          "Onu **Sv. 30**'a çıkar ({acquaintance} 3 / {casual} 1).",
          "Yetenek 2 **{leaderByExample}**: her {bearHunt} için +5 × 100 {enhancementXp}.",
          "Yetenek 3 **{weaponObsession}**: her {bearHunt} için +5 {forgehammer}."
        ] },
        { type: "sub", text: "3. Roman — Arena pasifi" },
        { type: "list", items: [
          "Sadece aç (1.000 Yakınlık): pasifi %50 ihtimalle Arena Sandığı ({heroShard} ve {forgehammer}) düşürür. Başta çok fazla {masterEmblem} yatırımı gerekmez."
        ] },
        { type: "h", text: "BALİNALAR VE SEFERBERLİK LİDERLERİ İÇİN ÖNCELİK" },
        { type: "callout", text: "**{valora} ➔ Roman ➔ {pan}**" },
        { type: "list", items: [
          "**{valora}**: **{savageAdvantage}** ve **{danceOfTheHunt}** yeteneklerini maksimuma çıkar, sıralamada yüksek puan al.",
          "**{danceOfTheHunt}** (Yetenek 1): {ragingBear} seferberliğini başlattığında tüm seferberliğin kapasitesi seviye başına +30.000 artar (Sv. 10: +300.000) — daha fazla üyenin askeri katılabilir.",
          "**{savageAdvantage}** (Yetenek 4): {bearHunt}'na katılırken kendi ekibinin kapasitesi seviye başına +3.000 (Sv. 10: +30.000).",
          "**Roman**: Arena savaş nitelikleri, {arenaShop} indirimleri ve ekstra jeton üretimine odaklan.",
          "**{pan}**: pasif {truegold} için ikinci sırada yükselt."
        ] },
        { type: "callout", text: "ℹ️ Yetenek 1 {danceOfTheHunt}, başlattığın seferberliğin toplam kapasitesini artırır. Yetenek 4 {savageAdvantage} sadece kendi ekibini artırır — seferberliğin toplam kapasitesi başlatan kişiye bağlıdır." }
      ]},
      id: { title: "Panduan Akademi Master Gen 3", blocks: [
        { type: "h", text: "KAPAN" },
        { type: "p", text: "Gen 3 hadir 28 Sep dan membuka {masterAcademy} di Pusat Kota 25. Master memberi buff pasif permanen untuk akun, sumber daya tambahan, dan hadiah event. Master terpisah dari Hero." },
        { type: "h", text: "CARA MEMBUKA" },
        { type: "list", items: [
          "{valora} SELALU menjadi Master pertamamu, ditemukan lewat {realmJourney} biasa.",
          "JANGAN pakai {adventureSupply} untuk {valora} — {journeySupplies} gratis (20 per hari, diperbarui 00:00 UTC) akan membukanya dengan sendirinya.",
          "SIMPAN {adventureSupply} untuk {pan} dan Roman di {lostlands} setelah mereka ditemukan.",
          "Master akan menetap di Kota setelah mencapai 1.000 Kedekatan."
        ] },
        { type: "h", text: "PRIORITAS F2P & LOW SPENDER" },
        { type: "callout", text: "**{pan} ➔ {valora} ➔ Roman**" },
        { type: "sub", text: "1. {pan} — Master ekonomi (prioritas utama)" },
        { type: "list", items: [
          "Naikkan {pan} ke **Lv. 60**.",
          "Talenta: 5 {reserveChests} setiap 120 menit mengumpulkan (maks. 30 per hari) — {truegold}, {gems}, dan speedup gratis.",
          "Skill 1 **{falconer}**: +8 {intelMission} per hari → banyak {truegold} gratis setiap hari.",
          "Skill 4 **{waysAndMeans}**: +120 {mysteryBadge} dari misi harian dan +4 refresh gratis di {mysteryShop} → {widget} diskon."
        ] },
        { type: "sub", text: "2. {valora} — material gear Bear Hunt" },
        { type: "list", items: [
          "Naikkan ke **Lv. 30**.",
          "Skill 2 **{leaderByExample}**: +5 × 100 {enhancementXp} per {bearHunt}.",
          "Skill 3 **{weaponObsession}**: +5 {forgehammer} per {bearHunt}."
        ] },
        { type: "sub", text: "3. Roman — pasif Arena" },
        { type: "list", items: [
          "Cukup buka (1.000 Kedekatan): pasifnya punya peluang 50% menjatuhkan Peti Arena ({heroShard} & {forgehammer}). Tidak perlu investasi {masterEmblem} besar di awal."
        ] },
        { type: "h", text: "PRIORITAS WHALE & PEMIMPIN RELI" },
        { type: "callout", text: "**{valora} ➔ Roman ➔ {pan}**" },
        { type: "list", items: [
          "**{valora}**: maksimalkan **{savageAdvantage}** dan **{danceOfTheHunt}** untuk skor leaderboard besar.",
          "**{danceOfTheHunt}** (Skill 1): saat kamu memulai reli {ragingBear}, kapasitas seluruh reli +30.000 per level (Lv.10: +300.000) — lebih banyak pasukan anggota bisa masuk.",
          "**{savageAdvantage}** (Skill 4): kapasitas skuadmu sendiri saat ikut {bearHunt} +3.000 per level (Lv.10: +30.000).",
          "**Roman**: fokus ke stat tempur Arena, diskon {arenaShop}, dan token tambahan.",
          "**{pan}**: naikkan di urutan kedua untuk {truegold} pasif."
        ] },
        { type: "callout", text: "ℹ️ Skill 1 {danceOfTheHunt} menaikkan kapasitas seluruh reli yang kamu mulai. Skill 4 {savageAdvantage} hanya menambah skuadmu sendiri — kapasitas total reli tetap tergantung pada pemimpin reli." }
      ]},
      ru: { title: "Гайд по Университету мастеров (3-е поколение)", blocks: [
        { type: "h", text: "КОГДА" },
        { type: "p", text: "3-е поколение выходит 28.09 и открывает {masterAcademy} на 25-м уровне центра города. Мастера дают постоянные пассивные бонусы аккаунту, дополнительные ресурсы и награды событий. Они не связаны с героями." },
        { type: "h", text: "КАК ОТКРЫТЬ" },
        { type: "list", items: [
          "Первый мастер — ВСЕГДА {valora}; её находят на обычной «{realmJourney}».",
          "НЕ тратьте {adventureSupply} на {valora} — бесплатные {journeySupplies} (20 в день, обновление в 00:00 UTC) откроют её сами.",
          "БЕРЕГИТЕ {adventureSupply} для {pan} и Роман в «{lostlands}», когда они будут найдены.",
          "При 1000 очк. сближения мастер поселится в городе."
        ] },
        { type: "h", text: "ПРИОРИТЕТ ДЛЯ F2P И МАЛОДОНАТНЫХ" },
        { type: "callout", text: "**{pan} ➔ {valora} ➔ Roman**" },
        { type: "sub", text: "1. {pan} — мастер экономики (главный приоритет)" },
        { type: "list", items: [
          "Прокачайте {pan} до **ур. 60**.",
          "Талант: 5 шт. «{reserveChests}» за каждые 120 мин сбора (до 30 в день) — бесплатные {truegold}, {gems} и ускорения.",
          "Навык 1 **{falconer}**: +8 миссий в день ({intelMission}) → много бесплатного {truegold} ежедневно.",
          "Навык 4 **{waysAndMeans}**: +120 {mysteryBadge} за ежедневные миссии и +4 бесплатных обновления ({mysteryShop}) → {widget} со скидкой."
        ] },
        { type: "sub", text: "2. {valora} — материалы снаряжения для охоты на медведя" },
        { type: "list", items: [
          "Прокачайте до **ур. 30** ({acquaintance} 3 / {casual} 1).",
          "Навык 2 **{leaderByExample}**: +5 × 100 ({enhancementXp}) за каждую «{bearHunt}».",
          "Навык 3 **{weaponObsession}**: +5 ({forgehammer}) за каждую «{bearHunt}»."
        ] },
        { type: "sub", text: "3. Roman — пассивка арены" },
        { type: "list", items: [
          "Просто откройте его (1000 очк. сближения): пассивка с шансом 50% даёт сундуки арены ({heroShard}, {forgehammer}). В начале не нужно много вкладывать в {masterEmblem}."
        ] },
        { type: "h", text: "ПРИОРИТЕТ ДЛЯ КИТОВ И ЛИДЕРОВ РЕЙДОВ" },
        { type: "callout", text: "**{valora} ➔ Roman ➔ {pan}**" },
        { type: "list", items: [
          "**{valora}**: максимально прокачайте **{savageAdvantage}** и **{danceOfTheHunt}** ради высоких мест в рейтинге.",
          "**{danceOfTheHunt}** (навык 1): когда вы запускаете рейд против {ragingBear}, вместимость всего рейда растёт на +30 000 за уровень (ур. 10: +300 000) — в рейд помещается больше войск союзников.",
          "**{savageAdvantage}** (навык 4): вместимость вашего собственного отряда при участии в «{bearHunt}» +3 000 за уровень (ур. 10: +30 000).",
          "**Roman**: боевые показатели арены, скидки ({arenaShop}) и дополнительные жетоны.",
          "**{pan}**: качайте вторым ради пассивного {truegold}."
        ] },
        { type: "callout", text: "ℹ️ Навык 1 {danceOfTheHunt} увеличивает вместимость всего рейда, который вы запускаете. Навык 4 {savageAdvantage} увеличивает только ваш отряд — общая вместимость рейда зависит от того, кто его запустил." }
      ]},
      th: { title: "คู่มือสถาบันมาสเตอร์รุ่นที่ 3", blocks: [
        { type: "h", text: "เมื่อไหร่" },
        { type: "p", text: "รุ่นที่ 3 มาวันที่ 28 ก.ย. และปลดล็อก{masterAcademy}ที่ศูนย์กลางเมืองเลเวล 25 มาสเตอร์ให้บัฟพาสซีฟถาวรกับบัญชี ทรัพยากรเพิ่ม และรางวัลกิจกรรม แยกจากฮีโร่" },
        { type: "h", text: "วิธีปลดล็อก" },
        { type: "list", items: [
          "มาสเตอร์คนแรก**เป็น{valora}เสมอ** เจอได้จาก{realmJourney}ปกติ",
          "**อย่า**ใช้{adventureSupply}กับ{valora} — {journeySupplies}ฟรี (วันละ 20 รีเฟรช 00:00 UTC) จะปลดล็อกเธอเอง",
          "**เก็บ**{adventureSupply}ไว้ใช้กับ{pan}และ Roman ใน{lostlands}เมื่อค้นพบแล้ว",
          "เมื่อค่าความสัมพันธ์ถึง 1,000 มาสเตอร์จะตั้งถิ่นฐานในเมือง"
        ] },
        { type: "h", text: "ลำดับสำหรับสายฟรีและสายเติมน้อย" },
        { type: "callout", text: "**{pan} ➔ {valora} ➔ Roman**" },
        { type: "sub", text: "1. {pan} — มาสเตอร์สายเศรษฐกิจ (สำคัญที่สุด)" },
        { type: "list", items: [
          "อัป{pan}ถึง **เลเวล 60**",
          "ความสามารถ: ได้{reserveChests} 5 ทุกการเก็บรวบรวม 120 นาที (สูงสุดวันละ 30) — {truegold} {gems} และเร่งสปีดฟรี",
          "ทักษะ 1 **{falconer}**: {intelMission}เพิ่มวันละ 8 → ได้{truegold}ฟรีทุกวันจำนวนมาก",
          "ทักษะ 4 **{waysAndMeans}**: ได้{mysteryBadge}เพิ่ม 120 จากภารกิจประจำวัน และรีเฟรช{mysteryShop}ฟรีเพิ่ม 4 ครั้ง → ซื้อ{widget}ลดราคา"
        ] },
        { type: "sub", text: "2. {valora} — วัตถุดิบอุปกรณ์จากล่าหมี" },
        { type: "list", items: [
          "อัปถึง **เลเวล 30** ({acquaintance} 3 / {casual} 1)",
          "ทักษะ 2 **{leaderByExample}**: {enhancementXp} x100 เพิ่ม 5 ต่อ{bearHunt}",
          "ทักษะ 3 **{weaponObsession}**: {forgehammer}เพิ่ม 5 ต่อ{bearHunt}"
        ] },
        { type: "sub", text: "3. Roman — พาสซีฟอารีน่า" },
        { type: "list", items: [
          "แค่ปลดล็อก (ค่าความสัมพันธ์ 1,000): พาสซีฟมีโอกาส 50% ดรอปหีบอารีน่า ({heroShard} และ{forgehammer}) ช่วงแรกไม่ต้องลง{masterEmblem}เยอะ"
        ] },
        { type: "h", text: "ลำดับสำหรับสายเติมหนักและผู้นำทีมระดมพล" },
        { type: "callout", text: "**{valora} ➔ Roman ➔ {pan}**" },
        { type: "list", items: [
          "**{valora}**: อัป **{savageAdvantage}** และ **{danceOfTheHunt}** ให้เต็ม เพื่อคะแนนอันดับสูง",
          "**{danceOfTheHunt}** (ทักษะ 1): เมื่อเปิดระดมพล{ragingBear} ความจุของทั้งระดมพล +30,000 ต่อเลเวล (Lv.10: +300,000) ทำให้ทหารของสมาชิกเข้าร่วมได้มากขึ้น",
          "**{savageAdvantage}** (ทักษะ 4): ความจุทีมของตัวเองเมื่อเข้าร่วม{bearHunt} +3,000 ต่อเลเวล (Lv.10: +30,000)",
          "**Roman**: เน้นค่าสถานะการต่อสู้อารีน่า ส่วนลด{arenaShop} และโทเค็นเพิ่ม",
          "**{pan}**: อัปเป็นอันดับสองเพื่อ{truegold}แบบพาสซีฟ"
        ] },
        { type: "callout", text: "ℹ️ ทักษะ 1 {danceOfTheHunt} เพิ่มความจุของทั้งระดมพลที่คุณเปิด ส่วนทักษะ 4 {savageAdvantage} เพิ่มแค่ทีมของตัวเอง ความจุรวมของระดมพลยังขึ้นกับคนที่เปิดระดมพล" }
      ]},
      ar: { title: "دليل أكاديمية المتخصصين (الجيل الثالث)", blocks: [
        { type: "h", text: "متى" },
        { type: "p", text: "يصل الجيل الثالث في 28/9 ويفتح {masterAcademy} عند مركز البلدة 25. يمنح المتخصصون تعزيزات سلبية دائمة للحساب وموارد إضافية ومكافآت فعاليات، وهم منفصلون عن الأبطال." },
        { type: "h", text: "طريقة الفتح" },
        { type: "list", items: [
          "أول متخصص هو **دائمًا {valora}**، وتجدها عبر {realmJourney} العادية.",
          "**لا** تنفق {adventureSupply} على {valora} — {journeySupplies} المجانية (20 يوميًا، تتجدد 00:00 UTC) ستفتحها تلقائيًا.",
          "**ادّخر** {adventureSupply} لـ{pan} و Roman في {lostlands} بعد اكتشافهما.",
          "عند الوصول إلى 1000 تقارب، سيستقر المتخصص في البلدة."
        ] },
        { type: "h", text: "الأولوية للاعبين المجانيين وقليلي الإنفاق" },
        { type: "callout", text: "**{pan} ← {valora} ← Roman**" },
        { type: "sub", text: "1. {pan} — متخصص الاقتصاد (الأولوية القصوى)" },
        { type: "list", items: [
          "ارفع {pan} إلى **المستوى 60**.",
          "المواهب: 5 من {reserveChests} لكل 120 دقيقة جمع (حتى 30 يوميًا) — {truegold} و{gems} وتسريعات مجانية.",
          "المهارة 1 **{falconer}**: +8 من {intelMission} يوميًا ← الكثير من {truegold} المجاني يوميًا.",
          "المهارة 4 **{waysAndMeans}**: +120 من {mysteryBadge} من المهام اليومية و+4 تحديثات مجانية في متجر {mysteryShop} ← {widget} بخصم."
        ] },
        { type: "sub", text: "2. {valora} — مواد عتاد صيد الدببة" },
        { type: "list", items: [
          "ارفعها إلى **المستوى 30** ({acquaintance} 3 / {casual} 1).",
          "المهارة 2 **{leaderByExample}**: +5 × 100 من {enhancementXp} لكل {bearHunt}.",
          "المهارة 3 **{weaponObsession}**: +5 من {forgehammer} لكل {bearHunt}."
        ] },
        { type: "sub", text: "3. Roman — مهارة الساحة السلبية" },
        { type: "list", items: [
          "افتحه فقط (1000 تقارب): مهارته السلبية تمنح فرصة 50% لإسقاط صناديق الساحة ({heroShard} و{forgehammer}). لا حاجة لاستثمار كبير في {masterEmblem} في البداية."
        ] },
        { type: "h", text: "الأولوية لكبار المنفقين وقادة الحشد" },
        { type: "callout", text: "**{valora} ← Roman ← {pan}**" },
        { type: "list", items: [
          "**{valora}**: ارفع **{savageAdvantage}** و**{danceOfTheHunt}** للحد الأقصى لتحقيق نقاط عالية في التصنيف.",
          "**{danceOfTheHunt}** (المهارة 1): عند إطلاق حشد {ragingBear} تزيد سعة الحشد بالكامل +30,000 لكل مستوى (المستوى 10: +300,000)، فتتسع لقوات أكثر من الأعضاء.",
          "**{savageAdvantage}** (المهارة 4): سعة فرقتك الخاصة عند المشاركة في {bearHunt} +3,000 لكل مستوى (المستوى 10: +30,000).",
          "**Roman**: ركّز على سمات قتال الساحة وخصومات {arenaShop} وتوليد رموز إضافية.",
          "**{pan}**: ارفعه ثانيًا للحصول على {truegold} سلبيًا."
        ] },
        { type: "callout", text: "ℹ️ المهارة 1 {danceOfTheHunt} تزيد سعة الحشد بالكامل الذي تطلقه. المهارة 4 {savageAdvantage} تزيد فرقتك فقط، أما السعة الإجمالية للحشد فتعتمد على من أطلقه." }
      ]},
      es: { title: "Guía de la Academia de Maestros (Gen 3)", blocks: [
        { type: "h", text: "CUÁNDO" },
        { type: "p", text: "La Gen 3 llega el 28/09 y desbloquea la {masterAcademy} con el Centro de pueblo 25. Los maestros dan bonificaciones pasivas permanentes a la cuenta, recursos extra y recompensas de eventos. Son independientes de los héroes." },
        { type: "h", text: "CÓMO SE DESBLOQUEAN" },
        { type: "list", items: [
          "{valora} es SIEMPRE tu primer maestro; aparece en la {realmJourney} normal.",
          "NO gastes {adventureSupply} en {valora}: los {journeySupplies} gratis (20 al día, se renuevan a las 00:00 UTC) la desbloquean de forma natural.",
          "GUARDA tus {adventureSupply} para {pan} y Roman en las {lostlands} cuando los descubras.",
          "Con 1000 de Afinidad, el maestro se establece en tu colonia."
        ] },
        { type: "h", text: "PRIORIDAD PARA F2P Y QUIEN GASTA POCO" },
        { type: "callout", text: "**{pan} ➔ {valora} ➔ Roman**" },
        { type: "sub", text: "1. {pan} — el maestro de la economía (máxima prioridad)" },
        { type: "list", items: [
          "Sube a {pan} al **Nv. 60**.",
          "Talento: 5 {reserveChests} por cada 120 minutos de recolección (hasta 30 al día): {truegold}, {gems} y aceleradores gratis.",
          "Habilidad 1 **{falconer}**: +8 {intelMission} al día → mucha {truegold} gratis a diario.",
          "Habilidad 4 **{waysAndMeans}**: +120 {mysteryBadge} al completar misiones diarias y +4 actualizaciones gratis en la tienda {mysteryShop} → {widget}s con descuento."
        ] },
        { type: "sub", text: "2. {valora} — materiales de equipo de la Cacería del Oso" },
        { type: "list", items: [
          "Súbela al **Nv. 30** ({acquaintance} 3 / {casual} 1).",
          "Habilidad 2 **{leaderByExample}**: +5 × 100 {enhancementXp} por {bearHunt}.",
          "Habilidad 3 **{weaponObsession}**: +5 {forgehammer}s por {bearHunt}."
        ] },
        { type: "sub", text: "3. Roman — pasiva de Arena" },
        { type: "list", items: [
          "Solo desbloquéalo (1000 de Afinidad): su pasiva tiene un 50% de probabilidad de soltar cofres de Arena ({heroShard}s y {forgehammer}s). Al principio no hace falta invertir mucho en {masterEmblem}."
        ] },
        { type: "h", text: "PRIORIDAD PARA BALLENAS Y LÍDERES DE ATAQUE CONJUNTO" },
        { type: "callout", text: "**{valora} ➔ Roman ➔ {pan}**" },
        { type: "list", items: [
          "**{valora}**: maximiza **{savageAdvantage}** y **{danceOfTheHunt}** para grandes puntuaciones en la clasificación.",
          "**{danceOfTheHunt}** (habilidad 1): al iniciar el ataque conjunto contra el {ragingBear}, la capacidad de todo el ataque aumenta +30.000 por nivel (Nv. 10: +300.000) — caben más tropas de los miembros.",
          "**{savageAdvantage}** (habilidad 4): capacidad de tu propio escuadrón al participar en la {bearHunt} +3.000 por nivel (Nv. 10: +30.000).",
          "**Roman**: prioriza atributos de combate de Arena, descuentos de la {arenaShop} y fichas extra.",
          "**{pan}**: súbelo en segundo lugar para {truegold} pasiva."
        ] },
        { type: "callout", text: "ℹ️ La habilidad 1 {danceOfTheHunt} aumenta la capacidad de todo el ataque conjunto que inicias. La habilidad 4 {savageAdvantage} solo aumenta tu propio escuadrón; la capacidad total del ataque depende de quien lo inicia." }
      ]}
    }
  },
  "general-tips": {
    emoji: "🔍",
    name: { en: "General Tips", zh: "通用小技巧", ko: "일반 팁", de: "Allgemeine Tipps", fr: "Conseils Généraux", pt: "Dicas Gerais", tr: "Genel İpuçları", id: "Tips Umum", ru: "Общие советы", th: "เคล็ดลับทั่วไป", ar: "نصائح عامة", es: "Consejos Generales" },
    sections: {
      en: { title: "General Tips", blocks: [
        { type: "h", text: "🔗 RESOURCES" },
        { type: "sub", text: "🗓️ KINGDOM TIMELINE" },
        { type: "p", text: "https://kingshotoptimizer.com/kingdom-timeline/2189" },
        { type: "p", text: "See what's coming next so you can plan events, upgrades and resources ahead of time." },
        { type: "sub", text: "⚔️ HERO GEAR OPTIMIZER" },
        { type: "p", text: "https://kingshotoptimizer.com/hero-gear" },
        { type: "p", text: "Plan your {heroGear} upgrades and avoid wasting valuable materials." },
        { type: "sub", text: "🎥 YOUTUBE – STRAT GAME SLOTH" },
        { type: "p", text: "https://www.youtube.com/watch?v=NMrS3MTSFUU" },
        { type: "p", text: "Recommended strategy videos, gameplay tips and progression advice." },
        { type: "h", text: "🛒 IN-GAME SHOPS" },
        { type: "p", text: "What to prioritize for the best value from each shop." },
        { type: "sub", text: "🐪 {nomadicMerchant}" },
        { type: "list", items: [
          "{teleporterAdv} for resources / free",
          "Favourable resource trades",
          "Discounted {vipXp}"
        ] },
        { type: "sub", text: "🎲 {mysteryShop}" },
        { type: "list", items: [
          "Free daily refresh",
          "{widgetChest} at 50% OFF",
          "20% OFF only if urgently needed"
        ] },
        { type: "sub", text: "🏟️ {arenaShop}" },
        { type: "list", items: [
          "{customMythicGearChest} weekly → {mithril} once the Mythic Gear foundation of your main heroes is done"
        ] },
        { type: "sub", text: "👑 {vipShop}" },
        { type: "list", items: [
          "Spend {gems} selectively on discounts: {teleporterAdv} • 100 {enhancementXp} • {forgehammer}"
        ] },
        { type: "sub", text: "🏆 {championshipShop}" },
        { type: "list", items: [
          "**Before {masters}:** {artisansVision} • {gildedThreads} / {satin} as needed",
          "**After {masters}:** {masterEmblem} are the #1 priority — late game, save tokens for these"
        ] },
        { type: "sub", text: "⚔️ {swordlandShop}" },
        { type: "list", items: [
          "{artisansVision} → then whatever is your bottleneck: {governorCharm} / {governorGear} materials • {forgehammer}"
        ] },
        { type: "sub", text: "🏰 {kopShop}" },
        { type: "list", items: [
          "**{truegold}** — a major long-term progression bottleneck"
        ] },
        { type: "sub", text: "🎨 {skinShop}" },
        { type: "list", items: [
          "Prioritize permanent stat bonuses, e.g. {houseOfCacti}: +2% {squadsAttack}"
        ] },
        { type: "sub", text: "🧪 {trialShop}" },
        { type: "list", items: [
          "**Before {truegoldDust}:** SAVE your {trialCrystal}",
          "**After:** {truegoldDust} → {mithril} → {enhancementXp} → {charmDesign}"
        ] },
        { type: "sub", text: "💎 {gemShop}" },
        { type: "p", text: "Only spend {gems} on important progression breakpoints or hard-to-get materials." },
        { type: "callout", text: "**When in doubt: SAVE YOUR GEMS.** See the Gem Spending Guide below." },
        { type: "sub", text: "🤝 {allianceShop}" },
        { type: "list", items: [
          "{transferPass} • {vipXp} • Pet food / materials • {teleporterAdv} • Useful 70% discounts • Speedups only with excess {allianceToken}"
        ] },
        { type: "h", text: "💎 GEM SPENDING GUIDE" },
        { type: "p", text: "Save your {gems} for:" },
        { type: "list", items: [
          "**1) 🎡 {heroRoulette}** → ~162,000 {gems} for 120 spins",
          "**2) 👑 VIP activation** → 10,000 {gems}/month (from VIP 4)"
        ] },
        { type: "callout", text: "🏛️ {hallOfHeroes} → ~13,500–14,850 {gems}, **ONLY if {marlin} is not unlocked yet.** Stop once unlocked — after that, general shards are better value for upgrades." },
        { type: "h", text: "✅ DAILY CHECKLIST" },
        { type: "sub", text: "☀️ WHILE ONLINE" },
        { type: "list", items: [
          "☐ 🎁 Collect the VIP chest + use {vipXp}",
          "☐ 🤝 Alliance {allianceHelp} + contribute to Alliance {allianceTech}",
          "☐ 📊 Use Hero XP items",
          "☐ ⚔️ Conquer camps ({conquerorsCamp})",
          "☐ 🔎 Complete {intelMission}s",
          "☐ 🏝️ Collect {waterEssence} on the island + assist allies",
          "☐ 🔮 Use your {mysticTrial} attempts",
          "☐ 📋 Complete {dailyMissions} missions",
          "☐ 🏟️ Do {arenaOfGlory} 3 minutes before reset",
          "☐ 🐻 {bearHunt} — every other day + update formations",
          "☐ 📅 Register for and join active events"
        ] },
        { type: "sub", text: "🌙 BEFORE LOGGING OFF" },
        { type: "list", items: [
          "☐ 🐉 Send pets on {petAdventure}",
          "☐ 🌾 Send {gathering} marches",
          "☐ ⚔️ Keep troop {training} running",
          "☐ 🔬 Keep {research} / {construction} running as needed"
        ] }
      ]},
      zh: { title: "通用小技巧", blocks: [
        { type: "h", text: "🔗 實用資源" },
        { type: "sub", text: "🗓️ 王國時間軸" },
        { type: "p", text: "https://kingshotoptimizer.com/kingdom-timeline/2189" },
        { type: "p", text: "查看接下來的時程，提前規劃活動、升級與資源。" },
        { type: "sub", text: "⚔️ 英雄裝備規劃工具" },
        { type: "p", text: "https://kingshotoptimizer.com/hero-gear" },
        { type: "p", text: "規劃{heroGear}升級，避免浪費珍貴材料。" },
        { type: "sub", text: "🎥 YOUTUBE – STRAT GAME SLOTH" },
        { type: "p", text: "https://www.youtube.com/watch?v=NMrS3MTSFUU" },
        { type: "p", text: "推薦的攻略影片、遊戲技巧與養成建議。" },
        { type: "h", text: "🛒 遊戲內商店" },
        { type: "p", text: "各商店優先購買什麼最划算。" },
        { type: "sub", text: "🐪 {nomadicMerchant}" },
        { type: "list", items: [
          "{teleporterAdv}（用資源購買／免費）",
          "划算的資源交換",
          "折扣{vipXp}"
        ] },
        { type: "sub", text: "🎲 {mysteryShop}" },
        { type: "list", items: [
          "每日免費更新",
          "{widgetChest} 5折時購買",
          "8折只在急需時才買"
        ] },
        { type: "sub", text: "🏟️ {arenaShop}" },
        { type: "list", items: [
          "每週買{customMythicGearChest} → 主力英雄的傳說裝備基礎完成後改買{mithril}"
        ] },
        { type: "sub", text: "👑 {vipShop}" },
        { type: "list", items: [
          "{gems}只挑折扣商品買：{teleporterAdv} • 100 {enhancementXp} • {forgehammer}"
        ] },
        { type: "sub", text: "🏆 {championshipShop}" },
        { type: "list", items: [
          "**{masters}前：** {artisansVision} • 視需要買{gildedThreads}／{satin}",
          "**{masters}後：** {masterEmblem}是第一優先 — 後期請把代幣留給它"
        ] },
        { type: "sub", text: "⚔️ {swordlandShop}" },
        { type: "list", items: [
          "{artisansVision} → 接著買你的瓶頸材料：{governorCharm}／{governorGear}材料 • {forgehammer}"
        ] },
        { type: "sub", text: "🏰 {kopShop}" },
        { type: "list", items: [
          "**{truegold}** — 長期養成的主要瓶頸"
        ] },
        { type: "sub", text: "🎨 {skinShop}" },
        { type: "list", items: [
          "優先買有永久屬性加成的，例如{houseOfCacti}：{squadsAttack} +2%"
        ] },
        { type: "sub", text: "🧪 {trialShop}" },
        { type: "list", items: [
          "**解鎖{truegoldDust}前：** 先存{trialCrystal}",
          "**之後：** {truegoldDust} → {mithril} → {enhancementXp} → {charmDesign}"
        ] },
        { type: "sub", text: "💎 {gemShop}" },
        { type: "p", text: "只在重要的養成關卡或難取得的材料上使用{gems}。" },
        { type: "callout", text: "**拿不定主意時：先存鑽石。** 請看下方的鑽石使用指南。" },
        { type: "sub", text: "🤝 {allianceShop}" },
        { type: "list", items: [
          "{transferPass} • {vipXp} • 寵物食物／材料 • {teleporterAdv} • 實用的3折商品 • {allianceToken}有剩時才買加速"
        ] },
        { type: "h", text: "💎 鑽石使用指南" },
        { type: "p", text: "把{gems}留給：" },
        { type: "list", items: [
          "**1) 🎡 {heroRoulette}** → 約162,000{gems}可轉120次",
          "**2) 👑 VIP啟用** → 每月10,000{gems}（VIP 4以上）"
        ] },
        { type: "callout", text: "🏛️ {hallOfHeroes} → 約13,500–14,850{gems}，**只在還沒解鎖{marlin}時才買。** 解鎖後就停，之後用通用碎片升級更划算。" },
        { type: "h", text: "✅ 每日清單" },
        { type: "sub", text: "☀️ 上線時" },
        { type: "list", items: [
          "☐ 🎁 領取VIP寶箱＋使用{vipXp}",
          "☐ 🤝 {allianceHelp}＋{allianceTech}捐獻",
          "☐ 📊 使用英雄經驗道具",
          "☐ ⚔️ 派兵討伐（{conquerorsCamp}）",
          "☐ 🔎 完成{intelMission}",
          "☐ 🏝️ 收集島上的{waterEssence}＋協助盟友",
          "☐ 🔮 用完{mysticTrial}的次數",
          "☐ 📋 完成{dailyMissions}",
          "☐ 🏟️ 在重置前3分鐘打{arenaOfGlory}",
          "☐ 🐻 {bearHunt} — 每兩天一次＋更新部隊編組",
          "☐ 📅 報名並參加進行中的活動"
        ] },
        { type: "sub", text: "🌙 下線前" },
        { type: "list", items: [
          "☐ 🐉 派寵物去{petAdventure}",
          "☐ 🌾 派出{gathering}部隊",
          "☐ ⚔️ 保持部隊{training}不中斷",
          "☐ 🔬 視需要保持{research}／{construction}進行中"
        ] }
      ]},
      ko: { title: "일반 팁", blocks: [
        { type: "h", text: "🔗 유용한 자료" },
        { type: "sub", text: "🗓️ 왕국 타임라인" },
        { type: "p", text: "https://kingshotoptimizer.com/kingdom-timeline/2189" },
        { type: "p", text: "다음 일정을 확인하고 이벤트, 업그레이드, 자원을 미리 계획하세요." },
        { type: "sub", text: "⚔️ 영웅 장비 최적화 도구" },
        { type: "p", text: "https://kingshotoptimizer.com/hero-gear" },
        { type: "p", text: "{heroGear} 업그레이드를 계획하고 귀중한 재료 낭비를 막으세요." },
        { type: "sub", text: "🎥 YOUTUBE – STRAT GAME SLOTH" },
        { type: "p", text: "https://www.youtube.com/watch?v=NMrS3MTSFUU" },
        { type: "p", text: "추천 공략 영상, 게임 팁, 성장 조언." },
        { type: "h", text: "🛒 게임 내 상점" },
        { type: "p", text: "각 상점에서 가장 가성비 좋은 우선 구매 항목." },
        { type: "sub", text: "🐪 {nomadicMerchant}" },
        { type: "list", items: [
          "{teleporterAdv} (자원 구매/무료)",
          "유리한 자원 교환",
          "할인된 {vipXp}"
        ] },
        { type: "sub", text: "🎲 {mysteryShop}" },
        { type: "list", items: [
          "매일 무료 새로고침",
          "{widgetChest} 50% 할인 시 구매",
          "20% 할인은 급할 때만"
        ] },
        { type: "sub", text: "🏟️ {arenaShop}" },
        { type: "list", items: [
          "매주 {customMythicGearChest} → 주력 영웅의 레전드 장비 기반이 완성되면 {mithril}"
        ] },
        { type: "sub", text: "👑 {vipShop}" },
        { type: "list", items: [
          "{gems}는 할인 상품에만 골라서: {teleporterAdv} • 100 {enhancementXp} • {forgehammer}"
        ] },
        { type: "sub", text: "🏆 {championshipShop}" },
        { type: "list", items: [
          "**{masters} 이전:** {artisansVision} • 필요에 따라 {gildedThreads} / {satin}",
          "**{masters} 이후:** {masterEmblem}이 최우선 — 후반에는 토큰을 여기에 모으세요"
        ] },
        { type: "sub", text: "⚔️ {swordlandShop}" },
        { type: "list", items: [
          "{artisansVision} → 이후 병목이 되는 재료: {governorCharm} / {governorGear} 재료 • {forgehammer}"
        ] },
        { type: "sub", text: "🏰 {kopShop}" },
        { type: "list", items: [
          "**{truegold}** — 장기 성장의 주요 병목"
        ] },
        { type: "sub", text: "🎨 {skinShop}" },
        { type: "list", items: [
          "영구 속성 버프를 우선하세요. 예: {houseOfCacti}: {squadsAttack} +2%"
        ] },
        { type: "sub", text: "🧪 {trialShop}" },
        { type: "list", items: [
          "**{truegoldDust} 이전:** {trialCrystal}을 모으세요",
          "**이후:** {truegoldDust} → {mithril} → {enhancementXp} → {charmDesign}"
        ] },
        { type: "sub", text: "💎 {gemShop}" },
        { type: "p", text: "{gems}는 중요한 성장 구간이나 구하기 어려운 재료에만 쓰세요." },
        { type: "callout", text: "**고민될 때는 다이아를 아끼세요.** 아래 다이아 사용 가이드를 참고하세요." },
        { type: "sub", text: "🤝 {allianceShop}" },
        { type: "list", items: [
          "{transferPass} • {vipXp} • 펫 먹이/재료 • {teleporterAdv} • 유용한 70% 할인 • 가속은 {allianceToken}이 남을 때만"
        ] },
        { type: "h", text: "💎 다이아 사용 가이드" },
        { type: "p", text: "{gems}는 여기에 아끼세요:" },
        { type: "list", items: [
          "**1) 🎡 {heroRoulette}** → 120회에 약 162,000 {gems}",
          "**2) 👑 VIP 활성화** → 매월 10,000 {gems} (VIP 4 이상)"
        ] },
        { type: "callout", text: "🏛️ {hallOfHeroes} → 약 13,500–14,850 {gems}, **{marlin}을 아직 해제하지 않았을 때만.** 해제 후에는 멈추세요 — 그 뒤로는 공용 파편이 더 효율적입니다." },
        { type: "h", text: "✅ 일일 체크리스트" },
        { type: "sub", text: "☀️ 접속 중" },
        { type: "list", items: [
          "☐ 🎁 VIP 상자 받기 + {vipXp} 사용",
          "☐ 🤝 {allianceHelp} + {allianceTech} 기부",
          "☐ 📊 영웅 경험치 아이템 사용",
          "☐ ⚔️ 토벌 보내기 ({conquerorsCamp})",
          "☐ 🔎 {intelMission} 완료",
          "☐ 🏝️ 섬의 {waterEssence} 수집 + 연맹원 돕기",
          "☐ 🔮 {mysticTrial} 도전 횟수 사용",
          "☐ 📋 {dailyMissions} 완료",
          "☐ 🏟️ 초기화 3분 전에 {arenaOfGlory} 진행",
          "☐ 🐻 {bearHunt} — 이틀에 한 번 + 부대 편성 갱신",
          "☐ 📅 진행 중인 이벤트 등록 및 참여"
        ] },
        { type: "sub", text: "🌙 접속 종료 전" },
        { type: "list", items: [
          "☐ 🐉 펫을 {petAdventure}에 보내기",
          "☐ 🌾 {gathering} 행군 보내기",
          "☐ ⚔️ 부대 {training} 유지",
          "☐ 🔬 필요에 따라 {research} / {construction} 유지"
        ] }
      ]},
      de: { title: "Allgemeine Tipps", blocks: [
        { type: "h", text: "🔗 RESSOURCEN" },
        { type: "sub", text: "🗓️ KÖNIGREICH-ZEITPLAN" },
        { type: "p", text: "https://kingshotoptimizer.com/kingdom-timeline/2189" },
        { type: "p", text: "Sieh, was als Nächstes kommt, und plane Events, Upgrades und Ressourcen im Voraus." },
        { type: "sub", text: "⚔️ HELDENAUSRÜSTUNGS-OPTIMIERER" },
        { type: "p", text: "https://kingshotoptimizer.com/hero-gear" },
        { type: "p", text: "Plane deine {heroGear}-Upgrades und verschwende keine wertvollen Materialien." },
        { type: "sub", text: "🎥 YOUTUBE – STRAT GAME SLOTH" },
        { type: "p", text: "https://www.youtube.com/watch?v=NMrS3MTSFUU" },
        { type: "p", text: "Empfohlene Strategievideos, Spieltipps und Fortschrittsratschläge." },
        { type: "h", text: "🛒 SHOPS IM SPIEL" },
        { type: "p", text: "Was du in jedem Shop für den besten Wert priorisieren solltest." },
        { type: "sub", text: "🐪 {nomadicMerchant}" },
        { type: "list", items: [
          "{teleporterAdv} für Ressourcen / gratis",
          "Günstige Ressourcentausche",
          "Reduzierte {vipXp}"
        ] },
        { type: "sub", text: "🎲 {mysteryShop}" },
        { type: "list", items: [
          "Tägliche Gratis-Aktualisierung",
          "{widgetChest} bei 50 % Rabatt",
          "20 % Rabatt nur bei dringendem Bedarf"
        ] },
        { type: "sub", text: "🏟️ {arenaShop}" },
        { type: "list", items: [
          "Wöchentlich {customMythicGearChest} → danach {mithril}, sobald die mythische Ausrüstungsbasis deiner Haupthelden steht"
        ] },
        { type: "sub", text: "👑 {vipShop}" },
        { type: "list", items: [
          "{gems} gezielt für Rabatte ausgeben: {teleporterAdv} • 100 {enhancementXp} • {forgehammer}"
        ] },
        { type: "sub", text: "🏆 {championshipShop}" },
        { type: "list", items: [
          "**Vor {masters}:** {artisansVision} • {gildedThreads} / {satin} nach Bedarf",
          "**Nach {masters}:** {masterEmblem} haben Priorität Nr. 1 — im Late Game Token dafür sparen"
        ] },
        { type: "sub", text: "⚔️ {swordlandShop}" },
        { type: "list", items: [
          "{artisansVision} → dann, was dich gerade bremst: {governorCharm}- / {governorGear}-Materialien • {forgehammer}"
        ] },
        { type: "sub", text: "🏰 {kopShop}" },
        { type: "list", items: [
          "**{truegold}** — ein großer langfristiger Engpass"
        ] },
        { type: "sub", text: "🎨 {skinShop}" },
        { type: "list", items: [
          "Dauerhafte Wert-Boni zuerst, z. B. {houseOfCacti}: +2 % {squadsAttack}"
        ] },
        { type: "sub", text: "🧪 {trialShop}" },
        { type: "list", items: [
          "**Vor {truegoldDust}:** {trialCrystal} SPAREN",
          "**Danach:** {truegoldDust} → {mithril} → {enhancementXp} → {charmDesign}"
        ] },
        { type: "sub", text: "💎 {gemShop}" },
        { type: "p", text: "Gib {gems} nur für wichtige Fortschrittsschwellen oder schwer erhältliche Materialien aus." },
        { type: "callout", text: "**Im Zweifel: EDELSTEINE SPAREN.** Siehe den Edelstein-Leitfaden unten." },
        { type: "sub", text: "🤝 Allianz – {allianceShop}" },
        { type: "list", items: [
          "{transferPass} • {vipXp} • Begleittier-Futter / -Materialien • {teleporterAdv} • nützliche 70 %-Rabatte • Beschleunigungen nur mit überschüssigen {allianceToken}"
        ] },
        { type: "h", text: "💎 EDELSTEIN-LEITFADEN" },
        { type: "p", text: "Spare {gems} für:" },
        { type: "list", items: [
          "**1) 🎡 {heroRoulette}** → ca. 162.000 {gems} für 120 Drehungen",
          "**2) 👑 VIP-Aktivierung** → 10.000 {gems}/Monat (ab VIP 4)"
        ] },
        { type: "callout", text: "🏛️ {hallOfHeroes} → ca. 13.500–14.850 {gems}, **NUR wenn {marlin} noch nicht freigeschaltet ist.** Danach aufhören — dann sind allgemeine Fragmente für Upgrades wertvoller." },
        { type: "h", text: "✅ TÄGLICHE CHECKLISTE" },
        { type: "sub", text: "☀️ WÄHREND DU ONLINE BIST" },
        { type: "list", items: [
          "☐ 🎁 VIP-Truhe abholen + {vipXp} verwenden",
          "☐ 🤝 Allianz-{allianceHelp} + zur Allianz-{allianceTech} beitragen",
          "☐ 📊 Helden-EP-Gegenstände verwenden",
          "☐ ⚔️ Lager erobern ({conquerorsCamp})",
          "☐ 🔎 {intelMission}en abschließen",
          "☐ 🏝️ {waterEssence} auf der Insel sammeln + Verbündeten helfen",
          "☐ 🔮 Versuche der {mysticTrial} nutzen",
          "☐ 📋 Tägliche Missionen ({dailyMissions}) erledigen",
          "☐ 🏟️ {arenaOfGlory} 3 Minuten vor dem Reset spielen",
          "☐ 🐻 {bearHunt} — jeden zweiten Tag + Formationen aktualisieren",
          "☐ 📅 Für aktive Events anmelden und teilnehmen"
        ] },
        { type: "sub", text: "🌙 VOR DEM AUSLOGGEN" },
        { type: "list", items: [
          "☐ 🐉 Begleittiere auf {petAdventure} schicken",
          "☐ 🌾 {gathering}-Märsche losschicken",
          "☐ ⚔️ Truppen-{training} aktiv halten",
          "☐ 🔬 {research} / {construction} nach Bedarf aktiv halten"
        ] }
      ]},
      fr: { title: "Conseils Généraux", blocks: [
        { type: "h", text: "🔗 RESSOURCES" },
        { type: "sub", text: "🗓️ CHRONOLOGIE DU ROYAUME" },
        { type: "p", text: "https://kingshotoptimizer.com/kingdom-timeline/2189" },
        { type: "p", text: "Vois ce qui arrive ensuite pour planifier événements, améliorations et ressources à l'avance." },
        { type: "sub", text: "⚔️ OPTIMISEUR D'ÉQUIPEMENT DE HÉROS" },
        { type: "p", text: "https://kingshotoptimizer.com/hero-gear" },
        { type: "p", text: "Planifie tes améliorations d'{heroGear} et évite de gaspiller des matériaux précieux." },
        { type: "sub", text: "🎥 YOUTUBE – STRAT GAME SLOTH" },
        { type: "p", text: "https://www.youtube.com/watch?v=NMrS3MTSFUU" },
        { type: "p", text: "Vidéos de stratégie recommandées, astuces de jeu et conseils de progression." },
        { type: "h", text: "🛒 MAGASINS DU JEU" },
        { type: "p", text: "Quoi acheter en priorité dans chaque magasin pour le meilleur rapport qualité-prix." },
        { type: "sub", text: "🐪 {nomadicMerchant}" },
        { type: "list", items: [
          "{teleporterAdv} contre ressources / gratuit",
          "Échanges de ressources avantageux",
          "{vipXp} en réduction"
        ] },
        { type: "sub", text: "🎲 {mysteryShop}" },
        { type: "list", items: [
          "Actualisation quotidienne gratuite",
          "{widgetChest} à -50 %",
          "-20 % seulement en cas d'urgence"
        ] },
        { type: "sub", text: "🏟️ {arenaShop}" },
        { type: "list", items: [
          "{customMythicGearChest} chaque semaine → {mithril} une fois la base d'équipement mythique de tes héros principaux terminée"
        ] },
        { type: "sub", text: "👑 {vipShop}" },
        { type: "list", items: [
          "Dépense tes {gems} seulement sur les réductions : {teleporterAdv} • 100 {enhancementXp} • {forgehammer}"
        ] },
        { type: "sub", text: "🏆 {championshipShop}" },
        { type: "list", items: [
          "**Avant {masters} :** {artisansVision} • {gildedThreads} / {satin} selon les besoins",
          "**Après {masters} :** {masterEmblem} en priorité n°1 — en fin de partie, garde tes jetons pour ça"
        ] },
        { type: "sub", text: "⚔️ {swordlandShop}" },
        { type: "list", items: [
          "{artisansVision} → puis ce qui te bloque : matériaux de {governorCharm} / d'{governorGear} • {forgehammer}"
        ] },
        { type: "sub", text: "🏰 {kopShop}" },
        { type: "list", items: [
          "**{truegold}** — un goulot d'étranglement majeur à long terme"
        ] },
        { type: "sub", text: "🎨 {skinShop}" },
        { type: "list", items: [
          "Priorise les bonus de stats permanents, ex. {houseOfCacti} : +2 % {squadsAttack}"
        ] },
        { type: "sub", text: "🧪 {trialShop}" },
        { type: "list", items: [
          "**Avant {truegoldDust} :** ÉCONOMISE tes {trialCrystal}",
          "**Après :** {truegoldDust} → {mithril} → {enhancementXp} → {charmDesign}"
        ] },
        { type: "sub", text: "💎 {gemShop}" },
        { type: "p", text: "Ne dépense tes {gems} que pour des paliers de progression importants ou des matériaux rares." },
        { type: "callout", text: "**Dans le doute : GARDE TES GEMMES.** Voir le guide des gemmes ci-dessous." },
        { type: "sub", text: "🤝 Alliance – {allianceShop}" },
        { type: "list", items: [
          "{transferPass} • {vipXp} • Nourriture / matériaux pour animaux • {teleporterAdv} • Réductions utiles de 70 % • Accélérateurs seulement avec un surplus de {allianceToken}"
        ] },
        { type: "h", text: "💎 GUIDE DES GEMMES" },
        { type: "p", text: "Garde tes {gems} pour :" },
        { type: "list", items: [
          "**1) 🎡 {heroRoulette}** → ~162 000 {gems} pour 120 tours",
          "**2) 👑 Activation VIP** → 10 000 {gems}/mois (à partir de VIP 4)"
        ] },
        { type: "callout", text: "🏛️ {hallOfHeroes} → ~13 500–14 850 {gems}, **SEULEMENT si {marlin} n'est pas encore débloqué.** Arrête après le déblocage — ensuite, les fragments universels sont plus rentables." },
        { type: "h", text: "✅ CHECKLIST QUOTIDIENNE" },
        { type: "sub", text: "☀️ PENDANT QUE TU ES EN LIGNE" },
        { type: "list", items: [
          "☐ 🎁 Récupère le coffre VIP + utilise l'{vipXp}",
          "☐ 🤝 {allianceHelp} d'alliance + contribue à la {allianceTech} d'alliance",
          "☐ 📊 Utilise les objets d'EXP de héros",
          "☐ ⚔️ Conquiers des camps ({conquerorsCamp})",
          "☐ 🔎 Termine tes missions ({intelMission})",
          "☐ 🏝️ Récupère l'{waterEssence} de l'île + aide tes alliés",
          "☐ 🔮 Utilise tes tentatives de l'{mysticTrial}",
          "☐ 📋 Termine les missions quotidiennes ({dailyMissions})",
          "☐ 🏟️ Fais l'{arenaOfGlory} 3 minutes avant la réinitialisation",
          "☐ 🐻 {bearHunt} — un jour sur deux + mets à jour tes formations",
          "☐ 📅 Inscris-toi et participe aux événements en cours"
        ] },
        { type: "sub", text: "🌙 AVANT DE TE DÉCONNECTER" },
        { type: "list", items: [
          "☐ 🐉 Envoie tes animaux en {petAdventure}",
          "☐ 🌾 Envoie des marches de {gathering}",
          "☐ ⚔️ Garde l'{training} des troupes actif",
          "☐ 🔬 Garde {research} / {construction} actives au besoin"
        ] }
      ]},
      pt: { title: "Dicas Gerais", blocks: [
        { type: "h", text: "🔗 RECURSOS" },
        { type: "sub", text: "🗓️ LINHA DO TEMPO DO REINO" },
        { type: "p", text: "https://kingshotoptimizer.com/kingdom-timeline/2189" },
        { type: "p", text: "Veja o que vem a seguir para planejar eventos, aprimoramentos e recursos com antecedência." },
        { type: "sub", text: "⚔️ OTIMIZADOR DE EQUIPAMENTO DE HERÓI" },
        { type: "p", text: "https://kingshotoptimizer.com/hero-gear" },
        { type: "p", text: "Planeje os aprimoramentos do {heroGear} e evite desperdiçar materiais valiosos." },
        { type: "sub", text: "🎥 YOUTUBE – STRAT GAME SLOTH" },
        { type: "p", text: "https://www.youtube.com/watch?v=NMrS3MTSFUU" },
        { type: "p", text: "Vídeos de estratégia recomendados, dicas de jogo e conselhos de progressão." },
        { type: "h", text: "🛒 LOJAS DO JOGO" },
        { type: "p", text: "O que priorizar em cada loja para o melhor custo-benefício." },
        { type: "sub", text: "🐪 {nomadicMerchant}" },
        { type: "list", items: [
          "{teleporterAdv} por recursos / grátis",
          "Trocas de recursos vantajosas",
          "{vipXp} com desconto"
        ] },
        { type: "sub", text: "🎲 {mysteryShop}" },
        { type: "list", items: [
          "Atualização diária grátis",
          "{widgetChest} com 50% OFF",
          "20% OFF só se precisar com urgência"
        ] },
        { type: "sub", text: "🏟️ {arenaShop}" },
        { type: "list", items: [
          "{customMythicGearChest} toda semana → {mithril} quando a base de Equipamento Mítico dos seus heróis principais estiver pronta"
        ] },
        { type: "sub", text: "👑 {vipShop}" },
        { type: "list", items: [
          "Gaste {gems} só em descontos: {teleporterAdv} • 100 {enhancementXp} • {forgehammer}"
        ] },
        { type: "sub", text: "🏆 {championshipShop}" },
        { type: "list", items: [
          "**Antes dos {masters}:** {artisansVision} • {gildedThreads} / {satin} conforme necessário",
          "**Depois dos {masters}:** {masterEmblem} são prioridade nº 1 — no fim de jogo, guarde as fichas para eles"
        ] },
        { type: "sub", text: "⚔️ {swordlandShop}" },
        { type: "list", items: [
          "{artisansVision} → depois o que estiver travando você: materiais de {governorCharm} / {governorGear} • {forgehammer}"
        ] },
        { type: "sub", text: "🏰 {kopShop}" },
        { type: "list", items: [
          "**{truegold}** — grande gargalo de progressão a longo prazo"
        ] },
        { type: "sub", text: "🎨 {skinShop}" },
        { type: "list", items: [
          "Priorize bônus de atributos permanentes, ex.: {houseOfCacti}: +2% {squadsAttack}"
        ] },
        { type: "sub", text: "🧪 {trialShop}" },
        { type: "list", items: [
          "**Antes do {truegoldDust}:** GUARDE os {trialCrystal}",
          "**Depois:** {truegoldDust} → {mithril} → {enhancementXp} → {charmDesign}"
        ] },
        { type: "sub", text: "💎 {gemShop}" },
        { type: "p", text: "Só gaste {gems} em marcos importantes de progressão ou materiais difíceis de obter." },
        { type: "callout", text: "**Na dúvida: GUARDE SUAS GEMAS.** Veja o guia de gemas abaixo." },
        { type: "sub", text: "🤝 Aliança – {allianceShop}" },
        { type: "list", items: [
          "{transferPass} • {vipXp} • Comida / materiais de pet • {teleporterAdv} • Descontos úteis de 70% • Aceleradores só com {allianceToken} sobrando"
        ] },
        { type: "h", text: "💎 GUIA DE GASTO DE GEMAS" },
        { type: "p", text: "Guarde {gems} para:" },
        { type: "list", items: [
          "**1) 🎡 {heroRoulette}** → ~162.000 {gems} para 120 giros",
          "**2) 👑 Ativação VIP** → 10.000 {gems}/mês (a partir do VIP 4)"
        ] },
        { type: "callout", text: "🏛️ {hallOfHeroes} → ~13.500–14.850 {gems}, **SÓ se {marlin} ainda não estiver desbloqueado.** Pare após desbloquear — depois disso, fragmentos gerais valem mais para aprimorar." },
        { type: "h", text: "✅ CHECKLIST DIÁRIO" },
        { type: "sub", text: "☀️ ENQUANTO ESTIVER ONLINE" },
        { type: "list", items: [
          "☐ 🎁 Colete o baú VIP + use o {vipXp}",
          "☐ 🤝 {allianceHelp} da aliança + contribua com a {allianceTech} da aliança",
          "☐ 📊 Use itens de XP de herói",
          "☐ ⚔️ Conquiste acampamentos ({conquerorsCamp})",
          "☐ 🔎 Complete as missões ({intelMission})",
          "☐ 🏝️ Colete a {waterEssence} da ilha + ajude aliados",
          "☐ 🔮 Use as tentativas da {mysticTrial}",
          "☐ 📋 Complete as missões diárias ({dailyMissions})",
          "☐ 🏟️ Faça a {arenaOfGlory} 3 minutos antes do reset",
          "☐ 🐻 {bearHunt} — dia sim, dia não + atualize as formações",
          "☐ 📅 Inscreva-se e participe dos eventos ativos"
        ] },
        { type: "sub", text: "🌙 ANTES DE SAIR" },
        { type: "list", items: [
          "☐ 🐉 Envie os pets na {petAdventure}",
          "☐ 🌾 Envie marchas de {gathering}",
          "☐ ⚔️ Mantenha o {training} de tropas ativo",
          "☐ 🔬 Mantenha {research} / {construction} ativas conforme necessário"
        ] }
      ]},
      tr: { title: "Genel İpuçları", blocks: [
        { type: "h", text: "🔗 KAYNAKLAR" },
        { type: "sub", text: "🗓️ KRALLIK ZAMAN ÇİZELGESİ" },
        { type: "p", text: "https://kingshotoptimizer.com/kingdom-timeline/2189" },
        { type: "p", text: "Sırada ne olduğunu gör; etkinlikleri, yükseltmeleri ve kaynakları önceden planla." },
        { type: "sub", text: "⚔️ KAHRAMAN DONANIMI OPTİMİZASYONU" },
        { type: "p", text: "https://kingshotoptimizer.com/hero-gear" },
        { type: "p", text: "{heroGear} yükseltmelerini planla, değerli malzemeleri boşa harcama." },
        { type: "sub", text: "🎥 YOUTUBE – STRAT GAME SLOTH" },
        { type: "p", text: "https://www.youtube.com/watch?v=NMrS3MTSFUU" },
        { type: "p", text: "Önerilen strateji videoları, oyun ipuçları ve gelişim tavsiyeleri." },
        { type: "h", text: "🛒 OYUN İÇİ MAĞAZALAR" },
        { type: "p", text: "Her mağazada en iyi değer için neye öncelik vermelisin." },
        { type: "sub", text: "🐪 {nomadicMerchant}" },
        { type: "list", items: [
          "Kaynakla / ücretsiz {teleporterAdv}",
          "Avantajlı kaynak takasları",
          "İndirimli {vipXp}"
        ] },
        { type: "sub", text: "🎲 {mysteryShop}" },
        { type: "list", items: [
          "Günlük ücretsiz yenileme",
          "%50 İNDİRİMLİ {widgetChest}",
          "%20 indirim sadece acil ihtiyaçta"
        ] },
        { type: "sub", text: "🏟️ {arenaShop}" },
        { type: "list", items: [
          "Her hafta {customMythicGearChest} → ana kahramanlarının Mitik Donanım temeli tamamlanınca {mithril}"
        ] },
        { type: "sub", text: "👑 {vipShop}" },
        { type: "list", items: [
          "{gems} sadece indirimlerde harca: {teleporterAdv} • 100 {enhancementXp} • {forgehammer}"
        ] },
        { type: "sub", text: "🏆 {championshipShop}" },
        { type: "list", items: [
          "**{masters} öncesi:** {artisansVision} • gerektikçe {gildedThreads} / {satin}",
          "**{masters} sonrası:** {masterEmblem} 1 numaralı öncelik — oyun sonunda jetonları bunlara sakla"
        ] },
        { type: "sub", text: "⚔️ {swordlandShop}" },
        { type: "list", items: [
          "{artisansVision} → sonra seni ne tıkıyorsa: {governorCharm} / {governorGear} malzemeleri • {forgehammer}"
        ] },
        { type: "sub", text: "🏰 {kopShop}" },
        { type: "list", items: [
          "**{truegold}** — uzun vadede en büyük darboğazlardan biri"
        ] },
        { type: "sub", text: "🎨 {skinShop}" },
        { type: "list", items: [
          "Kalıcı nitelik bonuslarına öncelik ver, ör. {houseOfCacti}: +%2 {squadsAttack}"
        ] },
        { type: "sub", text: "🧪 {trialShop}" },
        { type: "list", items: [
          "**{truegoldDust} öncesi:** {trialCrystal} BİRİKTİR",
          "**Sonrası:** {truegoldDust} → {mithril} → {enhancementXp} → {charmDesign}"
        ] },
        { type: "sub", text: "💎 {gemShop}" },
        { type: "p", text: "{gems} sadece önemli gelişim eşikleri veya zor bulunan malzemeler için harca." },
        { type: "callout", text: "**Emin değilsen: ELMASLARINI SAKLA.** Aşağıdaki elmas rehberine bak." },
        { type: "sub", text: "🤝 İttifak – {allianceShop}" },
        { type: "list", items: [
          "{transferPass} • {vipXp} • Evcil hayvan yemi / malzemeleri • {teleporterAdv} • İşe yarar %70 indirimler • Hızlandırmalar sadece fazla {allianceToken} varsa"
        ] },
        { type: "h", text: "💎 ELMAS HARCAMA REHBERİ" },
        { type: "p", text: "{gems} şunlar için sakla:" },
        { type: "list", items: [
          "**1) 🎡 {heroRoulette}** → 120 çevirme için ~162.000 {gems}",
          "**2) 👑 VIP aktivasyonu** → ayda 10.000 {gems} (VIP 4 ve üstü)"
        ] },
        { type: "callout", text: "🏛️ {hallOfHeroes} → ~13.500–14.850 {gems}, **SADECE {marlin} henüz açılmadıysa.** Açıldıktan sonra dur — sonrasında genel parçalar yükseltme için daha değerli." },
        { type: "h", text: "✅ GÜNLÜK KONTROL LİSTESİ" },
        { type: "sub", text: "☀️ ÇEVRİMİÇİYKEN" },
        { type: "list", items: [
          "☐ 🎁 VIP sandığını al + {vipXp} kullan",
          "☐ 🤝 İttifak {allianceHelp} + ittifak {allianceTech} katkısı",
          "☐ 📊 Kahraman XP eşyalarını kullan",
          "☐ ⚔️ Kampları fethet ({conquerorsCamp})",
          "☐ 🔎 {intelMission} listesini bitir",
          "☐ 🏝️ Adadaki {waterEssence} topla + müttefiklere yardım et",
          "☐ 🔮 {mysticTrial} haklarını kullan",
          "☐ 📋 Günlük görevleri ({dailyMissions}) tamamla",
          "☐ 🏟️ {arenaOfGlory}'nı sıfırlamadan 3 dakika önce yap",
          "☐ 🐻 {bearHunt} — gün aşırı + dizilişleri güncelle",
          "☐ 📅 Aktif etkinliklere kaydol ve katıl"
        ] },
        { type: "sub", text: "🌙 ÇIKMADAN ÖNCE" },
        { type: "list", items: [
          "☐ 🐉 Evcil hayvanları {petAdventure}'na gönder",
          "☐ 🌾 {gathering} seferleri gönder",
          "☐ ⚔️ Birlik {training}ini aktif tut",
          "☐ 🔬 Gerektikçe {research} / {construction} aktif tut"
        ] }
      ]},
      id: { title: "Tips Umum", blocks: [
        { type: "h", text: "🔗 REFERENSI" },
        { type: "sub", text: "🗓️ LINIMASA KERAJAAN" },
        { type: "p", text: "https://kingshotoptimizer.com/kingdom-timeline/2189" },
        { type: "p", text: "Lihat apa yang akan datang agar bisa merencanakan event, upgrade, dan sumber daya lebih awal." },
        { type: "sub", text: "⚔️ OPTIMIZER GEAR HERO" },
        { type: "p", text: "https://kingshotoptimizer.com/hero-gear" },
        { type: "p", text: "Rencanakan upgrade {heroGear} dan hindari membuang material berharga." },
        { type: "sub", text: "🎥 YOUTUBE – STRAT GAME SLOTH" },
        { type: "p", text: "https://www.youtube.com/watch?v=NMrS3MTSFUU" },
        { type: "p", text: "Video strategi rekomendasi, tips bermain, dan saran progres." },
        { type: "h", text: "🛒 TOKO DALAM GAME" },
        { type: "p", text: "Apa yang perlu diprioritaskan di setiap toko agar paling hemat." },
        { type: "sub", text: "🐪 {nomadicMerchant}" },
        { type: "list", items: [
          "{teleporterAdv} dengan sumber daya / gratis",
          "Tukar sumber daya yang menguntungkan",
          "{vipXp} diskon"
        ] },
        { type: "sub", text: "🎲 {mysteryShop}" },
        { type: "list", items: [
          "Perbarui gratis setiap hari",
          "{widgetChest} saat diskon 50%",
          "Diskon 20% hanya jika sangat butuh"
        ] },
        { type: "sub", text: "🏟️ {arenaShop}" },
        { type: "list", items: [
          "{customMythicGearChest} setiap minggu → {mithril} setelah fondasi Gear Mitos hero utamamu selesai"
        ] },
        { type: "sub", text: "👑 {vipShop}" },
        { type: "list", items: [
          "Pakai {gems} hanya untuk diskon: {teleporterAdv} • 100 {enhancementXp} • {forgehammer}"
        ] },
        { type: "sub", text: "🏆 {championshipShop}" },
        { type: "list", items: [
          "**Sebelum {masters}:** {artisansVision} • {gildedThreads} / {satin} sesuai kebutuhan",
          "**Setelah {masters}:** {masterEmblem} prioritas utama — di late game, simpan token untuk ini"
        ] },
        { type: "sub", text: "⚔️ {swordlandShop}" },
        { type: "list", items: [
          "{artisansVision} → lalu apa pun yang jadi hambatan: material {governorCharm} / {governorGear} • {forgehammer}"
        ] },
        { type: "sub", text: "🏰 {kopShop}" },
        { type: "list", items: [
          "**{truegold}** — hambatan progres jangka panjang yang besar"
        ] },
        { type: "sub", text: "🎨 {skinShop}" },
        { type: "list", items: [
          "Utamakan bonus stat permanen, mis. {houseOfCacti}: +2% {squadsAttack}"
        ] },
        { type: "sub", text: "🧪 {trialShop}" },
        { type: "list", items: [
          "**Sebelum {truegoldDust}:** SIMPAN {trialCrystal}",
          "**Sesudahnya:** {truegoldDust} → {mithril} → {enhancementXp} → {charmDesign}"
        ] },
        { type: "sub", text: "💎 {gemShop}" },
        { type: "p", text: "Gunakan {gems} hanya untuk titik progres penting atau material yang sulit didapat." },
        { type: "callout", text: "**Kalau ragu: SIMPAN GEM-MU.** Lihat panduan penggunaan Gem di bawah." },
        { type: "sub", text: "🤝 Aliansi – {allianceShop}" },
        { type: "list", items: [
          "{transferPass} • {vipXp} • Makanan / material peliharaan • {teleporterAdv} • Diskon 70% yang berguna • Speedup hanya jika {allianceToken} berlebih"
        ] },
        { type: "h", text: "💎 PANDUAN MENGGUNAKAN GEM" },
        { type: "p", text: "Simpan {gems} untuk:" },
        { type: "list", items: [
          "**1) 🎡 {heroRoulette}** → ~162.000 {gems} untuk 120 putaran",
          "**2) 👑 Aktivasi VIP** → 10.000 {gems}/bulan (mulai VIP 4)"
        ] },
        { type: "callout", text: "🏛️ {hallOfHeroes} → ~13.500–14.850 {gems}, **HANYA jika {marlin} belum terbuka.** Berhenti setelah terbuka — sesudah itu shard umum lebih bernilai untuk upgrade." },
        { type: "h", text: "✅ CHECKLIST HARIAN" },
        { type: "sub", text: "☀️ SAAT ONLINE" },
        { type: "list", items: [
          "☐ 🎁 Ambil peti VIP + gunakan {vipXp}",
          "☐ 🤝 {allianceHelp} aliansi + kontribusi {allianceTech} aliansi",
          "☐ 📊 Gunakan item XP Hero",
          "☐ ⚔️ Taklukkan kamp ({conquerorsCamp})",
          "☐ 🔎 Selesaikan {intelMission}",
          "☐ 🏝️ Kumpulkan {waterEssence} di pulau + bantu sekutu",
          "☐ 🔮 Gunakan kesempatan {mysticTrial}",
          "☐ 📋 Selesaikan misi {dailyMissions}",
          "☐ 🏟️ Main {arenaOfGlory} 3 menit sebelum reset",
          "☐ 🐻 {bearHunt} — dua hari sekali + perbarui formasi",
          "☐ 📅 Daftar dan ikuti event yang sedang aktif"
        ] },
        { type: "sub", text: "🌙 SEBELUM LOGOUT" },
        { type: "list", items: [
          "☐ 🐉 Kirim peliharaan ke {petAdventure}",
          "☐ 🌾 Kirim barisan {gathering}",
          "☐ ⚔️ Pastikan {training} pasukan tetap berjalan",
          "☐ 🔬 Jaga {research} / {construction} tetap berjalan sesuai kebutuhan"
        ] }
      ]},
      ru: { title: "Общие советы", blocks: [
        { type: "h", text: "🔗 ПОЛЕЗНЫЕ РЕСУРСЫ" },
        { type: "sub", text: "🗓️ ХРОНОЛОГИЯ КОРОЛЕВСТВА" },
        { type: "p", text: "https://kingshotoptimizer.com/kingdom-timeline/2189" },
        { type: "p", text: "Смотрите, что будет дальше, чтобы заранее планировать события, улучшения и ресурсы." },
        { type: "sub", text: "⚔️ ОПТИМИЗАТОР СНАРЯЖЕНИЯ ГЕРОЕВ" },
        { type: "p", text: "https://kingshotoptimizer.com/hero-gear" },
        { type: "p", text: "Планируйте улучшения ({heroGear}) и не тратьте ценные материалы впустую." },
        { type: "sub", text: "🎥 YOUTUBE – STRAT GAME SLOTH" },
        { type: "p", text: "https://www.youtube.com/watch?v=NMrS3MTSFUU" },
        { type: "p", text: "Рекомендуемые видео по стратегии, игровые советы и советы по развитию." },
        { type: "h", text: "🛒 ИГРОВЫЕ МАГАЗИНЫ" },
        { type: "p", text: "Что брать в первую очередь в каждом магазине ради максимальной выгоды." },
        { type: "sub", text: "🐪 {nomadicMerchant}" },
        { type: "list", items: [
          "{teleporterAdv} за ресурсы / бесплатно",
          "Выгодный обмен ресурсов",
          "{vipXp} со скидкой"
        ] },
        { type: "sub", text: "🎲 {mysteryShop}" },
        { type: "list", items: [
          "Бесплатное ежедневное обновление",
          "{widgetChest} со скидкой 50%",
          "Скидка 20% — только при срочной необходимости"
        ] },
        { type: "sub", text: "🏟️ {arenaShop}" },
        { type: "list", items: [
          "Каждую неделю: {customMythicGearChest} → {mithril}, когда база мифического снаряжения основных героев готова"
        ] },
        { type: "sub", text: "👑 {vipShop}" },
        { type: "list", items: [
          "Тратьте {gems} только на скидки: {teleporterAdv} • 100 {enhancementXp} • {forgehammer}"
        ] },
        { type: "sub", text: "🏆 {championshipShop}" },
        { type: "list", items: [
          "**До {masters}:** {artisansVision} • {gildedThreads} / {satin} по необходимости",
          "**После {masters}:** {masterEmblem} — приоритет №1; в поздней игре копите жетоны на них"
        ] },
        { type: "sub", text: "⚔️ {swordlandShop}" },
        { type: "list", items: [
          "{artisansVision} → затем то, что сейчас тормозит развитие: материалы ({governorCharm} / {governorGear}) • {forgehammer}"
        ] },
        { type: "sub", text: "🏰 {kopShop}" },
        { type: "list", items: [
          "**{truegold}** — главное узкое место долгосрочного развития"
        ] },
        { type: "sub", text: "🎨 {skinShop}" },
        { type: "list", items: [
          "В приоритете постоянные бонусы к показателям, напр. {houseOfCacti}: +2% ({squadsAttack})"
        ] },
        { type: "sub", text: "🧪 {trialShop}" },
        { type: "list", items: [
          "**До открытия ({truegoldDust}):** КОПИТЕ {trialCrystal}",
          "**После:** {truegoldDust} → {mithril} → {enhancementXp} → {charmDesign}"
        ] },
        { type: "sub", text: "💎 {gemShop}" },
        { type: "p", text: "Тратьте {gems} только на важные этапы развития или редкие материалы." },
        { type: "callout", text: "**Если сомневаетесь — ЭКОНОМЬТЕ АЛМАЗЫ.** См. руководство по алмазам ниже." },
        { type: "sub", text: "🤝 Альянс – {allianceShop}" },
        { type: "list", items: [
          "{transferPass} • {vipXp} • Корм / материалы для питомцев • {teleporterAdv} • Полезные скидки 70% • Ускорения — только при избытке ({allianceToken})"
        ] },
        { type: "h", text: "💎 НА ЧТО ТРАТИТЬ АЛМАЗЫ" },
        { type: "p", text: "Копите {gems} на:" },
        { type: "list", items: [
          "**1) 🎡 {heroRoulette}** → ~162 000 алмазов за 120 вращений",
          "**2) 👑 Активация VIP** → 10 000 алмазов в месяц (с VIP 4)"
        ] },
        { type: "callout", text: "🏛️ {hallOfHeroes} → ~13 500–14 850 алмазов, **ТОЛЬКО если {marlin} ещё не открыт.** После открытия остановитесь — дальше универсальные фрагменты выгоднее для улучшений." },
        { type: "h", text: "✅ ЕЖЕДНЕВНЫЙ ЧЕК-ЛИСТ" },
        { type: "sub", text: "☀️ ПОКА ВЫ В ИГРЕ" },
        { type: "list", items: [
          "☐ 🎁 Заберите VIP-сундук + используйте {vipXp}",
          "☐ 🤝 {allianceHelp} альянсу + взносы в {allianceTech}",
          "☐ 📊 Используйте предметы опыта героев",
          "☐ ⚔️ Захватывайте лагеря ({conquerorsCamp})",
          "☐ 🔎 Выполните задания: {intelMission}",
          "☐ 🏝️ Соберите {waterEssence} на острове + помогите союзникам",
          "☐ 🔮 Используйте попытки: {mysticTrial}",
          "☐ 📋 Выполните {dailyMissions}",
          "☐ 🏟️ {arenaOfGlory} — за 3 минуты до сброса",
          "☐ 🐻 {bearHunt} — через день + обновляйте построения",
          "☐ 📅 Регистрируйтесь и участвуйте в активных событиях"
        ] },
        { type: "sub", text: "🌙 ПЕРЕД ВЫХОДОМ" },
        { type: "list", items: [
          "☐ 🐉 Отправьте питомцев: {petAdventure}",
          "☐ 🌾 Отправьте отряды на сбор ({gathering})",
          "☐ ⚔️ Держите {training} войск активными",
          "☐ 🔬 По необходимости держите {research} / {construction} активными"
        ] }
      ]},
      th: { title: "เคล็ดลับทั่วไป", blocks: [
        { type: "h", text: "🔗 แหล่งข้อมูล" },
        { type: "sub", text: "🗓️ ไทม์ไลน์อาณาจักร" },
        { type: "p", text: "https://kingshotoptimizer.com/kingdom-timeline/2189" },
        { type: "p", text: "ดูว่าจะมีอะไรต่อไป เพื่อวางแผนกิจกรรม การอัปเกรด และทรัพยากรล่วงหน้า" },
        { type: "sub", text: "⚔️ เครื่องมือวางแผนอุปกรณ์ฮีโร่" },
        { type: "p", text: "https://kingshotoptimizer.com/hero-gear" },
        { type: "p", text: "วางแผนอัปเกรด{heroGear} และไม่ใช้วัตถุดิบมีค่าอย่างสูญเปล่า" },
        { type: "sub", text: "🎥 YOUTUBE – STRAT GAME SLOTH" },
        { type: "p", text: "https://www.youtube.com/watch?v=NMrS3MTSFUU" },
        { type: "p", text: "วิดีโอกลยุทธ์แนะนำ เคล็ดลับการเล่น และคำแนะนำในการพัฒนา" },
        { type: "h", text: "🛒 ร้านค้าในเกม" },
        { type: "p", text: "ควรซื้ออะไรก่อนในแต่ละร้านเพื่อความคุ้มค่าที่สุด" },
        { type: "sub", text: "🐪 {nomadicMerchant}" },
        { type: "list", items: [
          "{teleporterAdv}ด้วยทรัพยากร / ฟรี",
          "แลกทรัพยากรที่คุ้มค่า",
          "{vipXp}ลดราคา"
        ] },
        { type: "sub", text: "🎲 {mysteryShop}" },
        { type: "list", items: [
          "รีเฟรชฟรีทุกวัน",
          "{widgetChest}ตอนลด 50%",
          "ลด 20% ซื้อเฉพาะตอนจำเป็นจริงๆ"
        ] },
        { type: "sub", text: "🏟️ {arenaShop}" },
        { type: "list", items: [
          "{customMythicGearChest}ทุกสัปดาห์ → {mithril} เมื่อพื้นฐานอุปกรณ์ขั้นเทพของฮีโร่หลักเสร็จแล้ว"
        ] },
        { type: "sub", text: "👑 {vipShop}" },
        { type: "list", items: [
          "ใช้{gems}เฉพาะของลดราคา: {teleporterAdv} • 100 {enhancementXp} • {forgehammer}"
        ] },
        { type: "sub", text: "🏆 {championshipShop}" },
        { type: "list", items: [
          "**ก่อน {masters}:** {artisansVision} • {gildedThreads} / {satin} ตามต้องการ",
          "**หลัง {masters}:** {masterEmblem} สำคัญที่สุด — ช่วงท้ายเกมให้เก็บเหรียญไว้ซื้อ"
        ] },
        { type: "sub", text: "⚔️ {swordlandShop}" },
        { type: "list", items: [
          "{artisansVision} → จากนั้นซื้อสิ่งที่เป็นคอขวด: วัตถุดิบ{governorCharm} / {governorGear} • {forgehammer}"
        ] },
        { type: "sub", text: "🏰 {kopShop}" },
        { type: "list", items: [
          "**{truegold}** — คอขวดสำคัญของการพัฒนาระยะยาว"
        ] },
        { type: "sub", text: "🎨 {skinShop}" },
        { type: "list", items: [
          "เลือกโบนัสสถานะถาวรก่อน เช่น {houseOfCacti}: {squadsAttack} +2%"
        ] },
        { type: "sub", text: "🧪 {trialShop}" },
        { type: "list", items: [
          "**ก่อนปลดล็อก{truegoldDust}:** เก็บ{trialCrystal}ไว้",
          "**หลังจากนั้น:** {truegoldDust} → {mithril} → {enhancementXp} → {charmDesign}"
        ] },
        { type: "sub", text: "💎 {gemShop}" },
        { type: "p", text: "ใช้{gems}เฉพาะช่วงพัฒนาสำคัญหรือวัตถุดิบที่หายาก" },
        { type: "callout", text: "**ถ้าไม่แน่ใจ: เก็บเพชรไว้ก่อน** ดูคู่มือการใช้เพชรด้านล่าง" },
        { type: "sub", text: "🤝 พันธมิตร – {allianceShop}" },
        { type: "list", items: [
          "{transferPass} • {vipXp} • อาหาร / วัตถุดิบสัตว์เลี้ยง • {teleporterAdv} • ส่วนลด 70% ที่มีประโยชน์ • เร่งสปีดเฉพาะตอน{allianceToken}เหลือ"
        ] },
        { type: "h", text: "💎 คู่มือการใช้เพชร" },
        { type: "p", text: "เก็บ{gems}ไว้สำหรับ:" },
        { type: "list", items: [
          "**1) 🎡 {heroRoulette}** → ประมาณ 162,000 {gems} สำหรับ 120 ครั้ง",
          "**2) 👑 เปิดใช้งาน VIP** → 10,000 {gems}/เดือน (ตั้งแต่ VIP 4)"
        ] },
        { type: "callout", text: "🏛️ {hallOfHeroes} → ประมาณ 13,500–14,850 {gems} **เฉพาะตอนที่ยังไม่ได้ปลดล็อก{marlin}** ปลดล็อกแล้วให้หยุด — หลังจากนั้นชิ้นส่วนทั่วไปคุ้มกว่าสำหรับการอัปเกรด" },
        { type: "h", text: "✅ เช็กลิสต์ประจำวัน" },
        { type: "sub", text: "☀️ ระหว่างออนไลน์" },
        { type: "list", items: [
          "☐ 🎁 รับหีบ VIP + ใช้{vipXp}",
          "☐ 🤝 {allianceHelp}พันธมิตร + อนุเคราะห์{allianceTech}พันธมิตร",
          "☐ 📊 ใช้ไอเทม EXP ฮีโร่",
          "☐ ⚔️ พิชิตค่าย ({conquerorsCamp})",
          "☐ 🔎 ทำ{intelMission}ให้ครบ",
          "☐ 🏝️ เก็บ{waterEssence}บนเกาะ + ช่วยพันธมิตร",
          "☐ 🔮 ใช้สิทธิ์{mysticTrial}ให้หมด",
          "☐ 📋 ทำภารกิจ{dailyMissions}ให้ครบ",
          "☐ 🏟️ เล่น{arenaOfGlory} 3 นาทีก่อนรีเซ็ต",
          "☐ 🐻 {bearHunt} — วันเว้นวัน + อัปเดตการจัดทัพ",
          "☐ 📅 ลงทะเบียนและเข้าร่วมกิจกรรมที่เปิดอยู่"
        ] },
        { type: "sub", text: "🌙 ก่อนออฟไลน์" },
        { type: "list", items: [
          "☐ 🐉 ส่งสัตว์เลี้ยงไป{petAdventure}",
          "☐ 🌾 ส่งทีม{gathering}",
          "☐ ⚔️ ให้{training}ทหารทำงานตลอด",
          "☐ 🔬 ให้{research} / {construction}ทำงานตามต้องการ"
        ] }
      ]},
      ar: { title: "نصائح عامة", blocks: [
        { type: "h", text: "🔗 مصادر مفيدة" },
        { type: "sub", text: "🗓️ الجدول الزمني للمملكة" },
        { type: "p", text: "https://kingshotoptimizer.com/kingdom-timeline/2189" },
        { type: "p", text: "اطّلع على ما هو قادم لتخطط للفعاليات والترقيات والموارد مسبقًا." },
        { type: "sub", text: "⚔️ أداة تحسين عتاد الأبطال" },
        { type: "p", text: "https://kingshotoptimizer.com/hero-gear" },
        { type: "p", text: "خطط لترقيات {heroGear} وتجنب إهدار المواد الثمينة." },
        { type: "sub", text: "🎥 YOUTUBE – STRAT GAME SLOTH" },
        { type: "p", text: "https://www.youtube.com/watch?v=NMrS3MTSFUU" },
        { type: "p", text: "فيديوهات استراتيجية موصى بها ونصائح لعب وإرشادات للتقدم." },
        { type: "h", text: "🛒 متاجر اللعبة" },
        { type: "p", text: "ما الذي يجب شراؤه أولًا في كل متجر للحصول على أفضل قيمة." },
        { type: "sub", text: "🐪 {nomadicMerchant}" },
        { type: "list", items: [
          "{teleporterAdv} مقابل الموارد / مجانًا",
          "مقايضات موارد مربحة",
          "{vipXp} بخصم"
        ] },
        { type: "sub", text: "🎲 {mysteryShop}" },
        { type: "list", items: [
          "تحديث يومي مجاني",
          "{widgetChest} بخصم 50%",
          "خصم 20% فقط عند الحاجة الملحّة"
        ] },
        { type: "sub", text: "🏟️ {arenaShop}" },
        { type: "list", items: [
          "{customMythicGearChest} أسبوعيًا ← ثم {mithril} بعد اكتمال أساس العتاد الخيالي لأبطالك الأساسيين"
        ] },
        { type: "sub", text: "👑 {vipShop}" },
        { type: "list", items: [
          "أنفق {gems} على الخصومات فقط: {teleporterAdv} • 100 {enhancementXp} • {forgehammer}"
        ] },
        { type: "sub", text: "🏆 {championshipShop}" },
        { type: "list", items: [
          "**قبل {masters}:** {artisansVision} • {gildedThreads} / {satin} حسب الحاجة",
          "**بعد {masters}:** {masterEmblem} الأولوية رقم 1 — في المراحل المتأخرة ادّخر الرموز لها"
        ] },
        { type: "sub", text: "⚔️ {swordlandShop}" },
        { type: "list", items: [
          "{artisansVision} ← ثم ما يعيق تقدمك: مواد {governorCharm} / {governorGear} • {forgehammer}"
        ] },
        { type: "sub", text: "🏰 {kopShop}" },
        { type: "list", items: [
          "**{truegold}** — عائق رئيسي للتقدم على المدى الطويل"
        ] },
        { type: "sub", text: "🎨 {skinShop}" },
        { type: "list", items: [
          "أعطِ الأولوية لمكافآت السمات الدائمة، مثل {houseOfCacti}: +2% {squadsAttack}"
        ] },
        { type: "sub", text: "🧪 {trialShop}" },
        { type: "list", items: [
          "**قبل {truegoldDust}:** ادّخر {trialCrystal}",
          "**بعد ذلك:** {truegoldDust} ← {mithril} ← {enhancementXp} ← {charmDesign}"
        ] },
        { type: "sub", text: "💎 {gemShop}" },
        { type: "p", text: "لا تنفق {gems} إلا على مراحل التقدم المهمة أو المواد صعبة الحصول." },
        { type: "callout", text: "**عند الشك: ادّخر جواهرك.** راجع دليل إنفاق الجواهر أدناه." },
        { type: "sub", text: "🤝 التحالف – {allianceShop}" },
        { type: "list", items: [
          "{transferPass} • {vipXp} • طعام / مواد الحيوانات الأليفة • {teleporterAdv} • خصومات 70% مفيدة • التسريعات فقط عند وجود فائض من {allianceToken}"
        ] },
        { type: "h", text: "💎 دليل إنفاق الجواهر" },
        { type: "p", text: "ادّخر {gems} من أجل:" },
        { type: "list", items: [
          "**1) 🎡 {heroRoulette}** ← نحو 162,000 من {gems} مقابل 120 دورة",
          "**2) 👑 تفعيل VIP** ← 10,000 من {gems} شهريًا (من VIP 4 فما فوق)"
        ] },
        { type: "callout", text: "🏛️ {hallOfHeroes} ← نحو 13,500–14,850 من {gems}، **فقط إذا لم يُفتح {marlin} بعد.** توقف بعد فتحه — بعدها تكون الشظايا العامة أفضل قيمة للترقيات." },
        { type: "h", text: "✅ قائمة المهام اليومية" },
        { type: "sub", text: "☀️ أثناء الاتصال" },
        { type: "list", items: [
          "☐ 🎁 استلم صندوق VIP + استخدم {vipXp}",
          "☐ 🤝 {allianceHelp} في التحالف + ساهم في {allianceTech}",
          "☐ 📊 استخدم عناصر خبرة الأبطال",
          "☐ ⚔️ اغزُ المعسكرات ({conquerorsCamp})",
          "☐ 🔎 أكمل {intelMission}",
          "☐ 🏝️ اجمع {waterEssence} في الجزيرة + ساعد الحلفاء",
          "☐ 🔮 استخدم محاولات {mysticTrial}",
          "☐ 📋 أكمل المهام اليومية ({dailyMissions})",
          "☐ 🏟️ العب {arenaOfGlory} قبل إعادة الضبط بـ3 دقائق",
          "☐ 🐻 {bearHunt} — كل يومين + حدّث التشكيلات",
          "☐ 📅 سجّل وشارك في الفعاليات النشطة"
        ] },
        { type: "sub", text: "🌙 قبل تسجيل الخروج" },
        { type: "list", items: [
          "☐ 🐉 أرسل الحيوانات الأليفة إلى {petAdventure}",
          "☐ 🌾 أرسل مسيرات {gathering}",
          "☐ ⚔️ أبقِ {training} القوات نشطًا",
          "☐ 🔬 أبقِ {research} / {construction} نشطين حسب الحاجة"
        ] }
      ]},
      es: { title: "Consejos Generales", blocks: [
        { type: "h", text: "🔗 RECURSOS" },
        { type: "sub", text: "🗓️ CRONOLOGÍA DEL REINO" },
        { type: "p", text: "https://kingshotoptimizer.com/kingdom-timeline/2189" },
        { type: "p", text: "Mira lo que viene para planificar eventos, mejoras y recursos con antelación." },
        { type: "sub", text: "⚔️ OPTIMIZADOR DE EQUIPO DE HÉROE" },
        { type: "p", text: "https://kingshotoptimizer.com/hero-gear" },
        { type: "p", text: "Planifica las mejoras del {heroGear} y evita desperdiciar materiales valiosos." },
        { type: "sub", text: "🎥 YOUTUBE – STRAT GAME SLOTH" },
        { type: "p", text: "https://www.youtube.com/watch?v=NMrS3MTSFUU" },
        { type: "p", text: "Videos de estrategia recomendados, consejos de juego y de progreso." },
        { type: "h", text: "🛒 TIENDAS DEL JUEGO" },
        { type: "p", text: "Qué priorizar en cada tienda para sacar el mejor valor." },
        { type: "sub", text: "🐪 {nomadicMerchant}" },
        { type: "list", items: [
          "{teleporterAdv} por recursos / gratis",
          "Intercambios de recursos favorables",
          "{vipXp} con descuento"
        ] },
        { type: "sub", text: "🎲 {mysteryShop}" },
        { type: "list", items: [
          "Actualización diaria gratis",
          "{widgetChest} al 50% de descuento",
          "20% de descuento solo si lo necesitas con urgencia"
        ] },
        { type: "sub", text: "🏟️ {arenaShop}" },
        { type: "list", items: [
          "{customMythicGearChest} cada semana → {mithril} cuando la base de equipo mítico de tus héroes principales esté lista"
        ] },
        { type: "sub", text: "👑 {vipShop}" },
        { type: "list", items: [
          "Gasta {gems} solo en descuentos: {teleporterAdv} • 100 {enhancementXp} • {forgehammer}"
        ] },
        { type: "sub", text: "🏆 {championshipShop}" },
        { type: "list", items: [
          "**Antes de {masters}:** {artisansVision} • {gildedThreads} / {satin} según necesites",
          "**Después de {masters}:** {masterEmblem} son la prioridad n.º 1 — al final del juego, guarda fichas para ellos"
        ] },
        { type: "sub", text: "⚔️ {swordlandShop}" },
        { type: "list", items: [
          "{artisansVision} → luego lo que te esté frenando: materiales de {governorCharm} / {governorGear} • {forgehammer}"
        ] },
        { type: "sub", text: "🏰 {kopShop}" },
        { type: "list", items: [
          "**{truegold}** — gran cuello de botella de progreso a largo plazo"
        ] },
        { type: "sub", text: "🎨 {skinShop}" },
        { type: "list", items: [
          "Prioriza bonus de estadísticas permanentes, p. ej. {houseOfCacti}: +2% {squadsAttack}"
        ] },
        { type: "sub", text: "🧪 {trialShop}" },
        { type: "list", items: [
          "**Antes de {truegoldDust}:** AHORRA {trialCrystal}",
          "**Después:** {truegoldDust} → {mithril} → {enhancementXp} → {charmDesign}"
        ] },
        { type: "sub", text: "💎 {gemShop}" },
        { type: "p", text: "Gasta {gems} solo en hitos importantes de progreso o en materiales difíciles de conseguir." },
        { type: "callout", text: "**Si dudas: AHORRA TUS GEMAS.** Consulta la guía de gemas más abajo." },
        { type: "sub", text: "🤝 Alianza – {allianceShop}" },
        { type: "list", items: [
          "{transferPass} • {vipXp} • Comida / materiales de mascota • {teleporterAdv} • Descuentos útiles del 70% • Aceleradores solo con {allianceToken} de sobra"
        ] },
        { type: "h", text: "💎 GUÍA DE GASTO DE GEMAS" },
        { type: "p", text: "Ahorra {gems} para:" },
        { type: "list", items: [
          "**1) 🎡 {heroRoulette}** → ~162.000 {gems} por 120 giros",
          "**2) 👑 Activación VIP** → 10.000 {gems}/mes (desde VIP 4)"
        ] },
        { type: "callout", text: "🏛️ {hallOfHeroes} → ~13.500–14.850 {gems}, **SOLO si {marlin} aún no está desbloqueado.** Para después de desbloquearlo — a partir de ahí, los fragmentos generales rinden más para mejorar." },
        { type: "h", text: "✅ LISTA DIARIA" },
        { type: "sub", text: "☀️ MIENTRAS ESTÁS EN LÍNEA" },
        { type: "list", items: [
          "☐ 🎁 Recoge el cofre VIP + usa la {vipXp}",
          "☐ 🤝 {allianceHelp} de alianza + contribuye a la {allianceTech} de alianza",
          "☐ 📊 Usa objetos de EXP de héroe",
          "☐ ⚔️ Conquista campamentos ({conquerorsCamp})",
          "☐ 🔎 Completa las misiones ({intelMission})",
          "☐ 🏝️ Recoge la {waterEssence} de la isla + ayuda a aliados",
          "☐ 🔮 Usa los intentos de la {mysticTrial}",
          "☐ 📋 Completa las misiones diarias ({dailyMissions})",
          "☐ 🏟️ Haz la {arenaOfGlory} 3 minutos antes del reinicio",
          "☐ 🐻 {bearHunt} — cada dos días + actualiza las formaciones",
          "☐ 📅 Inscríbete y participa en los eventos activos"
        ] },
        { type: "sub", text: "🌙 ANTES DE DESCONECTARTE" },
        { type: "list", items: [
          "☐ 🐉 Envía mascotas a la {petAdventure}",
          "☐ 🌾 Envía marchas de {gathering}",
          "☐ ⚔️ Mantén el {training} de tropas activo",
          "☐ 🔬 Mantén {research} / {construction} activas según necesites"
        ] }
      ]}
    }
  },
  "mystic-trial": {
    emoji: "🔮",
    name: { en: "Mystic Trial", zh: "秘境試煉", ko: "신비한 시련", de: "Mystische Prüfung", fr: "Épreuve Mystique", pt: "Prova Mística", tr: "Mistik İmtihan", id: "Ujian Mistis", ru: "Волшебное испытание", th: "บททดสอบลี้ลับ", ar: "الاختبارات الغامضة", es: "Prueba Mística" },
    sections: {
      en: { title: "Mystic Trial", blocks: [
        { type: "h", text: "WHEN" },
        { type: "p", text: "Available every day. Each zone has 5 attempts per day, reset at 00:00 UTC. Which zones are open depends on the weekday." },
        { type: "h", text: "WHY IT MATTERS" },
        { type: "p", text: "An important source of {heroShard}, Hero XP and other progression rewards." },
        { type: "h", text: "TRIAL ZONES" },
        { type: "cards", items: [
          { img: "figures/coliseum.webp", alt: "Coliseum", title: "{coliseum}", meta: "Mon · Tue",
            lines: [
              "⚔️ {infantry} 50% · {cavalry} 10% · {archer} 40%",
              "Only the stats of Heroes, {heroGear} and {heroExclusiveGear} count."
            ] },
          { img: "figures/forest_of_life.webp", alt: "Forest of Life", title: "{forestOfLife}", meta: "Wed · Thu",
            lines: [
              "⚔️ {infantry} 50% · {cavalry} 15% · {archer} 35%",
              "Only {pets} stats count.",
              "{petSkills} are active by default; their effects don't stack."
            ] },
          { img: "figures/crystal_cave.webp", alt: "Crystal Cave", title: "{crystalCave}", meta: "Wed · Thu",
            lines: [
              "⚔️ {infantry} 60% · {cavalry} 20% · {archer} 20%",
              "Only {governorCharm} stats count."
            ] },
          { img: "figures/knowledge_nexus.webp", alt: "Knowledge Nexus", title: "{knowledgeNexus}", meta: "Fri · Sat",
            lines: [
              "⚔️ {infantry} 50% · {cavalry} 20% · {archer} 30%",
              "Only {academy} and {warAcademy} tech stats count.",
              "Higher-level soldiers are used here if you've unlocked them."
            ] },
          { img: "figures/molten_fort.webp", alt: "Molten Fort", title: "{moltenFort}", meta: "Fri · Sat",
            lines: [
              "⚔️ {infantry} 60% · {cavalry} 15% · {archer} 25%",
              "Only {governorGear} stats count."
            ] },
          { img: "figures/radiant_spire.webp", alt: "Radiant Spire", title: "{radiantSpire}", meta: "Sun",
            lines: [
              "⚔️ {infantry} 50% · {cavalry} 15% · {archer} 35%",
              "Almost everything counts: Heroes, {heroGear}, {heroExclusiveGear}, {pets} ({petSkills} active by default), {governorCharm}, {tech}, {truegoldTech}, {governorGear}, {skins}, {oasisIsland} and {vipLevel}.",
              "You fight with your own troops — no losses, and your world-map deployment isn't affected."
            ] }
        ] },
        { type: "callout", text: "In the other five zones the {trialExplorers} supply Lv.10 soldiers, so just raise the stats that zone uses. Clearing stages 1–10 of a zone unlocks {raid}." }
      ]},
      zh: { title: "秘境試煉", blocks: [
        { type: "h", text: "開放時間" },
        { type: "p", text: "每天開放。每個區域每天可挑戰 5 次，於 00:00（UTC+0）重置；開放的區域依星期而定。" },
        { type: "h", text: "為什麼重要" },
        { type: "p", text: "{heroShard}、英雄經驗與其他養成資源的重要來源。" },
        { type: "h", text: "試煉區域" },
        { type: "cards", items: [
          { img: "figures/coliseum.webp", alt: "Coliseum", title: "{coliseum}", meta: "週一、週二",
            lines: [
              "⚔️ {infantry} 50% · {cavalry} 10% · {archer} 40%",
              "只有英雄、{heroGear}和{heroExclusiveGear}的屬性生效。"
            ] },
          { img: "figures/forest_of_life.webp", alt: "Forest of Life", title: "{forestOfLife}", meta: "週三、週四",
            lines: [
              "⚔️ {infantry} 50% · {cavalry} 15% · {archer} 35%",
              "只有{pets}屬性生效。",
              "{petSkills}預設生效（主動使用技能效果不疊加）。"
            ] },
          { img: "figures/crystal_cave.webp", alt: "Crystal Cave", title: "{crystalCave}", meta: "週三、週四",
            lines: [
              "⚔️ {infantry} 60% · {cavalry} 20% · {archer} 20%",
              "只有{governorCharm}的屬性生效。"
            ] },
          { img: "figures/knowledge_nexus.webp", alt: "Knowledge Nexus", title: "{knowledgeNexus}", meta: "週五、週六",
            lines: [
              "⚔️ {infantry} 50% · {cavalry} 20% · {archer} 30%",
              "只有{academy}以及{warAcademy}的科技屬性生效。",
              "若已解鎖更高等級的士兵科技，可使用更高等級的士兵。"
            ] },
          { img: "figures/molten_fort.webp", alt: "Molten Fort", title: "{moltenFort}", meta: "週五、週六",
            lines: [
              "⚔️ {infantry} 60% · {cavalry} 15% · {archer} 25%",
              "只有{governorGear}的屬性生效。"
            ] },
          { img: "figures/radiant_spire.webp", alt: "Radiant Spire", title: "{radiantSpire}", meta: "週日",
            lines: [
              "⚔️ {infantry} 50% · {cavalry} 15% · {archer} 35%",
              "英雄、{heroGear}、{heroExclusiveGear}、{pets}（{petSkills}預設生效）、{governorCharm}、{tech}、{truegoldTech}、{governorGear}、{skins}、{oasisIsland}以及{vipLevel}、建築提供的屬性都將生效。",
              "使用自己的部隊，不影響野外的部隊調度，士兵也不會受傷。"
            ] }
        ] },
        { type: "callout", text: "其他五個區域由{trialExplorers}提供 10 級士兵，專心提升該區域需要的屬性即可。通過區域的 1–10 關後可解鎖{raid}。" }
      ]},
      ko: { title: "신비한 시련", blocks: [
        { type: "h", text: "개최 시기" },
        { type: "p", text: "매일 오픈됩니다. 각 구역은 하루 5회 도전할 수 있으며 매일 UTC 00:00에 갱신됩니다. 요일마다 열리는 구역이 다릅니다." },
        { type: "h", text: "중요한 이유" },
        { type: "p", text: "{heroShard}, 영웅 경험치 및 기타 육성 보상의 중요한 획득처입니다." },
        { type: "h", text: "시련 구역" },
        { type: "cards", items: [
          { img: "figures/coliseum.webp", alt: "Coliseum", title: "{coliseum}", meta: "월요일, 화요일",
            lines: [
              "⚔️ {infantry} 50% · {cavalry} 10% · {archer} 40%",
              "영웅, {heroGear}, {heroExclusiveGear} 속성만 적용됩니다."
            ] },
          { img: "figures/forest_of_life.webp", alt: "Forest of Life", title: "{forestOfLife}", meta: "수요일, 목요일",
            lines: [
              "⚔️ {infantry} 50% · {cavalry} 15% · {archer} 35%",
              "{pets} 속성만 적용됩니다.",
              "{petSkills}은 자동으로 적용됩니다(스킬을 사용해도 중첩되지 않음)."
            ] },
          { img: "figures/crystal_cave.webp", alt: "Crystal Cave", title: "{crystalCave}", meta: "수요일, 목요일",
            lines: [
              "⚔️ {infantry} 60% · {cavalry} 20% · {archer} 20%",
              "{governorCharm} 속성만 적용됩니다."
            ] },
          { img: "figures/knowledge_nexus.webp", alt: "Knowledge Nexus", title: "{knowledgeNexus}", meta: "금요일, 토요일",
            lines: [
              "⚔️ {infantry} 50% · {cavalry} 20% · {archer} 30%",
              "{academy} 및 {warAcademy}의 과학 기술 속성만 적용됩니다.",
              "더 높은 레벨의 병사 과학 기술을 해제하면 더 높은 레벨의 병사를 사용할 수 있습니다."
            ] },
          { img: "figures/molten_fort.webp", alt: "Molten Fort", title: "{moltenFort}", meta: "금요일, 토요일",
            lines: [
              "⚔️ {infantry} 60% · {cavalry} 15% · {archer} 25%",
              "{governorGear} 속성만 적용됩니다."
            ] },
          { img: "figures/radiant_spire.webp", alt: "Radiant Spire", title: "{radiantSpire}", meta: "일요일",
            lines: [
              "⚔️ {infantry} 50% · {cavalry} 15% · {archer} 35%",
              "영웅, {heroGear}, {heroExclusiveGear}, {pets}({petSkills} 기본 적용), {governorCharm}, {tech}, {truegoldTech}, {governorGear}, {skins}, {oasisIsland} 및 {vipLevel}, 건물이 제공하는 속성이 모두 적용됩니다.",
              "자신의 부대를 사용하지만 야외 부대에 영향을 주지 않으며, 병사가 부상당하지도 않습니다."
            ] }
        ] },
        { type: "callout", text: "나머지 다섯 구역에서는 {trialExplorers}가 Lv.10 병사를 제공하므로 해당 구역에 필요한 속성만 올리면 됩니다. 구역의 1-10 스테이지를 클리어하면 {raid}이 해제됩니다." }
      ]},
      de: { title: "Mystische Prüfung", blocks: [
        { type: "h", text: "WANN" },
        { type: "p", text: "Jeden Tag verfügbar. Jede Zone hat 5 Versuche pro Tag, zurückgesetzt um 00:00 UTC. Welche Zonen offen sind, hängt vom Wochentag ab." },
        { type: "h", text: "WARUM ES WICHTIG IST" },
        { type: "p", text: "Wichtige Quelle für {heroShard}, Helden-EP und weitere Fortschrittsbelohnungen." },
        { type: "h", text: "PRÜFUNGSZONEN" },
        { type: "cards", items: [
          { img: "figures/coliseum.webp", alt: "Coliseum", title: "{coliseum}", meta: "Montag & Dienstag",
            lines: [
              "⚔️ {infantry} 50% · {cavalry} 10% · {archer} 40%",
              "Es zählen nur die Werte von Helden, {heroGear} und {heroExclusiveGear}."
            ] },
          { img: "figures/forest_of_life.webp", alt: "Forest of Life", title: "{forestOfLife}", meta: "Mittwoch & Donnerstag",
            lines: [
              "⚔️ {infantry} 50% · {cavalry} 15% · {archer} 35%",
              "Es zählen nur die Werte der {pets}.",
              "{petSkills} sind standardmäßig aktiv; ihre Effekte sind nicht stapelbar."
            ] },
          { img: "figures/crystal_cave.webp", alt: "Crystal Cave", title: "{crystalCave}", meta: "Mittwoch & Donnerstag",
            lines: [
              "⚔️ {infantry} 60% · {cavalry} 20% · {archer} 20%",
              "Es zählen nur die Werte von {governorCharm}."
            ] },
          { img: "figures/knowledge_nexus.webp", alt: "Knowledge Nexus", title: "{knowledgeNexus}", meta: "Freitag & Samstag",
            lines: [
              "⚔️ {infantry} 50% · {cavalry} 20% · {archer} 30%",
              "Es zählen nur die Technologie-Werte von {academy} und {warAcademy}.",
              "Falls freigeschaltet, werden hier Soldaten höherer Level eingesetzt."
            ] },
          { img: "figures/molten_fort.webp", alt: "Molten Fort", title: "{moltenFort}", meta: "Freitag & Samstag",
            lines: [
              "⚔️ {infantry} 60% · {cavalry} 15% · {archer} 25%",
              "Es zählen nur die Werte von {governorGear}."
            ] },
          { img: "figures/radiant_spire.webp", alt: "Radiant Spire", title: "{radiantSpire}", meta: "Sonntag",
            lines: [
              "⚔️ {infantry} 50% · {cavalry} 15% · {archer} 35%",
              "Fast alles zählt: Helden, {heroGear}, {heroExclusiveGear}, {pets} ({petSkills} standardmäßig aktiv), {governorCharm}, {tech}, {truegoldTech}, {governorGear}, {skins}, {oasisIsland} und {vipLevel}.",
              "Du kämpfst mit deinen eigenen Soldaten – ohne Verluste und ohne Auswirkung auf deinen Einsatz auf der Weltkarte."
            ] }
        ] },
        { type: "callout", text: "In den anderen fünf Zonen stellen die {trialExplorers} Lv.10-Soldaten bereit – verbessere einfach die Werte, die die Zone braucht. Wer die Stufen 1–10 einer Zone abschließt, schaltet die {raid}-Funktion frei." }
      ]},
      fr: { title: "Épreuve Mystique", blocks: [
        { type: "h", text: "QUAND" },
        { type: "p", text: "Disponible tous les jours. Chaque zone offre 5 tentatives par jour, réinitialisées à 00:00 UTC. Les zones ouvertes dépendent du jour de la semaine." },
        { type: "h", text: "POURQUOI C'EST IMPORTANT" },
        { type: "p", text: "Une source importante de {heroShard}, d'XP de héros et d'autres récompenses de progression." },
        { type: "h", text: "ZONES DE L'ÉPREUVE" },
        { type: "cards", items: [
          { img: "figures/coliseum.webp", alt: "Coliseum", title: "{coliseum}", meta: "Lundi & Mardi",
            lines: [
              "⚔️ {infantry} 50% · {cavalry} 10% · {archer} 40%",
              "Seules les stats des Héros, de l'{heroGear} et de l'{heroExclusiveGear} comptent."
            ] },
          { img: "figures/forest_of_life.webp", alt: "Forest of Life", title: "{forestOfLife}", meta: "Mercredi & Jeudi",
            lines: [
              "⚔️ {infantry} 50% · {cavalry} 15% · {archer} 35%",
              "Seules les stats des {pets} comptent.",
              "Les {petSkills} sont actives par défaut, mais leurs effets ne se cumulent pas."
            ] },
          { img: "figures/crystal_cave.webp", alt: "Crystal Cave", title: "{crystalCave}", meta: "Mercredi & Jeudi",
            lines: [
              "⚔️ {infantry} 60% · {cavalry} 20% · {archer} 20%",
              "Seules les stats du {governorCharm} comptent."
            ] },
          { img: "figures/knowledge_nexus.webp", alt: "Knowledge Nexus", title: "{knowledgeNexus}", meta: "Vendredi & Samedi",
            lines: [
              "⚔️ {infantry} 50% · {cavalry} 20% · {archer} 30%",
              "Seules les stats des Techs de l'{academy} et de l'{warAcademy} comptent.",
              "Des soldats de plus haut niveau sont utilisés ici s'ils sont débloqués."
            ] },
          { img: "figures/molten_fort.webp", alt: "Molten Fort", title: "{moltenFort}", meta: "Vendredi & Samedi",
            lines: [
              "⚔️ {infantry} 60% · {cavalry} 15% · {archer} 25%",
              "Seules les stats de l'{governorGear} comptent."
            ] },
          { img: "figures/radiant_spire.webp", alt: "Radiant Spire", title: "{radiantSpire}", meta: "Dimanche",
            lines: [
              "⚔️ {infantry} 50% · {cavalry} 15% · {archer} 35%",
              "Presque tout compte : Héros, {heroGear}, {heroExclusiveGear}, {pets} ({petSkills} actives par défaut), {governorCharm}, {tech}, {truegoldTech}, {governorGear}, {skins}, {oasisIsland} et {vipLevel}.",
              "Tu utilises tes propres soldats — sans pertes et sans affecter ton déploiement sur la carte du monde."
            ] }
        ] },
        { type: "callout", text: "Dans les cinq autres zones, les {trialExplorers} fournissent des soldats de Niv. 10 : concentre-toi sur les stats requises par la zone. Terminer les étapes 1 à 10 d'une zone débloque le {raid}." }
      ]},
      pt: { title: "Prova Mística", blocks: [
        { type: "h", text: "QUANDO" },
        { type: "p", text: "Disponível todos os dias. Cada zona tem 5 tentativas por dia, renovadas às 00:00 UTC. As zonas abertas dependem do dia da semana." },
        { type: "h", text: "POR QUE IMPORTA" },
        { type: "p", text: "Fonte importante de {heroShard}, XP de Herói e outras recompensas de progressão." },
        { type: "h", text: "ZONAS DA PROVA" },
        { type: "cards", items: [
          { img: "figures/coliseum.webp", alt: "Coliseum", title: "{coliseum}", meta: "Segunda e Terça",
            lines: [
              "⚔️ {infantry} 50% · {cavalry} 10% · {archer} 40%",
              "Apenas as estatísticas de Heróis, {heroGear} e {heroExclusiveGear} contam."
            ] },
          { img: "figures/forest_of_life.webp", alt: "Forest of Life", title: "{forestOfLife}", meta: "Quarta e Quinta",
            lines: [
              "⚔️ {infantry} 50% · {cavalry} 15% · {archer} 35%",
              "Apenas as estatísticas dos {pets} contam.",
              "As {petSkills} são eficazes por padrão, e seus efeitos não são cumulativos."
            ] },
          { img: "figures/crystal_cave.webp", alt: "Crystal Cave", title: "{crystalCave}", meta: "Quarta e Quinta",
            lines: [
              "⚔️ {infantry} 60% · {cavalry} 20% · {archer} 20%",
              "Apenas as estatísticas do {governorCharm} contam."
            ] },
          { img: "figures/knowledge_nexus.webp", alt: "Knowledge Nexus", title: "{knowledgeNexus}", meta: "Sexta e Sábado",
            lines: [
              "⚔️ {infantry} 50% · {cavalry} 20% · {archer} 30%",
              "Apenas as estatísticas de Tecnologia da {academy} e da {warAcademy} contam.",
              "Soldados de nível superior são usados aqui, se desbloqueados."
            ] },
          { img: "figures/molten_fort.webp", alt: "Molten Fort", title: "{moltenFort}", meta: "Sexta e Sábado",
            lines: [
              "⚔️ {infantry} 60% · {cavalry} 15% · {archer} 25%",
              "Apenas as estatísticas do {governorGear} contam."
            ] },
          { img: "figures/radiant_spire.webp", alt: "Radiant Spire", title: "{radiantSpire}", meta: "Domingo",
            lines: [
              "⚔️ {infantry} 50% · {cavalry} 15% · {archer} 35%",
              "Quase tudo conta: Heróis, {heroGear}, {heroExclusiveGear}, {pets} ({petSkills} efetivas por padrão), {governorCharm}, {tech}, {truegoldTech}, {governorGear}, {skins}, {oasisIsland} e {vipLevel}.",
              "Você usa seus próprios soldados — sem baixas e sem afetar sua implantação no mapa-múndi."
            ] }
        ] },
        { type: "callout", text: "Nas outras cinco zonas, os {trialExplorers} fornecem soldados de nível 10: foque em aprimorar as estatísticas que a zona exige. Concluir as Etapas 1 a 10 de uma zona desbloqueia o recurso de {raid}." }
      ]},
      tr: { title: "Mistik İmtihan", blocks: [
        { type: "h", text: "NE ZAMAN" },
        { type: "p", text: "Her gün açık. Her bölge için günde 5 mücadele hakkı vardır; haklar UTC 00:00'da yenilenir. Açık bölgeler haftanın gününe göre değişir." },
        { type: "h", text: "NEDEN ÖNEMLİ" },
        { type: "p", text: "{heroShard}, Kahraman XP'si ve diğer gelişim ödülleri için önemli bir kaynak." },
        { type: "h", text: "İMTİHAN BÖLGELERİ" },
        { type: "cards", items: [
          { img: "figures/coliseum.webp", alt: "Coliseum", title: "{coliseum}", meta: "Pazartesi & Salı",
            lines: [
              "⚔️ {infantry} 50% · {cavalry} 10% · {archer} 40%",
              "Sadece Kahraman, {heroGear} ve {heroExclusiveGear} nitelikleri geçerlidir."
            ] },
          { img: "figures/forest_of_life.webp", alt: "Forest of Life", title: "{forestOfLife}", meta: "Çarşamba & Perşembe",
            lines: [
              "⚔️ {infantry} 50% · {cavalry} 15% · {archer} 35%",
              "Sadece {pets} nitelikleri geçerlidir.",
              "{petSkills} varsayılan olarak devrededir; etkileri birikmez."
            ] },
          { img: "figures/crystal_cave.webp", alt: "Crystal Cave", title: "{crystalCave}", meta: "Çarşamba & Perşembe",
            lines: [
              "⚔️ {infantry} 60% · {cavalry} 20% · {archer} 20%",
              "Sadece {governorCharm} nitelikleri geçerlidir."
            ] },
          { img: "figures/knowledge_nexus.webp", alt: "Knowledge Nexus", title: "{knowledgeNexus}", meta: "Cuma & Cumartesi",
            lines: [
              "⚔️ {infantry} 50% · {cavalry} 20% · {archer} 30%",
              "Sadece {academy} ve {warAcademy} nitelikleri geçerlidir.",
              "Kilidi açılmışsa burada daha yüksek seviyeli askerler kullanılır."
            ] },
          { img: "figures/molten_fort.webp", alt: "Molten Fort", title: "{moltenFort}", meta: "Cuma & Cumartesi",
            lines: [
              "⚔️ {infantry} 60% · {cavalry} 15% · {archer} 25%",
              "Sadece {governorGear} nitelikleri geçerlidir."
            ] },
          { img: "figures/radiant_spire.webp", alt: "Radiant Spire", title: "{radiantSpire}", meta: "Pazar",
            lines: [
              "⚔️ {infantry} 50% · {cavalry} 15% · {archer} 35%",
              "Neredeyse her şey geçerlidir: Kahraman, {heroGear}, {heroExclusiveGear}, {pets} ({petSkills} varsayılan olarak geçerli), {governorCharm}, {tech}, {truegoldTech}, {governorGear}, {skins}, {oasisIsland} ve {vipLevel}.",
              "Kendi askerlerini kullanırsın; kayıp vermezsin ve dünya haritasındaki konuşlanman etkilenmez."
            ] }
        ] },
        { type: "callout", text: "Diğer beş bölgede {trialExplorers} Seviye 10 asker sağlar; sadece bölgenin istediği nitelikleri geliştir. Bir bölgenin 1-10. aşamalarını geçmek {raid} özelliğini açar." }
      ]},
      id: { title: "Ujian Mistis", blocks: [
        { type: "h", text: "KAPAN" },
        { type: "p", text: "Tersedia setiap hari. Setiap zona punya 5 percobaan per hari, direset pukul 00:00 UTC. Zona yang dibuka tergantung harinya." },
        { type: "h", text: "KENAPA PENTING" },
        { type: "p", text: "Sumber penting {heroShard}, XP Hero, dan hadiah progres lainnya." },
        { type: "h", text: "ZONA UJIAN" },
        { type: "cards", items: [
          { img: "figures/coliseum.webp", alt: "Coliseum", title: "{coliseum}", meta: "Senin & Selasa",
            lines: [
              "⚔️ {infantry} 50% · {cavalry} 10% · {archer} 40%",
              "Hanya Stat Hero, {heroGear}, dan {heroExclusiveGear} yang berlaku."
            ] },
          { img: "figures/forest_of_life.webp", alt: "Forest of Life", title: "{forestOfLife}", meta: "Rabu & Kamis",
            lines: [
              "⚔️ {infantry} 50% · {cavalry} 15% · {archer} 35%",
              "Hanya Stat {pets} yang berlaku.",
              "{petSkills} aktif secara default, dan efeknya tidak bisa ditumpuk."
            ] },
          { img: "figures/crystal_cave.webp", alt: "Crystal Cave", title: "{crystalCave}", meta: "Rabu & Kamis",
            lines: [
              "⚔️ {infantry} 60% · {cavalry} 20% · {archer} 20%",
              "Hanya Stat {governorCharm} yang berlaku."
            ] },
          { img: "figures/knowledge_nexus.webp", alt: "Knowledge Nexus", title: "{knowledgeNexus}", meta: "Jumat & Sabtu",
            lines: [
              "⚔️ {infantry} 50% · {cavalry} 20% · {archer} 30%",
              "Hanya Stat Teknologi {academy} dan {warAcademy} yang berlaku.",
              "Prajurit level lebih tinggi dipakai di sini jika sudah dibuka."
            ] },
          { img: "figures/molten_fort.webp", alt: "Molten Fort", title: "{moltenFort}", meta: "Jumat & Sabtu",
            lines: [
              "⚔️ {infantry} 60% · {cavalry} 15% · {archer} 25%",
              "Hanya Stat {governorGear} yang berlaku."
            ] },
          { img: "figures/radiant_spire.webp", alt: "Radiant Spire", title: "{radiantSpire}", meta: "Minggu",
            lines: [
              "⚔️ {infantry} 50% · {cavalry} 15% · {archer} 35%",
              "Hampir semua stat berlaku: Hero, {heroGear}, {heroExclusiveGear}, {pets} ({petSkills} aktif secara default), {governorCharm}, {tech}, {truegoldTech}, {governorGear}, {skins}, {oasisIsland}, dan {vipLevel}.",
              "Kamu memakai prajurit sendiri — tanpa kerugian dan tanpa memengaruhi pengerahan di peta dunia."
            ] }
        ] },
        { type: "callout", text: "Di lima zona lainnya, {trialExplorers} menyediakan prajurit Lv.10 — cukup tingkatkan stat yang dibutuhkan zona itu. Menyelesaikan Stage 1–10 di sebuah zona membuka fitur {raid}." }
      ]},
      ru: { title: "Волшебное испытание", blocks: [
        { type: "h", text: "КОГДА" },
        { type: "p", text: "Доступно каждый день. В каждой зоне 5 попыток в день, обновление в 00:00 (UTC+0). Открытые зоны зависят от дня недели." },
        { type: "h", text: "ПОЧЕМУ ЭТО ВАЖНО" },
        { type: "p", text: "Важный источник: {heroShard}, опыт героев и другие награды для развития." },
        { type: "h", text: "ЗОНЫ ИСПЫТАНИЯ" },
        { type: "cards", items: [
          { img: "figures/coliseum.webp", alt: "Coliseum", title: "{coliseum}", meta: "понедельник и вторник",
            lines: [
              "⚔️ {infantry} 50% · {cavalry} 10% · {archer} 40%",
              "Действуют только показатели: герои, {heroGear}, {heroExclusiveGear}."
            ] },
          { img: "figures/forest_of_life.webp", alt: "Forest of Life", title: "{forestOfLife}", meta: "среда и четверг",
            lines: [
              "⚔️ {infantry} 50% · {cavalry} 15% · {archer} 35%",
              "Действуют только показатели: {pets}.",
              "По умолчанию действуют {petSkills}; их эффекты не суммируются."
            ] },
          { img: "figures/crystal_cave.webp", alt: "Crystal Cave", title: "{crystalCave}", meta: "среда и четверг",
            lines: [
              "⚔️ {infantry} 60% · {cavalry} 20% · {archer} 20%",
              "Действуют только показатели: {governorCharm}."
            ] },
          { img: "figures/knowledge_nexus.webp", alt: "Knowledge Nexus", title: "{knowledgeNexus}", meta: "пятница и суббота",
            lines: [
              "⚔️ {infantry} 50% · {cavalry} 20% · {archer} 30%",
              "Действуют только показатели технологий: {academy} и {warAcademy}.",
              "Если открыты солдаты более высокого уровня, здесь используются они."
            ] },
          { img: "figures/molten_fort.webp", alt: "Molten Fort", title: "{moltenFort}", meta: "пятница и суббота",
            lines: [
              "⚔️ {infantry} 60% · {cavalry} 15% · {archer} 25%",
              "Действуют только показатели: {governorGear}."
            ] },
          { img: "figures/radiant_spire.webp", alt: "Radiant Spire", title: "{radiantSpire}", meta: "воскресенье",
            lines: [
              "⚔️ {infantry} 50% · {cavalry} 15% · {archer} 35%",
              "Действует почти всё: герои, {heroGear}, {heroExclusiveGear}, {pets} ({petSkills} действуют по умолчанию), {governorCharm}, {tech}, {truegoldTech}, {governorGear}, {skins}, {oasisIsland} и {vipLevel}.",
              "Вы используете своих солдат — без потерь и без влияния на отправления на карте мира."
            ] }
        ] },
        { type: "callout", text: "В остальных пяти зонах {trialExplorers} предоставляют солдат ур. 10 — просто улучшайте показатели, нужные зоне. Прохождение этапов 1–10 зоны открывает функцию «{raid}»." }
      ]},
      th: { title: "บททดสอบลี้ลับ", blocks: [
        { type: "h", text: "เมื่อไหร่" },
        { type: "p", text: "เปิดทุกวัน แต่ละโซนท้าทายได้ 5 ครั้งต่อวัน รีเฟรชทุกวันเวลา UTC 00:00 โซนที่เปิดจะเปลี่ยนไปตามวันในสัปดาห์" },
        { type: "h", text: "ทำไมถึงสำคัญ" },
        { type: "p", text: "แหล่งสำคัญของ{heroShard} EXP ฮีโร่ และรางวัลพัฒนาอื่นๆ" },
        { type: "h", text: "โซนบททดสอบ" },
        { type: "cards", items: [
          { img: "figures/coliseum.webp", alt: "Coliseum", title: "{coliseum}", meta: "วันจันทร์และวันอังคาร",
            lines: [
              "⚔️ {infantry} 50% · {cavalry} 10% · {archer} 40%",
              "มีผลเฉพาะค่าสถานะของฮีโร่ {heroGear} และ{heroExclusiveGear}"
            ] },
          { img: "figures/forest_of_life.webp", alt: "Forest of Life", title: "{forestOfLife}", meta: "วันพุธและวันพฤหัสบดี",
            lines: [
              "⚔️ {infantry} 50% · {cavalry} 15% · {archer} 35%",
              "มีผลเฉพาะค่าสถานะของ{pets}",
              "{petSkills}มีผลโดยอัตโนมัติ และไม่สามารถซ้อนทับได้"
            ] },
          { img: "figures/crystal_cave.webp", alt: "Crystal Cave", title: "{crystalCave}", meta: "วันพุธและวันพฤหัสบดี",
            lines: [
              "⚔️ {infantry} 60% · {cavalry} 20% · {archer} 20%",
              "มีผลเฉพาะค่าสถานะของ{governorCharm}"
            ] },
          { img: "figures/knowledge_nexus.webp", alt: "Knowledge Nexus", title: "{knowledgeNexus}", meta: "วันศุกร์และวันเสาร์",
            lines: [
              "⚔️ {infantry} 50% · {cavalry} 20% · {archer} 30%",
              "มีผลเฉพาะค่าสถานะจากเทคโนโลยีของ{academy}และ{warAcademy}",
              "หากปลดล็อกแล้ว จะใช้กองทหารเลเวลที่สูงกว่า"
            ] },
          { img: "figures/molten_fort.webp", alt: "Molten Fort", title: "{moltenFort}", meta: "วันศุกร์และวันเสาร์",
            lines: [
              "⚔️ {infantry} 60% · {cavalry} 15% · {archer} 25%",
              "มีผลเฉพาะค่าสถานะของ{governorGear}"
            ] },
          { img: "figures/radiant_spire.webp", alt: "Radiant Spire", title: "{radiantSpire}", meta: "วันอาทิตย์",
            lines: [
              "⚔️ {infantry} 50% · {cavalry} 15% · {archer} 35%",
              "เกือบทุกอย่างมีผล: ฮีโร่, {heroGear}, {heroExclusiveGear}, {pets} ({petSkills}มีผลโดยอัตโนมัติ), {governorCharm}, {tech}, {truegoldTech}, {governorGear}, {skins}, {oasisIsland} และ{vipLevel}",
              "ใช้กองทหารของคุณเอง โดยไม่กระทบการเดินทัพในแผนที่โลก และไม่สูญเสียกองทหาร"
            ] }
        ] },
        { type: "callout", text: "ในอีกห้าโซน {trialExplorers}จะจัดเตรียมกองทหารเลเวล 10 ให้ จึงโฟกัสเพิ่มค่าสถานะที่โซนนั้นต้องการได้เลย ผ่านด่านที่ 1-10 ของโซนเพื่อปลดล็อกฟีเจอร์{raid}" }
      ]},
      ar: { title: "الاختبارات الغامضة", blocks: [
        { type: "h", text: "متى" },
        { type: "p", text: "متاح يوميًا. لكل منطقة 5 محاولات تحدٍّ يوميًا، تُحدَّث عند الساعة 00:00 بتوقيت UTC. تختلف المناطق المفتوحة حسب يوم الأسبوع." },
        { type: "h", text: "لماذا هي مهمة" },
        { type: "p", text: "مصدر مهم لـ{heroShard} وخبرة الأبطال ومكافآت التطور الأخرى." },
        { type: "h", text: "مناطق الاختبار" },
        { type: "cards", items: [
          { img: "figures/coliseum.webp", alt: "Coliseum", title: "{coliseum}", meta: "الاثنين والثلاثاء",
            lines: [
              "⚔️ {infantry} 50% · {cavalry} 10% · {archer} 40%",
              "فقط سمات الأبطال و{heroGear} و{heroExclusiveGear} تصبح سارية هنا."
            ] },
          { img: "figures/forest_of_life.webp", alt: "Forest of Life", title: "{forestOfLife}", meta: "الأربعاء والخميس",
            lines: [
              "⚔️ {infantry} 50% · {cavalry} 15% · {archer} 35%",
              "فقط سمات {pets} تصبح سارية هنا.",
              "{petSkills} فعالة افتراضيًا، وتأثيراتها غير قابلة للتراكم."
            ] },
          { img: "figures/crystal_cave.webp", alt: "Crystal Cave", title: "{crystalCave}", meta: "الأربعاء والخميس",
            lines: [
              "⚔️ {infantry} 60% · {cavalry} 20% · {archer} 20%",
              "فقط سمات {governorCharm} تصبح سارية هنا."
            ] },
          { img: "figures/knowledge_nexus.webp", alt: "Knowledge Nexus", title: "{knowledgeNexus}", meta: "الجمعة والسبت",
            lines: [
              "⚔️ {infantry} 50% · {cavalry} 20% · {archer} 30%",
              "فقط سمات تقنية {academy} و{warAcademy} تصبح سارية هنا.",
              "يُستخدم جنود بمستوى أعلى هنا إذا تم فتحهم."
            ] },
          { img: "figures/molten_fort.webp", alt: "Molten Fort", title: "{moltenFort}", meta: "الجمعة والسبت",
            lines: [
              "⚔️ {infantry} 60% · {cavalry} 15% · {archer} 25%",
              "فقط سمات {governorGear} تصبح سارية هنا."
            ] },
          { img: "figures/radiant_spire.webp", alt: "Radiant Spire", title: "{radiantSpire}", meta: "الأحد",
            lines: [
              "⚔️ {infantry} 50% · {cavalry} 15% · {archer} 35%",
              "تقريبًا كل شيء يسري هنا: الأبطال، {heroGear}، {heroExclusiveGear}، {pets} ({petSkills} فعالة افتراضيًا)، {governorCharm}، {tech}، {truegoldTech}، {governorGear}، {skins}، {oasisIsland}، و{vipLevel}.",
              "تستخدم جنودك دون التأثير على نشر قواتك على خريطة العالم ودون تكبد أي خسائر."
            ] }
        ] },
        { type: "callout", text: "في المناطق الخمس الأخرى، يزودك {trialExplorers} بجنود مستوى 10، فركّز على تعزيز السمات المطلوبة لكل منطقة. أكمل المراحل 1-10 في المنطقة لفتح ميزة {raid}." }
      ]},
      es: { title: "Prueba Mística", blocks: [
        { type: "h", text: "CUÁNDO" },
        { type: "p", text: "Disponible todos los días. Cada zona tiene 5 intentos de desafío diarios, que se restablecen a las 00:00 UTC. Las zonas abiertas dependen del día de la semana." },
        { type: "h", text: "POR QUÉ IMPORTA" },
        { type: "p", text: "Fuente importante de {heroShard}, EXP de Héroe y otras recompensas de progreso." },
        { type: "h", text: "ZONAS DE LA PRUEBA" },
        { type: "cards", items: [
          { img: "figures/coliseum.webp", alt: "Coliseum", title: "{coliseum}", meta: "lunes y martes",
            lines: [
              "⚔️ {infantry} 50% · {cavalry} 10% · {archer} 40%",
              "Solo surten efecto los atributos de los Héroes, el {heroGear} y el {heroExclusiveGear}."
            ] },
          { img: "figures/forest_of_life.webp", alt: "Forest of Life", title: "{forestOfLife}", meta: "miércoles y jueves",
            lines: [
              "⚔️ {infantry} 50% · {cavalry} 15% · {archer} 35%",
              "Solo surten efecto los atributos de las {pets}.",
              "Las {petSkills} están activas por defecto, y sus efectos no son acumulables."
            ] },
          { img: "figures/crystal_cave.webp", alt: "Crystal Cave", title: "{crystalCave}", meta: "miércoles y jueves",
            lines: [
              "⚔️ {infantry} 60% · {cavalry} 20% · {archer} 20%",
              "Solo surten efecto los atributos del {governorCharm}."
            ] },
          { img: "figures/knowledge_nexus.webp", alt: "Knowledge Nexus", title: "{knowledgeNexus}", meta: "viernes y sábado",
            lines: [
              "⚔️ {infantry} 50% · {cavalry} 20% · {archer} 30%",
              "Solo surten efecto los atributos de Tecnologías de la {academy} y la {warAcademy}.",
              "Si están desbloqueados, aquí se usan soldados de nivel superior."
            ] },
          { img: "figures/molten_fort.webp", alt: "Molten Fort", title: "{moltenFort}", meta: "viernes y sábado",
            lines: [
              "⚔️ {infantry} 60% · {cavalry} 15% · {archer} 25%",
              "Solo surten efecto los atributos del {governorGear}."
            ] },
          { img: "figures/radiant_spire.webp", alt: "Radiant Spire", title: "{radiantSpire}", meta: "domingo",
            lines: [
              "⚔️ {infantry} 50% · {cavalry} 15% · {archer} 35%",
              "Casi todo surte efecto: Héroes, {heroGear}, {heroExclusiveGear}, {pets} (con sus habilidades activas por defecto), {governorCharm}, {tech}, {truegoldTech}, {governorGear}, {skins}, {oasisIsland} y {vipLevel}.",
              "Usas tus propios soldados, sin afectar tu despliegue en el mapa mundial ni sufrir bajas."
            ] }
        ] },
        { type: "callout", text: "En las otras cinco zonas, los {trialExplorers} proporcionan Soldados Nv. 10: céntrate en mejorar los atributos que pide cada zona. Superar las Etapas 1-10 de una zona desbloquea la función de {raid}." }
      ]}
    }
  },
  "bear-hunt": {
    emoji: "🐻",
    name: { en: "Bear Hunt", zh: "狩獵巨熊", ko: "자이언트 베어 사냥", de: "Bärenjagd", fr: "Chasse à l'Ours", pt: "Caça ao Urso", es: "Cacería del Oso", tr: "Ayı Avı", id: "Bear Hunt", ru: "Охота на медведя", th: "ล่าหมี", ar: "صيد الدببة" },
    joiners: [
      { hero: "Chenko", role: "lethality", img: "figures/chenko.png" },
      { hero: "Yeonwoo", role: "lethality", img: "figures/yeonwoo.png" },
      { hero: "Amane", role: "attack", img: "figures/amene.png" },
      { hero: "Amadeus", role: "lethality", img: "figures/amadeus.png" }
    ],
    /* 主將陣容（各語言共用）；說明文字在各語言 blocks 的 leaders 區塊 */
    leaders: [
      { rows: [
        { tag: "best", heroes: ["Amadeus", "Jabel", "Quinn"], ratio: "30-30-40", img: "figures/Gen1_best.png" },
        { tag: "alt", heroes: ["Helga", "Jabel", "Quinn"], ratio: "20-40-40", img: "figures/Gen1_alternative.png" },
        { tag: "f2p", heroes: ["Howard", "Jabel", "Quinn"], ratio: "30-30-40", img: "figures/Gen1_F2P.png" }
      ]},
      { rows: [
        { tag: "best", heroes: ["Amadeus", "Hilde", "Marlin"], ratio: "20-30-50", img: "figures/Gen2_best.png" },
        { tag: "alt", heroes: ["Helga", "Jabel", "Marlin"], ratio: "20-30-50", img: "figures/Gen2_alternative.png" },
        { tag: "f2p", heroes: ["Zoe", "Jabel", "Quinn"], ratio: "30-30-40", img: "figures/Gen2_F2P.png" }
      ]},
      { rows: [
        { tag: "best", heroes: ["Helga", "Petra", "Marlin"], ratio: "10-20-70", img: "figures/Gen3_best.png" },
        { tag: "alt", heroes: ["Amadeus", "Petra", "Marlin"], ratio: "20-30-50", img: "figures/Gen3_alternative.png" },
        { tag: "f2p", heroes: ["Zoe", "Petra", "Quinn"], ratio: "20-40-40", img: "figures/Gen3_F2P.png" }
      ]},
      { rows: [
        { tag: "best", heroes: ["Amadeus", "Petra", "Rosa"], ratio: "10-10-80", img: "figures/Gen4_best.png" },
        { tag: "alt", heroes: ["Helga", "Petra", "Rosa"], ratio: "10-10-80", img: "figures/Gen4_alternative.png" },
        { tag: "f2p", heroes: ["Zoe", "Petra", "Rosa"], ratio: "10-10-80", img: "figures/Gen4_F2P.png" }
      ]},
      { rows: [
        { tag: "best", heroes: ["Amadeus", "", ""], ratio: "" }
      ]}
    ],
    sections: {
      en: { title: "Bear Hunt", blocks: [
        { type: "h", text: "WHEN" },
        { type: "p", text: "Every 2 days at your Alliance's scheduled time." },
        { type: "h", text: "WHY IT MATTERS" },
        { type: "p", text: "Major source of Hero Gear materials (Forge Hammers), Enhancement XP." },
        { type: "h", text: "PREP" },
        { type: "list", items: [
          "Update your formations before every Bear Hunt."
        ]},
        { type: "callout", text: "Optional: use https://frakinator.streamlit.app/ to test troop ratios and find your strongest formation." },
        { type: "list", items: [
          "Recall gathering troops before the event starts.",
          "Remember: In the final 5–7 minutes, everyone should launch a rally. This creates more spots for players whose troops are returning, allowing for a final damage push."
        ]},
        { type: "h", text: "RALLY LEADERS" },
        { type: "callout", text: "⚠️ **New rule:** your maximum troop capacity may only be used in the rally you are leading. When you join someone else's rally, you must also limit your formation to **80,000 troops**." },
        { type: "leaders",
          gens: ["GEN 1","GEN 2","GEN 3","GEN 4","GEN 5"],
          notes: [
            [
              "Troop formation: 30-30-40%. In most cases you will have best stats on infantry due to Amadeus's raw stats, so an ultra-equal formation with slightly more archer troops works best.",
              "Troop formation: 20-40-40%. Mainly for people that didn't go for Amadeus yet, and keeps the opportunity to use Amadeus for joining rallies.",
              "Troop formation: 30-30-40%. For F2P it is recommended to always use the 3 heroes you have for hosting a rally."
            ],
            [
              "Troop formation: 20-30-50%. Marlin will boost damage a lot due to his widget. From Gen 2 up, infantry will always be Amadeus or Helga — they are the only infantry heroes with rally widgets (lethality bonus). You send fewer infantry, so the infantry hero covers archer damage via the widget rather than matching infantry stats.",
              "Troop formation: 20-30-50%. Other alternative is swapping Quinn for Marlin if he isn't better yet. Use Helga in Gen 2+ only if Amadeus isn't 5-star + max widget level; also an opportunity to use Amadeus for joining rallies.",
              "Troop formation: 30-30-40%. Still no F2P hero with a rally widget, so again an even formation with slightly more archers, as archer stats will be lowest due to not having an SSR archer hero."
            ],
            [
              "Troop formation: 10-20-70%. Maxed-out Helga performs better than Amadeus in Gen 3, due to having 2 lethality widgets and 1 attack widget compared to 1 lethality widget and 2 attack widgets in this setup.",
              "Troop formation: 20-30-50%. If you don't have maxed-out Helga (5-star + widget) it is better to use Amadeus.",
              "Troop formation: 20-40-40%. In Gen 3, F2P get their first hero with a rally widget (Petra). Try even archer/cav numbers because Petra improves archer troops a lot. Archer stats are still lowest without an SSR archer. If you unlock T10 cavalry, the T10 skill pairs well with Petra's stats."
            ],
            [
              "Troop formation: 10-10-80%. Force as many archer troops as you can, especially if they are T10. With a bit of luck Rosa's 3rd skill will do the work for you (Increasing Archers' total Attack by 30%).",
              "Troop formation: 10-10-80%. Use Helga as alternative if she has better stars and widget level than Amadeus. Still force as many archers as you can, especially T10, for Rosa's 3rd skill (Increasing Archers' total Attack by 30%).",
              "Troop formation: 10-10-80%. Same as alternative best heroes — Rosa's 3rd skill bonuses best if you focus on heavy archer formations (Increasing Archers' total Attack by 30%)."
            ],
            [
              "Remaining host slots not released yet."
            ]
          ]},
        { type: "h", text: "RALLY JOINERS" },
        { type: "callout", text: "⚠️ **New rule:** save your joining formations now and make sure they do **not exceed 80,000 troops**. Update them ahead of time so there are no mistakes during Bear Hunt." },
        { type: "p", text: "Standard / Safe Ratio: 10% Infantry, 10% Cavalry, and 80% Archers (or a variation like 20-30-50)" },
        { type: "joiners" }
      ]},
      zh: { title: "狩獵巨熊", blocks: [
        { type: "h", text: "時間" },
        { type: "p", text: "每 2 天，依聯盟排定的時間進行。" },
        { type: "h", text: "重要性" },
        { type: "p", text: "英雄裝備材料（鍛造錘）與強化經驗值的主要來源。" },
        { type: "h", text: "準備事項" },
        { type: "list", items: [
          "每次狩獵巨熊前更新部隊編組。"
        ]},
        { type: "callout", text: "可選擇：使用 https://frakinator.streamlit.app 測試士兵比例，找出最強部隊編組。" },
        { type: "list", items: [
          "活動開始前記得召回採集中的部隊。",
          "切記：在最後 5–7 分鐘，所有人都應發起集結。這樣能讓部隊返回的玩家有更多集結位可加入，進行最後的傷害衝刺。"
        ]},
        { type: "h", text: "集結指揮" },
        { type: "callout", text: "⚠️ **新規定：**只有你自己發起的集結可以派出最大部隊容量。加入別人的集結時，部隊也必須限制在 **80,000 人**以內。" },
        { type: "leaders",
          gens: ["第 1 代","第 2 代","第 3 代","第 4 代","第 5 代"],
          notes: [
            [
              "多數情況步兵最強，因阿瑪迪斯數值高；弓兵稍多的平均編組效果最好。",
              "適合尚未抽到阿瑪迪斯的玩家，同時讓阿瑪迪斯保留給集結。",
              "免費玩家建議永遠用手上最強的三位英雄擔任指揮。"
            ],
            [
              "馬林能大幅提升傷害，因為擁有集結專屬裝備（殺傷力加成）；步兵固定用阿瑪迪斯或赫爾加。",
              "若馬林不夠強可換成奎恩；赫爾加只在阿瑪迪斯未滿裝時使用。",
              "目前免費玩家仍無擁有集結裝備的弓兵，弓兵屬性最弱。"
            ],
            [
              "滿等赫爾加（2 殺傷力＋1 攻擊）表現優於阿瑪迪斯（1 殺傷力＋2 攻擊）。",
              "若赫爾加尚未練滿，改用阿瑪迪斯較好。",
              "終於拿到第一位集結裝備英雄（Petra），弓兵屬性仍最低；滿級騎兵能發揮很好。"
            ],
            [
              "盡量拉高弓兵數量，滿級弓兵尤佳；Rosa 三技能可能提升弓兵總攻擊 30%。",
              "若赫爾加星級裝備高於阿瑪迪斯可替代使用。",
              "與替代組合相同，Rosa 三技能在重弓兵編組下效果最佳。"
            ],
            [
              "其餘指揮欄位尚未公布。"
            ]
          ]},
        { type: "h", text: "集結參與者" },
        { type: "callout", text: "⚠️ **新規定：**請現在就把參與集結用的部隊編組存好，並確認**不超過 80,000 人**。請提前更新，避免狩獵巨熊時出錯。" },
        { type: "p", text: "標準／安全比例：10% 步兵、10% 騎兵、80% 弓兵（也可用 20-30-50 等變化版本）" },
        { type: "joiners" }
      ]},
      ko: { title: "자이언트 베어 사냥", blocks: [
        { type: "h", text: "일시" },
        { type: "p", text: "연맹에 지정된 시간에 2일마다 진행됩니다." },
        { type: "h", text: "중요성" },
        { type: "p", text: "영웅 장비 재료(제작 망치) 및 강화 경험치의 주요 획득처입니다." },
        { type: "h", text: "준비 사항" },
        { type: "list", items: [
          "매번 자이언트 베어 사냥 시작 전에 부대 편성을 업데이트하세요."
        ]},
        { type: "callout", text: "선택 사항: https://frakinator.streamlit.app/를 사용하여 병사 비율을 테스트하고 가장 강력한 부대 편성을 찾아보세요." },
        { type: "list", items: [
          "이벤트가 시작되기 전에 채집 중인 부대를 소환하세요.",
          "기억하세요: 마지막 5~7분 동안에는 모든 플레이어가 집결을 열어야 합니다. 이렇게 하면 병력이 복귀하는 플레이어들을 위한 자리가 더 많이 생겨 마지막 데미지 몰아치기가 가능해집니다."
        ]},
        { type: "h", text: "집결 영웅 세대별 조합" },
        { type: "callout", text: "⚠️ **새 규칙:** 최대 부대 수용량은 본인이 주도하는 집결에서만 사용할 수 있습니다. 다른 사람의 집결에 참여할 때는 부대를 **80,000명** 이하로 제한해야 합니다." },
        { type: "leaders",
          gens: ["1세대","2세대","3세대","4세대","5세대"],
          notes: [
            [
              "아마데우스는 기본적으로 훌륭한 보병 및 기병 능력치를 갖추고 있어, 궁병 중심의 부대 편성에서 가장 뛰어난 효율을 발휘합니다.",
              "과금 유저에게도 훌륭한 선택이지만, 헬가의 궁병 관련 능력치는 다소 부족합니다. 레벨이 낮은 아마데우스는 집결 참여 영웅으로 활용하세요.",
              "무과금 유저에게 권장되는 집결장 영웅 조합입니다. 집결 공격 시, 항상 가장 강력한 세 영웅 조합을 사용하는 것이 좋습니다."
            ],
            [
              "마린은 집결 전용 파괴력 장비로 피해를 크게 올립니다. 보병은 아마데우스 또는 헬가.",
              "말린이 약하면 퀸으로 바꾸세요. 헬가는 아마데우스 장비가 덜 갖춰졌을 때만.",
              "아직 집결 장비가 있는 무과금 궁병이 없어 궁병 스탯이 가장 약합니다."
            ],
            [
              "풀 장비 헬가(파괴력 2 + 공격 1)가 아마데우스(파괴력 1 + 공격 2)보다 강합니다.",
              "헬가가 아직 덜 갖춰졌으면 아마데우스를 쓰세요.",
              "첫 무과금 집결 장비 영웅(페트라)이 나옵니다. 궁병은 여전히 약하지만, 만렙 기병이 페트라와 잘 맞습니다."
            ],
            [
              "이제부터는 궁병 중심의 부대 편성을 운영합니다. 티어 TG5 기병과 함께 로사의 3번째 스킬이 부여하는 궁병 전체 공격력 30% 증가는 매우 강력한 효과입니다.",
              "헬가의 성급이나 전용 무기 레벨이 아마데우스보다 높다면 헬가를 대체 영웅으로 기용하세요. 티어 TG5 기병과 함께 로사의 3번째 스킬이 부여하는 궁병 전체 공격력 30% 증가는 매우 강력한 효과입니다.",
              "위의 대체 영웅 조합과 같은 병력 비율을 사용합니다. 로사의 3번째 스킬과 높은 궁병 비율의 조합은 궁병 전체 공격력을 30% 증가시킵니다."
            ],
            [
              "나머지 지휘 자리는 아직 미공개입니다."
            ]
          ]},
        { type: "h", text: "집결 참여 영웅" },
        { type: "callout", text: "⚠️ **새 규칙:** 집결 참여용 부대 편성을 지금 저장하고 **80,000명을 넘지 않도록** 확인하세요. 베어 사냥 중 실수가 없도록 미리 업데이트해 두세요." },
        { type: "p", text: "표준 / 안전 비율: 보병 10%, 기병 10%, 궁병 80% (또는 20-30-50과 같은 변형 비율)" },
        { type: "joiners" }
      ]},
      de: { title: "Bärenjagd", blocks: [
        { type: "h", text: "WANN" },
        { type: "p", text: "Alle 2 Tage zur geplanten Zeit eurer Allianz." },
        { type: "h", text: "WARUM ES ZÄHLT" },
        { type: "p", text: "Hauptquelle für Heldenausrüstungs-Material (Forgehammer) und Verbesserungs-XP." },
        { type: "h", text: "VORBEREITUNG" },
        { type: "list", items: [
          "Aktualisiert eure Trupp Formationen vor jeder Bärenjagd."
        ]},
        { type: "callout", text: "Optional: Mit https://frakinator.streamlit.app Truppenverhältnisse testen und die stärkste Formation finden." },
        { type: "list", items: [
          "Ruft sammelnde Truppen vor Eventbeginn zurück.",
          "In den letzten 5–7 Minuten sollte jeder einen Rally starten. So entstehen mehr Plätze für Spieler, deren Truppen zurückkehren — für den finalen Schadensschub."
        ]},
        { type: "h", text: "RALLY-ANFÜHRER" },
        { type: "callout", text: "⚠️ **Neue Regel:** Deine maximale Truppenkapazität darfst du nur in der Rally einsetzen, die du selbst anführst. Wenn du der Rally eines anderen beitrittst, musst du deine Formation ebenfalls auf **80.000 Truppen** begrenzen." },
        { type: "leaders",
          gens: ["GEN 1","GEN 2","GEN 3","GEN 4","GEN 5"],
          notes: [
            [
              "Infanterie ist hier oft am stärksten, weil Amadeus stark ist; eine etwa gleiche Aufteilung mit etwas mehr Bogenschützen funktioniert am besten.",
              "Für Spieler ohne Amadeus — so bleibt Amadeus frei, um fremde Rallys zu joinen.",
              "F2P-Spieler sollten immer ihre drei stärksten verfügbaren Helden als Anführer nehmen."
            ],
            [
              "Marlin steigert den Schaden durch seine Rally-exklusive Tödlichkeitsausrüstung; Infanterie bleibt Amadeus oder Helga.",
              "Quinn statt Marlin, wenn Marlin noch nicht stark genug ist; Helga nur, wenn Amadeus noch nicht voll ausgerüstet ist.",
              "Noch kein F2P-Bogenschützenheld mit Rally-Ausrüstung, daher bleiben Bogenschützen der schwächste Stat."
            ],
            [
              "Voll ausgerüstete Helga (2 Tödlichkeit + 1 Angriff) übertrifft hier Amadeus (1 Tödlichkeit + 2 Angriff).",
              "Amadeus nehmen, wenn Helga noch nicht voll ausgerüstet ist.",
              "Erster F2P-Held mit Rally-Ausrüstung (Petra); Bogenschützen bleiben am schwächsten, maxed Kavallerie passt aber gut zu Petra."
            ],
            [
              "So viele (idealerweise maxed) Bogenschützen wie möglich; Rosas 3. Skill kann den Bogenschützen-Gesamtschaden um 30% steigern.",
              "Helga nehmen, wenn ihr Stern-/Ausrüstungsgrad über Amadeus liegt.",
              "Gleiche Idee wie die Alternative — Rosas 3. Skill glänzt am stärksten in bogenschützenlastigen Formationen."
            ],
            [
              "Die übrigen Anführer-Plätze sind noch nicht veröffentlicht."
            ]
          ]},
        { type: "h", text: "RALLY-TEILNEHMER" },
        { type: "callout", text: "⚠️ **Neue Regel:** Speichere jetzt deine Beitritts-Formationen und achte darauf, dass sie **80.000 Truppen nicht überschreiten**. Aktualisiere sie rechtzeitig, damit bei der Bärenjagd keine Fehler passieren." },
        { type: "p", text: "Standard / sicheres Verhältnis: 10% Infanterie, 10% Kavallerie, und 80% Bogenschützen (oder Varianten wie 20-30-50)" },
        { type: "joiners" }
      ]},
      fr: { title: "Chasse à l'Ours", blocks: [
        { type: "h", text: "QUAND" },
        { type: "p", text: "Tous les 2 jours, à l'heure prévue par votre Alliance." },
        { type: "h", text: "POURQUOI C'EST IMPORTANT" },
        { type: "p", text: "Source principale de matériaux d'Équipement de héros (Marteaux de Forge) et d'EXP d'Amélioration." },
        { type: "h", text: "PRÉPARATION" },
        { type: "list", items: [
          "Mettez à jour vos formations de troupe avant chaque Chasse à l'Ours."
        ]},
        { type: "callout", text: "Optionnel : utilisez https://frakinator.streamlit.app/ pour tester les ratios de troupes et trouver votre meilleure formation." },
        { type: "list", items: [
          "Rappelez les troupes en collecte avant le début de l'événement.",
          "N'oubliez pas : pendant les 5 à 7 dernières minutes, tout le monde devrait lancer un ralliement. Cela libère davantage de places pour les joueurs dont les troupes reviennent et permet un dernier coup de collier de dégâts."
        ]},
        { type: "h", text: "LEADERS DE RALLIEMENT" },
        { type: "callout", text: "⚠️ **Nouvelle règle :** votre capacité de troupes maximale ne peut être utilisée que dans le ralliement que vous menez. Quand vous rejoignez le ralliement d'un autre joueur, limitez aussi votre formation à **80 000 troupes**." },
        { type: "leaders",
          gens: ["GEN 1","GEN 2","GEN 3","GEN 4","GEN 5"],
          notes: [
            [
              "Formation de troupe : 30-30-40 %. Dans la plupart des cas, l'Infanterie aura les meilleures stats grâce aux stats brutes d'Amadeus, donc une formation ultra-équilibrée avec un peu plus d'Archers fonctionne le mieux.",
              "Formation de troupe : 20-40-40 %. Principalement pour ceux qui n'ont pas encore misé sur Amadeus, et cela permet d'utiliser Amadeus pour rejoindre des ralliements.",
              "Formation de troupe : 30-30-40 %. Pour les F2P, il est recommandé d'utiliser toujours les 3 héros dont vous disposez pour lancer un ralliement."
            ],
            [
              "Formation de troupe : 20-30-50 %. Marlin augmentera fortement les dégâts grâce à son équipement exclusif de ralliement. À partir de la Gen 2, l'Infanterie sera toujours Amadeus ou Helga : ce sont les seuls héros d'Infanterie avec un équipement exclusif de ralliement (bonus de Létalité). Vous envoyez moins d'Infanterie, donc le héros d'Infanterie compense les dégâts des Archers grâce à cet équipement plutôt qu'en égalant les stats d'Infanterie.",
              "Formation de troupe : 20-30-50 %. Autre option : remplacer Quinn par Marlin s'il n'est pas encore meilleur. N'utilisez Helga à partir de la Gen 2 que si Amadeus n'est pas à 5 étoiles avec l'équipement exclusif au niveau maximum ; c'est aussi l'occasion d'utiliser Amadeus pour rejoindre des ralliements.",
              "Formation de troupe : 30-30-40 %. Toujours aucun héros F2P avec un équipement exclusif de ralliement, donc encore une formation équilibrée avec un peu plus d'Archers, car les stats d'Archer seront les plus basses faute de héros Archer SSR."
            ],
            [
              "Formation de troupe : 10-20-70 %. Helga au maximum est plus performante qu'Amadeus en Gen 3, avec 2 équipements de Létalité et 1 d'Attaque, contre 1 de Létalité et 2 d'Attaque pour Amadeus dans cette configuration.",
              "Formation de troupe : 20-30-50 %. Si vous n'avez pas Helga au maximum (5 étoiles + équipement exclusif), il vaut mieux utiliser Amadeus.",
              "Formation de troupe : 20-40-40 %. En Gen 3, les F2P obtiennent leur premier héros avec un équipement exclusif de ralliement (Petra). Essayez des nombres équilibrés d'Archers et de Cavalerie, car Petra améliore beaucoup les Archers. Les stats d'Archer restent les plus basses sans Archer SSR. Si vous débloquez la Cavalerie T10, la compétence T10 s'accorde bien avec les stats de Petra."
            ],
            [
              "Formation de troupe : 10-10-80 %. Alignez autant d'Archers que possible, surtout s'ils sont T10. Avec un peu de chance, la 3e compétence de Rosa fera le travail pour vous (augmente l'Attaque totale des Archers de 30 %).",
              "Formation de troupe : 10-10-80 %. Utilisez Helga en alternative si elle a plus d'étoiles et un meilleur niveau d'équipement exclusif qu'Amadeus. Alignez toujours autant d'Archers que possible, surtout T10, pour la 3e compétence de Rosa (augmente l'Attaque totale des Archers de 30 %).",
              "Formation de troupe : 10-10-80 %. Comme pour les héros alternatifs — les bonus de la 3e compétence de Rosa sont meilleurs si vous misez sur des formations très orientées Archers (augmente l'Attaque totale des Archers de 30 %)."
            ],
            [
              "Les autres emplacements de leader ne sont pas encore disponibles."
            ]
          ]},
        { type: "h", text: "PARTICIPANTS AU RALLIEMENT" },
        { type: "callout", text: "⚠️ **Nouvelle règle :** enregistrez dès maintenant vos formations de participation et vérifiez qu'elles **ne dépassent pas 80 000 troupes**. Mettez-les à jour à l'avance pour éviter toute erreur pendant la Chasse à l'Ours." },
        { type: "p", text: "Ratio standard / sûr : 10 % d'Infanterie, 10 % de Cavalerie et 80 % d'Archers (ou une variante comme 20-30-50)" },
        { type: "joiners" }
      ]},
      pt: { title: "Caça ao Urso", blocks: [
        { type: "h", text: "QUANDO" },
        { type: "p", text: "A cada 2 dias, no horário marcado pela sua Aliança." },
        { type: "h", text: "POR QUE IMPORTA" },
        { type: "p", text: "Principal fonte de materiais de Equipamento do Herói (Martelos de Forja) e XP de Aprimoramento." },
        { type: "h", text: "PREPARAÇÃO" },
        { type: "list", items: [
          "Atualize suas Formações das Tropas antes de cada Caça ao Urso."
        ]},
        { type: "callout", text: "Opcional: use https://frakinator.streamlit.app/ para testar proporções de tropas e encontrar sua formação mais forte." },
        { type: "list", items: [
          "Revogue as tropas que estão coletando antes do início do evento.",
          "Lembre-se: nos últimos 5–7 minutos, todos devem iniciar um rally. Isso cria mais vagas para jogadores cujas tropas estão retornando, permitindo um último impulso de dano."
        ]},
        { type: "h", text: "LÍDERES DE RALLY" },
        { type: "callout", text: "⚠️ **Nova regra:** sua capacidade máxima de tropas só pode ser usada no rally que você está liderando. Ao entrar no rally de outro jogador, você também deve limitar sua formação a **80.000 tropas**." },
        { type: "leaders",
          gens: ["GEN 1","GEN 2","GEN 3","GEN 4","GEN 5"],
          notes: [
            [
              "Formação de tropas: 30-30-40%. Na maioria dos casos, você terá os melhores atributos na Infantaria por causa dos atributos base do Amadeus, então uma formação super equilibrada com um pouco mais de Arquearia funciona melhor.",
              "Formação de tropas: 20-40-40%. Principalmente para quem ainda não investiu no Amadeus, e mantém a possibilidade de usar o Amadeus para entrar em rallies.",
              "Formação de tropas: 30-30-40%. Para F2P, recomenda-se usar sempre os 3 heróis que você tiver para liderar um rally."
            ],
            [
              "Formação de tropas: 20-30-50%. O Peixe Marlin aumenta muito o dano por causa do equipamento exclusivo de rally dele. A partir da Gen 2, a Infantaria será sempre o Amadeus ou a Helga — são os únicos heróis de Infantaria com equipamento exclusivo de rally (bônus de Letalidade). Você envia menos Infantaria, então o herói de Infantaria cobre o dano dos Arquearia por meio desse equipamento, e não igualando os atributos de Infantaria.",
              "Formação de tropas: 20-30-50%. Outra alternativa é trocar o Quinn pelo Peixe Marlin, se ele ainda não for melhor. Use a Helga na Gen 2+ apenas se o Amadeus não estiver com 5 estrelas + equipamento exclusivo no nível máximo; também é uma chance de usar o Amadeus para entrar em rallies.",
              "Formação de tropas: 30-30-40%. Ainda não há herói F2P com equipamento exclusivo de rally, então novamente uma formação equilibrada com um pouco mais de Arquearia, já que os atributos dos Arquearia serão os mais baixos sem um herói de Arquearia SSR."
            ],
            [
              "Formação de tropas: 10-20-70%. A Helga no máximo rende mais que o Amadeus na Gen 3, por ter 2 equipamentos de Letalidade e 1 de Ataque, contra 1 de Letalidade e 2 de Ataque do Amadeus nesta configuração.",
              "Formação de tropas: 20-30-50%. Se você não tem a Helga no máximo (5 estrelas + equipamento exclusivo), é melhor usar o Amadeus.",
              "Formação de tropas: 20-40-40%. Na Gen 3, os F2P recebem o primeiro herói com equipamento exclusivo de rally (Petra). Tente números equilibrados de Arquearia e Cavalaria, porque a Petra melhora muito os Arquearia. Os atributos dos Arquearia continuam os mais baixos sem uma Arquearia SSR. Se você desbloquear a Cavalaria T10, a habilidade T10 combina bem com os atributos da Petra."
            ],
            [
              "Formação de tropas: 10-10-80%. Force o máximo de Arquearia possível, principalmente se forem T10. Com um pouco de sorte, a 3ª habilidade da Rosa fará o trabalho por você (aumenta o Ataque total dos Arquearia em 30%).",
              "Formação de tropas: 10-10-80%. Use a Helga como alternativa se ela tiver mais estrelas e um nível de equipamento exclusivo melhor que o do Amadeus. Continue forçando o máximo de Arquearia possível, principalmente T10, para a 3ª habilidade da Rosa (aumenta o Ataque total dos Arquearia em 30%).",
              "Formação de tropas: 10-10-80%. Igual aos melhores heróis alternativos — os bônus da 3ª habilidade da Rosa rendem mais se você focar em formações pesadas de Arquearia (aumenta o Ataque total dos Arquearia em 30%)."
            ],
            [
              "Os demais espaços de líder ainda não foram divulgados."
            ]
          ]},
        { type: "h", text: "PARTICIPANTES DE RALLY" },
        { type: "callout", text: "⚠️ **Nova regra:** salve agora suas formações de participação e confirme que elas **não passam de 80.000 tropas**. Atualize com antecedência para não haver erros durante a Caça ao Urso." },
        { type: "p", text: "Proporção padrão / segura: 10% Infantaria, 10% Cavalaria e 80% Arquearia (ou uma variação como 20-30-50)" },
        { type: "joiners" }
      ]},
      es: { title: "Cacería del Oso", blocks: [
        { type: "h", text: "CUÁNDO" },
        { type: "p", text: "Cada 2 días, según el horario programado por tu alianza." },
        { type: "h", text: "POR QUÉ IMPORTA" },
        { type: "p", text: "Fuente principal de materiales de equipo de héroe (Martillos de Forja) y XP de mejora." },
        { type: "h", text: "PREPARACIÓN" },
        { type: "list", items: [
          "Actualiza tus formaciones antes de cada Cacería del Oso."
        ]},
        { type: "callout", text: "Opcional: usa https://frakinator.streamlit.app/ para probar proporciones de tropas y encontrar tu formación más fuerte." },
        { type: "list", items: [
          "Recupera las tropas de recolección antes de que comience el evento.",
          "Recuerda: en los últimos 5–7 minutos, todos deben lanzar un Ataque Conjunto. Esto crea más espacios para los jugadores cuyas tropas están regresando, permitiendo un empuje final de daño."
        ]},
        { type: "h", text: "LÍDERES DE ATAQUE CONJUNTO" },
        { type: "callout", text: "⚠️ **Nueva regla:** tu capacidad máxima de tropas solo se puede usar en el ataque conjunto que tú lideras. Al unirte al ataque conjunto de otro jugador, también debes limitar tu formación a **80.000 tropas**." },
        { type: "leaders",
          gens: ["GEN 1","GEN 2","GEN 3","GEN 4","GEN 5"],
          notes: [
            [
              "Formación de tropas: 30-30-40%. En la mayoría de los casos tendrás las mejores estadísticas en infantería gracias a las estadísticas base de Amadeus, así que una formación casi equilibrada con un poco más de arqueros funciona mejor.",
              "Formación de tropas: 20-40-40%. Principalmente para quienes aún no han conseguido a Amadeus, y mantiene la posibilidad de usar a Amadeus para unirse a Ataques Conjuntos.",
              "Formación de tropas: 30-30-40%. Para F2P se recomienda usar siempre los 3 héroes que tengas para liderar un Ataque Conjunto."
            ],
            [
              "Formación de tropas: 20-30-50%. Marlin aumentará mucho el daño gracias a su {widget}. Desde la Gen 2 en adelante, la infantería siempre será Amadeus o Helga — son los únicos héroes de infantería con {widget} de Ataque Conjunto (bono de letalidad). Envías menos infantería, así que el héroe de infantería cubre el daño de los arqueros mediante el {widget} en lugar de igualar las estadísticas de infantería.",
              "Formación de tropas: 20-30-50%. Otra alternativa es cambiar Quinn por Marlin si aún no es mejor. Usa a Helga en Gen 2+ solo si Amadeus no tiene 5 estrellas + {widget} al máximo; también es una oportunidad para usar a Amadeus uniéndose a Ataques Conjuntos.",
              "Formación de tropas: 30-30-40%. Todavía no hay ningún héroe F2P con {widget} de Ataque Conjunto, así que de nuevo una formación equilibrada con un poco más de arqueros, ya que las estadísticas de arqueros serán las más bajas al no tener un héroe arquero SSR."
            ],
            [
              "Formación de tropas: 10-20-70%. Una Helga al máximo rinde mejor que Amadeus en la Gen 3, ya que tiene 2 widgets de letalidad y 1 de ataque, comparado con 1 de letalidad y 2 de ataque en esta configuración.",
              "Formación de tropas: 20-30-50%. Si no tienes a Helga al máximo (5 estrellas + widget) es mejor usar a Amadeus.",
              "Formación de tropas: 20-40-40%. En la Gen 3, los F2P consiguen su primer héroe con {widget} de Ataque Conjunto (Petra). Prueba números equilibrados de arqueros/caballería porque Petra mejora mucho a las tropas de arqueros. Las estadísticas de arqueros siguen siendo las más bajas sin un héroe arquero SSR. Si desbloqueas caballería T10, su habilidad combina bien con las estadísticas de Petra."
            ],
            [
              "Formación de tropas: 10-10-80%. Fuerza tantas tropas de arqueros como puedas, especialmente si son T10. Con algo de suerte, la 3ª habilidad de Rosa hará el resto del trabajo (aumenta el ataque total de los arqueros en un 30%).",
              "Formación de tropas: 10-10-80%. Usa a Helga como alternativa si tiene más estrellas y nivel de widget que Amadeus. Sigue forzando tantos arqueros como puedas, especialmente T10, para la 3ª habilidad de Rosa (aumenta el ataque total de los arqueros en un 30%).",
              "Formación de tropas: 10-10-80%. Igual que la alternativa de mejores héroes — la 3ª habilidad de Rosa rinde mejor si te enfocas en formaciones pesadas de arqueros (aumenta el ataque total de los arqueros en un 30%)."
            ],
            [
              "Los demás puestos de líder aún no se han publicado."
            ]
          ]},
        { type: "h", text: "PARTICIPANTES DE ATAQUE CONJUNTO" },
        { type: "callout", text: "⚠️ **Nueva regla:** guarda ya tus formaciones para unirte y asegúrate de que **no superen las 80.000 tropas**. Actualízalas con antelación para evitar errores durante la Cacería del Oso." },
        { type: "p", text: "Proporción estándar/segura: 10% Infantería, 10% Caballería y 80% Arqueros (o una variación como 20-30-50)" },
        { type: "joiners" }
      ]},
      tr: { title: "Ayı Avı", blocks: [
        { type: "h", text: "NE ZAMAN" },
        { type: "p", text: "2 günde bir, İttifakınızın belirlediği saatte." },
        { type: "h", text: "NEDEN ÖNEMLİ" },
        { type: "p", text: "Kahraman Donanımı malzemelerinin (Demirci Çekiçleri) ve Geliştirme TP'sinin ana kaynağı." },
        { type: "h", text: "HAZIRLIK" },
        { type: "list", items: [
          "Her Ayı Avı'ndan önce birlik dizilişlerinizi güncelleyin."
        ]},
        { type: "callout", text: "İsteğe bağlı: birlik oranlarını test edip en güçlü dizilişinizi bulmak için https://frakinator.streamlit.app/ adresini kullanın." },
        { type: "list", items: [
          "Etkinlik başlamadan önce kaynak toplayan birlikleri geri çağırın.",
          "Unutmayın: son 5–7 dakikada herkes bir seferberlik başlatmalı. Bu, birlikleri geri dönen oyuncular için daha fazla yer açar ve son bir hasar atağına olanak tanır."
        ]},
        { type: "h", text: "SEFERBERLİK LİDERLERİ" },
        { type: "callout", text: "⚠️ **Yeni kural:** Maksimum birlik kapasiteni yalnızca kendi liderlik ettiğin seferberlikte kullanabilirsin. Başka bir oyuncunun seferberliğine katılırken dizilişini de **80.000 asker** ile sınırlamalısın." },
        { type: "leaders",
          gens: ["GEN 1","GEN 2","GEN 3","GEN 4","GEN 5"],
          notes: [
            [
              "Birlik dizilişi: %30-30-40. Çoğu durumda Amadeus'un ham nitelikleri sayesinde en iyi niteliklere Piyade'de sahip olacaksınız; bu yüzden biraz daha fazla Okçu içeren, neredeyse eşit bir dizilim en iyi sonucu verir.",
              "Birlik dizilişi: %20-40-40. Amadeus'u henüz tercih etmemiş oyuncular için; ayrıca Amadeus'u seferberliklere katılmak için kullanma imkânı bırakır.",
              "Birlik dizilişi: %30-30-40. F2P için seferberlik başlatırken her zaman elinizdeki 3 kahramanı kullanmanız önerilir."
            ],
            [
              "Birlik dizilişi: %20-30-50. Marlin, seferberliğe özel donanımı sayesinde hasarı çok artırır. 2. Nesil'den itibaren Piyade her zaman Amadeus veya Helga olacaktır — seferberliğe özel donanımı (Öldürücülük bonusu) olan tek Piyade kahramanları onlardır. Daha az Piyade gönderirsiniz; bu yüzden Piyade kahramanı, Piyade niteliklerine denk gelmek yerine bu donanım sayesinde Okçu hasarını karşılar.",
              "Birlik dizilişi: %20-30-50. Diğer alternatif, Marlin henüz daha iyi değilse Quinn yerine onu koymaktır. Helga'yı 2. Nesil ve sonrasında yalnızca Amadeus 5 yıldızlı + özel donanım azami seviyede değilse kullanın; ayrıca Amadeus'u seferberliklere katılmak için kullanma fırsatıdır.",
              "Birlik dizilişi: %30-30-40. Seferberliğe özel donanımı olan bir F2P kahraman hâlâ yok; bu yüzden yine biraz daha fazla Okçu içeren dengeli bir dizilim kullanın, çünkü SSR Okçu kahramanı olmadığı için Okçu nitelikleri en düşük olacaktır."
            ],
            [
              "Birlik dizilişi: %10-20-70. Azami seviyedeki Helga, bu dizilimde 2 Öldürücülük ve 1 Saldırı donanımına sahipken Amadeus'un 1 Öldürücülük ve 2 Saldırı donanımı olması nedeniyle 3. Nesil'de Amadeus'tan daha iyi performans gösterir.",
              "Birlik dizilişi: %20-30-50. Azami seviyede Helga'nız (5 yıldız + özel donanım) yoksa Amadeus kullanmak daha iyidir.",
              "Birlik dizilişi: %20-40-40. 3. Nesil'de F2P oyuncular seferberliğe özel donanımı olan ilk kahramanlarını (Petra) alır. Okçu ve Süvari sayılarını dengeli tutmayı deneyin; çünkü Petra Okçuları çok güçlendirir. SSR Okçu olmadan Okçu nitelikleri hâlâ en düşüktür. T10 Süvari açarsanız, T10 becerisi Petra'nın nitelikleriyle iyi uyum sağlar."
            ],
            [
              "Birlik dizilişi: %10-10-80. Özellikle T10 iseler, olabildiğince fazla Okçu koyun. Biraz şansla Rosa'nın 3. becerisi işi sizin yerinize halleder (Okçuların toplam Saldırısını %30 artırır).",
              "Birlik dizilişi: %10-10-80. Helga'nın yıldızı ve özel donanım seviyesi Amadeus'tan iyiyse alternatif olarak kullanın. Rosa'nın 3. becerisi için yine olabildiğince fazla Okçu, özellikle T10 koyun (Okçuların toplam Saldırısını %30 artırır).",
              "Birlik dizilişi: %10-10-80. Alternatif en iyi kahramanlarla aynı — Rosa'nın 3. becerisi, ağırlıklı Okçu dizilişlerine odaklanırsanız en iyi bonusu verir (Okçuların toplam Saldırısını %30 artırır)."
            ],
            [
              "Kalan lider slotları henüz açıklanmadı."
            ]
          ]},
        { type: "h", text: "SEFERBERLİĞE KATILANLAR" },
        { type: "callout", text: "⚠️ **Yeni kural:** Katılım dizilişlerini şimdi kaydet ve **80.000 askeri geçmediğinden** emin ol. Ayı Avı sırasında hata olmaması için önceden güncelle." },
        { type: "p", text: "Standart / Güvenli Oran: %10 Piyade, %10 Süvari ve %80 Okçu (veya 20-30-50 gibi bir varyasyon)" },
        { type: "joiners" }
      ]},
      id: { title: "Bear Hunt", blocks: [
        { type: "h", text: "KAPAN" },
        { type: "p", text: "Setiap 2 hari pada waktu yang dijadwalkan Aliansimu." },
        { type: "h", text: "MENGAPA PENTING" },
        { type: "p", text: "Sumber utama material Gear Hero (Forgehammer) dan Enhancement XP." },
        { type: "h", text: "PERSIAPAN" },
        { type: "list", items: [
          "Perbarui Formasi Pasukanmu sebelum setiap Bear Hunt."
        ]},
        { type: "callout", text: "Opsional: gunakan https://frakinator.streamlit.app/ untuk menguji rasio pasukan dan menemukan formasi terkuatmu." },
        { type: "list", items: [
          "Panggil Kembali pasukan yang sedang mengumpulkan sebelum event dimulai.",
          "Ingat: di 5–7 menit terakhir, semua orang sebaiknya memulai reli. Ini membuka lebih banyak slot bagi pemain yang pasukannya sedang kembali, sehingga bisa melakukan dorongan damage terakhir."
        ]},
        { type: "h", text: "PEMIMPIN RELI" },
        { type: "callout", text: "⚠️ **Aturan baru:** kapasitas pasukan maksimal hanya boleh dipakai di reli yang kamu pimpin. Saat bergabung ke reli pemain lain, formasi kamu juga harus dibatasi **80.000 pasukan**." },
        { type: "leaders",
          gens: ["GEN 1","GEN 2","GEN 3","GEN 4","GEN 5"],
          notes: [
            [
              "Formasi pasukan: 30-30-40%. Pada kebanyakan kasus, Infanteri akan punya stat terbaik berkat stat dasar Amadeus, jadi formasi yang hampir seimbang dengan Pemanah sedikit lebih banyak bekerja paling baik.",
              "Formasi pasukan: 20-40-40%. Terutama untuk yang belum memilih Amadeus, dan tetap membuka peluang memakai Amadeus untuk bergabung ke reli.",
              "Formasi pasukan: 30-30-40%. Untuk F2P, disarankan selalu memakai 3 hero yang dimiliki untuk memimpin reli."
            ],
            [
              "Formasi pasukan: 20-30-50%. Marlin akan menambah damage besar berkat perlengkapan khusus reli miliknya. Mulai Gen 2, Infanteri akan selalu Amadeus atau Helga — mereka satu-satunya hero Infanteri dengan perlengkapan khusus reli (bonus Lethality). Kamu mengirim lebih sedikit Infanteri, jadi hero Infanteri menutup damage Pemanah lewat perlengkapan itu, bukan dengan menyamai stat Infanteri.",
              "Formasi pasukan: 20-30-50%. Alternatif lain adalah mengganti Quinn dengan Marlin jika ia belum lebih baik. Pakai Helga di Gen 2+ hanya jika Amadeus belum bintang 5 + perlengkapan khusus level maks; ini juga kesempatan memakai Amadeus untuk bergabung ke reli.",
              "Formasi pasukan: 30-30-40%. Masih belum ada hero F2P dengan perlengkapan khusus reli, jadi sekali lagi formasi seimbang dengan Pemanah sedikit lebih banyak, karena stat Pemanah akan paling rendah tanpa hero Pemanah SSR."
            ],
            [
              "Formasi pasukan: 10-20-70%. Helga yang sudah maksimal lebih baik daripada Amadeus di Gen 3, karena punya 2 perlengkapan Lethality dan 1 perlengkapan Attack, dibandingkan 1 Lethality dan 2 Attack milik Amadeus pada susunan ini.",
              "Formasi pasukan: 20-30-50%. Jika kamu belum punya Helga maksimal (bintang 5 + perlengkapan khusus), lebih baik pakai Amadeus.",
              "Formasi pasukan: 20-40-40%. Di Gen 3, F2P mendapat hero pertama dengan perlengkapan khusus reli (Petra). Coba jumlah Pemanah dan Kavaleri yang seimbang karena Petra sangat meningkatkan Pemanah. Stat Pemanah tetap paling rendah tanpa Pemanah SSR. Jika kamu membuka Kavaleri T10, skill T10 cocok dengan stat Petra."
            ],
            [
              "Formasi pasukan: 10-10-80%. Paksakan sebanyak mungkin Pemanah, terutama jika T10. Dengan sedikit keberuntungan, skill ke-3 Rosa akan bekerja untukmu (meningkatkan total Attack Pemanah sebesar 30%).",
              "Formasi pasukan: 10-10-80%. Pakai Helga sebagai alternatif jika bintang dan level perlengkapan khususnya lebih baik dari Amadeus. Tetap paksakan sebanyak mungkin Pemanah, terutama T10, untuk skill ke-3 Rosa (meningkatkan total Attack Pemanah sebesar 30%).",
              "Formasi pasukan: 10-10-80%. Sama seperti hero alternatif terbaik — bonus skill ke-3 Rosa paling maksimal jika kamu fokus pada formasi yang berat di Pemanah (meningkatkan total Attack Pemanah sebesar 30%)."
            ],
            [
              "Slot pemimpin lainnya belum dirilis."
            ]
          ]},
        { type: "h", text: "PESERTA RELI" },
        { type: "callout", text: "⚠️ **Aturan baru:** simpan formasi untuk bergabung sekarang dan pastikan **tidak melebihi 80.000 pasukan**. Perbarui lebih awal agar tidak ada kesalahan saat Bear Hunt." },
        { type: "p", text: "Rasio Standar / Aman: 10% Infanteri, 10% Kavaleri, dan 80% Pemanah (atau variasi seperti 20-30-50)" },
        { type: "joiners" }
      ]},
      ru: { title: "Охота на медведя", blocks: [
        { type: "h", text: "КОГДА" },
        { type: "p", text: "Каждые 2 дня в назначенное вашим альянсом время." },
        { type: "h", text: "ПОЧЕМУ ЭТО ВАЖНО" },
        { type: "p", text: "Основной источник материалов для снаряжения героя (Кузнечные молоты) и опыта усиления." },
        { type: "h", text: "ПОДГОТОВКА" },
        { type: "list", items: [
          "Обновляйте свои составы войск перед каждой Охотой на медведя."
        ]},
        { type: "callout", text: "Необязательно: используйте https://frakinator.streamlit.app/, чтобы проверить соотношения войск и найти свой сильнейший состав." },
        { type: "list", items: [
          "Отзовите войска, находящиеся на сборе, до начала события.",
          "Помните: в последние 5–7 минут каждый должен запустить рейд. Это освобождает больше мест для игроков, чьи войска возвращаются, и позволяет сделать финальный рывок по урону."
        ]},
        { type: "h", text: "ЛИДЕРЫ РЕЙДА" },
        { type: "callout", text: "⚠️ **Новое правило:** максимальную вместимость войска можно использовать только в рейде, который ведете вы. Присоединяясь к чужому рейду, ограничьте свой состав **80 000 войск**." },
        { type: "leaders",
          gens: ["ПОКОЛЕНИЕ 1","ПОКОЛЕНИЕ 2","ПОКОЛЕНИЕ 3","ПОКОЛЕНИЕ 4","ПОКОЛЕНИЕ 5"],
          notes: [
            [
              "Состав войск: 30-30-40%. В большинстве случаев лучшие показатели будут у пехотинцев благодаря базовым показателям героя Амадей, поэтому лучше всего работает почти равный состав с чуть большим числом стрелков.",
              "Состав войск: 20-40-40%. В основном для тех, кто ещё не выбрал героя Амадей; также сохраняет возможность использовать героя Амадей для присоединения к рейдам.",
              "Состав войск: 30-30-40%. Для F2P рекомендуется всегда использовать 3 имеющихся героя для проведения рейда."
            ],
            [
              "Состав войск: 20-30-50%. Герой Марлин сильно повышает урон благодаря своему эксклюзивному для рейдов снаряжению. Начиная со 2-го поколения пехотинцами всегда командует герой Амадей или Хельга — только у них среди героев-пехотинцев есть эксклюзивное для рейдов снаряжение (бонус Смертоносности). Вы отправляете меньше пехотинцев, поэтому герой-пехотинец компенсирует урон стрелков за счёт этого снаряжения, а не за счёт равных показателей пехотинцев.",
              "Состав войск: 20-30-50%. Другой вариант — поменять Куинн на Марлин, если он пока не лучше. Используйте героя Хельга со 2-го поколения и выше, только если у героя Амадей нет 5 звёзд и максимального уровня эксклюзивного снаряжения; это также возможность использовать героя Амадей для присоединения к рейдам.",
              "Состав войск: 30-30-40%. У героев F2P по-прежнему нет эксклюзивного для рейдов снаряжения, поэтому снова подходит равномерный состав с чуть большим числом стрелков, так как показатели стрелков будут самыми низкими из-за отсутствия SSR-героя-стрелка."
            ],
            [
              "Состав войск: 10-20-70%. Герой Хельга с максимальной прокачкой в 3-м поколении показывает себя лучше, чем герой Амадей, так как в этой связке у неё 2 снаряжения Смертоносности и 1 снаряжение Атаки против 1 снаряжения Смертоносности и 2 снаряжений Атаки у героя Амадей.",
              "Состав войск: 20-30-50%. Если у вас нет героя Хельга с максимальной прокачкой (5 звёзд + эксклюзивное снаряжение), лучше использовать героя Амадей.",
              "Состав войск: 20-40-40%. В 3-м поколении F2P получают первого героя с эксклюзивным для рейдов снаряжением (Petra). Старайтесь держать баланс между числом стрелков и кавалеристов, так как Petra сильно усиливает стрелков. Показатели стрелков всё равно самые низкие без SSR-стрелка. Если вы откроете кавалеристов T10, навык T10 хорошо сочетается с показателями Petra."
            ],
            [
              "Состав войск: 10-10-80%. Отправляйте как можно больше стрелков, особенно если они T10. При некоторой удаче 3-й навык героя Rosa сделает всё за вас (увеличивает общую Атаку стрелков на 30%).",
              "Состав войск: 10-10-80%. Используйте героя Хельга как альтернативу, если у неё больше звёзд и выше уровень эксклюзивного снаряжения, чем у героя Амадей. По-прежнему отправляйте как можно больше стрелков, особенно T10, ради 3-го навыка героя Rosa (увеличивает общую Атаку стрелков на 30%).",
              "Состав войск: 10-10-80%. То же, что и у альтернативных лучших героев: бонусы 3-го навыка героя Rosa максимальны, если делать упор на составы с большим числом стрелков (увеличивает общую Атаку стрелков на 30%)."
            ],
            [
              "Остальные места лидеров пока не опубликованы."
            ]
          ]},
        { type: "h", text: "УЧАСТНИКИ РЕЙДА" },
        { type: "callout", text: "⚠️ **Новое правило:** сохраните составы для присоединения уже сейчас и проверьте, что они **не превышают 80 000 войск**. Обновите их заранее, чтобы во время охоты на медведя не было ошибок." },
        { type: "p", text: "Стандартное / безопасное соотношение: 10% пехотинцев, 10% кавалеристов и 80% стрелков (или вариант вроде 20-30-50)" },
        { type: "joiners" }
      ]},
      th: { title: "ล่าหมี", blocks: [
        { type: "h", text: "เมื่อไหร่" },
        { type: "p", text: "ทุก 2 วัน ตามเวลาที่พันธมิตรของคุณกำหนด" },
        { type: "h", text: "ทำไมถึงสำคัญ" },
        { type: "p", text: "แหล่งวัสดุอุปกรณ์ฮีโร่หลัก (ค้อนตีเหล็ก) และ XP การพัฒนา" },
        { type: "h", text: "การเตรียมตัว" },
        { type: "list", items: [
          "อัปเดตรูปแบบการจัดวางทหารของคุณก่อนล่าหมีทุกครั้ง"
        ]},
        { type: "callout", text: "ตัวเลือกเสริม: ใช้ https://frakinator.streamlit.app/ เพื่อทดสอบอัตราส่วนทหารและหารูปแบบที่แข็งแกร่งที่สุดของคุณ" },
        { type: "list", items: [
          "เรียกกลับทหารที่กำลังเก็บทรัพยากรก่อนอีเวนต์เริ่ม",
          "โปรดจำไว้: ใน 5–7 นาทีสุดท้าย ทุกคนควรเปิดทีมระดมพล ซึ่งจะเพิ่มที่ว่างให้ผู้เล่นที่ทหารกำลังเดินทางกลับ ทำให้ปิดท้ายด้วยความเสียหายอีกระลอกได้"
        ]},
        { type: "h", text: "ผู้นำทีมระดมพล" },
        { type: "callout", text: "⚠️ **กฎใหม่:** ใช้ความจุทหารสูงสุดได้เฉพาะในทีมระดมพลที่คุณเป็นผู้นำเท่านั้น เมื่อเข้าร่วมทีมระดมพลของผู้อื่น ต้องจำกัดทหารไว้ไม่เกิน **80,000 นาย**" },
        { type: "leaders",
          gens: ["เจน 1","เจน 2","เจน 3","เจน 4","เจน 5"],
          notes: [
            [
              "รูปแบบทหาร: 30-30-40% ในกรณีส่วนใหญ่ ทหารราบจะมีค่าสถานะดีที่สุดเพราะค่าสถานะพื้นฐานของอมาดีอุส ดังนั้นรูปแบบที่เกือบเท่ากันโดยมีพลธนูมากกว่าเล็กน้อยให้ผลดีที่สุด",
              "รูปแบบทหาร: 20-40-40% เหมาะสำหรับคนที่ยังไม่ได้เลือกอมาดีอุส และยังเปิดโอกาสให้ใช้อมาดีอุสเข้าร่วมทีมระดมพลได้",
              "รูปแบบทหาร: 30-30-40% สำหรับ F2P แนะนำให้ใช้ฮีโร่ทั้ง 3 ตัวที่มีอยู่เสมอเมื่อเปิดทีมระดมพล"
            ],
            [
              "รูปแบบทหาร: 20-30-50% มาร์ลินช่วยเพิ่มความเสียหายได้มากเพราะอุปกรณ์เฉพาะทีมระดมพลของเขา ตั้งแต่เจน 2 ขึ้นไป ทหารราบจะเป็นอมาดีอุสหรือเฮลก้าเสมอ — สองคนนี้เป็นฮีโร่ทหารราบเพียงกลุ่มเดียวที่มีอุปกรณ์เฉพาะทีมระดมพล (โบนัสความแรงพลัง) คุณส่งทหารราบน้อยลง ฮีโร่ทหารราบจึงชดเชยความเสียหายของพลธนูด้วยอุปกรณ์นี้ แทนที่จะเทียบค่าสถานะทหารราบ",
              "รูปแบบทหาร: 20-30-50% อีกทางเลือกคือสลับควินน์เป็นมาร์ลิน หากเขายังไม่ดีกว่า ใช้เฮลก้าในเจน 2 ขึ้นไปเฉพาะเมื่ออมาดีอุสยังไม่ได้ 5 ดาว + อุปกรณ์เฉพาะระดับสูงสุด และยังเป็นโอกาสใช้อมาดีอุสเข้าร่วมทีมระดมพลด้วย",
              "รูปแบบทหาร: 30-30-40% ยังไม่มีฮีโร่ F2P ที่มีอุปกรณ์เฉพาะทีมระดมพล จึงใช้รูปแบบที่สมดุลโดยมีพลธนูมากกว่าเล็กน้อยอีกครั้ง เพราะค่าสถานะพลธนูจะต่ำที่สุดเนื่องจากไม่มีฮีโร่พลธนู SSR"
            ],
            [
              "รูปแบบทหาร: 10-20-70% เฮลก้าที่พัฒนาเต็มที่ทำได้ดีกว่าอมาดีอุสในเจน 3 เพราะมีอุปกรณ์ความแรงพลัง 2 ชิ้นและอุปกรณ์พลังโจมตี 1 ชิ้น เทียบกับความแรงพลัง 1 ชิ้นและพลังโจมตี 2 ชิ้นของอมาดีอุสในชุดนี้",
              "รูปแบบทหาร: 20-30-50% หากคุณไม่มีเฮลก้าที่พัฒนาเต็มที่ (5 ดาว + อุปกรณ์เฉพาะ) ควรใช้อมาดีอุสจะดีกว่า",
              "รูปแบบทหาร: 20-40-40% ในเจน 3 ผู้เล่น F2P จะได้ฮีโร่ตัวแรกที่มีอุปกรณ์เฉพาะทีมระดมพล (Petra) ลองใช้จำนวนพลธนูและทหารม้าให้สมดุล เพราะ Petra เสริมพลธนูได้มาก ค่าสถานะพลธนูยังต่ำที่สุดหากไม่มีพลธนู SSR หากคุณปลดล็อกทหารม้า T10 ทักษะ T10 เข้ากับค่าสถานะของ Petra ได้ดี"
            ],
            [
              "รูปแบบทหาร: 10-10-80% ใส่พลธนูให้มากที่สุดเท่าที่ทำได้ โดยเฉพาะถ้าเป็น T10 หากโชคดี ทักษะที่ 3 ของ Rosa จะช่วยได้เอง (เพิ่มพลังโจมตีรวมของพลธนู 30%)",
              "รูปแบบทหาร: 10-10-80% ใช้เฮลก้าเป็นทางเลือกหากเธอมีดาวและระดับอุปกรณ์เฉพาะดีกว่าอมาดีอุส ยังคงใส่พลธนูให้มากที่สุดเท่าที่ทำได้ โดยเฉพาะ T10 เพื่อทักษะที่ 3 ของ Rosa (เพิ่มพลังโจมตีรวมของพลธนู 30%)",
              "รูปแบบทหาร: 10-10-80% เหมือนกับฮีโร่ทางเลือกที่ดีที่สุด — โบนัสทักษะที่ 3 ของ Rosa ได้ผลดีที่สุดหากคุณเน้นรูปแบบที่มีพลธนูจำนวนมาก (เพิ่มพลังโจมตีรวมของพลธนู 30%)"
            ],
            [
              "ช่องผู้นำที่เหลือยังไม่เปิดเผย"
            ]
          ]},
        { type: "h", text: "ผู้เข้าร่วมทีมระดมพล" },
        { type: "callout", text: "⚠️ **กฎใหม่:** บันทึกรูปแบบการจัดทัพสำหรับเข้าร่วมไว้ตั้งแต่ตอนนี้ และตรวจสอบว่า**ไม่เกิน 80,000 นาย** อัปเดตไว้ล่วงหน้าเพื่อไม่ให้ผิดพลาดระหว่างล่าหมี" },
        { type: "p", text: "อัตราส่วนมาตรฐาน / ปลอดภัย: ทหารราบ 10%, ทหารม้า 10% และพลธนู 80% (หรือรูปแบบอื่นเช่น 20-30-50)" },
        { type: "joiners" }
      ]},
      ar: { title: "صيد الدببة", blocks: [
        { type: "h", text: "متى" },
        { type: "p", text: "كل يومين في الوقت الذي يحدده تحالفك." },
        { type: "h", text: "لماذا هو مهم" },
        { type: "p", text: "مصدر رئيسي لمواد عتاد البطل (مطرقة الحدادة) وخبرة تحسين." },
        { type: "h", text: "التحضير" },
        { type: "list", items: [
          "حدّث تشكيلات القوات قبل كل صيد للدببة."
        ]},
        { type: "callout", text: "اختياري: استخدم https://frakinator.streamlit.app/ لاختبار نسب القوات وإيجاد أقوى تشكيلة لديك." },
        { type: "list", items: [
          "قم باستدعاء القوات التي تقوم بالجمع قبل بدء الفعالية.",
          "تذكّر: في آخر 5–7 دقائق، على الجميع إطلاق حشد. يوفّر هذا أماكن أكثر للاعبين الذين تعود قواتهم، مما يتيح دفعة ضرر أخيرة."
        ]},
        { type: "h", text: "قادة الحشد" },
        { type: "callout", text: "⚠️ **قاعدة جديدة:** لا يمكنك استخدام السعة القصوى لقواتك إلا في الحشد الذي تقوده بنفسك. عند الانضمام إلى حشد لاعب آخر، يجب أيضًا أن تحدّ تشكيلتك بـ **80,000 جندي**." },
        { type: "leaders",
          gens: ["الجيل 1","الجيل 2","الجيل 3","الجيل 4","الجيل 5"],
          notes: [
            [
              "تشكيلة القوات: 30-30-40%. في معظم الحالات ستكون أفضل سمات لديك في المشاة بسبب سمات أماديوس الأساسية، لذا تعمل التشكيلة المتقاربة جدًا مع زيادة طفيفة في الرماة بأفضل شكل.",
              "تشكيلة القوات: 20-40-40%. مخصصة أساسًا لمن لم يستثمروا في أماديوس بعد، وتُبقي إمكانية استخدام أماديوس للانضمام إلى الحشود.",
              "تشكيلة القوات: 30-30-40%. للاعبين F2P يُنصح دائمًا باستخدام الأبطال الثلاثة المتاحين لديك لإطلاق الحشد."
            ],
            [
              "تشكيلة القوات: 20-30-50%. سيزيد مارلين الضرر كثيرًا بفضل عتاده الخاص بالحشد. ابتداءً من الجيل 2، سيكون قائد المشاة دائمًا أماديوس أو هيلجا — فهما البطلان الوحيدان من المشاة اللذان يملكان عتادًا خاصًا بالحشد (مكافأة قوة فتك). ترسل عددًا أقل من المشاة، لذا يغطي بطل المشاة ضرر الرماة عبر هذا العتاد بدلًا من مجاراة سمات المشاة.",
              "تشكيلة القوات: 20-30-50%. بديل آخر هو استبدال كوين بمارلين إذا لم يكن أفضل بعد. استخدم هيلجا في الجيل 2 وما بعده فقط إذا لم يكن أماديوس بـ 5 نجوم مع عتاد خاص بأعلى مستوى؛ وهي أيضًا فرصة لاستخدام أماديوس للانضمام إلى الحشود.",
              "تشكيلة القوات: 30-30-40%. لا يزال لا يوجد بطل F2P بعتاد خاص بالحشد، لذا مرة أخرى تشكيلة متوازنة مع زيادة طفيفة في الرماة، لأن سمات الرماة ستكون الأدنى لعدم وجود بطل رماة SSR."
            ],
            [
              "تشكيلة القوات: 10-20-70%. تتفوق هيلجا المكتملة التطوير على أماديوس في الجيل 3، لأن لديها قطعتي عتاد قوة فتك وقطعة عتاد هجوم واحدة، مقابل قطعة قوة فتك واحدة وقطعتي هجوم لدى أماديوس في هذه التشكيلة.",
              "تشكيلة القوات: 20-30-50%. إذا لم تكن لديك هيلجا مكتملة التطوير (5 نجوم + عتاد خاص)، فمن الأفضل استخدام أماديوس.",
              "تشكيلة القوات: 20-40-40%. في الجيل 3، يحصل لاعبو F2P على أول بطل بعتاد خاص بالحشد (Petra). جرّب أعدادًا متوازنة من الرماة والفرسان لأن Petra تحسّن الرماة كثيرًا. تبقى سمات الرماة الأدنى بدون رماة SSR. إذا فتحت فرسان T10، فإن مهارة T10 تتناسب جيدًا مع سمات Petra."
            ],
            [
              "تشكيلة القوات: 10-10-80%. ادفع بأكبر عدد ممكن من الرماة، خاصة إذا كانوا T10. مع قليل من الحظ ستقوم المهارة الثالثة لـ Rosa بالمهمة عنك (تزيد إجمالي هجوم الرماة بنسبة 30%).",
              "تشكيلة القوات: 10-10-80%. استخدم هيلجا كبديل إذا كانت نجومها ومستوى عتادها الخاص أفضل من أماديوس. واصل الدفع بأكبر عدد ممكن من الرماة، خاصة T10، من أجل المهارة الثالثة لـ Rosa (تزيد إجمالي هجوم الرماة بنسبة 30%).",
              "تشكيلة القوات: 10-10-80%. مثل الأبطال البدلاء الأفضل — تحقق المهارة الثالثة لـ Rosa أفضل مكافأة إذا ركّزت على تشكيلات ثقيلة بالرماة (تزيد إجمالي هجوم الرماة بنسبة 30%)."
            ],
            [
              "خانات القادة المتبقية لم تُعلن بعد."
            ]
          ]},
        { type: "h", text: "المنضمون إلى الحشد" },
        { type: "callout", text: "⚠️ **قاعدة جديدة:** احفظ تشكيلات الانضمام الآن وتأكد من أنها **لا تتجاوز 80,000 جندي**. حدّثها مسبقًا حتى لا تحدث أخطاء أثناء صيد الدببة." },
        { type: "p", text: "النسبة القياسية / الآمنة: 10% مشاة، 10% فرسان، و80% رماة (أو تنويع مثل 20-30-50)" },
        { type: "joiners" }
      ]}
    }
  },

  "swordland-showdown": {
    emoji: "⚔️",
    name: { zh: "聖劍爭奪", en: "Swordland Showdown", ko: "성검 쟁탈", de: "Schwertland-Showdown", fr: "Choc du Glaive", tr: "Kılıçdiyarı Hesaplaşması", es: "Enfrentamiento en Tierra de espadas", id: "Swordland Showdown", ru: "Битва за Страну мечей", th: "ศึกดวลดินแดนดาบ", ar: "مواجهة أرض السيوف", pt: "Confronto entre Espadas" },
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
      es: {
        title: "Enfrentamiento en Tierra de espadas",
        blocks: [
          { type: "h", text: "CUÁNDO" },
          { type: "p", text: "Cada 2 semanas — un evento de campo de batalla Alianza vs Alianza de 60 minutos." },

          { type: "h", text: "REGISTRO" },
          { type: "callout", text: "⚠️ **Solo regístrate si planeas asistir.** Los jugadores registrados que no aparecen ocupan un lugar valioso y pueden afectar el emparejamiento." },
          { type: "list", items: ["**100% puedo asistir → Enviar Solicitud de Batalla**", "**No estoy seguro → Abstenerse**"] },

          { type: "h", text: "OBJETIVO PRINCIPAL" },
          { type: "p", text: "Gana obteniendo más {allianceRelic} que la alianza rival." },
          { type: "list", items: [
            "Captura y mantén edificios importantes",
            "Protege los puntos acumulados",
            "Recoge el {arsenal} disperso inmediatamente cuando los edificios cambien de bando",
            "Recolecta {undercellar} cuando aparezcan",
            "Refuerza guarniciones cercanas cuando no estés en un Ataque Conjunto",
            "No dejes marchas inactivas",
            "**NO persigas bajas por todo el mapa.** El PvP aleatorio nos dispersa y reduce nuestra efectividad. Ataca ciudades de nivel más bajo cuando tenga sentido, debilitándolas cerca de un edificio que mantenemos."
          ]},

          { type: "h", text: "EDIFICIOS DE UN VISTAZO" },
          { type: "buildings",
            legend: "Números mostrados como: {allianceRelic} / {personalRelic}",
            cols: { first: "Primer control", hold: "Ocupación en curso", open: "Abre", min: "min", perMin: "/m", sep: ": " },
            priority: { top: "MÁXIMA", high: "ALTA", med: "MEDIA" },
            gather: "Puntos de recolección que aparecen periódicamente (dos oleadas)",
            purposes: {
              swordshrine: "Edificio de mayor valor en puntos",
              mercenary: "Debilita los edificios en poder del enemigo",
              reformation: "Bono de combate para la alianza",
              sanctum: "{allianceRelic} de alto valor",
              abbey: "Genera {allianceRelic}",
              stables: "-50% de enfriamiento de teletransporte",
              belltower: "-50% de tiempo de captura de edificios"
            }
          },
          { type: "img", src: "figures/NEXUS_SwordlanShowdown_Map.jpeg", alt: "Assigned zones" },

          { type: "h", text: "ZONAS ASIGNADAS" },
          { type: "p", text: "R4 dividirá a los miembros confirmados en equipos/zonas antes de la batalla." },
          { type: "p", text: "Nuestros **Atacantes más fuertes** serán asignados inicialmente a una zona:" },
          { type: "list", items: [
            "🟣 **Morado — {belltower}**",
            "🟡 **Amarillo — {stables}**",
            "🔵 **Azul — {sanctumNW}**",
            "🟢 **Verde — {sanctumSE}**"
          ]},
          { type: "p", text: "Los miembros restantes serán asignados para apoyar una de estas zonas/equipos. Puede ser necesaria una rotación según las condiciones de la batalla — vigila siempre el Chat de Escuadrón para más detalles." },
          { type: "p", text: "Permanece en tu zona asignada a menos que el liderazgo te indique moverte." },
          { type: "zones", labels: {
            purple: "🟣 Zona Morada — {belltower} / {mercenary}",
            blue: "🔵 Zona Azul — {sanctumNW} / {abbey}",
            yellow: "🟡 Zona Amarilla — {stables} / {abbey}",
            green: "🟢 Zona Verde — {sanctumSE} / {abbey}",
            center: "⚪ Centro"
          }},
          { type: "img", src: "figures/assigned_zone.png", alt: "Assigned zones" },

          { type: "h", text: "ROLES Y RESPONSABILIDADES" },
          { type: "p", text: "R4 dividirá a los miembros confirmados en 3 funciones según su poder: **Atacantes, Defensores y Apoyo/Participantes**." },

          { type: "sub", text: "⚔️ 1) ATACANTES" },
          { type: "p", text: "**Quién:** Nuestros jugadores más fuertes. Tienen suficientes Teletransportadores Avanzados." },
          { type: "p", text: "**Tu tarea:**" },
          { type: "list", items: [
            "Teletranspórtate a tu zona y edificio asignados",
            "Captura los edificios prioritarios",
            "Ataca en solitario castillos enemigos vulnerables",
            "Lidera Ataques Conjuntos importantes",
            "Muévete al siguiente objetivo una vez que un Defensor tome el relevo",
            "Cuando los enemigos se teletransporten cerca de tu edificio asignado, apunta a castillos más débiles o expuestos"
          ]},

          { type: "sub", text: "🛡️ 2) DEFENSORES" },
          { type: "p", text: "**Quién:** Nuestros siguientes jugadores más fuertes, con buena capacidad de Ataque Conjunto/guarnición." },
          { type: "p", text: "**Tu tarea:**" },
          { type: "list", items: [
            "Sigue a tus Atacantes asignados (zona)",
            "Una vez que un Atacante haya capturado un edificio, toma el control de las guarniciones y pide refuerzos si es necesario",
            "Refuerza objetivos amenazados",
            "Libera a los Atacantes para que avancen a su siguiente objetivo"
          ]},

          { type: "sub", text: "🤝 3) APOYO / PARTICIPANTES" },
          { type: "p", text: "**Quién:** Generalmente miembros de menor poder y participantes de Ataques Conjuntos." },
          { type: "p", text: "**Tu tarea:**" },
          { type: "list", items: [
            "**Deben** unirse a los Ataques Conjuntos de los Defensores asignados",
            "Refuerza los edificios capturados",
            "Realiza marchas rápidas de refuerzo cuando se solicite",
            "Opera desde la **Zona Segura** cuando no seas necesario en otro lugar o estés más alejado del alcance enemigo"
          ]},
          { type: "callout", text: "**IMPORTANTE:** Si el enemigo ataca uno de nuestros edificios capturados y el control pasa al enemigo, **teletranspórtate cerca o realiza una marcha rápida de inmediato** y recoge el {arsenal} disperso antes que ellos." },
          { type: "list", items: [
            "**A los 20 minutos de batalla**, aparece {undercellar}. Envía tropas disponibles para recolectarlo y sumar puntos adicionales.",
            "No dejes marchas inactivas."
          ]},

          { type: "h", text: "ANTES DE LA BATALLA" },
          { type: "list", items: [
            "Vacía tu Enfermería. Ten todas las marchas disponibles",
            "Equipa tus héroes/equipo más fuertes",
            "Activa la Capacidad de Despliegue, los bonos de Ataque y Defensa, y el Antirreconocimiento",
            "Ten Teletransportadores Avanzados disponibles si tu rol los requiere",
            "Mantén Discord abierto si es posible (para consultar el mapa, las asignaciones, VC opcional)",
            "Revisa el Chat de Alianza y los Mensajes Privados"
          ]},
          { type: "callout", text: "⚠️ **IMPORTANTE:** El día de la batalla aparecerá una nueva pestaña de **Chat de Escuadrón**. **Vigila el Chat de Escuadrón durante toda la batalla.**" },

          { type: "h", text: "CRONOLOGÍA DE LA BATALLA" },
          { type: "timeline", items: [
            { time: "0:00–15:00", title: "APERTURA", groups: [
              { title: "Asegurar de inmediato", lines: ["**#4 {belltower}**", "**#7 {stables}**"] },
              { title: "Disputar", lines: ["**#8 {sanctumNW}**", "**#10 {sanctumSE}**"] },
              { title: "", lines: [
                "Toma {abbey} cuando sea práctico, pero no sacrifiques objetivos clave por ello.",
                "**14:30**, los jugadores más fuertes se preparan para el centro."
              ]}
            ]},
            { time: "15:00", title: "SE ABREN LOS EDIFICIOS DE PODER", lines: [
              "**#1 {swordshrine}**, **#2 {mercenary}**, **#3 {reformation}**",
              "El liderazgo indicará prioridades según las condiciones del campo de batalla."
            ], groups: [
              { title: "⭐ {swordshrine}", lines: [
                "Los Atacantes/Defensores más fuertes se teletransportan hacia el centro (no todos)",
                "Captura {swordshrine}",
                "Una vez asegurado, un Defensor fuerte mantiene la guarnición",
                "Apoyo/Participantes deben hacer marcha rápida y enviar refuerzos"
              ]}
            ], warn: "⚠️ Miembros en guarnición: no abandonen su edificio por {swordshrine} a menos que el liderazgo lo indique. Sigan protegiendo {sanctum} y otros edificios importantes." },
            { time: "15:00–45:00", title: "💪 FASE DE CONTROL", lines: [
              "Objetivo principal: **Mantener {swordshrine} + {sanctumNW} + {sanctumSE}**",
              "Mantén el control útil de {belltower}/{stables}",
              "Usa el bono de {reformation} en enfrentamientos importantes",
              "Usa {mercenary} para presionar edificios enemigos",
              "Recoge el {arsenal} disperso después de CADA cambio de control",
              "Refuerza guarniciones debilitadas"
            ]},
            { time: "20:00–60:00", title: "⛏️ {undercellar}", lines: [
              "Comienza a aparecer {undercellar}.",
              "Los jugadores de apoyo y cualquiera con marchas disponibles deben recolectarlo para puntos adicionales.",
              "**No abandones una defensa o Ataque Conjunto crítico solo para recolectar.**"
            ]},
            { time: "ÚLTIMOS 15 MINUTOS", title: "🏁 CIERRE", groups: [
              { title: "SI VAMOS GANANDO", lines: ["Protege {swordshrine} y {sanctum}", "Refuerza edificios con puntos acumulados", "Evita el PvP innecesario", "Recupera el {arsenal} disperso de inmediato", "No tomes riesgos innecesarios"] },
              { title: "SI VAMOS PERDIENDO", lines: ["Presiona los edificios clave del enemigo", "Usa {mercenary} antes de ataques coordinados", "Concentra los Ataques Conjuntos en vez de atacar al azar", "Apunta a edificios valiosos en poder del enemigo", "Recoge todos los puntos caídos tras un cambio de control exitoso"] }
            ], warn: "**Últimos 5 minutos: Puntos > bajas.**" }
          ]},

          { type: "h", text: "RESUMEN" },
          { type: "p", text: "Los grupos se dividirán en 3 funciones y se asignarán a una zona:" },
          { type: "list", items: [
            "**ATACANTES** → TOMAR + PRESIONAR",
            "**DEFENSORES** → MANTENER + PROTEGER",
            "**APOYO** → REFORZAR + UNIRSE A ATAQUES CONJUNTOS + SAQUEAR + RECOLECTAR"
          ]},
          { type: "list", items: [
            "Sigue tu zona y rol asignados.",
            "Vigila el Chat de Escuadrón.",
            "Objetivos > bajas al azar.",
            "Los Atacantes toman — los Defensores mantienen — el Apoyo refuerza.",
            "Nunca dejes marchas útiles inactivas.",
            "Recoge el {arsenal} disperso de inmediato.",
            "Recolecta {undercellar} con marchas disponibles.",
            "Protege {swordshrine} + {sanctum}.",
            "No abandones edificios clave por {abbey} o por bajas.",
            "Si el liderazgo indica una rotación, MUÉVETE."
          ]},
          { type: "callout", text: "⚔️ **LA COORDINACIÓN GANA EN {swordland}**" }
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
    name: { en: "Formations & Rally Tips", zh: "部隊編組與集結技巧", ko: "부대 편성 및 집결 팁", de: "Trupp-Formationen & Rally-Tipps", fr: "Formations de troupe et conseils de ralliement", pt: "Formações das Tropas e dicas de rally", tr: "Birlik Dizilişleri ve Seferberlik İpuçları", id: "Formasi Pasukan & Tips Reli", ru: "Войско и советы по рейдам", th: "รูปแบบการจัดวางทหารและเคล็ดลับทีมระดมพล", ar: "القوات ونصائح الحشد", es: "Formaciones y Consejos de Ataque Conjunto" },
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
          { type: "p", text: "For example, with a 68K troop cap, you can plug that number into a calculator and enter it directly in the field for the matching troop type. Here are three examples:" },
          { type: "list", items: [
            "60/20/20 ➡️ 40,800 / 13,600 / 13,600",
            "60/40 ➡️ 40,800 / 27,200",
            "50/20/30 ➡️ 34,000 / 13,600 / 20,400"
          ]},

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
          { type: "p", text: "舉例來說，若以 68K 兵力上限為例，可以把這個數字帶進計算機，直接在對應兵種的數字欄輸入即可。以下是三種情況：" },
          { type: "list", items: [
            "60/20/20 ➡️ 40,800 / 13,600 / 13,600",
            "60/40 ➡️ 40,800 / 27,200",
            "50/20/30 ➡️ 34,000 / 13,600 / 20,400"
          ]},

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
          { type: "p", text: "예를 들어 68K 병력 상한을 기준으로 하면, 이 숫자를 계산기에 입력한 뒤 해당 병종 칸에 그대로 넣으면 됩니다. 다음은 세 가지 예시입니다:" },
          { type: "list", items: [
            "60/20/20 ➡️ 40,800 / 13,600 / 13,600",
            "60/40 ➡️ 40,800 / 27,200",
            "50/20/30 ➡️ 34,000 / 13,600 / 20,400"
          ]},

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
          { type: "p", text: "Zum Beispiel: Bei einem Truppenlimit von 68K kannst du diese Zahl in einen Taschenrechner eingeben und direkt in das Feld des jeweiligen Truppentyps übertragen. Hier sind drei Beispiele:" },
          { type: "list", items: [
            "60/20/20 ➡️ 40.800 / 13.600 / 13.600",
            "60/40 ➡️ 40.800 / 27.200",
            "50/20/30 ➡️ 34.000 / 13.600 / 20.400"
          ]},

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
          { type: "p", text: "Par exemple, avec une limite de 68 000 troupes, vous pouvez saisir ce chiffre dans une calculatrice et l'entrer directement dans le champ correspondant à chaque type de troupe. Voici trois exemples :" },
          { type: "list", items: [
            "60/20/20 ➡️ 40 800 / 13 600 / 13 600",
            "60/40 ➡️ 40 800 / 27 200",
            "50/20/30 ➡️ 34 000 / 13 600 / 20 400"
          ]},

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
          { type: "p", text: "Por exemplo, com um limite de 68 mil tropas, você pode colocar esse número numa calculadora e digitar diretamente no campo do tipo de tropa correspondente. Aqui estão três exemplos:" },
          { type: "list", items: [
            "60/20/20 ➡️ 40.800 / 13.600 / 13.600",
            "60/40 ➡️ 40.800 / 27.200",
            "50/20/30 ➡️ 34.000 / 13.600 / 20.400"
          ]},

          { type: "h", text: "🎬 COMO TROCAR DE HERÓIS DE ATAQUE PARA HERÓIS DE DEFESA" },
          { type: "video", src: "figures/switch_hero.mp4", caption: "📎 Vídeo encontrado online (TikTok @yelloe_hair) — não é filmagem nossa." }
        ]
      },
      es: {
        title: "Formaciones y Consejos de Ataque Conjunto",
        blocks: [
          { type: "h", text: "🔬 PRIORIDADES DE INVESTIGACIÓN Y MEJORA" },
          { type: "p", text: "Prioriza estas estadísticas de combate al investigar y mejorar los talismanes de gobernador:" },
          { type: "list", items: ["{infantry} {health}", "{archer} {lethality}"] },

          { type: "h", text: "💾 GUARDA TUS FORMACIONES PREDEFINIDAS" },
          { type: "p", text: "Según tu progreso, puedes desbloquear hasta 8 espacios para guardar previamente tus formaciones de tropas. Formaciones recomendadas para guardar:" },
          { type: "callout", text: "Todas las proporciones de tropas son **{infantry} : {cavalry} : {archer}**. Guarda formaciones predefinidas separadas con cada héroe en la posición más a la izquierda / primera." },
          { type: "callout", text: "💡 El héroe en la posición más a la izquierda importa al unirte a {rally}, porque su habilidad de Expedición correspondiente contribuye al ataque." },
          { type: "list", items: [
            "1) {bearHunt}: {chenko} — **10 : 10 : 80**",
            "2) {bearHunt}: {amane} — **10 : 10 : 80** (o lo más cercano posible)",
            "3) {bearHunt}: {yeonwoo} — **10 : 10 : 80** (o lo más cercano posible)",
            "4) {bearHunt}: {amadeus} — **10 : 10 : 80** (o lo más cercano posible)",
            "5) Ataque (PvP general): {amadeus} (si está desarrollado) o {chenko} — **50 : 20 : 30**",
            "6) Defensa: {howard} / {gordon} — **60 : 20 : 20** es nuestra configuración equilibrada por defecto. Ajusta cuando el liderazgo solicite una formación específica."
          ]},
          { type: "p", text: "**Líderes de {rally}:** Usa tu alineación ofensiva de héroes más fuerte y completa." },
          { type: "p", text: "**Participantes de {rally}:** Sigue los límites de tropas indicados por el liderazgo." },
          { type: "list", items: [
            "7) Total vikingo: {howard} / {gordon} — **60 : 40** Sigue el límite de tropas (~68,000)",
            "8) PvE — Bestias / Caza: {diana} + {fahd} — **50 : 20 : 30**"
          ]},

          { type: "h", text: "🐺 PvE — BESTIAS / CAZA" },
          { type: "p", text: "Recuerda para el Lobo Terrible: no se necesita mucho daño, así que envía la menor cantidad de tropas posible (incluso 1) para que más miembros de la alianza puedan unirse y beneficiarse de las recompensas del {rally}." },

          { type: "h", text: "🏰 {castleBattle} / {sanctuary} / EDIFICIOS" },
          { type: "p", text: "Al capturar edificios, prepárate para cambiar rápidamente:" },
          { type: "callout", text: "**ATAQUE → DEFENSA**" },
          { type: "sub", text: "⚔️ 1. CAPTURA" },
          { type: "p", text: "Únete al {rally} inicial usando tu formación de ATAQUE." },
          { type: "p", text: "**Ejemplo:** {amadeus} / {chenko} **50 : 20 : 30**" },
          { type: "sub", text: "🛡️ 2. CAMBIA A DEFENSA" },
          { type: "p", text: "Una vez capturado el edificio:" },
          { type: "list", items: [
            "**1.** Envía inmediatamente otra marcha usando tu formación de DEFENSA. **Ejemplo:** {gordon} / {howard} **60 : 20 : 20**",
            "**2.** Observa cómo tu marcha de defensa se dirige hacia el edificio capturado.",
            "**3.** Cuando falten aproximadamente 5 segundos de marcha — o según las instrucciones del liderazgo — retira tu marcha de ATAQUE original.",
            "**4.** Tu marcha de DEFENSA llega y reemplaza a tu marcha ofensiva en la guarnición."
          ]},
          { type: "callout", text: "🚫 **NO retires tu marcha de ataque demasiado pronto.**" },
          { type: "p", text: "**Captura → Envía Defensa → ~5 seg → Retira Ataque → Llega Defensa**" },
          { type: "p", text: "Esto nos permite pasar de una configuración ofensiva a una guarnición defensiva sin debilitar innecesariamente el edificio." },

          { type: "h", text: "🪖 LÍMITE DE TROPAS EN LA GUARNICIÓN" },
          { type: "p", text: "Solo 15 gobernadores pueden entrar al Cuartel General (HQ) / {sanctuary}. Así que no envíes automáticamente tu marcha máxima al HQ, {sanctuary} u otros edificios en disputa." },
          { type: "p", text: "Sigue el límite de tropas anunciado por el liderazgo." },
          { type: "p", text: "**Objetivo habitual de la alianza: ~68,000 tropas por jugador**" },
          { type: "p", text: "Esto permite que más miembros de la alianza con marchas defensivas correctamente configuradas quepan dentro de la guarnición y obtengan recompensas." },
          { type: "callout", text: "⚠️ Si el liderazgo anuncia un límite diferente, sigue siempre la cantidad anunciada." },
          { type: "p", text: "Por ejemplo, con un límite de 68K tropas, puedes introducir ese número en una calculadora y colocarlo directamente en el campo correspondiente al tipo de tropa. Aquí tienes tres ejemplos:" },
          { type: "list", items: [
            "60/20/20 ➡️ 40,800 / 13,600 / 13,600",
            "60/40 ➡️ 40,800 / 27,200",
            "50/20/30 ➡️ 34,000 / 13,600 / 20,400"
          ]},

          { type: "h", text: "🎬 CÓMO CAMBIAR DE HÉROES OFENSIVOS A DEFENSIVOS" },
          { type: "video", src: "figures/switch_hero.mp4", caption: "📎 Video encontrado en línea (TikTok @yelloe_hair) — no es material propio." }
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
          { type: "p", text: "Örneğin, 68K birlik sınırını temel alarak bu sayıyı bir hesap makinesine girip doğrudan ilgili birlik türünün alanına yazabilirsin. İşte üç örnek:" },
          { type: "list", items: [
            "60/20/20 ➡️ 40.800 / 13.600 / 13.600",
            "60/40 ➡️ 40.800 / 27.200",
            "50/20/30 ➡️ 34.000 / 13.600 / 20.400"
          ]},

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
          { type: "p", text: "Contohnya, dengan batas 68K pasukan, kamu bisa memasukkan angka itu ke kalkulator dan langsung mengetiknya di kolom jenis pasukan yang sesuai. Berikut tiga contohnya:" },
          { type: "list", items: [
            "60/20/20 ➡️ 40.800 / 13.600 / 13.600",
            "60/40 ➡️ 40.800 / 27.200",
            "50/20/30 ➡️ 34.000 / 13.600 / 20.400"
          ]},

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
          { type: "p", text: "Например, при лимите войск 68K это число можно ввести в калькулятор и сразу вписать в поле соответствующего типа войск. Вот три примера:" },
          { type: "list", items: [
            "60/20/20 ➡️ 40 800 / 13 600 / 13 600",
            "60/40 ➡️ 40 800 / 27 200",
            "50/20/30 ➡️ 34 000 / 13 600 / 20 400"
          ]},

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
          { type: "p", text: "ตัวอย่างเช่น หากใช้ขีดจำกัดทหาร 68K คุณสามารถนำตัวเลขนี้ไปใส่ในเครื่องคิดเลข แล้วพิมพ์ลงในช่องของทหารแต่ละประเภทได้เลย ต่อไปนี้คือ 3 ตัวอย่าง:" },
          { type: "list", items: [
            "60/20/20 ➡️ 40,800 / 13,600 / 13,600",
            "60/40 ➡️ 40,800 / 27,200",
            "50/20/30 ➡️ 34,000 / 13,600 / 20,400"
          ]},

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
          { type: "callout", text: "⚠️ إذا أعلنت القيادة حدًا مختلفًا، فالتزم دائمًا بالرقم المعلن." },
          { type: "p", text: "على سبيل المثال: إذا كان حد القوات 68 ألفًا، يمكنك إدخال هذا الرقم في آلة حاسبة، ثم كتابته مباشرة في خانة نوع القوة المطابق. إليك ثلاثة أمثلة:" },
          { type: "list", items: [
            "60/20/20 ➡️ 40,800 / 13,600 / 13,600",
            "60/40 ➡️ 40,800 / 27,200",
            "50/20/30 ➡️ 34,000 / 13,600 / 20,400"
          ]},

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
      de: "Weiten der Ewigkeit", fr: "l'Éternité à Portée", pt: "Alcance da Eternidade", es: "Alcance de la Eternidad",
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
      es: { title: "Alcance de la Eternidad", blocks: [
        { type: "h", text: "CUÁNDO" },
        { type: "p", text: "Cada 2 semanas — un evento solitario de 30 minutos." },
        { type: "h", text: "POR QUÉ IMPORTA" },
        { type: "p", text: "Una de las mejores fuentes recurrentes de materiales para el Amuleto del Gobernador." },
        { type: "h", text: "ESTRATEGIA" },
        { type: "sub", text: "Habilidades" },
        { type: "p", text: "Para cada nivel de habilidad, elige:" },
        { type: "list", items: ["Nivel 1 → Derecha", "Nivel 2 → Derecha", "Nivel 3 → Izquierda", "Nivel 4 → Izquierda", "Nivel 5 → Derecha"] },
        { type: "sub", text: "Inicio" },
        { type: "p", text: "Ataca a los Guardias de Cesares → Avanza rápido hasta desbloquear la Habilidad 3." },
        { type: "p", text: "Apunta a Guardias de Cesares Nv.2 cuando sea posible, y salta los que ya estén siendo atacados." },
        { type: "sub", text: "Cada 60 segundos" },
        { type: "p", text: "Entra en una Veta de Cobre → Obtén 5,000 de Cobre → Recupera de inmediato → Anota la hora → Repite cada 1 minuto." },
        { type: "callout", text: "Solo se necesita una marcha para activar el bono de 5,000 de Cobre." },
        { type: "sub", text: "Vetas Fracturadas" },
        { type: "p", text: "Cuando aparezcan → Envía marchas disponibles de inmediato → Recolecta hasta que desaparezcan." },
        { type: "sub", text: "Carreta de Botín" },
        { type: "p", text: "Déjala recolectando el Cobre disperso durante todo el evento. No ocupa un espacio de marcha." },
        { type: "sub", text: "Habilidad 5" },
        { type: "p", text: "Activa la 5ª habilidad durante un estallido de veta y envía todas las tropas a recolectar en las vetas." },
        { type: "sub", text: "Cumbre de la Eternidad" },
        { type: "p", text: "Se abre durante los últimos 7 minutos." },
        { type: "p", text: "Evita el PvP innecesario si no eres lo bastante fuerte para disputarla → Captura solo cuando valga la pena." },
        { type: "sub", text: "Posicionamiento" },
        { type: "p", text: "Usa el teletransporte gratuito para moverte cerca de 3 Vetas o hacia una zona menos concurrida." },
        { type: "img", src: "figures/eternity_reach.jpg", alt: "Eternity's Reach" }
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
  },
  "f2p-heroes": {
    emoji: "🎯",
    name: {
      zh: "英雄培養指南（F2P）", en: "F2P Heroes Guide", ko: "무과금 영웅 육성 가이드", de: "F2P-Helden-Guide",
      fr: "Guide des héros F2P", pt: "Guia de Heróis F2P", tr: "F2P Kahraman Rehberi",
      id: "Panduan Hero F2P", ru: "Гайд по героям для F2P", th: "คู่มือฮีโร่สาย F2P", ar: "دليل الأبطال لللاعبين المجانيين",
      es: "Guía de Héroes F2P"
    },
    sections: {
      zh: { title: "英雄培養指南（F2P／低課金）", blocks: [
        { type: "callout", text: "神話碎片與專屬裝置數量有限，不要每個英雄都想練。把資源集中在長期價值高的英雄上。" },
        { type: "callout", text: "部分英雄的官方譯名尚未經截圖確認，或尚未正式上線，這篇一律保留英文原名，等日後驗證後再補上翻譯。" },

        { type: "sub", text: "第 1 代" },
        { type: "p", text: "**{jabel}**" },
        { type: "list", items: [
          "可農取的神話英雄；優先培養。",
          "**{saul}**：練幾星取得成長技能即可，不用過度投資。"
        ]},

        { type: "sub", text: "第 2 代" },
        { type: "p", text: "**{zoe} — 打造（輪盤）**" },
        { type: "list", items: [
          "大幅超越 {howard}。",
          "**{marlin}**：取代 {saul}。"
        ]},

        { type: "sub", text: "第 3 代" },
        { type: "p", text: "**Petra — 必練（輪盤）**" },
        { type: "list", items: [
          "優秀的狩獵巨熊英雄，價值可延續到第 7 代。",
          "**Eric ＆ Jaeger**：除非主攻 PvP／駐防，否則可以跳過。"
        ]},

        { type: "sub", text: "第 4 代" },
        { type: "p", text: "**Rosa — 打造（輪盤）**" },
        { type: "list", items: [
          "狩獵巨熊的強力升級。",
          "**Alcar 或 Margot**：非必要，兩者在競技場／遠征都不錯。"
        ]},

        { type: "sub", text: "第 5 代" },
        { type: "p", text: "**Long Fei — 打造（輪盤）**" },
        { type: "list", items: [
          "非常適合神秘試煉、三方聯盟戰、聖劍爭奪等多隊活動。",
          "**Thrud／Vivian**：主要用於競技場／PvP。",
          "沒抽到 Petra？可以考慮 Thrud。"
        ]},

        { type: "sub", text: "第 6 代" },
        { type: "p", text: "**Sophia — 打造（輪盤）**" },
        { type: "list", items: ["主要用在多隊內容。"] },
        { type: "p", text: "**Yang — 高優先**" },
        { type: "list", items: [
          "狩獵巨熊實用性極佳，值得投入神話碎片。",
          "**Triton**：如果已經練了 Long Fei，通常可以跳過。"
        ]},

        { type: "sub", text: "第 7 代" },
        { type: "p", text: "**Wee ＆ Woo — 必練（輪盤）**" },
        { type: "list", items: ["整體對 F2P 來說價值極高。"] },
        { type: "p", text: "**Ava — 高優先**" },
        { type: "list", items: [
          "優秀的狩獵巨熊英雄，可取代 Petra。",
          "**Charles**：通常可以放心跳過。"
        ]},

        { type: "h", text: "簡易 F2P 輪盤路線" },
        { type: "p", text: "{zoe} ➜ Petra ➜ Rosa ➜ Long Fei ➜ Sophia ➜ Wee ＆ Woo" },

        { type: "h", text: "神話碎片優先順序" },
        { type: "p", text: "Petra ➜ Yang ➜ Ava" },

        { type: "h", text: "經驗法則" },
        { type: "p", text: "輪盤英雄通常是 F2P 最安全的投資。省著用資源，不要把神話碎片分散得太薄，也不用有壓力覺得每個英雄都要練。" },

        { type: "h", text: "總結" },
        { type: "list", items: [
          "**F2P 玩家：** 從英雄輪盤中優先鎖定 {zoe}（步兵坦克）、{jabel}（騎兵）、Petra（進攻型騎兵）",
          "**課金玩家：** 優先培養 {amadeus}（VIP 7 以上）與 {hilde}，效益最大化"
        ]}
      ]},

      en: { title: "F2P Heroes Guide", blocks: [
        { type: "callout", text: "Mythic Shards and rally widgets are limited. Don't try to build every hero — focus your resources on heroes with strong, long-term value." },
        { type: "callout", text: "A few heroes below either haven't been officially confirmed via screenshot or haven't been released yet — those stay in English until verified." },

        { type: "sub", text: "GEN 1" },
        { type: "p", text: "**{jabel}**" },
        { type: "list", items: [
          "Farmable Mythic; main priority.",
          "**{saul}**: A few stars for the Growth skill. Don't over-invest."
        ]},

        { type: "sub", text: "GEN 2" },
        { type: "p", text: "**{zoe} — BUILD (Roulette)**" },
        { type: "list", items: [
          "Major upgrade over {howard}.",
          "**{marlin}**: Replaces {saul}."
        ]},

        { type: "sub", text: "GEN 3" },
        { type: "p", text: "**Petra — MUST BUILD (Roulette)**" },
        { type: "list", items: [
          "Excellent Bear Hunt hero with value through Gen 7.",
          "**Eric & Jaeger**: Skip unless you're focused on PvP/garrison defense."
        ]},

        { type: "sub", text: "GEN 4" },
        { type: "p", text: "**Rosa — BUILD (Roulette)**" },
        { type: "list", items: [
          "Strong Bear Hunt upgrade.",
          "**Alcar OR Margot**: Optional. Both are strong in Arena/Expedition."
        ]},

        { type: "sub", text: "GEN 5" },
        { type: "p", text: "**Long Fei — BUILD (Roulette)**" },
        { type: "list", items: [
          "Great for multi-team events like Mystic Trial, Tri-Alliance & Swordland.",
          "**Thrud/Vivian**: Mostly Arena/PvP.",
          "Missed Petra? Consider Thrud."
        ]},

        { type: "sub", text: "GEN 6" },
        { type: "p", text: "**Sophia — BUILD (Roulette)**" },
        { type: "list", items: ["Mainly useful for multi-team content."] },
        { type: "p", text: "**Yang — HIGH PRIORITY**" },
        { type: "list", items: [
          "Excellent Bear Hunt utility; worth investing Mythic Shards.",
          "**Triton**: Generally skip if you built Long Fei."
        ]},

        { type: "sub", text: "GEN 7" },
        { type: "p", text: "**Wee & Woo — MUST BUILD (Roulette)**" },
        { type: "list", items: ["Excellent overall F2P value."] },
        { type: "p", text: "**Ava — HIGH PRIORITY**" },
        { type: "list", items: [
          "Excellent Bear Hunt hero; replaces Petra.",
          "**Charles**: Generally safe to skip."
        ]},

        { type: "h", text: "SIMPLE F2P ROULETTE PATH" },
        { type: "p", text: "{zoe} ➜ Petra ➜ Rosa ➜ Long Fei ➜ Sophia ➜ Wee & Woo" },

        { type: "h", text: "MYTHIC SHARD PRIORITIES" },
        { type: "p", text: "Petra ➜ Yang ➜ Ava" },

        { type: "h", text: "RULE OF THUMB" },
        { type: "p", text: "Roulette heroes are generally your safest F2P investments. Save your resources, avoid spreading Mythic Shards too thin, and don't feel pressured to build every hero." },

        { type: "h", text: "SUMMARY" },
        { type: "list", items: [
          "**F2P Players:** Focus on {zoe} (infantry tank), {jabel} (cavalry), and Petra (offensive cavalry) from hero roulette",
          "**P2W Players:** Prioritize {amadeus} (VIP 7+) and {hilde} for maximum impact"
        ]}
      ]},

      ko: { title: "무과금 영웅 육성 가이드", blocks: [
        { type: "callout", text: "신화 조각과 집결 전용 장비는 한정되어 있습니다. 모든 영웅을 다 키우려 하지 말고, 장기적으로 가치가 높은 영웅에 자원을 집중하세요." },
        { type: "callout", text: "아래 일부 영웅은 스크린샷으로 공식 확인되지 않았거나 아직 출시되지 않았습니다. 확인되기 전까지는 영문 이름을 그대로 사용합니다." },

        { type: "sub", text: "1세대" },
        { type: "p", text: "**{jabel}**" },
        { type: "list", items: [
          "파밍 가능한 신화 영웅; 최우선 육성 대상.",
          "**{saul}**: 성장 스킬을 위해 별 몇 개만. 과도하게 투자하지 마세요."
        ]},

        { type: "sub", text: "2세대" },
        { type: "p", text: "**{zoe} — 육성 (룰렛)**" },
        { type: "list", items: [
          "{howard}보다 크게 업그레이드된 선택.",
          "**{marlin}**: {saul}을 대체."
        ]},

        { type: "sub", text: "3세대" },
        { type: "p", text: "**Petra — 필수 육성 (룰렛)**" },
        { type: "list", items: [
          "7세대까지 가치 있는 훌륭한 자이언트 베어 사냥 영웅.",
          "**Eric & Jaeger**: PvP/주둔 방어에 집중하지 않는다면 건너뛰세요."
        ]},

        { type: "sub", text: "4세대" },
        { type: "p", text: "**Rosa — 육성 (룰렛)**" },
        { type: "list", items: [
          "자이언트 베어 사냥에서 강력한 업그레이드.",
          "**Alcar 또는 Margot**: 선택 사항. 둘 다 투기장/원정에서 강력합니다."
        ]},

        { type: "sub", text: "5세대" },
        { type: "p", text: "**Long Fei — 육성 (룰렛)**" },
        { type: "list", items: [
          "신비한 시련, 삼자 연맹전, 성검 쟁탈 같은 다중 팀 이벤트에 매우 좋습니다.",
          "**Thrud/Vivian**: 주로 투기장/PvP용.",
          "Petra를 놓쳤다면 Thrud를 고려하세요."
        ]},

        { type: "sub", text: "6세대" },
        { type: "p", text: "**Sophia — 육성 (룰렛)**" },
        { type: "list", items: ["주로 다중 팀 콘텐츠에 유용합니다."] },
        { type: "p", text: "**Yang — 최우선**" },
        { type: "list", items: [
          "자이언트 베어 사냥 활용도가 뛰어나 신화 조각을 투자할 가치가 있습니다.",
          "**Triton**: Long Fei를 육성했다면 대체로 건너뛰어도 됩니다."
        ]},

        { type: "sub", text: "7세대" },
        { type: "p", text: "**Wee & Woo — 필수 육성 (룰렛)**" },
        { type: "list", items: ["무과금 유저에게 전반적으로 훌륭한 가치."] },
        { type: "p", text: "**Ava — 최우선**" },
        { type: "list", items: [
          "훌륭한 자이언트 베어 사냥 영웅; Petra를 대체.",
          "**Charles**: 대체로 안심하고 건너뛰어도 됩니다."
        ]},

        { type: "h", text: "간단한 무과금 룰렛 경로" },
        { type: "p", text: "{zoe} ➜ Petra ➜ Rosa ➜ Long Fei ➜ Sophia ➜ Wee & Woo" },

        { type: "h", text: "신화 조각 우선순위" },
        { type: "p", text: "Petra ➜ Yang ➜ Ava" },

        { type: "h", text: "기본 원칙" },
        { type: "p", text: "룰렛 영웅은 대체로 무과금 유저에게 가장 안전한 투자입니다. 자원을 아끼고, 신화 조각을 너무 얇게 분산시키지 말고, 모든 영웅을 키워야 한다는 부담을 가지지 마세요." },

        { type: "h", text: "요약" },
        { type: "list", items: [
          "**무과금 유저:** 영웅 룰렛에서 {zoe}(보병 탱커), {jabel}(기병), Petra(공격형 기병)를 우선하세요",
          "**과금 유저:** {amadeus}(VIP 7 이상)와 {hilde}를 우선 육성해 효과를 극대화하세요"
        ]}
      ]},

      de: { title: "F2P-Helden-Guide", blocks: [
        { type: "callout", text: "Mythische Splitter und Rally-Ausrüstungen sind begrenzt. Versuche nicht, jeden Helden aufzubauen — konzentriere deine Ressourcen auf Helden mit starkem, langfristigem Wert." },
        { type: "callout", text: "Einige Helden unten wurden entweder nicht per Screenshot offiziell bestätigt oder sind noch nicht veröffentlicht — diese bleiben auf Englisch, bis sie bestätigt sind." },

        { type: "sub", text: "GEN 1" },
        { type: "p", text: "**{jabel}**" },
        { type: "list", items: [
          "Farmbarer Mythischer Held; oberste Priorität.",
          "**{saul}**: Ein paar Sterne für die Wachstumsfähigkeit. Nicht überinvestieren."
        ]},

        { type: "sub", text: "GEN 2" },
        { type: "p", text: "**{zoe} — AUFBAUEN (Roulette)**" },
        { type: "list", items: [
          "Deutliches Upgrade gegenüber {howard}.",
          "**{marlin}**: Ersetzt {saul}."
        ]},

        { type: "sub", text: "GEN 3" },
        { type: "p", text: "**Petra — UNBEDINGT AUFBAUEN (Roulette)**" },
        { type: "list", items: [
          "Exzellenter Bärenjagd-Held mit Wert bis Gen 7.",
          "**Eric & Jaeger**: Überspringen, außer du konzentrierst dich auf PvP/Garnisonsverteidigung."
        ]},

        { type: "sub", text: "GEN 4" },
        { type: "p", text: "**Rosa — AUFBAUEN (Roulette)**" },
        { type: "list", items: [
          "Starkes Upgrade für die Bärenjagd.",
          "**Alcar ODER Margot**: Optional. Beide sind stark in Arena/Expedition."
        ]},

        { type: "sub", text: "GEN 5" },
        { type: "p", text: "**Long Fei — AUFBAUEN (Roulette)**" },
        { type: "list", items: [
          "Großartig für Multi-Team-Events wie Mystic Trial, Tri-Allianz und Swordland.",
          "**Thrud/Vivian**: Hauptsächlich Arena/PvP.",
          "Petra verpasst? Erwäge Thrud."
        ]},

        { type: "sub", text: "GEN 6" },
        { type: "p", text: "**Sophia — AUFBAUEN (Roulette)**" },
        { type: "list", items: ["Hauptsächlich nützlich für Multi-Team-Inhalte."] },
        { type: "p", text: "**Yang — HOHE PRIORITÄT**" },
        { type: "list", items: [
          "Exzellenter Nutzen bei der Bärenjagd; Mythische Splitter lohnen sich.",
          "**Triton**: In der Regel überspringen, wenn du Long Fei aufgebaut hast."
        ]},

        { type: "sub", text: "GEN 7" },
        { type: "p", text: "**Wee & Woo — UNBEDINGT AUFBAUEN (Roulette)**" },
        { type: "list", items: ["Insgesamt exzellenter F2P-Wert."] },
        { type: "p", text: "**Ava — HOHE PRIORITÄT**" },
        { type: "list", items: [
          "Exzellenter Bärenjagd-Held; ersetzt Petra.",
          "**Charles**: In der Regel bedenkenlos überspringen."
        ]},

        { type: "h", text: "EINFACHER F2P-ROULETTE-PFAD" },
        { type: "p", text: "{zoe} ➜ Petra ➜ Rosa ➜ Long Fei ➜ Sophia ➜ Wee & Woo" },

        { type: "h", text: "PRIORITÄTEN FÜR MYTHISCHE SPLITTER" },
        { type: "p", text: "Petra ➜ Yang ➜ Ava" },

        { type: "h", text: "FAUSTREGEL" },
        { type: "p", text: "Roulette-Helden sind in der Regel deine sichersten F2P-Investitionen. Spare deine Ressourcen, verteile Mythische Splitter nicht zu dünn und fühl dich nicht unter Druck, jeden Helden aufzubauen." },

        { type: "h", text: "ZUSAMMENFASSUNG" },
        { type: "list", items: [
          "**F2P-Spieler:** Konzentriere dich im Helden-Roulette auf {zoe} (Infanterie-Tank), {jabel} (Kavallerie) und Petra (offensive Kavallerie)",
          "**P2W-Spieler:** Priorisiere {amadeus} (VIP 7+) und {hilde} für maximale Wirkung"
        ]}
      ]},

      fr: { title: "Guide des héros F2P", blocks: [
        { type: "callout", text: "Les Éclats mythiques et les équipements exclusifs de ralliement sont limités. N'essayez pas de développer tous les héros — concentrez vos ressources sur ceux qui ont une valeur forte et durable." },
        { type: "callout", text: "Quelques héros ci-dessous n'ont pas encore été confirmés officiellement par capture d'écran, ou ne sont pas encore sortis — ils restent en anglais jusqu'à vérification." },

        { type: "sub", text: "GEN 1" },
        { type: "p", text: "**{jabel}**" },
        { type: "list", items: [
          "Héros mythique farmable ; priorité principale.",
          "**{saul}**: Quelques étoiles pour la compétence de croissance. N'investissez pas trop."
        ]},

        { type: "sub", text: "GEN 2" },
        { type: "p", text: "**{zoe} — À DÉVELOPPER (Roulette)**" },
        { type: "list", items: [
          "Grosse amélioration par rapport à {howard}.",
          "**{marlin}**: Remplace {saul}."
        ]},

        { type: "sub", text: "GEN 3" },
        { type: "p", text: "**Petra — À DÉVELOPPER ABSOLUMENT (Roulette)**" },
        { type: "list", items: [
          "Excellent héros pour la Chasse à l'Ours, avec une valeur qui dure jusqu'à la Gen 7.",
          "**Eric & Jaeger**: À ignorer sauf si vous vous concentrez sur le PvP/la défense de garnison."
        ]},

        { type: "sub", text: "GEN 4" },
        { type: "p", text: "**Rosa — À DÉVELOPPER (Roulette)**" },
        { type: "list", items: [
          "Grosse amélioration pour la Chasse à l'Ours.",
          "**Alcar OU Margot**: Facultatif. Les deux sont solides en Arène/Expédition."
        ]},

        { type: "sub", text: "GEN 5" },
        { type: "p", text: "**Long Fei — À DÉVELOPPER (Roulette)**" },
        { type: "list", items: [
          "Excellent pour les événements multi-équipes comme l'Épreuve Mystique, la guerre Tri-Alliance et le Choc du Glaive.",
          "**Thrud/Vivian**: Surtout Arène/PvP.",
          "Vous avez manqué Petra ? Envisagez Thrud."
        ]},

        { type: "sub", text: "GEN 6" },
        { type: "p", text: "**Sophia — À DÉVELOPPER (Roulette)**" },
        { type: "list", items: ["Utile surtout pour le contenu multi-équipes."] },
        { type: "p", text: "**Yang — PRIORITÉ ÉLEVÉE**" },
        { type: "list", items: [
          "Excellente utilité pour la Chasse à l'Ours ; ça vaut la peine d'y investir des Éclats mythiques.",
          "**Triton**: En général à ignorer si vous avez développé Long Fei."
        ]},

        { type: "sub", text: "GEN 7" },
        { type: "p", text: "**Wee & Woo — À DÉVELOPPER ABSOLUMENT (Roulette)**" },
        { type: "list", items: ["Excellente valeur globale pour les F2P."] },
        { type: "p", text: "**Ava — PRIORITÉ ÉLEVÉE**" },
        { type: "list", items: [
          "Excellent héros pour la Chasse à l'Ours ; remplace Petra.",
          "**Charles**: Généralement sûr à ignorer."
        ]},

        { type: "h", text: "PARCOURS ROULETTE F2P SIMPLIFIÉ" },
        { type: "p", text: "{zoe} ➜ Petra ➜ Rosa ➜ Long Fei ➜ Sophia ➜ Wee & Woo" },

        { type: "h", text: "PRIORITÉS DES ÉCLATS MYTHIQUES" },
        { type: "p", text: "Petra ➜ Yang ➜ Ava" },

        { type: "h", text: "RÈGLE GÉNÉRALE" },
        { type: "p", text: "Les héros de la roulette sont généralement vos investissements F2P les plus sûrs. Économisez vos ressources, évitez de trop disperser vos Éclats mythiques, et ne vous sentez pas obligé de développer tous les héros." },

        { type: "h", text: "RÉSUMÉ" },
        { type: "list", items: [
          "**Joueurs F2P :** Concentrez-vous sur {zoe} (tank d'infanterie), {jabel} (cavalerie) et Petra (cavalerie offensive) via la roulette de héros",
          "**Joueurs P2W :** Priorisez {amadeus} (VIP 7+) et {hilde} pour un impact maximal"
        ]}
      ]},

      pt: { title: "Guia de Heróis F2P", blocks: [
        { type: "callout", text: "Fragmentos Míticos e equipamentos exclusivos de rally são limitados. Não tente desenvolver todos os heróis — concentre seus recursos nos que têm valor forte a longo prazo." },
        { type: "callout", text: "Alguns heróis abaixo ainda não foram confirmados oficialmente por captura de tela, ou ainda não foram lançados — eles ficam em inglês até serem confirmados." },

        { type: "sub", text: "GEN 1" },
        { type: "p", text: "**{jabel}**" },
        { type: "list", items: [
          "Herói mítico farmável; prioridade principal.",
          "**{saul}**: Algumas estrelas para a habilidade de Crescimento. Não invista demais."
        ]},

        { type: "sub", text: "GEN 2" },
        { type: "p", text: "**{zoe} — DESENVOLVER (Roleta)**" },
        { type: "list", items: [
          "Grande melhoria em relação a {howard}.",
          "**{marlin}**: Substitui {saul}."
        ]},

        { type: "sub", text: "GEN 3" },
        { type: "p", text: "**Petra — DEVE DESENVOLVER (Roleta)**" },
        { type: "list", items: [
          "Excelente herói para Caça ao Urso, com valor até a Gen 7.",
          "**Eric & Jaeger**: Pule, a menos que você foque em PvP/defesa de guarnição."
        ]},

        { type: "sub", text: "GEN 4" },
        { type: "p", text: "**Rosa — DESENVOLVER (Roleta)**" },
        { type: "list", items: [
          "Forte melhoria para a Caça ao Urso.",
          "**Alcar OU Margot**: Opcional. Ambos são fortes em Arena/Expedição."
        ]},

        { type: "sub", text: "GEN 5" },
        { type: "p", text: "**Long Fei — DESENVOLVER (Roleta)**" },
        { type: "list", items: [
          "Ótimo para eventos multi-equipes como Julgamento Místico, Tri-Aliança e Confronto entre Espadas.",
          "**Thrud/Vivian**: Principalmente Arena/PvP.",
          "Perdeu a Petra? Considere a Thrud."
        ]},

        { type: "sub", text: "GEN 6" },
        { type: "p", text: "**Sophia — DESENVOLVER (Roleta)**" },
        { type: "list", items: ["Útil principalmente para conteúdo multi-equipes."] },
        { type: "p", text: "**Yang — ALTA PRIORIDADE**" },
        { type: "list", items: [
          "Excelente utilidade na Caça ao Urso; vale a pena investir Fragmentos Míticos.",
          "**Triton**: Geralmente pule se você já desenvolveu o Long Fei."
        ]},

        { type: "sub", text: "GEN 7" },
        { type: "p", text: "**Wee & Woo — DEVE DESENVOLVER (Roleta)**" },
        { type: "list", items: ["Excelente valor geral para F2P."] },
        { type: "p", text: "**Ava — ALTA PRIORIDADE**" },
        { type: "list", items: [
          "Excelente herói para Caça ao Urso; substitui a Petra.",
          "**Charles**: Geralmente seguro pular."
        ]},

        { type: "h", text: "CAMINHO SIMPLES DE ROLETA F2P" },
        { type: "p", text: "{zoe} ➜ Petra ➜ Rosa ➜ Long Fei ➜ Sophia ➜ Wee & Woo" },

        { type: "h", text: "PRIORIDADES DE FRAGMENTOS MÍTICOS" },
        { type: "p", text: "Petra ➜ Yang ➜ Ava" },

        { type: "h", text: "REGRA GERAL" },
        { type: "p", text: "Heróis de roleta são geralmente seus investimentos F2P mais seguros. Economize seus recursos, evite espalhar os Fragmentos Míticos demais, e não sinta pressão para desenvolver todos os heróis." },

        { type: "h", text: "RESUMO" },
        { type: "list", items: [
          "**Jogadores F2P:** Foque em {zoe} (tanque de infantaria), {jabel} (cavalaria) e Petra (cavalaria ofensiva) na roleta de heróis",
          "**Jogadores P2W:** Priorize {amadeus} (VIP 7+) e {hilde} para o máximo impacto"
        ]}
      ]},
      es: { title: "Guía de Héroes F2P", blocks: [
        { type: "callout", text: "Los Fragmentos Míticos y los dispositivos de ataque conjunto son limitados. No intentes desarrollar a todos los héroes; concentra tus recursos en héroes con valor fuerte y a largo plazo." },
        { type: "callout", text: "Algunos héroes de abajo aún no se han confirmado oficialmente por captura de pantalla, o todavía no han salido — esos se mantienen en inglés hasta que se confirmen." },

        { type: "sub", text: "GEN 1" },
        { type: "p", text: "**{jabel}**" },
        { type: "list", items: [
          "Mítico farmeable; máxima prioridad.",
          "**{saul}**: Unas pocas estrellas para la habilidad de Crecimiento. No invertir de más."
        ]},

        { type: "sub", text: "GEN 2" },
        { type: "p", text: "**{zoe} — DESARROLLAR (Ruleta)**" },
        { type: "list", items: [
          "Gran mejora respecto a {howard}.",
          "**{marlin}**: Reemplaza a {saul}."
        ]},

        { type: "sub", text: "GEN 3" },
        { type: "p", text: "**Petra — IMPRESCINDIBLE (Ruleta)**" },
        { type: "list", items: [
          "Excelente héroe para la Cacería del Oso, con valor hasta la Gen 7.",
          "**Eric & Jaeger**: Omitir salvo que te enfoques en PvP/defensa de guarnición."
        ]},

        { type: "sub", text: "GEN 4" },
        { type: "p", text: "**Rosa — DESARROLLAR (Ruleta)**" },
        { type: "list", items: [
          "Gran mejora para la Cacería del Oso.",
          "**Alcar O Margot**: Opcional. Ambos son fuertes en Arena/Expedición."
        ]},

        { type: "sub", text: "GEN 5" },
        { type: "p", text: "**Long Fei — DESARROLLAR (Ruleta)**" },
        { type: "list", items: [
          "Excelente para eventos multi-equipo como el Juicio Místico, la Tri-Alianza y Swordland.",
          "**Thrud/Vivian**: Principalmente Arena/PvP.",
          "¿No conseguiste a Petra? Considera a Thrud."
        ]},

        { type: "sub", text: "GEN 6" },
        { type: "p", text: "**Sophia — DESARROLLAR (Ruleta)**" },
        { type: "list", items: ["Principalmente útil para contenido multi-equipo."] },
        { type: "p", text: "**Yang — ALTA PRIORIDAD**" },
        { type: "list", items: [
          "Excelente utilidad para la Cacería del Oso; vale la pena invertir Fragmentos Míticos.",
          "**Triton**: Generalmente omitir si ya desarrollaste a Long Fei."
        ]},

        { type: "sub", text: "GEN 7" },
        { type: "p", text: "**Wee & Woo — IMPRESCINDIBLE (Ruleta)**" },
        { type: "list", items: ["Excelente valor general para F2P."] },
        { type: "p", text: "**Ava — ALTA PRIORIDAD**" },
        { type: "list", items: [
          "Excelente héroe para la Cacería del Oso; reemplaza a Petra.",
          "**Charles**: Generalmente seguro de omitir."
        ]},

        { type: "h", text: "RUTA SIMPLE DE RULETA F2P" },
        { type: "p", text: "{zoe} ➜ Petra ➜ Rosa ➜ Long Fei ➜ Sophia ➜ Wee & Woo" },

        { type: "h", text: "PRIORIDAD DE FRAGMENTOS MÍTICOS" },
        { type: "p", text: "Petra ➜ Yang ➜ Ava" },

        { type: "h", text: "REGLA GENERAL" },
        { type: "p", text: "Los héroes de ruleta son generalmente tu inversión F2P más segura. Ahorra tus recursos, evita repartir los Fragmentos Míticos en demasiados héroes, y no sientas presión de desarrollarlos todos." },

        { type: "h", text: "RESUMEN" },
        { type: "list", items: [
          "**Jugadores F2P:** Prioriza a {zoe} (tanque de infantería), {jabel} (caballería) y Petra (caballería ofensiva) de la ruleta de héroes",
          "**Jugadores P2W:** Prioriza a {amadeus} (VIP 7+) y {hilde} para el máximo impacto"
        ]}
      ]},
      tr: { title: "F2P Kahraman Rehberi", blocks: [
        { type: "callout", text: "Mitik Parçalar ve seferberliğe özel donanımlar sınırlıdır. Her kahramanı geliştirmeye çalışma — kaynaklarını uzun vadede güçlü değer sağlayan kahramanlara yoğunlaştır." },
        { type: "callout", text: "Aşağıdaki bazı kahramanlar ya ekran görüntüsüyle resmi olarak doğrulanmadı ya da henüz yayınlanmadı — bunlar doğrulanana kadar İngilizce kalacak." },

        { type: "sub", text: "GEN 1" },
        { type: "p", text: "**{jabel}**" },
        { type: "list", items: [
          "Çiftçilikle elde edilebilen Mitik kahraman; ana öncelik.",
          "**{saul}**: Gelişim yeteneği için birkaç yıldız yeterli. Fazla yatırım yapma."
        ]},

        { type: "sub", text: "GEN 2" },
        { type: "p", text: "**{zoe} — GELİŞTİR (Rulet)**" },
        { type: "list", items: [
          "{howard}'a göre büyük bir yükseltme.",
          "**{marlin}**: {saul}'un yerini alır."
        ]},

        { type: "sub", text: "GEN 3" },
        { type: "p", text: "**Petra — MUTLAKA GELİŞTİR (Rulet)**" },
        { type: "list", items: [
          "Gen 7'ye kadar değerini koruyan mükemmel bir Ayı Avı kahramanı.",
          "**Eric & Jaeger**: PvP/garnizon savunmasına odaklanmıyorsan atla."
        ]},

        { type: "sub", text: "GEN 4" },
        { type: "p", text: "**Rosa — GELİŞTİR (Rulet)**" },
        { type: "list", items: [
          "Ayı Avı için güçlü bir yükseltme.",
          "**Alcar VEYA Margot**: İsteğe bağlı. İkisi de Arena/Sefer'de güçlü."
        ]},

        { type: "sub", text: "GEN 5" },
        { type: "p", text: "**Long Fei — GELİŞTİR (Rulet)**" },
        { type: "list", items: [
          "Gizemli Deneme, Üçlü İttifak ve Kılıçdiyarı gibi çok takımlı etkinlikler için harika.",
          "**Thrud/Vivian**: Ağırlıklı olarak Arena/PvP.",
          "Petra'yı mı kaçırdın? Thrud'u düşün."
        ]},

        { type: "sub", text: "GEN 6" },
        { type: "p", text: "**Sophia — GELİŞTİR (Rulet)**" },
        { type: "list", items: ["Ağırlıklı olarak çok takımlı içerikler için faydalı."] },
        { type: "p", text: "**Yang — YÜKSEK ÖNCELİK**" },
        { type: "list", items: [
          "Ayı Avı'nda mükemmel fayda sağlar; Mitik Parça yatırımına değer.",
          "**Triton**: Long Fei'yi geliştirdiysen genellikle atlanabilir."
        ]},

        { type: "sub", text: "GEN 7" },
        { type: "p", text: "**Wee & Woo — MUTLAKA GELİŞTİR (Rulet)**" },
        { type: "list", items: ["F2P için genel olarak mükemmel değer."] },
        { type: "p", text: "**Ava — YÜKSEK ÖNCELİK**" },
        { type: "list", items: [
          "Mükemmel bir Ayı Avı kahramanı; Petra'nın yerini alır.",
          "**Charles**: Genellikle güvenle atlanabilir."
        ]},

        { type: "h", text: "BASİT F2P RULET YOLU" },
        { type: "p", text: "{zoe} ➜ Petra ➜ Rosa ➜ Long Fei ➜ Sophia ➜ Wee & Woo" },

        { type: "h", text: "MİTİK PARÇA ÖNCELİKLERİ" },
        { type: "p", text: "Petra ➜ Yang ➜ Ava" },

        { type: "h", text: "GENEL KURAL" },
        { type: "p", text: "Rulet kahramanları genellikle en güvenli F2P yatırımlarındır. Kaynaklarını biriktir, Mitik Parçaları çok fazla dağıtma ve her kahramanı geliştirmen gerektiğini hissetme." },

        { type: "h", text: "ÖZET" },
        { type: "list", items: [
          "**F2P Oyuncuları:** Kahraman ruletinde {zoe} (piyade tankı), {jabel} (süvari) ve Petra'ya (saldırı süvarisi) odaklan",
          "**P2W Oyuncuları:** Maksimum etki için {amadeus} (VIP 7+) ve {hilde}'ya öncelik ver"
        ]}
      ]},

      id: { title: "Panduan Hero F2P", blocks: [
        { type: "callout", text: "Serpihan Mitos dan perlengkapan eksklusif reli jumlahnya terbatas. Jangan coba kembangkan semua hero — fokuskan sumber dayamu pada hero dengan nilai jangka panjang yang kuat." },
        { type: "callout", text: "Beberapa hero di bawah ini belum dikonfirmasi resmi lewat screenshot, atau belum dirilis — nama-nama itu tetap dalam bahasa Inggris sampai terverifikasi." },

        { type: "sub", text: "GEN 1" },
        { type: "p", text: "**{jabel}**" },
        { type: "list", items: [
          "Hero Mitos yang bisa di-farm; prioritas utama.",
          "**{saul}**: Beberapa bintang saja untuk skill Growth. Jangan investasi berlebihan."
        ]},

        { type: "sub", text: "GEN 2" },
        { type: "p", text: "**{zoe} — KEMBANGKAN (Roulette)**" },
        { type: "list", items: [
          "Peningkatan besar dibanding {howard}.",
          "**{marlin}**: Menggantikan {saul}."
        ]},

        { type: "sub", text: "GEN 3" },
        { type: "p", text: "**Petra — WAJIB DIKEMBANGKAN (Roulette)**" },
        { type: "list", items: [
          "Hero Bear Hunt yang sangat baik dengan nilai hingga Gen 7.",
          "**Eric & Jaeger**: Lewati kecuali kamu fokus pada PvP/pertahanan garnisun."
        ]},

        { type: "sub", text: "GEN 4" },
        { type: "p", text: "**Rosa — KEMBANGKAN (Roulette)**" },
        { type: "list", items: [
          "Peningkatan kuat untuk Bear Hunt.",
          "**Alcar ATAU Margot**: Opsional. Keduanya kuat di Arena/Ekspedisi."
        ]},

        { type: "sub", text: "GEN 5" },
        { type: "p", text: "**Long Fei — KEMBANGKAN (Roulette)**" },
        { type: "list", items: [
          "Sangat cocok untuk event multi-tim seperti Mystic Trial, Tri-Alliance, dan Swordland.",
          "**Thrud/Vivian**: Sebagian besar untuk Arena/PvP.",
          "Kelewatan Petra? Pertimbangkan Thrud."
        ]},

        { type: "sub", text: "GEN 6" },
        { type: "p", text: "**Sophia — KEMBANGKAN (Roulette)**" },
        { type: "list", items: ["Terutama berguna untuk konten multi-tim."] },
        { type: "p", text: "**Yang — PRIORITAS TINGGI**" },
        { type: "list", items: [
          "Kegunaan Bear Hunt yang sangat baik; layak diinvestasikan Serpihan Mitos.",
          "**Triton**: Umumnya bisa dilewati jika kamu sudah mengembangkan Long Fei."
        ]},

        { type: "sub", text: "GEN 7" },
        { type: "p", text: "**Wee & Woo — WAJIB DIKEMBANGKAN (Roulette)**" },
        { type: "list", items: ["Nilai keseluruhan yang sangat baik untuk F2P."] },
        { type: "p", text: "**Ava — PRIORITAS TINGGI**" },
        { type: "list", items: [
          "Hero Bear Hunt yang sangat baik; menggantikan Petra.",
          "**Charles**: Umumnya aman untuk dilewati."
        ]},

        { type: "h", text: "JALUR ROULETTE F2P SEDERHANA" },
        { type: "p", text: "{zoe} ➜ Petra ➜ Rosa ➜ Long Fei ➜ Sophia ➜ Wee & Woo" },

        { type: "h", text: "PRIORITAS SERPIHAN MITOS" },
        { type: "p", text: "Petra ➜ Yang ➜ Ava" },

        { type: "h", text: "ATURAN UMUM" },
        { type: "p", text: "Hero roulette umumnya adalah investasi F2P paling aman. Hemat sumber dayamu, hindari menyebarkan Serpihan Mitos terlalu tipis, dan jangan merasa harus mengembangkan semua hero." },

        { type: "h", text: "RINGKASAN" },
        { type: "list", items: [
          "**Pemain F2P:** Fokus pada {zoe} (tank infanteri), {jabel} (kavaleri), dan Petra (kavaleri ofensif) dari hero roulette",
          "**Pemain P2W:** Prioritaskan {amadeus} (VIP 7+) dan {hilde} untuk dampak maksimal"
        ]}
      ]},

      ru: { title: "Гайд по героям для F2P", blocks: [
        { type: "callout", text: "Мифические осколки и эксклюзивное снаряжение для рейдов ограничены. Не пытайтесь развивать всех героев — сосредоточьте ресурсы на героях с сильной долгосрочной ценностью." },
        { type: "callout", text: "Некоторые герои ниже либо официально не подтверждены скриншотами, либо ещё не вышли — они остаются на английском до подтверждения." },

        { type: "sub", text: "ПОКОЛЕНИЕ 1" },
        { type: "p", text: "**{jabel}**" },
        { type: "list", items: [
          "Фармящийся мифический герой; главный приоритет.",
          "**{saul}**: Несколько звёзд ради навыка роста. Не вкладывайтесь чрезмерно."
        ]},

        { type: "sub", text: "ПОКОЛЕНИЕ 2" },
        { type: "p", text: "**{zoe} — РАЗВИВАТЬ (рулетка)**" },
        { type: "list", items: [
          "Значительное улучшение по сравнению с {howard}.",
          "**{marlin}**: Заменяет {saul}."
        ]},

        { type: "sub", text: "ПОКОЛЕНИЕ 3" },
        { type: "p", text: "**Petra — ОБЯЗАТЕЛЬНО РАЗВИВАТЬ (рулетка)**" },
        { type: "list", items: [
          "Отличный герой для Охоты на медведя, сохраняет ценность до 7-го поколения.",
          "**Eric и Jaeger**: Пропустите, если вы не сосредоточены на PvP/защите гарнизона."
        ]},

        { type: "sub", text: "ПОКОЛЕНИЕ 4" },
        { type: "p", text: "**Rosa — РАЗВИВАТЬ (рулетка)**" },
        { type: "list", items: [
          "Сильное улучшение для Охоты на медведя.",
          "**Alcar ИЛИ Margot**: Необязательно. Оба сильны на Арене/в Экспедициях."
        ]},

        { type: "sub", text: "ПОКОЛЕНИЕ 5" },
        { type: "p", text: "**Long Fei — РАЗВИВАТЬ (рулетка)**" },
        { type: "list", items: [
          "Отлично подходит для командных событий вроде Мистического испытания, Тройственного альянса и Битвы за Страну мечей.",
          "**Thrud/Vivian**: В основном для Арены/PvP.",
          "Пропустили Petra? Рассмотрите Thrud."
        ]},

        { type: "sub", text: "ПОКОЛЕНИЕ 6" },
        { type: "p", text: "**Sophia — РАЗВИВАТЬ (рулетка)**" },
        { type: "list", items: ["В основном полезна для командного контента."] },
        { type: "p", text: "**Yang — ВЫСОКИЙ ПРИОРИТЕТ**" },
        { type: "list", items: [
          "Отличная полезность в Охоте на медведя; стоит вкладывать Мифические осколки.",
          "**Triton**: Обычно можно пропустить, если вы развили Long Fei."
        ]},

        { type: "sub", text: "ПОКОЛЕНИЕ 7" },
        { type: "p", text: "**Wee и Woo — ОБЯЗАТЕЛЬНО РАЗВИВАТЬ (рулетка)**" },
        { type: "list", items: ["Отличная общая ценность для F2P."] },
        { type: "p", text: "**Ava — ВЫСОКИЙ ПРИОРИТЕТ**" },
        { type: "list", items: [
          "Отличный герой для Охоты на медведя; заменяет Petra.",
          "**Charles**: Обычно можно спокойно пропустить."
        ]},

        { type: "h", text: "ПРОСТОЙ ПУТЬ РУЛЕТКИ ДЛЯ F2P" },
        { type: "p", text: "{zoe} ➜ Petra ➜ Rosa ➜ Long Fei ➜ Sophia ➜ Wee и Woo" },

        { type: "h", text: "ПРИОРИТЕТЫ МИФИЧЕСКИХ ОСКОЛКОВ" },
        { type: "p", text: "Petra ➜ Yang ➜ Ava" },

        { type: "h", text: "ПРАВИЛО ПАЛЬЦА" },
        { type: "p", text: "Герои рулетки обычно являются вашими самыми безопасными вложениями для F2P. Экономьте ресурсы, не распыляйте Мифические осколки слишком тонко и не чувствуйте давления развивать каждого героя." },

        { type: "h", text: "ИТОГ" },
        { type: "list", items: [
          "**Игроки F2P:** Сосредоточьтесь на {zoe} (танк-пехотинец), {jabel} (кавалерия) и Petra (наступательная кавалерия) в рулетке героев",
          "**Игроки P2W:** Отдайте приоритет {amadeus} (VIP 7+) и {hilde} для максимального эффекта"
        ]}
      ]},

      th: { title: "คู่มือฮีโร่สาย F2P", blocks: [
        { type: "callout", text: "เศษชิ้นส่วนในตำนานและอุปกรณ์เฉพาะทีมระดมพลมีจำกัด อย่าพยายามพัฒนาทุกฮีโร่ — ทุ่มทรัพยากรไปที่ฮีโร่ที่มีคุณค่าระยะยาวสูง" },
        { type: "callout", text: "ฮีโร่บางตัวด้านล่างยังไม่ได้รับการยืนยันอย่างเป็นทางการด้วยภาพหน้าจอ หรือยังไม่เปิดตัว จึงคงชื่อเป็นภาษาอังกฤษไว้จนกว่าจะยืนยันได้" },

        { type: "sub", text: "เจน 1" },
        { type: "p", text: "**{jabel}**" },
        { type: "list", items: [
          "ฮีโร่ตำนานที่ฟาร์มได้; ลำดับความสำคัญหลัก",
          "**{saul}**: อัพดาวไม่กี่ดาวเพื่อรับสกิล Growth ก็พอ ไม่ต้องลงทุนเกินความจำเป็น"
        ]},

        { type: "sub", text: "เจน 2" },
        { type: "p", text: "**{zoe} — พัฒนา (รูเล็ต)**" },
        { type: "list", items: [
          "อัพเกรดที่ดีกว่า {howard} มาก",
          "**{marlin}**: แทนที่ {saul}"
        ]},

        { type: "sub", text: "เจน 3" },
        { type: "p", text: "**Petra — ต้องพัฒนา (รูเล็ต)**" },
        { type: "list", items: [
          "ฮีโร่ล่าหมีที่ยอดเยี่ยม มีคุณค่าไปจนถึงเจน 7",
          "**Eric & Jaeger**: ข้ามได้ เว้นแต่คุณเน้น PvP/การป้องกันกองรักษาการณ์"
        ]},

        { type: "sub", text: "เจน 4" },
        { type: "p", text: "**Rosa — พัฒนา (รูเล็ต)**" },
        { type: "list", items: [
          "อัพเกรดที่แข็งแกร่งสำหรับการล่าหมี",
          "**Alcar หรือ Margot**: ไม่บังคับ ทั้งสองแข็งแกร่งในสนามประลอง/การสำรวจ"
        ]},

        { type: "sub", text: "เจน 5" },
        { type: "p", text: "**Long Fei — พัฒนา (รูเล็ต)**" },
        { type: "list", items: [
          "เหมาะมากสำหรับกิจกรรมหลายทีมอย่าง Mystic Trial, Tri-Alliance และศึกดวลดินแดนดาบ",
          "**Thrud/Vivian**: ส่วนใหญ่ใช้ในสนามประลอง/PvP",
          "พลาด Petra ไป? ลองพิจารณา Thrud"
        ]},

        { type: "sub", text: "เจน 6" },
        { type: "p", text: "**Sophia — พัฒนา (รูเล็ต)**" },
        { type: "list", items: ["มีประโยชน์หลักๆ สำหรับคอนเทนต์หลายทีม"] },
        { type: "p", text: "**Yang — ลำดับความสำคัญสูง**" },
        { type: "list", items: [
          "มีประโยชน์อย่างมากในการล่าหมี คุ้มค่าที่จะลงทุนเศษชิ้นส่วนในตำนาน",
          "**Triton**: โดยทั่วไปข้ามได้หากคุณพัฒนา Long Fei แล้ว"
        ]},

        { type: "sub", text: "เจน 7" },
        { type: "p", text: "**Wee & Woo — ต้องพัฒนา (รูเล็ต)**" },
        { type: "list", items: ["คุ้มค่ามากโดยรวมสำหรับสาย F2P"] },
        { type: "p", text: "**Ava — ลำดับความสำคัญสูง**" },
        { type: "list", items: [
          "ฮีโร่ล่าหมีที่ยอดเยี่ยม; แทนที่ Petra",
          "**Charles**: โดยทั่วไปข้ามได้อย่างสบายใจ"
        ]},

        { type: "h", text: "เส้นทางรูเล็ต F2P แบบง่าย" },
        { type: "p", text: "{zoe} ➜ Petra ➜ Rosa ➜ Long Fei ➜ Sophia ➜ Wee & Woo" },

        { type: "h", text: "ลำดับความสำคัญเศษชิ้นส่วนในตำนาน" },
        { type: "p", text: "Petra ➜ Yang ➜ Ava" },

        { type: "h", text: "หลักการทั่วไป" },
        { type: "p", text: "ฮีโร่จากรูเล็ตมักเป็นการลงทุนที่ปลอดภัยที่สุดสำหรับสาย F2P เก็บทรัพยากรไว้ อย่ากระจายเศษชิ้นส่วนในตำนานให้บางเกินไป และไม่ต้องรู้สึกกดดันว่าต้องพัฒนาทุกฮีโร่" },

        { type: "h", text: "สรุป" },
        { type: "list", items: [
          "**ผู้เล่นสาย F2P:** เน้นไปที่ {zoe} (แทงค์ทหารราบ), {jabel} (ทหารม้า) และ Petra (ทหารม้าสายโจมตี) จากรูเล็ตฮีโร่",
          "**ผู้เล่นสายจ่าย:** จัดลำดับความสำคัญให้ {amadeus} (VIP 7 ขึ้นไป) และ {hilde} เพื่อผลลัพธ์สูงสุด"
        ]}
      ]},

      ar: { title: "دليل الأبطال لللاعبين المجانيين", blocks: [
        { type: "callout", text: "شظايا الأسطورة وعتاد التحالف الحصري للحشد محدودان. لا تحاول بناء كل بطل — ركّز مواردك على الأبطال ذوي القيمة القوية طويلة المدى." },
        { type: "callout", text: "بعض الأبطال أدناه إما لم يتم تأكيدهم رسميًا بلقطة شاشة أو لم يُطرحوا بعد — يبقون بالإنجليزية حتى يتم التحقق منهم." },

        { type: "sub", text: "الجيل 1" },
        { type: "p", text: "**{jabel}**" },
        { type: "list", items: [
          "بطل أسطوري يمكن جمعه بالزراعة؛ الأولوية الرئيسية.",
          "**{saul}**: بضع نجوم فقط لمهارة النمو. لا تستثمر أكثر من اللازم."
        ]},

        { type: "sub", text: "الجيل 2" },
        { type: "p", text: "**{zoe} — طوّر (الروليت)**" },
        { type: "list", items: [
          "ترقية كبيرة مقارنة بـ {howard}.",
          "**{marlin}**: يحل محل {saul}."
        ]},

        { type: "sub", text: "الجيل 3" },
        { type: "p", text: "**Petra — يجب تطويره (الروليت)**" },
        { type: "list", items: [
          "بطل ممتاز لصيد الدببة بقيمة تستمر حتى الجيل 7.",
          "**Eric وJaeger**: تخطَّهما إلا إذا كنت تركز على PvP/دفاع الحامية."
        ]},

        { type: "sub", text: "الجيل 4" },
        { type: "p", text: "**Rosa — طوّر (الروليت)**" },
        { type: "list", items: [
          "ترقية قوية لصيد الدببة.",
          "**Alcar أو Margot**: اختياري. كلاهما قوي في الساحة/الاستكشاف."
        ]},

        { type: "sub", text: "الجيل 5" },
        { type: "p", text: "**Long Fei — طوّر (الروليت)**" },
        { type: "list", items: [
          "رائع لفعاليات الفرق المتعددة مثل المحاكمة الغامضة، التحالف الثلاثي، ومواجهة أرض السيوف.",
          "**Thrud/Vivian**: غالبًا للساحة/PvP.",
          "فاتك Petra؟ فكّر في Thrud."
        ]},

        { type: "sub", text: "الجيل 6" },
        { type: "p", text: "**Sophia — طوّر (الروليت)**" },
        { type: "list", items: ["مفيد بشكل أساسي لمحتوى الفرق المتعددة."] },
        { type: "p", text: "**Yang — أولوية عالية**" },
        { type: "list", items: [
          "فائدة ممتازة في صيد الدببة؛ يستحق استثمار شظايا الأسطورة.",
          "**Triton**: يمكن تخطيه عمومًا إذا طوّرت Long Fei."
        ]},

        { type: "sub", text: "الجيل 7" },
        { type: "p", text: "**Wee وWoo — يجب تطويرهما (الروليت)**" },
        { type: "list", items: ["قيمة ممتازة بشكل عام لللاعبين المجانيين."] },
        { type: "p", text: "**Ava — أولوية عالية**" },
        { type: "list", items: [
          "بطل ممتاز لصيد الدببة؛ يحل محل Petra.",
          "**Charles**: يمكن تخطيه بأمان عمومًا."
        ]},

        { type: "h", text: "مسار روليت مبسّط لللاعبين المجانيين" },
        { type: "p", text: "{zoe} ➜ Petra ➜ Rosa ➜ Long Fei ➜ Sophia ➜ Wee وWoo" },

        { type: "h", text: "أولويات شظايا الأسطورة" },
        { type: "p", text: "Petra ➜ Yang ➜ Ava" },

        { type: "h", text: "القاعدة العامة" },
        { type: "p", text: "أبطال الروليت عادةً هم استثماراتك الأكثر أمانًا كلاعب مجاني. وفّر مواردك، تجنّب توزيع شظايا الأسطورة بشكل مبعثر جدًا، ولا تشعر بضغط لتطوير كل بطل." },

        { type: "h", text: "الملخص" },
        { type: "list", items: [
          "**اللاعبون المجانيون:** ركّزوا على {zoe} (دبابة مشاة)، {jabel} (فرسان)، وPetra (فرسان هجومية) من روليت الأبطال",
          "**اللاعبون الداعمون:** أعطوا الأولوية لـ {amadeus} (VIP 7+) وHilde لتحقيق أقصى تأثير"
        ]}
      ]}
    }
  },
"kvk": {
  emoji: "👑",
  name: { zh: "KvK 準備與戰鬥指南", en: "KvK Prep & Battle Guide", ko: "KvK 준비 및 전투 가이드", de: "KvK-Vorbereitungs- & Kampfguide", fr: "Guide de Préparation et Combat KvK", pt: "Guia de Preparação e Batalha KvK", es: "Guía de Preparación y Batalla KvK", tr: "KvK Hazırlık ve Savaş Rehberi", id: "Panduan Persiapan & Pertempuran KvK", ru: "Гайд по подготовке и битве KvK", th: "คู่มือเตรียมตัวและการต่อสู้ KvK", ar: "دليل استعداد وقتال KvK" },
  sections: {
    zh: { title: "KvK 準備與戰鬥指南（Gen 3 版本）", blocks: [
      { type: "checklist", days: [1, 2, 3, 4, 5],
        rows: [
          { label: "{truegold}", icons: ["✅", "<span class=\"chk-ok\">OK</span>", "🚫", "🚫", "✅"] },
          { label: "{truegoldDust}", icons: ["<span class=\"chk-ok\">OK</span>", "✅", "🚫", "🚫", "✅"] },
          { label: "{heroShard}", icons: ["🚫", "✅", "✅", "🚫", "🚫"] },
          { label: "⏩️ {construction}", icons: ["✅", "<span class=\"chk-ok\">OK</span>", "🚫", "🚫", "✅"] },
          { label: "⏩️ {training}", icons: ["🚫", "🚫", "🚫", "✅", "✅"] },
          { label: "⏩️ {research}", icons: ["<span class=\"chk-ok\">OK</span>", "✅", "🚫", "🚫", "✅"] },
          { label: "{heroRoulette}", icons: ["🚫", "✅", "✅", "🚫", "🚫"] },
          { label: "{gathering}", icons: ["👍", "✅", "👍", "✅", "👍"] },
          { label: "{intel}", icons: ["✅", "👍", "✅", "👍", "✅"] },
          { label: "{petAdvancement}", icons: ["🚫", "🚫", "✅", "🚫", "✅"] },
          { label: "{governorCharm}", icons: ["✅", "🚫", "<span class=\"chk-ok\">OK</span>", "✅", "🚫"] },
          { label: "{governorGear}", icons: ["🚫", "🚫", "🚫", "🚫", "✅"] },
          { label: "{heroExclusiveGear} {widget}", icons: ["🚫", "🚫", "🚫", "<span class=\"chk-ok\">OK</span>", "✅"] },
          { label: "{mithril} ", icons: ["🚫", "🚫", "🚫", "<span class=\"chk-ok\">OK</span>", "✅"] },
          { label: "{forgehammer}", icons: ["🚫", "🚫", "🚫", "<span class=\"chk-ok\">OK</span>", "✅"] },
          { label: "{masterItems}", icons: ["🚫", "✅", "<span class=\"chk-ok\">OK</span>", "🚫", "🚫"] },
          { label: "{manuscript}", icons: ["🚫", "🚫", "✅", "🚫", "🚫"] },
          { label: "{masterSpeeds}", icons: ["<span class=\"chk-ok\">OK</span>", "✅", "🚫", "🚫", "<span class=\"chk-ok\">OK</span>"] }
        ],
        legend: [
          { icon: "✅", label: "{useIcon}" },
          { icon: "<span class=\"chk-ok\">OK</span>", label: "{okayIfNeeded}" },
          { icon: "🚫", label: "{dontUseIcon}" },
          { icon: "👍", label: "{needDaily}" }
        ]
      },
      { type: "h", text: "第一階段：準備階段（第 1–5 天）" },
      { type: "p", text: "王國要贏得 KvK，準備階段的總積分必須超過對手。贏得這個階段能獲得攻擊方優勢（戰鬥階段中，你的王城完全安全）。" },
      { type: "sub", text: "第 1 天：建設、真金與寶石" },
      { type: "p", text: "計分項目：{truegold}建築升級、建設加速、{governorCharm}、情報任務、{masters} 技能加速。" },
      { type: "p", text: "**🛡️ F2P 重點：**" },
      { type: "list", items: ["花掉存下來的建設加速跟{truegold}。", "使用之前幾週留下來的領主寶石圖紙／設計圖。", "清空所有瞭望塔情報任務。"]},
      { type: "p", text: "**⚡ P2W 重點：**" },
      { type: "list", items: ["把高等級{truegold}建築（{academy}／War Academy）練滿。", "把領主寶石推到 8–11 級以獲取大量積分（11 級每階可獲得 16,000 分）。"]},
      { type: "sub", text: "第 2 天：研究、英雄與採集" },
      { type: "p", text: "計分項目：研究加速、{truegoldDust}（科技）、英雄碎片（稀有／史詩／傳說）、英雄轉盤、{masters} 徽章／手稿、資源採集。" },
      { type: "p", text: "**🛡️ F2P 重點：**" },
      { type: "list", items: ["用存下來的鑽石轉英雄轉盤，取得 Petra（Gen 3）碎片。", "把存下來的通用傳說／史詩碎片投入核心英雄。", "提前派出採集部隊（在每日重置前送出，這樣第 2 天一開始就會立刻返回）。"]},
      { type: "p", text: "**⚡ P2W 重點：**" },
      { type: "list", items: ["把{academy}裡的{truegoldDust}研究練滿。", "把存下來的 {masters} 徽章與手稿全部用完。", "把 Gen 3 英雄（Eric 與 Petra）立刻升到 5 星。"]},
      { type: "sub", text: "第 3 天：寵物訓練與 {masters} 進度" },
      { type: "p", text: "計分項目：{petAdvancement}、{commonTamingMarks}與{advancedTamingMarks}（洗煉）、英雄轉盤、英雄碎片、{masters} 徽章／手稿、情報任務。" },
      { type: "p", text: "**🛡️ F2P 重點：**" },
      { type: "list", items: ["平均升級並洗煉多隻中階寵物，不要把所有資源都投入單一隻寵物。", "使用剩餘的英雄轉盤次數與每日情報任務。"]},
      { type: "p", text: "**⚡ P2W 重點：**" },
      { type: "list", items: ["大量使用{advancedTamingMarks}（每個 15,000 分）。", "把{petAdvancement}門檻推到最高，取得高倍率積分。"]},
      { type: "sub", text: "第 4 天：英雄成長與部隊訓練" },
      { type: "p", text: "計分項目：部隊訓練／升階（T1–T11）、{forgehammer}、{widget}、秘銀、資源採集。" },
      { type: "p", text: "**🛡️ F2P 重點：**" },
      { type: "list", items: ["把低階部隊升到你目前最高的階級（例如 T9 升 T10）。升級部隊比從零練新兵種划算得多。", "把一般加速留給研究／{masters} 用——這裡只用專門的部隊訓練加速。"]},
      { type: "p", text: "**⚡ P2W 重點：**" },
      { type: "list", items: ["用掉存下來的{forgehammer}（每個 4,000 分）與{heroExclusiveGear}的{widget}（每個 8,000 分）。", "使用秘銀升級（每個 40,000 分），觸發大量積分暴增。"]},
      { type: "sub", text: "第 5 天：戰力提升與最終升級" },
      { type: "p", text: "計分項目：{governorGear}、英雄裝備、寵物洗煉、秘銀、{truegold}、所有加速、情報任務、採集。" },
      { type: "p", text: "**🛡️ F2P 重點：**" },
      { type: "list", items: ["清空剩餘情報任務，用掉剩餘資源／加速，並用累積的{satin}／{gildedThreads}升級{governorGear}。"]},
      { type: "p", text: "**⚡ P2W 重點：**" },
      { type: "list", items: ["把{governorGear}推到傳說／傳說三星（每階提升 6,250 分）。", "清空剩餘秘銀、{widget}與{forgehammer}，確保每日個人排行榜前 2000／前 200 名獎勵。"]},
      { type: "h", text: "⚔️ 第二階段：戰鬥階段（12 小時）" },
      { type: "p", text: "王城戰鬥時段：UTC 12:00 至 22:00。" },
      { type: "p", text: "目標：控制{kingsCastle}與 4 座{turret}。" },
      { type: "h", text: "🎯 GEN 3 PVP 主流打法與集結配置" },
      { type: "sub", text: "🛡️ 駐防防守 — 王城／砲台" },
      { type: "p", text: "**指揮英雄：** Eric（Gen 3）——擁有優秀 Gen 3 屬性與生存機制的步兵鐵壁，搭配 {zoe}（Gen 2）提供防護罩。" },
      { type: "sub", text: "⚔️ 進攻集結（攻打王城／砲台）" },
      { type: "p", text: "**指揮英雄：** Petra（Gen 3）——具備高倍率進攻集結{widget}的毀滅性騎兵指揮官。" },
      { type: "sub", text: "🤝 集結參與者（F2P 關鍵！）" },
      { type: "p", text: "加入集結時**不要**隨便帶英雄。請帶：" },
      { type: "list", items: ["{chenko}（技能 1 練滿）", "{amane}", "{yeonwoo}"]},
      { type: "p", text: "這幾位英雄能疊加殺傷力倍率。" },
      { type: "h", text: "💣 雙集結「巨鯨粉碎機」戰術" },
      { type: "p", text: "應對敵方重兵駐防時：" },
      { type: "list", items: ["**第 1 波集結（肉盾／清場）：** 提前 1–2 秒發起。專注純殺傷力，讓敵方傷兵營爆滿，清空防守部隊。", "**第 2 波集結（主攻手）：** 緊接在第 1 波後方抵達，殲滅剩餘部隊並奪取王城控制權。"]},
      { type: "callout", text: "{turret}優勢：若跟持有王城的同一王國控制{turret}，能提供最多 +20% 部隊殺傷力。" },
      { type: "h", text: "🩺 第三階段：戰地救護（部隊救援）" },
      { type: "p", text: "基礎救援率：來不及送進傷兵營、陣亡部隊的 30%。" },
      { type: "p", text: "目標救援率：90%" },
      { type: "p", text: "**提升方式：**" },
      { type: "list", items: ["{medicalSatchels}：+10% 救援率", "{rescueOrders}：每個 +1%，最多 +50%"]},
      { type: "callout", text: "⚠️ **重要：** 所有人都必須在計時器結束前，於聯盟聊天交換{rescueOrders}！" }
    ]},
    en: { title: "KvK Prep & Battle Guide (Gen 3 Era)", blocks: [
      { type: "checklist", days: [1, 2, 3, 4, 5],
        rows: [
          { label: "{truegold}", icons: ["✅", "<span class=\"chk-ok\">OK</span>", "🚫", "🚫", "✅"] },
          { label: "{truegoldDust}", icons: ["<span class=\"chk-ok\">OK</span>", "✅", "🚫", "🚫", "✅"] },
          { label: "{heroShard}", icons: ["🚫", "✅", "✅", "🚫", "🚫"] },
          { label: "⏩️ {construction}", icons: ["✅", "<span class=\"chk-ok\">OK</span>", "🚫", "🚫", "✅"] },
          { label: "⏩️ {training}", icons: ["🚫", "🚫", "🚫", "✅", "✅"] },
          { label: "⏩️ {research}", icons: ["<span class=\"chk-ok\">OK</span>", "✅", "🚫", "🚫", "✅"] },
          { label: "{heroRoulette}", icons: ["🚫", "✅", "✅", "🚫", "🚫"] },
          { label: "{gathering}", icons: ["👍", "✅", "👍", "✅", "👍"] },
          { label: "{intel}", icons: ["✅", "👍", "✅", "👍", "✅"] },
          { label: "{petAdvancement}", icons: ["🚫", "🚫", "✅", "🚫", "✅"] },
          { label: "{governorCharm}", icons: ["✅", "🚫", "<span class=\"chk-ok\">OK</span>", "✅", "🚫"] },
          { label: "{governorGear}", icons: ["🚫", "🚫", "🚫", "🚫", "✅"] },
          { label: "{heroExclusiveGear} {widget}", icons: ["🚫", "🚫", "🚫", "<span class=\"chk-ok\">OK</span>", "✅"] },
          { label: "{mithril} ", icons: ["🚫", "🚫", "🚫", "<span class=\"chk-ok\">OK</span>", "✅"] },
          { label: "{forgehammer}", icons: ["🚫", "🚫", "🚫", "<span class=\"chk-ok\">OK</span>", "✅"] },
          { label: "{masterItems}", icons: ["🚫", "✅", "<span class=\"chk-ok\">OK</span>", "🚫", "🚫"] },
          { label: "{manuscript}", icons: ["🚫", "🚫", "✅", "🚫", "🚫"] },
          { label: "{masterSpeeds}", icons: ["<span class=\"chk-ok\">OK</span>", "✅", "🚫", "🚫", "<span class=\"chk-ok\">OK</span>"] }
        ],
        legend: [
          { icon: "✅", label: "{useIcon}" },
          { icon: "<span class=\"chk-ok\">OK</span>", label: "{okayIfNeeded}" },
          { icon: "🚫", label: "{dontUseIcon}" },
          { icon: "👍", label: "{needDaily}" }
        ]
      },
      { type: "h", text: "PHASE 1: PREPARATION PHASE (Days 1–5)" },
      { type: "p", text: "To win KVK, your Kingdom must earn more total points during Prep Phase than your opponent. Winning this phase grants Attacker Advantage (your Castle is completely safe during the Battle Phase)." },
      { type: "sub", text: "Day 1: Construction, Truegold & Charms" },
      { type: "p", text: "Scoring Activities: {truegold} building upgrades, Construction Speedups, {governorCharm}s, Intel Missions, Master Skill Speedups." },
      { type: "p", text: "**🛡️ F2P Focus:**" },
      { type: "list", items: ["Spend saved Construction Speedups and {truegold}.", "Use {governorGear} Charm Guides/Designs saved from previous weeks.", "Clear all Watchtower Intel Missions."]},
      { type: "p", text: "**⚡ P2W Focus:**" },
      { type: "list", items: ["Max out high-level {truegold} building levels ({academy} / War Academy).", "Push {governorGear} Charms to Level 8–11 for massive point spikes (Level 11 gives 16,000 pts per tier up)."]},
      { type: "sub", text: "Day 2: Research, Heroes & Gathering" },
      { type: "p", text: "Scoring Activities: Research Speedups, {truegoldDust} (Tech), Hero Shards (Rare/Epic/Mythic), Hero Roulette spins, Master Emblems/{manuscript}s, Gathering Resources." },
      { type: "p", text: "**🛡️ F2P Focus:**" },
      { type: "list", items: ["Spin the Hero Roulette using saved Gems to gain Petra (Gen 3) shards.", "Dump saved universal Mythic/Epic shards into core heroes.", "Pre-gather resources (send gatherers out before reset so they return immediately at Day 2 start)."]},
      { type: "p", text: "**⚡ P2W Focus:**" },
      { type: "list", items: ["Max out {truegoldDust} research in the {academy}.", "Burn all saved Master Emblems and {manuscript}s.", "Rank up Gen 3 heroes (Eric & Petra) to 5-star instantly."]},
      { type: "sub", text: "Day 3: Pet Training & Master Progression" },
      { type: "p", text: "Scoring Activities: {petAdvancement}, {commonTamingMarks} & {advancedTamingMarks} (Refining), Hero Roulette, Hero Shards, Master Emblems/{manuscript}s, Intel Missions." },
      { type: "p", text: "**🛡️ F2P Focus:**" },
      { type: "list", items: ["Level up and refine multiple mid-tier pets evenly rather than sinking everything into one pet.", "Use leftover Hero Roulette spins and daily Intel Missions."]},
      { type: "p", text: "**⚡ P2W Focus:**" },
      { type: "list", items: ["Heavy use of {advancedTamingMarks} (15,000 pts each).", "Maximize {petAdvancement} thresholds for high point multipliers."]},
      { type: "sub", text: "Day 4: Hero Development & Troop Training" },
      { type: "p", text: "Scoring Activities: Troop Training/Promotions (T1–T11), {forgehammer}s, {widget}s, Mithril, Resource Gathering." },
      { type: "p", text: "**🛡️ F2P Focus:**" },
      { type: "list", items: ["Promote lower-tier troops to your highest tier (e.g., T9 to T10). Upgrading troops is drastically more resource-efficient than training new ones from scratch.", "Save general speedups for research/masters—only use dedicated Troop Training speedups here."]},
      { type: "p", text: "**⚡ P2W Focus:**" },
      { type: "list", items: ["Burn saved {forgehammer}s (4,000 pts each) and {heroExclusiveGear} {widget}s (8,000 pts each).", "Apply Mithril upgrades (40,000 pts each) to unlock massive point surges."]},
      { type: "sub", text: "Day 5: Power Boost & Final Upgrades" },
      { type: "p", text: "Scoring Activities: {governorGear}, Hero Gear, Pet Refining, Mithril, {truegold}, All Speedups, Intel Missions, Gathering." },
      { type: "p", text: "**🛡️ F2P Focus:**" },
      { type: "list", items: ["Clear remaining Intel Missions, burn leftover resources/speedups, and upgrade {governorGear} using accumulated {satin}/{gildedThreads}."]},
      { type: "p", text: "**⚡ P2W Focus:**" },
      { type: "list", items: ["Push {governorGear} to Mythic / Mythic 3-Star (6,250 pts per tier boost).", "Liquidate all remaining Mithril, {widget}s, and {forgehammer}s to secure daily Top 2000 / Top 200 personal ranking rewards."]},
      { type: "h", text: "⚔️ PHASE 2: BATTLE PHASE (12 HOURS)" },
      { type: "p", text: "Castle Battle Window: 12:00 UTC to 22:00 UTC." },
      { type: "p", text: "Target: Control the {kingsCastle} and 4 {turret}s." },
      { type: "h", text: "🎯 GEN 3 PVP META & RALLY SETUP" },
      { type: "sub", text: "🛡️ Garrison Defense — Castle/Turrets" },
      { type: "p", text: "**Lead Hero:** Eric (Gen 3) — Unbreakable infantry wall with superior Gen 3 stats and survival mechanics. Paired with {zoe} (Gen 2) for shields." },
      { type: "sub", text: "⚔️ Offensive Rallies (Attacking Castle/Turrets)" },
      { type: "p", text: "**Lead Hero:** Petra (Gen 3) — Devastating Cavalry leader with high-scaling offensive rally {widget}s." },
      { type: "sub", text: "🤝 Rally Joiners (Crucial for F2P!)" },
      { type: "p", text: "Do NOT use random heroes when joining rallies. Join with:" },
      { type: "list", items: ["{chenko} (Skill 1 maxed)", "{amane}", "{yeonwoo}"]},
      { type: "p", text: "These heroes stack Lethality multipliers." },
      { type: "h", text: "💣 DOUBLE-RALLY \"WHALE SMASHER\" STRATEGY" },
      { type: "p", text: "For heavy enemy garrisons:" },
      { type: "list", items: ["**Rally 1 (Meat Shield / Clearer):** Launched 1–2 seconds ahead. Focuses pure lethality to overflow the enemy's Infirmary and clear defending troops.", "**Rally 2 (Main Striker):** Arrives immediately behind Rally 1 to wipe out remaining troops and take control of the Castle."]},
      { type: "callout", text: "{turret} Advantage: Capturing {turret}s provides up to +20% Squad Lethality if held by the same kingdom holding the Castle." },
      { type: "h", text: "🩺 PHASE 3: FIELD TRIAGE (TROOP RECOVERY)" },
      { type: "p", text: "Base Rescue Rate: 30% of lost troops that bypassed the Infirmary." },
      { type: "p", text: "Target Rescue Rate: 90%" },
      { type: "p", text: "**How to increase it:**" },
      { type: "list", items: ["{medicalSatchels}: +10% Rescue Rate", "{rescueOrders}: +1% each, up to +50%"]},
      { type: "callout", text: "⚠️ **IMPORTANT:** Everyone must exchange {rescueOrders} in alliance chat before the timer expires!" }
    ]},
    ko: { title: "KvK 준비 및 전투 가이드 (Gen 3 시대)", blocks: [
      { type: "checklist", days: [1, 2, 3, 4, 5],
        rows: [
          { label: "{truegold}", icons: ["✅", "<span class=\"chk-ok\">OK</span>", "🚫", "🚫", "✅"] },
          { label: "{truegoldDust}", icons: ["<span class=\"chk-ok\">OK</span>", "✅", "🚫", "🚫", "✅"] },
          { label: "{heroShard}", icons: ["🚫", "✅", "✅", "🚫", "🚫"] },
          { label: "⏩️ {construction}", icons: ["✅", "<span class=\"chk-ok\">OK</span>", "🚫", "🚫", "✅"] },
          { label: "⏩️ {training}", icons: ["🚫", "🚫", "🚫", "✅", "✅"] },
          { label: "⏩️ {research}", icons: ["<span class=\"chk-ok\">OK</span>", "✅", "🚫", "🚫", "✅"] },
          { label: "{heroRoulette}", icons: ["🚫", "✅", "✅", "🚫", "🚫"] },
          { label: "{gathering}", icons: ["👍", "✅", "👍", "✅", "👍"] },
          { label: "{intel}", icons: ["✅", "👍", "✅", "👍", "✅"] },
          { label: "{petAdvancement}", icons: ["🚫", "🚫", "✅", "🚫", "✅"] },
          { label: "{governorCharm}", icons: ["✅", "🚫", "<span class=\"chk-ok\">OK</span>", "✅", "🚫"] },
          { label: "{governorGear}", icons: ["🚫", "🚫", "🚫", "🚫", "✅"] },
          { label: "{heroExclusiveGear} {widget}", icons: ["🚫", "🚫", "🚫", "<span class=\"chk-ok\">OK</span>", "✅"] },
          { label: "{mithril} ", icons: ["🚫", "🚫", "🚫", "<span class=\"chk-ok\">OK</span>", "✅"] },
          { label: "{forgehammer}", icons: ["🚫", "🚫", "🚫", "<span class=\"chk-ok\">OK</span>", "✅"] },
          { label: "{masterItems}", icons: ["🚫", "✅", "<span class=\"chk-ok\">OK</span>", "🚫", "🚫"] },
          { label: "{manuscript}", icons: ["🚫", "🚫", "✅", "🚫", "🚫"] },
          { label: "{masterSpeeds}", icons: ["<span class=\"chk-ok\">OK</span>", "✅", "🚫", "🚫", "<span class=\"chk-ok\">OK</span>"] }
        ],
        legend: [
          { icon: "✅", label: "{useIcon}" },
          { icon: "<span class=\"chk-ok\">OK</span>", label: "{okayIfNeeded}" },
          { icon: "🚫", label: "{dontUseIcon}" },
          { icon: "👍", label: "{needDaily}" }
        ]
      },
      { type: "h", text: "1단계: 준비 단계 (1일차~5일차)" },
      { type: "p", text: "KVK에서 승리하려면 준비 단계에서 상대보다 더 많은 총점을 획득해야 합니다. 이 단계에서 승리하면 공격 측 우위를 얻습니다 (전투 단계 동안 캐슬이 완전히 안전해집니다)." },
      { type: "sub", text: "1일차: 건설, 진금 및 영주 보석" },
      { type: "p", text: "점수 활동: {truegold} 건물 업그레이드, 건설 가속, {governorCharm}, 정보 임무, {masters} 스킬 가속." },
      { type: "p", text: "**🛡️ F2P 중점:**" },
      { type: "list", items: ["아껴둔 건설 가속과 {truegold}를 사용하세요.", "이전 주에 아껴둔 {governorGear} 보석 가이드/디자인을 사용하세요.", "모든 전망대 정보 임무를 클리어하세요."]},
      { type: "p", text: "**⚡ P2W 중점:**" },
      { type: "list", items: ["고레벨 {truegold} 건물({academy}/War Academy)을 최대치로 올리세요.", "{governorGear} 보석을 8~11레벨까지 밀어 대량 점수를 획득하세요 (11레벨은 단계당 16,000점)."]},
      { type: "sub", text: "2일차: 연구, 영웅 및 채집" },
      { type: "p", text: "점수 활동: 연구 가속, {truegoldDust} (기술), 영웅 조각 (레어/에픽/레전드), 영웅 룰렛, {masters} 문양/원고, 자원 채집." },
      { type: "p", text: "**🛡️ F2P 중점:**" },
      { type: "list", items: ["아껴둔 다이아로 영웅 룰렛을 돌려 Petra(Gen 3) 조각을 획득하세요.", "아껴둔 범용 레전드/에픽 조각을 핵심 영웅에게 투입하세요.", "미리 채집 부대를 보내세요 (초기화 전에 보내서 2일차 시작과 동시에 즉시 복귀하도록)."]},
      { type: "p", text: "**⚡ P2W 중점:**" },
      { type: "list", items: ["{academy}의 {truegoldDust} 연구를 최대치로 올리세요.", "아껴둔 {masters} 문양과 원고를 모두 사용하세요.", "Gen 3 영웅(Eric & Petra)을 즉시 5성으로 올리세요."]},
      { type: "sub", text: "3일차: 펫 훈련 및 {masters} 진행" },
      { type: "p", text: "점수 활동: {petAdvancement}, {commonTamingMarks} 및 {advancedTamingMarks} (단련), 영웅 룰렛, 영웅 조각, {masters} 문양/원고, 정보 임무." },
      { type: "p", text: "**🛡️ F2P 중점:**" },
      { type: "list", items: ["한 마리에 모든 자원을 쏟기보다, 여러 중급 펫을 고르게 레벨업하고 단련하세요.", "남은 영웅 룰렛 횟수와 일일 정보 임무를 사용하세요."]},
      { type: "p", text: "**⚡ P2W 중점:**" },
      { type: "list", items: ["{advancedTamingMarks}를 대량으로 사용하세요 (개당 15,000점).", "{petAdvancement} 기준을 최대로 올려 높은 점수 배율을 획득하세요."]},
      { type: "sub", text: "4일차: 영웅 성장 및 부대 훈련" },
      { type: "p", text: "점수 활동: 부대 훈련/승급 (T1~T11), {forgehammer}, {widget}, 미스릴, 자원 채집." },
      { type: "p", text: "**🛡️ F2P 중점:**" },
      { type: "list", items: ["낮은 등급 부대를 현재 최고 등급으로 승급시키세요 (예: T9를 T10으로). 신병을 처음부터 훈련하는 것보다 부대를 승급시키는 것이 자원 효율이 훨씬 좋습니다.", "일반 가속은 연구/{masters}용으로 남겨두고, 여기서는 전용 부대 훈련 가속만 사용하세요."]},
      { type: "p", text: "**⚡ P2W 중점:**" },
      { type: "list", items: ["아껴둔 {forgehammer}(개당 4,000점)와 {heroExclusiveGear}의 {widget}(개당 8,000점)을 사용하세요.", "미스릴 업그레이드(개당 40,000점)를 적용해 대량 점수 급증을 유발하세요."]},
      { type: "sub", text: "5일차: 전투력 강화 및 최종 업그레이드" },
      { type: "p", text: "점수 활동: {governorGear}, 영웅 장비, 펫 단련, 미스릴, {truegold}, 모든 가속, 정보 임무, 채집." },
      { type: "p", text: "**🛡️ F2P 중점:**" },
      { type: "list", items: ["남은 정보 임무를 클리어하고 남은 자원/가속을 사용하며, 모아둔 {satin}/{gildedThreads}로 {governorGear}를 업그레이드하세요."]},
      { type: "p", text: "**⚡ P2W 중점:**" },
      { type: "list", items: ["{governorGear}를 레전드/레전드 3성까지 밀어붙이세요 (단계당 6,250점).", "남은 미스릴, {widget}, {forgehammer}를 모두 소진해 일일 개인 랭킹 상위 2000/상위 200 보상을 확보하세요."]},
      { type: "h", text: "⚔️ 2단계: 전투 단계 (12시간)" },
      { type: "p", text: "캐슬 전투 시간: UTC 12:00 ~ UTC 22:00." },
      { type: "p", text: "목표: {kingsCastle}와 4개의 {turret} 점령." },
      { type: "h", text: "🎯 GEN 3 PVP 메타 및 집결 세팅" },
      { type: "sub", text: "🛡️ 주둔 방어 — 캐슬/포탑" },
      { type: "p", text: "**리드 영웅:** Eric (Gen 3) — 뛰어난 Gen 3 스탯과 생존 메커니즘을 가진 무너지지 않는 보병 벽. {zoe}(Gen 2)와 조합해 보호막 제공." },
      { type: "sub", text: "⚔️ 공격 집결 (캐슬/포탑 공격)" },
      { type: "p", text: "**리드 영웅:** Petra (Gen 3) — 고배율 공격 집결 {widget}을 갖춘 파괴적인 기병 리더." },
      { type: "sub", text: "🤝 집결 참가자 (F2P에게 중요!)" },
      { type: "p", text: "집결에 참가할 때 아무 영웅이나 사용하지 마세요. 다음 영웅으로 참가하세요:" },
      { type: "list", items: ["{chenko} (스킬 1 만렙)", "{amane}", "{yeonwoo}"]},
      { type: "p", text: "이 영웅들은 파괴력 배율을 중첩시킵니다." },
      { type: "h", text: "💣 더블 집결 \"고래 분쇄기\" 전략" },
      { type: "p", text: "적의 강력한 주둔군을 상대할 때:" },
      { type: "list", items: ["**집결 1 (방패/클리어):** 1~2초 먼저 출발. 순수 파괴력에 집중해 적의 부상병 치료소를 넘치게 만들고 방어 부대를 정리합니다.", "**집결 2 (메인 스트라이커):** 집결 1 바로 뒤에 도착해 남은 부대를 전멸시키고 캐슬을 점령합니다."]},
      { type: "callout", text: "{turret} 우위: 캐슬을 점령한 것과 같은 왕국이 {turret}를 점령하면 최대 +20% 부대 파괴력을 제공합니다." },
      { type: "h", text: "🩺 3단계: 야전 응급처치 (부대 회복)" },
      { type: "p", text: "기본 구조율: 부상병 치료소로 이송되지 못한 손실 부대의 30%." },
      { type: "p", text: "목표 구조율: 90%" },
      { type: "p", text: "**향상 방법:**" },
      { type: "list", items: ["{medicalSatchels}: 구조율 +10%", "{rescueOrders}: 개당 +1%, 최대 +50%"]},
      { type: "callout", text: "⚠️ **중요:** 타이머가 끝나기 전에 모두 연맹 채팅에서 {rescueOrders}를 교환해야 합니다!" }
    ]},
    de: { title: "KvK-Vorbereitungs- & Kampfguide (Gen-3-Ära)", blocks: [
      { type: "checklist", days: [1, 2, 3, 4, 5],
        rows: [
          { label: "{truegold}", icons: ["✅", "<span class=\"chk-ok\">OK</span>", "🚫", "🚫", "✅"] },
          { label: "{truegoldDust}", icons: ["<span class=\"chk-ok\">OK</span>", "✅", "🚫", "🚫", "✅"] },
          { label: "{heroShard}", icons: ["🚫", "✅", "✅", "🚫", "🚫"] },
          { label: "⏩️ {construction}", icons: ["✅", "<span class=\"chk-ok\">OK</span>", "🚫", "🚫", "✅"] },
          { label: "⏩️ {training}", icons: ["🚫", "🚫", "🚫", "✅", "✅"] },
          { label: "⏩️ {research}", icons: ["<span class=\"chk-ok\">OK</span>", "✅", "🚫", "🚫", "✅"] },
          { label: "{heroRoulette}", icons: ["🚫", "✅", "✅", "🚫", "🚫"] },
          { label: "{gathering}", icons: ["👍", "✅", "👍", "✅", "👍"] },
          { label: "{intel}", icons: ["✅", "👍", "✅", "👍", "✅"] },
          { label: "{petAdvancement}", icons: ["🚫", "🚫", "✅", "🚫", "✅"] },
          { label: "{governorCharm}", icons: ["✅", "🚫", "<span class=\"chk-ok\">OK</span>", "✅", "🚫"] },
          { label: "{governorGear}", icons: ["🚫", "🚫", "🚫", "🚫", "✅"] },
          { label: "{heroExclusiveGear} {widget}", icons: ["🚫", "🚫", "🚫", "<span class=\"chk-ok\">OK</span>", "✅"] },
          { label: "{mithril} ", icons: ["🚫", "🚫", "🚫", "<span class=\"chk-ok\">OK</span>", "✅"] },
          { label: "{forgehammer}", icons: ["🚫", "🚫", "🚫", "<span class=\"chk-ok\">OK</span>", "✅"] },
          { label: "{masterItems}", icons: ["🚫", "✅", "<span class=\"chk-ok\">OK</span>", "🚫", "🚫"] },
          { label: "{manuscript}", icons: ["🚫", "🚫", "✅", "🚫", "🚫"] },
          { label: "{masterSpeeds}", icons: ["<span class=\"chk-ok\">OK</span>", "✅", "🚫", "🚫", "<span class=\"chk-ok\">OK</span>"] }
        ],
        legend: [
          { icon: "✅", label: "{useIcon}" },
          { icon: "<span class=\"chk-ok\">OK</span>", label: "{okayIfNeeded}" },
          { icon: "🚫", label: "{dontUseIcon}" },
          { icon: "👍", label: "{needDaily}" }
        ]
      },
      { type: "h", text: "PHASE 1: VORBEREITUNGSPHASE (Tag 1–5)" },
      { type: "p", text: "Um KVK zu gewinnen, muss dein Königreich während der Vorbereitungsphase mehr Gesamtpunkte erzielen als der Gegner. Der Sieg in dieser Phase gewährt den Angreifer-Vorteil (dein Schloss ist während der Schlachtphase absolut sicher)." },
      { type: "sub", text: "Tag 1: Bau, Echtgold & Talismane" },
      { type: "p", text: "Punktebringende Aktivitäten: {truegold}-Gebäude-Upgrades, Bau-Beschleunigungen, {governorCharm}e, Geheimdienstmissionen, Master-Fähigkeiten-Beschleunigungen." },
      { type: "p", text: "**🛡️ F2P-Fokus:**" },
      { type: "list", items: ["Gib gesparte Bau-Beschleunigungen und {truegold} aus.", "Nutze {governorGear}-Talisman-Anleitungen/-Designs, die du in den Vorwochen gespart hast.", "Erledige alle Wachturm-Geheimdienstmissionen."]},
      { type: "p", text: "**⚡ P2W-Fokus:**" },
      { type: "list", items: ["Maximiere hochstufige {truegold}-Gebäude ({academy} / War Academy).", "Bringe {governorGear}-Talismane auf Stufe 8–11 für massive Punktsprünge (Stufe 11 gibt 16.000 Punkte pro Stufenaufstieg)."]},
      { type: "sub", text: "Tag 2: Forschung, Helden & Sammeln" },
      { type: "p", text: "Punktebringende Aktivitäten: Forschungs-Beschleunigungen, {truegoldDust} (Technologie), Helden-Fragmente (Selten/Episch/Mythisch), Helden-Roulette-Drehungen, Master-Embleme/Manuskripte, Ressourcensammeln." },
      { type: "p", text: "**🛡️ F2P-Fokus:**" },
      { type: "list", items: ["Drehe das Helden-Roulette mit gesparten Edelsteinen, um Petra-(Gen-3)-Fragmente zu erhalten.", "Setze gesparte universelle mythische/epische Fragmente für Kernhelden ein.", "Sammle im Voraus Ressourcen (schicke Sammler vor dem Reset los, damit sie zu Beginn von Tag 2 sofort zurückkehren)."]},
      { type: "p", text: "**⚡ P2W-Fokus:**" },
      { type: "list", items: ["Maximiere die {truegoldDust}-Forschung in der {academy}.", "Verbrauche alle gesparten Master-Embleme und Manuskripte.", "Bringe Gen-3-Helden (Eric & Petra) sofort auf 5 Sterne."]},
      { type: "sub", text: "Tag 3: Haustiertraining & Master-Fortschritt" },
      { type: "p", text: "Punktebringende Aktivitäten: {petAdvancement}, {commonTamingMarks} & {advancedTamingMarks} (Verfeinerung), Helden-Roulette, Helden-Fragmente, Master-Embleme/Manuskripte, Geheimdienstmissionen." },
      { type: "p", text: "**🛡️ F2P-Fokus:**" },
      { type: "list", items: ["Level und verfeinere mehrere mittelstufige Haustiere gleichmäßig, anstatt alles in eines zu stecken.", "Nutze übrige Helden-Roulette-Drehungen und tägliche Geheimdienstmissionen."]},
      { type: "p", text: "**⚡ P2W-Fokus:**" },
      { type: "list", items: ["Setze {advancedTamingMarks} stark ein (je 15.000 Punkte).", "Maximiere die {petAdvancement}-Schwellenwerte für hohe Punktmultiplikatoren."]},
      { type: "sub", text: "Tag 4: Heldenentwicklung & Truppentraining" },
      { type: "p", text: "Punktebringende Aktivitäten: Truppentraining/-beförderung (T1–T11), {forgehammer}, {widget}, Mithril, Ressourcensammeln." },
      { type: "p", text: "**🛡️ F2P-Fokus:**" },
      { type: "list", items: ["Befördere niedrigstufige Truppen auf deine höchste Stufe (z. B. T9 zu T10). Das Aufwerten von Truppen ist deutlich ressourceneffizienter als das Training neuer von Grund auf.", "Spare allgemeine Beschleunigungen für Forschung/Master auf — nutze hier nur spezielle Truppentrainings-Beschleunigungen."]},
      { type: "p", text: "**⚡ P2W-Fokus:**" },
      { type: "list", items: ["Verbrauche gesparte {forgehammer} (je 4.000 Punkte) und {widget} der {heroExclusiveGear} (je 8.000 Punkte).", "Wende Mithril-Upgrades an (je 40.000 Punkte), um massive Punktschübe freizuschalten."]},
      { type: "sub", text: "Tag 5: Kraftschub & finale Upgrades" },
      { type: "p", text: "Punktebringende Aktivitäten: {governorGear}, Heldenausrüstung, Haustier-Verfeinerung, Mithril, {truegold}, alle Beschleunigungen, Geheimdienstmissionen, Sammeln." },
      { type: "p", text: "**🛡️ F2P-Fokus:**" },
      { type: "list", items: ["Erledige verbliebene Geheimdienstmissionen, verbrauche übrige Ressourcen/Beschleunigungen und werte {governorGear} mit angesammeltem {satin}/{gildedThreads} auf."]},
      { type: "p", text: "**⚡ P2W-Fokus:**" },
      { type: "list", items: ["Bringe {governorGear} auf Mythisch / Mythisch 3-Sterne (6.250 Punkte pro Stufenanstieg).", "Verbrauche alles verbliebene Mithril, {widget} und {forgehammer}, um die täglichen Top-2000-/Top-200-Rangbelohnungen zu sichern."]},
      { type: "h", text: "⚔️ PHASE 2: SCHLACHTPHASE (12 STUNDEN)" },
      { type: "p", text: "Schloss-Kampffenster: 12:00 UTC bis 22:00 UTC." },
      { type: "p", text: "Ziel: Kontrolliere das {kingsCastle} und 4 {turret}." },
      { type: "h", text: "🎯 GEN-3-PVP-META & RALLY-SETUP" },
      { type: "sub", text: "🛡️ Garnisonsverteidigung — Schloss/Türme" },
      { type: "p", text: "**Anführer-Held:** Eric (Gen 3) — Unzerstörbare Infanteriewand mit überlegenen Gen-3-Werten und Überlebensmechanik. Kombiniert mit {zoe} (Gen 2) für Schilde." },
      { type: "sub", text: "⚔️ Offensive Rallys (Angriff auf Schloss/Türme)" },
      { type: "p", text: "**Anführer-Held:** Petra (Gen 3) — Verheerender Kavallerie-Anführer mit stark skalierenden offensiven Rally-{widget}." },
      { type: "sub", text: "🤝 Rally-Teilnehmer (entscheidend für F2P!)" },
      { type: "p", text: "Nutze NICHT irgendwelche Helden beim Beitritt zu Rallys. Tritt bei mit:" },
      { type: "list", items: ["{chenko} (Fähigkeit 1 maximiert)", "{amane}", "{yeonwoo}"]},
      { type: "p", text: "Diese Helden stapeln Tödlichkeits-Multiplikatoren." },
      { type: "h", text: "💣 DOPPEL-RALLY-\"WALFÄNGER\"-STRATEGIE" },
      { type: "p", text: "Für starke feindliche Garnisonen:" },
      { type: "list", items: ["**Rally 1 (Schutzschild/Räumer):** 1–2 Sekunden früher gestartet. Fokussiert reine Tödlichkeit, um das feindliche Lazarett zu überfluten und Verteidigungstruppen zu räumen.", "**Rally 2 (Hauptangreifer):** Trifft unmittelbar nach Rally 1 ein, um verbliebene Truppen auszulöschen und die Kontrolle über das Schloss zu übernehmen."]},
      { type: "callout", text: "{turret}-Vorteil: Die Einnahme von {turret} bietet bis zu +20 % Truppen-Tödlichkeit, wenn dasselbe Königreich auch das Schloss hält." },
      { type: "h", text: "🩺 PHASE 3: FELDVERSORGUNG (TRUPPENRETTUNG)" },
      { type: "p", text: "Basis-Rettungsrate: 30 % der verlorenen Truppen, die das Lazarett nicht erreicht haben." },
      { type: "p", text: "Ziel-Rettungsrate: 90 %" },
      { type: "p", text: "**So erhöhst du sie:**" },
      { type: "list", items: ["{medicalSatchels}: +10 % Rettungsrate", "{rescueOrders}: je +1 %, bis zu +50 %"]},
      { type: "callout", text: "⚠️ **WICHTIG:** Alle müssen {rescueOrders} im Allianz-Chat austauschen, bevor der Timer abläuft!" }
    ]},
    fr: { title: "Guide de Préparation et Combat KvK (Ère Gen 3)", blocks: [
      { type: "checklist", days: [1, 2, 3, 4, 5],
        rows: [
          { label: "{truegold}", icons: ["✅", "<span class=\"chk-ok\">OK</span>", "🚫", "🚫", "✅"] },
          { label: "{truegoldDust}", icons: ["<span class=\"chk-ok\">OK</span>", "✅", "🚫", "🚫", "✅"] },
          { label: "{heroShard}", icons: ["🚫", "✅", "✅", "🚫", "🚫"] },
          { label: "⏩️ {construction}", icons: ["✅", "<span class=\"chk-ok\">OK</span>", "🚫", "🚫", "✅"] },
          { label: "⏩️ {training}", icons: ["🚫", "🚫", "🚫", "✅", "✅"] },
          { label: "⏩️ {research}", icons: ["<span class=\"chk-ok\">OK</span>", "✅", "🚫", "🚫", "✅"] },
          { label: "{heroRoulette}", icons: ["🚫", "✅", "✅", "🚫", "🚫"] },
          { label: "{gathering}", icons: ["👍", "✅", "👍", "✅", "👍"] },
          { label: "{intel}", icons: ["✅", "👍", "✅", "👍", "✅"] },
          { label: "{petAdvancement}", icons: ["🚫", "🚫", "✅", "🚫", "✅"] },
          { label: "{governorCharm}", icons: ["✅", "🚫", "<span class=\"chk-ok\">OK</span>", "✅", "🚫"] },
          { label: "{governorGear}", icons: ["🚫", "🚫", "🚫", "🚫", "✅"] },
          { label: "{heroExclusiveGear} {widget}", icons: ["🚫", "🚫", "🚫", "<span class=\"chk-ok\">OK</span>", "✅"] },
          { label: "{mithril} ", icons: ["🚫", "🚫", "🚫", "<span class=\"chk-ok\">OK</span>", "✅"] },
          { label: "{forgehammer}", icons: ["🚫", "🚫", "🚫", "<span class=\"chk-ok\">OK</span>", "✅"] },
          { label: "{masterItems}", icons: ["🚫", "✅", "<span class=\"chk-ok\">OK</span>", "🚫", "🚫"] },
          { label: "{manuscript}", icons: ["🚫", "🚫", "✅", "🚫", "🚫"] },
          { label: "{masterSpeeds}", icons: ["<span class=\"chk-ok\">OK</span>", "✅", "🚫", "🚫", "<span class=\"chk-ok\">OK</span>"] }
        ],
        legend: [
          { icon: "✅", label: "{useIcon}" },
          { icon: "<span class=\"chk-ok\">OK</span>", label: "{okayIfNeeded}" },
          { icon: "🚫", label: "{dontUseIcon}" },
          { icon: "👍", label: "{needDaily}" }
        ]
      },
      { type: "h", text: "PHASE 1 : PHASE DE PRÉPARATION (Jours 1 à 5)" },
      { type: "p", text: "Pour gagner le KVK, votre Royaume doit obtenir plus de points au total durant la Phase de Préparation que votre adversaire. Gagner cette phase confère l'Avantage Attaquant (votre Château est totalement en sécurité durant la Phase de Combat)." },
      { type: "sub", text: "Jour 1 : {construction}, Or Véritable et Talismans" },
      { type: "p", text: "Activités notées : améliorations de bâtiments {truegold}, Accélérations de {construction}, {governorCharm}s, Missions de Renseignement, Accélérations de Compétence Master." },
      { type: "p", text: "**🛡️ Priorité F2P :**" },
      { type: "list", items: ["Dépensez vos Accélérations de {construction} et {truegold} économisés.", "Utilisez les Guides/Plans de Talismans {governorGear} économisés les semaines précédentes.", "Terminez toutes les Missions de Renseignement de l'Observatoire."]},
      { type: "p", text: "**⚡ Priorité P2W :**" },
      { type: "list", items: ["Maximisez les niveaux élevés de bâtiments {truegold} ({academy} / War Academy).", "Poussez les Talismans {governorGear} au niveau 8–11 pour des pics de points massifs (le niveau 11 donne 16 000 pts par palier)."]},
      { type: "sub", text: "Jour 2 : Recherche, Héros et Récolte" },
      { type: "p", text: "Activités notées : Accélérations de Recherche, {truegoldDust} (Tech), Fragments de Héros (Rare/Épique/Mythique), tours de Roulette de Héros, Emblèmes/Manuscrits Master, récolte de ressources." },
      { type: "p", text: "**🛡️ Priorité F2P :**" },
      { type: "list", items: ["Tournez la Roulette de Héros avec des Gemmes économisées pour obtenir des fragments de Petra (Gen 3).", "Investissez les fragments mythiques/épiques universels économisés dans vos héros principaux.", "Récoltez à l'avance (envoyez les récolteurs avant la réinitialisation pour qu'ils reviennent immédiatement au début du Jour 2)."]},
      { type: "p", text: "**⚡ Priorité P2W :**" },
      { type: "list", items: ["Maximisez la recherche {truegoldDust} à l'{academy}.", "Utilisez tous les Emblèmes et Manuscrits Master économisés.", "Faites passer instantanément les héros Gen 3 (Eric et Petra) à 5 étoiles."]},
      { type: "sub", text: "Jour 3 : Entraînement des Animaux et Progression Master" },
      { type: "p", text: "Activités notées : {petAdvancement}, {commonTamingMarks} et {advancedTamingMarks} (Raffinage), Roulette de Héros, Fragments de Héros, Emblèmes/Manuscrits Master, Missions de Renseignement." },
      { type: "p", text: "**🛡️ Priorité F2P :**" },
      { type: "list", items: ["Montez de niveau et raffinez plusieurs animaux de niveau intermédiaire de façon équilibrée plutôt que de tout concentrer sur un seul.", "Utilisez les tours de Roulette de Héros restants et les Missions de Renseignement quotidiennes."]},
      { type: "p", text: "**⚡ Priorité P2W :**" },
      { type: "list", items: ["Utilisez massivement les {advancedTamingMarks} (15 000 pts chacune).", "Maximisez les seuils de {petAdvancement} pour des multiplicateurs de points élevés."]},
      { type: "sub", text: "Jour 4 : Développement de Héros et Entraînement des Troupes" },
      { type: "p", text: "Activités notées : Entraînement/Promotion des Troupes (T1–T11), {forgehammer}, {widget}, Mithril, récolte de ressources." },
      { type: "p", text: "**🛡️ Priorité F2P :**" },
      { type: "list", items: ["Promouvez les troupes de niveau inférieur à votre niveau le plus élevé (ex. T9 vers T10). Améliorer des troupes est bien plus efficace en ressources que d'en entraîner de nouvelles depuis zéro.", "Gardez les accélérations générales pour la recherche/les masters — n'utilisez ici que les accélérations dédiées à l'Entraînement des Troupes."]},
      { type: "p", text: "**⚡ Priorité P2W :**" },
      { type: "list", items: ["Utilisez les {forgehammer} économisés (4 000 pts chacun) et les {widget} d'{heroExclusiveGear} (8 000 pts chacun).", "Appliquez des améliorations en Mithril (40 000 pts chacune) pour déclencher des pics de points massifs."]},
      { type: "sub", text: "Jour 5 : Boost de Puissance et Améliorations Finales" },
      { type: "p", text: "Activités notées : {governorGear}, Équipement de Héros, Raffinage des Animaux, Mithril, {truegold}, toutes Accélérations, Missions de Renseignement, Récolte." },
      { type: "p", text: "**🛡️ Priorité F2P :**" },
      { type: "list", items: ["Terminez les Missions de Renseignement restantes, utilisez les ressources/accélérations restantes, et améliorez {governorGear} avec les {satin}/{gildedThreads} accumulés."]},
      { type: "p", text: "**⚡ Priorité P2W :**" },
      { type: "list", items: ["Poussez {governorGear} au niveau Mythique / Mythique 3 étoiles (6 250 pts par palier).", "Liquidez tout le Mithril, les {widget} et les {forgehammer} restants pour sécuriser les récompenses du classement personnel Top 2000 / Top 200 quotidien."]},
      { type: "h", text: "⚔️ PHASE 2 : PHASE DE COMBAT (12 HEURES)" },
      { type: "p", text: "Fenêtre de Combat du Château : 12h00 UTC à 22h00 UTC." },
      { type: "p", text: "Objectif : Contrôler le {kingsCastle} et 4 {turret}." },
      { type: "h", text: "🎯 META PVP GEN 3 ET CONFIGURATION DE RASSEMBLEMENT" },
      { type: "sub", text: "🛡️ Défense de Garnison — Château/Tourelles" },
      { type: "p", text: "**Héros Leader :** Eric (Gen 3) — Mur d'infanterie incassable avec des statistiques Gen 3 supérieures et des mécanismes de survie. Associé à {zoe} (Gen 2) pour les boucliers." },
      { type: "sub", text: "⚔️ Rassemblements Offensifs (Attaque du Château/Tourelles)" },
      { type: "p", text: "**Héros Leader :** Petra (Gen 3) — Leader de Cavalerie dévastateur avec des {widget} de rassemblement offensif à forte montée en puissance." },
      { type: "sub", text: "🤝 Participants au Rassemblement (Crucial pour les F2P !)" },
      { type: "p", text: "N'utilisez PAS de héros au hasard en rejoignant les rassemblements. Rejoignez avec :" },
      { type: "list", items: ["{chenko} (Compétence 1 maximisée)", "{amane}", "{yeonwoo}"]},
      { type: "p", text: "Ces héros cumulent les multiplicateurs de létalité." },
      { type: "h", text: "💣 STRATÉGIE DU DOUBLE RASSEMBLEMENT « BROYEUR DE BALEINES »" },
      { type: "p", text: "Contre de fortes garnisons ennemies :" },
      { type: "list", items: ["**Rassemblement 1 (Bouclier Humain / Nettoyeur) :** Lancé 1 à 2 secondes en avance. Se concentre sur la létalité pure pour saturer l'infirmerie ennemie et éliminer les troupes défensives.", "**Rassemblement 2 (Frappeur Principal) :** Arrive juste après le Rassemblement 1 pour éliminer les troupes restantes et prendre le contrôle du Château."]},
      { type: "callout", text: "Avantage {turret} : Capturer des {turret} offre jusqu'à +20 % de Létalité d'Escouade si détenues par le même royaume que celui qui tient le Château." },
      { type: "h", text: "🩺 PHASE 3 : TRIAGE SUR LE TERRAIN (RÉCUPÉRATION DES TROUPES)" },
      { type: "p", text: "Taux de Secours de Base : 30 % des troupes perdues n'ayant pas atteint l'infirmerie." },
      { type: "p", text: "Taux de Secours Cible : 90 %" },
      { type: "p", text: "**Comment l'augmenter :**" },
      { type: "list", items: ["{medicalSatchels} : +10 % de Taux de Secours", "{rescueOrders} : +1 % chacun, jusqu'à +50 %"]},
      { type: "callout", text: "⚠️ **IMPORTANT :** Tout le monde doit échanger des {rescueOrders} dans le chat d'alliance avant l'expiration du minuteur !" }
    ]},
    pt: { title: "Guia de Preparação e Batalha KvK (Era Gen 3)", blocks: [
      { type: "checklist", days: [1, 2, 3, 4, 5],
        rows: [
          { label: "{truegold}", icons: ["✅", "<span class=\"chk-ok\">OK</span>", "🚫", "🚫", "✅"] },
          { label: "{truegoldDust}", icons: ["<span class=\"chk-ok\">OK</span>", "✅", "🚫", "🚫", "✅"] },
          { label: "{heroShard}", icons: ["🚫", "✅", "✅", "🚫", "🚫"] },
          { label: "⏩️ {construction}", icons: ["✅", "<span class=\"chk-ok\">OK</span>", "🚫", "🚫", "✅"] },
          { label: "⏩️ {training}", icons: ["🚫", "🚫", "🚫", "✅", "✅"] },
          { label: "⏩️ {research}", icons: ["<span class=\"chk-ok\">OK</span>", "✅", "🚫", "🚫", "✅"] },
          { label: "{heroRoulette}", icons: ["🚫", "✅", "✅", "🚫", "🚫"] },
          { label: "{gathering}", icons: ["👍", "✅", "👍", "✅", "👍"] },
          { label: "{intel}", icons: ["✅", "👍", "✅", "👍", "✅"] },
          { label: "{petAdvancement}", icons: ["🚫", "🚫", "✅", "🚫", "✅"] },
          { label: "{governorCharm}", icons: ["✅", "🚫", "<span class=\"chk-ok\">OK</span>", "✅", "🚫"] },
          { label: "{governorGear}", icons: ["🚫", "🚫", "🚫", "🚫", "✅"] },
          { label: "{heroExclusiveGear} {widget}", icons: ["🚫", "🚫", "🚫", "<span class=\"chk-ok\">OK</span>", "✅"] },
          { label: "{mithril} ", icons: ["🚫", "🚫", "🚫", "<span class=\"chk-ok\">OK</span>", "✅"] },
          { label: "{forgehammer}", icons: ["🚫", "🚫", "🚫", "<span class=\"chk-ok\">OK</span>", "✅"] },
          { label: "{masterItems}", icons: ["🚫", "✅", "<span class=\"chk-ok\">OK</span>", "🚫", "🚫"] },
          { label: "{manuscript}", icons: ["🚫", "🚫", "✅", "🚫", "🚫"] },
          { label: "{masterSpeeds}", icons: ["<span class=\"chk-ok\">OK</span>", "✅", "🚫", "🚫", "<span class=\"chk-ok\">OK</span>"] }
        ],
        legend: [
          { icon: "✅", label: "{useIcon}" },
          { icon: "<span class=\"chk-ok\">OK</span>", label: "{okayIfNeeded}" },
          { icon: "🚫", label: "{dontUseIcon}" },
          { icon: "👍", label: "{needDaily}" }
        ]
      },
      { type: "h", text: "FASE 1: FASE DE PREPARAÇÃO (Dias 1–5)" },
      { type: "p", text: "Para vencer o KVK, seu Reino deve conquistar mais pontos totais durante a Fase de Preparação do que o oponente. Vencer essa fase concede a Vantagem de Atacante (seu Castelo fica totalmente seguro durante a Fase de Batalha)." },
      { type: "sub", text: "Dia 1: Construção, {truegold} e Amuletos" },
      { type: "p", text: "Atividades que pontuam: melhorias de construção com {truegold}, Velocidades de Construção, {governorCharm}s, Missões de Inteligência, Velocidades de Habilidade Master." },
      { type: "p", text: "**🛡️ Foco F2P:**" },
      { type: "list", items: ["Gaste Velocidades de Construção e {truegold} guardados.", "Use Guias/Designs de Amuleto {governorGear} guardados de semanas anteriores.", "Complete todas as Missões de Inteligência da Torre de Vigia."]},
      { type: "p", text: "**⚡ Foco P2W:**" },
      { type: "list", items: ["Maximize os níveis altos de construções de {truegold} ({academy} / War Academy).", "Leve os Amuletos {governorGear} ao Nível 8–11 para picos massivos de pontos (Nível 11 dá 16.000 pts por nível)."]},
      { type: "sub", text: "Dia 2: Pesquisa, Heróis e Coleta" },
      { type: "p", text: "Atividades que pontuam: Velocidades de Pesquisa, {truegoldDust} (Tecnologia), Fragmentos de Herói (Raro/Épico/Mítico), giros na Roleta de Herói, Emblemas/Manuscritos Master, Coleta de Recursos." },
      { type: "p", text: "**🛡️ Foco F2P:**" },
      { type: "list", items: ["Gire a Roleta de Herói usando Gemas guardadas para obter fragmentos de Petra (Gen 3).", "Invista fragmentos míticos/épicos universais guardados nos heróis principais.", "Colete recursos com antecedência (envie coletores antes da reinicialização para que retornem imediatamente no início do Dia 2)."]},
      { type: "p", text: "**⚡ Foco P2W:**" },
      { type: "list", items: ["Maximize a pesquisa de {truegoldDust} na {academy}.", "Use todos os Emblemas e Manuscritos Master guardados.", "Suba os heróis Gen 3 (Eric e Petra) para 5 estrelas instantaneamente."]},
      { type: "sub", text: "Dia 3: Treinamento de Pets e Progressão Master" },
      { type: "p", text: "Atividades que pontuam: {petAdvancement}, {commonTamingMarks} e {advancedTamingMarks} (Refinamento), Roleta de Herói, Fragmentos de Herói, Emblemas/Manuscritos Master, Missões de Inteligência." },
      { type: "p", text: "**🛡️ Foco F2P:**" },
      { type: "list", items: ["Suba de nível e refine vários pets de nível médio de forma equilibrada, em vez de investir tudo em um só.", "Use os giros restantes da Roleta de Herói e as Missões de Inteligência diárias."]},
      { type: "p", text: "**⚡ Foco P2W:**" },
      { type: "list", items: ["Use bastante {advancedTamingMarks} (15.000 pts cada).", "Maximize os limites de {petAdvancement} para multiplicadores de pontos altos."]},
      { type: "sub", text: "Dia 4: Desenvolvimento de Herói e Treinamento de Tropas" },
      { type: "p", text: "Atividades que pontuam: Treinamento/Promoção de Tropas (T1–T11), {forgehammer}, {widget}, Mithril, Coleta de Recursos." },
      { type: "p", text: "**🛡️ Foco F2P:**" },
      { type: "list", items: ["Promova tropas de nível inferior para o seu nível mais alto (ex.: T9 para T10). Melhorar tropas é muito mais eficiente em recursos do que treinar novas do zero.", "Guarde velocidades gerais para pesquisa/masters — use aqui apenas velocidades dedicadas de Treinamento de Tropas."]},
      { type: "p", text: "**⚡ Foco P2W:**" },
      { type: "list", items: ["Use os {forgehammer} guardados (4.000 pts cada) e os {widget} de {heroExclusiveGear} (8.000 pts cada).", "Aplique melhorias com Mithril (40.000 pts cada) para desbloquear grandes picos de pontos."]},
      { type: "sub", text: "Dia 5: Aumento de Poder e Melhorias Finais" },
      { type: "p", text: "Atividades que pontuam: {governorGear}, Equipamento de Herói, Refinamento de Pets, Mithril, {truegold}, todas as Velocidades, Missões de Inteligência, Coleta." },
      { type: "p", text: "**🛡️ Foco F2P:**" },
      { type: "list", items: ["Complete as Missões de Inteligência restantes, use os recursos/velocidades restantes, e melhore {governorGear} usando {satin}/{gildedThreads} acumulados."]},
      { type: "p", text: "**⚡ Foco P2W:**" },
      { type: "list", items: ["Leve {governorGear} até Mítico / Mítico 3 Estrelas (6.250 pts por nível).", "Liquide todo o Mithril, {widget} e {forgehammer} restantes para garantir as recompensas diárias do ranking pessoal Top 2000 / Top 200."]},
      { type: "h", text: "⚔️ FASE 2: FASE DE BATALHA (12 HORAS)" },
      { type: "p", text: "Janela de Batalha do Castelo: 12h00 UTC às 22h00 UTC." },
      { type: "p", text: "Objetivo: Controlar o {kingsCastle} e 4 {turret}." },
      { type: "h", text: "🎯 META PVP GEN 3 E CONFIGURAÇÃO DE ARREGIMENTAÇÃO" },
      { type: "sub", text: "🛡️ Defesa de Guarnição — Castelo/Torres" },
      { type: "p", text: "**Herói Líder:** Eric (Gen 3) — Muro de infantaria inquebrável com estatísticas Gen 3 superiores e mecânicas de sobrevivência. Combinado com {zoe} (Gen 2) para escudos." },
      { type: "sub", text: "⚔️ Arregimentações Ofensivas (Atacando Castelo/Torres)" },
      { type: "p", text: "**Herói Líder:** Petra (Gen 3) — Líder de Cavalaria devastador com {widget} de arregimentação ofensiva de alto escalonamento." },
      { type: "sub", text: "🤝 Participantes de Arregimentação (Crucial para F2P!)" },
      { type: "p", text: "NÃO use heróis aleatórios ao entrar em arregimentações. Entre com:" },
      { type: "list", items: ["{chenko} (Habilidade 1 no máximo)", "{amane}", "{yeonwoo}"]},
      { type: "p", text: "Esses heróis acumulam multiplicadores de Letalidade." },
      { type: "h", text: "💣 ESTRATÉGIA DE ARREGIMENTAÇÃO DUPLA \"ESMAGA-BALEIAS\"" },
      { type: "p", text: "Para guarnições inimigas fortes:" },
      { type: "list", items: ["**Arregimentação 1 (Escudo Humano / Limpeza):** Lançada 1–2 segundos antes. Foca em letalidade pura para lotar a Enfermaria inimiga e eliminar tropas defensoras.", "**Arregimentação 2 (Atacante Principal):** Chega logo atrás da Arregimentação 1 para eliminar as tropas restantes e assumir o controle do Castelo."]},
      { type: "callout", text: "Vantagem {turret}: Capturar {turret} concede até +20% de Letalidade de Esquadrão se controlada pelo mesmo reino que detém o Castelo." },
      { type: "h", text: "🩺 FASE 3: TRIAGEM DE CAMPO (RECUPERAÇÃO DE TROPAS)" },
      { type: "p", text: "Taxa de Resgate Base: 30% das tropas perdidas que não chegaram à Enfermaria." },
      { type: "p", text: "Taxa de Resgate Alvo: 90%" },
      { type: "p", text: "**Como aumentar:**" },
      { type: "list", items: ["{medicalSatchels}: +10% de Taxa de Resgate", "{rescueOrders}: +1% cada, até +50%"]},
      { type: "callout", text: "⚠️ **IMPORTANTE:** Todos devem trocar {rescueOrders} no chat da aliança antes que o cronômetro expire!" }
    ]},
    es: { title: "Guía de Preparación y Batalla KvK (Era Gen 3)", blocks: [
      { type: "checklist", days: [1, 2, 3, 4, 5],
        rows: [
          { label: "{truegold}", icons: ["✅", "<span class=\"chk-ok\">OK</span>", "🚫", "🚫", "✅"] },
          { label: "{truegoldDust}", icons: ["<span class=\"chk-ok\">OK</span>", "✅", "🚫", "🚫", "✅"] },
          { label: "{heroShard}", icons: ["🚫", "✅", "✅", "🚫", "🚫"] },
          { label: "⏩️ {construction}", icons: ["✅", "<span class=\"chk-ok\">OK</span>", "🚫", "🚫", "✅"] },
          { label: "⏩️ {training}", icons: ["🚫", "🚫", "🚫", "✅", "✅"] },
          { label: "⏩️ {research}", icons: ["<span class=\"chk-ok\">OK</span>", "✅", "🚫", "🚫", "✅"] },
          { label: "{heroRoulette}", icons: ["🚫", "✅", "✅", "🚫", "🚫"] },
          { label: "{gathering}", icons: ["👍", "✅", "👍", "✅", "👍"] },
          { label: "{intel}", icons: ["✅", "👍", "✅", "👍", "✅"] },
          { label: "{petAdvancement}", icons: ["🚫", "🚫", "✅", "🚫", "✅"] },
          { label: "{governorCharm}", icons: ["✅", "🚫", "<span class=\"chk-ok\">OK</span>", "✅", "🚫"] },
          { label: "{governorGear}", icons: ["🚫", "🚫", "🚫", "🚫", "✅"] },
          { label: "{heroExclusiveGear} {widget}", icons: ["🚫", "🚫", "🚫", "<span class=\"chk-ok\">OK</span>", "✅"] },
          { label: "{mithril} ", icons: ["🚫", "🚫", "🚫", "<span class=\"chk-ok\">OK</span>", "✅"] },
          { label: "{forgehammer}", icons: ["🚫", "🚫", "🚫", "<span class=\"chk-ok\">OK</span>", "✅"] },
          { label: "{masterItems}", icons: ["🚫", "✅", "<span class=\"chk-ok\">OK</span>", "🚫", "🚫"] },
          { label: "{manuscript}", icons: ["🚫", "🚫", "✅", "🚫", "🚫"] },
          { label: "{masterSpeeds}", icons: ["<span class=\"chk-ok\">OK</span>", "✅", "🚫", "🚫", "<span class=\"chk-ok\">OK</span>"] }
        ],
        legend: [
          { icon: "✅", label: "{useIcon}" },
          { icon: "<span class=\"chk-ok\">OK</span>", label: "{okayIfNeeded}" },
          { icon: "🚫", label: "{dontUseIcon}" },
          { icon: "👍", label: "{needDaily}" }
        ]
      },
      { type: "h", text: "FASE 1: FASE DE PREPARACIÓN (Días 1–5)" },
      { type: "p", text: "Para ganar el KvK, tu Reino debe obtener más puntos totales durante la Fase de Preparación que el oponente. Ganar esta fase otorga Ventaja de Atacante (tu Castillo está completamente a salvo durante la Fase de Batalla)." },
      { type: "sub", text: "Día 1: Construcción, Oro Verdadero y Amuletos" },
      { type: "p", text: "Actividades que puntúan: mejoras de edificios con {truegold}, Aceleradores de Construcción, {governorCharm}, Misiones de Inteligencia, Aceleradores de Habilidad de Maestro." },
      { type: "p", text: "**🛡️ Enfoque F2P:**" },
      { type: "list", items: ["Gasta los Aceleradores de Construcción y {truegold} guardados.", "Usa las Guías/Diseños de Amuleto de {governorGear} guardados de semanas anteriores.", "Vacía todas las Misiones de Inteligencia de la Atalaya."]},
      { type: "p", text: "**⚡ Enfoque P2W:**" },
      { type: "list", items: ["Maximiza los niveles de edificios de {truegold} de alto nivel ({academy} / Academia de Guerra).", "Sube los Amuletos de {governorGear} a Nivel 8–11 para picos masivos de puntos (el Nivel 11 da 16,000 pts por subida de nivel)."]},
      { type: "sub", text: "Día 2: Investigación, Héroes y Recolección" },
      { type: "p", text: "Actividades que puntúan: Aceleradores de Investigación, {truegoldDust} (Tecnología), Fragmentos de Héroe (Raro/Épico/Mítico), tiradas de {heroRoulette}, Emblemas de Maestro/{manuscript}, Recolección de Recursos." },
      { type: "p", text: "**🛡️ Enfoque F2P:**" },
      { type: "list", items: ["Gira la {heroRoulette} usando Gemas guardadas para obtener fragmentos de Petra (Gen 3).", "Invierte los fragmentos Míticos/Épicos universales guardados en héroes clave.", "Recolecta con antelación (envía a los recolectores antes del reinicio para que regresen de inmediato al comenzar el Día 2)."]},
      { type: "p", text: "**⚡ Enfoque P2W:**" },
      { type: "list", items: ["Maximiza la investigación de {truegoldDust} en la {academy}.", "Usa todos los Emblemas de Maestro y {manuscript} guardados.", "Sube instantáneamente a los héroes Gen 3 (Eric y Petra) a 5 estrellas."]},
      { type: "sub", text: "Día 3: Entrenamiento de Mascotas y Progreso de Maestro" },
      { type: "p", text: "Actividades que puntúan: {petAdvancement}, {commonTamingMarks} y {advancedTamingMarks} (Refinamiento), {heroRoulette}, Fragmentos de Héroe, Emblemas de Maestro/{manuscript}, Misiones de Inteligencia." },
      { type: "p", text: "**🛡️ Enfoque F2P:**" },
      { type: "list", items: ["Sube de nivel y refina varias mascotas de nivel medio de forma equilibrada, en lugar de invertir todo en una sola.", "Usa las tiradas de {heroRoulette} restantes y las Misiones de Inteligencia diarias."]},
      { type: "p", text: "**⚡ Enfoque P2W:**" },
      { type: "list", items: ["Uso intensivo de {advancedTamingMarks} (15,000 pts cada uno).", "Maximiza los umbrales de {petAdvancement} para obtener multiplicadores de puntos altos."]},
      { type: "sub", text: "Día 4: Desarrollo de Héroes y Entrenamiento de Tropas" },
      { type: "p", text: "Actividades que puntúan: Entrenamiento/Ascensos de Tropas (T1–T11), {forgehammer}, {widget}, Mitrilo, Recolección de Recursos." },
      { type: "p", text: "**🛡️ Enfoque F2P:**" },
      { type: "list", items: ["Asciende las tropas de nivel inferior a tu nivel más alto (por ejemplo, de T9 a T10). Mejorar tropas es mucho más eficiente en recursos que entrenar nuevas desde cero.", "Guarda los aceleradores generales para investigación/maestros — usa aquí solo aceleradores dedicados de Entrenamiento de Tropas."]},
      { type: "p", text: "**⚡ Enfoque P2W:**" },
      { type: "list", items: ["Usa los {forgehammer} guardados (4,000 pts cada uno) y los {widget} de {heroExclusiveGear} (8,000 pts cada uno).", "Aplica mejoras de Mitrilo (40,000 pts cada una) para desbloquear grandes picos de puntos."]},
      { type: "sub", text: "Día 5: Impulso de Poder y Mejoras Finales" },
      { type: "p", text: "Actividades que puntúan: {governorGear}, Equipo de Héroe, Refinamiento de Mascotas, Mitrilo, {truegold}, Todos los aceleradores, Misiones de Inteligencia, Recolección." },
      { type: "p", text: "**🛡️ Enfoque F2P:**" },
      { type: "list", items: ["Vacía las Misiones de Inteligencia restantes, gasta los recursos/aceleradores sobrantes, y mejora {governorGear} usando {satin}/{gildedThreads} acumulados."]},
      { type: "p", text: "**⚡ Enfoque P2W:**" },
      { type: "list", items: ["Sube {governorGear} a Mítico / Mítico 3 Estrellas (6,250 pts por cada subida de nivel).", "Liquida todo el Mitrilo, {widget} y {forgehammer} restantes para asegurar las recompensas del ranking personal diario Top 2000 / Top 200."]},
      { type: "h", text: "⚔️ FASE 2: FASE DE BATALLA (12 HORAS)" },
      { type: "p", text: "Ventana de Batalla del Castillo: 12:00 UTC a 22:00 UTC." },
      { type: "p", text: "Objetivo: Controlar el {kingsCastle} y 4 {turret}." },
      { type: "h", text: "🎯 META PVP GEN 3 Y CONFIGURACIÓN DE ATAQUES CONJUNTOS" },
      { type: "sub", text: "🛡️ Defensa de Guarnición — Castillo/Torretas" },
      { type: "p", text: "**Héroe líder:** Eric (Gen 3) — Muralla de infantería inquebrantable con estadísticas Gen 3 superiores y mecánicas de supervivencia. Combinado con {zoe} (Gen 2) para escudos." },
      { type: "sub", text: "⚔️ Ataques Conjuntos Ofensivos (Atacando Castillo/Torretas)" },
      { type: "p", text: "**Héroe líder:** Petra (Gen 3) — Comandante de caballería devastador con {widget} de Ataque Conjunto ofensivo de alta escala." },
      { type: "sub", text: "🤝 Participantes de Ataque Conjunto (¡Crucial para F2P!)" },
      { type: "p", text: "NO uses héroes al azar al unirte a Ataques Conjuntos. Únete con:" },
      { type: "list", items: ["{chenko} (Habilidad 1 al máximo)", "{amane}", "{yeonwoo}"]},
      { type: "p", text: "Estos héroes acumulan multiplicadores de Letalidad." },
      { type: "h", text: "💣 ESTRATEGIA DE DOBLE ATAQUE CONJUNTO \"ROMPE-BALLENAS\"" },
      { type: "p", text: "Para guarniciones enemigas fuertes:" },
      { type: "list", items: ["**Ataque Conjunto 1 (Escudo de Carne / Limpiadora):** Se lanza 1–2 segundos antes. Se enfoca en pura letalidad para desbordar la Enfermería enemiga y eliminar las tropas defensoras.", "**Ataque Conjunto 2 (Atacante Principal):** Llega justo después del Ataque Conjunto 1 para eliminar las tropas restantes y tomar el control del Castillo."]},
      { type: "callout", text: "Ventaja de {turret}: capturar {turret} otorga hasta +20% de Letalidad de Escuadrón si es mantenida por el mismo reino que posee el Castillo." },
      { type: "h", text: "🩺 FASE 3: TRIAJE DE CAMPO (RECUPERACIÓN DE TROPAS)" },
      { type: "p", text: "Tasa de Rescate Base: 30% de las tropas perdidas que no llegaron a la Enfermería." },
      { type: "p", text: "Tasa de Rescate Objetivo: 90%" },
      { type: "p", text: "**Cómo aumentarla:**" },
      { type: "list", items: ["{medicalSatchels}: +10% Tasa de Rescate", "{rescueOrders}: +1% cada uno, hasta +50%"]},
      { type: "callout", text: "⚠️ **IMPORTANTE:** ¡Todos deben intercambiar {rescueOrders} en el chat de alianza antes de que expire el temporizador!" }
    ]},
    tr: { title: "KvK Hazırlık ve Savaş Rehberi (Gen 3 Dönemi)", blocks: [
      { type: "checklist", days: [1, 2, 3, 4, 5],
        rows: [
          { label: "{truegold}", icons: ["✅", "<span class=\"chk-ok\">OK</span>", "🚫", "🚫", "✅"] },
          { label: "{truegoldDust}", icons: ["<span class=\"chk-ok\">OK</span>", "✅", "🚫", "🚫", "✅"] },
          { label: "{heroShard}", icons: ["🚫", "✅", "✅", "🚫", "🚫"] },
          { label: "⏩️ {construction}", icons: ["✅", "<span class=\"chk-ok\">OK</span>", "🚫", "🚫", "✅"] },
          { label: "⏩️ {training}", icons: ["🚫", "🚫", "🚫", "✅", "✅"] },
          { label: "⏩️ {research}", icons: ["<span class=\"chk-ok\">OK</span>", "✅", "🚫", "🚫", "✅"] },
          { label: "{heroRoulette}", icons: ["🚫", "✅", "✅", "🚫", "🚫"] },
          { label: "{gathering}", icons: ["👍", "✅", "👍", "✅", "👍"] },
          { label: "{intel}", icons: ["✅", "👍", "✅", "👍", "✅"] },
          { label: "{petAdvancement}", icons: ["🚫", "🚫", "✅", "🚫", "✅"] },
          { label: "{governorCharm}", icons: ["✅", "🚫", "<span class=\"chk-ok\">OK</span>", "✅", "🚫"] },
          { label: "{governorGear}", icons: ["🚫", "🚫", "🚫", "🚫", "✅"] },
          { label: "{heroExclusiveGear} {widget}", icons: ["🚫", "🚫", "🚫", "<span class=\"chk-ok\">OK</span>", "✅"] },
          { label: "{mithril} ", icons: ["🚫", "🚫", "🚫", "<span class=\"chk-ok\">OK</span>", "✅"] },
          { label: "{forgehammer}", icons: ["🚫", "🚫", "🚫", "<span class=\"chk-ok\">OK</span>", "✅"] },
          { label: "{masterItems}", icons: ["🚫", "✅", "<span class=\"chk-ok\">OK</span>", "🚫", "🚫"] },
          { label: "{manuscript}", icons: ["🚫", "🚫", "✅", "🚫", "🚫"] },
          { label: "{masterSpeeds}", icons: ["<span class=\"chk-ok\">OK</span>", "✅", "🚫", "🚫", "<span class=\"chk-ok\">OK</span>"] }
        ],
        legend: [
          { icon: "✅", label: "{useIcon}" },
          { icon: "<span class=\"chk-ok\">OK</span>", label: "{okayIfNeeded}" },
          { icon: "🚫", label: "{dontUseIcon}" },
          { icon: "👍", label: "{needDaily}" }
        ]
      },
      { type: "h", text: "1. AŞAMA: HAZIRLIK AŞAMASI (1–5. Gün)" },
      { type: "p", text: "KVK'yı kazanmak için Krallığınızın Hazırlık Aşaması'nda rakibinizden daha fazla toplam puan kazanması gerekir. Bu aşamayı kazanmak Saldırgan Avantajı sağlar (Savaş Aşaması boyunca Şatonuz tamamen güvende olur)." },
      { type: "sub", text: "1. Gün: İnşaat, {truegold} ve Tılsımlar" },
      { type: "p", text: "Puan Kazandıran Aktiviteler: {truegold} bina yükseltmeleri, İnşaat Hızlandırmaları, {governorCharm}ları, İstihbarat Görevleri, Master Yeteneği Hızlandırmaları." },
      { type: "p", text: "**🛡️ F2P Odağı:**" },
      { type: "list", items: ["Biriktirdiğiniz İnşaat Hızlandırmalarını ve {truegold}'ı harcayın.", "Önceki haftalardan biriktirdiğiniz {governorGear} Tılsım Rehberi/Tasarımlarını kullanın.", "Tüm Bekçi Kulesi İstihbarat Görevlerini tamamlayın."]},
      { type: "p", text: "**⚡ P2W Odağı:**" },
      { type: "list", items: ["Yüksek seviye {truegold} binalarını ({academy} / War Academy) maksimuma çıkarın.", "Büyük puan artışları için {governorGear} Tılsımlarını 8–11 seviyeye çıkarın (Seviye 11, seviye başına 16.000 puan verir)."]},
      { type: "sub", text: "2. Gün: Araştırma, Kahramanlar ve Toplama" },
      { type: "p", text: "Puan Kazandıran Aktiviteler: Araştırma Hızlandırmaları, {truegoldDust} (Teknoloji), Kahraman Parçaları (Ender/Epik/Mitik), Kahraman Ruleti çevirmeleri, Master Nişanları/El Yazmaları, Kaynak Toplama." },
      { type: "p", text: "**🛡️ F2P Odağı:**" },
      { type: "list", items: ["Petra (Gen 3) parçaları kazanmak için biriktirdiğiniz Elmaslarla Kahraman Ruleti'ni çevirin.", "Biriktirdiğiniz evrensel Mitik/Epik parçaları ana kahramanlarınıza harcayın.", "Kaynakları önceden toplayın (2. Gün başlangıcında hemen dönmeleri için toplayıcıları sıfırlamadan önce gönderin)."]},
      { type: "p", text: "**⚡ P2W Odağı:**" },
      { type: "list", items: ["{academy}'deki {truegoldDust} araştırmasını maksimuma çıkarın.", "Biriktirdiğiniz tüm Master Nişanlarını ve El Yazmalarını harcayın.", "Gen 3 kahramanlarını (Eric ve Petra) anında 5 yıldıza çıkarın."]},
      { type: "sub", text: "3. Gün: Evcil Hayvan Eğitimi ve Master İlerlemesi" },
      { type: "p", text: "Puan Kazandıran Aktiviteler: {petAdvancement}, {commonTamingMarks} ve {advancedTamingMarks} (İyileştirme), Kahraman Ruleti, Kahraman Parçaları, Master Nişanları/El Yazmaları, İstihbarat Görevleri." },
      { type: "p", text: "**🛡️ F2P Odağı:**" },
      { type: "list", items: ["Her şeyi tek bir evcil hayvana yatırmak yerine birden fazla orta seviye evcil hayvanı dengeli şekilde seviye atlatın ve iyileştirin.", "Kalan Kahraman Ruleti çevirmelerini ve günlük İstihbarat Görevlerini kullanın."]},
      { type: "p", text: "**⚡ P2W Odağı:**" },
      { type: "list", items: ["{advancedTamingMarks}'ı yoğun şekilde kullanın (her biri 15.000 puan).", "Yüksek puan çarpanları için {petAdvancement} eşiklerini maksimuma çıkarın."]},
      { type: "sub", text: "4. Gün: Kahraman Gelişimi ve Asker Eğitimi" },
      { type: "p", text: "Puan Kazandıran Aktiviteler: Asker Eğitimi/Terfileri (T1–T11), {forgehammer}, {widget}, Mithril, Kaynak Toplama." },
      { type: "p", text: "**🛡️ F2P Odağı:**" },
      { type: "list", items: ["Düşük seviyeli askerleri en yüksek seviyenize terfi ettirin (örn. T9'dan T10'a). Askerleri yükseltmek, sıfırdan yenilerini eğitmekten çok daha kaynak verimlidir.", "Genel hızlandırmaları araştırma/masterlar için saklayın — burada yalnızca özel Asker Eğitimi hızlandırmalarını kullanın."]},
      { type: "p", text: "**⚡ P2W Odağı:**" },
      { type: "list", items: ["Biriktirdiğiniz {forgehammer}'ları (her biri 4.000 puan) ve {heroExclusiveGear}'ın {widget}'larını (her biri 8.000 puan) harcayın.", "Büyük puan artışlarının kilidini açmak için Mithril yükseltmeleri (her biri 40.000 puan) uygulayın."]},
      { type: "sub", text: "5. Gün: Güç Artışı ve Son Yükseltmeler" },
      { type: "p", text: "Puan Kazandıran Aktiviteler: {governorGear}, Kahraman Donanımı, Evcil Hayvan İyileştirme, Mithril, {truegold}, Tüm Hızlandırmalar, İstihbarat Görevleri, Toplama." },
      { type: "p", text: "**🛡️ F2P Odağı:**" },
      { type: "list", items: ["Kalan İstihbarat Görevlerini tamamlayın, kalan kaynakları/hızlandırmaları harcayın ve biriken {satin}/{gildedThreads} kullanarak {governorGear}'ı yükseltin."]},
      { type: "p", text: "**⚡ P2W Odağı:**" },
      { type: "list", items: ["{governorGear}'ı Mitik / Mitik 3 Yıldız'a çıkarın (seviye başına 6.250 puan).", "Günlük Top 2000 / Top 200 kişisel sıralama ödüllerini garantilemek için kalan tüm Mithril, {widget} ve {forgehammer}'ları tüketin."]},
      { type: "h", text: "⚔️ 2. AŞAMA: SAVAŞ AŞAMASI (12 SAAT)" },
      { type: "p", text: "Şato Savaş Penceresi: 12:00 UTC – 22:00 UTC." },
      { type: "p", text: "Hedef: {kingsCastle} ve 4 {turret}'ı kontrol edin." },
      { type: "h", text: "🎯 GEN 3 PVP META VE İNTİKAL KURULUMU" },
      { type: "sub", text: "🛡️ Garnizon Savunması — Şato/Kuleler" },
      { type: "p", text: "**Lider Kahraman:** Eric (Gen 3) — Üstün Gen 3 istatistiklerine ve hayatta kalma mekaniklerine sahip yıkılmaz piyade duvarı. Kalkan için {zoe} (Gen 2) ile eşleştirilir." },
      { type: "sub", text: "⚔️ Saldırı İntikalleri (Şato/Kulelere Saldırı)" },
      { type: "p", text: "**Lider Kahraman:** Petra (Gen 3) — Yüksek ölçekli saldırı intikal {widget}'larına sahip yıkıcı Süvari lideri." },
      { type: "sub", text: "🤝 İntikale Katılanlar (F2P İçin Çok Önemli!)" },
      { type: "p", text: "İntikale katılırken rastgele kahraman KULLANMAYIN. Şunlarla katılın:" },
      { type: "list", items: ["{chenko} (1. Yetenek maksimum)", "{amane}", "{yeonwoo}"]},
      { type: "p", text: "Bu kahramanlar Öldürücülük çarpanlarını üst üste bindirir." },
      { type: "h", text: "💣 ÇİFT İNTİKAL \"BALİNA EZİCİ\" STRATEJİSİ" },
      { type: "p", text: "Ağır düşman garnizonları için:" },
      { type: "list", items: ["**İntikal 1 (Et Kalkanı / Temizleyici):** 1–2 saniye önce başlatılır. Düşmanın Revirini taşırmak ve savunma askerlerini temizlemek için saf öldürücülüğe odaklanır.", "**İntikal 2 (Ana Vurucu):** İntikal 1'in hemen ardından gelerek kalan askerleri yok eder ve Şato'nun kontrolünü ele geçirir."]},
      { type: "callout", text: "{turret} Avantajı: Şato'yu elinde tutan aynı krallık tarafından tutuluyorsa, {turret}'ları ele geçirmek %20'ye kadar Birlik Öldürücülüğü sağlar." },
      { type: "h", text: "🩺 3. AŞAMA: SAHA TRİYAJI (ASKER KURTARMA)" },
      { type: "p", text: "Temel Kurtarma Oranı: Revire ulaşamayan kayıp askerlerin %30'u." },
      { type: "p", text: "Hedef Kurtarma Oranı: %90" },
      { type: "p", text: "**Nasıl artırılır:**" },
      { type: "list", items: ["{medicalSatchels}: +%10 Kurtarma Oranı", "{rescueOrders}: her biri +%1, %50'ye kadar"]},
      { type: "callout", text: "⚠️ **ÖNEMLİ:** Süre dolmadan önce herkes ittifak sohbetinde {rescueOrders} takas etmelidir!" }
    ]},
    id: { title: "Panduan Persiapan & Pertempuran KvK (Era Gen 3)", blocks: [
      { type: "checklist", days: [1, 2, 3, 4, 5],
        rows: [
          { label: "{truegold}", icons: ["✅", "<span class=\"chk-ok\">OK</span>", "🚫", "🚫", "✅"] },
          { label: "{truegoldDust}", icons: ["<span class=\"chk-ok\">OK</span>", "✅", "🚫", "🚫", "✅"] },
          { label: "{heroShard}", icons: ["🚫", "✅", "✅", "🚫", "🚫"] },
          { label: "⏩️ {construction}", icons: ["✅", "<span class=\"chk-ok\">OK</span>", "🚫", "🚫", "✅"] },
          { label: "⏩️ {training}", icons: ["🚫", "🚫", "🚫", "✅", "✅"] },
          { label: "⏩️ {research}", icons: ["<span class=\"chk-ok\">OK</span>", "✅", "🚫", "🚫", "✅"] },
          { label: "{heroRoulette}", icons: ["🚫", "✅", "✅", "🚫", "🚫"] },
          { label: "{gathering}", icons: ["👍", "✅", "👍", "✅", "👍"] },
          { label: "{intel}", icons: ["✅", "👍", "✅", "👍", "✅"] },
          { label: "{petAdvancement}", icons: ["🚫", "🚫", "✅", "🚫", "✅"] },
          { label: "{governorCharm}", icons: ["✅", "🚫", "<span class=\"chk-ok\">OK</span>", "✅", "🚫"] },
          { label: "{governorGear}", icons: ["🚫", "🚫", "🚫", "🚫", "✅"] },
          { label: "{heroExclusiveGear} {widget}", icons: ["🚫", "🚫", "🚫", "<span class=\"chk-ok\">OK</span>", "✅"] },
          { label: "{mithril} ", icons: ["🚫", "🚫", "🚫", "<span class=\"chk-ok\">OK</span>", "✅"] },
          { label: "{forgehammer}", icons: ["🚫", "🚫", "🚫", "<span class=\"chk-ok\">OK</span>", "✅"] },
          { label: "{masterItems}", icons: ["🚫", "✅", "<span class=\"chk-ok\">OK</span>", "🚫", "🚫"] },
          { label: "{manuscript}", icons: ["🚫", "🚫", "✅", "🚫", "🚫"] },
          { label: "{masterSpeeds}", icons: ["<span class=\"chk-ok\">OK</span>", "✅", "🚫", "🚫", "<span class=\"chk-ok\">OK</span>"] }
        ],
        legend: [
          { icon: "✅", label: "{useIcon}" },
          { icon: "<span class=\"chk-ok\">OK</span>", label: "{okayIfNeeded}" },
          { icon: "🚫", label: "{dontUseIcon}" },
          { icon: "👍", label: "{needDaily}" }
        ]
      },
      { type: "h", text: "FASE 1: FASE PERSIAPAN (Hari 1–5)" },
      { type: "p", text: "Untuk memenangkan KVK, Kerajaan Anda harus mendapatkan lebih banyak poin total selama Fase Persiapan dibanding lawan. Memenangkan fase ini memberikan Keuntungan Penyerang (Kastil Anda sepenuhnya aman selama Fase Pertempuran)." },
      { type: "sub", text: "Hari 1: Konstruksi, {truegold} & Charm" },
      { type: "p", text: "Aktivitas Bernilai: peningkatan bangunan {truegold}, Speedup Konstruksi, {governorCharm}, Misi Intel, Speedup Skill Master." },
      { type: "p", text: "**🛡️ Fokus F2P:**" },
      { type: "list", items: ["Gunakan Speedup Konstruksi dan {truegold} yang disimpan.", "Gunakan Panduan/Desain Charm {governorGear} yang disimpan dari minggu sebelumnya.", "Selesaikan semua Misi Intel Menara Pengawas."]},
      { type: "p", text: "**⚡ Fokus P2W:**" },
      { type: "list", items: ["Maksimalkan level bangunan {truegold} tingkat tinggi ({academy} / War Academy).", "Dorong Charm {governorGear} ke Level 8–11 untuk lonjakan poin besar (Level 11 memberi 16.000 poin per naik level)."]},
      { type: "sub", text: "Hari 2: Riset, Hero & Pengumpulan" },
      { type: "p", text: "Aktivitas Bernilai: Speedup Riset, {truegoldDust} (Tech), Shard Hero (Rare/Epic/Mythic), putaran Rolet Hero, Emblem/Manuskrip Master, Pengumpulan Sumber Daya." },
      { type: "p", text: "**🛡️ Fokus F2P:**" },
      { type: "list", items: ["Putar Rolet Hero menggunakan Gems yang disimpan untuk mendapatkan shard Petra (Gen 3).", "Habiskan shard Mythic/Epic universal yang disimpan untuk hero inti.", "Kumpulkan sumber daya lebih awal (kirim pengumpul sebelum reset agar segera kembali di awal Hari 2)."]},
      { type: "p", text: "**⚡ Fokus P2W:**" },
      { type: "list", items: ["Maksimalkan riset {truegoldDust} di {academy}.", "Habiskan semua Emblem dan Manuskrip Master yang disimpan.", "Naikkan hero Gen 3 (Eric & Petra) langsung ke bintang 5."]},
      { type: "sub", text: "Hari 3: Pelatihan Pet & Progres Master" },
      { type: "p", text: "Aktivitas Bernilai: {petAdvancement}, {commonTamingMarks} & {advancedTamingMarks} (Penyempurnaan), Rolet Hero, Shard Hero, Emblem/Manuskrip Master, Misi Intel." },
      { type: "p", text: "**🛡️ Fokus F2P:**" },
      { type: "list", items: ["Naikkan level dan sempurnakan beberapa pet tingkat menengah secara merata, jangan tumpukan semua ke satu pet.", "Gunakan sisa putaran Rolet Hero dan Misi Intel harian."]},
      { type: "p", text: "**⚡ Fokus P2W:**" },
      { type: "list", items: ["Gunakan {advancedTamingMarks} secara besar-besaran (masing-masing 15.000 poin).", "Maksimalkan ambang batas {petAdvancement} untuk pengganda poin tinggi."]},
      { type: "sub", text: "Hari 4: Pengembangan Hero & Pelatihan Pasukan" },
      { type: "p", text: "Aktivitas Bernilai: Pelatihan/Promosi Pasukan (T1–T11), {forgehammer}, {widget}, Mithril, Pengumpulan Sumber Daya." },
      { type: "p", text: "**🛡️ Fokus F2P:**" },
      { type: "list", items: ["Promosikan pasukan tingkat rendah ke tingkat tertinggi Anda (misal T9 ke T10). Meningkatkan pasukan jauh lebih hemat sumber daya dibanding melatih baru dari awal.", "Simpan speedup umum untuk riset/master—di sini hanya gunakan speedup khusus Pelatihan Pasukan."]},
      { type: "p", text: "**⚡ Fokus P2W:**" },
      { type: "list", items: ["Habiskan {forgehammer} yang disimpan (masing-masing 4.000 poin) dan {widget} dari {heroExclusiveGear} (masing-masing 8.000 poin).", "Terapkan upgrade Mithril (masing-masing 40.000 poin) untuk membuka lonjakan poin besar."]},
      { type: "sub", text: "Hari 5: Peningkatan Kekuatan & Upgrade Terakhir" },
      { type: "p", text: "Aktivitas Bernilai: {governorGear}, Gear Hero, Penyempurnaan Pet, Mithril, {truegold}, Semua Speedup, Misi Intel, Pengumpulan." },
      { type: "p", text: "**🛡️ Fokus F2P:**" },
      { type: "list", items: ["Selesaikan sisa Misi Intel, habiskan sisa sumber daya/speedup, dan tingkatkan {governorGear} menggunakan {satin}/{gildedThreads} yang terkumpul."]},
      { type: "p", text: "**⚡ Fokus P2W:**" },
      { type: "list", items: ["Dorong {governorGear} ke Mythic / Mythic 3-Bintang (6.250 poin per naik level).", "Habiskan semua sisa Mithril, {widget}, dan {forgehammer} untuk mengamankan hadiah peringkat pribadi harian Top 2000 / Top 200."]},
      { type: "h", text: "⚔️ FASE 2: FASE PERTEMPURAN (12 JAM)" },
      { type: "p", text: "Jendela Pertempuran Kastil: 12:00 UTC hingga 22:00 UTC." },
      { type: "p", text: "Target: Kuasai {kingsCastle} dan 4 {turret}." },
      { type: "h", text: "🎯 META PVP GEN 3 & SETUP RALLY" },
      { type: "sub", text: "🛡️ Pertahanan Garnisun — Kastil/Menara" },
      { type: "p", text: "**Hero Utama:** Eric (Gen 3) — Tembok infanteri tak tertembus dengan statistik Gen 3 unggul dan mekanisme bertahan hidup. Dipasangkan dengan {zoe} (Gen 2) untuk perisai." },
      { type: "sub", text: "⚔️ Rally Ofensif (Menyerang Kastil/Menara)" },
      { type: "p", text: "**Hero Utama:** Petra (Gen 3) — Pemimpin Kavaleri mematikan dengan {widget} rally ofensif berskala tinggi." },
      { type: "sub", text: "🤝 Peserta Rally (Krusial untuk F2P!)" },
      { type: "p", text: "JANGAN gunakan hero sembarangan saat bergabung rally. Bergabunglah dengan:" },
      { type: "list", items: ["{chenko} (Skill 1 maksimal)", "{amane}", "{yeonwoo}"]},
      { type: "p", text: "Hero-hero ini menumpuk pengganda Lethality." },
      { type: "h", text: "💣 STRATEGI RALLY GANDA \"PENGHANCUR PAUS\"" },
      { type: "p", text: "Untuk garnisun musuh yang kuat:" },
      { type: "list", items: ["**Rally 1 (Tameng / Pembersih):** Diluncurkan 1–2 detik lebih awal. Fokus pada lethality murni untuk membanjiri Infirmary musuh dan membersihkan pasukan bertahan.", "**Rally 2 (Penyerang Utama):** Tiba tepat di belakang Rally 1 untuk menghabisi sisa pasukan dan mengambil alih Kastil."]},
      { type: "callout", text: "Keuntungan {turret}: Merebut {turret} memberikan hingga +20% Lethality Skuad jika dipegang oleh kerajaan yang sama dengan yang memegang Kastil." },
      { type: "h", text: "🩺 FASE 3: TRIASE LAPANGAN (PEMULIHAN PASUKAN)" },
      { type: "p", text: "Tingkat Penyelamatan Dasar: 30% dari pasukan yang hilang dan tidak sempat masuk Infirmary." },
      { type: "p", text: "Target Tingkat Penyelamatan: 90%" },
      { type: "p", text: "**Cara meningkatkannya:**" },
      { type: "list", items: ["{medicalSatchels}: +10% Tingkat Penyelamatan", "{rescueOrders}: masing-masing +1%, hingga +50%"]},
      { type: "callout", text: "⚠️ **PENTING:** Semua orang harus menukar {rescueOrders} di chat aliansi sebelum timer habis!" }
    ]},
    ru: { title: "Гайд по подготовке и битве KvK (Эпоха Gen 3)", blocks: [
      { type: "checklist", days: [1, 2, 3, 4, 5],
        rows: [
          { label: "{truegold}", icons: ["✅", "<span class=\"chk-ok\">OK</span>", "🚫", "🚫", "✅"] },
          { label: "{truegoldDust}", icons: ["<span class=\"chk-ok\">OK</span>", "✅", "🚫", "🚫", "✅"] },
          { label: "{heroShard}", icons: ["🚫", "✅", "✅", "🚫", "🚫"] },
          { label: "⏩️ {construction}", icons: ["✅", "<span class=\"chk-ok\">OK</span>", "🚫", "🚫", "✅"] },
          { label: "⏩️ {training}", icons: ["🚫", "🚫", "🚫", "✅", "✅"] },
          { label: "⏩️ {research}", icons: ["<span class=\"chk-ok\">OK</span>", "✅", "🚫", "🚫", "✅"] },
          { label: "{heroRoulette}", icons: ["🚫", "✅", "✅", "🚫", "🚫"] },
          { label: "{gathering}", icons: ["👍", "✅", "👍", "✅", "👍"] },
          { label: "{intel}", icons: ["✅", "👍", "✅", "👍", "✅"] },
          { label: "{petAdvancement}", icons: ["🚫", "🚫", "✅", "🚫", "✅"] },
          { label: "{governorCharm}", icons: ["✅", "🚫", "<span class=\"chk-ok\">OK</span>", "✅", "🚫"] },
          { label: "{governorGear}", icons: ["🚫", "🚫", "🚫", "🚫", "✅"] },
          { label: "{heroExclusiveGear} {widget}", icons: ["🚫", "🚫", "🚫", "<span class=\"chk-ok\">OK</span>", "✅"] },
          { label: "{mithril} ", icons: ["🚫", "🚫", "🚫", "<span class=\"chk-ok\">OK</span>", "✅"] },
          { label: "{forgehammer}", icons: ["🚫", "🚫", "🚫", "<span class=\"chk-ok\">OK</span>", "✅"] },
          { label: "{masterItems}", icons: ["🚫", "✅", "<span class=\"chk-ok\">OK</span>", "🚫", "🚫"] },
          { label: "{manuscript}", icons: ["🚫", "🚫", "✅", "🚫", "🚫"] },
          { label: "{masterSpeeds}", icons: ["<span class=\"chk-ok\">OK</span>", "✅", "🚫", "🚫", "<span class=\"chk-ok\">OK</span>"] }
        ],
        legend: [
          { icon: "✅", label: "{useIcon}" },
          { icon: "<span class=\"chk-ok\">OK</span>", label: "{okayIfNeeded}" },
          { icon: "🚫", label: "{dontUseIcon}" },
          { icon: "👍", label: "{needDaily}" }
        ]
      },
      { type: "h", text: "ФАЗА 1: ФАЗА ПОДГОТОВКИ (Дни 1–5)" },
      { type: "p", text: "Чтобы выиграть KVK, ваше королевство должно набрать больше очков за Фазу подготовки, чем соперник. Победа в этой фазе даёт преимущество нападающего (ваш замок будет полностью безопасен во время Фазы битвы)." },
      { type: "sub", text: "День 1: Строительство, {truegold} и талисманы" },
      { type: "p", text: "Активности, приносящие очки: улучшения зданий {truegold}, ускорения строительства, {governorCharm}ы, разведывательные задания, ускорения навыков {masters}." },
      { type: "p", text: "**🛡️ Фокус F2P:**" },
      { type: "list", items: ["Потратьте накопленные ускорения строительства и {truegold}.", "Используйте накопленные за предыдущие недели руководства/дизайны талисманов {governorGear}.", "Выполните все разведывательные задания дозорной вышки."]},
      { type: "p", text: "**⚡ Фокус P2W:**" },
      { type: "list", items: ["Максимизируйте здания высокого уровня {truegold} ({academy} / War Academy).", "Прокачайте талисманы {governorGear} до уровня 8–11 ради огромных всплесков очков (уровень 11 даёт 16 000 очков за повышение)."]},
      { type: "sub", text: "День 2: Исследования, герои и сбор" },
      { type: "p", text: "Активности, приносящие очки: ускорения исследований, {truegoldDust} (технологии), фрагменты героев (редкий/великий/мифический), прокрутки Геройской рулетки, эмблемы/манускрипты {masters}, сбор ресурсов." },
      { type: "p", text: "**🛡️ Фокус F2P:**" },
      { type: "list", items: ["Крутите Геройскую рулетку на накопленные самоцветы, чтобы получить фрагменты Petra (Gen 3).", "Вложите накопленные универсальные мифические/великие фрагменты в основных героев.", "Соберите ресурсы заранее (отправьте сборщиков до сброса, чтобы они сразу вернулись в начале дня 2)."]},
      { type: "p", text: "**⚡ Фокус P2W:**" },
      { type: "list", items: ["Максимизируйте исследование {truegoldDust} в {academy}.", "Потратьте все накопленные эмблемы и манускрипты {masters}.", "Мгновенно повысьте героев Gen 3 (Eric и Petra) до 5 звёзд."]},
      { type: "sub", text: "День 3: Тренировка питомцев и прогресс {masters}" },
      { type: "p", text: "Активности, приносящие очки: {petAdvancement}, {commonTamingMarks} и {advancedTamingMarks} (улучшение), Геройская рулетка, фрагменты героев, эмблемы/манускрипты {masters}, разведывательные задания." },
      { type: "p", text: "**🛡️ Фокус F2P:**" },
      { type: "list", items: ["Прокачивайте и улучшайте несколько питомцев среднего уровня равномерно, а не вкладывайтесь в одного.", "Используйте оставшиеся прокрутки Геройской рулетки и ежедневные разведывательные задания."]},
      { type: "p", text: "**⚡ Фокус P2W:**" },
      { type: "list", items: ["Активно используйте {advancedTamingMarks} (по 15 000 очков за каждую).", "Максимизируйте пороги {petAdvancement} ради высоких множителей очков."]},
      { type: "sub", text: "День 4: Развитие героев и тренировка войск" },
      { type: "p", text: "Активности, приносящие очки: тренировка/повышение войск (T1–T11), {forgehammer}, {widget}, мифрил, сбор ресурсов." },
      { type: "p", text: "**🛡️ Фокус F2P:**" },
      { type: "list", items: ["Повышайте войска низшего уровня до вашего максимального уровня (например, T9 в T10). Улучшение войск гораздо эффективнее по ресурсам, чем обучение новых с нуля.", "Сохраняйте общие ускорения для исследований/masters — здесь используйте только специализированные ускорения тренировки войск."]},
      { type: "p", text: "**⚡ Фокус P2W:**" },
      { type: "list", items: ["Потратьте накопленные {forgehammer} (по 4000 очков) и {widget} из {heroExclusiveGear} (по 8000 очков).", "Применяйте улучшения мифрилом (по 40 000 очков), чтобы получить огромные всплески очков."]},
      { type: "sub", text: "День 5: Усиление мощи и финальные улучшения" },
      { type: "p", text: "Активности, приносящие очки: {governorGear}, снаряжение героя, улучшение питомцев, мифрил, {truegold}, все ускорения, разведывательные задания, сбор." },
      { type: "p", text: "**🛡️ Фокус F2P:**" },
      { type: "list", items: ["Выполните оставшиеся разведывательные задания, потратьте оставшиеся ресурсы/ускорения и улучшите {governorGear}, используя накопленные {satin}/{gildedThreads}."]},
      { type: "p", text: "**⚡ Фокус P2W:**" },
      { type: "list", items: ["Прокачайте {governorGear} до мифического / мифического 3 звезды (6250 очков за повышение).", "Потратьте весь оставшийся мифрил, {widget} и {forgehammer}, чтобы обеспечить ежедневные награды личного рейтинга Топ-2000 / Топ-200."]},
      { type: "h", text: "⚔️ ФАЗА 2: ФАЗА БИТВЫ (12 ЧАСОВ)" },
      { type: "p", text: "Окно битвы за замок: с 12:00 до 22:00 UTC." },
      { type: "p", text: "Цель: контролировать {kingsCastle} и 4 {turret}." },
      { type: "h", text: "🎯 МЕТА PVP GEN 3 И НАСТРОЙКА СБОРОВ" },
      { type: "sub", text: "🛡️ Оборона гарнизона — замок/башни" },
      { type: "p", text: "**Ведущий герой:** Eric (Gen 3) — несокрушимая пехотная стена с превосходными характеристиками Gen 3 и механиками выживания. В паре с {zoe} (Gen 2) для щитов." },
      { type: "sub", text: "⚔️ Атакующие сборы (атака замка/башен)" },
      { type: "p", text: "**Ведущий герой:** Petra (Gen 3) — разрушительный лидер кавалерии с сильно масштабируемыми {widget} для атакующих сборов." },
      { type: "sub", text: "🤝 Участники сбора (критично для F2P!)" },
      { type: "p", text: "НЕ используйте случайных героев при присоединении к сборам. Присоединяйтесь с:" },
      { type: "list", items: ["{chenko} (1-й навык прокачан)", "{amane}", "{yeonwoo}"]},
      { type: "p", text: "Эти герои складывают множители смертоносности." },
      { type: "h", text: "💣 СТРАТЕГИЯ ДВОЙНОГО СБОРА «СОКРУШИТЕЛЬ КИТОВ»" },
      { type: "p", text: "Против сильных вражеских гарнизонов:" },
      { type: "list", items: ["**Сбор 1 (щит / зачистка):** запускается на 1–2 секунды раньше. Фокусируется на чистой смертоносности, чтобы переполнить вражеский лазарет и зачистить обороняющиеся войска.", "**Сбор 2 (основной удар):** прибывает сразу за Сбором 1, чтобы уничтожить оставшиеся войска и взять под контроль замок."]},
      { type: "callout", text: "Преимущество {turret}: захват {turret} даёт до +20% смертоносности отряда, если ими владеет то же королевство, что держит замок." },
      { type: "h", text: "🩺 ФАЗА 3: ПОЛЕВАЯ СОРТИРОВКА (ВОССТАНОВЛЕНИЕ ВОЙСК)" },
      { type: "p", text: "Базовая скорость спасения: 30% потерянных войск, не попавших в лазарет." },
      { type: "p", text: "Целевая скорость спасения: 90%" },
      { type: "p", text: "**Как повысить:**" },
      { type: "list", items: ["{medicalSatchels}: +10% к скорости спасения", "{rescueOrders}: по +1% каждый, до +50%"]},
      { type: "callout", text: "⚠️ **ВАЖНО:** Все должны обменяться {rescueOrders} в чате альянса до истечения таймера!" }
    ]},
    th: { title: "คู่มือเตรียมตัวและการต่อสู้ KvK (ยุค Gen 3)", blocks: [
      { type: "checklist", days: [1, 2, 3, 4, 5],
        rows: [
          { label: "{truegold}", icons: ["✅", "<span class=\"chk-ok\">OK</span>", "🚫", "🚫", "✅"] },
          { label: "{truegoldDust}", icons: ["<span class=\"chk-ok\">OK</span>", "✅", "🚫", "🚫", "✅"] },
          { label: "{heroShard}", icons: ["🚫", "✅", "✅", "🚫", "🚫"] },
          { label: "⏩️ {construction}", icons: ["✅", "<span class=\"chk-ok\">OK</span>", "🚫", "🚫", "✅"] },
          { label: "⏩️ {training}", icons: ["🚫", "🚫", "🚫", "✅", "✅"] },
          { label: "⏩️ {research}", icons: ["<span class=\"chk-ok\">OK</span>", "✅", "🚫", "🚫", "✅"] },
          { label: "{heroRoulette}", icons: ["🚫", "✅", "✅", "🚫", "🚫"] },
          { label: "{gathering}", icons: ["👍", "✅", "👍", "✅", "👍"] },
          { label: "{intel}", icons: ["✅", "👍", "✅", "👍", "✅"] },
          { label: "{petAdvancement}", icons: ["🚫", "🚫", "✅", "🚫", "✅"] },
          { label: "{governorCharm}", icons: ["✅", "🚫", "<span class=\"chk-ok\">OK</span>", "✅", "🚫"] },
          { label: "{governorGear}", icons: ["🚫", "🚫", "🚫", "🚫", "✅"] },
          { label: "{heroExclusiveGear} {widget}", icons: ["🚫", "🚫", "🚫", "<span class=\"chk-ok\">OK</span>", "✅"] },
          { label: "{mithril} ", icons: ["🚫", "🚫", "🚫", "<span class=\"chk-ok\">OK</span>", "✅"] },
          { label: "{forgehammer}", icons: ["🚫", "🚫", "🚫", "<span class=\"chk-ok\">OK</span>", "✅"] },
          { label: "{masterItems}", icons: ["🚫", "✅", "<span class=\"chk-ok\">OK</span>", "🚫", "🚫"] },
          { label: "{manuscript}", icons: ["🚫", "🚫", "✅", "🚫", "🚫"] },
          { label: "{masterSpeeds}", icons: ["<span class=\"chk-ok\">OK</span>", "✅", "🚫", "🚫", "<span class=\"chk-ok\">OK</span>"] }
        ],
        legend: [
          { icon: "✅", label: "{useIcon}" },
          { icon: "<span class=\"chk-ok\">OK</span>", label: "{okayIfNeeded}" },
          { icon: "🚫", label: "{dontUseIcon}" },
          { icon: "👍", label: "{needDaily}" }
        ]
      },
      { type: "h", text: "เฟส 1: ระยะเตรียมการ (วันที่ 1–5)" },
      { type: "p", text: "หากต้องการชนะ KVK อาณาจักรของคุณต้องได้คะแนนรวมในระยะเตรียมการมากกว่าคู่แข่ง การชนะเฟสนี้จะได้เปรียบในฐานะผู้โจมตี (ปราสาทของคุณจะปลอดภัยอย่างสมบูรณ์ในช่วงเฟสการต่อสู้)" },
      { type: "sub", text: "วันที่ 1: การก่อสร้าง {truegold} และเครื่องราง" },
      { type: "p", text: "กิจกรรมที่ได้คะแนน: การอัปเกรดอาคาร {truegold}, เร่งสปีดการก่อสร้าง, {governorCharm}, ภารกิจข่าวกรอง, เร่งสปีดสกิล {masters}" },
      { type: "p", text: "**🛡️ เน้น F2P:**" },
      { type: "list", items: ["ใช้เร่งสปีดการก่อสร้างและ {truegold} ที่เก็บไว้", "ใช้แบบ/คู่มือเครื่องราง {governorGear} ที่เก็บไว้จากสัปดาห์ก่อน", "ล้างภารกิจข่าวกรองหอคอยเฝ้าระวังทั้งหมด"]},
      { type: "p", text: "**⚡ เน้น P2W:**" },
      { type: "list", items: ["อัปเกรดอาคาร {truegold} ระดับสูง ({academy} / War Academy) ให้เต็มขั้น", "ดันเครื่องราง {governorGear} ไปที่ระดับ 8–11 เพื่อได้คะแนนพุ่งจำนวนมาก (ระดับ 11 ให้ 16,000 แต้มต่อการเลื่อนขั้น)"]},
      { type: "sub", text: "วันที่ 2: การวิจัย ฮีโร่ และการเก็บเกี่ยว" },
      { type: "p", text: "กิจกรรมที่ได้คะแนน: เร่งสปีดการวิจัย, {truegoldDust} (เทค), ชิ้นส่วนฮีโร่ (หายาก/มหากาพย์/ขั้นเทพ), หมุนรูเล็ตฮีโร่, ตรา/ต้นฉบับเขียนมือ {masters}, การเก็บเกี่ยวทรัพยากร" },
      { type: "p", text: "**🛡️ เน้น F2P:**" },
      { type: "list", items: ["หมุนรูเล็ตฮีโร่โดยใช้เพชรที่เก็บไว้เพื่อรับชิ้นส่วน Petra (Gen 3)", "ทุ่มชิ้นส่วนขั้นเทพ/มหากาพย์ทั่วไปที่เก็บไว้ให้กับฮีโร่หลัก", "เก็บเกี่ยวทรัพยากรล่วงหน้า (ส่งผู้เก็บเกี่ยวออกไปก่อนรีเซ็ตเพื่อให้กลับมาทันทีเมื่อวันที่ 2 เริ่มต้น)"]},
      { type: "p", text: "**⚡ เน้น P2W:**" },
      { type: "list", items: ["อัปเกรดการวิจัย {truegoldDust} ใน {academy} ให้เต็มขั้น", "ใช้ตราและต้นฉบับเขียนมือ {masters} ที่เก็บไว้ทั้งหมด", "อัปฮีโร่ Gen 3 (Eric & Petra) ให้เป็น 5 ดาวทันที"]},
      { type: "sub", text: "วันที่ 3: การฝึกสัตว์เลี้ยงและความคืบหน้า {masters}" },
      { type: "p", text: "กิจกรรมที่ได้คะแนน: {petAdvancement}, {commonTamingMarks} และ {advancedTamingMarks} (การปรับแต่ง), รูเล็ตฮีโร่, ชิ้นส่วนฮีโร่, ตรา/ต้นฉบับเขียนมือ {masters}, ภารกิจข่าวกรอง" },
      { type: "p", text: "**🛡️ เน้น F2P:**" },
      { type: "list", items: ["เลเวลอัพและปรับแต่งสัตว์เลี้ยงระดับกลางหลายตัวอย่างสม่ำเสมอ แทนที่จะทุ่มทุกอย่างให้ตัวเดียว", "ใช้รอบหมุนรูเล็ตฮีโร่ที่เหลือและภารกิจข่าวกรองประจำวัน"]},
      { type: "p", text: "**⚡ เน้น P2W:**" },
      { type: "list", items: ["ใช้ {advancedTamingMarks} จำนวนมาก (ชิ้นละ 15,000 แต้ม)", "ดันเกณฑ์ {petAdvancement} ให้สูงสุดเพื่อรับตัวคูณคะแนนสูง"]},
      { type: "sub", text: "วันที่ 4: การพัฒนาฮีโร่และการฝึกทหาร" },
      { type: "p", text: "กิจกรรมที่ได้คะแนน: การฝึก/เลื่อนขั้นทหาร (T1–T11), {forgehammer}, {widget}, มิธริล, การเก็บเกี่ยวทรัพยากร" },
      { type: "p", text: "**🛡️ เน้น F2P:**" },
      { type: "list", items: ["เลื่อนขั้นทหารระดับต่ำไปยังระดับสูงสุดของคุณ (เช่น T9 เป็น T10) การอัปเกรดทหารประหยัดทรัพยากรกว่าการฝึกใหม่ตั้งแต่ต้นมาก", "เก็บเร่งสปีดทั่วไปไว้สำหรับการวิจัย/masters—ที่นี่ใช้เฉพาะเร่งสปีดการฝึกทหารโดยเฉพาะ"]},
      { type: "p", text: "**⚡ เน้น P2W:**" },
      { type: "list", items: ["ใช้ {forgehammer} ที่เก็บไว้ (ชิ้นละ 4,000 แต้ม) และ {widget} ของ {heroExclusiveGear} (ชิ้นละ 8,000 แต้ม)", "ใช้การอัปเกรดมิธริล (ชิ้นละ 40,000 แต้ม) เพื่อปลดล็อกคะแนนพุ่งจำนวนมาก"]},
      { type: "sub", text: "วันที่ 5: เพิ่มพลังและอัปเกรดขั้นสุดท้าย" },
      { type: "p", text: "กิจกรรมที่ได้คะแนน: {governorGear}, อุปกรณ์ฮีโร่, การปรับแต่งสัตว์เลี้ยง, มิธริล, {truegold}, เร่งสปีดทั้งหมด, ภารกิจข่าวกรอง, การเก็บเกี่ยว" },
      { type: "p", text: "**🛡️ เน้น F2P:**" },
      { type: "list", items: ["ล้างภารกิจข่าวกรองที่เหลือ ใช้ทรัพยากร/เร่งสปีดที่เหลือ และอัปเกรด {governorGear} โดยใช้ {satin}/{gildedThreads} ที่สะสมไว้"]},
      { type: "p", text: "**⚡ เน้น P2W:**" },
      { type: "list", items: ["ดัน {governorGear} ไปที่ขั้นเทพ / ขั้นเทพ 3 ดาว (6,250 แต้มต่อการเลื่อนขั้น)", "ใช้มิธริล {widget} และ {forgehammer} ที่เหลือทั้งหมดเพื่อรักษาอันดับรางวัลส่วนบุคคลรายวัน Top 2000 / Top 200"]},
      { type: "h", text: "⚔️ เฟส 2: ระยะการต่อสู้ (12 ชั่วโมง)" },
      { type: "p", text: "ช่วงเวลาต่อสู้ปราสาท: 12:00 น. ถึง 22:00 น. UTC" },
      { type: "p", text: "เป้าหมาย: ควบคุม {kingsCastle} และ {turret} ทั้ง 4 จุด" },
      { type: "h", text: "🎯 มาตรฐาน PVP GEN 3 และการตั้งค่าการรวมพล" },
      { type: "sub", text: "🛡️ การป้องกันทหารคุ้มกัน — ปราสาท/ป้อมปืน" },
      { type: "p", text: "**ฮีโร่นำ:** Eric (Gen 3) — กำแพงทหารราบที่ไม่มีวันแตกด้วยสถิติ Gen 3 ที่เหนือกว่าและกลไกการเอาชีวิตรอด จับคู่กับ {zoe} (Gen 2) เพื่อโล่ป้องกัน" },
      { type: "sub", text: "⚔️ การรวมพลโจมตี (โจมตีปราสาท/ป้อมปืน)" },
      { type: "p", text: "**ฮีโร่นำ:** Petra (Gen 3) — ผู้นำทหารม้าที่ทำลายล้างด้วย {widget} การรวมพลโจมตีที่ปรับสเกลได้สูง" },
      { type: "sub", text: "🤝 ผู้เข้าร่วมรวมพล (สำคัญมากสำหรับ F2P!)" },
      { type: "p", text: "ห้ามใช้ฮีโร่แบบสุ่มเมื่อเข้าร่วมรวมพล เข้าร่วมด้วย:" },
      { type: "list", items: ["{chenko} (สกิล 1 เต็ม)", "{amane}", "{yeonwoo}"]},
      { type: "p", text: "ฮีโร่เหล่านี้จะเพิ่มตัวคูณพลังทำลายล้างซ้อนกัน" },
      { type: "h", text: "💣 กลยุทธ์รวมพลสองชุด \"เครื่องบดวาฬ\"" },
      { type: "p", text: "สำหรับการป้องกันของศัตรูที่หนักหน่วง:" },
      { type: "list", items: ["**รวมพล 1 (โล่มนุษย์ / ผู้เคลียร์):** ปล่อยก่อน 1–2 วินาที เน้นพลังทำลายล้างล้วนๆ เพื่อให้โรงพยาบาลของศัตรูล้นและเคลียร์ทหารป้องกัน", "**รวมพล 2 (ผู้โจมตีหลัก):** มาถึงทันทีหลังรวมพล 1 เพื่อกวาดล้างทหารที่เหลือและยึดครองปราสาท"]},
      { type: "callout", text: "ข้อได้เปรียบ {turret}: การยึด {turret} ให้พลังทำลายล้างกองทหารสูงสุด +20% หากถือครองโดยอาณาจักรเดียวกับที่ถือครองปราสาท" },
      { type: "h", text: "🩺 เฟส 3: การคัดแยกในสนามรบ (การฟื้นฟูทหาร)" },
      { type: "p", text: "อัตราการช่วยเหลือพื้นฐาน: 30% ของทหารที่สูญเสียซึ่งไปไม่ถึงโรงพยาบาล" },
      { type: "p", text: "อัตราการช่วยเหลือเป้าหมาย: 90%" },
      { type: "p", text: "**วิธีเพิ่มอัตรา:**" },
      { type: "list", items: ["{medicalSatchels}: +10% อัตราการช่วยเหลือ", "{rescueOrders}: +1% ต่อชิ้น สูงสุด +50%"]},
      { type: "callout", text: "⚠️ **สำคัญ:** ทุกคนต้องแลกเปลี่ยน {rescueOrders} ในแชทพันธมิตรก่อนหมดเวลา!" }
    ]},
    ar: { title: "دليل استعداد وقتال KvK (حقبة Gen 3)", blocks: [
      { type: "checklist", days: [1, 2, 3, 4, 5],
        rows: [
          { label: "{truegold}", icons: ["✅", "<span class=\"chk-ok\">OK</span>", "🚫", "🚫", "✅"] },
          { label: "{truegoldDust}", icons: ["<span class=\"chk-ok\">OK</span>", "✅", "🚫", "🚫", "✅"] },
          { label: "{heroShard}", icons: ["🚫", "✅", "✅", "🚫", "🚫"] },
          { label: "⏩️ {construction}", icons: ["✅", "<span class=\"chk-ok\">OK</span>", "🚫", "🚫", "✅"] },
          { label: "⏩️ {training}", icons: ["🚫", "🚫", "🚫", "✅", "✅"] },
          { label: "⏩️ {research}", icons: ["<span class=\"chk-ok\">OK</span>", "✅", "🚫", "🚫", "✅"] },
          { label: "{heroRoulette}", icons: ["🚫", "✅", "✅", "🚫", "🚫"] },
          { label: "{gathering}", icons: ["👍", "✅", "👍", "✅", "👍"] },
          { label: "{intel}", icons: ["✅", "👍", "✅", "👍", "✅"] },
          { label: "{petAdvancement}", icons: ["🚫", "🚫", "✅", "🚫", "✅"] },
          { label: "{governorCharm}", icons: ["✅", "🚫", "<span class=\"chk-ok\">OK</span>", "✅", "🚫"] },
          { label: "{governorGear}", icons: ["🚫", "🚫", "🚫", "🚫", "✅"] },
          { label: "{heroExclusiveGear} {widget}", icons: ["🚫", "🚫", "🚫", "<span class=\"chk-ok\">OK</span>", "✅"] },
          { label: "{mithril} ", icons: ["🚫", "🚫", "🚫", "<span class=\"chk-ok\">OK</span>", "✅"] },
          { label: "{forgehammer}", icons: ["🚫", "🚫", "🚫", "<span class=\"chk-ok\">OK</span>", "✅"] },
          { label: "{masterItems}", icons: ["🚫", "✅", "<span class=\"chk-ok\">OK</span>", "🚫", "🚫"] },
          { label: "{manuscript}", icons: ["🚫", "🚫", "✅", "🚫", "🚫"] },
          { label: "{masterSpeeds}", icons: ["<span class=\"chk-ok\">OK</span>", "✅", "🚫", "🚫", "<span class=\"chk-ok\">OK</span>"] }
        ],
        legend: [
          { icon: "✅", label: "{useIcon}" },
          { icon: "<span class=\"chk-ok\">OK</span>", label: "{okayIfNeeded}" },
          { icon: "🚫", label: "{dontUseIcon}" },
          { icon: "👍", label: "{needDaily}" }
        ]
      },
      { type: "h", text: "المرحلة 1: مرحلة الاستعداد (الأيام 1–5)" },
      { type: "p", text: "للفوز بـ KVK، يجب أن تحصل مملكتك على نقاط إجمالية أكثر من خصمك خلال مرحلة الاستعداد. الفوز بهذه المرحلة يمنح ميزة المهاجم (قلعتك ستكون آمنة تمامًا خلال مرحلة المعركة)." },
      { type: "sub", text: "اليوم 1: البناء، {truegold} والتمائم" },
      { type: "p", text: "الأنشطة المحتسبة: ترقيات مباني {truegold}، تسريعات البناء، {governorCharm}، مهام الاستخبارات، تسريعات مهارات {masters}." },
      { type: "p", text: "**🛡️ تركيز F2P:**" },
      { type: "list", items: ["استخدم تسريعات البناء و{truegold} المدخرة.", "استخدم أدلة/تصاميم تمائم {governorGear} المدخرة من الأسابيع السابقة.", "أنجز جميع مهام استخبارات برج المراقبة."]},
      { type: "p", text: "**⚡ تركيز P2W:**" },
      { type: "list", items: ["ارفع مباني {truegold} عالية المستوى إلى الحد الأقصى ({academy} / War Academy).", "ادفع تمائم {governorGear} إلى المستوى 8–11 لتحقيق قفزات نقاط ضخمة (المستوى 11 يمنح 16,000 نقطة لكل رفع مستوى)."]},
      { type: "sub", text: "اليوم 2: البحث، الأبطال والجمع" },
      { type: "p", text: "الأنشطة المحتسبة: تسريعات البحث، {truegoldDust} (تقنية)، شظايا الأبطال (نادر/ملحمي/خيالي)، دورات روليت البطل، أوسمة/مخطوطات {masters}، جمع الموارد." },
      { type: "p", text: "**🛡️ تركيز F2P:**" },
      { type: "list", items: ["أدر روليت البطل باستخدام الجواهر المدخرة للحصول على شظايا Petra (Gen 3).", "استثمر الشظايا الخيالية/الملحمية العامة المدخرة في الأبطال الأساسيين.", "اجمع الموارد مسبقًا (أرسل جامعي الموارد قبل إعادة التعيين ليعودوا فورًا عند بداية اليوم 2)."]},
      { type: "p", text: "**⚡ تركيز P2W:**" },
      { type: "list", items: ["ارفع بحث {truegoldDust} في {academy} إلى الحد الأقصى.", "استخدم جميع أوسمة ومخطوطات {masters} المدخرة.", "ارفع أبطال Gen 3 (Eric وPetra) إلى 5 نجوم فورًا."]},
      { type: "sub", text: "اليوم 3: تدريب الحيوانات الأليفة وتقدم {masters}" },
      { type: "p", text: "الأنشطة المحتسبة: {petAdvancement}، {commonTamingMarks} و{advancedTamingMarks} (التحسين)، روليت البطل، شظايا الأبطال، أوسمة/مخطوطات {masters}، مهام الاستخبارات." },
      { type: "p", text: "**🛡️ تركيز F2P:**" },
      { type: "list", items: ["ارفع مستوى وحسّن عدة حيوانات أليفة متوسطة المستوى بالتساوي بدلًا من استثمار كل شيء في حيوان واحد.", "استخدم دورات روليت البطل المتبقية ومهام الاستخبارات اليومية."]},
      { type: "p", text: "**⚡ تركيز P2W:**" },
      { type: "list", items: ["استخدم {advancedTamingMarks} بكثرة (15,000 نقطة لكل واحدة).", "ارفع حدود {petAdvancement} للحصول على مضاعفات نقاط عالية."]},
      { type: "sub", text: "اليوم 4: تطوير الأبطال وتدريب الجنود" },
      { type: "p", text: "الأنشطة المحتسبة: تدريب/ترقية الجنود (T1–T11)، {forgehammer}، {widget}، الميثريل، جمع الموارد." },
      { type: "p", text: "**🛡️ تركيز F2P:**" },
      { type: "list", items: ["رقّ الجنود ذوي المستوى المنخفض إلى أعلى مستوى لديك (مثل T9 إلى T10). ترقية الجنود أكثر كفاءة في استخدام الموارد بكثير من تدريب جنود جدد من الصفر.", "احتفظ بالتسريعات العامة للبحث/{masters} — استخدم هنا فقط تسريعات تدريب الجنود المخصصة."]},
      { type: "p", text: "**⚡ تركيز P2W:**" },
      { type: "list", items: ["استخدم {forgehammer} المدخرة (4,000 نقطة لكل واحدة) و{widget} من {heroExclusiveGear} (8,000 نقطة لكل واحد).", "طبّق ترقيات الميثريل (40,000 نقطة لكل واحدة) لإطلاق قفزات نقاط ضخمة."]},
      { type: "sub", text: "اليوم 5: تعزيز القوة والترقيات النهائية" },
      { type: "p", text: "الأنشطة المحتسبة: {governorGear}، عتاد البطل، تحسين الحيوانات الأليفة، الميثريل، {truegold}، جميع التسريعات، مهام الاستخبارات، الجمع." },
      { type: "p", text: "**🛡️ تركيز F2P:**" },
      { type: "list", items: ["أنجز مهام الاستخبارات المتبقية، استخدم الموارد/التسريعات المتبقية، ورقِّ {governorGear} باستخدام {satin}/{gildedThreads} المتراكمة."]},
      { type: "p", text: "**⚡ تركيز P2W:**" },
      { type: "list", items: ["ادفع {governorGear} إلى الخيالي / الخيالي 3 نجوم (6,250 نقطة لكل رفع مستوى).", "صفِّ كل ما تبقى من الميثريل و{widget} و{forgehammer} لتأمين مكافآت الترتيب الشخصي اليومي Top 2000 / Top 200."]},
      { type: "h", text: "⚔️ المرحلة 2: مرحلة المعركة (12 ساعة)" },
      { type: "p", text: "نافذة معركة القلعة: من 12:00 إلى 22:00 بتوقيت UTC." },
      { type: "p", text: "الهدف: السيطرة على {kingsCastle} و4 من {turret}." },
      { type: "h", text: "🎯 ميتا PVP لـ Gen 3 وإعداد التجمعات" },
      { type: "sub", text: "🛡️ دفاع الحامية — القلعة/الأبراج" },
      { type: "p", text: "**البطل القائد:** Eric (Gen 3) — جدار مشاة لا يُكسر بإحصائيات Gen 3 متفوقة وآليات بقاء. يُقرن مع {zoe} (Gen 2) للدروع." },
      { type: "sub", text: "⚔️ التجمعات الهجومية (مهاجمة القلعة/الأبراج)" },
      { type: "p", text: "**البطل القائد:** Petra (Gen 3) — قائد فرسان مدمّر بـ{widget} تجمع هجومي عالي التصعيد." },
      { type: "sub", text: "🤝 المنضمون للتجمع (حاسم لـ F2P!)" },
      { type: "p", text: "لا تستخدم أبطالًا عشوائيين عند الانضمام للتجمعات. انضم مع:" },
      { type: "list", items: ["{chenko} (المهارة 1 مكتملة)", "{amane}", "{yeonwoo}"]},
      { type: "p", text: "هؤلاء الأبطال يراكمون مضاعفات الفتك." },
      { type: "h", text: "💣 استراتيجية التجمع المزدوج \"محطم الحيتان\"" },
      { type: "p", text: "ضد حاميات العدو الثقيلة:" },
      { type: "list", items: ["**التجمع 1 (الدرع البشري / المنظف):** يُطلق قبل 1–2 ثانية. يركز على الفتك الخالص لإغراق مستشفى العدو وتطهير الجنود المدافعين.", "**التجمع 2 (الضارب الرئيسي):** يصل مباشرة بعد التجمع 1 للقضاء على الجنود المتبقين والسيطرة على القلعة."]},
      { type: "callout", text: "ميزة {turret}: الاستيلاء على {turret} يمنح حتى +20% فتك للفرقة إذا كانت بحوزة نفس المملكة التي تسيطر على القلعة." },
      { type: "h", text: "🩺 المرحلة 3: الفرز الميداني (استعادة الجنود)" },
      { type: "p", text: "معدل الإنقاذ الأساسي: 30% من الجنود المفقودين الذين لم يصلوا إلى المستشفى." },
      { type: "p", text: "معدل الإنقاذ المستهدف: 90%" },
      { type: "p", text: "**كيفية زيادته:**" },
      { type: "list", items: ["{medicalSatchels}: +10% معدل إنقاذ", "{rescueOrders}: +1% لكل واحد، حتى +50%"]},
      { type: "callout", text: "⚠️ **مهم:** يجب على الجميع تبادل {rescueOrders} في دردشة التحالف قبل انتهاء المؤقت!" }
    ]}
  }
},
  "all-out": {
    emoji: "🪖",
    name: {
      en: "All Out", zh: "全軍出擊", ko: "전군 출격",
      de: "Aufs Ganze", fr: "Tous dehors",
      pt: "Vai com Tudo", es: "Ataque Total", tr: "Topyekün",
      id: "Serangan Penuh", ru: "Полный вперед",
      th: "ลุยเลย", ar: "جميع القوات تهاجم"
    },
    sections: {
      en: { title: "All Out", blocks: [
        { type: "h", text: "🪖 All-Out Rules" },
        { type: "list", items: [
          "❌ No attacks on NAP 6 including their farms/academies (NXS/nxs, RED/ReD, NBD/nBd/Nbd, ESA/EsA/UNI, IDN, KGb)",
          "❌ No attacks on castles or alliance buildings (HQs, outposts, banners)",
          "✅ You can attack resource gathering tiles ({mill}, {quarry}, {ironMine})",
          "✅ You can attack players outside of NAP."
        ]},
        { type: "list", items: [
          "If your castle gets attacked by a NAP member, do not retaliate — inform R4/R5.",
          "Avoid gathering resources in the wild, use the {securedAllianceNode} instead.",
          "Rule breakers will be dealt with according to alliance/NAP agreements."
        ]},
        { type: "h", text: "🏭 Secured Gathering Nodes" },
        { type: "p", text: "During the **{allOut}** event, we will be rotating our secured gathering nodes every 12 hours for 48 hours." },
        { type: "p", text: "This gives everyone a protected spot to collect resources while the event is active." },
        { type: "sub", text: "Rotation Schedule (starting at 00:00 UTC reset)" },
        { type: "list", items: [
          "{greatMill} – 00:00 UTC to 12:00 UTC",
          "{greatSawmill} – 12:00 UTC to 00:00 UTC",
          "{greatQuarry} – 00:00 UTC to 12:00 UTC",
          "{greatIronMine} – 12:00 UTC to 00:00 UTC"
        ]},
        { type: "callout", text: "Use these protected spots during the event. Stay safe and gather smart." }
      ]},
      zh: { title: "全軍出擊", blocks: [
        { type: "h", text: "🪖 全軍出擊規則" },
        { type: "list", items: [
          "❌ 禁止攻擊 NAP 6 成員，包含他們的農場／學院（NXS/nxs、RED/ReD、NBD/nBd/Nbd、ESA/EsA/UNI、IDN、KGb）",
          "❌ 禁止攻擊城堡或聯盟建築（總部、前哨站、旗幟）",
          "✅ 可以攻擊資源採集點（{mill}、{quarry}、{ironMine}）",
          "✅ 可以攻擊 NAP 以外的玩家。"
        ]},
        { type: "list", items: [
          "如果你的城堡被 NAP 成員攻擊，請勿報復，回報 R4/R5。",
          "請避免在野外採集資源，改用{securedAllianceNode}。",
          "違規者將依聯盟／NAP 協議處理。"
        ]},
        { type: "h", text: "🏭 安全採集點" },
        { type: "p", text: "**{allOut}**活動期間，我們會每 12 小時輪替一次安全採集點，持續 48 小時。" },
        { type: "p", text: "這讓每個人在活動期間都有一個受保護的地點可以採集資源。" },
        { type: "sub", text: "輪替時間表（從 UTC 00:00 重置開始）" },
        { type: "list", items: [
          "{greatMill} – UTC 00:00 至 12:00",
          "{greatSawmill} – UTC 12:00 至 00:00",
          "{greatQuarry} – UTC 00:00 至 12:00",
          "{greatIronMine} – UTC 12:00 至 00:00"
        ]},
        { type: "callout", text: "活動期間請善用這些受保護的採集點，安全且聰明地採集。" }
      ]},
      ko: { title: "전군 출격", blocks: [
        { type: "h", text: "🪖 전군 출격 규칙" },
        { type: "list", items: [
          "❌ NAP 6 멤버 공격 금지, 농장/아카데미 포함 (NXS/nxs, RED/ReD, NBD/nBd/Nbd, ESA/EsA/UNI, IDN, KGb)",
          "❌ 성이나 연맹 건물(본부, 전초기지, 깃발) 공격 금지",
          "✅ 자원 채집 타일({mill}, {quarry}, {ironMine})은 공격 가능합니다",
          "✅ NAP 이외의 플레이어는 공격 가능합니다."
        ]},
        { type: "list", items: [
          "NAP 멤버에게 성을 공격당했다면 보복하지 말고 R4/R5에게 알리세요.",
          "야생에서 자원을 채집하지 말고 {securedAllianceNode}를 이용하세요.",
          "규칙 위반자는 연맹/NAP 협약에 따라 처리됩니다."
        ]},
        { type: "h", text: "🏭 안전 채집 포인트" },
        { type: "p", text: "**{allOut}** 이벤트 기간 동안, 안전 채집 포인트를 12시간마다 48시간 동안 교대로 운영합니다." },
        { type: "p", text: "이벤트가 진행되는 동안 모두에게 보호된 채집 장소를 제공합니다." },
        { type: "sub", text: "교대 일정 (UTC 00:00 리셋부터 시작)" },
        { type: "list", items: [
          "{greatMill} – UTC 00:00 ~ 12:00",
          "{greatSawmill} – UTC 12:00 ~ 00:00",
          "{greatQuarry} – UTC 00:00 ~ 12:00",
          "{greatIronMine} – UTC 12:00 ~ 00:00"
        ]},
        { type: "callout", text: "이벤트 기간 동안 이 보호된 장소를 이용하세요. 안전하게, 현명하게 채집하세요." }
      ]},
      de: { title: "Aufs Ganze", blocks: [
        { type: "h", text: "🪖 All-Out-Regeln" },
        { type: "list", items: [
          "❌ Keine Angriffe auf NAP 6, einschließlich ihrer Farmen/Akademien (NXS/nxs, RED/ReD, NBD/nBd/Nbd, ESA/EsA/UNI, IDN, KGb)",
          "❌ Keine Angriffe auf Schlösser oder Allianzgebäude (Hauptquartiere, Außenposten, Banner)",
          "✅ Ihr könnt Ressourcen-Sammelfelder angreifen ({mill}, {quarry}, {ironMine})",
          "✅ Ihr könnt Spieler außerhalb der NAP angreifen."
        ]},
        { type: "list", items: [
          "Wenn euer Schloss von einem NAP-Mitglied angegriffen wird, nicht zurückschlagen — meldet es R4/R5.",
          "Vermeidet das Sammeln in der Wildnis, nutzt stattdessen {securedAllianceNode}.",
          "Regelverstöße werden gemäß den Allianz-/NAP-Vereinbarungen geahndet."
        ]},
        { type: "h", text: "🏭 Gesicherte Sammelpunkte" },
        { type: "p", text: "Während des Events **{allOut}** wechseln wir alle 12 Stunden für 48 Stunden unsere gesicherten Sammelpunkte." },
        { type: "p", text: "So hat jeder während des Events einen geschützten Ort zum Sammeln von Ressourcen." },
        { type: "sub", text: "Rotationsplan (beginnt mit dem 00:00-UTC-Reset)" },
        { type: "list", items: [
          "{greatMill} – 00:00 UTC bis 12:00 UTC",
          "{greatSawmill} – 12:00 UTC bis 00:00 UTC",
          "{greatQuarry} – 00:00 UTC bis 12:00 UTC",
          "{greatIronMine} – 12:00 UTC bis 00:00 UTC"
        ]},
        { type: "callout", text: "Nutzt diese geschützten Orte während des Events. Bleibt sicher und sammelt klug." }
      ]},
      fr: { title: "Tous dehors", blocks: [
        { type: "h", text: "🪖 Règles de Tous dehors" },
        { type: "list", items: [
          "❌ Aucune attaque contre le NAP 6, y compris leurs fermes/académies (NXS/nxs, RED/ReD, NBD/nBd/Nbd, ESA/EsA/UNI, IDN, KGb)",
          "❌ Aucune attaque contre les châteaux ou les bâtiments d'alliance (QG, avant-postes, bannières)",
          "✅ Vous pouvez attaquer les cases de collecte de ressources ({mill}, {quarry}, {ironMine})",
          "✅ Vous pouvez attaquer les joueurs en dehors du NAP."
        ]},
        { type: "list", items: [
          "Si votre château est attaqué par un membre du NAP, ne ripostez pas — informez le R4/R5.",
          "Évitez de récolter des ressources en pleine nature, utilisez plutôt le {securedAllianceNode}.",
          "Les contrevenants seront traités conformément aux accords d'alliance/NAP."
        ]},
        { type: "h", text: "🏭 Points de collecte sécurisés" },
        { type: "p", text: "Pendant l'événement **{allOut}**, nous ferons tourner nos points de collecte sécurisés toutes les 12 heures pendant 48 heures." },
        { type: "p", text: "Cela donne à chacun un endroit protégé pour récolter des ressources pendant que l'événement est actif." },
        { type: "sub", text: "Programme de rotation (à partir de la réinitialisation de 00:00 UTC)" },
        { type: "list", items: [
          "{greatMill} – 00:00 UTC à 12:00 UTC",
          "{greatSawmill} – 12:00 UTC à 00:00 UTC",
          "{greatQuarry} – 00:00 UTC à 12:00 UTC",
          "{greatIronMine} – 12:00 UTC à 00:00 UTC"
        ]},
        { type: "callout", text: "Utilisez ces emplacements protégés pendant l'événement. Restez prudents et récoltez intelligemment." }
      ]},
      pt: { title: "Vai com Tudo", blocks: [
        { type: "h", text: "🪖 Regras do Vai com Tudo" },
        { type: "list", items: [
          "❌ Nenhum ataque ao NAP 6, incluindo suas fazendas/academias (NXS/nxs, RED/ReD, NBD/nBd/Nbd, ESA/EsA/UNI, IDN, KGb)",
          "❌ Nenhum ataque a castelos ou construções da aliança (QGs, postos avançados, bandeiras)",
          "✅ Você pode atacar blocos de coleta de recursos ({mill}, {quarry}, {ironMine})",
          "✅ Você pode atacar jogadores fora do NAP."
        ]},
        { type: "list", items: [
          "Se seu castelo for atacado por um membro do NAP, não revide — avise o R4/R5.",
          "Evite coletar recursos no mapa aberto, use o {securedAllianceNode}.",
          "Quem infringir as regras será tratado conforme os acordos da aliança/NAP."
        ]},
        { type: "h", text: "🏭 Nós de coleta protegidos" },
        { type: "p", text: "Durante o evento **{allOut}**, vamos revezar nossos nós de coleta protegidos a cada 12 horas, por 48 horas." },
        { type: "p", text: "Isso dá a todos um local protegido para coletar recursos enquanto o evento estiver ativo." },
        { type: "sub", text: "Cronograma de revezamento (começando no reset de 00:00 UTC)" },
        { type: "list", items: [
          "{greatMill} – 00:00 UTC às 12:00 UTC",
          "{greatSawmill} – 12:00 UTC às 00:00 UTC",
          "{greatQuarry} – 00:00 UTC às 12:00 UTC",
          "{greatIronMine} – 12:00 UTC às 00:00 UTC"
        ]},
        { type: "callout", text: "Use esses locais protegidos durante o evento. Fique seguro e colete com inteligência." }
      ]},
      es: { title: "Ataque Total", blocks: [
        { type: "h", text: "🪖 Reglas de Ataque Total" },
        { type: "list", items: [
          "❌ No atacar a miembros del NAP 6, incluidas sus granjas/academias (NXS/nxs, RED/ReD, NBD/nBd/Nbd, ESA/EsA/UNI, IDN, KGb)",
          "❌ No atacar castillos ni edificios de alianza (cuarteles generales, puestos avanzados, estandartes)",
          "✅ Puedes atacar casillas de recolección de recursos ({mill}, {quarry}, {ironMine})",
          "✅ Puedes atacar a jugadores fuera del NAP."
        ]},
        { type: "list", items: [
          "Si tu castillo es atacado por un miembro del NAP, no tomes represalias — informa a R4/R5.",
          "Evita recolectar recursos en zona salvaje, usa en su lugar el {securedAllianceNode}.",
          "Quien infrinja las reglas será tratado según los acuerdos de alianza/NAP."
        ]},
        { type: "h", text: "🏭 Puntos de Recolección Seguros" },
        { type: "p", text: "Durante el evento **{allOut}**, rotaremos nuestros puntos de recolección seguros cada 12 horas durante 48 horas." },
        { type: "p", text: "Esto le da a todos un lugar protegido para recolectar recursos mientras el evento está activo." },
        { type: "sub", text: "Horario de rotación (comenzando con el reinicio de 00:00 UTC)" },
        { type: "list", items: [
          "{greatMill} – 00:00 UTC a 12:00 UTC",
          "{greatSawmill} – 12:00 UTC a 00:00 UTC",
          "{greatQuarry} – 00:00 UTC a 12:00 UTC",
          "{greatIronMine} – 12:00 UTC a 00:00 UTC"
        ]},
        { type: "callout", text: "Usa estos lugares protegidos durante el evento. Mantente seguro y recolecta con inteligencia." }
      ]},
      tr: { title: "Topyekün", blocks: [
        { type: "h", text: "🪖 Topyekün Kuralları" },
        { type: "list", items: [
          "❌ NAP 6 üyelerine, çiftlikleri/akademileri dahil saldırı yok (NXS/nxs, RED/ReD, NBD/nBd/Nbd, ESA/EsA/UNI, IDN, KGb)",
          "❌ Şatolara veya ittifak binalarına (karargahlar, ileri karakollar, flamalar) saldırı yok",
          "✅ Kaynak toplama alanlarına saldırabilirsiniz ({mill}, {quarry}, {ironMine})",
          "✅ NAP dışındaki oyunculara saldırabilirsiniz."
        ]},
        { type: "list", items: [
          "Şatonuza bir NAP üyesi tarafından saldırılırsa misilleme yapmayın — R4/R5'e bildirin.",
          "Yabanda kaynak toplamaktan kaçının, bunun yerine {securedAllianceNode} kullanın.",
          "Kural ihlal edenler ittifak/NAP anlaşmalarına göre işlem görecektir."
        ]},
        { type: "h", text: "🏭 Güvenli Toplama Noktaları" },
        { type: "p", text: "**{allOut}** etkinliği boyunca, güvenli toplama noktalarımızı 48 saat boyunca her 12 saatte bir değiştireceğiz." },
        { type: "p", text: "Bu, etkinlik aktifken herkese kaynak toplamak için korumalı bir alan sağlar." },
        { type: "sub", text: "Rotasyon Programı (00:00 UTC sıfırlamasıyla başlar)" },
        { type: "list", items: [
          "{greatMill} – 00:00 UTC - 12:00 UTC",
          "{greatSawmill} – 12:00 UTC - 00:00 UTC",
          "{greatQuarry} – 00:00 UTC - 12:00 UTC",
          "{greatIronMine} – 12:00 UTC - 00:00 UTC"
        ]},
        { type: "callout", text: "Etkinlik boyunca bu korumalı alanları kullanın. Güvende kalın ve akıllıca toplayın." }
      ]},
      id: { title: "Serangan Penuh", blocks: [
        { type: "h", text: "🪖 Aturan Serangan Penuh" },
        { type: "list", items: [
          "❌ Dilarang menyerang anggota NAP 6, termasuk farm/akademi mereka (NXS/nxs, RED/ReD, NBD/nBd/Nbd, ESA/EsA/UNI, IDN, KGb)",
          "❌ Dilarang menyerang kastil atau bangunan aliansi (markas, pos terdepan, spanduk)",
          "✅ Anda boleh menyerang ubin pengumpulan sumber daya ({mill}, {quarry}, {ironMine})",
          "✅ Anda boleh menyerang pemain di luar NAP."
        ]},
        { type: "list", items: [
          "Jika kastil Anda diserang oleh anggota NAP, jangan membalas — laporkan ke R4/R5.",
          "Hindari mengumpulkan sumber daya di area liar, gunakan {securedAllianceNode} sebagai gantinya.",
          "Pelanggar aturan akan ditindak sesuai kesepakatan aliansi/NAP."
        ]},
        { type: "h", text: "🏭 Titik Pengumpulan Aman" },
        { type: "p", text: "Selama event **{allOut}**, kami akan merotasi titik pengumpulan aman setiap 12 jam selama 48 jam." },
        { type: "p", text: "Ini memberi semua orang tempat terlindungi untuk mengumpulkan sumber daya selama event berlangsung." },
        { type: "sub", text: "Jadwal Rotasi (dimulai dari reset 00:00 UTC)" },
        { type: "list", items: [
          "{greatMill} – 00:00 UTC sampai 12:00 UTC",
          "{greatSawmill} – 12:00 UTC sampai 00:00 UTC",
          "{greatQuarry} – 00:00 UTC sampai 12:00 UTC",
          "{greatIronMine} – 12:00 UTC sampai 00:00 UTC"
        ]},
        { type: "callout", text: "Gunakan titik-titik terlindungi ini selama event berlangsung. Tetap aman dan kumpulkan dengan cerdas." }
      ]},
      ru: { title: "Полный вперед", blocks: [
        { type: "h", text: "🪖 Правила события «Полный вперед»" },
        { type: "list", items: [
          "❌ Не атаковать членов NAP 6, включая их фермы/академии (NXS/nxs, RED/ReD, NBD/nBd/Nbd, ESA/EsA/UNI, IDN, KGb)",
          "❌ Не атаковать замки или здания альянса (штабы, форпосты, знамёна)",
          "✅ Можно атаковать участки сбора ресурсов ({mill}, {quarry}, {ironMine})",
          "✅ Можно атаковать игроков вне NAP."
        ]},
        { type: "list", items: [
          "Если ваш замок атаковал участник NAP, не мстите — сообщите R4/R5.",
          "Избегайте сбора ресурсов в дикой местности, используйте вместо этого {securedAllianceNode}.",
          "Нарушители правил будут обработаны согласно соглашениям альянса/NAP."
        ]},
        { type: "h", text: "🏭 Защищённые точки сбора" },
        { type: "p", text: "Во время события **{allOut}** мы будем менять защищённые точки сбора каждые 12 часов в течение 48 часов." },
        { type: "p", text: "Это даёт каждому защищённое место для сбора ресурсов, пока событие активно." },
        { type: "sub", text: "Расписание ротации (начиная со сброса в 00:00 UTC)" },
        { type: "list", items: [
          "{greatMill} – с 00:00 до 12:00 UTC",
          "{greatSawmill} – с 12:00 до 00:00 UTC",
          "{greatQuarry} – с 00:00 до 12:00 UTC",
          "{greatIronMine} – с 12:00 до 00:00 UTC"
        ]},
        { type: "callout", text: "Используйте эти защищённые места во время события. Будьте осторожны и собирайте с умом." }
      ]},
      th: { title: "ลุยเลย", blocks: [
        { type: "h", text: "🪖 กฎกิจกรรมลุยเลย" },
        { type: "list", items: [
          "❌ ห้ามโจมตีสมาชิก NAP 6 รวมถึงฟาร์ม/อาคาเดมีของพวกเขา (NXS/nxs, RED/ReD, NBD/nBd/Nbd, ESA/EsA/UNI, IDN, KGb)",
          "❌ ห้ามโจมตีปราสาทหรืออาคารพันธมิตร (กองบัญชาการ ด่านหน้า ธง)",
          "✅ สามารถโจมตีจุดเก็บทรัพยากรได้ ({mill}, {quarry}, {ironMine})",
          "✅ สามารถโจมตีผู้เล่นที่อยู่นอก NAP ได้"
        ]},
        { type: "list", items: [
          "หากปราสาทของคุณถูกสมาชิก NAP โจมตี อย่าตอบโต้ ให้แจ้ง R4/R5",
          "หลีกเลี่ยงการเก็บทรัพยากรในป่า ให้ใช้{securedAllianceNode}แทน",
          "ผู้ฝ่าฝืนกฎจะถูกดำเนินการตามข้อตกลงพันธมิตร/NAP"
        ]},
        { type: "h", text: "🏭 จุดเก็บทรัพยากรที่ปลอดภัย" },
        { type: "p", text: "ในช่วงกิจกรรม**{allOut}** เราจะสลับจุดเก็บทรัพยากรที่ปลอดภัยทุก 12 ชั่วโมง เป็นเวลา 48 ชั่วโมง" },
        { type: "p", text: "สิ่งนี้ทำให้ทุกคนมีจุดที่ได้รับการป้องกันสำหรับเก็บทรัพยากรในช่วงที่กิจกรรมเปิดใช้งาน" },
        { type: "sub", text: "ตารางการสลับ (เริ่มจากรีเซ็ต 00:00 UTC)" },
        { type: "list", items: [
          "{greatMill} – 00:00 น. ถึง 12:00 น. UTC",
          "{greatSawmill} – 12:00 น. ถึง 00:00 น. UTC",
          "{greatQuarry} – 00:00 น. ถึง 12:00 น. UTC",
          "{greatIronMine} – 12:00 น. ถึง 00:00 น. UTC"
        ]},
        { type: "callout", text: "ใช้จุดที่ได้รับการป้องกันเหล่านี้ในช่วงกิจกรรม ปลอดภัยและเก็บทรัพยากรอย่างชาญฉลาด" }
      ]},
      ar: { title: "جميع القوات تهاجم", blocks: [
        { type: "h", text: "🪖 قواعد فعالية جميع القوات تهاجم" },
        { type: "list", items: [
          "❌ ممنوع مهاجمة أعضاء NAP 6، بما في ذلك مزارعهم/أكاديمياتهم (NXS/nxs، RED/ReD، NBD/nBd/Nbd، ESA/EsA/UNI، IDN، KGb)",
          "❌ ممنوع مهاجمة القلاع أو مباني التحالف (المقرات، المخافر الأمامية، الرايات)",
          "✅ يمكنك مهاجمة نقاط جمع الموارد ({mill}، {quarry}، {ironMine})",
          "✅ يمكنك مهاجمة اللاعبين خارج NAP."
        ]},
        { type: "list", items: [
          "إذا تعرضت قلعتك لهجوم من عضو NAP، لا تنتقم — أبلغ R4/R5.",
          "تجنب جمع الموارد في البرية، واستخدم {securedAllianceNode} بدلاً من ذلك.",
          "سيتم التعامل مع مخالفي القواعد وفقاً لاتفاقيات التحالف/NAP."
        ]},
        { type: "h", text: "🏭 نقاط الجمع الآمنة" },
        { type: "p", text: "خلال فعالية **{allOut}**، سنقوم بتبديل نقاط الجمع الآمنة كل 12 ساعة لمدة 48 ساعة." },
        { type: "p", text: "هذا يمنح الجميع مكاناً محمياً لجمع الموارد أثناء نشاط الفعالية." },
        { type: "sub", text: "جدول التبديل (يبدأ من إعادة التعيين الساعة 00:00 بتوقيت UTC)" },
        { type: "list", items: [
          "{greatMill} – من 00:00 إلى 12:00 بتوقيت UTC",
          "{greatSawmill} – من 12:00 إلى 00:00 بتوقيت UTC",
          "{greatQuarry} – من 00:00 إلى 12:00 بتوقيت UTC",
          "{greatIronMine} – من 12:00 إلى 00:00 بتوقيت UTC"
        ]},
        { type: "callout", text: "استخدم هذه الأماكن المحمية خلال الفعالية. حافظ على سلامتك واجمع بذكاء." }
      ]}
    }
  },
  "fishing-tournament": {
    emoji: "🎣",
    name: {
      en: "Fishing Tournament", zh: "釣魚大賽", ko: "낚시 선수권 대회",
      de: "Fischerturnier", fr: "Tournoi de Pêche", pt: "Torneio de Pesca",
      tr: "Balık Avı Turnuvası", id: "Turnamen Memancing", ru: "Рыболовный турнир",
      th: "ทัวร์นาเมนต์ตกปลา", ar: "مسابقة الصيد", es: "Torneo de Pesca"
    },
    sections: {
      en: { title: "Fishing Tournament", blocks: [
        { type: "h", text: "WHEN" },
        { type: "p", text: "Every 4 weeks." },
        { type: "h", text: "WHY IT MATTERS" },
        { type: "p", text: "A reliable source of {artisansVision}, {heroGear} {enhancementXp} and {gems}." },
        { type: "h", text: "🌊 {oceanProspector}" },
        { type: "p", text: "Use **{oceanProspector} first** to build points and upgrade your {fishingKit} before focusing on {regularFishing}." },
        { type: "list", items: ["**{fishLine}** → Increases maximum line depth", "**{fishHook}** → Increases maximum catch per attempt", "**{fishSinker}** → Increases starting depth"] },
        { type: "p", text: "Once all three are upgraded, move to **{regularFishing}**." },
        { type: "callout", text: "Rare Mermaids and Chests do **not** appear in {regularFishing}. They are exclusive to **{oceanProspector}**." },
        { type: "h", text: "🎣 {regularFishing}" },
        { type: "sub", text: "Glowing Fish" },
        { type: "p", text: "Prioritize every glowing fish you see." },
        { type: "sub", text: "{strugglingMermaid}" },
        { type: "p", text: "Mermaids trapped in seaweed provide a **5–10% point multiplier**." },
        { type: "sub", text: "{hornOfTheTide}" },
        { type: "p", text: "Use it during **{regularFishing} only**." },
        { type: "h", text: "RETRYING A RUN" },
        { type: "p", text: "If a run goes badly:" },
        { type: "p", text: "**Pause → {retreat} → Retry**" }
      ]},
      zh: { title: "釣魚大賽", blocks: [
        { type: "h", text: "開放時間" },
        { type: "p", text: "每 4 週一次。" },
        { type: "h", text: "為什麼重要" },
        { type: "p", text: "穩定取得{artisansVision}、{heroGear}{enhancementXp}與{gems}的來源。" },
        { type: "h", text: "🌊 {oceanProspector}" },
        { type: "p", text: "**先玩{oceanProspector}**累積積分、升級{fishingKit}，之後再專心{regularFishing}。" },
        { type: "list", items: ["**{fishLine}** → 增加最大深度", "**{fishHook}** → 增加每次最多可釣的數量", "**{fishSinker}** → 增加起始深度"] },
        { type: "p", text: "三項都升級完後，再轉往**{regularFishing}**。" },
        { type: "callout", text: "稀有的美人魚和寶箱**不會**出現在{regularFishing}，只會出現在**{oceanProspector}**。" },
        { type: "h", text: "🎣 {regularFishing}" },
        { type: "sub", text: "發光的魚" },
        { type: "p", text: "看到發光的魚一律優先釣。" },
        { type: "sub", text: "{strugglingMermaid}" },
        { type: "p", text: "被海草困住的美人魚可提供 **5–10% 的積分倍率**。" },
        { type: "sub", text: "{hornOfTheTide}" },
        { type: "p", text: "**只在{regularFishing}時**使用。" },
        { type: "h", text: "重新挑戰" },
        { type: "p", text: "如果這一局打得不好：" },
        { type: "p", text: "**暫停 → {retreat} → 重試**" }
      ]},
      ko: { title: "낚시 선수권 대회", blocks: [
        { type: "h", text: "개최 시기" },
        { type: "p", text: "4주마다 진행됩니다." },
        { type: "h", text: "중요한 이유" },
        { type: "p", text: "{artisansVision}, {heroGear} {enhancementXp}, {gems}의 안정적인 수급처입니다." },
        { type: "h", text: "🌊 {oceanProspector}" },
        { type: "p", text: "{regularFishing}에 집중하기 전에 **먼저 {oceanProspector}**에서 포인트를 쌓고 {fishingKit}를 업그레이드하세요." },
        { type: "list", items: ["**{fishLine}** → 최대 깊이 증가", "**{fishHook}** → 1회당 최대 포획 수 증가", "**{fishSinker}** → 시작 깊이 증가"] },
        { type: "p", text: "세 가지를 모두 업그레이드했다면 **{regularFishing}**로 넘어가세요." },
        { type: "callout", text: "희귀 인어와 보물상자는 {regularFishing}에서 **나오지 않습니다**. **{oceanProspector}** 전용입니다." },
        { type: "h", text: "🎣 {regularFishing}" },
        { type: "sub", text: "빛나는 물고기" },
        { type: "p", text: "빛나는 물고기가 보이면 무조건 우선으로 잡으세요." },
        { type: "sub", text: "{strugglingMermaid}" },
        { type: "p", text: "해초에 갇힌 인어는 **5–10% 포인트 배율**을 제공합니다." },
        { type: "sub", text: "{hornOfTheTide}" },
        { type: "p", text: "**{regularFishing}에서만** 사용하세요." },
        { type: "h", text: "다시 도전하기" },
        { type: "p", text: "한 판이 잘 풀리지 않았다면:" },
        { type: "p", text: "**일시정지 → {retreat} → 다시 시도**" }
      ]},
      de: { title: "Fischerturnier", blocks: [
        { type: "h", text: "WANN" },
        { type: "p", text: "Alle 4 Wochen." },
        { type: "h", text: "WARUM ES WICHTIG IST" },
        { type: "p", text: "Zuverlässige Quelle für {artisansVision}, {enhancementXp} für {heroGear} und {gems}." },
        { type: "h", text: "🌊 {oceanProspector}" },
        { type: "p", text: "Spiele **zuerst {oceanProspector}**, um Punkte zu sammeln und deine {fishingKit} zu verbessern, bevor du dich auf {regularFishing} konzentrierst." },
        { type: "list", items: ["**{fishLine}** → Erhöht die maximale Tiefe", "**{fishHook}** → Erhöht den maximalen Fang pro Versuch", "**{fishSinker}** → Erhöht die Starttiefe"] },
        { type: "p", text: "Sobald alle drei verbessert sind, wechsle zu **{regularFishing}**." },
        { type: "callout", text: "Seltene Meerjungfrauen und Truhen erscheinen **nicht** beim {regularFishing}. Es gibt sie nur bei **{oceanProspector}**." },
        { type: "h", text: "🎣 {regularFishing}" },
        { type: "sub", text: "Leuchtende Fische" },
        { type: "p", text: "Priorisiere jeden leuchtenden Fisch, den du siehst." },
        { type: "sub", text: "{strugglingMermaid}" },
        { type: "p", text: "In Seetang gefangene Meerjungfrauen geben einen **Punkte-Multiplikator von 5–10 %**." },
        { type: "sub", text: "{hornOfTheTide}" },
        { type: "p", text: "Nur beim **{regularFishing}** einsetzen." },
        { type: "h", text: "VERSUCH WIEDERHOLEN" },
        { type: "p", text: "Wenn ein Versuch schlecht läuft:" },
        { type: "p", text: "**Pause → {retreat} → Erneut versuchen**" }
      ]},
      fr: { title: "Tournoi de Pêche", blocks: [
        { type: "h", text: "QUAND" },
        { type: "p", text: "Toutes les 4 semaines." },
        { type: "h", text: "POURQUOI C'EST IMPORTANT" },
        { type: "p", text: "Une source fiable de {artisansVision}, d'{enhancementXp} d'{heroGear} et de {gems}." },
        { type: "h", text: "🌊 {oceanProspector}" },
        { type: "p", text: "Commence **d'abord par le {oceanProspector}** pour accumuler des points et améliorer ton {fishingKit} avant de te concentrer sur la {regularFishing}." },
        { type: "list", items: ["**{fishLine}** → Augmente la profondeur maximale", "**{fishHook}** → Augmente les prises maximales par tentative", "**{fishSinker}** → Augmente la profondeur de départ"] },
        { type: "p", text: "Une fois les trois améliorés, passe à la **{regularFishing}**." },
        { type: "callout", text: "Les Sirènes et Coffres rares n'apparaissent **pas** en {regularFishing}. Ils sont exclusifs au **{oceanProspector}**." },
        { type: "h", text: "🎣 {regularFishing}" },
        { type: "sub", text: "Poissons lumineux" },
        { type: "p", text: "Priorise chaque poisson lumineux que tu vois." },
        { type: "sub", text: "{strugglingMermaid}" },
        { type: "p", text: "Les sirènes prises dans les algues donnent un **multiplicateur de points de 5 à 10 %**." },
        { type: "sub", text: "{hornOfTheTide}" },
        { type: "p", text: "À utiliser **uniquement en {regularFishing}**." },
        { type: "h", text: "RECOMMENCER UNE PARTIE" },
        { type: "p", text: "Si une partie se passe mal :" },
        { type: "p", text: "**Pause → {retreat} → Réessayer**" }
      ]},
      pt: { title: "Torneio de Pesca", blocks: [
        { type: "h", text: "QUANDO" },
        { type: "p", text: "A cada 4 semanas." },
        { type: "h", text: "POR QUE IMPORTA" },
        { type: "p", text: "Fonte confiável de {artisansVision}, {enhancementXp} de {heroGear} e {gems}." },
        { type: "h", text: "🌊 {oceanProspector}" },
        { type: "p", text: "Jogue **primeiro a {oceanProspector}** para acumular pontos e aprimorar seu {fishingKit} antes de focar na {regularFishing}." },
        { type: "list", items: ["**{fishLine}** → Aumenta a profundidade máxima", "**{fishHook}** → Aumenta a captura máxima por tentativa", "**{fishSinker}** → Aumenta a profundidade inicial"] },
        { type: "p", text: "Depois de aprimorar os três, passe para a **{regularFishing}**." },
        { type: "callout", text: "Sereias e Baús raros **não** aparecem na {regularFishing}. São exclusivos da **{oceanProspector}**." },
        { type: "h", text: "🎣 {regularFishing}" },
        { type: "sub", text: "Peixes brilhantes" },
        { type: "p", text: "Priorize todo peixe brilhante que você vir." },
        { type: "sub", text: "{strugglingMermaid}" },
        { type: "p", text: "Sereias presas nas algas dão um **multiplicador de pontos de 5–10%**." },
        { type: "sub", text: "{hornOfTheTide}" },
        { type: "p", text: "Use **somente na {regularFishing}**." },
        { type: "h", text: "REPETIR UMA RODADA" },
        { type: "p", text: "Se uma rodada der errado:" },
        { type: "p", text: "**Pausar → {retreat} → Tentar de novo**" }
      ]},
      tr: { title: "Balık Avı Turnuvası", blocks: [
        { type: "h", text: "NE ZAMAN" },
        { type: "p", text: "Her 4 haftada bir." },
        { type: "h", text: "NEDEN ÖNEMLİ" },
        { type: "p", text: "{artisansVision}, {heroGear} {enhancementXp} ve {gems} için güvenilir bir kaynak." },
        { type: "h", text: "🌊 {oceanProspector}" },
        { type: "p", text: "**Önce {oceanProspector}** oyna: puan topla ve {fishingKit} yükselt. Ardından {regularFishing} kısmına odaklan." },
        { type: "list", items: ["**{fishLine}** → Maksimum derinliği artırır", "**{fishHook}** → Deneme başına maksimum avı artırır", "**{fishSinker}** → Başlangıç derinliğini artırır"] },
        { type: "p", text: "Üçü de yükseltildiğinde **{regularFishing}** kısmına geç." },
        { type: "callout", text: "Nadir Deniz Kızları ve Sandıklar {regularFishing} kısmında **çıkmaz**; yalnızca **{oceanProspector}** içinde bulunur." },
        { type: "h", text: "🎣 {regularFishing}" },
        { type: "sub", text: "Parlayan Balıklar" },
        { type: "p", text: "Gördüğün her parlayan balığa öncelik ver." },
        { type: "sub", text: "{strugglingMermaid}" },
        { type: "p", text: "Deniz yosununa sıkışmış deniz kızları **%5–10 puan çarpanı** verir." },
        { type: "sub", text: "{hornOfTheTide}" },
        { type: "p", text: "**Yalnızca {regularFishing}** sırasında kullan." },
        { type: "h", text: "TURU TEKRARLAMA" },
        { type: "p", text: "Bir tur kötü giderse:" },
        { type: "p", text: "**Duraklat → {retreat} → Tekrar dene**" }
      ]},
      id: { title: "Turnamen Memancing", blocks: [
        { type: "h", text: "KAPAN" },
        { type: "p", text: "Setiap 4 minggu." },
        { type: "h", text: "KENAPA PENTING" },
        { type: "p", text: "Sumber andal untuk {artisansVision}, {enhancementXp} {heroGear}, dan {gems}." },
        { type: "h", text: "🌊 {oceanProspector}" },
        { type: "p", text: "Mainkan **{oceanProspector} terlebih dahulu** untuk mengumpulkan poin dan meningkatkan {fishingKit} sebelum fokus ke {regularFishing}." },
        { type: "list", items: ["**{fishLine}** → Menambah kedalaman maksimum", "**{fishHook}** → Menambah hasil tangkapan maksimum per percobaan", "**{fishSinker}** → Menambah kedalaman awal"] },
        { type: "p", text: "Setelah ketiganya ditingkatkan, pindah ke **{regularFishing}**." },
        { type: "callout", text: "Putri Duyung dan Peti langka **tidak** muncul di {regularFishing}. Keduanya hanya ada di **{oceanProspector}**." },
        { type: "h", text: "🎣 {regularFishing}" },
        { type: "sub", text: "Ikan Bercahaya" },
        { type: "p", text: "Prioritaskan setiap ikan bercahaya yang kamu lihat." },
        { type: "sub", text: "{strugglingMermaid}" },
        { type: "p", text: "Putri duyung yang terjebak rumput laut memberikan **pengali poin 5–10%**." },
        { type: "sub", text: "{hornOfTheTide}" },
        { type: "p", text: "Gunakan **hanya saat {regularFishing}**." },
        { type: "h", text: "MENGULANG PERCOBAAN" },
        { type: "p", text: "Jika percobaan berjalan buruk:" },
        { type: "p", text: "**Jeda → {retreat} → Coba lagi**" }
      ]},
      ru: { title: "Рыболовный турнир", blocks: [
        { type: "h", text: "КОГДА" },
        { type: "p", text: "Каждые 4 недели." },
        { type: "h", text: "ПОЧЕМУ ЭТО ВАЖНО" },
        { type: "p", text: "Надёжный источник: {artisansVision}, {enhancementXp} ({heroGear}), {gems}." },
        { type: "h", text: "🌊 {oceanProspector}" },
        { type: "p", text: "**Сначала** играйте в режиме «{oceanProspector}», чтобы набрать очки и улучшить {fishingKit}, и только потом переходите к режиму «{regularFishing}»." },
        { type: "list", items: ["**{fishLine}** → увеличивает максимальную глубину", "**{fishHook}** → увеличивает максимальный улов за попытку", "**{fishSinker}** → увеличивает начальную глубину"] },
        { type: "p", text: "Когда все три улучшены, переходите к режиму **«{regularFishing}»**." },
        { type: "callout", text: "Редкие русалки и сундуки **не** появляются в режиме «{regularFishing}». Они есть только в **«{oceanProspector}»**." },
        { type: "h", text: "🎣 {regularFishing}" },
        { type: "sub", text: "Светящиеся рыбы" },
        { type: "p", text: "В первую очередь ловите каждую светящуюся рыбу." },
        { type: "sub", text: "{strugglingMermaid}" },
        { type: "p", text: "Русалки, запутавшиеся в водорослях, дают **множитель очков 5–10%**." },
        { type: "sub", text: "{hornOfTheTide}" },
        { type: "p", text: "Используйте **только в режиме «{regularFishing}»**." },
        { type: "h", text: "ПОВТОР ЗАХОДА" },
        { type: "p", text: "Если заход идёт плохо:" },
        { type: "p", text: "**Пауза → {retreat} → Повторить**" }
      ]},
      th: { title: "ทัวร์นาเมนต์ตกปลา", blocks: [
        { type: "h", text: "เมื่อไหร่" },
        { type: "p", text: "ทุก 4 สัปดาห์" },
        { type: "h", text: "ทำไมถึงสำคัญ" },
        { type: "p", text: "แหล่งได้รับ{artisansVision} {enhancementXp}ของ{heroGear} และ{gems}ที่เชื่อถือได้" },
        { type: "h", text: "🌊 {oceanProspector}" },
        { type: "p", text: "เล่น**{oceanProspector}ก่อน** เพื่อสะสมคะแนนและอัปเกรด{fishingKit} แล้วค่อยโฟกัสที่{regularFishing}" },
        { type: "list", items: ["**{fishLine}** → เพิ่มความลึกสูงสุด", "**{fishHook}** → เพิ่มจำนวนปลาสูงสุดที่จับได้ต่อครั้ง", "**{fishSinker}** → เพิ่มความลึกเริ่มต้น"] },
        { type: "p", text: "เมื่ออัปเกรดครบทั้งสามอย่างแล้ว ให้ไปที่**{regularFishing}**" },
        { type: "callout", text: "นางเงือกและหีบหายาก**ไม่**ปรากฏใน{regularFishing} จะพบได้เฉพาะใน**{oceanProspector}**เท่านั้น" },
        { type: "h", text: "🎣 {regularFishing}" },
        { type: "sub", text: "ปลาเรืองแสง" },
        { type: "p", text: "เห็นปลาเรืองแสงตัวไหน ให้จับตัวนั้นก่อนเสมอ" },
        { type: "sub", text: "{strugglingMermaid}" },
        { type: "p", text: "นางเงือกที่ติดสาหร่ายจะให้**ตัวคูณคะแนน 5–10%**" },
        { type: "sub", text: "{hornOfTheTide}" },
        { type: "p", text: "ใช้**เฉพาะตอน{regularFishing}**เท่านั้น" },
        { type: "h", text: "เริ่มรอบใหม่" },
        { type: "p", text: "ถ้ารอบนั้นไม่ดี:" },
        { type: "p", text: "**หยุดชั่วคราว → {retreat} → ลองใหม่**" }
      ]},
      ar: { title: "مسابقة الصيد", blocks: [
        { type: "h", text: "متى" },
        { type: "p", text: "كل 4 أسابيع." },
        { type: "h", text: "لماذا هي مهمة" },
        { type: "p", text: "مصدر موثوق لكلٍّ من: {artisansVision}، و{enhancementXp} ({heroGear})، و{gems}." },
        { type: "h", text: "🌊 {oceanProspector}" },
        { type: "p", text: "استخدم **{oceanProspector} أولاً** لجمع النقاط وترقية {fishingKit} قبل التركيز على {regularFishing}." },
        { type: "list", items: ["**{fishLine}** ← يزيد أقصى عمق", "**{fishHook}** ← يزيد أقصى صيد في كل محاولة", "**{fishSinker}** ← يزيد عمق البداية"] },
        { type: "p", text: "بعد ترقية الثلاثة، انتقل إلى **{regularFishing}**." },
        { type: "callout", text: "حوريات البحر والصناديق النادرة **لا** تظهر في {regularFishing}، بل تقتصر على **{oceanProspector}**." },
        { type: "h", text: "🎣 {regularFishing}" },
        { type: "sub", text: "الأسماك المتوهجة" },
        { type: "p", text: "اصطد كل سمكة متوهجة تراها أولاً." },
        { type: "sub", text: "{strugglingMermaid}" },
        { type: "p", text: "حوريات البحر العالقة في الأعشاب البحرية تمنح **مضاعف نقاط بنسبة 5–10%**." },
        { type: "sub", text: "{hornOfTheTide}" },
        { type: "p", text: "استخدمه **في {regularFishing} فقط**." },
        { type: "h", text: "إعادة المحاولة" },
        { type: "p", text: "إذا سارت الجولة بشكل سيئ:" },
        { type: "p", text: "**إيقاف مؤقت ← {retreat} ← إعادة المحاولة**" }
      ]},
      es: { title: "Torneo de Pesca", blocks: [
        { type: "h", text: "CUÁNDO" },
        { type: "p", text: "Cada 4 semanas." },
        { type: "h", text: "POR QUÉ IMPORTA" },
        { type: "p", text: "Una fuente fiable de {artisansVision}, {enhancementXp} de {heroGear} y {gems}." },
        { type: "h", text: "🌊 {oceanProspector}" },
        { type: "p", text: "Juega **primero {oceanProspector}** para acumular puntos y mejorar tu {fishingKit} antes de centrarte en la {regularFishing}." },
        { type: "list", items: ["**{fishLine}** → Aumenta la profundidad máxima", "**{fishHook}** → Aumenta la captura máxima por intento", "**{fishSinker}** → Aumenta la profundidad inicial"] },
        { type: "p", text: "Cuando los tres estén mejorados, pasa a la **{regularFishing}**." },
        { type: "callout", text: "Las Sirenas y Cofres raros **no** aparecen en la {regularFishing}. Son exclusivos de **{oceanProspector}**." },
        { type: "h", text: "🎣 {regularFishing}" },
        { type: "sub", text: "Peces brillantes" },
        { type: "p", text: "Prioriza cada pez brillante que veas." },
        { type: "sub", text: "{strugglingMermaid}" },
        { type: "p", text: "Las sirenas atrapadas en algas dan un **multiplicador de puntos del 5–10 %**." },
        { type: "sub", text: "{hornOfTheTide}" },
        { type: "p", text: "Úsalo **solo en la {regularFishing}**." },
        { type: "h", text: "REPETIR UNA PARTIDA" },
        { type: "p", text: "Si una partida va mal:" },
        { type: "p", text: "**Pausa → {retreat} → Reintentar**" }
      ]}
    }
  },
  "tri-alliance-clash": {
    emoji: "🔱",
    name: { en: "Tri-Alliance Clash", zh: "三盟爭霸", ko: "삼대 연맹전", de: "Drei-Allianz-Wettkampf", fr: "Conflit Tri-Alliance", pt: "Confronto Tri-Aliança", es: "Choque de Tres Alianzas", tr: "Üçlü İttifak Çarpışması", id: "Clash Tiga Aliansi", ru: "Битва трех альянсов", th: "สงครามสามพันธมิตร", ar: "صراع التحالف الثلاثي" },
    sections: {
      en: { title: "Tri-Alliance Clash", blocks: [
        { type: "h", text: "EVENT OVERVIEW & PHASES" },
        { type: "p", text: "A 3-way territorial battle on a shared map: 60 minutes in total, split into 4 phases." },
        { type: "sub", text: "Phase 1: {tacPreparations} (0:00–3:00)" },
        { type: "p", text: "Set up squad formations, join Voice Chat and assign starting roles." },
        { type: "sub", text: "Phase 2: {seizeConquer} (3:00–20:00)" },
        { type: "p", text: "Quickly capture your own territory, lock down the {transitHub} and connector buildings, and build steady points per minute (PPM). The {tacGarrison} are still shielded." },
        { type: "sub", text: "Phase 3: {garrisonOccupation} (20:00–40:00)" },
        { type: "p", text: "Shields drop on the {tacGarrison} (A24, B24, C24). Defend your own (+1,800 PPM) while launching coordinated strikes on the enemy ones." },
        { type: "sub", text: "Phase 4: {templeOnslaught} (40:00–60:00)" },
        { type: "p", text: "The {templeOfTides} in the centre opens. It gives huge points, plus a 50,000-point bonus to whoever holds it at the final buzzer." },
        { type: "h", text: "ROLES & TEAM SETUP (30-PLAYER LEGION)" },
        { type: "list", items: [
          "**6× Lane Anchors (whales / top spenders):** spearhead pushes into key points and hold the busiest frontlines.",
          "**12× Lane Supporters (F2P / low spenders):** stay right behind the Anchors to hold captured buildings, rotate healing and stop enemy flank pushes.",
          "**6× Reaction Players (mid spenders / active F2P):** mobile unit — take neutral centre buildings early, retake lost points and fill defensive gaps.",
          "**6× Strike Team (P2W heavy hitters):** move as one unit to punch through weak enemy lanes and hit their backline."
        ]},
        { type: "h", text: "GEN 3 HEROES & SQUAD PRESETS" },
        { type: "p", text: "Prepare 3 different squads in advance." },
        { type: "callout", text: "Avoid gathering heroes (e.g. {diana}) and Blue/Green heroes." },
        { type: "list", items: [
          "**Squad 1 – Main Assault:** your top combat power, for contested {tacGarrison} and the {templeOfTides}.",
          "**Squad 2 – Lane Holding:** stable defensive stats for holding key points and connectors.",
          "**Squad 3 – Flexible / Speed:** fast mobility for neutral buildings, flanking and retaking routes."
        ]},
        { type: "h", text: "ENERGY & CAPTAINS" },
        { type: "p", text: "{tacEnergy} is needed to move, fight, heal ({tacConscript}) and retreat. **Running out of Energy makes you useless** — manage it carefully." },
        { type: "p", text: "R4/R5 must appoint a {tacCaptain} in every captured building right away. Captains regenerate Energy much faster — give the role to the most active players and to Lane Anchors in high-level buildings." },
        { type: "h", text: "F2P STRATEGY" },
        { type: "sub", text: "Support & healing rotation" },
        { type: "p", text: "Never fight until you are defeated. When wounded, retreat to a safe nearby building, press **{tacConscript}** (heart + icon) to heal without dying, then go back. This saves a lot of Energy and the walk from the {tacHeadquarters}." },
        { type: "sub", text: "Connector denial" },
        { type: "p", text: "F2P players should hold the {transitHub} connector buildings (A29, B29, C29). Cutting enemy approach paths stops their attack squads from being reinforced." },
        { type: "sub", text: "Energy discipline" },
        { type: "p", text: "Don't spend Energy pushing alone deep into enemy territory. Save it for the big phase changes at 20:00 ({tacGarrison}) and 40:00 ({templeOfTides})." },
        { type: "h", text: "P2W / WHALE STRATEGY" },
        { type: "sub", text: "Frontline anchor duty" },
        { type: "p", text: "Take point on high-value buildings. Once secured, step back so supporters can stack the building while you retreat, {tacConscript} and regain Energy." },
        { type: "sub", text: "Targeted {tacGarrison} raids" },
        { type: "p", text: "At 20:00, coordinate with the Strike Team to blitz a poorly defended enemy Garrison while its defenders are busy on the flanks." },
        { type: "sub", text: "{templeOfTides} stacking (40:00–60:00)" },
        { type: "p", text: "At minute 40, push the {templeOfTides} as one wave. Stack **11+ marches** inside to secure maximum defense before the final buzzer at minute 60." },
        { type: "h", text: "KEY RULES FOR VICTORY" },
        { type: "list", items: [
          "**Never push alone:** always move as paired lanes (Anchor + Supporters).",
          "**Voice Chat callouts:** officers must call rotations early.",
          "**Save buffs:** activate pet buffs and city attack/defense bonuses right before Phase 1. March speed and deployment capacity bonuses don't work on the battlefield."
        ]}
      ]},
      zh: { title: "三盟爭霸", blocks: [
        { type: "h", text: "活動概覽與階段" },
        { type: "p", text: "三個聯盟在同一張地圖上爭奪領地，全程60分鐘，分為4個階段。" },
        { type: "sub", text: "第1階段：{tacPreparations}（0:00–3:00）" },
        { type: "p", text: "設定部隊編組、加入語音頻道，並分配初始職責。" },
        { type: "sub", text: "第2階段：{seizeConquer}（3:00–20:00）" },
        { type: "p", text: "快速佔領自家領地，鎖住{transitHub}等連接建築，穩定累積每分鐘積分（PPM）。此時{tacGarrison}仍有護盾。" },
        { type: "sub", text: "第3階段：{garrisonOccupation}（20:00–40:00）" },
        { type: "p", text: "{tacGarrison}（A24、B24、C24）護盾解除。守住自家的{tacGarrison}（每分鐘+1,800），同時協同進攻敵方的{tacGarrison}。" },
        { type: "sub", text: "第4階段：{templeOnslaught}（40:00–60:00）" },
        { type: "p", text: "中央的{templeOfTides}開放。積分極高，結束時的佔領者還能額外獲得50,000分。" },
        { type: "h", text: "職責與隊伍配置（每軍團30人）" },
        { type: "list", items: [
          "**6名 路線主力（大課／高課）：**帶頭推進關鍵點，守住交戰最激烈的前線。",
          "**12名 路線支援（免費／小課）：**緊跟在主力後方，守住已佔領的建築、輪流治療，並阻止敵人從側翼推進。",
          "**6名 機動隊（中課／活躍的免費玩家）：**早期搶佔中央的中立建築、奪回失守的據點、補上防守漏洞。",
          "**6名 突擊隊（重課玩家）：**集體行動，突破敵方較弱的路線並騷擾後方。"
        ]},
        { type: "h", text: "第3代英雄與部隊預設" },
        { type: "p", text: "事先準備好3支不同的部隊。" },
        { type: "callout", text: "避免使用採集英雄（例如{diana}）以及藍色／綠色英雄。" },
        { type: "list", items: [
          "**部隊1 – 主攻：**戰力最強，用來爭奪{tacGarrison}和{templeOfTides}。",
          "**部隊2 – 守線：**防禦屬性穩定，用來守住關鍵點與連接建築。",
          "**部隊3 – 機動：**行動快速，用來搶中立建築、包抄和奪回路線。"
        ]},
        { type: "h", text: "能量與指揮官" },
        { type: "p", text: "移動、戰鬥、{tacConscript}（治療）和撤退都需要{tacEnergy}。**{tacEnergy}用完就什麼都做不了**，請謹慎分配。" },
        { type: "p", text: "R4／R5 必須在每個佔領的建築立刻任命{tacCaptain}。{tacCaptain}回復{tacEnergy}的速度快很多，請把這個職位交給最活躍的玩家，以及高等級建築裡的路線主力。" },
        { type: "h", text: "免費玩家策略" },
        { type: "sub", text: "支援與治療輪替" },
        { type: "p", text: "不要打到部隊全滅。受傷時先撤到附近安全的建築，按「{tacConscript}」（愛心＋圖示）在不陣亡的情況下回血，再回到前線。這能省下大量{tacEnergy}，也不用從{tacHeadquarters}重新走過來。" },
        { type: "sub", text: "封鎖連接點" },
        { type: "p", text: "免費玩家應負責守住{transitHub}這類連接建築（A29、B29、C29）。切斷敵方的進攻路線，他們的突擊部隊就無法得到增援。" },
        { type: "sub", text: "能量紀律" },
        { type: "p", text: "不要把{tacEnergy}浪費在單獨深入敵境。留到20:00（{tacGarrison}）和40:00（{templeOfTides}）這兩個階段轉換時再用。" },
        { type: "h", text: "課金玩家策略" },
        { type: "sub", text: "前線主力" },
        { type: "p", text: "由大課玩家帶頭爭奪高價值建築。佔領後退到後方，讓支援玩家進駐補滿，自己撤退、{tacConscript}並回復{tacEnergy}。" },
        { type: "sub", text: "定點突襲{tacGarrison}" },
        { type: "p", text: "20:00時與突擊隊配合，趁敵方守軍被側翼牽制時，突襲防守薄弱的敵方{tacGarrison}。" },
        { type: "sub", text: "堆疊{templeOfTides}（40:00–60:00）" },
        { type: "p", text: "第40分鐘時全員一波推進{templeOfTides}。在第60分鐘結束前，堆疊**11支以上的部隊**進駐，確保防守最大化。" },
        { type: "h", text: "勝利關鍵" },
        { type: "list", items: [
          "**絕不單獨推進：**一律以成對路線行動（主力＋支援）。",
          "**語音指揮：**幹部要提早呼叫輪替。",
          "**保留增益：**在第1階段開始前開啟寵物增益與城鎮攻擊／防禦加成。行軍速度和部署容量加成在戰場上無效。"
        ]}
      ]},
      ko: { title: "삼대 연맹전", blocks: [
        { type: "h", text: "이벤트 개요 및 단계" },
        { type: "p", text: "세 연맹이 하나의 맵에서 영토를 다투는 전투로, 총 60분이며 4단계로 나뉩니다." },
        { type: "sub", text: "1단계: {tacPreparations} (0:00–3:00)" },
        { type: "p", text: "부대 편성을 설정하고, 음성 채팅에 참여하고, 초기 역할을 배정하세요." },
        { type: "sub", text: "2단계: {seizeConquer} (3:00–20:00)" },
        { type: "p", text: "아군 영역을 빠르게 점령하고 {transitHub} 등 연결 건물을 확보해 분당 포인트(PPM)를 꾸준히 쌓으세요. 이때 {tacGarrison}은 아직 보호막 상태입니다." },
        { type: "sub", text: "3단계: {garrisonOccupation} (20:00–40:00)" },
        { type: "p", text: "{tacGarrison}(A24, B24, C24)의 보호막이 사라집니다. 아군 {tacGarrison}(분당 +1,800)을 지키면서 적 {tacGarrison}에 협공을 가하세요." },
        { type: "sub", text: "4단계: {templeOnslaught} (40:00–60:00)" },
        { type: "p", text: "중앙의 {templeOfTides}이 열립니다. 포인트가 매우 높고, 종료 시점에 점령 중인 쪽은 50,000포인트 보너스를 받습니다." },
        { type: "h", text: "역할 및 팀 구성 (군단 30명)" },
        { type: "list", items: [
          "**6명 라인 앵커 (고과금):** 핵심 지점 돌파를 이끌고 가장 치열한 전선을 지킵니다.",
          "**12명 라인 서포터 (무과금/소과금):** 앵커 바로 뒤에서 점령한 건물을 지키고, 교대로 치료하며, 적의 측면 돌파를 막습니다.",
          "**6명 대응조 (중과금/활동적인 무과금):** 기동 부대로 초반에 중앙 중립 건물을 점령하고, 빼앗긴 거점을 되찾고, 방어 공백을 메웁니다.",
          "**6명 돌격대 (고과금 딜러):** 한 팀으로 움직여 약한 적 라인을 뚫고 후방을 교란합니다."
        ]},
        { type: "h", text: "3세대 영웅 및 부대 프리셋" },
        { type: "p", text: "3개의 부대를 미리 준비하세요." },
        { type: "callout", text: "채집 영웅(예: {diana})과 파란색/초록색 영웅은 피하세요." },
        { type: "list", items: [
          "**부대 1 – 주력 공격:** 최고 전투력으로 {tacGarrison}과 {templeOfTides} 쟁탈에 사용합니다.",
          "**부대 2 – 라인 유지:** 안정적인 방어 능력치로 핵심 지점과 연결 건물을 지킵니다.",
          "**부대 3 – 기동:** 빠른 이동으로 중립 건물 점령, 우회, 경로 탈환에 사용합니다."
        ]},
        { type: "h", text: "에너지 및 지휘관" },
        { type: "p", text: "이동, 전투, {tacConscript}(치료), 철수에는 모두 {tacEnergy}가 필요합니다. **{tacEnergy}가 떨어지면 아무것도 할 수 없습니다** — 신중하게 관리하세요." },
        { type: "p", text: "R4/R5는 점령한 건물마다 즉시 {tacCaptain}을 임명해야 합니다. {tacCaptain}은 {tacEnergy}를 훨씬 빠르게 회복하므로, 가장 활발한 플레이어와 고레벨 건물의 라인 앵커에게 맡기세요." },
        { type: "h", text: "무과금 전략" },
        { type: "sub", text: "서포트 및 치료 교대" },
        { type: "p", text: "전멸할 때까지 싸우지 마세요. 부상을 입으면 근처 안전한 건물로 물러나 **{tacConscript}**(하트 + 아이콘)를 눌러 쓰러지지 않고 회복한 뒤 복귀하세요. {tacEnergy}와 {tacHeadquarters}에서 걸어오는 시간을 크게 아낄 수 있습니다." },
        { type: "sub", text: "연결 거점 차단" },
        { type: "p", text: "무과금 플레이어는 {transitHub} 연결 건물(A29, B29, C29)을 지키세요. 적의 진입로를 끊으면 적 돌격 부대가 지원을 받지 못합니다." },
        { type: "sub", text: "에너지 관리" },
        { type: "p", text: "혼자 적진 깊숙이 들어가 {tacEnergy}를 낭비하지 마세요. 20:00({tacGarrison})과 40:00({templeOfTides})의 큰 단계 전환 때를 위해 아껴 두세요." },
        { type: "h", text: "과금 유저 전략" },
        { type: "sub", text: "전선 앵커" },
        { type: "p", text: "고가치 건물 쟁탈에 앞장서세요. 확보한 뒤에는 서포터가 건물을 채울 수 있도록 뒤로 빠져 철수하고, {tacConscript}로 회복하며 {tacEnergy}를 채우세요." },
        { type: "sub", text: "{tacGarrison} 기습" },
        { type: "p", text: "20:00에 돌격대와 협력해, 적 수비대가 측면에 묶여 있는 사이 방어가 약한 적 {tacGarrison}을 급습하세요." },
        { type: "sub", text: "{templeOfTides} 스택 (40:00–60:00)" },
        { type: "p", text: "40분에 {templeOfTides}으로 한 번에 밀고 들어가세요. 60분 종료 전까지 **11개 이상의 부대**를 주둔시켜 방어를 최대로 만드세요." },
        { type: "h", text: "승리를 위한 핵심 규칙" },
        { type: "list", items: [
          "**절대 혼자 밀지 마세요:** 항상 짝을 이룬 라인(앵커 + 서포터)으로 움직이세요.",
          "**음성 콜:** 간부는 교대를 미리 지시해야 합니다.",
          "**버프 아껴두기:** 1단계 시작 직전에 펫 버프와 도시 공격/방어 버프를 켜세요. 행군 속도와 부대 수용량 버프는 전장에서 적용되지 않습니다."
        ]}
      ]},
      de: { title: "Drei-Allianz-Wettkampf", blocks: [
        { type: "h", text: "EVENT-ÜBERSICHT & PHASEN" },
        { type: "p", text: "Eine Gebietsschlacht zwischen drei Allianzen auf einer gemeinsamen Karte: insgesamt 60 Minuten in 4 Phasen." },
        { type: "sub", text: "Phase 1: {tacPreparations} (0:00–3:00)" },
        { type: "p", text: "Trupp-Formationen einstellen, dem Voice-Chat beitreten und die Startrollen verteilen." },
        { type: "sub", text: "Phase 2: {seizeConquer} (3:00–20:00)" },
        { type: "p", text: "Erobert schnell euer eigenes Gebiet, sichert die {transitHub}-Verbindungsgebäude und sammelt konstant Punkte pro Minute (PPM). Die {tacGarrison} sind noch geschützt." },
        { type: "sub", text: "Phase 3: {garrisonOccupation} (20:00–40:00)" },
        { type: "p", text: "Die Schilde der {tacGarrison} (A24, B24, C24) fallen. Verteidigt eure eigene (+1.800 PPM) und greift gleichzeitig koordiniert die gegnerischen an." },
        { type: "sub", text: "Phase 4: {templeOnslaught} (40:00–60:00)" },
        { type: "p", text: "Der {templeOfTides} in der Mitte öffnet. Er bringt enorm viele Punkte und einen Bonus von 50.000 Punkten für den, der ihn beim Schlusssignal hält." },
        { type: "h", text: "ROLLEN & TEAMAUFSTELLUNG (LEGION MIT 30 SPIELERN)" },
        { type: "list", items: [
          "**6× Lane-Anker (Wale / Top-Spender):** führen Vorstöße auf Schlüsselpunkte an und halten die umkämpftesten Frontlinien.",
          "**12× Lane-Unterstützer (F2P / Low-Spender):** direkt hinter den Ankern – eroberte Gebäude halten, Heil-Rotationen und Flankenangriffe stoppen.",
          "**6× Reaktionsspieler (Mid-Spender / aktive F2P):** mobile Einheit – früh neutrale Gebäude in der Mitte nehmen, verlorene Punkte zurückerobern, Lücken füllen.",
          "**6× Angriffstrupp (starke P2W-Spieler):** agiert als eine Einheit, bricht durch schwache gegnerische Lanes und stört das Hinterland."
        ]},
        { type: "h", text: "GEN-3-HELDEN & TRUPP-VORLAGEN" },
        { type: "p", text: "Bereitet vorab 3 verschiedene Trupps vor." },
        { type: "callout", text: "Vermeidet Sammel-Helden (z. B. {diana}) sowie blaue/grüne Helden." },
        { type: "list", items: [
          "**Trupp 1 – Hauptangriff:** höchste Kampfkraft für umkämpfte {tacGarrison} und den {templeOfTides}.",
          "**Trupp 2 – Lane halten:** stabile Verteidigungswerte zum Halten von Schlüsselpunkten und Verbindungen.",
          "**Trupp 3 – Flexibel / Tempo:** schnelle Bewegung für neutrale Gebäude, Flankieren und Rückeroberung von Routen."
        ]},
        { type: "h", text: "ENERGIE & KAPITÄNE" },
        { type: "p", text: "{tacEnergy} braucht ihr zum Bewegen, Kämpfen, {tacConscript} (Heilen) und Zurückziehen. **Ohne Energie seid ihr nutzlos** – teilt sie klug ein." },
        { type: "p", text: "R4/R5 müssen in jedem eroberten Gebäude sofort einen {tacCaptain} ernennen. Kapitäne regenerieren Energie deutlich schneller – gebt die Rolle den aktivsten Spielern und den Lane-Ankern in hochstufigen Gebäuden." },
        { type: "h", text: "F2P-STRATEGIE" },
        { type: "sub", text: "Unterstützung & Heil-Rotation" },
        { type: "p", text: "Kämpft nie bis zur Niederlage. Wenn ihr verwundet seid, zieht euch in ein sicheres Gebäude in der Nähe zurück, drückt **{tacConscript}** (Herz-+-Symbol), um ohne Niederlage zu heilen, und kehrt zurück. Das spart viel Energie und den Weg vom {tacHeadquarters}." },
        { type: "sub", text: "Verbindungen blockieren" },
        { type: "p", text: "F2P-Spieler sollten die {transitHub}-Verbindungsgebäude (A29, B29, C29) halten. Werden die Anmarschwege abgeschnitten, bekommen gegnerische Angriffstrupps keine Verstärkung." },
        { type: "sub", text: "Energie-Disziplin" },
        { type: "p", text: "Verschwendet keine Energie für Solo-Vorstöße tief ins Feindgebiet. Spart sie für die großen Phasenwechsel um 20:00 ({tacGarrison}) und 40:00 ({templeOfTides})." },
        { type: "h", text: "P2W-/WAL-STRATEGIE" },
        { type: "sub", text: "Anker an der Front" },
        { type: "p", text: "Übernehmt die Führung bei wertvollen Gebäuden. Sobald sie gesichert sind, tretet zurück, damit Unterstützer das Gebäude füllen können, während ihr euch zurückzieht, {tacConscript} nutzt und Energie auffüllt." },
        { type: "sub", text: "Gezielte Überfälle auf {tacGarrison}" },
        { type: "p", text: "Stimmt euch um 20:00 mit dem Angriffstrupp ab und überrennt eine schwach verteidigte gegnerische Garnison, während deren Verteidiger an den Flanken beschäftigt sind." },
        { type: "sub", text: "{templeOfTides} stapeln (40:00–60:00)" },
        { type: "p", text: "Stoßt in Minute 40 als eine Welle auf den {templeOfTides} vor. Stapelt **11+ Märsche** darin, um vor dem Schlusssignal in Minute 60 maximal verteidigt zu sein." },
        { type: "h", text: "SCHLÜSSELREGELN FÜR DEN SIEG" },
        { type: "list", items: [
          "**Nie allein vorstoßen:** Bewegt euch immer als Lane-Paar (Anker + Unterstützer).",
          "**Voice-Chat-Ansagen:** Offiziere sagen Rotationen früh an.",
          "**Buffs aufheben:** Aktiviert Begleittier-Buffs und Stadt-Angriffs-/Verteidigungsboni direkt vor Phase 1. Marschtempo- und Aufstellungskapazitäts-Boni wirken auf dem Schlachtfeld nicht."
        ]}
      ]},
      fr: { title: "Conflit Tri-Alliance", blocks: [
        { type: "h", text: "APERÇU & PHASES" },
        { type: "p", text: "Une bataille territoriale entre trois alliances sur une carte partagée : 60 minutes au total, en 4 phases." },
        { type: "sub", text: "Phase 1 : {tacPreparations} (0:00–3:00)" },
        { type: "p", text: "Configure tes formations d'escouades, rejoins le chat vocal et répartis les rôles de départ." },
        { type: "sub", text: "Phase 2 : {seizeConquer} (3:00–20:00)" },
        { type: "p", text: "Capture rapidement ton propre territoire, verrouille le {transitHub} et les bâtiments de liaison, et accumule des points par minute (PPM). La {tacGarrison} reste protégée." },
        { type: "sub", text: "Phase 3 : {garrisonOccupation} (20:00–40:00)" },
        { type: "p", text: "Les boucliers de {tacGarrison} (A24, B24, C24) tombent. Défends la tienne (+1 800 PPM) tout en lançant des attaques coordonnées sur celles des ennemis." },
        { type: "sub", text: "Phase 4 : {templeOnslaught} (40:00–60:00)" },
        { type: "p", text: "Le {templeOfTides} au centre ouvre. Il rapporte énormément de points, plus un bonus de 50 000 points pour celui qui le tient au coup de sifflet final." },
        { type: "h", text: "RÔLES & ÉQUIPE (LÉGION DE 30 JOUEURS)" },
        { type: "list", items: [
          "**6× Ancres de voie (baleines / gros payeurs) :** mènent les poussées vers les points clés et tiennent les fronts les plus disputés.",
          "**12× Soutiens de voie (F2P / petits payeurs) :** juste derrière les ancres pour tenir les bâtiments capturés, faire des rotations de soin et bloquer les attaques de flanc.",
          "**6× Joueurs de réaction (payeurs moyens / F2P actifs) :** unité mobile – prendre tôt les bâtiments neutres du centre, reprendre les points perdus, combler les trous défensifs.",
          "**6× Équipe de frappe (gros P2W) :** agit en un seul groupe pour percer les voies ennemies faibles et perturber leurs arrières."
        ]},
        { type: "h", text: "HÉROS GEN 3 & ESCOUADES PRÉDÉFINIES" },
        { type: "p", text: "Prépare 3 escouades différentes à l'avance." },
        { type: "callout", text: "Évite les héros de collecte (ex. {diana}) et les héros bleus/verts." },
        { type: "list", items: [
          "**Escouade 1 – Assaut principal :** ta meilleure puissance de combat, pour la {tacGarrison} et le {templeOfTides} disputés.",
          "**Escouade 2 – Tenue de voie :** statistiques défensives stables pour tenir les points clés et les liaisons.",
          "**Escouade 3 – Flexible / Vitesse :** mobilité rapide pour les bâtiments neutres, les contournements et la reprise des routes."
        ]},
        { type: "h", text: "ÉNERGIE & CAPITAINES" },
        { type: "p", text: "L'{tacEnergy} sert à se déplacer, combattre, {tacConscript} (soigner) et battre en retraite. **Sans énergie, tu ne sers à rien** — gère-la bien." },
        { type: "p", text: "Les R4/R5 doivent nommer un {tacCaptain} dans chaque bâtiment capturé immédiatement. Les capitaines régénèrent l'énergie bien plus vite — confie ce rôle aux joueurs les plus actifs et aux ancres dans les bâtiments de haut niveau." },
        { type: "h", text: "STRATÉGIE F2P" },
        { type: "sub", text: "Soutien & rotation de soin" },
        { type: "p", text: "Ne combats jamais jusqu'à la défaite. Blessé, replie-toi dans un bâtiment sûr à proximité, appuie sur **{tacConscript}** (cœur + icône) pour te soigner sans être vaincu, puis reviens. Tu économises beaucoup d'énergie et le trajet depuis le {tacHeadquarters}." },
        { type: "sub", text: "Bloquer les liaisons" },
        { type: "p", text: "Les joueurs F2P doivent tenir les bâtiments de liaison {transitHub} (A29, B29, C29). Couper les accès ennemis empêche leurs escouades d'attaque d'être renforcées." },
        { type: "sub", text: "Discipline d'énergie" },
        { type: "p", text: "Ne gaspille pas d'énergie en poussées solo en territoire ennemi. Garde-la pour les grands changements de phase à 20:00 ({tacGarrison}) et 40:00 ({templeOfTides})." },
        { type: "h", text: "STRATÉGIE P2W / BALEINES" },
        { type: "sub", text: "Ancre en première ligne" },
        { type: "p", text: "Mène l'assaut sur les bâtiments de grande valeur. Une fois sécurisés, recule pour laisser les soutiens remplir le bâtiment pendant que tu te retires, utilises {tacConscript} et récupères de l'énergie." },
        { type: "sub", text: "Raids ciblés sur la {tacGarrison}" },
        { type: "p", text: "À 20:00, coordonne-toi avec l'équipe de frappe pour prendre d'assaut une garnison ennemie mal défendue pendant que ses défenseurs sont occupés sur les flancs." },
        { type: "sub", text: "Empiler le {templeOfTides} (40:00–60:00)" },
        { type: "p", text: "À la minute 40, pousse sur le {templeOfTides} en une seule vague. Empile **11+ marches** à l'intérieur pour une défense maximale avant le coup de sifflet final à la minute 60." },
        { type: "h", text: "RÈGLES CLÉS POUR GAGNER" },
        { type: "list", items: [
          "**Jamais de poussée solo :** déplace-toi toujours en voies appariées (ancre + soutiens).",
          "**Annonces vocales :** les officiers annoncent les rotations tôt.",
          "**Garde tes bonus :** active les bonus d'animaux et les bonus d'attaque/défense de la ville juste avant la phase 1. Les bonus de vitesse de marche et de capacité de déploiement ne s'appliquent pas sur le champ de bataille."
        ]}
      ]},
      pt: { title: "Confronto Tri-Aliança", blocks: [
        { type: "h", text: "VISÃO GERAL & FASES" },
        { type: "p", text: "Uma batalha territorial entre três alianças em um mapa compartilhado: 60 minutos no total, divididos em 4 fases." },
        { type: "sub", text: "Fase 1: {tacPreparations} (0:00–3:00)" },
        { type: "p", text: "Configure as formações dos esquadrões, entre no chat de voz e defina as funções iniciais." },
        { type: "sub", text: "Fase 2: {seizeConquer} (3:00–20:00)" },
        { type: "p", text: "Capture rapidamente o seu território, trave o {transitHub} e as construções de ligação e acumule pontos por minuto (PPM) de forma constante. As {tacGarrison} ainda estão protegidas." },
        { type: "sub", text: "Fase 3: {garrisonOccupation} (20:00–40:00)" },
        { type: "p", text: "Os escudos das {tacGarrison} (A24, B24, C24) caem. Defenda a sua (+1.800 PPM) enquanto lança ataques coordenados às inimigas." },
        { type: "sub", text: "Fase 4: {templeOnslaught} (40:00–60:00)" },
        { type: "p", text: "O {templeOfTides} no centro abre. Rende muitíssimos pontos, além de um bônus de 50.000 pontos para quem o controlar no apito final." },
        { type: "h", text: "FUNÇÕES & EQUIPE (LEGIÃO DE 30 JOGADORES)" },
        { type: "list", items: [
          "**6× Âncoras de rota (baleias / grandes gastadores):** lideram os avanços nos pontos-chave e seguram as linhas de frente mais disputadas.",
          "**12× Apoios de rota (F2P / pequenos gastadores):** logo atrás das âncoras para segurar as construções capturadas, revezar a cura e impedir ataques pelos flancos.",
          "**6× Jogadores de reação (gastadores médios / F2P ativos):** unidade móvel – capturar cedo as construções neutras do centro, retomar pontos perdidos e cobrir brechas na defesa.",
          "**6× Equipe de ataque (P2W pesados):** age como uma só unidade para romper rotas inimigas fracas e atacar a retaguarda."
        ]},
        { type: "h", text: "HERÓIS DA GEN 3 & ESQUADRÕES PREDEFINIDOS" },
        { type: "p", text: "Prepare 3 esquadrões diferentes com antecedência." },
        { type: "callout", text: "Evite heróis de coleta (ex.: {diana}) e heróis azuis/verdes." },
        { type: "list", items: [
          "**Esquadrão 1 – Ataque principal:** seu maior poder de combate, para as {tacGarrison} e o {templeOfTides} disputados.",
          "**Esquadrão 2 – Segurar a rota:** atributos defensivos estáveis para segurar pontos-chave e ligações.",
          "**Esquadrão 3 – Flexível / Velocidade:** mobilidade rápida para construções neutras, flanqueio e retomada de rotas."
        ]},
        { type: "h", text: "ENERGIA & CAPITÃES" },
        { type: "p", text: "A {tacEnergy} é necessária para mover, lutar, {tacConscript} (curar) e recuar. **Sem energia você fica inútil** — gerencie com cuidado." },
        { type: "p", text: "R4/R5 devem nomear um {tacCaptain} em cada construção capturada imediatamente. Capitães regeneram energia muito mais rápido — dê essa função aos jogadores mais ativos e às âncoras em construções de nível alto." },
        { type: "h", text: "ESTRATÉGIA F2P" },
        { type: "sub", text: "Apoio & rodízio de cura" },
        { type: "p", text: "Nunca lute até ser derrotado. Quando ferido, recue para uma construção segura próxima, toque em **{tacConscript}** (coração + ícone) para curar sem morrer e volte. Isso economiza muita energia e a caminhada desde os {tacHeadquarters}." },
        { type: "sub", text: "Bloqueio de ligações" },
        { type: "p", text: "Jogadores F2P devem segurar as construções de ligação {transitHub} (A29, B29, C29). Cortar os caminhos inimigos impede que os esquadrões de ataque deles recebam reforços." },
        { type: "sub", text: "Disciplina de energia" },
        { type: "p", text: "Não gaste energia avançando sozinho em território inimigo. Guarde para as grandes mudanças de fase às 20:00 ({tacGarrison}) e 40:00 ({templeOfTides})." },
        { type: "h", text: "ESTRATÉGIA P2W / BALEIAS" },
        { type: "sub", text: "Âncora na linha de frente" },
        { type: "p", text: "Lidere a disputa pelas construções de alto valor. Depois de garantidas, recue para que os apoios ocupem a construção enquanto você recua, usa {tacConscript} e recupera energia." },
        { type: "sub", text: "Ataques direcionados às {tacGarrison}" },
        { type: "p", text: "Às 20:00, coordene com a equipe de ataque para invadir uma guarnição inimiga mal defendida enquanto os defensores estão ocupados nos flancos." },
        { type: "sub", text: "Empilhar no {templeOfTides} (40:00–60:00)" },
        { type: "p", text: "No minuto 40, avance sobre o {templeOfTides} em uma única onda. Empilhe **11+ marchas** lá dentro para garantir defesa máxima antes do apito final no minuto 60." },
        { type: "h", text: "REGRAS-CHAVE PARA VENCER" },
        { type: "list", items: [
          "**Nunca avance sozinho:** sempre se mova em rotas pareadas (âncora + apoios).",
          "**Chamadas no chat de voz:** os oficiais devem anunciar os rodízios cedo.",
          "**Guarde os bônus:** ative os bônus de pets e os bônus de ataque/defesa da cidade logo antes da fase 1. Bônus de velocidade de marcha e de capacidade de desdobramento não funcionam no campo de batalha."
        ]}
      ]},
      es: { title: "Choque de Tres Alianzas", blocks: [
        { type: "h", text: "RESUMEN Y FASES" },
        { type: "p", text: "Una batalla territorial entre tres alianzas en un mapa compartido: 60 minutos en total, divididos en 4 fases." },
        { type: "sub", text: "Fase 1: {tacPreparations} (0:00–3:00)" },
        { type: "p", text: "Configura las formaciones de tus escuadrones, únete al chat de voz y asigna los roles iniciales." },
        { type: "sub", text: "Fase 2: {seizeConquer} (3:00–20:00)" },
        { type: "p", text: "Captura rápido tu propio territorio, asegura el {transitHub} y los edificios de conexión y acumula puntos por minuto (PPM) de forma constante. Las {tacGarrison} siguen protegidas." },
        { type: "sub", text: "Fase 3: {garrisonOccupation} (20:00–40:00)" },
        { type: "p", text: "Caen los escudos de las {tacGarrison} (A24, B24, C24). Defiende la tuya (+1.800 PPM) mientras lanzas ataques coordinados a las enemigas." },
        { type: "sub", text: "Fase 4: {templeOnslaught} (40:00–60:00)" },
        { type: "p", text: "Se abre el {templeOfTides} en el centro. Da muchísimos puntos, además de un bono de 50.000 puntos para quien lo controle al final." },
        { type: "h", text: "ROLES Y EQUIPO (LEGIÓN DE 30 JUGADORES)" },
        { type: "list", items: [
          "**6× Anclas de carril (ballenas / grandes gastadores):** encabezan los avances hacia puntos clave y sostienen los frentes más disputados.",
          "**12× Apoyos de carril (F2P / pequeños gastadores):** justo detrás de las anclas para mantener los edificios capturados, rotar la curación y frenar ataques por los flancos.",
          "**6× Jugadores de reacción (gastadores medios / F2P activos):** unidad móvil – capturar pronto los edificios neutrales del centro, recuperar puntos perdidos y cubrir huecos defensivos.",
          "**6× Equipo de asalto (P2W fuertes):** actúan como una sola unidad para romper carriles enemigos débiles y atacar la retaguardia."
        ]},
        { type: "h", text: "HÉROES GEN 3 Y ESCUADRONES PREDEFINIDOS" },
        { type: "p", text: "Prepara 3 escuadrones distintos con antelación." },
        { type: "callout", text: "Evita héroes de recolección (p. ej. {diana}) y héroes azules/verdes." },
        { type: "list", items: [
          "**Escuadrón 1 – Asalto principal:** tu mayor poder de combate, para las {tacGarrison} y el {templeOfTides} disputados.",
          "**Escuadrón 2 – Mantener carril:** atributos defensivos estables para sostener puntos clave y conexiones.",
          "**Escuadrón 3 – Flexible / Velocidad:** movilidad rápida para edificios neutrales, flanqueos y recuperar rutas."
        ]},
        { type: "h", text: "ENERGÍA Y CAPITANES" },
        { type: "p", text: "La {tacEnergy} se necesita para moverse, luchar, {tacConscript} (curar) y retroceder. **Sin energía no sirves para nada** — adminístrala bien." },
        { type: "p", text: "Los R4/R5 deben nombrar un {tacCaptain} en cada edificio capturado de inmediato. Los capitanes regeneran energía mucho más rápido — da el rol a los jugadores más activos y a las anclas en edificios de nivel alto." },
        { type: "h", text: "ESTRATEGIA F2P" },
        { type: "sub", text: "Apoyo y rotación de curación" },
        { type: "p", text: "Nunca luches hasta ser derrotado. Cuando estés herido, retírate a un edificio seguro cercano, pulsa **{tacConscript}** (corazón + icono) para curarte sin morir y vuelve. Así ahorras mucha energía y el camino desde el {tacHeadquarters}." },
        { type: "sub", text: "Negar las conexiones" },
        { type: "p", text: "Los jugadores F2P deben mantener los edificios de conexión {transitHub} (A29, B29, C29). Cortar las rutas enemigas impide que sus escuadrones de asalto reciban refuerzos." },
        { type: "sub", text: "Disciplina de energía" },
        { type: "p", text: "No gastes energía avanzando solo en territorio enemigo. Guárdala para los grandes cambios de fase a las 20:00 ({tacGarrison}) y 40:00 ({templeOfTides})." },
        { type: "h", text: "ESTRATEGIA P2W / BALLENAS" },
        { type: "sub", text: "Ancla en primera línea" },
        { type: "p", text: "Encabeza la disputa de edificios de alto valor. Una vez asegurados, da un paso atrás para que los apoyos llenen el edificio mientras tú te retiras, usas {tacConscript} y recuperas energía." },
        { type: "sub", text: "Ataques dirigidos a las {tacGarrison}" },
        { type: "p", text: "A las 20:00, coordínate con el equipo de asalto para arrasar una guarnición enemiga mal defendida mientras sus defensores están ocupados en los flancos." },
        { type: "sub", text: "Acumular en el {templeOfTides} (40:00–60:00)" },
        { type: "p", text: "En el minuto 40, avanza sobre el {templeOfTides} en una sola ola. Acumula **11+ marchas** dentro para asegurar la máxima defensa antes del final en el minuto 60." },
        { type: "h", text: "REGLAS CLAVE PARA GANAR" },
        { type: "list", items: [
          "**Nunca avances solo:** muévete siempre en carriles emparejados (ancla + apoyos).",
          "**Avisos por chat de voz:** los oficiales deben anunciar las rotaciones con tiempo.",
          "**Guarda los bonos:** activa los bonos de mascotas y los bonos de ataque/defensa de la ciudad justo antes de la fase 1. Los bonos de Velocidad de Marcha y Capacidad de Despliegue no funcionan en el campo de batalla."
        ]}
      ]},
      tr: { title: "Üçlü İttifak Çarpışması", blocks: [
        { type: "h", text: "ETKİNLİĞE GENEL BAKIŞ & AŞAMALAR" },
        { type: "p", text: "Ortak bir haritada üç ittifak arasında toprak savaşı: toplam 60 dakika, 4 aşamaya bölünür." },
        { type: "sub", text: "1. Aşama: {tacPreparations} (0:00–3:00)" },
        { type: "p", text: "Ekip dizilişlerini ayarla, sesli sohbete katıl ve başlangıç rollerini dağıt." },
        { type: "sub", text: "2. Aşama: {seizeConquer} (3:00–20:00)" },
        { type: "p", text: "Kendi bölgeni hızla ele geçir, {transitHub} ve bağlantı binalarını kilitle, dakika başı puanı (PPM) düzenli topla. {tacGarrison} hâlâ kalkanlı." },
        { type: "sub", text: "3. Aşama: {garrisonOccupation} (20:00–40:00)" },
        { type: "p", text: "{tacGarrison} (A24, B24, C24) kalkanları düşer. Kendi garnizonunu savun (dakikada +1.800) ve düşman garnizonlarına koordineli saldırılar düzenle." },
        { type: "sub", text: "4. Aşama: {templeOnslaught} (40:00–60:00)" },
        { type: "p", text: "Ortadaki {templeOfTides} açılır. Çok yüksek puan verir; ayrıca bitiş anında onu elinde tutan tarafa 50.000 puan bonus verir." },
        { type: "h", text: "ROLLER & TAKIM DÜZENİ (30 KİŞİLİK LEJYON)" },
        { type: "list", items: [
          "**6× Hat Çapaları (balinalar / çok harcayanlar):** kilit noktalara saldırıyı yönetir ve en yoğun cepheleri tutar.",
          "**12× Hat Destekçileri (F2P / az harcayanlar):** çapaların hemen arkasında ele geçirilen binaları tutar, iyileştirme rotasyonu yapar ve kanat saldırılarını durdurur.",
          "**6× Tepki Oyuncuları (orta harcayanlar / aktif F2P):** hareketli birlik – ortadaki tarafsız binaları erkenden alır, kaybedilen noktaları geri alır, savunma boşluklarını doldurur.",
          "**6× Vurucu Takım (güçlü P2W):** tek birlik olarak hareket ederek zayıf düşman hatlarını yarar ve arka hattı bozar."
        ]},
        { type: "h", text: "3. NESİL KAHRAMANLAR & EKİP HAZIRLIĞI" },
        { type: "p", text: "Önceden 3 farklı ekip hazırla." },
        { type: "callout", text: "Toplayıcı kahramanlardan (ör. {diana}) ve mavi/yeşil kahramanlardan kaçın." },
        { type: "list", items: [
          "**Ekip 1 – Ana Saldırı:** en yüksek savaş gücün; çekişmeli {tacGarrison} ve {templeOfTides} için.",
          "**Ekip 2 – Hat Tutma:** kilit noktaları ve bağlantıları tutmak için dengeli savunma istatistikleri.",
          "**Ekip 3 – Esnek / Hız:** tarafsız binalar, kuşatma ve rota geri alma için hızlı hareket."
        ]},
        { type: "h", text: "ENERJİ & ÖNDERLER" },
        { type: "p", text: "Hareket etmek, savaşmak, iyileşmek ({tacConscript}) ve geri çekilmek için {tacEnergy} gerekir. **Enerjin biterse işe yaramazsın** — dikkatli kullan." },
        { type: "p", text: "R4/R5, ele geçirilen her binaya hemen bir {tacCaptain} atamalı. Önderler enerjiyi çok daha hızlı yeniler — bu rolü en aktif oyunculara ve yüksek seviyeli binalardaki hat çapalarına ver." },
        { type: "h", text: "F2P STRATEJİSİ" },
        { type: "sub", text: "Destek & iyileştirme rotasyonu" },
        { type: "p", text: "Asla yenilene kadar savaşma. Yaralandığında yakındaki güvenli bir binaya çekil, ölmeden iyileşmek için **{tacConscript}** (kalp + simgesi) düğmesine bas, sonra geri dön. Bu, çok fazla enerji ve {tacHeadquarters}'dan yürüme süresi kazandırır." },
        { type: "sub", text: "Bağlantıları kesme" },
        { type: "p", text: "F2P oyuncular {transitHub} bağlantı binalarını (A29, B29, C29) tutmalı. Düşmanın yaklaşma yollarını kesmek, saldırı ekiplerinin takviye almasını engeller." },
        { type: "sub", text: "Enerji disiplini" },
        { type: "p", text: "Enerjini düşman bölgesinin derinliklerine tek başına saldırarak harcama. 20:00 ({tacGarrison}) ve 40:00 ({templeOfTides}) aşama geçişleri için sakla." },
        { type: "h", text: "P2W / BALİNA STRATEJİSİ" },
        { type: "sub", text: "Ön cephe çapası" },
        { type: "p", text: "Değerli binaları ele geçirmede öne geç. Güvenceye alındıktan sonra destekçiler binayı doldursun; sen geri çekil, {tacConscript} kullan ve enerji topla." },
        { type: "sub", text: "Hedefli {tacGarrison} baskınları" },
        { type: "p", text: "20:00'de vurucu takımla koordine ol ve savunucuları kanatlarda meşgulken zayıf savunulan bir düşman garnizonuna baskın yap." },
        { type: "sub", text: "{templeOfTides} yığılması (40:00–60:00)" },
        { type: "p", text: "40. dakikada {templeOfTides}'na tek dalga halinde ilerle. 60. dakikadaki bitişten önce en yüksek savunma için içeri **11+ ekip** yığ." },
        { type: "h", text: "ZAFER İÇİN TEMEL KURALLAR" },
        { type: "list", items: [
          "**Asla tek başına ilerleme:** her zaman eşli hatlar halinde hareket et (çapa + destekçiler).",
          "**Sesli sohbet çağrıları:** yetkililer rotasyonları erkenden duyurmalı.",
          "**Bonusları sakla:** evcil hayvan bonuslarını ve şehir saldırı/savunma bonuslarını 1. aşamadan hemen önce etkinleştir. İntikal Hızı ve Konuşlandırma Kapasitesi bonusları savaş alanında geçerli değildir."
        ]}
      ]},
      id: { title: "Clash Tiga Aliansi", blocks: [
        { type: "h", text: "GAMBARAN EVENT & STAGE" },
        { type: "p", text: "Pertempuran wilayah tiga arah di satu peta bersama: total 60 menit, dibagi menjadi 4 Stage." },
        { type: "sub", text: "Stage 1: {tacPreparations} (0:00–3:00)" },
        { type: "p", text: "Atur formasi skuad, masuk ke voice chat, dan bagi peran awal." },
        { type: "sub", text: "Stage 2: {seizeConquer} (3:00–20:00)" },
        { type: "p", text: "Kuasai wilayah sendiri dengan cepat, amankan {transitHub} dan bangunan penghubung, dan kumpulkan poin per menit (PPM) secara stabil. {tacGarrison} masih terlindungi perisai." },
        { type: "sub", text: "Stage 3: {garrisonOccupation} (20:00–40:00)" },
        { type: "p", text: "Perisai {tacGarrison} (A24, B24, C24) hilang. Pertahankan garnisun Aliansimu (+1.800 PPM) sambil melancarkan serangan terkoordinasi ke garnisun musuh." },
        { type: "sub", text: "Stage 4: {templeOnslaught} (40:00–60:00)" },
        { type: "p", text: "{templeOfTides} di tengah dibuka. Memberi poin sangat besar, plus bonus 50.000 poin bagi yang menguasainya saat pertempuran berakhir." },
        { type: "h", text: "PERAN & SUSUNAN TIM (LEGIUN 30 PEMAIN)" },
        { type: "list", items: [
          "**6× Jangkar Jalur (whale / top spender):** memimpin dorongan ke titik penting dan menahan garis depan yang paling ramai.",
          "**12× Pendukung Jalur (F2P / low spender):** tepat di belakang Jangkar untuk menahan bangunan yang direbut, bergantian menyembuhkan, dan mencegah serangan dari samping.",
          "**6× Pemain Reaksi (mid spender / F2P aktif):** unit bergerak – rebut bangunan netral di tengah sejak awal, rebut kembali titik yang hilang, dan tutup celah pertahanan.",
          "**6× Tim Penyerang (P2W kuat):** bergerak sebagai satu unit untuk menembus jalur musuh yang lemah dan mengacaukan barisan belakang."
        ]},
        { type: "h", text: "HERO GEN 3 & PRESET SKUAD" },
        { type: "p", text: "Siapkan 3 skuad berbeda sebelumnya." },
        { type: "callout", text: "Hindari hero pengumpul (mis. {diana}) dan hero Biru/Hijau." },
        { type: "list", items: [
          "**Skuad 1 – Serangan Utama:** kekuatan tempur tertinggi untuk {tacGarrison} dan {templeOfTides} yang diperebutkan.",
          "**Skuad 2 – Penahan Jalur:** statistik pertahanan stabil untuk menahan titik penting dan penghubung.",
          "**Skuad 3 – Fleksibel / Cepat:** mobilitas tinggi untuk bangunan netral, mengepung, dan merebut kembali rute."
        ]},
        { type: "h", text: "ENERGI & KAPTEN" },
        { type: "p", text: "{tacEnergy} dibutuhkan untuk bergerak, bertempur, menyembuhkan ({tacConscript}), dan mundur. **Kehabisan Energi membuatmu tidak berguna** — atur dengan bijak." },
        { type: "p", text: "R4/R5 harus segera menunjuk {tacCaptain} di setiap bangunan yang direbut. Kapten memulihkan Energi jauh lebih cepat — berikan peran ini kepada pemain paling aktif dan Jangkar Jalur di bangunan level tinggi." },
        { type: "h", text: "STRATEGI F2P" },
        { type: "sub", text: "Dukungan & rotasi penyembuhan" },
        { type: "p", text: "Jangan bertempur sampai kalah. Saat terluka, mundur ke bangunan aman terdekat, tekan **{tacConscript}** (ikon hati +) untuk sembuh tanpa kalah, lalu kembali. Ini menghemat banyak Energi dan waktu berjalan dari {tacHeadquarters}." },
        { type: "sub", text: "Menutup penghubung" },
        { type: "p", text: "Pemain F2P sebaiknya menahan bangunan penghubung {transitHub} (A29, B29, C29). Memutus jalur musuh membuat skuad serangnya tidak bisa mendapat bala bantuan." },
        { type: "sub", text: "Disiplin Energi" },
        { type: "p", text: "Jangan buang Energi untuk menyerang sendirian jauh ke wilayah musuh. Simpan untuk pergantian Stage besar pada 20:00 ({tacGarrison}) dan 40:00 ({templeOfTides})." },
        { type: "h", text: "STRATEGI P2W / WHALE" },
        { type: "sub", text: "Jangkar garis depan" },
        { type: "p", text: "Pimpin perebutan bangunan bernilai tinggi. Setelah aman, mundur agar pendukung dapat mengisi bangunan sementara kamu mundur, menggunakan {tacConscript}, dan memulihkan Energi." },
        { type: "sub", text: "Serangan terarah ke {tacGarrison}" },
        { type: "p", text: "Pada 20:00, berkoordinasi dengan Tim Penyerang untuk menyerbu garnisun musuh yang pertahanannya lemah saat para penjaganya sibuk di sisi samping." },
        { type: "sub", text: "Menumpuk di {templeOfTides} (40:00–60:00)" },
        { type: "p", text: "Pada menit 40, dorong ke {templeOfTides} dalam satu gelombang. Tumpuk **11+ barisan** di dalamnya untuk pertahanan maksimal sebelum pertempuran berakhir di menit 60." },
        { type: "h", text: "ATURAN KUNCI UNTUK MENANG" },
        { type: "list", items: [
          "**Jangan pernah maju sendirian:** selalu bergerak dalam jalur berpasangan (Jangkar + Pendukung).",
          "**Arahan voice chat:** petinggi harus mengumumkan rotasi lebih awal.",
          "**Simpan buff:** aktifkan buff hewan peliharaan dan bonus serangan/pertahanan kota tepat sebelum Stage 1. Bonus Percepatan Barisan dan Kapasitas Pengerahan tidak berlaku di medan tempur."
        ]}
      ]},
      ru: { title: "Битва трех альянсов", blocks: [
        { type: "h", text: "ОБЗОР СОБЫТИЯ И ЭТАПЫ" },
        { type: "p", text: "Битва за территорию между тремя альянсами на общей карте: всего 60 минут, 4 этапа." },
        { type: "sub", text: "Этап 1: {tacPreparations} (0:00–3:00)" },
        { type: "p", text: "Настройте формирования отрядов, подключитесь к голосовому чату и распределите стартовые роли." },
        { type: "sub", text: "Этап 2: {seizeConquer} (3:00–20:00)" },
        { type: "p", text: "Быстро захватите свою территорию, закрепите {transitHub} и соединительные здания и стабильно набирайте очки в минуту (PPM). {tacGarrison} пока под щитом." },
        { type: "sub", text: "Этап 3: {garrisonOccupation} (20:00–40:00)" },
        { type: "p", text: "С гарнизонов (A24, B24, C24) спадают щиты. Защищайте свой (+1 800 в минуту) и одновременно наносите скоординированные удары по вражеским." },
        { type: "sub", text: "Этап 4: {templeOnslaught} (40:00–60:00)" },
        { type: "p", text: "Открывается {templeOfTides} в центре. Он приносит огромное количество очков, а тот, кто удерживает его в финале, получает бонус 50 000 очков." },
        { type: "h", text: "РОЛИ И СОСТАВ (ЛЕГИОН ИЗ 30 ИГРОКОВ)" },
        { type: "list", items: [
          "**6× Якоря линий (киты / топ-донатеры):** возглавляют натиск на ключевые точки и держат самые горячие участки фронта.",
          "**12× Поддержка линий (F2P / малый донат):** сразу за якорями — удерживают захваченные здания, по очереди лечатся и не дают врагу зайти с фланга.",
          "**6× Группа реагирования (средний донат / активные F2P):** мобильный отряд — рано занимает нейтральные здания в центре, отбивает потерянные точки и закрывает дыры в обороне.",
          "**6× Ударная группа (сильные донатеры):** действует единым отрядом, пробивает слабые вражеские линии и бьёт по тылам."
        ]},
        { type: "h", text: "ГЕРОИ 3-ГО ПОКОЛЕНИЯ И ПРЕСЕТЫ ОТРЯДОВ" },
        { type: "p", text: "Заранее подготовьте 3 разных отряда." },
        { type: "callout", text: "Не используйте героев-собирателей (например, {diana}) и синих/зелёных героев." },
        { type: "list", items: [
          "**Отряд 1 — основной штурм:** максимальная боевая мощь для борьбы за гарнизоны и {templeOfTides}.",
          "**Отряд 2 — удержание линии:** стабильные защитные характеристики для удержания ключевых точек и переходов.",
          "**Отряд 3 — гибкий / скоростной:** высокая мобильность для нейтральных зданий, обходов и возврата маршрутов."
        ]},
        { type: "h", text: "ЭНЕРГИЯ И КАПИТАНЫ" },
        { type: "p", text: "Энергия нужна, чтобы передвигаться, сражаться, лечиться (пополнение) и отступать. **Без энергии вы бесполезны** — расходуйте её с умом." },
        { type: "p", text: "R4/R5 должны сразу назначать капитана в каждом захваченном здании. Капитаны восстанавливают энергию намного быстрее — отдавайте эту роль самым активным игрокам и якорям в зданиях высокого уровня." },
        { type: "h", text: "СТРАТЕГИЯ ДЛЯ F2P" },
        { type: "sub", text: "Поддержка и ротация лечения" },
        { type: "p", text: "Никогда не сражайтесь до поражения. Раненым отступайте в безопасное здание рядом, нажимайте **пополнение** (иконка сердца с плюсом), чтобы вылечиться, не погибая, и возвращайтесь. Это экономит много энергии и время на дорогу из штаба." },
        { type: "sub", text: "Блокировка переходов" },
        { type: "p", text: "F2P-игрокам стоит удерживать соединительные здания — {transitHub} (A29, B29, C29). Если перерезать подходы, вражеские ударные отряды останутся без подкрепления." },
        { type: "sub", text: "Дисциплина энергии" },
        { type: "p", text: "Не тратьте энергию на одиночные рывки вглубь вражеской территории. Берегите её для смены этапов в 20:00 (гарнизоны) и 40:00 ({templeOfTides})." },
        { type: "h", text: "СТРАТЕГИЯ ДЛЯ ДОНАТЕРОВ / КИТОВ" },
        { type: "sub", text: "Якорь на передовой" },
        { type: "p", text: "Первыми вступайте в бой за ценные здания. После захвата отходите назад, чтобы поддержка заполнила здание, а вы отступили, пополнили войска и восстановили энергию." },
        { type: "sub", text: "Точечные рейды на гарнизоны" },
        { type: "p", text: "В 20:00 вместе с ударной группой атакуйте слабо защищённый вражеский гарнизон, пока его защитники заняты на флангах." },
        { type: "sub", text: "{templeOfTides}: максимум войск (40:00–60:00)" },
        { type: "p", text: "На 40-й минуте идите на {templeOfTides} одной волной. Заведите внутрь **11+ маршей**, чтобы обеспечить максимальную защиту до финала на 60-й минуте." },
        { type: "h", text: "КЛЮЧЕВЫЕ ПРАВИЛА ПОБЕДЫ" },
        { type: "list", items: [
          "**Никогда не атакуйте в одиночку:** всегда двигайтесь парными линиями (якорь + поддержка).",
          "**Команды в голосовом чате:** офицеры должны заранее объявлять ротации.",
          "**Берегите бонусы:** включите бонусы питомцев и бонусы атаки/защиты города прямо перед этапом 1. Бонусы к скорости марша и вместимости отправления на поле битвы не действуют."
        ]}
      ]},
      th: { title: "สงครามสามพันธมิตร", blocks: [
        { type: "h", text: "ภาพรวมอีเวนต์และช่วงต่างๆ" },
        { type: "p", text: "สงครามแย่งดินแดนระหว่างสามพันธมิตรบนแผนที่เดียวกัน รวม 60 นาที แบ่งเป็น 4 ช่วง" },
        { type: "sub", text: "ช่วงที่ 1: {tacPreparations} (0:00–3:00)" },
        { type: "p", text: "จัดทีม เข้าวอยซ์แชท และแบ่งหน้าที่เริ่มต้น" },
        { type: "sub", text: "ช่วงที่ 2: {seizeConquer} (3:00–20:00)" },
        { type: "p", text: "ยึดพื้นที่ฝั่งตัวเองให้เร็ว ยึด{transitHub}และสิ่งปลูกสร้างเชื่อมต่อไว้ และสะสมคะแนนต่อนาที (PPM) อย่างต่อเนื่อง ช่วงนี้{tacGarrison}ยังมีโล่ป้องกัน" },
        { type: "sub", text: "ช่วงที่ 3: {garrisonOccupation} (20:00–40:00)" },
        { type: "p", text: "โล่ของ{tacGarrison} (A24, B24, C24) หายไป ป้องกัน{tacGarrison}ของพันธมิตรตัวเอง (+1,800/นาที) พร้อมประสานโจมตี{tacGarrison}ของศัตรู" },
        { type: "sub", text: "ช่วงที่ 4: {templeOnslaught} (40:00–60:00)" },
        { type: "p", text: "{templeOfTides}ตรงกลางเปิด ให้คะแนนสูงมาก และผู้ที่ยึดไว้ตอนจบจะได้โบนัสเพิ่ม 50,000 คะแนน" },
        { type: "h", text: "หน้าที่และการจัดทีม (กองทัพ 30 คน)" },
        { type: "list", items: [
          "**6× ตัวหลักประจำเลน (สายเติมหนัก):** นำการบุกจุดสำคัญและยืนแนวหน้าที่ดุเดือดที่สุด",
          "**12× ตัวซัพพอร์ตเลน (F2P / เติมน้อย):** อยู่หลังตัวหลักเพื่อยึดสิ่งปลูกสร้างที่ได้มา ผลัดกันฟื้นฟู และกันศัตรูตีขนาบ",
          "**6× ทีมตอบโต้ (เติมกลาง / F2P ที่ออนบ่อย):** หน่วยเคลื่อนที่ ยึดสิ่งปลูกสร้างที่เป็นกลางตรงกลางตั้งแต่ต้น ยึดจุดที่เสียคืน และอุดช่องโหว่แนวป้องกัน",
          "**6× ทีมจู่โจม (สายเติมตัวตึง):** เคลื่อนที่เป็นหน่วยเดียว ทะลวงเลนศัตรูที่อ่อนแอและก่อกวนแนวหลัง"
        ]},
        { type: "h", text: "ฮีโร่เจน 3 และการตั้งทีมล่วงหน้า" },
        { type: "p", text: "เตรียมทีมไว้ล่วงหน้า 3 ทีมที่ต่างกัน" },
        { type: "callout", text: "หลีกเลี่ยงฮีโร่สายเก็บทรัพยากร (เช่น {diana}) และฮีโร่สีฟ้า/สีเขียว" },
        { type: "list", items: [
          "**ทีม 1 – บุกหลัก:** พลังต่อสู้สูงสุด ใช้แย่ง{tacGarrison}และ{templeOfTides}",
          "**ทีม 2 – ยืนเลน:** ค่าป้องกันมั่นคง ใช้รักษาจุดสำคัญและจุดเชื่อมต่อ",
          "**ทีม 3 – ยืดหยุ่น / ความเร็ว:** เคลื่อนที่เร็ว ใช้ยึดสิ่งปลูกสร้างที่เป็นกลาง ตีขนาบ และยึดเส้นทางคืน"
        ]},
        { type: "h", text: "พลังงานและกัปตัน" },
        { type: "p", text: "การเคลื่อนที่ การต่อสู้ การ{tacConscript} (ฟื้นฟู) และการถอยล้วนใช้{tacEnergy} **ถ้า{tacEnergy}หมดคุณจะทำอะไรไม่ได้เลย** จึงต้องใช้อย่างระมัดระวัง" },
        { type: "p", text: "R4/R5 ต้องแต่งตั้ง{tacCaptain}ในทุกสิ่งปลูกสร้างที่ยึดได้ทันที {tacCaptain}ฟื้นพลังงานเร็วกว่ามาก ให้ผู้เล่นที่ออนบ่อยที่สุดและตัวหลักประจำเลนในสิ่งปลูกสร้างเลเวลสูงรับตำแหน่งนี้" },
        { type: "h", text: "กลยุทธ์ F2P" },
        { type: "sub", text: "ซัพพอร์ตและผลัดกันฟื้นฟู" },
        { type: "p", text: "อย่าสู้จนแพ้ เมื่อบาดเจ็บให้ถอยไปยังสิ่งปลูกสร้างที่ปลอดภัยใกล้ๆ กด **{tacConscript}** (ไอคอนหัวใจ +) เพื่อฟื้นฟูโดยไม่ต้องแพ้ แล้วค่อยกลับไป วิธีนี้ประหยัดพลังงานได้มากและไม่ต้องเดินทางไกลจาก{tacHeadquarters}" },
        { type: "sub", text: "ปิดจุดเชื่อมต่อ" },
        { type: "p", text: "ผู้เล่น F2P ควรยึด{transitHub}ซึ่งเป็นจุดเชื่อมต่อ (A29, B29, C29) การตัดเส้นทางของศัตรูทำให้ทีมบุกของเขาไม่ได้รับการสนับสนุน" },
        { type: "sub", text: "วินัยการใช้พลังงาน" },
        { type: "p", text: "อย่าเสียพลังงานบุกลึกเข้าไปในเขตศัตรูคนเดียว เก็บไว้ใช้ตอนเปลี่ยนช่วงสำคัญที่ 20:00 ({tacGarrison}) และ 40:00 ({templeOfTides})" },
        { type: "h", text: "กลยุทธ์สายเติม / วาฬ" },
        { type: "sub", text: "ตัวหลักแนวหน้า" },
        { type: "p", text: "นำการแย่งสิ่งปลูกสร้างที่มีมูลค่าสูง เมื่อยึดได้แล้วให้ถอยออกมาเพื่อให้ซัพพอร์ตเข้าไปเติมเต็ม ส่วนคุณถอย ใช้{tacConscript} และฟื้นพลังงาน" },
        { type: "sub", text: "จู่โจม{tacGarrison}แบบเจาะจง" },
        { type: "p", text: "เวลา 20:00 ประสานกับทีมจู่โจมเพื่อบุก{tacGarrison}ของศัตรูที่ป้องกันอ่อนแอ ขณะที่ผู้ป้องกันกำลังติดพันที่ปีกข้าง" },
        { type: "sub", text: "สุมกำลังใน{templeOfTides} (40:00–60:00)" },
        { type: "p", text: "นาทีที่ 40 บุก{templeOfTides}พร้อมกันเป็นระลอกเดียว ส่งทัพเข้าไป **11 ทัพขึ้นไป** เพื่อป้องกันให้แน่นที่สุดก่อนจบที่นาทีที่ 60" },
        { type: "h", text: "กฎสำคัญสู่ชัยชนะ" },
        { type: "list", items: [
          "**อย่าบุกคนเดียว:** เคลื่อนที่เป็นคู่เลนเสมอ (ตัวหลัก + ซัพพอร์ต)",
          "**สั่งการผ่านวอยซ์แชท:** ผู้บริหารต้องสั่งผลัดเวรแต่เนิ่นๆ",
          "**เก็บบัฟไว้:** เปิดบัฟสัตว์เลี้ยงและโบนัสโจมตี/ป้องกันของเมืองก่อนเข้าช่วงที่ 1 โบนัสสปีดการเดินทัพและความจุการส่งออกทหารไม่มีผลในสนามต่อสู้"
        ]}
      ]},
      ar: { title: "صراع التحالف الثلاثي", blocks: [
        { type: "h", text: "نظرة عامة ومراحل الفعالية" },
        { type: "p", text: "معركة على الأراضي بين ثلاثة تحالفات على خريطة مشتركة: 60 دقيقة في المجمل، مقسمة إلى 4 مراحل." },
        { type: "sub", text: "المرحلة 1: {tacPreparations} (0:00–3:00)" },
        { type: "p", text: "جهّز تشكيلات الفرق، وانضم إلى الدردشة الصوتية، ووزّع الأدوار الأولية." },
        { type: "sub", text: "المرحلة 2: {seizeConquer} (3:00–20:00)" },
        { type: "p", text: "استولِ بسرعة على أراضيك، وأمّن {transitHub} ومباني الربط، واجمع نقاطًا ثابتة في الدقيقة (PPM). لا تزال {tacGarrison} محمية بالدرع." },
        { type: "sub", text: "المرحلة 3: {garrisonOccupation} (20:00–40:00)" },
        { type: "p", text: "تسقط دروع {tacGarrison} (A24، B24، C24). دافع عن حاميتك (+1,800 في الدقيقة) وشن في الوقت نفسه هجمات منسقة على حاميات الأعداء." },
        { type: "sub", text: "المرحلة 4: {templeOnslaught} (40:00–60:00)" },
        { type: "p", text: "يُفتح {templeOfTides} في المركز. يمنح نقاطًا هائلة، بالإضافة إلى مكافأة 50,000 نقطة لمن يسيطر عليه عند انتهاء المعركة." },
        { type: "h", text: "الأدوار وتشكيل الفريق (كتيبة من 30 لاعبًا)" },
        { type: "list", items: [
          "**6× مرتكزات المسار (الحيتان / كبار المنفقين):** يقودون الهجوم على النقاط الرئيسية ويثبتون في أشد الجبهات ازدحامًا.",
          "**12× داعمو المسار (مجانيون / قليلو الإنفاق):** خلف المرتكزات مباشرة للحفاظ على المباني المحتلة، والتناوب على العلاج، ومنع هجمات الأجنحة.",
          "**6× لاعبو الاستجابة (متوسطو الإنفاق / مجانيون نشطون):** وحدة متنقلة – تستولي مبكرًا على المباني المحايدة في المركز، وتستعيد النقاط المفقودة، وتسد الثغرات الدفاعية.",
          "**6× فريق الضربة (لاعبو دفع أقوياء):** يتحركون كوحدة واحدة لاختراق المسارات الضعيفة للعدو وإرباك خطوطه الخلفية."
        ]},
        { type: "h", text: "أبطال الجيل 3 وإعداد الفرق مسبقًا" },
        { type: "p", text: "جهّز 3 فرق مختلفة مسبقًا." },
        { type: "callout", text: "تجنّب أبطال الجمع (مثل {diana}) والأبطال الزرق/الخضر." },
        { type: "list", items: [
          "**الفرقة 1 – الهجوم الرئيسي:** أعلى قوة قتالية لديك، للمنافسة على {tacGarrison} و{templeOfTides}.",
          "**الفرقة 2 – تثبيت المسار:** إحصائيات دفاعية ثابتة للحفاظ على النقاط الرئيسية ومباني الربط.",
          "**الفرقة 3 – مرنة / سريعة:** حركة سريعة للاستيلاء على المباني المحايدة والالتفاف واستعادة الطرق."
        ]},
        { type: "h", text: "الطاقة والكابتن" },
        { type: "p", text: "تحتاج إلى {tacEnergy} للتحرك والقتال و{tacConscript} (العلاج) والتراجع. **نفاد الطاقة يجعلك بلا فائدة** — أدرها بحكمة." },
        { type: "p", text: "يجب على R4/R5 تعيين {tacCaptain} في كل مبنى يُستولى عليه فورًا. يستعيد الكابتن الطاقة أسرع بكثير — امنح هذا الدور لأكثر اللاعبين نشاطًا ولمرتكزات المسار في المباني عالية المستوى." },
        { type: "h", text: "استراتيجية اللاعبين المجانيين" },
        { type: "sub", text: "الدعم والتناوب على العلاج" },
        { type: "p", text: "لا تقاتل حتى الهزيمة. عند الإصابة، تراجع إلى مبنى آمن قريب، واضغط **{tacConscript}** (أيقونة القلب +) للعلاج دون أن تُهزم، ثم عُد. هذا يوفر الكثير من الطاقة ووقت العودة سيرًا من {tacHeadquarters}." },
        { type: "sub", text: "قطع مباني الربط" },
        { type: "p", text: "على اللاعبين المجانيين الحفاظ على مباني الربط {transitHub} (A29، B29، C29). قطع طرق العدو يمنع فرق هجومه من تلقي التعزيزات." },
        { type: "sub", text: "الانضباط في الطاقة" },
        { type: "p", text: "لا تهدر الطاقة في التوغل وحدك داخل أراضي العدو. احتفظ بها لتحولات المراحل الكبرى عند 20:00 ({tacGarrison}) و40:00 ({templeOfTides})." },
        { type: "h", text: "استراتيجية لاعبي الدفع / الحيتان" },
        { type: "sub", text: "مرتكز الخط الأمامي" },
        { type: "p", text: "تقدّم في المنافسة على المباني عالية القيمة. بعد تأمينها، تراجع ليملأ الداعمون المبنى بينما تتراجع أنت وتستخدم {tacConscript} وتستعيد الطاقة." },
        { type: "sub", text: "غارات موجهة على {tacGarrison}" },
        { type: "p", text: "عند 20:00، نسّق مع فريق الضربة لاقتحام حامية معادية ضعيفة الدفاع بينما ينشغل مدافعوها على الأجنحة." },
        { type: "sub", text: "التكدّس في {templeOfTides} (40:00–60:00)" },
        { type: "p", text: "عند الدقيقة 40، اهجم على {templeOfTides} كموجة واحدة. كدّس **11+ زحفًا** داخله لضمان أقصى دفاع قبل النهاية عند الدقيقة 60." },
        { type: "h", text: "قواعد أساسية للفوز" },
        { type: "list", items: [
          "**لا تتقدم وحدك أبدًا:** تحرك دائمًا في مسارات مزدوجة (مرتكز + داعمون).",
          "**نداءات الدردشة الصوتية:** يجب على الضباط الإعلان عن التناوب مبكرًا.",
          "**احتفظ بالمكافآت:** فعّل مكافآت الحيوانات الأليفة ومكافآت الهجوم/الدفاع للمدينة قبل بدء المرحلة 1 مباشرة. مكافآت سرعة الزحف وسعة النشر لا تعمل في ساحة المعركة."
        ]}
      ]}
    }
  }
};

/* 主將標籤：泰文、阿拉伯文改成對照表用詞 */
UI.roles.lethality.th = "ตัวนำสายความแรงพลัง";
UI.roles.attack.th = "ตัวนำสายพลังโจมตี";
UI.roles.lethality.ar = "قائد قوة الفتك";
