/* Game terms — official in-game wording, taken from screenshots of the game in each language.
   Each row: [en, zh, ko, de, fr, pt, tr, id, ru, th, ar, optional note]. "—" = not seen yet. */
const TERM_LANGS = ["en", "zh", "ko", "de", "fr", "pt", "tr", "id", "ru", "th", "ar"];
const TERMS = [
 {
  "cat": "Events",
  "rows": [
   ["Swordland Showdown", "聖劍爭奪", "성검 쟁탈", "Schwertland-Showdown", "Choc du Glaive", "Confronto entre Espadas", "Kılıçdiyarı Hesaplaşması", "Swordland Showdown", "Битва за Страну мечей", "ศึกดวลดินแดนดาบ", "مواجهة أرض السيوف"],
   ["Swordland", "聖劍戰場", "성검 전장", "Schwertland", "Terres du Glaive", "Terra das Espadas", "Kılıçdiyarı", "Swordland", "Страна мечей", "ดินแดนดาบ", "أرض السيوف", "Portuguese shows both 'Terra das Espadas' and 'Terra da Espada' in the game."],
   ["Battlefield", "聖劍戰場", "성검 전장", "Schlachtfeld", "champ de bataille", "campo de batalha", "savaş alanı", "medan perang", "поле боя", "สนามรบ", "ساحة المعركة", "Seen inside sentences, not as a standalone label."],
   ["Tier C", "評等：C", "등급: C", "Stufe: C", "Palier : C", "Categoria: C", "Kademe: C", "Tingkat: C", "Ступень: C", "ระดับ: C", "المستوى: C"],
   ["Gold", "黃金", "골드", "Gold", "Or", "Ouro", "Altın", "Gold", "Золото", "ทอง", "الذهبي"],
   ["Legion 1 / 2", "軍團1 / 軍團2", "군단 1 / 2", "Legion 1 / 2", "Légion 1 / Légion 2", "Legião 1 / Legião 2", "1. Lejyon / 2. Lejyon", "Legiun 1 / Legiun 2", "Легион 1 / Легион 2", "กองทัพ 1 / กองทัพ 2", "الكتيبة 1 / الكتيبة 2"],
   ["Battle Starts In", "戰鬥開始倒數計時", "전투 시작까지", "Schlacht beginnt in", "Début du Combat dans", "A batalha inicia em", "Savaş Başlangıcı", "Pertempuran Dimulai", "Битва начнётся через", "การต่อสู้จะเริ่มในอีก", "ستبدأ المعركة بعد"],
   ["VS", "VS", "VS", "VS", "VS", "VS", "VS", "VS", "VS", "VS", "VS"],
   ["Combatants", "參戰人員", "참전 인원", "Kämpfer", "Combattants", "Combatentes", "Savaşçılar", "Petarung", "Участники битвы", "ผู้ต่อสู้", "المقاتلين"],
   ["Substitutes", "替補名單", "후보", "Ersatzspieler", "remplaçants", "substitutos", "yedekler", "pengganti", "запасные", "ตัวสำรอง", "البدلاء", "Seen inside sentences, not as a standalone label."]
  ]
 },
 {
  "cat": "Interface",
  "rows": [
   ["Events", "常規活動", "이벤트", "Events", "Évènements", "Eventos", "Etkinlikler", "Event", "События", "อีเวนต์", "الفعاليات"],
   ["Guide", "指南", "가이드", "Leitfaden", "Guide", "Guia", "Kılavuz", "Panduan", "Руководство", "คำแนะนำ", "الدليل"],
   ["Rules", "規則", "규칙", "Regeln", "Règles", "Regras", "Kurallar", "Aturan", "Правила", "กติกา", "القواعد", "The window title differs in some languages (e.g. 規則說明, 규칙 설명, Свод правил)."],
   ["Buildings", "建築介紹", "건물 소개", "Gebäude", "Bâtiments", "Construções", "Binalar", "Bangunan", "О зданиях", "สิ่งปลูกสร้าง", "المباني"],
   ["Rewards", "獎勵", "보상", "Belohnungen", "Récompenses", "Recompensas", "Ödüller", "Hadiah", "Награды", "รางวัล", "المكافآت"],
   ["Other", "其他", "기타", "Andere", "Autre", "Outros", "Diğer", "Lainnya", "Другое", "อื่นๆ", "أخرى"],
   ["First Control", "首次控制", "첫 점령", "Erste Eroberung", "Premier Contrôle", "Primeiro Controle", "İlk Kontrol", "Penguasaan Pertama", "Захват (1)", "การควบคุมครั้งแรก", "التحكم الأول"],
   ["Ongoing Occupation", "持續佔領", "지속 점령", "Fortwährende Besatzung", "Occupation en Cours", "Ocupação Contínua", "Süren İşgal", "Pendudukan Berlangsung", "Длит. удерж.", "การยึดครองที่ยังคงดำเนินอยู่", "الاحتلال المستمر"],
   ["Bonus Effect", "額外效果", "추가 효과", "Bonuseffekte", "Effet Bonus", "Efeito Bônus", "Bonus Etki", "Efek Bonus", "Бонусный эффект", "เอฟเฟกต์โบนัส", "تأثير المكافأة"],
   ["/m (per minute)", "/分鐘", "/분", "/M", "/m", "/m", "/dk", "/m", "/мин.", "/น.", "/د"],
   ["Recruit", "招募", "모집", "Rekrutieren", "Recruter", "Recrutar", "Görevlendir", "Rekrut", "Нанять", "เกณฑ์", "تجنيد"],
   ["Stats", "屬性", "속성", "Werte", "Stats", "Atributos", "Nitelikler", "Stats", "Показатели", "ค่าสถานะ", "السمات"],
   ["Skills", "技能", "스킬", "Fertigkeiten", "Compétences", "Habilidades", "Yetenekler", "Skill", "Навыки", "ทักษะ", "المهارات"],
   ["Gear", "裝備", "장비", "Ausrüstung", "Équipement", "Equipamento", "Donanım", "Gear", "Снаряж.", "อุปกรณ์", "العتاد", "Portuguese hero page tab: 'Equipamento'. The Backpack tab shows the short form 'Equip'."],
   ["Upgrade", "提升等級", "업그레이드", "Aufwerten", "Améliorer", "Aprimorar", "Yükselt", "Tingkatkan", "Улучшить", "อัปเกรด", "ترقية"],
   ["Troops Preview", "部隊總覽", "부대 보기", "Schwadronvorschau", "Aperçu des Troupes", "—", "Birlik Önizlemesi", "Pratinjau Skuad", "Предпросмотр войск", "ตัวอย่างทีม", "معاينة القوات"],
   ["All", "全部", "전부", "Alle", "Tout", "—", "Tümü", "Semua", "Все", "ทั้งหมด", "الكل"],
   ["In Town", "內城", "내성", "Stadt", "Centre-Ville", "—", "Şehrin İçi", "Dalam Kota", "Внутренний город", "ค่ายชั้นใน", "داخل المدينة"],
   ["Out of Town", "外城", "외성", "Wildnis", "Périphérie", "—", "Şehrin Çevresi", "Luar Kota", "Внешний город", "ค่ายชั้นนอก", "خارج المدينة"],
   ["Formations", "部隊編組", "부대 편성", "Trupp Formationen", "Formations de troupe", "—", "Birlik Dizilişleri", "Formasi Pasukan", "Войско", "รูปแบบการจัดวางทหาร", "القوات"],
   ["Backpack", "背包", "가방", "Rucksack", "Sac", "Mochila", "Çanta", "Ransel", "Рюкзак", "กระเป๋า", "حقيبة الظهر"],
   ["City Bonus", "城鎮增益", "도시 버프", "Stadts Bonus", "Revenu de la Ville", "Bônus da Cidade", "Şehir Bonusu", "Bonus Kota", "Бонус города", "โบนัสค่ายอพยพ", "مكافأة المدينة"]
  ]
 },
 {
  "cat": "Resources",
  "rows": [
   ["Relic Points", "聖契積分", "성스러운 계약 포인트", "Reliktpunkte", "Points de Relique", "Pontos de Relíquia", "Yadigâr Puanı", "Poin Relik", "Очки реликвий", "คะแนนวัตถุโบราณ", "نقاط الآثار"],
   ["Alliance Relic Points", "聯盟聖契積分", "연맹 성스러운 계약 포인트", "Allianz-Reliktpunkte", "Points de Relique d'Alliance", "Pontos de Relíquia da Aliança", "İttifak Yadigâr Puanı", "Poin Relik Aliansi", "Очки реликвий альянса", "คะแนนวัตถุโบราณพันธมิตร", "نقاط الآثار للتحالف"],
   ["Personal Relic Points", "個人聖契積分", "개인 성스러운 계약 포인트", "Persönliche Reliktpunkte", "Points de Relique Individuels", "Pontos de Relíquia Individuais", "Kişisel Yadigâr Puanı", "Poin Relik Pribadi", "Личные очки реликвий", "คะแนนวัตถุโบราณส่วนบุคคล", "نقاط الآثار الشخصية"],
   ["Defender's Relic Points", "防守聖契積分", "방어 측 성스러운 계약 포인트", "Reliktpunkte der Verteidigung", "Points de Relique du défenseur", "Pontos de Relíquia de Defesa", "Savunmacı Yadigâr Puanı", "Poin Relik Pertahanan", "очки реликвий защиты", "คะแนนวัตถุโบราณของผู้ป้องกัน", "نقاط الآثار الدفاعي", "Derived from an explanatory sentence; not a full standalone label in the game."],
   ["Arsenal Supplies", "輜重", "군수 물자", "Frachtzugvorräte", "Provisions de Train de bagages", "Suprimentos de Trem de Bagagem", "Bagaj Treni Malzemeleri", "Suplai Kereta Bagasi", "военные запасы", "เสบียงขบวนสัมภาระ", "إمدادات أمتعة القطار", "The points scattered when a building changes hands."]
  ]
 },
 {
  "cat": "Buildings",
  "rows": [
   ["Swordshrine", "聖劍祭壇", "성검 제단", "Schwertschrein", "Tombeau du Glaive", "Templo da Espada", "Kılıç Altarı", "Swordshrine", "Святилище меча", "วิหารดาบ", "ضريح السيوف"],
   ["Sanctum", "聖所", "성소", "Heiligtum", "Sanctuaire", "Santuário", "Tapınak", "Sanctum", "святилище", "วิหารศักดิ์สิทธิ์", "مزار"],
   ["Northwest Sanctum", "西北聖所", "북서 성소", "Nordwestliches Heiligtum", "Sanctuaire Nord-Ouest", "Santuário do Noroeste", "Kuzeybatı Tapınağı", "Sanctum Barat Laut", "Северо-западное святилище", "วิหารศักดิ์สิทธิ์ตะวันตกเฉียงเหนือ", "مزار الشمالي الغربي"],
   ["Southeast Sanctum", "東南聖所", "남동 성소", "Südwestliches Heiligtum", "Sanctuaire Sud-Est", "Santuário do Sudeste", "Güneydoğu Tapınağı", "Sanctum Tenggara", "Юго-восточное святилище", "วิหารศักดิ์สิทธิ์ตะวันออกเฉียงใต้", "مزار الجنوبي الشرقي", "The German game text says 'Südwestliches' (southwest) — a mistake in the game's own translation."],
   ["Abbey (1–4)", "修道院 (一~四號)", "수도원 (제1~제4)", "Abtei (1–4)", "Abbaye (1–4)", "Abadia (1–4)", "Manastır (1–4)", "Biara (1–4)", "Монастырь (1–4)", "อาราม (1–4)", "دير (1–4)"],
   ["Hall of Reformation", "教化大廳", "교화의 홀", "Reformationshalle", "Salle des Réformes", "Salão da Reforma", "Devrim Salonu", "Aula Reformasi", "Зал искупления", "หอปฏิรูป", "قاعة الإصلاح"],
   ["Belltower", "鐘塔", "시계탑", "Glockenturm", "Clocher", "Torre do Sino", "Çan Kulesi", "Menara Lonceng", "Колокольня", "หอระฆัง", "برج الجرس"],
   ["Royal Stables", "馬廄", "마구간", "Königliche Ställe", "Écuries Royales", "Estábulos da Realeza", "Kraliyet Ahırları", "Kandang Kuda Kerajaan", "Королевский конный двор", "คอกม้าหลวง", "الاسطبلات الملكية"],
   ["Mercenary Camp", "傭兵駐地", "용병 주둔지", "Söldnerlager", "Camp de Mercenaires", "Acampamento Mercenário", "Paralı Asker Kampı", "Kamp Tentara Bayaran", "Лагерь наемников", "ค่ายทหารรับจ้าง", "معسكر المرتزقة"],
   ["Undercellar", "隱蔽地窖", "땅굴", "Untergewölbe", "Caves", "Porões", "Gizli Mahzenler", "Undercellar", "подземелья", "ห้องใต้ดินลับ", "الأقبية السفلية", "Seen in sentences, usually plural."],
   ["Drill Camp", "特訓營地", "특훈 병영", "Drillcamp", "Camp d'Entraînement", "Acampamento de Treinamento", "Tatbikat Kampı", "Pelatihan Bor", "учебный лагерь", "ค่ายฝึก", "معسكر التدريبات"],
   ["Town Center", "城鎮中心", "도시 센터", "Stadtzentrum", "Centre", "Centro da Cidade", "Şehir Merkezi", "Pusat Kota", "центр города", "ศูนย์กลางเมือง", "مركز البلدة"]
  ]
 },
 {
  "cat": "Battle roles",
  "rows": [
   ["Attacker", "攻擊方", "공격 측", "Angreifer", "attaquant", "atacante", "saldırgan", "penyerang", "нападающий", "ผู้โจมตี", "المهاجم", "Battlefield side. Not the same as the alliance role 'Attackers' in the guides."],
   ["Defender", "防守方", "방어 측", "Verteidiger", "défenseur", "defensor", "savunmacı", "—", "—", "ผู้ป้องกัน", "المدافع", "Battlefield side. Not the same as the alliance role 'Defenders' in the guides."],
   ["Occupier", "佔領方", "점령 측", "—", "—", "—", "—", "—", "—", "—", "—"],
   ["Mercenaries", "傭兵", "용병", "Söldner", "mercenaires", "—", "—", "tentara bayaran", "наемники", "ทหารรับจ้าง", "المرتزقة"],
   ["First King", "—", "—", "Erster König", "premier roi", "Primeiro Rei", "İlk Kral", "Raja Pertama", "первый король", "พระราชาองค์แรก", "الملك الأول"]
  ]
 },
 {
  "cat": "Game mechanics",
  "rows": [
   ["Rally", "集結", "집결", "Rally", "Ralliement", "Rally", "Seferberlik", "Reli", "Рейд", "ทีมระดมพล", "الحشد", "Confirmed from the rally button in the Bear Hunt screen."],
   ["Advanced Teleporter", "高級遷城", "고급 도시 이전", "Fortgeschrittene Umsiedlung", "Relocalisation Avancée", "Teletransportador Avançado", "Gelişmiş Işınlayıcı", "Teleporter Lanjutan", "Продвинутый телепорт", "การย้ายถิ่นฐานขั้นสูง", "ناقل متقدم", "The item in the Backpack."],
   ["Counter-recon", "反偵察", "정찰 방지", "Gegenaufklärung", "Anti-repérage", "Antirreconhecimento", "Gözetleme Önleyen", "Kontra-pengintaian", "Контрразведка", "หน่วยป้องกันพิเศษ", "الاستطلاع المضاد", "City Bonus screen. The Thai wording literally means 'special defense unit'."],
   ["Squad", "部隊", "부대", "Schwadron", "Escouade", "Esquadrão", "Ekip", "Skuad", "Войска", "ทีม", "الفرقة", "Troop group. Not confirmed for the battle-day 'Squad Chat' tab."],
   ["Shield", "防護罩", "보호막", "Schild", "Bouclier", "Escudo", "Kalkan", "Perisai", "Щит", "โล่", "درع"],
   ["Marching", "行軍", "행군", "Marschieren", "Marche", "—", "İntikal", "Barisan", "Марш", "เดินทัพ", "زحف"],
   ["Gathering", "採集", "채집", "Sammeln", "Collecte", "—", "Toplanıyor", "Mengumpulkan", "Сбор", "การเก็บทรัพยากร", "الجمع"],
   ["Control", "控制 / 佔領", "제어 / 점령", "Kontrolle", "Contrôle", "Controle", "Kontrol / hakimiyet / işgal", "Penguasaan / kendali", "контроль / захват", "การควบคุม / ยึดครอง", "التحكم / السيطرة"],
   ["Building control time", "佔領時長", "점령 시간", "—", "temps nécessaire pour contrôler", "tempo necessário para assumir o controle das construções", "binaları kontrol etme süresi", "waktu yang diperlukan untuk menguasai bangunan", "время захвата зданий", "เวลาที่ใช้ในการยึดครองสิ่งปลูกสร้าง", "الوقت المطلوب للسيطرة على المباني", "Seen inside sentences."],
   ["Defense failure", "防守失敗", "방어에 실패", "—", "défaite", "derrota", "—", "kalah", "поражение", "ตกเป็นฝ่ายแพ้", "الهزيمة", "Seen inside sentences."],
   ["Teleport / free teleports", "遷城 / 免費高級遷城", "—", "Teleports", "téléportations gratuites", "teletransportes gratuitos", "ışınlanma", "teleportasi gratis", "бесплатный телепорт", "การย้ายถิ่นฐานฟรี", "عمليات الانتقال المجانية"],
   ["Cooldown", "恢復時間", "—", "—", "intervalle (entre les téléportations)", "intervalo (entre teletransportes gratuitos)", "ışınlanmalar arasındaki süre", "interval (antara teleportasi gratis)", "время перезарядки", "คูลดาวน์", "الفاصل الزمني"],
   ["Total Troops", "總部隊", "총 부대", "Alle Trupps", "Total troupes", "—", "Birlik Sayısı", "Total Skuad", "Общий размер войск", "ทีมทั้งหมด", "إجمالي القوات"],
   ["March Queue", "行軍隊伍", "행군 대열", "Marschschlange", "File de Marche", "—", "İntikal Sırası", "Barisan Antrean", "Очередь марша", "คิวการเดินทัพ", "طابور القوات المتقدمة"],
   ["Injured", "傷兵", "부상병", "Verletzt", "Blessé(s)", "—", "Yaralılar", "Terluka", "Ранено", "ได้รับบาดเจ็บ", "مصاب"]
  ]
 },
 {
  "cat": "Stats",
  "rows": [
   ["Attack", "攻擊力", "공격력", "Angriff", "Attaque", "Ataque", "Saldırı", "Attack", "Атака", "พลังโจมตี", "هجوم"],
   ["Defense", "防禦力", "방어력", "Verteidigung", "Défense", "Defesa", "Savunma", "Defense", "Защита", "พลังป้องกัน", "دفاع"],
   ["Lethality", "殺傷力", "파괴력", "Tödlichkeit", "Létalité", "Letalidade", "Öldürücülük", "Lethality", "Смертоносность", "ความแรงพลัง", "قوة فتك"],
   ["Health", "生命值", "HP", "Gesundheit", "Santé", "Vida", "Sağlık", "Health", "Здоровье", "พลังชีวิต", "صحة"],
   ["Combat buffs", "戰鬥增益", "—", "—", "—", "—", "—", "—", "боевые усиления", "—", "—"],
   ["Escorts", "護衛數量", "호위병 수량", "Eskorten", "Escortes", "Escoltas", "Eşlikçiler", "Pengawal", "Конвои", "หน่วยคุ้มกัน", "المواكب"],
   ["Level", "等級", "레벨", "Level", "Niveau", "Nível", "Seviye", "Level", "Уровень", "เลเวล", "المستوى", "Portuguese label 'Nível'; abbreviated 'Nv.' in sentences (e.g. Nv. 16)."],
   ["Troops Capacity", "部隊容量", "부대 수용량", "Truppenkapazität", "Capacité de Troupes", "Capacidade de Tropa", "Birlik Kapasitesi", "Kapasitas Pasukan", "Вместимость войска", "ความจุทีม", "قدرة القوات"]
  ]
 },
 {
  "cat": "Troop types",
  "rows": [
   ["Infantry", "步兵", "보병", "Infanterie", "Infanterie", "—", "Piyade", "Infanteri", "пехотинец", "ทหารราบ", "المشاة"],
   ["Cavalry", "騎兵", "기병", "Kavallerie", "Cavalerie", "—", "Süvari", "Kavaleri", "кавалерист", "ทหารม้า", "الفرسان"],
   ["Archer", "弓兵", "궁병", "Bogenschütze", "Archer", "—", "Okçu", "Pemanah", "стрелок", "พลธนู", "الرماة"]
  ]
 },
 {
  "cat": "Heroes — SSR",
  "rows": [
   ["Saul", "薩洛", "살로", "Saul", "Saul", "Saul", "Saul", "Saul", "Соул", "ซอล", "شاول"],
   ["Helga", "赫爾加", "헬가", "Helga", "Helga", "Helga", "Helga", "Helga", "Хельга", "เฮลก้า", "هيلجا"],
   ["Zoe", "佐伊", "조이", "Zoe", "Zoé", "Zoe", "Zoe", "Zoe", "Зои", "โซอี้", "زوي"],
   ["Hilde", "希爾德", "힐데", "Hilde", "Hilde", "Hilde", "Hilde", "Hilde", "Хильда", "ฮิลเดอร์", "هيلدي"],
   ["Marlin", "馬林", "마린", "Marlin", "Marlin", "Peixe Marlin", "Marlin", "Marlin", "Марлин", "มาร์ลิน", "مارلين", "The Portuguese game text shows 'Peixe Marlin'."],
   ["Amadeus", "阿瑪迪斯", "아마데우스", "Amadeus", "Amadeus", "Amadeus", "Amadeus", "Amadeus", "Амадей", "อมาดีอุส", "أماديوس"],
   ["Jabel", "潔貝爾", "제이벨", "Jabel", "Jabel", "Jabel", "Jabel", "Jabel", "Явель", "จาเบล", "جبل"]
  ]
 },
 {
  "cat": "Heroes — SR",
  "rows": [
   ["Diana", "狄安娜", "다이애나", "Diana", "Diana", "Diana", "Diana", "Diana", "Диана", "ไดอาน่า", "ديانا"],
   ["Fahd", "法赫德", "파드", "Fahd", "Fahd", "Fahd", "Fahd", "Fahd", "Фад", "ฟาฮ์ด", "فهد"],
   ["Amane", "雨音", "아마네", "Amane", "Amane", "Amane", "Amane", "Amane", "Амане", "อามาเนะ", "أماني"],
   ["Gordon", "戈登", "고든", "Gordon", "Gordon", "Gordon", "Gordon", "Gordon", "Гордон", "กอร์ดอน", "جوردن"],
   ["Yeonwoo", "妍羽", "연우", "Yeonwoo", "Yeonwoo", "Yeonwoo", "Yeonwoo", "Yeonwoo", "Ёну", "ยอนอู", "يونوو"],
   ["Howard", "霍華德", "하워드", "Howard", "Howard", "Howard", "Howard", "Howard", "Говард", "ฮาวเวิร์ด", "هاورد"],
   ["Chenko", "琴科", "첸코", "Chenko", "Chenko", "Chenko", "Chenko", "Chenko", "Ченко", "เชนโกะ", "تشينكو"],
   ["Quinn", "奎恩", "퀸", "Quinn", "Quinn", "Quinn", "Quinn", "Quinn", "Куинн", "ควินน์", "كوين"]
  ]
 },
 {
  "cat": "Heroes — R",
  "rows": [
   ["Forrest", "福斯特", "포스터", "Forrest", "Forrest", "Forrest", "Forrest", "Forrest", "Форрест", "ฟอร์เรสต์", "فورست"],
   ["Seth", "史密斯", "스미스", "Seth", "Seth", "Seth", "Seth", "Seth", "Сет", "เซธ", "سيث"],
   ["Edwin", "艾德溫", "에드윈", "Edwin", "Edwin", "Edwin", "Edwin", "Edwin", "Эдвин", "เอ็ดวิน", "إدوين"],
   ["Olive", "奧麗芙", "올리브", "Olive", "Olive", "Olive", "Olive", "Olive", "Олив", "โอลีฟ", "أوليف"]
  ]
 },
 {
  "cat": "Bear Hunt",
  "rows": [
   ["Bear Hunt", "狩獵巨熊", "자이언트 베어 사냥", "Bärenjagd", "Chasse à l'Ours", "Caça ao Urso", "Ayı Avı", "Bear Hunt", "Охота на медведя", "ล่าหมี", "صيد الدببة", "Event name in the English game. The source guide's 'Bear Trap' is not a game term; treat it as Bear Hunt. Korean game text is 자이언트 베어 사냥 (the current Korean guide says 곰사냥). Indonesian game text keeps the English 'Bear Hunt'."],
   ["Trap 1 / Trap 2", "陷阱1 / 陷阱2", "함정 1 / 함정 2", "Falle 1 / Falle 2", "Piège 1 / Piège 2", "Armadilha 1 / Armadilha 2", "1. Tuzak / 2. Tuzak", "Perangkap 1 / Perangkap 2", "1-я ловушка / 2-я ловушка", "กับดัก 1 / กับดัก 2", "فخ 1 / فخ 2", "The two tabs inside Bear Hunt."],
   ["Raging Bear", "暴怒巨熊", "분노한 곰", "Wütender Bär", "Ours Enragé", "Urso Furioso", "Öfkeli Ayı", "Raging Bear", "свирепый медведь", "หมีคลั่ง", "الدب الهائج", "Shown in green brackets in the event text. German text shows the accusative 'Wütenden Bären'. French shows 'l'Ours Enragé' in the event text. Russian text shows the accusative 'свирепого медведя'. Turkish text shows 'Öfkeli Ayı'yı' (with the accusative suffix). Indonesian keeps English 'Raging Bear'."],
   ["Hunting Achievements", "狩獵成就", "사냥 업적", "Jagen-Erfolge", "Prouesses de Chasse", "Conquistas da Caçada", "Av Başarıları", "Pencapaian Berburu", "Достижения на охоте", "ความสำเร็จในการล่าสัตว์", "إنجازات الصيد"],
   ["Damage Rewards", "傷害獎勵", "피해량 보상", "Schadensbelohnungen", "Récompenses de Dégâts", "Recompensas de Dano", "Hasar Ödülleri", "Hadiah Kerusakan", "Награды за урон", "รางวัลความเสียหาย", "مكافآت الأضرار"],
   ["Trap Enhancement", "陷阱強化", "함정 강화", "Fallenverbesserung", "Amélioration de Piège", "Aprimoramento da Armadilha", "Tuzak Güçlendirmesi", "Peningkatan Perangkap", "Усиление ловушки", "การพัฒนากับดัก", "تحسين الفخ"],
   ["Pre-Registered Start", "預約自動開啟", "자동 시작 예약", "Vorangemeldeter Start", "Début de la Pré-inscription", "Início do pré-registrado", "Ön Kayıtlı Başlangıç", "Pra-Registrasi Dimulai Pada", "Заранее зарегистрированное начало", "เริ่มลงทะเบียนล่วงหน้า", "يبدأ التسجيل المسبق"],
   ["Go Enable", "前往開啟", "오픈하기", "Aktivieren starten", "Aller Activer", "Ir Habilitar", "Git Etkinleştir", "Pergi Aktifkan", "Пойти включить", "เปิดใช้งาน", "اذهب للتمكين", "Button text."],
   ["Total Alliance Damage", "盟友協力造成的總傷害", "연맹원과 함께 입힌 피해", "Allianzschaden", "Dégâts de l'Alliance Total", "Dano Total da Aliança", "Toplam İttifak Hasarı", "Total Damage Aliansi", "—", "ความเสียหายพันธมิตร", "الضرر الإجمالي للتحالف", "Chinese and Korean wording differ: seen inside a sentence. German: 'Allianzschaden' (one word). French sentence: 'Dégâts de l'Alliance Total'. Arabic sentence: 'الضرر الإجمالي للتحالف'. Russian Bear Hunt text is different and does not contain this phrase. Thai sentence: 'ความเสียหายพันธมิตร'. Indonesian sentence: 'Total Damage Aliansi'."]
  ]
 },
 {
  "cat": "Castle Battle",
  "rows": [
   ["Castle Battle", "決戰王城", "캐슬 전투", "Schlacht um das Schloss", "Bataille du Château", "Batalha do Castelo", "Şato Savaşı", "Pertempuran Istana", "Битва за замок", "การต่อสู้ชิงปราสาท", "معركة القلعة", "German rules text once misspells it as 'Schlacht um das Schoss'. Indonesian rules text says 'Pertempuran Kastil' while the tab and title say 'Pertempuran Istana'."],
   ["Background", "背景", "배경", "Hintergrund", "Contexte", "Segundo Plano", "Arka Plan", "Latar Belakang", "История", "พื้นหลัง", "الخلفية", "Second tab of the rules window (next to Rules). Russian tab is 'История' (History)."],
   ["King's Castle", "王城", "캐슬", "Königliches Schloss", "Château Royal", "Castelo da Realeza", "Kralın Şatosu", "Kastil Raja", "Королевский замок", "ปราสาทกษัตริย์", "قلعة الملك", "Seen inside sentences. Korean just says 캐슬 (Castle). German shows 'Königliche Schloss' / 'Königlichen Schlosses' in sentences. French rules text says 'Château Royal'; the event tab is 'Bataille du Château'. Turkish 'Kralın Şatosu' (genitive form; 'Kralın Şatosu'nu' in sentences). Indonesian: 'Kastil Raja' (tab uses 'Istana')."],
   ["Forbidden Area", "禁區", "금지 구역", "Verbotenes Gebiet", "Zone Interdite", "Área Proibida", "Yasaklı Bölge", "Area Terlarang", "запретная зона", "พื้นที่ต้องห้าม", "المنطقة المحظورة", "Seen inside sentences. German shows the genitive 'Verbotenen Gebiets'."],
   ["King", "國王", "국왕", "König", "Roi", "Rei", "Kral", "Raja", "король", "พระราชา", "ملك", "Seen inside sentences."],
   ["Alliance Leader", "盟主", "맹주", "Allianzanführer", "Leader d'Alliance", "Líder da Aliança", "İttifak Lideri", "Pemimpin Aliansi", "лидер альянса", "ผู้นำพันธมิตร", "زعيم التحالف", "Seen inside sentences. French: 'Leader d'Alliance' / 'leader de l'alliance'. Arabic uses both 'زعيم التحالف' and 'قائد التحالف' in the same rules text."],
   ["Turret", "砲台", "포탑", "Geschützturm", "tourelle", "torreão", "taret", "meriam", "орудийная башня", "ป้อมปืน", "البرج", "Seen inside sentences. Lowercase 'turret' in the game text. French: 'tourelle'. Turkish shows 'Tareti' / 'taretin' in sentences; base form 'taret'. Indonesian: 'meriam' (lowercase, in sentences)."],
   ["Town", "城鎮", "도시", "Stadt", "Ville", "Cidade", "Şehir", "Kota", "город", "เมือง", "مدينة", "Seen inside sentences. German plural 'Städte'. Arabic plural 'المدن'. Russian plural 'города'. Turkish plural 'Şehirler'."]
  ]
 },
 {
  "cat": "Sanctuary Battle",
  "rows": [
   ["Sanctuary Battle", "遺跡爭奪", "유적 쟁탈", "Heiligtumskampf", "Bataille du Sanctuaire", "Batalha do Santuário", "Tapınak Savaşı", "Pertempuran Tempat Perlindungan", "Битва за святилище", "การต่อสู้ชิงวิหาร", "معركة المأوى", "Event tab name. Indonesian text was cut off; 'Pertempuran Tempat Perlindungan' is reconstructed from two truncated screens ('Pertempuran T… Perlindung…' and 'Pertempuran Tempat…')."],
   ["Sanctuary / Sanctuaries", "遺跡", "유적", "Heiligtum / Heiligtümer", "Sanctuaire / Sanctuaires", "Santuário / Santuários", "Tapınak / Tapınaklar", "Sanctuary", "святилище / святилища", "วิหาร", "المأوى / المآوي", "Chinese uses 遺跡 and Korean uses 유적, NOT 聖所/성소 (Sanctum in Swordland Showdown). Portuguese uses 'Santuário' for both, so pt/fr/de cannot tell them apart. German uses 'Heiligtum' for both this and Sanctum. French uses 'Sanctuaire' for both this and Sanctum. Arabic also distinguishes them: المأوى (Sanctuary) vs مزار (Sanctum). Russian uses 'святилище' for both this and Sanctum. Turkish uses 'Tapınak' for both this and Sanctum. Thai: 'วิหาร' vs Sanctum 'วิหารศักดิ์สิทธิ์' (related but different). Indonesian keeps English 'Sanctuary' vs Sanctum 'Sanctum' (different)."],
   ["Season / Phase", "賽季 / 期", "시즌 / 회", "Saison / Phase", "Saison / Phase", "Temporada / Fase", "Sezon / Evre", "Season / Fase", "Сезон / Стадия", "ฤดูกาล / ช่วง", "الموسم / المرحلة", "Title format: 'Season 2 Phase 7/8' = 第2賽季 7/8期 = 제2시즌 7/8회. Arabic: 'الموسم 2 المرحلة 7/8'. Thai: 'ฤดูกาลที่ 2 ช่วงที่ 7/8'. Indonesian: 'Season 2 Fase 7/8'."],
   ["Defend Phase", "保護階段", "보호 단계", "Verteidigungsphase", "Phase de Défense", "Fase de Defesa", "Savunma Evresi", "Fase Bertahan", "Стадия обороны", "ช่วงการป้องกัน", "مرحلة الدفاع"],
   ["Pillar of Honor", "功勳碑", "공훈패", "Wand der Ehre", "Pilier de l'Honneur", "Pilar da Honra", "Onur Sütunu", "Pilar Kehormatan", "стела почета", "เสาหลักแห่งเกียรติยศ", "نصب الشرف التذكاري", "Seen inside sentences. German text says 'Wand der Ehre' (Wall of Honor)."],
   ["Event season has ended", "本期活動已結束", "이번 이벤트가 종료됐습니다", "Saison beendet", "Saison d'évèn. finie", "A temporada do evento terminou", "Etkinlik sezonu sona erdi", "Event Season telah berakhir", "Сезон событий завершен", "ฤดูกาลอีเวนต์ได้สิ้นสุดลงแล้ว!", "انتهى موسم الفعاليات", "French text is abbreviated: 'Saison d'évèn. finie'."]
  ]
 },
 {
  "cat": "Strongest Governor",
  "rows": [
   ["Strongest Governor", "至高領主", "지고의 영주", "Stärkster Gouverneur", "Haut Gouverneur", "O Governador mais Forte", "En Güçlü Vali", "Gubernur Terkuat", "Сильнейший губернатор", "เจ้าเมืองสุดแข็งแกร่ง", "الحاكم الأقوى"],
   ["Stage", "階段", "단계", "Stufe", "étape", "estágio", "aşama", "stage", "этап", "ด่าน", "مرحلة", "Seen inside sentences. Portuguese: 'estágio' (lowercase). German: 'Stufe' (plural 'Stufen'). French: 'étape' (lowercase). Arabic: 'مرحلة' (plural 'مراحل'). Russian: 'этап' (plural 'этапов'). The Sanctuary Battle screen says 'Стадия' instead. Turkish: 'aşama' (lowercase in sentences). The Sanctuary Battle screen says 'Evre'. Thai: 'ด่าน'. Indonesian keeps English 'stage'. Thai Sanctuary Battle screen says 'ช่วง'; Indonesian says 'Fase'."],
   ["Challenge Medal", "挑戰勳章", "도전 훈장", "Herausforderungsmedaille", "Médaille de Défi", "Medalha de Desafio", "Mücadele Madalyası", "Medali Tantangan", "медаль испытаний", "เหรียญท้าทาย", "ميدالية التحدي"],
   ["Challenge Medal Rewards", "挑戰勳章獎勵", "도전 훈장 보상", "Herausforderungsmedaillen-Belohnungen", "Récompenses de Médaille de Défi", "Recompensas de Medalhas de Desafio", "Mücadele Madalyası Ödülleri", "Hadiah Medali Tantangan", "награды медалей испытаний", "—", "مكافآت ميدالية التحدي", "Thai text only says 'เหรียญท้าทายพิเศษ' (special challenge medal); no standalone 'rewards' form seen."],
   ["Kingdom Personal Ranking Rewards", "王國個人排名獎勵", "왕국 개인 랭킹 보상", "Königreich-Ranglistenbelohnungen", "Récompenses de Classement Individuel d'étape et de Royaume", "Recompensas de Classificação Individual do Estágio e do Reino", "Aşama ve Krallık Kişisel Sıralama Ödülleri", "Hadiah Peringkat Pribadi Stage dan Kerajaan", "награды за личный рейтинг на этапе и в государстве", "รางวัลอันดับส่วนบุคคลสำหรับอาณาจักรและด่าน", "مكافآت الترتيب الشخصي والمملكة للمرحلة", "Seen inside sentences. The Portuguese sentence covers both Stage and Kingdom ('do Estágio e do Reino'). Korean: 왕국 개인 랭킹 보상. German sentence: 'persönliche Stufen- und Königreich-Ranglistenbelohnungen'. French sentence covers both Stage and Kingdom ('d'étape et de Royaume'). Arabic sentence covers both Stage and Kingdom ('الترتيب الشخصي والمملكة للمرحلة'). Russian sentence covers both Stage and Kingdom ('на этапе и в государстве'). Turkish sentence covers both Stage and Kingdom ('Aşama ve Krallık Kişisel Sıralama Ödülleri'). Thai and Indonesian sentences also cover both Stage and Kingdom."],
   ["Cross-Kingdom Personal Ranking", "跨王國個人總排名", "크로스 왕국 개인 종합 랭킹", "—", "—", "—", "Krallıklar Arası Kişisel Sıralama", "Peringkat Pribadi Antar-Kerajaan", "личный рейтинг между государствами", "อันดับส่วนบุคคลข้ามอาณาจักร", "الترتيب الشخصي على مستوى المملكة", "Seen inside sentences. Chinese 跨王國個人總排名, Korean 크로스 왕국 개인 종합 랭킹. Portuguese text was cut off in the screenshot. German text was cut off in the screenshot. French text was cut off in the screenshot. Arabic: 'الترتيب الشخصي على مستوى المملكة' (rule 5; wording may differ from the English). Russian text was cut off ('личный рейтинг между государствами и внутри…'). Turkish: 'Krallıklar Arası Kişisel Sıralama' (rule 5; full). Thai and Indonesian rule 5 are complete."],
   ["Participating Kingdoms", "參與王國", "참여 왕국", "Teilnehmende Königreiche", "Royaumes participants", "Reinos Participantes", "Katılan Krallıklar", "Kerajaan yang Berpartisipasi", "Королевства-участники", "อาณาจักรที่เข้าร่วม", "الممالك المشاركة"],
   ["Current Kingdom", "本王國", "현재 왕국", "Aktuelles Königreich", "Royaume actuel", "Reino Atual", "Mevcut Krallık", "Kerajaan Saat Ini", "Текущее государство", "อาณาจักรปัจจุบัน", "المملكة الحالية", "Russian uses 'королевства' on some screens and 'государство' on others."],
   ["Cross-Kingdom", "跨王國", "크로스 왕국", "Königreichsübergreifend", "Inter-Royaumes", "Entre-Reinos", "Krallıklar Arası", "Antar Kerajaan", "Среди государств", "ข้ามอาณาจักร", "على مستوى المملكة"],
   ["Coming soon", "即將來臨", "곧 오픈합니다", "Kommt bald", "Bientôt dispo", "Em breve", "Çok yakında", "Segera", "Уже скоро", "มาในเร็วๆ นี้", "قريبًا"],
   ["Rewards (preview bar)", "獎勵預覽", "보상 미리보기", "Belohnungen", "Récompenses", "Recompensas", "Ödüller", "Hadiah", "Предпросмотр наград", "รางวัล", "المكافآت", "Bar on the Strongest Governor screen. English shows only 'Rewards'."]
  ]
 },
 {
  "cat": "Cesares Fury",
  "rows": [
   ["Cesares Fury", "征討切薩雷", "체사레 정벌", "Cesares Zorn", "Fureur des Césarès", "Fúria dos Césares", "Cesares Öfkesi", "Cesares Fury", "Ярость цесарцев", "โทสะของซีซาเรส", "غضب سيزاريس", "Indonesian keeps English 'Cesares Fury'."],
   ["Highlord Cesares", "統帥切薩雷", "체사레 사령관", "Hochlord Cesares", "Haut Seigneur Césarès", "Césares da Alta Nobreza", "Cesares Başkomutanı", "Highlord Cesares", "Полководец цесарцев", "จอมทัพซีซาเรส", "أمير سيزاريس"],
   ["Cesares Legionnaire", "切薩雷精銳", "체사레 정예군", "Cesares Legionär", "Légionnaire Césarès", "Césares Legionários", "Cesares Lejyoneri", "Legioner Cesares", "Цесарец-легионер", "กองทัพซีซาเรส", "جندي فيلق سيزاريس"],
   ["Private", "個人", "개인", "Persönlich", "Privé", "Individual", "Kişisel", "Pribadi", "Личн.", "ส่วนตัว", "شخصي", "Tab. Opposite tab is 'Alliance'. Portuguese 'Individual'. Korean 개인. Russian tab is abbreviated 'Личн.'."],
   ["Alliance", "聯盟", "연맹", "Allianz", "Alliance", "Aliança", "İttifak", "Aliansi", "Альянс", "พันธมิตร", "التحالف", "Tab. Opposite tab is 'Private'. Chinese 聯盟, Korean 연맹."],
   ["Challenged", "已挑戰", "도전 완료", "Herausgefordert", "Défié", "Desafiado", "Mücadele edildi", "Ditantang", "Вызов брошен", "ท้าทายแล้ว", "تم التحدي"],
   ["Captain", "頭目", "보스", "Kapitän", "Capitaine", "Capitão", "Önder", "Kapten", "капитан", "กัปตัน", "الكابتن", "Seen inside sentences. Chinese 頭目 ('defeating the Captain'). Korean says 보스 (boss). French: 'le Capitaine vaincu'. Turkish says 'Önder' (Leader) in the event text. Thai: 'กัปตัน'. Indonesian: 'Kapten'."],
   ["Scout", "偵察", "정찰", "Spähen", "Espionner", "Espionar", "Gözetle", "Intai", "Разведать", "สอดแนม", "جاسوس", "Button."],
   ["Recommended Power", "推薦實力", "추천 전투력", "Empfohlene Kraft", "Puissance Recommandée", "Poder Recomendado", "Önerilen Güç", "Kekuatan yang Disarankan", "Рекомендуемая сила", "ค่าพลังแนะนำ", "القوة الموصى بها"],
   ["Show event shortcut", "顯示活動快捷入口", "이벤트 바로가기 표시", "Event-Verknüpfung anzeigen", "Afficher le raccourci de l'évènement", "Exibir atalho para o evento", "Etkinlik kısayolunu göster", "Tampilkan pintasan acara", "Показать быстрый доступ к событию", "แสดงปุ่มลัดอีเวนต์", "عرض اختصار الفعالية"]
  ]
 },
 {
  "cat": "Alliance Championship",
  "rows": [
   ["Alliance Championship", "聯盟爭霸賽", "연맹 챔피언십", "Allianzmeisterschaft", "Championnat de l'Alliance", "Campeonato da Aliança", "İttifak Şampiyonası", "Kejuaraan Aliansi", "Чемпионат альянса", "การแข่งขันชิงแชมป์พันธมิตร", "بطولة التحالف", "German sentence text says 'Allianz Champions' once."],
   ["Silver IV", "白銀IV", "실버IV", "Silber IV", "Argent IV", "Prata IV", "Gümüş IV", "Silver IV", "Серебро IV", "เงิน IV", "فضي IV", "Tier name. Existing rows have 'Tier C' and 'Gold'."],
   ["The Alliance Championship has ended!", "爭霸賽已落幕", "챔피언십이 종료되었습니다", "Die Allianzmeisterschaft ist beendet!", "Le Championnat de l'Alliance est terminé !", "O Campeonato da Aliança terminou!", "İttifak Şampiyonası sona erdi!", "Kejuaraan Aliansi telah berakhir!", "Чемпионат альянса завершился!", "การแข่งขันชิงแชมป์พันธมิตรจบลงแล้ว!", "انتهت بطولة التحالف!"]
  ]
 }
];
