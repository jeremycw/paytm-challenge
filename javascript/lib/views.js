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
    views.current.eventHandler($(this).data("event")+":submit", params);
  });

  $("form[data-event] input").live("input", function(e) {
    var params = {};
    params[$(this).attr("name")] = $(this).val();
    views.current.eventHandler($(this).parents("form").data("event")+":input", params);
  });

  $("[data-event]").live("click", function(e) {
    views.current.eventHandler($(this).data("event")+":click");
  });
  return views;
};
