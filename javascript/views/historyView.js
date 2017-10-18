paytmChallengeApp.HistoryView = function(baseView) {
  var historyView = {
    id: "history-view",

    displayHistory: function(data) {
      $("#history-results ul").empty();
      data.forEach(function(item) {
        $("#history-results ul").append("<li><a href=\"#/query?id="+item.id+"\">"+item.string+"</a></li>");
      });
    },

    __proto__: baseView
  };

  return historyView;
};
