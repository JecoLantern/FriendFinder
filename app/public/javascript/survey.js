$(document).ready(function(){
    var questions = [
        'I have a vivid imagination.',
        'I make friends easily.',
        'I worry about things.',
        'I love large parties.',
        'I believe in the importance of art.',
        'I get angry easily.',
        'I take charge.',
        'I experience my emotions intensely.',
        'I often feel blue.',
        'I am always busy.',
        'I prefer variety over routine.',
        'I am easily intimidated.',
        'I love excitement.',
        'I like to solve complex problems.',
        'I often eat too much.',
        'I radiate joy.',
        'I panic easily.',
        'I trust others.',
        'I dislike being the center of attention.',
        'I like order.',
        'I avoid mistakes.',
        'I fear for the worst.',
        'I get irrirated easily.',
        'I dislike myself.',
        'I don\'t know why I do some of the things I do.',
        'I am always on the go.',
        'I seek adventure.',
        'I like music.',
        'I feel others\' emotions.',
        'I like to visit new places.',
        'I love to read challenging material.',
        'I stick to the rules.',
        'I keep my promises.',
        'I work hard.',
        'I am always prepared.',
        'I choose my words with care.',
        'I get upset easily.',
        'I find it difficult to approach others.',
        'I feel that I\'m unable to deal with things.',
        'I feel comfortable around people.',
        'I enjoy being part of a group.',
        'I do a lot in my spare time.',
        'I love action.',
        'I am interested in many things.',
        'I consider myself an average person.',
        'I value cooperation over competition.',
        'I handle tasks smoothly.',
        'I turn plans into actions.',
        'I get stressed out easily.',
        'I pay my bills on time.'
    ];

    var choices = [
        '1 (Strongly Disagree)',
        '2 (Disagree)',
        '3 (Neutral)',
        '4 (Agree)',
        '5 (Strongly Agree)'
    ];

    var questionDiv = $('#questions');
    i=0;

    questions.forEach(function (question){
        i++;
        var item = $('<div class="question">');
        var headline = $('<h4>').text('Question ' + i);
        var questionText = $('<p>').text(question);
        var dropDown = $('<div class="form-group">');
        var select = $('<select class="form-group selector">');

        choices.forEach(function(choice){
            var option = $('<option>').text(choice);
            select.append(option);
        });

        select.attr('id', 'select' + i);
        dropDown.append(select);
        item.append(headline, questionText, dropDown);
        var br = $('<br>');
        questionDiv.append(item, br);
    });

    $('#submit').on('click', function(event) {
        event.preventDefault();
        
        var userName = $('#userName').val();
        var imageLink = $('#imageLink').val();

        if (userName.length > 0 && imageLink.length > 0) {
            var answers = [];

            Object.keys($('.selector')).forEach(function(key) {
                if (answers.length < questions.length) {
                    answers.push($('.selector')[key].value.charAt(0));
                }
            });

            var surveyData = {
                name: userName,
                photo: imageLink,
                answers: answers
            };

            $.post('/api/friends', surveyData, function(data) {
                if (data) {
                    $('#modalContent').empty();
                    $('#userName').val('');
                    $('#imageLink').val('');

                    data.forEach(function(profile) {
                        var profileDiv = $('<div class="profile">');
                        var name = profile.name;
                        var photoURL = profile.photo;
                        var nameHeader = $('<h3>').text(name);
                        var photo = $('<img>').attr('src', photoURL);
                        profileDiv.append(nameHeader, photo);
                        $('#modalContent').append(profileDiv);
                    });

                    if(data.length > 1) {
                        $('.modal-title').text('Your best matches!');
                    }else{
                        $('.modal-title').text('Your best match!');
                    }
                    $('#resultModal').modal();
                }
            });
        }else{
            $('#errorModal').modal();
            setTimeout(function() {
                $('#errorModal').modal('hide');
            }, 3000);
        }
    });
});