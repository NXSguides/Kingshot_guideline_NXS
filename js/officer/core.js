/* NXS officer page — shared core: language, Discord login / password gate, tabs, script loader.
   Each tab lives in js/officer/<tab>.js (one IIFE each, loaded in order by officer-x7k2p9.html) and registers itself:
     OFFICER_PAGES.<tab> = { init(), onShow()?, applyTexts(), setLang(l) }
   What a tab may use from here:
     OFFICER.lang / OFFICER.user (Discord) / OFFICER.token (GitHub key) / OFFICER.pw   — set by officerGate() before init()
     OFFICER.gh(method, path, body, token?)   GitHub contents API (one copy for every tab)
     OFFICER.repo { owner, name, branch }     OFFICER.util { esc, b64ToUtf8, utf8ToB64 }
     OFFICER.can(tab, "view" | "edit")        permissions hook (always true until the 👥 officer table exists)
     LOCALE(l) / HTML_LANG(l) / ptOf(en) / localTimes(html, lang) / loadScripts([...]) / AUTH_API / DISCORD_LS */
/* ---- Times written as "08:00 UTC" / "UTC 08:00" (also ranges like 12:00–22:00 UTC) get the reader's own
   local time added after them, from the browser's time zone — e.g. "08:00 UTC (16:00 local)".
   Nothing is added when the reader is already on UTC. ---- */
const LT_LABEL = { en:"local", zh:"當地", ko:"현지", de:"Ortszeit", fr:"heure locale", pt:"local", es:"local", tr:"yerel", id:"lokal", ru:"местное", th:"ท้องถิ่น", ar:"محلي" };
function localTimes(html, lang) {
  const off = -new Date().getTimezoneOffset();          // minutes east of UTC
  if (!off) return html;
  const conv = (hm) => {
    const [h, m] = hm.split(":").map(Number);
    let t = h * 60 + m + off, day = 0;
    if (t < 0) { t += 1440; day = -1; } else if (t >= 1440) { t -= 1440; day = 1; }
    return String(Math.floor(t / 60)).padStart(2, "0") + ":" + String(t % 60).padStart(2, "0") + (day ? (day > 0 ? "⁺¹" : "⁻¹") : "");
  };
  const label = LT_LABEL[lang] || LT_LABEL.en;
  // one time, a range (12:00–22:00) or a list (11:00 & 22:00 / 11:00 和 22:00) next to the word UTC
  const T = "\\d{1,2}:\\d{2}", SEP = "\\s*(?:[–\\-,/]|&amp;|&|和|and)\\s*";
  const G = `${T}(?:${SEP}${T})*`;
  const tag = (g) => ` <span class="lt">(${g.replace(/\d{1,2}:\d{2}/g, conv)} ${label})</span>`;
  return html
    .replace(new RegExp(`(${G})\\s*UTC(?![\\w+-])`, "g"), (m, g) => m + tag(g))
    .replace(new RegExp(`UTC\\s*(${G})(?!\\s*<span class="lt")`, "g"), (m, g) => m + tag(g));
}
/* ===== shared: language, password, tabs (the four pages below register themselves in OFFICER_PAGES) ===== */
const OFFICER_LANG = "nxs-officer-lang", OFFICER_LS = "nxs-post-v1";
const OFFICER_LANGS = ["zh", "en", "pt", "ar", "ko"];   // officer page languages (R4/R5 languages)
const officerLang = () => { try { const v = localStorage.getItem(OFFICER_LANG); return OFFICER_LANGS.includes(v) ? v : null; } catch (e) { return null; } };
const setOfficerLang = (v) => { try { localStorage.setItem(OFFICER_LANG, v); } catch (e) {} };
/* first visit: the language chosen on the main site (ks-lang), else the phone's language; a language this page doesn't have → English */
const siteLang = () => { try { return localStorage.getItem("ks-lang"); } catch (e) { return null; } };
const OFFICER = { lang: officerLang() || (OFFICER_LANGS.includes(siteLang()) ? siteLang() : null) || OFFICER_LANGS.find((l) => (navigator.language || "").startsWith(l)) || "en", token: null, pw: null };
/* Dates and <html lang> per language; BY_EN = Portuguese / Arabic for the built-in English texts (event names, default to-dos…) — shown only, never saved */
const LOCALE = (l) => ({ zh: "zh-TW", pt: "pt-BR", ar: "ar-u-nu-latn", ko: "ko-KR" })[l] || "en-GB";   // Arabic with 0-9 digits, like the game
const HTML_LANG = (l) => ({ zh: "zh-Hant", pt: "pt-BR", ar: "ar", ko: "ko" })[l] || "en";
/* Arabic reads right to left: the whole page flips (set whenever <html lang> changes) */
new MutationObserver(() => { const rtl = (document.documentElement.lang || "").startsWith("ar"); if (document.documentElement.dir !== (rtl ? "rtl" : "ltr")) document.documentElement.dir = rtl ? "rtl" : "ltr"; })
  .observe(document.documentElement, { attributes: true, attributeFilter: ["lang"] });
