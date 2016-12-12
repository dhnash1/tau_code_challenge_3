console.log('js');

$(document).ready(function() {
    console.log('JQ');
    getFunny();
    $('#addJokeButton').on('click', function() {
        console.log('addJokeButton on click');
        var joke = $('#whoseJokeIn').val();
        var question = $('#questionIn').val();
        var punch = $('#punchlineIn').val();
//I feel like a constructor would do me some good here, but its something i need to practice more.
        var gift = {
            person: joke,
            q: question,
            p: punch
        };
        sendThatBiz(gift);

    }); // end addJokeButton on click
}); // end doc ready

function sendThatBiz(package) {
    $.ajax({
        type: 'POST',
        url: '/post',
        data: package,
        success: function(response) {
            $('#outputDiv').html('');
            getFunny();
        }

    });
}

function getFunny() {
    $.ajax({
        type: 'GET',
        url: '/load',
        success: function(response) {
            console.log(response);
            for (var i = 0; i < response.length; i++) {
                $('#outputDiv').append("<br><b>" + response[i].jokeQuestion + "</b><br><br>" + response[i].punchLine + "<br><p><sup>Joke by: " + response[i].whoseJoke + "</sup><p><br>"); // P.S. those HTML tags are kinda gross looking, would format differently.
            }
        }
    }); // ajax call to display saved jokes to the dom
}
