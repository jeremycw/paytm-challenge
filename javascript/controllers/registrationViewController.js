paytmChallengeApp.RegistrationViewController = function(http, registrationView) {
  registrationView.eventHandler = function(eventName, params) {
    switch (eventName) {

    case "register":
      http.post("/users", { user: params },
        function(data) {
          http.setToken(data.auth_token);
          window.location = "#/query";
        },
        function(error) {
          registrationView.displayError("Error");
        });
      break;

    case "login":
      http.post("/session", { session: params },
        function(data) {
          http.setToken(data.auth_token);
          window.location = "#/query";
        },
        function(error) {
          registrationView.displayError("Error");
        });
      break;
    }
  };
};
