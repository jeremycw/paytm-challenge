paytmChallengeApp.HistoryViewController = function(http, historyView) {
  historyView.handle(":show", function() {
    http.get("/queries", null,
      function(data) {
        historyView.displayHistory(data);
      },
      function(error) {
        historyView.displayError("Error");
      });
  });
};
