/* Data + text for kingdom-map.html (Kingdom #2189 buildings). Coordinates and Outpost levels/buffs were checked against
   in-game screenshots (Outpost Occupied/Occupiable tabs, Ruins tab). buff = % per level. outposts: [type, level, x, y] */
const KINGDOM_MAP = {
 "langs": [
  [
   "en",
   "English"
  ],
  [
   "zh",
   "中文"
  ],
  [
   "ko",
   "한국어"
  ],
  [
   "de",
   "Deutsch"
  ],
  [
   "fr",
   "Français"
  ],
  [
   "pt",
   "Português"
  ],
  [
   "es",
   "Español"
  ],
  [
   "tr",
   "Türkçe"
  ],
  [
   "id",
   "Bahasa Indonesia"
  ],
  [
   "ru",
   "Русский"
  ],
  [
   "th",
   "ภาษาไทย"
  ],
  [
   "ar",
   "العربية"
  ]
 ],
 "ui": {
  "title": {
   "en": "Kingdom #2189 Map",
   "zh": "#2189 王國地圖",
   "ko": "#2189 왕국 지도",
   "de": "Karte Königreich #2189",
   "fr": "Carte du royaume #2189",
   "pt": "Mapa do reino #2189",
   "es": "Mapa del reino #2189",
   "tr": "#2189 Krallık Haritası",
   "id": "Peta Kerajaan #2189",
   "ru": "Карта королевства #2189",
   "th": "แผนที่อาณาจักร #2189",
   "ar": "خريطة المملكة #2189"
  },
  "intro": {
   "en": "Tap a building on the map, or a coordinate in the list, to see where it is. Outposts give buffs; Fortresses and Sanctuaries do not.",
   "zh": "點地圖上的建築，或點下方清單裡的座標，就能看到它在哪裡。Outpost 有增益，Fortress 和 Sanctuary 沒有。",
   "ko": "지도의 건물이나 아래 목록의 좌표를 누르면 위치를 볼 수 있어요. Outpost에는 버프가 있고, Fortress와 Sanctuary에는 없어요.",
   "de": "Tippe auf ein Gebäude auf der Karte oder auf eine Koordinate in der Liste, um zu sehen, wo es liegt. Outposts geben Boni, Fortresses und Sanctuaries nicht.",
   "fr": "Touchez un bâtiment sur la carte ou une coordonnée dans la liste pour voir où il se trouve. Les Outposts donnent des bonus, pas les Fortresses ni les Sanctuaries.",
   "pt": "Toque num edifício no mapa ou numa coordenada da lista para ver onde ele fica. Os Outposts dão bônus; Fortresses e Sanctuaries não.",
   "es": "Toca un edificio en el mapa o una coordenada de la lista para ver dónde está. Los Outposts dan bonificaciones; las Fortresses y los Sanctuaries no.",
   "tr": "Nerede olduğunu görmek için haritadaki bir binaya ya da listedeki bir koordinata dokun. Outpost'lar bonus verir, Fortress ve Sanctuary'ler vermez.",
   "id": "Ketuk bangunan di peta atau koordinat di daftar untuk melihat letaknya. Outpost memberi buff; Fortress dan Sanctuary tidak.",
   "ru": "Нажмите на здание на карте или на координаты в списке, чтобы увидеть, где оно. Outpost дают бонусы, Fortress и Sanctuary — нет.",
   "th": "แตะอาคารบนแผนที่ หรือแตะพิกัดในรายการ เพื่อดูว่าอยู่ตรงไหน Outpost ให้บัฟ ส่วน Fortress และ Sanctuary ไม่ให้",
   "ar": "اضغط على مبنى في الخريطة أو على إحداثية في القائمة لترى مكانه. الـ Outposts تمنح تعزيزات، أما الـ Fortresses والـ Sanctuaries فلا."
  },
  "back": {
   "en": "Guides",
   "zh": "回到攻略",
   "ko": "공략으로",
   "de": "Zu den Guides",
   "fr": "Retour aux guides",
   "pt": "Voltar aos guias",
   "es": "Volver a las guías",
   "tr": "Rehberlere dön",
   "id": "Kembali ke panduan",
   "ru": "К гайдам",
   "th": "กลับไปหน้าคู่มือ",
   "ar": "العودة إلى الأدلة"
  },
  "orient": {
   "en": "Same direction as the in-game World map: up = bigger X and Y. Number on a square = Outpost level.",
   "zh": "方向和遊戲大地圖一樣：往上 = X、Y 都變大。方塊上的數字 = Outpost 等級。",
   "ko": "게임 월드맵과 같은 방향이에요: 위쪽 = X, Y가 커짐. 네모 안 숫자 = Outpost 레벨.",
   "de": "Gleiche Ausrichtung wie die Weltkarte im Spiel: oben = größeres X und Y. Zahl im Quadrat = Outpost-Stufe.",
   "fr": "Même orientation que la carte du monde du jeu : en haut = X et Y plus grands. Chiffre dans le carré = niveau de l'Outpost.",
   "pt": "Mesma direção do mapa-múndi do jogo: para cima = X e Y maiores. Número no quadrado = nível do Outpost.",
   "es": "Misma orientación que el mapa del mundo del juego: arriba = X e Y más altos. Número en el cuadro = nivel del Outpost.",
   "tr": "Oyundaki Dünya haritasıyla aynı yön: yukarı = X ve Y büyür. Karedeki sayı = Outpost seviyesi.",
   "id": "Arahnya sama dengan peta dunia di game: ke atas = X dan Y makin besar. Angka di kotak = level Outpost.",
   "ru": "Ориентация как на карте мира в игре: вверх = X и Y больше. Число в квадрате = уровень Outpost.",
   "th": "ทิศเดียวกับแผนที่โลกในเกม: ขึ้นบน = X และ Y มากขึ้น ตัวเลขในสี่เหลี่ยม = เลเวลของ Outpost",
   "ar": "نفس اتجاه خريطة العالم في اللعبة: للأعلى = X وY أكبر. الرقم في المربع = مستوى الـ Outpost."
  },
  "pick": {
   "en": "Tap a building to see its details.",
   "zh": "點一個建築來看詳細資料。",
   "ko": "건물을 눌러 자세한 정보를 보세요.",
   "de": "Tippe auf ein Gebäude für Details.",
   "fr": "Touchez un bâtiment pour voir ses détails.",
   "pt": "Toque num edifício para ver os detalhes.",
   "es": "Toca un edificio para ver los detalles.",
   "tr": "Ayrıntılar için bir binaya dokun.",
   "id": "Ketuk bangunan untuk melihat detailnya.",
   "ru": "Нажмите на здание, чтобы увидеть детали.",
   "th": "แตะอาคารเพื่อดูรายละเอียด",
   "ar": "اضغط على مبنى لرؤية تفاصيله."
  },
  "all": {
   "en": "All",
   "zh": "全部",
   "ko": "전체",
   "de": "Alle",
   "fr": "Tout",
   "pt": "Todos",
   "es": "Todos",
   "tr": "Tümü",
   "id": "Semua",
   "ru": "Все",
   "th": "ทั้งหมด",
   "ar": "الكل"
  },
  "copy": {
   "en": "Copy",
   "zh": "複製",
   "ko": "복사",
   "de": "Kopieren",
   "fr": "Copier",
   "pt": "Copiar",
   "es": "Copiar",
   "tr": "Kopyala",
   "id": "Salin",
   "ru": "Копировать",
   "th": "คัดลอก",
   "ar": "نسخ"
  },
  "copied": {
   "en": "Copied",
   "zh": "已複製",
   "ko": "복사됨",
   "de": "Kopiert",
   "fr": "Copié",
   "pt": "Copiado",
   "es": "Copiado",
   "tr": "Kopyalandı",
   "id": "Tersalin",
   "ru": "Скопировано",
   "th": "คัดลอกแล้ว",
   "ar": "تم النسخ"
  },
  "noBuff": {
   "en": "No buff",
   "zh": "無增益",
   "ko": "버프 없음",
   "de": "Kein Bonus",
   "fr": "Aucun bonus",
   "pt": "Sem bônus",
   "es": "Sin bonificación",
   "tr": "Bonus yok",
   "id": "Tanpa buff",
   "ru": "Без бонуса",
   "th": "ไม่มีบัฟ",
   "ar": "بلا تعزيز"
  },
  "ruins": {
   "en": "Castle, Fortresses & Sanctuaries",
   "zh": "王城、Fortress、Sanctuary",
   "ko": "King's Castle, Fortress, Sanctuary",
   "de": "Schloss, Fortresses & Sanctuaries",
   "fr": "Château, Fortresses et Sanctuaries",
   "pt": "Castelo, Fortresses e Sanctuaries",
   "es": "Castillo, Fortresses y Sanctuaries",
   "tr": "Şato, Fortress'lar ve Sanctuary'ler",
   "id": "Kastil, Fortress & Sanctuary",
   "ru": "Замок, Fortress и Sanctuary",
   "th": "ปราสาท, Fortress และ Sanctuary",
   "ar": "القلعة والـ Fortresses والـ Sanctuaries"
  },
  "outposts": {
   "en": "Outposts",
   "zh": "Outpost 據點",
   "ko": "Outpost",
   "de": "Outposts",
   "fr": "Outposts",
   "pt": "Outposts",
   "es": "Outposts",
   "tr": "Outpost'lar",
   "id": "Outpost",
   "ru": "Outposts",
   "th": "Outpost",
   "ar": "الـ Outposts"
  },
  "rulesT": {
   "en": "Rules",
   "zh": "規則",
   "ko": "규칙",
   "de": "Regeln",
   "fr": "Règles",
   "pt": "Regras",
   "es": "Reglas",
   "tr": "Kurallar",
   "id": "Aturan",
   "ru": "Правила",
   "th": "กติกา",
   "ar": "القواعد"
  },
  "rules": [
   {
    "en": "Effects from the same Outpost type and level do not stack. Different types stack.",
    "zh": "同類型、同等級的 Outpost 效果不疊加；不同類型可以疊加。",
    "ko": "같은 종류·같은 레벨의 Outpost 효과는 중첩되지 않아요. 종류가 다르면 중첩돼요.",
    "de": "Effekte desselben Outpost-Typs und derselben Stufe stapeln sich nicht. Verschiedene Typen schon.",
    "fr": "Les effets d'un même type et niveau d'Outpost ne se cumulent pas. Des types différents se cumulent.",
    "pt": "Efeitos do mesmo tipo e nível de Outpost não se acumulam. Tipos diferentes se acumulam.",
    "es": "Los efectos del mismo tipo y nivel de Outpost no se acumulan. Los de tipos distintos sí.",
    "tr": "Aynı tür ve seviyedeki Outpost etkileri birikmez. Farklı türler birikir.",
    "id": "Efek dari jenis dan level Outpost yang sama tidak bertumpuk. Jenis yang berbeda bertumpuk.",
    "ru": "Эффекты Outpost одного типа и уровня не складываются. Разные типы складываются.",
    "th": "เอฟเฟกต์จาก Outpost ประเภทและเลเวลเดียวกันไม่ซ้อนกัน แต่ต่างประเภทซ้อนกันได้",
    "ar": "تأثيرات الـ Outpost من نفس النوع والمستوى لا تتراكم. الأنواع المختلفة تتراكم."
   },
   {
    "en": "You can only compete for Outposts that border your alliance territory.",
    "zh": "只能爭奪和自家聯盟領地相鄰的 Outpost。",
    "ko": "우리 연맹 영토와 맞닿은 Outpost만 쟁탈할 수 있어요.",
    "de": "Du kannst nur um Outposts kämpfen, die an euer Allianzgebiet grenzen.",
    "fr": "Vous ne pouvez disputer que les Outposts qui touchent le territoire de votre alliance.",
    "pt": "Só é possível disputar Outposts que fazem fronteira com o território da sua aliança.",
    "es": "Solo puedes disputar Outposts que limiten con el territorio de tu alianza.",
    "tr": "Yalnızca ittifak bölgenize komşu Outpost'lar için savaşabilirsiniz.",
    "id": "Kamu hanya bisa merebut Outpost yang berbatasan dengan wilayah aliansimu.",
    "ru": "Бороться можно только за Outpost, которые граничат с территорией вашего альянса.",
    "th": "แย่งได้เฉพาะ Outpost ที่ติดกับดินแดนพันธมิตรของเรา",
    "ar": "يمكنك التنافس فقط على الـ Outposts المجاورة لأراضي تحالفك."
   },
   {
    "en": "Higher-level Outposts cause more severely injured and lost troops. Severely injured troops go to the Infirmary.",
    "zh": "等級越高的 Outpost，交戰時重傷和陣亡越多；重傷的部隊要到 Infirmary 治療。",
    "ko": "레벨이 높은 Outpost일수록 중상·사망 병력이 많아요. 중상 병력은 Infirmary에서 치료해요.",
    "de": "Höhere Outposts verursachen mehr schwer verwundete und verlorene Truppen. Schwer Verwundete kommen ins Infirmary.",
    "fr": "Les Outposts de haut niveau causent plus de blessés graves et de pertes. Les blessés graves vont à l'Infirmary.",
    "pt": "Outposts de nível mais alto causam mais feridos graves e mortos. Feridos graves vão para a Infirmary.",
    "es": "Los Outposts de nivel más alto causan más heridos graves y bajas. Los heridos graves van a la Infirmary.",
    "tr": "Yüksek seviyeli Outpost'larda daha çok ağır yaralı ve kayıp olur. Ağır yaralılar Infirmary'de tedavi edilir.",
    "id": "Outpost level tinggi menyebabkan lebih banyak pasukan luka berat dan gugur. Luka berat dirawat di Infirmary.",
    "ru": "Чем выше уровень Outpost, тем больше тяжелораненых и погибших. Тяжелораненые лечатся в Infirmary.",
    "th": "Outpost เลเวลสูงทำให้บาดเจ็บสาหัสและตายมากขึ้น ทหารบาดเจ็บสาหัสต้องรักษาที่ Infirmary",
    "ar": "الـ Outposts الأعلى مستوى تسبب جرحى بإصابات خطيرة وقتلى أكثر. الجرحى بإصابات خطيرة يُعالَجون في الـ Infirmary."
   }
  ]
 },
 "types": [
  [
   "arsenal",
   "Arsenal",
   "Squads' Attack",
   "#c0392b"
  ],
  [
   "armory",
   "Armory",
   "Squads' Defense",
   "#2f6fd6"
  ],
  [
   "drill",
   "Drill Camp",
   "Training Speed",
   "#e67e22"
  ],
  [
   "lodge",
   "Frontier Lodge",
   "Squads' March Speed",
   "#16a3a0"
  ],
  [
   "scholar",
   "Scholar's Tower",
   "Research Speed",
   "#8e44ad"
  ],
  [
   "builder",
   "Builder's Guild",
   "Construction Speed",
   "#c9970f"
  ],
  [
   "forager",
   "Forager Grove",
   "Resource Gathering Speed",
   "#2e8b3e"
  ],
  [
   "harvest",
   "Harvest Altar",
   "Resource Production Speed",
   "#7cb342"
  ]
 ],
 "buff": {
  "arsenal": {
   "2": 5,
   "4": 8
  },
  "armory": {
   "2": 5,
   "4": 8
  },
  "drill": {
   "2": 5
  },
  "lodge": {
   "3": 15
  },
  "scholar": {
   "1": 5,
   "3": 8
  },
  "builder": {
   "1": 5,
   "3": 8
  },
  "forager": {
   "1": 5
  },
  "harvest": {
   "1": 5
  }
 },
 "castle": [
  597,
  597
 ],
 "fortress": [
  [
   597,
   800
  ],
  [
   400,
   597
  ],
  [
   597,
   400
  ],
  [
   800,
   597
  ]
 ],
 "sanctuary": [
  [
   237,
   828
  ],
  [
   237,
   606
  ],
  [
   237,
   348
  ],
  [
   366,
   237
  ],
  [
   588,
   237
  ],
  [
   846,
   237
  ],
  [
   957,
   348
  ],
  [
   957,
   606
  ],
  [
   957,
   828
  ],
  [
   846,
   957
  ],
  [
   606,
   957
  ],
  [
   366,
   957
  ]
 ],
 "outposts": [
  [
   "arsenal",
   2,
   138,
   438
  ],
  [
   "arsenal",
   2,
   138,
   867
  ],
  [
   "arsenal",
   2,
   366,
   138
  ],
  [
   "arsenal",
   2,
   438,
   1068
  ],
  [
   "arsenal",
   2,
   867,
   138
  ],
  [
   "arsenal",
   2,
   867,
   1068
  ],
  [
   "arsenal",
   2,
   1068,
   327
  ],
  [
   "arsenal",
   2,
   1068,
   867
  ],
  [
   "arsenal",
   4,
   387,
   486
  ],
  [
   "arsenal",
   4,
   588,
   867
  ],
  [
   "arsenal",
   4,
   816,
   486
  ],
  [
   "armory",
   2,
   138,
   537
  ],
  [
   "armory",
   2,
   237,
   768
  ],
  [
   "armory",
   2,
   438,
   267
  ],
  [
   "armory",
   2,
   537,
   1038
  ],
  [
   "armory",
   2,
   666,
   138
  ],
  [
   "armory",
   2,
   738,
   957
  ],
  [
   "armory",
   2,
   957,
   438
  ],
  [
   "armory",
   2,
   1068,
   666
  ],
  [
   "armory",
   4,
   387,
   717
  ],
  [
   "armory",
   4,
   588,
   327
  ],
  [
   "armory",
   4,
   816,
   717
  ],
  [
   "drill",
   2,
   138,
   747
  ],
  [
   "drill",
   2,
   237,
   486
  ],
  [
   "drill",
   2,
   486,
   138
  ],
  [
   "drill",
   2,
   486,
   957
  ],
  [
   "drill",
   2,
   768,
   237
  ],
  [
   "drill",
   2,
   768,
   1038
  ],
  [
   "drill",
   2,
   957,
   747
  ],
  [
   "drill",
   2,
   1068,
   486
  ],
  [
   "lodge",
   3,
   327,
   567
  ],
  [
   "lodge",
   3,
   486,
   867
  ],
  [
   "lodge",
   3,
   768,
   327
  ],
  [
   "lodge",
   3,
   867,
   666
  ],
  [
   "scholar",
   1,
   237,
   237
  ],
  [
   "scholar",
   1,
   237,
   957
  ],
  [
   "scholar",
   1,
   267,
   537
  ],
  [
   "scholar",
   1,
   537,
   936
  ],
  [
   "scholar",
   1,
   666,
   267
  ],
  [
   "scholar",
   1,
   936,
   537
  ],
  [
   "scholar",
   1,
   957,
   237
  ],
  [
   "scholar",
   1,
   957,
   957
  ],
  [
   "scholar",
   3,
   327,
   327
  ],
  [
   "scholar",
   3,
   327,
   867
  ],
  [
   "scholar",
   3,
   867,
   327
  ],
  [
   "scholar",
   3,
   867,
   867
  ],
  [
   "builder",
   1,
   138,
   138
  ],
  [
   "builder",
   1,
   138,
   666
  ],
  [
   "builder",
   1,
   138,
   1038
  ],
  [
   "builder",
   1,
   537,
   138
  ],
  [
   "builder",
   1,
   666,
   1068
  ],
  [
   "builder",
   1,
   1068,
   138
  ],
  [
   "builder",
   1,
   1068,
   567
  ],
  [
   "builder",
   1,
   1068,
   1068
  ],
  [
   "builder",
   3,
   327,
   666
  ],
  [
   "builder",
   3,
   486,
   327
  ],
  [
   "builder",
   3,
   768,
   867
  ],
  [
   "builder",
   3,
   867,
   567
  ],
  [
   "forager",
   1,
   87,
   666
  ],
  [
   "forager",
   1,
   138,
   237
  ],
  [
   "forager",
   1,
   267,
   1068
  ],
  [
   "forager",
   1,
   537,
   87
  ],
  [
   "forager",
   1,
   636,
   1137
  ],
  [
   "forager",
   1,
   957,
   138
  ],
  [
   "forager",
   1,
   1068,
   936
  ],
  [
   "forager",
   1,
   1137,
   567
  ],
  [
   "harvest",
   1,
   138,
   327
  ],
  [
   "harvest",
   1,
   138,
   957
  ],
  [
   "harvest",
   1,
   237,
   138
  ],
  [
   "harvest",
   1,
   327,
   1038
  ],
  [
   "harvest",
   1,
   768,
   138
  ],
  [
   "harvest",
   1,
   957,
   1068
  ],
  [
   "harvest",
   1,
   1068,
   237
  ],
  [
   "harvest",
   1,
   1068,
   747
  ]
 ]
};
