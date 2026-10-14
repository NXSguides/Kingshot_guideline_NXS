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
const OFFICER_LANGS = ["zh", "en", "pt", "ar"];   // officer page languages (R4/R5 languages)
const officerLang = () => { try { const v = localStorage.getItem(OFFICER_LANG); return OFFICER_LANGS.includes(v) ? v : null; } catch (e) { return null; } };
const setOfficerLang = (v) => { try { localStorage.setItem(OFFICER_LANG, v); } catch (e) {} };
const OFFICER = { lang: officerLang() || OFFICER_LANGS.find((l) => (navigator.language || "").startsWith(l)) || "en", token: null, pw: null };
/* Dates and <html lang> per language; BY_EN = Portuguese / Arabic for the built-in English texts (event names, default to-dos…) — shown only, never saved */
const LOCALE = (l) => ({ zh: "zh-TW", pt: "pt-BR", ar: "ar-u-nu-latn" })[l] || "en-GB";   // Arabic with 0-9 digits, like the game
const HTML_LANG = (l) => ({ zh: "zh-Hant", pt: "pt-BR", ar: "ar" })[l] || "en";
/* Arabic reads right to left: the whole page flips (set whenever <html lang> changes) */
new MutationObserver(() => { const rtl = (document.documentElement.lang || "").startsWith("ar"); if (document.documentElement.dir !== (rtl ? "rtl" : "ltr")) document.documentElement.dir = rtl ? "rtl" : "ltr"; })
  .observe(document.documentElement, { attributes: true, attributeFilter: ["lang"] });
