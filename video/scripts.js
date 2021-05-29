
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');
const fullScreenButton = player.querySelector('.full-screen');

function togglePlay() {
    if(video.paused) {
        video.play();
    } else {
        video.pause();
    }
}

function updateButton() {
    const icon = this.paused ? '►' : '| |';
    toggle.innerHTML = icon;
}

function skip() {
    video.currentTime += parseFloat(this.dataset.skip);
}

function handleRangeUpdate() {
    video[this.name] = this.value;
}

function handleProgress() {
    const percent = (video.currentTime / video.duration) * 100;
    progressBar.style.flexBasis = `${percent}%`;
}

function scrub(e) {
    const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
    video.currentTime = scrubTime;
}

function makeFullScreen() {
    player.requestFullscreen();
}

function exitFullScreen() {
    document.exitFullscreen();
}


video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', handleProgress);

toggle.addEventListener('click', togglePlay);
skipButtons.forEach(button => button.addEventListener('click', skip));
ranges.forEach(range => range.addEventListener('change', handleRangeUpdate));
ranges.forEach(range => range.addEventListener('mousemove', handleRangeUpdate));

document.addEventListener('keyup', (e) => {
    if (e.code === "ArrowLeft") {
        e.preventDefault();
        video.currentTime += -.2;
    } else if (e.code === "ArrowRight") {
        e.preventDefault();
        video.currentTime += .2;
    }
})


let mousedown = false;

progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => mousedown && scrub(e));
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);

document.addEventListener('keyup', (e) => {
    if (e.code === 'Space') {
        if(video.paused) {
            video.play();
        } else {
            video.pause();
        }
    }
});

fullScreenButton.addEventListener('click', makeFullScreen);
fullScreenButton.addEventListener('click', exitFullScreen);
video.addEventListener('dblclick', makeFullScreen);
video.addEventListener('dblclick', exitFullScreen);

video.addEventListener('ended', () => {
    video.currentTime = 0;
    video.play();
})