paytmChallengeApp.BaseView = function(views) {

  return {
    eventHandler: function() {},

    hide: function(params) {
      this.eventHandler(":hide", params);
      $("#"+views.current.id).css('display', 'none');
    },

    show: function(params) {
      this.eventHandler(":show", params);
      $("#"+views.current.id).css('display', 'inline');
    },

    goTo: function(view, params) {
      views.current.hide(params);
      if (typeof view === "string") {
        views.current = views[view];
      } else {
        views.current = view;
      }
      views.current.show(params);
    },

    displayError: function(errorMsg) {
    }
  };

};
