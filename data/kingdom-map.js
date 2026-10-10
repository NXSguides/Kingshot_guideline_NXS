/* Data + text for kingdom-map.html (Kingdom #2189 buildings). Coordinates and Outpost levels/buffs were checked against
   in-game screenshots (Outpost Occupied/Occupiable tabs, Ruins tab). buff = % per level. outposts: [type, level, x, y] */
const KINGDOM_MAP = {
 "ui": {
  "title": {
   "en": "Kingdom #2189 Map",
   "zh": "#2189 王國地圖"
  },
  "intro": {
   "en": "Tap a building on the map, or a coordinate in the list, to see where it is. Outposts give buffs; Fortresses and Sanctuaries do not.",
   "zh": "點地圖上的建築，或點下方清單裡的座標，就能看到它在哪裡。據點有增益，要塞和遺跡沒有。"
  },
  "back": {
   "en": "Guides",
   "zh": "回到攻略"
  },
  "orient": {
   "en": "Same direction as the in-game World map: up = bigger X and Y. Number on a square = Outpost level.",
   "zh": "方向和遊戲大地圖一樣：往上 = X、Y 都變大。方塊上的數字 = 據點等級。"
  },
  "pick": {
   "en": "Tap a building to see its details.",
   "zh": "點一個建築來看詳細資料。"
  },
  "all": {
   "en": "All",
   "zh": "全部"
  },
  "copy": {
   "en": "Copy",
   "zh": "複製"
  },
  "copied": {
   "en": "Copied",
   "zh": "已複製"
  },
  "noBuff": {
   "en": "No buff",
   "zh": "無增益"
  },
  "ruins": {
   "en": "Castle, Fortresses & Sanctuaries",
   "zh": "王城、要塞、遺跡"
  },
  "outposts": {
   "en": "Outposts",
   "zh": "據點"
  },
  "rulesT": {
   "en": "Rules",
   "zh": "規則"
  },
  "rules": [
   {
    "en": "Only the same Outpost type at the same level does not stack. The same type at a different level stacks, and different types stack (also at the same level).",
    "zh": "只有同類型、同等級的據點效果不疊加；同類型不同等級、不同類型同等級都可以疊加。"
   },
   {
    "en": "You can only compete for Outposts that border your alliance territory.",
    "zh": "只能爭奪和自家聯盟領地相鄰的據點。"
   },
   {
    "en": "Higher-level Outposts cause more severely injured and lost troops. Severely injured troops go to the Infirmary.",
    "zh": "等級越高的據點，交戰時重傷和陣亡越多；重傷的部隊要到野戰醫院治療。"
   },
   {
    "en": "An Outpost in the Vulnerable state gives no buff until it is Protected again, so a total can drop for a while.",
    "zh": "據點在「可爭奪狀態」時沒有增益，回到「保護狀態」才恢復，所以總和有時會暫時變少。"
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
 ],
 "zh": {
  "castle": "王城",
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
 }
};
