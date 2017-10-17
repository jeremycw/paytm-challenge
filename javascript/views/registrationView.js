paytmChallengeApp.RegistrationView = function(baseView) {
  var registrationView = {
    id: "register-view",
    registerFormId: "register-form",
    loginFormId: "login-form",
    loginHandler: null,
    registrationHandler: null,
    __proto__: baseView
  };

  $("#register-form").live("submit", function(e) {
    e.preventDefault();
    registrationView.registrationHandler({ user: {
      email: $("#register-email").val(),
      password: $("#register-pwd").val(),
      password_confirmation: $("#register-pwd-conf").val()
    } });
  });
  $("#login-form").live("submit", function(e) {
    e.preventDefault();
    registrationView.loginHandler({ session: {
      email: $("#login-email").val(),
      password: $("#login-pwd").val(),
    } });
  });

  return registrationView;

};
