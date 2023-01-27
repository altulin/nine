import * as bodyScrollLock from "body-scroll-lock";

const vars = {};

vars.$document = $(document);
vars.$window = $(window);
vars.$body = $(document.body);
vars.$html = $(document.documentElement);
vars.winWidth = window.innerWidth;
vars.isMobile = () => {
  return vars.winWidth <= 1024;
};
vars.isIE = () => {
  return vars.$html.hasClass("is-browser-ie");
};
vars.isIOS = () => {
  return vars.$html.hasClass("is-os-ios");
};

/**
 * Очистить текст от спецсимволов
 * @param {string} text Обязательное, строка для очистки
 * @returns {string} Очищенная строка
 */
vars.clearText = (text) => {
  return text.trim().replace(/\s+/g, " ");
};

/**
 * Создать куки запись
 * @param {string} name Обязательное, название записи
 * @param {string} value Обязательное, значение записи
 * @param {string} days Обязательное, время для жизни
 */
vars.setCookie = (name, value, days) => {
  let expires = "";

  if (days) {
    let date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = `; expires=${date.toUTCString()}`;
  }

  document.cookie = `${name}=${value || ""}${expires}; path=/`;
};

/**
 * Получить куки запись
 * @param {string} name Обязательное, название записи
 */
vars.getCookie = (name) => {
  const nameEQ = `${name}=`;
  const ca = document.cookie.split(";");

  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];

    while (c.charAt(0) === " ") {
      c = c.substring(1, c.length);
    }

    if (c.indexOf(nameEQ) === 0) {
      return c.substring(nameEQ.length, c.length);
    }
  }

  return null;
};

/**
 * Удалить куки запись
 * @param {string} name Обязательное, название записи
 */
vars.eraseCookie = (name) => {
  document.cookie = `${name}=; Max-Age=-99999999;`;
};

let dataScrollLocks;
/**
 * Блокирует скролл страницы
 * Необходим для использования модальных окон
 * @param {boolean} state Обязательное
 * @param {string} element Обязательное, элемент которому нужно разрешить скролл
 * @param {string} name Необязательное, ключ,
 * чтобы была возможность открывать окно поверх другого окна
 */
vars.lockScroll = (state, $element, name) => {
  const element = $element.get(0) ? $element.get(0) : $element;

  if (typeof dataScrollLocks === "undefined") {
    dataScrollLocks = new Set();
  }

  const scrollLocks = dataScrollLocks;

  if (state) {
    if (typeof name === "string") {
      scrollLocks.add(name);
    }

    bodyScrollLock.disableBodyScroll(element, {
      reserveScrollBarGap: true,
    });

    setImmediate(() => {
      vars.$html.addClass("is-lock-scroll");
    });
  } else {
    if (typeof name === "string") {
      scrollLocks.delete(name);
    }

    bodyScrollLock.enableBodyScroll(element);

    if (!scrollLocks.size) {
      bodyScrollLock.clearAllBodyScrollLocks();

      vars.$html.removeClass("is-lock-scroll");
    }
  }
};

/**
 * Скролл до элемента
 * @param {string} $container Обязательное, элемент к которому нужно скроллить
 * @param {string|number} time Необязательное, время скролла
 * @param {string|number} offset Необязательное, смещение скролла может быть + или -
 */
vars.scrollTo = ($container, time = 500, offset = 0) => {
  vars.$html.css("scroll-behavior", "initial");
  $("html, body")
    .stop()
    .animate(
      {
        scrollTop: `${$container.offset().top + parseInt(offset, 10)}`,
      },
      parseInt(time, 10)
    );

  setTimeout(() => {
    vars.$html.css("scroll-behavior", "");
  }, parseInt(time, 10) + 100);
};

let scrollDiv;

/**
 * Получить размер скроллбара если он есть
 * @returns {number} размер скроллбара
 */
vars.getScrollbarWidth = () => {
  const width = window.innerWidth - vars.$html.get(0).clientWidth;

  if (
    width ||
    document.documentElement.clientHeight >=
      document.documentElement.offsetHeight
  ) {
    return width;
  }

  // Document doesn't have a scrollbar, possibly because there is not enough content so browser doesn't show it
  if (!scrollDiv) {
    scrollDiv = document.createElement("div");
    scrollDiv.style.cssText =
      "width:100px;height:100px;overflow:scroll !important;position:absolute;top:-9999px";
    document.body.appendChild(scrollDiv);
  }

  return scrollDiv.offsetWidth - scrollDiv.clientWidth;
};

// vars.$window.on("resize", resize);

export default vars;
