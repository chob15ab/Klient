/**
 * Created by christofferobel on 29/11/2016.
 */

var sletEvalueringButtonCssClass = "sletEvalueringButton";


$(document).ready(function(){
    initiateSelectCourse();
});

function modulOpened() {
    var sessionId = document.cookie;
    if (!sessionId)
        return;
    var $reviewTableBody = $("#reviewTableBody")
    $reviewTableBody.html("");

    //review is shown and lastly deleted if "deleteEvaluation is clicked
    $.getJSON("http://localhost:6274/api/review/"+sessionId+"/"+lectureId, function (reviews) {
        reviews = jQuery.parseJSON(reviews);
        reviews.forEach(function (review) {
            $reviewTableBody.append(
                "<tr data-id='"+review.id+"'>" +
                "<td><center>"+review.rating+"</center></td>" +
                "<td style='text-align:left;'>" + review.comment + "</td>" +
                "<td><center><button class='"+sletEvalueringButtonCssClass+"' onclick='javascript:deleteEvaluation(this)' data-id='"+review.id+"'>Delete evaluation</button></center></td>" +
                "</tr>"
            );
        });
    });
}

//delete method
function deleteEvaluation(button) {
    var sessionId = document.cookie;
    if (!sessionId)
        return;
    var id = $(button).data("id");
    var obj = { "id": id };
    $.ajax({
        url: "http://localhost:6274/api/student/review/"+sessionId,
        method: "DELETE",
        contentType: "application/json",
        dataType: "json",
        data: JSON.stringify(obj),
        success: function (data, status, xhr) {
            alert("Evaluation was deleted");
            modulOpened();
        },
        error: function (xhr, status, errorThrown) {
            alert("phaaaak... engine room error... santas little helpers are on it.");
        }
    });
}


