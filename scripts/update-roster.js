// 手動執行：從 MightPulse 抓 NXS 的成員名單和每個人的秘境數字，存成 data/roster-x7k2p9.json
// 紀錄（log）是公開的，所以這裡不印任何人的數字。
const fs = require("fs");
const KEY = process.env.MIGHTPULSE_API_KEY;
const BASE = "https://api.mightpulse.com/v1";
const KID = 2189, TAG = "NXS";
const OUT = "data/roster-x7k2p9.json";
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function get(path) {
  for (let attempt = 1; attempt <= 4; attempt++) {
    const res = await fetch(BASE + path, { headers: { Authorization: `Bearer ${KEY}` } });
    if (res.status === 429) { console.log("  達到每分鐘上限，等 60 秒…"); await sleep(60000); continue; }
    const body = await res.json().catch(() => null);
    return { status: res.status, body };
  }
  return { status: 429, body: null };
}

(async () => {
  if (!KEY) { console.log("❌ 找不到 MIGHTPULSE_API_KEY"); process.exit(1); }

  const a = await get(`/alliances/${KID}/${TAG}?include=info,roster`);
  if (a.status !== 200 || !a.body?.members) { console.log(`❌ 聯盟名單讀取失敗：HTTP ${a.status}`); process.exit(1); }
  const members = a.body.members;
  console.log(`✅ 聯盟名單：${members.length} 人`);

  const out = [];
  let ok = 0;
  for (const [i, m] of members.entries()) {
    const p = await get(`/players/${m.governor_id}?include=base,ranks`);
    const r = (p.status === 200 && p.body?.ranks) || {};
    if (r.mystic_trial != null) ok++;
    out.push({
      id: m.governor_id,
      name: m.nick_name,
      power: m.power ?? null,
      tc: m.town_center_level ?? null,
      rank: m.alliance_rank_label || (m.alliance_rank != null ? `R${m.alliance_rank}` : ""),
      lastActive: m.last_active_at ?? null,
      mystic: r.mystic_trial ?? null,
      mysticRank: r.mystic_rank ?? null,
    });
    if ((i + 1) % 20 === 0) console.log(`  已處理 ${i + 1}/${members.length}`);
    await sleep(1100); // 每分鐘最多 60 次
  }

  const al = a.body.alliance || {};
  fs.writeFileSync(OUT, JSON.stringify({
    updated: new Date().toISOString(),
    alliance: { kid: KID, tag: TAG, name: al.name || "", power: al.power ?? null, count: members.length },
    members: out,
  }, null, 1) + "\n");
  console.log(`✅ 完成：${out.length} 人，其中 ${ok} 人有秘境數字`);
})();
