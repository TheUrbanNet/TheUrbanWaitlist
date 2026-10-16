(() => {
  const contents = document.querySelector('.policy-page .contents');
  const links = Array.from(contents?.querySelectorAll('a[href^="#"]') ?? []);
  if (!links.length) return;

  const entries = links
    .map((link) => ({ link, section: document.getElementById(link.hash.slice(1)) }))
    .filter(({ section }) => section)
    .sort((a, b) =>
      a.section.compareDocumentPosition(b.section) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1
    );
  if (!entries.length) return;

  const first = entries[0];
  const last = entries[entries.length - 1];

  let activeLink;
  // A section the visitor asked for (deep link, hash change or contents click).
  // Sections near the end of a page are too short to ever reach the marker line,
  // so scrolling alone can't pick them; the request is honoured until the
  // visitor scrolls somewhere else.
  let pinned = null;
  let userIntent = false;
  let intentTimer;
  let frame = 0;

  // On short screens the contents list is taller than the window, so it scrolls
  // inside its own box. Keep the active item in view there without moving the page.
  function revealInContents(link) {
    if (contents.scrollHeight <= contents.clientHeight) return;
    const box = contents.getBoundingClientRect();
    const item = link.getBoundingClientRect();
    const gap = 16;
    let delta = 0;
    if (item.top < box.top + gap) delta = item.top - box.top - gap;
    else if (item.bottom > box.bottom - gap) delta = item.bottom - box.bottom + gap;
    if (!delta) return;
    const calm = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    contents.scrollTo({ top: contents.scrollTop + delta, behavior: calm ? 'auto' : 'smooth' });
  }

  function setActive(link) {
    if (!link || link === activeLink) return;
    links.forEach((item) => item.classList.toggle('active', item === link));
    activeLink = link;
    revealInContents(link);
  }

  function entryFromHash(hash = window.location.hash) {
    return entries.find(({ link }) => link.hash === hash);
  }

  // A section is "current" once its top passes this line. It sits just below the
  // sections' scroll-margin so a section scrolled to by a link always qualifies.
  function markerLine() {
    const margin = parseFloat(getComputedStyle(first.section).scrollMarginTop) || 0;
    return Math.max(window.innerHeight * 0.15, margin + 8);
  }

  function atPageBottom() {
    const doc = document.documentElement;
    return window.innerHeight + window.scrollY >= doc.scrollHeight - 2;
  }

  function sectionAtScrollPosition() {
    const marker = markerLine();
    const current =
      [...entries].reverse().find(({ section }) => section.getBoundingClientRect().top <= marker) ??
      first;
    // At the very bottom the final sections can't scroll up to the marker, so
    // the last one stands in for them.
    if (atPageBottom() && entries.indexOf(current) < entries.length - 1) {
      const tail = entries.slice(entries.indexOf(current) + 1);
      return tail.includes(pinned) ? pinned : last;
    }
    return current;
  }

  function update() {
    frame = 0;
    setActive((pinned ?? sectionAtScrollPosition()).link);
  }

  function schedule() {
    if (!frame) frame = requestAnimationFrame(update);
  }

  function pin(entry) {
    pinned = entry ?? null;
    schedule();
  }

  // Wheel, touch and keyboard input mean the visitor is steering; the next scroll
  // hands control back to the scroll position.
  function markUserIntent() {
    userIntent = true;
    clearTimeout(intentTimer);
    intentTimer = setTimeout(() => {
      userIntent = false;
    }, 200);
  }

  function handleScroll() {
    if (userIntent) pinned = null;
    schedule();
  }

  // Layout shifts when the viewport crosses the breakpoint (the contents move
  // between a sidebar and a block above the page), so a pin only survives if its
  // section is still on screen.
  function handleResize() {
    if (pinned) {
      const { top, bottom } = pinned.section.getBoundingClientRect();
      if (bottom < 0 || top > window.innerHeight) pinned = null;
    }
    schedule();
  }

  links.forEach((link) =>
    link.addEventListener('click', () => pin(entries.find((entry) => entry.link === link)))
  );
  window.addEventListener('hashchange', () => {
    const target = entryFromHash();
    if (target) pin(target); // an unknown hash leaves the current highlight alone
  });
  window.addEventListener('scroll', handleScroll, { passive: true });
  window.addEventListener('resize', handleResize);
  window.addEventListener('wheel', markUserIntent, { passive: true });
  window.addEventListener('touchstart', markUserIntent, { passive: true });
  window.addEventListener('keydown', markUserIntent);
  window.addEventListener('load', schedule);

  const desktop = window.matchMedia('(min-width: 900px)');
  if (desktop.addEventListener) {
    desktop.addEventListener('change', handleResize);
  } else {
    desktop.addListener(handleResize);
  }

  // Missing or unknown hash: pin stays empty, so the highlight follows the scroll
  // position, which is the first section on a fresh load.
  pinned = entryFromHash() ?? null;
  setActive((pinned ?? first).link);
  schedule();
})();
