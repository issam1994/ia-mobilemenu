/**
 *
 * @param {object} options configuration object
 * @param {function} options.onClose callback after close
 * @param {function} options.onOpen callback after open
 * @param {function} options.rtl set to true to make it appear from the left
 * @returns instance
 */
 function MobileMenu({
  onOpen = (instance) => null,
  onClose = (instance) => null,
  rtl = false,
} = {}) {
  const instance = this;
  const translationForHidden = rtl ? "translateX(-100%)" : "translateX(100%)";
  // attributes
  const wrapperAttr = "data-mobilemenu-wrapper";
  const triggerAttr = "data-mobilemenu-trigger";
  const headerAttr = "data-mobilemenu-header";
  const contentAttr = "data-mobilemenu-content";
  // elements
  instance.wrapper = $(`[${wrapperAttr}]`);
  instance.trigger = $(`[${triggerAttr}]`);
  instance.header = instance.wrapper.find(`[${headerAttr}]`);
  instance.content = instance.wrapper.find(`[${contentAttr}]`);
  // utilties
  instance.setDefaultStyles = function () {
      $("html").css({ overflowX: "hidden" });
      instance.wrapper.css({ transition: "all .3s ease-in-out" });
      instance.header.css({ transition: "all .3s ease-in-out" });
  };
  instance.setHTMLOverflowY = function (value = "auto") {
      $("html").css({ overflowY: value });
  };
  instance.isOpen = function () {
      return instance.wrapper.attr(wrapperAttr) === "open";
  };
  instance.open = function () {
      instance.wrapper.css({
          opacity: 1,
          transform: "translateX(0%)",
          "transition-delay": "0s",
      });
      instance.header.css({
          transform: "translateY(0%)",
          "transition-delay": ".3s",
      });
      instance.wrapper.attr(wrapperAttr, "open");
      instance.setHTMLOverflowY("hidden");
      onOpen(instance);
  };
  instance.close = function () {
      instance.header.css({
          transform: "translateY(-100%)",
          "transition-delay": "0s",
      });
      instance.wrapper.css({
          opacity: 0,
          right: 0,
          left: 0,
          transform: translationForHidden,
          "transition-delay": ".3s",
      });
      instance.wrapper.attr(wrapperAttr, "");
      instance.setHTMLOverflowY("");
      onClose(instance);
  };
  instance.handleTriggerClick = function () {
      instance.trigger.click(() => {
          if (instance.isOpen()) {
              instance.close();
          } else {
              instance.open();
          }
      });
  };
  instance.initialCheck = function () {
      if (instance.isOpen()) {
          instance.close();
      } else {
          // also close
          instance.close();
      }
  };
  instance.init = function () {
      instance.setDefaultStyles();
      instance.initialCheck();
      instance.handleTriggerClick();
  };

  return instance;
}
