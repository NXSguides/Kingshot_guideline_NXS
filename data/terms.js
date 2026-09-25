/* Game terms — official in-game wording, taken from screenshots of the game in each language.
   Each row: [en, zh, ko, de, fr, pt, tr, id, ru, th, ar, es, optional note]. "—" = not seen yet. */
const TERM_LANGS = ["en", "zh", "ko", "de", "fr", "pt", "tr", "id", "ru", "th", "ar", "es"];
const TERMS = [
 {
  "cat": "Speedup Queue Types",
  "rows": [
   ["Construction","建造","건설","Bau","Construction","Construção","İnşaat","Konstruksi","Строительство","การสร้าง","البناء","Construcción","The queue name used in 'Construction Speedup'. ES: Backpack tooltip 'Acelerador de Construcción de 1 h'."],
   ["Training","訓練","훈련","Training","Entraînement","Treinamento","Eğitim","Pelatihan","Тренировки","การฝึก","التدريب","Entrenamiento","The queue name used in 'Training Speedup'. NOT 'Troop' — that was an incorrect guess used earlier in the site's checklist; the game's own term for this queue is Training. ES: 'Acelerador de Entrenamiento de 1 h'."],
   ["Research","研究","연구","Forschung","Recherche","Pesquisa","Araştırma","Penelitian","Исследование","การวิจัย","البحث","Investigación","The queue name used in 'Research Speedup'. ES: 'Acelerador de Investigación de 1 h'."],
   ["Healing","治療","치료","Heilung","Soins","Cura","Tedavi","Penyembuhan","лечение","การรักษา","الشفاء","Curación","The queue name used in 'Healing Speedup' items in the Backpack's Speedups tab. ES: 'Acelerador de Curación de 1 h'."]
  ]
 },
 {
  "cat": "Golden Glaives",
  "rows": [
   ["Golden Glaives","黃金與巨刃","황금과 검","Goldene Klingen","Glaives Dorés","Glaives Douradas","Altın Kılıçlar","Tombak Emas","Золотые копья","จอมโจรดาบทองคำ","الرماح الذهبية","—"],
   ["Dim Goldstone","黯淡金石","탁한 금 원석","Matter Goldstein","Pépite Terne","Pedra Dourada Obscura","Mat Altıntaşı","Goldstone Redup","Тусклый авантюрин","หินทองหม่น","حجر الذهب الباهت","—","German text once says 'matter Diamant' (game inconsistency); main value is Goldstein."],
   ["Watchtower Intel","瞭望塔的情報","전망대 정보","Wachturm-Geheimdienst","renseignement de l'observatoire","informações da Torre de Vigia","Bekçi Kulesi Bilgisi","Intel Menara Pengawas","данные разведки на дозорной вышке","ข่าวกรองหอคอยเฝ้าระวัง","معلومات برج المراقبة","—","Seen inside sentences, not as a standalone label."],
   ["Royal Foundry","皇家工坊","황실 공방","Kaiserliche Gießerei","Fonderie Royale","Forja da Realeza","Kraliyet Dökümhanesi","Pabrik Kerajaan","королевская литейная","โรงหล่อราชวงศ์","المسبك الملكي","—"],
   ["Redeem","兌換","교환","Einlösen","Échanger","Resgatar","Kullan","Tukar","Обменять","แลก","استبدال","—","Turkish uses the same word as 'Use'."],
   ["Left","剩餘","잔여","Übrig","En stock","Restante","Kalan","Tersisa","Осталось","คงเหลือ","متبقي","—"],
   ["Owned","持有數量","보유 수량","Im Besitz","Tu possèdes","Obtido","Stok","Dimiliki","Имеется","มีอยู่","مملوك","—"],
   ["Go","前往瞭望塔","이동","Los","Aller","Ir","Git","Pergi","Вперед","ไป","انطلق","—","Chinese label is the longer '前往瞭望塔'."],
   ["Tip","兌換提醒","교환 알림","Tipp","Conseil","Dica","Hatırlatıcı","Tip","Подсказка","แนะนำ","نصيحة","—","Label on the Golden Glaives banner."],
   ["Bread (Secured)","麵包（安全）","빵 (안전)","Brot (Geschützt)","Pains (sécurisés)","Pão (Protegido)","Ekmek (Korumalı)","Roti (Aman)","хлеба (под защитой)","ขนมปัง (ปลอดภัย)","خبز (مضمون)","—","Russian seen in genitive inside a sentence; base form is хлеб."],
  ]
 },
 {
  "cat": "Events",
  "rows": [
   ["Calendar","日曆","일정","—","—","Calendário","Takvim","Kalender","Календарь","ปฏิทิน","—","—"],
   ["Hero Roulette","英雄轉盤","영웅 룰렛","Helden Roulette","—","Roleta de Herói","Kahraman Ruleti","Rolet Hero","Геройская рулетка","รูเล็ตฮีโร่","روليت البطل","—"],
   ["Officer Project","—","—","Offiziersprojekt","Projet d'Officier","—","—","—","—","—","مسؤول المشروع","—"],
   ["Swordland Showdown", "聖劍爭奪", "성검 쟁탈", "Schwertland-Showdown", "Choc du Glaive", "Confronto entre Espadas", "Kılıçdiyarı Hesaplaşması", "Swordland Showdown", "Битва за Страну мечей", "ศึกดวลดินแดนดาบ", "مواجهة أرض السيوف", "—"],
   ["Swordland", "聖劍戰場", "성검 전장", "Schwertland", "Terres du Glaive", "Terra das Espadas", "Kılıçdiyarı", "Swordland", "Страна мечей", "ดินแดนดาบ", "أرض السيوف", "—", "Portuguese shows both 'Terra das Espadas' and 'Terra da Espada' in the game."],
   ["Battlefield", "聖劍戰場", "성검 전장", "Schlachtfeld", "champ de bataille", "campo de batalha", "savaş alanı", "medan perang", "поле боя", "สนามรบ", "ساحة المعركة", "—", "Seen inside sentences, not as a standalone label."],
   ["Tier C", "評等：C", "등급: C", "Stufe: C", "Palier : C", "Categoria: C", "Kademe: C", "Tingkat: C", "Ступень: C", "ระดับ: C", "المستوى: C", "—"],
   ["Gold", "黃金", "골드", "Gold", "Or", "Ouro", "Altın", "Gold", "Золото", "ทอง", "الذهبي", "—"],
   ["Legion 1 / 2", "軍團1 / 軍團2", "군단 1 / 2", "Legion 1 / 2", "Légion 1 / Légion 2", "Legião 1 / Legião 2", "1. Lejyon / 2. Lejyon", "Legiun 1 / Legiun 2", "Легион 1 / Легион 2", "กองทัพ 1 / กองทัพ 2", "الكتيبة 1 / الكتيبة 2", "—"],
   ["Battle Starts In", "戰鬥開始倒數計時", "전투 시작까지", "Schlacht beginnt in", "Début du Combat dans", "A batalha inicia em", "Savaş Başlangıcı", "Pertempuran Dimulai", "Битва начнётся через", "การต่อสู้จะเริ่มในอีก", "ستبدأ المعركة بعد", "—"],
   ["VS", "VS", "VS", "VS", "VS", "VS", "VS", "VS", "VS", "VS", "VS", "—"],
   ["Combatants", "參戰人員", "참전 인원", "Kämpfer", "Combattants", "Combatentes", "Savaşçılar", "Petarung", "Участники битвы", "ผู้ต่อสู้", "المقاتلين", "—"],
   ["Substitutes", "替補名單", "후보", "Ersatzspieler", "remplaçants", "substitutos", "yedekler", "pengganti", "запасные", "ตัวสำรอง", "البدلاء", "—", "Seen inside sentences, not as a standalone label."],
   ["Alliance Brawl", "聯盟對決", "연맹 결투", "Allianz-Gemenge", "Rif d'Alliances", "Briga da Aliança", "İttifak Kavgası", "Brawl Aliansi", "Потасовка альянсов", "ศึกพันธมิตร", "عراك التحالفات", "—", "Event tab name."],
   ["Merchant Empire", "貿易復興", "무역 부흥", "Händlerimperium", "Empire Marchand", "Império Mercante", "Tüccar İmparatorluğu", "Kekaisaran Pedagang", "Торговая империя", "จักรวรรดิการค้า", "إمبراطورية التجارة", "—", "Event tab name."],
   ["UTC Time", "UTC時間", "UTC", "UTC Zeit", "Heure UTC", "Hora UTC", "UTC Saati", "Waktu UTC", "Время UTC", "เวลา UTC", "التوقيت العالمي", "—", "Events screen header."],
   ["Starts in", "距離開始", "시작까지", "Beginnt in", "Commence dans", "Começa em", "Başlama", "Dimulai dalam", "Начнется через", "เริ่มใน", "يبدأ بعد", "El evento comienza en", "Event pop-up countdown. ES: Strongest Governor stage pop-up."],
   ["All Out", "全軍出擊", "전군 출격", "Aufs Ganze", "Tous dehors", "Vai com Tudo", "Topyekün", "Serangan Penuh", "Полный вперед", "ลุยเลย", "جميع القوات تهاجم", "A la batalla", "Event tab (helmet icon). Tagline: 'Fight for resources to survive!'. Screen uses Honor Ranking / My Ranking / My Points / Target Points. ES tagline: '¡Lucha por recursos para sobrevivir!'."]
  ]
 },
 {
  "cat": "Interface",
  "rows": [
   ["Details","詳細資訊","상세","Details","Détails","Detalhes","Detaylar","Detail","Детали","รายละเอียด","التفاصيل","Detalles"],
   ["Conquest","討伐","토벌","Eroberung","Conquête","Conquista","Fetih","Penaklukan","Завоевание","การพิชิต","غزو","Conquista"],
   ["Heroes","英雄","영웅","Helden","Héros","Heróis","Kahramanlar","Pahlawan","Герои","ฮีโร่","الأبطال","Héroes"],
   ["Shop","商店","상점","Laden","Magasin","Loja","Mağaza","Toko","Магазин","ร้านค้า","متجر","Tienda"],
   ["Alliance (tab)","聯盟","연맹","Allianz","Alliance","Aliança","İttifak","Aliansi","Альянс","พันธมิตร","التحالف","Alianza"],
   ["World","野外","야외","Welt","Monde","Mundo","Dünya","Dunia","Мир","โลก","العالم","Mundo"],
   ["Deals","超值活動","초특가","Angebote","Offres","Ofertas","Teklifler","Deals","—","อีเวนต์สุดคุ้ม","العروض","—"],
   ["Rules (dialog title)","規則說明","규칙 설명","Regeln","Règles","Regras","Kurallar","Aturan","Свод правил","กติกา","القواعد","—","Chinese, Korean and Russian dialog titles differ from the 'Rules' tab label."],
   ["Events", "常規活動", "이벤트", "Events", "Évènements", "Eventos", "Etkinlikler", "Event", "События", "อีเวนต์", "الفعاليات", "Evento", "ES: city-screen icon label and the Events screen title."],
   ["Guide", "指南", "가이드", "Leitfaden", "Guide", "Guia", "Kılavuz", "Panduan", "Руководство", "คำแนะนำ", "الدليل", "—"],
   ["Rules", "規則", "규칙", "Regeln", "Règles", "Regras", "Kurallar", "Aturan", "Правила", "กติกา", "القواعد", "Reglas", "The window title differs in some languages (e.g. 規則說明, 규칙 설명, Свод правил)."],
   ["Buildings", "建築介紹", "건물 소개", "Gebäude", "Bâtiments", "Construções", "Binalar", "Bangunan", "О зданиях", "สิ่งปลูกสร้าง", "المباني", "—"],
   ["Rewards", "獎勵", "보상", "Belohnungen", "Récompenses", "Recompensas", "Ödüller", "Hadiah", "Награды", "รางวัล", "المكافآت", "—"],
   ["Other", "其他", "기타", "Andere", "Autre", "Outros", "Diğer", "Lainnya", "Другое", "อื่นๆ", "أخرى", "Otros", "ES: Backpack tab."],
   ["First Control", "首次控制", "첫 점령", "Erste Eroberung", "Premier Contrôle", "Primeiro Controle", "İlk Kontrol", "Penguasaan Pertama", "Захват (1)", "การควบคุมครั้งแรก", "التحكم الأول", "—"],
   ["Ongoing Occupation", "持續佔領", "지속 점령", "Fortwährende Besatzung", "Occupation en Cours", "Ocupação Contínua", "Süren İşgal", "Pendudukan Berlangsung", "Длит. удерж.", "การยึดครองที่ยังคงดำเนินอยู่", "الاحتلال المستمر", "—"],
   ["Bonus Effect", "額外效果", "추가 효과", "Bonuseffekte", "Effet Bonus", "Efeito Bônus", "Bonus Etki", "Efek Bonus", "Бонусный эффект", "เอฟเฟกต์โบนัส", "تأثير المكافأة", "—"],
   ["/m (per minute)", "/分鐘", "/분", "/M", "/m", "/m", "/dk", "/m", "/мин.", "/น.", "/د", "—"],
   ["Recruit", "招募", "모집", "Rekrutieren", "Recruter", "Recrutar", "Görevlendir", "Rekrut", "Нанять", "เกณฑ์", "تجنيد", "Reclutar héroe", "ES: Heroes list button; the button text includes 'héroe'."],
   ["Stats", "屬性", "속성", "Werte", "Stats", "Atributos", "Nitelikler", "Stats", "Показатели", "ค่าสถานะ", "السمات", "Atributos", "ES: hero page tab."],
   ["Skills", "技能", "스킬", "Fertigkeiten", "Compétences", "Habilidades", "Yetenekler", "Skill", "Навыки", "ทักษะ", "المهارات", "Habilidades", "ES: hero page tab."],
   ["Gear", "裝備", "장비", "Ausrüstung", "Équipement", "Equipamento", "Donanım", "Gear", "Снаряж.", "อุปกรณ์", "العتاد", "Equipo", "Portuguese hero page tab: 'Equipamento'. The Backpack tab shows the short form 'Equip'. ES: hero page tab and Backpack tab."],
   ["Upgrade", "提升等級", "업그레이드", "Aufwerten", "Améliorer", "Aprimorar", "Yükselt", "Tingkatkan", "Улучшить", "อัปเกรด", "ترقية", "Mejorar", "ES: same word as the Governor Gear 'Enhance' button."],
   ["Troops Preview", "部隊總覽", "부대 보기", "Schwadronvorschau", "Aperçu des Troupes", "Prévia das Tropas", "Birlik Önizlemesi", "Pratinjau Skuad", "Предпросмотр войск", "ตัวอย่างทีม", "معاينة القوات", "Vista previa de tropas"],
   ["All", "全部", "전부", "Alle", "Tout", "Todos", "Tümü", "Semua", "Все", "ทั้งหมด", "الكل", "Todo"],
   ["In Town", "內城", "내성", "Stadt", "Centre-Ville", "Centro da Cidade", "Şehrin İçi", "Dalam Kota", "Внутренний город", "ค่ายชั้นใน", "داخل المدينة", "Interior de la Colonia"],
   ["Out of Town", "外城", "외성", "Wildnis", "Périphérie", "Cidade Exterior", "Şehrin Çevresi", "Luar Kota", "Внешний город", "ค่ายชั้นนอก", "خارج المدينة", "Exterior de la Colonia"],
   ["Formations", "部隊編組", "부대 편성", "Trupp Formationen", "Formations de troupe", "Formações das Tropas", "Birlik Dizilişleri", "Formasi Pasukan", "Войско", "รูปแบบการจัดวางทหาร", "القوات", "Formaciones de tropas", "Russian shows 'Войско' on this button too, the same word as Squad's Alliance Banner wording."],
   ["Backpack", "背包", "가방", "Rucksack", "Sac", "Mochila", "Çanta", "Ransel", "Рюкзак", "กระเป๋า", "حقيبة الظهر", "Mochila"],
   ["Resources", "資源", "자원", "Ressourcen", "Ressource", "Recursos", "Kaynaklar", "Sumber Daya", "Ресурсы", "ทรัพยากร", "الموارد", "Recursos", "Backpack tab."],
   ["Speedups", "加速", "가속", "Beschleunigungen", "Accélér.", "Velocidade", "Hızlandırma", "Speedup", "Ускор.", "เร่งสปีด", "عناصر التسريع", "Acelerar", "Backpack tab. ES: Backpack tab uses the verb 'Acelerar'."],
   ["Bonuses", "增益", "버프", "Ertrag", "Revenu", "Lucro", "Gelir", "Pemasukan", "Доход", "รายได้", "الدخل", "Ingresos", "Backpack tab (the 3rd one). Not the same as 'Bonus Effect'. ES: Backpack 3rd tab reads 'Ingresos' (lit. 'income')."],
   ["Use", "使用", "사용", "Verwenden", "Utiliser", "Usar", "Kullan", "Gunakan", "Применить", "ใช้", "استخدم", "Usar", "Backpack item button. Chinese shows '前往使用' (go and use) for some items."],
   ["Recall", "召回", "소환", "Zurückrufen", "Rappeler", "Revogar", "Geri Çağır", "Panggil Kembali", "Отозвать", "เรียกกลับ", "استدعاء", "Retirar", "Dialog title."],
   ["Recall squad?", "你確定要召回部隊嗎？", "정말 부대를 소환하겠습니까?", "Schwadron zurückrufen?", "Rappeler les Escouades ?", "Chamar o esquadrão?", "Ekip geri çağrılsın mı?", "Panggil Kembali Skuad?", "Отозвать отряд?", "เรียกทีมกลับหรือไม่?", "هل تريد استدعاء الفرقة؟", "¿Retirar escuadrón?", "Recall dialog text."],
   ["Cancel", "取消", "취소", "Abbrechen", "Annuler", "Cancelar", "İptal", "Batal", "Отмена", "ยกเลิก", "إلغاء", "Cancelar", "Recall dialog button."],
   ["Confirm", "確定", "확인", "Bestätigen", "Confirmer", "Confirmar", "Onayla", "Konfirmasi", "Подтвердить", "ยืนยัน", "تأكيد", "Confirmar", "Recall dialog button."],
   ["Settings", "設定", "설정", "Einstellungen", "Paramètres", "Configurações", "Ayarlar", "Pengaturan", "настройки", "การตั้งค่า", "الإعدادات", "Ajustes", "Seen inside sentences (Viking Vengeance rules). The English screenshot was cut off before this line, so the English word is a guess. ES: Governor Profile button."],
   ["City Bonus", "城鎮增益", "도시 버프", "Stadts Bonus", "Revenu de la Ville", "Bônus da Cidade", "Şehir Bonusu", "Bonus Kota", "Бонус города", "โบนัสค่ายอพยพ", "مكافأة المدينة", "Bonificaciones de la Colonia"]
  ]
 },
 {
  "cat": "Resources",
  "rows": [
   ["Relic Points", "聖契積分", "성스러운 계약 포인트", "Reliktpunkte", "Points de Relique", "Pontos de Relíquia", "Yadigâr Puanı", "Poin Relik", "Очки реликвий", "คะแนนวัตถุโบราณ", "نقاط الآثار", "—"],
   ["Alliance Relic Points", "聯盟聖契積分", "연맹 성스러운 계약 포인트", "Allianz-Reliktpunkte", "Points de Relique d'Alliance", "Pontos de Relíquia da Aliança", "İttifak Yadigâr Puanı", "Poin Relik Aliansi", "Очки реликвий альянса", "คะแนนวัตถุโบราณพันธมิตร", "نقاط الآثار للتحالف", "—"],
   ["Personal Relic Points", "個人聖契積分", "개인 성스러운 계약 포인트", "Persönliche Reliktpunkte", "Points de Relique Individuels", "Pontos de Relíquia Individuais", "Kişisel Yadigâr Puanı", "Poin Relik Pribadi", "Личные очки реликвий", "คะแนนวัตถุโบราณส่วนบุคคล", "نقاط الآثار الشخصية", "—"],
   ["Defender's Relic Points", "防守聖契積分", "방어 측 성스러운 계약 포인트", "Reliktpunkte der Verteidigung", "Points de Relique du défenseur", "Pontos de Relíquia de Defesa", "Savunmacı Yadigâr Puanı", "Poin Relik Pertahanan", "очки реликвий защиты", "คะแนนวัตถุโบราณของผู้ป้องกัน", "نقاط الآثار الدفاعي", "—", "Derived from an explanatory sentence; not a full standalone label in the game."],
   ["Arsenal Supplies", "輜重", "군수 물자", "Frachtzugvorräte", "Provisions de Train de bagages", "Suprimentos de Trem de Bagagem", "Bagaj Treni Malzemeleri", "Suplai Kereta Bagasi", "военные запасы", "เสบียงขบวนสัมภาระ", "إمدادات أمتعة القطار", "—", "The points scattered when a building changes hands."]
  ]
 },
 {
  "cat": "Buildings",
  "rows": [
   ["Guard Station","防衛所","방위소","Wachposten","Poste de Garde","Estação de Guarda","Muhafız İstasyonu","Pos Penjaga","Крепостная стена","สถานีคุ้มกัน","محطة الحراسة","Estación de Guardia","Russian shows 'Крепостная стена' (fortress wall). The building whose buttons are Details / Upgrade / City Defense."],
   ["City Defense","城鎮防禦","도시 방어","Stadtverteidigung","Défense de la Ville","Defesa da Cidade","Şehir Savunması","Pertahanan Kota","Защита города","การป้องกันของค่ายอพยพ","الدفاع عن المدينة","Defensa de la Colonia","Button on the Guard Station."],
   ["Swordshrine", "聖劍祭壇", "성검 제단", "Schwertschrein", "Tombeau du Glaive", "Templo da Espada", "Kılıç Altarı", "Swordshrine", "Святилище меча", "วิหารดาบ", "ضريح السيوف", "—"],
   ["Sanctum", "聖所", "성소", "Heiligtum", "Sanctuaire", "Santuário", "Tapınak", "Sanctum", "святилище", "วิหารศักดิ์สิทธิ์", "مزار", "—"],
   ["Northwest Sanctum", "西北聖所", "북서 성소", "Nordwestliches Heiligtum", "Sanctuaire Nord-Ouest", "Santuário do Noroeste", "Kuzeybatı Tapınağı", "Sanctum Barat Laut", "Северо-западное святилище", "วิหารศักดิ์สิทธิ์ตะวันตกเฉียงเหนือ", "مزار الشمالي الغربي", "—"],
   ["Southeast Sanctum", "東南聖所", "남동 성소", "Südwestliches Heiligtum", "Sanctuaire Sud-Est", "Santuário do Sudeste", "Güneydoğu Tapınağı", "Sanctum Tenggara", "Юго-восточное святилище", "วิหารศักดิ์สิทธิ์ตะวันออกเฉียงใต้", "مزار الجنوبي الشرقي", "—", "The German game text says 'Südwestliches' (southwest) — a mistake in the game's own translation."],
   ["Abbey (1–4)", "修道院 (一~四號)", "수도원 (제1~제4)", "Abtei (1–4)", "Abbaye (1–4)", "Abadia (1–4)", "Manastır (1–4)", "Biara (1–4)", "Монастырь (1–4)", "อาราม (1–4)", "دير (1–4)", "—"],
   ["Hall of Reformation", "教化大廳", "교화의 홀", "Reformationshalle", "Salle des Réformes", "Salão da Reforma", "Devrim Salonu", "Aula Reformasi", "Зал искупления", "หอปฏิรูป", "قاعة الإصلاح", "—"],
   ["Belltower", "鐘塔", "시계탑", "Glockenturm", "Clocher", "Torre do Sino", "Çan Kulesi", "Menara Lonceng", "Колокольня", "หอระฆัง", "برج الجرس", "—"],
   ["Royal Stables", "馬廄", "마구간", "Königliche Ställe", "Écuries Royales", "Estábulos da Realeza", "Kraliyet Ahırları", "Kandang Kuda Kerajaan", "Королевский конный двор", "คอกม้าหลวง", "الاسطبلات الملكية", "—"],
   ["Mercenary Camp", "傭兵駐地", "용병 주둔지", "Söldnerlager", "Camp de Mercenaires", "Acampamento Mercenário", "Paralı Asker Kampı", "Kamp Tentara Bayaran", "Лагерь наемников", "ค่ายทหารรับจ้าง", "معسكر المرتزقة", "—"],
   ["Undercellar", "隱蔽地窖", "땅굴", "Untergewölbe", "Caves", "Porões", "Gizli Mahzenler", "Undercellar", "подземелья", "ห้องใต้ดินลับ", "الأقبية السفلية", "—", "Seen in sentences, usually plural."],
   ["Drill Camp", "特訓營地", "특훈 병영", "Drillcamp", "Camp d'Entraînement", "Acampamento de Treinamento", "Tatbikat Kampı", "Pelatihan Bor", "учебный лагерь", "ค่ายฝึก", "معسكر التدريبات", "Campamento de entrenamiento", "ES: Heroes list button."],
   ["Town Center", "城鎮中心", "도시 센터", "Stadtzentrum", "Centre", "Centro da Cidade", "Şehir Merkezi", "Pusat Kota", "центр города", "ศูนย์กลางเมือง", "مركز البلدة", "Centro Urbano", "Wording varies by screen: French 'Centre' (Viking rules) vs 'Centre-Ville' (Forgehammer text); Portuguese 'Centro' (abbreviated, Forgehammer) vs 'Nível do Centro da Cidade' (Viking rules); Indonesian 'Pusat Kota' (Forgehammer) but 'Level Tungku' in the Viking Vengeance rules (Tungku = furnace). ES: from the Forgehammer tooltip ('Centro Urbano Nv. 20')."]
  ]
 },
 {
  "cat": "Battle roles",
  "rows": [
   ["Attacker", "攻擊方", "공격 측", "Angreifer", "attaquant", "atacante", "saldırgan", "penyerang", "нападающий", "ผู้โจมตี", "المهاجم", "—", "Battlefield side. Not the same as the alliance role 'Attackers' in the guides."],
   ["Defender", "防守方", "방어 측", "Verteidiger", "défenseur", "defensor", "savunmacı", "—", "—", "ผู้ป้องกัน", "المدافع", "—", "Battlefield side. Not the same as the alliance role 'Defenders' in the guides."],
   ["Occupier", "佔領方", "점령 측", "—", "—", "—", "—", "—", "—", "—", "—", "—"],
   ["Mercenaries", "傭兵", "용병", "Söldner", "mercenaires", "—", "—", "tentara bayaran", "наемники", "ทหารรับจ้าง", "المرتزقة", "—"],
   ["First King", "—", "—", "Erster König", "premier roi", "Primeiro Rei", "İlk Kral", "Raja Pertama", "первый король", "พระราชาองค์แรก", "الملك الأول", "—"]
  ]
 },
 {
  "cat": "Game mechanics",
  "rows": [
   ["Rally", "集結", "집결", "Rally", "Ralliement", "Rally", "Seferberlik", "Reli", "Рейд", "ทีมระดมพล", "الحشد", "Ataque Conjunto", "Confirmed from the rally button in the Bear Hunt screen. ES: Terror pop-up button."],
   ["Advanced Teleporter", "高級遷城", "고급 도시 이전", "Fortgeschrittene Umsiedlung", "Relocalisation Avancée", "Teletransportador Avançado", "Gelişmiş Işınlayıcı", "Teleporter Lanjutan", "Продвинутый телепорт", "การย้ายถิ่นฐานขั้นสูง", "ناقل متقدم", "Reubicación avanzada", "The item in the Backpack."],
   ["Counter-recon", "反偵察", "정찰 방지", "Gegenaufklärung", "Anti-repérage", "Antirreconhecimento", "Gözetleme Önleyen", "Kontra-pengintaian", "Контрразведка", "หน่วยป้องกันพิเศษ", "الاستطلاع المضاد", "Antirreconocimiento", "City Bonus screen. The Thai wording literally means 'special defense unit'."],
   ["Squad", "部隊", "부대", "Schwadron", "Escouade", "Esquadrão", "Ekip", "Skuad", "Войска", "ทีม", "الفرقة", "Escuadrón", "Troop group. Not confirmed for the battle-day 'Squad Chat' tab. Wording varies by screen: Russian 'Войска' (terms) / 'Войско' (Alliance Banner, Formations) / 'отряд' (Recall dialog); Portuguese 'Esquadrão' (lowercase inside sentences); Indonesian 'Skuad'. ES: Alliance Banner stat and the Recall dialog."],
   ["Shield", "防護罩", "보호막", "Schild", "Bouclier", "Escudo", "Kalkan", "Perisai", "Щит", "โล่", "درع", "Escudo"],
   ["Marching", "行軍", "행군", "Marschieren", "Marche", "Marchando", "İntikal", "Barisan", "Марш", "เดินทัพ", "زحف", "En marcha"],
   ["Gathering", "採集", "채집", "Sammeln", "Collecte", "Coletando", "Toplanıyor", "Mengumpulkan", "Сбор", "การเก็บทรัพยากร", "الجمع", "Recolectando"],
   ["Control", "控制 / 佔領", "제어 / 점령", "Kontrolle", "Contrôle", "Controle", "Kontrol / hakimiyet / işgal", "Penguasaan / kendali", "контроль / захват", "การควบคุม / ยึดครอง", "التحكم / السيطرة", "—"],
   ["Building control time", "佔領時長", "점령 시간", "—", "temps nécessaire pour contrôler", "tempo necessário para assumir o controle das construções", "binaları kontrol etme süresi", "waktu yang diperlukan untuk menguasai bangunan", "время захвата зданий", "เวลาที่ใช้ในการยึดครองสิ่งปลูกสร้าง", "الوقت المطلوب للسيطرة على المباني", "—", "Seen inside sentences."],
   ["Defense failure", "防守失敗", "방어에 실패", "—", "défaite", "derrota", "—", "kalah", "поражение", "ตกเป็นฝ่ายแพ้", "الهزيمة", "—", "Seen inside sentences."],
   ["Teleport / free teleports", "遷城 / 免費高級遷城", "—", "Teleports", "téléportations gratuites", "teletransportes gratuitos", "ışınlanma", "teleportasi gratis", "бесплатный телепорт", "การย้ายถิ่นฐานฟรี", "عمليات الانتقال المجانية", "—"],
   ["Cooldown", "恢復時間", "—", "—", "intervalle (entre les téléportations)", "intervalo (entre teletransportes gratuitos)", "ışınlanmalar arasındaki süre", "interval (antara teleportasi gratis)", "время перезарядки", "คูลดาวน์", "الفاصل الزمني", "—"],
   ["Total Troops", "總部隊", "총 부대", "Alle Trupps", "Total troupes", "Tropas Totais", "Birlik Sayısı", "Total Skuad", "Общий размер войск", "ทีมทั้งหมด", "إجمالي القوات", "Total tropas"],
   ["March Queue", "行軍隊伍", "행군 대열", "Marschschlange", "File de Marche", "Fila de Marcha", "İntikal Sırası", "Barisan Antrean", "Очередь марша", "คิวการเดินทัพ", "طابور القوات المتقدمة", "Cola de marcha"],
   ["Injured", "傷兵", "부상병", "Verletzt", "Blessé(s)", "Ferido", "Yaralılar", "Terluka", "Ранено", "ได้รับบาดเจ็บ", "مصاب", "Heridos"]
  ]
 },
 {
  "cat": "Stats",
  "rows": [
   ["Attack", "攻擊力", "공격력", "Angriff", "Attaque", "Ataque", "Saldırı", "Attack", "Атака", "พลังโจมตี", "هجوم", "Ataque", "ES: from 'Ataque de Arquero'."],
   ["Defense", "防禦力", "방어력", "Verteidigung", "Défense", "Defesa", "Savunma", "Defense", "Защита", "พลังป้องกัน", "دفاع", "Defensa", "ES: from 'Defensa de Arquero'."],
   ["Lethality", "殺傷力", "파괴력", "Tödlichkeit", "Létalité", "Letalidade", "Öldürücülük", "Lethality", "Смертоносность", "ความแรงพลัง", "قوة فتك", "Letalidad", "ES: from 'Letalidad de Arquero'."],
   ["Health", "生命值", "HP", "Gesundheit", "Santé", "Vida", "Sağlık", "Health", "Здоровье", "พลังชีวิต", "صحة", "Salud", "ES: from 'Salud de Arquero'."],
   ["Combat buffs", "戰鬥增益", "—", "—", "—", "—", "—", "—", "боевые усиления", "—", "—", "Guerras", "ES: City Bonus tab (the other tab is 'Crecimiento')."],
   ["Escorts", "護衛數量", "호위병 수량", "Eskorten", "Escortes", "Escoltas", "Eşlikçiler", "Pengawal", "Конвои", "หน่วยคุ้มกัน", "المواكب", "—"],
   ["Level", "等級", "레벨", "Level", "Niveau", "Nível", "Seviye", "Level", "Уровень", "เลเวล", "المستوى", "Nv.", "Portuguese label 'Nível'; abbreviated 'Nv.' in sentences (e.g. Nv. 16). Short form 'Lv.' on most screens: Chinese 級 (28級), French Niv., Portuguese Nv., Turkish Sv., Russian Ур., Arabic المستوى. ES: abbreviation 'Nv.' is what the game shows."],
   ["Troops Capacity", "部隊容量", "부대 수용량", "Truppenkapazität", "Capacité de Troupes", "Capacidade de Tropa", "Birlik Kapasitesi", "Kapasitas Pasukan", "Вместимость войска", "ความจุทีม", "قدرة القوات", "Capacidad de despliegue", "ES: Deploy screen '!' pop-up (Bonificación de tropas). The City Bonus item uses the same Spanish words."]
  ]
 },
 {
  "cat": "Troop types",
  "rows": [
   ["Infantry", "步兵", "보병", "Infanterie", "Infanterie", "Infantaria", "Piyade", "Infanteri", "пехотинец", "ทหารราบ", "المشاة", "Infantería", "Portuguese confirmed from the Troops Preview button 'Infantaria do Ápice'. ES: from 'Infantería Definitiva'."],
   ["Cavalry", "騎兵", "기병", "Kavallerie", "Cavalerie", "Cavalaria", "Süvari", "Kavaleri", "кавалерист", "ทหารม้า", "الفرسان", "Caballería", "Portuguese confirmed from the Troops Preview buttons 'Cavalaria do Ápice' and 'Cavalaria Suprema'. ES: from 'Caballería Definitiva'."],
   ["Archer", "弓兵", "궁병", "Bogenschütze", "Archer", "Arquearia", "Okçu", "Pemanah", "стрелок", "พลธนู", "الرماة", "Arquero", "Portuguese: 'Arquearia' is confirmed (Troops Preview 'Arquearia do Ápice' and Governor Gear 'Ataque da Arquearia'), not 'Arqueiro'. ES: 'Arquero' (Arquero Definitivo / Ataque de Arquero)."],
   ["Apex Infantry", "王牌步兵", "에이스 보병", "Spitzen Infanterie", "Infanterie Extrême", "Infantaria do Ápice", "Mükemmel Piyade", "Infanteri Top", "Превосходный пехотинец", "ทหารราบเอเปกซ์", "المشاة المهيمنين", "—", "Troops Preview button."],
   ["Apex Cavalry", "王牌騎兵", "에이스 기병", "Spitzen Kavallerie", "Cavalerie Extrême", "Cavalaria do Ápice", "Mükemmel Süvari", "Kavaleri Top", "Превосходный кавалерист", "ทหารม้าเอเปกซ์", "الفرسان المهيمنين", "—", "Troops Preview button."],
   ["Apex Archer", "王牌弓兵", "에이스 궁병", "Spitzen Bogenschütze", "Archer Extrême", "Arquearia do Ápice", "Mükemmel Okçu", "Pemanah Top", "Превосходный стрелок", "พลธนูเอเปกซ์", "الرماة المهيمنين", "—", "Troops Preview button."]
  ]
 },
 {
  "cat": "Heroes — SSR",
  "rows": [
   ["Saul", "薩洛", "살로", "Saul", "Saul", "Saul", "Saul", "Saul", "Соул", "ซอล", "شاول", "Saul"],
   ["Helga", "赫爾加", "헬가", "Helga", "Helga", "Helga", "Helga", "Helga", "Хельга", "เฮลก้า", "هيلجا", "Helga"],
   ["Zoe", "佐伊", "조이", "Zoe", "Zoé", "Zoe", "Zoe", "Zoe", "Зои", "โซอี้", "زوي", "Zoe"],
   ["Hilde", "希爾德", "힐데", "Hilde", "Hilde", "Hilde", "Hilde", "Hilde", "Хильда", "ฮิลเดอร์", "هيلدي", "Hilde"],
   ["Marlin", "馬林", "마린", "Marlin", "Marlin", "Peixe Marlin", "Marlin", "Marlin", "Марлин", "มาร์ลิน", "مارلين", "Marlin", "The Portuguese game text shows 'Peixe Marlin'."],
   ["Amadeus", "阿瑪迪斯", "아마데우스", "Amadeus", "Amadeus", "Amadeus", "Amadeus", "Amadeus", "Амадей", "อมาดีอุส", "أماديوس", "Amadeus"],
   ["Jabel", "潔貝爾", "제이벨", "Jabel", "Jabel", "Jabel", "Jabel", "Jabel", "Явель", "จาเบล", "جبل", "Jabel"]
  ]
 },
 {
  "cat": "Heroes — SR",
  "rows": [
   ["Diana", "狄安娜", "다이애나", "Diana", "Diana", "Diana", "Diana", "Diana", "Диана", "ไดอาน่า", "ديانا", "Diana"],
   ["Fahd", "法赫德", "파드", "Fahd", "Fahd", "Fahd", "Fahd", "Fahd", "Фад", "ฟาฮ์ด", "فهد", "Fahd"],
   ["Amane", "雨音", "아마네", "Amane", "Amane", "Amane", "Amane", "Amane", "Амане", "อามาเนะ", "أماني", "Amane"],
   ["Gordon", "戈登", "고든", "Gordon", "Gordon", "Gordon", "Gordon", "Gordon", "Гордон", "กอร์ดอน", "جوردن", "Gordon"],
   ["Yeonwoo", "妍羽", "연우", "Yeonwoo", "Yeonwoo", "Yeonwoo", "Yeonwoo", "Yeonwoo", "Ёну", "ยอนอู", "يونوو", "Yeonwoo"],
   ["Howard", "霍華德", "하워드", "Howard", "Howard", "Howard", "Howard", "Howard", "Говард", "ฮาวเวิร์ด", "هاورد", "Howard"],
   ["Chenko", "琴科", "첸코", "Chenko", "Chenko", "Chenko", "Chenko", "Chenko", "Ченко", "เชนโกะ", "تشينكو", "Chenko"],
   ["Quinn", "奎恩", "퀸", "Quinn", "Quinn", "Quinn", "Quinn", "Quinn", "Куинн", "ควินน์", "كوين", "Quinn"]
  ]
 },
 {
  "cat": "Heroes — R",
  "rows": [
   ["Forrest", "福斯特", "포스터", "Forrest", "Forrest", "Forrest", "Forrest", "Forrest", "Форрест", "ฟอร์เรสต์", "فورست", "Forrest"],
   ["Seth", "史密斯", "스미스", "Seth", "Seth", "Seth", "Seth", "Seth", "Сет", "เซธ", "سيث", "Seth"],
   ["Edwin", "艾德溫", "에드윈", "Edwin", "Edwin", "Edwin", "Edwin", "Edwin", "Эдвин", "เอ็ดวิน", "إدوين", "Edwin"],
   ["Olive", "奧麗芙", "올리브", "Olive", "Olive", "Olive", "Olive", "Olive", "Олив", "โอลีฟ", "أوليف", "Olive"]
  ]
 },
 {
  "cat": "Bear Hunt",
  "rows": [
   ["Bear Hunt", "狩獵巨熊", "자이언트 베어 사냥", "Bärenjagd", "Chasse à l'Ours", "Caça ao Urso", "Ayı Avı", "Bear Hunt", "Охота на медведя", "ล่าหมี", "صيد الدببة", "Cacería del Oso", "Event name in the English game. The source guide's 'Bear Trap' is not a game term; treat it as Bear Hunt. Korean game text is 자이언트 베어 사냥 (the current Korean guide says 곰사냥). Indonesian game text keeps the English 'Bear Hunt'."],
   ["Trap 1 / Trap 2", "陷阱1 / 陷阱2", "함정 1 / 함정 2", "Falle 1 / Falle 2", "Piège 1 / Piège 2", "Armadilha 1 / Armadilha 2", "1. Tuzak / 2. Tuzak", "Perangkap 1 / Perangkap 2", "1-я ловушка / 2-я ловушка", "กับดัก 1 / กับดัก 2", "فخ 1 / فخ 2", "Trampa 1 / Trampa 2", "The two tabs inside Bear Hunt."],
   ["Raging Bear", "暴怒巨熊", "분노한 곰", "Wütender Bär", "Ours Enragé", "Urso Furioso", "Öfkeli Ayı", "Raging Bear", "свирепый медведь", "หมีคลั่ง", "الدب الهائج", "Oso Enfurecido", "Shown in green brackets in the event text. German text shows the accusative 'Wütenden Bären'. French shows 'l'Ours Enragé' in the event text. Russian text shows the accusative 'свирепого медведя'. Turkish text shows 'Öfkeli Ayı'yı' (with the accusative suffix). Indonesian keeps English 'Raging Bear'."],
   ["Hunting Achievements", "狩獵成就", "사냥 업적", "Jagen-Erfolge", "Prouesses de Chasse", "Conquistas da Caçada", "Av Başarıları", "Pencapaian Berburu", "Достижения на охоте", "ความสำเร็จในการล่าสัตว์", "إنجازات الصيد", "Logros de caza"],
   ["Damage Rewards", "傷害獎勵", "피해량 보상", "Schadensbelohnungen", "Récompenses de Dégâts", "Recompensas de Dano", "Hasar Ödülleri", "Hadiah Kerusakan", "Награды за урон", "รางวัลความเสียหาย", "مكافآت الأضرار", "Recompensas por daño"],
   ["Trap Enhancement", "陷阱強化", "함정 강화", "Fallenverbesserung", "Amélioration de Piège", "Aprimoramento da Armadilha", "Tuzak Güçlendirmesi", "Peningkatan Perangkap", "Усиление ловушки", "การพัฒนากับดัก", "تحسين الفخ", "Mejora de trampa"],
   ["Pre-Registered Start", "預約自動開啟", "자동 시작 예약", "Vorangemeldeter Start", "Début de la Pré-inscription", "Início do pré-registrado", "Ön Kayıtlı Başlangıç", "Pra-Registrasi Dimulai Pada", "Заранее зарегистрированное начало", "เริ่มลงทะเบียนล่วงหน้า", "يبدأ التسجيل المسبق", "Apertura Preinscripción"],
   ["Go Enable", "前往開啟", "오픈하기", "Aktivieren starten", "Aller Activer", "Ir Habilitar", "Git Etkinleştir", "Pergi Aktifkan", "Пойти включить", "เปิดใช้งาน", "اذهب للتمكين", "Ir a Activar", "Button text."],
   ["Total Alliance Damage", "盟友協力造成的總傷害", "연맹원과 함께 입힌 피해", "Allianzschaden", "Dégâts de l'Alliance Total", "Dano Total da Aliança", "Toplam İttifak Hasarı", "Total Damage Aliansi", "—", "ความเสียหายพันธมิตร", "الضرر الإجمالي للتحالف", "Daño de Alianza Total", "Chinese and Korean wording differ: seen inside a sentence. German: 'Allianzschaden' (one word). French sentence: 'Dégâts de l'Alliance Total'. Arabic sentence: 'الضرر الإجمالي للتحالف'. Russian Bear Hunt text is different and does not contain this phrase. Thai sentence: 'ความเสียหายพันธมิตร'. Indonesian sentence: 'Total Damage Aliansi'. ES: seen inside a sentence."]
  ]
 },
 {
  "cat": "Castle Battle",
  "rows": [
   ["Castle Battle", "決戰王城", "캐슬 전투", "Schlacht um das Schloss", "Bataille du Château", "Batalha do Castelo", "Şato Savaşı", "Pertempuran Istana", "Битва за замок", "การต่อสู้ชิงปราสาท", "معركة القلعة", "Batalla del castillo", "German rules text once misspells it as 'Schlacht um das Schoss'. Indonesian rules text says 'Pertempuran Kastil' while the tab and title say 'Pertempuran Istana'. ES: rules text capitalises 'Batalla del Castillo'."],
   ["Background", "背景", "배경", "Hintergrund", "Contexte", "Segundo Plano", "Arka Plan", "Latar Belakang", "История", "พื้นหลัง", "الخلفية", "Contexto", "Second tab of the rules window (next to Rules). Russian tab is 'История' (History)."],
   ["King's Castle", "王城", "캐슬", "Königliches Schloss", "Château Royal", "Castelo da Realeza", "Kralın Şatosu", "Kastil Raja", "Королевский замок", "ปราสาทกษัตริย์", "قلعة الملك", "Castillo del Rey", "Seen inside sentences. Korean just says 캐슬 (Castle). German shows 'Königliche Schloss' / 'Königlichen Schlosses' in sentences. French rules text says 'Château Royal'; the event tab is 'Bataille du Château'. Turkish 'Kralın Şatosu' (genitive form; 'Kralın Şatosu'nu' in sentences). Indonesian: 'Kastil Raja' (tab uses 'Istana')."],
   ["Forbidden Area", "禁區", "금지 구역", "Verbotenes Gebiet", "Zone Interdite", "Área Proibida", "Yasaklı Bölge", "Area Terlarang", "запретная зона", "พื้นที่ต้องห้าม", "المنطقة المحظورة", "Área prohibida", "Seen inside sentences. German shows the genitive 'Verbotenen Gebiets'."],
   ["King", "國王", "국왕", "König", "Roi", "Rei", "Kral", "Raja", "король", "พระราชา", "ملك", "Rey", "Seen inside sentences."],
   ["Alliance Leader", "盟主", "맹주", "Allianzanführer", "Leader d'Alliance", "Líder da Aliança", "İttifak Lideri", "Pemimpin Aliansi", "лидер альянса", "ผู้นำพันธมิตร", "زعيم التحالف", "líder de la Alianza", "Seen inside sentences. French: 'Leader d'Alliance' / 'leader de l'alliance'. Arabic uses both 'زعيم التحالف' and 'قائد التحالف' in the same rules text. ES: also 'líder de la alianza ganadora'."],
   ["Turret", "砲台", "포탑", "Geschützturm", "tourelle", "torreão", "taret", "meriam", "орудийная башня", "ป้อมปืน", "البرج", "torreta", "Seen inside sentences. Lowercase 'turret' in the game text. French: 'tourelle'. Turkish shows 'Tareti' / 'taretin' in sentences; base form 'taret'. Indonesian: 'meriam' (lowercase, in sentences). ES: lowercase in the rules."],
   ["Town", "城鎮", "도시", "Stadt", "Ville", "Cidade", "Şehir", "Kota", "город", "เมือง", "مدينة", "Ciudad", "Seen inside sentences. German plural 'Städte'. Arabic plural 'المدن'. Russian plural 'города'. Turkish plural 'Şehirler'. ES: plural 'Ciudades' in the rules; 'tu Pueblo' is used for your own town."]
  ]
 },
 {
  "cat": "Sanctuary Battle",
  "rows": [
   ["Sanctuary Battle", "遺跡爭奪", "유적 쟁탈", "Heiligtumskampf", "Bataille du Sanctuaire", "Batalha do Santuário", "Tapınak Savaşı", "Pertempuran Tempat Perlindungan", "Битва за святилище", "การต่อสู้ชิงวิหาร", "معركة المأوى", "Batalla de santuario", "Event tab name. Indonesian text was cut off; 'Pertempuran Tempat Perlindungan' is reconstructed from two truncated screens ('Pertempuran T… Perlindung…' and 'Pertempuran Tempat…')."],
   ["Sanctuary / Sanctuaries", "遺跡", "유적", "Heiligtum / Heiligtümer", "Sanctuaire / Sanctuaires", "Santuário / Santuários", "Tapınak / Tapınaklar", "Sanctuary", "святилище / святилища", "วิหาร", "المأوى / المآوي", "santuario", "Chinese uses 遺跡 and Korean uses 유적, NOT 聖所/성소 (Sanctum in Swordland Showdown). Portuguese uses 'Santuário' for both, so pt/fr/de cannot tell them apart. German uses 'Heiligtum' for both this and Sanctum. French uses 'Sanctuaire' for both this and Sanctum. Arabic also distinguishes them: المأوى (Sanctuary) vs مزار (Sanctum). Russian uses 'святилище' for both this and Sanctum. Turkish uses 'Tapınak' for both this and Sanctum. Thai: 'วิหาร' vs Sanctum 'วิหารศักดิ์สิทธิ์' (related but different). Indonesian keeps English 'Sanctuary' vs Sanctum 'Sanctum' (different). ES: lowercase inside the tagline."],
   ["Season / Phase", "賽季 / 期", "시즌 / 회", "Saison / Phase", "Saison / Phase", "Temporada / Fase", "Sezon / Evre", "Season / Fase", "Сезон / Стадия", "ฤดูกาล / ช่วง", "الموسم / المرحلة", "Temporada / Fase", "Title format: 'Season 2 Phase 7/8' = 第2賽季 7/8期 = 제2시즌 7/8회. Arabic: 'الموسم 2 المرحلة 7/8'. Thai: 'ฤดูกาลที่ 2 ช่วงที่ 7/8'. Indonesian: 'Season 2 Fase 7/8'. ES title: 'Temporada 2 Fase 8/8'."],
   ["Defend Phase", "保護階段", "보호 단계", "Verteidigungsphase", "Phase de Défense", "Fase de Defesa", "Savunma Evresi", "Fase Bertahan", "Стадия обороны", "ช่วงการป้องกัน", "مرحلة الدفاع", "—"],
   ["Pillar of Honor", "功勳碑", "공훈패", "Wand der Ehre", "Pilier de l'Honneur", "Pilar da Honra", "Onur Sütunu", "Pilar Kehormatan", "стела почета", "เสาหลักแห่งเกียรติยศ", "نصب الشرف التذكاري", "Pilar del honor", "Seen inside sentences. German text says 'Wand der Ehre' (Wall of Honor). ES: seen inside the tagline."],
   ["Event season has ended", "本期活動已結束", "이번 이벤트가 종료됐습니다", "Saison beendet", "Saison d'évèn. finie", "A temporada do evento terminou", "Etkinlik sezonu sona erdi", "Event Season telah berakhir", "Сезон событий завершен", "ฤดูกาลอีเวนต์ได้สิ้นสุดลงแล้ว!", "انتهى موسم الفعاليات", "—", "French text is abbreviated: 'Saison d'évèn. finie'."]
  ]
 },
 {
  "cat": "Strongest Governor",
  "rows": [
   ["Hero of the Season","本期英雄","이번 영웅","Held der Saison","Héros de la Saison","Herói da Temporada","Sezonun Kahramanı","Hero of the Season","Герой сезона","ฮีโร่แห่งฤดูกาล","بطل الموسم","—","Indonesian keeps the English wording in the game."],
   ["Honor Ranking","榮耀榜","명예 랭킹","Ehrenrang","Classement d'honneur","Classificação de Honra","Onur Sıralaması","Peringkat","Рейтинг чести","อันดับเกียรติยศ","تصنيف الشرف","Clasificación Honor","Indonesian label shows only 'Peringkat' (may be shortened). ES: All Out banner."],
   ["Stage 1: City Construction","第1階段：城鎮建設","1 단계: 도시 건설","Stufe 1: Stadtsbau","Étape 1 : Construction de Ville","Estágio 1: Construção da Cidade","Aşama 1: Şehir İnşaatı","Babak 1: Konstruksi Pemukiman","Этап 1: Строительство города","ด่าน 1: การก่อสร้างค่ายอพยพ","المرحلة 1: بناء المدينة","—","German 'Stadtsbau' and Thai 'ค่ายอพยพ' (refugee camp) are the game's own wording. Indonesian uses 'Babak' here but 'Stage' in the reward title."],
   ["My Ranking","我的排名","나의 랭킹","Mein Rang","Mon Classement","Meu Rank","Sıralamam","Peringkatku","Мой рейтинг","อันดับของฉัน","تصنيفي","Mi clasificación"],
   ["Unranked","未上榜","랭킹 없음","Kein Rang","Non classé","Sem Rank","Sıralama yok","Tidak Ada Peringkat","Без рейтинга","ไม่มีอันดับ","غير مصنف","—"],
   ["My Points","我的積分","나의 포인트","Meine Punkte","Mes Points","Meus Pontos","Puanım","Poin Saya","Мои очки","คะแนนของฉัน","نقاطي","Mis puntos"],
   ["Target Points","目標積分","목표 포인트","Zielpunkte","Points Cibles","Pontos do Objetivo","Hedef Puan","Poin Sasaran","Цель по очкам","คะแนนเป้าหมาย","النقاط المستهدفة","Puntos objetivo"],
   ["Claim","領取","수령","Einfordern","Récupérer","Coletar","Topla","Klaim","Получить","รับ","تحصيل","—"],
   ["Strongest Governor", "至高領主", "지고의 영주", "Stärkster Gouverneur", "Haut Gouverneur", "O Governador mais Forte", "En Güçlü Vali", "Gubernur Terkuat", "Сильнейший губернатор", "เจ้าเมืองสุดแข็งแกร่ง", "الحاكم الأقوى", "Gobernador Más Poderoso", "ES: Events tab label."],
   ["Stage", "階段", "단계", "Stufe", "étape", "estágio", "aşama", "stage", "этап", "ด่าน", "مرحلة", "Etapa", "Seen inside sentences. Portuguese: 'estágio' (lowercase). German: 'Stufe' (plural 'Stufen'). French: 'étape' (lowercase). Arabic: 'مرحلة' (plural 'مراحل'). Russian: 'этап' (plural 'этапов'). The Sanctuary Battle screen says 'Стадия' instead. Turkish: 'aşama' (lowercase in sentences). The Sanctuary Battle screen says 'Evre'. Thai: 'ด่าน'. Indonesian keeps English 'stage'. Thai Sanctuary Battle screen says 'ช่วง'; Indonesian says 'Fase'. ES: 'Etapa 2: Desarrollo de héroe' / 'Etapa finalizada'."],
   ["Challenge Medal", "挑戰勳章", "도전 훈장", "Herausforderungsmedaille", "Médaille de Défi", "Medalha de Desafio", "Mücadele Madalyası", "Medali Tantangan", "медаль испытаний", "เหรียญท้าทาย", "ميدالية التحدي", "—"],
   ["Challenge Medal Rewards", "挑戰勳章獎勵", "도전 훈장 보상", "Herausforderungsmedaillen-Belohnungen", "Récompenses de Médaille de Défi", "Recompensas de Medalhas de Desafio", "Mücadele Madalyası Ödülleri", "Hadiah Medali Tantangan", "награды медалей испытаний", "—", "مكافآت ميدالية التحدي", "—", "Thai text only says 'เหรียญท้าทายพิเศษ' (special challenge medal); no standalone 'rewards' form seen."],
   ["Kingdom Personal Ranking Rewards", "王國個人排名獎勵", "왕국 개인 랭킹 보상", "Königreich-Ranglistenbelohnungen", "Récompenses de Classement Individuel d'étape et de Royaume", "Recompensas de Classificação Individual do Estágio e do Reino", "Aşama ve Krallık Kişisel Sıralama Ödülleri", "Hadiah Peringkat Pribadi Stage dan Kerajaan", "награды за личный рейтинг на этапе и в государстве", "รางวัลอันดับส่วนบุคคลสำหรับอาณาจักรและด่าน", "مكافآت الترتيب الشخصي والمملكة للمرحلة", "—", "Seen inside sentences. The Portuguese sentence covers both Stage and Kingdom ('do Estágio e do Reino'). Korean: 왕국 개인 랭킹 보상. German sentence: 'persönliche Stufen- und Königreich-Ranglistenbelohnungen'. French sentence covers both Stage and Kingdom ('d'étape et de Royaume'). Arabic sentence covers both Stage and Kingdom ('الترتيب الشخصي والمملكة للمرحلة'). Russian sentence covers both Stage and Kingdom ('на этапе и в государстве'). Turkish sentence covers both Stage and Kingdom ('Aşama ve Krallık Kişisel Sıralama Ödülleri'). Thai and Indonesian sentences also cover both Stage and Kingdom."],
   ["Cross-Kingdom Personal Ranking", "跨王國個人總排名", "크로스 왕국 개인 종합 랭킹", "—", "—", "—", "Krallıklar Arası Kişisel Sıralama", "Peringkat Pribadi Antar-Kerajaan", "личный рейтинг между государствами", "อันดับส่วนบุคคลข้ามอาณาจักร", "الترتيب الشخصي على مستوى المملكة", "—", "Seen inside sentences. Chinese 跨王國個人總排名, Korean 크로스 왕국 개인 종합 랭킹. Portuguese text was cut off in the screenshot. German text was cut off in the screenshot. French text was cut off in the screenshot. Arabic: 'الترتيب الشخصي على مستوى المملكة' (rule 5; wording may differ from the English). Russian text was cut off ('личный рейтинг между государствами и внутри…'). Turkish: 'Krallıklar Arası Kişisel Sıralama' (rule 5; full). Thai and Indonesian rule 5 are complete."],
   ["Participating Kingdoms", "參與王國", "참여 왕국", "Teilnehmende Königreiche", "Royaumes participants", "Reinos Participantes", "Katılan Krallıklar", "Kerajaan yang Berpartisipasi", "Королевства-участники", "อาณาจักรที่เข้าร่วม", "الممالك المشاركة", "—"],
   ["Current Kingdom", "本王國", "현재 왕국", "Aktuelles Königreich", "Royaume actuel", "Reino Atual", "Mevcut Krallık", "Kerajaan Saat Ini", "Текущее государство", "อาณาจักรปัจจุบัน", "المملكة الحالية", "—", "Russian uses 'королевства' on some screens and 'государство' on others."],
   ["Cross-Kingdom", "跨王國", "크로스 왕국", "Königreichsübergreifend", "Inter-Royaumes", "Entre-Reinos", "Krallıklar Arası", "Antar Kerajaan", "Среди государств", "ข้ามอาณาจักร", "على مستوى المملكة", "—"],
   ["Coming soon", "即將來臨", "곧 오픈합니다", "Kommt bald", "Bientôt dispo", "Em breve", "Çok yakında", "Segera", "Уже скоро", "มาในเร็วๆ นี้", "قريبًا", "—"],
   ["Rewards (preview bar)", "獎勵預覽", "보상 미리보기", "Belohnungen", "Récompenses", "Recompensas", "Ödüller", "Hadiah", "Предпросмотр наград", "รางวัล", "المكافآت", "—", "Bar on the Strongest Governor screen. English shows only 'Rewards'."]
  ]
 },
 {
  "cat": "Cesares Fury",
  "rows": [
   ["Cesares Fury", "征討切薩雷", "체사레 정벌", "Cesares Zorn", "Fureur des Césarès", "Fúria dos Césares", "Cesares Öfkesi", "Cesares Fury", "Ярость цесарцев", "โทสะของซีซาเรส", "غضب سيزاريس", "—", "Indonesian keeps English 'Cesares Fury'."],
   ["Highlord Cesares", "統帥切薩雷", "체사레 사령관", "Hochlord Cesares", "Haut Seigneur Césarès", "Césares da Alta Nobreza", "Cesares Başkomutanı", "Highlord Cesares", "Полководец цесарцев", "จอมทัพซีซาเรส", "أمير سيزاريس", "—"],
   ["Cesares Legionnaire", "切薩雷精銳", "체사레 정예군", "Cesares Legionär", "Légionnaire Césarès", "Césares Legionários", "Cesares Lejyoneri", "Legioner Cesares", "Цесарец-легионер", "กองทัพซีซาเรส", "جندي فيلق سيزاريس", "—"],
   ["Private", "個人", "개인", "Persönlich", "Privé", "Individual", "Kişisel", "Pribadi", "Личн.", "ส่วนตัว", "شخصي", "—", "Tab. Opposite tab is 'Alliance'. Portuguese 'Individual'. Korean 개인. Russian tab is abbreviated 'Личн.'."],
   ["Alliance", "聯盟", "연맹", "Allianz", "Alliance", "Aliança", "İttifak", "Aliansi", "Альянс", "พันธมิตร", "التحالف", "—", "Tab. Opposite tab is 'Private'. Chinese 聯盟, Korean 연맹."],
   ["Challenged", "已挑戰", "도전 완료", "Herausgefordert", "Défié", "Desafiado", "Mücadele edildi", "Ditantang", "Вызов брошен", "ท้าทายแล้ว", "تم التحدي", "—"],
   ["Captain", "頭目", "보스", "Kapitän", "Capitaine", "Capitão", "Önder", "Kapten", "капитан", "กัปตัน", "الكابتن", "—", "Seen inside sentences. Chinese 頭目 ('defeating the Captain'). Korean says 보스 (boss). French: 'le Capitaine vaincu'. Turkish says 'Önder' (Leader) in the event text. Thai: 'กัปตัน'. Indonesian: 'Kapten'."],
   ["Scout", "偵察", "정찰", "Spähen", "Espionner", "Espionar", "Gözetle", "Intai", "Разведать", "สอดแนม", "جاسوس", "—", "Button."],
   ["Recommended Power", "推薦實力", "추천 전투력", "Empfohlene Kraft", "Puissance Recommandée", "Poder Recomendado", "Önerilen Güç", "Kekuatan yang Disarankan", "Рекомендуемая сила", "ค่าพลังแนะนำ", "القوة الموصى بها", "Poder recomendado", "ES: Terror pop-up."],
   ["Show event shortcut", "顯示活動快捷入口", "이벤트 바로가기 표시", "Event-Verknüpfung anzeigen", "Afficher le raccourci de l'évènement", "Exibir atalho para o evento", "Etkinlik kısayolunu göster", "Tampilkan pintasan acara", "Показать быстрый доступ к событию", "แสดงปุ่มลัดอีเวนต์", "عرض اختصار الفعالية", "—"]
  ]
 },
 {
  "cat": "Alliance Championship",
  "rows": [
   ["Alliance Championship", "聯盟爭霸賽", "연맹 챔피언십", "Allianzmeisterschaft", "Championnat de l'Alliance", "Campeonato da Aliança", "İttifak Şampiyonası", "Kejuaraan Aliansi", "Чемпионат альянса", "การแข่งขันชิงแชมป์พันธมิตร", "بطولة التحالف", "Campeonato de alianza", "German sentence text says 'Allianz Champions' once."],
   ["Silver IV", "白銀IV", "실버IV", "Silber IV", "Argent IV", "Prata IV", "Gümüş IV", "Silver IV", "Серебро IV", "เงิน IV", "فضي IV", "Plata IV", "Tier name. Existing rows have 'Tier C' and 'Gold'."],
   ["The Alliance Championship has ended!", "爭霸賽已落幕", "챔피언십이 종료되었습니다", "Die Allianzmeisterschaft ist beendet!", "Le Championnat de l'Alliance est terminé !", "O Campeonato da Aliança terminou!", "İttifak Şampiyonası sona erdi!", "Kejuaraan Aliansi telah berakhir!", "Чемпионат альянса завершился!", "การแข่งขันชิงแชมป์พันธมิตรจบลงแล้ว!", "انتهت بطولة التحالف!", "¡El Campeonato de alianza ha finalizado!"]
  ]
 },
 {
  "cat": "Backpack items",
  "rows": [
   ["Clawshard", "斷爪", "부러진 발톱", "Klauenfragment", "Griffe Brisée", "Garra de fragmento", "Kırık Pençe", "Clawshard", "Обломок когтя", "ชิ้นส่วนกรงเล็บ", "المخالب المكسورة", "Fragmento de Garra", "Dropped by beasts in the Desert Trial event; used to track the Dreadwolf. ES tooltip: '…durante el evento de la [Prueba del Desierto]. Úsalo para rastrear al [Lobo Aterrador].'"],
   ["Satin", "進貢綢緞", "비단", "Satin", "Satin", "Cetim", "Saten", "Satin", "Атлас", "ผ้าซาติน", "نسيج أطلس", "Satén", "A Governor Gear upgrade material. Chinese: the character 緞 was confirmed by the user; the '進貢' prefix is from the first screenshot reading."],
   ["Gilded Threads", "金絲線", "금사", "Vergoldete Fäden", "Fils Dorés", "Fios Dourados", "Yaldızlı İplikler", "Gilded Threads", "Золоченые нити", "ด้ายทองคำ", "خيوط مذهبة", "Hilos dorados", "A Governor Gear upgrade material."],
   ["Artisan's Vision", "設計圖紙", "설계 스케치", "Die Vision des Handwerkers", "Vision de l'Artisan", "Visão do Artesão", "Zanaatkâr Vizyonu", "Artisan's Vision", "Ремесленный чертеж", "วิสัยทัศน์ของช่างฝีมือ", "رؤية الحرفي", "Visión del Artesano", "A Governor Gear upgrade material."],
   ["Mithril", "秘銀", "미스릴", "Mithril", "Mithril", "Mithril", "Mithril", "Mithril", "Мифрил", "มิธริล", "ميثريل", "Mitrilo", "Infuses Hero Gear with extra power."],
   ["Mythic General Hero Shard", "傳說通用英雄碎片", "레전드 공용 영웅 조각", "Mythisches Helden-Fragment", "Fragment Universel de Héros Mythique", "Fragmento de Herói Geral Mítico", "Mitik Genel Kahraman Parçası", "Paket Chip Keberuntungan Mitos", "Мифический общий фрагмент героя", "ชิ้นส่วนฮีโร่ทั่วไปขั้นเทพ", "شظية البطل العام الخيالي", "Fragmento de héroe General Mítico", "Excludes Helga and Amadeus. The English game text says 'an Mythic' (a game typo). Indonesian: the title says 'Paket Chip Keberuntungan Mitos' but the text says 'Shard Hero Mythic'."],
   ["100 Enhancement XP Part", "100點強化經驗部件", "경험치 강화 부품 100점", "100 Verbesserungs-XP-Teil", "100 Points d'EXP d'Amélioration", "100 Peças de XP de Aprimoramento", "100 Geliştirme TP'si Bileşeni", "100 Enhancement XP Part", "Компонент усиления опыта (100 очк.)", "ชิ้นส่วน XP การพัฒนา x100", "100 مكون خبرة تحسين", "100 partes de EXP de mejora", "Gives 100 hero Gear Enhancement XP."],
   ["Forgehammer", "鍛造錘", "제작 망치", "Forgehammer", "Marteau de Forge", "Martelo de Forja", "Demirci Çekici", "Forgehammer", "Кузнечный молот", "ค้อนตีเหล็ก", "مطرقة الحدادة", "Martillo de Forja", "Levels up Mythic Hero Gear Mastery. Mastery Forging unlocks at Town Center Lv. 20. German kept the English name."]
  ]
 },
 {
  "cat": "Gear terms",
  "rows": [
   ["Governor Gear", "領主裝備", "영주 장비", "Gouverneur-Ausrüstung", "Équipement Chef", "Equipamento do Chefe", "Şef Donanımı", "Gear Gubernur", "Снаряжение губернатора", "อุปกรณ์ผู้นำค่าย", "عتاد الحاكم", "Equipo de gobernador", "Values are the Governor Gear screen title. The item descriptions in the Backpack use other wording: French 'Équipement du Chef', Portuguese 'Equipamento de Governador', Turkish 'Vali Donanımı', Thai 'อุปกรณ์เจ้าเมือง'. French and Portuguese use 'Chef/Chefe' for Governor here."],
   ["Hero Gear", "英雄裝備", "영웅 장비", "Heldenausrüstung", "Équipement de héros", "Equipamento do Herói", "Kahraman Donanımı", "Gear Hero", "Снаряжение героя", "อุปกรณ์ฮีโร่", "عتاد البطل", "Equipo de Héroe", "French abbreviation 'ÉQP de Héros'; Portuguese abbreviation 'Equip. de Herói'. ES: seen inside the Mithril tooltip."],
   ["Mastery Forging", "專精鍛造", "마스터리 제작", "Meisterhaftes Schmieden", "Forge de Maîtrise", "M. em Forja", "Usta İşi Dövme", "Penempaan Mastery", "Мастерство кузнеца", "การปรับความเชี่ยวชาญ", "صقل التخصص", "Forja de Maestría", "Portuguese seen only abbreviated ('M. em Forja'); Thai from the Forgehammer text. Portuguese 'dom.' and Indonesian 'Mastery' are the short forms of Mastery. ES: seen inside the Forgehammer tooltip."],
   ["Enhancement XP", "強化經驗值", "—", "Verbesserungs-XP", "EXP d'Amélioration", "XP de Aprimoramento", "Geliştirme TP", "Enhancement XP", "опыт усиления", "XP การพัฒนา", "خبرة تحسين", "EXP de mejora", "Turkish 'TP' = experience points."],
   ["Mythic", "傳說", "레전드", "Mythisch", "Mythique", "Mítico", "Mitik", "Mythic", "Мифический", "ขั้นเทพ", "خيالي", "Mítico", "Chinese and Korean use 傳說 / 레전드 for Mythic."],
   ["Stat Bonuses", "屬性加成", "속성 버프", "Stat-Boni", "Bonus de Stats", "Bônus de Atributos", "Özellik Bonusları", "Bonus Stat", "Бонусы к показателям", "โบนัสสถานะ", "تعزيز السمات", "Bonificaciones de atributo"],
   ["Archer Attack", "弓兵攻擊力", "궁병 공격력", "Bogenschützen-Angriff", "Attaque de l'Arch.", "Ataque da Arquearia", "Okçu Saldırısı", "Serangan Pemanah", "Атака стрелков", "พลังโจมตีพลธนู", "هجوم الرماة", "Ataque de Arquero"],
   ["Archer Defense", "弓兵防禦力", "궁병 방어력", "Bogenschützen-Verteidigung", "Défense de l'Arch.", "Defesa da Arquearia", "Okçu Savunması", "Pertahanan Pemanah", "Защита стрелков", "พลังป้องกันพลธนู", "دفاع الرماة", "Defensa de Arquero"],
   ["Enhancement Cost", "強化消耗", "강화 소모", "Verbesserungskosten", "Coût d'Amélioration", "Custo de Melhoria", "Geliştirme Maliyeti", "Biaya Peningkatan", "Стоимость усиления", "สิ่งที่ใช้ในการพัฒนา", "تكلفة التحسين", "Costo de mejora"],
   ["Enhance", "強化", "강화", "Verbessern", "Améliorer", "Melhorar", "Geliştir", "Tingkatkan", "Усилить", "พัฒนา", "تحسين", "Mejorar", "Button. ES: Governor Gear button. Not confirmed for the hero 'Upgrade' button."],
   ["Gear Enhancement", "裝備強化", "장비 강화", "Ausrüstungsverbesserung", "Amélioration d'Équipement", "Aprimoramento do Equipamento", "Donanım Geliştirmesi", "Peningkatan Gear", "Усиление снаряжения", "การพัฒนาอุปกรณ์", "تحسين العتاد", "Mejora de equipo", "Tab of the Governor Gear screen."],
   ["Charm Upgrades", "寶石升級", "보석 레벨업", "Talisman-Verbesserungen", "Améliorations du Talisman", "Aprimoramentos de Acessório", "Tılsım Yükseltmeleri", "Upgrade Charm", "Улучшение талисманов", "การอัปเกรดเครื่องราง", "ترقيات التميمة", "Mejoras de talismanes", "Second tab of the Governor Gear screen."],
   ["Charm", "寶石", "보석", "Talisman", "Talisman", "Talismã", "Tılsım", "Charm", "талисман", "เครื่องราง", "التميمة", "Talismán", "Confirmed: 'Governor Charm' IS a real in-game term (see item tooltip 'A Governor Charm upgrade material'). Singular form taken from the 'Charm Upgrades' titles (Russian and Arabic show it in a plural or definite form). ES: tooltip says 'Talismán del Gobernador'."],
   ["Charm Design", "寶石圖紙", "보석 도면", "Talismanpläne", "Plans de Talisman", "Design do Talismã", "Tılsım Tasarımı", "Desain Charm", "Чертеж талисмана", "แผนเครื่องราง", "تصميم تميمة", "Planos de talismán"],
  ]
 },
 {
  "cat": "Desert Trial",
  "rows": [
   ["Desert Trial", "荒野的試煉", "황야의 시련", "Wüsten Prüfung", "Épreuve du Désert", "Provação do Deserto", "Bozkır İmtihanı", "Desert Trial", "Испытание пустыни", "บททดสอบทะเลทราย", "اختبار الصحراء", "Prueba del Desierto", "German writes it with a space ('Wüsten Prüfung'), as in the game. Chinese 荒野 also appears as Badland in the Viking rules. ES: seen in brackets inside the Clawshard tooltip."],
   ["Dreadwolf", "恐狼", "스케어 울프", "Höllenwolf", "Loup Redoutable", "Lobo Medonho", "Korkunç Kurt", "Netherfiend", "Ужасный волк", "หมาป่าสยองขวัญ", "الذئب المخيف", "Lobo Aterrador", "Indonesian text says [Netherfiend]. ES: seen in brackets inside the Clawshard tooltip."],
   ["Nightmare", "夢魘", "나이트메어", "—", "—", "—", "—", "—", "—", "—", "—", "—", "Seen only in the Chinese and Korean descriptions."]
  ]
 },
 {
  "cat": "Alliance Banner",
  "rows": [
   ["Alliance Banner", "聯盟旗幟", "연맹 깃발", "Allianzbanner", "Bannière d'Alliance", "Estandarte da Aliança", "İttifak Sancağı", "Spanduk Aliansi", "Стяг альянса", "ธงพันธมิตร", "لافتة التحالف", "Estandarte de alianza", "The Arabic screen is mirrored (right-to-left)."],
   ["Durability", "耐久度", "내구도", "Haltbarkeit", "Durabilité", "Durabilidade", "Sağlamlık", "Daya Tahan", "Прочность", "ความคงทน", "قوة التحمل", "Durabilidad"],
   ["Garrisoned Governor", "駐守指揮官", "방어 영주", "Besetzter Gouverneur", "Chef en Garnison", "Chefe com Guarnição", "Garnizondaki Şef", "Gubernur Berjaga", "Губернатор гарнизона", "ผู้นำทหารคุ้มกัน", "حامية الحاكم", "Gobernador guarnecido", "The word for garrison differs: Chinese 駐守, Korean 방어 (defense), German besetzt (occupied), Thai คุ้มกัน (guard). The Governor word also differs from other screens: Chinese 指揮官 (commander), French 'Chef', Portuguese 'Chefe', Turkish 'Şef'."],
   ["Not garrisoned", "未駐防", "미방어", "Nicht besetzt", "Pas en garnison", "Sem guarnição", "Garnizonda değil", "Tidak ditempati", "Без гарнизона", "ไม่ได้รับการคุ้มกัน", "غير حامية", "No guarnecido", "Orange text under the banner."],
   ["Defender Squad", "駐守部隊", "방어 부대", "Verteidigerschwadron", "Escouade défensive", "Esquadrão de Defesa", "Savunmacı Ekip", "Skuad Bertahan", "Защитные войска", "ทีมป้องกัน", "فرقة الدفاع", "Escuadrón Defensor", "Panel title."],
   ["No reinforcements to show", "暫無援軍", "지원군이 없습니다", "Keine Verstärkungen zum Anzeigen", "Aucun renfort à afficher", "Não há reforços para exibir", "Takviye birlikler yok", "Tidak ada bala bantuan untuk ditampilkan", "Нет подкреплений для просмотра", "ไม่มีกำลังเสริมให้แสดง", "لا توجد تعزيزات لإظهارها", "No hay refuerzos para mostrar"],
   ["Dispatch Troops", "派遣部隊", "부대 파견", "Schwadron entsenden", "Envoyer des Troupes", "Enviar Tropas", "Birlik Gönder", "Kirim Pasukan", "Отправить войска", "ส่งทีมออกไป", "إرسال القوات", "Enviar tropas"],
   ["Updates in", "…後更新", "…후 업데이트", "Updates in", "Mis à jour dans", "Atualizações em", "…sonra güncellenecek", "Diperbarui di", "Обновляется через:", "อัปเดตในอีก", "تحديثات في", "Se actualiza en", "The countdown timer sits next to it. German keeps the English words 'Updates in'; Chinese and Korean put the words after the time."]
  ]
 },
 {
  "cat": "Viking Vengeance",
  "rows": [
   ["Event details","活動詳細資訊","이벤트 상세정보","Eventdetails","Détails de l'Évènement","Detalhes do Evento","Etkinlik detayları","Detail acara","Информация о событии","รายละเอียดอีเวนต์","تفاصيل الفعالية","—"],
   ["Personal Ranking","個人排名","개인 랭킹","Persönlicher Rang","Classement Individuel","Classificação Individual","Kişisel Sıralama","Peringkat Pribadi","Личный рейтинг","อันดับส่วนบุคคล","التصنيف الشخصي","—"],
   ["Alliance Ranking","聯盟排名","연맹 랭킹","Allianzrang","Classement de l'Alliance","Classificação da Aliança","İttifak Sıralaması","Peringkat Aliansi","Рейтинг альянса","อันดับพันธมิตร","تصنيف التحالف","—"],
   ["Countdown to Event Start","活動開啟倒數計時","이벤트 시작 카운트다운","Countdown bis zum Beginn des Events","Compte à Rebours avant le Début de l'Évènement","Contagem Regressiva para o Início do Evento","Etkinlik Başlangıcı Geri Sayımı","Hitung Mundur untuk Memulai Acara","Отсчет до начала события","นับถอยหลังสู่การเริ่มอีเวนต์","العد التنازلي لبدء الفعالية","—"],
   ["Even more rewards","更多獎勵","더 많은 보상","Noch mehr Belohnungen","Encore plus de récompenses","Ainda mais recompensas","Daha da çok ödül","Lebih banyak hadiah","Еще больше наград","ยังมีรางวัลอีก","المزيد من المكافآت","—"],
   ["Only leaders and R4+ can enable","只有盟主和4階以上成員可以開啟","맹주와 4급 이상 연맹원만 오픈 가능","Nur Allianzanführer und Mitglieder mit einem R4-Rang oder höher können es aktivieren","Seuls les Leaders et les membres d'alliance de R4 ou plus peuvent activer ceci","Apenas os Líderes e membros de classificação R4 ou maior da Aliança podem habilitar","Sadece ittifak liderleri ve R4 veya üstü rütbeli üyeler etkinleştirebilir","Hanya ketua dan anggota aliansi dengan peringkat R4 atau lebih tinggi yang bisa mengaktifkan.","Включить могут только лидер альянса и участники с рангом R4 или выше","เฉพาะผู้นำพันธมิตรและสมาชิกพันธมิตรระดับ R4 ขึ้นไปเท่านั้นที่เปิดใช้งานได้","يمكن تمكين فقط قادة التحالف والأعضاء ذوي الرتب 4 أو أعلى","—","English: 'Only alliance leaders and members with R4 or higher ranks can enable'."],
   ["Town Center","城鎮中心","도시 센터","Stadtzentrum","Centre","Centro da Cidade","Şehir Merkezi","Tungku","центр города","ศูนย์กลางเมือง","مركز البلدة","—","French shows only 'Centre' (…Niv. 7) in the rules; Portuguese full form is 'Nível do Centro da Cidade'."],
   ["Viking Vengeance", "維京人的掠奪", "바이킹의 약탈", "Wikinger-Rache", "Vengeance Viking", "Vingança Viking", "Viking İntikamı", "Viking Vengeance", "Месть викингов", "การล้างแค้นของไวกิ้ง", "انتقام الفايكنغ", "—", "Chinese and Korean say 'plunder' (掠奪 / 약탈), the others say 'vengeance/revenge'. Indonesian keeps the English name."],
   ["Vikings", "維京掠奪者", "바이킹 약탈자", "Wikinger", "Vikings", "vikings", "Vikingler", "Viking", "викинги", "ไวกิ้ง", "الفايكنغ", "—", "Chinese also says 維京人. Indonesian rules also use 'penjahat' (villains) and 'Bandit'; Russian rule 5 says 'бандиты' (bandits); Thai rules say 'เหล่าไวกิง'."],
   ["Defense Points", "防守積分", "방어 포인트", "Verteidigungspunkte", "Points Défensifs", "Pontos de Defesa", "Savunma Puanları", "Poin Pertahanan", "очки защиты", "คะแนนการป้องกัน", "نقاط الدفاع", "—", "Personal / Alliance: 個人 / 聯盟, 개인 / 연맹, Persönlich / Allianz, Individuel / d'Alliance, pessoal / de aliança, Kişisel / İttifak, pribadi / Aliansi, личные / альянса, ส่วนบุคคล / พันธมิตร, الشخصية / التحالف."],
   ["Successful defense", "防守成功", "방어 성공", "erfolgreiche Verteidigung", "défense réussie", "defesa bem-sucedida", "savunmayı başarıya ulaştırır", "Pertahanan sukses", "успешно защититься", "การป้องกันนั้นสำเร็จ", "الدفاع ناجح", "—", "Seen inside sentences. The rule: killing 50% or more of the Vikings counts as a successful defense."],
   ["Reinforce allies", "增援盟友", "연맹원을 증원", "Verstärke Verbündete", "Renforce tes alliés", "Reforce os aliados", "müttefikleri güçlendir", "Perkuat sekutu", "Отправьте подкрепления союзникам", "ส่งกำลังเสริมให้กับพันธมิตร", "عزز الحلفاء", "—", "Seen inside sentences."],
   ["Kills", "擊殺", "처치", "Kills", "éliminations", "mortes", "öldürdüğün birim sayısı", "pembunuhan", "убийств", "การสังหาร", "القتلى", "—", "Seen inside sentences. Turkish literally says 'the number of units you killed'."],
   ["Event Rules", "活動規則", "이벤트 규칙", "Eventregeln", "Règles", "Regras do Evento", "Etkinlik Kuralları", "Aturan Event", "Правила события", "กติกาอีเวนต์", "قواعد الفعالية", "—", "Heading inside the Rules window (in brackets in most languages, none in Turkish). The English screenshot did not show it, so the English wording is a guess from the other languages."],
   ["Event difficulty", "活動難度", "이벤트 난이도", "Schwierigkeitsgrad des Events", "difficulté", "dificuldade do evento", "etkinlik zorluğu", "tingkat kesulitan Event", "сложность события", "ความยากของอีเวนต์", "صعوبة الفعالية", "—", "Seen inside sentences: chosen in Settings. The English screenshot was cut off before this line, so the English wording is a guess."],
   ["Alliance HQ", "聯盟總部", "연맹 본부", "Allianz-Hauptquartier", "QG d'Alliance", "QG da Aliança", "İttifak Karargahı", "markas aliansi", "штаб альянса", "ศูนย์บัญชาการพันธมิตร", "مقر التحالف", "—", "Seen inside sentences."],
   ["[Plains] HQ", "【平原】總部", "[평원] 본부", "[Ebenen]-Hauptquartier", "QG des [Plaines]", "QG das [Planícies]", "Çayır Karargahı", "markas [Plains]", "штаб на [равнинах]", "ศูนย์บัญชาการ [ที่ราบสูง]", "مقر [السهول]", "—", "The Vikings attack this one first. Turkish is inflected in the game text (Çayır Karargahına). Indonesian keeps English [Plains]."],
   ["[Badland] HQ", "【荒野】總部", "[황야] 본부", "[Badland]-Hauptquartier", "QG des [Bas-fonds]", "QG da [Terra Maligna]", "Çoraktoprak Karargahı", "markas [Badland]", "штаб в [дикой местности]", "ศูนย์บัญชาการ [ดินแดนกันดาร]", "مقر [أرض الشر]", "—", "Attacked if there is no Plains HQ. Chinese 荒野 is the same word as in Desert Trial (荒野的試煉). Indonesian keeps English [Badland]."]
  ]
 },
 {
  "cat": "Hero skills",
  "rows": [
   ["Expedition Skills", "遠征技能", "원정 스킬", "Expeditionsfähigkeiten", "Compétences d'Expédition", "habilidades de expedição", "Sefer Yetenekleri", "Skill Ekspedisi", "Навыки экспедиции", "—", "مهارات الحملة", "Habilidades de Expedición", "They take effect when heroes fight with their troops on the Wilderness map. Thai: the game's own Thai text is incomplete (the sentence starts without the term and ends with an unfinished 'ทักษะที่เกี่ยวข้องกับ…'), so no Thai term exists; only 'ทักษะ' (skill) appears. ES: seen inside the tooltip sentence."],
   ["Wilderness map", "野外地圖", "야외 맵", "Wildniskarte", "Carte de la Nature", "mapa da Região Selvagem", "Yaban haritası", "peta Wilderness", "карта глуши", "แผนที่แดนเถื่อน", "خريطة البرية", "mapa de las Áreas silvestres", "Seen inside a sentence. Indonesian keeps the English 'Wilderness'. ES: seen inside the Expedition tooltip."],
   ["Shield Strike", "劍盾猛攻", "검방패 맹공", "Schildschlag", "Frappe de Bouclier", "Ataque com Escudo", "Kalkanlı Darbe", "Shield Strike", "Удар щитом", "พิฆาตโล่", "ضربة الدرع", "Golpe de escudo", "Zoe's expedition skill."],
   ["Upgrade Preview", "升級預覽", "업그레이드 보기", "Upgrade-Vorschau", "Aperçu d'Amélioration", "Prever Aprimoramento", "Yükseltme Önizlemesi", "Pratinjau Upgrade", "Предпросмотр улучшения", "ตัวอย่างการอัปเกรด", "معاينة الترقية", "Vista previa de mejora", ""],
   ["Damage Up", "造成傷害提升", "가하는 피해 증가", "Schadens-Bonus", "Dégâts +", "Aumento de Dano", "Hasar Artışı", "Damage Naik", "Повышение урона", "ความเสียหายเพิ่มขึ้น", "رفع الضرر", "Aumento de Daño", ""],
   ["Enemy Damage Taken Up", "敵軍受到傷害提升", "적군이 받는 피해 증가", "Bonus für erlittenen feindlichen Schaden", "Dégâts Subis par l'Ennemi +", "Dano causado ao inimigo", "Düşmanın Aldığı Hasarın Artışı", "Damage yang Diterima Musuh Naik", "Пов. урона по противнику", "เพิ่มความเสียหายที่ศัตรูได้รับ", "الأضرار التي لحقت بالعدو", "Aumento de daño enemigo", "The Portuguese wording says 'damage caused to the enemy', which differs slightly in meaning."],
   ["Level maxed!", "已達最高等級", "이미 최고 레벨에 도달했습니다", "Maximales Level erreicht!", "Niveau max !", "Nível máximo atingido!", "Son seviyede!", "Tingkat maksimal!", "Максимальный уровень!", "มีเลเวลสูงสุดแล้ว", "الحد الأقصى للمستوى!", "¡Nivel máximo alcanzado!", ""]
  ]
 },
 {
  "cat": "Map",
  "rows": [
   ["Beasts", "野獸", "야수", "Bestien", "Bêtes", "Feras", "Hayvanlar", "binatang buas", "Звери", "สัตว์อสูร", "الوحوش", "Bestias", "Map hunting tab. Indonesian is lowercase in the game."],
   ["Terror", "巨獸", "괴수", "Terror", "Terreur", "Terror", "Dehşet", "Terror", "Ужас", "อสูรร้าย", "وحش عملاق", "Terror", "Map hunting tab (the second monster type)."],
   ["Bread", "麵包", "빵", "Brot", "Pain", "Pão", "Ekmek", "Roti", "Хлеб", "ขนมปัง", "الخبز", "Pan", "Map gathering tab."],
   ["Search", "搜索", "검색하기", "Suche", "Rechercher", "Procurar", "Ara", "Cari", "Поиск", "ค้นหา", "بحث", "Buscar", "Button on the map."],
   ["Auto Hunting", "自動狩獵", "자동 사냥", "Auto-Jagd", "Chasse Auto.", "Caçada Automática", "Otomatik Av", "Berburu Otomatis", "Автоохота", "การล่าอัตโนมัติ", "الصيد التلقائي", "—", "Button on the map."],
   ["Max opponent: Lv.28 Beasts", "最高可挑戰28級野獸", "최고 Lv.28 야수 도전 가능", "Maximaler Gegner: Lv.28 Bestien", "Adversaire max : Niv. 28 Bêtes", "Oponente máx.: Nv.28 Feras", "Maks rakip: Sv.28 Hayvanlar", "Lawan maksimal: Lv.28 binatang buas", "Макс. противник: Звери ур. 28", "คู่ต่อสู้สูงสุด: สัตว์อสูรเลเวล 28", "الحد الأقصى للخصم: المستوى 28 الوحوش", "—", "Sentence pattern under the level slider."],
   ["Hunting Trap 2", "狩獵陷阱2", "사냥 함정 2", "Jagdfalle 2", "Piège de Chasse 2", "Armadilha de Caça 2", "2. Av Tuzağı", "Perangkap Berburu 2", "2-я охотничья ловушка", "กับดักล่าสัตว์ 2", "فخ الصيد 2", "Trampa de caza 2", "Map label of the Bear Hunt trap."],
   ["On cooldown", "冷卻中", "쿨타임 중", "Cooldown läuft", "Se recharge", "Tempo de recarga", "Beklemede", "Saat cooldown", "Перезаряжается", "อยู่ระหว่างคูลดาวน์", "في هدنة", "En enfriamiento", "Label on the trap. Arabic shows 'في هدنة' (literally 'in a truce'); confirmed on two screenshots."],
   ["My City", "我的城鎮", "나의 도시", "Meine Stadt", "Ma Ville", "Minha Cidade", "Şehrim", "Permukiman saya", "Мой город", "ค่ายอพยพของฉัน", "مدينتي", "Mi Colonia"],
   ["More (march list)", "增加行軍隊伍", "행군 대열 추가", "Mehr", "Plus", "Mais", "Daha", "Lebih Banyak", "Добавить очередь марша", "เพิ่มเติม", "المزيد", "Más", "Zh, ko and ru say 'Add march queue' here; the others say 'More'."],
   ["Wood", "木材", "목재", "Holz", "Bois", "Madeira", "Odun", "Kayu", "Древесина", "ไม้", "خشب", "Madera", "Map gathering tab."],
   ["Stone", "石材", "석재", "Stein", "Pierre", "Pedra", "Taş", "Batu", "Камень", "หิน", "الحجر", "Piedra", "Map gathering tab."],
   ["Iron", "鐵礦", "철광", "Eisen", "Fer", "Ferro", "Demir", "Besi", "Железо", "แร่เหล็ก", "حديد", "Hierro", "Map gathering tab."],
   ["Great Mill", "大型磨坊", "대형 방앗간", "Große Mühle", "Grand Moulin", "Grande Moinho", "Büyük Değirmen", "Lumbung Besar", "Большая мельница", "โรงโม่ใหญ่", "طاحونة عظيمة", "Gran Molino", "Alliance resource building (bread). Full name from the Alliance mail; the map tab is cut off in most languages. Indonesian uses 'Lumbung' (granary), not 'mill'. ES regular tile: 'Molino inactivo de Nv. 8'."],
   ["Great Sawmill", "大型伐木場", "대형 벌목장", "Großes Sägewerk", "Grande Scierie", "Grande Serraria", "Büyük Odun Fabrikası", "Penggergajian Kayu Besar", "Большая лесопилка", "โรงเลื่อยใหญ่", "منشرة عظيمة", "Gran Aserradero", "Alliance resource building (wood). From the Alliance mail. ES regular tile: 'Aserradero inactivo de Nv. 6'."],
   ["Great Quarry", "大型採石場", "대형 채석장", "Großer Steinbruch", "Grande Carrière", "Grande Pedreira", "Büyük Taş Ocağı", "Tambang Batu Besar", "Большая каменоломня", "เหมืองหินใหญ่", "محجر عظيم", "Gran Cantera", "Alliance resource building (stone). From the Alliance mail. ES regular tile: 'Cantera inactiva de Nv. 7'."],
   ["Great Iron Mine", "大型鐵礦場", "대형 철광장", "Großes Eisenbergwerk", "Grande Mine de Fer", "Grande Mina de Ferro", "Büyük Demir Madeni", "Tambang Besi Besar", "Большой железный рудник", "เหมืองเหล็กใหญ่", "منجم حديد عظيم", "Gran Mina de hierro", "Alliance resource building (iron). Also confirmed from the Alliance mail (placed / demolished). ES regular tile: 'Mina de hierro inactiva de Nv. 7'."],
   ["Secured Alliance Node", "聯盟安全採集點", "연맹 안전 채집 포인트", "Allianzknoten", "Point d'Alliance Sécurisé", "Nó de Aliança Protegido", "Korumalı İttifak Toplama Noktası", "Node Aliansi Aman", "защищенный узел сбора альянса", "จุดพันธมิตรปลอดภัย", "نقطة تجميع تحالف مؤمنة", "Nodo de Recolección Segura de la Alianza", "Mail text after a Great building disappears ('…ready to place!'). German sentence reads 'Allianzknoten gesichert und bereit zum…'. Russian full text (opened mail): 'Вы можете разместить [защищенный узел сбора альянса]!' — lowercase inside brackets in the game. ES: full text from the opened mail; the mail preview shortens it to 'Nodo de alianza asegurado'."],
   ["Armory", "防具庫", "방어구 창고", "Waffenkammer", "Armurerie", "Arsenal", "Cephanelik", "Armory", "Оружейная", "คลังแสง", "مخزن الدروع", "Armería", "Alliance-controlled map building with levels. From the mail 'Lv. 2 Armory Controlled'. Level formats: 2級防具庫 / Lv.2 방어구 창고 / Lv. 2 Waffenkammer / Armurerie Niv. 2 / Arsenal Nv. 2 / Sv. 2 Cephanelik / Lv. 2 Armory / Оружейная ур. 2 / คลังแสงเลเวล 2 / مخزن الدروع م.2. Indonesian keeps the English 'Armory'. ES level format: 'Armería de nv. 2' (mail 'Controlado por Armería de nv. 2')."]
  ]
 },
{
  "cat": "Eternity's Reach",
  "rows": [
   ["Eternity's Reach","失落的遺跡","사라진 유적","Weiten der Ewigkeit","l'Éternité à Portée","Alcance da Eternidade","Sonsuzluğun Erişimi","Eternity's Reach","Предел бесконечности","ขอบเขตนิรันดร์","وصول الأبدية","—","Event name; tab icon shows a golden crown."],
   ["Explore the Eternity's Reach for strategic resource—Copper Ores!","探索失落的遺跡，取得極具戰略價值的銅礦石！","사라진 유적을 탐험하고, 전략적 가치가 높은 청동석을 획득하세요!","Erkunde Weiten der Ewigkeit nach strategischen Ressourcen – Kupfererzen!","Explore l'Éternité à Portée pour une ressource stratégique, les minerais de cuivre !","Explore o Alcance da Eternidade em busca de um recurso estratégico: Minérios de Cobre!","Stratejik kaynak olan Bakır Cevherleri için Sonsuzluğun Erişimi'ni keşfet!","Jelajahi Eternity's Reach untuk mendapatkan sumber daya strategis - Bijih Tembaga!","Исследуйте «Предел бесконечности» и отыщите очень важный ресурс — медную руду!","สำรวจขอบเขตนิรันดร์เพื่อรับทรัพยากรเชิงกลยุทธ์—แร่ทองแดง!","استكشف وصول الأبدية للموارد الاستراتيجية - خامات النحاس!","—"],
   ["Copper Ore","銅礦石","청동석","Kupfererz","Minerais de Cuivre","Minério de Cobre","Bakır Cevheri","Bijih Tembaga","медная руда","แร่ทองแดง","خامات النحاس","—"],
   ["Sign up and battle on the same day","當日報名，當日參戰","당일 신청, 당일 참전","Anmelden und am gleichen Tag in die Schlacht ziehen","S'inscrire et combattre le même jour","Inscreva-se e batalhe no mesmo dia","Aynı gün kaydol ve savaş","Daftar dan bertempurlah di hari yang sama","Зарегистрируйтесь и сражайтесь в тот же день","ลงทะเบียนและต่อสู้ในวันเดียวกัน","اشترك وقاتل في نفس اليوم","—"],
   ["Registration closes in","距離報名結束","신청 종료까지","Anmeldung endet in","Fin d'inscription dans","Registro acaba em","Kayıt bitişi:","Registrasi ditutup","До конца регистрации:","การลงทะเบียนจะปิดใน","سيُغلق التسجيل بعد","—"],
   ["Sign up now","立即報名","바로 신청","Jetzt anmelden","S'inscrire","Inscrever-se agora","Şimdi kaydol","Daftar Sekarang","Зарегистрироваться","ลงทะเบียนเดี๋ยวนี้","اشترك الآن","—","Main CTA button."],
   ["Overview (button)","說明","설명","Übersicht","Aperçu","Resumo","Özet","Ringkasan","Обзор","รายละเอียด","نظرة عامة","—","Side button that opens the info dialog."],
   ["Rewards (button)","獎勵","보상","Belohnungen","Récompenses","Recompensas","Ödüller","Hadiah","Награды","รางวัล","المكافآت","—","Side button; opens rewards preview."],
   ["Guide (button)","指南","가이드","Leitfaden","Guide","Guia","Kılavuz","Panduan","Руководство","คำแนะนำ","الدليل","—","Side button."],
   ["Historical Ranking","排名紀錄","지난 랭킹","Historischer Rang","Historique de Classement","Classificação Histórica","Tarihsel Sıralama","Riwayat Peringkat","Рейтинг за все время","อันดับประวัติศาสตร์","التصنيف التاريخي","—","Side button."],
   ["Overview (dialog tab)","基礎說明","기본 설명","Übersicht","Aperçu","Resumo","Özet","Ringkasan","Базовый обзор","ภาพรวม","نظرة عامة","—","English reuses the word 'Overview' for both the side button and this tab; German does the same."],
   ["Buildings (dialog tab)","建築介紹","건물 소개","Gebäude","Bâtiments","Construções","Binalar","Bangunan","О зданиях","สิ่งปลูกสร้าง","المباني","—"],
   ["Other (dialog tab)","其他","기타","Andere","Autre","Outros","Diğer","Lainnya","Другое","อื่นๆ","أخرى","Otros","ES: seen as the Backpack tab."],
   ["Lv. 1 Vein","1級礦脈","Lv.1 광맥","Lv. 1 Ader","Filon de Niv. 1","Veio Nv. 1","Sv. 1 Damar","Vein Lv. 1","Ур. 1 Жила","สายแร่เลเวล 1","عرق من المستوى 1","—"],
   ["Lv. 2 Vein","2級礦脈","Lv.2 광맥","Lv. 2 Ader","Filon de Niv. 2","Veio Nv. 2","Sv. 2 Damar","Vein Lv. 2","Ур. 2 Жила","สายแร่เลเวล 2","عرق من المستوى 2","—"],
   ["Lv. 3 Vein","3級礦脈","Lv.3 광맥","Lv. 3 Ader","Filon de Niv. 3","Veio Nv. 3","Sv. 3 Damar","Vein Lv. 3","Ур. 3 Жила","สายแร่เลเวล 3","عرق من المستوى 3","—"],
   ["Fracture Vein","不穩定礦脈","불안정한 광맥","Gebrochene Ader","Filon Fracturé","Veio Fraturado","Çatlak Damar","Fracture Vein","Прорыв жил","สายแร่ประทุ","العرق المتصدع","—","Higher-yield vein that appears intermittently."],
   ["Peak of Eternity","失落宮殿","사라진 궁전","Gipfel der Ewigkeit","Pic de l'Éternité","Pico da Eternidade","Sonsuzluğun Zirvesi","Peak of Eternity","Пик бесконечности","ยอดเขานิรันดร์","قمة الأبدية","—","Central contested building; occupation time earns Copper Ores."],
   ["Capacity","儲備量","저장량","Kapazität","Capacité","Capacidade","Kapasite","Kapasitas","Вместимость","ความจุ","السعة","—"],
   ["Speed","速度","속도","Geschwindigkeit","Vitesse","Velocidade","Hız","Kecepatan","Скорость","สปีด","السرعة","—","Resource gain rate, e.g. '+8/s'."],
   ["View Rewards","檢視獎勵","보상 보기","Belohnung ansehen","Voir Récompenses","Ver Recompensas","Ödülleri Gör","Lihat Hadiah","Обзор наград","ดูรางวัล","عرض المكافآت","—"],
   ["March Queue","常規行軍欄位","일반 행군 슬롯","Marschwarteschleife","File de Marche","Fila de Marcha","İntikal Sırası","Antrean Barisan","очередь марша","คิวเดินทัพ","طابور الزحف","—","'does not occupy your regular March Queue' — the squad sent to loot dropped ore doesn't use a normal march slot."],
   ["Advanced Teleporter","高級遷城","고급 도시 이전","Fortgeschrittene Umsiedlung","Téléportation Avancée","Teletransportador Avançado","Gelişmiş Işınlayıcı","Advanced Teleporter","продвинутый телепорт","ตัวช่วยย้ายถิ่นฐานขั้นสูง","الناقل المتقدم","Reubicación avanzada","Free relocation item usable inside the ruins. ES: same item as in the Backpack."],
   ["Cesares Guards","切薩雷守衛","체사레 수비병","Cesares Wächter","Gardes Césarès","Guardas Césares","Cesares Muhafızları","Cesares Guards","стражи цесарцев","ทหารยามซีซาเรส","حراس سيزاريس","—","Guards defending Lv.1–3 Veins; must be defeated to gather from them."]
  ]
 },
 {
  "cat": "KvK terms (screenshot confirmed, all 11 langs)",
  "rows": [
   ["Academy","學院","아카데미","Akademie","Académie","Academia","Akademi","Akademi","Университет","อาคาเดมี","الأكاديمية","Academia","俄文官方翻譯是「Университет」（大學），非「學院」，與其他語言不同，屬遊戲本身用詞差異。"],
   ["Truegold","黃金","순금","Echtgold","Or Véritable","Adamante","Hasaltın","Truegold","Аурум","ทรูโกลด์","الذهب الخالص","Adamantina","ES: Backpack Resources tooltip; the name means 'adamantine', not 'gold'."],
   ["Rare Hero Shard","稀有英雄碎片","레어 영웅 파편","Seltenes Helden-Fragment","Fragment de Héros Rare","Fragmento de Herói Raro","Ender Kahraman Parçası","Fragmen Hero Rare","редкий фрагмент героя","ชิ้นส่วนฮีโร่หายาก","شظية بطل نادر","Fragmento de Héroe Raro","ES: sentence shows 'Fragmento(s) de Héroe Raro(s)'."],
   ["Epic Hero Shard","史詩英雄碎片","에픽 영웅 파편","Episches Helden-Fragment","Fragment de Héros Épique","Fragmento de Herói Épico","Epik Kahraman Parçası","Fragmen Hero Epic","великий фрагмент героя","ชิ้นส่วนฮีโร่มหากาพย์","شظية بطل ملحمي","Fragmento de Héroe Épico","ES: sentence shows 'Fragmento(s) de Héroe Épico(s)'."],
   ["Mythic Hero Shard","傳說英雄碎片","레전드 영웅 파편","Mythisches Helden-Fragment","Fragment de Héros Mythique","Fragmento de Herói Mítico","Mitik Kahraman Parçası","Fragmen Hero Mythic","мифический фрагмент героя","ชิ้นส่วนฮีโร่ขั้นเทพ","شظية بطل خيالي","Fragmento de Héroe Mítico","英文 Mythic／中文「傳說」／韓文「레전드(Legend)」為官方用詞差異，非誤譯。 ES: seen inside a sentence (Mythic General Hero Shard tooltip)."],
   ["Hero Gear Forgehammer","英雄裝備鍛造錘","영웅 장비 제작 망치","Heldenausrüstung Schmiedehammer","Marteau de Forge d'Équipement Héros","Martelo de forja de Equipamento de Herói","Kahraman Donanımı Demirci Çekici","Forgehammer Gear Hero","кузнечный молот для снаряжения героев","ค้อนตีเหล็กอุปกรณ์ฮีโร่","مطرقة الحدادة لعتاد البطل","Martillo de Forja de Equipo de Héroe","ES: sentence shows 'Martillo(s) de Forja de Equipo de Héroe'."],
   ["Hero Shard","英雄碎片","영웅 파편","Helden-Fragment","Fragment de Héros","Fragmento de Herói","Kahraman Parçası","Fragmen Hero","фрагмент героя","ชิ้นส่วนฮีโร่","شظية بطل","Fragmento de Héroe","泛稱用法，從已驗證的 Rare/Epic/Mythic Hero Shard 三個等級版本共同字根抽出，非獨立截圖驗證。 ES: common root of Raro / Épico / Mítico."],
   ["Widget","零件","부속품","Element","Composant","Ferramenta","Alet","Widget","поделка","อุปกรณ์เสริม","جزء","Complemento","ES: 'Complemento(s) de cualquier Equipo Exclusivo de Héroe'."],
   ["Hero Exclusive Gear","英雄專屬裝備","영웅 전용 장비","Helden Exklusive Ausrüstung","Équipement Exclusif de Héros","Equipamento Exclusivo do Herói","Kahraman Özel Donanımı","Gear Ekslusif Hero","эксклюзивное снаряжение героя","อุปกรณ์พิเศษฮีโร่","عتاد البطل الحصري","Equipo Exclusivo de Héroe"],
   ["Pet advancement","寵物突破","펫 돌파","Begleittier-Förderungswert","avancement des animaux","pontuação de avanço do animal de estimação","Pet ilerletme puanı","kemajuan hewan peliharaan","улучшение питомца","ความก้าวหน้าสัตว์เลี้ยง","تقدم الحيوان الأليف","avance de mascota","ES: seen inside a sentence (lowercase)."],
   ["Advanced Taming Marks","高級馴化印記","고급 훈련 기록","Fortgeschrittene Zähmungszeichen","Marque de Dressage Avancée","Marca de Domesticação Avançada","Gelişmiş Evcilleştirme İşareti","Tanda Penjinakan Advanced","продвинутая метка приручения","ตราฝึกสัตว์ขั้นสูง","علامة ترويض متقدمة","Marcas de Domesticación Avanzadas"],
   ["Common Taming Marks","普通馴化印記","일반 훈련 기록","Gewöhnliche Zähmungszeichen","Marque de Dressage Commune","Marca de Domesticação Comum","Sıradan Evcilleştirme İşareti","Tanda Penjinakan Common","обычная метка приручения","ตราฝึกสัตว์ทั่วไป","علامة ترويض شائعة","Marcas de Domesticación Comunes"],
   ["War Academy","軍事學院","군사 학원","Militärakademie","Académie Militaire","Academia Militar","Askeri Akademi","Akademi Militer","Военная академия","สถาบันการทหาร","الأكاديمية العسكرية","—","⚠️ 暫定翻譯，尚未有截圖依據。與已驗證的 Academy（學院）是不同系統，日後需要截圖確認正式用詞。"],
   ["Truegold Dust","黃金研究粉塵","황금 연구 가루","Echtgold-Staub","Poussière d'Or Véritable","Pó de Ouro Verdadeiro","Gerçek Altın Tozu","Debu Truegold","Пыль истинного золота","ผงทองแท้","غبار الذهب الحقيقي","—","⚠️ 暫定翻譯，尚未有截圖依據。是研究用資源，與已驗證的 Truegold（黃金本體）不同，日後需要截圖確認正式用詞。"],
   ["Medical Satchels","醫療包","구급낭","Medizinbeutel","Sacoches Médicales","Bolsas Médicas","Tıbbi Çantalar","Tas Medis","Медицинские сумки","กระเป๋ายา","حقائب طبية","—","⚠️ 暫定翻譯，尚未有截圖依據，僅為求可讀性先行採用，日後需要截圖確認正式用詞。"],
   ["Rescue Orders","救援令","구조 명령서","Rettungsbefehle","Ordres de Secours","Ordens de Resgate","Kurtarma Emirleri","Perintah Penyelamatan","Приказы о спасении","คำสั่งช่วยเหลือ","أوامر الإنقاذ","—","⚠️ 暫定翻譯，尚未有截圖依據，僅為求可讀性先行採用，日後需要截圖確認正式用詞。"]
  ]
 },
];
