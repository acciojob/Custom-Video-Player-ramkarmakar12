/* Edit this file */
// Select player elements
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');

// Play/Pause Toggle Function
function togglePlay() {
    video.paused ? video.play() : video.pause();
}

// Update Play/Pause Button
function updateButton() {
    toggle.textContent = video.paused ? '►' : '❚ ❚';
}

// Skip Video (Forward/Backward)
function skip() {
    video.currentTime += parseFloat(this.dataset.skip);
}

// Handle Volume & Playback Speed Changes
function handleRangeUpdate() {
    video[this.name] = this.value;
}

// Update Progress Bar
function updateProgress() {
    const percent = (video.currentTime / video.duration) * 100;
    progressBar.style.flexBasis = `${percent}%`;
}

// Scrub Video on Progress Click
function scrub(e) {
    const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
    video.currentTime = scrubTime;
}

// Event Listeners
video.addEventListener('click', togglePlay);
toggle.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', updateProgress);

skipButtons.forEach(button => button.addEventListener('click', skip));
ranges.forEach(range => range.addEventListener('input', handleRangeUpdate));

progress.addEventListener('click', scrub);