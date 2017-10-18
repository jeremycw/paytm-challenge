paytmChallengeApp.Router = function(routes) {
  var parseQueryString = function(queryString) {
    var params = {};
    queryString.split("&").forEach(function(pair) {
      var tmp = pair.split("=");
      params[tmp[0]] = tmp[1];
    });
    return params;
  };

  window.onhashchange = function() {
    var tmp = window.location.hash.split("?");
    var path = tmp[0].substr(1);
    if (tmp.length > 1) {
      var queryString = tmp[1];
      var params = parseQueryString(queryString);
      routes[path].goTo(routes[path], params);
    } else {
      routes[path].goTo(routes[path]);
    }
  };
};
