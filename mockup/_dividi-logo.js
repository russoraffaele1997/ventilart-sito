// Divide il logo nei singoli pannelli (con i loro fori di fissaggio) per il preloader.
// Non cambia nessuna coordinata: separa solo i sotto-tracciati del file originale.
const fs = require("fs");
const svg = fs.readFileSync(process.argv[2], "utf8");
const paths = [...svg.matchAll(/<path fill="(#[0-9A-F]+)"(?: fill-rule="evenodd")? d="([^"]+)"/g)];

function bbox(d) {
  const n = d.match(/-?\d+(\.\d+)?/g).map(Number);
  let x0 = 1e9, y0 = 1e9, x1 = -1e9, y1 = -1e9;
  for (let i = 0; i + 1 < n.length; i += 2) {
    x0 = Math.min(x0, n[i]); x1 = Math.max(x1, n[i]);
    y0 = Math.min(y0, n[i + 1]); y1 = Math.max(y1, n[i + 1]);
  }
  return { x0, y0, x1, y1, w: x1 - x0, h: y1 - y0 };
}

const out = { pannelli: [], scritta: [] };
paths.forEach(([, fill, d], pi) => {
  const subs = d.split(/(?=M)/).map((s) => ({ d: s.trim(), b: bbox(s) }));
  if (pi === 2) { out.vRossa = { fill, d }; return; } // la V rossa della scritta
  const grandi = subs.filter((s) => s.b.w > 40 || s.b.h > 40);
  const piccoli = subs.filter((s) => !(s.b.w > 40 || s.b.h > 40));
  for (const g of grandi) {
    if (g.b.y0 > 1000) out.scritta.push(g.d);
    else out.pannelli.push({ fill, d: [g.d], b: g.b });
  }
  for (const p of piccoli) {
    const cx = (p.b.x0 + p.b.x1) / 2, cy = (p.b.y0 + p.b.y1) / 2;
    if (p.b.y0 > 1000) { out.scritta.push(p.d); continue; }
    const mieiPannelli = out.pannelli.filter((q) => q.fill === fill);
    let best = mieiPannelli.find((q) => cx >= q.b.x0 && cx <= q.b.x1 && cy >= q.b.y0 && cy <= q.b.y1);
    if (!best) best = mieiPannelli.reduce((a, q) => {
      const dist = Math.hypot(cx - (q.b.x0 + q.b.x1) / 2, cy - (q.b.y0 + q.b.y1) / 2);
      return !a || dist < a.dist ? { q, dist } : a;
    }, null).q;
    best.d.push(p.d);
  }
});
out.pannelli.forEach((p) => console.error(p.fill, Math.round(p.b.x0), Math.round(p.b.y0), Math.round(p.b.w) + "x" + Math.round(p.b.h), "sotto-tracciati:", p.d.length));
console.error("scritta:", out.scritta.length);
fs.writeFileSync(process.argv[3], JSON.stringify(out));
