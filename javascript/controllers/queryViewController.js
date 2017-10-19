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

  queryView.eventHandler = function(eventName, params) {
    switch (eventName) {

    case "search":
      http.post("/queries", formData,
        function(data) {
          queryView.displayResults(data.results);
        },
        function(error) {
          queryView.displayError("Error");
        });
      break;

    case "logout":
      http.clearToken();
      break;
    }
  };
};
