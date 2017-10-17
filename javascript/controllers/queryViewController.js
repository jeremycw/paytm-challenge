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
