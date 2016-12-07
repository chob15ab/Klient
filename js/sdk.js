var SDK = {

  serverURL: "http://localhost:6274/api",

  request: function (options, cb) {

    //Perform XHR
    $.ajax({
      url: SDK.serverURL + options.url,
      method: options.method,
      contentType: "application/json",
      dataType: "json",
      data: JSON.stringify(options.data),
      success: function (data, status, xhr) {
        cb(null, data, status, xhr);
      },
      error: function (xhr, status, errorThrown) {
        cb({xhr: xhr, status: status, error: errorThrown});
      }
    });
  },


  User: {
    getAll: function (cb) {
      SDK.request({method: "GET", url: "/login"}, cb);
    },
    current:function () {
      return SDK.Storage.load("user");
    }
  },


   login: function (username, password, cb) {
    this.request({
      data: {
        cbsMail: username,
        password: password
      },
      url: "/login",
      method: "POST"
    }, function (err, data) {

      //On login-error
      if (err) return cb(err);

      SDK.Storage.persist("userId", data.id);
      //SDK.Storage.persist("userId", data.userId);
      SDK.Storage.persist("type", data.type);

      cb(null, data);

    });
  },

  logOut:function() {
    SDK.Storage.remove("tokenId");
    SDK.Storage.remove("userId");
    SDK.Storage.remove("user");
  },

  Storage: {
    prefix: "CalenderSDK",
    persist: function (key, value) {
      window.localStorage.setItem(this.prefix + key, (typeof value === 'object') ? JSON.stringify(value) : value)
    },
    load: function (key) {
      var val = window.localStorage.getItem(this.prefix + key);
      try {
        return JSON.parse(val);
      }
      catch (e){
        return val;
      }
    },
    remove:function (key) {
      window.localStorage.removeItem(this.prefix + key);
    }
  }


};


