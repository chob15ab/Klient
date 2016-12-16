/**
 * Created by christofferobel on 29/11/2016.
 */

$(document).ready(function(){

    initiateSelectCourse();

    //create comment method
    $("#createEvaluationSubmit").on("click", function(){
        var sessionId = document.cookie;
        if (!sessionId)
            return;
        var comment = $("#createEvaluationComment").val();
        var rating = $("#createEvaluationRating").val();
        var evaluation = {
            "lectureId": lectureId,
            "rating": rating,
            "comment": comment,
        };
        /*connection to server is made
        //$.post( "http://localhost:6274/api/student/review/"+sessionId,  )*/
        $.ajax({
            type: "POST",
            url: "http://localhost:6274/api/student/review/"+sessionId,
            contentType: "application/json",
            dataType: "json",
            data: JSON.stringify(evaluation),
            success: function (data, status, xhr) {
                alert("Review saved.");
                $("#modul .closeButton").click();
            },
            error: function (xhr, status, errorThrown) {
                alert("phaaaak... something went wrong in the engine room.");
            }
        });
    });

});
