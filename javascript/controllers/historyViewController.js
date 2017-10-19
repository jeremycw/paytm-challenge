paytmChallengeApp.HistoryViewController = function(http, historyView) {
  historyView.eventHandler = function(eventName) {
    if (eventName === ":show") {
      http.get("/queries", null,
        function(data) {
          historyView.displayHistory(data);
        },
        function(error) {
          historyView.displayError("Error");
        });
    }
  };
};
