(function () {
  var maps = Array.from(document.querySelectorAll("[data-system-map]"));

  maps.forEach(function (map) {
    var links = Array.from(map.querySelectorAll("[data-stage-link]"));
    var panels = Array.from(map.querySelectorAll("[data-stage-panel]"));
    if (!links.length || links.length !== panels.length) return;

    function activate(id, moveFocus) {
      var panel = panels.find(function (item) { return item.id === id; });
      var link = links.find(function (item) { return item.getAttribute("href") === "#" + id; });
      if (!panel || !link) return;

      links.forEach(function (item) {
        var selected = item === link;
        item.setAttribute("aria-expanded", String(selected));
        if (selected) item.setAttribute("aria-current", "step");
        else item.removeAttribute("aria-current");
      });
      panels.forEach(function (item) { item.hidden = item !== panel; });
      if (moveFocus) link.focus();
    }

    links.forEach(function (link) {
      var id = link.getAttribute("href").slice(1);
      link.setAttribute("aria-controls", id);
      link.addEventListener("click", function (event) {
        event.preventDefault();
        activate(id, false);
        window.history.replaceState(null, "", "#" + id);
      });
    });

    var requested = window.location.hash.slice(1);
    var initial = panels.some(function (item) { return item.id === requested; }) ? requested : panels[0].id;
    map.dataset.enhanced = "true";
    activate(initial, false);
  });
})();
