paytmChallengeApp.Http = function() {
  var http = {};
  http.token = window.localStorage.getItem("token");

  var generateHeaders = function() {
    var headers = {};
    if (http.token) {
      headers["Authentication"] = "Bearer " + http.token;
    }
    return headers;
  };

  http.setToken = function(token) {
    this.token = token;
    window.localStorage.setItem("token", token);
  };

  http.clearToken = function() {
    window.localStorage.removeItem("token");
  };

  http.get = function(url, data, success, error) {
    $.ajax({
      url: url,
      type: 'GET',
      data: data,
      contentType: 'application/json',
      headers: generateHeaders(),
      success: success,
      error: error
    });
  };

  http.post = function(url, data, success, error) {
    $.ajax({
      url: url,
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify(data),
      headers: generateHeaders(),
      success: success,
      error: error
    });
  };

  return http;
};
