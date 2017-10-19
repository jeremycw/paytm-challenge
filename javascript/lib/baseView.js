paytmChallengeApp.BaseView = function(views) {

  return {
    handlers: {},
    eventHandler: function(eventName, params) {
      if (this.handlers[eventName]) {
        this.handlers[eventName](params);
      }
    },

    handle: function(eventName, handler) {
      this.handlers[eventName] = handler;
    },

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
