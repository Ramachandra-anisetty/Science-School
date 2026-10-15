// Mobile/tablet fixed-header clearance moved to shared/js/header.js (header component).

      // Mobile FAB — appears after hero CTA scrolls out of view
      (function () {
        const fab = document.getElementById("mobFab");
        const hero = document.querySelector(".hero");
        if (!fab || !hero) return;
        function onScroll() {
          const heroBottom = hero.getBoundingClientRect().bottom;
          if (heroBottom < 0) {
            fab.classList.add("mob-fab-visible");
          } else {
            fab.classList.remove("mob-fab-visible");
          }
        }
        window.addEventListener("scroll", onScroll, { passive: true });
      })();

      // Bottom apply card — slides up when user nears the bottom of the page
      (function () {
        const card = document.getElementById("applyCard");
        const closeBtn = document.getElementById("applyCardClose");
        const pageNav = document.getElementById("page-nav");
        if (!card) return;

        let dismissed = false;

        function setCardVisible(visible) {
          if (visible) {
            card.classList.add("ac-visible");
            if (pageNav) pageNav.classList.add("pnav-card-active");
          } else {
            card.classList.remove("ac-visible");
            if (pageNav) pageNav.classList.remove("pnav-card-active");
          }
        }

        function onScroll() {
          if (dismissed) return;
          const scrolled = window.scrollY + window.innerHeight;
          const total = document.documentElement.scrollHeight;
          // Show only when user reaches the very bottom of the page
          setCardVisible(total - scrolled < 40);
        }

        if (closeBtn) {
          closeBtn.addEventListener("click", function () {
            dismissed = true;
            setCardVisible(false);
          });
        }

        window.addEventListener("scroll", onScroll, { passive: true });
      })();

// ----------------------------------------

(function () {
        /* ── Reliable cross-browser smooth scroll ── */
        function scrollToId(id) {
          var el = document.getElementById(id);
          if (!el) return;
          var top = el.getBoundingClientRect().top + window.pageYOffset - 64;
          window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
        }

        /* ── More sheet ── */
        var moreBtn = document.getElementById("mob-more-btn");
        var sheet = document.getElementById("mob-sheet");
        var backdrop = document.getElementById("mob-sheet-backdrop");
        var closeBtn = document.getElementById("mob-sheet-close");

        function openSheet() {
          if (!sheet || !backdrop) return;
          sheet.classList.add("open");
          backdrop.classList.add("open");
          document.body.style.overflow = "hidden";
        }
        function closeSheet() {
          if (!sheet || !backdrop) return;
          sheet.classList.remove("open");
          backdrop.classList.remove("open");
          document.body.style.overflow = "";
        }

        moreBtn && moreBtn.addEventListener("click", openSheet);
        closeBtn && closeBtn.addEventListener("click", closeSheet);
        backdrop && backdrop.addEventListener("click", closeSheet);

        /* ── Tab bar buttons ── */
        document
          .querySelectorAll(".mnav-tab[data-target]")
          .forEach(function (btn) {
            btn.addEventListener("click", function () {
              scrollToId(btn.getAttribute("data-target"));
              document.querySelectorAll(".mnav-tab").forEach(function (t) {
                t.classList.remove("active");
              });
              btn.classList.add("active");
            });
          });

        /* ── More sheet items ── */
        document
          .querySelectorAll(".msheet-item[data-target]")
          .forEach(function (btn) {
            btn.addEventListener("click", function () {
              var target = btn.getAttribute("data-target");
              closeSheet();
              /* wait for sheet to animate away before scrolling */
              setTimeout(function () {
                scrollToId(target);
              }, 300);
            });
          });

        /* ── Auto-highlight active tab while scrolling (mobile) ── */
        var mnavTabs = Array.from(document.querySelectorAll(".mnav-tab[data-target]"));
        if (mnavTabs.length) {
          var tabObs = new IntersectionObserver(
            function (entries) {
              entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                  var id = entry.target.id;
                  mnavTabs.forEach(function (t) {
                    t.classList.toggle(
                      "active",
                      t.getAttribute("data-target") === id
                    );
                  });
                }
              });
            },
            { rootMargin: "-30% 0px -50% 0px", threshold: 0 }
          );

          mnavTabs.forEach(function (t) {
            var targetId = t.getAttribute("data-target");
            var el = document.getElementById(targetId);
            if (el) tabObs.observe(el);
          });
        }
      })();

// ----------------------------------------

(function () {
        var nav = document.getElementById("page-nav");
        if (!nav) return;
        var btns = nav.querySelectorAll(".pnav-btn");

        /* ── Reliable cross-browser smooth scroll with dynamic header offset ── */
        function scrollToId(id) {
          var el = document.getElementById(id);
          if (!el) return;
          var header = document.querySelector(".gss-header, header, #gitam_header");
          var headerHeight = header ? header.offsetHeight : 80;
          var top = el.getBoundingClientRect().top + window.pageYOffset - (headerHeight + 15);
          window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
        }

        /* Make scrollToId globally available for mob-nav and page triggers */
        window.scrollToId = scrollToId;

        /* ── Smooth scroll on click ── */
        btns.forEach(function (btn) {
          btn.addEventListener("click", function () {
            scrollToId(btn.getAttribute("data-target"));
          });
        });

        /* ── Active state via IntersectionObserver ── */
        var sectionIdSet = {};
        Array.from(btns).forEach(function (b) {
          var extra = b.getAttribute("data-active-ids");
          if (extra) {
            extra.split(/\s+/).forEach(function (id) {
              if (id) sectionIdSet[id] = true;
            });
          } else {
            var primary = b.getAttribute("data-target");
            if (primary) sectionIdSet[primary] = true;
          }
        });

        var activeId = null;

        function btnMatchesActive(btn, id) {
          if (!id) return false;
          if (btn.getAttribute("data-target") === id) return true;
          var extra = btn.getAttribute("data-active-ids");
          if (!extra) return false;
          return extra.split(/\s+/).indexOf(id) !== -1;
        }

        var observer = new IntersectionObserver(
          function (entries) {
            entries.forEach(function (entry) {
              if (entry.isIntersecting) {
                activeId = entry.target.id;
                updateActive();
              }
            });
          },
          { rootMargin: "-35% 0px -45% 0px", threshold: 0 }
        );

        Object.keys(sectionIdSet).forEach(function (id) {
          var el = document.getElementById(id);
          if (el) observer.observe(el);
        });

        window.addEventListener("scroll", function () {
          var isBottom = window.innerHeight + window.pageYOffset >= document.documentElement.scrollHeight - 80;
          if (isBottom && btns.length) {
            var lastBtn = btns[btns.length - 1];
            activeId = lastBtn.getAttribute("data-target");
            updateActive();
          }
        });

        function updateActive() {
          var pillsContainer = nav.querySelector(".pnav-pills");
          btns.forEach(function (btn) {
            var isActive = btnMatchesActive(btn, activeId);
            btn.classList.toggle("active", isActive);
            if (isActive && pillsContainer) {
              var btnLeft = btn.offsetLeft - pillsContainer.offsetLeft;
              pillsContainer.scrollTo({ left: btnLeft - 20, behavior: "smooth" });
            }
          });
        }

        /* ── Show floating nav when user reaches the middle of Programmes section ── */
        var progEl = document.getElementById("sec-explore");

        function updatePnavVisibility() {
          var show = false;
          if (progEl) {
            var rect = progEl.getBoundingClientRect();
            show = (rect.top + rect.height / 2) <= (window.innerHeight / 2);
          } else {
            show = window.pageYOffset > 400;
          }
          nav.classList.toggle("pnav-visible", show);
        }

        window.addEventListener("scroll", updatePnavVisibility, { passive: true });
        window.addEventListener("resize", updatePnavVisibility, { passive: true });
        updatePnavVisibility();

        /* ── Lift the dock clear of the footer's copyright bar (ported from
           live gitam.edu's quickNavigation behavior) — once scrolled 75% into
           the footer, add .pnav-footer-active so #page-nav's CSS bumps its
           bottom offset up and out of the copyright text's way. ── */
        var footerEl = document.querySelector(".g-footer, footer");

        function updateFooterNav() {
          if (!footerEl) return;
          var footerTop = footerEl.getBoundingClientRect().top + window.pageYOffset;
          var footerHeight = footerEl.offsetHeight;
          var triggerPosition = footerTop + footerHeight * 0.75;
          var pastTrigger = window.pageYOffset + window.innerHeight >= triggerPosition;
          nav.classList.toggle("pnav-footer-active", pastTrigger);
        }

        if (footerEl) {
          window.addEventListener("scroll", updateFooterNav, { passive: true });
          window.addEventListener("resize", updateFooterNav, { passive: true });
          updateFooterNav();
        }
      })();

      // Chat FAB toggle
      (function () {
        var fab = document.getElementById("chat-fab");
        var trigger = document.getElementById("cfabTrigger");
        if (!trigger || !fab) return;
        trigger.addEventListener("click", function () {
          var open = fab.classList.toggle("open");
          trigger.setAttribute("aria-expanded", open ? "true" : "false");
        });
        document.addEventListener("click", function (e) {
          if (!fab.contains(e.target)) {
            fab.classList.remove("open");
            trigger.setAttribute("aria-expanded", "false");
          }
        });
      })();

      // Scroll-to-top progress ring moved to shared/js/footer.js (footer component).

