function DuplicateNodes() {
  $("[data-duplicate]").each(function (index, element) {
    const count = parseInt($(this).attr("data-duplicate"));
    for (let index = 0; index < count; index++) {
      const clone = $(this).clone();
      $(this).after(clone);
    }
  });
}
function handleMobileMenu() {
  const menu = new MobileMenu();
  // attach events
  menu.init();
  // possible manipulations
  // menu.open();
  // menu.close();
}
$(function () {
  handleMobileMenu();
  DuplicateNodes();
});
