// create canvas
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

// adjust canvas width and height on resize
const resizeCanvas = () => {
    canvas.width = innerWidth;
    canvas.height = innerHeight;
};
resizeCanvas();
window.addEventListener('resize', () => {
    resizeCanvas();
    location.reload();
});

// create snowflakes array
const snowflakes = [];
const numberOfFlakes = 300;

// snowflake blueprint
class Snowflake {
    constructor(x, y, size, velocity, image, opacity) {
        this.x = x;
        this.y = y;
        this.dx = size;
        this.dy = size;
        this.velocity = velocity;
        this.image = image;
        this.opacity = opacity;
    }
    draw() {
        ctx.globalAlpha = this.opacity;
        ctx.drawImage(this.image, this.x, this.y, this.dx, this.dy);
    }
    update() {
        this.draw();
        this.y += this.velocity * .5;
        if (this.y + this.dy > canvas.height) {
            this.y = canvas.height - this.dy;
            setTimeout( () => {
                this.y = Math.random() * canvas.height - (canvas.height + this.dy);
                this.dx = Math.random() * 10 + 10;
                this.dy = this.dx;
            }, 1000)
        }
    }
}

// clear function to clear canvas every loop
const clear = () => {
    ctx.fillStyle = 'rgb(0, 0, 0)';
    ctx.fillRect(0, 0, canvas.width, canvas.height)
};

// create snowflake
const createSnowflake = () => {
    
    // create new image snowflake
    const image = new Image();
    image.src = './image/snowflake-regular.svg'

    // loop through the numberOfFlakes and randomize values
    for (let i = 0; i < numberOfFlakes; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height - canvas.height;
        const size = Math.random() * 10 + 10;
        const velocity = Math.random();
        const opacity = Math.random();

        // push new snowflake into array
        snowflakes.push(new Snowflake(x, y, size, velocity, image, opacity));
    }
};

// animation loop
const animate = () => {

    // recursion
    requestAnimationFrame(animate);

    // clear canvas
    clear();

    // render snowflakes every loop
    snowflakes.forEach( (snowflake) => {
        snowflake.update();
    });
}

// call functions
createSnowflake();
animate();

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



