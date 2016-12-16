$(document).ready(function () {

  //Fires on page-load
  SDK.User.getAll(function (err, users) {
    if (err) throw err;

    var $usersTableBody = $("#usersTableBody");
    users.forEach(function (user) {

      $usersTableBody.append(
        "<tr>" +
        "<td>" + user.firstName + " " + user.lastName + "</td>" +
        "<td>" + user.username + "</td>" +
        "<td>" + user.email + "</td>" +
        "<td>" + user.id + "</td>" +
        "</tr>");
    });

  });

  var currentUser = SDK.User.current();
  $("#currentUserName").text(currentUser.firstName +  " " + currentUser.lastName);



  $("#addNewUserButton").on("click", function () {

  });



  $("#logOutLink").on("click", function(){
    SDK.logOut();
    window.location.href = "index.html";
  });


});
