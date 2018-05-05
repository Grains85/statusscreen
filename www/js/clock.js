document.addEventListener('DOMContentLoaded', function() {
    startTime();
});

function startTime() {
    var today = new Date();
    var year = today.getFullYear();
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

    var monthArr = new Array(12);
    monthArr[0] = "Januari";
    monthArr[1] = "Februari";
    monthArr[2] = "Mars";
    monthArr[3] = "April";
    monthArr[4] = "Maj";
    monthArr[5] = "Juni";
    monthArr[6] = "Juli";
    monthArr[7] = "Augusti";
    monthArr[8] = "September";
    monthArr[9] = "Oktober";
    monthArr[10] = "November";
    monthArr[11] = "December";
    var monthStr = monthArr[today.getMonth()];

    hour = fixZero(hour);
    minute = fixZero(minute);
    second = fixZero(second);
    document.getElementById('clock').innerHTML = hour + ":" + minute + ":" + second;
    document.getElementById('day').innerHTML = day+", "+month +" " + monthStr;
    document.getElementById('year').innerHTML = year;

    setTimeout(startTime, 500);
}

function fixZero(i) {
    if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
    return i;
}
