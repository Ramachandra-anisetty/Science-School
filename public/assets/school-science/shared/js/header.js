/**
 * Official GITAM Header Interaction Controller
 * Handles mobile drawer toggle, desktop/mobile submenus, user dropdown, and search popup.
 */
document.addEventListener("DOMContentLoaded", function () {
  var header = document.getElementById("header");
  var burgerMenu = document.getElementById("mobilegitam");
  var closeIcon = document.getElementById("close-icon");
  var overlayMenu = document.querySelector(".gss-header-shell .gss-mobile-nav-overlay") || document.querySelector(".gss-mobile-nav-overlay");
  var navbar = document.getElementById("navbar");

  // Sticky header on scroll
  if (header) {
    window.addEventListener("scroll", function () {
      if (window.scrollY >= 20) {
        header.classList.add("sticky");
      } else {
        header.classList.remove("sticky");
      }
    }, { passive: true });
  }

  // Mobile drawer toggle
  function openMobileNav() {
    if (navbar) navbar.classList.add("active");
    if (overlayMenu) overlayMenu.classList.add("active");
    if (burgerMenu) {
      burgerMenu.classList.add("active");
      burgerMenu.classList.add("hide");
    }
    if (closeIcon) closeIcon.classList.add("active");
    document.body.style.overflow = "hidden";
    document.body.classList.add("gss-mobile-nav-open");
  }

  function closeMobileNav() {
    if (navbar) navbar.classList.remove("active");
    if (overlayMenu) overlayMenu.classList.remove("active");
    if (burgerMenu) {
      burgerMenu.classList.remove("active");
      burgerMenu.classList.remove("hide");
    }
    if (closeIcon) closeIcon.classList.remove("active");
    document.body.style.overflow = "";
    document.body.classList.remove("gss-mobile-nav-open");
  }

  if (burgerMenu) {
    burgerMenu.addEventListener("click", openMobileNav);
  }
  if (closeIcon) {
    closeIcon.addEventListener("click", closeMobileNav);
  }
  if (overlayMenu) {
    overlayMenu.addEventListener("click", closeMobileNav);
  }

  // Mobile menu dropdown accordion (screen <= 1300px)
  document.querySelectorAll(".gss-header-shell .gss-menu-link[data-toggle='submenu']").forEach(function (link) {
    link.addEventListener("click", function (e) {
      if (window.innerWidth <= 1300) {
        e.preventDefault();
        var menuItem = link.closest(".gss-menu-item");
        if (menuItem) {
          var wasActive = menuItem.classList.contains("active");
          var subMenu = menuItem.querySelector(".gss-submenu");
          // Close siblings
          menuItem.parentElement.querySelectorAll(".gss-menu-item.active").forEach(function (sib) {
            if (sib !== menuItem) {
              sib.classList.remove("active");
              var sibSub = sib.querySelector(".gss-submenu");
              if (sibSub) sibSub.removeAttribute("style");
            }
          });
          if (wasActive) {
            menuItem.classList.remove("active");
            if (subMenu) subMenu.removeAttribute("style");
          } else {
            menuItem.classList.add("active");
            if (subMenu) {
              subMenu.style.maxHeight = subMenu.scrollHeight + "px";
            }
          }
        }
      }
    });
  });

  // Mobile nested submenus (e.g. About > Campus Life) - drill-down, same as gitam.edu:
  // tapping the item swaps the whole menu for that item's own panel (green title + its links);
  // tapping the title again goes back. The CSS (.submenuactive / .active1 in header.css) does the
  // hiding; this only toggles the state classes.
  function resetDrillDown() {
    var menu = document.getElementById("menu");
    if (menu) menu.classList.remove("submenuactive");
    document.querySelectorAll(".gss-menu-item.active1").forEach(function (el) { el.classList.remove("active1"); });
    document.querySelectorAll(".gss-submenu-item.active").forEach(function (el) { el.classList.remove("active"); });
    document.querySelectorAll(".gss-navbar-list").forEach(function (el) { el.classList.remove("visibilityshowhide"); });
  }

  document.querySelectorAll(".gss-header-shell .gss-submenu-item").forEach(function (item) {
    item.addEventListener("click", function () {
      if (window.innerWidth > 1300) return;
      var isDropdown = this.classList.contains("gss-submenu-dropdown");
      document.querySelectorAll(".gss-header-shell .gss-submenu-item").forEach(function (other) {
        if (other !== item) other.classList.remove("active");
      });
      if (!isDropdown) {
        this.classList.add("active");
        return;
      }
      var entering = !this.classList.contains("active");
      this.classList.toggle("active", entering);
      var menu = document.getElementById("menu");
      if (menu) menu.classList.toggle("submenuactive", entering);
      document.querySelectorAll(".gss-menu-item.active1").forEach(function (el) { el.classList.remove("active1"); });
      var parentItem = this.closest(".gss-menu-item.gss-menu-dropdown");
      if (parentItem && entering) parentItem.classList.add("active1");
      document.querySelectorAll(".gss-navbar-list").forEach(function (el) {
        el.classList.toggle("visibilityshowhide", entering);
      });
    });
  });

  // Leaving the drawer (close, overlay, or resize to desktop) always returns to the top level.
  [closeIcon, overlayMenu].forEach(function (el) {
    if (el) el.addEventListener("click", resetDrillDown);
  });
  window.addEventListener("resize", function () {
    if (window.innerWidth > 1300) resetDrillDown();
  });

  // User account dropdown toggle
  document.querySelectorAll(".gss-user-icon .gss-dropdown-btn, .gss-user-icon .gss-menu-link").forEach(function (btn) {
    btn.addEventListener("click", function (e) {
      e.preventDefault();
      e.stopPropagation();
      var parent = btn.closest(".gss-user-icon");
      if (parent) {
        var menu = parent.querySelector(".gss-submenu") || parent.querySelector(".gss-dropdown-content");
        if (menu) {
          menu.classList.toggle("show");
        }
      }
    });
  });

  document.addEventListener("click", function (e) {
    if (!e.target.closest(".gss-user-icon")) {
      document.querySelectorAll(".gss-user-icon .gss-submenu.show, .gss-user-icon .gss-dropdown-content.show").forEach(function (m) {
        m.classList.remove("show");
      });
    }
  });

  // Search popup modal open / close
  var searchPopup = document.getElementById("searchpopup1");
  document.querySelectorAll(".searchpopup__trigger").forEach(function (trigger) {
    trigger.addEventListener("click", function (e) {
      e.preventDefault();
      if (searchPopup) {
        searchPopup.classList.remove("gss-search-popup--hidden");
      }
    });
  });

  if (searchPopup) {
    var closePopup = searchPopup.querySelector(".popup__closeicon");
    if (closePopup) {
      closePopup.addEventListener("click", function (e) {
        e.preventDefault();
        searchPopup.classList.add("gss-search-popup--hidden");
      });
    }
    searchPopup.addEventListener("click", function (e) {
      if (e.target === searchPopup) {
        searchPopup.classList.add("gss-search-popup--hidden");
      }
    });
  }
});

// Mobile/tablet fixed-header clearance: below 1300px, .gss-header switches
// to position:fixed (header.css) and is taken out of
// flow — #header (its parent) collapses to 0 height, so nothing reserves
// space for it and the page's real first section (campus switcher, or a
// page's breadcrumb) renders hidden underneath the fixed header instead of
// below it. Compensate by pushing #main-content down by the header's real
// rendered height; recalculated on resize since that height differs across
// this file's own breakpoints (logo/padding changes).
(function () {
  var header = document.getElementById("header");
  var headerBar = header ? header.querySelector(".gss-header") : null;
  var main = document.getElementById("main-content");
  if (!header || !headerBar || !main) return;
  var mq = window.matchMedia("(max-width: 1300px)");

  function update() {
    if (mq.matches) {
      main.style.paddingTop = headerBar.getBoundingClientRect().height + "px";
    } else {
      main.style.paddingTop = "";
    }
  }

  update();
  window.addEventListener("resize", update, { passive: true });
})();
