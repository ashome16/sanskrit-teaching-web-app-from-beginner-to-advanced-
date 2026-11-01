// Lightweight pañcāṅga (vāra, tithi, pakṣa, nakṣatra) for IST, using low-precision
// Meeus solar/lunar longitude formulae + Lahiri ayanāṃśa. Accurate to roughly ±1 tithi/nakṣatra boundary hour.
const VARA = ['Ravivāra','Somavāra','Maṅgalavāra','Budhavāra','Guruvāra','Śukravāra','Śanivāra'];
const VARA_SA = ['रविवासरः','सोमवासरः','मङ्गलवासरः','बुधवासरः','गुरुवासरः','शुक्रवासरः','शनिवासरः'];
const TITHI = ['Pratipadā','Dvitīyā','Tṛtīyā','Caturthī','Pañcamī','Ṣaṣṭhī','Saptamī','Aṣṭamī','Navamī','Daśamī','Ekādaśī','Dvādaśī','Trayodaśī','Caturdaśī'];
const NAK = ['Aśvinī','Bharaṇī','Kṛttikā','Rohiṇī','Mṛgaśirā','Ārdrā','Punarvasu','Puṣya','Āśleṣā','Maghā','Pūrva Phalgunī','Uttara Phalgunī','Hasta','Citrā','Svātī','Viśākhā','Anurādhā','Jyeṣṭhā','Mūla','Pūrvāṣāḍhā','Uttarāṣāḍhā','Śravaṇa','Dhaniṣṭhā','Śatabhiṣā','Pūrva Bhādrapadā','Uttara Bhādrapadā','Revatī'];
const r = (d: number) => (d * Math.PI) / 180;
const n360 = (x: number) => ((x % 360) + 360) % 360;
function lons(date: Date) {
  const d = date.getTime() / 86400000 + 2440587.5 - 2451545.0;
  const T = d / 36525;
  const L0 = n360(280.46646 + 36000.76983 * T), M = n360(357.52911 + 35999.05029 * T);
  const sun = n360(L0 + (1.914602 - 0.004817 * T) * Math.sin(r(M)) + 0.019993 * Math.sin(r(2 * M)) + 0.000289 * Math.sin(r(3 * M)));
  const Lp = n360(218.3164477 + 481267.88123421 * T), D = n360(297.8501921 + 445267.1114034 * T);
  const Mp = n360(134.9633964 + 477198.8675055 * T), F = n360(93.272095 + 483202.0175233 * T);
  const moon = n360(Lp + 6.288774 * Math.sin(r(Mp)) + 1.274027 * Math.sin(r(2 * D - Mp)) + 0.658314 * Math.sin(r(2 * D))
    + 0.213618 * Math.sin(r(2 * Mp)) - 0.185116 * Math.sin(r(M)) - 0.114332 * Math.sin(r(2 * F))
    + 0.058793 * Math.sin(r(2 * D - 2 * Mp)) + 0.057066 * Math.sin(r(2 * D - M - Mp)) + 0.053322 * Math.sin(r(2 * D + Mp))
    + 0.045758 * Math.sin(r(2 * D - M)) - 0.040923 * Math.sin(r(M - Mp)) - 0.03472 * Math.sin(r(D)) - 0.030383 * Math.sin(r(M + Mp)));
  const ayan = 23.853 + 0.013969 * (d / 365.25); // Lahiri approx
  return { sun, moon, ayan };
}
export function istDateKey(now = new Date()) {
  return new Date(now.getTime() + 330 * 60000).toISOString().slice(0, 10);
}
export function getPanchanga(now = new Date()) {
  const ist = new Date(now.getTime() + 330 * 60000);
  const w = ist.getUTCDay();
  const { sun, moon, ayan } = lons(now);
  const t = Math.floor(n360(moon - sun) / 12); // 0..29
  const shukla = t < 15;
  const idx = t % 15;
  const tithi = idx === 14 ? (shukla ? 'Pūrṇimā' : 'Amāvāsyā') : TITHI[idx];
  const nak = NAK[Math.floor(n360(moon - ayan) / (360 / 27))];
  return { vara: VARA[w], varaSa: VARA_SA[w], tithi, paksha: shukla ? 'Śukla' : 'Kṛṣṇa', nakshatra: nak };
}
const KEY = 'bodhi-panchanga-greeted';
export function dailyPanchangaGreeting(): string | null {
  try {
    const k = istDateKey();
    if (localStorage.getItem(KEY) === k) return null;
    localStorage.setItem(KEY, k);
  } catch { /* storage blocked: still greet */ }
  const p = getPanchanga();
  return `शुभं दिनम्! Today is ${p.varaSa} (${p.vara}) · ${p.paksha} ${p.tithi} · ${p.nakshatra} nakṣatra. May your learning shine today! 🌅`;
}
