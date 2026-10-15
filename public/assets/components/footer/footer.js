/**
 * Footer component behaviour: scroll-to-top progress ring (#scrolltop, styled by footer.css).
 * Moved out of page-scripts.js so the footer is reusable on its own.
 */
// ── Authentic .scrolltop progress ring (ported from live gitam.edu app_ui.js) ── */
(function () {
  function initScrolltop() {
    var scrollProgress = document.querySelector("#scrolltop");
    if (!scrollProgress || scrollProgress.__scrolltopInit) return;
    scrollProgress.__scrolltopInit = true;

    function updateScrolltop() {
      var pos = window.pageYOffset || window.scrollY || document.documentElement.scrollTop || document.body.scrollTop || 0;
      var scrollable = (document.documentElement.scrollHeight || document.body.scrollHeight) - window.innerHeight;
      var scrollValue = scrollable > 0 ? Math.round((pos / scrollable) * 100) : 0;
      if (pos > 100) {
        scrollProgress.classList.add("active");
        scrollProgress.style.background =
          "conic-gradient(#A58255 " + scrollValue + "%, #004740 " + scrollValue + "%)";
      } else {
        scrollProgress.classList.remove("active");
      }
    }

    window.addEventListener("scroll", updateScrolltop, { passive: true });
    updateScrolltop();

    scrollProgress.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initScrolltop);
  } else {
    initScrolltop();
  }
})();
