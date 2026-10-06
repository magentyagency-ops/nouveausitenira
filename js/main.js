(() => {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* Nav shadow on scroll */
  const nav = $('#nav');
  const onScroll = () => nav.classList.toggle('is-scrolled', window.scrollY > 8);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* Dropdowns: hover on desktop, click/keyboard everywhere */
  const dds = $$('.dd');
  const closeAll = (except) => dds.forEach((d) => {
    if (d === except) return;
    d.classList.remove('is-open');
    $('.dd__trigger', d).setAttribute('aria-expanded', 'false');
  });
  dds.forEach((dd) => {
    const trigger = $('.dd__trigger', dd);
    let t;
    const open = () => { clearTimeout(t); closeAll(dd); dd.classList.add('is-open'); trigger.setAttribute('aria-expanded', 'true'); };
    const close = () => { t = setTimeout(() => { dd.classList.remove('is-open'); trigger.setAttribute('aria-expanded', 'false'); }, 120); };
    dd.addEventListener('mouseenter', open);
    dd.addEventListener('mouseleave', close);
    trigger.addEventListener('click', () => (dd.classList.contains('is-open') ? (dd.classList.remove('is-open'), trigger.setAttribute('aria-expanded', 'false')) : open()));
    $$('a', dd).forEach((a) => a.addEventListener('click', () => closeAll()));
  });
  document.addEventListener('click', (e) => { if (!e.target.closest('.dd')) closeAll(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeAll(); });

  /* Mobile menu */
  const burger = $('.nav__burger');
  const mobile = $('#mobile-menu');
  const setMobile = (open) => {
    mobile.hidden = !open;
    burger.setAttribute('aria-expanded', String(open));
    burger.setAttribute('aria-label', open ? 'Fermer le menu' : 'Ouvrir le menu');
    $('use', burger).setAttribute('href', open ? '#i-close' : '#i-menu');
  };
  burger.addEventListener('click', () => setMobile(mobile.hidden));
  $$('a', mobile).forEach((a) => a.addEventListener('click', () => setMobile(false)));

  /* How-it-works tabs */
  const befores = [
    'Chaque facture était recopiée à la main.',
    'Les demandes attendaient dans une boîte mail.',
    'Les questions s\'empilaient sans réponse.',
    'Les relances étaient oubliées ou faites trop tard.',
    'Chaque réponse demandait des jours de copier-coller.',
    'L\'équipe jonglait entre 4 outils en même temps.',
  ];
  const tabs = $$('.tab');
  const panels = $$('.steps[data-panel]');
  const before = $('#how-before');
  const selectTab = (i) => {
    tabs.forEach((t, j) => { t.classList.toggle('is-active', i === j); t.setAttribute('aria-selected', String(i === j)); t.tabIndex = i === j ? 0 : -1; });
    panels.forEach((p, j) => { p.hidden = i !== j; });
    // keep the active tab visible when the tab bar scrolls (mobile)
    const bar = tabs[i].parentElement;
    if (bar.scrollWidth > bar.clientWidth) bar.scrollTo({ left: tabs[i].offsetLeft - (bar.clientWidth - tabs[i].offsetWidth) / 2, behavior: reduced ? 'auto' : 'smooth' });
    before.style.opacity = 0;
    setTimeout(() => { before.innerHTML = `<b>Avant</b> ${befores[i]}`; before.style.opacity = 1; }, reduced ? 0 : 180);
  };
  tabs.forEach((t, i) => {
    t.addEventListener('click', () => selectTab(i));
    t.addEventListener('keydown', (e) => {
      if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
      const n = (i + (e.key === 'ArrowRight' ? 1 : tabs.length - 1)) % tabs.length;
      tabs[n].focus(); selectTab(n);
    });
  });

  /* Testimonials carousel */
  const quotes = $$('.quote');
  const chips = $$('.qchip');
  let q = 0, timer;
  const showQuote = (i) => {
    q = (i + quotes.length) % quotes.length;
    quotes.forEach((el, j) => el.classList.toggle('is-on', j === q));
    chips.forEach((el, j) => el.classList.toggle('is-on', j === q));
  };
  const auto = () => { clearInterval(timer); if (!reduced) timer = setInterval(() => showQuote(q + 1), 7000); };
  $('.quotes__nav--prev').addEventListener('click', () => { showQuote(q - 1); auto(); });
  $('.quotes__nav--next').addEventListener('click', () => { showQuote(q + 1); auto(); });
  chips.forEach((c) => c.addEventListener('click', () => { showQuote(+c.dataset.go); auto(); }));
  auto();

  /* FAQ: one open at a time */
  const details = $$('.faq details');
  details.forEach((d) => d.addEventListener('toggle', () => { if (d.open) details.forEach((o) => o !== d && (o.open = false)); }));

  /* Counters */
  const count = (el) => {
    const end = +el.dataset.count, pre = el.dataset.prefix || '', suf = el.dataset.suffix || '';
    if (reduced) { el.textContent = pre + end + suf; return; }
    const t0 = performance.now(), dur = 1400;
    const tick = (t) => {
      const p = Math.min(1, (t - t0) / dur), v = Math.round(end * (1 - Math.pow(1 - p, 3)));
      el.textContent = pre + v + suf;
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };

  /* Reveal on scroll */
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => entries.forEach((e) => {
      if (!e.isIntersecting) return;
      e.target.classList.add('is-in');
      $$('[data-count]', e.target).forEach(count);
      io.unobserve(e.target);
    }), { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
    $$('.reveal').forEach((el) => io.observe(el));
  } else {
    $$('.reveal').forEach((el) => el.classList.add('is-in'));
  }

  /* Video modals */
  const openVideoBtns = $$('.js-open-video');
  const closeVideoBtns = $$('.js-close-video');

  const openVideoModal = (e) => {
    if (e) e.preventDefault();
    const btn = e.currentTarget;
    let targetId = btn.getAttribute('aria-controls');
    if (!targetId) {
      const href = btn.getAttribute('href');
      targetId = href ? href.replace('#', '') : 'video-modal';
    }
    const modal = document.getElementById(targetId);
    if (!modal) return;
    
    modal.removeAttribute('hidden');
    void modal.offsetWidth;
    modal.classList.add('is-open');
    document.body.style.overflow = 'hidden';
    
    const videoPlayer = $('video', modal);
    if (videoPlayer) {
      videoPlayer.currentTime = 0;
      const playPromise = videoPlayer.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {});
      }
    }
  };

  const closeVideoModal = (e) => {
    let modal;
    if (e && e.currentTarget) {
      modal = e.currentTarget.closest('.video-modal');
    }
    if (!modal) {
      modal = $('.video-modal.is-open');
    }
    if (!modal) return;
    
    modal.classList.remove('is-open');
    document.body.style.overflow = '';
    const videoPlayer = $('video', modal);
    if (videoPlayer) {
      videoPlayer.pause();
    }
    setTimeout(() => {
      if (!modal.classList.contains('is-open')) {
        modal.setAttribute('hidden', '');
      }
    }, 250);
  };

  openVideoBtns.forEach((btn) => btn.addEventListener('click', openVideoModal));
  closeVideoBtns.forEach((btn) => btn.addEventListener('click', closeVideoModal));

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      const openModal = $('.video-modal.is-open');
      if (openModal) closeVideoModal({ currentTarget: openModal });
    }
  });


  /* Projects map: a still world map that covers its frame; picking a country lights it up and shows its project */
  const geoRoot = $('.geo');
  if (geoRoot) {
    const stage = $('.geo__stage', geoRoot);
    const canvas = $('.geo__canvas', stage);
    const pins = $$('.geo__pin', stage);
    const ids = pins.map((p) => p.dataset.id);
    const tabs = $$('.geo__tab', geoRoot);
    const count = $('.geo__count b', geoRoot);
    const RATIO = 380.6 / 1000; // svg viewBox height / width
    let current = 0;

    // size the map to cover the frame, centred on the projects
    const fit = () => {
      const W = stage.clientWidth, H = stage.clientHeight;
      const cw = Math.max(W, H / RATIO), ch = cw * RATIO;
      const xs = pins.map((p) => parseFloat(p.style.left) / 100 * cw);
      const ys = pins.map((p) => parseFloat(p.style.top) / 100 * ch);
      const cx = (Math.min(...xs) + Math.max(...xs)) / 2, cy = (Math.min(...ys) + Math.max(...ys)) / 2;
      const tx = Math.min(0, Math.max(W - cw, W / 2 - cx));
      const ty = Math.min(0, Math.max(H - ch, H / 2 - cy));
      canvas.style.width = `${cw}px`;
      canvas.style.transform = `translate(${tx}px, ${ty}px)`;
    };

    const select = (i) => {
      current = (i + ids.length) % ids.length;
      const id = ids[current];
      $$('.geo__country, .geo__arcs path, .geo__pin', stage).forEach((el) => el.classList.toggle('is-active', el.dataset.id === id));
      $$('.case', geoRoot).forEach((el) => { el.hidden = el.dataset.id !== id; });
      tabs.forEach((t) => { const on = t.dataset.id === id; t.classList.toggle('is-active', on); t.setAttribute('aria-pressed', on); });
      count.textContent = String(current + 1).padStart(2, '0');
      // replay the arc draw
      $$('.geo__arcs path.is-active', stage).forEach((a) => { a.style.animation = 'none'; a.getBoundingClientRect(); a.style.animation = ''; });
    };

    pins.forEach((p, i) => p.addEventListener('click', () => select(i)));
    $$('.geo__country', stage).forEach((c) => c.addEventListener('click', () => select(ids.indexOf(c.dataset.id))));
    tabs.forEach((t) => t.addEventListener('click', () => select(ids.indexOf(t.dataset.id))));
    $$('.geo__arrow', geoRoot).forEach((b) => b.addEventListener('click', () => select(current + Number(b.dataset.dir))));
    $('.geo__layout', geoRoot).addEventListener('keydown', (e) => {
      if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return;
      e.preventDefault();
      select(current + (e.key === 'ArrowRight' ? 1 : -1));
      tabs[current].focus();
    });

    let rz;
    window.addEventListener('resize', () => { cancelAnimationFrame(rz); rz = requestAnimationFrame(fit); }, { passive: true });
    fit();
    select(0);
  }

  $('#year').textContent = new Date().getFullYear();
})();
