document.addEventListener('DOMContentLoaded', function() {
    startTime();
});

function startTime() {
    var today = new Date();
    var year = today.getYear();
    var month = today.getMonth();
    var hour = today.getHours();
    var minute = today.getMinutes();
    var second = today.getSeconds();

    var weekday = new Array(7);
    weekday[0] = "Söndag";
    weekday[1] = "Måndag";
    weekday[2] = "Tisdag";
    weekday[3] = "Onsdag";
    weekday[4] = "Torsdag";
    weekday[5] = "Fredag";
    weekday[6] = "Söndag";
    var day = weekday[today.getDay()];

    hour = fixZero(hour);
    minute = fixZero(minute);
    second = fixZero(second);
    document.getElementById('clock').innerHTML = hour + ":" + minute + ":" + second;

    setTimeout(startTime, 500);
}

function fixZero(i) {
    if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
    return i;
}
