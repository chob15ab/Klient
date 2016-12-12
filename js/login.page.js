
$(document).ready(function () {
  var sessionId = SDK.Storage.load("sessionId");
  if (sessionId) {
    alert("session id was: " + sessionId);
    SDK.logOut();
  }

  $("#loginButton").on("click", function(e){
    e.preventDefault();

    var email = $("#inputEmail").val();
    var pw = $("#inputPassword").val();

    SDK.login(email, pw, function(err, data){

      //On wrong credentials
      if(err) {
        return $("#loginForm").find(".form-group").addClass("has-error");
      }

      //Login OK!
      $("#loginForm").find(".form-group").addClass("has-success");

      deleteAllCookies();
      document.cookie = data.sessionId;

      if (data.type === "admin") {
        window.location.href="admin.html";
      }

      else if (data.type === "student") {
        window.location.href="bruger.html";
      }

      else if (data.type === "teacher") {
        window.location.href="teacher.html";
      }

      else {
        window.alert("Der er en fejl")
      }
    });

  });

});

function deleteAllCookies() {
  var cookies = document.cookie.split(";");

  for (var i = 0; i < cookies.length; i++) {
    var cookie = cookies[i];
    var eqPos = cookie.indexOf("=");
    var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
    document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
  }
}