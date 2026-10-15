// Programme details page: overview tabs, career list, scholarships, carousels.
// Programme Overview: Tabbed Card (About -> Eligibility -> Scope).
(function () {
  var tabs = Array.from(document.querySelectorAll(".gss-pd-tab"));
  var panels = Array.from(document.querySelectorAll(".gss-pd-panel"));
  if (!tabs.length || !panels.length) return;

  tabs.forEach(function (tab) {
    tab.addEventListener("click", function () {
      var targetId = tab.getAttribute("aria-controls");
      tabs.forEach(function (t) {
        var isCurrent = t === tab;
        t.classList.toggle("is-active", isCurrent);
        t.setAttribute("aria-selected", isCurrent ? "true" : "false");
        t.setAttribute("tabindex", isCurrent ? "0" : "-1");
      });
      panels.forEach(function (p) {
        var isTarget = p.id === targetId;
        p.classList.toggle("is-active", isTarget);
        if (isTarget) {
          p.removeAttribute("hidden");
        } else {
          p.setAttribute("hidden", "");
        }
      });
    });

    // Keyboard navigation (ArrowLeft / ArrowRight)
    tab.addEventListener("keydown", function (e) {
      var index = tabs.indexOf(tab);
      var newIndex = -1;
      if (e.key === "ArrowRight") {
        newIndex = (index + 1) % tabs.length;
      } else if (e.key === "ArrowLeft") {
        newIndex = (index - 1 + tabs.length) % tabs.length;
      }
      if (newIndex !== -1) {
        e.preventDefault();
        tabs[newIndex].focus();
        tabs[newIndex].click();
      }
    });
  });
})();

// Infrastructure & Facilities (dark editorial variant): Classroom/Lab tab
// switch + per-panel dot-paged photo carousel. Scoped to #pdmInfraDarkTabs
// (deliberately a different id than the shared CampusInfrastructure.tsx's
// #campusInfraTabs, so the two never collide).
(function () {
  var tabsWrap = document.getElementById("pdmInfraDarkTabs");
  if (!tabsWrap) return;
  var section = tabsWrap.closest(".gss-pdm-infra-dark");
  var tabs = Array.from(tabsWrap.querySelectorAll("[data-infra-dark-tab]"));
  var panels = Array.from(section.querySelectorAll("[data-infra-dark-panel]"));

  tabs.forEach(function (tab) {
    tab.addEventListener("click", function () {
      var key = tab.getAttribute("data-infra-dark-tab");
      tabs.forEach(function (t) {
        t.classList.toggle("active", t === tab);
      });
      panels.forEach(function (p) {
        p.hidden = p.getAttribute("data-infra-dark-panel") !== key;
      });
    });
  });

  panels.forEach(function (panel) {
    var track = panel.querySelector("[data-infra-dark-track]");
    var items = Array.from(panel.querySelectorAll(".gss-pdm-infra-dark-item"));
    var dots = Array.from(panel.querySelectorAll("[data-infra-dark-dot]"));
    if (!track || !items.length || !dots.length) return;

    dots.forEach(function (dot, idx) {
      dot.addEventListener("click", function () {
        if (items[idx]) {
          items[idx].scrollIntoView({ behavior: "smooth", inline: "start", block: "nearest" });
        }
      });
    });

    track.addEventListener("scroll", function () {
      var trackRect = track.getBoundingClientRect();
      var closestIdx = 0;
      var minDiff = Infinity;
      items.forEach(function (item, idx) {
        var diff = Math.abs(item.getBoundingClientRect().left - trackRect.left);
        if (diff < minDiff) {
          minDiff = diff;
          closestIdx = idx;
        }
      });
      dots.forEach(function (d, i) {
        d.classList.toggle("is-active", i === closestIdx);
      });
    }, { passive: true });
  });
})();

