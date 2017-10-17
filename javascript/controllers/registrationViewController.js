paytmChallengeApp.RegistrationViewController = function(http, registrationView) {
  registrationView.registrationHandler = function(formData) {
      http.post("/users", formData,
        function(data) {
          http.setToken(data.auth_token);
          registrationView.goTo("queryView");
        },
        function(error) {
          registrationView.displayError("Error");
        });
  };

  registrationView.loginHandler = function(formData) {
    http.post("/session", formData,
      function(data) {
        http.setToken(data.auth_token);
        registrationView.goTo("queryView");
      },
      function(error) {
        registrationView.displayError("Error");
      });
  };
};
