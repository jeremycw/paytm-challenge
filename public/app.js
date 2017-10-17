var paytmChallengeApp = { };

(function(ns) {
  $(document).ready(function() {
    var http = ns.Http();
    var views = ns.Views();
    var baseView = ns.BaseView(views);
    var registrationView = ns.RegistrationView(baseView);
    var queryView = ns.QueryView(baseView);
    var historyView = ns.HistoryView(baseView);

    views.addView(registrationView, "registrationView");
    views.addView(queryView, "queryView");
    views.addView(historyView, "historyView");

    views.current = registrationView;

    ns.RegistrationViewController(http, registrationView);
    ns.QueryViewController(http, queryView);
    ns.HistoryViewController(http, historyView);

    if (http.token) {
      views.current.goTo("queryView");
    }
  });
}(paytmChallengeApp));

paytmChallengeApp.Http = function() {
  var http = {};
  http.token = window.localStorage.getItem("token");

  var generateHeaders = function() {
    var headers = {};
    if (http.token) {
      headers["Authentication"] = "Bearer " + http.token;
    }
    return headers;
  };

  http.setToken = function(token) {
    this.token = token;
    window.localStorage.setItem("token", token);
  };

  http.clearToken = function() {
    window.localStorage.removeItem("token");
  };

  http.get = function(url, data, success, error) {
    $.ajax({
      url: url,
      type: 'GET',
      data: data,
      contentType: 'application/json',
      headers: generateHeaders(),
      success: success,
      error: error
    });
  };

  http.post = function(url, data, success, error) {
    $.ajax({
      url: url,
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify(data),
      headers: generateHeaders(),
      success: success,
      error: error
    });
  };

  return http;
};

paytmChallengeApp.Views = function() {
  var views = {};

  views.addView = function(view, name) {
    views[name] = view;
  };

  return views;
}

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

paytmChallengeApp.RegistrationView = function(baseView) {
  var registrationView = {
    id: "register-view",
    registerFormId: "register-form",
    loginFormId: "login-form",
    loginHandler: null,
    registrationHandler: null,
    __proto__: baseView
  };

  $("#register-form").live("submit", function(e) {
    e.preventDefault();
    registrationView.registrationHandler({ user: {
      email: $("#register-email").val(),
      password: $("#register-pwd").val(),
      password_confirmation: $("#register-pwd-conf").val()
    } });
  });
  $("#login-form").live("submit", function(e) {
    e.preventDefault();
    registrationView.loginHandler({ session: {
      email: $("#login-email").val(),
      password: $("#login-pwd").val(),
    } });
  });

  return registrationView;

};

paytmChallengeApp.QueryView = function(baseView) {
  var queryView = {
    id: "query-view",
    queryHandler: null,
    logoutHandler: null,
    historyHandler: null,

    displayResults: function(data) {
      this.clearResults();
      data.forEach(function(item) {
        $("#query-results ul").append("<li>"+item.name+"</li>");
      });
    },

    clearResults: function() {
      $("#query-results ul").empty();
    },

    __proto__: baseView
  };

  $("#query-form").live("submit", function(e) {
    e.preventDefault();
    queryView.queryHandler({ q: $("#query-string").val() });
  });

  $("#logout-link").live("click", function(e) {
    queryView.logoutHandler();
  });

  $("#history-link").live("click", function(e) {
    queryView.historyHandler();
  });

  return queryView;
};

paytmChallengeApp.HistoryView = function(baseView) {
  var historyView = {
    id: "history-view",

    displayHistory: function(data) {
      $("#history-results ul").empty();
      data.forEach(function(item) {
        $("#history-results ul").append("<li><a href=\"#/queries/"+item.id+"\">"+item.string+"</a></li>");
      });
    },

    __proto__: baseView
  };

  $("#history-back").live("click", function(e) {
    historyView.backHandler();
  });

  $("#history-results a").live("click", function(e) {
    var queryId = $(this).attr("href").split("/")[2];
    historyView.selectQueryHandler(queryId);
  });

  return historyView;
};

paytmChallengeApp.HistoryViewController = function(http, historyView) {
  historyView.onShow = function() {
    http.get("/queries", null,
      function(data) {
        historyView.displayHistory(data);
      },
      function(error) {
        historyView.displayError("Error");
      });
  };

  historyView.backHandler = function() {
    historyView.goTo("queryView");
  };

  historyView.selectQueryHandler = function(queryId) {
    historyView.goTo("queryView", queryId);
  };
};

paytmChallengeApp.RegistrationViewController = function(http, registrationView) {
  registrationView.registrationHandler = function(formData) {
      http.post("/users", formData,
        function(data) {
          http.setToken(data.auth_token);
          registrationView.goTo("queryView");
        },
        function(error) {
          registrationView.displayError("Error");
        });
  };

  registrationView.loginHandler = function(formData) {
    http.post("/session", formData,
      function(data) {
        http.setToken(data.auth_token);
        registrationView.goTo("queryView");
      },
      function(error) {
        registrationView.displayError("Error");
      });
  };
};

paytmChallengeApp.QueryViewController = function(http, queryView) {
  queryView.onShow = function(queryId) {
    queryView.clearResults();
    http.get("/queries/"+queryId, null,
      function(data) {
        queryView.displayResults(data.results);
      },
      function(error) {
        queryView.displayError("Error");
      });
  };

  queryView.queryHandler = function(formData) {
    http.post("/queries", formData,
      function(data) {
        queryView.displayResults(data.results);
      },
      function(error) {
        queryView.displayError("Error");
      });
  };

  queryView.logoutHandler = function() {
    http.clearToken();
    queryView.goTo("registrationView");
  };

  queryView.historyHandler = function() {
    queryView.goTo("historyView");
  };
};
