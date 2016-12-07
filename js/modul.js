/**
 * Created by christofferobel on 07/12/2016.
 */

$(document).ready(function () {

    $.getJSON("http://localhost:6274/api/course/8", function (data) {
        data = jQuery.parseJSON(data);
        $("#selectCourse").append("<option value=''>  -- Select course --  </option>");
        for (var x = 0; x < data.length; x++) {
            $("#selectCourse").append("<option value='" + data[x].displaytext + "'>" + data[x].code + "</option>");

        }
    });

    $("#selectCourse").on("change", function () {
        var selectedValue = $("#selectCourse").val();
        if (selectedValue == "") {

            return;

        }
        var $lectureTableBody = $("#lectureTableBody");
        $lectureTableBody.html("");
        //Her henter man og får kontakt med serveren. eksempelet fra chrashcourset til books

        $.getJSON("http://localhost:6274/api/lecture/" + selectedValue, function (lectures) {
            lectures = jQuery.parseJSON(lectures);

            console.log(lectures);

            lectures.forEach(function (lecture) {

                $lectureTableBody.append(
                    "<tr>" +
                    "<td>" + lecture.description + "</td>" +
                    "<td>" + lecture.type + "</td>" +
                    "<td>" + lecture.startDate + "</td>" +
                    "<td><button class='createEvalButton'> Create evaluation </button></td>" +
                    "</tr>"
                );

                $('.createEvalButton').on('click', function (event) {

                    $('#modul').modal();
                })


            });
        });
    });

});