// ----------------------------------------

// ── Keep the sticky campus bar flush under the live header height ──
      // The header is taller on wide screens (85px vs 68px), so the CSS fallback of 69px let
      // the header (z-index 150) cover the top of the campus tabs while scrolling.
      (function () {
        var header = document.querySelector("#header .gss-header");
        var campusBar = document.querySelector(".gss-campus-section");
        if (!header || !campusBar) return;
        function syncHeaderHeight() {
          var h = Math.round(header.getBoundingClientRect().height);
          if (h > 0) document.documentElement.style.setProperty("--header-height", h + "px");
        }
        syncHeaderHeight();
        window.addEventListener("resize", syncHeaderHeight);
        window.addEventListener("load", syncHeaderHeight);
        if (window.ResizeObserver) new ResizeObserver(syncHeaderHeight).observe(header);
      })();

      // ── School Science programmes filters ─────────────────
      (function () {
        var section = document.querySelector(".programmes-section");
        if (!section) return;
        var deptButtons = section.querySelectorAll("button[data-dept]");
        var deptSelect = section.querySelector("select.dept-filter-select");
        var levelButtons = section.querySelectorAll("button[data-level]");
        var campusButtons = section.querySelectorAll("button[data-campus]");
        var rows = section.querySelectorAll(".programme-row[data-dept][data-level]");
        var list = section.querySelector(".programmes-list");
        var loadMoreBtn = section.querySelector(".programmes-load-more");
        var visibleRows = 4; // rows to show before "Load More", not items -
        // items-per-row depends on the grid's live column count (2 on
        // desktop, 1 on mobile via the 700px breakpoint), so the actual
        // item count this resolves to is recomputed from the DOM, not
        // hardcoded, and stays correct across a resize.

        var state = {
          dept: "all",
          level: "undergraduate",
          // Default to BLR — "All" tab removed per client feedback (2026-09-28);
          // BLR is now the first and default-active campus tab.
          // Campus pages have no campus buttons, so their section declares its campus via
          // data-default-campus; without buttons or that attribute, show every programme.
          campus:
            section.getAttribute("data-default-campus") || (campusButtons.length ? "blr" : "all"),
          expanded: false,
        };

        function setActive(buttons, activeButton) {
          buttons.forEach(function (button) {
            var active = button === activeButton;
            button.classList.toggle("is-active", active);
            button.setAttribute("aria-selected", active ? "true" : "false");
          });
        }

        function itemsPerRow() {
          if (!list) return 2;
          var cols = getComputedStyle(list).gridTemplateColumns.trim().split(/\s+/);
          return Math.max(1, cols.length);
        }

        // Hide department chips (and <select> options) that have no programme for the active
        // level/campus, so e.g. Ph.D. doesn't offer empty Computer Science / Life Sciences chips.
        function syncDeptAvailability() {
          var available = {};
          rows.forEach(function (row) {
            var campusAttr = row.getAttribute("data-campus") || "";
            var campusMatch = state.campus === "all" || campusAttr.split(/\s+/).indexOf(state.campus) !== -1;
            if (campusMatch && row.getAttribute("data-level") === state.level) {
              available[row.getAttribute("data-dept")] = true;
            }
          });
          if (state.dept !== "all" && !available[state.dept]) {
            state.dept = "all";
            if (deptSelect) deptSelect.value = "all";
          }
          deptButtons.forEach(function (btn) {
            var dept = btn.getAttribute("data-dept") || "all";
            var show = dept === "all" || !!available[dept];
            btn.style.display = show ? "" : "none";
            var active = dept === state.dept;
            btn.classList.toggle("is-active", active);
            btn.setAttribute("aria-selected", active ? "true" : "false");
          });
          if (deptSelect) {
            Array.prototype.forEach.call(deptSelect.options, function (opt) {
              var show = opt.value === "all" || !!available[opt.value];
              opt.hidden = !show;
              opt.disabled = !show;
            });
          }
        }

        function applyFilters() {
          syncDeptAvailability();
          var matched = [];
          rows.forEach(function (row) {
            var deptMatch = state.dept === "all" || row.getAttribute("data-dept") === state.dept;
            var levelMatch = row.getAttribute("data-level") === state.level;
            var campusAttr = row.getAttribute("data-campus") || "";
            var campusMatch = state.campus === "all" || campusAttr.split(/\s+/).indexOf(state.campus) !== -1;
            if (deptMatch && levelMatch && campusMatch) {
              matched.push(row);
            } else {
              row.style.display = "none";
            }
          });

          var limit = itemsPerRow() * visibleRows;
          var showAll = state.expanded || matched.length <= limit;
          matched.forEach(function (row, i) {
            row.style.display = showAll || i < limit ? "" : "none";
          });

          if (loadMoreBtn) {
            loadMoreBtn.hidden = showAll;
          }
        }

        deptButtons.forEach(function (btn) {
          btn.addEventListener("click", function () {
            state.dept = btn.getAttribute("data-dept") || "all";
            state.expanded = false;
            if (deptSelect) {
              deptSelect.value = state.dept;
            }
            setActive(deptButtons, btn);
            applyFilters();
          });
        });

        if (deptSelect) {
          deptSelect.addEventListener("change", function () {
            state.dept = deptSelect.value || "all";
            state.expanded = false;
            deptButtons.forEach(function (btn) {
              var active = (btn.getAttribute("data-dept") || "all") === state.dept;
              btn.classList.toggle("is-active", active);
              btn.setAttribute("aria-selected", active ? "true" : "false");
            });
            applyFilters();
          });
        }

        levelButtons.forEach(function (btn) {
          btn.addEventListener("click", function () {
            state.level = btn.getAttribute("data-level") || "undergraduate";
            state.expanded = false;
            setActive(levelButtons, btn);
            applyFilters();
          });
        });

        campusButtons.forEach(function (btn) {
          btn.addEventListener("click", function () {
            state.campus = btn.getAttribute("data-campus") || "all";
            state.expanded = false;
            setActive(campusButtons, btn);
            applyFilters();
          });
        });

        if (loadMoreBtn) {
          loadMoreBtn.addEventListener("click", function () {
            state.expanded = true;
            applyFilters();
          });
        }

        var resizeTimer = null;
        window.addEventListener("resize", function () {
          if (resizeTimer) return;
          resizeTimer = window.requestAnimationFrame(function () {
            applyFilters();
            resizeTimer = null;
          });
        });

        applyFilters();
      })();

      // ── Campus Infrastructure & Facilities: Dark Editorial Tabs + Dots ───
      (function () {
        document.querySelectorAll(".gss-pdm-infra-dark").forEach(function (section) {
          var tabs = Array.from(section.querySelectorAll("[data-infra-dark-tab]"));
          var panels = Array.from(section.querySelectorAll("[data-infra-dark-panel]"));

          tabs.forEach(function (tab) {
            tab.addEventListener("click", function () {
              var key = tab.getAttribute("data-infra-dark-tab");
              tabs.forEach(function (t) {
                var isActive = t === tab;
                t.classList.toggle("active", isActive);
                t.setAttribute("aria-selected", isActive ? "true" : "false");
              });
              panels.forEach(function (p) {
                p.hidden = p.getAttribute("data-infra-dark-panel") !== key;
              });
            });
          });

          panels.forEach(function (panel) {
            var track = panel.querySelector(".gss-pdm-infra-dark-track");
            var items = Array.from(panel.querySelectorAll(".gss-pdm-infra-dark-item"));
            var dots = Array.from(panel.querySelectorAll("[data-infra-dark-dot]"));

            dots.forEach(function (dot, idx) {
              dot.addEventListener("click", function () {
                if (track && items[idx]) {
                  track.scrollTo({ left: items[idx].offsetLeft - track.offsetLeft, behavior: "smooth" });
                }
                dots.forEach(function (d, i) {
                  d.classList.toggle("is-active", i === idx);
                });
              });
            });

            if (track && dots.length) {
              track.addEventListener("scroll", function () {
                var scrollLeft = track.scrollLeft;
                items.forEach(function (item, idx) {
                  var itemLeft = item.offsetLeft - track.offsetLeft;
                  if (Math.abs(scrollLeft - itemLeft) < item.offsetWidth / 2 && dots[idx]) {
                    dots.forEach(function (d, i) {
                      d.classList.toggle("is-active", i === idx);
                    });
                  }
                });
              }, { passive: true });
            }
          });
        });
      })();

      // ── Infrastructure 2: GITAM lab feature slider ─────────
      (function () {
        var section = document.querySelector("[data-infra2]");
        if (!section) return;
        var panels = Array.from(section.querySelectorAll("[data-infra2-panel]"));
        var dots = Array.from(section.querySelectorAll("[data-infra2-dot]"));
        if (!panels.length) return;
        var active = 0;

        function show(index) {
          active = ((index % panels.length) + panels.length) % panels.length;
          panels.forEach(function (panel, i) {
            var offset = i - active;
            if (offset > panels.length / 2) offset -= panels.length;
            if (offset < -panels.length / 2) offset += panels.length;
            var abs = Math.abs(offset);
            var direction = offset < 0 ? -1 : 1;
            var x = 0;
            var scale = 1;
            var opacity = 0;
            var z = 1;

            var isMobile = window.matchMedia("(max-width: 980px)").matches;

            if (abs === 0) {
              x = 0;
              scale = 1;
              opacity = 1;
              z = 9;
            } else if (abs === 1) {
              x = direction * (isMobile ? 32 : 54);
              scale = isMobile ? 0.86 : 0.9;
              opacity = 0.62;
              z = 4;
            }

            panel.style.transform = "translateX(" + x + "px) scale(" + scale + ")";
            panel.style.opacity = String(opacity);
            panel.style.zIndex = String(z);
            panel.style.pointerEvents = (abs === 0 || abs === 1) ? "auto" : "none";
            panel.classList.toggle("is-active", abs === 0);
          });
          dots.forEach(function (dot, i) {
            dot.classList.toggle("is-active", i === active);
          });
        }

        dots.forEach(function (dot, i) {
          dot.addEventListener("click", function () {
            show(i);
          });
        });

        var arrows = Array.from(section.querySelectorAll("[data-infra2-dir]"));
        arrows.forEach(function (arrow) {
          arrow.addEventListener("click", function () {
            show(active + parseInt(arrow.getAttribute("data-infra2-dir") || "1", 10));
          });
        });

        var touchStartX = 0;
        var touchStartY = 0;
        var isTouching = false;
        var viewport = section.querySelector(".infra2-viewport") || section;

        viewport.addEventListener("touchstart", function (e) {
          if (!e.touches.length) return;
          touchStartX = e.touches[0].clientX;
          touchStartY = e.touches[0].clientY;
          isTouching = true;
        }, { passive: true });

        viewport.addEventListener("touchend", function (e) {
          if (!isTouching || !e.changedTouches.length) return;
          isTouching = false;
          var diffX = e.changedTouches[0].clientX - touchStartX;
          var diffY = e.changedTouches[0].clientY - touchStartY;
          if (Math.abs(diffX) > 35 && Math.abs(diffX) > Math.abs(diffY)) {
            if (diffX < 0) {
              show(active + 1);
            } else {
              show(active - 1);
            }
          }
        }, { passive: true });

        viewport.addEventListener("touchcancel", function () {
          isTouching = false;
        });

        var ctaBtn = section.querySelector("[data-infra2-play-active]");
        if (ctaBtn) {
          ctaBtn.addEventListener("click", function () {
            var activePanel = panels[active];
            if (activePanel) {
              var watchTrigger = activePanel.querySelector(".gs-watch");
              if (watchTrigger) watchTrigger.click();
            }
          });
        }

        window.addEventListener("resize", function () {
          show(active);
        });

        show(0);
      })();

      // ── Outcomes 2: Gold Medalists centered carousel ───────
      (function () {
        var section = document.querySelector("[data-outcomes2]");
        if (!section) return;
        var cards = Array.from(section.querySelectorAll("[data-outcomes2-card]"));
        var dots = Array.from(section.querySelectorAll("[data-outcomes2-dot]"));
        var arrows = Array.from(section.querySelectorAll("[data-outcomes2-dir]"));
        if (!cards.length) return;
        var active = cards.findIndex(function (card) {
          return card.classList.contains("is-active");
        });
        if (active < 0) active = 0;
        var mobileMq = window.matchMedia("(max-width: 760px)");

        function normalize(index) {
          return ((index % cards.length) + cards.length) % cards.length;
        }

        function update() {
          var isMobile = mobileMq.matches;
          cards.forEach(function (card, i) {
            var offset = i - active;
            if (offset > cards.length / 2) offset -= cards.length;
            if (offset < -cards.length / 2) offset += cards.length;
            var abs = Math.abs(offset);
            var direction = offset < 0 ? -1 : 1;
            var x = 0;
            var scale = 1;
            var opacity = 1;
            var brightness = 1;
            var z = 10;

            if (isMobile) {
              x = offset * 112;
              scale = abs === 0 ? 1 : 0.84;
              opacity = abs === 0 ? 1 : abs === 1 ? 0.34 : 0;
              brightness = abs === 0 ? 1 : 0.54;
              z = abs === 0 ? 10 : 4 - abs;
            } else if (abs === 0) {
              x = 0;
              scale = 1;
              opacity = 1;
              brightness = 1;
              z = 12;
            } else if (abs === 1) {
              x = direction * 720;
              scale = 0.86;
              opacity = 0.5;
              brightness = 0.55;
              z = 7;
            } else if (abs === 2) {
              x = direction * 1140;
              scale = 0.74;
              opacity = 0.08;
              brightness = 0.35;
              z = 3;
            } else {
              x = direction * 1400;
              scale = 0.7;
              opacity = 0;
              brightness = 0.25;
              z = 1;
            }

            card.style.transform = "translateX(-50%) translateX(" + x + "px) scale(" + scale + ")";
            card.style.opacity = String(opacity);
            card.style.filter = "brightness(" + brightness + ")";
            card.style.zIndex = String(z);
            card.style.pointerEvents = abs <= 1 ? "auto" : "none";
            card.classList.toggle("is-active", abs === 0);
          });

          dots.forEach(function (dot, i) {
            dot.classList.toggle("is-active", i === active);
          });
        }

        dots.forEach(function (dot, i) {
          dot.addEventListener("click", function () {
            active = i;
            update();
          });
        });

        arrows.forEach(function (arrow) {
          arrow.addEventListener("click", function () {
            active = normalize(active + parseInt(arrow.getAttribute("data-outcomes2-dir") || "1", 10));
            update();
          });
        });

        var touchStartX = 0;
        var touchStartY = 0;
        var isTouching = false;
        var stage = section.querySelector(".outcomes2-stage") || section;

        stage.addEventListener("touchstart", function (e) {
          if (!e.touches.length) return;
          touchStartX = e.touches[0].clientX;
          touchStartY = e.touches[0].clientY;
          isTouching = true;
        }, { passive: true });

        stage.addEventListener("touchend", function (e) {
          if (!isTouching || !e.changedTouches.length) return;
          isTouching = false;
          var diffX = e.changedTouches[0].clientX - touchStartX;
          var diffY = e.changedTouches[0].clientY - touchStartY;
          if (Math.abs(diffX) > 35 && Math.abs(diffX) > Math.abs(diffY)) {
            if (diffX < 0) {
              active = normalize(active + 1);
            } else {
              active = normalize(active - 1);
            }
            update();
          }
        }, { passive: true });

        stage.addEventListener("touchcancel", function () {
          isTouching = false;
        });

        if (mobileMq.addEventListener) {
          mobileMq.addEventListener("change", update);
        }

        update();
      })();

      // ── Leadership 2: GITAM horizontal leader cards ────────
      (function () {
        var section = document.querySelector("[data-leadership2]");
        if (!section) return;
        var track = section.querySelector(".gss-leadership2-track");
        var cards = Array.from(section.querySelectorAll(".gss-leadership2-tile"));
        var arrows = Array.from(section.querySelectorAll("[data-leadership2-dir]"));
        if (!track || !cards.length) return;
        var active = 0;

        function maxActive() {
          var visible = window.matchMedia("(max-width: 980px)").matches ? 1 : 3;
          return Math.max(0, cards.length - visible);
        }

        function update() {
          var max = maxActive();
          active = Math.max(0, Math.min(active, max));
          var cardWidth = cards[0].getBoundingClientRect().width;
          var gap = 16;
          track.style.transform = "translateX(-" + active * (cardWidth + gap) + "px)";
          // Smart boundary: dim (not remove) prev at first, next at last —
          // still hide both when there's no overflow to page through at all,
          // since a disabled-looking arrow with nothing behind it either way
          // would be pure clutter. Client feedback 2026-09-29: a boundary
          // arrow should read as disabled, not vanish.
          arrows.forEach(function (btn) {
            var dir = parseInt(btn.getAttribute("data-leadership2-dir") || "1", 10);
            if (max <= 0) {
              btn.style.display = "none";
              return;
            }
            btn.style.display = "";
            var atBoundary = (dir < 0 && active === 0) || (dir > 0 && active === max);
            btn.setAttribute("aria-disabled", atBoundary ? "true" : "false");
            btn.style.opacity = atBoundary ? "0.35" : "";
            btn.style.pointerEvents = atBoundary ? "none" : "";
          });
        }

        arrows.forEach(function (arrow) {
          arrow.addEventListener("click", function () {
            active += parseInt(arrow.getAttribute("data-leadership2-dir") || "1", 10);
            update();
          });
        });

        var touchStartX = 0;
        var touchStartY = 0;
        var isTouching = false;

        track.addEventListener("touchstart", function (e) {
          if (!e.touches.length) return;
          touchStartX = e.touches[0].clientX;
          touchStartY = e.touches[0].clientY;
          isTouching = true;
        }, { passive: true });

        track.addEventListener("touchend", function (e) {
          if (!isTouching || !e.changedTouches.length) return;
          isTouching = false;
          var diffX = e.changedTouches[0].clientX - touchStartX;
          var diffY = e.changedTouches[0].clientY - touchStartY;
          if (Math.abs(diffX) > 35 && Math.abs(diffX) > Math.abs(diffY)) {
            if (diffX < 0) {
              active += 1;
            } else {
              active -= 1;
            }
            update();
          }
        }, { passive: true });

        window.addEventListener("resize", update);
        window.addEventListener("load", update);
        update();
      })();

      // ── In the News: press coverage carousel ────────────
      (function () {
        var section = document.querySelector("[data-in-the-news]");
        if (!section) return;
        var cards = Array.from(section.querySelectorAll("[data-itn-card]"));
        var dots = Array.from(section.querySelectorAll("[data-itn-dot]"));
        var arrows = Array.from(section.querySelectorAll("[data-itn-dir]"));
        var row = section.querySelector(".gss-itn-row");
        var navWrap = section.querySelector(".gss-itn-nav");
        var dotsWrap = section.querySelector(".gss-itn-dots");
        if (!cards.length) return;
        var active = 0;

        function updateControls() {
          var isMobile = window.matchMedia("(max-width: 980px)").matches;
          // Desktop fits 2 cards side-by-side; smaller screens fit 1.
          var visibleThreshold = isMobile ? 1 : 2;
          var hasOverflow = cards.length > visibleThreshold;
          if (navWrap) navWrap.style.display = hasOverflow ? "flex" : "none";
          if (dotsWrap) dotsWrap.style.display = (!isMobile && hasOverflow) ? "flex" : "none";
        }

        function show(index) {
          active = Math.max(0, Math.min(index, cards.length - 1));
          cards.forEach(function (card, i) {
            card.classList.toggle("is-active", i === active);
          });
          dots.forEach(function (dot, i) {
            dot.classList.toggle("is-active", i === active);
          });
          if (row && cards[active]) {
            var targetLeft = cards[active].offsetLeft - row.offsetLeft;
            row.scrollTo({ left: targetLeft, behavior: "smooth" });
          }
          // Smart boundary: dim (not remove) prev at first, next at last —
          // client feedback 2026-09-29: a boundary arrow should read as
          // disabled, not vanish.
          arrows.forEach(function (arrow) {
            var dir = parseInt(arrow.getAttribute("data-itn-dir") || "1", 10);
            var atBoundary = (dir < 0 && active === 0) || (dir > 0 && active === cards.length - 1);
            arrow.setAttribute("aria-disabled", atBoundary ? "true" : "false");
            arrow.style.opacity = atBoundary ? "0.35" : "";
            arrow.style.pointerEvents = atBoundary ? "none" : "";
          });
        }

        dots.forEach(function (dot, i) {
          dot.addEventListener("click", function () {
            show(i);
          });
        });

        arrows.forEach(function (arrow) {
          arrow.addEventListener("click", function () {
            var dir = parseInt(arrow.getAttribute("data-itn-dir") || "1", 10);
            show(active + dir);
          });
        });

        if (row) {
          row.addEventListener("scroll", function () {
            var scrollLeft = row.scrollLeft;
            var nearest = 0;
            var minDiff = Infinity;
            cards.forEach(function (card, i) {
              var cardLeft = card.offsetLeft - row.offsetLeft;
              var diff = Math.abs(cardLeft - scrollLeft);
              if (diff < minDiff) {
                minDiff = diff;
                nearest = i;
              }
            });
            if (active !== nearest) {
              active = nearest;
              dots.forEach(function (dot, i) {
                dot.classList.toggle("is-active", i === active);
              });
            }
          }, { passive: true });
        }

        window.addEventListener("resize", updateControls);
        updateControls();
        show(0);
      })();

      // ── Hear from Our Faculty: video carousel ───────────────
      // Cards are laid out 2-up (1-up on mobile) via CSS flex-basis; the
      // row itself scrolls via transform, clamped so the last click can't
      // scroll past the final card - not just a class-toggle like the News
      // carousel, since more cards need to actually move into view here.
      (function () {
        var section = document.querySelector("[data-faculty-videos]");
        if (!section) return;
        var row = section.querySelector("[data-faculty-row]");
        var cards = Array.from(section.querySelectorAll(".gss-faculty-card"));
        var arrows = Array.from(section.querySelectorAll("[data-faculty-dir]"));
        if (!row || !cards.length) return;
        var index = 0;

        function visibleCount() {
          return window.matchMedia("(max-width: 760px)").matches ? 1 : 2;
        }

        function move(delta) {
          var maxIndex = Math.max(0, cards.length - visibleCount());
          index = Math.min(Math.max(index + delta, 0), maxIndex);
          row.style.transform = "translateX(-" + cards[index].offsetLeft + "px)";
          // Smart boundary: dim (not remove/hide) prev at first, next at
          // last — client feedback 2026-09-29. This carousel had no
          // boundary handling at all before (unlike leadership2/in-the-news/
          // events, which already had it, just with the wrong "opacity:0 to
          // vanish" behavior fixed alongside this one).
          arrows.forEach(function (arrow) {
            var dir = parseInt(arrow.getAttribute("data-faculty-dir") || "1", 10);
            var atBoundary = (dir < 0 && index === 0) || (dir > 0 && index === maxIndex);
            arrow.setAttribute("aria-disabled", atBoundary ? "true" : "false");
            arrow.style.opacity = atBoundary ? "0.35" : "";
            arrow.style.pointerEvents = atBoundary ? "none" : "";
          });
        }

        arrows.forEach(function (arrow) {
          arrow.addEventListener("click", function () {
            move(parseInt(arrow.getAttribute("data-faculty-dir") || "1", 10));
          });
        });

        window.addEventListener("resize", function () {
          move(0);
        });

        move(0);
      })();

      // ── Events: campus filter + carousel ────────────────────
      // Unlike the other carousels on this page, filtering here changes
      // *which* cards are pageable, so the dots are rebuilt from the
      // filtered count each time the campus select changes, and a
      // zero-match filter shows the empty-state message instead of a
      // blank row (no fabricated events for campuses that don't have
      // real ones yet).
      (function () {
        var section = document.querySelector("[data-events]");
        if (!section) return;
        var select = document.querySelector("[data-events-campus-select]");
        var row = section.querySelector("[data-events-row]");
        var allCards = Array.from(section.querySelectorAll(".event-card"));
        var arrows = Array.from(section.querySelectorAll("[data-events-dir]"));
        var dotsWrap = document.querySelector("[data-events-dots]");
        var emptyEl = document.querySelector("[data-events-empty]");
        if (!row || !allCards.length || !dotsWrap) return;

        var visible = allCards.slice();
        var index = 0;

        function visibleCount() {
          return window.matchMedia("(max-width: 900px)").matches ? 1 : 3;
        }

        function renderDots() {
          var perPage = visibleCount();
          var pages = Math.max(1, Math.ceil(visible.length / perPage));
          dotsWrap.innerHTML = "";
          for (var i = 0; i < pages; i++) {
            var dot = document.createElement("button");
            dot.type = "button";
            dot.className = i === 0 ? "events-dot is-active" : "events-dot";
            dot.setAttribute("aria-label", "Show events page " + (i + 1));
            (function (page) {
              dot.addEventListener("click", function () {
                index = page;
                position();
              });
            })(i);
            dotsWrap.appendChild(dot);
          }
          dotsWrap.style.display = pages <= 1 ? "none" : "flex";
          arrows.forEach(function (arrow) {
            arrow.style.display = pages <= 1 ? "none" : "";
          });
        }

        function position() {
          var perPage = visibleCount();
          var pages = Math.max(1, Math.ceil(visible.length / perPage));
          index = Math.min(Math.max(index, 0), pages - 1);
          var targetCard = visible[index * perPage];
          row.style.transform = targetCard ? "translateX(-" + targetCard.offsetLeft + "px)" : "translateX(0)";
          Array.from(dotsWrap.children).forEach(function (dot, i) {
            dot.classList.toggle("is-active", i === index);
          });
          // Smart boundary: dim (not remove) prev on first page, next on
          // last page — client feedback 2026-09-29: a boundary arrow should
          // read as disabled, not vanish.
          arrows.forEach(function (arrow) {
            var dir = parseInt(arrow.getAttribute("data-events-dir") || "1", 10);
            var atBoundary = (dir < 0 && index === 0) || (dir > 0 && index === pages - 1);
            arrow.setAttribute("aria-disabled", atBoundary ? "true" : "false");
            arrow.style.opacity = atBoundary ? "0.35" : "";
            arrow.style.pointerEvents = atBoundary ? "none" : "";
          });
        }

        function applyFilter() {
          var campus = select ? select.value : "all";
          visible = allCards.filter(function (card) {
            return campus === "all" || card.getAttribute("data-campus") === campus;
          });
          allCards.forEach(function (card) {
            card.style.display = visible.indexOf(card) === -1 ? "none" : "";
          });
          index = 0;
          if (emptyEl) emptyEl.classList.toggle("is-visible", visible.length === 0);
          row.style.display = visible.length === 0 ? "none" : "flex";
          renderDots();
          position();
        }

        arrows.forEach(function (arrow) {
          arrow.addEventListener("click", function () {
            index += parseInt(arrow.getAttribute("data-events-dir") || "1", 10);
            position();
          });
        });

        var touchStartX = 0;
        var touchStartY = 0;
        var isTouching = false;
        var wrap = section.querySelector(".events-row-wrap") || row;

        wrap.addEventListener("touchstart", function (e) {
          if (!e.touches.length) return;
          touchStartX = e.touches[0].clientX;
          touchStartY = e.touches[0].clientY;
          isTouching = true;
        }, { passive: true });

        wrap.addEventListener("touchend", function (e) {
          if (!isTouching || !e.changedTouches.length) return;
          isTouching = false;
          var diffX = e.changedTouches[0].clientX - touchStartX;
          var diffY = e.changedTouches[0].clientY - touchStartY;
          if (Math.abs(diffX) > 35 && Math.abs(diffX) > Math.abs(diffY)) {
            if (diffX < 0) {
              index += 1;
            } else {
              index -= 1;
            }
            position();
          }
        }, { passive: true });

        wrap.addEventListener("touchcancel", function () {
          isTouching = false;
        });

        if (select) select.addEventListener("change", applyFilter);

        window.addEventListener("resize", function () {
          renderDots();
          position();
        });

        applyFilter();

        // The date badge uses Forma DJR Display, a slow-loading custom
        // @font-face - if it swaps in after this script's initial layout
        // read, card widths/offsets shift and the transform computed above
        // goes stale (visibly: the row lands mid-scroll instead of on
        // card 0). Re-run once fonts have actually finished loading.
        if (document.fonts && document.fonts.ready) {
          document.fonts.ready.then(function () {
            renderDots();
            position();
          });
        }
      })();

      // ── Campus switcher: navigate, or inert until content exists ──
      // Tabs are real <a href> (see Campuses.tsx) - a tab whose campus has
      // its own page (currently only Visakhapatnam) navigates there
      // normally, no JS involved. A tab still pointing at "#" (Bengaluru/
      // Hyderabad) has no content yet (Vijay, 2026-09-18: "should not
      // work") - marked inert here rather than made to look interactive
      // and then silently do nothing: no active-state toggle, no hero
      // eyebrow update, just prevented from following the dead "#" link.
      (function () {
        var bar = document.querySelector("[data-campus-switcher]");
        if (!bar) return;
        var tabs = Array.from(bar.querySelectorAll("[data-campus-tab]"));
        if (!tabs.length) return;

        tabs.forEach(function (tab) {
          if (tab.getAttribute("href") !== "#") return;
          tab.classList.add("gss-campus-tab-disabled");
          tab.setAttribute("aria-disabled", "true");
          tab.setAttribute("title", "Coming soon");
          tab.addEventListener("click", function (e) {
            e.preventDefault();
          });
        });
      })();

      // ── Vision & Mission 3 scroll-driven mission carousel ───
      (function () {
        var section = document.querySelector(".gss-vision-mission3-section");
        if (!section) return;
        var track = section.querySelector("[data-vm3-track]");
        var slides = Array.from(section.querySelectorAll("[data-vm3-slide]"));
        var dots = Array.from(section.querySelectorAll("[data-vm3-dot]"));
        var steps = Array.from(section.querySelectorAll("[data-vm3-step]"));
        if (!slides.length) return;
        var active = 0;

        function show(index) {
          active = ((index % slides.length) + slides.length) % slides.length;
          if (track) {
            track.style.transform = "translateX(-" + active * 100 + "%)";
          }
          slides.forEach(function (slide, i) {
            slide.classList.toggle("is-active", i === active);
          });
          dots.forEach(function (dot, i) {
            dot.classList.toggle("is-active", i === active);
          });
        }

        dots.forEach(function (dot, i) {
          dot.addEventListener("click", function () {
            show(i);
          });
        });

        // Below 900px the scroll-height/sticky mechanism this observer
        // depends on is switched off entirely (see the matching
        // @media (max-width:900px) rule in vision-mission3.css that sets
        // .gss-vision-mission3-scroll-area to min-height:auto and un-stickies
        // the wrap) — the section is a normal-flow block there, so the
        // 4 step markers no longer span distinct scroll positions and the
        // observer would just fire on whichever one happens to be nearest
        // the viewport. Client feedback 2026-09-28: that scroll-driven
        // mission switch reads as broken on mobile. Swap it there for a
        // plain swipeable/tappable slide (dots above already jump to a
        // slide on click; this just adds the touch-swipe gesture).
        var mobileMq = window.matchMedia("(max-width: 900px)");

        function setupSwipe() {
          var slidesWrap = section.querySelector(".gss-vision-mission3-slides");
          if (!slidesWrap || slidesWrap.hasAttribute("data-vm3-swipe-bound")) return;
          slidesWrap.setAttribute("data-vm3-swipe-bound", "true");
          var startX = 0;
          slidesWrap.addEventListener(
            "touchstart",
            function (e) {
              startX = e.touches[0].clientX;
            },
            { passive: true },
          );
          slidesWrap.addEventListener(
            "touchend",
            function (e) {
              var diffX = e.changedTouches[0].clientX - startX;
              if (Math.abs(diffX) > 40) {
                show(active + (diffX < 0 ? 1 : -1));
              }
            },
            { passive: true },
          );
        }

        if (mobileMq.matches) {
          setupSwipe();
        } else if ("IntersectionObserver" in window && steps.length) {
          var observer = new IntersectionObserver(
            function (entries) {
              entries.forEach(function (entry) {
                if (!entry.isIntersecting) return;
                var next = parseInt(entry.target.getAttribute("data-vm3-step") || "0", 10);
                show(next);
              });
            },
            { rootMargin: "-25% 0px -25% 0px", threshold: 0 },
          );
          steps.forEach(function (step) {
            observer.observe(step);
          });
        }

        show(0);
      })();

