window.addEventListener("load", () => {
  if (window.location.hash) {
    history.replaceState(null, "", " ");
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.querySelector(".header__menu-toggle");
  const closeMenuBtn = document.querySelector(".sheet__close-btn");
  const body = document.body;
  const modalWindow = document.querySelector(".modal");
  const sheet = document.querySelector(".sheet");
  const lists = document.querySelectorAll(".experience__list");
  const sheetLinks = document.querySelectorAll(".sheet__link");

  const openSheet = () => {
    sheet.classList.add("sheet--active");
    modalWindow.classList.add("modal--active");
    body.style.overflow = "hidden";
  };

  const closeSheet = () => {
    sheet.classList.remove("sheet--active");
    modalWindow.classList.remove("modal--active");
    body.style.removeProperty("overflow");
  };

  menuToggle.addEventListener("click", openSheet);
  closeMenuBtn.addEventListener("click", closeSheet);

  sheetLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      const onTransitionEnd = () => {
        sheet.removeEventListener("transitionend", onTransitionEnd);
        const targetId = link.getAttribute("href");
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          targetElement.scrollIntoView({ behavior: "smooth" });
        }
      };
      sheet.addEventListener("transitionend", onTransitionEnd);
      closeSheet();
    });
  });

  const updateLines = () => {
    lists.forEach((list) => {
      const items = list.querySelectorAll(".experience__item");

      const existingLines = list.querySelectorAll(".line");
      existingLines.forEach((line) => line.remove());

      items.forEach((elem) => {
        const line = document.createElement("div");
        line.classList.add("line");
        list.appendChild(line);

        const itemRect = elem.getBoundingClientRect();
        const listRect = list.getBoundingClientRect();

        const top = itemRect.top - listRect.top;
        const left = 0;
        const width = itemRect.left - listRect.left;

        line.style.top = `${top + 17}px`;
        line.style.left = `${left}px`;
        line.style.width = `${width + 17}px`;
        line.style.zIndex = -10;
      });
    });
  };

  const resizeObserver = new ResizeObserver(() => {
    updateLines();
  });

  lists.forEach((list) => {
    resizeObserver.observe(list);
    const items = list.querySelectorAll(".experience__item");
    items.forEach((item) => resizeObserver.observe(item));
  });

  const progressLines = document.querySelectorAll(".skills__progress-line");

  progressLines.forEach((elem) => {
    const progressLineFill = elem.querySelector(".skills__progress-line__fill");
    const progress = elem.dataset.progress;
    progressLineFill.style.width = `${progress}%`;
  });

  updateLines();
});
