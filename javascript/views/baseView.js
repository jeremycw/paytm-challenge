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

    goTo: function(viewName, params) {
      views.current.hide(params);
      views.current = views[viewName];
      views.current.show(params);
    },

    displayError: function(errorMsg) {
    }
  };

};
