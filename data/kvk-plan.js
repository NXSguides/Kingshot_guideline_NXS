/* KvK Points Planner data — used by kvk-optimizer.html and by scripts/build-ai-context.js (AI assistant).
   items: v = points per unit (speedups: per minute), days = KvK prep days that score it, pref = default day. */
const KVK_PLAN = {
 "langs": [
  {
   "code": "en",
   "label": "English"
  },
  {
   "code": "zh",
   "label": "中文"
  },
  {
   "code": "ko",
   "label": "한국어"
  },
  {
   "code": "de",
   "label": "Deutsch"
  },
  {
   "code": "fr",
   "label": "Français"
  },
  {
   "code": "pt",
   "label": "Português"
  },
  {
   "code": "es",
   "label": "Español"
  },
  {
   "code": "tr",
   "label": "Türkçe"
  },
  {
   "code": "id",
   "label": "Bahasa Indonesia"
  },
  {
   "code": "ru",
   "label": "Русский"
  },
  {
   "code": "th",
   "label": "ภาษาไทย"
  },
  {
   "code": "ar",
   "label": "العربية"
  }
 ],
 "ui": {
  "en": {
   "title": "KvK Points Planner",
   "subtitle": "Counts only what you're willing to spend: points per day, and which day multi-day items should go to.",
   "s1": "Pick your goal",
   "mA": "Personal total",
   "mAd": "Doesn't matter which day — only the total",
   "mB": "Daily push / ranking",
   "mBd": "Items that score on several days go to the day you want to push",
   "tgHint": "Enter the minimum points you want each day. Days without a target won't use any “Can use” items; leave all five empty to just spread your “Will use” items evenly.",
   "day": "Day {n}",
   "s2": "Resources",
   "s2hint": "“Will use” = what you'd upgrade anyway (e.g. only the Masters you plan to train). “Can use” = fine to spend for points. Anything not entered is kept. Enter speedups as days, hours and minutes, like the in-game Resources & Speedups summary.",
   "colItem": "Resource",
   "colDays": "Scores on",
   "colMust": "Will use",
   "colOpt": "Can use",
   "gSpeed": "Speedups",
   "gGear": "Truegold & gear",
   "gHero": "Heroes & Masters",
   "gPet": "Pets",
   "gGov": "Governor",
   "perMin": "30/min",
   "perPt": "/1 score",
   "s3": "Troops (Day 4)",
   "s3hint": "Promotion only scores the point difference between tiers. Enter Training Speedups above.",
   "train": "Train",
   "promote": "Promote",
   "tier": "Tier",
   "rMust": "“Will use” points",
   "rOpt": "“Can use” points",
   "rOptB": "“Can use” points used",
   "rTotal": "Total",
   "vA": "{n} pts in total",
   "vNone": "Enter your resources",
   "vB": "{a} of {b} days reach the target",
   "vBal": "“Will use” spread evenly across days",
   "target": "Target",
   "gap": "{n} short",
   "ok": "Reached",
   "left": "“Can use” left unused",
   "leftNone": "All “Can use” items were used",
   "x": "",
   "spins": "spins",
   "pts": "pts",
   "dU": "d",
   "hU": "h",
   "mU": "m",
   "reset": "Clear all",
   "foot": "Point values: the in-game Points Sources screen and the KvK guide. Scoring days follow the current guide; if your game screen differs, trust the game and tell an officer. Data stays in your own browser.",
   "back": "Back to the KvK guide",
   "s4": "Score items, level by level",
   "s4hint": "Governor Charm, pets and Governor Gear only score when an upgrade is finished — materials that don't reach the next threshold count for nothing. Add the upgrades you plan; if you enter what you have, only the upgrades you can finish in order are counted. The result goes into the score fields above.",
   "lvFrom": "From",
   "lvTo": "To",
   "lvCount": "× pieces",
   "lvHave": "What I have (optional)",
   "lvNeed": "Needed",
   "lvAdd": "+ add upgrade",
   "lvDone": "{n} upgrades finished",
   "lvStop": "Stops here — not enough {m}",
   "lvScore": "Score",
   "lvToMust": "→ Will use",
   "lvToOpt": "→ Can use",
   "lvPetMax": "Pet max level",
   "lvGearNote": "The game's list ends at Legendary 3★; higher steps aren't scored here.",
   "lvSrc": "Costs: in-game upgrade screens as recorded by community databases."
  },
  "zh": {
   "title": "KvK 積分規劃",
   "subtitle": "只算你願意花的資源：每天能拿多少分、會跨天計分的東西該放哪一天。",
   "s1": "選目標",
   "mA": "個人總分",
   "mAd": "不在意分數落在哪天，只看總共多少",
   "mB": "每天比分／衝排名",
   "mBd": "跨天計分的資源，優先補到你想衝的那天",
   "tgHint": "填每天想至少拿到的分數。沒填目標的天不會多花「可以用」；五天都不填，就只把「一定用」平均分到各天。",
   "day": "第 {n} 天",
   "s2": "資源",
   "s2hint": "「一定用」是本來就打算升級的部分（例如只算你想練的大師）；「可以用」是拿去換分也不心疼的部分。沒填的就是不想用，工具不會碰。加速照背包裡「資源與加速統計」的天、小時、分鐘填。",
   "colItem": "資源",
   "colDays": "計分日",
   "colMust": "一定用",
   "colOpt": "可以用",
   "gSpeed": "加速",
   "gGear": "黃金與裝備",
   "gHero": "英雄與大師",
   "gPet": "寵物",
   "gGov": "領主",
   "perMin": "30／分鐘",
   "perPt": "/1 評分",
   "s3": "部隊（第 4 天）",
   "s3hint": "晉升只算兩階的分差。訓練加速請填在上面的加速欄。",
   "train": "訓練",
   "promote": "晉升",
   "tier": "階級",
   "rMust": "一定用的分數",
   "rOpt": "可以用的分數",
   "rOptB": "用到的「可以用」分數",
   "rTotal": "合計",
   "vA": "總共 {n} 分",
   "vNone": "在左邊填入資源",
   "vB": "{a}／{b} 天達到目標",
   "vBal": "「一定用」已平均分到各天",
   "target": "目標",
   "gap": "還差 {n}",
   "ok": "達標",
   "left": "「可以用」但沒用到",
   "leftNone": "「可以用」都用到了",
   "x": " 個",
   "spins": "次",
   "pts": "分",
   "dU": "天",
   "hU": "小時",
   "mU": "分鐘",
   "reset": "全部清空",
   "foot": "分數來源：遊戲內「積分來源」畫面與 KvK 指南。哪天計分照目前的指南整理，若遊戲畫面不同請以遊戲為準並告訴管理員。資料只存在你自己的瀏覽器裡。",
   "back": "回到 KvK 指南",
   "s4": "評分項目試算",
   "s4hint": "領主寶石、寵物、領主裝備只有「完成一次升級」才計分，沒湊到門檻的材料不算。加上你打算升的等級；若填了手上材料，只會照順序算能升完的那幾級。算出的評分會填回上面的欄位。",
   "lvFrom": "從",
   "lvTo": "升到",
   "lvCount": "× 個",
   "lvHave": "手上材料（可不填）",
   "lvNeed": "需要",
   "lvAdd": "＋ 加一筆",
   "lvDone": "完成 {n} 次升級",
   "lvStop": "到這裡停：{m}不夠",
   "lvScore": "評分",
   "lvToMust": "→ 填入一定用",
   "lvToOpt": "→ 填入可以用",
   "lvPetMax": "寵物等級上限",
   "lvGearNote": "遊戲清單到傳說 3 星為止，更高階暫不計。",
   "lvSrc": "升級材料數量來自玩家資料庫整理的遊戲內數值。"
  },
  "ko": {
   "title": "KvK 점수 플래너",
   "subtitle": "쓸 생각이 있는 자원만 계산합니다: 하루에 몇 점을 얻는지, 여러 날 점수가 되는 아이템을 어느 날 쓸지.",
   "s1": "목표 선택",
   "mA": "개인 총점",
   "mAd": "어느 날에 점수가 들어가든 상관없이 총점만 봅니다",
   "mB": "일일 경쟁 / 랭킹",
   "mBd": "여러 날 점수가 되는 자원을 밀고 싶은 날에 우선 배치합니다",
   "tgHint": "하루에 최소한 얻고 싶은 점수를 입력하세요. 목표가 없는 날에는 '쓸 수 있음'을 쓰지 않습니다. 다섯 날 모두 비워 두면 '꼭 사용'만 날마다 고르게 나눕니다.",
   "day": "{n}일 차",
   "s2": "자원",
   "s2hint": "'꼭 사용'은 어차피 올릴 생각인 부분(예: 키울 거장만), '쓸 수 있음'은 점수와 바꿔도 아깝지 않은 부분입니다. 입력하지 않은 것은 남겨 둡니다. 가속은 가방의 '자원 및 가속 통계'처럼 일·시간·분으로 입력하세요.",
   "colItem": "자원",
   "colDays": "점수 날",
   "colMust": "꼭 사용",
   "colOpt": "쓸 수 있음",
   "gSpeed": "가속",
   "gGear": "순금 및 장비",
   "gHero": "영웅 및 거장",
   "gPet": "펫",
   "gGov": "영주",
   "perMin": "30/분",
   "perPt": "/점수 1",
   "s3": "병사 (4일 차)",
   "s3hint": "승급은 두 등급의 점수 차이만 계산됩니다. 훈련 가속은 위 가속 칸에 입력하세요.",
   "train": "훈련",
   "promote": "승급",
   "tier": "등급",
   "rMust": "'꼭 사용' 점수",
   "rOpt": "'쓸 수 있음' 점수",
   "rOptB": "사용한 '쓸 수 있음' 점수",
   "rTotal": "합계",
   "vA": "총 {n}점",
   "vNone": "자원을 입력하세요",
   "vB": "{b}일 중 {a}일 목표 달성",
   "vBal": "'꼭 사용'을 날마다 고르게 나눴습니다",
   "target": "목표",
   "gap": "{n} 부족",
   "ok": "달성",
   "left": "쓰지 않은 '쓸 수 있음'",
   "leftNone": "'쓸 수 있음'을 모두 사용했습니다",
   "x": "개",
   "spins": "회",
   "pts": "점",
   "dU": "일",
   "hU": "시간",
   "mU": "분",
   "reset": "모두 지우기",
   "foot": "점수 출처: 게임 내 '점수 출처' 화면과 KvK 가이드. 점수 날짜는 현재 가이드를 따릅니다. 게임 화면과 다르면 게임을 기준으로 하고 간부에게 알려 주세요. 데이터는 본인 브라우저에만 저장됩니다.",
   "back": "KvK 가이드로 돌아가기",
   "s4": "평점 항목 단계별 계산",
   "s4hint": "영주 보석·펫·영주 장비는 업그레이드를 완료해야만 점수가 납니다. 다음 단계에 못 미치는 재료는 계산되지 않습니다. 올릴 단계를 추가하고, 보유 재료를 입력하면 순서대로 완료 가능한 단계만 계산됩니다. 결과는 위의 평점 칸에 들어갑니다.",
   "lvFrom": "현재",
   "lvTo": "목표",
   "lvCount": "× 개",
   "lvHave": "보유 재료 (선택)",
   "lvNeed": "필요",
   "lvAdd": "+ 추가",
   "lvDone": "{n}회 업그레이드 완료",
   "lvStop": "여기서 중단 — {m} 부족",
   "lvScore": "평점",
   "lvToMust": "→ 꼭 사용",
   "lvToOpt": "→ 사용 가능",
   "lvPetMax": "펫 최대 레벨",
   "lvGearNote": "게임 목록은 레전드 3★까지입니다. 그 이상은 계산하지 않습니다.",
   "lvSrc": "비용: 커뮤니티 데이터베이스에 기록된 게임 내 수치."
  },
  "de": {
   "title": "KvK-Punkteplaner",
   "subtitle": "Zählt nur, was du ausgeben willst: Punkte pro Tag und an welchem Tag mehrtägige Gegenstände eingesetzt werden sollten.",
   "s1": "Ziel wählen",
   "mA": "Persönliche Gesamtpunkte",
   "mAd": "Egal an welchem Tag — nur die Summe zählt",
   "mB": "Tageswertung / Rangliste",
   "mBd": "Gegenstände, die an mehreren Tagen zählen, gehen an den Tag, den du pushen willst",
   "tgHint": "Trage die Mindestpunkte ein, die du pro Tag willst. Tage ohne Ziel nutzen nichts aus „Kann nutzen“; lässt du alle fünf leer, wird „Nutze sicher“ gleichmäßig verteilt.",
   "day": "Tag {n}",
   "s2": "Ressourcen",
   "s2hint": "„Nutze sicher“ = was du sowieso verbessern willst (z. B. nur die Meister, die du trainieren willst). „Kann nutzen“ = darf für Punkte weg. Nicht Eingetragenes bleibt erhalten. Beschleunigungen in Tagen, Stunden und Minuten eintragen, wie in der Ressourcen- und Beschleunigungsübersicht im Spiel.",
   "colItem": "Ressource",
   "colDays": "Zählt an",
   "colMust": "Nutze sicher",
   "colOpt": "Kann nutzen",
   "gSpeed": "Beschleunigungen",
   "gGear": "Echtgold & Ausrüstung",
   "gHero": "Helden & Meister",
   "gPet": "Begleittiere",
   "gGov": "Gouverneur",
   "perMin": "30/Min.",
   "perPt": "/1 Wert",
   "s3": "Truppen (Tag 4)",
   "s3hint": "Beförderung zählt nur die Punktdifferenz zwischen den Stufen. Trainings-Beschleunigungen oben eintragen.",
   "train": "Ausbilden",
   "promote": "Befördern",
   "tier": "Stufe",
   "rMust": "Punkte „Nutze sicher“",
   "rOpt": "Punkte „Kann nutzen“",
   "rOptB": "Genutzte Punkte „Kann nutzen“",
   "rTotal": "Gesamt",
   "vA": "{n} Punkte insgesamt",
   "vNone": "Ressourcen eintragen",
   "vB": "{a} von {b} Tagen erreichen das Ziel",
   "vBal": "„Nutze sicher“ gleichmäßig auf die Tage verteilt",
   "target": "Ziel",
   "gap": "{n} fehlen",
   "ok": "Erreicht",
   "left": "„Kann nutzen“ nicht gebraucht",
   "leftNone": "Alles aus „Kann nutzen“ wurde genutzt",
   "x": "",
   "spins": "Drehungen",
   "pts": "Pkt.",
   "dU": "T",
   "hU": "Std",
   "mU": "Min",
   "reset": "Alles leeren",
   "foot": "Punktwerte: Punktequellen-Bildschirm im Spiel und der KvK-Guide. Die Wertungstage folgen dem aktuellen Guide; weicht dein Spiel ab, gilt das Spiel – bitte einem Offizier Bescheid geben. Daten bleiben nur in deinem Browser.",
   "back": "Zurück zum KvK-Guide",
   "s4": "Bewertungs-Posten Stufe für Stufe",
   "s4hint": "Gouverneur Talisman, Begleittiere und Gouverneur-Ausrüstung zählen nur bei einem abgeschlossenen Upgrade — Material unterhalb der nächsten Schwelle zählt nichts. Trage geplante Upgrades ein; mit deinem Bestand werden nur die der Reihe nach fertigen Upgrades gezählt. Das Ergebnis geht in die Felder oben.",
   "lvFrom": "Von",
   "lvTo": "Bis",
   "lvCount": "× Stück",
   "lvHave": "Mein Bestand (optional)",
   "lvNeed": "Benötigt",
   "lvAdd": "+ Upgrade hinzufügen",
   "lvDone": "{n} Upgrades fertig",
   "lvStop": "Stopp — zu wenig {m}",
   "lvScore": "Punkte",
   "lvToMust": "→ Wird genutzt",
   "lvToOpt": "→ Kann genutzt werden",
   "lvPetMax": "Max. Stufe des Begleittiers",
   "lvGearNote": "Die Spielliste endet bei Legendär 3★; höhere Stufen werden hier nicht gezählt.",
   "lvSrc": "Kosten: Spielwerte laut Community-Datenbanken."
  },
  "fr": {
   "title": "Planificateur de points KvK",
   "subtitle": "Ne compte que ce que vous voulez dépenser : points par jour, et quel jour utiliser les objets qui comptent sur plusieurs jours.",
   "s1": "Choisir l'objectif",
   "mA": "Total personnel",
   "mAd": "Peu importe le jour — seul le total compte",
   "mB": "Score du jour / classement",
   "mBd": "Les objets qui comptent sur plusieurs jours vont au jour que vous voulez pousser",
   "tgHint": "Indiquez le minimum de points voulu chaque jour. Les jours sans objectif n'utilisent rien de « Possible » ; laissez les cinq vides pour simplement répartir « Prévu » uniformément.",
   "day": "Jour {n}",
   "s2": "Ressources",
   "s2hint": "« Prévu » = ce que vous amélioreriez de toute façon (ex. seulement les experts que vous voulez entraîner). « Possible » = vous acceptez de le dépenser pour des points. Ce qui n'est pas saisi est gardé. Saisissez les accélérateurs en jours, heures et minutes, comme le récapitulatif Ressources et accélérateurs du jeu.",
   "colItem": "Ressource",
   "colDays": "Compte les jours",
   "colMust": "Prévu",
   "colOpt": "Possible",
   "gSpeed": "Accélérateurs",
   "gGear": "Or Véritable et équipement",
   "gHero": "Héros et experts",
   "gPet": "Animaux",
   "gGov": "Chef",
   "perMin": "30/min",
   "perPt": "/1 score",
   "s3": "Troupes (Jour 4)",
   "s3hint": "La promotion ne compte que la différence de points entre les niveaux. Saisissez les accélérateurs d'entraînement plus haut.",
   "train": "Entraîner",
   "promote": "Promouvoir",
   "tier": "Niveau",
   "rMust": "Points « Prévu »",
   "rOpt": "Points « Possible »",
   "rOptB": "Points « Possible » utilisés",
   "rTotal": "Total",
   "vA": "{n} points au total",
   "vNone": "Saisissez vos ressources",
   "vB": "{a} jour(s) sur {b} atteignent l'objectif",
   "vBal": "« Prévu » réparti uniformément sur les jours",
   "target": "Objectif",
   "gap": "Il manque {n}",
   "ok": "Atteint",
   "left": "« Possible » non utilisé",
   "leftNone": "Tout « Possible » a été utilisé",
   "x": "",
   "spins": "tours",
   "pts": "pts",
   "dU": "j",
   "hU": "h",
   "mU": "min",
   "reset": "Tout effacer",
   "foot": "Valeurs de points : écran Sources de points du jeu et guide KvK. Les jours de score suivent le guide actuel ; si votre jeu affiche autre chose, fiez-vous au jeu et prévenez un officier. Les données restent dans votre navigateur.",
   "back": "Retour au guide KvK",
   "s4": "Objets à score, niveau par niveau",
   "s4hint": "Talisman du Gouverneur, animaux et Équipement du Chef ne rapportent que lorsqu'une amélioration est terminée — les matériaux sous le seuil ne comptent pas. Ajoutez les améliorations prévues ; si vous saisissez votre stock, seules celles que vous pouvez finir dans l'ordre sont comptées. Le résultat remplit les champs ci-dessus.",
   "lvFrom": "De",
   "lvTo": "À",
   "lvCount": "× pièces",
   "lvHave": "Mon stock (facultatif)",
   "lvNeed": "Nécessaire",
   "lvAdd": "+ ajouter",
   "lvDone": "{n} améliorations terminées",
   "lvStop": "Arrêt ici — pas assez de {m}",
   "lvScore": "Score",
   "lvToMust": "→ Utilisé",
   "lvToOpt": "→ Utilisable",
   "lvPetMax": "Niveau max de l'animal",
   "lvGearNote": "La liste du jeu s'arrête à Légendaire 3★ ; au-delà, non compté ici.",
   "lvSrc": "Coûts : valeurs du jeu relevées par les bases communautaires."
  },
  "pt": {
   "title": "Planejador de pontos KvK",
   "subtitle": "Conta só o que você quer gastar: pontos por dia e em qual dia usar itens que pontuam em vários dias.",
   "s1": "Escolha o objetivo",
   "mA": "Total pessoal",
   "mAd": "Não importa o dia — só o total",
   "mB": "Disputa diária / ranking",
   "mBd": "Itens que pontuam em vários dias vão para o dia que você quer forçar",
   "tgHint": "Digite os pontos mínimos que você quer em cada dia. Dias sem meta não usam nada de “Posso usar”; deixe os cinco vazios para só distribuir “Vou usar” por igual.",
   "day": "Dia {n}",
   "s2": "Recursos",
   "s2hint": "“Vou usar” = o que você melhoraria de qualquer jeito (ex.: só os mestres que pretende treinar). “Posso usar” = tudo bem gastar por pontos. O que não for preenchido fica guardado. Preencha os aceleradores em dias, horas e minutos, como no resumo de Recursos e Aceleradores do jogo.",
   "colItem": "Recurso",
   "colDays": "Pontua em",
   "colMust": "Vou usar",
   "colOpt": "Posso usar",
   "gSpeed": "Aceleradores",
   "gGear": "Adamante e equipamentos",
   "gHero": "Heróis e mestres",
   "gPet": "Mascotes",
   "gGov": "Chefe",
   "perMin": "30/min",
   "perPt": "/1 pontuação",
   "s3": "Tropas (Dia 4)",
   "s3hint": "Promoção só conta a diferença de pontos entre os níveis. Preencha os aceleradores de treinamento acima.",
   "train": "Treinar",
   "promote": "Promover",
   "tier": "Nível",
   "rMust": "Pontos “Vou usar”",
   "rOpt": "Pontos “Posso usar”",
   "rOptB": "Pontos “Posso usar” usados",
   "rTotal": "Total",
   "vA": "{n} pontos no total",
   "vNone": "Preencha seus recursos",
   "vB": "{a} de {b} dias atingem a meta",
   "vBal": "“Vou usar” distribuído por igual entre os dias",
   "target": "Meta",
   "gap": "Faltam {n}",
   "ok": "Atingida",
   "left": "“Posso usar” não usado",
   "leftNone": "Tudo de “Posso usar” foi usado",
   "x": "",
   "spins": "giros",
   "pts": "pts",
   "dU": "d",
   "hU": "h",
   "mU": "min",
   "reset": "Limpar tudo",
   "foot": "Valores de pontos: tela Fontes de Pontos do jogo e guia KvK. Os dias de pontuação seguem o guia atual; se o jogo mostrar diferente, confie no jogo e avise um oficial. Os dados ficam só no seu navegador.",
   "back": "Voltar ao guia KvK",
   "s4": "Itens de pontuação, nível a nível",
   "s4hint": "Talismã do Governador, pets e Equipamento do Chefe só pontuam quando a melhoria é concluída — materiais abaixo do próximo limite não contam. Adicione as melhorias planejadas; se informar o que tem, só as que der para concluir em ordem são contadas. O resultado vai para os campos acima.",
   "lvFrom": "De",
   "lvTo": "Até",
   "lvCount": "× peças",
   "lvHave": "O que tenho (opcional)",
   "lvNeed": "Necessário",
   "lvAdd": "+ adicionar",
   "lvDone": "{n} melhorias concluídas",
   "lvStop": "Para aqui — falta {m}",
   "lvScore": "Pontuação",
   "lvToMust": "→ Vou usar",
   "lvToOpt": "→ Posso usar",
   "lvPetMax": "Nível máximo do pet",
   "lvGearNote": "A lista do jogo termina em Lendário 3★; etapas acima não são contadas aqui.",
   "lvSrc": "Custos: valores do jogo registrados por bases da comunidade."
  },
  "es": {
   "title": "Planificador de puntos KvK",
   "subtitle": "Solo cuenta lo que estás dispuesto a gastar: puntos por día y en qué día usar los objetos que puntúan varios días.",
   "s1": "Elige el objetivo",
   "mA": "Total personal",
   "mAd": "No importa el día — solo el total",
   "mB": "Pulso diario / ranking",
   "mBd": "Los objetos que puntúan varios días van al día que quieres empujar",
   "tgHint": "Escribe los puntos mínimos que quieres cada día. Los días sin meta no usan nada de «Puedo usar»; deja los cinco vacíos para solo repartir «Usaré» por igual.",
   "day": "Día {n}",
   "s2": "Recursos",
   "s2hint": "«Usaré» = lo que mejorarías de todos modos (p. ej. solo los maestros que piensas entrenar). «Puedo usar» = no te importa gastarlo por puntos. Lo que no escribas se guarda. Escribe los aceleradores en días, horas y minutos, como en el resumen de Recursos y aceleradores del juego.",
   "colItem": "Recurso",
   "colDays": "Puntúa",
   "colMust": "Usaré",
   "colOpt": "Puedo usar",
   "gSpeed": "Aceleradores",
   "gGear": "Adamantina y equipo",
   "gHero": "Héroes y maestros",
   "gPet": "Mascotas",
   "gGov": "Gobernador",
   "perMin": "30/min",
   "perPt": "/1 punto de puntuación",
   "s3": "Tropas (Día 4)",
   "s3hint": "El ascenso solo cuenta la diferencia de puntos entre niveles. Escribe los aceleradores de entrenamiento arriba.",
   "train": "Entrenar",
   "promote": "Ascender",
   "tier": "Nivel",
   "rMust": "Puntos «Usaré»",
   "rOpt": "Puntos «Puedo usar»",
   "rOptB": "Puntos «Puedo usar» usados",
   "rTotal": "Total",
   "vA": "{n} puntos en total",
   "vNone": "Escribe tus recursos",
   "vB": "{a} de {b} días alcanzan la meta",
   "vBal": "«Usaré» repartido por igual entre los días",
   "target": "Meta",
   "gap": "Faltan {n}",
   "ok": "Alcanzada",
   "left": "«Puedo usar» sin usar",
   "leftNone": "Se usó todo lo de «Puedo usar»",
   "x": "",
   "spins": "giros",
   "pts": "pts",
   "dU": "d",
   "hU": "h",
   "mU": "min",
   "reset": "Borrar todo",
   "foot": "Valores de puntos: pantalla de fuentes de puntos del juego y guía KvK. Los días que puntúan siguen la guía actual; si tu juego muestra otra cosa, fíate del juego y avisa a un oficial. Los datos solo quedan en tu navegador.",
   "back": "Volver a la guía KvK",
   "s4": "Objetos con puntuación, nivel a nivel",
   "s4hint": "Talismán del Gobernador, mascotas y Equipo de Líder solo puntúan al completar una mejora — los materiales que no llegan al siguiente umbral no cuentan. Añade las mejoras que planeas; si indicas lo que tienes, solo se cuentan las que puedas terminar en orden. El resultado se copia a los campos de arriba.",
   "lvFrom": "De",
   "lvTo": "Hasta",
   "lvCount": "× piezas",
   "lvHave": "Lo que tengo (opcional)",
   "lvNeed": "Necesario",
   "lvAdd": "+ añadir",
   "lvDone": "{n} mejoras completadas",
   "lvStop": "Se detiene aquí — falta {m}",
   "lvScore": "Puntuación",
   "lvToMust": "→ Usaré",
   "lvToOpt": "→ Puedo usar",
   "lvPetMax": "Nivel máximo de la mascota",
   "lvGearNote": "La lista del juego termina en Legendario 3★; pasos superiores no se cuentan aquí.",
   "lvSrc": "Costes: valores del juego recogidos por bases de datos de la comunidad."
  },
  "tr": {
   "title": "KvK Puan Planlayıcı",
   "subtitle": "Sadece harcamak istediklerini sayar: günlük puanlar ve birden çok gün puan veren eşyaların hangi gün kullanılacağı.",
   "s1": "Hedef seç",
   "mA": "Kişisel toplam",
   "mAd": "Hangi gün olduğu önemli değil — sadece toplam",
   "mB": "Günlük yarış / sıralama",
   "mBd": "Birden çok gün puan veren eşyalar zorlamak istediğin güne gider",
   "tgHint": "Her gün en az istediğin puanı yaz. Hedefi olmayan günler “Kullanabilirim”den bir şey harcamaz; beşini de boş bırakırsan “Kesin kullanırım” günlere eşit dağıtılır.",
   "day": "{n}. Gün",
   "s2": "Kaynaklar",
   "s2hint": "“Kesin kullanırım” = zaten geliştireceğin kısım (ör. sadece geliştirmek istediğin ustalar). “Kullanabilirim” = puan için harcamaya gönlünün razı olduğu kısım. Girilmeyenler saklanır. Hızlandırmaları oyundaki Kaynak ve Hızlandırma özetindeki gibi gün, saat ve dakika olarak gir.",
   "colItem": "Kaynak",
   "colDays": "Puan günü",
   "colMust": "Kesin kullanırım",
   "colOpt": "Kullanabilirim",
   "gSpeed": "Hızlandırmalar",
   "gGear": "Hasaltın ve donanım",
   "gHero": "Kahramanlar ve ustalar",
   "gPet": "Pet",
   "gGov": "Şef",
   "perMin": "30/dk",
   "perPt": "/1 puan",
   "s3": "Askerler (4. Gün)",
   "s3hint": "Terfi sadece iki kademe arasındaki puan farkını sayar. Eğitim hızlandırmalarını yukarıya gir.",
   "train": "Eğit",
   "promote": "Terfi",
   "tier": "Kademe",
   "rMust": "“Kesin kullanırım” puanı",
   "rOpt": "“Kullanabilirim” puanı",
   "rOptB": "Kullanılan “Kullanabilirim” puanı",
   "rTotal": "Toplam",
   "vA": "Toplam {n} puan",
   "vNone": "Kaynaklarını gir",
   "vB": "{b} günün {a} günü hedefe ulaşıyor",
   "vBal": "“Kesin kullanırım” günlere eşit dağıtıldı",
   "target": "Hedef",
   "gap": "{n} eksik",
   "ok": "Ulaşıldı",
   "left": "Kullanılmayan “Kullanabilirim”",
   "leftNone": "“Kullanabilirim” tamamen kullanıldı",
   "x": "",
   "spins": "çevirme",
   "pts": "puan",
   "dU": "g",
   "hU": "sa",
   "mU": "dk",
   "reset": "Hepsini temizle",
   "foot": "Puan değerleri: oyundaki Puan Kaynakları ekranı ve KvK rehberi. Puan günleri mevcut rehbere göre; oyun farklı gösteriyorsa oyuna güven ve bir yetkiliye haber ver. Veriler sadece kendi tarayıcında kalır.",
   "back": "KvK rehberine dön",
   "s4": "Puan kalemleri, seviye seviye",
   "s4hint": "Vali Tılsımı, petler ve Şef Donanımı yalnızca bir yükseltme tamamlanınca puan verir — eşiğe ulaşmayan malzeme sayılmaz. Planladığın yükseltmeleri ekle; elindekini girersen sırayla bitirebildiklerin sayılır. Sonuç yukarıdaki alanlara yazılır.",
   "lvFrom": "Şu an",
   "lvTo": "Hedef",
   "lvCount": "× adet",
   "lvHave": "Elimdekiler (isteğe bağlı)",
   "lvNeed": "Gerekli",
   "lvAdd": "+ ekle",
   "lvDone": "{n} yükseltme tamamlandı",
   "lvStop": "Burada durur — {m} yetersiz",
   "lvScore": "Puan",
   "lvToMust": "→ Kullanılacak",
   "lvToOpt": "→ Kullanılabilir",
   "lvPetMax": "Pet maks. seviye",
   "lvGearNote": "Oyun listesi Efsanevi 3★'da biter; üstü burada sayılmaz.",
   "lvSrc": "Maliyetler: topluluk veritabanlarının kaydettiği oyun içi değerler."
  },
  "id": {
   "title": "Perencana Poin KvK",
   "subtitle": "Hanya menghitung yang mau kamu pakai: poin per hari, dan hari apa item yang dapat poin di beberapa hari sebaiknya dipakai.",
   "s1": "Pilih tujuan",
   "mA": "Total pribadi",
   "mAd": "Tidak peduli harinya — hanya totalnya",
   "mB": "Persaingan harian / peringkat",
   "mBd": "Item yang dapat poin di beberapa hari diarahkan ke hari yang ingin kamu dorong",
   "tgHint": "Isi poin minimum yang kamu mau tiap hari. Hari tanpa target tidak memakai “Boleh dipakai”; kosongkan kelimanya untuk sekadar membagi “Pasti dipakai” secara merata.",
   "day": "Hari ke-{n}",
   "s2": "Sumber daya",
   "s2hint": "“Pasti dipakai” = yang memang akan kamu tingkatkan (mis. hanya master yang mau kamu latih). “Boleh dipakai” = rela ditukar poin. Yang tidak diisi tetap disimpan. Isi speedup dalam hari, jam, menit seperti ringkasan Sumber Daya & Speedup di game.",
   "colItem": "Sumber daya",
   "colDays": "Hari poin",
   "colMust": "Pasti dipakai",
   "colOpt": "Boleh dipakai",
   "gSpeed": "Speedup",
   "gGear": "Truegold & gear",
   "gHero": "Hero & master",
   "gPet": "Peliharaan",
   "gGov": "Gubernur",
   "perMin": "30/menit",
   "perPt": "/1 skor",
   "s3": "Pasukan (Hari ke-4)",
   "s3hint": "Promosi hanya menghitung selisih poin antar tingkat. Isi speedup pelatihan di atas.",
   "train": "Latih",
   "promote": "Promosi",
   "tier": "Tingkat",
   "rMust": "Poin “Pasti dipakai”",
   "rOpt": "Poin “Boleh dipakai”",
   "rOptB": "Poin “Boleh dipakai” yang terpakai",
   "rTotal": "Total",
   "vA": "Total {n} poin",
   "vNone": "Isi sumber dayamu",
   "vB": "{a} dari {b} hari mencapai target",
   "vBal": "“Pasti dipakai” dibagi rata ke semua hari",
   "target": "Target",
   "gap": "Kurang {n}",
   "ok": "Tercapai",
   "left": "“Boleh dipakai” yang tidak terpakai",
   "leftNone": "Semua “Boleh dipakai” terpakai",
   "x": "",
   "spins": "putaran",
   "pts": "poin",
   "dU": "h",
   "hU": "j",
   "mU": "m",
   "reset": "Hapus semua",
   "foot": "Nilai poin: layar Sumber Poin di game dan panduan KvK. Hari poin mengikuti panduan saat ini; jika game berbeda, ikuti game dan beri tahu officer. Data hanya tersimpan di browsermu.",
   "back": "Kembali ke panduan KvK",
   "s4": "Item skor, per level",
   "s4hint": "Charm Gubernur, pet, dan Gear Gubernur hanya dapat poin saat upgrade selesai — material yang belum mencapai ambang berikutnya tidak dihitung. Tambahkan upgrade yang direncanakan; jika mengisi yang kamu punya, hanya upgrade yang bisa diselesaikan berurutan yang dihitung. Hasilnya masuk ke kolom di atas.",
   "lvFrom": "Dari",
   "lvTo": "Ke",
   "lvCount": "× buah",
   "lvHave": "Yang kupunya (opsional)",
   "lvNeed": "Dibutuhkan",
   "lvAdd": "+ tambah",
   "lvDone": "{n} upgrade selesai",
   "lvStop": "Berhenti di sini — {m} kurang",
   "lvScore": "Skor",
   "lvToMust": "→ Pasti dipakai",
   "lvToOpt": "→ Boleh dipakai",
   "lvPetMax": "Level maks pet",
   "lvGearNote": "Daftar game berakhir di Legendary 3★; tahap di atasnya tidak dihitung di sini.",
   "lvSrc": "Biaya: nilai dalam game yang dicatat basis data komunitas."
  },
  "ru": {
   "title": "Планировщик очков KvK",
   "subtitle": "Считает только то, что вы готовы потратить: очки по дням и в какой день использовать предметы, которые засчитываются в несколько дней.",
   "s1": "Выберите цель",
   "mA": "Личный итог",
   "mAd": "Неважно, в какой день — важен только итог",
   "mB": "Борьба за день / рейтинг",
   "mBd": "Предметы, засчитываемые в несколько дней, идут в день, который вы хотите усилить",
   "tgHint": "Укажите минимум очков, который хотите получить в каждый день. В дни без цели «Можно потратить» не используется; оставьте все пять пустыми, чтобы просто равномерно распределить «Точно потрачу».",
   "day": "День {n}",
   "s2": "Ресурсы",
   "s2hint": "«Точно потрачу» — то, что вы и так собирались улучшать (например, только мастера, которых хотите качать). «Можно потратить» — не жалко отдать за очки. Незаполненное сохраняется. Ускорения вводите в днях, часах и минутах, как в игровой сводке ресурсов и ускорений.",
   "colItem": "Ресурс",
   "colDays": "Дни очков",
   "colMust": "Точно потрачу",
   "colOpt": "Можно потратить",
   "gSpeed": "Ускорения",
   "gGear": "Аурум и снаряжение",
   "gHero": "Герои и мастера",
   "gPet": "Питомцы",
   "gGov": "Губернатор",
   "perMin": "30/мин",
   "perPt": "/1 ед. оценки",
   "s3": "Войска (день 4)",
   "s3hint": "Повышение засчитывает только разницу очков между уровнями. Ускорения тренировки вводите выше.",
   "train": "Тренировать",
   "promote": "Повысить",
   "tier": "Уровень",
   "rMust": "Очки «Точно потрачу»",
   "rOpt": "Очки «Можно потратить»",
   "rOptB": "Использованные очки «Можно потратить»",
   "rTotal": "Итого",
   "vA": "Всего {n} очков",
   "vNone": "Введите ресурсы",
   "vB": "Цель достигнута в {a} из {b} дней",
   "vBal": "«Точно потрачу» распределено по дням равномерно",
   "target": "Цель",
   "gap": "Не хватает {n}",
   "ok": "Достигнуто",
   "left": "Неиспользованное «Можно потратить»",
   "leftNone": "Всё «Можно потратить» использовано",
   "x": "",
   "spins": "вращ.",
   "pts": "очк.",
   "dU": "д",
   "hU": "ч",
   "mU": "мин",
   "reset": "Очистить всё",
   "foot": "Очки: игровой экран «Источники очков» и гайд по KvK. Дни подсчёта взяты из текущего гайда; если в игре иначе, верьте игре и сообщите офицеру. Данные хранятся только в вашем браузере.",
   "back": "Вернуться к гайду по KvK",
   "s4": "Предметы с очками, по уровням",
   "s4hint": "Талисман губернатора, питомцы и снаряжение губернатора дают очки только за завершённое улучшение — материалы ниже порога не считаются. Добавьте запланированные улучшения; если указать запас, засчитаются только те, что можно завершить по порядку. Результат попадёт в поля выше.",
   "lvFrom": "С",
   "lvTo": "До",
   "lvCount": "× шт.",
   "lvHave": "Мой запас (необязательно)",
   "lvNeed": "Нужно",
   "lvAdd": "+ добавить",
   "lvDone": "Завершено улучшений: {n}",
   "lvStop": "Стоп — не хватает: {m}",
   "lvScore": "Очки",
   "lvToMust": "→ Точно потрачу",
   "lvToOpt": "→ Могу потратить",
   "lvPetMax": "Макс. уровень питомца",
   "lvGearNote": "Список в игре заканчивается на Легендарное 3★; выше здесь не считается.",
   "lvSrc": "Стоимость: игровые значения из баз сообщества."
  },
  "th": {
   "title": "ตัววางแผนคะแนน KvK",
   "subtitle": "คิดเฉพาะของที่คุณยอมใช้: ได้คะแนนวันละเท่าไร และของที่นับคะแนนได้หลายวันควรใช้วันไหน",
   "s1": "เลือกเป้าหมาย",
   "mA": "คะแนนรวมส่วนตัว",
   "mAd": "ไม่สนว่าคะแนนอยู่วันไหน ดูแค่ยอดรวม",
   "mB": "แข่งรายวัน / ไต่อันดับ",
   "mBd": "ของที่นับคะแนนได้หลายวันจะถูกจัดไปวันที่คุณอยากดัน",
   "tgHint": "กรอกคะแนนขั้นต่ำที่อยากได้แต่ละวัน วันที่ไม่มีเป้าจะไม่ใช้ “ใช้ได้” ถ้าเว้นว่างทั้งห้าวัน จะแค่กระจาย “ใช้แน่” ให้เท่ากัน",
   "day": "วันที่ {n}",
   "s2": "ทรัพยากร",
   "s2hint": "“ใช้แน่” คือส่วนที่ตั้งใจอัปเกรดอยู่แล้ว (เช่น เฉพาะมาสเตอร์ที่อยากฝึก) “ใช้ได้” คือส่วนที่เอาไปแลกคะแนนได้ไม่เสียดาย ที่ไม่ได้กรอกจะเก็บไว้ กรอกตัวเร่งเป็นวัน ชั่วโมง นาที เหมือนสรุปทรัพยากรและตัวเร่งในเกม",
   "colItem": "ทรัพยากร",
   "colDays": "วันนับคะแนน",
   "colMust": "ใช้แน่",
   "colOpt": "ใช้ได้",
   "gSpeed": "ตัวเร่ง",
   "gGear": "ทรูโกลด์และอุปกรณ์",
   "gHero": "ฮีโร่และมาสเตอร์",
   "gPet": "สัตว์เลี้ยง",
   "gGov": "ผู้นำค่าย",
   "perMin": "30/นาที",
   "perPt": "/1 คะแนนประเมิน",
   "s3": "ทหาร (วันที่ 4)",
   "s3hint": "การเลื่อนขั้นนับเฉพาะส่วนต่างคะแนนระหว่างระดับ กรอกตัวเร่งการฝึกด้านบน",
   "train": "ฝึก",
   "promote": "เลื่อนขั้น",
   "tier": "ระดับ",
   "rMust": "คะแนน “ใช้แน่”",
   "rOpt": "คะแนน “ใช้ได้”",
   "rOptB": "คะแนน “ใช้ได้” ที่ใช้ไป",
   "rTotal": "รวม",
   "vA": "รวม {n} คะแนน",
   "vNone": "กรอกทรัพยากรของคุณ",
   "vB": "ถึงเป้า {a} จาก {b} วัน",
   "vBal": "กระจาย “ใช้แน่” ให้แต่ละวันเท่ากันแล้ว",
   "target": "เป้า",
   "gap": "ขาด {n}",
   "ok": "ถึงเป้า",
   "left": "“ใช้ได้” ที่ไม่ได้ใช้",
   "leftNone": "ใช้ “ใช้ได้” ครบแล้ว",
   "x": "",
   "spins": "ครั้ง",
   "pts": "คะแนน",
   "dU": "วัน",
   "hU": "ชม.",
   "mU": "นาที",
   "reset": "ล้างทั้งหมด",
   "foot": "ค่าคะแนน: หน้าแหล่งคะแนนในเกมและคู่มือ KvK วันนับคะแนนอิงตามคู่มือปัจจุบัน หากในเกมต่างไป ให้ยึดตามเกมและแจ้งเจ้าหน้าที่ ข้อมูลเก็บไว้ในเบราว์เซอร์ของคุณเท่านั้น",
   "back": "กลับไปคู่มือ KvK",
   "s4": "รายการคะแนน ทีละระดับ",
   "s4hint": "เครื่องรางเจ้าเมือง สัตว์เลี้ยง และอุปกรณ์ผู้นำค่ายได้คะแนนเมื่ออัปเกรดสำเร็จเท่านั้น วัสดุที่ไม่ถึงเกณฑ์ขั้นถัดไปไม่นับ เพิ่มขั้นที่วางแผนจะอัป ถ้ากรอกวัสดุที่มี จะนับเฉพาะขั้นที่ทำสำเร็จตามลำดับ ผลลัพธ์จะถูกใส่ในช่องด้านบน",
   "lvFrom": "จาก",
   "lvTo": "ถึง",
   "lvCount": "× ชิ้น",
   "lvHave": "วัสดุที่มี (ไม่บังคับ)",
   "lvNeed": "ต้องใช้",
   "lvAdd": "+ เพิ่ม",
   "lvDone": "อัปเกรดสำเร็จ {n} ครั้ง",
   "lvStop": "หยุดตรงนี้ — {m} ไม่พอ",
   "lvScore": "คะแนน",
   "lvToMust": "→ ใช้แน่นอน",
   "lvToOpt": "→ ใช้ได้",
   "lvPetMax": "เลเวลสูงสุดของสัตว์เลี้ยง",
   "lvGearNote": "รายการในเกมจบที่ตำนาน 3★ ขั้นที่สูงกว่าไม่นับที่นี่",
   "lvSrc": "ค่าใช้จ่าย: ค่าในเกมตามฐานข้อมูลของผู้เล่น"
  },
  "ar": {
   "title": "مخطط نقاط KvK",
   "subtitle": "يحسب فقط ما تريد إنفاقه: النقاط في كل يوم، وفي أي يوم تستخدم العناصر التي تُحتسب في عدة أيام.",
   "s1": "اختر الهدف",
   "mA": "المجموع الشخصي",
   "mAd": "لا يهم اليوم — المهم المجموع فقط",
   "mB": "منافسة يومية / تصنيف",
   "mBd": "العناصر التي تُحتسب في عدة أيام تذهب إلى اليوم الذي تريد دفعه",
   "tgHint": "أدخل الحد الأدنى من النقاط الذي تريده كل يوم. الأيام بلا هدف لا تستخدم شيئًا من «ممكن»؛ اترك الأيام الخمسة فارغة لتوزيع «مؤكد» بالتساوي فقط.",
   "day": "اليوم {n}",
   "s2": "الموارد",
   "s2hint": "«مؤكد» = ما كنت ستطوّره على أي حال (مثلًا المتخصصون الذين تنوي تدريبهم فقط). «ممكن» = لا مانع من إنفاقه مقابل النقاط. ما لا تدخله يبقى محفوظًا. أدخل المسرّعات بالأيام والساعات والدقائق كما في ملخص الموارد والمسرّعات داخل اللعبة.",
   "colItem": "المورد",
   "colDays": "أيام النقاط",
   "colMust": "مؤكد",
   "colOpt": "ممكن",
   "gSpeed": "المسرّعات",
   "gGear": "الذهب الخالص والعتاد",
   "gHero": "الأبطال والمتخصصون",
   "gPet": "الحيوانات الأليفة",
   "gGov": "الحاكم",
   "perMin": "30/دقيقة",
   "perPt": "/1 نقطة تقييم",
   "s3": "القوات (اليوم 4)",
   "s3hint": "الترقية تحتسب فقط فرق النقاط بين المستويين. أدخل مسرّعات التدريب في الأعلى.",
   "train": "تدريب",
   "promote": "ترقية",
   "tier": "المستوى",
   "rMust": "نقاط «مؤكد»",
   "rOpt": "نقاط «ممكن»",
   "rOptB": "نقاط «ممكن» المستخدمة",
   "rTotal": "المجموع",
   "vA": "المجموع {n} نقطة",
   "vNone": "أدخل مواردك",
   "vB": "{a} من {b} أيام تبلغ الهدف",
   "vBal": "تم توزيع «مؤكد» على الأيام بالتساوي",
   "target": "الهدف",
   "gap": "ينقص {n}",
   "ok": "تم",
   "left": "«ممكن» غير المستخدم",
   "leftNone": "تم استخدام كل «ممكن»",
   "x": "",
   "spins": "دورات",
   "pts": "نقطة",
   "dU": "ي",
   "hU": "س",
   "mU": "د",
   "reset": "مسح الكل",
   "foot": "قيم النقاط: شاشة مصادر النقاط في اللعبة ودليل KvK. أيام الاحتساب حسب الدليل الحالي؛ إن اختلفت اللعبة فاعتمد على اللعبة وأبلغ أحد الضباط. البيانات تبقى في متصفحك فقط.",
   "back": "العودة إلى دليل KvK",
   "s4": "عناصر النقاط، مستوى بمستوى",
   "s4hint": "تميمة الحاكم والحيوانات الأليفة وعتاد الحاكم لا تمنح نقاطًا إلا عند إتمام الترقية — المواد التي لا تبلغ العتبة التالية لا تُحتسب. أضف الترقيات المخططة؛ وإذا أدخلت ما لديك تُحتسب فقط الترقيات التي يمكن إتمامها بالترتيب. تُنقل النتيجة إلى الحقول أعلاه.",
   "lvFrom": "من",
   "lvTo": "إلى",
   "lvCount": "× قطعة",
   "lvHave": "ما لديّ (اختياري)",
   "lvNeed": "المطلوب",
   "lvAdd": "+ إضافة",
   "lvDone": "{n} ترقيات مكتملة",
   "lvStop": "يتوقف هنا — {m} غير كافٍ",
   "lvScore": "النتيجة",
   "lvToMust": "→ سأستخدم",
   "lvToOpt": "→ يمكن استخدامه",
   "lvPetMax": "الحد الأقصى لمستوى الحيوان",
   "lvGearNote": "تنتهي قائمة اللعبة عند أسطوري 3★؛ لا تُحتسب الخطوات الأعلى هنا.",
   "lvSrc": "التكاليف: قيم اللعبة كما سجّلتها قواعد بيانات اللاعبين."
  }
 },
 "items": [
  {
   "id": "spG",
   "g": "gSpeed",
   "v": 30,
   "days": [
    1,
    2,
    5
   ],
   "pref": 5,
   "sp": 1,
   "n": {
    "en": "General Speedups",
    "zh": "通用加速",
    "ko": "공용 가속",
    "de": "Allgemeine Beschleunigung",
    "fr": "Accélérateur général",
    "pt": "Acelerador geral",
    "tr": "Genel Hızlandırma",
    "id": "Speedup Umum",
    "ru": "Универсальное ускорение",
    "th": "เร่งสปีดทั่วไป",
    "ar": "تسريع عام",
    "es": "Acelerador general"
   }
  },
  {
   "id": "spT",
   "g": "gSpeed",
   "v": 30,
   "days": [
    1,
    2,
    5
   ],
   "pref": 5,
   "sp": 1,
   "n": {
    "en": "Training Speedups",
    "zh": "士兵訓練加速",
    "ko": "훈련 가속",
    "de": "Trainings-Beschleunigung",
    "fr": "Accélérateur d'Entraînement",
    "pt": "Acelerador de Treinamento",
    "tr": "Eğitim Hızlandırması",
    "id": "Speedup Pelatihan",
    "ru": "Ускорение тренировки",
    "th": "เร่งสปีดการฝึก",
    "ar": "تسريع التدريب",
    "es": "Acelerador de Entrenamiento"
   }
  },
  {
   "id": "spC",
   "g": "gSpeed",
   "v": 30,
   "days": [
    1,
    2,
    5
   ],
   "pref": 1,
   "sp": 1,
   "n": {
    "en": "Construction Speedups",
    "zh": "建造加速",
    "ko": "건설 가속",
    "de": "Bau-Beschleunigung",
    "fr": "Accélérateur de Construction",
    "pt": "Acelerador de Construção",
    "tr": "İnşaat Hızlandırması",
    "id": "Speedup Konstruksi",
    "ru": "Ускорение строительства",
    "th": "เร่งสปีดการสร้าง",
    "ar": "تسريع البناء",
    "es": "Acelerador de Construcción"
   }
  },
  {
   "id": "spR",
   "g": "gSpeed",
   "v": 30,
   "days": [
    1,
    2,
    5
   ],
   "pref": 2,
   "sp": 1,
   "n": {
    "en": "Research Speedups",
    "zh": "研究加速",
    "ko": "연구 가속",
    "de": "Forschungs-Beschleunigung",
    "fr": "Accélérateur de Recherche",
    "pt": "Acelerador de Pesquisa",
    "tr": "Araştırma Hızlandırması",
    "id": "Speedup Penelitian",
    "ru": "Ускорение исследования",
    "th": "เร่งสปีดการวิจัย",
    "ar": "تسريع البحث",
    "es": "Acelerador de Investigación"
   }
  },
  {
   "id": "spL",
   "g": "gSpeed",
   "v": 30,
   "days": [
    1,
    2,
    5
   ],
   "pref": 2,
   "sp": 1,
   "n": {
    "en": "Learning Speedups",
    "zh": "學習加速",
    "ko": "학습 가속",
    "de": "Lern-Beschleunigung",
    "fr": "Accélérateurs d'Apprentissage",
    "pt": "Acelerador de Aprendizado",
    "tr": "Öğrenme Hızlandırması",
    "id": "Percepatan Pembelajaran",
    "ru": "Ускорение изучения",
    "th": "เร่งสปีดการเรียนรู้",
    "ar": "مسرعات التعلم",
    "es": "Acelerador de aprendizaje"
   }
  },
  {
   "id": "tg",
   "g": "gGear",
   "v": 2000,
   "days": [
    1,
    2,
    5
   ],
   "pref": 1,
   "n": {
    "en": "Truegold",
    "zh": "黃金",
    "ko": "순금",
    "de": "Echtgold",
    "fr": "Or Véritable",
    "pt": "Adamante",
    "tr": "Hasaltın",
    "id": "Truegold",
    "ru": "Аурум",
    "th": "ทรูโกลด์",
    "ar": "الذهب الخالص",
    "es": "Adamantina"
   }
  },
  {
   "id": "mi",
   "g": "gGear",
   "v": 40000,
   "days": [
    4,
    5
   ],
   "pref": 5,
   "n": {
    "en": "Mithril",
    "zh": "秘銀",
    "ko": "미스릴",
    "de": "Mithril",
    "fr": "Mithril",
    "pt": "Mithril",
    "tr": "Mithril",
    "id": "Mithril",
    "ru": "Мифрил",
    "th": "มิธริล",
    "ar": "ميثريل",
    "es": "Mitrilo"
   }
  },
  {
   "id": "wd",
   "g": "gGear",
   "v": 8000,
   "days": [
    4,
    5
   ],
   "pref": 5,
   "n": {
    "en": "Hero Exclusive Gear Widgets",
    "zh": "英雄專屬裝備零件",
    "ko": "영웅 전용 장비 부속품",
    "de": "Elemente von Helden Exklusive Ausrüstung",
    "fr": "Composants d'Équipement Exclusif de Héros",
    "pt": "Ferramentas de Equipamento Exclusivo do Herói",
    "tr": "Kahraman Özel Donanımı Aleti",
    "id": "Widget dari Gear Ekslusif Hero",
    "ru": "Поделки эксклюзивного снаряжения героя",
    "th": "อุปกรณ์เสริมสำหรับอุปกรณ์พิเศษฮีโร่",
    "ar": "أجزاء عتاد البطل الحصري",
    "es": "Complementos de Equipo Exclusivo de Héroe"
   }
  },
  {
   "id": "hm",
   "g": "gGear",
   "v": 4000,
   "days": [
    4,
    5
   ],
   "pref": 5,
   "n": {
    "en": "Hero Gear Forgehammers",
    "zh": "英雄裝備鍛造錘",
    "ko": "영웅 장비 제작 망치",
    "de": "Heldenausrüstung Schmiedehammer",
    "fr": "Marteau de Forge d'Équipement Héros",
    "pt": "Martelo de forja de Equipamento de Herói",
    "tr": "Kahraman Donanımı Demirci Çekici",
    "id": "Forgehammer Gear Hero",
    "ru": "Кузнечный молот для снаряжения героев",
    "th": "ค้อนตีเหล็กอุปกรณ์ฮีโร่",
    "ar": "مطرقة الحدادة لعتاد البطل",
    "es": "Martillo de Forja de Equipo de Héroe"
   }
  },
  {
   "id": "my",
   "g": "gHero",
   "v": 3040,
   "days": [
    2,
    3
   ],
   "pref": 2,
   "n": {
    "en": "Mythic Hero Shards",
    "zh": "傳說英雄碎片",
    "ko": "레전드 영웅 파편",
    "de": "Mythische Helden Fragmente",
    "fr": "Fragment de Héros Mythique",
    "pt": "Fragmento de Herói Mítico",
    "tr": "Mitik Kahraman Parçası",
    "id": "Fragmen Hero Mythic",
    "ru": "Мифический фрагмент героя",
    "th": "ชิ้นส่วนฮีโร่ขั้นเทพ",
    "ar": "شظية بطل خيالي",
    "es": "Fragmento de Héroe Mítico"
   }
  },
  {
   "id": "ep",
   "g": "gHero",
   "v": 1220,
   "days": [
    2,
    3
   ],
   "pref": 2,
   "n": {
    "en": "Epic Hero Shards",
    "zh": "史詩英雄碎片",
    "ko": "에픽 영웅 파편",
    "de": "Epische Helden Fragmente",
    "fr": "Fragment de Héros Épique",
    "pt": "Fragmento de Herói Épico",
    "tr": "Epik Kahraman Parçası",
    "id": "Fragmen Hero Epic",
    "ru": "Великий фрагмент героя",
    "th": "ชิ้นส่วนฮีโร่มหากาพย์",
    "ar": "شظية بطل ملحمي",
    "es": "Fragmento de Héroe Épico"
   }
  },
  {
   "id": "ra",
   "g": "gHero",
   "v": 350,
   "days": [
    2,
    3
   ],
   "pref": 2,
   "n": {
    "en": "Rare Hero Shards",
    "zh": "稀有英雄碎片",
    "ko": "레어 영웅 파편",
    "de": "Seltene Helden Fragmente",
    "fr": "Fragment de Héros Rare",
    "pt": "Fragmento de Herói Raro",
    "tr": "Ender Kahraman Parçası",
    "id": "Fragmen Hero Rare",
    "ru": "Редкий фрагмент героя",
    "th": "ชิ้นส่วนฮีโร่หายาก",
    "ar": "شظية بطل نادر",
    "es": "Fragmento de Héroe Raro"
   }
  },
  {
   "id": "ro",
   "g": "gHero",
   "v": 8000,
   "days": [
    2,
    3
   ],
   "pref": 2,
   "unit": "spins",
   "n": {
    "en": "Hero Roulette (spins)",
    "zh": "英雄轉盤（次）",
    "ko": "영웅 룰렛 (회)",
    "de": "Helden Roulette (Drehungen)",
    "fr": "Roulette des Héros (tours)",
    "pt": "Roleta do Herói (giros)",
    "tr": "Kahraman Ruleti (çevirme)",
    "id": "Rolet Hero (putaran)",
    "ru": "Геройская рулетка (вращения)",
    "th": "รูเล็ตฮีโร่ (ครั้ง)",
    "ar": "روليت البطل (دورات)",
    "es": "Ruleta de Héroes (giros)"
   }
  },
  {
   "id": "em",
   "g": "gHero",
   "v": 6000,
   "days": [
    2,
    3
   ],
   "pref": 2,
   "n": {
    "en": "Master Emblems",
    "zh": "大師徽記",
    "ko": "거장 배지",
    "de": "Meister-Emblem",
    "fr": "Emblème d'expert",
    "pt": "Emblema Mestre",
    "tr": "Usta Amblemi",
    "id": "Emblem Master",
    "ru": "Эмблема мастера",
    "th": "ตรามาสเตอร์",
    "ar": "شعار المتخصص",
    "es": "Emblema de Maestro"
   }
  },
  {
   "id": "ms",
   "g": "gHero",
   "v": 60,
   "days": [
    2,
    3
   ],
   "pref": 3,
   "n": {
    "en": "Master's Manuscripts",
    "zh": "大師手稿",
    "ko": "거장의 원고",
    "de": "Meister-Manuskript",
    "fr": "Manuscrit d'expert",
    "pt": "Manuscrito de Mestre",
    "tr": "Uzmanın El Yazması",
    "id": "Manuskrip Master",
    "ru": "Рукопись мастера",
    "th": "ตำรามาสเตอร์",
    "ar": "مخطوطة المتخصص",
    "es": "Manuscrito del maestro"
   }
  },
  {
   "id": "at",
   "g": "gPet",
   "v": 15000,
   "days": [
    3,
    5
   ],
   "pref": 3,
   "n": {
    "en": "Advanced Taming Marks",
    "zh": "高級馴化印記",
    "ko": "고급 훈련 기록",
    "de": "Fortgeschrittene Zähmungszeichen",
    "fr": "Marque de Dressage Avancée",
    "pt": "Marca de Domesticação Avançada",
    "tr": "Gelişmiş Evcilleştirme İşareti",
    "id": "Tanda Penjinakan Advanced",
    "ru": "Продвинутая метка приручения",
    "th": "ตราฝึกสัตว์ขั้นสูง",
    "ar": "علامة ترويض متقدمة",
    "es": "Marcas de Domesticación Avanzadas"
   }
  },
  {
   "id": "ct",
   "g": "gPet",
   "v": 1150,
   "days": [
    3,
    5
   ],
   "pref": 3,
   "n": {
    "en": "Common Taming Marks",
    "zh": "普通馴化印記",
    "ko": "일반 훈련 기록",
    "de": "Gewöhnliche Zähmungszeichen",
    "fr": "Marque de Dressage Commune",
    "pt": "Marca de Domesticação Comum",
    "tr": "Sıradan Evcilleştirme İşareti",
    "id": "Tanda Penjinakan Common",
    "ru": "Обычная метка приручения",
    "th": "ตราฝึกสัตว์ทั่วไป",
    "ar": "علامة ترويض شائعة",
    "es": "Marcas de Domesticación Comunes"
   }
  },
  {
   "id": "pa",
   "g": "gPet",
   "v": 50,
   "days": [
    3,
    5
   ],
   "pref": 3,
   "score": 1,
   "n": {
    "en": "Pet advancement score",
    "zh": "寵物突破評分",
    "ko": "펫 돌파 평점",
    "de": "Begleittier-Förderungswert",
    "fr": "Score d'avancement des animaux",
    "pt": "Pontuação de avanço do animal de estimação",
    "tr": "Pet ilerletme puanı",
    "id": "Skor kemajuan hewan peliharaan",
    "ru": "Очки за улучшение питомца",
    "th": "คะแนนความก้าวหน้าสัตว์เลี้ยง",
    "ar": "نتيجة تقدم الحيوان الأليف",
    "es": "Puntuación de avance de mascota"
   }
  },
  {
   "id": "ch",
   "g": "gGov",
   "v": 70,
   "days": [
    1,
    3,
    4
   ],
   "pref": 4,
   "score": 1,
   "n": {
    "en": "Governor Charm score",
    "zh": "領主寶石評分",
    "ko": "영주 보석 평점",
    "de": "Gouverneur Talisman Punkte",
    "fr": "Score du Talisman du Gouverneur",
    "pt": "Pontuação do Talismã do Governador",
    "tr": "Vali Tılsımı puanı",
    "id": "Skor Charm Gubernur",
    "ru": "Очки за талисман губернатора",
    "th": "คะแนนเครื่องรางเจ้าเมือง",
    "ar": "نقاط تميمة الحاكم",
    "es": "Puntuación del Talismán del Gobernador"
   }
  },
  {
   "id": "gg",
   "g": "gGov",
   "v": 36,
   "days": [
    5
   ],
   "pref": 5,
   "score": 1,
   "n": {
    "en": "Governor Gear score",
    "zh": "領主裝備評分",
    "ko": "영주 장비 평점",
    "de": "Gouverneur-Ausrüstung Punktezahl",
    "fr": "Score d'Équipement du Chef",
    "pt": "Pontuação do Equipamento do Chefe",
    "tr": "Şef Donanımı puanı",
    "id": "Skor Gear Gubernur",
    "ru": "Очки за снаряжение губернатора",
    "th": "คะแนนอุปกรณ์ผู้นำค่าย",
    "ar": "نقاط عتاد الحاكم",
    "es": "Puntuación del Equipo de Líder"
   }
  }
 ],
 "troopPts": [
  3,
  4,
  5,
  8,
  12,
  18,
  25,
  35,
  45,
  60,
  75
 ],
 "lv": {
  "mats": {
   "cd": {
    "en": "Charm Design",
    "zh": "寶石圖紙",
    "ko": "보석 도면",
    "de": "Talismanpläne",
    "fr": "Plans de Talisman",
    "pt": "Design do Talismã",
    "es": "Planos de talismán",
    "tr": "Tılsım Tasarımı",
    "id": "Desain Charm",
    "ru": "Чертеж талисмана",
    "th": "แผนเครื่องราง",
    "ar": "تصميم تميمة"
   },
   "cg": {
    "en": "Charm Guide",
    "zh": "寶石指南",
    "ko": "보석 가이드",
    "de": "Talisman-Anleitung",
    "fr": "Guide de Talisman",
    "pt": "Guia do Talismã",
    "es": "Guía de talismán",
    "tr": "Tılsım Rehberi",
    "id": "Panduan Charm",
    "ru": "Руководство по талисману",
    "th": "คู่มือเครื่องราง",
    "ar": "دليل التميمة"
   },
   "pf": {
    "en": "Pet Food",
    "zh": "寵物口糧",
    "ko": "펫 먹이",
    "de": "Begleittier-Futter",
    "fr": "aliments pour animaux",
    "pt": "Alimento para Pets",
    "es": "Comidas para Mascotas",
    "tr": "Evcil Hayvan Maması",
    "id": "Makanan Peliharaan",
    "ru": "корм для животных",
    "th": "อาหารสัตว์",
    "ar": "طعام حيوان أليف"
   },
   "gm": {
    "en": "Growth Manual",
    "zh": "成長手冊",
    "ko": "성장 매뉴얼",
    "de": "Wachstumshandbuch",
    "fr": "Manuel de Croissance",
    "pt": "Manual de Crescimento",
    "es": "Manual de crecimiento",
    "tr": "Büyüme Kılavuzu",
    "id": "Manual Pertumbuhan",
    "ru": "Руководство по росту",
    "th": "คู่มือการเติบโต",
    "ar": "دليل النمو"
   },
   "np": {
    "en": "Nutrient Potion",
    "zh": "營養藥水",
    "ko": "영양 물약",
    "de": "Nährtrank",
    "fr": "Potion Nutritive",
    "pt": "Poção Nutritiva",
    "es": "Poción nutritiva",
    "tr": "Besin İksiri",
    "id": "Ramuan Nutrisi",
    "ru": "Питательное зелье",
    "th": "ยาบำรุง",
    "ar": "جرعة مغذية"
   },
   "pm": {
    "en": "Promotion Medallion",
    "zh": "晉升勳章",
    "ko": "승급 메달",
    "de": "Beförderungsmedaille",
    "fr": "Médaillon de Promotion",
    "pt": "Medalhão de Promoção",
    "es": "Medallón de ascenso",
    "tr": "Terfi Madalyonu",
    "id": "Medali Promosi",
    "ru": "Медальон повышения",
    "th": "เหรียญเลื่อนขั้น",
    "ar": "ميدالية الترقية"
   },
   "sa": {
    "en": "Satin",
    "zh": "進貢綢緞",
    "ko": "비단",
    "de": "Satin",
    "fr": "Satin",
    "pt": "Cetim",
    "es": "Satén",
    "tr": "Saten",
    "id": "Satin",
    "ru": "Атлас",
    "th": "ผ้าซาติน",
    "ar": "نسيج أطلس"
   },
   "gt": {
    "en": "Gilded Threads",
    "zh": "金絲線",
    "ko": "금사",
    "de": "Vergoldete Fäden",
    "fr": "Fils Dorés",
    "pt": "Fios Dourados",
    "es": "Hilos dorados",
    "tr": "Yaldızlı İplikler",
    "id": "Gilded Threads",
    "ru": "Золоченые нити",
    "th": "ด้ายทองคำ",
    "ar": "خيوط مذهبة"
   },
   "av": {
    "en": "Artisan's Vision",
    "zh": "設計圖紙",
    "ko": "설계 스케치",
    "de": "Die Vision des Handwerkers",
    "fr": "Vision de l'Artisan",
    "pt": "Visão do Artesão",
    "es": "Visión del Artesano",
    "tr": "Zanaatkâr Vizyonu",
    "id": "Artisan's Vision",
    "ru": "Ремесленный чертеж",
    "th": "วิสัยทัศน์ของช่างฝีมือ",
    "ar": "رؤية الحرفي"
   }
  },
  "charm": {
   "item": "ch",
   "mats": [
    "cg",
    "cd"
   ],
   "steps": [
    {
     "n": "Lv.1",
     "score": 625,
     "c": [
      5,
      5
     ]
    },
    {
     "n": "Lv.2",
     "score": 1250,
     "c": [
      40,
      15
     ]
    },
    {
     "n": "Lv.3",
     "score": 3125,
     "c": [
      60,
      40
     ]
    },
    {
     "n": "Lv.4",
     "score": 8750,
     "c": [
      80,
      100
     ]
    },
    {
     "n": "Lv.5",
     "score": 11250,
     "c": [
      100,
      200
     ]
    },
    {
     "n": "Lv.6",
     "score": 12500,
     "c": [
      120,
      300
     ]
    },
    {
     "n": "Lv.7",
     "score": 12500,
     "c": [
      140,
      400
     ]
    },
    {
     "n": "Lv.8",
     "score": 13000,
     "c": [
      200,
      400
     ]
    },
    {
     "n": "Lv.9",
     "score": 14000,
     "c": [
      300,
      400
     ]
    },
    {
     "n": "Lv.10",
     "score": 15000,
     "c": [
      420,
      420
     ]
    },
    {
     "n": "Lv.11",
     "score": 16000,
     "c": [
      560,
      420
     ]
    }
   ]
  },
  "pet": {
   "item": "pa",
   "mats": [
    "pf",
    "gm",
    "np",
    "pm"
   ],
   "groups": [
    {
     "max": 50,
     "steps": [
      {
       "n": "Lv.10",
       "score": 500,
       "c": [
        1715,
        15,
        0,
        0
       ]
      },
      {
       "n": "Lv.20",
       "score": 1000,
       "c": [
        3180,
        30,
        0,
        0
       ]
      },
      {
       "n": "Lv.30",
       "score": 2000,
       "c": [
        5010,
        45,
        10,
        0
       ]
      },
      {
       "n": "Lv.40",
       "score": 3000,
       "c": [
        7660,
        60,
        20,
        0
       ]
      },
      {
       "n": "Lv.50",
       "score": 4500,
       "c": [
        11300,
        90,
        30,
        10
       ]
      }
     ]
    },
    {
     "max": 60,
     "steps": [
      {
       "n": "Lv.10",
       "score": 500,
       "c": [
        2530,
        20,
        0,
        0
       ]
      },
      {
       "n": "Lv.20",
       "score": 1000,
       "c": [
        5360,
        40,
        0,
        0
       ]
      },
      {
       "n": "Lv.30",
       "score": 2000,
       "c": [
        9020,
        60,
        10,
        0
       ]
      },
      {
       "n": "Lv.40",
       "score": 3000,
       "c": [
        14320,
        90,
        20,
        0
       ]
      },
      {
       "n": "Lv.50",
       "score": 4500,
       "c": [
        21620,
        130,
        20,
        10
       ]
      },
      {
       "n": "Lv.60",
       "score": 6750,
       "c": [
        30920,
        175,
        50,
        20
       ]
      }
     ]
    },
    {
     "max": 70,
     "steps": [
      {
       "n": "Lv.10",
       "score": 500,
       "c": [
        3795,
        25,
        0,
        0
       ]
      },
      {
       "n": "Lv.20",
       "score": 1000,
       "c": [
        8040,
        50,
        0,
        0
       ]
      },
      {
       "n": "Lv.30",
       "score": 2000,
       "c": [
        13530,
        75,
        10,
        0
       ]
      },
      {
       "n": "Lv.40",
       "score": 3000,
       "c": [
        21480,
        100,
        20,
        0
       ]
      },
      {
       "n": "Lv.50",
       "score": 4500,
       "c": [
        32430,
        155,
        30,
        10
       ]
      },
      {
       "n": "Lv.60",
       "score": 6750,
       "c": [
        46380,
        200,
        50,
        20
       ]
      },
      {
       "n": "Lv.70",
       "score": 10000,
       "c": [
        63300,
        255,
        80,
        40
       ]
      }
     ]
    },
    {
     "max": 80,
     "steps": [
      {
       "n": "Lv.10",
       "score": 500,
       "c": [
        5060,
        30,
        0,
        0
       ]
      },
      {
       "n": "Lv.20",
       "score": 1000,
       "c": [
        10720,
        60,
        0,
        0
       ]
      },
      {
       "n": "Lv.30",
       "score": 2000,
       "c": [
        18040,
        95,
        10,
        0
       ]
      },
      {
       "n": "Lv.40",
       "score": 3000,
       "c": [
        28640,
        125,
        20,
        0
       ]
      },
      {
       "n": "Lv.50",
       "score": 4500,
       "c": [
        43240,
        190,
        30,
        10
       ]
      },
      {
       "n": "Lv.60",
       "score": 6750,
       "c": [
        61840,
        250,
        50,
        20
       ]
      },
      {
       "n": "Lv.70",
       "score": 10000,
       "c": [
        84400,
        310,
        80,
        40
       ]
      },
      {
       "n": "Lv.80",
       "score": 12000,
       "c": [
        108480,
        380,
        100,
        60
       ]
      }
     ]
    },
    {
     "max": 100,
     "steps": [
      {
       "n": "Lv.10",
       "score": 500,
       "c": [
        6325,
        35,
        0,
        0
       ]
      },
      {
       "n": "Lv.20",
       "score": 1000,
       "c": [
        13400,
        70,
        0,
        0
       ]
      },
      {
       "n": "Lv.30",
       "score": 2000,
       "c": [
        22550,
        110,
        15,
        0
       ]
      },
      {
       "n": "Lv.40",
       "score": 3000,
       "c": [
        35800,
        145,
        35,
        0
       ]
      },
      {
       "n": "Lv.50",
       "score": 4500,
       "c": [
        54050,
        220,
        50,
        10
       ]
      },
      {
       "n": "Lv.60",
       "score": 6750,
       "c": [
        77300,
        290,
        65,
        20
       ]
      },
      {
       "n": "Lv.70",
       "score": 10000,
       "c": [
        105500,
        365,
        85,
        40
       ]
      },
      {
       "n": "Lv.80",
       "score": 12000,
       "c": [
        135600,
        440,
        100,
        60
       ]
      },
      {
       "n": "Lv.90",
       "score": 14500,
       "c": [
        172000,
        585,
        115,
        80
       ]
      },
      {
       "n": "Lv.100",
       "score": 17500,
       "c": [
        212100,
        730,
        135,
        100
       ]
      }
     ]
    }
   ]
  },
  "gear": {
   "item": "gg",
   "mats": [
    "sa",
    "gt",
    "av"
   ],
   "q": {
    "g": {
     "en": "Uncommon",
     "zh": "良好",
     "ko": "고급",
     "de": "Ungewöhnlich",
     "fr": "Peu commun",
     "pt": "Incomum",
     "es": "Poco común",
     "tr": "Sıra dışı",
     "id": "Uncommon",
     "ru": "Необычное",
     "th": "ไม่ธรรมดา",
     "ar": "غير شائع"
    },
    "b": {
     "en": "Rare",
     "zh": "稀有",
     "ko": "레어",
     "de": "Selten",
     "fr": "Rare",
     "pt": "Raro",
     "es": "Raro",
     "tr": "Ender",
     "id": "Rare",
     "ru": "Редкое",
     "th": "หายาก",
     "ar": "نادر"
    },
    "p": {
     "en": "Epic",
     "zh": "史詩",
     "ko": "에픽",
     "de": "Episch",
     "fr": "Épique",
     "pt": "Épico",
     "es": "Épico",
     "tr": "Epik",
     "id": "Epic",
     "ru": "Великое",
     "th": "มหากาพย์",
     "ar": "ملحمي"
    },
    "p1": {
     "en": "Epic T1",
     "zh": "史詩T1",
     "ko": "에픽 T1",
     "de": "Episch T1",
     "fr": "Épique T1",
     "pt": "Épico T1",
     "es": "Épico T1",
     "tr": "Epik T1",
     "id": "Epic T1",
     "ru": "Великое T1",
     "th": "มหากาพย์ T1",
     "ar": "ملحمي T1"
    },
    "y": {
     "en": "Legendary",
     "zh": "傳說",
     "ko": "레전드",
     "de": "Legendär",
     "fr": "Légendaire",
     "pt": "Lendário",
     "es": "Legendario",
     "tr": "Efsanevi",
     "id": "Legendary",
     "ru": "Легендарное",
     "th": "ตำนาน",
     "ar": "أسطوري"
    }
   },
   "steps": [
    {
     "q": "g",
     "st": 0,
     "score": 1125,
     "c": [
      1500,
      15,
      0
     ]
    },
    {
     "q": "g",
     "st": 1,
     "score": 1875,
     "c": [
      3800,
      40,
      0
     ]
    },
    {
     "q": "b",
     "st": 0,
     "score": 3000,
     "c": [
      7000,
      70,
      0
     ]
    },
    {
     "q": "b",
     "st": 1,
     "score": 4500,
     "c": [
      9700,
      95,
      0
     ]
    },
    {
     "q": "b",
     "st": 2,
     "score": 5100,
     "c": [
      1000,
      10,
      45
     ]
    },
    {
     "q": "b",
     "st": 3,
     "score": 5440,
     "c": [
      1000,
      10,
      50
     ]
    },
    {
     "q": "p",
     "st": 0,
     "score": 3230,
     "c": [
      1500,
      15,
      60
     ]
    },
    {
     "q": "p",
     "st": 1,
     "score": 3230,
     "c": [
      1500,
      15,
      70
     ]
    },
    {
     "q": "p",
     "st": 2,
     "score": 3225,
     "c": [
      6500,
      65,
      40
     ]
    },
    {
     "q": "p",
     "st": 3,
     "score": 3225,
     "c": [
      8000,
      80,
      50
     ]
    },
    {
     "q": "p1",
     "st": 0,
     "score": 3440,
     "c": [
      10000,
      95,
      60
     ]
    },
    {
     "q": "p1",
     "st": 1,
     "score": 3440,
     "c": [
      11000,
      110,
      70
     ]
    },
    {
     "q": "p1",
     "st": 2,
     "score": 4085,
     "c": [
      13000,
      130,
      85
     ]
    },
    {
     "q": "p1",
     "st": 3,
     "score": 4085,
     "c": [
      15000,
      160,
      100
     ]
    },
    {
     "q": "y",
     "st": 0,
     "score": 6250,
     "c": [
      22000,
      220,
      40
     ]
    },
    {
     "q": "y",
     "st": 1,
     "score": 6250,
     "c": [
      23000,
      230,
      40
     ]
    },
    {
     "q": "y",
     "st": 2,
     "score": 6250,
     "c": [
      25000,
      250,
      45
     ]
    },
    {
     "q": "y",
     "st": 3,
     "score": 6250,
     "c": [
      26000,
      260,
      45
     ]
    }
   ]
  }
 }
};
