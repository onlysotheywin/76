// Общие header.html и footer.html хранятся отдельными файлами.
// Для локального запуска через file:// используем одинаковую разметку как fallback,
// потому что fetch() в некоторых браузерах не работает без локального сервера.
const headerFallback = `<header class="site-header"><div class="header-inner"><a class="brand" href="index.html"><span class="brand-mark">C</span><span><span class="brand-name">Система управления</span><span class="brand-subtitle">соревнования</span></span></a><nav class="main-nav" aria-label="Основная навигация"><a href="index.html" data-nav="index.html">Главная</a><a href="list.html" data-nav="list.html">Участники</a><a href="stages.html" data-nav="stages.html">Этапы</a><a href="results.html" data-nav="results.html">Рейтинг</a></nav><a class="button header-login" href="admin.html">Войти ↗</a></div></header>`;
const footerFallback = `<footer class="site-footer"><div class="footer-inner"><div><div class="footer-brand">Система управления соревнованиями</div><div class="footer-copy">Учебный проект · 2026</div></div><div class="footer-links"><a href="index.html">Главная</a><a href="list.html">Участники</a><a href="stages.html">Этапы</a><a href="results.html">Рейтинг</a></div><div class="footer-copy">Соревнуйся. Развивайся. Побеждай.</div></div></footer>`;
document.addEventListener("DOMContentLoaded", async () => {
  const header = document.querySelector("#header"), footer = document.querySelector("#footer");
  if (header) { try { const r=await fetch("header.html"); header.innerHTML=r.ok?await r.text():headerFallback; } catch { header.innerHTML=headerFallback; } }
  if (footer) { try { const r=await fetch("footer.html"); footer.innerHTML=r.ok?await r.text():footerFallback; } catch { footer.innerHTML=footerFallback; } }
  const current = location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll("[data-nav]").forEach(a=>{if(a.dataset.nav===current)a.classList.add("active");});
});
