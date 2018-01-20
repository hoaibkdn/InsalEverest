var httpServices = app.services.httpServices
var header = {"Content-Type": "application/json"}
app.services.loginServices = {
  login: function (path, user) {
    return httpServices.post(path, JSON.stringify(user), {"Content-Type": "application/json"})
  }
}
