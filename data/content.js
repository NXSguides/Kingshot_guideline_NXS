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
    lethality: { zh: "致命主將", en: "Lead for Lethality", ko: "치명 리드", de: "Lead für Letalität" },
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
  personalRelic: { zh:"個人聖契積分", en:"Personal Relic Points", de:"Persönliche Reliktpunkte", ko:"개인 성스러운 계약 포인트", fr:"Points de Relique Individuels", ar:"نقاط الآثار الشخصية", id:"Poin Relik Pribadi", th:"คะแนนวัตถุโบราณส่วนบุคคล", ru:"Личные очки реликвий", tr:"Kişisel Yadigâr Puanı", pt:"Pontos de Relíquia Individuais" }
};

const GUIDES = {
  "recent-events": {
    emoji: "📢",
    name: {
      en: "Recent Alliance Events", zh: "近期聯盟活動", ko: "최근 연맹 이벤트",
      de: "Aktuelle Allianz-Events", fr: "Événements récents de l'alliance",
      pt: "Eventos Recentes da Aliança", tr: "Son İttifak Etkinlikleri",
      id: "Acara Aliansi Terbaru", ru: "Последние события альянса",
      th: "กิจกรรมพันธมิตรล่าสุด", ar: "أحدث فعاليات التحالف"
    },
    sections: {
      en: {
        title: "Recent Alliance Events",
        blocks: [
          { type: "img", src: "figures/Legion_1.png", alt: "Legion 1" },
          { type: "h", text: "📅 LEGION 1 — SWORDLAND SHOWDOWN PLAYER ASSIGNMENTS" },
          { type: "p", text: "**Date:** Sunday, 20.09 · **Coordinator:** ARMADA (88.4M)" },
          { type: "p", text: "Legion 1 is the main battle. Result counts for entire alliance rewards." },
          { type: "callout", text: "**No substitutes this time.** All players listed below are main roster." },

          { type: "h", text: "🎯 DOCTRINE REMINDER" },
          { type: "p", text: "Strongest players attack and capture. Once a building flips, a **Garrison Captain** holds it while the capture team moves on. Garrison Captains do not leave to chase kills. Capture teams stay mobile and aggressive." },
          { type: "callout", text: "**Rally Leaders:** buff yourself with 2K gem buffs if possible. This is only recommended for Legion 1 rally leaders. It gives you a real edge in capture fights and makes your rallies harder to break." },

          { type: "sub", text: "#4 {belltower} (Purpand) — Capture Speed" },
          { type: "list", items: [
            "**Purpand (55M)** — Lead capture. Take #4 {belltower} immediately at the start with Labanet. Once it flips, hand off to JORDAN as Garrison Captain and move to #7 {stables} (kurdo) or #8 {sanctum} (Shaukan) to reinforce. Stay mobile.",
            "**Labanet (54.6M)** — Capture support. Join Purpand at the start and take #4 {belltower}. Once it flips, hand off to JORDAN and move with Purpand to #7 {stables} (kurdo) or #8 {sanctum} (Shaukan). Stay mobile.",
            "**JORDAN (51.8M)** — Garrison Captain. Station near #4 {belltower} at the start. Once Purpand captures it, take captain and hold. Do not leave unless ARMADA calls a rotation. Capture speed matters all match."
          ]},

          { type: "sub", text: "#7 {stables} (kurdo) — Teleport Cooldown" },
          { type: "list", items: [
            "**kurdo (51.6M)** — Lead capture. Take #7 {stables} immediately at the start with SirTav. Once it flips, hand off to MARK 07 as Garrison Captain and move to reinforce center or #8 {sanctum} (Shaukan) and #10 {sanctum} (KAYSTER). Stay mobile.",
            "**SirTav (51.1M)** — Capture support. Join kurdo at the start and take #7 {stables}. Once it flips, hand off to MARK 07 and move with kurdo to reinforce center. Stay mobile.",
            "**MARK 07 (50.9M)** — Garrison Captain. Station near #7 {stables} at the start. Once kurdo captures it, take captain and hold. Do not leave unless ARMADA calls a rotation. The teleport cooldown reduction must stay active."
          ]},

          { type: "sub", text: "#1 {swordshrine} (MANIA) — Core, Highest Points" },
          { type: "list", items: [
            "**MANIA (98.7M)** — Lead rally captain. Buff yourself with 2K gem buffs before the rally. Lead the capture wave on #1 {swordshrine} with HADES and ARMADA. Once it flips, hand off to ASHISH as Garrison Captain and move with HADES and ARMADA to pressure #3 {reformation} (Tiger) or enemy #8 {sanctum} (Shaukan) and #10 {sanctum} (KAYSTER). Do not sit inside a building.",
            "**HADES (90.1M)** — Rally lead. Buff yourself with 2K gem buffs before the rally. Join MANIA's capture wave on #1 {swordshrine}. After the handoff to ASHISH, move with MANIA and ARMADA to pressure #3 {reformation} (Tiger) or enemy core. Stay mobile.",
            "**ARMADA (88.4M)** — Coordinator and rally lead. Buff yourself with 2K gem buffs before the rally. Call targets in Squad Chat. Join MANIA's capture wave on #1 {swordshrine}. After the handoff to ASHISH, move with MANIA and HADES to pressure #3 {reformation} (Tiger) or enemy core. Your job is to read the map, call the next objective, and keep the capture teams moving.",
            "**ASHISH (82.2M)** — Garrison Captain. Station near #1 {swordshrine} before 15:00. Once MANIA captures it, take captain and hold with Zoe reinforcing. Do not leave #1 {swordshrine} unless ARMADA calls a rotation. You are the anchor of the core.",
            "**Zoe (56.4M)** — Reinforcement. Station near #1 {swordshrine} and reinforce ASHISH once the building flips. Hold with him and do not leave unless ARMADA calls a rotation."
          ]},

          { type: "sub", text: "#3 {reformation} (Tiger) — Attack/Defense Buff" },
          { type: "list", items: [
            "**Tiger (65.5M)** — Lead rally captain. Buff yourself with 2K gem buffs before the rally. Lead the capture wave on #3 {reformation} with Anubis. Once it flips, hand off to BigBen as Garrison Captain and move with Anubis to reinforce #1 {swordshrine} (ASHISH) or pressure enemy core. Stay mobile.",
            "**Anubis (61.3M)** — Rally lead. Buff yourself with 2K gem buffs before the rally. Join Tiger's capture wave on #3 {reformation}. After the handoff to BigBen, move with Tiger to reinforce #1 {swordshrine} (ASHISH) or pressure enemy core. Stay mobile.",
            "**BigBen (58.2M)** — Garrison Captain. Station near #3 {reformation} before 15:00. Once Tiger captures it, take captain and hold. Do not leave #3 {reformation} unless ARMADA calls a rotation. The attack and defense buff from #3 {reformation} must stay active for your alliance."
          ]},

          { type: "sub", text: "#8 {sanctum} (Shaukan) — Core" },
          { type: "list", items: [
            "**Shaukan (50.7M)** — Lead capture. Take #8 {sanctum} with Gully at the start. Once it flips, hand off to JeCqtumkiff as Garrison Captain and move to reinforce #10 {sanctum} (KAYSTER) or #1 {swordshrine} (ASHISH). Stay mobile.",
            "**Gully (50M)** — Capture support. Join Shaukan at the start and take #8 {sanctum}. Once it flips, hand off to JeCqtumkiff and move with Shaukan to reinforce #10 {sanctum} (KAYSTER) or #1 {swordshrine} (ASHISH). Stay mobile.",
            "**JeCqtumkiff (49.7M)** — Garrison Captain. Station near #8 {sanctum} at the start. Once Shaukan captures it, take captain and hold. Do not leave unless ARMADA calls a rotation. #8 {sanctum} is core."
          ]},

          { type: "sub", text: "#10 {sanctum} (KAYSTER) — Core" },
          { type: "list", items: [
            "**KAYSTER (49M)** — Lead capture. Take #10 {sanctum} with Thanoss at the start. Once it flips, hand off to Gianna as Garrison Captain and move to reinforce #1 {swordshrine} (ASHISH). Stay mobile.",
            "**Thanoss (43.6M)** — Capture support. Join KAYSTER at the start and take #10 {sanctum}. Once it flips, hand off to Gianna and move to reinforce #1 {swordshrine} (ASHISH) with KAYSTER. Stay mobile.",
            "**Gianna (42.8M)** — Garrison Captain. Station near #10 {sanctum} at the start. Once KAYSTER captures it, take captain and hold. Do not leave unless ARMADA calls a rotation. #10 {sanctum} is core."
          ]},

          { type: "sub", text: "#2 {mercenary} (GhoSt) — Mercenary Attacks" },
          { type: "list", items: [
            "**GhoSt (52.4M, R5)** — Captain. Station near #2 {mercenary} before 15:00. Once it becomes available, take it and use mercenaries every 7 minutes on enemy core. Coordinate timing with ARMADA in Squad Chat. Help with overall coordination from R5."
          ]},

          { type: "sub", text: "#5 {abbey} (GrizzledAncient)" },
          { type: "list", items: [
            "**GrizzledAncient (40.8M)** — Capture. Take #5 {abbey} at the start with Aronofsky. Once it flips, Aronofsky holds and you move to reinforce #6 {abbey} (GrZeChU) or #9 {abbey} (Loba) if needed. Stay mobile.",
            "**Aronofsky (39.8M)** — Garrison Captain. Station near #5 {abbey} at the start. Once GrizzledAncient captures it, take captain and hold. Do not leave unless ARMADA calls a rotation."
          ]},

          { type: "sub", text: "#6 {abbey} (GrZeChU)" },
          { type: "list", items: [
            "**GrZeChU (39.4M)** — Capture. Take #6 {abbey} at the start with Mook. Once it flips, Mook holds and you move to reinforce #5 {abbey} (GrizzledAncient) or #9 {abbey} (Loba) if needed. Stay mobile.",
            "**Mook (38.8M)** — Garrison Captain. Station near #6 {abbey} at the start. Once GrZeChU captures it, take captain and hold. Do not leave unless ARMADA calls a rotation. Help collect dropped points when safe."
          ]},

          { type: "sub", text: "#9 {abbey} (Loba)" },
          { type: "list", items: [
            "**Loba (37.3M)** — Capture and Hold. Take #9 {abbey} at the start and hold it. Do not leave unless ARMADA calls a rotation. Collect dropped points when safe."
          ]},

          { type: "sub", text: "#11 {abbey} (Floating)" },
          { type: "list", items: [
            "**Floating** — Cover #11 {abbey} and flex wherever ARMADA calls. Reinforce core if needed, flip {abbey}s if needed, grab dropped points. Flex squad."
          ]},

          { type: "h", text: "🔎 QUICK REFERENCE BY BUILDING" },
          { type: "list", items: [
            "#4 {belltower} (Purpand) — Capture: Purpand, Labanet. Garrison: JORDAN.",
            "#7 {stables} (kurdo) — Capture: kurdo, SirTav. Garrison: MARK 07.",
            "#1 {swordshrine} (MANIA) — Capture: MANIA, HADES, ARMADA. Garrison: ASHISH. Reinforcement: Zoe.",
            "#3 {reformation} (Tiger) — Capture: Tiger, Anubis. Garrison: BigBen.",
            "#8 {sanctum} (Shaukan) — Capture: Shaukan, Gully. Garrison: JeCqtumkiff.",
            "#10 {sanctum} (KAYSTER) — Capture: KAYSTER, Thanoss. Garrison: Gianna.",
            "#2 {mercenary} (GhoSt) — Captain: GhoSt.",
            "#5 {abbey} (GrizzledAncient) — Capture: GrizzledAncient. Garrison: Aronofsky.",
            "#6 {abbey} (GrZeChU) — Capture: GrZeChU. Garrison: Mook.",
            "#9 {abbey} (Loba) — Capture and Hold: Loba.",
            "#11 {abbey} (Floating) — Floating."
          ]},

          { type: "h", text: "🔥 RALLY LEADER BUFF REMINDER" },
          { type: "p", text: "Legion 1 rally leaders only: MANIA, HADES, ARMADA, Tiger, Anubis. Use 2K gem buffs before your rallies if possible. This gives you a real edge in capture fights and makes your rallies harder to break. Not required, but strongly recommended." },

          { type: "h", text: "📣 COORDINATOR NOTES FOR ARMADA" },
          { type: "list", items: [
            "Call targets by map number and player name: “#3 {reformation} Tiger, rally now.” / “MANIA, pressure enemy #10 {sanctum}.”",
            "Keep capture teams mobile. Do not let MANIA, HADES, Tiger, or Anubis sit inside buildings.",
            "Rotate Garrison Captains only when necessary. Every rotation risks losing the building.",
            "Track #2 {mercenary} cooldown. GhoSt uses it every 7 minutes.",
            "In the last 10 minutes, protect #1 {swordshrine}, #8 {sanctum}, #10 {sanctum}. Do not chase kills.",
            "Remind everyone: Legion 1 result decides alliance rewards.",
            "No substitutes this time. Everyone on this list is main roster. If someone is late, flex players cover their spot."
          ]},

          { type: "h", text: "📌 FINAL NOTES" },
          { type: "list", items: [
            "All players must be online at start.",
            "R4/R5 call targets by map number in Squad Chat.",
            "No one has to speak on voice. Following Squad Chat and the map is enough.",
            "Remember: building names, map positions, and colour zones.",
            "Garrison Captains stay inside their building and hold until relieved. Capture teams stay mobile and aggressive.",
            "Rally leaders: use 2K gem buffs if possible. Legion 1 only.",
            "**Core rule:** hold #1 {swordshrine} + #8 {sanctum} + #10 {sanctum}. Use #4 {belltower}, #7 {stables}, #3 {reformation}, #2 {mercenary}. Farm {abbey}s and dropped points.",
            "**Never trade a core building for kills.**"
          ]},
          { type: "p", text: "Good luck on Sunday." },

          { type: "h", text: "🗺️ MAP" },
          { type: "img", src: "figures/NEXUS_SwordlanShowdown_Map.jpeg", alt: "Map" },
          { type: "h", text: "🧭 ASSIGNED ZONES" },
          { type: "img", src: "figures/assigned_zone.png", alt: "Assigned zones" }
        ]
      },
      zh: {
        title: "近期聯盟活動",
        blocks: [
          { type: "img", src: "figures/Legion_1.png", alt: "Legion 1" },
          { type: "h", text: "📅 LEGION 1 — 聖劍爭奪 玩家分配" },
          { type: "p", text: "**日期：** 20.09（週日）· **協調員：** ARMADA (88.4M)" },
          { type: "p", text: "Legion 1 是主戰場，結果會決定整個聯盟的獎勵。" },
          { type: "callout", text: "**這次沒有替補。** 以下列出的玩家全部都是主力名單。" },

          { type: "h", text: "🎯 作戰原則" },
          { type: "p", text: "最強的玩家負責進攻與佔領。建築一旦易主，就由**駐防隊長**留守，佔領隊繼續前進。駐防隊長不要離開去追擊擊殺。佔領隊要保持機動、積極進攻。" },
          { type: "callout", text: "**集結隊長：** 有辦法的話，請用 2K 寶石加成強化自己。這只建議 Legion 1 的集結隊長使用。它能讓你在佔領戰中占到明顯優勢，也讓你的集結更難被打破。" },

          { type: "sub", text: "#4 {belltower} (Purpand) — 佔領速度" },
          { type: "list", items: [
            "**Purpand (55M)** — 佔領主力。開場立刻和 Labanet 一起拿下 #4 {belltower}。易主後交給 JORDAN 擔任駐防隊長，自己前往 #7 {stables} (kurdo) 或 #8 {sanctum} (Shaukan) 增援。保持機動。",
            "**Labanet (54.6M)** — 佔領支援。開場加入 Purpand，一起拿下 #4 {belltower}。易主後交給 JORDAN，並和 Purpand 一起前往 #7 {stables} (kurdo) 或 #8 {sanctum} (Shaukan)。保持機動。",
            "**JORDAN (51.8M)** — 駐防隊長。開場先在 #4 {belltower} 附近待命。Purpand 佔領後，接任隊長並守住。除非 ARMADA 下令輪調，否則不要離開。佔領速度整場都很重要。"
          ]},

          { type: "sub", text: "#7 {stables} (kurdo) — 傳送冷卻" },
          { type: "list", items: [
            "**kurdo (51.6M)** — 佔領主力。開場立刻和 SirTav 一起拿下 #7 {stables}。易主後交給 MARK 07 擔任駐防隊長，自己前往中央，或 #8 {sanctum} (Shaukan) 與 #10 {sanctum} (KAYSTER) 增援。保持機動。",
            "**SirTav (51.1M)** — 佔領支援。開場加入 kurdo，一起拿下 #7 {stables}。易主後交給 MARK 07，並和 kurdo 一起前往中央增援。保持機動。",
            "**MARK 07 (50.9M)** — 駐防隊長。開場先在 #7 {stables} 附近待命。kurdo 佔領後，接任隊長並守住。除非 ARMADA 下令輪調，否則不要離開。傳送冷卻縮減效果必須一直保持。"
          ]},

          { type: "sub", text: "#1 {swordshrine} (MANIA) — 核心，最高積分" },
          { type: "list", items: [
            "**MANIA (98.7M)** — 集結主力隊長。開集結前先用 2K 寶石加成強化自己。帶領 HADES 和 ARMADA 對 #1 {swordshrine} 發動佔領攻勢。易主後交給 ASHISH 擔任駐防隊長，並和 HADES、ARMADA 一起前往壓制 #3 {reformation} (Tiger)，或敵方 #8 {sanctum} (Shaukan) 與 #10 {sanctum} (KAYSTER)。不要待在建築裡面。",
            "**HADES (90.1M)** — 集結主力。開集結前先用 2K 寶石加成強化自己。加入 MANIA 對 #1 {swordshrine} 的佔領攻勢。交給 ASHISH 後，和 MANIA、ARMADA 一起前往壓制 #3 {reformation} (Tiger) 或敵方核心。保持機動。",
            "**ARMADA (88.4M)** — 協調員兼集結主力。開集結前先用 2K 寶石加成強化自己。在小隊聊天頻道指揮目標。加入 MANIA 對 #1 {swordshrine} 的佔領攻勢。交給 ASHISH 後，和 MANIA、HADES 一起前往壓制 #3 {reformation} (Tiger) 或敵方核心。你的工作是看地圖、指定下一個目標，並讓佔領隊持續行動。",
            "**ASHISH (82.2M)** — 駐防隊長。15:00 前先在 #1 {swordshrine} 附近待命。MANIA 佔領後，接任隊長並守住，由 Zoe 增援。除非 ARMADA 下令輪調，否則不要離開 #1 {swordshrine}。你是核心的支柱。",
            "**Zoe (56.4M)** — 增援。在 #1 {swordshrine} 附近待命，建築易主後增援 ASHISH。與他一起守住，除非 ARMADA 下令輪調，否則不要離開。"
          ]},

          { type: "sub", text: "#3 {reformation} (Tiger) — 攻擊／防禦加成" },
          { type: "list", items: [
            "**Tiger (65.5M)** — 集結主力隊長。開集結前先用 2K 寶石加成強化自己。和 Anubis 一起帶領對 #3 {reformation} 的佔領攻勢。易主後交給 BigBen 擔任駐防隊長，並和 Anubis 一起前往增援 #1 {swordshrine} (ASHISH)，或壓制敵方核心。保持機動。",
            "**Anubis (61.3M)** — 集結主力。開集結前先用 2K 寶石加成強化自己。加入 Tiger 對 #3 {reformation} 的佔領攻勢。交給 BigBen 後，和 Tiger 一起前往增援 #1 {swordshrine} (ASHISH) 或壓制敵方核心。保持機動。",
            "**BigBen (58.2M)** — 駐防隊長。15:00 前先在 #3 {reformation} 附近待命。Tiger 佔領後，接任隊長並守住。除非 ARMADA 下令輪調，否則不要離開 #3 {reformation}。#3 {reformation} 給你們聯盟的攻擊與防禦加成必須一直保持。"
          ]},

          { type: "sub", text: "#8 {sanctum} (Shaukan) — 核心" },
          { type: "list", items: [
            "**Shaukan (50.7M)** — 佔領主力。開場和 Gully 一起拿下 #8 {sanctum}。易主後交給 JeCqtumkiff 擔任駐防隊長，自己前往增援 #10 {sanctum} (KAYSTER) 或 #1 {swordshrine} (ASHISH)。保持機動。",
            "**Gully (50M)** — 佔領支援。開場加入 Shaukan，一起拿下 #8 {sanctum}。易主後交給 JeCqtumkiff，並和 Shaukan 一起前往增援 #10 {sanctum} (KAYSTER) 或 #1 {swordshrine} (ASHISH)。保持機動。",
            "**JeCqtumkiff (49.7M)** — 駐防隊長。開場先在 #8 {sanctum} 附近待命。Shaukan 佔領後，接任隊長並守住。除非 ARMADA 下令輪調，否則不要離開。#8 {sanctum} 是核心。"
          ]},

          { type: "sub", text: "#10 {sanctum} (KAYSTER) — 核心" },
          { type: "list", items: [
            "**KAYSTER (49M)** — 佔領主力。開場和 Thanoss 一起拿下 #10 {sanctum}。易主後交給 Gianna 擔任駐防隊長，自己前往增援 #1 {swordshrine} (ASHISH)。保持機動。",
            "**Thanoss (43.6M)** — 佔領支援。開場加入 KAYSTER，一起拿下 #10 {sanctum}。易主後交給 Gianna，並和 KAYSTER 一起前往增援 #1 {swordshrine} (ASHISH)。保持機動。",
            "**Gianna (42.8M)** — 駐防隊長。開場先在 #10 {sanctum} 附近待命。KAYSTER 佔領後，接任隊長並守住。除非 ARMADA 下令輪調，否則不要離開。#10 {sanctum} 是核心。"
          ]},

          { type: "sub", text: "#2 {mercenary} (GhoSt) — 傭兵攻擊" },
          { type: "list", items: [
            "**GhoSt (52.4M, R5)** — 隊長。15:00 前先在 #2 {mercenary} 附近待命。可以使用後就佔領它，每 7 分鐘對敵方核心使用一次傭兵。在小隊聊天頻道和 ARMADA 協調時機。以 R5 的身分協助整體協調。"
          ]},

          { type: "sub", text: "#5 {abbey} (GrizzledAncient)" },
          { type: "list", items: [
            "**GrizzledAncient (40.8M)** — 佔領。開場和 Aronofsky 一起拿下 #5 {abbey}。易主後由 Aronofsky 守住，你視需要前往增援 #6 {abbey} (GrZeChU) 或 #9 {abbey} (Loba)。保持機動。",
            "**Aronofsky (39.8M)** — 駐防隊長。開場先在 #5 {abbey} 附近待命。GrizzledAncient 佔領後，接任隊長並守住。除非 ARMADA 下令輪調，否則不要離開。"
          ]},

          { type: "sub", text: "#6 {abbey} (GrZeChU)" },
          { type: "list", items: [
            "**GrZeChU (39.4M)** — 佔領。開場和 Mook 一起拿下 #6 {abbey}。易主後由 Mook 守住，你視需要前往增援 #5 {abbey} (GrizzledAncient) 或 #9 {abbey} (Loba)。保持機動。",
            "**Mook (38.8M)** — 駐防隊長。開場先在 #6 {abbey} 附近待命。GrZeChU 佔領後，接任隊長並守住。除非 ARMADA 下令輪調，否則不要離開。安全時協助撿取掉落的積分。"
          ]},

          { type: "sub", text: "#9 {abbey} (Loba)" },
          { type: "list", items: [
            "**Loba (37.3M)** — 佔領並守住。開場拿下 #9 {abbey} 並守住。除非 ARMADA 下令輪調，否則不要離開。安全時撿取掉落的積分。"
          ]},

          { type: "sub", text: "#11 {abbey} (Floating)" },
          { type: "list", items: [
            "**Floating** — 負責 #11 {abbey}，並聽 ARMADA 指揮機動支援。必要時增援核心、翻轉{abbey}、撿取掉落的積分。機動小隊。"
          ]},

          { type: "h", text: "🔎 各建築快速對照" },
          { type: "list", items: [
            "#4 {belltower} (Purpand) — 佔領：Purpand、Labanet。駐防：JORDAN。",
            "#7 {stables} (kurdo) — 佔領：kurdo、SirTav。駐防：MARK 07。",
            "#1 {swordshrine} (MANIA) — 佔領：MANIA、HADES、ARMADA。駐防：ASHISH。增援：Zoe。",
            "#3 {reformation} (Tiger) — 佔領：Tiger、Anubis。駐防：BigBen。",
            "#8 {sanctum} (Shaukan) — 佔領：Shaukan、Gully。駐防：JeCqtumkiff。",
            "#10 {sanctum} (KAYSTER) — 佔領：KAYSTER、Thanoss。駐防：Gianna。",
            "#2 {mercenary} (GhoSt) — 隊長：GhoSt。",
            "#5 {abbey} (GrizzledAncient) — 佔領：GrizzledAncient。駐防：Aronofsky。",
            "#6 {abbey} (GrZeChU) — 佔領：GrZeChU。駐防：Mook。",
            "#9 {abbey} (Loba) — 佔領並守住：Loba。",
            "#11 {abbey} (Floating) — 機動（Floating）。"
          ]},

          { type: "h", text: "🔥 集結隊長加成提醒" },
          { type: "p", text: "只限 Legion 1 的集結隊長：MANIA、HADES、ARMADA、Tiger、Anubis。可以的話，開集結前請使用 2K 寶石加成。這能讓你在佔領戰中占到明顯優勢，也讓你的集結更難被打破。不是強制，但強烈建議。" },

          { type: "h", text: "📣 給 ARMADA 的協調員筆記" },
          { type: "list", items: [
            "用地圖編號和玩家名字下達目標：「#3 {reformation} Tiger，立刻集結。」／「MANIA，壓制敵方 #10 {sanctum}。」",
            "讓佔領隊保持機動。不要讓 MANIA、HADES、Tiger、Anubis 待在建築裡面。",
            "非必要不要輪換駐防隊長。每次輪換都有可能丟掉建築。",
            "追蹤 #2 {mercenary} 的冷卻時間。GhoSt 每 7 分鐘使用一次。",
            "最後 10 分鐘，保護 #1 {swordshrine}、#8 {sanctum}、#10 {sanctum}，不要去追擊擊殺。",
            "提醒大家：Legion 1 的結果決定聯盟獎勵。",
            "這次沒有替補，名單上的每個人都是主力。如果有人遲到，機動（flex）成員會補上他的位置。"
          ]},

          { type: "h", text: "📌 最終提醒" },
          { type: "list", items: [
            "所有玩家開戰時必須在線上。",
            "R4/R5 會在小隊聊天頻道用地圖編號指示目標。",
            "不需要開語音。跟著小隊聊天頻道和地圖走就夠了。",
            "記住：建築名稱、地圖位置和顏色分區。",
            "駐防隊長留在建築內守住，直到被換下。佔領隊保持機動、積極進攻。",
            "集結隊長：可以的話請使用 2K 寶石加成。僅限 Legion 1。",
            "**核心原則：** 守住 #1 {swordshrine}＋#8 {sanctum}＋#10 {sanctum}。善用 #4 {belltower}、#7 {stables}、#3 {reformation}、#2 {mercenary}。刷{abbey}和掉落的積分。",
            "**絕對不要為了擊殺而放棄核心建築。**"
          ]},
          { type: "p", text: "週日祝大家順利！" },

          { type: "h", text: "🗺️ 地圖" },
          { type: "img", src: "figures/NEXUS_SwordlanShowdown_Map.jpeg", alt: "地圖" },
          { type: "h", text: "🧭 分配區域" },
          { type: "img", src: "figures/assigned_zone.png", alt: "分配區域" }
        ]
      },
      ko: {
        title: "최근 연맹 이벤트",
        blocks: [
          { type: "img", src: "figures/Legion_1.png", alt: "Legion 1" },
          { type: "h", text: "📅 LEGION 1 — 성검 쟁탈 플레이어 배치" },
          { type: "p", text: "**날짜:** 일요일, 20.09 · **코디네이터:** ARMADA (88.4M)" },
          { type: "p", text: "Legion 1은 주 전투입니다. 결과가 연맹 전체 보상에 반영됩니다." },
          { type: "callout", text: "**이번에는 교체 선수가 없습니다.** 아래에 나열된 모든 플레이어는 메인 로스터입니다." },

          { type: "h", text: "🎯 진영 정책 (DOCTRINE REMINDER)" },
          { type: "p", text: "가장 강한 플레이어들이 공격하고 지정 받은 건물을 점령합니다. 건물 점령/탈환에 성공하면 **수비 대장(Garrison Captain)**이 건물을 유지하고, 점령/탈환 팀은 계속 이동합니다. 수비 대장은 킬을 쫓아 이동하지 않습니다. 점령 팀은 기동성을 유지하고 공격적으로 임합니다." },
          { type: "callout", text: "**집결 리더:** 가능하다면 2K 보석 버프로 스스로를 강화하세요. Legion 1 집결 리더에게만 권장됩니다. 점령 전투에서 확실한 우위를 주고 집결이 쉽게 깨지지 않게 해줍니다." },

          { type: "sub", text: "#4 {belltower} (Purpand) — 점령 속도" },
          { type: "list", items: [
            "**Purpand (55M)** — 점령 리드. Labanet과 함께 시작하자마자 #4 {belltower}을 즉시 점령합니다. 점령이 완료되면 JORDAN에게 수비 대장을 인계하고 #7 {stables} (kurdo) 또는 #8 {sanctum} (Shaukan)로 이동하여 지원합니다. 기동성을 유지하세요.",
            "**Labanet (54.6M)** — 점령 서포트. 시작 시 Purpand와 합류하여 #4 {belltower}을 점령합니다. 점령이 완료되면 JORDAN에게 인계하고 Purpand와 함께 #7 {stables} (kurdo) 또는 #8 {sanctum} (Shaukan)로 이동합니다. 기동성을 유지하세요.",
            "**JORDAN (51.8M)** — 수비 대장. 시작 시 #4 {belltower} 근처에 배치. Purpand가 점령을 완료하면 대장 자리를 이어받아 유지합니다. ARMADA가 로테이션을 지시하지 않는 한 자리를 이탈하지 마세요. 경기 내내 점령 속도가 중요합니다."
          ]},

          { type: "sub", text: "#7 {stables} (kurdo) — 텔레포트 쿨다운" },
          { type: "list", items: [
            "**kurdo (51.6M)** — 점령 리드. SirTav과 함께 시작하자마자 #7 {stables}을 즉시 점령합니다. 점령이 완료되면 MARK 07에게 수비 대장을 인계하고 중앙 또는 #8 {sanctum} (Shaukan), #10 {sanctum} (KAYSTER) 지원을 위해 이동합니다. 기동성을 유지하세요.",
            "**SirTav (51.1M)** — 점령 서포트. 시작 시 kurdo와 합류하여 #7 {stables}을 점령합니다. 점령이 완료되면 MARK 07에게 인계하고 kurdo와 함께 중앙 지원을 위해 이동합니다. 기동성을 유지하세요.",
            "**MARK 07 (50.9M)** — 수비 대장. 시작 시 #7 {stables} 근처에 배치됩니다. kurdo가 점령을 완료하면 대장 자리를 이어받아 유지합니다. ARMADA가 로테이션을 지시하지 않는 한 자리를 이탈하지 마세요. 텔레포트 쿨다운 감소 효과가 계속 활성화되어 있어야 합니다."
          ]},

          { type: "sub", text: "#1 {swordshrine} (MANIA) — 코어, 최고 점수" },
          { type: "list", items: [
            "**MANIA (98.7M)** — 주력 집결 리더. 집결 전에 2K 보석 버프로 스스로를 강화하세요. HADES, ARMADA와 함께 #1 {swordshrine} 점령 웨이브를 리드합니다. 점령이 완료되면 ASHISH에게 수비 대장을 인계하고, HADES 및 ARMADA와 함께 #3 {reformation} (Tiger) 또는 적 #8 {sanctum} (Shaukan) 및 #10 {sanctum} (KAYSTER)를 압박하기 위해 이동합니다. 건물 안에 가만히 머물지 마세요.",
            "**HADES (90.1M)** — 집결 리드. 집결 전에 2K 보석 버프로 스스로를 강화하세요. MANIA의 #1 {swordshrine} 점령 웨이브에 합류합니다. ASHISH에게 인계한 후, MANIA 및 ARMADA와 함께 #3 {reformation} (Tiger) 또는 적진을 압박하기 위해 이동합니다. 기동성을 유지하세요.",
            "**ARMADA (88.4M)** — 코디네이터 겸 집결 리드. 집결 전에 2K 보석 버프로 스스로를 강화하세요. 스쿼드 채팅에서 타겟을 지시합니다. MANIA의 #1 {swordshrine} 점령 웨이브에 합류합니다. ASHISH에게 인계한 후, MANIA 및 HADES와 함께 #3 {reformation} (Tiger) 또는 적진을 압박하기 위해 이동합니다. 당신의 임무는 전장을 읽고, 다음 목표를 지시하며, 점령 팀의 기동성을 유지하는 것입니다.",
            "**ASHISH (82.2M)** — 수비 대장. 15:00 전에 #1 {swordshrine} 근처에 배치. MANIA가 점령하면 대장 자리를 이어받고 Zoe의 지원을 받으며 방어합니다. ARMADA가 로테이션을 지시하지 않는 한 #1 {swordshrine}을 떠나지 마세요. 코어의 앵커입니다.",
            "**Zoe (56.4M)** — 지원병. #1 {swordshrine} 근처에 배치되며 건물이 점령/탈환되면 ASHISH를 지원합니다. 그와 함께 자리를 지키고 ARMADA가 로테이션을 지시하지 않는 한 이탈하지 마세요."
          ]},

          { type: "sub", text: "#3 {reformation} (Tiger) — 공격/방어 버프" },
          { type: "list", items: [
            "**Tiger (65.5M)** — 주력 집결 리더. 집결 전에 2K 보석 버프로 스스로를 강화하세요. Anubis와 함께 #3 {reformation} 점령 웨이브를 리드합니다. 점령이 완료되면 BigBen에게 수비 대장을 인계하고, Anubis와 함께 #1 {swordshrine} (ASHISH)을 지원하거나 적진을 압박하기 위해 이동합니다. 기동성을 유지하세요.",
            "**Anubis (61.3M)** — 집결 리드. 집결 전에 2K 보석 버프로 스스로를 강화하세요. Tiger의 #3 {reformation} 점령 웨이브에 합류합니다. BigBen에게 인계한 후, Tiger와 함께 #1 {swordshrine} (ASHISH)을 지원하거나 적진을 압박하기 위해 이동합니다. 기동성을 유지하세요.",
            "**BigBen (58.2M)** — 수비 대장. 15:00 전에 #3 {reformation} 근처에 배치. Tiger가 점령하면 대장 자리를 이어받아 유지합니다. ARMADA가 로테이션을 지시하지 않는 한 #3 {reformation}을 떠나지 마세요. #3 {reformation}에서 제공하는 공격력 및 방어력 버프가 우리 연맹에 계속 활성화되어 있어야 합니다."
          ]},

          { type: "sub", text: "#8 {sanctum} (Shaukan) — 코어" },
          { type: "list", items: [
            "**Shaukan (50.7M)** — 점령 리드. 시작 시 Gully와 함께 #8 {sanctum}를 점령합니다. 점령이 완료되면 JeCqtumkiff에게 수비 대장을 인계하고 #10 {sanctum} (KAYSTER) 또는 #1 {swordshrine} (ASHISH) 지원을 위해 이동합니다. 기동성을 유지하세요.",
            "**Gully (50M)** — 점령 서포트. 시작 시 Shaukan과 합류하여 #8 {sanctum}를 점령합니다. 점령이 완료되면 JeCqtumkiff에게 인계하고 Shaukan과 함께 #10 {sanctum} (KAYSTER) 또는 #1 {swordshrine} (ASHISH) 지원을 위해 이동합니다. 기동성을 유지하세요.",
            "**JeCqtumkiff (49.7M)** — 수비 대장. 시작 시 #8 {sanctum} 근처에 배치. Shaukan이 점령을 완료하면 대장 자리를 이어받아 유지합니다. ARMADA가 로테이션을 지시하지 않는 한 자리를 이탈하지 마세요. #8 {sanctum}는 코어 건물입니다."
          ]},

          { type: "sub", text: "#10 {sanctum} (KAYSTER) — 코어" },
          { type: "list", items: [
            "**KAYSTER (49M)** — 점령 리드. 시작 시 Thanoss와 함께 #10 {sanctum}를 점령합니다. 점령이 완료되면 Gianna에게 수비 대장을 인계하고 #1 {swordshrine} (ASHISH) 지원을 위해 이동합니다. 기동성을 유지하세요.",
            "**Thanoss (43.6M)** — 점령 서포트. 시작 시 KAYSTER와 합류하여 #10 {sanctum}를 점령합니다. 점령이 완료되면 Gianna에게 인계하고 KAYSTER와 함께 #1 {swordshrine} (ASHISH) 지원을 위해 이동합니다. 기동성을 유지하세요.",
            "**Gianna (42.8M)** — 수비 대장. 시작 시 #10 {sanctum} 근처에 배치. KAYSTER가 점령을 완료하면 대장 자리를 이어받아 유지합니다. ARMADA가 로테이션을 지시하지 않는 한 자리를 이탈하지 마세요. #10 {sanctum}는 코어 건물입니다."
          ]},

          { type: "sub", text: "#2 {mercenary} (GhoSt) — 용병 공격" },
          { type: "list", items: [
            "**GhoSt (52.4M, R5)** — 대장. 15:00 전에 #2 {mercenary} 근처에 배치. 주둔지가 활성화되면 점령하고, 7분마다 적진에 용병을 출격시킵니다. 스쿼드 채팅에서 ARMADA와 타이밍을 조율하세요. R5로서 전체 조율도 도와주세요."
          ]},

          { type: "sub", text: "#5 {abbey} (GrizzledAncient)" },
          { type: "list", items: [
            "**GrizzledAncient (40.8M)** — 점령. 시작 시 Aronofsky와 함께 #5 {abbey}을 점령합니다. 점령이 완료되면 Aronofsky가 방어를 맡고, 필요에 따라 #6 {abbey} (GrZeChU) 또는 #9 {abbey} (Loba)을 지원하기 위해 이동합니다. 기동성을 유지하세요.",
            "**Aronofsky (39.8M)** — 수비 대장. 시작 시 #5 {abbey} 근처에 배치. GrizzledAncient가 점령을 완료하면 대장 자리를 이어받아 유지합니다. ARMADA가 로테이션을 지시하지 않는 한 자리를 이탈하지 마세요."
          ]},

          { type: "sub", text: "#6 {abbey} (GrZeChU)" },
          { type: "list", items: [
            "**GrZeChU (39.4M)** — 점령. 시작 시 Mook과 함께 #6 {abbey}을 점령합니다. 점령이 완료되면 Mook이 방어를 맡고, 필요에 따라 #5 {abbey} (GrizzledAncient) 또는 #9 {abbey} (Loba)을 지원하기 위해 이동합니다. 기동성을 유지하세요.",
            "**Mook (38.8M)** — 수비 대장. 시작 시 #6 {abbey} 근처에 배치. GrZeChU가 점령을 완료하면 대장 자리를 이어받아 유지합니다. ARMADA가 로테이션을 지시하지 않는 한 자리를 이탈하지 마세요. 안전할 때 드랍된 포인트를 수집하는 것을 도우세요."
          ]},

          { type: "sub", text: "#9 {abbey} (Loba)" },
          { type: "list", items: [
            "**Loba (37.3M)** — 점령 및 유지. 시작 시 #9 {abbey}을 점령하고 유지합니다. ARMADA가 로테이션을 지시하지 않는 한 자리를 이탈하지 마세요. 안전할 때 드랍된 포인트를 획득하세요."
          ]},

          { type: "sub", text: "#11 {abbey} (Floating)" },
          { type: "list", items: [
            "**Floating** — #11 {abbey}을 커버하고 ARMADA가 지시하는 곳 어디든 유동적으로 합류합니다. 필요시 코어를 지원하고, {abbey}을 탈환하거나 드랍된 포인트를 획득하세요. 유동 스쿼드입니다."
          ]},

          { type: "h", text: "🔎 건물별 요약 지침" },
          { type: "list", items: [
            "#4 {belltower} (Purpand) — 점령: Purpand, Labanet. 수비 대장: JORDAN.",
            "#7 {stables} (kurdo) — 점령: kurdo, SirTav. 수비 대장: MARK 07.",
            "#1 {swordshrine} (MANIA) — 점령: MANIA, HADES, ARMADA. 수비 대장: ASHISH. 지원: Zoe.",
            "#3 {reformation} (Tiger) — 점령: Tiger, Anubis. 수비 대장: BigBen.",
            "#8 {sanctum} (Shaukan) — 점령: Shaukan, Gully. 수비 대장: JeCqtumkiff.",
            "#10 {sanctum} (KAYSTER) — 점령: KAYSTER, Thanoss. 수비 대장: Gianna.",
            "#2 {mercenary} (GhoSt) — 대장: GhoSt.",
            "#5 {abbey} (GrizzledAncient) — 점령: GrizzledAncient. 수비 대장: Aronofsky.",
            "#6 {abbey} (GrZeChU) — 점령: GrZeChU. 수비 대장: Mook.",
            "#9 {abbey} (Loba) — 점령 및 유지: Loba.",
            "#11 {abbey} (Floating) — 유동(Floating)."
          ]},

          { type: "h", text: "🔥 집결 리더 버프 리마인더" },
          { type: "p", text: "Legion 1 집결 리더 전용: MANIA, HADES, ARMADA, Tiger, Anubis. 가능하다면 집결 전에 2K 보석 버프를 사용하세요. 점령 전투에서 확실한 우위를 주고 집결이 쉽게 깨지지 않게 해줍니다. 필수는 아니지만 강력히 권장합니다." },

          { type: "h", text: "📣 ARMADA를 위한 코디네이터 노트" },
          { type: "list", items: [
            "맵 번호와 플레이어 이름으로 타겟 지시: “#3 {reformation} Tiger, 지금 집결하세요.” “MANIA, 적 #10 {sanctum} 압박.”",
            "점령 팀의 기동성 유지. MANIA, HADES, Tiger, Anubis가 건물 안에 가만히 머물지 않도록 하세요.",
            "수비 대장 교체는 꼭 필요할 때만 진행. 교체할 때마다 건물을 잃을 위험이 있습니다.",
            "#2 {mercenary} 쿨다운 추적. GhoSt는 7분마다 사용합니다.",
            "마지막 10분 동안에는 #1 {swordshrine}, #8 {sanctum}, #10 {sanctum}를 방어하세요. 킬을 쫓지 마세요.",
            "리마인더: Legion 1의 결과가 연맹 보상을 결정합니다.",
            "이번에는 교체 선수가 없습니다. 이 명단의 모든 플레이어는 메인 로스터입니다. 참여 플레이어가 지각할 경우 유동 플레이어(flex)가 빈자리를 커버합니다."
          ]},

          { type: "h", text: "📌 최종 노트 (FINAL NOTES)" },
          { type: "list", items: [
            "모든 플레이어는 시작 시간에 온라인 상태여야 합니다.",
            "R4/R5는 스쿼드 채팅에서 맵 번호로 타겟을 지시합니다.",
            "음성 채팅을 사용할 필요는 없습니다. 스쿼드 채팅과 맵만 잘 따라오시면 됩니다.",
            "건물 이름, 맵 위치, 색상 구역 기억하기!",
            "수비 대장은 교대될 때까지 건물 안에 머물며 방어합니다. 점령 팀은 기동성을 유지하고 공격적으로 임합니다.",
            "집결 리더: 가능하다면 2K 보석 버프를 사용하세요. Legion 1 전용입니다.",
            "**핵심 규칙:** #1 {swordshrine} + #8 {sanctum} + #10 {sanctum}를 방어합니다. #4 {belltower}, #7 {stables}, #3 {reformation}, #2 {mercenary}를 활용하세요. {abbey}과 드랍된 포인트를 수집하세요.",
            "**킬을 위해 핵심 건물을 절대 내주지 마세요.**"
          ]},
          { type: "p", text: "일요일에 좋은 결과가 있기를 바랍니다." },

          { type: "h", text: "🗺️ 지도" },
          { type: "img", src: "figures/NEXUS_SwordlanShowdown_Map.jpeg", alt: "지도" },
          { type: "h", text: "🧭 배정 구역" },
          { type: "img", src: "figures/assigned_zone.png", alt: "배정 구역" }
        ]
      },
      de: {
        title: "Aktuelle Allianz-Events",
        blocks: [
          { type: "img", src: "figures/Legion_1.png", alt: "Legion 1" },
          { type: "h", text: "📅 LEGION 1 — SCHWERTLAND-SHOWDOWN SPIELERZUWEISUNGEN" },
          { type: "p", text: "**Datum:** Sonntag, 20.09 · **Koordinator:** ARMADA (88.4M)" },
          { type: "p", text: "Legion 1 ist die Hauptschlacht. Das Ergebnis zählt für die gesamten Allianzbelohnungen." },
          { type: "callout", text: "**Diesmal gibt es keine Ersatzspieler.** Alle unten aufgeführten Spieler gehören zur Hauptaufstellung." },

          { type: "h", text: "🎯 DOKTRIN-ERINNERUNG" },
          { type: "p", text: "Die stärksten Spieler greifen an und erobern. Sobald ein Gebäude die Seite gewechselt hat, hält ein **Garnisonskommandant** es, während das Eroberungsteam weiterzieht. Garnisonskommandanten verlassen ihren Posten nicht, um Kills nachzujagen. Eroberungsteams bleiben beweglich und aggressiv." },
          { type: "callout", text: "**Rally-Anführer:** Buffe dich nach Möglichkeit mit 2K-Edelstein-Buffs. Das wird nur für Rally-Anführer in Legion 1 empfohlen. Es verschafft dir einen echten Vorteil in Eroberungskämpfen und macht deine Rallys schwerer zu brechen." },

          { type: "sub", text: "#4 {belltower} (Purpand) — Eroberungsgeschwindigkeit" },
          { type: "list", items: [
            "**Purpand (55M)** — Eroberungsleitung. Erobere #4 {belltower} gleich zu Beginn zusammen mit Labanet. Sobald es die Seite gewechselt hat, übergib an JORDAN als Garnisonskommandant und wechsle zur Verstärkung zu #7 {stables} (kurdo) oder #8 {sanctum} (Shaukan). Bleib beweglich.",
            "**Labanet (54.6M)** — Eroberungsunterstützung. Schließe dich zu Beginn Purpand an und erobere #4 {belltower}. Sobald es die Seite gewechselt hat, übergib an JORDAN und zieh mit Purpand weiter zu #7 {stables} (kurdo) oder #8 {sanctum} (Shaukan). Bleib beweglich.",
            "**JORDAN (51.8M)** — Garnisonskommandant. Postiere dich zu Beginn in der Nähe von #4 {belltower}. Sobald Purpand es erobert hat, übernimm das Kommando und halte es. Verlasse es nicht, außer ARMADA ruft eine Rotation aus. Eroberungsgeschwindigkeit zählt das ganze Match."
          ]},

          { type: "sub", text: "#7 {stables} (kurdo) — Teleport-Abklingzeit" },
          { type: "list", items: [
            "**kurdo (51.6M)** — Eroberungsleitung. Erobere #7 {stables} gleich zu Beginn zusammen mit SirTav. Sobald es die Seite gewechselt hat, übergib an MARK 07 als Garnisonskommandant und verstärke die Mitte oder #8 {sanctum} (Shaukan) und #10 {sanctum} (KAYSTER). Bleib beweglich.",
            "**SirTav (51.1M)** — Eroberungsunterstützung. Schließe dich zu Beginn kurdo an und erobere #7 {stables}. Sobald es die Seite gewechselt hat, übergib an MARK 07 und verstärke mit kurdo die Mitte. Bleib beweglich.",
            "**MARK 07 (50.9M)** — Garnisonskommandant. Postiere dich zu Beginn in der Nähe von #7 {stables}. Sobald kurdo es erobert hat, übernimm das Kommando und halte es. Verlasse es nicht, außer ARMADA ruft eine Rotation aus. Die Verringerung der Teleport-Abklingzeit muss aktiv bleiben."
          ]},

          { type: "sub", text: "#1 {swordshrine} (MANIA) — Kern, meiste Punkte" },
          { type: "list", items: [
            "**MANIA (98.7M)** — Haupt-Rally-Anführer. Buffe dich vor dem Rally mit 2K-Edelstein-Buffs. Führe die Eroberungswelle auf #1 {swordshrine} zusammen mit HADES und ARMADA an. Sobald es die Seite gewechselt hat, übergib an ASHISH als Garnisonskommandant und setze mit HADES und ARMADA #3 {reformation} (Tiger) oder den Gegner bei #8 {sanctum} (Shaukan) und #10 {sanctum} (KAYSTER) unter Druck. Bleib nicht in einem Gebäude sitzen.",
            "**HADES (90.1M)** — Rally-Anführer. Buffe dich vor dem Rally mit 2K-Edelstein-Buffs. Schließe dich der Eroberungswelle von MANIA auf #1 {swordshrine} an. Nach der Übergabe an ASHISH zieh mit MANIA und ARMADA los, um #3 {reformation} (Tiger) oder den gegnerischen Kern unter Druck zu setzen. Bleib beweglich.",
            "**ARMADA (88.4M)** — Koordinator und Rally-Anführer. Buffe dich vor dem Rally mit 2K-Edelstein-Buffs. Gib Ziele im Squad Chat durch. Schließe dich der Eroberungswelle von MANIA auf #1 {swordshrine} an. Nach der Übergabe an ASHISH zieh mit MANIA und HADES los, um #3 {reformation} (Tiger) oder den gegnerischen Kern unter Druck zu setzen. Deine Aufgabe ist es, die Karte zu lesen, das nächste Ziel auszurufen und die Eroberungsteams in Bewegung zu halten.",
            "**ASHISH (82.2M)** — Garnisonskommandant. Postiere dich vor 15:00 in der Nähe von #1 {swordshrine}. Sobald MANIA es erobert hat, übernimm das Kommando und halte es, mit Zoe als Verstärkung. Verlasse #1 {swordshrine} nicht, außer ARMADA ruft eine Rotation aus. Du bist der Anker des Kerns.",
            "**Zoe (56.4M)** — Verstärkung. Postiere dich in der Nähe von #1 {swordshrine} und verstärke ASHISH, sobald das Gebäude die Seite gewechselt hat. Halte zusammen mit ihm die Stellung und verlasse sie nicht, außer ARMADA ruft eine Rotation aus."
          ]},

          { type: "sub", text: "#3 {reformation} (Tiger) — Angriffs-/Verteidigungsbonus" },
          { type: "list", items: [
            "**Tiger (65.5M)** — Haupt-Rally-Anführer. Buffe dich vor dem Rally mit 2K-Edelstein-Buffs. Führe die Eroberungswelle auf #3 {reformation} zusammen mit Anubis an. Sobald es die Seite gewechselt hat, übergib an BigBen als Garnisonskommandant und verstärke mit Anubis #1 {swordshrine} (ASHISH) oder setze den gegnerischen Kern unter Druck. Bleib beweglich.",
            "**Anubis (61.3M)** — Rally-Anführer. Buffe dich vor dem Rally mit 2K-Edelstein-Buffs. Schließe dich der Eroberungswelle von Tiger auf #3 {reformation} an. Nach der Übergabe an BigBen verstärke mit Tiger #1 {swordshrine} (ASHISH) oder setze den gegnerischen Kern unter Druck. Bleib beweglich.",
            "**BigBen (58.2M)** — Garnisonskommandant. Postiere dich vor 15:00 in der Nähe von #3 {reformation}. Sobald Tiger es erobert hat, übernimm das Kommando und halte es. Verlasse #3 {reformation} nicht, außer ARMADA ruft eine Rotation aus. Der Angriffs- und Verteidigungsbonus von #3 {reformation} muss für eure Allianz aktiv bleiben."
          ]},

          { type: "sub", text: "#8 {sanctum} (Shaukan) — Kern" },
          { type: "list", items: [
            "**Shaukan (50.7M)** — Eroberungsleitung. Erobere #8 {sanctum} gleich zu Beginn zusammen mit Gully. Sobald es die Seite gewechselt hat, übergib an JeCqtumkiff als Garnisonskommandant und verstärke #10 {sanctum} (KAYSTER) oder #1 {swordshrine} (ASHISH). Bleib beweglich.",
            "**Gully (50M)** — Eroberungsunterstützung. Schließe dich zu Beginn Shaukan an und erobere #8 {sanctum}. Sobald es die Seite gewechselt hat, übergib an JeCqtumkiff und verstärke mit Shaukan #10 {sanctum} (KAYSTER) oder #1 {swordshrine} (ASHISH). Bleib beweglich.",
            "**JeCqtumkiff (49.7M)** — Garnisonskommandant. Postiere dich zu Beginn in der Nähe von #8 {sanctum}. Sobald Shaukan es erobert hat, übernimm das Kommando und halte es. Verlasse es nicht, außer ARMADA ruft eine Rotation aus. #8 {sanctum} gehört zum Kern."
          ]},

          { type: "sub", text: "#10 {sanctum} (KAYSTER) — Kern" },
          { type: "list", items: [
            "**KAYSTER (49M)** — Eroberungsleitung. Erobere #10 {sanctum} gleich zu Beginn zusammen mit Thanoss. Sobald es die Seite gewechselt hat, übergib an Gianna als Garnisonskommandant und verstärke #1 {swordshrine} (ASHISH). Bleib beweglich.",
            "**Thanoss (43.6M)** — Eroberungsunterstützung. Schließe dich zu Beginn KAYSTER an und erobere #10 {sanctum}. Sobald es die Seite gewechselt hat, übergib an Gianna und verstärke mit KAYSTER #1 {swordshrine} (ASHISH). Bleib beweglich.",
            "**Gianna (42.8M)** — Garnisonskommandant. Postiere dich zu Beginn in der Nähe von #10 {sanctum}. Sobald KAYSTER es erobert hat, übernimm das Kommando und halte es. Verlasse es nicht, außer ARMADA ruft eine Rotation aus. #10 {sanctum} gehört zum Kern."
          ]},

          { type: "sub", text: "#2 {mercenary} (GhoSt) — Söldnerangriffe" },
          { type: "list", items: [
            "**GhoSt (52.4M, R5)** — Kapitän. Postiere dich vor 15:00 in der Nähe von #2 {mercenary}. Sobald es verfügbar ist, nimm es ein und setze alle 7 Minuten Söldner gegen den gegnerischen Kern ein. Stimme das Timing mit ARMADA im Squad Chat ab. Unterstütze als R5 die Gesamtkoordination."
          ]},

          { type: "sub", text: "#5 {abbey} (GrizzledAncient)" },
          { type: "list", items: [
            "**GrizzledAncient (40.8M)** — Eroberung. Erobere #5 {abbey} zu Beginn zusammen mit Aronofsky. Sobald es die Seite gewechselt hat, hält Aronofsky es und du verstärkst bei Bedarf #6 {abbey} (GrZeChU) oder #9 {abbey} (Loba). Bleib beweglich.",
            "**Aronofsky (39.8M)** — Garnisonskommandant. Postiere dich zu Beginn in der Nähe von #5 {abbey}. Sobald GrizzledAncient es erobert hat, übernimm das Kommando und halte es. Verlasse es nicht, außer ARMADA ruft eine Rotation aus."
          ]},

          { type: "sub", text: "#6 {abbey} (GrZeChU)" },
          { type: "list", items: [
            "**GrZeChU (39.4M)** — Eroberung. Erobere #6 {abbey} zu Beginn zusammen mit Mook. Sobald es die Seite gewechselt hat, hält Mook es und du verstärkst bei Bedarf #5 {abbey} (GrizzledAncient) oder #9 {abbey} (Loba). Bleib beweglich.",
            "**Mook (38.8M)** — Garnisonskommandant. Postiere dich zu Beginn in der Nähe von #6 {abbey}. Sobald GrZeChU es erobert hat, übernimm das Kommando und halte es. Verlasse es nicht, außer ARMADA ruft eine Rotation aus. Hilf beim Einsammeln fallengelassener Punkte, wenn es sicher ist."
          ]},

          { type: "sub", text: "#9 {abbey} (Loba)" },
          { type: "list", items: [
            "**Loba (37.3M)** — Erobern und Halten. Erobere #9 {abbey} zu Beginn und halte es. Verlasse es nicht, außer ARMADA ruft eine Rotation aus. Sammle fallengelassene Punkte ein, wenn es sicher ist."
          ]},

          { type: "sub", text: "#11 {abbey} (Floating)" },
          { type: "list", items: [
            "**Floating** — Decke #11 {abbey} ab und sei flexibel, wo immer ARMADA dich ruft. Verstärke bei Bedarf den Kern, erobere bei Bedarf {abbey}en, sammle fallengelassene Punkte ein. Flex-Truppe."
          ]},

          { type: "h", text: "🔎 SCHNELLÜBERSICHT NACH GEBÄUDE" },
          { type: "list", items: [
            "#4 {belltower} (Purpand) — Eroberung: Purpand, Labanet. Garnison: JORDAN.",
            "#7 {stables} (kurdo) — Eroberung: kurdo, SirTav. Garnison: MARK 07.",
            "#1 {swordshrine} (MANIA) — Eroberung: MANIA, HADES, ARMADA. Garnison: ASHISH. Verstärkung: Zoe.",
            "#3 {reformation} (Tiger) — Eroberung: Tiger, Anubis. Garnison: BigBen.",
            "#8 {sanctum} (Shaukan) — Eroberung: Shaukan, Gully. Garnison: JeCqtumkiff.",
            "#10 {sanctum} (KAYSTER) — Eroberung: KAYSTER, Thanoss. Garnison: Gianna.",
            "#2 {mercenary} (GhoSt) — Kapitän: GhoSt.",
            "#5 {abbey} (GrizzledAncient) — Eroberung: GrizzledAncient. Garnison: Aronofsky.",
            "#6 {abbey} (GrZeChU) — Eroberung: GrZeChU. Garnison: Mook.",
            "#9 {abbey} (Loba) — Erobern und Halten: Loba.",
            "#11 {abbey} (Floating) — Floating."
          ]},

          { type: "h", text: "🔥 ERINNERUNG: BUFFS FÜR RALLY-ANFÜHRER" },
          { type: "p", text: "Nur Rally-Anführer in Legion 1: MANIA, HADES, ARMADA, Tiger, Anubis. Nutze nach Möglichkeit 2K-Edelstein-Buffs vor deinen Rallys. Das verschafft dir einen echten Vorteil in Eroberungskämpfen und macht deine Rallys schwerer zu brechen. Nicht verpflichtend, aber dringend empfohlen." },

          { type: "h", text: "📣 KOORDINATOR-NOTIZEN FÜR ARMADA" },
          { type: "list", items: [
            "Gib Ziele mit Kartennummer und Spielername durch: „#3 {reformation} Tiger, Rally jetzt.“ / „MANIA, Druck auf das gegnerische #10 {sanctum}.“",
            "Halte die Eroberungsteams beweglich. Lass MANIA, HADES, Tiger und Anubis nicht in Gebäuden sitzen.",
            "Wechsle Garnisonskommandanten nur, wenn nötig. Jeder Wechsel riskiert den Verlust des Gebäudes.",
            "Behalte die Abklingzeit von #2 {mercenary} im Blick. GhoSt nutzt sie alle 7 Minuten.",
            "In den letzten 10 Minuten: schützt #1 {swordshrine}, #8 {sanctum}, #10 {sanctum}. Jagt keinen Kills nach.",
            "Erinnere alle: Das Ergebnis von Legion 1 entscheidet über die Allianzbelohnungen.",
            "Diesmal gibt es keine Ersatzspieler. Alle auf der Liste gehören zur Hauptaufstellung. Kommt jemand zu spät, springen Flex-Spieler für seinen Platz ein."
          ]},

          { type: "h", text: "📌 ABSCHLUSSHINWEISE" },
          { type: "list", items: [
            "Alle Spieler müssen zum Start online sein.",
            "R4/R5 geben Ziele per Kartennummer im Squad Chat durch.",
            "Niemand muss im Voice sprechen. Squad Chat und Karte zu verfolgen reicht.",
            "Merkt euch: Gebäudenamen, Kartenpositionen und Farbzonen.",
            "Garnisonskommandanten bleiben in ihrem Gebäude und halten es, bis sie abgelöst werden. Eroberungsteams bleiben beweglich und aggressiv.",
            "Rally-Anführer: Nutzt nach Möglichkeit 2K-Edelstein-Buffs. Nur Legion 1.",
            "**Kernregel:** Haltet #1 {swordshrine} + #8 {sanctum} + #10 {sanctum}. Nutzt #4 {belltower}, #7 {stables}, #3 {reformation}, #2 {mercenary}. Farmt die {abbey}en und fallengelassene Punkte.",
            "**Tauscht niemals ein Kerngebäude gegen Kills ein.**"
          ]},
          { type: "p", text: "Viel Glück am Sonntag!" },

          { type: "h", text: "🗺️ KARTE" },
          { type: "img", src: "figures/NEXUS_SwordlanShowdown_Map.jpeg", alt: "Karte" },
          { type: "h", text: "🧭 ZUGEWIESENE ZONEN" },
          { type: "img", src: "figures/assigned_zone.png", alt: "Zugewiesene Zonen" }
        ]
      },
      fr: {
        title: "Événements récents de l'alliance",
        blocks: [
          { type: "img", src: "figures/Legion_1.png", alt: "Legion 1" },
          { type: "h", text: "📅 LEGION 1 — AFFECTATIONS DES JOUEURS · CHOC DU GLAIVE" },
          { type: "p", text: "**Date :** dimanche 20.09 · **Coordinateur :** ARMADA (88.4M)" },
          { type: "p", text: "La Legion 1 est la bataille principale. Son résultat compte pour l'ensemble des récompenses d'alliance." },
          { type: "callout", text: "**Pas de remplaçants cette fois.** Tous les joueurs listés ci-dessous font partie de l'équipe principale." },

          { type: "h", text: "🎯 RAPPEL DE LA DOCTRINE" },
          { type: "p", text: "Les joueurs les plus forts attaquent et capturent. Une fois qu'un bâtiment change de camp, un **capitaine de garnison** le tient pendant que l'équipe de capture avance. Les capitaines de garnison ne partent pas chasser des kills. Les équipes de capture restent mobiles et agressives." },
          { type: "callout", text: "**Chefs de ralliement :** boostez-vous avec des buffs de gemmes 2K si possible. Cela n'est recommandé que pour les chefs de ralliement de la Legion 1. Cela vous donne un vrai avantage dans les combats de capture et rend vos ralliements plus difficiles à briser." },

          { type: "sub", text: "#4 {belltower} (Purpand) — Vitesse de capture" },
          { type: "list", items: [
            "**Purpand (55M)** — Capture principale. Capturez #4 {belltower} dès le début avec Labanet. Une fois le bâtiment capturé, passez le relais à JORDAN comme capitaine de garnison et rejoignez #7 {stables} (kurdo) ou #8 {sanctum} (Shaukan) en renfort. Restez mobile.",
            "**Labanet (54.6M)** — Soutien à la capture. Rejoignez Purpand au début et capturez #4 {belltower}. Une fois le bâtiment capturé, passez le relais à JORDAN et rejoignez avec Purpand #7 {stables} (kurdo) ou #8 {sanctum} (Shaukan). Restez mobile.",
            "**JORDAN (51.8M)** — Capitaine de garnison. Placez-vous près de #4 {belltower} dès le début. Une fois la capture faite par Purpand, prenez le commandement et tenez le bâtiment. Ne partez pas sauf si ARMADA ordonne une rotation. La vitesse de capture compte pendant tout le match."
          ]},

          { type: "sub", text: "#7 {stables} (kurdo) — Temps de recharge de téléportation" },
          { type: "list", items: [
            "**kurdo (51.6M)** — Capture principale. Capturez #7 {stables} dès le début avec SirTav. Une fois le bâtiment capturé, passez le relais à MARK 07 comme capitaine de garnison et renforcez le centre, ou #8 {sanctum} (Shaukan) et #10 {sanctum} (KAYSTER). Restez mobile.",
            "**SirTav (51.1M)** — Soutien à la capture. Rejoignez kurdo au début et capturez #7 {stables}. Une fois le bâtiment capturé, passez le relais à MARK 07 et renforcez le centre avec kurdo. Restez mobile.",
            "**MARK 07 (50.9M)** — Capitaine de garnison. Placez-vous près de #7 {stables} dès le début. Une fois la capture faite par kurdo, prenez le commandement et tenez le bâtiment. Ne partez pas sauf si ARMADA ordonne une rotation. La réduction du temps de recharge de téléportation doit rester active."
          ]},

          { type: "sub", text: "#1 {swordshrine} (MANIA) — Cœur, points les plus élevés" },
          { type: "list", items: [
            "**MANIA (98.7M)** — Chef de ralliement principal. Boostez-vous avec des buffs de gemmes 2K avant le ralliement. Menez la vague de capture sur #1 {swordshrine} avec HADES et ARMADA. Une fois le bâtiment capturé, passez le relais à ASHISH comme capitaine de garnison et mettez la pression, avec HADES et ARMADA, sur #3 {reformation} (Tiger) ou sur l'ennemi à #8 {sanctum} (Shaukan) et #10 {sanctum} (KAYSTER). Ne restez pas enfermé dans un bâtiment.",
            "**HADES (90.1M)** — Chef de ralliement. Boostez-vous avec des buffs de gemmes 2K avant le ralliement. Rejoignez la vague de capture de MANIA sur #1 {swordshrine}. Après le relais à ASHISH, mettez la pression avec MANIA et ARMADA sur #3 {reformation} (Tiger) ou sur le cœur ennemi. Restez mobile.",
            "**ARMADA (88.4M)** — Coordinateur et chef de ralliement. Boostez-vous avec des buffs de gemmes 2K avant le ralliement. Annoncez les cibles dans le chat d'escouade. Rejoignez la vague de capture de MANIA sur #1 {swordshrine}. Après le relais à ASHISH, mettez la pression avec MANIA et HADES sur #3 {reformation} (Tiger) ou sur le cœur ennemi. Votre rôle : lire la carte, annoncer le prochain objectif et garder les équipes de capture en mouvement.",
            "**ASHISH (82.2M)** — Capitaine de garnison. Placez-vous près de #1 {swordshrine} avant 15:00. Une fois la capture faite par MANIA, prenez le commandement et tenez le bâtiment, avec Zoe en renfort. Ne quittez pas #1 {swordshrine} sauf si ARMADA ordonne une rotation. Vous êtes l'ancre du cœur.",
            "**Zoe (56.4M)** — Renfort. Placez-vous près de #1 {swordshrine} et renforcez ASHISH dès que le bâtiment est capturé. Tenez la position avec lui et ne partez pas sauf si ARMADA ordonne une rotation."
          ]},

          { type: "sub", text: "#3 {reformation} (Tiger) — Bonus d'attaque/défense" },
          { type: "list", items: [
            "**Tiger (65.5M)** — Chef de ralliement principal. Boostez-vous avec des buffs de gemmes 2K avant le ralliement. Menez la vague de capture sur #3 {reformation} avec Anubis. Une fois le bâtiment capturé, passez le relais à BigBen comme capitaine de garnison et renforcez avec Anubis #1 {swordshrine} (ASHISH) ou mettez la pression sur le cœur ennemi. Restez mobile.",
            "**Anubis (61.3M)** — Chef de ralliement. Boostez-vous avec des buffs de gemmes 2K avant le ralliement. Rejoignez la vague de capture de Tiger sur #3 {reformation}. Après le relais à BigBen, renforcez avec Tiger #1 {swordshrine} (ASHISH) ou mettez la pression sur le cœur ennemi. Restez mobile.",
            "**BigBen (58.2M)** — Capitaine de garnison. Placez-vous près de #3 {reformation} avant 15:00. Une fois la capture faite par Tiger, prenez le commandement et tenez le bâtiment. Ne quittez pas #3 {reformation} sauf si ARMADA ordonne une rotation. Le bonus d'attaque et de défense de #3 {reformation} doit rester actif pour votre alliance."
          ]},

          { type: "sub", text: "#8 {sanctum} (Shaukan) — Cœur" },
          { type: "list", items: [
            "**Shaukan (50.7M)** — Capture principale. Capturez #8 {sanctum} dès le début avec Gully. Une fois le bâtiment capturé, passez le relais à JeCqtumkiff comme capitaine de garnison et renforcez #10 {sanctum} (KAYSTER) ou #1 {swordshrine} (ASHISH). Restez mobile.",
            "**Gully (50M)** — Soutien à la capture. Rejoignez Shaukan au début et capturez #8 {sanctum}. Une fois le bâtiment capturé, passez le relais à JeCqtumkiff et renforcez avec Shaukan #10 {sanctum} (KAYSTER) ou #1 {swordshrine} (ASHISH). Restez mobile.",
            "**JeCqtumkiff (49.7M)** — Capitaine de garnison. Placez-vous près de #8 {sanctum} dès le début. Une fois la capture faite par Shaukan, prenez le commandement et tenez le bâtiment. Ne partez pas sauf si ARMADA ordonne une rotation. #8 {sanctum} fait partie du cœur."
          ]},

          { type: "sub", text: "#10 {sanctum} (KAYSTER) — Cœur" },
          { type: "list", items: [
            "**KAYSTER (49M)** — Capture principale. Capturez #10 {sanctum} dès le début avec Thanoss. Une fois le bâtiment capturé, passez le relais à Gianna comme capitaine de garnison et renforcez #1 {swordshrine} (ASHISH). Restez mobile.",
            "**Thanoss (43.6M)** — Soutien à la capture. Rejoignez KAYSTER au début et capturez #10 {sanctum}. Une fois le bâtiment capturé, passez le relais à Gianna et renforcez avec KAYSTER #1 {swordshrine} (ASHISH). Restez mobile.",
            "**Gianna (42.8M)** — Capitaine de garnison. Placez-vous près de #10 {sanctum} dès le début. Une fois la capture faite par KAYSTER, prenez le commandement et tenez le bâtiment. Ne partez pas sauf si ARMADA ordonne une rotation. #10 {sanctum} fait partie du cœur."
          ]},

          { type: "sub", text: "#2 {mercenary} (GhoSt) — Attaques de mercenaires" },
          { type: "list", items: [
            "**GhoSt (52.4M, R5)** — Capitaine. Placez-vous près de #2 {mercenary} avant 15:00. Dès qu'il est disponible, prenez-le et utilisez les mercenaires toutes les 7 minutes sur le cœur ennemi. Coordonnez le timing avec ARMADA dans le chat d'escouade. Aidez à la coordination générale en tant que R5."
          ]},

          { type: "sub", text: "#5 {abbey} (GrizzledAncient)" },
          { type: "list", items: [
            "**GrizzledAncient (40.8M)** — Capture. Capturez #5 {abbey} dès le début avec Aronofsky. Une fois le bâtiment capturé, Aronofsky le tient et vous renforcez si besoin #6 {abbey} (GrZeChU) ou #9 {abbey} (Loba). Restez mobile.",
            "**Aronofsky (39.8M)** — Capitaine de garnison. Placez-vous près de #5 {abbey} dès le début. Une fois la capture faite par GrizzledAncient, prenez le commandement et tenez le bâtiment. Ne partez pas sauf si ARMADA ordonne une rotation."
          ]},

          { type: "sub", text: "#6 {abbey} (GrZeChU)" },
          { type: "list", items: [
            "**GrZeChU (39.4M)** — Capture. Capturez #6 {abbey} dès le début avec Mook. Une fois le bâtiment capturé, Mook le tient et vous renforcez si besoin #5 {abbey} (GrizzledAncient) ou #9 {abbey} (Loba). Restez mobile.",
            "**Mook (38.8M)** — Capitaine de garnison. Placez-vous près de #6 {abbey} dès le début. Une fois la capture faite par GrZeChU, prenez le commandement et tenez le bâtiment. Ne partez pas sauf si ARMADA ordonne une rotation. Aidez à ramasser les points lâchés quand c'est sûr."
          ]},

          { type: "sub", text: "#9 {abbey} (Loba)" },
          { type: "list", items: [
            "**Loba (37.3M)** — Capture et maintien. Capturez #9 {abbey} dès le début et tenez-le. Ne partez pas sauf si ARMADA ordonne une rotation. Ramassez les points lâchés quand c'est sûr."
          ]},

          { type: "sub", text: "#11 {abbey} (Floating)" },
          { type: "list", items: [
            "**Floating** — Couvrez #11 {abbey} et intervenez là où ARMADA vous appelle. Renforcez le cœur si besoin, retournez des {abbey}s si besoin, récupérez les points lâchés. Escouade flex."
          ]},

          { type: "h", text: "🔎 RÉCAPITULATIF PAR BÂTIMENT" },
          { type: "list", items: [
            "#4 {belltower} (Purpand) — Capture : Purpand, Labanet. Garnison : JORDAN.",
            "#7 {stables} (kurdo) — Capture : kurdo, SirTav. Garnison : MARK 07.",
            "#1 {swordshrine} (MANIA) — Capture : MANIA, HADES, ARMADA. Garnison : ASHISH. Renfort : Zoe.",
            "#3 {reformation} (Tiger) — Capture : Tiger, Anubis. Garnison : BigBen.",
            "#8 {sanctum} (Shaukan) — Capture : Shaukan, Gully. Garnison : JeCqtumkiff.",
            "#10 {sanctum} (KAYSTER) — Capture : KAYSTER, Thanoss. Garnison : Gianna.",
            "#2 {mercenary} (GhoSt) — Capitaine : GhoSt.",
            "#5 {abbey} (GrizzledAncient) — Capture : GrizzledAncient. Garnison : Aronofsky.",
            "#6 {abbey} (GrZeChU) — Capture : GrZeChU. Garnison : Mook.",
            "#9 {abbey} (Loba) — Capture et maintien : Loba.",
            "#11 {abbey} (Floating) — Floating."
          ]},

          { type: "h", text: "🔥 RAPPEL : BUFFS DES CHEFS DE RALLIEMENT" },
          { type: "p", text: "Chefs de ralliement de la Legion 1 uniquement : MANIA, HADES, ARMADA, Tiger, Anubis. Utilisez des buffs de gemmes 2K avant vos ralliements si possible. Cela vous donne un vrai avantage dans les combats de capture et rend vos ralliements plus difficiles à briser. Ce n'est pas obligatoire, mais fortement recommandé." },

          { type: "h", text: "📣 NOTES DU COORDINATEUR POUR ARMADA" },
          { type: "list", items: [
            "Annoncez les cibles avec le numéro de la carte et le nom du joueur : « #3 {reformation} Tiger, ralliement maintenant. » ; « MANIA, mettez la pression sur l'ennemi en #10 {sanctum}. »",
            "Gardez les équipes de capture mobiles. Ne laissez pas MANIA, HADES, Tiger et Anubis rester enfermés dans des bâtiments.",
            "Ne remplacez les capitaines de garnison que si nécessaire. Chaque relève risque de faire perdre le bâtiment.",
            "Suivez le temps de recharge de #2 {mercenary}. GhoSt l'utilise toutes les 7 minutes.",
            "Pendant les 10 dernières minutes, protégez : #1 {swordshrine}, #8 {sanctum}, #10 {sanctum}. Ne chassez pas les kills.",
            "Rappel à tous : le résultat de la Legion 1 décide des récompenses d'alliance.",
            "Pas de remplaçants cette fois. Tout le monde sur cette liste fait partie de l'équipe principale. Si quelqu'un est en retard, les joueurs flex prennent sa place."
          ]},

          { type: "h", text: "📌 NOTES FINALES" },
          { type: "list", items: [
            "Tous les joueurs doivent être en ligne dès le début.",
            "Les R4/R5 annoncent les cibles par numéro de carte dans le chat d'escouade.",
            "Personne n'est obligé de parler en vocal. Suivre le chat d'escouade et la carte suffit.",
            "Retenez : les noms des bâtiments, leur position sur la carte et les zones de couleur.",
            "Les capitaines de garnison restent dans leur bâtiment et le tiennent jusqu'à leur relève. Les équipes de capture restent mobiles et agressives.",
            "Chefs de ralliement : utilisez des buffs de gemmes 2K si possible. Legion 1 uniquement.",
            "**Règle essentielle :** tenez #1 {swordshrine} + #8 {sanctum} + #10 {sanctum}. Utilisez : #4 {belltower}, #7 {stables}, #3 {reformation}, #2 {mercenary}. Farmez les {abbey}s et les points lâchés.",
            "**Ne sacrifiez jamais un bâtiment essentiel pour des kills.**"
          ]},
          { type: "p", text: "Bonne chance dimanche !" },

          { type: "h", text: "🗺️ CARTE" },
          { type: "img", src: "figures/NEXUS_SwordlanShowdown_Map.jpeg", alt: "Carte" },
          { type: "h", text: "🧭 ZONES ASSIGNÉES" },
          { type: "img", src: "figures/assigned_zone.png", alt: "Zones assignées" }
        ]
      },
      pt: {
        title: "Eventos Recentes da Aliança",
        blocks: [
          { type: "img", src: "figures/Legion_1.png", alt: "Legion 1" },
          { type: "h", text: "📅 LEGION 1 — DESIGNAÇÕES DOS JOGADORES · CONFRONTO ENTRE ESPADAS" },
          { type: "p", text: "**Data:** domingo, 20.09 · **Coordenador:** ARMADA (88.4M)" },
          { type: "p", text: "A Legion 1 é a batalha principal. O resultado vale para todas as recompensas da aliança." },
          { type: "callout", text: "**Sem reservas desta vez.** Todos os jogadores listados abaixo são do elenco principal." },

          { type: "h", text: "🎯 LEMBRETE DE DOUTRINA" },
          { type: "p", text: "Os jogadores mais fortes atacam e capturam. Assim que uma construção muda de lado, um **Capitão da guarnição** a mantém enquanto a equipe de captura segue em frente. Capitães da guarnição não saem para perseguir abates. Equipes de captura permanecem móveis e agressivas." },
          { type: "callout", text: "**Líderes de rally:** fortaleça-se com buffs de gemas de 2K, se possível. Isso é recomendado apenas para os líderes de rally da Legion 1. Dá uma vantagem real nas disputas de captura e torna seus rallies mais difíceis de quebrar." },

          { type: "sub", text: "#4 {belltower} (Purpand) — Velocidade de captura" },
          { type: "list", items: [
            "**Purpand (55M)** — Líder de captura. Capture #4 {belltower} imediatamente no início com Labanet. Assim que a construção mudar de lado, passe o comando para JORDAN como Capitão da guarnição e vá reforçar #7 {stables} (kurdo) ou #8 {sanctum} (Shaukan). Mantenha-se móvel.",
            "**Labanet (54.6M)** — Apoio de captura. Junte-se a Purpand no início e capture #4 {belltower}. Assim que a construção mudar de lado, passe o comando para JORDAN e vá com Purpand para #7 {stables} (kurdo) ou #8 {sanctum} (Shaukan). Mantenha-se móvel.",
            "**JORDAN (51.8M)** — Capitão da guarnição. Posicione-se perto de #4 {belltower} no início. Quando Purpand capturar, assuma o comando e mantenha a posição. Não saia a menos que ARMADA chame um rodízio. A velocidade de captura importa durante toda a partida."
          ]},

          { type: "sub", text: "#7 {stables} (kurdo) — Recarga de teleporte" },
          { type: "list", items: [
            "**kurdo (51.6M)** — Líder de captura. Capture #7 {stables} imediatamente no início com SirTav. Assim que a construção mudar de lado, passe o comando para MARK 07 como Capitão da guarnição e vá reforçar o centro ou #8 {sanctum} (Shaukan) e #10 {sanctum} (KAYSTER). Mantenha-se móvel.",
            "**SirTav (51.1M)** — Apoio de captura. Junte-se a kurdo no início e capture #7 {stables}. Assim que a construção mudar de lado, passe o comando para MARK 07 e vá com kurdo reforçar o centro. Mantenha-se móvel.",
            "**MARK 07 (50.9M)** — Capitão da guarnição. Posicione-se perto de #7 {stables} no início. Quando kurdo capturar, assuma o comando e mantenha a posição. Não saia a menos que ARMADA chame um rodízio. A redução do tempo de recarga de teleporte precisa continuar ativa."
          ]},

          { type: "sub", text: "#1 {swordshrine} (MANIA) — Núcleo, mais pontos" },
          { type: "list", items: [
            "**MANIA (98.7M)** — Capitão de rally principal. Fortaleça-se com buffs de gemas de 2K antes do rally. Lidere a onda de captura em #1 {swordshrine} com HADES e ARMADA. Assim que a construção mudar de lado, passe o comando para ASHISH como Capitão da guarnição e vá com HADES e ARMADA pressionar #3 {reformation} (Tiger) ou o inimigo em #8 {sanctum} (Shaukan) e #10 {sanctum} (KAYSTER). Não fique parado dentro de uma construção.",
            "**HADES (90.1M)** — Líder de rally. Fortaleça-se com buffs de gemas de 2K antes do rally. Junte-se à onda de captura de MANIA em #1 {swordshrine}. Após passar o comando para ASHISH, vá com MANIA e ARMADA pressionar #3 {reformation} (Tiger) ou o núcleo inimigo. Mantenha-se móvel.",
            "**ARMADA (88.4M)** — Coordenador e líder de rally. Fortaleça-se com buffs de gemas de 2K antes do rally. Chame os alvos no Chat do Esquadrão. Junte-se à onda de captura de MANIA em #1 {swordshrine}. Após passar o comando para ASHISH, vá com MANIA e HADES pressionar #3 {reformation} (Tiger) ou o núcleo inimigo. Sua função é ler o mapa, chamar o próximo objetivo e manter as equipes de captura em movimento.",
            "**ASHISH (82.2M)** — Capitão da guarnição. Posicione-se perto de #1 {swordshrine} antes das 15:00. Quando MANIA capturar, assuma o comando e mantenha a posição, com Zoe reforçando. Não saia de #1 {swordshrine} a menos que ARMADA chame um rodízio. Você é a âncora do núcleo.",
            "**Zoe (56.4M)** — Reforço. Posicione-se perto de #1 {swordshrine} e reforce ASHISH assim que a construção mudar de lado. Mantenha a posição com ele e não saia a menos que ARMADA chame um rodízio."
          ]},

          { type: "sub", text: "#3 {reformation} (Tiger) — Bônus de ataque/defesa" },
          { type: "list", items: [
            "**Tiger (65.5M)** — Capitão de rally principal. Fortaleça-se com buffs de gemas de 2K antes do rally. Lidere a onda de captura em #3 {reformation} com Anubis. Assim que a construção mudar de lado, passe o comando para BigBen como Capitão da guarnição e vá com Anubis reforçar #1 {swordshrine} (ASHISH) ou pressionar o núcleo inimigo. Mantenha-se móvel.",
            "**Anubis (61.3M)** — Líder de rally. Fortaleça-se com buffs de gemas de 2K antes do rally. Junte-se à onda de captura de Tiger em #3 {reformation}. Após passar o comando para BigBen, vá com Tiger reforçar #1 {swordshrine} (ASHISH) ou pressionar o núcleo inimigo. Mantenha-se móvel.",
            "**BigBen (58.2M)** — Capitão da guarnição. Posicione-se perto de #3 {reformation} antes das 15:00. Quando Tiger capturar, assuma o comando e mantenha a posição. Não saia de #3 {reformation} a menos que ARMADA chame um rodízio. O bônus de ataque e defesa de #3 {reformation} precisa continuar ativo para a sua aliança."
          ]},

          { type: "sub", text: "#8 {sanctum} (Shaukan) — Núcleo" },
          { type: "list", items: [
            "**Shaukan (50.7M)** — Líder de captura. Capture #8 {sanctum} com Gully no início. Assim que a construção mudar de lado, passe o comando para JeCqtumkiff como Capitão da guarnição e vá reforçar #10 {sanctum} (KAYSTER) ou #1 {swordshrine} (ASHISH). Mantenha-se móvel.",
            "**Gully (50M)** — Apoio de captura. Junte-se a Shaukan no início e capture #8 {sanctum}. Assim que a construção mudar de lado, passe o comando para JeCqtumkiff e vá com Shaukan reforçar #10 {sanctum} (KAYSTER) ou #1 {swordshrine} (ASHISH). Mantenha-se móvel.",
            "**JeCqtumkiff (49.7M)** — Capitão da guarnição. Posicione-se perto de #8 {sanctum} no início. Quando Shaukan capturar, assuma o comando e mantenha a posição. Não saia a menos que ARMADA chame um rodízio. #8 {sanctum} faz parte do núcleo."
          ]},

          { type: "sub", text: "#10 {sanctum} (KAYSTER) — Núcleo" },
          { type: "list", items: [
            "**KAYSTER (49M)** — Líder de captura. Capture #10 {sanctum} com Thanoss no início. Assim que a construção mudar de lado, passe o comando para Gianna como Capitão da guarnição e vá reforçar #1 {swordshrine} (ASHISH). Mantenha-se móvel.",
            "**Thanoss (43.6M)** — Apoio de captura. Junte-se a KAYSTER no início e capture #10 {sanctum}. Assim que a construção mudar de lado, passe o comando para Gianna e vá com KAYSTER reforçar #1 {swordshrine} (ASHISH). Mantenha-se móvel.",
            "**Gianna (42.8M)** — Capitão da guarnição. Posicione-se perto de #10 {sanctum} no início. Quando KAYSTER capturar, assuma o comando e mantenha a posição. Não saia a menos que ARMADA chame um rodízio. #10 {sanctum} faz parte do núcleo."
          ]},

          { type: "sub", text: "#2 {mercenary} (GhoSt) — Ataques de mercenários" },
          { type: "list", items: [
            "**GhoSt (52.4M, R5)** — Capitão. Posicione-se perto de #2 {mercenary} antes das 15:00. Assim que estiver disponível, ocupe-o e use mercenários a cada 7 minutos no núcleo inimigo. Coordene o tempo com ARMADA no Chat do Esquadrão. Ajude na coordenação geral como R5."
          ]},

          { type: "sub", text: "#5 {abbey} (GrizzledAncient)" },
          { type: "list", items: [
            "**GrizzledAncient (40.8M)** — Captura. Capture #5 {abbey} no início com Aronofsky. Assim que a construção mudar de lado, Aronofsky a mantém e você vai reforçar #6 {abbey} (GrZeChU) ou #9 {abbey} (Loba) se necessário. Mantenha-se móvel.",
            "**Aronofsky (39.8M)** — Capitão da guarnição. Posicione-se perto de #5 {abbey} no início. Quando GrizzledAncient capturar, assuma o comando e mantenha a posição. Não saia a menos que ARMADA chame um rodízio."
          ]},

          { type: "sub", text: "#6 {abbey} (GrZeChU)" },
          { type: "list", items: [
            "**GrZeChU (39.4M)** — Captura. Capture #6 {abbey} no início com Mook. Assim que a construção mudar de lado, Mook a mantém e você vai reforçar #5 {abbey} (GrizzledAncient) ou #9 {abbey} (Loba) se necessário. Mantenha-se móvel.",
            "**Mook (38.8M)** — Capitão da guarnição. Posicione-se perto de #6 {abbey} no início. Quando GrZeChU capturar, assuma o comando e mantenha a posição. Não saia a menos que ARMADA chame um rodízio. Ajude a coletar pontos derrubados quando for seguro."
          ]},

          { type: "sub", text: "#9 {abbey} (Loba)" },
          { type: "list", items: [
            "**Loba (37.3M)** — Captura e manutenção. Capture #9 {abbey} no início e mantenha-a. Não saia a menos que ARMADA chame um rodízio. Colete pontos derrubados quando for seguro."
          ]},

          { type: "sub", text: "#11 {abbey} (Floating)" },
          { type: "list", items: [
            "**Floating** — Cubra #11 {abbey} e atue onde ARMADA chamar. Reforce o núcleo se necessário, capture {abbey}s se necessário, pegue pontos derrubados. Esquadrão flex."
          ]},

          { type: "h", text: "🔎 REFERÊNCIA RÁPIDA POR CONSTRUÇÃO" },
          { type: "list", items: [
            "#4 {belltower} (Purpand) — Captura: Purpand, Labanet. Guarnição: JORDAN.",
            "#7 {stables} (kurdo) — Captura: kurdo, SirTav. Guarnição: MARK 07.",
            "#1 {swordshrine} (MANIA) — Captura: MANIA, HADES, ARMADA. Guarnição: ASHISH. Reforço: Zoe.",
            "#3 {reformation} (Tiger) — Captura: Tiger, Anubis. Guarnição: BigBen.",
            "#8 {sanctum} (Shaukan) — Captura: Shaukan, Gully. Guarnição: JeCqtumkiff.",
            "#10 {sanctum} (KAYSTER) — Captura: KAYSTER, Thanoss. Guarnição: Gianna.",
            "#2 {mercenary} (GhoSt) — Capitão: GhoSt.",
            "#5 {abbey} (GrizzledAncient) — Captura: GrizzledAncient. Guarnição: Aronofsky.",
            "#6 {abbey} (GrZeChU) — Captura: GrZeChU. Guarnição: Mook.",
            "#9 {abbey} (Loba) — Captura e manutenção: Loba.",
            "#11 {abbey} (Floating) — Floating."
          ]},

          { type: "h", text: "🔥 LEMBRETE DE BUFF PARA LÍDERES DE RALLY" },
          { type: "p", text: "Apenas líderes de rally da Legion 1: MANIA, HADES, ARMADA, Tiger, Anubis. Use buffs de gemas de 2K antes dos seus rallies, se possível. Isso dá uma vantagem real nas disputas de captura e torna seus rallies mais difíceis de quebrar. Não é obrigatório, mas é fortemente recomendado." },

          { type: "h", text: "📣 NOTAS DO COORDENADOR PARA ARMADA" },
          { type: "list", items: [
            "Chame os alvos pelo número do mapa e pelo nome do jogador: “#3 {reformation} Tiger, Rally agora.” / “MANIA, pressione o inimigo em #10 {sanctum}.”",
            "Mantenha as equipes de captura móveis. Não deixe MANIA, HADES, Tiger e Anubis parados dentro de construções.",
            "Troque os Capitães da guarnição só quando necessário. Cada troca arrisca perder a construção.",
            "Acompanhe o tempo de recarga de #2 {mercenary}. GhoSt o usa a cada 7 minutos.",
            "Nos últimos 10 minutos, proteja #1 {swordshrine}, #8 {sanctum} e #10 {sanctum}. Não persiga abates.",
            "Lembre a todos: o resultado da Legion 1 decide as recompensas da aliança.",
            "Sem reservas desta vez. Todos da lista são do elenco principal. Se alguém se atrasar, os jogadores flex cobrem a vaga."
          ]},

          { type: "h", text: "📌 NOTAS FINAIS" },
          { type: "list", items: [
            "Todos os jogadores devem estar online no início.",
            "R4/R5 chamam os alvos pelo número do mapa no Chat do Esquadrão.",
            "Ninguém precisa falar por voz. Acompanhar o Chat do Esquadrão e o mapa é suficiente.",
            "Lembrem-se: nomes das construções, posições no mapa e zonas de cor.",
            "Capitães da guarnição ficam dentro da construção e a mantêm até serem substituídos. Equipes de captura permanecem móveis e agressivas.",
            "Líderes de rally: usem buffs de gemas de 2K, se possível. Somente na Legion 1.",
            "**Regra principal:** mantenham #1 {swordshrine} + #8 {sanctum} + #10 {sanctum}. Usem #4 {belltower}, #7 {stables}, #3 {reformation} e #2 {mercenary}. Farmem as {abbey}s e os pontos derrubados.",
            "**Nunca troque uma construção principal por abates.**"
          ]},
          { type: "p", text: "Boa sorte no domingo!" },

          { type: "h", text: "🗺️ MAPA" },
          { type: "img", src: "figures/NEXUS_SwordlanShowdown_Map.jpeg", alt: "Mapa" },
          { type: "h", text: "🧭 ZONAS DESIGNADAS" },
          { type: "img", src: "figures/assigned_zone.png", alt: "Zonas designadas" }
        ]
      },
      tr: {
        title: "Son İttifak Etkinlikleri",
        blocks: [
          { type: "img", src: "figures/Legion_1.png", alt: "Legion 1" },
          { type: "h", text: "📅 LEGION 1 — OYUNCU GÖREVLENDİRMELERİ · KILIÇDİYARI HESAPLAŞMASI" },
          { type: "p", text: "**Tarih:** Pazar, 20.09 · **Koordinatör:** ARMADA (88.4M)" },
          { type: "p", text: "Legion 1 ana savaştır. Sonuç, tüm ittifak ödülleri için geçerlidir." },
          { type: "callout", text: "**Bu sefer yedek yok.** Aşağıda listelenen tüm oyuncular ana kadrodadır." },

          { type: "h", text: "🎯 DOKTRİN HATIRLATMASI" },
          { type: "p", text: "En güçlü oyuncular saldırır ve ele geçirir. Bir bina el değiştirdiğinde, ele geçirme ekibi ilerlerken **Garnizon Kaptanı** binayı tutar. Garnizon Kaptanları öldürme peşinde binadan ayrılmaz. Ele geçirme ekipleri hareketli ve saldırgan kalır." },
          { type: "callout", text: "**Seferberlik Liderleri:** Mümkünse 2K mücevher bonuslarıyla kendini güçlendir. Bu yalnızca Legion 1 seferberlik liderleri için önerilir. Ele geçirme savaşlarında sana gerçek bir üstünlük sağlar ve seferberliklerinin kırılmasını zorlaştırır." },

          { type: "sub", text: "#4 {belltower} (Purpand) — Ele geçirme hızı" },
          { type: "list", items: [
            "**Purpand (55M)** — Ele geçirme lideri. Başlangıçta Labanet ile birlikte #4 {belltower} binasını hemen ele geçir. Bina el değiştirince Garnizon Kaptanı olarak JORDAN ile görev devri yap ve takviye için #7 {stables} (kurdo) veya #8 {sanctum} (Shaukan) tarafına geç. Hareketli kal.",
            "**Labanet (54.6M)** — Ele geçirme desteği. Başlangıçta Purpand ile birleş ve #4 {belltower} binasını ele geçir. Bina el değiştirince JORDAN ile görev devri yap ve Purpand ile birlikte #7 {stables} (kurdo) veya #8 {sanctum} (Shaukan) tarafına geç. Hareketli kal.",
            "**JORDAN (51.8M)** — Garnizon Kaptanı. Başlangıçta #4 {belltower} binasının yakınında konumlan. Purpand ele geçirdiğinde kaptanlığı devral ve binayı tut. ARMADA rotasyon çağırmadıkça ayrılma. Ele geçirme hızı tüm maç boyunca önemli."
          ]},

          { type: "sub", text: "#7 {stables} (kurdo) — Işınlanma bekleme süresi" },
          { type: "list", items: [
            "**kurdo (51.6M)** — Ele geçirme lideri. Başlangıçta SirTav ile birlikte #7 {stables} binasını hemen ele geçir. Bina el değiştirince Garnizon Kaptanı olarak MARK 07 ile görev devri yap; merkeze veya #8 {sanctum} (Shaukan) ile #10 {sanctum} (KAYSTER) binalarına takviye için geç. Hareketli kal.",
            "**SirTav (51.1M)** — Ele geçirme desteği. Başlangıçta kurdo ile birleş ve #7 {stables} binasını ele geçir. Bina el değiştirince MARK 07 ile görev devri yap ve kurdo ile birlikte merkeze takviye için geç. Hareketli kal.",
            "**MARK 07 (50.9M)** — Garnizon Kaptanı. Başlangıçta #7 {stables} binasının yakınında konumlan. kurdo ele geçirdiğinde kaptanlığı devral ve binayı tut. ARMADA rotasyon çağırmadıkça ayrılma. Işınlanma bekleme süresi azaltımı aktif kalmalı."
          ]},

          { type: "sub", text: "#1 {swordshrine} (MANIA) — Çekirdek, en yüksek puan" },
          { type: "list", items: [
            "**MANIA (98.7M)** — Baş seferberlik kaptanı. Seferberlikten önce 2K mücevher bonuslarıyla kendini güçlendir. HADES ve ARMADA ile birlikte #1 {swordshrine} üzerindeki ele geçirme dalgasına liderlik et. Bina el değiştirince Garnizon Kaptanı olarak ASHISH ile görev devri yap ve HADES ve ARMADA ile birlikte #3 {reformation} (Tiger) veya düşmanın #8 {sanctum} (Shaukan) ile #10 {sanctum} (KAYSTER) binalarına baskı kurmaya git. Bir binanın içinde bekleme.",
            "**HADES (90.1M)** — Seferberlik lideri. Seferberlikten önce 2K mücevher bonuslarıyla kendini güçlendir. MANIA liderliğindeki #1 {swordshrine} ele geçirme dalgasına katıl. ASHISH ile görev devrinden sonra MANIA ve ARMADA ile birlikte #3 {reformation} (Tiger) veya düşman çekirdeğine baskı kurmaya git. Hareketli kal.",
            "**ARMADA (88.4M)** — Koordinatör ve seferberlik lideri. Seferberlikten önce 2K mücevher bonuslarıyla kendini güçlendir. Hedefleri Ekip Sohbeti'nde bildir. MANIA liderliğindeki #1 {swordshrine} ele geçirme dalgasına katıl. ASHISH ile görev devrinden sonra MANIA ve HADES ile birlikte #3 {reformation} (Tiger) veya düşman çekirdeğine baskı kurmaya git. Görevin haritayı okumak, sıradaki hedefi bildirmek ve ele geçirme ekiplerini hareket halinde tutmaktır.",
            "**ASHISH (82.2M)** — Garnizon Kaptanı. 15:00 öncesinde #1 {swordshrine} binasının yakınında konumlan. MANIA ele geçirdiğinde kaptanlığı devral; Zoe takviye verirken binayı tut. ARMADA rotasyon çağırmadıkça #1 {swordshrine} binasından ayrılma. Çekirdeğin çıpası sensin.",
            "**Zoe (56.4M)** — Takviye. #1 {swordshrine} binasının yakınında konumlan ve bina el değiştirince ASHISH için takviye ol. Onunla birlikte pozisyonu tut; ARMADA rotasyon çağırmadıkça ayrılma."
          ]},

          { type: "sub", text: "#3 {reformation} (Tiger) — Saldırı/Savunma bonusu" },
          { type: "list", items: [
            "**Tiger (65.5M)** — Baş seferberlik kaptanı. Seferberlikten önce 2K mücevher bonuslarıyla kendini güçlendir. Anubis ile birlikte #3 {reformation} üzerindeki ele geçirme dalgasına liderlik et. Bina el değiştirince Garnizon Kaptanı olarak BigBen ile görev devri yap ve Anubis ile birlikte #1 {swordshrine} (ASHISH) binasını takviye et veya düşman çekirdeğine baskı kur. Hareketli kal.",
            "**Anubis (61.3M)** — Seferberlik lideri. Seferberlikten önce 2K mücevher bonuslarıyla kendini güçlendir. Tiger liderliğindeki #3 {reformation} ele geçirme dalgasına katıl. BigBen ile görev devrinden sonra Tiger ile birlikte #1 {swordshrine} (ASHISH) binasını takviye et veya düşman çekirdeğine baskı kur. Hareketli kal.",
            "**BigBen (58.2M)** — Garnizon Kaptanı. 15:00 öncesinde #3 {reformation} binasının yakınında konumlan. Tiger ele geçirdiğinde kaptanlığı devral ve binayı tut. ARMADA rotasyon çağırmadıkça #3 {reformation} binasından ayrılma. #3 {reformation} binasının saldırı ve savunma bonusu ittifakın için aktif kalmalı."
          ]},

          { type: "sub", text: "#8 {sanctum} (Shaukan) — Çekirdek" },
          { type: "list", items: [
            "**Shaukan (50.7M)** — Ele geçirme lideri. Başlangıçta Gully ile birlikte #8 {sanctum} binasını ele geçir. Bina el değiştirince Garnizon Kaptanı olarak JeCqtumkiff ile görev devri yap ve #10 {sanctum} (KAYSTER) veya #1 {swordshrine} (ASHISH) binasını takviye etmeye geç. Hareketli kal.",
            "**Gully (50M)** — Ele geçirme desteği. Başlangıçta Shaukan ile birleş ve #8 {sanctum} binasını ele geçir. Bina el değiştirince JeCqtumkiff ile görev devri yap ve Shaukan ile birlikte #10 {sanctum} (KAYSTER) veya #1 {swordshrine} (ASHISH) binasını takviye etmeye geç. Hareketli kal.",
            "**JeCqtumkiff (49.7M)** — Garnizon Kaptanı. Başlangıçta #8 {sanctum} binasının yakınında konumlan. Shaukan ele geçirdiğinde kaptanlığı devral ve binayı tut. ARMADA rotasyon çağırmadıkça ayrılma. #8 {sanctum} çekirdek bir binadır."
          ]},

          { type: "sub", text: "#10 {sanctum} (KAYSTER) — Çekirdek" },
          { type: "list", items: [
            "**KAYSTER (49M)** — Ele geçirme lideri. Başlangıçta Thanoss ile birlikte #10 {sanctum} binasını ele geçir. Bina el değiştirince Garnizon Kaptanı olarak Gianna ile görev devri yap ve #1 {swordshrine} (ASHISH) binasını takviye etmeye geç. Hareketli kal.",
            "**Thanoss (43.6M)** — Ele geçirme desteği. Başlangıçta KAYSTER ile birleş ve #10 {sanctum} binasını ele geçir. Bina el değiştirince Gianna ile görev devri yap ve KAYSTER ile birlikte #1 {swordshrine} (ASHISH) binasını takviye etmeye geç. Hareketli kal.",
            "**Gianna (42.8M)** — Garnizon Kaptanı. Başlangıçta #10 {sanctum} binasının yakınında konumlan. KAYSTER ele geçirdiğinde kaptanlığı devral ve binayı tut. ARMADA rotasyon çağırmadıkça ayrılma. #10 {sanctum} çekirdek bir binadır."
          ]},

          { type: "sub", text: "#2 {mercenary} (GhoSt) — Paralı asker saldırıları" },
          { type: "list", items: [
            "**GhoSt (52.4M, R5)** — Kaptan. 15:00 öncesinde #2 {mercenary} binasının yakınında konumlan. Kullanılabilir olunca ele geçir ve her 7 dakikada bir düşman çekirdeğine karşı paralı asker kullan. Zamanlamayı Ekip Sohbeti'nde ARMADA ile koordine et. R5 olarak genel koordinasyona yardım et."
          ]},

          { type: "sub", text: "#5 {abbey} (GrizzledAncient)" },
          { type: "list", items: [
            "**GrizzledAncient (40.8M)** — Ele geçirme. Başlangıçta Aronofsky ile birlikte #5 {abbey} binasını ele geçir. Bina el değiştirince Aronofsky binayı tutar; sen gerekirse #6 {abbey} (GrZeChU) veya #9 {abbey} (Loba) binasını takviye etmeye geç. Hareketli kal.",
            "**Aronofsky (39.8M)** — Garnizon Kaptanı. Başlangıçta #5 {abbey} binasının yakınında konumlan. GrizzledAncient ele geçirdiğinde kaptanlığı devral ve binayı tut. ARMADA rotasyon çağırmadıkça ayrılma."
          ]},

          { type: "sub", text: "#6 {abbey} (GrZeChU)" },
          { type: "list", items: [
            "**GrZeChU (39.4M)** — Ele geçirme. Başlangıçta Mook ile birlikte #6 {abbey} binasını ele geçir. Bina el değiştirince Mook binayı tutar; sen gerekirse #5 {abbey} (GrizzledAncient) veya #9 {abbey} (Loba) binasını takviye etmeye geç. Hareketli kal.",
            "**Mook (38.8M)** — Garnizon Kaptanı. Başlangıçta #6 {abbey} binasının yakınında konumlan. GrZeChU ele geçirdiğinde kaptanlığı devral ve binayı tut. ARMADA rotasyon çağırmadıkça ayrılma. Güvenliyse düşen puanları toplamaya yardım et."
          ]},

          { type: "sub", text: "#9 {abbey} (Loba)" },
          { type: "list", items: [
            "**Loba (37.3M)** — Ele geçirme ve tutma. Başlangıçta #9 {abbey} binasını ele geçir ve tut. ARMADA rotasyon çağırmadıkça ayrılma. Güvenliyse düşen puanları topla."
          ]},

          { type: "sub", text: "#11 {abbey} (Floating)" },
          { type: "list", items: [
            "**Floating** — #11 {abbey} binasını koru ve ARMADA nereye çağırırsa oraya esnek şekilde git. Gerekirse çekirdeği takviye et, gerekirse {abbey} binalarının kontrolünü değiştir, düşen puanları topla. Esnek ekip."
          ]},

          { type: "h", text: "🔎 BİNALARA GÖRE HIZLI BAŞVURU" },
          { type: "list", items: [
            "#4 {belltower} (Purpand) — Ele geçirme: Purpand, Labanet. Garnizon: JORDAN.",
            "#7 {stables} (kurdo) — Ele geçirme: kurdo, SirTav. Garnizon: MARK 07.",
            "#1 {swordshrine} (MANIA) — Ele geçirme: MANIA, HADES, ARMADA. Garnizon: ASHISH. Takviye: Zoe.",
            "#3 {reformation} (Tiger) — Ele geçirme: Tiger, Anubis. Garnizon: BigBen.",
            "#8 {sanctum} (Shaukan) — Ele geçirme: Shaukan, Gully. Garnizon: JeCqtumkiff.",
            "#10 {sanctum} (KAYSTER) — Ele geçirme: KAYSTER, Thanoss. Garnizon: Gianna.",
            "#2 {mercenary} (GhoSt) — Kaptan: GhoSt.",
            "#5 {abbey} (GrizzledAncient) — Ele geçirme: GrizzledAncient. Garnizon: Aronofsky.",
            "#6 {abbey} (GrZeChU) — Ele geçirme: GrZeChU. Garnizon: Mook.",
            "#9 {abbey} (Loba) — Ele geçirme ve tutma: Loba.",
            "#11 {abbey} (Floating) — Esnek (Floating)."
          ]},

          { type: "h", text: "🔥 SEFERBERLİK LİDERİ BONUS HATIRLATMASI" },
          { type: "p", text: "Yalnızca Legion 1 seferberlik liderleri: MANIA, HADES, ARMADA, Tiger, Anubis. Mümkünse seferberliklerinizden önce 2K mücevher bonuslarını kullanın. Bu, ele geçirme savaşlarında size gerçek bir üstünlük sağlar ve seferberliklerinizin kırılmasını zorlaştırır. Zorunlu değil ama şiddetle tavsiye edilir." },

          { type: "h", text: "📣 ARMADA İÇİN KOORDİNATÖR NOTLARI" },
          { type: "list", items: [
            "Hedefleri harita numarası ve oyuncu adıyla bildir: “#3 {reformation} Tiger, şimdi seferberlik.” / “MANIA, düşman #10 {sanctum} üzerine baskı yap.”",
            "Ele geçirme ekiplerini hareketli tut. MANIA, HADES, Tiger ve Anubis binaların içinde beklemesin.",
            "Garnizon Kaptanlarını yalnızca gerekirse değiştir. Her değişim binayı kaybetme riski taşır.",
            "#2 {mercenary} bekleme süresini takip et. GhoSt bunu her 7 dakikada bir kullanır.",
            "Son 10 dakikada şunları koru: #1 {swordshrine}, #8 {sanctum}, #10 {sanctum}. Öldürme peşinde koşma.",
            "Herkese hatırlat: Legion 1 sonucu ittifak ödüllerini belirler.",
            "Bu sefer yedek yok. Listedeki herkes ana kadrodadır. Biri geç kalırsa esnek (flex) oyuncular yerini doldurur."
          ]},

          { type: "h", text: "📌 SON NOTLAR" },
          { type: "list", items: [
            "Tüm oyuncular başlangıçta çevrimiçi olmalı.",
            "R4/R5 hedefleri Ekip Sohbeti'nde harita numarasıyla bildirir.",
            "Kimsenin sesli konuşması gerekmez. Ekip Sohbeti'ni ve haritayı takip etmek yeterli.",
            "Unutmayın: bina adları, harita konumları ve renk bölgeleri.",
            "Garnizon Kaptanları binanın içinde kalır ve değiştirilene kadar tutar. Ele geçirme ekipleri hareketli ve saldırgan kalır.",
            "Seferberlik liderleri: Mümkünse 2K mücevher bonuslarını kullanın. Yalnızca Legion 1.",
            "**Ana kural:** #1 {swordshrine} + #8 {sanctum} + #10 {sanctum} elde tutulacak. Kullanın: #4 {belltower}, #7 {stables}, #3 {reformation}, #2 {mercenary}. {abbey}lar ve düşen puanlar toplanacak.",
            "**Öldürme uğruna asla ana bir binayı feda etmeyin.**"
          ]},
          { type: "p", text: "Pazar günü bol şans!" },

          { type: "h", text: "🗺️ HARİTA" },
          { type: "img", src: "figures/NEXUS_SwordlanShowdown_Map.jpeg", alt: "Harita" },
          { type: "h", text: "🧭 ATANAN BÖLGELER" },
          { type: "img", src: "figures/assigned_zone.png", alt: "Atanan bölgeler" }
        ]
      },
      id: {
        title: "Acara Aliansi Terbaru",
        blocks: [
          { type: "img", src: "figures/Legion_1.png", alt: "Legion 1" },
          { type: "h", text: "📅 LEGION 1 — PENUGASAN PEMAIN · SWORDLAND SHOWDOWN" },
          { type: "p", text: "**Tanggal:** Minggu, 20.09 · **Koordinator:** ARMADA (88.4M)" },
          { type: "p", text: "Legion 1 adalah pertempuran utama. Hasilnya menentukan seluruh hadiah aliansi." },
          { type: "callout", text: "**Kali ini tidak ada pemain cadangan.** Semua pemain yang tercantum di bawah adalah roster utama." },

          { type: "h", text: "🎯 PENGINGAT DOKTRIN" },
          { type: "p", text: "Pemain terkuat menyerang dan merebut. Setelah bangunan berpindah tangan, **Kapten Garnisun** menahannya sementara tim perebut melanjutkan. Kapten Garnisun tidak pergi mengejar kill. Tim perebut tetap mobile dan agresif." },
          { type: "callout", text: "**Pemimpin Reli:** Perkuat dirimu dengan buff permata 2K jika memungkinkan. Ini hanya disarankan untuk pemimpin reli Legion 1. Ini memberi keunggulan nyata dalam pertarungan perebutan dan membuat reli kalian lebih sulit dipatahkan." },

          { type: "sub", text: "#4 {belltower} (Purpand) — Kecepatan perebutan" },
          { type: "list", items: [
            "**Purpand (55M)** — Pemimpin perebutan. Rebut #4 {belltower} segera di awal bersama Labanet. Setelah berpindah tangan, serahkan ke JORDAN sebagai Kapten Garnisun dan bergerak memperkuat #7 {stables} (kurdo) atau #8 {sanctum} (Shaukan). Tetap mobile.",
            "**Labanet (54.6M)** — Pendukung perebutan. Bergabung dengan Purpand di awal dan rebut #4 {belltower}. Setelah berpindah tangan, serahkan ke JORDAN dan bergerak bersama Purpand ke #7 {stables} (kurdo) atau #8 {sanctum} (Shaukan). Tetap mobile.",
            "**JORDAN (51.8M)** — Kapten Garnisun. Bersiaga di dekat #4 {belltower} di awal. Setelah Purpand merebutnya, ambil alih sebagai kapten dan tahan. Jangan pergi kecuali ARMADA memanggil rotasi. Kecepatan perebutan penting sepanjang pertandingan."
          ]},

          { type: "sub", text: "#7 {stables} (kurdo) — Cooldown teleportasi" },
          { type: "list", items: [
            "**kurdo (51.6M)** — Pemimpin perebutan. Rebut #7 {stables} segera di awal bersama SirTav. Setelah berpindah tangan, serahkan ke MARK 07 sebagai Kapten Garnisun dan bergerak memperkuat tengah atau #8 {sanctum} (Shaukan) dan #10 {sanctum} (KAYSTER). Tetap mobile.",
            "**SirTav (51.1M)** — Pendukung perebutan. Bergabung dengan kurdo di awal dan rebut #7 {stables}. Setelah berpindah tangan, serahkan ke MARK 07 dan bergerak bersama kurdo memperkuat tengah. Tetap mobile.",
            "**MARK 07 (50.9M)** — Kapten Garnisun. Bersiaga di dekat #7 {stables} di awal. Setelah kurdo merebutnya, ambil alih sebagai kapten dan tahan. Jangan pergi kecuali ARMADA memanggil rotasi. Pengurangan cooldown teleportasi harus tetap aktif."
          ]},

          { type: "sub", text: "#1 {swordshrine} (MANIA) — Inti, poin tertinggi" },
          { type: "list", items: [
            "**MANIA (98.7M)** — Kapten reli utama. Perkuat dirimu dengan buff permata 2K sebelum reli. Pimpin gelombang perebutan #1 {swordshrine} bersama HADES dan ARMADA. Setelah berpindah tangan, serahkan ke ASHISH sebagai Kapten Garnisun dan bergerak bersama HADES dan ARMADA menekan #3 {reformation} (Tiger) atau #8 {sanctum} (Shaukan) dan #10 {sanctum} (KAYSTER) milik musuh. Jangan berdiam di dalam bangunan.",
            "**HADES (90.1M)** — Pemimpin reli. Perkuat dirimu dengan buff permata 2K sebelum reli. Bergabung dengan gelombang perebutan MANIA di #1 {swordshrine}. Setelah penyerahan ke ASHISH, bergerak bersama MANIA dan ARMADA menekan #3 {reformation} (Tiger) atau inti musuh. Tetap mobile.",
            "**ARMADA (88.4M)** — Koordinator dan pemimpin reli. Perkuat dirimu dengan buff permata 2K sebelum reli. Panggil target di Chat Skuad. Bergabung dengan gelombang perebutan MANIA di #1 {swordshrine}. Setelah penyerahan ke ASHISH, bergerak bersama MANIA dan HADES menekan #3 {reformation} (Tiger) atau inti musuh. Tugasmu adalah membaca peta, memanggil objektif berikutnya, dan menjaga tim perebut tetap bergerak.",
            "**ASHISH (82.2M)** — Kapten Garnisun. Bersiaga di dekat #1 {swordshrine} sebelum pukul 15:00. Setelah MANIA merebutnya, ambil alih sebagai kapten dan tahan, dengan Zoe sebagai penguat. Jangan tinggalkan #1 {swordshrine} kecuali ARMADA memanggil rotasi. Kamu adalah jangkar inti.",
            "**Zoe (56.4M)** — Penguat. Bersiaga di dekat #1 {swordshrine} dan perkuat ASHISH setelah bangunan berpindah tangan. Bertahan bersamanya dan jangan pergi kecuali ARMADA memanggil rotasi."
          ]},

          { type: "sub", text: "#3 {reformation} (Tiger) — Buff serangan/pertahanan" },
          { type: "list", items: [
            "**Tiger (65.5M)** — Kapten reli utama. Perkuat dirimu dengan buff permata 2K sebelum reli. Pimpin gelombang perebutan #3 {reformation} bersama Anubis. Setelah berpindah tangan, serahkan ke BigBen sebagai Kapten Garnisun dan bergerak bersama Anubis memperkuat #1 {swordshrine} (ASHISH) atau menekan inti musuh. Tetap mobile.",
            "**Anubis (61.3M)** — Pemimpin reli. Perkuat dirimu dengan buff permata 2K sebelum reli. Bergabung dengan gelombang perebutan Tiger di #3 {reformation}. Setelah penyerahan ke BigBen, bergerak bersama Tiger memperkuat #1 {swordshrine} (ASHISH) atau menekan inti musuh. Tetap mobile.",
            "**BigBen (58.2M)** — Kapten Garnisun. Bersiaga di dekat #3 {reformation} sebelum pukul 15:00. Setelah Tiger merebutnya, ambil alih sebagai kapten dan tahan. Jangan tinggalkan #3 {reformation} kecuali ARMADA memanggil rotasi. Buff serangan dan pertahanan dari #3 {reformation} harus tetap aktif untuk aliansimu."
          ]},

          { type: "sub", text: "#8 {sanctum} (Shaukan) — Inti" },
          { type: "list", items: [
            "**Shaukan (50.7M)** — Pemimpin perebutan. Rebut #8 {sanctum} bersama Gully di awal. Setelah berpindah tangan, serahkan ke JeCqtumkiff sebagai Kapten Garnisun dan bergerak memperkuat #10 {sanctum} (KAYSTER) atau #1 {swordshrine} (ASHISH). Tetap mobile.",
            "**Gully (50M)** — Pendukung perebutan. Bergabung dengan Shaukan di awal dan rebut #8 {sanctum}. Setelah berpindah tangan, serahkan ke JeCqtumkiff dan bergerak bersama Shaukan memperkuat #10 {sanctum} (KAYSTER) atau #1 {swordshrine} (ASHISH). Tetap mobile.",
            "**JeCqtumkiff (49.7M)** — Kapten Garnisun. Bersiaga di dekat #8 {sanctum} di awal. Setelah Shaukan merebutnya, ambil alih sebagai kapten dan tahan. Jangan pergi kecuali ARMADA memanggil rotasi. #8 {sanctum} adalah inti."
          ]},

          { type: "sub", text: "#10 {sanctum} (KAYSTER) — Inti" },
          { type: "list", items: [
            "**KAYSTER (49M)** — Pemimpin perebutan. Rebut #10 {sanctum} bersama Thanoss di awal. Setelah berpindah tangan, serahkan ke Gianna sebagai Kapten Garnisun dan bergerak memperkuat #1 {swordshrine} (ASHISH). Tetap mobile.",
            "**Thanoss (43.6M)** — Pendukung perebutan. Bergabung dengan KAYSTER di awal dan rebut #10 {sanctum}. Setelah berpindah tangan, serahkan ke Gianna dan bergerak bersama KAYSTER memperkuat #1 {swordshrine} (ASHISH). Tetap mobile.",
            "**Gianna (42.8M)** — Kapten Garnisun. Bersiaga di dekat #10 {sanctum} di awal. Setelah KAYSTER merebutnya, ambil alih sebagai kapten dan tahan. Jangan pergi kecuali ARMADA memanggil rotasi. #10 {sanctum} adalah inti."
          ]},

          { type: "sub", text: "#2 {mercenary} (GhoSt) — Serangan tentara bayaran" },
          { type: "list", items: [
            "**GhoSt (52.4M, R5)** — Kapten. Bersiaga di dekat #2 {mercenary} sebelum pukul 15:00. Setelah tersedia, ambil dan gunakan tentara bayaran setiap 7 menit ke inti musuh. Koordinasikan waktunya dengan ARMADA di Chat Skuad. Bantu koordinasi secara keseluruhan sebagai R5."
          ]},

          { type: "sub", text: "#5 {abbey} (GrizzledAncient)" },
          { type: "list", items: [
            "**GrizzledAncient (40.8M)** — Perebutan. Rebut #5 {abbey} di awal bersama Aronofsky. Setelah berpindah tangan, Aronofsky menahannya dan kamu bergerak memperkuat #6 {abbey} (GrZeChU) atau #9 {abbey} (Loba) bila perlu. Tetap mobile.",
            "**Aronofsky (39.8M)** — Kapten Garnisun. Bersiaga di dekat #5 {abbey} di awal. Setelah GrizzledAncient merebutnya, ambil alih sebagai kapten dan tahan. Jangan pergi kecuali ARMADA memanggil rotasi."
          ]},

          { type: "sub", text: "#6 {abbey} (GrZeChU)" },
          { type: "list", items: [
            "**GrZeChU (39.4M)** — Perebutan. Rebut #6 {abbey} di awal bersama Mook. Setelah berpindah tangan, Mook menahannya dan kamu bergerak memperkuat #5 {abbey} (GrizzledAncient) atau #9 {abbey} (Loba) bila perlu. Tetap mobile.",
            "**Mook (38.8M)** — Kapten Garnisun. Bersiaga di dekat #6 {abbey} di awal. Setelah GrZeChU merebutnya, ambil alih sebagai kapten dan tahan. Jangan pergi kecuali ARMADA memanggil rotasi. Bantu kumpulkan poin yang jatuh saat aman."
          ]},

          { type: "sub", text: "#9 {abbey} (Loba)" },
          { type: "list", items: [
            "**Loba (37.3M)** — Rebut dan tahan. Rebut #9 {abbey} di awal dan tahan. Jangan pergi kecuali ARMADA memanggil rotasi. Kumpulkan poin yang jatuh saat aman."
          ]},

          { type: "sub", text: "#11 {abbey} (Floating)" },
          { type: "list", items: [
            "**Floating** — Jaga #11 {abbey} dan bergeraklah fleksibel ke mana pun ARMADA memanggil. Perkuat inti bila perlu, rebut {abbey} bila perlu, ambil poin yang jatuh. Skuad flex."
          ]},

          { type: "h", text: "🔎 REFERENSI CEPAT PER BANGUNAN" },
          { type: "list", items: [
            "#4 {belltower} (Purpand) — Perebutan: Purpand, Labanet. Garnisun: JORDAN.",
            "#7 {stables} (kurdo) — Perebutan: kurdo, SirTav. Garnisun: MARK 07.",
            "#1 {swordshrine} (MANIA) — Perebutan: MANIA, HADES, ARMADA. Garnisun: ASHISH. Penguat: Zoe.",
            "#3 {reformation} (Tiger) — Perebutan: Tiger, Anubis. Garnisun: BigBen.",
            "#8 {sanctum} (Shaukan) — Perebutan: Shaukan, Gully. Garnisun: JeCqtumkiff.",
            "#10 {sanctum} (KAYSTER) — Perebutan: KAYSTER, Thanoss. Garnisun: Gianna.",
            "#2 {mercenary} (GhoSt) — Kapten: GhoSt.",
            "#5 {abbey} (GrizzledAncient) — Perebutan: GrizzledAncient. Garnisun: Aronofsky.",
            "#6 {abbey} (GrZeChU) — Perebutan: GrZeChU. Garnisun: Mook.",
            "#9 {abbey} (Loba) — Rebut dan tahan: Loba.",
            "#11 {abbey} (Floating) — Floating."
          ]},

          { type: "h", text: "🔥 PENGINGAT BUFF UNTUK PEMIMPIN RELI" },
          { type: "p", text: "Khusus pemimpin reli Legion 1: MANIA, HADES, ARMADA, Tiger, Anubis. Gunakan buff permata 2K sebelum reli jika memungkinkan. Ini memberi keunggulan nyata dalam pertarungan perebutan dan membuat reli kalian lebih sulit dipatahkan. Tidak wajib, tetapi sangat disarankan." },

          { type: "h", text: "📣 CATATAN KOORDINATOR UNTUK ARMADA" },
          { type: "list", items: [
            "Panggil target dengan nomor peta dan nama pemain: “#3 {reformation} Tiger, Reli sekarang.” / “MANIA, tekan #10 {sanctum} musuh.”",
            "Jaga tim perebut tetap mobile. Jangan biarkan MANIA, HADES, Tiger, dan Anubis berdiam di dalam bangunan.",
            "Ganti Kapten Garnisun hanya jika perlu. Setiap pergantian berisiko kehilangan bangunan.",
            "Pantau cooldown #2 {mercenary}. GhoSt menggunakannya setiap 7 menit.",
            "Di 10 menit terakhir, lindungi #1 {swordshrine}, #8 {sanctum}, #10 {sanctum}. Jangan mengejar kill.",
            "Ingatkan semua: hasil Legion 1 menentukan hadiah aliansi.",
            "Kali ini tidak ada cadangan. Semua orang di daftar adalah roster utama. Jika ada yang terlambat, pemain flex menutupi posisinya."
          ]},

          { type: "h", text: "📌 CATATAN AKHIR" },
          { type: "list", items: [
            "Semua pemain harus online saat mulai.",
            "R4/R5 memanggil target dengan nomor peta di Chat Skuad.",
            "Tidak ada yang wajib bicara lewat voice. Mengikuti Chat Skuad dan peta sudah cukup.",
            "Ingat: nama bangunan, posisi di peta, dan zona warna.",
            "Kapten Garnisun tetap di dalam bangunan dan menahannya sampai digantikan. Tim perebut tetap mobile dan agresif.",
            "Pemimpin reli: gunakan buff permata 2K jika memungkinkan. Hanya untuk Legion 1.",
            "**Aturan utama:** tahan #1 {swordshrine} + #8 {sanctum} + #10 {sanctum}. Gunakan #4 {belltower}, #7 {stables}, #3 {reformation}, #2 {mercenary}. Farming {abbey} dan poin yang jatuh.",
            "**Jangan pernah menukar bangunan inti demi kill.**"
          ]},
          { type: "p", text: "Semoga sukses hari Minggu!" },

          { type: "h", text: "🗺️ PETA" },
          { type: "img", src: "figures/NEXUS_SwordlanShowdown_Map.jpeg", alt: "Peta" },
          { type: "h", text: "🧭 ZONA YANG DITUGASKAN" },
          { type: "img", src: "figures/assigned_zone.png", alt: "Zona yang ditugaskan" }
        ]
      },
      ru: {
        title: "Последние события альянса",
        blocks: [
          { type: "img", src: "figures/Legion_1.png", alt: "Legion 1" },
          { type: "h", text: "📅 LEGION 1 — РАСПРЕДЕЛЕНИЕ ИГРОКОВ · БИТВА ЗА СТРАНУ МЕЧЕЙ" },
          { type: "p", text: "**Дата:** воскресенье, 20.09 · **Координатор:** ARMADA (88.4M)" },
          { type: "p", text: "Legion 1 — основная битва. Её результат определяет все награды альянса." },
          { type: "callout", text: "**В этот раз без запасных.** Все перечисленные ниже игроки — основной состав." },

          { type: "h", text: "🎯 НАПОМИНАНИЕ О ДОКТРИНЕ" },
          { type: "p", text: "Сильнейшие игроки атакуют и захватывают. Когда здание переходит к нам, **Капитан гарнизона** удерживает его, а команда захвата идёт дальше. Капитаны гарнизона не уходят за убийствами. Команды захвата остаются мобильными и агрессивными." },
          { type: "callout", text: "**Лидеры рейдов:** по возможности усильте себя 2K-усилениями за самоцветы. Рекомендуется только лидерам рейдов Legion 1. Это даёт реальное преимущество в боях за захват и делает ваши рейды труднее сломать." },

          { type: "sub", text: "#4 {belltower} (Purpand) — Скорость захвата" },
          { type: "list", items: [
            "**Purpand (55M)** — Ведущий захвата. В самом начале вместе с Labanet захватите здание #4 «{belltower}». После захвата передайте его JORDAN как Капитану гарнизона и отправляйтесь усиливать здание #7 «{stables}» (kurdo) или #8 «{sanctum}» (Shaukan). Действуйте мобильно.",
            "**Labanet (54.6M)** — Поддержка захвата. В начале присоединяйтесь к Purpand и захватите здание #4 «{belltower}». После захвата передайте его JORDAN и вместе с Purpand отправляйтесь к зданию #7 «{stables}» (kurdo) или #8 «{sanctum}» (Shaukan). Действуйте мобильно.",
            "**JORDAN (51.8M)** — Капитан гарнизона. В начале займите позицию рядом со зданием #4 «{belltower}». Когда Purpand захватит его, примите командование и удерживайте здание. Не уходите, пока ARMADA не объявит ротацию. Скорость захвата важна весь матч."
          ]},

          { type: "sub", text: "#7 {stables} (kurdo) — Перезарядка телепорта" },
          { type: "list", items: [
            "**kurdo (51.6M)** — Ведущий захвата. В самом начале вместе с SirTav захватите здание #7 «{stables}». После захвата передайте его MARK 07 как Капитану гарнизона и отправляйтесь усиливать центр либо здания #8 «{sanctum}» (Shaukan) и #10 «{sanctum}» (KAYSTER). Действуйте мобильно.",
            "**SirTav (51.1M)** — Поддержка захвата. В начале присоединяйтесь к kurdo и захватите здание #7 «{stables}». После захвата передайте его MARK 07 и вместе с kurdo отправляйтесь усиливать центр. Действуйте мобильно.",
            "**MARK 07 (50.9M)** — Капитан гарнизона. В начале займите позицию рядом со зданием #7 «{stables}». Когда kurdo захватит его, примите командование и удерживайте здание. Не уходите, пока ARMADA не объявит ротацию. Эффект сокращения перезарядки телепорта должен оставаться активным."
          ]},

          { type: "sub", text: "#1 {swordshrine} (MANIA) — Ядро, больше всего очков" },
          { type: "list", items: [
            "**MANIA (98.7M)** — Главный капитан рейда. Перед рейдом усильте себя 2K-усилениями за самоцветы. Возглавьте волну захвата здания #1 «{swordshrine}» вместе с HADES и ARMADA. После захвата передайте его ASHISH как Капитану гарнизона и вместе с HADES и ARMADA давите на здание #3 «{reformation}» (Tiger) либо на вражеские здания #8 «{sanctum}» (Shaukan) и #10 «{sanctum}» (KAYSTER). Не сидите внутри здания.",
            "**HADES (90.1M)** — Лидер рейда. Перед рейдом усильте себя 2K-усилениями за самоцветы. Присоединяйтесь к волне захвата MANIA на здание #1 «{swordshrine}». После передачи ASHISH вместе с MANIA и ARMADA давите на здание #3 «{reformation}» (Tiger) или на вражеское ядро. Действуйте мобильно.",
            "**ARMADA (88.4M)** — Координатор и лидер рейда. Перед рейдом усильте себя 2K-усилениями за самоцветы. Называйте цели в чате отряда. Присоединяйтесь к волне захвата MANIA на здание #1 «{swordshrine}». После передачи ASHISH вместе с MANIA и HADES давите на здание #3 «{reformation}» (Tiger) или на вражеское ядро. Ваша задача — читать карту, называть следующую цель и не давать командам захвата останавливаться.",
            "**ASHISH (82.2M)** — Капитан гарнизона. До 15:00 займите позицию рядом со зданием #1 «{swordshrine}». Когда MANIA захватит его, примите командование и удерживайте здание при поддержке Zoe. Не покидайте здание #1 «{swordshrine}», пока ARMADA не объявит ротацию. Вы — якорь ядра.",
            "**Zoe (56.4M)** — Подкрепление. Займите позицию рядом со зданием #1 «{swordshrine}» и поддержите ASHISH, когда здание будет захвачено. Держитесь вместе с ним и не уходите, пока ARMADA не объявит ротацию."
          ]},

          { type: "sub", text: "#3 {reformation} (Tiger) — Бонус к атаке/защите" },
          { type: "list", items: [
            "**Tiger (65.5M)** — Главный капитан рейда. Перед рейдом усильте себя 2K-усилениями за самоцветы. Возглавьте волну захвата здания #3 «{reformation}» вместе с Anubis. После захвата передайте его BigBen как Капитану гарнизона и вместе с Anubis усильте здание #1 «{swordshrine}» (ASHISH) или давите на вражеское ядро. Действуйте мобильно.",
            "**Anubis (61.3M)** — Лидер рейда. Перед рейдом усильте себя 2K-усилениями за самоцветы. Присоединяйтесь к волне захвата Tiger на здание #3 «{reformation}». После передачи BigBen вместе с Tiger усильте здание #1 «{swordshrine}» (ASHISH) или давите на вражеское ядро. Действуйте мобильно.",
            "**BigBen (58.2M)** — Капитан гарнизона. До 15:00 займите позицию рядом со зданием #3 «{reformation}». Когда Tiger захватит его, примите командование и удерживайте здание. Не покидайте здание #3 «{reformation}», пока ARMADA не объявит ротацию. Бонус к атаке и защите от здания #3 «{reformation}» должен оставаться активным для вашего альянса."
          ]},

          { type: "sub", text: "#8 {sanctum} (Shaukan) — Ядро" },
          { type: "list", items: [
            "**Shaukan (50.7M)** — Ведущий захвата. В самом начале вместе с Gully захватите здание #8 «{sanctum}». После захвата передайте его JeCqtumkiff как Капитану гарнизона и отправляйтесь усиливать здание #10 «{sanctum}» (KAYSTER) или #1 «{swordshrine}» (ASHISH). Действуйте мобильно.",
            "**Gully (50M)** — Поддержка захвата. В начале присоединяйтесь к Shaukan и захватите здание #8 «{sanctum}». После захвата передайте его JeCqtumkiff и вместе с Shaukan отправляйтесь усиливать здание #10 «{sanctum}» (KAYSTER) или #1 «{swordshrine}» (ASHISH). Действуйте мобильно.",
            "**JeCqtumkiff (49.7M)** — Капитан гарнизона. В начале займите позицию рядом со зданием #8 «{sanctum}». Когда Shaukan захватит его, примите командование и удерживайте здание. Не уходите, пока ARMADA не объявит ротацию. Здание #8 «{sanctum}» — часть ядра."
          ]},

          { type: "sub", text: "#10 {sanctum} (KAYSTER) — Ядро" },
          { type: "list", items: [
            "**KAYSTER (49M)** — Ведущий захвата. В самом начале вместе с Thanoss захватите здание #10 «{sanctum}». После захвата передайте его Gianna как Капитану гарнизона и отправляйтесь усиливать здание #1 «{swordshrine}» (ASHISH). Действуйте мобильно.",
            "**Thanoss (43.6M)** — Поддержка захвата. В начале присоединяйтесь к KAYSTER и захватите здание #10 «{sanctum}». После захвата передайте его Gianna и вместе с KAYSTER отправляйтесь усиливать здание #1 «{swordshrine}» (ASHISH). Действуйте мобильно.",
            "**Gianna (42.8M)** — Капитан гарнизона. В начале займите позицию рядом со зданием #10 «{sanctum}». Когда KAYSTER захватит его, примите командование и удерживайте здание. Не уходите, пока ARMADA не объявит ротацию. Здание #10 «{sanctum}» — часть ядра."
          ]},

          { type: "sub", text: "#2 {mercenary} (GhoSt) — Атаки наёмников" },
          { type: "list", items: [
            "**GhoSt (52.4M, R5)** — Капитан. До 15:00 займите позицию рядом со зданием #2 «{mercenary}». Как только оно станет доступным, займите его и каждые 7 минут применяйте наёмников против вражеского ядра. Согласуйте тайминг с ARMADA в чате отряда. Помогайте с общей координацией как R5."
          ]},

          { type: "sub", text: "#5 {abbey} (GrizzledAncient)" },
          { type: "list", items: [
            "**GrizzledAncient (40.8M)** — Захват. В начале вместе с Aronofsky захватите здание #5 «{abbey}». После захвата Aronofsky удерживает его, а вы при необходимости отправляйтесь усиливать здание #6 «{abbey}» (GrZeChU) или #9 «{abbey}» (Loba). Действуйте мобильно.",
            "**Aronofsky (39.8M)** — Капитан гарнизона. В начале займите позицию рядом со зданием #5 «{abbey}». Когда GrizzledAncient захватит его, примите командование и удерживайте здание. Не уходите, пока ARMADA не объявит ротацию."
          ]},

          { type: "sub", text: "#6 {abbey} (GrZeChU)" },
          { type: "list", items: [
            "**GrZeChU (39.4M)** — Захват. В начале вместе с Mook захватите здание #6 «{abbey}». После захвата Mook удерживает его, а вы при необходимости отправляйтесь усиливать здание #5 «{abbey}» (GrizzledAncient) или #9 «{abbey}» (Loba). Действуйте мобильно.",
            "**Mook (38.8M)** — Капитан гарнизона. В начале займите позицию рядом со зданием #6 «{abbey}». Когда GrZeChU захватит его, примите командование и удерживайте здание. Не уходите, пока ARMADA не объявит ротацию. Помогайте собирать выпавшие очки, когда это безопасно."
          ]},

          { type: "sub", text: "#9 {abbey} (Loba)" },
          { type: "list", items: [
            "**Loba (37.3M)** — Захват и удержание. В начале захватите здание #9 «{abbey}» и удерживайте его. Не уходите, пока ARMADA не объявит ротацию. Собирайте выпавшие очки, когда это безопасно."
          ]},

          { type: "sub", text: "#11 {abbey} (Floating)" },
          { type: "list", items: [
            "**Floating** — Прикрывайте здание #11 «{abbey}» и действуйте там, куда позовёт ARMADA. При необходимости усиливайте ядро, перезахватывайте {abbeyPl}, подбирайте выпавшие очки. Гибкий отряд."
          ]},

          { type: "h", text: "🔎 КРАТКАЯ СПРАВКА ПО ЗДАНИЯМ" },
          { type: "list", items: [
            "#4 {belltower} (Purpand) — Захват: Purpand, Labanet. Гарнизон: JORDAN.",
            "#7 {stables} (kurdo) — Захват: kurdo, SirTav. Гарнизон: MARK 07.",
            "#1 {swordshrine} (MANIA) — Захват: MANIA, HADES, ARMADA. Гарнизон: ASHISH. Подкрепление: Zoe.",
            "#3 {reformation} (Tiger) — Захват: Tiger, Anubis. Гарнизон: BigBen.",
            "#8 {sanctum} (Shaukan) — Захват: Shaukan, Gully. Гарнизон: JeCqtumkiff.",
            "#10 {sanctum} (KAYSTER) — Захват: KAYSTER, Thanoss. Гарнизон: Gianna.",
            "#2 {mercenary} (GhoSt) — Капитан: GhoSt.",
            "#5 {abbey} (GrizzledAncient) — Захват: GrizzledAncient. Гарнизон: Aronofsky.",
            "#6 {abbey} (GrZeChU) — Захват: GrZeChU. Гарнизон: Mook.",
            "#9 {abbey} (Loba) — Захват и удержание: Loba.",
            "#11 {abbey} (Floating) — Гибкий (Floating)."
          ]},

          { type: "h", text: "🔥 НАПОМИНАНИЕ ОБ УСИЛЕНИЯХ ДЛЯ ЛИДЕРОВ РЕЙДОВ" },
          { type: "p", text: "Только лидеры рейдов Legion 1: MANIA, HADES, ARMADA, Tiger, Anubis. По возможности используйте 2K-усиления за самоцветы перед своими рейдами. Это даёт реальное преимущество в боях за захват и делает ваши рейды труднее сломать. Не обязательно, но настоятельно рекомендуется." },

          { type: "h", text: "📣 ЗАМЕТКИ КООРДИНАТОРА ДЛЯ ARMADA" },
          { type: "list", items: [
            "Называйте цели по номеру на карте и имени игрока: «#3 {reformation} Tiger, рейд сейчас.» / «MANIA, давите на вражеское #10 {sanctum}.»",
            "Держите команды захвата мобильными. Не позволяйте MANIA, HADES, Tiger и Anubis сидеть внутри зданий.",
            "Меняйте Капитанов гарнизона только при необходимости. Каждая ротация рискует потерей здания.",
            "Следите за перезарядкой у #2 {mercenary}: GhoSt использует наёмников каждые 7 минут.",
            "В последние 10 минут защищайте #1 {swordshrine}, #8 {sanctum}, #10 {sanctum}. Не гонитесь за убийствами.",
            "Напомните всем: результат Legion 1 определяет награды альянса.",
            "В этот раз без запасных. Все в списке — основной состав. Если кто-то опаздывает, его место займут гибкие (flex) игроки."
          ]},

          { type: "h", text: "📌 ИТОГОВЫЕ ЗАМЕТКИ" },
          { type: "list", items: [
            "Все игроки должны быть онлайн на старте.",
            "R4/R5 называют цели по номеру на карте в чате отряда.",
            "Говорить в голосовом чате не обязательно. Достаточно следить за чатом отряда и картой.",
            "Запомните: названия зданий, расположение на карте и цветовые зоны.",
            "Капитаны гарнизона остаются внутри здания и держат его, пока их не сменят. Команды захвата остаются мобильными и агрессивными.",
            "Лидеры рейдов: по возможности используйте 2K-усиления за самоцветы. Только Legion 1.",
            "**Главное правило:** удерживайте #1 {swordshrine} + #8 {sanctum} + #10 {sanctum}. Задействуйте: #4 {belltower}, #7 {stables}, #3 {reformation}, #2 {mercenary}. Фармите {abbeyPl} и выпавшие очки.",
            "**Никогда не меняйте ключевое здание на убийства.**"
          ]},
          { type: "p", text: "Удачи в воскресенье!" },

          { type: "h", text: "🗺️ КАРТА" },
          { type: "img", src: "figures/NEXUS_SwordlanShowdown_Map.jpeg", alt: "Карта" },
          { type: "h", text: "🧭 НАЗНАЧЕННЫЕ ЗОНЫ" },
          { type: "img", src: "figures/assigned_zone.png", alt: "Назначенные зоны" }
        ]
      },
      th: {
        title: "กิจกรรมพันธมิตรล่าสุด",
        blocks: [
          { type: "img", src: "figures/Legion_1.png", alt: "Legion 1" },
          { type: "h", text: "📅 LEGION 1 — การมอบหมายผู้เล่น · ศึกดวลดินแดนดาบ" },
          { type: "p", text: "**วันที่:** วันอาทิตย์ที่ 20.09 · **ผู้ประสานงาน:** ARMADA (88.4M)" },
          { type: "p", text: "Legion 1 เป็นการรบหลัก ผลการรบมีผลต่อรางวัลของพันธมิตรทั้งหมด" },
          { type: "callout", text: "**ครั้งนี้ไม่มีตัวสำรอง** ผู้เล่นทุกคนที่อยู่ในรายชื่อด้านล่างเป็นรายชื่อหลักทั้งหมด" },

          { type: "h", text: "🎯 ย้ำหลักการรบ" },
          { type: "p", text: "ผู้เล่นที่แข็งแกร่งที่สุดโจมตีและยึดครอง เมื่อสิ่งปลูกสร้างเปลี่ยนมือแล้ว **หัวหน้ากองรักษาการณ์** จะยึดไว้ ขณะที่ทีมยึดครองเดินหน้าต่อ หัวหน้ากองรักษาการณ์ไม่ออกไปไล่ล่าการสังหาร ทีมยึดครองต้องคล่องตัวและรุกอยู่เสมอ" },
          { type: "callout", text: "**ผู้นำทีมระดมพล:** หากเป็นไปได้ ให้เสริมพลังตัวเองด้วยบัฟที่ซื้อด้วยอัญมณี 2K แนะนำเฉพาะผู้นำทีมระดมพลของ Legion 1 เท่านั้น ช่วยให้ได้เปรียบจริงในการสู้ยึดครอง และทำให้ทีมระดมพลของคุณถูกทำลายได้ยากขึ้น" },

          { type: "sub", text: "#4 {belltower} (Purpand) — ความเร็วในการยึดครอง" },
          { type: "list", items: [
            "**Purpand (55M)** — ผู้นำการยึดครอง ยึด #4 {belltower} ทันทีตอนเริ่มพร้อมกับ Labanet เมื่อยึดได้แล้วให้ส่งต่อให้ JORDAN เป็นหัวหน้ากองรักษาการณ์ แล้วไปเสริมที่ #7 {stables} (kurdo) หรือ #8 {sanctum} (Shaukan) คล่องตัวเข้าไว้",
            "**Labanet (54.6M)** — ผู้สนับสนุนการยึดครอง เข้าร่วมกับ Purpand ตอนเริ่มและยึด #4 {belltower} เมื่อยึดได้แล้วให้ส่งต่อให้ JORDAN แล้วไปกับ Purpand ที่ #7 {stables} (kurdo) หรือ #8 {sanctum} (Shaukan) คล่องตัวเข้าไว้",
            "**JORDAN (51.8M)** — หัวหน้ากองรักษาการณ์ ประจำตำแหน่งใกล้ #4 {belltower} ตอนเริ่ม เมื่อ Purpand ยึดได้แล้วให้รับตำแหน่งหัวหน้าและยึดไว้ ห้ามออกจากที่ เว้นแต่ ARMADA เรียกสลับหมุนเวียน ความเร็วในการยึดสำคัญตลอดทั้งแมตช์"
          ]},

          { type: "sub", text: "#7 {stables} (kurdo) — คูลดาวน์การเทเลพอร์ต" },
          { type: "list", items: [
            "**kurdo (51.6M)** — ผู้นำการยึดครอง ยึด #7 {stables} ทันทีตอนเริ่มพร้อมกับ SirTav เมื่อยึดได้แล้วให้ส่งต่อให้ MARK 07 เป็นหัวหน้ากองรักษาการณ์ แล้วไปเสริมตรงกลางหรือที่ #8 {sanctum} (Shaukan) และ #10 {sanctum} (KAYSTER) คล่องตัวเข้าไว้",
            "**SirTav (51.1M)** — ผู้สนับสนุนการยึดครอง เข้าร่วมกับ kurdo ตอนเริ่มและยึด #7 {stables} เมื่อยึดได้แล้วให้ส่งต่อให้ MARK 07 แล้วไปกับ kurdo เพื่อเสริมตรงกลาง คล่องตัวเข้าไว้",
            "**MARK 07 (50.9M)** — หัวหน้ากองรักษาการณ์ ประจำตำแหน่งใกล้ #7 {stables} ตอนเริ่ม เมื่อ kurdo ยึดได้แล้วให้รับตำแหน่งหัวหน้าและยึดไว้ ห้ามออกจากที่ เว้นแต่ ARMADA เรียกสลับหมุนเวียน ผลลดคูลดาวน์การเทเลพอร์ตต้องเปิดใช้งานอยู่ตลอด"
          ]},

          { type: "sub", text: "#1 {swordshrine} (MANIA) — แกนหลัก คะแนนสูงสุด" },
          { type: "list", items: [
            "**MANIA (98.7M)** — หัวหน้าทีมระดมพลหลัก ก่อนตั้งทีมระดมพลให้เสริมพลังตัวเองด้วยบัฟที่ซื้อด้วยอัญมณี 2K นำการยึดครอง #1 {swordshrine} พร้อมกับ HADES และ ARMADA เมื่อยึดได้แล้วให้ส่งต่อให้ ASHISH เป็นหัวหน้ากองรักษาการณ์ แล้วไปกับ HADES และ ARMADA เพื่อกดดัน #3 {reformation} (Tiger) หรือ #8 {sanctum} (Shaukan) และ #10 {sanctum} (KAYSTER) ของศัตรู อย่านั่งอยู่แต่ในสิ่งปลูกสร้าง",
            "**HADES (90.1M)** — ผู้นำทีมระดมพล ก่อนตั้งทีมระดมพลให้เสริมพลังตัวเองด้วยบัฟที่ซื้อด้วยอัญมณี 2K เข้าร่วมการยึดครอง #1 {swordshrine} ของ MANIA หลังส่งต่อให้ ASHISH แล้วให้ไปกับ MANIA และ ARMADA เพื่อกดดัน #3 {reformation} (Tiger) หรือแกนหลักของศัตรู คล่องตัวเข้าไว้",
            "**ARMADA (88.4M)** — ผู้ประสานงานและผู้นำทีมระดมพล ก่อนตั้งทีมระดมพลให้เสริมพลังตัวเองด้วยบัฟที่ซื้อด้วยอัญมณี 2K สั่งเป้าหมายในแชททีม เข้าร่วมการยึดครอง #1 {swordshrine} ของ MANIA หลังส่งต่อให้ ASHISH แล้วให้ไปกับ MANIA และ HADES เพื่อกดดัน #3 {reformation} (Tiger) หรือแกนหลักของศัตรู หน้าที่ของคุณคืออ่านแผนที่ สั่งเป้าหมายถัดไป และทำให้ทีมยึดครองเคลื่อนที่ต่อเนื่อง",
            "**ASHISH (82.2M)** — หัวหน้ากองรักษาการณ์ ประจำตำแหน่งใกล้ #1 {swordshrine} ก่อน 15:00 เมื่อ MANIA ยึดได้แล้วให้รับตำแหน่งหัวหน้าและยึดไว้ โดยมี Zoe เสริม ห้ามออกจาก #1 {swordshrine} เว้นแต่ ARMADA เรียกสลับหมุนเวียน คุณคือหลักยึดของแกนหลัก",
            "**Zoe (56.4M)** — กำลังเสริม ประจำตำแหน่งใกล้ #1 {swordshrine} และเสริม ASHISH เมื่อสิ่งปลูกสร้างเปลี่ยนมือ ยึดไว้ร่วมกับเขาและห้ามออก เว้นแต่ ARMADA เรียกสลับหมุนเวียน"
          ]},

          { type: "sub", text: "#3 {reformation} (Tiger) — บัฟโจมตี/ป้องกัน" },
          { type: "list", items: [
            "**Tiger (65.5M)** — หัวหน้าทีมระดมพลหลัก ก่อนตั้งทีมระดมพลให้เสริมพลังตัวเองด้วยบัฟที่ซื้อด้วยอัญมณี 2K นำการยึดครอง #3 {reformation} พร้อมกับ Anubis เมื่อยึดได้แล้วให้ส่งต่อให้ BigBen เป็นหัวหน้ากองรักษาการณ์ แล้วไปกับ Anubis เพื่อเสริม #1 {swordshrine} (ASHISH) หรือกดดันแกนหลักของศัตรู คล่องตัวเข้าไว้",
            "**Anubis (61.3M)** — ผู้นำทีมระดมพล ก่อนตั้งทีมระดมพลให้เสริมพลังตัวเองด้วยบัฟที่ซื้อด้วยอัญมณี 2K เข้าร่วมการยึดครอง #3 {reformation} ของ Tiger หลังส่งต่อให้ BigBen แล้วให้ไปกับ Tiger เพื่อเสริม #1 {swordshrine} (ASHISH) หรือกดดันแกนหลักของศัตรู คล่องตัวเข้าไว้",
            "**BigBen (58.2M)** — หัวหน้ากองรักษาการณ์ ประจำตำแหน่งใกล้ #3 {reformation} ก่อน 15:00 เมื่อ Tiger ยึดได้แล้วให้รับตำแหน่งหัวหน้าและยึดไว้ ห้ามออกจาก #3 {reformation} เว้นแต่ ARMADA เรียกสลับหมุนเวียน บัฟโจมตีและป้องกันจาก #3 {reformation} ต้องเปิดใช้งานอยู่ตลอดสำหรับพันธมิตรของคุณ"
          ]},

          { type: "sub", text: "#8 {sanctum} (Shaukan) — แกนหลัก" },
          { type: "list", items: [
            "**Shaukan (50.7M)** — ผู้นำการยึดครอง ยึด #8 {sanctum} พร้อมกับ Gully ตอนเริ่ม เมื่อยึดได้แล้วให้ส่งต่อให้ JeCqtumkiff เป็นหัวหน้ากองรักษาการณ์ แล้วไปเสริม #10 {sanctum} (KAYSTER) หรือ #1 {swordshrine} (ASHISH) คล่องตัวเข้าไว้",
            "**Gully (50M)** — ผู้สนับสนุนการยึดครอง เข้าร่วมกับ Shaukan ตอนเริ่มและยึด #8 {sanctum} เมื่อยึดได้แล้วให้ส่งต่อให้ JeCqtumkiff แล้วไปกับ Shaukan เพื่อเสริม #10 {sanctum} (KAYSTER) หรือ #1 {swordshrine} (ASHISH) คล่องตัวเข้าไว้",
            "**JeCqtumkiff (49.7M)** — หัวหน้ากองรักษาการณ์ ประจำตำแหน่งใกล้ #8 {sanctum} ตอนเริ่ม เมื่อ Shaukan ยึดได้แล้วให้รับตำแหน่งหัวหน้าและยึดไว้ ห้ามออกจากที่ เว้นแต่ ARMADA เรียกสลับหมุนเวียน #8 {sanctum} คือแกนหลัก"
          ]},

          { type: "sub", text: "#10 {sanctum} (KAYSTER) — แกนหลัก" },
          { type: "list", items: [
            "**KAYSTER (49M)** — ผู้นำการยึดครอง ยึด #10 {sanctum} พร้อมกับ Thanoss ตอนเริ่ม เมื่อยึดได้แล้วให้ส่งต่อให้ Gianna เป็นหัวหน้ากองรักษาการณ์ แล้วไปเสริม #1 {swordshrine} (ASHISH) คล่องตัวเข้าไว้",
            "**Thanoss (43.6M)** — ผู้สนับสนุนการยึดครอง เข้าร่วมกับ KAYSTER ตอนเริ่มและยึด #10 {sanctum} เมื่อยึดได้แล้วให้ส่งต่อให้ Gianna แล้วไปกับ KAYSTER เพื่อเสริม #1 {swordshrine} (ASHISH) คล่องตัวเข้าไว้",
            "**Gianna (42.8M)** — หัวหน้ากองรักษาการณ์ ประจำตำแหน่งใกล้ #10 {sanctum} ตอนเริ่ม เมื่อ KAYSTER ยึดได้แล้วให้รับตำแหน่งหัวหน้าและยึดไว้ ห้ามออกจากที่ เว้นแต่ ARMADA เรียกสลับหมุนเวียน #10 {sanctum} คือแกนหลัก"
          ]},

          { type: "sub", text: "#2 {mercenary} (GhoSt) — การโจมตีของทหารรับจ้าง" },
          { type: "list", items: [
            "**GhoSt (52.4M, R5)** — หัวหน้า ประจำตำแหน่งใกล้ #2 {mercenary} ก่อน 15:00 เมื่อพร้อมใช้งานให้ยึดไว้ และใช้ทหารรับจ้างทุก 7 นาทีต่อแกนหลักของศัตรู ประสานจังหวะกับ ARMADA ในแชททีม ช่วยประสานงานภาพรวมในฐานะ R5"
          ]},

          { type: "sub", text: "#5 {abbey} (GrizzledAncient)" },
          { type: "list", items: [
            "**GrizzledAncient (40.8M)** — ยึดครอง ยึด #5 {abbey} พร้อมกับ Aronofsky ตอนเริ่ม เมื่อยึดได้แล้ว Aronofsky จะยึดไว้ ส่วนคุณไปเสริม #6 {abbey} (GrZeChU) หรือ #9 {abbey} (Loba) ตามความจำเป็น คล่องตัวเข้าไว้",
            "**Aronofsky (39.8M)** — หัวหน้ากองรักษาการณ์ ประจำตำแหน่งใกล้ #5 {abbey} ตอนเริ่ม เมื่อ GrizzledAncient ยึดได้แล้วให้รับตำแหน่งหัวหน้าและยึดไว้ ห้ามออกจากที่ เว้นแต่ ARMADA เรียกสลับหมุนเวียน"
          ]},

          { type: "sub", text: "#6 {abbey} (GrZeChU)" },
          { type: "list", items: [
            "**GrZeChU (39.4M)** — ยึดครอง ยึด #6 {abbey} พร้อมกับ Mook ตอนเริ่ม เมื่อยึดได้แล้ว Mook จะยึดไว้ ส่วนคุณไปเสริม #5 {abbey} (GrizzledAncient) หรือ #9 {abbey} (Loba) ตามความจำเป็น คล่องตัวเข้าไว้",
            "**Mook (38.8M)** — หัวหน้ากองรักษาการณ์ ประจำตำแหน่งใกล้ #6 {abbey} ตอนเริ่ม เมื่อ GrZeChU ยึดได้แล้วให้รับตำแหน่งหัวหน้าและยึดไว้ ห้ามออกจากที่ เว้นแต่ ARMADA เรียกสลับหมุนเวียน ช่วยเก็บแต้มที่ตกหล่นเมื่อปลอดภัย"
          ]},

          { type: "sub", text: "#9 {abbey} (Loba)" },
          { type: "list", items: [
            "**Loba (37.3M)** — ยึดครองและยึดไว้ ยึด #9 {abbey} ตอนเริ่มและยึดไว้ ห้ามออกจากที่ เว้นแต่ ARMADA เรียกสลับหมุนเวียน เก็บแต้มที่ตกหล่นเมื่อปลอดภัย"
          ]},

          { type: "sub", text: "#11 {abbey} (Floating)" },
          { type: "list", items: [
            "**Floating** — คุ้มครอง #11 {abbey} และเคลื่อนที่ไปตามที่ ARMADA เรียก เสริมแกนหลักเมื่อจำเป็น พลิกการยึด{abbey}เมื่อจำเป็น เก็บแต้มที่ตกหล่น ทีมยืดหยุ่น (flex)"
          ]},

          { type: "h", text: "🔎 สรุปย่อตามสิ่งปลูกสร้าง" },
          { type: "list", items: [
            "#4 {belltower} (Purpand) — ยึดครอง: Purpand, Labanet. กองรักษาการณ์: JORDAN.",
            "#7 {stables} (kurdo) — ยึดครอง: kurdo, SirTav. กองรักษาการณ์: MARK 07.",
            "#1 {swordshrine} (MANIA) — ยึดครอง: MANIA, HADES, ARMADA. กองรักษาการณ์: ASHISH. กำลังเสริม: Zoe.",
            "#3 {reformation} (Tiger) — ยึดครอง: Tiger, Anubis. กองรักษาการณ์: BigBen.",
            "#8 {sanctum} (Shaukan) — ยึดครอง: Shaukan, Gully. กองรักษาการณ์: JeCqtumkiff.",
            "#10 {sanctum} (KAYSTER) — ยึดครอง: KAYSTER, Thanoss. กองรักษาการณ์: Gianna.",
            "#2 {mercenary} (GhoSt) — หัวหน้า: GhoSt.",
            "#5 {abbey} (GrizzledAncient) — ยึดครอง: GrizzledAncient. กองรักษาการณ์: Aronofsky.",
            "#6 {abbey} (GrZeChU) — ยึดครอง: GrZeChU. กองรักษาการณ์: Mook.",
            "#9 {abbey} (Loba) — ยึดครองและยึดไว้: Loba.",
            "#11 {abbey} (Floating) — ยืดหยุ่น (Floating)."
          ]},

          { type: "h", text: "🔥 ย้ำเรื่องบัฟของผู้นำทีมระดมพล" },
          { type: "p", text: "เฉพาะผู้นำทีมระดมพลของ Legion 1: MANIA, HADES, ARMADA, Tiger, Anubis หากเป็นไปได้ ให้ใช้บัฟที่ซื้อด้วยอัญมณี 2K ก่อนตั้งทีมระดมพล ช่วยให้ได้เปรียบจริงในการสู้ยึดครอง และทำให้ทีมระดมพลของคุณถูกทำลายได้ยากขึ้น ไม่บังคับ แต่แนะนำอย่างยิ่ง" },

          { type: "h", text: "📣 บันทึกผู้ประสานงานสำหรับ ARMADA" },
          { type: "list", items: [
            "สั่งเป้าหมายด้วยหมายเลขบนแผนที่และชื่อผู้เล่น: “#3 {reformation} Tiger ตั้งทีมระดมพลตอนนี้” / “MANIA กดดัน #10 {sanctum} ของศัตรู”",
            "ให้ทีมยึดครองคล่องตัวอยู่เสมอ อย่าให้ MANIA, HADES, Tiger และ Anubis นั่งอยู่ในสิ่งปลูกสร้าง",
            "เปลี่ยนหัวหน้ากองรักษาการณ์เมื่อจำเป็นเท่านั้น ทุกครั้งที่สลับมีความเสี่ยงที่จะเสียสิ่งปลูกสร้าง",
            "ติดตามคูลดาวน์ของ #2 {mercenary} GhoSt ใช้ทุก 7 นาที",
            "10 นาทีสุดท้าย ปกป้อง #1 {swordshrine}, #8 {sanctum}, #10 {sanctum} อย่าไล่ล่าการสังหาร",
            "เตือนทุกคน: ผลของ Legion 1 เป็นตัวตัดสินรางวัลของพันธมิตร",
            "ครั้งนี้ไม่มีตัวสำรอง ทุกคนในรายชื่อเป็นรายชื่อหลัก หากใครมาสาย ผู้เล่นยืดหยุ่น (flex) จะเข้าไปแทนตำแหน่ง"
          ]},

          { type: "h", text: "📌 หมายเหตุสุดท้าย" },
          { type: "list", items: [
            "ผู้เล่นทุกคนต้องออนไลน์ตั้งแต่เริ่ม",
            "R4/R5 จะสั่งเป้าหมายด้วยหมายเลขบนแผนที่ในแชททีม",
            "ไม่จำเป็นต้องพูดผ่านเสียง แค่ตามแชททีมและแผนที่ก็เพียงพอ",
            "จำไว้: ชื่อสิ่งปลูกสร้าง ตำแหน่งบนแผนที่ และโซนสี",
            "หัวหน้ากองรักษาการณ์อยู่ในสิ่งปลูกสร้างและยึดไว้จนกว่าจะมีคนมาเปลี่ยน ทีมยึดครองต้องคล่องตัวและรุกอยู่เสมอ",
            "ผู้นำทีมระดมพล: หากเป็นไปได้ ให้ใช้บัฟที่ซื้อด้วยอัญมณี 2K เฉพาะ Legion 1 เท่านั้น",
            "**กฎหลัก:** ยึด #1 {swordshrine} + #8 {sanctum} + #10 {sanctum} ให้ได้ ใช้ประโยชน์จาก #4 {belltower}, #7 {stables}, #3 {reformation}, #2 {mercenary} ฟาร์ม {abbey} และแต้มที่ตกหล่น",
            "**ห้ามแลกสิ่งปลูกสร้างหลักกับการสังหารเด็ดขาด**"
          ]},
          { type: "p", text: "ขอให้โชคดีในวันอาทิตย์!" },

          { type: "h", text: "🗺️ แผนที่" },
          { type: "img", src: "figures/NEXUS_SwordlanShowdown_Map.jpeg", alt: "แผนที่" },
          { type: "h", text: "🧭 โซนที่ได้รับมอบหมาย" },
          { type: "img", src: "figures/assigned_zone.png", alt: "โซนที่ได้รับมอบหมาย" }
        ]
      },
      ar: {
        title: "أحدث فعاليات التحالف",
        blocks: [
          { type: "img", src: "figures/Legion_1.png", alt: "Legion 1" },
          { type: "h", text: "📅 LEGION 1 — توزيع اللاعبين · مواجهة أرض السيوف" },
          { type: "p", text: "**التاريخ:** الأحد 20.09 · **المنسّق:** ARMADA (88.4M)" },
          { type: "p", text: "Legion 1 هي المعركة الرئيسية. تُحتسب نتيجتها لجميع مكافآت التحالف." },
          { type: "callout", text: "**لا يوجد لاعبون احتياطيون هذه المرة.** جميع اللاعبين المدرجين أدناه من القائمة الأساسية." },

          { type: "h", text: "🎯 تذكير بالمبدأ القتالي" },
          { type: "p", text: "يهاجم أقوى اللاعبين ويستولون على المباني. بمجرد أن يتغير مالك المبنى، يتولى **قائد الحامية** الدفاع عنه بينما يواصل فريق الاستيلاء التقدم. لا يغادر قادة الحاميات لمطاردة الإقصاءات. يبقى فريق الاستيلاء متحركًا وهجوميًا." },
          { type: "callout", text: "**قادة الحشد:** عزّز نفسك بتعزيزات مشتراة بـ 2K جوهرة إن أمكن. يُوصى بذلك فقط لقادة الحشد في Legion 1. يمنحك أفضلية حقيقية في معارك الاستيلاء ويجعل حشودك أصعب كسرًا." },

          { type: "sub", text: "#4 {belltower} (Purpand) — سرعة الاستيلاء" },
          { type: "list", items: [
            "**Purpand (55M)** — قائد الاستيلاء. استولِ على #4 {belltower} فور البداية مع Labanet. عندما يتغير مالكه، سلّمه إلى JORDAN بصفته قائد الحامية وانتقل لتعزيز #7 {stables} (kurdo) أو #8 {sanctum} (Shaukan). ابقَ متحركًا.",
            "**Labanet (54.6M)** — داعم الاستيلاء. انضم إلى Purpand عند البداية واستولِ على #4 {belltower}. عندما يتغير مالكه، سلّمه إلى JORDAN وانتقل مع Purpand إلى #7 {stables} (kurdo) أو #8 {sanctum} (Shaukan). ابقَ متحركًا.",
            "**JORDAN (51.8M)** — قائد الحامية. تمركز بالقرب من #4 {belltower} عند البداية. عندما يستولي Purpand عليه، تولَّ القيادة وحافظ عليه. لا تغادر إلا إذا طلب ARMADA تناوبًا. سرعة الاستيلاء مهمة طوال المباراة."
          ]},

          { type: "sub", text: "#7 {stables} (kurdo) — فترة تبريد الانتقال الفوري" },
          { type: "list", items: [
            "**kurdo (51.6M)** — قائد الاستيلاء. استولِ على #7 {stables} فور البداية مع SirTav. عندما يتغير مالكه، سلّمه إلى MARK 07 بصفته قائد الحامية وانتقل لتعزيز الوسط أو #8 {sanctum} (Shaukan) و #10 {sanctum} (KAYSTER). ابقَ متحركًا.",
            "**SirTav (51.1M)** — داعم الاستيلاء. انضم إلى kurdo عند البداية واستولِ على #7 {stables}. عندما يتغير مالكه، سلّمه إلى MARK 07 وانتقل مع kurdo لتعزيز الوسط. ابقَ متحركًا.",
            "**MARK 07 (50.9M)** — قائد الحامية. تمركز بالقرب من #7 {stables} عند البداية. عندما يستولي kurdo عليه، تولَّ القيادة وحافظ عليه. لا تغادر إلا إذا طلب ARMADA تناوبًا. يجب أن يبقى تأثير تقليل فترة تبريد الانتقال الفوري فعّالًا."
          ]},

          { type: "sub", text: "#1 {swordshrine} (MANIA) — النواة، أعلى النقاط" },
          { type: "list", items: [
            "**MANIA (98.7M)** — قائد الحشد الرئيسي. عزّز نفسك قبل الحشد بتعزيزات مشتراة بـ 2K جوهرة. قُد موجة الاستيلاء على #1 {swordshrine} مع HADES و ARMADA. عندما يتغير مالكه، سلّمه إلى ASHISH بصفته قائد الحامية وانتقل مع HADES و ARMADA للضغط على #3 {reformation} (Tiger) أو على #8 {sanctum} (Shaukan) و #10 {sanctum} (KAYSTER) التابعين للعدو. لا تجلس داخل مبنى.",
            "**HADES (90.1M)** — قائد حشد. عزّز نفسك قبل الحشد بتعزيزات مشتراة بـ 2K جوهرة. انضم إلى موجة استيلاء MANIA على #1 {swordshrine}. بعد التسليم إلى ASHISH، انتقل مع MANIA و ARMADA للضغط على #3 {reformation} (Tiger) أو على نواة العدو. ابقَ متحركًا.",
            "**ARMADA (88.4M)** — المنسّق وقائد الحشد. عزّز نفسك قبل الحشد بتعزيزات مشتراة بـ 2K جوهرة. حدّد الأهداف في دردشة الفرقة. انضم إلى موجة استيلاء MANIA على #1 {swordshrine}. بعد التسليم إلى ASHISH، انتقل مع MANIA و HADES للضغط على #3 {reformation} (Tiger) أو على نواة العدو. مهمتك قراءة الخريطة وتحديد الهدف التالي وإبقاء فرق الاستيلاء في حركة.",
            "**ASHISH (82.2M)** — قائد الحامية. تمركز بالقرب من #1 {swordshrine} قبل 15:00. عندما يستولي MANIA عليه، تولَّ القيادة وحافظ عليه بدعم من Zoe. لا تغادر #1 {swordshrine} إلا إذا طلب ARMADA تناوبًا. أنت مرساة النواة.",
            "**Zoe (56.4M)** — تعزيز. تمركز بالقرب من #1 {swordshrine} وعزّز ASHISH بمجرد تغيّر مالك المبنى. احتفظ بالموقع معه ولا تغادر إلا إذا طلب ARMADA تناوبًا."
          ]},

          { type: "sub", text: "#3 {reformation} (Tiger) — تعزيز الهجوم/الدفاع" },
          { type: "list", items: [
            "**Tiger (65.5M)** — قائد الحشد الرئيسي. عزّز نفسك قبل الحشد بتعزيزات مشتراة بـ 2K جوهرة. قُد موجة الاستيلاء على #3 {reformation} مع Anubis. عندما يتغير مالكه، سلّمه إلى BigBen بصفته قائد الحامية وانتقل مع Anubis لتعزيز #1 {swordshrine} (ASHISH) أو للضغط على نواة العدو. ابقَ متحركًا.",
            "**Anubis (61.3M)** — قائد حشد. عزّز نفسك قبل الحشد بتعزيزات مشتراة بـ 2K جوهرة. انضم إلى موجة استيلاء Tiger على #3 {reformation}. بعد التسليم إلى BigBen، انتقل مع Tiger لتعزيز #1 {swordshrine} (ASHISH) أو للضغط على نواة العدو. ابقَ متحركًا.",
            "**BigBen (58.2M)** — قائد الحامية. تمركز بالقرب من #3 {reformation} قبل 15:00. عندما يستولي Tiger عليه، تولَّ القيادة وحافظ عليه. لا تغادر #3 {reformation} إلا إذا طلب ARMADA تناوبًا. يجب أن يبقى تعزيز الهجوم والدفاع من #3 {reformation} فعّالًا لتحالفك."
          ]},

          { type: "sub", text: "#8 {sanctum} (Shaukan) — النواة" },
          { type: "list", items: [
            "**Shaukan (50.7M)** — قائد الاستيلاء. استولِ على #8 {sanctum} مع Gully عند البداية. عندما يتغير مالكه، سلّمه إلى JeCqtumkiff بصفته قائد الحامية وانتقل لتعزيز #10 {sanctum} (KAYSTER) أو #1 {swordshrine} (ASHISH). ابقَ متحركًا.",
            "**Gully (50M)** — داعم الاستيلاء. انضم إلى Shaukan عند البداية واستولِ على #8 {sanctum}. عندما يتغير مالكه، سلّمه إلى JeCqtumkiff وانتقل مع Shaukan لتعزيز #10 {sanctum} (KAYSTER) أو #1 {swordshrine} (ASHISH). ابقَ متحركًا.",
            "**JeCqtumkiff (49.7M)** — قائد الحامية. تمركز بالقرب من #8 {sanctum} عند البداية. عندما يستولي Shaukan عليه، تولَّ القيادة وحافظ عليه. لا تغادر إلا إذا طلب ARMADA تناوبًا. #8 {sanctum} جزء من النواة."
          ]},

          { type: "sub", text: "#10 {sanctum} (KAYSTER) — النواة" },
          { type: "list", items: [
            "**KAYSTER (49M)** — قائد الاستيلاء. استولِ على #10 {sanctum} مع Thanoss عند البداية. عندما يتغير مالكه، سلّمه إلى Gianna بصفته قائد الحامية وانتقل لتعزيز #1 {swordshrine} (ASHISH). ابقَ متحركًا.",
            "**Thanoss (43.6M)** — داعم الاستيلاء. انضم إلى KAYSTER عند البداية واستولِ على #10 {sanctum}. عندما يتغير مالكه، سلّمه إلى Gianna وانتقل مع KAYSTER لتعزيز #1 {swordshrine} (ASHISH). ابقَ متحركًا.",
            "**Gianna (42.8M)** — قائد الحامية. تمركز بالقرب من #10 {sanctum} عند البداية. عندما يستولي KAYSTER عليه، تولَّ القيادة وحافظ عليه. لا تغادر إلا إذا طلب ARMADA تناوبًا. #10 {sanctum} جزء من النواة."
          ]},

          { type: "sub", text: "#2 {mercenary} (GhoSt) — هجمات المرتزقة" },
          { type: "list", items: [
            "**GhoSt (52.4M, R5)** — القائد. تمركز بالقرب من #2 {mercenary} قبل 15:00. عندما يصبح متاحًا، استولِ عليه واستخدم المرتزقة كل 7 دقائق ضد نواة العدو. نسّق التوقيت مع ARMADA في دردشة الفرقة. ساعد في التنسيق العام بصفتك R5."
          ]},

          { type: "sub", text: "#5 {abbey} (GrizzledAncient)" },
          { type: "list", items: [
            "**GrizzledAncient (40.8M)** — استيلاء. استولِ على #5 {abbey} عند البداية مع Aronofsky. عندما يتغير مالكه، يحتفظ به Aronofsky وتنتقل أنت لتعزيز #6 {abbey} (GrZeChU) أو #9 {abbey} (Loba) عند الحاجة. ابقَ متحركًا.",
            "**Aronofsky (39.8M)** — قائد الحامية. تمركز بالقرب من #5 {abbey} عند البداية. عندما يستولي GrizzledAncient عليه، تولَّ القيادة وحافظ عليه. لا تغادر إلا إذا طلب ARMADA تناوبًا."
          ]},

          { type: "sub", text: "#6 {abbey} (GrZeChU)" },
          { type: "list", items: [
            "**GrZeChU (39.4M)** — استيلاء. استولِ على #6 {abbey} عند البداية مع Mook. عندما يتغير مالكه، يحتفظ به Mook وتنتقل أنت لتعزيز #5 {abbey} (GrizzledAncient) أو #9 {abbey} (Loba) عند الحاجة. ابقَ متحركًا.",
            "**Mook (38.8M)** — قائد الحامية. تمركز بالقرب من #6 {abbey} عند البداية. عندما يستولي GrZeChU عليه، تولَّ القيادة وحافظ عليه. لا تغادر إلا إذا طلب ARMADA تناوبًا. ساعد في جمع النقاط المتساقطة عندما يكون ذلك آمنًا."
          ]},

          { type: "sub", text: "#9 {abbey} (Loba)" },
          { type: "list", items: [
            "**Loba (37.3M)** — استيلاء واحتفاظ. استولِ على #9 {abbey} عند البداية واحتفظ به. لا تغادر إلا إذا طلب ARMADA تناوبًا. اجمع النقاط المتساقطة عندما يكون ذلك آمنًا."
          ]},

          { type: "sub", text: "#11 {abbey} (Floating)" },
          { type: "list", items: [
            "**Floating** — غطِّ #11 {abbey} وتحرّك بمرونة حيثما يستدعيك ARMADA. عزّز النواة عند الحاجة، واقلب ملكية الأديرة عند الحاجة، والتقط النقاط المتساقطة. فرقة مرنة (flex)."
          ]},

          { type: "h", text: "🔎 مرجع سريع حسب المبنى" },
          { type: "list", items: [
            "#4 {belltower} (Purpand) — الاستيلاء: Purpand, Labanet. الحامية: JORDAN.",
            "#7 {stables} (kurdo) — الاستيلاء: kurdo, SirTav. الحامية: MARK 07.",
            "#1 {swordshrine} (MANIA) — الاستيلاء: MANIA, HADES, ARMADA. الحامية: ASHISH. التعزيز: Zoe.",
            "#3 {reformation} (Tiger) — الاستيلاء: Tiger, Anubis. الحامية: BigBen.",
            "#8 {sanctum} (Shaukan) — الاستيلاء: Shaukan, Gully. الحامية: JeCqtumkiff.",
            "#10 {sanctum} (KAYSTER) — الاستيلاء: KAYSTER, Thanoss. الحامية: Gianna.",
            "#2 {mercenary} (GhoSt) — القائد: GhoSt.",
            "#5 {abbey} (GrizzledAncient) — الاستيلاء: GrizzledAncient. الحامية: Aronofsky.",
            "#6 {abbey} (GrZeChU) — الاستيلاء: GrZeChU. الحامية: Mook.",
            "#9 {abbey} (Loba) — الاستيلاء والاحتفاظ: Loba.",
            "#11 {abbey} (Floating) — مرن (Floating)."
          ]},

          { type: "h", text: "🔥 تذكير بتعزيزات قادة الحشد" },
          { type: "p", text: "لقادة الحشد في Legion 1 فقط: MANIA, HADES, ARMADA, Tiger, Anubis. استخدموا تعزيزات مشتراة بـ 2K جوهرة قبل حشودكم إن أمكن. يمنحكم ذلك أفضلية حقيقية في معارك الاستيلاء ويجعل حشودكم أصعب كسرًا. ليس إلزاميًا، لكنه موصى به بشدة." },

          { type: "h", text: "📣 ملاحظات المنسّق لـ ARMADA" },
          { type: "list", items: [
            "حدّد الأهداف برقم الخريطة واسم اللاعب: «#3 {reformation} Tiger، الحشد الآن.» / «MANIA، اضغط على #10 {sanctum} للعدو.»",
            "أبقِ فرق الاستيلاء متحركة. لا تدع MANIA و HADES و Tiger و Anubis يجلسون داخل المباني.",
            "بدّل قادة الحاميات عند الضرورة فقط. كل تبديل يخاطر بفقدان المبنى.",
            "تتبّع فترة التبريد لـ #2 {mercenary}. يستخدمها GhoSt كل 7 دقائق.",
            "في آخر 10 دقائق، احمِ #1 {swordshrine} و #8 {sanctum} و #10 {sanctum}. لا تطارد الإقصاءات.",
            "ذكّر الجميع: نتيجة Legion 1 تحدد مكافآت التحالف.",
            "لا يوجد احتياطيون هذه المرة. كل من في القائمة من التشكيلة الأساسية. إذا تأخر أحد، يغطي اللاعبون المرنون (flex) مكانه."
          ]},

          { type: "h", text: "📌 ملاحظات أخيرة" },
          { type: "list", items: [
            "يجب أن يكون جميع اللاعبين متصلين عند البداية.",
            "يحدد R4/R5 الأهداف برقم الخريطة في دردشة الفرقة.",
            "لا يُطلب من أحد التحدث صوتيًا. يكفي متابعة دردشة الفرقة والخريطة.",
            "تذكّروا: أسماء المباني ومواقعها على الخريطة والمناطق اللونية.",
            "يبقى قادة الحاميات داخل مبانيهم ويحافظون عليها حتى يتم استبدالهم. يبقى فريق الاستيلاء متحركًا وهجوميًا.",
            "قادة الحشد: استخدموا تعزيزات مشتراة بـ 2K جوهرة إن أمكن. لـ Legion 1 فقط.",
            "**القاعدة الأساسية:** حافظوا على #1 {swordshrine} + #8 {sanctum} + #10 {sanctum}. استخدموا #4 {belltower} و #7 {stables} و #3 {reformation} و #2 {mercenary}. اجمعوا نقاط الأديرة والنقاط المتساقطة.",
            "**لا تضحّوا أبدًا بمبنى أساسي مقابل الإقصاءات.**"
          ]},
          { type: "p", text: "بالتوفيق يوم الأحد!" },

          { type: "h", text: "🗺️ الخريطة" },
          { type: "img", src: "figures/NEXUS_SwordlanShowdown_Map.jpeg", alt: "الخريطة" },
          { type: "h", text: "🧭 المناطق المخصصة" },
          { type: "img", src: "figures/assigned_zone.png", alt: "المناطق المخصصة" }
        ]
      }
    }
  },
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
            "🔵 **파란색(Blue) — 북서 성소 (West Sanctum)**",
            "🟢 **초록색(Green) — 남동 성소 (East Sanctum)**"
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
              { title: "경쟁 구역:", lines: ["**#8 북서 성소 (West Sanctum)**", "**#10 남동 성소 (East Sanctum)**"] },
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
            "Frachtzugvorräte sofort einsammeln, wenn Gebäude die Seiten wechseln",
            "Untergewölbe sammeln, wenn sie erscheinen",
            "Verstärke nahegelegene Garnisonen, wenn du nicht gerade eine Rally startest",
            "Lass Märsche nicht untätig herumstehen",
            "**JAGE KEINE Kills quer über die Karte.** Zufälliges PvP zerstreut uns und verringert unsere Effektivität. Greife Städte niedrigeren Levels an, wenn es sinnvoll ist; schwäche sie in der Nähe eines gehaltenen Gebäudes."
          ]},
          { type: "img", src: "figures/NEXUS_SwordlanShowdown_Map.jpeg", alt: "Assigned zones" },
           
          { type: "h", text: "🗺️ ZUGEWIESENE ZONEN" },
          { type: "p", text: "R4 wird bestätigte Mitglieder vor der Schlacht in Teams/Zonen aufteilen." },
          { type: "p", text: "Unsere **Stärksten Angreifer** werden zunächst einer Zone zugewiesen:" },
          { type: "list", items: [
            "🟣 **Lila — Glockenturm**",
            "🟡 **Gelb — Königliche Ställe**",
            "🔵 **Blau — Westliches Heiligtum**",
            "🟢 **Grün — Östliches Heiligtum**"
          ]},
          { type: "p", text: "Verbleibende Mitglieder werden zugewiesen, eine dieser Zonen/Teams zu unterstützen. Rotation kann je nach Schlachtbedingungen erforderlich sein - überwache immer den Squad Chat für Details." },
          { type: "p", text: "Bleib bei deiner zugewiesenen Zone, es sei denn, die Führung sagt dir, dass du dich bewegen sollst." },
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
              { title: "Umkämpfen:", lines: ["**#8 Westliches Heiligtum**", "**#10 Östliches Heiligtum**"] },
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
              "Hauptziel: **Haltet Schwertschrein + Westliches Heiligtum + Östliches Heiligtum.**",
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
  }
};
