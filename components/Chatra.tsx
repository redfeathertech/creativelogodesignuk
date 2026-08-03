import Script from "next/script";

/**
 * Chatra live chat, ported from the Laravel site. Loaded lazily on first
 * user interaction (or after an idle/timeout fallback) so it never competes
 * with the critical rendering path.
 */
export default function Chatra() {
  const chatraId = process.env.NEXT_PUBLIC_CHATRA_ID;
  if (!chatraId) return null;

  return (
    <>
      <Script id="chatra-init" strategy="afterInteractive">
        {`window.ChatraID = ${JSON.stringify(chatraId)};
window.Chatra = window.Chatra || function () { (window.Chatra.q = window.Chatra.q || []).push(arguments); };`}
      </Script>
      <Script id="chatra-lazy-load" strategy="afterInteractive">
        {`(function () {
  if (!window.ChatraID) return;
  var loaded = false;
  function load() {
    if (loaded) return;
    loaded = true;
    var s = document.createElement('script');
    s.async = true;
    s.src = 'https://call.chatra.io/chatra.js';
    document.head.appendChild(s);
    events.forEach(function (evt) { window.removeEventListener(evt, load); });
  }
  var events = ['pointerdown', 'keydown', 'touchstart', 'scroll'];
  events.forEach(function (evt) { window.addEventListener(evt, load, { once: true, passive: true }); });
  if ('requestIdleCallback' in window) window.requestIdleCallback(load, { timeout: 6000 });
  else window.setTimeout(load, 5000);
})();`}
      </Script>
    </>
  );
}
