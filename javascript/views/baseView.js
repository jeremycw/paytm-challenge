paytmChallengeApp.BaseView = function(views) {

  return {
    onShow: function() {},
    onHide: function() {},

    hide: function(params) {
      this.onHide(params);
      $("#"+views.current.id).css('display', 'none');
    },

    show: function(params) {
      this.onShow(params);
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
