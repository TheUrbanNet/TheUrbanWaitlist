/* Cookie consent and analytics, shared by every page.
 *
 * The site sets no cookies of its own. The only optional extra is Cloudflare
 * Web Analytics, which is cookieless but still only loads once a visitor has
 * pressed "Accept" on the landing page banner. The choice itself is kept in
 * localStorage under STORAGE_KEY, which is the one strictly necessary item
 * the Cookie Policy describes.
 *
 * Load this file on every page so a visitor who accepted is counted on the
 * forms and policy pages too, not just the landing page.
 */
(function () {
  const STORAGE_KEY = "theurbannet-cookie-consent";

  /* Cloudflare Web Analytics site token (Web Analytics > Add a site > manual
     JS snippet, copy the "token" value). While this is empty, accepting only
     records the choice and nothing is loaded. */
  const ANALYTICS_TOKEN = "";

  const ANALYTICS_SRC = "https://static.cloudflareinsights.com/beacon.min.js";

  function getChoice() {
    try {
      return localStorage.getItem(STORAGE_KEY);
    } catch (error) {
      /* Private browsing and blocked storage both throw here. Treated as
         "not answered yet", so nothing optional loads. */
      return null;
    }
  }

  function loadAnalytics() {
    if (!ANALYTICS_TOKEN || document.querySelector("script[data-cf-beacon]")) {
      return;
    }

    const script = document.createElement("script");
    script.defer = true;
    script.src = ANALYTICS_SRC;
    script.dataset.cfBeacon = JSON.stringify({ token: ANALYTICS_TOKEN });
    document.head.appendChild(script);
  }

  /* "accepted" or "declined". Declining after accepting takes effect from the
     next page load, because a loaded script cannot be unloaded. */
  function setChoice(choice) {
    try {
      localStorage.setItem(STORAGE_KEY, choice);
    } catch (error) {
      /* Nothing to do: the choice still applies for this page view. */
    }

    if (choice === "accepted") {
      loadAnalytics();
    }
  }

  if (getChoice() === "accepted") {
    loadAnalytics();
  }

  window.TheUrbanNetConsent = { getChoice, setChoice };
})();
