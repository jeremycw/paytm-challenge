paytmChallengeApp.Views = function() {
  var views = {};

  views.addView = function(view, name) {
    views[name] = view;
  };

  return views;
};
