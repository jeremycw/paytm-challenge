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
