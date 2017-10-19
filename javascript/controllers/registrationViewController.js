paytmChallengeApp.RegistrationViewController = function(http, registrationView) {
  registrationView.handle("register:submit", function(params) {
    http.post("/users", { user: params },
      function(data) {
        http.setToken(data.auth_token);
        window.location = "#/query";
      },
      function(error) {
        registrationView.displayError("Error");
      });
  });

  registrationView.handle("login:submit", function(params) {
    http.post("/session", { session: params },
      function(data) {
        http.setToken(data.auth_token);
        window.location = "#/query";
      },
      function(error) {
        registrationView.displayError("Error");
      });
  });
};