// ----------------------------------------

// ----------------------------------------

/* ── Stat counter animation (scroll-triggered) ── */
      (function () {
        var DURATION = 1600;

        function easeOutExpo(t) {
          return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
        }

        function formatValue(val, fmt) {
          if (fmt === "comma") return Math.round(val).toLocaleString("en-IN");
          if (fmt === "decimal1") return val.toFixed(1);
          return Math.round(val).toString();
        }

        function animateCounter(el) {
          var target = parseFloat(el.dataset.count);
          var fmt = el.dataset.format || "integer";
          var startVal = target * 0.05;
          var startTime = null;

          function step(ts) {
            if (!startTime) startTime = ts;
            var progress = Math.min((ts - startTime) / DURATION, 1);
            el.textContent = formatValue(
              startVal + (target - startVal) * easeOutExpo(progress),
              fmt,
            );
            if (progress < 1) requestAnimationFrame(step);
            else el.textContent = formatValue(target, fmt);
          }
          requestAnimationFrame(step);
        }

        var section = document.getElementById("sec-stats");
        if (!section || !("IntersectionObserver" in window)) return;

        var fired = false;
        var observer = new IntersectionObserver(
          function (entries) {
            if (fired || !entries[0].isIntersecting) return;
            fired = true;
            observer.disconnect();

            section.querySelectorAll(".why-card").forEach(function (cell, i) {
              setTimeout(function () {
                cell.classList.add("counted");
                var counter = cell.querySelector("[data-count]");
                if (counter) animateCounter(counter);
              }, i * 80);
            });
          },
          { threshold: 0.2, rootMargin: "0px 0px -60px 0px" },
        );

        observer.observe(section);
      })();

