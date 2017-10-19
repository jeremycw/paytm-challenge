paytmChallengeApp.QueryViewController = function(http, queryView) {
  queryView.eventHandler = function(eventName, params) {
    switch (eventName) {

    case ":show":
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
      break;

    case "search:submit":
      http.post("/queries", params,
        function(data) {
          queryView.displayResults(data.results);
        },
        function(error) {
          queryView.displayError("Error");
        });
      break;

    case "logout:click":
      http.clearToken();
      break;
    }
  };
};