const BY_EN = { ko: {"Bear Hunt": "자이언트 베어 사냥", "13:00 & 22:00 UTC, 30 min each": "13:00 & 22:00 UTC, 각 30분", "Alliance Championship": "연맹 챔피언십", "Weekly, Monday reset · shown = 2-day registration; battles run automatically": "매주, 월요일 초기화 · 표시 = 2일간 신청 기간; 전투는 자동 진행", "Remind everyone: register in the Middle Lane, strongest heroes, 50/20/30, buffs on.": "모두에게 알림: 중앙 라인에 등록, 가장 강한 영웅, 50/20/30, 버프 켜기.", "Alliance Mobilization": "연맹 총동원", "Follows the 4-week cycle (after KvK / after Strongest Governor; Alliance Brawl can replace one) — check the start date": "4주 주기를 따름 (KvK 이후 / 지고의 영주 이후; 연맹 결투로 대체될 수 있음) — 시작일 확인", "Post the mission rules (no KvK Prep items; best picks).": "임무 규칙 공지 (KvK 준비 아이템 금지; 최적 선택).", "Mystic Trial": "신비한 시련", "Alliance rules": "연맹 규칙", "KvK": "KvK", "Viking Vengeance": "바이킹의 약탈", "Swordland Showdown": "성검 쟁탈", "Tri-Alliance Clash": "삼대 연맹전", "Eternity's Reach": "사라진 유적", "All Out": "전군 출격", "Fishing Tournament": "낚시 선수권 대회", "Hero Roulette": "영웅 룰렛", "Cesares Fury": "체사레 정벌", "Sanctuary Battle": "유적 쟁탈", "Alliance Brawl": "연맹 결투", "Mon 00:00 – Sun 12:00 UTC · be in the alliance at Sun 23:00 UTC the day before (matching) to count": "월 00:00 – 일 12:00 UTC · 집계되려면 전날 일요일 23:00 UTC(매칭) 시점에 연맹에 있어야 함", "Merchant Empire": "무역 부흥", "Escort 2 caravans at a time · last 4 h (until Sun 04:00 UTC) raiding only": "한 번에 마차 2대 호위 · 마지막 4시간(일 04:00 UTC까지)은 약탈만 가능", "Call of the Sovereign": "궐기의 호각", "Max rewards: 90 Gold Keys (30/day) + 30 Platinum Keys (10/day) over the 3 days · resets 00:00 UTC": "최대 보상: 3일간 황금 열쇠 90개(하루 30개) + 백은 열쇠 30개(하루 10개) · 00:00 UTC 초기화", "R4/R5 start Viking Vengeance: pick a time that suits members and announce it beforehand (UTC), so everyone can return troops, prepare reinforcements and stay online for the important waves.": "R4/R5가 바이킹의 약탈을 시작합니다: 연맹원에게 맞는 시간을 정해 미리 (UTC로) 공지해서, 모두가 부대를 귀환시키고 증원을 준비하고 중요한 웨이브에 접속해 있을 수 있게 하세요.", "Start Viking Vengeance in game at the announced time.": "공지한 시간에 게임에서 바이킹의 약탈을 시작하세요.", "Voting phase: set up an alliance poll to confirm 100% attendance for the fixed time windows.": "투표 단계: 연맹 투표를 만들어 정해진 시간대에 100% 참석 가능한지 확인하세요.", "Registration phase: based on the voting, assign each confirmed member to a Legion.": "신청 단계: 투표 결과를 바탕으로 확정된 연맹원을 각 군단에 배정하세요.", "Reminder: ask everyone to check their assigned Legion and time and confirm 100% attendance — it affects matchmaking and roles.": "알림: 모두 배정된 군단과 시간을 확인하고 100% 참석을 확정하도록 요청하세요 — 매칭과 역할에 영향을 줍니다.", "Planning phase: assign roles (Attacker, Defender, Joiner) to Legion 1 and Legion 2.": "계획 단계: 군단 1과 군단 2에 역할(공격 측, 방어 측, 집결 참여)을 배정하세요.", "Voting phase: set up an alliance poll to find out who can 100% attend.": "투표 단계: 연맹 투표를 만들어 100% 참석 가능한 사람을 파악하세요.", "Sign-up phase: split confirmed players into Legion 1 and Legion 2 (separate time slots) so both have enough reliable players — don't put every strong account in one group.": "신청 단계: 확정된 플레이어를 군단 1과 군단 2(서로 다른 시간대)로 나눠 양쪽 모두 믿을 만한 인원이 충분하도록 하세요 — 강한 계정을 한 그룹에 몰지 마세요.", "Planning phase: assign roles to Legion 1 and Legion 2 and post the plan.": "계획 단계: 군단 1과 군단 2에 역할을 배정하고 계획을 공지하세요.", "Remind everyone: each member gets 5 rally requests — use them, unused ones are lost when the event ends.": "모두에게 알림: 연맹원마다 집결 요청 5회가 주어집니다 — 꼭 사용하세요, 쓰지 않은 횟수는 이벤트 종료 시 사라집니다.", "R4+: once enough members have beaten high-level targets, apply to challenge the Captain and post a time for everyone to join.": "R4+: 충분한 연맹원이 고레벨 목표를 처치하면 보스 도전을 신청하고 모두 참여할 시간을 공지하세요.", "R4+: register if we meet the requirements — 1 Sanctuary + 1 Fortress, 3 time slots (the slot most alliances pick wins). Pick targets we can realistically take and hold (competition, location, our strength), not just the most prestigious. Sanctuaries we held last week are signed up automatically.": "R4+: 조건을 충족하면 신청하세요 — 유적 1곳 + 성채 1곳, 시간대 3개(가장 많은 연맹이 고른 시간대로 결정). 가장 명예로운 곳보다 실제로 차지하고 지킬 수 있는 목표(경쟁, 위치, 우리 전력)를 고르세요. 지난주 보유한 유적은 자동으로 신청됩니다.", "Contest day: post the rally message about 1.5 h before the slot (exact 70,080 troops, rally from home, no solo attacks). Once a building is taken, post the defence swap (Howard/Gordon 60:20:20).": "쟁탈일: 시간대 약 1.5시간 전에 집결 안내를 공지하세요 (정확히 70,080 병력, 성에서 집결, 단독 공격 금지). 건물을 차지하면 방어 교대 안내를 공지하세요 (하워드/고든 60:20:20).", "Remind everyone: 30-minute solo event. Skill picks Right / Right / Left / Left / Right; send one march into a Copper Vein every minute.": "모두에게 알림: 30분 개인 이벤트. 스킬 선택 오른쪽 / 오른쪽 / 왼쪽 / 왼쪽 / 오른쪽; 1분마다 부대 하나를 청동 광맥에 보내세요.", "Post the All Out rules (NAP alliances, no attacks on castles or alliance buildings) and the secured gathering node rotation.": "전군 출격 규칙(NAP 연맹, 성과 연맹 건물 공격 금지)과 연맹 안전 채집 포인트 순번을 공지하세요.", "Remind everyone to SAVE Gold & Platinum Keys (90 Gold + 30 Platinum for max rewards) — copy the in-game message.": "모두에게 황금 열쇠와 백은 열쇠를 아껴 두라고 알리세요 (최대 보상은 황금 열쇠 90개 + 백은 열쇠 30개) — 게임 내 메시지를 복사하세요.", "Remind everyone: use Ocean Prospector first to upgrade the Fishing Kit, then switch to Regular Fishing.": "모두에게 알림: 먼저 보물 낚시로 낚시 도구를 업그레이드한 뒤 일반 낚시로 바꾸세요.", "Remind everyone: 1 free spin a day; milestone rewards at 5 / 15 / 35 / 70 / 120 spins. Spins on KvK Prep Day 2–3 also score KvK points.": "모두에게 알림: 하루 1회 무료 스핀; 5 / 15 / 35 / 70 / 120회 스핀 시 이정표 보상. KvK 준비 2–3일차 스핀은 KvK 포인트도 얻습니다.", "Remind members: book Chief Minister slots, save Intel Missions, count saved items (the site's KvK checklist pops up).": "연맹원에게 알림: 총리대신 슬롯 예약, 정보 이벤트 아껴 두기, 모아 둔 아이템 세기 (사이트의 KvK 체크리스트가 뜹니다).", "Castle Battle on the last day: agree rally leaders and times.": "마지막 날 캐슬 전투: 집결 대장과 시간을 정하세요.", "Post the mission rules (no KvK Prep items; best picks). R4+: refresh shared missions — remove poor ones so members aren't left with tasks they avoid.": "임무 규칙 공지 (KvK 준비 아이템 금지; 최적 선택). R4+: 공유 임무 새로고침 — 나쁜 임무를 지워 연맹원이 피하는 임무만 남지 않도록 하세요.", "KvK Prep & Battle Guide": "KvK 준비 & 전투 가이드", "Formations & Rally Tips": "부대 편성 & 집결 팁", "Gen 3 Master Academy Guide": "제3세대 거장 아카데미 가이드", "Pets": "펫", "F2P Heroes Guide": "F2P 영웅 가이드", "Hero Cards (Gen 1–3)": "영웅 카드 (제1–3세대)", "General Tips": "일반 팁", "Attackers": "공격 측", "Defenders": "방어 측", "Joiners": "집결 참여", "Home (language picker)": "홈 (언어 선택)", "KvK Points Planner": "KvK 포인트 플래너", "Booking guide": "예약 가이드", "Squad guide": "부대 가이드", "KvK calculator": "KvK 계산기", "Bear Hunt (every Bear day)": "자이언트 베어 사냥 (베어 날마다)"},
  pt: {"Bear Hunt": "Caça ao Urso", "13:00 & 22:00 UTC, 30 min each": "13:00 & 22:00 UTC, 30 min cada", "Alliance Championship": "Campeonato da Aliança", "Weekly, Monday reset · shown = 2-day registration; battles run automatically": "Semanal, reinicia na segunda · mostra os 2 dias de inscrição; as batalhas são automáticas", "Remind everyone: register in the Middle Lane, strongest heroes, 50/20/30, buffs on.": "Lembre a todos: inscrever-se na pista do meio, heróis mais fortes, 50/20/30, bônus ativados.", "Alliance Mobilization": "Mobilização da Aliança", "Follows the 4-week cycle (after KvK / after Strongest Governor; Alliance Brawl can replace one) — check the start date": "Segue o ciclo de 4 semanas (depois do KvK / depois de O Governador mais Forte; a Briga da Aliança pode substituir uma) — confira a data de início", "Post the mission rules (no KvK Prep items; best picks).": "Publique as regras das missões (sem itens da Fase de Preparação do KvK; melhores escolhas).", "Mystic Trial": "Prova Mística", "Alliance rules": "Regras da aliança", "KvK": "KvK", "Viking Vengeance": "Vingança Viking", "Swordland Showdown": "Confronto entre Espadas", "Tri-Alliance Clash": "Confronto Tri-Aliança", "Eternity's Reach": "Alcance da Eternidade", "All Out": "Vai com Tudo", "Fishing Tournament": "Torneio de Pesca", "Hero Roulette": "Roleta do Herói", "Cesares Fury": "Fúria dos Césares", "Sanctuary Battle": "Batalha do Santuário", "Alliance Brawl": "Briga da Aliança", "Mon 00:00 – Sun 12:00 UTC · be in the alliance at Sun 23:00 UTC the day before (matching) to count": "Seg 00:00 – Dom 12:00 UTC · esteja na aliança no domingo anterior às 23:00 UTC (pareamento) para contar", "Merchant Empire": "Império Mercante", "Escort 2 caravans at a time · last 4 h (until Sun 04:00 UTC) raiding only": "Escolte até 2 caravanas por vez · nas últimas 4 h (até Dom 04:00 UTC) só saque", "Call of the Sovereign": "Chamado do Soberano", "Max rewards: 90 Gold Keys (30/day) + 30 Platinum Keys (10/day) over the 3 days · resets 00:00 UTC": "Recompensa máxima: Chave Dourada ×90 (30/dia) + Chave de Platina ×30 (10/dia) nos 3 dias · reinicia 00:00 UTC", "R4/R5 start Viking Vengeance: pick a time that suits members and announce it beforehand (UTC), so everyone can return troops, prepare reinforcements and stay online for the important waves.": "R4/R5 iniciam a Vingança Viking: escolham um horário bom para os membros e anunciem antes (em UTC), para todos recolherem as tropas, prepararem reforços e ficarem online nas ondas importantes.", "Start Viking Vengeance in game at the announced time.": "Inicie a Vingança Viking no jogo no horário anunciado.", "Voting phase: set up an alliance poll to confirm 100% attendance for the fixed time windows.": "Fase de votação: crie uma enquete da aliança para confirmar 100% de presença nos horários fixos.", "Registration phase: based on the voting, assign each confirmed member to a Legion.": "Fase de inscrição: com base na votação, coloque cada membro confirmado numa Legião.", "Reminder: ask everyone to check their assigned Legion and time and confirm 100% attendance — it affects matchmaking and roles.": "Lembrete: peça a todos para conferir a Legião e o horário e confirmar 100% de presença — isso afeta o pareamento e as funções.", "Planning phase: assign roles (Attacker, Defender, Joiner) to Legion 1 and Legion 2.": "Fase de planejamento: defina as funções (Attacker, Defender, Joiner) da Legião 1 e da Legião 2.", "Voting phase: set up an alliance poll to find out who can 100% attend.": "Fase de votação: crie uma enquete da aliança para saber quem pode participar com 100% de certeza.", "Sign-up phase: split confirmed players into Legion 1 and Legion 2 (separate time slots) so both have enough reliable players — don't put every strong account in one group.": "Fase de inscrição: divida os confirmados entre Legião 1 e Legião 2 (horários diferentes) para que as duas tenham gente confiável — não coloque todas as contas fortes no mesmo grupo.", "Planning phase: assign roles to Legion 1 and Legion 2 and post the plan.": "Fase de planejamento: defina as funções da Legião 1 e da Legião 2 e publique o plano.", "Remind everyone: each member gets 5 rally requests — use them, unused ones are lost when the event ends.": "Lembre a todos: cada membro tem 5 pedidos de rally — usem, os que sobrarem somem quando o evento acaba.", "R4+: once enough members have beaten high-level targets, apply to challenge the Captain and post a time for everyone to join.": "R4+: quando membros suficientes vencerem alvos de nível alto, peçam para desafiar o Capitão e publiquem um horário para todos participarem.", "R4+: register if we meet the requirements — 1 Sanctuary + 1 Fortress, 3 time slots (the slot most alliances pick wins). Pick targets we can realistically take and hold (competition, location, our strength), not just the most prestigious. Sanctuaries we held last week are signed up automatically.": "R4+: inscrevam-se se cumprirmos os requisitos — 1 Santuário + 1 Fortaleza, 3 horários (vale o horário que mais alianças escolherem). Escolham alvos que realmente conseguimos tomar e manter (concorrência, localização, nossa força), não só os mais famosos. Santuários que tínhamos na semana passada são inscritos automaticamente.", "Contest day: post the rally message about 1.5 h before the slot (exact 70,080 troops, rally from home, no solo attacks). Once a building is taken, post the defence swap (Howard/Gordon 60:20:20).": "Dia da disputa: publique a mensagem de rally cerca de 1,5 h antes do horário (exatamente 70.080 tropas, rally de casa, sem ataques solo). Depois de tomar um prédio, publique a troca de defesa (Howard/Gordon 60:20:20).", "Remind everyone: 30-minute solo event. Skill picks Right / Right / Left / Left / Right; send one march into a Copper Vein every minute.": "Lembre a todos: evento individual de 30 minutos. Habilidades: Direita / Direita / Esquerda / Esquerda / Direita; mande uma marcha para um veio de cobre a cada minuto.", "Post the All Out rules (NAP alliances, no attacks on castles or alliance buildings) and the secured gathering node rotation.": "Publique as regras do Vai com Tudo (alianças NAP, sem ataques a castelos ou prédios da aliança) e o rodízio dos pontos de coleta seguros.", "Remind everyone to SAVE Gold & Platinum Keys (90 Gold + 30 Platinum for max rewards) — copy the in-game message.": "Lembre a todos de GUARDAR Chave Dourada e Chave de Platina (Dourada ×90 + Platina ×30 para a recompensa máxima) — copie a mensagem do jogo.", "Remind everyone: use Ocean Prospector first to upgrade the Fishing Kit, then switch to Regular Fishing.": "Lembre a todos: usem primeiro a Prospecção do Oceano para melhorar o Kit de Pesca e depois passem para a Pesca Normal.", "Remind everyone: 1 free spin a day; milestone rewards at 5 / 15 / 35 / 70 / 120 spins. Spins on KvK Prep Day 2–3 also score KvK points.": "Lembre a todos: 1 giro grátis por dia; recompensas de marco em 5 / 15 / 35 / 70 / 120 giros. Giros nos dias 2–3 da Fase de Preparação do KvK também dão pontos de KvK.", "Remind members: book Chief Minister slots, save Intel Missions, count saved items (the site's KvK checklist pops up).": "Lembre os membros: reservar horários de Primeiro-ministro, guardar Missões de Informação, contar os itens guardados (a checklist de KvK do site aparece).", "Castle Battle on the last day: agree rally leaders and times.": "Batalha do Castelo no último dia: combinem os líderes de rally e os horários.", "Post the mission rules (no KvK Prep items; best picks). R4+: refresh shared missions — remove poor ones so members aren't left with tasks they avoid.": "Publique as regras das missões (sem itens da Fase de Preparação do KvK; melhores escolhas). R4+: atualizem as missões compartilhadas — tirem as ruins para os membros não ficarem com tarefas que evitam.", "KvK Prep & Battle Guide": "Guia de Preparação e Batalha do KvK", "Formations & Rally Tips": "Formações e dicas de rally", "Gen 3 Master Academy Guide": "Guia da Academia dos Mestres (Ger. 3)", "Pets": "Pets", "F2P Heroes Guide": "Guia de heróis F2P", "Hero Cards (Gen 1–3)": "Cartas de heróis (Ger. 1–3)", "General Tips": "Dicas gerais", "Attackers": "Atacantes", "Defenders": "Defensores", "Joiners": "Joiners", "Home (language picker)": "Início (escolha de idioma)", "KvK Points Planner": "Planejador de pontos do KvK", "Booking guide": "Guia de reservas", "Squad guide": "Guia de esquadrões", "KvK calculator": "Calculadora de KvK", "Bear Hunt (every Bear day)": "Caça ao Urso (todo dia de Urso)"},
  ar: {"Bear Hunt": "صيد الدببة", "13:00 & 22:00 UTC, 30 min each": "13:00 و22:00 UTC، 30 دقيقة لكل منهما", "Alliance Championship": "بطولة التحالف", "Weekly, Monday reset · shown = 2-day registration; battles run automatically": "أسبوعيًا، إعادة الضبط يوم الإثنين · المعروض = التسجيل لمدة يومين؛ المعارك تجري تلقائيًا", "Remind everyone: register in the Middle Lane, strongest heroes, 50/20/30, buffs on.": "ذكّر الجميع: التسجيل في المسار الأوسط، أقوى الأبطال، 50/20/30، وتفعيل المعززات.", "Alliance Mobilization": "تعبئة التحالف", "Follows the 4-week cycle (after KvK / after Strongest Governor; Alliance Brawl can replace one) — check the start date": "تتبع دورة الـ 4 أسابيع (بعد KvK / بعد الحاكم الأقوى؛ وقد يحل عراك التحالفات محل إحداها) — تحقق من تاريخ البدء", "Post the mission rules (no KvK Prep items; best picks).": "انشر قواعد المهام (بدون عناصر تحضير KvK؛ أفضل الاختيارات).", "Mystic Trial": "الاختبارات الغامضة", "Alliance rules": "قواعد التحالف", "KvK": "KvK", "Viking Vengeance": "انتقام الفايكنغ", "Swordland Showdown": "مواجهة أرض السيوف", "Tri-Alliance Clash": "صراع التحالف الثلاثي", "Eternity's Reach": "وصول الأبدية", "All Out": "جميع القوات تهاجم", "Fishing Tournament": "مسابقة الصيد", "Hero Roulette": "روليت البطل", "Cesares Fury": "غضب سيزاريس", "Sanctuary Battle": "معركة المأوى", "Alliance Brawl": "عراك التحالفات", "Mon 00:00 – Sun 12:00 UTC · be in the alliance at Sun 23:00 UTC the day before (matching) to count": "الإثنين 00:00 – الأحد 12:00 UTC · كن في التحالف يوم الأحد 23:00 UTC في اليوم السابق (البحث عن الخصم) لكي تُحتسب", "Merchant Empire": "إمبراطورية التجارة", "Escort 2 caravans at a time · last 4 h (until Sun 04:00 UTC) raiding only": "رافق قافلتين في المرة الواحدة · آخر 4 ساعات (حتى الأحد 04:00 UTC) للغارات فقط", "Call of the Sovereign": "نداء السيادة", "Max rewards: 90 Gold Keys (30/day) + 30 Platinum Keys (10/day) over the 3 days · resets 00:00 UTC": "أقصى المكافآت: المفتاح الذهبي ×90 (30/يوم) + المفتاح البلاتيني ×30 (10/يوم) خلال الأيام الثلاثة · إعادة الضبط 00:00 UTC", "R4/R5 start Viking Vengeance: pick a time that suits members and announce it beforehand (UTC), so everyone can return troops, prepare reinforcements and stay online for the important waves.": "يبدأ R4/R5 انتقام الفايكنغ: اختاروا وقتًا يناسب الأعضاء وأعلنوه مسبقًا (UTC)، ليتمكن الجميع من إعادة القوات وتجهيز التعزيزات والبقاء متصلين في الموجات المهمة.", "Start Viking Vengeance in game at the announced time.": "ابدأ انتقام الفايكنغ في اللعبة في الوقت المُعلن.", "Voting phase: set up an alliance poll to confirm 100% attendance for the fixed time windows.": "مرحلة التصويت: أنشئ استطلاعًا في التحالف لتأكيد الحضور 100% في الفترات الزمنية المحددة.", "Registration phase: based on the voting, assign each confirmed member to a Legion.": "مرحلة التسجيل: بناءً على التصويت، عيّن كل عضو مؤكَّد في كتيبة.", "Reminder: ask everyone to check their assigned Legion and time and confirm 100% attendance — it affects matchmaking and roles.": "تذكير: اطلب من الجميع التحقق من الكتيبة والوقت المخصصين لهم وتأكيد الحضور 100% — فذلك يؤثر على البحث عن الخصم والأدوار.", "Planning phase: assign roles (Attacker, Defender, Joiner) to Legion 1 and Legion 2.": "مرحلة التخطيط: وزّع الأدوار (المهاجم، المدافع، المنضم) على الكتيبة 1 والكتيبة 2.", "Voting phase: set up an alliance poll to find out who can 100% attend.": "مرحلة التصويت: أنشئ استطلاعًا في التحالف لمعرفة من يمكنه الحضور 100%.", "Sign-up phase: split confirmed players into Legion 1 and Legion 2 (separate time slots) so both have enough reliable players — don't put every strong account in one group.": "مرحلة الاشتراك: قسّم اللاعبين المؤكَّدين بين الكتيبة 1 والكتيبة 2 (فترات زمنية منفصلة) ليكون في كلتيهما عدد كافٍ من اللاعبين الموثوقين — لا تضع كل الحسابات القوية في مجموعة واحدة.", "Planning phase: assign roles to Legion 1 and Legion 2 and post the plan.": "مرحلة التخطيط: وزّع الأدوار على الكتيبة 1 والكتيبة 2 وانشر الخطة.", "Remind everyone: each member gets 5 rally requests — use them, unused ones are lost when the event ends.": "ذكّر الجميع: لكل عضو 5 طلبات حشد — استخدموها، فغير المستخدمة تضيع عند انتهاء الفعالية.", "R4+: once enough members have beaten high-level targets, apply to challenge the Captain and post a time for everyone to join.": "R4+: عندما يهزم عدد كافٍ من الأعضاء أهدافًا عالية المستوى، قدّم طلب تحدي الكابتن وانشر وقتًا لينضم الجميع.", "R4+: register if we meet the requirements — 1 Sanctuary + 1 Fortress, 3 time slots (the slot most alliances pick wins). Pick targets we can realistically take and hold (competition, location, our strength), not just the most prestigious. Sanctuaries we held last week are signed up automatically.": "R4+: سجّل إذا استوفينا الشروط — مأوى واحد + حصن واحد، 3 فترات زمنية (تفوز الفترة التي تختارها أغلب التحالفات). اختر أهدافًا يمكننا واقعيًا أخذها والاحتفاظ بها (المنافسة، الموقع، قوتنا)، لا الأكثر هيبة فقط. المآوي التي امتلكناها الأسبوع الماضي تُسجَّل تلقائيًا.", "Contest day: post the rally message about 1.5 h before the slot (exact 70,080 troops, rally from home, no solo attacks). Once a building is taken, post the defence swap (Howard/Gordon 60:20:20).": "يوم المنافسة: انشر رسالة الحشد قبل الفترة بحوالي 1.5 ساعة (70,080 جندي بالضبط، الحشد من المدينة، بلا هجمات فردية). بعد الاستيلاء على مبنى، انشر تبديل الدفاع (Howard/Gordon 60:20:20).", "Remind everyone: 30-minute solo event. Skill picks Right / Right / Left / Left / Right; send one march into a Copper Vein every minute.": "ذكّر الجميع: فعالية فردية مدتها 30 دقيقة. اختيارات المهارات: يمين / يمين / يسار / يسار / يمين؛ أرسل زحفًا واحدًا إلى عرق النحاس كل دقيقة.", "Post the All Out rules (NAP alliances, no attacks on castles or alliance buildings) and the secured gathering node rotation.": "انشر قواعد جميع القوات تهاجم (تحالفات عدم الاعتداء NAP، بلا هجمات على المدن أو مباني التحالف) وجدول تناوب نقاط الجمع المؤمَّنة.", "Remind everyone to SAVE Gold & Platinum Keys (90 Gold + 30 Platinum for max rewards) — copy the in-game message.": "ذكّر الجميع بادخار المفتاح الذهبي والمفتاح البلاتيني (الذهبي ×90 + البلاتيني ×30 لأقصى المكافآت) — انسخ الرسالة من اللعبة.", "Remind everyone: use Ocean Prospector first to upgrade the Fishing Kit, then switch to Regular Fishing.": "ذكّر الجميع: استخدموا مستكشف المحيط أولًا لترقية أدوات الصيد، ثم انتقلوا إلى الصيد العادي.", "Remind everyone: 1 free spin a day; milestone rewards at 5 / 15 / 35 / 70 / 120 spins. Spins on KvK Prep Day 2–3 also score KvK points.": "ذكّر الجميع: دورة مجانية واحدة يوميًا؛ مكافآت الإنجاز عند 5 / 15 / 35 / 70 / 120 دورة. الدورات في اليوم 2–3 من تحضير KvK تمنح أيضًا نقاط KvK.", "Remind members: book Chief Minister slots, save Intel Missions, count saved items (the site's KvK checklist pops up).": "ذكّر الأعضاء: احجزوا مواعيد رئيس الوزراء، وادخروا مهام المعلومات، واحسبوا العناصر المدخرة (تظهر قائمة KvK في الموقع).", "Castle Battle on the last day: agree rally leaders and times.": "معركة القلعة في اليوم الأخير: اتفقوا على قادة الحشد والأوقات.", "Post the mission rules (no KvK Prep items; best picks). R4+: refresh shared missions — remove poor ones so members aren't left with tasks they avoid.": "انشر قواعد المهام (بدون عناصر تحضير KvK؛ أفضل الاختيارات). R4+: حدّث المهام العامة — أزل الضعيفة حتى لا تبقى للأعضاء مهام يتجنبونها.", "KvK Prep & Battle Guide": "دليل تحضير ومعركة KvK", "Formations & Rally Tips": "نصائح التشكيلات والحشد", "Gen 3 Master Academy Guide": "دليل أكاديمية المتخصصين للجيل 3", "Pets": "الحيوانات الأليفة", "F2P Heroes Guide": "دليل أبطال F2P", "Hero Cards (Gen 1–3)": "بطاقات الأبطال (الجيل 1–3)", "General Tips": "نصائح عامة", "Attackers": "المهاجمون", "Defenders": "المدافعون", "Joiners": "المنضمون", "Home (language picker)": "الرئيسية (اختيار اللغة)", "KvK Points Planner": "مخطط نقاط KvK", "Booking guide": "دليل الحجز", "Squad guide": "دليل الفرق", "KvK calculator": "حاسبة KvK", "Bear Hunt (every Bear day)": "صيد الدببة (كل يوم دببة)"} };
