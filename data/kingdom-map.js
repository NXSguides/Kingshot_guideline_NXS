/* Data + text for kingdom-map.html. rewards = Sanctuary Battle rewards per Fortress / Sanctuary, from in-game screens (updated 2026-10-30: the special rewards rotate between seasons).
   (Kingdom #2189 buildings). Coordinates and Outpost levels/buffs were checked against
   in-game screenshots (Outpost Occupied/Occupiable tabs, Ruins tab). buff = % per level. outposts: [type, level, x, y] */
const KINGDOM_MAP = {
 "ui": {
  "title": {
   "en": "Kingdom #2189 Map",
   "zh": "#2189 王國地圖",
   "pt": "Mapa do Reino #2189",
   "ar": "خريطة المملكة #2189",
   "ko": "#2189 왕국 지도"
  },
  "intro": {
   "en": "Tap a building on the map, or a coordinate in the list, to see where it is. Outposts give buffs; Fortresses and Sanctuaries do not.",
   "zh": "點地圖上的建築，或點下方清單裡的座標，就能看到它在哪裡。據點有增益，要塞和遺跡沒有。",
   "pt": "Toque num prédio no mapa, ou numa coordenada da lista, para ver onde ele fica. Postos Avançados dão bônus; Fortalezas e Santuários não.",
   "ar": "اضغط على مبنى في الخريطة أو على إحداثية في القائمة لترى مكانه. المستوطنات تمنح مكافآت؛ الحصون والمآوي لا تمنح.",
   "ko": "지도에서 건물을 누르거나 아래 목록의 좌표를 누르면 위치를 볼 수 있습니다. 거점은 버프를 주고, 성채와 유적은 버프가 없습니다."
  },
  "back": {
   "en": "Guides",
   "zh": "回到攻略",
   "pt": "Guias",
   "ar": "الأدلة",
   "ko": "공략"
  },
  "orient": {
   "en": "Same direction as the in-game World map: up = bigger X and Y. Number on a square = Outpost level.",
   "zh": "方向和遊戲大地圖一樣：往上 = X、Y 都變大。方塊上的數字 = 據點等級。",
   "pt": "Mesma direção do mapa-múndi do jogo: para cima = X e Y maiores. Número no quadrado = nível do Posto Avançado.",
   "ar": "بنفس اتجاه خريطة العالم في اللعبة: الأعلى = X و Y أكبر. الرقم على المربع = مستوى المستوطنة.",
   "ko": "게임 월드 지도와 같은 방향: 위쪽 = X, Y가 더 큼. 사각형 위 숫자 = 거점 레벨."
  },
  "pick": {
   "en": "Tap a building to see its details.",
   "zh": "點一個建築來看詳細資料。",
   "pt": "Toque num prédio para ver os detalhes.",
   "ar": "اضغط على مبنى لرؤية التفاصيل.",
   "ko": "건물을 누르면 자세한 정보가 표시됩니다."
  },
  "all": {
   "en": "All",
   "zh": "全部",
   "pt": "Tudo",
   "ar": "الكل",
   "ko": "전체"
  },
  "copy": {
   "en": "Copy",
   "zh": "複製",
   "pt": "Copiar",
   "ar": "نسخ",
   "ko": "복사"
  },
  "copied": {
   "en": "Copied",
   "zh": "已複製",
   "pt": "Copiado",
   "ar": "تم النسخ",
   "ko": "복사됨"
  },
  "noBuff": {
   "en": "No buff",
   "zh": "無增益",
   "pt": "Sem bônus",
   "ar": "بدون مكافأة",
   "ko": "버프 없음"
  },
  "ruins": {
   "en": "Castle, Fortresses & Sanctuaries",
   "zh": "王城、要塞、遺跡",
   "pt": "Castelo, Fortalezas e Santuários",
   "ar": "القلعة والحصون والمآوي",
   "ko": "캐슬, 성채, 유적"
  },
  "outposts": {
   "en": "Outposts",
   "zh": "據點",
   "pt": "Postos Avançados",
   "ar": "المستوطنات",
   "ko": "거점"
  },
  "rulesT": {
   "en": "Rules",
   "zh": "規則",
   "pt": "Regras",
   "ar": "القواعد",
   "ko": "규칙"
  },
  "rules": [
   {
    "en": "Only the same Outpost type at the same level does not stack. The same type at a different level stacks, and different types stack (also at the same level).",
    "zh": "只有同類型、同等級的據點效果不疊加；同類型不同等級、不同類型同等級都可以疊加。",
    "pt": "Só o mesmo tipo de Posto Avançado no mesmo nível não acumula. O mesmo tipo em nível diferente acumula, e tipos diferentes acumulam (também no mesmo nível).",
    "ar": "فقط نفس نوع المستوطنة بنفس المستوى لا تتراكم. نفس النوع بمستوى مختلف يتراكم، والأنواع المختلفة تتراكم (حتى بنفس المستوى).",
    "ko": "유형과 레벨이 같은 거점 버프만 중첩되지 않습니다. 같은 유형이라도 레벨이 다르면 중첩되고, 유형이 다르면 (같은 레벨이라도) 중첩됩니다."
   },
   {
    "en": "You can only compete for Outposts that border your alliance territory.",
    "zh": "只能爭奪和自家聯盟領地相鄰的據點。",
    "pt": "Só dá para disputar Postos Avançados que fazem fronteira com o território da sua aliança.",
    "ar": "يمكنك التنافس فقط على المستوطنات المجاورة لإقليم تحالفك.",
    "ko": "연맹 영지와 접한 거점만 쟁탈할 수 있습니다."
   },
   {
    "en": "Higher-level Outposts cause more severely injured and lost troops. Severely injured troops go to the Infirmary.",
    "zh": "等級越高的據點，交戰時重傷和陣亡越多；重傷的部隊要到野戰醫院治療。",
    "pt": "Postos Avançados de nível mais alto causam mais tropas gravemente feridas e perdidas. As gravemente feridas vão para a Enfermaria.",
    "ar": "المستوطنات ذات المستوى الأعلى تسبب خسائر وإصابات خطيرة أكثر. الجنود المصابون بجروح خطيرة يذهبون إلى المستوصف.",
    "ko": "레벨이 높은 거점일수록 중상과 전사가 많아집니다. 중상을 입은 병사는 야전 병원에서 치료해야 합니다."
   },
   {
    "en": "An Outpost in the Vulnerable state gives no buff until it is Protected again, so a total can drop for a while.",
    "zh": "據點在「可爭奪狀態」時沒有增益，回到「保護狀態」才恢復，所以總和有時會暫時變少。",
    "pt": "Um Posto Avançado no estado Vulnerável não dá bônus até voltar a ser Protegido, então o total pode cair por um tempo.",
    "ar": "المستوطنة في حالة مستضعف لا تمنح مكافأة حتى تعود محمي، لذلك قد ينخفض المجموع لفترة.",
    "ko": "쟁탈 가능 상태의 거점은 다시 보호 상태가 될 때까지 버프를 주지 않으므로, 합계가 잠시 줄어들 수 있습니다."
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
 "hq": [
  [
   409,
   668
  ],
  [
   741,
   283
  ]
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
 ],
 "zh": {
  "castle": "王城",
  "hq": "平原總部",
  "hq2": "荒野總部",
  "fortress": "{n}號要塞",
  "sanctuary": "{n}號遺跡",
  "fortressS": "要塞",
  "sanctuaryS": "遺跡",
  "types": {
   "arsenal": [
    "武器庫",
    "部隊攻擊力"
   ],
   "armory": [
    "防具庫",
    "部隊防禦力"
   ],
   "drill": [
    "訓練營",
    "訓練速度"
   ],
   "lodge": [
    "遠征營",
    "部隊出征速度"
   ],
   "scholar": [
    "科技研究所",
    "研究速度"
   ],
   "builder": [
    "建造所",
    "建造速度"
   ],
   "forager": [
    "採集祭壇",
    "資源採集速度"
   ],
   "harvest": [
    "豐收祭壇",
    "資源生產速度"
   ]
  }
 },
 "pt": {
  "castle": "Castelo da Realeza",
  "hq": "QG das Planícies",
  "hq2": "QG da Terra Maligna",
  "fortress": "Fortaleza Nº {n}",
  "sanctuary": "Santuário {n}",
  "fortressS": "Fortaleza",
  "sanctuaryS": "Santuário",
  "types": {
   "arsenal": [
    "Arsenal (Ataque)",
    "Ataque dos Esquadrões"
   ],
   "armory": [
    "Arsenal (Defesa)",
    "Defesa dos Esquadrões"
   ],
   "drill": [
    "Acampamento de Treinamento",
    "Velocidade de Treinamento"
   ],
   "lodge": [
    "Alojamento Fronteiriço",
    "Velocidade da Marcha dos Esquadrões"
   ],
   "scholar": [
    "Torre do Sábio",
    "Velocidade de Pesquisa"
   ],
   "builder": [
    "Construção da Guilda",
    "Velocidade de Construção"
   ],
   "forager": [
    "Bosque do Forrageador",
    "Velocidade da Coleta de Recursos"
   ],
   "harvest": [
    "Altar da Colheita",
    "Velocidade de Produção de Recursos"
   ]
  }
 },
 "ar": {
  "castle": "قلعة الملك",
  "hq": "مقر [السهول]",
  "hq2": "مقر [أرض الشر]",
  "fortress": "القلعة رقم {n}",
  "sanctuary": "المأوى {n}",
  "fortressS": "حصن",
  "sanctuaryS": "المأوى",
  "types": {
   "arsenal": [
    "ترسانة أسلحة",
    "هجوم الفرق"
   ],
   "armory": [
    "مخزن الدروع",
    "دفاع الفرق"
   ],
   "drill": [
    "معسكر التدريبات",
    "سرعة التدريب"
   ],
   "lodge": [
    "نزل المغامرين",
    "سرعة زحف الفرق"
   ],
   "scholar": [
    "برج العالم",
    "سرعة البحث"
   ],
   "builder": [
    "نقابة البنائين",
    "سرعة البناء"
   ],
   "forager": [
    "بستان جامع الطعام",
    "سرعة جمع الموارد"
   ],
   "harvest": [
    "نصب الحصاد",
    "سرعة إنتاج الموارد"
   ]
  }
 },
 "ko": {
  "castle": "캐슬",
  "hq": "[평원] 본부",
  "hq2": "[황야] 본부",
  "fortress": "{n}번 성채",
  "sanctuary": "{n}호 유적",
  "fortressS": "성채",
  "sanctuaryS": "유적",
  "types": {
   "arsenal": [
    "무기 창고",
    "부대 공격력"
   ],
   "armory": [
    "방어구 창고",
    "부대 방어력"
   ],
   "drill": [
    "훈련 캠프",
    "훈련 속도"
   ],
   "lodge": [
    "원정 캠프",
    "부대 행군 속도"
   ],
   "scholar": [
    "연구소",
    "연구 속도"
   ],
   "builder": [
    "건설소",
    "건설 속도"
   ],
   "forager": [
    "채집 제단",
    "자원 채집 속도"
   ],
   "harvest": [
    "풍작 제단",
    "자원 생산 속도"
   ]
  }
 },
 "rewards": {
  "items": {
   "epicchest": {
    "en": "Custom Epic Hero Shard Chest",
    "zh": "史詩英雄碎片客製化箱子"
   },
   "heroxp10k": {
    "en": "10,000 Hero XP",
    "zh": "10,000點英雄經驗值",
    "ko": "영웅 경험치 10,000점",
    "pt": "10.000 XP do Herói",
    "ar": "10,000 من خبرة البطل"
   },
   "gems100": {
    "en": "100 Gems",
    "zh": "100鑽石",
    "ko": "다이아x100",
    "pt": "100 Gemas",
    "ar": "100 من الجواهر"
   },
   "train1h": {
    "en": "1h Training Speedup",
    "zh": "1小時訓練加速",
    "ko": "1시간 훈련 가속",
    "pt": "1h de Aceleração de Treinamento",
    "ar": "تسريع التدريب لمدة 1 ساعة"
   },
   "heal1h": {
    "en": "1h Healing Speedup",
    "zh": "1小時治療加速",
    "ko": "1시간 치료 가속",
    "pt": "1h de Aceleração de Cura",
    "ar": "تسريع الشفاء لمدة 1 ساعة"
   },
   "gen1h": {
    "en": "1h General Speedup",
    "zh": "1 小時通用加速",
    "pt": "1h de Aceleração Geral",
    "ko": "1시간 공용 가속",
    "ar": "تسريع عام لمدة 1 ساعة"
   },
   "gen5m": {
    "en": "5m General Speedup",
    "zh": "5分鐘通用加速",
    "ko": "5분 공용 가속",
    "pt": "5m de Aceleração Geral",
    "ar": "تسريع عام لمدة 5 دقائق"
   },
   "con5m": {
    "en": "5m Construction Speedup",
    "zh": "5分鐘建造加速",
    "ko": "5분 건설 가속",
    "pt": "5m de Aceleração da Construção",
    "ar": "تسريع البناء لمدة 5 دقائق"
   },
   "res5m": {
    "en": "5m Research Speedup",
    "zh": "5分鐘研究加速",
    "ko": "연구 가속 5분",
    "pt": "5m de Aceleração de Pesquisa",
    "ar": "تسريع البحث لمدة 5 دقائق"
   },
   "heroxp5k": {
    "en": "5,000 Hero XP",
    "zh": "5,000點英雄經驗值",
    "ko": "영웅 경험치 5,000점",
    "pt": "5.000 XP do Herói",
    "ar": "5,000 من خبرة البطل"
   },
   "bread1k": {
    "en": "1K Bread",
    "zh": "1K麵包",
    "ko": "빵 1K",
    "pt": "1K de Pão",
    "ar": "1 ألف من الخبز"
   },
   "wood1k": {
    "en": "1K Wood",
    "zh": "1K木材",
    "ko": "목재 1K",
    "pt": "1K Madeira",
    "ar": "1 ألفًا من الخشب"
   },
   "stone1k": {
    "en": "1K Stone",
    "zh": "1K石材",
    "ko": "석재 1K",
    "pt": "1K de Pedra",
    "ar": "1 ألف من الحجر"
   },
   "iron1k": {
    "en": "1K Iron",
    "zh": "1K鐵礦",
    "ko": "철광 1K",
    "pt": "1K Ferro",
    "ar": "1 ألفا من الحديد"
   },
   "goldkey": {
    "en": "Gold Key",
    "zh": "黃金鑰匙",
    "ko": "황금 열쇠",
    "pt": "Chave Dourada",
    "ar": "المفتاح الذهبي"
   },
   "platkey": {
    "en": "Platinum Key",
    "zh": "白銀鑰匙",
    "ko": "백은 열쇠",
    "pt": "Chave de Platina",
    "ar": "المفتاح البلاتيني"
   },
   "enhxp": {
    "en": "100 Enhancement XP Part",
    "zh": "100點強化經驗部件",
    "ko": "경험치 강화 부품 100점",
    "pt": "100 Peças de XP de Aprimoramento",
    "ar": "100 مكون خبرة تحسين"
   },
   "expbook": {
    "en": "Mythic Expedition Skill Manual",
    "zh": "傳說遠征技能書",
    "ko": "레전드 원정 스킬북",
    "pt": "Instrucional de Expedição Mítico",
    "ar": "تعليمات حملة استكشافية خيالية"
   },
   "conqbook": {
    "en": "Mythic Conquest Skill Book",
    "zh": "傳說討伐技能書",
    "ko": "레전드 토벌 스킬북",
    "pt": "Livro de Habilidades de Conquista Mítica",
    "ar": "كتاب مهارة الغزو الخيالي"
   },
   "saul": {
    "en": "Saul Shard",
    "zh": "薩洛碎片",
    "pt": "Fragmento de Saul",
    "ko": "살로 파편",
    "ar": "شظية شاول"
   },
   "jabel": {
    "en": "Jabel Shard",
    "zh": "潔貝爾碎片",
    "pt": "Fragmento de Jabel",
    "ko": "제이벨 파편",
    "ar": "شظية جبل"
   },
   "teleport": {
    "en": "Advanced Teleporter",
    "zh": "高級遷城",
    "ko": "고급 도시 이전",
    "pt": "Teletransportador Avançado",
    "ar": "ناقل متقدم"
   },
   "dmg2": {
    "en": "Troops Damage Up II (12hrs)",
    "zh": "部隊傷害提升II（12小時）",
    "ko": "부대 피해 증가 II (12시간)",
    "pt": "Aumento de Dano das Tropas II (12h)",
    "ar": "رفع ضرر القوات 2 (لمدة 12 ساعة)"
   },
   "hp2": {
    "en": "Troops Health Up II (12hrs)",
    "zh": "部隊生命值提升II（12小時）",
    "ko": "부대 HP 증가 II (12시간)",
    "pt": "Aumento de Vida das Tropas II (12h)",
    "ar": "رفع صحة القوات 2 (لمدة 12 ساعة)"
   },
   "deploy2": {
    "en": "Deployment Capacity Boost II (12hrs)",
    "zh": "出征部隊數量提升II（12小時）",
    "ko": "출정 수용량 증가 II (12시간)",
    "pt": "Impulso da Capacidade de Envio II (12h)",
    "ar": "تعزيز قدرة النشر 2 (لمدة 12 ساعة)"
   }
  },
  "chests": {
   "warrior": {
    "name": {
     "en": "Warrior's Chest",
     "zh": "奮戰者寶箱",
     "ko": "전사 보물상자",
     "pt": "Baú do Guerreiro",
     "ar": "صندوق المحارب"
    },
    "slot": "part",
    "items": [
     [
      "gems100",
      4
     ],
     [
      "train1h",
      10
     ],
     [
      "heal1h",
      10
     ],
     [
      "heroxp5k",
      5
     ]
    ]
   },
   "ally": {
    "name": {
     "en": "Ally's Chest",
     "zh": "結盟者寶箱",
     "ko": "동맹 보물상자",
     "pt": "Baú do Aliado",
     "ar": "صندوق الحليف"
    },
    "slot": "ally",
    "items": [
     [
      "gems100",
      2
     ],
     [
      "con5m",
      60
     ],
     [
      "res5m",
      60
     ],
     [
      "bread1k",
      400
     ],
     [
      "wood1k",
      400
     ],
     [
      "stone1k",
      80
     ],
     [
      "iron1k",
      20
     ]
    ]
   },
   "ruler": {
    "name": {
     "en": "Ruler's Chest",
     "zh": "統御者寶箱",
     "ko": "통솔 보물상자",
     "pt": "Baú do Governante",
     "ar": "صندوق الحاكم"
    },
    "slot": "alloc",
    "items": [
     [
      "platkey",
      2
     ],
     [
      "gen5m",
      10
     ],
     [
      "bread1k",
      200
     ],
     [
      "wood1k",
      200
     ],
     [
      "stone1k",
      40
     ],
     [
      "iron1k",
      10
     ]
    ]
   },
   "controller": {
    "name": {
     "en": "Controller's Chest",
     "zh": "控制者寶箱",
     "ko": "점령 보물상자",
     "pt": "Baú do Controlador",
     "ar": "صندوق المتحكم"
    },
    "slot": "control",
    "items": [
     [
      "goldkey",
      1
     ],
     [
      "platkey",
      2
     ],
     [
      "heroxp5k",
      2
     ]
    ]
   }
  },
  "fortress": {
   "power": 53047200,
   "garrison": "345K",
   "chests": [
    [
     "warrior",
     2
    ],
    [
     "ally",
     2
    ],
    [
     "ruler",
     100
    ],
    [
     "controller",
     2
    ]
   ],
   "special": {
    "1": [
     "saul",
     420
    ],
    "2": [
     "conqbook",
     600
    ],
    "3": [
     "expbook",
     600
    ],
    "4": [
     "enhxp",
     500
    ]
   }
  },
  "sanctuary": {
   "power": 10491876,
   "garrison": "169.4K",
   "chests": [
    [
     "warrior",
     1
    ],
    [
     "ally",
     1
    ],
    [
     "ruler",
     40
    ],
    [
     "controller",
     1
    ]
   ],
   "special": {
    "1": [
     "epicchest",
     300
    ],
    "2": [
     "heroxp10k",
     300
    ],
    "3": [
     "gen1h",
     400
    ],
    "4": [
     "teleport",
     90
    ],
    "5": [
     "epicchest",
     300
    ],
    "6": [
     "heroxp10k",
     300
    ],
    "7": [
     "gen1h",
     400
    ],
    "8": [
     "teleport",
     90
    ],
    "9": [
     "epicchest",
     300
    ],
    "10": [
     "heroxp10k",
     300
    ],
    "11": [
     "gen1h",
     400
    ],
    "12": [
     "teleport",
     90
    ]
   }
  }
 }
};
