var httpServices = {
  url: app.constant.baseUrl,
  get: function(path) {
    return $.ajax({
      url: this.url+ '/' + path,
      method: 'GET',
      xhrFields: {
        withCredentials: true
      },
      headers: {
        Accept: "application/json"
      }
    });
  },

  post: function(path, data, headers) {
    return $.ajax({
      url: this.url+ '/' + path,
      method: "POST",
      contentType: 'application/json',
      data: data,
      xhrFields: {
        withCredentials: true
      },
      headers: (headers) ? {
        Accept: "application/json"
      } : null
    });
  },

  uploadFile: function(path, data) {
    return $.ajax({
      url: this.url + '/' + path,
      type : 'POST',
      data : data,
      processData : false,
      contentType : false,
      xhrFields: {
        withCredentials: true
      },
    });
  },

  put: function(path, data) {
    return $.ajax({
      url: this.url + '/' + path,
      method: 'PUT',
      contentType: 'application/json',
      data: data,
      xhrFields: {
        withCredentials: true
      },
      headers: {
        Accept: "application/json"
      }
    });
  },

  delete: function(path) {
    return $.ajax({
      url: this.url + '/' + path,
      type: 'DELETE',
      xhrFields: {
        withCredentials: true
      },
      headers: {
        Accept: "application/json"
      }
    });
  },

  handleError: function() {
    $(document).ajaxError(function(event, jqxhr, settings, thrownError){
      var currentPath = window.location.pathname;
      if(jqxhr.status === 401 && currentPath !== constant.signInPath) {
        console.log('@@@4');
        localStorage.removeItem('onera_sessionID');
        localStorage.removeItem('username');
        window.location.href= '/';
      }
    });
  }
}
