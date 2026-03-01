const songs = [
    {
        title: "Song 1",
        artist: "Artist 1",
        src: "song1.mp3"
    },
    {
        title: "Song 2",
        artist: "Artist 2",
        src: "song2.mp3"
    },
    {
        title: "Song 3",
        artist: "Artist 3",
        src: "song3.mp3"
    }
];

const audio = document.getElementById("audio");
const title = document.getElementById("title");
const artist = document.getElementById("artist");
const progress = document.getElementById("progress");
const currentTimeEl = document.getElementById("currentTime");
const durationEl = document.getElementById("duration");
const playBtn = document.getElementById("playBtn");
const volume = document.getElementById("volume");
const playlist = document.getElementById("playlist");

let currentSongIndex = 0;

// Load song
function loadSong(index) {
    audio.src = songs[index].src;
    title.textContent = songs[index].title;
    artist.textContent = songs[index].artist;
}

loadSong(currentSongIndex);

// Play/Pause
function playPause() {
    if (audio.paused) {
        audio.play();
        playBtn.textContent = "⏸";
    } else {
        audio.pause();
        playBtn.textContent = "▶";
    }
}

// Next song
function nextSong() {
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    loadSong(currentSongIndex);
    audio.play();
}

// Previous song
function prevSong() {
    currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    loadSong(currentSongIndex);
    audio.play();
}

// Update Progress Bar
audio.addEventListener("timeupdate", () => {
    const progressPercent = (audio.currentTime / audio.duration) * 100;
    progress.value = progressPercent || 0;

    currentTimeEl.textContent = formatTime(audio.currentTime);
    durationEl.textContent = formatTime(audio.duration);
});

// Seek
progress.addEventListener("input", () => {
    audio.currentTime = (progress.value / 100) * audio.duration;
});

// Volume Control
volume.addEventListener("input", () => {
    audio.volume = volume.value;
});

// Autoplay next song
audio.addEventListener("ended", nextSong);

// Format Time
function formatTime(time) {
    if (isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60).toString().padStart(2, "0");
    return `${minutes}:${seconds}`;
}

// Create Playlist
songs.forEach((song, index) => {
    const div = document.createElement("div");
    div.textContent = `${song.title} - ${song.artist}`;
    div.onclick = () => {
        currentSongIndex = index;
        loadSong(index);
        audio.play();
    };
    playlist.appendChild(div);
});
