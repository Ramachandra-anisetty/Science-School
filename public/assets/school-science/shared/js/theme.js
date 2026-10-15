/**
 * GITAM Unified Theme Interactive Logic
 */
document.addEventListener("DOMContentLoaded", () => {
  // 1. Navigation Scroll Spy for Floating Dock (#page-nav)
  const setupScrollSpy = () => {
    const dockItems = document.querySelectorAll(".pnav-btn");
    const sections = Array.from(dockItems).map((item) => {
      const targetId = item.dataset.target;
      return targetId ? document.getElementById(targetId) : null;
    }).filter(Boolean);

    if (!dockItems.length || !sections.length) return;

    window.addEventListener("scroll", () => {
      let currentSectionId = "";
      const scrollPos = window.scrollY + window.innerHeight * 0.4;
      const isBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 80;

      if (isBottom && sections.length > 0) {
        currentSectionId = sections[sections.length - 1].getAttribute("id");
      } else {
        sections.forEach((sec) => {
          if (scrollPos >= sec.offsetTop) {
            currentSectionId = sec.getAttribute("id");
          }
        });
      }

      dockItems.forEach((btn) => {
        btn.classList.toggle("active", btn.dataset.target === currentSectionId);
      });
    });
  };

  // 2. Video Modal Popup Handler (.gs-watch)
  const setupVideoModal = () => {
    const overlay = document.getElementById("overlay") || document.getElementById("outcomeModal");
    const modalTitle = document.getElementById("modalTitle");
    const modalInfo = document.getElementById("modalInfo") || document.getElementById("modalBody");
    const ytIframe = document.getElementById("yt");

    document.querySelectorAll(".gs-watch").forEach((trigger) => {
      trigger.addEventListener("click", (e) => {
        e.preventDefault();
        const title = trigger.dataset.title || "GITAM School Video";
        const info = trigger.dataset.info || "";
        const videoUrl = trigger.dataset.video || "https://www.youtube.com/watch?v=dQw4w9WgXcQ";

        if (modalTitle) modalTitle.textContent = title;
        if (modalInfo) modalInfo.textContent = info;

        if (ytIframe && videoUrl) {
          try {
            const urlObj = new URL(videoUrl);
            let vId = urlObj.searchParams.get("v");
            if (!vId && (urlObj.hostname === "youtu.be" || urlObj.hostname.endsWith(".youtu.be"))) {
              vId = urlObj.pathname.replace(/^\//, "");
            }
            if (!vId) {
              vId = urlObj.pathname.split("/").filter(Boolean).pop() || "";
            }
            if (vId) {
              ytIframe.src = "https://www.youtube.com/embed/" + vId + "?autoplay=1";
            }
          } catch (err) {
            console.warn("Invalid YouTube URL:", videoUrl);
          }
        }

        if (overlay) overlay.classList.add("open", "is-open");
        document.body.classList.add("modal-open");
      });
    });
  };

  // 4. Gitam Header Mobile Drawer & Scroll-to-top Interactions
  const setupGitamHeader = () => {
    const toggler = document.getElementById("mobileGitamToggler");
    const drawer = document.getElementById("mobileDrawer");
    const closeBtn = document.getElementById("mobileDrawerClose");
    const overlay = document.getElementById("mobileDrawerOverlay");

    const openDrawer = () => {
      if (drawer) {
        drawer.classList.add("open");
        drawer.setAttribute("aria-hidden", "false");
      }
      if (overlay) {
        overlay.classList.add("open");
        overlay.setAttribute("aria-hidden", "false");
      }
      document.body.style.overflow = "hidden";
    };

    const closeDrawer = () => {
      if (drawer) {
        drawer.classList.remove("open");
        drawer.setAttribute("aria-hidden", "true");
      }
      if (overlay) {
        overlay.classList.remove("open");
        overlay.setAttribute("aria-hidden", "true");
      }
      document.body.style.overflow = "";
    };

    if (toggler) toggler.addEventListener("click", openDrawer);
    if (closeBtn) closeBtn.addEventListener("click", closeDrawer);
    if (overlay) overlay.addEventListener("click", closeDrawer);

    const scrollTopBtn = document.getElementById("footerScrollTop");
    if (scrollTopBtn) {
      scrollTopBtn.addEventListener("click", (e) => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: "smooth" });
      });
    }
  };

  setupScrollSpy();
  setupVideoModal();
  setupGitamHeader();
});
