export function toISO(d) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

export function addDays(d, n) {
  const x = new Date(d);
  x.setDate(x.getDate() + n);
  return x;
}

export function daysList(start, count) {
  return Array.from({ length: count }, (_, i) => addDays(start, i));
}

export function dayName(d) {
  return d.toLocaleDateString("ar-EG", { weekday: "long" });
}

export function dateText(d) {
  return d.toLocaleDateString("ar-EG", { day: "numeric", month: "long", year: "numeric" });
}

export function formatTime(t) {
  if (!t) return "";
  const [h, m] = t.split(":").map(Number);
  const period = h >= 12 ? "م" : "ص";
  const h12 = h % 12 === 0 ? 12 : h % 12;
  return `${h12}:${String(m).padStart(2, "0")} ${period}`;
}
