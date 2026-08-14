(function () {
  var themes = ["personal", "dossier", "hybrid"];
  var root = document.documentElement;
  var picker = document.querySelector("[data-theme-picker]");
  if (!picker) return;

  var trigger = picker.querySelector("[data-theme-trigger]");
  var popover = picker.querySelector("[data-theme-popover]");
  var buttons = Array.from(picker.querySelectorAll("[data-theme-option]"));

  function currentTheme() {
    return themes.includes(root.dataset.theme) ? root.dataset.theme : "hybrid";
  }

  function render() {
    var current = currentTheme();
    buttons.forEach(function (button) {
      button.setAttribute("aria-pressed", String(button.dataset.themeOption === current));
    });
  }

  function close() {
    popover.hidden = true;
    trigger.setAttribute("aria-expanded", "false");
  }

  trigger.addEventListener("click", function () {
    var willOpen = popover.hidden;
    popover.hidden = !willOpen;
    trigger.setAttribute("aria-expanded", String(willOpen));
  });

  buttons.forEach(function (button) {
    button.addEventListener("click", function () {
      var theme = button.dataset.themeOption;
      if (!themes.includes(theme)) return;
      root.dataset.theme = theme;
      try { window.localStorage.setItem("portfolio-theme", theme); } catch (error) { void error; }
      render();
      close();
    });
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") close();
  });

  document.addEventListener("click", function (event) {
    if (!picker.contains(event.target)) close();
  });

  render();
})();