const PT_BY_EN = BY_EN.pt;   // older name
/* built-in English text (event names, notes, default to-dos…) in the page language — shown only, never saved */
const ptOf = (en) => (en && BY_EN[OFFICER.lang] && BY_EN[OFFICER.lang][en]) || en;
const trEn = ptOf;
/* ---- shared by every tab (one copy instead of one per tab) ---- */
OFFICER.repo = {                                   // where saves go (same repo the page is served from; local dev → the real one)
  owner: location.hostname.endsWith("github.io") ? location.hostname.split(".")[0] : "NXSguides",
  name: location.hostname.endsWith("github.io") ? (location.pathname.split("/")[1] || "Kingshot_guideline_NXS") : "Kingshot_guideline_NXS",
  branch: "main",
};
/* GitHub contents API with the officers' key. Errors: "auth" (key rejected), "busy" (someone saved first → re-read and retry), "net". GET 404 → null. */
OFFICER.gh = async (method, path, body, token = OFFICER.token) => {
  const { owner, name, branch } = OFFICER.repo;
  let res;
  try {
    res = await fetch(`https://api.github.com/repos/${owner}/${name}/contents/${path}${method === "GET" ? "?ref=" + branch + "&t=" + Date.now() : ""}`, {
      method, headers: { Authorization: `Bearer ${token}`, Accept: "application/vnd.github+json" }, body: body ? JSON.stringify(body) : undefined, cache: "no-store" });
  } catch (e) { throw new Error("net"); }
  if (res.status === 401 || res.status === 403) throw new Error("auth");
  if (res.status === 409 || res.status === 422) throw new Error("busy");
  if (method === "GET" && res.status === 404) return null;
  if (!res.ok) throw new Error("net");
  return res.json();
};
/* Squad Power (the number on the Swordland "Legion" screens), checked against MightPulse for all 98 members on 2026-10-14:
   the game's Migrant Score is almost exactly Squad Power × 317 → SP ≈ 0.00309 · migrant + 10 (mean error 1.7%, 20/20 of the top 20).
   Without a Migrant Score: fit on power / Mystic Trial / TC (SP ≈ 2.70·power(M) + 0.499·Mystic + 8.7·TC − 296, mean error 6.5%).
   Used by 📊 Ranking and 🔭 Scout. Refit from new Legion screenshots now and then. */
