paytmChallengeApp.HistoryView = function(baseView) {
  var historyView = {
    id: "history-view",

    displayHistory: function(data) {
      $("#history-results ul").empty();
      data.forEach(function(item) {
        $("#history-results ul").append("<li><a href=\"#/queries/"+item.id+"\">"+item.string+"</a></li>");
      });
    },

    __proto__: baseView
  };

  $("#history-back").live("click", function(e) {
    historyView.backHandler();
  });

  $("#history-results a").live("click", function(e) {
    var queryId = $(this).attr("href").split("/")[2];
    historyView.selectQueryHandler(queryId);
  });

  return historyView;
};
