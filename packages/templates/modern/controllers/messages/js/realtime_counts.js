function ajaxRequest(data, callback) {

    data.csrf_token = $('meta[name=csrf-token]').attr('content');

    $.ajax({
        method: "POST",
        url: '/messages/ajax',
        data: data,
        dataType: 'json',
        cache: false
    }).done(function (resposnse) {
        if (callback) {
            callback(resposnse);
        }
    });
}

let AudioContext;
let audioContext;

window.onload = function () {

    if (navigator.mediaDevices !== undefined) {
        navigator.mediaDevices.getUserMedia({audio: true}).then(() => {
            AudioContext = window.AudioContext || window.webkitAudioContext;
            audioContext = new AudioContext();
        }).catch(e => {
            console.error(`Audio permissions denied: ${e}`);
        });
    }
}

$(function () {

    let currentCount = 0;

    let notifyId = setInterval(() => ajaxRequest({method: 'getCountNewMessages'}, function (response) {
        if (!response.errors) {

            let box = $('.messages.messages-counter'),
                counter = $('.counter', box);

            if (response.data.count.messages) {
                if (counter.length) {
                    counter.html(response.data.count.messages)
                } else {
                    box.append('<span class="counter badge">' + response.data.count.message + '</span>');
                }

                if (currentCount !== response.data.count.messages) {

                    currentCount = response.data.count.messages;

                    const audio = new Audio('/templates/modern/audio/new_message.mp3');

                    let playPromise = audio.play();

                    if (playPromise !== undefined) {
                        playPromise.then(function () {

                        }).catch(function (error) {

                        });
                    }
                }

            } else {

                if (counter.length) {
                    counter.remove();
                }

                currentCount = 0;
            }

        }
    }), 10000);

});