OFFICER.SP_FIT = { migrant: 0.00309, migrantC: 10, power: 2.70, mystic: 0.499, tc: 8.7, c: -296 };
OFFICER.migrantOf = (m) => m.migrant ?? (m.raw && m.raw.ranks && m.raw.ranks.migrant_score) ?? 0;
OFFICER.squadPower = (m) => { const F = OFFICER.SP_FIT, mg = OFFICER.migrantOf(m); return mg > 0 ? F.migrant * mg + F.migrantC : Math.max(0, F.power * (m.power || 0) / 1e6 + F.mystic * (m.mystic || 0) + F.tc * (m.tc || 0) + F.c); };
OFFICER.spIsFallback = (m) => !(OFFICER.migrantOf(m) > 0);
OFFICER.util = {
  esc: (s) => String(s ?? "").replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c])),
  b64ToUtf8: (b64) => new TextDecoder().decode(Uint8Array.from(atob(b64.replace(/\s/g, "")), (c) => c.charCodeAt(0))),
  utf8ToB64: (str) => { const u = new TextEncoder().encode(str); let s = ""; for (let i = 0; i < u.length; i += 0x8000) s += String.fromCharCode(...u.subarray(i, i + 0x8000)); return btoa(s); },
};
/* 👥 permissions — FIRST VERSION: the officer table is kept on this device (localStorage) so the 👥 tab and its effect
   can be tried. Final goal: the Worker keeps this table next to the Discord login and checks it on every save; then
   loadPerms/savePerms talk to the Worker and nothing else here changes.
   Rights per tab: "edit" | "view" | "none". Admins (ADMINS) always have everything and are the only ones who see 👥.
   Someone who unlocked with the password only (no Discord) is not in the table → everything, as before. */
/* 🔄 Update roster now — ONE request shared by 🕵️ Watch and 🚚 Move (both read data/roster-x7k2p9.json): the button writes
   data/roster-request.json, which starts the same GitHub job as the daily roster update (.github/workflows/update-roster.yml).
   Every open page with the button waits for the new roster file and hands it to the page (onNew). */
