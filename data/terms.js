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
   ["Owned","持有數量","보유 수량","Im Besitz","Tu possèdes","Obtido","Stok","Dimiliki","Имеется","มีอยู่","مملوك","Tienes","Get More popups: ZH '目前擁有', KO '현재 보유'."],
   ["Go","前往瞭望塔","이동","Los","Aller","Ir","Git","Pergi","Вперед","ไป","انطلق","Ir","Chinese label is the longer '前往瞭望塔'; Get More / daily mission buttons say '前往'."],
   ["Tip","兌換提醒","교환 알림","Tipp","Conseil","Dica","Hatırlatıcı","Tip","Подсказка","แนะนำ","نصيحة","Consejo","Label on the Golden Glaives banner. Same label on the Hall of Heroes (Deals) screen."],
   ["Bread (Secured)","麵包（安全）","빵 (안전)","Brot (Geschützt)","Pains (sécurisés)","Pão (Protegido)","Ekmek (Korumalı)","Roti (Aman)","хлеба (под защитой)","ขนมปัง (ปลอดภัย)","خبز (مضمون)","—","Russian seen in genitive inside a sentence; base form is хлеб."],
  ]
 },
 {
  "cat": "Events",
  "rows": [
   ["Calendar","日曆","일정","—","—","Calendário","Takvim","Kalender","Календарь","ปฏิทิน","—","—"],
   ["Hero Roulette","英雄轉盤","영웅 룰렛","Helden Roulette","—","Roleta de Herói","Kahraman Ruleti","Rolet Hero","Геройская рулетка","รูเล็ตฮีโร่","روليت البطل","—"],
   ["Officer Project","—","—","Offiziersprojekt","Projet d'Officier","—","—","—","—","—","مسؤول المشروع","—"],
   ["Swordland Showdown", "聖劍爭奪", "성검 쟁탈", "Schwertland-Showdown", "Choc du Glaive", "Confronto entre Espadas", "Kılıçdiyarı Hesaplaşması", "Swordland Showdown", "Битва за Страну мечей", "ศึกดวลดินแดนดาบ", "مواجهة أرض السيوف", "Enfrentamiento en Tierra de espadas", "ES: calendar pop-up and rules text."],
   ["Swordland", "聖劍戰場", "성검 전장", "Schwertland", "Terres du Glaive", "Terra das Espadas", "Kılıçdiyarı", "Swordland", "Страна мечей", "ดินแดนดาบ", "أرض السيوف", "Tierra de espadas", "Portuguese shows both 'Terra das Espadas' and 'Terra da Espada' in the game. ES capitalisation varies: 'Tierra de Espadas' / 'Tierra de las espadas'."],
   ["Battlefield", "聖劍戰場", "성검 전장", "Schlachtfeld", "champ de bataille", "campo de batalha", "savaş alanı", "medan perang", "поле боя", "สนามรบ", "ساحة المعركة", "campo de batalla", "Seen inside sentences, not as a standalone label. ES: seen inside sentences."],
   ["Tier C", "評等：C", "등급: C", "Stufe: C", "Palier : C", "Categoria: C", "Kademe: C", "Tingkat: C", "Ступень: C", "ระดับ: C", "المستوى: C", "—"],
   ["Gold", "黃金", "골드", "Gold", "Or", "Ouro", "Altın", "Gold", "Золото", "ทอง", "الذهبي", "—"],
   ["Legion 1 / 2", "軍團1 / 軍團2", "군단 1 / 2", "Legion 1 / 2", "Légion 1 / Légion 2", "Legião 1 / Legião 2", "1. Lejyon / 2. Lejyon", "Legiun 1 / Legiun 2", "Легион 1 / Легион 2", "กองทัพ 1 / กองทัพ 2", "الكتيبة 1 / الكتيبة 2", "Legión 1 / Legión 2", "ES: '[Legión 1]' in the rules."],
   ["Battle Starts In", "戰鬥開始倒數計時", "전투 시작까지", "Schlacht beginnt in", "Début du Combat dans", "A batalha inicia em", "Savaş Başlangıcı", "Pertempuran Dimulai", "Битва начнётся через", "การต่อสู้จะเริ่มในอีก", "ستبدأ المعركة بعد", "—"],
   ["VS", "VS", "VS", "VS", "VS", "VS", "VS", "VS", "VS", "VS", "VS", "—"],
   ["Combatants", "參戰人員", "참전 인원", "Kämpfer", "Combattants", "Combatentes", "Savaşçılar", "Petarung", "Участники битвы", "ผู้ต่อสู้", "المقاتلين", "combatientes", "ES: seen inside sentences ('30 combatientes y 20 sustitutos')."],
   ["Substitutes", "替補名單", "후보", "Ersatzspieler", "remplaçants", "substitutos", "yedekler", "pengganti", "запасные", "ตัวสำรอง", "البدلاء", "sustitutos", "Seen inside sentences, not as a standalone label. ES: seen inside sentences; also 'suplente' once."],
   ["Alliance Brawl", "聯盟對決", "연맹 결투", "Allianz-Gemenge", "Rif d'Alliances", "Briga da Aliança", "İttifak Kavgası", "Brawl Aliansi", "Потасовка альянсов", "ศึกพันธมิตร", "عراك التحالفات", "—", "Event tab name."],
   ["Merchant Empire", "貿易復興", "무역 부흥", "Händlerimperium", "Empire Marchand", "Império Mercante", "Tüccar İmparatorluğu", "Kekaisaran Pedagang", "Торговая империя", "จักรวรรดิการค้า", "إمبراطورية التجارة", "—", "Event tab name."],
   ["UTC Time", "UTC時間", "UTC", "UTC Zeit", "Heure UTC", "Hora UTC", "UTC Saati", "Waktu UTC", "Время UTC", "เวลา UTC", "التوقيت العالمي", "Hora UTC", "Events screen header."],
   ["Starts in", "距離開始", "시작까지", "Beginnt in", "Commence dans", "Começa em", "Başlama", "Dimulai dalam", "Начнется через", "เริ่มใน", "يبدأ بعد", "El evento comienza en", "Event pop-up countdown. ES: Strongest Governor stage pop-up. ES calendar pop-up shortens it to 'Comienza en'."],
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
   ["Rules (dialog title)","規則說明","규칙 설명","Regeln","Règles","Regras","Kurallar","Aturan","Свод правил","กติกา","القواعد","Reglas","Chinese, Korean and Russian dialog titles differ from the 'Rules' tab label. ES from the Fishing Tournament screen."],
   ["Events", "常規活動", "이벤트", "Events", "Évènements", "Eventos", "Etkinlikler", "Event", "События", "อีเวนต์", "الفعاليات", "Evento", "ES: city-screen icon label and the Events screen title."],
   ["Guide", "指南", "가이드", "Leitfaden", "Guide", "Guia", "Kılavuz", "Panduan", "Руководство", "คำแนะนำ", "الدليل", "—"],
   ["Rules", "規則", "규칙", "Regeln", "Règles", "Regras", "Kurallar", "Aturan", "Правила", "กติกา", "القواعد", "Reglas", "The window title differs in some languages (e.g. 規則說明, 규칙 설명, Свод правил)."],
   ["Buildings", "建築介紹", "건물 소개", "Gebäude", "Bâtiments", "Construções", "Binalar", "Bangunan", "О зданиях", "สิ่งปลูกสร้าง", "المباني", "Edificios", "ES: Swordland rules window tab."],
   ["Rewards", "獎勵", "보상", "Belohnungen", "Récompenses", "Recompensas", "Ödüller", "Hadiah", "Награды", "รางวัล", "المكافآت", "Recompensas", "ES: Swordland rules window tab."],
   ["Other", "其他", "기타", "Andere", "Autre", "Outros", "Diğer", "Lainnya", "Другое", "อื่นๆ", "أخرى", "Otros", "ES: Backpack tab."],
   ["First Control", "首次控制", "첫 점령", "Erste Eroberung", "Premier Contrôle", "Primeiro Controle", "İlk Kontrol", "Penguasaan Pertama", "Захват (1)", "การควบคุมครั้งแรก", "التحكم الأول", "Primer control", "—"],
   ["Ongoing Occupation", "持續佔領", "지속 점령", "Fortwährende Besatzung", "Occupation en Cours", "Ocupação Contínua", "Süren İşgal", "Pendudukan Berlangsung", "Длит. удерж.", "การยึดครองที่ยังคงดำเนินอยู่", "الاحتلال المستمر", "Ocupación en curso", "—"],
   ["Bonus Effect", "額外效果", "추가 효과", "Bonuseffekte", "Effet Bonus", "Efeito Bônus", "Bonus Etki", "Efek Bonus", "Бонусный эффект", "เอฟเฟกต์โบนัส", "تأثير المكافأة", "Efecto de Bonificación", "—"],
   ["/m (per minute)", "/分鐘", "/분", "/M", "/m", "/m", "/dk", "/m", "/мин.", "/น.", "/د", "/m", "—"],
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
   ["Relic Points", "聖契積分", "성스러운 계약 포인트", "Reliktpunkte", "Points de Relique", "Pontos de Relíquia", "Yadigâr Puanı", "Poin Relik", "Очки реликвий", "คะแนนวัตถุโบราณ", "نقاط الآثار", "Puntos de Reliquia", "ES rules once write 'Puntos de reliquias'."],
   ["Alliance Relic Points", "聯盟聖契積分", "연맹 성스러운 계약 포인트", "Allianz-Reliktpunkte", "Points de Relique d'Alliance", "Pontos de Relíquia da Aliança", "İttifak Yadigâr Puanı", "Poin Relik Aliansi", "Очки реликвий альянса", "คะแนนวัตถุโบราณพันธมิตร", "نقاط الآثار للتحالف", "Puntos de Reliquia de Alianza", "ES building table: 'Puntos de Reliquia de alianza'."],
   ["Personal Relic Points", "個人聖契積分", "개인 성스러운 계약 포인트", "Persönliche Reliktpunkte", "Points de Relique Individuels", "Pontos de Relíquia Individuais", "Kişisel Yadigâr Puanı", "Poin Relik Pribadi", "Личные очки реликвий", "คะแนนวัตถุโบราณส่วนบุคคล", "نقاط الآثار الشخصية", "Puntos de Reliquia personales", "ES rules text: '[Puntos de Reliquia Personales]'."],
   ["Defender's Relic Points", "防守聖契積分", "방어 측 성스러운 계약 포인트", "Reliktpunkte der Verteidigung", "Points de Relique du défenseur", "Pontos de Relíquia de Defesa", "Savunmacı Yadigâr Puanı", "Poin Relik Pertahanan", "очки реликвий защиты", "คะแนนวัตถุโบราณของผู้ป้องกัน", "نقاط الآثار الدفاعي", "—", "Derived from an explanatory sentence; not a full standalone label in the game."],
   ["Arsenal Supplies", "輜重", "군수 물자", "Frachtzugvorräte", "Provisions de Train de bagages", "Suprimentos de Trem de Bagagem", "Bagaj Treni Malzemeleri", "Suplai Kereta Bagasi", "военные запасы", "เสบียงขบวนสัมภาระ", "إمدادات أمتعة القطار", "—", "The points scattered when a building changes hands."],
   ["Gems", "鑽石", "다이아", "Edelsteine", "Gemmes", "Gemas", "Elmas", "Permata", "Алмазы", "เพชร", "الجواهر", "Gemas", "Backpack Resources tab, '1 Gems' item. ZH 鑽石 (not 寶石 = Charm). KO 다이아. AR seen as '1 من الجواهر'. RU title 'Алмазы (1)'. TH counter word: เพชร 1 เม็ด."]
  ]
 },
 {
  "cat": "Buildings",
  "rows": [
   ["Guard Station","防衛所","방위소","Wachposten","Poste de Garde","Estação de Guarda","Muhafız İstasyonu","Pos Penjaga","Крепостная стена","สถานีคุ้มกัน","محطة الحراسة","Estación de Guardia","Russian shows 'Крепостная стена' (fortress wall). The building whose buttons are Details / Upgrade / City Defense."],
   ["City Defense","城鎮防禦","도시 방어","Stadtverteidigung","Défense de la Ville","Defesa da Cidade","Şehir Savunması","Pertahanan Kota","Защита города","การป้องกันของค่ายอพยพ","الدفاع عن المدينة","Defensa de la Colonia","Button on the Guard Station."],
   ["Swordshrine", "聖劍祭壇", "성검 제단", "Schwertschrein", "Tombeau du Glaive", "Templo da Espada", "Kılıç Altarı", "Swordshrine", "Святилище меча", "วิหารดาบ", "ضريح السيوف", "Ermita de la Espada", "—"],
   ["Sanctum", "聖所", "성소", "Heiligtum", "Sanctuaire", "Santuário", "Tapınak", "Sanctum", "святилище", "วิหารศักดิ์สิทธิ์", "مزار", "Santuario", "ES: same word as Sanctuary (遺跡) in the Sanctuary Battle."],
   ["Northwest Sanctum", "西北聖所", "북서 성소", "Nordwestliches Heiligtum", "Sanctuaire Nord-Ouest", "Santuário do Noroeste", "Kuzeybatı Tapınağı", "Sanctum Barat Laut", "Северо-западное святилище", "วิหารศักดิ์สิทธิ์ตะวันตกเฉียงเหนือ", "مزار الشمالي الغربي", "Santuario del Noroeste", "—"],
   ["Southeast Sanctum", "東南聖所", "남동 성소", "Südwestliches Heiligtum", "Sanctuaire Sud-Est", "Santuário do Sudeste", "Güneydoğu Tapınağı", "Sanctum Tenggara", "Юго-восточное святилище", "วิหารศักดิ์สิทธิ์ตะวันออกเฉียงใต้", "مزار الجنوبي الشرقي", "Santuario del Sureste", "The German game text says 'Südwestliches' (southwest) — a mistake in the game's own translation."],
   ["Abbey (1–4)", "修道院 (一~四號)", "수도원 (제1~제4)", "Abtei (1–4)", "Abbaye (1–4)", "Abadia (1–4)", "Manastır (1–4)", "Biara (1–4)", "Монастырь (1–4)", "อาราม (1–4)", "دير (1–4)", "Abadía (1–4)", "—"],
   ["Hall of Reformation", "教化大廳", "교화의 홀", "Reformationshalle", "Salle des Réformes", "Salão da Reforma", "Devrim Salonu", "Aula Reformasi", "Зал искупления", "หอปฏิรูป", "قاعة الإصلاح", "Salón de la Reforma", "—"],
   ["Belltower", "鐘塔", "시계탑", "Glockenturm", "Clocher", "Torre do Sino", "Çan Kulesi", "Menara Lonceng", "Колокольня", "หอระฆัง", "برج الجرس", "Campanario", "—"],
   ["Royal Stables", "馬廄", "마구간", "Königliche Ställe", "Écuries Royales", "Estábulos da Realeza", "Kraliyet Ahırları", "Kandang Kuda Kerajaan", "Королевский конный двор", "คอกม้าหลวง", "الاسطبلات الملكية", "Establos Reales", "—"],
   ["Mercenary Camp", "傭兵駐地", "용병 주둔지", "Söldnerlager", "Camp de Mercenaires", "Acampamento Mercenário", "Paralı Asker Kampı", "Kamp Tentara Bayaran", "Лагерь наемников", "ค่ายทหารรับจ้าง", "معسكر المرتزقة", "Campamento de Mercenarios", "—"],
   ["Undercellar", "隱蔽地窖", "땅굴", "Untergewölbe", "Caves", "Porões", "Gizli Mahzenler", "Undercellar", "подземелья", "ห้องใต้ดินลับ", "الأقبية السفلية", "Bodegas subterráneas", "Seen in sentences, usually plural. ES: seen in the phase rules, plural."],
   ["Drill Camp", "特訓營地", "특훈 병영", "Drillcamp", "Camp d'Entraînement", "Acampamento de Treinamento", "Tatbikat Kampı", "Pelatihan Bor", "учебный лагерь", "ค่ายฝึก", "معسكر التدريبات", "Campamento de entrenamiento", "ES: Heroes list button."],
   ["Town Center", "城鎮中心", "도시 센터", "Stadtzentrum", "Centre", "Centro da Cidade", "Şehir Merkezi", "Pusat Kota", "центр города", "ศูนย์กลางเมือง", "مركز البلدة", "Centro de pueblo", "Wording varies by screen: French 'Centre' (Viking rules) vs 'Centre-Ville' (Forgehammer text); Portuguese 'Centro' (abbreviated, Forgehammer) vs 'Nível do Centro da Cidade' (Viking rules); Indonesian 'Pusat Kota' (Forgehammer) but 'Level Tungku' in the Viking Vengeance rules (Tungku = furnace). ES building nameplate: 'Centro de pueblo Nv. 30'. The same screen's attribute panel and the Forgehammer tooltip say 'Centro Urbano'; Swordland rules say 'Centro de Pueblo'."]
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
   ["Rally", "集結", "집결", "Rally", "Ralliement", "Rally", "Seferberlik", "Reli", "Рейд", "ทีมระดมพล", "الحشد", "Ataque Conjunto", "Confirmed from the rally button in the Bear Hunt screen. ES: Terror pop-up button and the War screen tab ('Guerra' → 'Ataque Conjunto')."],
   ["Advanced Teleporter", "高級遷城", "고급 도시 이전", "Fortgeschrittene Umsiedlung", "Relocalisation Avancée", "Teletransportador Avançado", "Gelişmiş Işınlayıcı", "Teleporter Lanjutan", "Продвинутый телепорт", "การย้ายถิ่นฐานขั้นสูง", "ناقل متقدم", "Reubicación avanzada", "The item in the Backpack. ES Swordland rules call it '[Teletransportador Avanzado]' (plural 'Teletransportadores Avanzados')."],
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
   ["Raging Bear", "暴怒巨熊", "분노한 곰", "Wütender Bär", "Ours Enragé", "Urso Furioso", "Öfkeli Ayı", "Raging Bear", "свирепый медведь", "หมีคลั่ง", "الدب الهائج", "Oso Enfurecido", "Shown in green brackets in the event text. German text shows the accusative 'Wütenden Bären'. French shows 'l'Ours Enragé' in the event text. Russian text shows the accusative 'свирепого медведя'. Turkish text shows 'Öfkeli Ayı'yı' (with the accusative suffix). Indonesian keeps English 'Raging Bear'. Valora skill Dance of the Hunt: KO '분노한 자이언트 베어', PT 'Urso Feroz'."],
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
   ["Rewards (preview bar)", "獎勵預覽", "보상 미리보기", "Belohnungen", "Récompenses", "Recompensas", "Ödüller", "Hadiah", "Предпросмотр наград", "รางวัล", "المكافآت", "Recompensas", "Bar on the Strongest Governor screen. English shows only 'Rewards'. ES from the Fishing Tournament screen."]
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
   ["Enhancement XP", "強化經驗值", "강화 경험치", "Verbesserungs-XP", "EXP d'Amélioration", "XP de Aprimoramento", "Geliştirme TP", "Enhancement XP", "опыт усиления", "XP การพัฒนา", "خبرة تحسين", "EXP de mejora", "Turkish 'TP' = experience points. KO from the 100 Enhancement XP Part tooltip ('영웅 장비 강화 경험치')."],
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
   ["Countdown to Event Start","活動開啟倒數計時","이벤트 시작 카운트다운","Countdown bis zum Beginn des Events","Compte à Rebours avant le Début de l'Évènement","Contagem Regressiva para o Início do Evento","Etkinlik Başlangıcı Geri Sayımı","Hitung Mundur untuk Memulai Acara","Отсчет до начала события","นับถอยหลังสู่การเริ่มอีเวนต์","العد التنازلي لبدء الفعالية","Cuenta regresiva para el inicio del evento","ES from the Fishing Tournament screen."],
   ["Even more rewards","更多獎勵","더 많은 보상","Noch mehr Belohnungen","Encore plus de récompenses","Ainda mais recompensas","Daha da çok ödül","Lebih banyak hadiah","Еще больше наград","ยังมีรางวัลอีก","المزيد من المكافآت","—"],
   ["Only leaders and R4+ can enable","只有盟主和4階以上成員可以開啟","맹주와 4급 이상 연맹원만 오픈 가능","Nur Allianzanführer und Mitglieder mit einem R4-Rang oder höher können es aktivieren","Seuls les Leaders et les membres d'alliance de R4 ou plus peuvent activer ceci","Apenas os Líderes e membros de classificação R4 ou maior da Aliança podem habilitar","Sadece ittifak liderleri ve R4 veya üstü rütbeli üyeler etkinleştirebilir","Hanya ketua dan anggota aliansi dengan peringkat R4 atau lebih tinggi yang bisa mengaktifkan.","Включить могут только лидер альянса и участники с рангом R4 или выше","เฉพาะผู้นำพันธมิตรและสมาชิกพันธมิตรระดับ R4 ขึ้นไปเท่านั้นที่เปิดใช้งานได้","يمكن تمكين فقط قادة التحالف والأعضاء ذوي الرتب 4 أو أعلى","—","English: 'Only alliance leaders and members with R4 or higher ranks can enable'."],
   ["Town Center","城鎮中心","도시 센터","Stadtzentrum","Centre","Centro da Cidade","Şehir Merkezi","Tungku","центр города","ศูนย์กลางเมือง","مركز البلدة","Centro de pueblo","French shows only 'Centre' (…Niv. 7) in the rules; Portuguese full form is 'Nível do Centro da Cidade'. ES building nameplate: 'Centro de pueblo Nv. 30'. The same screen's attribute panel and the Forgehammer tooltip say 'Centro Urbano'; Swordland rules say 'Centro de Pueblo'."],
   ["Viking Vengeance", "維京人的掠奪", "바이킹의 약탈", "Wikinger-Rache", "Vengeance Viking", "Vingança Viking", "Viking İntikamı", "Viking Vengeance", "Месть викингов", "การล้างแค้นของไวกิ้ง", "انتقام الفايكنغ", "—", "Chinese and Korean say 'plunder' (掠奪 / 약탈), the others say 'vengeance/revenge'. Indonesian keeps the English name."],
   ["Vikings", "維京掠奪者", "바이킹 약탈자", "Wikinger", "Vikings", "vikings", "Vikingler", "Viking", "викинги", "ไวกิ้ง", "الفايكنغ", "—", "Chinese also says 維京人. Indonesian rules also use 'penjahat' (villains) and 'Bandit'; Russian rule 5 says 'бандиты' (bandits); Thai rules say 'เหล่าไวกิง'."],
   ["Defense Points", "防守積分", "방어 포인트", "Verteidigungspunkte", "Points Défensifs", "Pontos de Defesa", "Savunma Puanları", "Poin Pertahanan", "очки защиты", "คะแนนการป้องกัน", "نقاط الدفاع", "—", "Personal / Alliance: 個人 / 聯盟, 개인 / 연맹, Persönlich / Allianz, Individuel / d'Alliance, pessoal / de aliança, Kişisel / İttifak, pribadi / Aliansi, личные / альянса, ส่วนบุคคล / พันธมิตร, الشخصية / التحالف."],
   ["Successful defense", "防守成功", "방어 성공", "erfolgreiche Verteidigung", "défense réussie", "defesa bem-sucedida", "savunmayı başarıya ulaştırır", "Pertahanan sukses", "успешно защититься", "การป้องกันนั้นสำเร็จ", "الدفاع ناجح", "—", "Seen inside sentences. The rule: killing 50% or more of the Vikings counts as a successful defense."],
   ["Reinforce allies", "增援盟友", "연맹원을 증원", "Verstärke Verbündete", "Renforce tes alliés", "Reforce os aliados", "müttefikleri güçlendir", "Perkuat sekutu", "Отправьте подкрепления союзникам", "ส่งกำลังเสริมให้กับพันธมิตร", "عزز الحلفاء", "—", "Seen inside sentences."],
   ["Kills", "擊殺", "처치", "Kills", "éliminations", "mortes", "öldürdüğün birim sayısı", "pembunuhan", "убийств", "การสังหาร", "القتلى", "—", "Seen inside sentences. Turkish literally says 'the number of units you killed'."],
   ["Event Rules", "活動規則", "이벤트 규칙", "Eventregeln", "Règles", "Regras do Evento", "Etkinlik Kuralları", "Aturan Event", "Правила события", "กติกาอีเวนต์", "قواعد الفعالية", "Reglas del evento", "Heading inside the Rules window (in brackets in most languages, none in Turkish). The English screenshot did not show it, so the English wording is a guess from the other languages. ES from the Fishing Tournament screen."],
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
   ["Mill", "磨坊", "방앗간", "Mühle", "Moulin", "Moinho", "Değirmen", "Lumbung", "Мельница", "โรงโม่", "طاحونة", "Molino", "Regular (non-Great) gathering tile on the map; values match GLOSSARY 'mill'. ES from the tile pop-up 'Molino inactivo de Nv. 8'."],
   ["Sawmill", "伐木場", "벌목장", "Sägewerk", "Scierie", "Serraria", "Odun Fabrikası", "Penggergajian Kayu", "Лесопилка", "โรงเลื่อย", "منشرة", "Aserradero", "Regular (non-Great) gathering tile on the map; values match GLOSSARY 'sawmill'. ES from the tile pop-up 'Aserradero inactivo de Nv. 6'."],
   ["Iron Mine", "鐵礦場", "철광장", "Eisenbergwerk", "Mine de Fer", "Mina de Ferro", "Demir Madeni", "Tambang Besi", "Железный рудник", "เหมืองเหล็ก", "منجم حديد", "Mina de hierro", "Regular (non-Great) gathering tile on the map; values match GLOSSARY 'ironMine'. ES from the tile pop-up 'Mina de hierro inactiva de Nv. 7'."],
   ["Quarry", "採石場", "채석장", "Steinbruch", "Carrière", "Pedreira", "Taş Ocağı", "Tambang Batu", "Каменоломня", "เหมืองหิน", "محجر", "Cantera", "Regular (non-Great) gathering tile on the map; values match GLOSSARY 'quarry'. ES from the tile pop-up 'Cantera inactiva de Nv. 7'."],
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
   ["War Academy","戰爭學院","전쟁 아카데미","Kriegsakademie","Académie de Guerre","Academia de Guerra","Savaş Akademisi","Akademi Perang","Военная академия","วิทยาลัยสงคราม","أكاديمية الحرب","Academia de Guerra","Confirmed in the Mystic Trial Knowledge Nexus text (replaces the earlier ⚠️暫定 values). TH spells Academy 'อคาเดมี' there (Academy row: 'อาคาเดมี'). PT text says 'Técnicos da Academia' (technicians) — a game typo for tech. TR text omits 'tech'."],
   ["Truegold Dust","黃金研究粉塵","황금 연구 가루","Echtgold-Staub","Poussière d'Or Véritable","Pó de Ouro Verdadeiro","Gerçek Altın Tozu","Debu Truegold","Пыль истинного золота","ผงทองแท้","غبار الذهب الحقيقي","—","⚠️ 暫定翻譯，尚未有截圖依據。是研究用資源，與已驗證的 Truegold（黃金本體）不同，日後需要截圖確認正式用詞。"],
   ["Medical Satchels","醫療包","구급낭","Medizinbeutel","Sacoches Médicales","Bolsas Médicas","Tıbbi Çantalar","Tas Medis","Медицинские сумки","กระเป๋ายา","حقائب طبية","—","⚠️ 暫定翻譯，尚未有截圖依據，僅為求可讀性先行採用，日後需要截圖確認正式用詞。"],
   ["Rescue Orders","救援令","구조 명령서","Rettungsbefehle","Ordres de Secours","Ordens de Resgate","Kurtarma Emirleri","Perintah Penyelamatan","Приказы о спасении","คำสั่งช่วยเหลือ","أوامر الإنقاذ","—","⚠️ 暫定翻譯，尚未有截圖依據，僅為求可讀性先行採用，日後需要截圖確認正式用詞。"]
  ]
 },
 {
  "cat": "Fishing Tournament",
  "rows": [
   ["Fishing Tournament", "釣魚大賽", "낚시 선수권 대회", "Fischerturnier", "Tournoi de Pêche", "Torneio de Pesca", "Balık Avı Turnuvası", "Turnamen Memancing", "Рыболовный турнир", "ทัวร์นาเมนต์ตกปลา", "مسابقة الصيد", "Torneo de Pesca", "Event name. Tagline: 'Time to reel in the fun!' / '拋出魚竿，享受釣魚的快樂吧！'. KO body text shortens it to '낚시 대회'. AR body text: 'مسابقة صيد الأسماك'."],
   ["Guide (Fishing tab)", "圖鑑", "도감", "Leitfaden", "Guide", "Guia", "Kılavuz", "Panduan", "Руководство", "คำแนะนำ", "الدليل", "Guía", "Second tab of the Fishing Tournament (book icon). NOT the same as Interface 'Guide' (指南). TR body text once says 'Rehber'."],
   ["Trial Stages", "體驗關卡", "체험하기", "Prüfungsstufen", "Niveaux d'Essai", "Estágios das Provações", "Deneme Aşamaları", "Tahap Percobaan", "Пробные этапы", "ด่านบททดสอบ", "المراحل التجريبية", "Etapas de prueba", "Main button."],
   ["Fishing Techniques", "釣魚技巧", "낚시 스킬", "Fischtechniken", "Techniques de Pêche", "Técnicas de Pesca", "Balık Avı Teknikleri", "Teknik Memancing", "Рыбацкие техники", "เทคนิคการตกปลา", "تقنيات الصيد", "Técnicas de pesca", "First tab of the Rules window (the second is 'Event Rules' / 活動規則)."],
   ["Tokens and Points", "紀念幣與積分", "기념 코인과 포인트", "Token und Punkte", "Les Jetons & les Points", "Tokens e Pontos", "Jetonlar ve Puanlar", "Token dan Poin", "Жетоны и очки", "เหรียญและคะแนน", "الرموز والنقاط", "Fichas y Puntos", "Rules section heading."],
   ["Fishing Points", "釣魚積分", "낚시 포인트", "Fischer-Punkte", "Points de Pêche", "Pontos de Pesca", "Balık Avı Puanı", "Poin Memancing", "очки рыбалки", "คะแนนตกปลา", "نقاط الصيد", "Puntos de Pesca", "DE also writes 'Fischerpunkte'. FR often shortens to '[Points]'. RU lowercase in brackets: [очки рыбалки]."],
   ["Fishing Tokens", "釣魚紀念幣", "낚시 기념 코인", "Fischer-Token", "Jetons de Pêche", "Tokens de Pesca", "Balık Avı Jetonu", "Token Memancing", "жетоны рыбалки", "เหรียญตกปลา", "رموز الصيد", "Fichas de Pesca", "Every 10 unused Tokens become 10K resources after the event. FR often shortens to '[Jetons]'. RU lowercase in brackets: [жетоны рыбалки]."],
   ["Fishing Guild", "釣魚俱樂部", "낚시 클럽", "Fischergilde", "Guilde de Pêche", "Guilda de Pesca", "Balık Avı Loncası", "Guild Memancing", "Гильдия рыбаков", "กิลด์ตกปลา", "نادي صيد الأسماك", "Gremio de Pesca", "DE rule 2 says only 'Club-Belohnungen'. AR rule 2 says only 'مكافآت النادي'. TR rule 2 says only 'Kulüp ödülleri'. PT rule 2 says 'recompensas de Clube'; PT Power Cast says 'Clã de Pesca'. ES rule 2 says 'recompensas del Club'. ID rule 2 says 'hadiah Klub'. TH rule 2 says 'รางวัลชมรม'."],
   ["Master Fisher Leaderboard", "釣魚大師榜", "낚시 마스터 랭킹", "Meisterfischer-Bestenliste", "Classement Maître Pêcheur", "Placar de Mestre da Pesca", "Usta Balıkçı Liderlik Tablosu", "Leaderboard Master Fisher", "Таблица лидеров «Мастер-рыбак»", "กระดานผู้นำเซียนตกปลา", "لوحة صدارة خبراء الصيد", "Clasificación de Pescador Maestro", "—"],
   ["Fishing Kit", "漁具", "낚시 도구", "Angelausrüstung", "Kit", "Kit de Pesca", "Balık Avı Kiti", "Peralatan Memancing", "рыболовный набор", "อุปกรณ์ตกปลา", "أدوات الصيد", "Equipo de Pesca", "Chinese 'Fishing Kit upgrades' = 漁具養成. DE is inconsistent: also 'Fischer-Kit' and 'Anglerausrüstung'. ES heading uses 'kit de pesca'."],
   ["Kit Enhancement", "漁具強化", "낚시 도구 강화", "Kit-Verbesserung", "Amélioration de Kit", "Kit de Aprimoramento", "Kit Geliştirme", "Peningkatan Perlengkapan", "Улучшение набора", "การพัฒนาอุปกรณ์", "تعزيز معدات الصيد", "Mejora de kit de pesca", "Rules section heading."],
   ["Line", "魚線", "낚싯줄", "Schnur", "Ligne", "Linha", "Misina", "Tali pancing", "Леска", "สายเบ็ด", "الخيط", "Sedal", "Fishing Kit part: max depth."],
   ["Hook", "魚鉤", "낚싯바늘", "Haken", "Hameçon", "Anzol", "Kanca", "Pengait", "Крючок", "ตะขอเบ็ด", "الصنارة", "Anzuelo", "Fishing Kit part: fish per attempt."],
   ["Sinker", "魚墜", "낚시추", "Senkblei", "Plomb", "Chumbada", "Kurşun", "Pemberat", "Грузило", "ตะกั่วถ่วง", "الثقال", "Plomo", "Fishing Kit part: starting depth. AR stage rule 3 says 'الثقالة'. ID stage rule 3 keeps English 'sinker'."],
   ["Sunken Treasure Hunt", "深海尋寶", "심해 보물찾기", "Versunkene Schatzsuche", "Chasse au Trésor Immergé", "Caça ao Tesouro Submerso", "Batık Hazine Avı", "Harta Karun Tenggelam", "Охота за сокровищами", "เกมล่าสมบัติใต้น้ำแข็ง", "البحث عن الكنوز المغمورة", "Búsqueda del tesoro hundido", "FR plural in text: 'Chasses aux Trésors Immergés'. RU heading omits 'sunken'; body text: 'охота за затонувшим сокровищем'. TH heading literally says 'under the ice'; TH Tokens rule 3 says 'ล่าสมบัติใต้ทะเล' (under the sea)."],
   ["Fishing Stage", "釣魚關卡", "낚시 스테이지", "Fischerstufe", "Niveau de Pêche", "Estágio da Pesca", "Balık Avı Aşaması", "Tahap Memancing", "Этап рыбалки", "ด่านตกปลา", "مرحلة الصيد", "Etapa de pesca", "Rules section heading."],
   ["Regular Fishing", "普通釣魚", "일반 낚시", "Normales Fischen", "Pêche Classique", "Pesca Normal", "Normal Balık Avı", "Memancing Reguler", "Обычная рыбалка", "การตกปลาปกติ", "صيد الأسماك العادي", "Pesca común", "Probability section calls it 普通關卡. KO probability section: 일반 스테이지. DE Power Cast rules: 'Reguläres Angeln'. FR also 'Pêche Régulière' (Power Cast) and 'Pêche Ordinaire' (probability). AR probability: 'الصيد العادي'. PT also 'Pesca Regular' (Power Cast). ES also 'Pesca Regular' (Power Cast) and 'Pesca Normal' (probability). TH Power Cast: 'ตกปลาทั่วไป'."],
   ["Ocean Prospector", "寶藏釣魚", "보물 낚시", "Ozean-Goldsucher", "Chercheur des Mers", "Prospecção do Oceano", "Okyanus Kaşifi", "Ocean Prospector", "Океанический поиск сокровищ", "การสำรวจมหาสมุทร", "مستكشف المحيط", "Prospector Oceánico", "Probability section calls it 寶藏關卡. KO probability: 보물상자 스테이지 / 보물 스테이지. DE also 'Ozean-Schürfer' (Power Cast) and 'Meeresforscher' (probability). FR also 'Prospecteur Océanique' (Power Cast) and 'Chercheur de l'Océan' (probability). AR Power Cast: 'المنقب البحري'. RU Power Cast rules: «Океанский искатель». PT also 'Prospector do Oceano'. ES also 'Prospector del Océano' (Power Cast) and 'Prospector Helado' (probability, likely a game error). ID stage rule keeps English; ID Power Cast: 'Prospektor Laut'; ID probability: 'Penjelajah Lautan'. TH Power Cast: 'นักสำรวจแร่มหาสมุทร'."],
   ["Bait", "餌料", "미끼", "Köder", "Appât", "Isca", "Yem", "Umpan", "приманка", "เหยื่อ", "طعم", "Cebo", "Chinese also says 魚飼料 in the Power Cast rules. KO Power Cast rules: 물고기 사료. AR plural 'طعوم'."],
   ["Treasure Chart", "藏寶海圖", "바다 보물 지도", "Schatzkarte", "Carte au Trésor", "Carta do Tesouro", "Hazine Haritası", "Peta Harta", "карта сокровищ", "แผนผังสมบัติ", "مخطط كنز", "Mapa de Tesoro", "FR Power Cast: 'Cartes de Trésor'. AR Power Cast: 'خرائط كنز'. PT Power Cast: 'Mapas do Tesouro'. ES Power Cast: 'gráficos del tesoro'. ID Power Cast: 'Peta Harta Karun'."],
   ["Ocean Chest", "深海寶箱", "심해 보물상자", "Ozean-Truhe", "Coffre des Mers", "Baú do Oceano", "Okyanus Sandığı", "Peti Lautan", "глубинный сундук", "หีบมหาสมุทร", "صناديق المحيط", "Cofre oceánico", "AR seen only in plural. TR seen in plural 'Okyanus Sandıkları'. RU seen in plural 'глубинные сундуки'. PT stage rule says 'baús afundados'. ID Power Cast: 'Peti Samudra'."],
   ["Special Items", "特殊道具", "특수 아이템", "Spezialgegenstände", "Objets Spéciaux", "Itens Especiais", "Özel Öğeler", "Item Spesial", "Особые предметы", "ไอเทมพิเศษ", "عناصر خاصة", "Artículos especiales", "DE rule 6 says 'Sondergegenstände'. TR rule 6 says 'özel eşyalar'. ES Power Cast says 'objetos especiales'."],
   ["Fishing Voucher", "釣魚禮券", "낚시 쿠폰", "Angelgutschein", "Coupon de Pêche", "Voucher de Pesca", "Balık Avı Kuponu", "Voucher Memancing", "Ваучер рыбалки", "บัตรตกปลา", "قسيمة الصيد", "Cupón Pesca", "AR plural in brackets: [قسائم الصيد]. RU Power Cast rules: [купоны рыбалки]. ES brackets: [Cupones de Pesca]."],
   ["Horn of the Tide", "海潮號角", "조수 나팔", "Horn der Gezeiten", "Corne des Mers", "Trombeta da Maré", "Gelgit Boynuzu", "Trompet Samudra", "Рог прилива", "แตรแห่งกระแสน้ำ", "بوق الموج", "Cuerno de la Marea", "—"],
   ["Reel", "線輪", "릴", "Rolle", "Moulinet", "Molinete", "Makara", "Kail", "Катушка", "รอกตกปลา", "مثبت البكرة", "Carrete", "KO bracket item name: [릴 안정기]."],
   ["Ocean Scanner", "深海感應器", "심해 센서", "Ozeanscanner", "Scanner Océanique", "Scanner Oceânico", "Okyanus Tarayıcı", "Pemindai Laut", "Океанический сканер", "เครื่องสแกนมหาสมุทร", "ماسح المحيط", "Escáner Oceánico", "—"],
   ["Lantern", "照明燈", "조명등", "Laterne", "Lanterne", "Lanterna", "Fener", "Lentera", "Фонарь", "โคมไฟ", "الفانوس", "Linterna", "Chinese rule 7 once says 探照燈. KO rule 7 says 탐조등."],
   ["Fish / Mermaid / Chest / Memorabilia", "魚類 / 美人魚 / 寶箱 / 紀念品", "어류 / 인어 / 보물상자 / 기념품", "Fisch / Meerjungfrau / Truhe / Erinnerungsstück", "Poisson / Sirène / Coffre / Souvenir", "Peixe / Sereia / Baú / Memorabília", "Balık / Deniz Kızı / Sandık / Hatıra", "Ikan / Putri Duyung / Peti / Memorabilia", "Рыба / Русалка / Сундук / Сувенир", "ปลา / นางเงือก / หีบ / ของที่ระลึก", "الأسماك / حورية البحر / الصناديق / التذكارات", "Peces / Sirenas / Cofres / Recuerdos", "The four Guide types. AR Guide types: دليل الأسماك، دليل حورية البحر، دليل الصناديق، دليل التذكارات. RU Guide types: руководство рыбака / по русалкам / по сундукам / по сувенирам. ES Guide names use plural: Guía de Peces / de Sirenas / de Cofres / de Recuerdos. TH Guide names: คำแนะนำปลา / คำแนะนำนางเงือก / คำแนะนำหีบ / คำแนะนำความทรงจำ (memorabilia guide uses 'memory')."],
   ["Struggling Mermaid", "受困的美人魚", "곤경에 처한 인어", "Meerjungfrau in Schwierigkeiten", "Sirène en Difficulté", "Sereia em dificuldades", "Yardıma Muhtaç Deniz Kızı", "Putri Duyung Terperangkap", "попавшая в беду русалка", "นางเงือกมีปัญหา", "حورية البحر المكافحة", "Sirena en Dificultades", "DE Ocean Prospector line says 'mit Schwierigkeiten'. ⚠️ AR only seen in the probability lines ('حورية البحر مكافحة' / 'المكافحة'). PT Ocean Prospector line says 'com dificuldades'."],
   ["Star Rating Rewards", "星級進度獎勵", "성급 진행도 보상", "Sterne-Bewertungsbelohnungen", "Récompenses de Nombre d'Étoiles", "Recompensas de Classificação por Estrelas", "Yıldız Derecesi Ödülleri", "Hadiah Rating Bintang", "Награды за звездный рейтинг", "รางวัลคะแนนดาว", "مكافآت تصنيف النجوم", "Recompensas de calificación de estrellas", "—"],
   ["Guide Completion Rewards", "圖鑑分類獎勵", "도감 분류 보상", "Leitfaden-Abschlussbelohnungen", "Récompenses de Guide Complété", "Recompensas dos Guias Completos", "Kılavuz Tamamlama Ödülleri", "Hadiah Penyelesaian Panduan", "Награды за прохождение руководств", "รางวัลการพิชิตคำแนะนำ", "مكافآت إكمال الدليل", "Recompensas por completar la guía", "—"],
   ["Power Cast", "多倍釣魚", "낚시하기 x배", "Kraft-Besetzung", "Puissance du lancer", "Poder da Conjuração", "Güçlü Olta Atma", "Lemparan Kuat", "Суперзаброс", "การเหวี่ยงทรงพลัง", "قوة رمي الصنارة", "Lanzamiento Poderoso", "FR body text: 'Lancer Puissant'. AR body text: 'الرمية القوية'. ID section heading says 'Penggunaan Kekuatan'."],
   ["Fishing Probability Guide", "關卡機率說明", "스테이지 확률 설명", "Fischer-Wahrscheinlichkeitsleitfaden", "Guide des Probabilités de Pêche", "Guia de Probabilidade de Pesca", "Balık Avı Olasılık Kılavuzu", "Panduan Probabilitas Memancing", "Вероятности при рыбалке", "คำแนะนำโอกาสการตกปลา", "دليل احتماليات الصيد", "Guía de probabilidades de pesca", "—"],
   ["Fishing Pro / Fishing Master", "垂釣達人 / 垂釣大師", "낚시의 달인 / 낚시 거장", "Fischer-Profi / Fischermeister", "Pro de la Pêche / Maître Pêcheur", "Pescador Profissional / Mestre da Pesca", "Balık Avı Uzmanı / Balık Avı Ustası", "Fishing Pro / Fishing Master", "Профи рыбалки / Мастер рыбалки", "นักตกปลามือโปร / เซียนตกปลา", "محترف الصيد / خبير صيد الأسماك", "Profesional de Pesca / Maestro de Pesca", "Fishing Guild buff tiers. TR text lists them in reverse order ('Balık Avı Ustası ve Balık Avı Uzmanı'): Usta = master, Uzman = expert/pro. ID keeps English."],
   ["Fishing Token Bonuses", "釣魚紀念幣加成", "낚시 기념 코인 버프", "Fischer-Token-Boni", "Bonus de Jetons", "Bônus do Token de Pesca", "Balık Avı Jetonu Bonusları", "Bonus Token Memancing", "бонусы к жетонам рыбалки", "โบนัสเหรียญตกปลา", "مكافآت رمز الصيد", "Bonificaciones de Fichas de pesca", "—"],
   ["Fishing Point Bonuses", "釣魚積分加成", "낚시 포인트 버프", "Fischer-Punkt-Boni", "Bonus de Points", "Bônus do Ponto de Pesca", "Balık Avı Puanı Bonusları", "Bonus Poin Memancing", "бонусы к очкам рыбалки", "โบนัสคะแนนตกปลา", "مكافآت نقاط الصيد", "Bonificaciones de Puntos de Pesca", "—"],
   ["Retreat", "退出", "나가기", "Rückzug", "Retraite", "Bater em Retirada", "Geri Çekil", "Mundur", "Отступить", "ถอย", "تراجع", "Retirarse", "Pause screen button inside a stage."],
   ["Continue", "繼續", "계속하기", "Weiter", "Continuer", "Continuar", "Devam Et", "Lanjutkan", "Продолжить", "เล่นต่อ", "متابعة", "Continuar", "Pause screen button inside a stage."]
  ]
 },
 {
  "cat": "Tri-Alliance Clash",
  "rows": [
   ["Tri-Alliance Clash", "三盟爭霸", "삼대 연맹전", "Drei-Allianz-Wettkampf", "Conflit Tri-Alliance", "Confronto Tri-Aliança", "Üçlü İttifak Çarpışması", "Clash Tiga Aliansi", "Битва трех альянсов", "สงครามสามพันธมิตร", "صراع التحالف الثلاثي", "Choque de Tres Alianzas", "Event name. Tagline: 'The elite forces have arrived. War is imminent!' / '精銳之師狹路相逢，戰鬥已然打響。' DE rule 6 says 'Der Canyon-Wettbewerb ist in vier Drei-Allianz-Wettkampf' (game text error)."],
   ["Battle Prerequisites", "參戰條件", "참전 조건", "Kampfvoraussetzungen", "Conditions pour combattre", "Pré-requisitos de Batalha", "Savaş Ön Koşulları", "Prasyarat Pertempuran", "Условия участия в битве", "ข้อกำหนดการเข้าต่อสู้", "متطلبات المعركة", "Prerrequisitos de Batalla", "Rules section heading."],
   ["Battle Rules", "戰鬥規則", "전투 규칙", "Schlachtregeln", "Règles du Combat", "Regras da Batalha", "Savaş Kuralları", "Peraturan Pertempuran", "Правила битвы", "กติกาการต่อสู้", "قواعد المعركة", "Reglas de la batalla", "Rules section heading. The general section is 'Rules' / 基本規則. KO general section: 기본 규칙."],
   ["Voting / Registration / Matchmaking / Battle", "投票 / 報名 / 配對 / 戰鬥", "투표 / 신청 / 매칭 / 전투", "Abstimmung / Anmeldung / Matchmaking / Schlacht", "Vote / Inscription / Matchmaking / Combat", "Votação / Inscrições / Partida / Batalha", "Oylama / Kayıt / Eşleştirme / Savaş", "Vote / Pendaftaran / Matchmaking / Pertempuran", "голосование / регистрация / подбор / битва", "โหวต / ลงทะเบียน / หาคู่ต่อสู้ / ต่อสู้", "التصويت / التسجيل / البحث عن الخصم / معركة", "Votación / Inscripción / Emparejamientos / Batalla", "Weekly schedule: Mon–Tue voting, Wed–Thu registration, Fri matchmaking, Sat battle. ⚠️ PT rule 1 lists different days (Sat–Sun voting, Mon–Tue registration, Wed matchmaking, Thu battle) — game text error; all other languages say Mon–Tue / Wed–Thu / Fri / Sat."],
   ["Power Leaderboard", "實力排名", "—", "Kraft-Bestenliste", "Classement de Puissance", "Placar de Poder", "Güç Lider Tablosu", "—", "таблица лидеров по силе", "กระดานผู้นำค่าพลัง", "قائمة صدارة القوة", "Clasificación de Poder", "Top 20 alliances are eligible. KO only says '전투력 상위 20위' (top 20 by power). ID prerequisites section shows only '40 anggota aktif minggu ini' (text missing in the game)."],
   ["Deployment page", "參戰管理頁面", "참전 관리 화면", "Aufstellungsseite", "page de Déploiement", "página de Implantação", "Konuşlandırma sayfası", "halaman Pengerahan", "страница отправления", "หน้าจอการส่งออก", "صفحة النشر", "página de Despliegue", "Where R4+ pick up to 30 combatants and 10 substitutes."],
   ["Preparations", "準備階段", "준비 단계", "Vorbereitung", "Préparations", "Preparação", "Hazırlıklar", "Persiapan", "Подготовка", "ช่วงเตรียมตัว", "الاستعدادات", "Preparativos", "Stage 1 (3 minutes)."],
   ["Seize & Conquer", "攻城掠地", "공성 약탈", "Ergreifen & Erobern", "Capture & Conquête", "Capturar e conquistar", "Ele Geçir ve Fethet", "Rebut & Taklukkan", "Осада", "พิชิตและยึดครอง", "الاستيلاء والسيطرة", "Capturar y Conquistar", "Stage 2 (17 minutes)."],
   ["Garrison Occupation", "爭奪各方兵營", "각 병영 쟁탈", "Garnisonsbesetzung", "Occupation de Garnison", "Ocupação da Guarnição", "Garnizon İşgali", "Penguasaan Garnisun", "Захват форта", "การยึดป้อม", "احتلال الحامية", "Ocupación de Guarniciones", "Stage 3 (20 minutes). Chinese literally 'fight for each side's barracks'."],
   ["Temple Onslaught", "進軍潮汐神殿", "파도 신전으로 진군", "Ansturm auf Tempel", "Assaut du Temple", "Atacar o Templo", "Tapınağa Hücum", "Penyerangan Kuil", "Натиск на храм", "โจมตีวิหาร", "هجوم المعبد", "Asalto al Templo", "Stage 4 (20 minutes). Chinese literally 'march on the Temple of Tides'."],
   ["Energy", "能量", "에너지", "Energie", "énergie", "Energia", "Enerji", "Energi", "энергия", "พลังงาน", "الطاقة", "Energía", "Spent to deploy, conscript, advance, retreat and instantly revive. FR seen only inside sentences ('l'énergie')."],
   ["Deploy / Conscript / Advance / Retreat / Instantly revive", "出征 / 徵兵 / 突進 / 撤退 / 立即復活", "출정 / 징집 / 돌진 / 철수 / 즉시 부활", "Aufstellen / Einberufen / Vorrücken / Zurückziehen / sofortige Wiederbeleben", "déployer / recruter / faire avancer / retirer / réanimer", "posicionar / recrutar / avançar / recuar / reviver instantaneamente", "konuşlandırmak / görevlendirmek / ilerletmek / geri çekmek / anında diriltmek", "mengerahkan / wajib militer / memajukan / menarik mundur / membangkitkan langsung", "отправление / пополнение / продвижение / отступление / мгновенное оживление", "การส่งออก / เกณฑ์ / เดินหน้า / ถอยทัพ / การฟื้นฟูทันที", "نشر / تجنيد / التقدم / التراجع / إحياء فوراً", "desplegar / reclutar / avanzar / retroceder / revivir instantáneamente", "Squad actions that cost Energy. English also lists 'activate', which has no Chinese counterpart. NOT the same as the Fishing Tournament 'Retreat' button (退出). DE also lists 'Aktivieren', like English. FR also lists 'activer'; FR rule 3 says 'battre en retraite' for retreat. AR also lists 'تنشيط' (activate). TR also lists 'etkinleştirmek' (activate). RU also lists 'активация'; RU text uses the genitive forms. PT also lists 'ativar'; ES also lists 'activar'. ID also lists 'mengaktifkan'; TH also lists 'เปิดใช้งาน'."],
   ["Captain (Tri-Alliance)", "指揮官", "지휘관", "Kapitän", "Capitaine", "Capitão", "Önder", "Kapten", "капитан", "กัปตัน", "كابتن", "Capitán", "Appointed by R4+ or by the garrisoned governor; boosts Energy gain. NOT the same as the Cesares Fury 'Captain' (頭目). DE Temple of Tides text once says 'Kommandanten'. AR also 'الكابتن' with the article."],
   ["Temple of Tides", "潮汐神殿", "파도 신전", "Tempel der Gezeiten", "Temple des Marées", "Templo das Marés", "Gelgitler Tapınağı", "Kuil Dewa Laut", "Храм приливов", "วิหารแห่งกระแสน้ำ", "معبد المد", "Templo de las Mareas", "Lv. 5 building, opens in Stage 3, no Captain. +1,800/min. DE description starts with 'Gefrorene Zitadelle:' (leftover text in the game). TR description starts with 'Donuk İstihkâm:' (leftover text, like DE). ID literally 'Temple of the Sea God'."],
   ["Headquarters", "總部", "본부", "Hauptquartier", "Quartier Général", "Quartéis-generais", "Karargahlar", "HQ", "Штаб", "ฐานทัพ", "المقر", "Cuartel General", "Lv. 4 building; starting point and revive point. +1,800/min. English says Captains can be appointed; Chinese does not mention it. Different from Viking Vengeance 'Alliance HQ' (聯盟總部). DE description starts with 'Bastion:'. DE says Captains can be appointed, like English. FR and AR also say Captains can be appointed, like English. TR description starts with 'Hisar:'. RU text uses the plural 'штабах'. PT uses the plural."],
   ["Garrisons", "戍衛兵營", "수비대 병영", "Garnisonen", "Garnison", "Guarnições", "Garnizonlar", "Garnisun", "Гарнизоны", "ป้อม", "الحامية", "Guarniciones", "Lv. 4 building, opens in Stage 2. +1,800/min. FR and AR use the singular."],
   ["Cluster of Ruins", "遺跡群", "유적군", "Anhäufung von Ruinen", "Groupe de ruines", "Aglomerado de Ruínas", "Harabeler Kümesi", "Kluster Reruntuhan", "Цепь руин", "กลุ่มซากปรักหักพัง", "كتل الحطام", "Conjunto de Ruinas", "Lv. 3 building. +600/min."],
   ["Ruins", "遺跡", "유적", "Ruinen", "Ruines", "Ruínas", "Harabeler", "Reruntuhan", "Руины", "ซากปรักหักพัง", "حطام", "Ruinas", "Lv. 2 building. +180/min. ⚠️ Same Chinese word as the Sanctuary Battle 'Sanctuary' (遺跡) — different thing. KO 유적 is also the Sanctuary Battle word. AR 'حطام' = wreckage/debris, not the Sanctuary word."],
   ["Transit Hub", "中轉樞紐", "중계 거점", "Knotenpunkt", "Pôle de Transit", "Centro de Trânsito", "Transit Merkezi", "Pusat Transit", "Перевалочный пункт", "ศูนย์การขนส่ง", "مركز النقل", "Centro de Tránsito", "Lv. 1 building; take an aircraft to the Temple of Tides or enemy territory. +60/min."],
   ["Pillars", "海之柱", "바다의 기둥", "Säulen", "Pilier", "Pilares", "Sütunlar", "Pilar", "Колонны", "เสาหลัก", "الأعمدة", "Pilares", "Lv. 1 building. +60/min. Chinese literally 'Pillar of the Sea'. English says 'Guardians can be appointed'. DE: 'Es können Wächter ernannt werden'. FR singular; FR 'Les Gardiens peuvent être désignés'. AR 'يمكن تعيين حرّاس'. TR 'Koruyucular atanabilir'. RU 'Можно назначить хранителей'. PT 'Guardiões podem ser nomeados'. ES 'Se le pueden designar guardianes'. ID 'Penjaga dapat ditunjuk'. TH 'สามารถแต่งตั้งผู้พิทักษ์ได้'."],
   ["Neutral buildings", "中立建築", "중립 건물", "neutrale Gebäude", "bâtiments neutres", "construções neutras", "tarafsız binalar", "bangunan netral", "нейтральные здания", "สิ่งปลูกสร้างที่เป็นกลาง", "المباني المحايدة", "edificios neutrales", "Seen inside sentences. RU text says only 'нейтральные'."],
   ["Alliance Ranking Rewards", "聯盟排名獎勵", "연맹 랭킹 보상", "Allianz-Ranglistenbelohnungen", "Récompenses de Classement d'Alliance", "Recompensas de Classificação da Aliança", "İttifak Sıralaması Ödülleri", "Hadiah Peringkat Aliansi", "Награды за рейтинг альянса", "รางวัลอันดับพันธมิตร", "مكافآت تصنيف التحالف", "Recompensas de clasificación de alianza", "Rewards tab heading. Based on Legion 1's point ranking."],
   ["Personal Ranking Rewards", "個人排名獎勵", "개인 랭킹 보상", "Persönliche Ranglistenbelohnungen", "Récompenses de Classement Individuel", "Recompensas de Classificação Individual", "Kişisel Sıralama Ödülleri", "Hadiah Peringkat Pribadi", "Награды за личный рейтинг", "รางวัลอันดับส่วนบุคคล", "إجمالي التصنيف الشخصي", "Recompensas de clasificación personal", "Rewards tab heading. Legion 1 and 2 settled separately. AR heading literally says 'total personal ranking'. TH heading wraps as 'ส่วนบุคค / ล' in the game."],
   ["Personal Merits", "個人戰功", "개인 전공", "Persönliche Verdienste", "mérites individuels", "Méritos Pessoais", "Kişisel Liyakat", "Merit", "личные заслуги", "แต้มบุญส่วนตัว", "الجدراة الشخصية", "Méritos Personales", "Need at least 10,000 to claim personal rewards. AR spelled 'الجدراة' in the game (typo of الجدارة). TR seen inflected: 'Kişisel Liyakata'. ⚠️ ID sentence cut off after '10.000 Merit'. DE seen as 'Persönlichen Verdiensten'; RU as 'личных заслуг' (inflected in the sentence)."],
   ["Auto-advance", "輪空", "부전승", "Freilos", "progression auto", "avanço automático", "oto-ilerleme", "Lolos Otomatis", "автопродвижение", "เข้ารอบอัตโนมัติ", "تقدم تلقائي", "avance automático", "If an alliance gets a bye, all members get the No. 1 rewards. FR: 'progression auto'. AR seen in a sentence: 'تقدماً تلقائياً'."],
   ["Tidal Stone", "海潮石", "파도석", "Gezeitenstein", "Pierre des Marées", "Pedra das Marés", "Gelgit Taşı", "Batu Pasang Surut", "Камень приливов", "หินกระแสน้ำ", "حجر المد", "Piedra de las Mareas", "Reward currency."],
   ["Tidal Shop", "潮汐商店", "파도 상점", "Gezeiten-Laden", "Magasin des Marées", "Loja das Marés", "Gelgit Mağazası", "Toko Pasang Surut", "магазин приливов", "ร้านค้ากระแสน้ำ", "متجر المد", "Tienda de la Marea", "Where Tidal Stones are spent."]
  ]
 },
 {
  "cat": "Mystic Trial",
  "rows": [
   ["Mystic Trial", "秘境試煉", "신비한 시련", "Mystische Prüfung", "Épreuve Mystique", "Prova Mística", "Mistik İmtihan", "Ujian Mistis", "Волшебное испытание", "บททดสอบลี้ลับ", "الاختبارات الغامضة", "Prueba Mística", "Event title (rules window). AR uses the plural ('trials')."],
   ["Story", "背景故事", "배경 스토리", "Geschichte", "Histoire", "História", "Hikâye", "Cerita", "История", "เนื้อเรื่อง", "القصة", "Historia", "Rules window heading."],
   ["Expedition Stats", "遠征屬性", "원정 속성", "Expeditionswerte", "stats de combat", "Atributos de Expedição", "Sefer Nitelikleri", "Stat Ekspedisi", "показатели экспедиции", "ค่าสถานะการออกเดินทาง", "إحصاءات الحملة الاستكشافية", "Estadística de Expedición", "Story text. FR says 'combat stats' (no 'expedition'). ES is singular in the game text ('diversas Estadística de Expedición'). Not the same as Expedition Skills (遠征技能)."],
   ["Coliseum", "角鬥賽場", "결투장", "Kolosseum", "Colisée", "Coliseu", "Kolezyum", "Koloseum", "Колизей", "โคลอสเซียม", "الكولوسيوم", "Coliseo", "Trial zone, Mon & Tue. Only Heroes, Hero Gear and Hero Exclusive Gear stats count."],
   ["Forest of Life", "生命森林", "생명의 숲", "Wald des Lebens", "Forêt de la Vie", "Floresta da Vida", "Yaşam Ormanı", "Alas Kehidupan", "Лес жизни", "ป่าแห่งชีวิต", "غابة الحياة", "Bosque de la Vida", "Trial zone, Wed & Thu. Only Pet stats count; Pet Skills are active by default and their effects don't stack."],
   ["Crystal Cave", "水晶礦洞", "수정 광산", "Kristallhöhle", "Grotte de Cristal", "Caverna de Cristal", "Kristal Mağara", "Gua Kristal", "Кристальная пещера", "ถ้ำคริสตัล", "كهف الكريستال", "Cueva de Cristal", "Trial zone, Wed & Thu. Only Governor Charm stats count. KO literally 'crystal mine'. TR body text once says 'Kristal Maden'."],
   ["Knowledge Nexus", "知識樞紐", "지식의 전당", "Wissensverbund", "Nexus de la Connaissance", "Nexo do Conhecimento", "Bilgi Noktası", "Nexus Pengetahuan", "Очаг знаний", "เน็กซัสความรู้", "مركز المعرفة", "Nexo del Conocimiento", "Trial zone, Fri & Sat. Only Academy and War Academy tech stats count. KO literally 'Hall of Knowledge'. PT body text says 'Nexus do Conhecimento'. RU Squad Config text calls it 'Город мудрецов'."],
   ["Molten Fort", "熔岩要塞", "용암 요새", "Geschmolzenes Fort", "Fort en Fusion", "Forte Derretido", "Erimiş Kale", "Benteng Lava", "Раскалённый форт", "ป้อมเพลิงหลอม", "الحصن المصهور", "Fuerte Fundido", "Trial zone, Fri & Sat. Only Governor Gear stats count."],
   ["Radiant Spire", "輝光尖塔", "빛나는 첨탑", "Strahlende Spitze", "Flèche Éclatante", "Pináculo Radiante", "Parlayan Kule", "Menara Radiant", "Блистающий шпиль", "เจดีย์ส่องสว่าง", "برج الإشعاع", "Aguja Radiante", "Trial zone, Sun. Almost all stats count and you use your own troops. ZH/KO also list 'stats from buildings'; the other languages don't. DE Squad Config text says 'Glänzende Spitze'; PT body text says 'Torre Radiante'. ID taken from the Squad Config text (heading not seen)."],
   ["Squad Config", "部隊配置", "부대 배치", "Schwadron-Konfig.", "Configuration d'Escouade", "Configuração do Esquadrão", "Ekip Yapılandırması", "—", "Конфигурация отряда", "การตั้งค่าทีม", "إعدادات الفرقة", "Configuración de escuadrón", "Rules window heading. DE is abbreviated in-game."],
   ["Trial Explorers", "試煉探險隊", "시련 탐험대", "Prüferkunder", "Explorateurs de l'Épreuve", "Exploradores de Prova", "İmtihan Kaşifleri", "Penjelajah Ujian", "исследователи испытаний", "นักสำรวจบททดสอบ", "مستكشفو الاختبارات", "Exploradores de la Prueba", "NPC group that supplies Lv.10 soldiers in the five single-stat zones, and extra soldiers in Radiant Spire."],
   ["Soldiers", "士兵", "병사", "Soldaten", "soldats", "Soldados", "Askerler", "prajurit", "солдаты", "กองทหาร", "جنود", "Soldados", "Squad Config text."],
   ["Deployment capacity", "出征容量", "출정 수용량", "Einsatzkapazität", "capacité de déploiement", "capacidade de implantação", "konuşlanma kapasitesi", "kapasitas pengerahan", "вместимость отправления", "ความจุการส่งออกทหาร", "سعة الانتشار", "capacidad de despliegue", "Squad Config text (Radiant Spire). Not the same as Troops Capacity (部隊容量), though ES uses the same words for both. AR also writes 'سعة النشر' in the same paragraph."],
   ["Challenge Attempts", "挑戰次數", "도전 횟수", "Herausforderungsversuche", "Tentatives de Défi", "Tentativas de Desafio", "Mücadele Hakları", "Percobaan Tantangan", "Попытки испытания", "โอกาสการท้าทาย", "محاولات التحدي", "Intentos de desafío", "Rules heading. Most languages: 5 attempts per zone per day, reset 00:00 UTC. ZH/KO instead say you are locked out of the zone after 5 failures that day."],
   ["First Win Rewards", "首勝獎勵", "첫 승리 보상", "Erster-Sieg-Belohnungen", "récompenses de 1ère victoire", "Recompensas de Primeira Vitória", "İlk Zafer Ödülleri", "Hadiah Kemenangan Pertama", "награда за первую победу", "รางวัลชัยชนะครั้งแรก", "مكافآت الفوز الأول", "Recompensas por primera victoria", "Rewards section: first clear of a stage."],
   ["Raid Rewards", "掃蕩獎勵", "소탕 보상", "Überfall-Belohnungen", "récompenses de pillage", "Recompensas de Ataque", "Yağma Ödülleri", "Hadiah Raid", "награды за рейд", "รางวัลการบุกโจมตี", "مكافآت الغارة", "Recompensas de asalto", "Rewards section: repeat clears. DE also writes 'Überfallbelohnungen'."],
   ["Stage Reset", "關卡重置", "스테이지 리셋", "Stufe zurückgesetzt", "Réinitialisation de l'Étape", "Resetar Estágio", "Aşama Sıfırlama", "Reset Stage", "Сбросить этап", "รีเซ็ตด่าน", "إعادة تعيين المرحلة", "Restablecer etapa", "Rules heading."],
   ["Raid", "關卡掃蕩", "스테이지 소탕", "Überfall", "Pillage", "Atacar", "Yağmala", "Raid", "Рейд", "บุกโจมตี", "غارة", "Asaltar", "Rules heading; unlocked after clearing stages 1–10 of a zone. Verb in text: 掃蕩 / 소탕. Noun in text: ES 'Asalto', PT 'Ataque'."],
   ["Stage (trial level)", "關卡", "스테이지", "Stufe", "étape", "estágio", "aşama", "Stage", "этап", "ด่าน", "المرحلة", "etapa", "Mystic Trial level. Not the same as 'Stage' (階段/단계) in other events. PT also writes 'fase' and 'Etapas' in the same window."],
   ["Zone", "區域", "구역", "Zone", "zone", "zona", "bölge", "zona", "зона", "โซน", "منطقة", "zona", "Mystic Trial zone (試煉區域 / 시련 구역)."],
   ["Mystic Trial Leaderboard", "—", "—", "Mystische Prüfung Bestenliste", "Classement de l'Épreuve Mystique", "Placar da Prova Mística", "Mistik İmtihan Liderlik Tablosu", "Leaderboard Ujian Mistis", "таблица лидеров «Волшебного испытания»", "กระดานผู้นำบททดสอบลี้ลับ", "لوحة المتصدرين في الاختبارات الغامضة", "Clasificación de la Prueba Mística", "Stage Reset text. ZH only says '排行榜', KO only '랭크'."],
   ["Pet", "寵物", "펫", "Begleittier", "Animaux", "mascote", "Pet", "Peliharaan", "питомец", "สัตว์เลี้ยง", "الحيوان الأليف", "Mascota", "Zone rules text. FR only seen in the plural. PT says 'mascotes' in the Forest of Life text but 'Pets' in the Radiant Spire list."],
   ["Pet Skills", "寵物技能", "펫 스킬", "Begleittierfähigkeiten", "Compétences animalières", "habilidades dos mascotes", "Pet Yetenekleri", "Skill Peliharaan", "навыки питомцев", "ทักษะของสัตว์เลี้ยง", "مهارات الحيوان الأليف", "Habilidades de las Mascotas", "Forest of Life / Radiant Spire text. PT Radiant list says 'Habilidades de Pet'. AR Forest text uses the plural 'مهارات الحيوانات الأليفة'."],
   ["Governor Charm", "領主寶石", "영주 보석", "Gouverneur Talisman", "Talisman du Gouverneur", "Amuleto do Governador", "Vali Tılsımı", "Charm Gubernur", "талисман губернатора", "เครื่องรางเจ้าเมือง", "تميمة الحاكم", "Talismán del Gobernador", "Mystic Trial wording (Crystal Cave / Radiant Spire). Other screens use FR 'Talisman du Chef', PT 'Talismã do Chefe', TR 'Şef Tılsımı', TH 'เครื่องรางผู้นำค่าย' (see GLOSSARY governorCharm)."],
   ["Tech", "科技", "과학 기술", "Technologien", "Techs", "Tecnologia", "Teknoloji", "Teknologi", "технологии", "เทคโนโลยี", "التقنية", "Tecnología", "Radiant Spire list. Not the same as Research (研究). ID taken from the Knowledge Nexus text ('Stat Teknologi Akademi')."],
   ["Truegold Tech", "黃金科技", "순금 과학 기술", "Echtgold-Technologie", "Techs d'Or Véritable", "Tecnologia Ouro Verdadeiro", "Hasaltın Teknolojisi", "—", "аурумные технологии", "เทคโนโลยีทรูโกลด์", "تقنية الذهب الحقيقي", "Tecnología de Oro Puro", "Radiant Spire list. PT/AR/ES use a different Truegold word here than the Truegold row (Adamante / الذهب الخالص / Adamantina)."],
   ["Skins", "裝扮", "스킨", "Verkleidung", "Thèmes", "Visuais", "Görünümler", "—", "облики", "สกิน", "المظاهر", "Apariencias", "Radiant Spire list."],
   ["Oasis Island", "綠洲島", "오아시스", "Oasen Insel", "Île Oasis", "Ilha Oásis", "Vaha Adası", "—", "остров Оазиса", "เกาะโอเอซิส", "جزيرة الواحة", "Isla del Oasis", "Radiant Spire list. KO omits 'island'."],
   ["VIP level", "VIP等級", "VIP레벨", "VIP-Level", "niveau VIP", "nível VIP", "VIP seviyesi", "—", "VIP-уровень", "เลเวล VIP", "مستوى VIP", "nivel VIP", "Radiant Spire list."]
  ]
 },
 {
  "cat": "VIP",
  "rows": [
   ["Current Level", "目前等級", "현재 레벨", "Aktuelles Level", "Niveau Actuel", "Nível atual", "Mevcut Seviye", "Level Saat Ini", "Текущий уровень", "เลเวลปัจจุบัน", "المستوى الحالي", "Nivel actual", "VIP page."],
   ["VIP XP", "VIP經驗值", "VIP 경험치", "VIP XP", "EXP VIP", "XP VIP", "VIP XP", "XP VIP", "VIP-опыт", "XP VIP", "خبرة VIP", "EXP VIP", "VIP page / Backpack item. TR item name says 'VIP TP'si'. AR text also 'نقاط خبرة VIP'."],
   ["VIP Benefits", "VIP特權", "VIP 특권", "VIP-Vorteile", "Avantages VIP", "Benefícios de VIP", "VIP Avantajları", "Keuntungan Fasilitas VIP", "Преимущества VIP-уровня", "สิทธิพิเศษ VIP", "مزايا VIP", "Ventajas de VIP", "Heading with the VIP level number (e.g. 'VIP 5 Vorteile')."],
   ["NEW", "最新", "NEW", "NEU", "NEW", "NOVO", "—", "BARU", "NEW", "ใหม่", "جديد", "—", "Green tag in the VIP benefit list."],
   ["Resource Production Speed", "資源生產速度", "자원 생산 속도", "Ressourcen Produktions Geschwindigkeit", "Vitesse de Production de Ressources", "Velocidade de Produção de Recursos", "Kaynak Üretim Hızı", "Kecepatan Produksi Sumber Daya", "Скорость производства ресурсов", "สปีดการผลิตทรัพยากร", "سرعة إنتاج الموارد", "Velocidad de Producción de Recursos", "VIP benefit."],
   ["Storehouse Capacity", "倉庫容量", "창고 수용량", "Lagerkapazität", "Capacité de l'Entrepôt", "Capacidade", "Ambar Kapasitesi", "Kapasitas Gudang", "Вместимость склада", "ความจุคลังสินค้า", "سعة المستودع", "Capacidad del Almacén", "VIP benefit. PT only says 'Capacidade'."],
   ["Construction Speed", "建造速度", "건설 속도", "Baugeschwindigkeit", "Vitesse de Construction", "Velocidade de Construção", "İnşaat Hızı", "Kecepatan Konstruksi", "Скорость строительства", "สปีดการสร้าง", "سرعة البناء", "Velocidad de Construcción", "VIP benefit."],
   ["VIP Daily Free Bundle", "VIP每日免費禮包", "VIP 일일 무료팩", "Tägliche Gratis Bündel", "Pack Quotidien Gratuit pour VIP", "Pacote Gratuito Diário de VIP", "Günlük Ücretsiz Paketi", "Paket Gratis Harian VIP", "Ежедневный бесплатный набор VIP-уровня", "ชุดรวมฟรีประจำวัน VIP", "باقة VIP اليومية المجانية", "Paquete gratis diario de VIP", "Shown with the VIP level number."],
   ["VIP Special Pack", "VIP專享禮包", "VIP 스페셜팩", "Spezial Paket", "Pack Spécial VIP", "Pacote Especial de VIP", "Özel Paketi", "Paket Spesial VIP", "Особый набор VIP", "แพ็กเกจพิเศษ VIP", "باقة VIP الخاصة", "Paquete especial VIP", "Shown with the VIP level number."],
   ["Purchase limit: 1", "僅限購買1次", "한정 1회", "Kauflimit: 1", "Limite d'achat : 1", "Limite de compra: 1", "Satın alım sınırı: 1", "Batas pembelian: 1", "Лимит покупок: 1", "การซื้อสูงสุด: 1", "الحد الأقصى للشراء: 1", "Límite de compra: 1"]
  ]
 },
 {
  "cat": "Alliance menu",
  "rows": [
   ["Power (alliance info)", "實力", "전투력", "Kraft", "Puissance", "Poder", "Güç", "Kekuatan", "Сила", "ค่าพลัง", "القوة", "Poder", "Alliance info box."],
   ["Members", "成員", "멤버", "Mitglieder", "Membres", "Membros", "Üyeler", "Anggota", "Участники", "สมาชิก", "الأعضاء", "Miembros", "DE bottom button is singular 'Mitglied'."],
   ["Language", "語言", "언어", "Sprache", "Langue", "Idioma", "Dil", "Bahasa", "Язык", "ภาษา", "اللغة", "Idioma"],
   ["All languages", "所有語言", "모든 언어", "Alle Sprachen", "Toutes les langues", "Todos os Idiomas", "Tüm diller", "Semua bahasa", "Все языки", "ทุกภาษา", "كل اللغات", "Todos los idiomas"],
   ["Maxed", "等級已滿", "만렙", "Maximal", "Au max", "Limite alcançado", "Maksimumda", "Maks", "Макс.", "สูงสุดแล้ว", "الحد الأقصى", "Al Máximo", "Alliance level bar."],
   ["War", "聯盟戰爭", "연맹 전쟁", "Krieg", "Guerre", "Guerra", "Savaş", "Perang", "Война", "สงคราม", "حرب", "Guerra", "Alliance menu button."],
   ["Chests", "聯盟寶箱", "연맹 보물 상자", "Kiste", "Caisses", "Baús", "Sandıklar", "Peti", "Ящики", "หีบ", "صناديق", "Cajas", "Alliance menu button."],
   ["Territory", "聯盟領地", "연맹 영지", "Gebiet", "Territoire", "Território", "Bölge", "Wilayah", "Территория", "อาณาเขต", "الإقليم", "Territorio", "Alliance menu button."],
   ["Battle", "據點爭奪", "거점 쟁탈", "Schlacht", "Bataille de l'Alliance", "Batalha", "Çarpışma", "Pertarungan Aliansi", "Битва", "การต่อสู้พันธมิตร", "المعركة", "Batalla de alianza", "Alliance menu button."],
   ["Shop (alliance)", "聯盟商店", "연맹 상점", "Laden", "Magasin", "Loja", "Mağaza", "Toko", "Магазин", "ร้านค้า", "متجر", "Tienda", "Alliance menu button. Most languages use the plain word 'Shop'."],
   ["Tech (alliance)", "聯盟科技", "연맹 과학 기술", "Technologie", "Tech", "Tecnologia", "Teknoloji", "Teknologi", "Технологии", "เทคโนโลยี", "التقنيات", "Tecnología", "Alliance menu button. Not the same as the Tech row in Mystic Trial (DE plural there)."],
   ["Power (ranking button)", "實力排行", "전투력 랭킹", "Kraft", "Puissance", "Poder", "Güç", "Kekuatan", "Рейтинг силы", "ค่าพลัง", "القوة", "Poder", "Alliance menu button. Only ZH/KO/RU say 'ranking'."],
   ["Help", "聯盟互助", "연맹 협조", "Hilfe", "Aide", "Ajuda", "Yardım", "Bantuan", "Помощь", "การช่วยเหลือ", "المساعدة", "Ayuda", "Alliance menu button."],
   ["Triumph", "激勵", "격려", "Sieg", "Triomphe", "Triunfo", "Zafer", "Triumph", "Триумф", "ชัยชนะ", "حوافز", "Incentivo", "Alliance bottom button."]
  ]
 },
 {
  "cat": "Intel Missions",
  "rows": [
   ["Intel Mission", "情報事件", "정보 이벤트", "Geheimdienst-Mission", "Mission de renseignements", "Missão de Informação", "Bilgi Görevi", "Misi Intel", "Разведывательная миссия", "ภารกิจข่าวกรอง", "مهمة المعلومات", "Misión de Inteligencia", "Popup title / daily mission. Page title: ZH '事件', KO '이벤트', DE 'Geheimdienst Mission', ES 'Misión de Información'. Daily mission text: ID 'Misi Intelijen'. Not the same as the older GLOSSARY key 'intel'."],
   ["Intel Level", "情報事件", "—", "—", "—", "—", "—", "—", "Уровень разведки", "—", "—", "—", "Level popup title. ZH just repeats '情報事件'."],
   ["Quality", "情報事件等級", "정보 이벤트 품질", "Qualität", "Qualité", "Qualidade", "Kalite", "Kualitas", "Качество", "คุณภาพ", "الجودة", "Calidad", "ZH says 'level', not 'quality'."],
   ["Max Count", "最多情報事件更新數量", "정보 이벤트 새로고침 최대 수량", "Max. Anzahl", "Nombre max.", "Contagem Máx", "Maks. Sayı", "Jumlah Maks", "Макс. число", "จำนวนสูงสุด", "الحد الأقصى للعدد", "Cantidad Máx"],
   ["Refreshes In", "下次更新", "다음 새로고침", "Aktualisiert in", "Actu. dans", "Atualiza em", "Yenilenme", "Diperbarui di", "До обновления", "รีเฟรชใน", "التحديث بعد", "Se actualiza en", "Countdown. Shops/daily use other forms: ES 'Refresca en' / 'Se refresca en', ID 'Diperbarui' / 'Diperbarui dalam', AR 'التحديث خلال'."]
  ]
 },
 {
  "cat": "City buildings",
  "rows": [
   ["Barricade", "城牆", "성벽", "Barrikade", "Barricade", "Barricada", "Barikat", "Barikade", "Баррикада", "กำแพงเมือง", "البوابة", "Barricada", "City view label. AR says 'gate'."],
   ["Conquerors' Camp", "討伐小隊營地", "소대 영지 토벌", "Lager der Eroberer", "Camp des Conquérants", "Acampamento dos Conquistadores", "Fatihler Kampı", "Kamp Penakluk", "Лагерь завоевателя", "ค่ายผู้พิชิต", "معسكر الغزاة", "Campamento de Conquistadores", "City view label."],
   ["Court of Justice", "司法所", "사법재판소", "Gericht", "Cour de Justice", "Corte da Justiça", "Adliye", "Mahkamah Hukum", "Суд", "ศาลยุติธรรม", "محكمة العدل", "Corte de justicia", "City view label."],
   ["Infirmary", "野戰醫院", "야전 병원", "Krankenstation", "Infirmerie", "Enfermaria", "Revir", "Rumah Sakit", "Лазарет", "โรงพยาบาล", "المستوصف", "Enfermería", "City view label."],
   ["Enlistment Office", "徵兵處", "징병소", "Musterungsamt", "Bureau d'Enrôlement", "Escritório de Alistamento", "Görevlendirme Ofisi", "Kantor Pendaftaran", "Призывной пункт", "ศูนย์เกณฑ์ทหาร", "مكتب التجنيد", "Oficina de Reclutamiento", "City view label. TH confirmed from the Gen 3 city screenshot."],
   ["Storehouse", "倉庫", "창고", "Lagerhaus", "L'Entrepôt", "Armazém", "Ambar", "—", "Склад", "โกดัง", "المستودع", "Almacén", "City view label."],
   ["Defense Tower", "防禦塔", "방어탑", "Verteidigungstürme", "Tours de Défense", "Torres de Defesa", "Savunma Kuleleri", "—", "Защитная башня", "หอคอยป้องกัน", "أبراج الدفاع", "Torres defensivas", "City view label with a number (e.g. 'Verteidigungstürme 5'). Most languages use the plural; ZH/KO/RU/TH singular."],
   ["Beast Cage", "獸欄", "사육장", "Bestienkäfig", "Enclos", "Jaula da Fera", "Hayvan Kafesi", "—", "Загон для зверей", "กรงสัตว์", "قفص الوحش", "Jaula de bestias", "City view label."]
  ]
 },
 {
  "cat": "Alliance Tech contribution",
  "rows": [
   ["Covenant-Making", "聯盟永存", "영원한 연맹", "Schließen von Bündnissen", "Marché Conclu", "Fazendo Alianças", "Antlaşma", "Pembuatan Pakta", "Заключение союзов", "การทำข้อตกลง", "عقد العهد", "Establecimiento de pactos", "Contribution popup title."],
   ["Permanent Alliance Tech Contributions", "永續聯盟科技捐贈", "영원한 연맹 과학 기술 기부", "Dauerhafte Allianztechnologie-Beiträge", "Contributions Tech de l'Alliance Permanentes", "Contribuição Tecnológica da Aliança Permanente", "Kalıcı İttifak Teknoloji Katkıları", "Kontribusi Teknologi Aliansi", "Делать взносы в технологию альянса можно постоянно.", "ความอนุเคราะห์เทคโนโลยีพันธมิตรถาวร", "مساهمات تقنيات التحالف الدائمة", "Contribuciones de tecnología de la alianza permanentes", "ID has no 'permanent'. RU is a full sentence."],
   ["Contribution Rewards", "捐款獎勵", "기부 보상", "Beitragsbelohnungen", "Récompenses de Contribution", "Recompensas de Contribuição", "Katkı Ödülleri", "Hadiah Kontribusi", "Награды за взносы", "รางวัลความอนุเคราะห์", "مكافآت المساهمة", "Recompensa por contribución", "ZH also writes '捐獻獎勵' on the same screen; ID toggle says 'Imbalan Kontribusi'."],
   ["Contribute", "捐獻", "기부", "Beitragen", "Contribuer", "Contribuição", "Katkı Yap", "Kontribusi", "Сделать взнос", "อนุเคราะห์", "مساهمة", "Contribución", "Button."],
   ["Attempts", "次數", "횟수", "Versuche", "Tentatives", "Tentativas", "Deneme", "Upaya", "Количество", "จำนวนครั้ง", "المحاولات", "Intentos"],
   ["Unlimited (∞)", "不限", "무제한", "∞", "∞", "—", "—", "∞", "∞", "ไม่จำกัด", "∞", "—", "Most languages just show the ∞ sign."],
   ["Alliance Token", "聯盟幣", "연맹 코인", "Allianz-Token", "—", "Token da Aliança", "İttifak Jetonu", "Token Aliansi", "Жетон альянса", "เหรียญพันธมิตร", "رمز التحالف", "Ficha de la alianza", "Get More popup. DE description has the typo 'Beitrage'."]
  ]
 },
 {
  "cat": "Arena of Glory",
  "rows": [
   ["Arena of Glory", "萬國競技場", "만국 경기장", "Arena des Ruhms", "Arène de la Gloire", "Arena da Glória", "Şan Arenası", "Arena Kemuliaan", "Арена славы", "อารีน่าแห่งเกียรติยศ", "ساحة المجد", "Arena de la gloria"],
   ["Season ends in", "距離賽季結束", "시즌 종료까지", "Saison endet in", "La saison se termine dans", "Temporada termina em", "Sezonun bitmesine", "Musim berakhir di", "Завершение сезона", "ฤดูกาลจะจบลงใน", "ينتهي الموسم بعد", "La temporada termina en"],
   ["Ranking", "排名", "랭킹", "Rang", "Classement", "Rank", "Sıralama", "Peringkat", "Рейтинг", "อันดับ", "تصنيف", "Clasificación", "Column header."],
   ["Governor", "領主", "영주", "Gouverneur", "Gouverneur", "Governador", "Vali", "Gubernur", "Губернатор", "เจ้าเมือง", "الحاكم", "Gobernador", "Column header."],
   ["Arena Points", "競技積分", "경기 포인트", "Arenapunkte", "Points d'Arène", "Pontos de Arena", "Arena Puanı", "Poin Arena", "Очки арены", "คะแนนอารีน่า", "نقاط الساحة", "Puntos de Arena"],
   ["Challenge", "挑戰", "도전", "Herausfordern", "Défi", "Desafio", "Mücadele Et", "Tantang", "Начать испытание", "ท้าชิง", "التحدي", "Desafiar", "Button."],
   ["History", "紀錄", "기록", "Verlauf", "Historique", "História", "Geçmiş", "Riwayat", "История", "ประวัติ", "السجل", "Historial", "Button."],
   ["Def. Lineup", "防守", "방어", "Defensive", "Formation Déf", "Alinhamento da Defesa", "Sav. Düzeni", "Def", "Защ. построение", "ทีมป้องกัน", "التشكيلة الدفاعية", "Def.", "Button."]
  ]
 },
 {
  "cat": "Daily missions",
  "rows": [
   ["Daily", "每日任務", "일일 임무", "Täglich", "Quotidien", "Diário", "Günlük", "Harian", "Ежедневные миссии", "ประจำวัน", "يومياً", "Diario", "Mission tab."],
   ["Growth", "成長任務", "성장 임무", "Wachstum", "Expansion", "Crescimento", "Büyüme", "Pertumbuhan", "Миссии развития", "การเติบโต", "النمو", "Crecimiento", "Mission tab."],
   ["Carry out N Intel Mission(s)", "處理N次情報事件", "정보 이벤트 N회 처리", "Führe N Geheimdienst-Mission(en) aus", "Effectue N Mission(s) de Renseignements", "Realizar N Missão(ões) de Informações", "N Bilgi Görevi yap", "Lakukan N Misi Intelijen", "Выполните разведывательные миссии: N", "ทำภารกิจข่าวกรอง N ครั้ง", "N من مهام المعلومات قيد التنفيذ", "Realiza N misión(es) de inteligencia"],
   ["Heal N injured soldiers", "治療N個傷兵", "부상병 N명 치료", "Heile N verletzte Soldaten", "Soigner N soldats blessés", "Cure N soldados feridos", "N yaralı askeri iyileştir", "Sembuhkan N Skuad yang terluka", "Вылечите раненых солдат: N", "รักษาทหารบาดเจ็บ N คน", "شفاء N من الجنود المصابين", "Cura N soldados heridos", "ID says 'squads', not soldiers."],
   ["Upgrade N building(s)", "提升N次建築等級", "건물 업그레이드 N회", "Verbessere N Gebäude", "Améliore N bâtiment(s)", "Aprimore N construção(ões)", "N bina yükselt", "Tingkatkan gedung N", "Улучшите строения: N", "อัปเกรดสิ่งปลูกสร้าง N แห่ง", "ترقية N من المباني", "Mejora N edificio(s)"],
   ["Defeat Terror N time(s)", "擊敗巨獸N次", "괴수 N회 처치", "Besiege N Mal Terror", "Abats N Terreurs", "Derrotar Terror N vez(es)", "Dehşeti N kez yen", "Kalahkan Teror sebanyak N kali", "Победите ужаса N раз(а)", "เอาชนะอสูรร้าย N ครั้ง", "اهزم الوحوش العملاقة N مرات", "Derrota a Terrores N vez/veces"],
   ["Complete Daily Missions", "完成每日任務", "일일 임무 완료하기", "Schließe tägliche Missionen ab", "Terminer les missions quotidiennes", "Conclua Missões Diárias", "Günlük Görevleri Tamamla", "Selesaikan Misi Harian", "Выполняйте ежедневные миссии", "เสร็จสิ้นภารกิจประจำวัน", "أكمل المهام اليومية", "Completa misiones diarias", "Item 'Sources' line (e.g. Truegold)."]
  ]
 },
 {
  "cat": "Island / Water Essence",
  "rows": [
   ["Get More", "取得更多", "추가 획득", "Erhalte mehr", "Obtenir plus", "Obter mais", "Daha çok al", "Dapatkan Lebih Banyak", "Получить еще", "รับเพิ่ม", "الحصول على المزيد", "Obtener más", "Popup title."],
   ["Water Essence", "生命之水", "생명의 물", "Wasser-Essenz", "Essence d'Eau", "Essência da Água", "Su Özü", "Esensi Air", "Водная эссенция", "แก่นน้ำ", "جوهر الماء", "Esencia de Agua", "DE text also 'Wasseressenzen'."],
   ["Fountain of Life", "生命之泉", "생명의 샘", "Brunnen des Lebens", "Fontaine Vitale", "Fonte da Vida", "Yaşam Pınarı", "Air Mancur Kehidupan", "Фонтан жизни", "น้ำพุแห่งชีวิต", "ينبوع الحياة", "Fuente de la Vida"],
   ["Reservoir", "儲水小屋", "물 저장소", "Reservoir", "Réservoir", "Reservatório", "Rezervuar", "Reservoir", "Резервуар", "อ่างเก็บน้ำ", "الخزان", "Embalse"],
   ["Island Treasure", "海島秘寶", "섬 비보", "Inselschatz", "Trésor de l'île", "Tesouro da Ilha", "Ada Hazinesi", "Harta Karun Pulau", "Сокровище острова", "สมบัติเกาะ", "كنز الجزيرة", "Tesoro de la Isla"],
   ["Assist Allies", "協助盟友", "연맹원 돕기", "Verbündetem Helfen", "Aider des alliés", "Ajudar Aliados", "Müttefiklere Yardım Et", "Bantu Sekutu", "Помочь союзникам", "ช่วยพันธมิตร", "مساعدة الحلفاء", "Ayuda a Aliados"],
   ["Purifier", "淨水廠", "정수 공장", "Klärwerk", "Épurateur", "Purificador", "Arıtıcı", "Purifier", "Очистная установка", "เครื่องกรองน้ำ", "جهاز التنقية", "Purificador"],
   ["Cacti", "仙人掌", "선인장", "Kakteen", "Cactus", "Cactos", "Kaktüs", "Kaktus", "кактусов", "กระบองเพชร", "الصبار", "cactus", "Seen inside the Reservoir text."]
  ]
 },
 {
  "cat": "Deals",
  "rows": [
   ["Weekly Benefits Card", "優惠週卡", "혜택 주간카드", "Wöchentliche Vorteilskarte", "Carte d'Avantages Hebdo", "Carta de Vantagens Semanal", "Haftalık Avantaj Kartı", "Kartu Tunjangan Mingguan", "Преимущества недели", "การ์ดสิทธิพิเศษประจำสัปดาห์", "بطاقة المزايا الأسبوعية", "Carta de ventajas semanal", "Deals tab."],
   ["Hall of Heroes", "英雄殿堂", "영웅의 전당", "Halle der Helden", "Temple des Héros", "Hall dos Heróis", "Kahraman Salonu", "Aula Pahlawan", "Зал героев", "หอฮีโร่", "قاعة الأبطال", "Sala de los héroes", "Deals tab."],
   ["Intel Monthly Card", "情報月卡", "정보 월간카드", "Geheimdienst Monatskarte", "Carte mens. Renseign", "Carta de Informação Mensal", "Aylık Bilgi Kartı", "Kartu Bulanan Intel", "Карта разведки на месяц", "การ์ดประจำเดือนข่าวกรอง", "بطاقة معلومات شهرية", "Carta mensual Intel", "Deals tab."],
   ["Remaining", "剩餘次數", "남은 횟수", "Verbleibend", "Restant(s)", "Restante", "Kalan", "Sisa", "Осталось", "คงเหลือ", "المتبقي", "Restantes", "Item stock. Shops: ID 'Tersisa', AR 'متبقي', ES 'Restante'."]
  ]
 },
 {
  "cat": "Gathering",
  "rows": [
   ["Expiring", "剩餘存在時間", "남은 시간", "Läuft ab", "Expiration", "Tempo Restante", "Süresi bitiyor", "Akan Kedaluwarsa", "Истекает через", "หมดอายุ", "تنتهي الصلاحية", "Expira", "Resource tile popup. PT uses the same words as Time Left."],
   ["Gathered", "我已採集", "채집 완료", "Gesammelt", "Collectées", "Coletado", "Toplandı", "Dikumpulkan", "Собрано", "เก็บแล้ว", "ما تم جمعه", "Recolectado"],
   ["Time Left", "我的採集剩餘時間", "나의 남은 채집 시간", "Verbleibende Zeit", "Temps Restant", "Tempo restante", "Kalan Süre", "Sisa Waktu", "Осталось времени", "เวลาคงเหลือ", "الوقت المتبقي", "Tiempo restante"],
   ["Gathering Speed", "我的採集速度", "나의 채집 속도", "Sammelgeschwindigkeit", "Vitesse de Collecte", "Velocidade da Coleta", "Toplama Hızı", "Kecepatan Mengumpulkan", "Скорость сбора", "สปีดการเก็บทรัพยากร", "سرعة الجمع", "Velocidad de Recolección"],
   ["Gathering Squad", "採集部隊", "부대 채집", "Sammelschwadron", "Escouade de Collecte", "Esquadrão de Coleta", "Toplama Ekibi", "Squad Pengumpul", "Отряд сборщиков", "ทีมเก็บรวบรวม", "فرقة الجمع", "Escuadrón de Recolección"],
   ["Gather", "採集", "채집", "Sammeln", "Collecte", "Coleta", "Topla", "Kumpul", "Сбор", "การเก็บทรัพยากร", "جمع", "Recolectar", "Button. Compare the Gathering row (status)."]
  ]
 },
 {
  "cat": "Pet Adventure",
  "rows": [
   ["Pet Adventure", "寵物尋寶", "펫 보물찾기", "Begleittier Abenteuer", "Aventure Animalière", "Aventura do Pet", "Evcil Hayvan Macerası", "Petualangan Hewan Peliharaan", "Приключение питомца", "การผจญภัยสัตว์เลี้ยง", "مغامرة الحيوان الأليف", "Aventura de Mascotas"],
   ["Governor Stamina", "領主體力", "영주 스태미나", "Gouverneur-Ausdauer", "Endurance du Chef", "Vigor do Chefe", "Şef Enerjisi", "Stamina Gubernur", "энергию губернатора", "ความแข็งแกร่งผู้นำ", "قدرة تحمل الحاكم", "Vigor de Líder", "Rules text."],
   ["Treasure spot", "藏寶點", "보물 거점", "Schatzplätze", "sites au trésor", "locais de tesouro", "hazine noktası", "lokasi harta karun", "клад", "จุดสมบัติ", "بقعة الكنوز", "lugares con tesoros", "Rules text."],
   ["Personal Treasure", "—", "나만의 보물", "persönlicher Schatz", "Trésor Individuel", "tesouro pessoal", "kişisel bir hazine", "Harta Karun Pribadi", "личные сокровища", "สมบัติส่วนบุคคล", "كنزاً شخصياً", "tesoro personal", "Rules text."],
   ["Ally Treasure", "聯盟寶藏", "연맹 보물", "—", "Trésor d'Allié", "tesouro compartilhado com o aliado", "paylaşılabilir bir müttefik hazinesi", "Harta Karun Sekutu", "сокровища союзников", "สมบัติพันธมิตรที่แบ่งปันได้", "كنز مشترك يمكن مشاركته مع الحلفاء", "tesoro compartible con aliados", "Rules text. DE only describes it in a sentence."]
  ]
 },
 {
  "cat": "Shops",
  "rows": [
   ["Nomadic Merchant", "流浪商人", "떠돌이 상인", "Nomaden Händler", "Marchand Nomade", "Comerciante Nômade", "Göçebe Tüccar", "Pedagang Nomaden", "Торговец-кочевник", "พ่อค้าพเนจร", "تاجر بدوي", "Mercader nómade", "Shop tab."],
   ["Mystery (shop)", "神秘商店", "신비한 상점", "Rätsel", "Mystère", "Mistério", "Gizem", "Misteri", "Тайный магазин", "ปริศนา", "الغموض", "Misterio", "Shop tab. DE literally 'riddle'."],
   ["Arena (shop)", "競技商店", "경기장 상점", "Arena", "Arène", "Arena", "Arena", "Arena", "Магазин арены", "อารีน่า", "الساحة", "Arena", "Shop tab."],
   ["VIP (shop)", "VIP商店", "VIP 상점", "VIP", "VIP", "VIP", "VIP", "VIP", "VIP-магазин", "VIP", "VIP", "VIP", "Shop tab."],
   ["Alliance Championship Shop", "爭霸賽商店", "챔피언십 상점", "Meisterschafts Laden", "Magasin du Championnat de l'Alliance", "Loja do Campeonato da Aliança", "İttifak Şampiyonası Mağazası", "Tingkat Kejuaraan Aliansi", "Магазин чемпионата альянса", "ร้านค้าการแข่งขันชิงแชมป์พันธมิตร", "متجر بطولة التحالف", "Tienda de Campeonato de alianza", "Shop tab. ID reads 'Alliance Championship Tier'."],
   ["Swordland (shop)", "聖劍商店", "성검 상점", "Schwertland", "Glaive", "Terra das Espadas", "Kılıçdiyarı", "Swordland", "Магазин Страны мечей", "ดินแดนดาบ", "أرض السيوف", "Tierra de Espadas", "Shop tab."],
   ["Kingdom of Power (shop)", "最強王國商店", "최강 왕국 상점", "Königreich der Macht", "Royaume au Pouvoir", "Reino de Poder", "En Güçlü Krallık", "Kerajaan Kekuatan", "Мощь государств", "อาณาจักรแห่งอำนาจ", "مملكة القوة", "Reino del Poder", "Shop tab."],
   ["Skin (shop)", "裝扮商店", "스킨 상점", "Verkleidung", "Thème", "Skin", "Görünüm", "Skin", "Магазин обликов", "สกิน", "مظهر", "Apariencias", "Shop tab."],
   ["Trial Shop", "試煉挑戰商店", "시련 도전 상점", "Prüfungsladen", "Magasin du Défi", "Loja da Prova", "İmtihan Mağazası", "Toko Ujian", "Магазин испытания", "ร้านค้าบททดสอบ", "متجر الاختبارات", "Tienda de Pruebas", "Shop tab (Mystic Trial currency)."],
   ["Gem (shop)", "鑽石商店", "다이아 상점", "Edelstein", "Gemme", "Gema", "Elmas", "Gem", "Магазин алмазов", "เพชร", "الجوهرة", "Gemas", "Shop tab."],
   ["Trial Crystal", "試煉晶石", "시련 결정", "Prüfungskristall", "Cristal du défi", "Cristal da Prova", "İmtihan Kristali", "Kristal Ujian", "Кристалл баталий", "คริสตัลบททดสอบ", "كريستال الاختبارات", "Cristal de Pruebas", "Trial Shop currency, from Mystic Trial (Get More popup)."],
   ["Refresh", "更新", "새로고침", "Aktualisieren", "Actualiser", "Atualizar", "Yenile", "Perbarui", "Обновить", "รีเฟรช", "تحديث", "Recargar", "Mystery shop button."],
   ["Sold out", "已售罄", "매진", "Ausverkauft", "Épuisé", "Esgotado", "Tükendi", "Habis", "Распродано", "หมดแล้ว", "مباع", "Agotado"],
   ["Exclusive Item", "專屬商品", "전용 상품", "Exklusiver Gegenstand", "Objet Exclusif", "Item Exclusivo", "Özel Öge", "Item Eksklusif", "Эксклюзивный предмет", "ไอเทมพิเศษ", "عنصر حصري", "Artículo exclusivo"],
   ["Today", "今日", "오늘", "Heute", "Aujourd'hui", "Hoje", "Bugün", "Hari ini", "Сегодня", "วันนี้", "اليوم", "Hoy", "Alliance shop tab."],
   ["Week", "本週", "이번주", "Woche", "Semaine", "Semana", "Hafta", "Mingguan", "Неделя", "สัปดาห์", "أسبوع", "Semana", "Alliance shop tab."]
  ]
 },
 {
  "cat": "Items",
  "rows": [
   ["Gen 2 Custom Hero Widget Chest", "第2代英雄零件客製化箱子", "제2세대 영웅 부속품 선택 상자", "2. Gen.Held Elementkiste", "Boîte Comp Héros Myth Pers Gén. 2", "Baú de Ferramenta do Herói Personalizado 2ª Geração", "2. Nesil Özel Kahraman Aleti Sandığı", "Peti Widget Custom Gen 2", "Персонализированный ящик 2-го поколения с поделкой героя", "หีบอุปกรณ์เสริมฮีโร่กำหนดเองรุ่นที่ 2", "صندوق أجزاء البطل المخصص من الجيل الثاني", "Cofre Compl Héroe Pers Gen 2", "Mystery shop. FR/ES are abbreviated in-game. PT text calls the widget 'Dispositivo'."],
   ["Custom Mythic Hero Gear Chest", "傳說英雄裝備客製化箱子", "레전드 영웅 장비 상자", "Mythische Heldenausrüstungs Kiste", "Caisse d'Équipement de Héros Mythique Personnalisée", "Baú de Equip. de Herói Mítico Personalizado", "Özel Mitik Kahraman Donanımı Sandığı", "Peti Perlengkapan Pahlawan Mitos Khusus", "Личное мифическое снаряжение героя", "หีบอุปกรณ์ฮีโร่ขั้นเทพกำหนดเอง", "صندوق عتاد البطل الخيالي المخصص", "Caja de equipo de héroe mítico personalizada", "Arena shop."],
   ["Mythic Hero Gear", "傳說品質英雄裝備", "레전드 품질 영웅 아이템", "Mythische Heldenausrüstung", "Équipement de Héros Mythique", "Equipamento do Herói Mítico", "Mitik Kahraman Donanımı", "Perlengkapan Pahlawan Mitos", "снаряжение мифического героя", "อุปกรณ์ฮีโร่ขั้นเทพ", "عتاد البطل الخيالي", "Equipo de héroe mítico", "Chest description."],
   ["Transfer Pass", "移民授權書", "이민 허가증", "Transfer-Pass", "Passe de Transfert", "Passe de Transferência", "Transfer Bileti", "Transfer Pass", "Пропуск переноса", "บัตรผ่านการย้าย", "تذكرة الانتقال", "Pase de transferencia", "Alliance shop."],
   ["Kingdom Transfer", "王國移民", "왕국 이민 이벤트", "Königreichsmigration Event", "Transfert de Royaume", "Transferência de Reino", "Krallık Transferi", "Transfer Kerajaan", "«Перенос города»", "อีเวนต์การย้ายอาณาจักร", "فعالية نقل المملكة", "Transferencia de Reino", "Transfer Pass description. RU says 'city transfer'."],
   ["Sources", "取得來源", "획득처", "Quelle", "Source", "Fonte", "Kaynak", "Sumber", "Источник", "แหล่งที่มา", "المصدر", "Fuente", "Item tooltip."],
   ["Buy Packs", "禮包購買", "패키지 구매", "Pakete kaufen", "Acheter des Packs", "Comprar Pacotes", "Paket Satın Al", "Beli Paket", "Покупка наборов", "ซื้อแพ็กเกจ", "شراء باقات", "Comprar paquetes", "Item tooltip source line."]
  ]
 },
 {
  "cat": "City Skin",
  "rows": [
   ["City Skin", "城鎮裝扮", "도시 스킨", "Siedlung Verkleidung", "Thème de Ville", "Skin da Cidade", "Şehir Görünümü", "Skin Pemukiman", "Облик города", "สกินค่าย", "مظهر المدينة", "Apariencia Ciudad", "Skin popup title. Not the same as March Skin (KO 행군 스킨)."],
   ["House of Cacti (Permanent)", "仙人掌小屋（永久）", "선인장 오두막(영구)", "Haus der Kakteen (Dauerhaft)", "Maison des Cactus (Perm)", "Casa dos Cactos (Permanente)", "Kaktüs Evi (Kalıcı)", "House of Cacti (Permanen)", "Обитель кактусов (бессрочно)", "อาณาจักรกระบองเพชร (ถาวร)", "بيت الصبار (دائم)", "Casa de los cactus (permanente)", "ID is left in English. TH reads 'Cactus Kingdom'."],
   ["In Wilderness", "野外展示", "야외 보기", "Wildnisanzeige", "Affichage Nature", "Exibição na Região Selvagem", "Yaban Görünümü", "Tampilan Alam Liar", "Вид с высоты", "ภาพแดนเถื่อน", "عرض البرية", "En el campo"],
   ["Preview", "預覽", "미리보기", "Vorschau", "Aperçu", "Prever", "Önizleme", "Pratinjau", "Предпросм.", "ดูตัวอย่าง", "معاينة", "Vista previa"],
   ["Stat Bonus (Activated upon Acquisition)", "屬性加成（擁有即啟用）", "속성 버프(보유 즉시 활성화됨)", "Wert-Bonus (Aktiviert bei Erwerb)", "Bonus de stat (Actif dès l'acquisition)", "Bônus de Estatísticas (Ativado na Aquisição)", "Nitelik Bonusu (Edinildiğinde Etkinleştirilir)", "Bonus Stats (Diaktifkan setelah Akuisisi)", "Бонус к показателям (получите и активируйте)", "โบนัสสถานะ (เปิดใช้งานเมื่อได้รับ)", "مكافأة إحصائية (يتم تفعيلها عند الاستحواذ)", "Bonus de estadísticas (se activa al recibir)"],
   ["Squads' Attack", "部隊攻擊力", "부대 공격력", "Schwadron Angriff", "Attaque des escouades", "Ataque dos Esquadrões", "Ekiplerin Saldırısı", "Attack Skuad", "Атака войск", "พลังโจมตีทีม", "هجوم الفرق", "Ataque de los Escuadrones", "Skin stat bonus."]
  ]
 },
 {
  "cat": "Alliance Mobilization",
  "rows": [
   ["Alliance Mobilization", "聯盟總動員", "연맹 총동원", "Allianzmobilisierung", "Mobilisation de l'Alliance", "Mobilização da Aliança", "İttifak Harekatı", "Pergerakan Aliansi", "Мобилизация альянса", "การระดมพลของพันธมิตร", "تعبئة التحالف", "Movilización de Alianzas", "Event title. ES rules text also says 'Movilización de la Alianza'. New season every two weeks."],
   ["Event Period", "活動時間", "이벤트 기간", "Zeitraum des Events", "Période", "Período do Evento", "Etkinlik Süresi", "Periode Event", "Время события", "ระยะเวลาอีเวนต์", "فترة الفعالية", "Período del Evento", "Rules item 1."],
   ["Participation Requirement", "參與條件", "참여 조건", "Teilnahmevoraussetzung", "Conditions de Participation", "Requisito de Participação", "Katılım Şartı", "Syarat Partisipasi", "Условия участия", "ข้อกำหนดการเข้าร่วม", "متطلبات المشاركة", "Requisito de Participación", "Rules item 2. EN/DE/FR/PT/TR/AR/ES: alliance with MORE THAN 15 members; ZH/KO/RU: 15 or more. TH/ID: TH '15 or more', ID 'more than 15'."],
   ["Obtain Points", "積分取得", "포인트 획득", "Erhalt von Punkten", "Obtenir des Points", "Obter Pontos", "Puan Kazanımı", "Mendapatkan Poin", "Получение очков", "การรับคะแนน", "الحصول على النقاط", "Obtención de Puntos", "Rules item 3."],
   ["Alliance Points", "聯盟積分", "연맹 포인트", "Allianzpunkte", "Points d'Alliance", "Pontos da Aliança", "İttifak Puanı", "Poin Aliansi", "очки альянса", "คะแนนพันธมิตร", "نقاط تحالف", "Puntos de Alianza", "Points each member earns, summed per alliance."],
   ["Refresh Event Mission", "更新活動任務", "이벤트 임무 새로고침", "Eventmission aktualisieren", "Actualiser une Mission d'Évènement", "Atualizar Missão do Evento", "Etkinlik Görevini Yenileme", "Refresh Misi Event", "Обновление миссий события", "การรีเฟรชภารกิจอีเวนต์", "تحديث مهام الفعالية", "Actualizar la Misión del Evento", "Rules item 4. KO says only 1 refresh per day can roll a 200% mission; other languages say only 1 exclusive mission per day gives 200%."],
   ["Exclusive mission", "專屬任務", "전용 임무", "exklusive Mission", "mission exclusive", "missão exclusiva", "özel görev", "misi eksklusif", "личная миссия", "ภารกิจพิเศษ", "مهمة حصرية", "misión exclusiva", "RU literally 'personal mission'. ES item 4 first says 'misiones personales', then 'misión exclusiva'."],
   ["Public mission", "公共任務", "공통 임무", "öffentliche Mission", "mission publique", "missão pública", "herkese açık görev", "misi publik", "общая миссия", "ภารกิจส่วนรวม", "المهام العامة", "misión pública", "R4+ can refresh these."],
   ["Abandon Event Mission", "放棄活動任務", "이벤트 임무 포기", "Eventmission aufgeben", "Abandonner une Mission de l'Évènement", "Abandonar Missão do Evento", "Etkinlik Görevini İptal Etme", "Membatalkan Misi Event", "Отказ от миссии", "การยกเลิกภารกิจอีเวนต์", "ترك مهام الفعالية", "Abandonar Misión del Evento", "Rules item 5."],
   ["Custom Mission Voucher", "自選任務券", "임무 선택권", "Benutzerdefiniertes Missionsticket", "Coupon de Mission Personnalisée", "Voucher de Missão Personalizada", "Özel Görev Kuponu", "Voucher Misi Custom", "ваучер пользовательской миссии", "บัตรภารกิจแบบกำหนดเอง", "قسيمة مهمة مخصصة", "Cupón de misión personalizada", "Rules item 6: first exclusive mission of the day gives double points, later ones 120%."],
   ["Ranking Display Phase", "排名展示階段", "랭킹 표시 단계", "Anzeigephase der Rangliste", "phase d'Affichage du classement", "Fase de Exibição do Ranking", "Görüntüleme Aşaması", "Fase Tampilan", "фаза отображения", "ช่วงแสดงอันดับ", "مرحلة عرض الترتيب", "Fase de visualización de la clasificación", "Rules item 7."],
   ["League Overview", "聯賽說明", "리그 설명", "Ligaübersicht", "Aperçu de la Ligue", "Visão Geral da Liga", "Lig Genel Bakış", "Ringkasan Liga", "Обзор лиг", "ภาพรวมการแข่งขันชิงแชม", "نظرة عامة على الدوري", "Resumen de la Liga", "Rules section heading. TH heading drops the final 'ป์' (ชิงแชม)."],
   ["League Event", "活動聯賽", "이벤트 리그", "Ligaevent", "Évènement de Ligue", "Evento da Liga", "Lig Etkinliği", "Event Liga", "Лиги события", "อีเวนต์การแข่งขันชิงแชมป์", "فعالية الدوري", "Evento de Liga", "League item 1."],
   ["League Tier Ranking", "聯賽升級", "리그 레벨업", "Liga-Stufenrang", "Classement des Paliers de Ligue", "Classificação de Nível da Liga", "Lig Kademe Sıralaması", "Peringkat Tier Liga", "Рейтинг лиг", "อันดับการแข่งขันชิงแชมป์", "ترتيب مستويات الدوري", "Categorías de Liga", "League item 2. Promotion: reach milestone Lv. 8 and finish top 3."],
   ["Rookie (league tier)", "新手", "초보", "Anfänger", "Débutant", "Novato", "Çaylak", "Rookie", "Начальная", "มือใหม่", "المبتدئ", "Principiante", "Tier 1 (lowest). PT demote text says 'Liga Rookie'. AR demote text names 'الناشئين' (tier 2) as the lowest — game error. ID keeps the English tier names."],
   ["Junior (league tier)", "初級", "초급", "Junior", "Cadet", "Junior", "Ast", "Junior", "Младшая", "รุ่นเล็ก", "الناشئ", "Iniciada", "Tier 2."],
   ["Senior (league tier)", "菁英", "엘리트", "Senior", "Supérieur", "Senior", "Kıdemli", "Senior", "Старшая", "รุ่นเดอะ", "المتمرس", "Experimentada", "Tier 3. ⚠️ ZH/KO words look like 'Elite' — match by order, not meaning."],
   ["Elite (league tier)", "榮耀", "명예", "Elite", "Élite", "Elite", "Seçkin", "Elite", "Элитная", "ชั้นยอด", "النخبة", "Élite", "Tier 4. ⚠️ ZH/KO words mean 'Honor' — match by order, not meaning."],
   ["Legendary (league tier)", "傳奇", "레전드", "Legendär", "Légende", "Lendário", "Efsanevi", "Legendary", "Легендарная", "ระดับตำนาน", "الأسطوري", "Legendaria", "Tier 5 (highest)."],
   ["Milestone (promotion level)", "里程碑獎勵", "이정표 보상", "Meilenstein", "étape", "marco", "Eşik noktası", "milestone", "уровень прогресса", "—", "الإنجاز", "objetivo", "Inside League item 2 ('milestone level 8'). TH text just says 'ระดับ 8'."],
   ["Tier Demote", "聯賽降級", "리그 강등", "Zurückstufen", "Rétrogradation", "Rebaixamento de Tier", "Kademe Düşürme", "Penurunan Tier", "Понижение ступени", "การลดขั้น", "تخفيض الرتبة", "Descenso de Categoría", "League item 3: bottom 3 of each tier drop one tier."],
   ["Ranking Rule", "排名規則", "랭크 규칙", "Rangregeln", "Règle du Classement", "Regra de Classificação", "Sıralama Kuralı", "Aturan Peringkat", "Правило присвоения рейтинга", "กติกาอันดับ", "قواعد الترتيب", "Regla de Clasificación", "League item 4: ties go to whoever reached the points first."],
   ["Note (rules)", "注意", "주의", "Hinweis", "Remarque", "Observação", "Not", "Catatan", "Примечание", "หมายเหตุ", "ملاحظة", "Nota", "Rules label (Alliance Mobilization item 7 / Champagne Fair rules)."]
  ]
 },
 {
  "cat": "Champagne Fair",
  "rows": [
   ["Champagne Fair", "香檳市集", "샴페인 시장", "Champagner-Messe", "Foire au Champagne", "Feira do Champanhe", "Şampanya Fuarı", "Champagne Fair", "Шипучая ярмарка", "เทศกาลแชมเปญ", "معرض العصير", "Feria del champán", "Events calendar. RU literally 'Sparkling Fair', AR 'Juice Fair'. Exchange unneeded items; shards of heroes not at max stars can't be exchanged. ID keeps the English name. ID keeps the English name."],
   ["Fair Vouchers", "市集商券", "시장 티켓", "Messe-Gutscheine", "coupons de foire", "Vouchers da Feira", "Fuar Kuponları", "Kupon Pameran", "купоны ярмарки", "บัตรกำนัลเทศกาล", "قسائم المعرض", "Cupones de la Feria", "Champagne Fair currency (rules text)."],
   ["Hero Rally", "英雄集結", "영웅 집결", "Helden-Rally", "Ralliement de Héros", "Rally do Herói", "Kahraman Seferberliği", "Reli Pahlawan", "Героический рейд", "ทีมระดมพลฮีโร่", "حشد البطل", "—", "Events calendar bar. ES bar is cut off ('Ataque conjunto de…')."]
  ]
 },
 {
  "cat": "Appointment (King's Castle)",
  "rows": [
   ["Appointment", "官職任命", "관직 임명", "Ernennung", "Nomination", "Nomeação", "Atama", "Pertemuan", "Назначение", "การแต่งตั้ง", "التعيين", "Designación", "Window title (King's Castle). ID literally 'meeting' — game mistranslation. Used in guides as 'King Appointments' buffs."],
   ["Ministers (tab)", "官員", "관료", "Minister", "Ministres", "Ministros", "Bakanlar", "Menteri", "Министры", "รัฐมนตรี", "الوزراء", "Ministros", "Appointment window tab."],
   ["Offender (tab)", "罪人", "죄수", "Täter", "Criminel", "Infrator", "Suçlu", "Pelanggar", "Преступники", "ผู้กระทำผิด", "الخطاة", "Infractor", "Appointment window tab."],
   ["The King may appoint Ministers", "國王可以任命官員", "국왕은 관료를 임명할 수 있습니다.", "Der König kann Minister ernennen", "Le Roi peut nommer des Ministres", "O Rei pode nomear Ministros", "Kral, Bakanlar atayabilir", "Raja dapat menunjuk Menteri", "Король может назначать министров", "ประธานาธิบดีสามารถแต่งตั้งเสนาบดี", "يجوز للملك تعيين الوزراء", "El Rey puede designar ministros", "Banner text. TH says 'President' instead of King."],
   ["Chief Minister", "總理大臣", "총리대신", "Höchster Minister", "Premier Ministre", "Primeiro-ministro", "Başbakan", "Perdana Menteri", "Премьер-министр", "อัครเสนาบดี", "رئيس الوزراء", "Ministro principal", "Position."],
   ["Minister of Justice", "司法大臣", "사법대신", "Justizminister", "Ministre de la Justice", "Ministro da Justiça", "Adalet Bakanı", "Menteri Kehakiman", "Министр юстиции", "เสนาบดียุติธรรม", "وزير العدل", "Ministro de justicia", "Position."],
   ["Minister of the Interior", "內務大臣", "내무대신", "Innenminister", "Ministre de l'Intérieur", "Ministro do Interior", "İçişleri Bakanı", "Menteri Dalam Negeri", "Министр внутренних дел", "เสนาบดีมหาดไทย", "وزير الداخلية", "Ministro del interior", "Position."],
   ["Field Commander", "軍團長", "군단장", "Einsatzkommandant", "Commandant Militaire", "Comandante de Campo", "Saha Komutanı", "Komandan Lapangan", "Войсковой командир", "ผู้บัญชาการสนาม", "قائد ميداني", "Comandante de campo", "Position."],
   ["Marshal", "統帥", "원수", "Marschall", "Maréchal", "Marechal", "Mareşal", "Marshal", "Маршал", "จอมพล", "مشير", "Mariscal", "Position."],
   ["Noble Advisor", "參謀長", "참모장", "Nobler Berater", "Noble Conseiller", "Conselheiro Nobre", "Asil Danışman", "Penasihat Kerajaan", "Советник", "ขุนนางที่ปรึกษา", "مستشار نبيل", "Noble asesor", "Position. ZH/KO literally 'Chief of Staff'; RU just 'Advisor'; ID 'Royal Advisor'."],
   ["Not Appointed", "未任命", "미임명", "Keine Ernennung", "Aucune Nomination", "Nenhuma Nomeação", "Kimse Atanmadı", "Tidak ada yang ditunjuk", "Не назначено", "ไม่ได้แต่งตั้งผู้ใด", "لم يتم تعيين أحد", "Nadie designado", "Empty position label."],
   ["Reserved", "已成功預約", "예약에 성공했습니다", "Reservierungen", "Retenu(e) pour", "Reservado", "Rezerve Edildi", "Direservasi", "Зарезервировано", "จองแล้ว", "تم الحجز", "Reservado", "Bottom bar after booking a position. ZH/KO are full sentences ('successfully reserved'); DE is plural."],
   ["Appointed in", "距離任命", "임명까지", "Ernennung in", "Nommé(e) dans", "Indicou em", "Atanma zamanı", "Ditunjuk dalam", "Назначается на", "ได้รับการแต่งตั้งใน", "سيتم تعيين بعد", "Designado en", "Countdown on the bottom bar. AR text order is garbled in-game."]
  ]
 },
 {
  "cat": "Gen 3 Heroes",
  "rows": [
   ["Eric", "艾瑞克", "에릭", "Eric", "Éric", "Eric", "Eric", "—", "Эрик", "อีริค", "إيريك", "Eric", "Gen 3 SSR infantry hero (S3)."],
   ["Petra", "小佩拉", "리틀 페라", "Petra", "Petra", "Petra", "Petra", "—", "Петра", "เพตรา", "بيترا", "Petra", "Gen 3 SSR cavalry hero (S3). ZH/KO add 'Little' (小 / 리틀)."],
   ["Jaeger", "耶格爾", "예거", "Jaeger", "Jaeger", "Jaeger", "Jaeger", "—", "Йегер", "เยเกอร์", "ييجر", "Jaeger", "Gen 3 SSR archer hero (S3)."],
   ["At Max Level & Stars", "最高等級和星級屬性", "최대 레벨 및 성급 속성", "Max Level und Sterne-Bewertung", "Niveau et Nombre d'Étoiles au Max", "Nível Máx. e Classificação de Estrelas", "Maks Seviye ve Yıldız Derecesi", "—", "Макс. ур. и звездный рейтинг", "เลเวลและดาวสูงสุด", "أقصى مستوى وتصنيف النجوم", "Nv. y estrellas máx.", "Hero stat preview banner."],
   ["Hero Attack", "英雄攻擊力", "영웅 공격", "Heldenangriff", "Attaque du Héros", "Ataque do Herói", "Kahraman Saldırısı", "—", "Атака героя", "พลังโจมตีฮีโร่", "هجوم البطل", "Ataque de héroe", "Conquest stat."],
   ["Hero Defense", "英雄防禦力", "영웅 방어", "Heldenverteidigung", "Défense du Héros", "Defesa do Herói", "Kahraman Savunması", "—", "Защита героя", "พลังป้องกันฮีโร่", "دفاع البطل", "Defensa de héroe", "Conquest stat."],
   ["Hero Health", "英雄生命值", "영웅 HP", "Heldengesundheit", "Santé du Héros", "Vida do Herói", "Kahraman Sağlığı", "—", "Здоровье героя", "พลังชีวิตฮีโร่", "صحة البطل", "Salud de héroe", "Conquest stat."],
   ["Expedition", "遠征", "원정", "Expedition", "Expédition", "Expedição", "Sefer", "Ekspedisi", "Экспедиция", "การออกเดินทาง", "الحملة الاستكشافية", "Expedición", "Stat section heading on hero and master pages (same word as in Expedition Skills / Stats)."],
   ["Infantry Attack", "步兵攻擊力", "보병 공격력", "Infanterie-Angriff", "Attaque de l'Infant.", "Ataque da Infantaria", "Piyade Saldırısı", "—", "Атака пехоты", "พลังโจมตีทหารราบ", "هجوم المشاة", "Ataque de Infantería", "Expedition stat. FR abbreviated."],
   ["Infantry Defense", "步兵防禦力", "보병 방어력", "Infanterie-Verteidigung", "Défense de l'Infant.", "Defesa da Infantaria", "Piyade Savunması", "—", "Защита пехоты", "พลังป้องกันทหารราบ", "دفاع المشاة", "Defensa de Infantería", "Expedition stat. FR abbreviated."],
   ["Cavalry Attack", "騎兵攻擊力", "기병 공격력", "Kavallerie-Angriff", "Attaque de la Caval.", "Ataque da Cavalaria", "Süvari Saldırısı", "—", "Атака кавалерии", "พลังโจมตีทหารม้า", "هجوم الفرسان", "Ataque de Caballería", "Expedition stat."],
   ["Cavalry Defense", "騎兵防禦力", "기병 방어력", "Kavallerie-Verteidigung", "Défense de la Caval.", "Defesa da Cavalaria", "Süvari Savunması", "—", "Защита кавалерии", "พลังป้องกันทหารม้า", "دفاع الفرسان", "Defensa de Caballería", "Expedition stat."]
  ]
 },
 {
  "cat": "Master Academy",
  "rows": [
   ["Master Academy", "大師學院", "거장 아카데미", "Meisterakademie", "Académie des Experts", "Academia dos Mestres", "Usta Akademisi", "—", "Университет мастеров", "สถาบันมาสเตอร์", "أكاديمية المتخصصين", "Academia de Maestros", "City building, unlocks at Town Center 25 (Gen 3). Master = KO 거장, FR Expert, AR متخصص (specialist), RU uses Университет like the Academy row."],
   ["Master List", "大師列表", "거장 리스트", "Meisterliste", "Liste d'experts", "Listra de Mestre", "Usta Listesi", "Daftar Master", "Список мастеров", "รายชื่อมาสเตอร์", "قائمة المتخصصين", "Lista de maestros", "Journey screen button. PT 'Listra' is a game typo for 'Lista'."],
   ["Master Stats", "大師總屬性", "거장 총 속성", "Meister-Werte", "Stats d'expert", "Atributos de Mestre", "Usta Nitelikleri", "—", "Показатели мастера", "ค่าสถานะมาสเตอร์", "سمات المتخصص", "Atributos de maestro", "Master page pop-up. ZH/KO say 'total'."],
   ["Max Affinity Stats", "好感度滿級屬性", "호감도 최대 레벨 속성", "Max. Affinität-Werte", "Stats d'Affinité Max", "Atributos de Afinidade Máxima", "Maks. Yakınlık Nitelikleri", "Stat Kedekatan Maks", "Макс. показатели сближения", "ค่าสถานะความสัมพันธ์สูงสุด", "إحصائيات التقارب القصوى", "Atributos de Afinidad máx.", "Master info banner."],
   ["Talent", "天賦", "재능", "Talent", "Talent", "Talento", "Yetenek", "Talenta", "Талант", "ความสามารถ", "المواهب", "Talento", "Master passive. TR is the singular of 'Yetenekler' (Skills)."],
   ["Reach 1000 Affinity and the Master will settle in the Town.", "好感度達到1,000，大師將進駐城鎮", "호감도가 1000에 도달해 거장을 도시에 입주시킬 수 있습니다.", "Erreiche 1000 Affinität und der Meister wird sich in der Stadt niederlassen.", "Atteins 1000 en affinité et l'expert s'installera dans le village.", "Alcance 1000 de Afinidade, e o Mestre vai se estabelecer na cidade.", "1000 Yakınlığa ulaştığında Usta Şehre yerleşecektir.", "Capai 1000 Kedekatan dan Master akan menetap di Kota.", "Получите 1000 очк. сближения, и мастер поселится в городе.", "เมื่อค่าความสัมพันธ์ถึง 1,000 หน่วย มาสเตอร์จะตั้งถิ่นฐานในเมือง", "عند الوصول إلى 1000 تقارب، سيستقر المتخصص في البلدة.", "Alcanza 1000 de Afinidad y el maestro se establecerá en la colonia.", "Unlock condition text. Use it to find each language's word for Affinity."],
   ["Relationship Advancement", "關係進階", "관계 진급", "Beziehungs-fortschritt", "Progrès de la Relation", "Avanço no Relacionamento", "İlişki İlerlemesi", "—", "Улучшение отношений", "พัฒนาความสัมพันธ์", "تقدم العلاقة", "Avance de relación", "Master page button. DE hyphenated on the button."],
   ["Relationship Advancement Preview", "關係進階預覽", "관계 진급 예측", "Beziehungsfortschritt-Vorschau", "Aperçu du Progrès de la Relation", "Prévia do Avanço no Relacionamento", "İlişki İlerlemesi Önizlemesi", "—", "Предпросмотр улучшения отношений", "ดูตัวอย่างการพัฒนาความสัมพันธ์", "معاينة تقدم العلاقة", "Vista previa de Avance de relación", "Window title."],
   ["Expertise Level Up", "精通等級提升", "전문 분야 레벨 상승", "Fachwissen-Levelaufstieg", "Expertise : Niv. sup.", "Especialidade Subiu de Nível", "Uzmanlık Seviyesi Artışı", "—", "Повышение уровня экспертности", "เลเวลความชำนาญเพิ่มขึ้น", "الارتقاء بمستوى الإتقان", "Mejor de nivel de experiencia", "Relationship reward line. ES 'Mejor' is a game typo for 'Mejora'."],
   ["Raise Master Affinity to upgrade Status", "提升好感度等級，可進階與大師的關係", "호감도 레벨을 올려서 거장 관계를 진급시키세요.", "Erhöhe die Meisteraffinität, um den Status zu verbessern", "Augmente l'affinité d'expert pour améliorer le statut", "Aumente a Afinidade de Mestre para aprimorar o status", "Durumu yükseltmek için Uzman Yakınlığını artır", "—", "Сближайтесь с мастерами, чтобы улучшить статус", "เพิ่มค่าความสัมพันธ์มาสเตอร์เพื่ออัปเกรดสถานะ", "رفع مستوى تقارب المتخصص لترقية الحالة", "Aumenta la Afinidad con el maestro para mejorar el Estado", "Relationship preview footer. TR uses 'Uzman' here but 'Usta' for the building/list."],
   ["Stranger", "素不相識", "모르는 사이", "Fremder", "Étranger", "Estranho", "Yabancı", "—", "Незнакомец", "คนแปลกหน้า", "غريب", "Desconocido", "Relationship status (Lv.1)."],
   ["Acquaintance", "點頭之交", "깊지 않은 교제", "Bekannter", "Relation", "Conhecido", "Tanıdık", "—", "Знакомый", "คนรู้จัก", "معرفة", "Conocido", "Relationship status 1–3 (Lv.10–30). FR 'Relation' is the same word as in Relationship Advancement."],
   ["Casual", "志同道合", "의기투합", "Zwanglos", "Connaissance", "Casual", "Sıradan", "—", "Друг", "ผิวเผิน", "عابرة", "Cordial", "Relationship status 1–3 (Lv.40–60). Meanings differ a lot: ZH 'like-minded', AR 'passing', ID 'close'."],
   ["Close", "赤誠相待", "마음 터놓기", "Eng", "Proche", "Fechado", "Yakın", "—", "Лучший друг", "ใกล้ชิด", "قريبة", "Cercano", "Relationship status 1–3 (Lv.70–90). PT 'Fechado' ('closed') is a game mistranslation."],
   ["Kindred Soul", "莫逆之交", "평생의 친구", "Seelenverwandter", "Alter ego", "Alma Irmã", "Ruh Eşi", "—", "Родственная душа", "มิตรแท้", "روح متآلفة", "Alma gemela", "Relationship status (Lv.100)."],
   ["Squads' Defense", "部隊防禦力", "부대 방어력", "Schwadron Verteidigung", "Défense des escouades", "Defesa dos Esquadrões", "Ekiplerin Savunması", "Defense Skuad", "Защита войск", "พลังป้องกันทีม", "دفاع الفرق", "Defensa de los Escuadrones", "Master Expedition stat (Pan). Squads' Attack is in the City Skin category."],
   ["Reserve Chests", "儲備寶箱", "예비 보물상자", "Reserve-Truhen", "Coffres de Réserve", "Baús de Reserva", "Yedek Sandık", "Peti Cadangan", "сундуки резервов", "หีบกองหนุน", "صناديق الاحتياطي", "cofres de reserva", "Pan's Talent: 5 per 120 min of gathering, daily cap 30."],
   ["Pan", "潘", "판", "Pan", "Pan", "Pan", "Pan", "Pan", "Пан", "แพน", "بان", "Pan", "Master."],
   ["Palace Administrator", "皇室總管", "황실 총지배인", "Palastverwalter", "Administrateur du palais", "Administrador do Palácio", "Saray Yöneticisi", "Administrator Istana", "Дворцовый распорядитель", "ผู้ดูแลพระราชวัง", "مدير القصر", "Administrador de palacio", "Pan's title."],
   ["Valora", "維拉", "베라", "Valora", "Valora", "Valora", "Valora", "Valora", "Валора", "วาโลร่า", "فالورا", "Valora", "Master."],
   ["Bear Hunter", "巨熊主宰", "자이언트 베어 주석", "Bärenjäger", "Chasseur d'ours", "Caça ao Urso", "Ayı Avcısı", "Pemburu Beruang", "Охотница на медведей", "ล่าหมี", "صيد الدببة", "Cazador de osos", "Valora's title. PT/TH/AR show the event name 'Bear Hunt' instead. FR/ES masculine, RU feminine."],
   ["Bear Hunt Damage Points (effective for self only)", "狩獵巨熊所獲得的傷害積分（僅對自己生效）", "자이언트 베어 사냥에서 획득하는 피해 포인트 (자신에게만 적용)", "Bärenjagd-Schadenspunkte (wirkt nur für sich selbst)", "points de dégâts supplémentaires lors de la chasse à l'ours (valable uniquement pour elle-même)", "pontos de danos adicionais para a caça ao urso (eficaz apenas para si mesmo)", "Ayı Avı Hasar Puanı (yalnızca kendi için geçerlidir)", "—", "дополнительного урона в «Охоте на медведя» (действует только на себя)", "คะแนนความเสียหายล่าหมีเพิ่มเติม (มีผลกับตัวเองเท่านั้น)", "نقاط الضرر الإضافية في صيد الدببة (يسري التأثير على الذات فقط)", "puntos de daño de Cacería del Oso adicionales (efectivo solo para sí misma)", "Valora's Talent text (+30%)."],
   ["Master's Manuscript", "大師手稿", "거장의 원고", "Meister-Manuskript", "Manuscrit d'expert", "Manuscrito de Mestre", "Uzmanın El Yazması", "—", "Рукопись мастера", "ตำรามาสเตอร์", "مخطوطة المتخصص", "Manuscrito del maestro", "Item: used to enhance skill levels taught by Masters. PT description starts with the typo 'Usou'."],
   ["General Master Emblem", "通用大師徽記", "공용 거장 배지", "Allgemeines Meister-Emblem", "Emblème d'expert général", "Emblema de Mestre Geral", "Genel Usta Amblemi", "—", "Общая эмблема мастера", "ตรามาสเตอร์ทั่วไป", "شعار متخصص عام", "Emblema de Maestro General", "Item: redeem Master Emblems of Masters in your Town. Master Emblem = the word without 'General'."],
   ["Achievements", "成就", "성과", "Erfolge", "Réussites", "Conquistas", "Başarılar", "—", "Достижения", "ความสำเร็จ", "الإنجازات", "Logros", "Item source. PT 'Conquistas' is close to Conquest ('Conquista')."]
  ]
 },
 {
  "cat": "Realm Journey",
  "rows": [
   ["Realm Journey", "荒野冒險", "황야 모험", "Reichsreise", "Voyage dans le royaume", "Jornada do Reino", "Krallık Yolculuğu", "Perjalanan Alam", "Тропа приключений", "การเดินทางอาณาจักร", "رحلة العالم", "Travesía por el reino", "Signboard on the journey road. ID from the Journey Supplies description."],
   ["Journey", "冒險", "모험", "Reise", "Voyage", "Jornada", "Yolculuk", "—", "Путешествие", "การเดินทาง", "الرحلة", "Travesía", "Item source name (short form of Realm Journey)."],
   ["Frontier Encounter", "荒野奇遇", "황야에서의 우연한 만남", "Grenzbegegnung", "Rencontre frontalière", "Encontro Fronteiriço", "Sınır Karşılaşması", "Pertemuan Frontier", "Встреча заставы", "การผจญภัยชายแดน", "مواجهة الطليعة", "Encuentro en la frontera", "Journey screen button / item source."],
   ["Next Stop", "下一站", "다음 역", "Nächste Station", "Prochain Arrêt", "Próxima Estação", "Sonraki Durak", "Stasiun Berikutnya", "Следующая станция", "สถานีถัดไป", "المحطة التالية", "Siguiente estación", "Journey main button."],
   ["Idle", "掛機", "자동 진행", "Untätig", "Inactif(ve)", "Inativo", "Boşta", "Idle", "Пассивн.", "บอท", "خامل", "Inactivo/a", "Journey toggle. TH literally 'bot'; ID left in English."],
   ["Auto", "自動", "자동", "Auto", "Auto", "Auto", "Oto.", "Otomatis", "Авто", "อัตโนมัติ", "تلقائي", "Automático", "Journey toggle."]
  ]
 },
 {
  "cat": "Master Skills & Supplies",
  "rows": [
   ["Known Masters", "已結識的大師", "이미 만난 거장입니다.", "Bekannte Meister", "Experts connus", "Mestres Conhecidos", "Bilinen Ustalar", "Master Dikenal", "Знакомые мастера", "มาสเตอร์ที่รู้จัก", "المتخصصون المعروفون", "Maestros conocidos", "Journey screen pop-up title. KO is a sentence."],
   ["Savage Advantage", "人數優勢", "수적 우위", "Vorteil des Wilden", "Avantage primitif", "Vantagem Selvagem", "Vahşi Avantaj", "Savage Advantage", "Беспощадное преимущество", "ความได้เปรียบอันดุร้าย", "الأفضلية الوحشية", "Ventaja salvaje", "Valora skill 4: own march squad capacity when taking part in Bear Hunt +3,000 per level (Lv.10: +30,000). Only your own squad; the rally total depends on the launcher. ID skill names are in English."],
   ["Leader By Example", "經驗傳承", "경험 전승", "Vorbildlicher Anführer", "Donner l'exemple", "Líder por Exemplo", "Örnek Lider", "Leader By Example", "Образцовый лидер", "ผู้นำตัวอย่าง", "القائد القدوة", "Liderazgo ejemplar", "Valora skill 2: +5 '100 Enhancement XP' parts per Bear Hunt."],
   ["Weapon Obsession", "武器專精", "무기 마스터리", "Waffenbesessenheit", "Attrait pour les armes", "Obsessão por Armas", "Silah Takıntısı", "Weapon Obsession", "Одержимость снаряжением", "ความหลงไหลในอาวุธ", "هوس السلاح", "Obsesión por las armas", "Valora skill 3: +5 Forgehammers per Bear Hunt. TR text calls the hammer 'Dövme Çekici' (Forgehammer row: 'Demirci Çekici')."],
   ["Dance of the Hunt", "狩獵之舞", "사냥의 춤", "Tanz der Jagd", "Danse de la chasse", "Dança da Caçada", "Av Dansı", "Dance of the Hunt", "Танец охоты", "ระบำแห่งการล่า", "رقصة الصيد", "Danza de la cacería", "Valora skill 1: whole rally squad capacity when launching the Raging Bear rally +30,000 per level (Lv.10: +300,000)."],
   ["Falconer", "獵鷹偵查", "사냥용 매 정찰", "Falkner", "Fauconnier", "Falcoeiro", "Doğancı", "Falconer", "Сокольник", "ผู้ฝึกเหยี่ยว", "الصقار", "Cetrero", "Pan skill 1: +8 daily Watchtower Intel Missions."],
   ["Good Steward", "膳食管理", "식량 관리", "Guter Verwalter", "Bon intendant", "Boa Administração", "İyi Kâhya", "Good Steward", "Хороший стюард", "ผู้ดูแลที่ดี", "الوكيل الصالح", "Encargado eficaz", "Pan skill 2: Governor Stamina recovery from the Storehouse +40. FR text 'endurance du gouverneur' (Pet Adventure page: 'Endurance du Chef')."],
   ["Master Architect", "建築計畫", "건설 계획", "Meisterarchitekt", "Maître-architecte", "Mestre da Arquitetura", "Usta Mimar", "Master Architect", "Великий архитектор", "สถาปนิกชั้นครู", "كبير المهندسين", "Maestro arquitecto", "Pan skill 3: each new construction 8 hours faster."],
   ["Ways and Means", "特殊管道", "특별한 경로", "Mittel und Wege", "L'art et la manière", "Jeitos e Maneiras", "Yollar ve Yöntemler", "Ways and Means", "Методы и средства", "วิธีการและหนทาง", "السبل والوسائل", "Formas y medios", "Pan skill 4: +120 Mystery Badges on daily mission completion, +4 free Mystery Shop refreshes."],
   ["Mystery Badge", "神秘徽章", "신비한 휘장", "mysteriöse Abzeichen", "insignes mystères", "Insígnia Misteriosa", "Gizem Rozeti", "Lencana Misteri", "тайные жетоны", "ตราปริศนา", "الشارات الغامضة", "insignia de misterio", "Mystery Shop currency, seen in Ways and Means. DE/FR/RU/AR/ES seen only in the plural/lowercase. Mystery Shop in this text: DE 'geheimen Laden', ES 'Tienda Misteriosa', PT 'Loja Misteriosa' (tabs: Rätsel / Misterio / Mistério)."],
   ["Journey Supplies", "冒險物資", "모험 물자", "Reisevorräte", "Provisions de voyage", "Suprimentos da Jornada", "Yolculuk Malzemeleri", "Perbekalan Perjalanan", "Припасы путешествия", "เสบียงการเดินทาง", "إمدادات الرحلة", "Suministros de Travesía", "Free Realm Journey item: 20 refreshed daily at 00:00 UTC, 1 per encounter. NOT the same as Adventure Supply. TR text also 'Yolculuk Tedariki'; ES refresh line 'Suministros de Viaje'."],
   ["Adventure Supply", "征程補給", "원정 보급", "Abenteuervorrat", "Provision d'Aventure", "Suprimentos de Aventura", "Macera Tedariki", "Suplai Petualangan", "Припасы для приключений", "เสบียงการผจญภัย", "إمدادات المغامرة", "Suministro de Aventura", "Lostlands item (VIP shop, Frontier Encounter, packs): each journey there consumes 1. NOT the same as Journey Supplies."],
   ["Lostlands", "遺忘之地", "잊혀버린 땅", "Verlorene Lande", "terres perdues", "Terras Perdidas", "Kayıp Diyarlar", "Tanah Terlupakan", "Забытые земли", "ดินแดนสาบสูญ", "الأراضي المفقودة", "Tierras Perdidas", "Seen in the Adventure Supply description (where Pan and Roman are found)."],
   ["Master Emblem", "大師徽記", "거장 배지", "Meister-Emblem", "emblème d'expert", "Emblema Mestre", "Usta Amblemi", "—", "эмблема мастера", "ตรามาสเตอร์", "شعار المتخصص", "emblema de maestro", "From the General Master Emblem description (redeem Master Emblems of Masters in your Town). ZH text: 大師的徽記."]
  ]
 },
];
