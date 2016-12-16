/**
 * Created by christofferobel on 07/12/2016.
 */
var lectureId = 0;
$(document).ready(function () {
    var sessionId = document.cookie;
    if (!sessionId) {
        location.href = '/javascript-client-master/login.html';
        return;
    }
    //course selection method
    $("#selectCourse").on("change", function () {
        var selectedValue = $("#selectCourse").val();
        if (selectedValue == "") {
            return;
        }
        var $lectureTableBody = $("#lectureTableBody");
        $lectureTableBody.html("");


        $.getJSON("http://localhost:6274/api/lecture/" + sessionId + "/" + selectedValue, function (lectures) {
            lectures = jQuery.parseJSON(lectures);

            console.log(lectures);
            var buttonCss = $("#selectCourse").data("buttoncss");
            var buttonText = $("#selectCourse").data("name");

            //structure for table
            lectures.forEach(function (lecture) {

                $lectureTableBody.append(
                    "<tr data-id='"+lecture.id+"'>" +
                    "<td>" + lecture.description + "</td>" +
                    "<td>" + lecture.type + "</td>" +
                    "<td>" + lecture.startDate + "</td>" +
                    "<td><button class='"+buttonCss+"'> "+buttonText+" </button></td>" +
                    "</tr>"
                );
            });
            $('.createEvalButton').on('click', function (event) {
                var clickedId = $(this).parent().parent().data("id");
                if (!clickedId)
                    alert("An error occured. Please try again later.");
                lectureId = clickedId;
                $('#modul').modal();
                if (typeof modulOpened == 'function') {
                    modulOpened();
                }
            })
        });
    });

});

function initiateSelectCourse() {
    var sessionId = document.cookie;
    if (!sessionId) {
        location.href = '/login.html';
        return;
    }

    //connection to server
    $.ajax({
        url:"http://localhost:6274/api/course/"+sessionId,
        method: "GET",
        dataType: "json",
        success: function(data){
            $("#selectCourse").append("<option value=''>  -- Select course --  </option>");
            for (var x = 0; x < data.length; x++) {
                $("#selectCourse").append("<option value='" + data[x].displaytext + "'>" + data[x].code + "</option>");

            }
        }
    });
}