// ----------------------------------------

// ----------------------------------------

// ── Contact modal ────────────────────────────────────
      (function () {
        var backdrop = document.getElementById("contactModal");
        var form = document.getElementById("cmodalForm");
        var successEl = document.getElementById("cmodalSuccess");
        if (!backdrop || !form || !successEl) return;

        function openModal(e) {
          if (e && e.preventDefault) e.preventDefault();
          var trigger = e && e.currentTarget ? e.currentTarget : null;
          if (trigger) {
            var eventTitle = trigger.getAttribute("data-event-title");
            var eventCampus = trigger.getAttribute("data-event-campus");
            var campusSelect = document.getElementById("cm-campus");
            var msgTextarea = document.getElementById("cm-msg");
            if (eventCampus && campusSelect) {
              for (var i = 0; i < campusSelect.options.length; i++) {
                if (campusSelect.options[i].text.toLowerCase().indexOf(eventCampus.toLowerCase()) !== -1) {
                  campusSelect.selectedIndex = i;
                  break;
                }
              }
            }
            if (eventTitle && msgTextarea) {
              msgTextarea.value = "Registration enquiry for: " + eventTitle;
            }
          }
          backdrop.classList.add("open");
          document.body.style.overflow = "hidden";
        }
        function closeModal() {
          backdrop.classList.remove("open");
          document.body.style.overflow = "";
          setTimeout(function () {
            form.style.display = "";
            successEl.style.display = "none";
            form.reset && form.reset();
          }, 300);
        }

        var triggers = document.querySelectorAll(".cmodal-open-trigger");
        triggers.forEach(function (el) {
          el.addEventListener("click", openModal);
        });

        backdrop.addEventListener("click", function (e) {
          if (e.target === backdrop) closeModal();
        });
        var cmodalCloseBtn = document.getElementById("cmodalClose");
        if (cmodalCloseBtn) cmodalCloseBtn.addEventListener("click", closeModal);
        document.addEventListener("keydown", function (e) {
          if (e.key === "Escape") closeModal();
        });

        if (typeof form !== "undefined" && form) form.addEventListener("submit", function (e) {
          e.preventDefault();
          form.style.display = "none";
          successEl.style.display = "block";
          setTimeout(closeModal, 3200);
        });
      })();

      // ── Event details modal ──────────────────────────────
      // Only school-science's Events section (templates/src/site/
      // school-science/Events.tsx) renders ".edmodal-open-trigger"/
      // "#eventDetailsModal" markup - this whole block no-ops elsewhere
      // (e.g. apply-gitam), same as the Contact modal block above.
      (function () {
        var backdrop = document.getElementById("eventDetailsModal");
        if (!backdrop) return;

        var fieldMap = {
          "data-event-category": "edmodalCategory",
          "data-event-title": "edmodalTitle",
          "data-event-description": "edmodalDescription",
          "data-event-venue": "edmodalVenue",
          "data-event-location": "edmodalLocation",
          "data-event-start": "edmodalStart",
          "data-event-end": "edmodalEnd",
          "data-event-contact-person": "edmodalContactPerson",
          "data-event-contact-number": "edmodalContactNumber",
          "data-event-school": "edmodalSchool",
        };

        var registerBtn = document.getElementById("edmodalRegisterBtn");

        function openModal(e) {
          var trigger = e.currentTarget;
          Object.keys(fieldMap).forEach(function (attr) {
            var el = document.getElementById(fieldMap[attr]);
            if (el) el.textContent = trigger.getAttribute(attr) || "";
          });
          if (registerBtn) {
            registerBtn.setAttribute("data-event-title", trigger.getAttribute("data-event-title") || "");
            registerBtn.setAttribute("data-event-campus", trigger.getAttribute("data-event-campus") || "");
          }
          backdrop.classList.add("open");
          document.body.style.overflow = "hidden";
        }

        function closeModal() {
          backdrop.classList.remove("open");
          document.body.style.overflow = "";
        }

        var triggers = document.querySelectorAll(".edmodal-open-trigger");
        triggers.forEach(function (el) {
          el.addEventListener("click", openModal);
        });

        backdrop.addEventListener("click", function (e) {
          if (e.target === backdrop) closeModal();
        });
        var edmodalCloseBtn = document.getElementById("edmodalClose");
        if (edmodalCloseBtn) edmodalCloseBtn.addEventListener("click", closeModal);
        var edmodalCloseFooterBtn = document.getElementById("edmodalCloseBtn");
        if (edmodalCloseFooterBtn) edmodalCloseFooterBtn.addEventListener("click", closeModal);
        document.addEventListener("keydown", function (e) {
          if (e.key === "Escape") closeModal();
        });

        // "Register Here" inside the details modal hands off to the
        // existing Contact modal (already wired to any ".cmodal-open-trigger"
        // present at load time - this button carries that class too, so its
        // own listener, attached earlier in this same script, fires first
        // and opens the Contact modal (setting body.style.overflow itself).
        // Only remove this modal's backdrop class here - deliberately skip
        // resetting body.style.overflow, or it would immediately undo the
        // Contact modal's own "hidden" that just ran.
        if (registerBtn) {
          registerBtn.addEventListener("click", function () {
            backdrop.classList.remove("open");
          });
        }
      })();

      <!--  -->

