// 只測試能不能抓到資料。紀錄（log）是公開的，所以只印「有沒有」和欄位名稱，不印任何人的數字。
const KEY = process.env.MIGHTPULSE_API_KEY;
const BASE = "https://api.mightpulse.com/v1";
const KID = 2189, TAG = "NXS";

async function get(path) {
  const res = await fetch(BASE + path, { headers: { Authorization: `Bearer ${KEY}` } });
  const body = await res.json().catch(() => null);
  return { status: res.status, body };
}

(async () => {
  if (!KEY) { console.log("❌ 找不到 MIGHTPULSE_API_KEY，請檢查 GitHub Secrets 的名稱"); process.exit(1); }

  const a = await get(`/alliances/${KID}/${TAG}?include=info,roster`);
  console.log(`聯盟名單：HTTP ${a.status}`);
  if (a.status !== 200) { console.log(a.status === 401 ? "❌ 金鑰無效" : "❌ 讀取失敗"); process.exit(1); }
  const members = a.body.members || a.body.roster || a.body.alliance?.members || [];
  console.log(`回傳的最上層欄位：${Object.keys(a.body).join(", ")}`);
  console.log(`✅ 成員數：${members.length}`);
  console.log(`成員欄位：${Object.keys(members[0] || {}).join(", ")}`);

  const sample = members.slice(0, 3);
  let withMystic = 0;
  for (const [i, m] of sample.entries()) {
    const p = await get(`/players/${m.governor_id}?include=base,ranks`);
    const r = p.body?.ranks || p.body?.player?.ranks || {};
    if (i === 0) console.log(`玩家回傳的最上層欄位：${Object.keys(p.body || {}).join(", ")}`);
    const has = r.mystic_trial != null;
    if (has) withMystic++;
    console.log(`玩家 ${i + 1}：HTTP ${p.status}｜資料年齡 ${p.body?.age_seconds ?? "?"} 秒｜秘境數字 ${has ? "有" : "沒有"}`);
    console.log(`   ranks 欄位：${Object.keys(r).join(", ")}`);
    console.log(`   榜單：${(r.leaderboards || []).map((b) => b.name).join(", ") || "（無）"}`);
  }
  console.log(`\n結果：名單 ✅｜抽樣 ${sample.length} 人中 ${withMystic} 人有秘境數字`);
})();
