function getTimeoutInSeconds(timeoutInSeconds) {
    var now = new Date();
    var hours = now.getHours();
    var mins = now.getMinutes();
    var secs = now.getSeconds();
    var millis = now.getMilliseconds();

    var current xMillis = hours * 3600000 + mins * 60000 + secs * 1000 + millis;

    return timeoutInSeconds * 1000 - currentMillis % (timeoutInSeconds * 1000);
}

function setTimeoutInSeconds(functionName, timeoutInSeconds, offset) {
    var timeout = getTimeoutInSeconds(timeoutInSeconds);
    timeout += Math.max(offset == 0 ? timeoutInSeconds * 8 : offset, 200);
    setTimeout(functionName, timeout);
}

document.addEventListener('DOMContentLoaded', function() {

  /**
    var d = new Date();
    var minutes = d.getHours() * 60 + d.getMinutes();
    var displayLunch = minutes >= 690 && minutes < 750;

    var rightWidth = displayLunch ? 460 : 120;

    // Size sections nicely
    var resize = function() {
        var main = document.getElementById('left');
        main.style.width = (document.body.getBoundingClientRect().width - (rightWidth + 15)) + 'px';
        document.getElementById('right').style.width = rightWidth + 'px';
    };

    resize();

    window.onresize = resize;
*/
/**
    var checkLunch = function() {
        document.getElementById('lunch').style.display = displayLunch ? 'block' : 'none';
        document.getElementById('weather').style.display = displayLunch ? 'none' : 'block';
    };
*/
    //checkLunch();

/**
    function startClock() {
        var canvas = document.getElementById("analogClockCanvas");
        var ctx = canvas.getContext("2d");
        drawClock(ctx, canvas.width, canvas.height);
    }
*/
    // startClock();

    function reloadPage() {
        document.location.reload(true);
    }

    // Update page from source every 15 minutes
    setTimeoutInSeconds(reloadPage, 15 * 60, 30000);
});
