

/*Buttons */
const playBtn = document.querySelector(".play"),
    skipForward = document.querySelector(".skip-forward"),
    skipBack = document.querySelector(".skip-back"),

    progressBarContainer = document.querySelector('.progress'),
    progressBar = document.querySelector('.progress-bar'),
    progressHead = document.querySelector('.progress-head'),

    currentTimeHtml = document.querySelector(".current-time"),
    durationHtml = document.querySelector(".duration"),

    playIcon = document.querySelector('.fa-play'),
    img = document.querySelector('.img'),
    title = document.querySelector(".audio-title"),
    singer = document.querySelector(".audio-singer");



let audio = null,
    circleLeft = null,
    barWidth = null,
    duration = null,
    currentTime = null,
    isTimerPlaying = false,
    currentTrackIndex = 0;

this.tracks = [
    {
        name: "Mekanın Sahibi",
        artist: "Norm Ender",
        cover: "https://raw.githubusercontent.com/muhammederdem/mini-player/master/img/1.jpg",
        source: "https://raw.githubusercontent.com/muhammederdem/mini-player/master/mp3/1.mp3",
    },
    {
        name: "Everybody Knows",
        artist: "Leonard Cohen",
        cover: "https://raw.githubusercontent.com/muhammederdem/mini-player/master/img/2.jpg",
        source: "https://raw.githubusercontent.com/muhammederdem/mini-player/master/mp3/2.mp3",
    },
    {
        name: "Extreme Ways",
        artist: "Moby",
        cover: "https://raw.githubusercontent.com/muhammederdem/mini-player/master/img/3.jpg",
        source: "https://raw.githubusercontent.com/muhammederdem/mini-player/master/mp3/3.mp3",
    },
    {
        name: "Butterflies",
        artist: "Sia",
        cover: "https://raw.githubusercontent.com/muhammederdem/mini-player/master/img/4.jpg",
        source: "https://raw.githubusercontent.com/muhammederdem/mini-player/master/mp3/4.mp3",
    },
    {
        name: "The Final Victory",
        artist: "Haggard",
        cover: "https://raw.githubusercontent.com/muhammederdem/mini-player/master/img/5.jpg",
        source: "https://raw.githubusercontent.com/muhammederdem/mini-player/master/mp3/5.mp3",
    },
];

// when the dom is loaded
let = currentTrack = tracks[0];
audio = new Audio();
audio.src = currentTrack.source;
img.src = currentTrack.cover;
title.innerText = currentTrack.name;
singer.innerText = currentTrack.artist;


playBtn.addEventListener('click', () => {
    if (audio.paused) {
        audio.play();
        isTimerPlaying = true;
    } else {
        audio.pause();
        isTimerPlaying = false;
    }
});

skipForward.addEventListener('click', () => {
    if (currentTrackIndex < tracks.length - 1) {
        currentTrackIndex++;
    } else {
        currentTrackIndex = 0;
    }
    currentTrack = tracks[currentTrackIndex];

    audio.src = currentTrack.source;
    img.src = currentTrack.cover;
    title.innerText = currentTrack.name;
    singer.innerText = currentTrack.artist;

    barWidth = 0;
    progressBar.style.width = `${barWidth}%`;
    progressHead.style.setProperty("left", `${barWidth}%`);
    currentTimeHtml.innerText = `0:00`;
    durationHtml.innerText = `0:00`;

    audio.currentTime = 0;
    audio.src = currentTrack.source;

    setTimeout(() => {
        if (isTimerPlaying) {
            audio.play();
        } else {
            audio.pause();
        }
    }, 300);
});

skipBack.addEventListener('click', () => {
    if (currentTrackIndex > 0) {
        currentTrackIndex--;
    } else {
        this.currentTrackIndex = this.tracks.length - 1;
    }
    currentTrack = tracks[currentTrackIndex];

    audio.src = currentTrack.source;
    img.src = currentTrack.cover;
    title.innerText = currentTrack.name;
    singer.innerText = currentTrack.artist;

    barWidth = 0;
    progressBar.style.width = `${barWidth}%`;
    progressHead.style.setProperty("left", `${barWidth}%`);
    currentTimeHtml.innerText = `0:00`;
    durationHtml.innerText = `0:00`;

    audio.currentTime = 0;
    audio.src = currentTrack.source;

    setTimeout(() => {
        if (isTimerPlaying) {
            audio.play();
        } else {
            audio.pause();
        }
    }, 300);
});

progressBarContainer.addEventListener('click', (x) => {
    let maxduration = audio.duration;
    let position = x.pageX - progressBarContainer.offsetLeft;
    let percentage = (100 * position) / progressBarContainer.offsetWidth;
    if (percentage > 100) percentage = 100;
    if (percentage < 0) percentage = 0;
    barWidth = percentage + "%";

    audio.currentTime = (maxduration * percentage) / 100;
    progressBar.style.width = `${barWidth}%`;
    progressHead.style.setProperty("left", `${barWidth}%`);
    img.src = currentTrack.cover;

    // audio.play();
    isTimerPlaying = true;
});

audio.ontimeupdate = function () {
    if (audio.duration) {
        barWidth = (100 / audio.duration) * audio.currentTime;

        let durmin = Math.floor(audio.duration / 60);
        let dursec = Math.floor(audio.duration - durmin * 60);
        let curmin = Math.floor(audio.currentTime / 60);
        let cursec = Math.floor(audio.currentTime - curmin * 60);

        if (durmin < 10) durmin = "0" + durmin;

        if (dursec < 10) dursec = "0" + dursec;

        if (curmin < 10) curmin = "0" + curmin;

        if (cursec < 10) cursec = "0" + cursec;

        duration = durmin + ":" + dursec;
        currentTime = curmin + ":" + cursec;

        progressBar.style.width = `${barWidth}%`;
        progressHead.style.setProperty("left", `${barWidth}%`)
        currentTimeHtml.innerText = `${currentTime}`;
        durationHtml.innerText = `${duration}`;

        if (isTimerPlaying) {
            playIcon.classList.remove('fa-play');
            playIcon.classList.add('fa-pause');


        } else {
            playIcon.classList.add('fa-play');
            playIcon.classList.remove('fa-pause');
        }
    }
};

audio.onended = function () {
    isTimerPlaying = true;
};


// Animations
TweenMax.from('.img', 4, { rotation: "+=360", transformOrigin: "50% 50%", ease: Linear.easeNone, repeat: -1 });

gsap.from("body, h1, .audio-img, .audio-title, .audio-singer, .audio-btns", {
    opacity: 0,
    duration: 2,
    delay: 1.5,
    y: 25,
    ease: "expo.out",
    stagger: 0.2,
});