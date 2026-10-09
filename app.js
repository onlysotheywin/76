// Результаты первого этапа по специальности «Программирование» из предоставленного PDF.
// Данные о группах и результатах этапов 2–3 в источнике отсутствуют, поэтому не подменяем их вымышленными значениями.
const criteria = [
  { key: "html", label: "HTML", max: 3 },
  { key: "semantics", label: "Семантика", max: 3 },
  { key: "navigation", label: "Навигация", max: 3 },
  { key: "responsive", label: "Адаптивность", max: 4 },
  { key: "design", label: "Дизайн", max: 4 },
  { key: "scenario", label: "Сценарий", max: 6 },
  { key: "jsReact", label: "JS/React", max: 3 },
  { key: "animation", label: "Анимации", max: 2 },
  { key: "structure", label: "Структура", max: 2 },
];
const stage1Results = [
  { name: "Волчок Дмитрий", group: "—", specialty: "Программирование", html: 3, semantics: 3, navigation: 3, responsive: 4, design: 4, scenario: 6, jsReact: 3, animation: 2, structure: 2, points: 30, percent: 100 },
  { name: "Минюк Денис", group: "—", specialty: "Программирование", html: 3, semantics: 3, navigation: 3, responsive: 3.5, design: 4, scenario: 6, jsReact: 3, animation: 2, structure: 2, points: 29.5, percent: 98.3 },
  { name: "Федосюк Андрей", group: "—", specialty: "Программирование", html: 3, semantics: 3, navigation: 3, responsive: 4, design: 3.5, scenario: 6, jsReact: 0, animation: 1.5, structure: 2, points: 26, percent: 86.7 },
  { name: "Сенкевич Василий", group: "—", specialty: "Программирование", html: 3, semantics: 2.5, navigation: 3, responsive: 3.5, design: 3.5, scenario: 5, jsReact: 3, animation: 1.5, structure: 2, points: 27, percent: 90 },
  { name: "Притульский Владислав", group: "—", specialty: "Программирование", html: 3, semantics: 2.5, navigation: 3, responsive: 3.5, design: 4, scenario: 5.5, jsReact: 1.5, animation: 2, structure: 1, points: 26, percent: 86.7 },
  { name: "Кратюк Матвей", group: "—", specialty: "Программирование", html: 3, semantics: 2.5, navigation: 2.5, responsive: 3.5, design: 3.5, scenario: 5, jsReact: 3, animation: 1.5, structure: 1.5, points: 26, percent: 86.7 },
  { name: "Бойко Антон", group: "—", specialty: "Программирование", html: 3, semantics: 3, navigation: 2.5, responsive: 3.5, design: 3.5, scenario: 5, jsReact: 3, animation: 1.5, structure: 1.5, points: 26, percent: 86.7 },
  { name: "Климук Яна", group: "—", specialty: "Программирование", html: 3, semantics: 3, navigation: 3, responsive: 3.5, design: 3.5, scenario: 5.5, jsReact: 1.5, animation: 1, structure: 1.5, points: 25, percent: 83.3 },
  { name: "Бабинец Анастасия", group: "—", specialty: "Программирование", html: 2.5, semantics: 3, navigation: 2.5, responsive: 3, design: 2.5, scenario: 2, jsReact: 0, animation: 0, structure: 1, points: 16.5, percent: 55 },
  { name: "Кузьмич Глеб", group: "—", specialty: "Программирование", html: 3, semantics: 3, navigation: 3, responsive: 4, design: 4, scenario: 6, jsReact: 3, animation: 2, structure: 2, points: 30, percent: 100 },
];
// Для общего списка отображаем подтверждённые баллы первого этапа. Данные этапов 2 и 3 не представлены в PDF.
const demoParticipants = stage1Results.map(p => ({ ...p, s1: p.points, s2: null, s3: null }));
const specialties = ["Программирование", "Правоведение", "Логистика", "Экономика"];
const total = p => p.points ?? (p.s1 + (p.s2 || 0) + (p.s3 || 0));
const initials = name => name.split(" ").slice(0,2).map(w => w[0]).join("").toUpperCase();
const esc = value => String(value).replace(/[&<>"']/g, ch => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[ch]));
const fmt = n => Number.isInteger(n) ? String(n) : n.toFixed(1);
function participantRows(items) {
  return items.map(p=>`<tr><td><div class="person"><span class="avatar">${esc(initials(p.name))}</span><strong>${esc(p.name)}</strong></div></td><td>${esc(p.group)}</td><td>${esc(p.specialty)}</td><td>${fmt(p.s1)}</td><td>${p.s2 == null ? "—" : fmt(p.s2)}</td><td>${p.s3 == null ? "—" : fmt(p.s3)}</td><td class="points">${fmt(total(p))}</td></tr>`).join("");
}
function renderParticipants() {
  const tbody = document.querySelector("#participants-body");
  if (!tbody) return;
  const search = document.querySelector("#participant-search");
  const specialty = document.querySelector("#specialty-filter");
  const sort = document.querySelector("#sort-filter");
  const group = document.querySelector("#group-filter");
  const empty = document.querySelector("#empty-state");
  const update = () => {
    let rows = [...demoParticipants];
    const q = search.value.trim().toLocaleLowerCase("ru");
    if (q) rows = rows.filter(p => [p.name,p.group,p.specialty].some(v=>v.toLocaleLowerCase("ru").includes(q)));
    if (specialty.value) rows = rows.filter(p=>p.specialty===specialty.value);
    if (group && group.value.trim()) rows = rows.filter(p=>p.group.toLocaleLowerCase("ru").includes(group.value.trim().toLocaleLowerCase("ru")));
    if (sort.value==="name-asc") rows.sort((a,b)=>a.name.localeCompare(b.name,"ru"));
    if (sort.value==="name-desc") rows.sort((a,b)=>b.name.localeCompare(a.name,"ru"));
    if (sort.value==="points-asc") rows.sort((a,b)=>total(a)-total(b) || a.name.localeCompare(b.name,"ru"));
    if (sort.value==="points-desc") rows.sort((a,b)=>total(b)-total(a) || a.name.localeCompare(b.name,"ru"));
    tbody.innerHTML = participantRows(rows);
    if (empty) empty.style.display = rows.length ? "none" : "block";
  };
  [search,specialty,sort,group].filter(Boolean).forEach(el=>el.addEventListener("input",update));
  update();
}
function renderStage1Results() {
  const tbody = document.querySelector("#stage1-results-body");
  if (!tbody) return;
  const sorted = [...stage1Results].sort((a,b)=>b.points-a.points || a.name.localeCompare(b.name,"ru"));
  let previousPoints = null, place = 0;
  tbody.innerHTML = sorted.map((p,i)=>{
    if (p.points !== previousPoints) place = i + 1;
    previousPoints = p.points;
    const cells = criteria.map(c=>`<td>${fmt(p[c.key])}</td>`).join("");
    return `<tr class="${place <= 3 ? `top-row top-${place}` : ""}"><td>${place <= 3 ? ["🥇","🥈","🥉"][place-1] : place}</td><td><div class="person"><span class="avatar">${esc(initials(p.name))}</span><strong>${esc(p.name)}</strong></div></td>${cells}<td class="points">${fmt(p.points)} / 30</td><td><span class="percent-pill">${fmt(p.percent)}%</span></td></tr>`;
  }).join("");
  const count = document.querySelector("#stage1-participant-count");
  if (count) count.textContent = stage1Results.length;
  const average = document.querySelector("#stage1-average");
  if (average) average.textContent = (stage1Results.reduce((sum,p)=>sum+p.points,0)/stage1Results.length).toFixed(1);
  const best = document.querySelector("#stage1-best");
  if (best) best.textContent = `${Math.max(...stage1Results.map(p=>p.points))} / 30`;
}
function renderRanking() {
  const tbody = document.querySelector("#ranking-body");
  if (!tbody) return;
  const specialty = document.querySelector("#ranking-specialty");
  const render = () => {
    const rows = stage1Results.filter(p=>!specialty.value || p.specialty===specialty.value).sort((a,b)=>b.points-a.points || a.name.localeCompare(b.name,"ru"));
    let previousPoints = null, place = 0;
    tbody.innerHTML = rows.map((p,i)=>{
      if (p.points !== previousPoints) place = i + 1;
      previousPoints = p.points;
      return `<tr><td>${place}</td><td><div class="person"><span class="avatar">${esc(initials(p.name))}</span><strong>${esc(p.name)}</strong></div></td><td>${esc(p.group)}</td><td>${fmt(p.points)} / 30</td><td><span class="percent-pill">${fmt(p.percent)}%</span></td><td><span class="pill ${place<=3?'pill-pink':''}">${place<=3?'Топ-3':'Участник'}</span></td></tr>`;
    }).join("");
    const podium = document.querySelector("#podium");
    if (podium) {
      const top = rows.slice(0,3);
      podium.innerHTML = top.map((p,i)=>`<article class="podium ${i===0?'first':''}"><div class="medal">${["🥇","🥈","🥉"][i]}</div><div class="avatar">${esc(initials(p.name))}</div><h3>${esc(p.name)}</h3><p>Программирование</p><div class="score">${fmt(p.points)} <small style="font-size:10px">из 30</small></div><p>${fmt(p.percent)}%</p></article>`).join("");
    }
  };
  if (specialty) specialty.addEventListener("change",render);
  render();
}
function showToast(message) {
  const toast = document.querySelector(".toast");
  if (toast) { toast.textContent=message; toast.style.display="block"; }
}
document.addEventListener("DOMContentLoaded",()=>{
  const current = location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll("[data-nav]").forEach(a=>{if(a.dataset.nav===current)a.classList.add("active");});
  renderParticipants(); renderRanking(); renderStage1Results();
  document.querySelectorAll("[data-demo-form]").forEach(form=>form.addEventListener("submit",e=>{
    e.preventDefault();
    if(form.id==="login-form") showToast("Это демонстрационный макет: подключите серверную авторизацию для реального входа.");
    else showToast("Данные проверены в демонстрационном интерфейсе. Для сохранения подключите REST API.");
  }));
  document.querySelectorAll("[data-stage-result]").forEach(btn=>btn.addEventListener("click",()=>location.href="results.html"));
});