const RN_T = {"en": {"btn": "🔄 Update roster now", "tip": "Fetches every member from MightPulse again (power, Mystic Trial, castle X:Y…) — the same job as the daily update at 20:13 UTC. Takes about 5 minutes; the page updates by itself.", "req": "⏳ Requested {t} — about 5 minutes; the page updates by itself.", "done": "✅ Roster updated {t}", "recent": "The roster was updated {m} min ago — wait a little before asking again.", "at": "Roster: {t}", "noKey": "Needs the officers' GitHub key (ask Sherry).", "err": "Couldn't send the request — try again."}, "zh": {"btn": "🔄 立即更新名單", "tip": "重新從 MightPulse 抓全部成員（戰力、神秘試煉、城堡座標⋯）——跟每天 20:13 UTC 的自動更新是同一個工作。大約 5 分鐘，頁面會自己更新。", "req": "⏳ 已在 {t} 送出更新，大約 5 分鐘，頁面會自己更新。", "done": "✅ 名單已更新 {t}", "recent": "名單 {m} 分鐘前才更新過，等一下再按。", "at": "名單：{t}", "noKey": "需要幹部的 GitHub 金鑰（問 Sherry）。", "err": "送不出去，再試一次。"}, "pt": {"btn": "🔄 Atualizar o roster agora", "tip": "Busca todos os membros de novo no MightPulse (poder, Mystic Trial, X:Y do castelo…) — o mesmo trabalho da atualização diária às 20:13 UTC. Leva uns 5 minutos; a página se atualiza sozinha.", "req": "⏳ Pedido em {t} — uns 5 minutos; a página se atualiza sozinha.", "done": "✅ Roster atualizado {t}", "recent": "O roster foi atualizado há {m} min — espere um pouco antes de pedir de novo.", "at": "Roster: {t}", "noKey": "Precisa da chave do GitHub dos oficiais (fale com a Sherry).", "err": "Não deu para enviar o pedido — tente de novo."}, "ar": {"btn": "🔄 حدّث القائمة الآن", "tip": "يجلب كل الأعضاء من MightPulse من جديد (القوة، Mystic Trial، إحداثيات القلعة…) — نفس عمل التحديث اليومي 20:13 UTC. يستغرق نحو 5 دقائق وتتحدث الصفحة وحدها.", "req": "⏳ طُلب في {t} — نحو 5 دقائق، وتتحدث الصفحة وحدها.", "done": "✅ حُدّثت القائمة {t}", "recent": "حُدّثت القائمة قبل {m} دقيقة — انتظر قليلًا قبل الطلب مرة أخرى.", "at": "القائمة: {t}", "noKey": "يحتاج مفتاح GitHub الخاص بالضباط (اسأل Sherry).", "err": "تعذّر إرسال الطلب — حاول مرة أخرى."}, "ko": {"btn": "🔄 명단 지금 업데이트", "tip": "MightPulse에서 연맹원 전체를 다시 가져와요 (전투력, 신비한 시련, 성 X:Y…) — 매일 20:13 UTC 자동 업데이트와 같은 작업이에요. 약 5분 걸리고 페이지가 저절로 바뀌어요.", "req": "⏳ {t}에 요청함 — 약 5분, 페이지가 저절로 바뀌어요.", "done": "✅ 명단 업데이트됨 {t}", "recent": "명단이 {m}분 전에 업데이트됐어요 — 조금 기다렸다가 다시 요청하세요.", "at": "명단: {t}", "noKey": "간부 GitHub 키가 필요해요 (Sherry에게 물어보세요).", "err": "요청을 보내지 못했어요 — 다시 해 보세요."}};
OFFICER.rosterNow = (() => {
  const REQ = "data/roster-request.json", tr = (k, v = {}) => Object.entries(v).reduce((s, [a, b]) => s.replace("{" + a + "}", b), (RN_T[OFFICER.lang] || RN_T.en)[k] || RN_T.en[k]);
  const fmt = (iso) => { const d = new Date(iso); return isNaN(d) ? "" : d.toLocaleString(undefined, { month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit", hour12: false }); };
  let pending = 0, waiters = [], polling = false, last = "";
  async function poll() {
    if (polling) return; polling = true;
    for (let i = 0; i < 24 && pending; i++) {   // up to 12 minutes
      await new Promise((r) => setTimeout(r, 30000));
      let r = null; try { r = await OfficerData.fetchJson("data/roster-x7k2p9.json"); } catch (e) {}
      if (r && Date.parse(r.updated) > pending) { pending = 0; last = r.updated; waiters.forEach((w) => w.done(r)); }
    }
    pending = 0; polling = false; waiters.forEach((w) => w.paint());
  }
  async function ask(updated) {
    if (!OFFICER.token) return tr("noKey");
    const m = (Date.now() - Date.parse(updated || 0)) / 60000; if (m < 10) return tr("recent", { m: Math.max(0, Math.round(m)) });
    try {
      const f = await OFFICER.gh("GET", REQ);
      let prev = null; try { prev = f ? JSON.parse(decodeURIComponent(escape(atob(f.content.replace(/\s/g, ""))))) : null; } catch (e) {}
      if (prev && Date.now() - Date.parse(prev.at) < 10 * 60000) { pending = Date.parse(prev.at); poll(); return ""; }
      const at = new Date().toISOString();
      await OFFICER.gh("PUT", REQ, { message: "Roster update requested", content: btoa(JSON.stringify({ at }) + "\n"), sha: f ? f.sha : undefined, branch: OFFICER.repo.branch });
      pending = Date.parse(at); poll(); return "";
    } catch (e) { return tr("err"); }
  }
  /* html(): the button + status line; bind(root, () => roster.updated, onNew(newRoster)) */
  const html = (id) => `<span class="rn" id="${id}"><button type="button" class="btn small rn-btn" title="${tr("tip").replace(/"/g, "&quot;")}">${tr("btn")}</button> <span class="muted rn-msg" style="font-size:12.5px"></span></span>`;
  function bind(root, getUpdated, onNew) {
    if (!root) return;
    const b = root.querySelector(".rn-btn"), msg = root.querySelector(".rn-msg");
    const w = { root, paint: (txt) => { if (!root.isConnected) return; b.disabled = !!pending; msg.textContent = txt != null && txt !== "" ? txt : pending ? tr("req", { t: fmt(pending) }) : last ? tr("done", { t: fmt(last) }) : getUpdated() ? tr("at", { t: fmt(getUpdated()) }) : ""; },
      done: (r) => { try { onNew(r); } catch (e) {} w.paint(); } };
    waiters = waiters.filter((x) => x.root.isConnected && x.root !== root); waiters.push(w);
    b.onclick = async () => { b.disabled = true; const t = await ask(getUpdated()); w.paint(t); waiters.forEach((x) => x !== w && x.paint()); };
    w.paint();
  }
  return { html, bind };
})();
// clean names that picked up " · 📍" from 📍 position saves (2026-10-30 bug)
try { const v = localStorage.getItem("nxs-plan-by"); if (v && / · 📍/.test(v)) localStorage.setItem("nxs-plan-by", v.replace(/( · 📍)+/g, "")); } catch (e) {}
OFFICER.OWNER = "1547403844374368327";   // Sparrow: always admin, can't be demoted or removed (so nobody can lock everyone out)
OFFICER.ADMINS = [];                       // filled from the table (admin: true) by loadPerms
OFFICER.PERMS_TRIAL = false;   // 2026-10-16: the login system is live — the 👥 table decides   // the 👥 table is kept and editable, but not enforced yet (set false when the login system goes live)
OFFICER.PERM_TABS = ["events", "board", "map", "ranking", "attend", "post", "watch", "scout", "views", "move", "hunt", "attack"];   // 🚚 move: nobody by default (admins always)
OFFICER.VIEW_TABS = ["events", "board", "map"];
OFFICER.defaultPerms = () => Object.fromEntries(OFFICER.PERM_TABS.map((k) => [k, OFFICER.VIEW_TABS.includes(k) ? "view" : "none"]));   // new officer: Events, Board, Map — view only
OFFICER.ADMIN_IDS = ["1547403844374368327", "1240788094672834623", "762827904341246013"];   // Sparrow, R5, Nia: always admins (same list in the Worker)
const PERMS_LS = "nxs-perms-v1";
OFFICER.resetPerms = () => { OFFICER.perms = { v: 2, users: {
  "1547403844374368327": { name: "Sparrow", admin: true, perms: {} },
  "1240788094672834623": { name: "R5", admin: true, perms: {} },
  "762827904341246013": { name: "Nia", admin: true, perms: {} } } }; OFFICER.syncAdmins(); };
OFFICER.syncAdmins = () => { const u = OFFICER.perms.users; for (const id of OFFICER.ADMIN_IDS) if (u[id]) u[id].admin = true; OFFICER.ADMINS = Object.keys(u).filter((id) => u[id].admin); };
OFFICER.loadPerms = () => { try { const p = JSON.parse(localStorage.getItem(PERMS_LS)); if (p && p.users && p.v === 2) { OFFICER.perms = p; OFFICER.syncAdmins(); return; } } catch (e) {} OFFICER.resetPerms(); };
/* the table lives on the Worker (one copy for every device); the copy on this device only makes the page open at once */
const permsCache = () => { try { localStorage.setItem(PERMS_LS, JSON.stringify(OFFICER.perms)); } catch (e) {} };
OFFICER.permsState = "";   // "" | "saving" | "saved" | "error:<code>"
async function permsApi(op, extra) {
  let tok = null; try { tok = localStorage.getItem(DISCORD_LS); } catch (e) {}
  if (!tok) throw Object.assign(new Error("logged_out"), { code: "logged_out" });
  const r = await fetch(AUTH_API + "/perms", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ token: tok, op, ...extra }) });
  const j = await r.json().catch(() => ({ error: "network" }));
  if (j.token) { try { localStorage.setItem(DISCORD_LS, j.token); } catch (e) {} }
  if (!r.ok || j.error) throw Object.assign(new Error(j.error || "HTTP " + r.status), { code: j.error || "network" });
  return j;
}
const permsChanged = () => { OFFICER.applyPerms && OFFICER.applyPerms(); window.dispatchEvent(new Event("nxs-perms")); };
OFFICER.fetchPerms = async () => {
  try {
    const j = await permsApi("get");
    if (j.seen) OFFICER.seen = j.seen; if (j.avatars) OFFICER.avatars = j.avatars;   // 👥 last login per Discord ID (admins only)
    if (j.perms && j.perms.users) { OFFICER.perms = j.perms; OFFICER.syncAdmins(); permsCache(); permsChanged(); }
    else if (OFFICER.isAdmin()) OFFICER.savePerms();   // nothing on the server yet: the admin's table becomes the shared one
  } catch (e) {}
};
let permsTimer = null;
OFFICER.savePerms = () => {
  OFFICER.syncAdmins(); permsCache();
  OFFICER.permsState = "saving"; permsChanged();
  clearTimeout(permsTimer);
  permsTimer = setTimeout(async () => {
    try { const j = await permsApi("save", { perms: OFFICER.perms }); if (j.perms) { OFFICER.perms = j.perms; OFFICER.syncAdmins(); permsCache(); } OFFICER.permsState = "saved"; }
    catch (e) { OFFICER.permsState = "error:" + (e.code || e.message); if (e.code === "not_admin") { permsChanged(); return OFFICER.fetchPerms(); } }   // not allowed: show the real table again
    permsChanged();
  }, 600);
};
OFFICER.loadPerms();
OFFICER.previewAs = null;   // an admin can look at the page with another officer's rights (👥 tab → "Preview as")
/* the person using the page: Discord user, or (trial) someone who unlocked with the officer password — named by the author name on the Post tab */
OFFICER.me = () => OFFICER.user || (OFFICER.pw ? (() => { const n = (officerStore().author || "").trim() || "Officer"; return { id: "pw-" + (n.toLowerCase().replace(/[^\p{L}\p{N}]+/gu, "-").replace(/^-|-$/g, "").slice(0, 30) || "officer"), name: n, pw: true }; })() : null);
/* what the Worker needs to know who is asking: the Discord session, else (trial) the officer password */
OFFICER.authBody = () => { let tok = null; try { tok = localStorage.getItem(DISCORD_LS); } catch (e) {} return tok ? { token: tok } : OFFICER.pw ? { pw: OFFICER.pw, pwName: OFFICER.me().name } : {}; };
OFFICER.isRealAdmin = () => !!OFFICER.user && (OFFICER.ADMINS.includes(OFFICER.user.id) || OFFICER.ADMIN_IDS.includes(OFFICER.user.id));
OFFICER.isAdmin = () => OFFICER.isRealAdmin() && !OFFICER.previewAs;   // 👁️ while previewing, the page looks exactly like theirs (no 👥, no admin tools)
OFFICER.can = (tab, what = "view") => {
  const uid = OFFICER.previewAs || (OFFICER.user && OFFICER.user.id);
  if (tab === "perms") return OFFICER.isAdmin();
  if (OFFICER.PERMS_TRIAL) return true;                               // 🔓 until the login system is rolled out: every tab open to every officer (👥 stays admin-only)
  if (!uid) return false;                                             // only Discord logins get in now
  if (OFFICER.ADMINS.includes(uid) || OFFICER.ADMIN_IDS.includes(uid)) return true;
  const u = OFFICER.perms.users[uid], lv = (u && u.perms && u.perms[tab]) || "none";
  return what === "edit" ? lv === "edit" : lv !== "none";
};
/* tab list + read-only look follow the rights (called after login, after a change on the 👥 tab, and when previewing) */
/* 👁️ preview bar: the only way back while previewing (the 👥 tab is hidden then, like for them) */
OFFICER.setPreview = (id) => {
  OFFICER.previewAs = id || null; OFFICER.applyPerms(); window.dispatchEvent(new Event("nxs-perms"));
  if (!id && OFFICER.isAdmin()) location.hash = "#perms";
};
function previewBar() {
  let bar = document.getElementById("pvBar");
  const u = OFFICER.previewAs && OFFICER.perms.users[OFFICER.previewAs];
  if (!u || !OFFICER.isRealAdmin()) { if (bar) bar.remove(); return; }
  const L = { zh: ["👁️ 預覽中：{n} 看到的畫面", "結束預覽"], en: ["👁️ Previewing as {n}", "Exit preview"], pt: ["👁️ Visualizando como {n}", "Sair da prévia"], ko: ["👁️ {n}(으)로 미리보기 중", "미리보기 종료"], ar: ["👁️ معاينة كـ {n}", "إنهاء المعاينة"] }[OFFICER.lang] || ["👁️ Previewing as {n}", "Exit preview"];
  if (!bar) {
    bar = document.createElement("div"); bar.id = "pvBar";
    bar.style.cssText = "position:fixed;left:50%;transform:translateX(-50%);top:10px;z-index:9999;display:flex;gap:10px;white-space:nowrap;font-size:14px;align-items:center;padding:10px 14px;border-radius:999px;background:#f0a500;color:#1b1300;font-weight:700;box-shadow:0 4px 16px rgba(0,0,0,.35);max-width:calc(100% - 32px)";
    document.body.appendChild(bar);
  }
  bar.innerHTML = `<span></span><button type="button" class="btn small" style="background:#1b1300;color:#fff;border-color:#1b1300"></button>`;
  bar.firstChild.textContent = L[0].replace("{n}", u.name || OFFICER.previewAs); bar.lastChild.textContent = L[1];
  bar.lastChild.onclick = () => OFFICER.setPreview(null);
}
OFFICER.applyPerms = () => {
  previewBar();
  const bp = document.getElementById("pg-board"); if (bp) bp.classList.toggle("view-only", !OFFICER.can("board", "edit"));
  document.querySelectorAll(".tabs a[data-tab]").forEach((a) => { const k = a.dataset.tab; a.hidden = k === "board" || k === "attend" ? !((OFFICER.user || OFFICER.pw) && OFFICER.can(k)) : !OFFICER.can(k, "view"); });
  const ro = { zh: "👁️ 這個分頁你只能看，不能修改。", en: "👁️ View only: you can look at this tab but not change it.", pt: "👁️ Só leitura: você pode ver esta aba, mas não mudar nada.", ar: "👁️ للعرض فقط: يمكنك مشاهدة هذا القسم دون تعديله.", ko: "👁️ 보기 전용: 이 탭은 볼 수만 있고 수정할 수 없습니다." }[OFFICER.lang] || "";
  for (const k of TABS) { const pg = document.getElementById("pg-" + k); if (pg) { pg.classList.toggle("readonly", !OFFICER.can(k, "edit")); pg.dataset.ro = ro; } }
  // links into a tab they can't open (📊 Ranking / 📢 Post buttons on the to-do cards…) disappear too: body.no-<tab> + CSS
  for (const k of TABS) document.body.classList.toggle("no-" + k, !OFFICER.can(k, "view"));
  // only once someone is logged in: before that nobody can see anything, and a link like #map must survive until the login check is done
  if (OFFICER.user && !OFFICER.can(currentTab(), "view")) location.hash = "#" + (TABS.find((k) => OFFICER.can(k, "view")) || "events");
};
const OFFICER_PAGES = {};
const TABS = ["events", "ranking", "post", "watch", "scout", "views", "map", "move", "hunt", "attack", "bt", "board", "attend", "perms"];
const inited = {};
/* start another tab's module without showing it (the 👥 tab uses the Post tab's owner tools) */
OFFICER.ensure = async (k) => { const p = OFFICER_PAGES[k]; if (!p) return; if (!inited[k]) inited[k] = p.init() || true; try { await inited[k]; } catch (e) { inited[k] = null; console.error(e); } };
/* ← back: to the page you came from on this site; opened directly (a notification, a bookmark) → the guides in your language, not the language picker */
function nxsBack(e) {
  if (e) e.preventDefault();
  let same = false; try { same = !!document.referrer && new URL(document.referrer).origin === location.origin && !/officer-|bear-calculator|kvk-calculator/.test(new URL(document.referrer).pathname); } catch (x) {}
  if (same && history.length > 1) { history.back(); return; }
  let l = "", g = ""; try { l = localStorage.getItem("ks-lang") || ""; g = localStorage.getItem("ks-guide") || ""; } catch (x) {}
  location.href = "./" + (l ? `#/${l}/${g || "recent-events"}` : "");
}
/* ☀ / ☾ light or dark: the same setting as the main site (ks-theme), so switching here also switches there and back */
function officerTheme(th) {
  const root = document.documentElement;
  if (th === "light" || th === "dark") root.setAttribute("data-theme", th); else root.removeAttribute("data-theme");
  const shown = th === "light" || th === "dark" ? th : matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  const b = document.getElementById("themeBtn"); if (b) b.textContent = shown === "dark" ? "☀" : "☾";
}
try { officerTheme(localStorage.getItem("ks-theme")); } catch (e) {}
document.addEventListener("DOMContentLoaded", () => { try { officerTheme(localStorage.getItem("ks-theme")); } catch (e) {} });
document.getElementById("themeBtn") && (document.getElementById("themeBtn").onclick = () => {
  const cur = document.documentElement.getAttribute("data-theme"), sysDark = matchMedia("(prefers-color-scheme: dark)").matches;
  const next = cur === "dark" ? "light" : cur === "light" ? "dark" : sysDark ? "light" : "dark";
  try { localStorage.setItem("ks-theme", next); } catch (e) {}
  officerTheme(next);
});
window.addEventListener("storage", (e) => { if (e.key === "ks-theme") officerTheme(e.newValue); });   // switched in another tab (main site) → follow
const SH = { ko: {"rename": "눌러서 사이트에 보이는 이름을 바꿀 수 있어요", "home": "홈", "pw": "🔒 간부 비밀번호", "remember": "이 기기에서 기억하기", "unlock": "잠금 해제", "wrong": "비밀번호가 틀렸습니다", "loading": "불러오는 중…", "discord": "Discord로 로그인", "or": "— 또는 간부 비밀번호 사용 —", "out": "로그아웃", "inSmall": "🔑 Discord로 로그인", "e_no_access": "Discord 계정이 아직 간부 목록에 없습니다. Sparrow에게 문의하세요.", "e_not_member": "먼저 연맹 Discord 서버에 가입한 뒤 다시 시도하세요.", "e_cancelled": "Discord 로그인이 취소되었습니다.", "e_expired": "다시 로그인하세요.", "e_logged_out": "다시 로그인하세요.", "e_discord": "Discord에 연결할 수 없습니다 — 다시 시도하세요.", "e_discord_unreachable": "Discord에 연결할 수 없습니다 — 다시 시도하세요.", "e_setup": "Discord 로그인은 됐지만 사이트 설정이 아직 끝나지 않았습니다. 지금은 간부 비밀번호를 사용하세요."},
 ar: {"rename": "اضغط لتغيير الاسم الظاهر على الموقع", "home": "الرئيسية", "pw": "🔒 كلمة مرور المسؤولين", "remember": "تذكّر على هذا الجهاز", "unlock": "فتح", "wrong": "كلمة مرور خاطئة", "loading": "جارٍ التحميل…", "discord": "تسجيل الدخول عبر Discord", "or": "— أو استخدم كلمة مرور المسؤولين —", "out": "تسجيل الخروج", "inSmall": "🔑 تسجيل الدخول عبر Discord", "e_no_access": "حسابك في Discord ليس في قائمة المسؤولين بعد. اسأل Sparrow.", "e_not_member": "انضم أولًا إلى خادم Discord الخاص بتحالفنا، ثم حاول مرة أخرى.", "e_cancelled": "تم إلغاء تسجيل الدخول عبر Discord.", "e_expired": "يرجى تسجيل الدخول مرة أخرى.", "e_logged_out": "يرجى تسجيل الدخول مرة أخرى.", "e_discord": "تعذّر الوصول إلى Discord — حاول مرة أخرى.", "e_discord_unreachable": "تعذّر الوصول إلى Discord — حاول مرة أخرى.", "e_setup": "نجح تسجيل الدخول عبر Discord، لكن الموقع لم يُجهَّز بالكامل بعد. استخدم كلمة مرور المسؤولين حاليًا."},
 pt: {"rename": "Toque para mudar o nome que aparece no site", "home": "Início", "pw": "🔒 Senha dos oficiais", "remember": "Lembrar neste aparelho", "unlock": "Desbloquear", "wrong": "Senha errada", "loading": "Carregando…", "discord": "Entrar com o Discord", "or": "— ou use a senha dos oficiais —", "out": "Sair", "inSmall": "🔑 Entrar com o Discord", "e_no_access": "Sua conta do Discord ainda não está na lista de oficiais. Fale com a Sparrow.", "e_not_member": "Entre primeiro no servidor do Discord da aliança e tente de novo.", "e_cancelled": "O login pelo Discord foi cancelado.", "e_expired": "Entre de novo, por favor.", "e_logged_out": "Entre de novo, por favor.", "e_discord": "Não foi possível conectar ao Discord — tente de novo.", "e_discord_unreachable": "Não foi possível conectar ao Discord — tente de novo.", "e_setup": "O login pelo Discord funcionou, mas o site ainda não está todo configurado. Use a senha dos oficiais por enquanto."},
 en: { home: "Home", pw: "🔒 Officer password", remember: "Remember on this device", unlock: "Unlock", wrong: "Wrong password", loading: "Loading…",
                   discord: "Log in with Discord", or: "— or use the officer password —", out: "Log out", inSmall: "🔑 Log in with Discord", rename: "Tap to change the name shown on the site",
                   e_no_access: "Your Discord account isn't on the officer list yet. Ask Sparrow.", e_not_member: "Join our alliance Discord server first, then try again.",
                   e_cancelled: "Discord login was cancelled.", e_expired: "Please log in again.", e_logged_out: "Please log in again.",
                   e_discord: "Couldn't reach Discord — please try again.", e_discord_unreachable: "Couldn't reach Discord — please try again.",
                   e_setup: "Logged in, but the site isn't ready for view-only accounts yet — an admin needs to log in once first. Try again later." },
             zh: { home: "首頁", pw: "🔒 幹部密碼", remember: "在這台裝置記住", unlock: "解鎖", wrong: "密碼錯誤", loading: "載入中…",
                   discord: "用 Discord 登入", or: "— 或輸入幹部密碼 —", out: "登出", inSmall: "🔑 用 Discord 登入", rename: "點一下可以改你在網站上顯示的名字",
                   e_no_access: "你的 Discord 帳號還沒有幹部權限，請找 Sparrow。", e_not_member: "請先加入聯盟的 Discord 伺服器，再試一次。",
                   e_cancelled: "已取消 Discord 登入。", e_expired: "請重新登入。", e_logged_out: "請重新登入。",
                   e_discord: "連不上 Discord，請再試一次。", e_discord_unreachable: "連不上 Discord，請再試一次。",
                   e_setup: "登入成功，但網站還沒準備好給唯讀帳號使用（需要管理員先登入一次），請稍後再試。" } };