// ----------------------------------------

document.querySelectorAll('.gs-watch').forEach(btn => {
  btn.addEventListener('click', function(e) {
    e.preventDefault();

    openModal(
      this.dataset.title,
      this.dataset.info,
      this.dataset.video
    );
  });
});

function openModal(title, info, videoUrl) {
  var modalTitle = document.getElementById('modalTitle');
  var modalInfo = document.getElementById('modalInfo');
  var yt = document.getElementById('yt');
  var overlay = document.getElementById('overlay');
  var videoWrap = overlay ? overlay.querySelector('.video-wrap, .video') : null;
  if (!modalTitle || !modalInfo || !yt || !overlay) return;

  modalTitle.textContent = title || 'GITAM School of Science';
  modalInfo.textContent = info || '';

  var urlStr = videoUrl || '';
  if (urlStr.indexOf('instagram.com') !== -1) {
    var match = urlStr.match(/reel\/([A-Za-z0-9_-]+)/);
    var reelId = match ? match[1] : 'DW8IyYSid8a';
    yt.src = 'https://www.instagram.com/reel/' + reelId + '/embed/';
    if (videoWrap) videoWrap.classList.add('is-instagram');
  } else {
    if (videoWrap) videoWrap.classList.remove('is-instagram');
    var videoId = '';
    try {
      var u = new URL(urlStr);
      videoId = u.searchParams.get('v') || u.pathname.split('/').filter(Boolean).pop() || '';
    } catch (e) {
      var m = (urlStr || '').match(/(?:youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=)([^#&?]*)/);
      videoId = (m && m[1]) || '';
    }

    yt.src = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
  }

  overlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  var overlay = document.getElementById('overlay');
  var yt = document.getElementById('yt');
  if (!overlay || !yt) return;
  overlay.classList.remove('open');
  yt.src = '';
  document.body.style.overflow = '';
}

(function () {
  var overlay = document.getElementById('overlay');
  if (overlay) {
    overlay.addEventListener('click', function (e) {
      if (e.target === overlay) closeModal();
    });
  }
  var closeBtn = document.getElementById('closeModal');
  if (closeBtn) closeBtn.addEventListener('click', closeModal);
})();

// Image fallback: <img data-fallback-src="..."> swaps to that source once if the image fails to load.
(function () {
  function useFallback(img) {
    var fallback = img.getAttribute('data-fallback-src');
    if (!fallback || img.getAttribute('data-fallback-used')) return;
    img.setAttribute('data-fallback-used', '1');
    img.src = fallback;
  }
  document.addEventListener('error', function (e) {
    if (e.target && e.target.tagName === 'IMG') useFallback(e.target);
  }, true);
  document.querySelectorAll('img[data-fallback-src]').forEach(function (img) {
    if (img.complete && img.naturalWidth === 0) useFallback(img);
  });
})();

// ── GAT 2026 Apply Modal Script ─────────────────────────────
(function () {
  function initApplyModal() {
    var backdrop = document.getElementById("applyModal");
    if (!backdrop) return;

    var closeBtn = document.getElementById("applyModalClose");
    var form = document.getElementById("applyModalForm");
    var successEl = document.getElementById("applyModalSuccess");
    var nationalitySwitch = document.getElementById("toggleNationalitySwitch");
    var authSwitch = document.getElementById("toggleAuthSwitch");
    var indianLabel = document.getElementById("toggleIndianLabel");
    var foreignLabel = document.getElementById("toggleForeignLabel");
    var loginLabel = document.getElementById("toggleLoginLabel");
    var registerLabel = document.getElementById("toggleRegisterLabel");
    var regFields = document.getElementById("gat-registration-fields");
    var stateWrap = document.getElementById("gat-state-wrap");

    function openApplyModal(e) {
      if (e && e.preventDefault) e.preventDefault();
      backdrop.classList.add("open");
      document.body.style.overflow = "hidden";
    }

    function closeApplyModal() {
      backdrop.classList.remove("open");
      document.body.style.overflow = "";
      if (form && successEl) {
        setTimeout(function () {
          form.style.display = "";
          successEl.style.display = "none";
          form.reset && form.reset();
        }, 300);
      }
    }

    if (nationalitySwitch) {
      nationalitySwitch.addEventListener("click", function () {
        var isForeign = nationalitySwitch.classList.toggle("active");
        nationalitySwitch.setAttribute("aria-checked", isForeign ? "true" : "false");
        if (indianLabel && foreignLabel) {
          indianLabel.classList.toggle("active", !isForeign);
          foreignLabel.classList.toggle("active", isForeign);
        }
      });
    }

    if (authSwitch) {
      authSwitch.addEventListener("click", function () {
        var isRegister = authSwitch.classList.toggle("active");
        authSwitch.setAttribute("aria-checked", isRegister ? "true" : "false");
        if (loginLabel && registerLabel) {
          loginLabel.classList.toggle("active", !isRegister);
          registerLabel.classList.toggle("active", isRegister);
        }
        if (regFields) regFields.style.display = isRegister ? "" : "none";
        if (stateWrap) stateWrap.style.display = isRegister ? "" : "none";
      });
    }

    var applySelectors = [
      ".nav-apply",
      ".mnav-apply",
      ".pnav-apply",
      ".btn-apply",
      ".apply-modal-trigger",
      "a[href*='apply.gitam.edu']"
    ];

    var triggers = document.querySelectorAll(applySelectors.join(","));
    triggers.forEach(function (el) {
      el.addEventListener("click", openApplyModal);
    });

    if (closeBtn) closeBtn.addEventListener("click", closeApplyModal);

    backdrop.addEventListener("click", function (e) {
      if (e.target === backdrop) closeApplyModal();
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && backdrop.classList.contains("open")) {
        closeApplyModal();
      }
    });

    if (form) {
      form.addEventListener("submit", function (e) {
        e.preventDefault();
        if (successEl) {
          form.style.display = "none";
          successEl.style.display = "block";
          setTimeout(closeApplyModal, 3200);
        }
      });
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initApplyModal);
  } else {
    initApplyModal();
  }
})();