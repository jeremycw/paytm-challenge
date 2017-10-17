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
