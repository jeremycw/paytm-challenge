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

    ns.Router({
      "/query": queryView,
      "/register": registrationView,
      "/history": historyView
    });

    if (http.token) {
      window.location = "#/query";
    }
  });
}(paytmChallengeApp));
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
};
paytmChallengeApp.QueryViewController = function(http, queryView) {
  queryView.onShow = function(params) {
    queryView.clearResults();
    if (params) {
      http.get("/queries/"+params.id, null,
        function(data) {
          queryView.displayResults(data.results);
        },
        function(error) {
          queryView.displayError("Error");
        });
    }
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
  };
};
paytmChallengeApp.RegistrationViewController = function(http, registrationView) {
  registrationView.registrationHandler = function(formData) {
      http.post("/users", formData,
        function(data) {
          http.setToken(data.auth_token);
          window.location = "#/query";
        },
        function(error) {
          registrationView.displayError("Error");
        });
  };

  registrationView.loginHandler = function(formData) {
    http.post("/session", formData,
      function(data) {
        http.setToken(data.auth_token);
        window.location = "#/query";
      },
      function(error) {
        registrationView.displayError("Error");
      });
  };
};
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
    this.token = null;
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
paytmChallengeApp.Router = function(routes) {
  var parseQueryString = function(queryString) {
    var params = {};
    queryString.split("&").forEach(function(pair) {
      var tmp = pair.split("=");
      params[tmp[0]] = tmp[1];
    });
    return params;
  };

  window.onhashchange = function() {
    var tmp = window.location.hash.split("?");
    var path = tmp[0].substr(1);
    if (tmp.length > 1) {
      var queryString = tmp[1];
      var params = parseQueryString(queryString);
      routes[path].goTo(routes[path], params);
    } else {
      routes[path].goTo(routes[path]);
    }
  };
};
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
paytmChallengeApp.HistoryView = function(baseView) {
  var historyView = {
    id: "history-view",

    displayHistory: function(data) {
      $("#history-results ul").empty();
      data.forEach(function(item) {
        $("#history-results ul").append("<li><a href=\"#/query?id="+item.id+"\">"+item.string+"</a></li>");
      });
    },

    __proto__: baseView
  };

  return historyView;
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
        $("#query-results ul").append(
            "<li>" +
              "Name: " + item.name +
              "</br>" +
              "Cost: $" + item.price_in_cents / 100 +
              "</br>" +
              "Volume: " + item.volume_in_milliliters + "ml" +
              "</br>" +
              "Alcohol %: " + item.alcohol_content / 100 +
              "</br>" +
              "Price per liter of alcohol: $" + item.price_per_liter_of_alcohol_in_cents / 100 +
              "</br>" +
            "</li>"
          );
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

  return queryView;
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
paytmChallengeApp.Views = function() {
  var views = {};

  views.addView = function(view, name) {
    views[name] = view;
  };

  return views;
};
