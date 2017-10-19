paytmChallengeApp.Views = function() {
  var views = {};

  views.addView = function(view, name) {
    view.name = name;
    views[name] = view;
  };

  $("form[data-event]").live("submit", function(e) {
    e.preventDefault();
    var params = {};
    $(this).find("[name]").forEach(function(el) {
      params[$(el).attr("name")] = $(el).val();
    });
    views.current.eventHandler($(this).data("event"), params);
  });

  $("a[data-event]").live("click", function(e) {
    views.current.eventHandler($(this).data("event"));
  });
  return views;
};
