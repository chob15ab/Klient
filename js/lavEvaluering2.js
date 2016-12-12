/**
 * Created by christofferobel on 29/11/2016.
 */
$(document).ready(function(){

    initiateSelectCourse();

    $("#createEvaluationSubmit").on("click", function(){
        var sessionId = document.cookie;
        if (!sessionId)
            return;
        var comment = $("#createEvaluationComment").val();
        var rating = $("#createEvaluationRating").val();

        //$.post( "http://localhost:6274/api/student/review/"+sessionId,  )
        $.ajax({
            type: "POST",
            url: "http://localhost:6274/api/student/review",
            contentType: "application/json",
            dataType: "json",
            data: { "val": sessionId },//, json: { "lectureId": lectureId, "rating": rating, "comment": comment, "isDeleted": 0} },
            success: function (data, status, xhr) {
                alert("yey");
            },
            error: function (xhr, status, errorThrown) {
                alert("phaaaak");
            }
        });
    });
/*
 private int id;
 private int userId;
 private int lectureId;
 private int rating;
 private String comment;
 private boolean isDeleted;
 */
});
/*
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
