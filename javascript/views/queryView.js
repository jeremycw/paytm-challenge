paytmChallengeApp.QueryView = function(baseView) {
  var queryView = {
    id: "query-view",
    queryHandler: null,
    logoutHandler: null,
    historyHandler: null,

    displayResults: function(data) {
      this.clearResults();
      data.forEach(function(item) {
        $("#query-results ul").append(
            "<li>" +
              "Name: " + item.name +
              "</br>" +
              "Cost: $" + item.price_in_cents / 100 +
              "</br>" +
              "Volume: " + item.volume_in_milliliters + "ml" +
              "</br>" +
              "Alcohol %: " + item.alcohol_content / 100 +
              "</br>" +
              "Price per liter of alcohol: $" + item.price_per_liter_of_alcohol_in_cents / 100 +
              "</br>" +
            "</li>"
          );
      });
    },

    clearResults: function() {
      $("#query-results ul").empty();
    },

    __proto__: baseView
  };

  $("#query-form").live("submit", function(e) {
    e.preventDefault();
    queryView.queryHandler({ q: $("#query-string").val() });
  });

  $("#logout-link").live("click", function(e) {
    queryView.logoutHandler();
  });

  return queryView;
};
