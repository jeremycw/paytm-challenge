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
