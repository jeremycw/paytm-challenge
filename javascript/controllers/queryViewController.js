paytmChallengeApp.QueryViewController = function(http, queryView) {
  queryView.handle(":show", function(params) {
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
  });

  queryView.handle("search:submit", function(params) {
    http.post("/queries", params,
      function(data) {
        queryView.displayResults(data.results);
      },
      function(error) {
        queryView.displayError("Error");
      });
  });

  queryView.handle("logout:click", function() {
    http.clearToken();
  });
};
