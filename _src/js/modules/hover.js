import vars from "../helpers.js";

/**
 * Узнать есть доступен ли ховер
 * @returns {boolean}
 */
function hasHoverSupport() {
  let hoverSupport;

  if (vars.isIE && vars.getScrollbarWidth()) {
    // On touch devices scrollbar width is usually 0
    hoverSupport = true;
  } else if (vars.isMobile()) {
    hoverSupport = false;
  } else if (
    window.matchMedia("(any-hover: hover)").matches ||
    window.matchMedia("(hover: hover)").matches
  ) {
    hoverSupport = true;
  } else if (window.matchMedia("(hover: none)").matches) {
    hoverSupport = false;
  } else {
    hoverSupport = typeof vars.$html.ontouchstart === "undefined";
  }

  return hoverSupport;
}

if (!hasHoverSupport()) {
  vars.$html.removeClass("has-hover").addClass("no-hover");
} else {
  vars.$html.removeClass("no-hover").addClass("has-hover");
}

/**
 * Переопределение доступности ховера
 */
function renderHover() {
  if (vars.winWidth !== window.innerWidth) {
    if (!hasHoverSupport()) {
      vars.$html.removeClass("has-hover").addClass("no-hover");
    } else {
      vars.$html.removeClass("no-hover").addClass("has-hover");
    }

    vars.winWidth = window.innerWidth;
  }
}

export default renderHover;
