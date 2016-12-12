/**
 * Created by christofferobel on 29/11/2016.
 */

$(document).ready(function(){

    initiateSelectCourse();

    $("#deleteEvaluationSubmit").on("click", function(){

        var sessionId = document.cookie;
        if (!sessionId)
            return;
        alert(sessionId);
        $.ajax({
            url: "http://localhost:6274/api/student/review/"+sessionId,
            method: "DELETE",
            contentType: "application/json",
            dataType: "json",
            data: { json: {  "lectureId": lectureId } },
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




