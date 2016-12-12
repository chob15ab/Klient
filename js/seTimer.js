/**
 * Created by christofferobel on 29/11/2016.
 */
$(document).ready(function(){
    initiateSelectCourse();
});
function modulOpened() {
    var sessionId = document.cookie;
    if (!sessionId)
        return;
    var $reviewTableBody = $("#reviewTableBody")
    $reviewTableBody.html("");

    $.getJSON("http://localhost:6274/api/review/"+sessionId+"/"+lectureId, function (reviews) {
        reviews = jQuery.parseJSON(reviews);
        reviews.forEach(function (review) {
            $reviewTableBody.append(
                "<tr data-id='"+review.id+"'>" +
                "<td><center>"+review.rating+"</center></td>" +
                "<td style='text-align:left;'>" + review.comment + "</td>" +
                "</tr>"
            );
        });
    });
}