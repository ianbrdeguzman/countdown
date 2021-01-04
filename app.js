// initialize constant variables for second, minute, hour and day
const second = 1000;
const minute = second * 60;
const hour =  minute * 60;
const day = hour * 24;

const countDown = setInterval( () => {
    // assign date now and get time in milliseconds
    const now = new Date().getTime(); 

    // assign new year date and get time in milliseconds 
    const newYear = new Date('Jan 1, 2022 00:00:00').getTime();

    // calculate difference (in millisecond) from new year and now
    const difference = newYear - now;
    
    // calculate difference in days, hours, minutes and seconds
    const daysLeft = Math.floor(difference / day);
    const hoursLeft = Math.floor(difference % day / hour);
    const minutesLeft = Math.floor(difference % hour / minute);
    const secondsLeft = Math.floor(difference % minute / second);
    
    // display time left
    document.getElementById('days').innerHTML = daysLeft;
    document.getElementById('hours').innerHTML = hoursLeft;
    document.getElementById('minutes').innerHTML = minutesLeft;
    document.getElementById('seconds').innerHTML = secondsLeft;
    
    // if count down is finished, clear interval and display text
    if (difference < 0) {
        clearInterval(countDown);

        document.getElementById('countdown')
            .innerHTML = 'Happy New Year!'
    }

}, 1000);