/* ===== 🔑 Discord login (testing): the Worker checks who you are on our Discord server and hands back a sealed session ===== */
const AUTH_API = "https://nxs-ai.tapegirljoke.workers.dev", DISCORD_LS = "nxs-discord-v1";
/* still being tried out: the Discord buttons only show in a browser that opened this page once with ?discord (or is logged in) */
const DISCORD_TRY = true;   // the Discord login buttons are shown everywhere (the ?discord trial switch is over)
let loginMsg = "";
(function () {   // coming back from Discord: #login=<session>&to=<tab> or #login_error=<why>&to=<tab>
  const m = location.hash.slice(1).match(/^(login|login_error)=([^&]*)(?:&to=(.*))?$/);
  if (!m) return;
  if (m[1] === "login") { try { localStorage.setItem(DISCORD_LS, m[2]); } catch (e) {} } else loginMsg = m[2];
  history.replaceState(null, "", location.pathname + location.search + (m[3] ? "#" + decodeURIComponent(m[3]) : ""));
})();
const discordStart = () => AUTH_API + "/auth/discord/start?r=" + encodeURIComponent(location.origin + location.pathname + location.hash);
async function discordMe(tok) {
  try {
    const r = await fetch(AUTH_API + "/auth/me", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ token: tok }) });
    return await r.json();
  } catch (e) { return { error: "discord" }; }
}
function showMe() {
  const u = OFFICER.user, t = SH[OFFICER.lang] || SH.en;
  document.getElementById("meBox").hidden = !u;
  document.getElementById("meIn").hidden = !DISCORD_TRY || !!u || document.getElementById("gate").hidden === false;
  document.getElementById("meIn").textContent = t.inSmall; document.getElementById("meIn").href = discordStart();
  document.getElementById("meOut").textContent = t.out;
  OFFICER.applyPerms();   // 💬 Board and 👥 Officers: only for people logged in with Discord
  if (!u) return;
  const mn = document.getElementById("meName");
  mn.textContent = u.name; mn.title = (t.rename || SH.en.rename) + (u.discordName ? " · Discord: " + u.discordName : ""); mn.style.cursor = "pointer";
  const av = document.getElementById("meAv"); av.hidden = !u.avatar; if (u.avatar) av.src = u.avatar;
}
/* ✏️ tap your name at the top to change how it's shown on the site (saved on the server, every device) */
document.getElementById("meName").onclick = () => {
  const mn = document.getElementById("meName"); if (!OFFICER.user || mn.querySelector("input")) return;
  const inp = document.createElement("input"); inp.value = OFFICER.user.name; inp.maxLength = 40; inp.dir = "auto";
  inp.style.cssText = "font:inherit;font-weight:700;width:9em;padding:2px 4px;border:1px solid var(--rule);border-radius:6px;background:var(--panel);color:inherit";
  mn.textContent = ""; mn.appendChild(inp); inp.focus(); inp.select();
  let done = false;
  const finish = async (save) => {
    if (done) return; done = true;
    const v = inp.value.replace(/\s+/g, " ").trim().slice(0, 40);
    if (save && v && v !== OFFICER.user.name) {
      mn.textContent = v + " …";
      try {
        const j = await permsApi("rename", { name: v });
        OFFICER.user = { ...OFFICER.user, ...(j.user || {}), name: v };
        if (j.perms && j.perms.users) { OFFICER.perms = j.perms; OFFICER.syncAdmins(); permsCache(); permsChanged(); }
      } catch (e) { mn.textContent = OFFICER.user.name + " ⚠️"; setTimeout(showMe, 2500); return; }
    }
    showMe();
  };
  inp.onkeydown = (e) => { if (e.key === "Enter") finish(true); if (e.key === "Escape") finish(false); };
  inp.onblur = () => finish(true);
};
document.getElementById("meOut").onclick = async () => {
  // this device stops getting the other devices' ⏰ notifications
  try {
    const reg = navigator.serviceWorker && await navigator.serviceWorker.getRegistration(), sub = reg && await reg.pushManager.getSubscription();
    if (sub) await fetch(AUTH_API + "/sync/forget", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ token: localStorage.getItem(DISCORD_LS), sub: sub.toJSON() }) });
  } catch (e) {}
  try { localStorage.removeItem(DISCORD_LS); localStorage.removeItem("nxs-discord-user"); } catch (e) {}
  location.reload();
};
function applyShared() {
  const t = SH[OFFICER.lang] || SH.en;
  document.documentElement.lang = HTML_LANG(OFFICER.lang);
  document.getElementById("shHome").textContent = t.home;
  // ← Home opens the site in its language; picking a language here (langBtn) makes it the site's too, so both always match
  document.getElementById("shHome").parentElement.href = "./#/" + (siteLang() || OFFICER.lang) + "/";
  document.getElementById("langBtn").value = OFFICER.lang;
  document.getElementById("gateTitle").textContent = t.pw;
  document.getElementById("gateRememberTxt").textContent = t.remember;
  document.getElementById("gateBtn").textContent = t.unlock;
  document.getElementById("gateErr").textContent = t.wrong;
  document.getElementById("gateDiscord").textContent = t.discord;
  document.getElementById("gateOr").textContent = t.or;
  document.getElementById("gateDiscord").style.display = DISCORD_TRY ? "block" : "none"; document.getElementById("gateOr").hidden = !DISCORD_TRY;
  const dm = document.getElementById("gateDiscordMsg"); dm.hidden = !loginMsg; dm.textContent = loginMsg ? t["e_" + loginMsg] || t.e_discord : "";
  if (typeof showMe === "function" && document.getElementById("meBox")) showMe();
}
/* home-screen app: no browser reload button, so show our own ↻ */
(function () {
  let app = false;
  try { app = matchMedia("(display-mode: standalone)").matches || matchMedia("(display-mode: fullscreen)").matches || navigator.standalone === true; } catch (e) {}
  const btn = document.getElementById("reloadBtn");
  if (!app || !btn) return;
  btn.hidden = false;
  const cp = document.getElementById("copyUrlBtn");   // no address bar in the app either → 🔗 copies this page's link
  if (cp) { cp.hidden = false; cp.onclick = async () => {
    const t = location.href; let ok = false;
    try { await navigator.clipboard.writeText(t); ok = true; } catch (e) {
      const a = document.createElement("textarea"); a.value = t; a.style.cssText = "position:fixed;top:0;left:0;opacity:0"; document.body.appendChild(a); a.select();
      try { ok = document.execCommand("copy"); } catch (x) {} a.remove(); }
    cp.textContent = ok ? "✓" : "✕"; setTimeout(() => { cp.textContent = "🔗"; }, 1500); }; }
  btn.onclick = async () => {
    btn.disabled = true;
    try { const r = navigator.serviceWorker && await navigator.serviceWorker.getRegistration(); if (r) await r.update(); } catch (e) {}
    location.reload();
  };
})();
document.getElementById("langBtn").onchange = (ev) => {
  OFFICER.lang = ev.target.value;
  setOfficerLang(OFFICER.lang); try { localStorage.setItem("ks-lang", OFFICER.lang); } catch (e) {}   // the site follows (it has all five)
  applyShared();
  for (const k of TABS) {
    const p = OFFICER_PAGES[k];
    if (!p || !p.setLang) continue;
    try { p.setLang(OFFICER.lang); }                          // one tab failing must not stop the others
    catch (e) { console.error("setLang", k, e); try { p.applyTexts(); } catch (x) {} }
  }
};
const loadedScripts = {};
function loadScripts(list) {
  return list.reduce((p, src) => p.then(() => loadedScripts[src] || (loadedScripts[src] = new Promise((res, rej) => {
    const s = document.createElement("script"); s.src = src; s.onload = res; s.onerror = () => rej(new Error(src)); document.head.appendChild(s);
  }))), Promise.resolve());
}
/* tabs: #events / #ranking / #post / #watch (the part after "?" is kept for the page) */
function currentTab() { const m = (location.hash || "").match(/^#(events|ranking|post|watch|scout|views|map|move|hunt|attack|bt|board|attend|perms)/); return m ? m[1] : "events"; }
async function showTab() {
  const k = currentTab();
  if (k === "bt") { location.replace("bear-calculator.html"); return; }   // 🐻 the bear calculator moved to its own public page
  OFFICER.applyPerms();
  document.querySelectorAll(".tabs a").forEach((a) => a.classList.toggle("on", a.dataset.tab === k));
  for (const t of TABS) document.getElementById("pg-" + t).hidden = t !== k;
  const p = OFFICER_PAGES[k];
  if (!p) return;
  if (!inited[k]) { inited[k] = p.init() || true; }   // a page whose init returns nothing must still count as started (else its click handlers pile up on every visit)
  try { await inited[k]; } catch (e) { inited[k] = null; console.error(e); }
  if (p.onShow) p.onShow();
  window.scrollTo(0, 0);
}
window.addEventListener("hashchange", showTab);
/* password: one check for all tabs; the GitHub key (for saving) and the data key (for reading) are opened here */
const b64dec_ = (b64) => Uint8Array.from(atob(b64.replace(/\s/g, "")), (c) => c.charCodeAt(0));
async function officerDecrypt(pw, blob) {
  try {
    const key = await OfficerData.pbkdf(pw, blob.salt, blob.iter, ["decrypt"]);
    return new TextDecoder().decode(await crypto.subtle.decrypt({ name: "AES-GCM", iv: b64dec_(blob.iv) }, key, b64dec_(blob.data)));
  } catch (e) { return null; }
}
function officerStore() { try { return JSON.parse(localStorage.getItem(OFFICER_LS)) || {}; } catch (e) { return {}; } }
async function officerGate() {
  let blob = await OfficerData.postKey();
  if (!blob) return showTab();                               // not set up yet → open (the Post tab shows the setup card)
  const checkPw = async (pw) => (await officerDecrypt(pw, blob)) || (await officerDecrypt(pw, blob = (await OfficerData.postKey(true)) || blob));
  const ok = async (pw, tok, r) => {
    OFFICER.pw = pw; OFFICER.token = tok; await OfficerData.unlock(pw);
    // 🔐 first admin login: hand the data key to the Worker so view-only officers can read without the password
    if (r && r.needDk && r.role === "admin" && OfficerData.rawKey) { try { const raw = await OfficerData.rawKey(); if (raw) await permsApi("setdk", { dk: raw }); } catch (e) {} }
    document.getElementById("gate").hidden = true; showMe(); showTab(); if (OFFICER.user) OFFICER.fetchPerms(); };
  const okView = async (dk) => { OFFICER.viewOnly = true; await OfficerData.unlockRaw(dk); document.getElementById("gate").hidden = true; showMe(); showTab(); OFFICER.fetchPerms(); };
  // 🔑 logged in with Discord: the Worker re-checks the list and gives the password to open the officer data
  let dtok = null; try { dtok = localStorage.getItem(DISCORD_LS); } catch (e) {}
  if (dtok) {
    const r = await discordMe(dtok);
    if (r.ok) {
      try { localStorage.setItem(DISCORD_LS, r.token); } catch (e) {}
      OFFICER.user = r.user;
      try { localStorage.setItem("nxs-discord-user", JSON.stringify(r.user || {})); } catch (e) {}   // ⏰ the timer panel reads who this is (🛠️ reminders picked on the 👥 tab)
      const s = officerStore(); if (!s.author) { s.author = r.user.name; try { localStorage.setItem(OFFICER_LS, JSON.stringify(s)); } catch (e) {} }
      if (r.role === "viewer") { if (r.dk) return okView(r.dk); loginMsg = "setup"; }
      else { const t = await checkPw(r.pw); if (t) return ok(r.pw, t, r); loginMsg = "setup"; }
    } else {
      if (["logged_out", "no_access", "not_member"].includes(r.error)) { try { localStorage.removeItem(DISCORD_LS); } catch (e) {} }
      if (r.error === "officer_password_missing") { OFFICER.user = r.user || null; loginMsg = "setup"; } else loginMsg = r.error || "discord";
    }
  }
  // 🔒 the officer password alone no longer opens the page: Discord login only
  const gate = document.getElementById("gate"), pwEl = document.getElementById("gatePw");
  forgetOldPw();
  gate.hidden = false;
  document.getElementById("gateDiscord").href = discordStart();
  applyShared();
  const go = async () => {
    return;   // password login is switched off (Discord only)
    const pw = pwEl.value, t = await checkPw(pw);
    if (t) {
      if (document.getElementById("gateRemember").checked) {
        const s = officerStore(); s.pw = pw; try { localStorage.setItem(OFFICER_LS, JSON.stringify(s)); } catch (e) {}
        window.dispatchEvent(new CustomEvent("nxs-officer-pw", { detail: pw }));   // the Post tab keeps its own copy of this record
      }
      ok(pw, t);
    } else { document.getElementById("gateErr").hidden = false; pwEl.value = ""; pwEl.focus(); }
  };
  document.getElementById("gateBtn").onclick = go;
  pwEl.onkeydown = (e) => { if (e.key === "Enter") go(); };
  pwEl.focus();
}
/* 🧹 devices that unlocked with the old shared password still had it saved: wipe it, so only a Discord login gets in */
function forgetOldPw() { try { const s = officerStore(); if (s.pw) { delete s.pw; localStorage.setItem(OFFICER_LS, JSON.stringify(s)); } } catch (e) {} }
forgetOldPw();
applyShared();
