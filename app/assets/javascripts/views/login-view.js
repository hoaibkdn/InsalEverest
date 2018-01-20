app.views.LoginView = function () {
  this.handleEvent('login')
}

app.views.LoginView.prototype.getUserInfo = function () {
  var email = $('#inlineFormInputGroupUsername').val();
  var password = $('#inlineFormInputGroupPassword').val();
  return {email, password}
}

app.views.LoginView.prototype.login = function (userInfo) {
  var logingin = app.services.loginServices.login('api/v1/sessions', {'user': {...userInfo}});
  if(logingin.state() === 'pending') {
    $('.form__submit').html('Submit ...')
  }
  logingin.done(function (res) {
    console.log('res done', res)
    window.location.href = '/admin/tables'
  })
  .fail(function (res) {
    console.log('res fail ', res)
    // window.location.href = '/tables'
  })
}

app.views.LoginView.prototype.handleEvent = function (event) {
  var self = this;
  console.log('form-login---')
  switch (event) {
    case 'login':
      $('.form-login').on('click', '.form__submit', function (e) {
        console.log('form-login')
        e.preventDefault();
        var userInfo = self.getUserInfo()
        self.login(userInfo)
      })
      break;

    default:
      break;
  }
}