// Scholarships Option 1: Vertical Timeline Stepper (scroll-driven sticky stepper)
(function () {
  var section = document.getElementById("sec-pdm-scholarships");
  if (!section) return;
  var items = Array.from(section.querySelectorAll(".gss-pd-scholarships-timeline-item"));
  var panels = Array.from(section.querySelectorAll(".gss-pd-scholarships-panel"));
  var prevBtn = section.querySelector("#scholPrev");
  var nextBtn = section.querySelector("#scholNext");
  if (!items.length || !panels.length) return;

  var active = -1;

  function activate(idx) {
    if (idx === active) return;
    active = idx;
    items.forEach(function (el, i) {
      el.classList.toggle("on", i === active);
    });
    panels.forEach(function (panel, i) {
      panel.classList.toggle("is-active", i === active);
    });
  }

  var isTicking = false;

  function processScroll() {
    if (window.innerWidth <= 900) return;

    var rect = section.getBoundingClientRect();
    var scrollDistance = section.offsetHeight - window.innerHeight;
    if (scrollDistance <= 0) return;

    var topOffset = 108;
    var progress = (topOffset - rect.top) / scrollDistance;
    progress = Math.max(0, Math.min(1, progress));

    // Zone 0 (Merit):         0.00 - 0.33
    // Zone 1 (Need):          0.33 - 0.66
    // Zone 2 (Accommodation): 0.66 - 1.00
    var step = 0;
    if (progress >= 0.66) {
      step = 2;
    } else if (progress >= 0.33) {
      step = 1;
    } else {
      step = 0;
    }

    activate(step);
  }

  function onScroll() {
    if (!isTicking) {
      window.requestAnimationFrame(function () {
        processScroll();
        isTicking = false;
      });
      isTicking = true;
    }
  }

  function scrollToStep(idx) {
    activate(idx);
    if (window.innerWidth > 900) {
      var rect = section.getBoundingClientRect();
      var scrollDistance = section.offsetHeight - window.innerHeight;
      var topOffset = 108;
      var centers = [0.15, 0.50, 0.85];
      var targetFrac = centers[idx] !== undefined ? centers[idx] : 0.5;
      var targetY = window.scrollY + rect.top - topOffset + (scrollDistance * targetFrac);
      window.scrollTo({ top: targetY, behavior: "smooth" });
    }
  }

  items.forEach(function (item, idx) {
    item.addEventListener("click", function () {
      scrollToStep(idx);
    });
  });

  if (prevBtn) {
    prevBtn.addEventListener("click", function () {
      var target = active <= 0 ? items.length - 1 : active - 1;
      scrollToStep(target);
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener("click", function () {
      var target = active >= items.length - 1 ? 0 : active + 1;
      scrollToStep(target);
    });
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll, { passive: true });
  activate(0);
})();

// Scholarships Option 2: Numbered Tabbed Card
(function () {
  var section = document.getElementById("sec-pdm-scholarships-alt");
  if (!section) return;
  var tabs = Array.from(section.querySelectorAll(".gss-pd-scholarships-tabbed-tab"));
  var panels = [
    section.querySelector("#schol2-merit"),
    section.querySelector("#schol2-need"),
    section.querySelector("#schol2-accommodation")
  ].filter(Boolean);

  tabs.forEach(function (tab) {
    tab.addEventListener("click", function () {
      var targetId = tab.getAttribute("data-panel");
      tabs.forEach(function (t) {
        var isCurrent = (t === tab);
        t.classList.toggle("active", isCurrent);
        t.setAttribute("aria-selected", isCurrent ? "true" : "false");
      });
      panels.forEach(function (p) {
        if (p.id === targetId) {
          p.style.display = "block";
          p.classList.add("active");
        } else {
          p.style.display = "none";
          p.classList.remove("active");
        }
      });
    });
  });
})();

// Key Highlights: Top Icon Carousel interaction
(function () {
  var row = document.getElementById("pdmHlIconRow");
  if (!row) return;
  var cards = Array.from(row.querySelectorAll(".gss-pd-highlights-icon-card"));
  var dotsContainer = document.getElementById("pdmHlIconDots");
  var dots = dotsContainer ? Array.from(dotsContainer.querySelectorAll(".gss-pd-highlights-dot")) : [];
  var prevBtn = document.getElementById("pdmHlIconPrev");
  var nextBtn = document.getElementById("pdmHlIconNext");
  var active = 2; // Default to Liberal Education

  function setActive(idx) {
    if (idx < 0) idx = 0;
    if (idx >= cards.length) idx = cards.length - 1;
    active = idx;
    cards.forEach(function (c, i) {
      c.classList.toggle("active", i === active);
    });
    dots.forEach(function (d, i) {
      d.classList.toggle("on", i === active);
    });
    // Scroll into view within row container
    var card = cards[active];
    if (card && row) {
      var cardLeft = card.offsetLeft;
      var cardWidth = card.offsetWidth;
      var rowWidth = row.offsetWidth;
      row.scrollTo({
        left: cardLeft - (rowWidth / 2) + (cardWidth / 2),
        behavior: "smooth"
      });
    }
  }

  cards.forEach(function (card, i) {
    card.addEventListener("click", function () {
      setActive(i);
    });
  });

  dots.forEach(function (dot, i) {
    dot.addEventListener("click", function () {
      setActive(i);
    });
  });

  if (prevBtn) {
    prevBtn.addEventListener("click", function () {
      setActive(active - 1);
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener("click", function () {
      setActive(active + 1);
    });
  }
})();

// Key Highlights: Bottom 3D Photo Carousel interaction (apply-gitam 3D stage pattern)
(function () {
  var stage = document.getElementById("pdmPhotoStage");
  var track = document.getElementById("pdmPhotoTrack");
  if (!stage || !track) return;

  var cards = Array.from(track.querySelectorAll(".pl-card"));
  var dotsContainer = document.getElementById("pdmPhotoDots");
  var prevBtn = document.getElementById("pdmPhotoPrev");
  var nextBtn = document.getElementById("pdmPhotoNext");
  var total = cards.length;
  if (total === 0) return;

  var active = 2; // default to center card

  var numUniqueCards = total >= 10 ? Math.floor(total / 2) : total;

  // Setup 5 dots
  if (dotsContainer) {
    dotsContainer.innerHTML = "";
    for (var d = 0; d < numUniqueCards; d++) {
      (function (dotIdx) {
        var dot = document.createElement("div");
        dot.className = "pl-dot" + (dotIdx === (active % numUniqueCards) ? " active" : "");
        dot.addEventListener("click", function () {
          var opt1 = dotIdx;
          var opt2 = dotIdx + numUniqueCards;
          var target = Math.abs(opt1 - active) <= Math.abs(opt2 - active) ? opt1 : opt2;
          setActive(target);
        });
        dotsContainer.appendChild(dot);
      })(d);
    }
  }
  var dots = dotsContainer ? Array.from(dotsContainer.children) : [];

  var mobileMq = window.matchMedia("(max-width: 600px)");

  function update() {
    var isMobile = mobileMq.matches;
    cards.forEach(function (card, i) {
      var offset = i - active;
      if (offset > total / 2) offset -= total;
      if (offset < -total / 2) offset += total;
      var abs = Math.abs(offset);

      if (isMobile) {
        var isCurrent = abs === 0;
        card.style.transform = "translateX(0) scale(1)";
        card.style.opacity = isCurrent ? "1" : "0";
        card.style.visibility = isCurrent ? "visible" : "hidden";
        card.style.filter = "none";
        card.style.zIndex = isCurrent ? "10" : "1";
        card.style.pointerEvents = isCurrent ? "auto" : "none";
        card.classList.toggle("is-active", isCurrent);
        return;
      }

      var direction = offset < 0 ? -1 : 1;
      var scale, opacity, brightness, x, z, rotateY;
      if (abs === 0) {
        scale = 1.18;
        opacity = 1;
        brightness = 1;
        x = 0;
        z = 10;
        rotateY = 0;
        card.style.visibility = "visible";
      } else if (abs === 1) {
        scale = 0.82;
        opacity = 0.82;
        brightness = 0.68;
        x = direction * 335;
        z = 7;
        rotateY = offset * -5;
        card.style.visibility = "visible";
      } else if (abs === 2) {
        scale = 0.64;
        opacity = 0.52;
        brightness = 0.48;
        x = direction * 590;
        z = 4;
        rotateY = offset * -6;
        card.style.visibility = "visible";
      } else {
        scale = 0.5;
        opacity = 0;
        brightness = 0.3;
        x = direction * 800;
        z = 1;
        rotateY = 0;
        card.style.visibility = "hidden";
      }

      card.style.transform = "translateX(" + x + "px) scale(" + scale + ") rotateY(" + rotateY + "deg)";
      card.style.opacity = opacity;
      card.style.filter = "brightness(" + brightness + ")";
      card.style.zIndex = z;
      card.style.pointerEvents = abs > 2 ? "none" : "auto";
      card.classList.toggle("is-active", abs === 0);
    });

    dots.forEach(function (dot, i) {
      dot.classList.toggle("active", i === (active % numUniqueCards));
    });
  }

  function setActive(idx) {
    active = (idx + total) % total;
    update();
  }

  cards.forEach(function (card, i) {
    card.addEventListener("click", function () {
      if (i !== active) {
        setActive(i);
      }
    });
  });

  if (prevBtn) {
    prevBtn.addEventListener("click", function () {
      setActive(active - 1);
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener("click", function () {
      setActive(active + 1);
    });
  }

  // Touch swipe support
  var startX = 0;
  stage.addEventListener("touchstart", function (e) {
    startX = e.touches[0].clientX;
  }, { passive: true });

  stage.addEventListener("touchend", function (e) {
    var diffX = e.changedTouches[0].clientX - startX;
    if (Math.abs(diffX) > 40) {
      if (diffX < 0) setActive(active + 1);
      else setActive(active - 1);
    }
  }, { passive: true });

  window.addEventListener("resize", update);
  update();
})();

// Curriculum: Year dropdown selector
(function () {
  var wrap = document.getElementById("pdmYearDropdown");
  if (!wrap) return;
  var btn = document.getElementById("pdmYearBtn");
  var label = document.getElementById("pdmYearLabel");
  var menu = document.getElementById("pdmYearMenu");
  var options = Array.from(menu ? menu.querySelectorAll(".gss-pd-curriculum-select-option") : []);
  var dlBtn = document.getElementById("pdmDlSyllabusBtn");

  function toggleMenu() {
    var isOpen = wrap.classList.toggle("is-open");
    btn.setAttribute("aria-expanded", isOpen ? "true" : "false");
  }

  function closeMenu() {
    wrap.classList.remove("is-open");
    btn.setAttribute("aria-expanded", "false");
  }

  btn.addEventListener("click", function (e) {
    e.stopPropagation();
    toggleMenu();
  });

  options.forEach(function (opt) {
    opt.addEventListener("click", function (e) {
      e.stopPropagation();
      var val = opt.getAttribute("data-value");
      label.textContent = val;
      options.forEach(function (o) {
        var isSel = o === opt;
        o.classList.toggle("is-selected", isSel);
        o.setAttribute("aria-selected", isSel ? "true" : "false");
      });
      closeMenu();
    });
  });

  document.addEventListener("click", function (e) {
    if (!wrap.contains(e.target)) {
      closeMenu();
    }
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      closeMenu();
    }
  });

  if (dlBtn) {
    dlBtn.addEventListener("click", function () {
      var selectedYear = label ? label.textContent.trim() : "2026–27";
      alert("Downloading B.Sc. Chemistry Syllabus (" + selectedYear + ")...\n\nOfficial syllabus PDF will be downloaded when published by GITAM.");
    });
  }
})();

// Admission Helpdesk Carousel (arrow navigation and dot indicators)
(function () {
  var track = document.getElementById("pdmHelpdeskTrack");
  var prevBtn = document.getElementById("pdmHelpdeskPrev");
  var nextBtn = document.getElementById("pdmHelpdeskNext");
  var dotsContainer = document.getElementById("pdmHelpdeskDots");
  if (!track) return;

  var dots = dotsContainer ? Array.from(dotsContainer.querySelectorAll(".gss-pd-admission-dot")) : [];

  function updateActiveDot() {
    if (!dots.length) return;
    var scrollLeft = track.scrollLeft;
    var maxScroll = track.scrollWidth - track.clientWidth;
    if (maxScroll <= 0) {
      dots.forEach(function (dot, i) {
        dot.classList.toggle("on", i === 0);
      });
      return;
    }
    var ratio = scrollLeft / maxScroll;
    var activeIndex = Math.min(Math.max(0, Math.round(ratio * (dots.length - 1))), dots.length - 1);
    dots.forEach(function (dot, i) {
      dot.classList.toggle("on", i === activeIndex);
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener("click", function () {
      var card = track.querySelector(".gss-pd-admission-staff-card");
      var amount = card ? (card.offsetWidth + 18) * 2 : 300;
      track.scrollBy({ left: -amount, behavior: "smooth" });
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener("click", function () {
      var card = track.querySelector(".gss-pd-admission-staff-card");
      var amount = card ? (card.offsetWidth + 18) * 2 : 300;
      track.scrollBy({ left: amount, behavior: "smooth" });
    });
  }

  dots.forEach(function (dot, i) {
    dot.addEventListener("click", function () {
      var maxScroll = track.scrollWidth - track.clientWidth;
      if (maxScroll <= 0) return;
      var target = (i / (dots.length - 1)) * maxScroll;
      track.scrollTo({ left: target, behavior: "smooth" });
    });
  });

  track.addEventListener("scroll", updateActiveDot, { passive: true });
  window.addEventListener("resize", updateActiveDot);
})();

// Career options list scroll
(function () {
  const list = document.getElementById("pdmCareerList");
  const prog = document.getElementById("pdmCareerProg");
  const btnUp = document.getElementById("pdmCareerUp");
  const btnDown = document.getElementById("pdmCareerDown");
  if (!list || !prog) return;

  function updateProgress() {
    const maxScroll = list.scrollHeight - list.clientHeight;
    if (maxScroll <= 0) {
      prog.style.height = "100%";
      prog.style.top = "0%";
      return;
    }
    const ratio = list.scrollTop / maxScroll;
    const thumbHeight = Math.max(20, (list.clientHeight / list.scrollHeight) * 100);
    const availableTravel = 100 - thumbHeight;
    prog.style.height = thumbHeight + "%";
    prog.style.top = ratio * availableTravel + "%";
  }

  if (btnUp) {
    btnUp.addEventListener("click", function () {
      list.scrollBy({ top: -75, behavior: "smooth" });
    });
  }

  if (btnDown) {
    btnDown.addEventListener("click", function () {
      list.scrollBy({ top: 75, behavior: "smooth" });
    });
  }

  list.addEventListener("scroll", updateProgress, { passive: true });
  window.addEventListener("resize", updateProgress);
  window.addEventListener("load", updateProgress);
  updateProgress();
})();