const BY_EN = { pt: {"Bear Hunt": "Caça ao Urso", "13:00 & 22:00 UTC, 30 min each": "13:00 & 22:00 UTC, 30 min cada", "Alliance Championship": "Campeonato da Aliança", "Weekly, Monday reset · shown = 2-day registration; battles run automatically": "Semanal, reinicia na segunda · mostra os 2 dias de inscrição; as batalhas são automáticas", "Remind everyone: register in the Middle Lane, strongest heroes, 50/20/30, buffs on.": "Lembre a todos: inscrever-se na pista do meio, heróis mais fortes, 50/20/30, bônus ativados.", "Alliance Mobilization": "Mobilização da Aliança", "Follows the 4-week cycle (after KvK / after Strongest Governor; Alliance Brawl can replace one) — check the start date": "Segue o ciclo de 4 semanas (depois do KvK / depois de O Governador mais Forte; a Briga da Aliança pode substituir uma) — confira a data de início", "Post the mission rules (no KvK Prep items; best picks).": "Publique as regras das missões (sem itens da Fase de Preparação do KvK; melhores escolhas).", "Mystic Trial": "Prova Mística", "Alliance rules": "Regras da aliança", "KvK": "KvK", "Viking Vengeance": "Vingança Viking", "Swordland Showdown": "Confronto entre Espadas", "Tri-Alliance Clash": "Confronto Tri-Aliança", "Eternity's Reach": "Alcance da Eternidade", "All Out": "Vai com Tudo", "Fishing Tournament": "Torneio de Pesca", "Hero Roulette": "Roleta do Herói", "Cesares Fury": "Fúria dos Césares", "Sanctuary Battle": "Batalha do Santuário", "Alliance Brawl": "Briga da Aliança", "Mon 00:00 – Sun 12:00 UTC · be in the alliance at Sun 23:00 UTC the day before (matching) to count": "Seg 00:00 – Dom 12:00 UTC · esteja na aliança no domingo anterior às 23:00 UTC (pareamento) para contar", "Merchant Empire": "Império Mercante", "Escort 2 caravans at a time · last 4 h (until Sun 04:00 UTC) raiding only": "Escolte até 2 caravanas por vez · nas últimas 4 h (até Dom 04:00 UTC) só saque", "Call of the Sovereign": "Chamado do Soberano", "Max rewards: 90 Gold Keys (30/day) + 30 Platinum Keys (10/day) over the 3 days · resets 00:00 UTC": "Recompensa máxima: Chave Dourada ×90 (30/dia) + Chave de Platina ×30 (10/dia) nos 3 dias · reinicia 00:00 UTC", "R4/R5 start Viking Vengeance: pick a time that suits members and announce it beforehand (UTC), so everyone can return troops, prepare reinforcements and stay online for the important waves.": "R4/R5 iniciam a Vingança Viking: escolham um horário bom para os membros e anunciem antes (em UTC), para todos recolherem as tropas, prepararem reforços e ficarem online nas ondas importantes.", "Start Viking Vengeance in game at the announced time.": "Inicie a Vingança Viking no jogo no horário anunciado.", "Voting phase: set up an alliance poll to confirm 100% attendance for the fixed time windows.": "Fase de votação: crie uma enquete da aliança para confirmar 100% de presença nos horários fixos.", "Registration phase: based on the voting, assign each confirmed member to a Legion.": "Fase de inscrição: com base na votação, coloque cada membro confirmado numa Legião.", "Reminder: ask everyone to check their assigned Legion and time and confirm 100% attendance — it affects matchmaking and roles.": "Lembrete: peça a todos para conferir a Legião e o horário e confirmar 100% de presença — isso afeta o pareamento e as funções.", "Planning phase: assign roles (Attacker, Defender, Joiner) to Legion 1 and Legion 2.": "Fase de planejamento: defina as funções (Attacker, Defender, Joiner) da Legião 1 e da Legião 2.", "Voting phase: set up an alliance poll to find out who can 100% attend.": "Fase de votação: crie uma enquete da aliança para saber quem pode participar com 100% de certeza.", "Sign-up phase: split confirmed players into Legion 1 and Legion 2 (separate time slots) so both have enough reliable players — don't put every strong account in one group.": "Fase de inscrição: divida os confirmados entre Legião 1 e Legião 2 (horários diferentes) para que as duas tenham gente confiável — não coloque todas as contas fortes no mesmo grupo.", "Planning phase: assign roles to Legion 1 and Legion 2 and post the plan.": "Fase de planejamento: defina as funções da Legião 1 e da Legião 2 e publique o plano.", "Remind everyone: each member gets 5 rally requests — use them, unused ones are lost when the event ends.": "Lembre a todos: cada membro tem 5 pedidos de rally — usem, os que sobrarem somem quando o evento acaba.", "R4+: once enough members have beaten high-level targets, apply to challenge the Captain and post a time for everyone to join.": "R4+: quando membros suficientes vencerem alvos de nível alto, peçam para desafiar o Capitão e publiquem um horário para todos participarem.", "R4+: register if we meet the requirements — 1 Sanctuary + 1 Fortress, 3 time slots (the slot most alliances pick wins). Pick targets we can realistically take and hold (competition, location, our strength), not just the most prestigious. Sanctuaries we held last week are signed up automatically.": "R4+: inscrevam-se se cumprirmos os requisitos — 1 Santuário + 1 Fortaleza, 3 horários (vale o horário que mais alianças escolherem). Escolham alvos que realmente conseguimos tomar e manter (concorrência, localização, nossa força), não só os mais famosos. Santuários que tínhamos na semana passada são inscritos automaticamente.", "Contest day: post the rally message about 1.5 h before the slot (exact 70,080 troops, rally from home, no solo attacks). Once a building is taken, post the defence swap (Howard/Gordon 60:20:20).": "Dia da disputa: publique a mensagem de rally cerca de 1,5 h antes do horário (exatamente 70.080 tropas, rally de casa, sem ataques solo). Depois de tomar um prédio, publique a troca de defesa (Howard/Gordon 60:20:20).", "Remind everyone: 30-minute solo event. Skill picks Right / Right / Left / Left / Right; send one march into a Copper Vein every minute.": "Lembre a todos: evento individual de 30 minutos. Habilidades: Direita / Direita / Esquerda / Esquerda / Direita; mande uma marcha para um veio de cobre a cada minuto.", "Post the All Out rules (NAP alliances, no attacks on castles or alliance buildings) and the secured gathering node rotation.": "Publique as regras do Vai com Tudo (alianças NAP, sem ataques a castelos ou prédios da aliança) e o rodízio dos pontos de coleta seguros.", "Remind everyone to SAVE Gold & Platinum Keys (90 Gold + 30 Platinum for max rewards) — copy the in-game message.": "Lembre a todos de GUARDAR Chave Dourada e Chave de Platina (Dourada ×90 + Platina ×30 para a recompensa máxima) — copie a mensagem do jogo.", "Remind everyone: use Ocean Prospector first to upgrade the Fishing Kit, then switch to Regular Fishing.": "Lembre a todos: usem primeiro a Prospecção do Oceano para melhorar o Kit de Pesca e depois passem para a Pesca Normal.", "Remind everyone: 1 free spin a day; milestone rewards at 5 / 15 / 35 / 70 / 120 spins. Spins on KvK Prep Day 2–3 also score KvK points.": "Lembre a todos: 1 giro grátis por dia; recompensas de marco em 5 / 15 / 35 / 70 / 120 giros. Giros nos dias 2–3 da Fase de Preparação do KvK também dão pontos de KvK.", "Remind members: book Chief Minister slots, save Intel Missions, count saved items (the site's KvK checklist pops up).": "Lembre os membros: reservar horários de Primeiro-ministro, guardar Missões de Informação, contar os itens guardados (a checklist de KvK do site aparece).", "Castle Battle on the last day: agree rally leaders and times.": "Batalha do Castelo no último dia: combinem os líderes de rally e os horários.", "Post the mission rules (no KvK Prep items; best picks). R4+: refresh shared missions — remove poor ones so members aren't left with tasks they avoid.": "Publique as regras das missões (sem itens da Fase de Preparação do KvK; melhores escolhas). R4+: atualizem as missões compartilhadas — tirem as ruins para os membros não ficarem com tarefas que evitam.", "KvK Prep & Battle Guide": "Guia de Preparação e Batalha do KvK", "Formations & Rally Tips": "Formações e dicas de rally", "Gen 3 Master Academy Guide": "Guia da Academia dos Mestres (Ger. 3)", "Pets": "Pets", "F2P Heroes Guide": "Guia de heróis F2P", "Hero Cards (Gen 1–3)": "Cartas de heróis (Ger. 1–3)", "General Tips": "Dicas gerais", "Attackers": "Atacantes", "Defenders": "Defensores", "Joiners": "Joiners", "Home (language picker)": "Início (escolha de idioma)", "KvK Points Planner": "Planejador de pontos do KvK", "Booking guide": "Guia de reservas", "Squad guide": "Guia de esquadrões", "KvK calculator": "Calculadora de KvK", "Bear Hunt (every Bear day)": "Caça ao Urso (todo dia de Urso)"},
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
OFFICER.OWNER = "1547403844374368327";   // Sparrow: always admin, can't be demoted or removed (so nobody can lock everyone out)
OFFICER.ADMINS = [];                       // filled from the table (admin: true) by loadPerms
OFFICER.PERM_TABS = ["events", "map", "ranking", "post", "watch", "scout", "views", "board", "bt"];
OFFICER.defaultPerms = () => Object.fromEntries(OFFICER.PERM_TABS.map((k) => [k, k === "events" ? "view" : "none"]));   // new officer: Events, view only
const PERMS_LS = "nxs-perms-v1";
OFFICER.resetPerms = () => { OFFICER.perms = { v: 2, users: {
  "1547403844374368327": { name: "Sparrow", admin: true, perms: {} },
  "1240788094672834623": { name: "R5", perms: OFFICER.defaultPerms() },
  "762827904341246013": { name: "Nia", perms: OFFICER.defaultPerms() } } }; OFFICER.syncAdmins(); };
OFFICER.syncAdmins = () => { const u = OFFICER.perms.users; if (u[OFFICER.OWNER]) u[OFFICER.OWNER].admin = true; OFFICER.ADMINS = Object.keys(u).filter((id) => u[id].admin); };
OFFICER.loadPerms = () => { try { const p = JSON.parse(localStorage.getItem(PERMS_LS)); if (p && p.users && p.v === 2) { OFFICER.perms = p; OFFICER.syncAdmins(); return; } } catch (e) {} OFFICER.resetPerms(); };
OFFICER.savePerms = () => { OFFICER.syncAdmins(); try { localStorage.setItem(PERMS_LS, JSON.stringify(OFFICER.perms)); } catch (e) {} };
OFFICER.loadPerms();
OFFICER.previewAs = null;   // an admin can look at the page with another officer's rights (👥 tab → "Preview as")
OFFICER.isAdmin = () => !!OFFICER.user && OFFICER.ADMINS.includes(OFFICER.user.id);   // the real person (a preview never hides the 👥 tab)
OFFICER.can = (tab, what = "view") => {
  const uid = OFFICER.previewAs || (OFFICER.user && OFFICER.user.id);
  if (tab === "perms") return OFFICER.isAdmin();
  if (!uid) return true;                                              // password-only officer: unchanged for now
  if (OFFICER.ADMINS.includes(uid)) return true;
  const u = OFFICER.perms.users[uid], lv = (u && u.perms && u.perms[tab]) || (u ? "none" : "edit");   // Discord user not in the table yet → everything
  return what === "edit" ? lv === "edit" : lv !== "none";
};
/* tab list + read-only look follow the rights (called after login, after a change on the 👥 tab, and when previewing) */
OFFICER.applyPerms = () => {
  document.querySelectorAll(".tabs a[data-tab]").forEach((a) => { const k = a.dataset.tab; a.hidden = k === "board" ? !(OFFICER.user && OFFICER.can("board")) : !OFFICER.can(k, "view"); });
  const ro = { zh: "👁️ 這個分頁你只能看，不能修改。", en: "👁️ View only: you can look at this tab but not change it.", pt: "👁️ Só leitura: você pode ver esta aba, mas não mudar nada.", ar: "👁️ للعرض فقط: يمكنك مشاهدة هذا القسم دون تعديله." }[OFFICER.lang] || "";
  for (const k of TABS) { const pg = document.getElementById("pg-" + k); if (pg) { pg.classList.toggle("readonly", !OFFICER.can(k, "edit")); pg.dataset.ro = ro; } }
  if (!OFFICER.can(currentTab(), "view")) location.hash = "#" + (TABS.find((k) => OFFICER.can(k, "view")) || "events");
};
const OFFICER_PAGES = {};
const TABS = ["events", "ranking", "post", "watch", "scout", "views", "map", "bt", "board", "perms"];
const inited = {};
try { const th = localStorage.getItem("ks-theme"); if (th === "light" || th === "dark") document.documentElement.setAttribute("data-theme", th); } catch (e) {}
const SH = { ar: {"home": "الرئيسية", "pw": "🔒 كلمة مرور المسؤولين", "remember": "تذكّر على هذا الجهاز", "unlock": "فتح", "wrong": "كلمة مرور خاطئة", "loading": "جارٍ التحميل…", "discord": "تسجيل الدخول عبر Discord", "or": "— أو استخدم كلمة مرور المسؤولين —", "out": "تسجيل الخروج", "inSmall": "🔑 تسجيل الدخول عبر Discord", "e_no_access": "حسابك في Discord ليس في قائمة المسؤولين بعد. اسأل Sparrow.", "e_not_member": "انضم أولًا إلى خادم Discord الخاص بتحالفنا، ثم حاول مرة أخرى.", "e_cancelled": "تم إلغاء تسجيل الدخول عبر Discord.", "e_expired": "يرجى تسجيل الدخول مرة أخرى.", "e_logged_out": "يرجى تسجيل الدخول مرة أخرى.", "e_discord": "تعذّر الوصول إلى Discord — حاول مرة أخرى.", "e_discord_unreachable": "تعذّر الوصول إلى Discord — حاول مرة أخرى.", "e_setup": "نجح تسجيل الدخول عبر Discord، لكن الموقع لم يُجهَّز بالكامل بعد. استخدم كلمة مرور المسؤولين حاليًا."},
 pt: {"home": "Início", "pw": "🔒 Senha dos oficiais", "remember": "Lembrar neste aparelho", "unlock": "Desbloquear", "wrong": "Senha errada", "loading": "Carregando…", "discord": "Entrar com o Discord", "or": "— ou use a senha dos oficiais —", "out": "Sair", "inSmall": "🔑 Entrar com o Discord", "e_no_access": "Sua conta do Discord ainda não está na lista de oficiais. Fale com a Sparrow.", "e_not_member": "Entre primeiro no servidor do Discord da aliança e tente de novo.", "e_cancelled": "O login pelo Discord foi cancelado.", "e_expired": "Entre de novo, por favor.", "e_logged_out": "Entre de novo, por favor.", "e_discord": "Não foi possível conectar ao Discord — tente de novo.", "e_discord_unreachable": "Não foi possível conectar ao Discord — tente de novo.", "e_setup": "O login pelo Discord funcionou, mas o site ainda não está todo configurado. Use a senha dos oficiais por enquanto."},
 en: { home: "Home", pw: "🔒 Officer password", remember: "Remember on this device", unlock: "Unlock", wrong: "Wrong password", loading: "Loading…",
                   discord: "Log in with Discord", or: "— or use the officer password —", out: "Log out", inSmall: "🔑 Log in with Discord",
                   e_no_access: "Your Discord account isn't on the officer list yet. Ask Sparrow.", e_not_member: "Join our alliance Discord server first, then try again.",
                   e_cancelled: "Discord login was cancelled.", e_expired: "Please log in again.", e_logged_out: "Please log in again.",
                   e_discord: "Couldn't reach Discord — please try again.", e_discord_unreachable: "Couldn't reach Discord — please try again.",
                   e_setup: "Discord login worked, but the site isn't fully set up yet. Use the officer password for now." },
             zh: { home: "首頁", pw: "🔒 幹部密碼", remember: "在這台裝置記住", unlock: "解鎖", wrong: "密碼錯誤", loading: "載入中…",
                   discord: "用 Discord 登入", or: "— 或輸入幹部密碼 —", out: "登出", inSmall: "🔑 用 Discord 登入",
                   e_no_access: "你的 Discord 帳號還沒有幹部權限，請找 Sparrow。", e_not_member: "請先加入聯盟的 Discord 伺服器，再試一次。",
                   e_cancelled: "已取消 Discord 登入。", e_expired: "請重新登入。", e_logged_out: "請重新登入。",
                   e_discord: "連不上 Discord，請再試一次。", e_discord_unreachable: "連不上 Discord，請再試一次。",
                   e_setup: "Discord 登入成功，但網站還沒設定完成，請先用幹部密碼進入。" } };
/* ===== 🔑 Discord login (testing): the Worker checks who you are on our Discord server and hands back a sealed session ===== */
const AUTH_API = "https://nxs-ai.tapegirljoke.workers.dev", DISCORD_LS = "nxs-discord-v1";
/* still being tried out: the Discord buttons only show in a browser that opened this page once with ?discord (or is logged in) */
const DISCORD_TRY = (() => { try { if (/[?&]discord\b/.test(location.search)) localStorage.setItem("nxs-discord-try", "1");
  return !!localStorage.getItem("nxs-discord-try") || !!localStorage.getItem(DISCORD_LS) || /^#login/.test(location.hash); } catch (e) { return false; } })();
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
  document.getElementById("meName").textContent = u.name;
  const av = document.getElementById("meAv"); av.hidden = !u.avatar; if (u.avatar) av.src = u.avatar;
}
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
  setOfficerLang(OFFICER.lang); applyShared();
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
function currentTab() { const m = (location.hash || "").match(/^#(events|ranking|post|watch|scout|views|map|bt|board|perms)/); return m ? m[1] : "events"; }
async function showTab() {
  const k = currentTab();
  OFFICER.applyPerms();
  document.querySelectorAll(".tabs a").forEach((a) => a.classList.toggle("on", a.dataset.tab === k));
  for (const t of TABS) document.getElementById("pg-" + t).hidden = t !== k;
  const p = OFFICER_PAGES[k];
  if (!p) return;
  if (!inited[k]) { inited[k] = p.init(); }
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
  const ok = async (pw, tok) => { OFFICER.pw = pw; OFFICER.token = tok; await OfficerData.unlock(pw); document.getElementById("gate").hidden = true; showMe(); showTab(); };
  // 🔑 logged in with Discord: the Worker re-checks the list and gives the password to open the officer data
  let dtok = null; try { dtok = localStorage.getItem(DISCORD_LS); } catch (e) {}
  if (dtok) {
    const r = await discordMe(dtok);
    if (r.ok) {
      try { localStorage.setItem(DISCORD_LS, r.token); } catch (e) {}
      OFFICER.user = r.user;
      const s = officerStore(); if (!s.author) { s.author = r.user.name; try { localStorage.setItem(OFFICER_LS, JSON.stringify(s)); } catch (e) {} }
      const t = await checkPw(r.pw);
      if (t) return ok(r.pw, t);
      loginMsg = "setup";
    } else {
      if (["logged_out", "no_access", "not_member"].includes(r.error)) { try { localStorage.removeItem(DISCORD_LS); } catch (e) {} }
      if (r.error === "officer_password_missing") { OFFICER.user = r.user || null; loginMsg = "setup"; } else loginMsg = r.error || "discord";
    }
  }
  const st = officerStore(), tok = st.pw && await checkPw(st.pw);
  if (tok) return ok(st.pw, tok);
  const gate = document.getElementById("gate"), pwEl = document.getElementById("gatePw");
  gate.hidden = false;
  document.getElementById("gateDiscord").href = discordStart();
  applyShared();
  const go = async () => {
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
applyShared();
