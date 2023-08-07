const audio = document.getElementById('audio');
const playPauseBtn = document.getElementById('playPauseBtn');
const backwardBtn = document.getElementById('backwardBtn');
const forwardBtn = document.getElementById('forwardBtn');
const songRange = document.getElementById('songRange');
const albumArt = document.getElementById('albumArt');
const songTitle = document.getElementById('songTitle');
const artist = document.getElementById('artist');
const currentTime = document.getElementById('currentTime');
const duration = document.getElementById('duration');

let isPlaying = false;

const songs = [
  {
    title: 'Ye Fitoor Mera',
    artist: 'Arijit Singh',
    albumArt: 'image/Fitoor.jpg.crdownload',
    src: 'audio/01 Yeh Fitoor Mera - Fitoor (Arijit Singh) 190Kbps (1).mp3'
},
{
  title: 'Abhi mujh mai kahi',
  artist: 'Sonu nigam',
  albumArt: 'image/agneepath.jpg',
  src: 'audio/05. Abhi Mujh Mein Kahin.mp3'
},
  {
      title: 'Aawara',
      artist: 'salman ali',
    albumArt: 'image/aawara.jpg',
    src: 'audio/Awara - Dabangg 3.mp3'
  },
  {
      title: 'Jiyen kyun',
      artist: 'Papon',
    albumArt: 'image/JIyen_kyun.jpg',
    src: 'audio/Jiyein-Kyun-Papon.mp3'
  },
  {
      title: 'Binte dil',
      artist: 'Arijit Singh',
    albumArt: 'image/Binte Dil.jpg',
    src: 'audio/Binte Dil - Padmavat Movie Mp3 Song-(MirchiFun.com).mp3'
  }
];

let currentSongIndex = 0;

function loadSong() {
  songTitle.textContent = songs[currentSongIndex].title;
  artist.textContent = songs[currentSongIndex].artist;
  albumArt.src = songs[currentSongIndex].albumArt;
  audio.src = songs[currentSongIndex].src;
}

function togglePlayPause() {
  if (isPlaying) {
    audio.pause();
    playPauseBtn.textContent = 'Play';
  } else {
    audio.play();
    playPauseBtn.textContent = 'Pause';
  }
  isPlaying = !isPlaying;
}

function backward() {
  currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
  loadSong();
  audio.play();
  playPauseBtn.textContent = 'Pause';
}

function forward() {
  currentSongIndex = (currentSongIndex + 1) % songs.length;
  loadSong();
  audio.play();
  playPauseBtn.textContent = 'Pause';
}

function updateTime() {
  const { currentTime: currentTimeValue, duration: durationValue } = audio;
  const minutesCurrent = Math.floor(currentTimeValue / 60);
  const secondsCurrent = Math.floor(currentTimeValue % 60);
  const minutesDuration = Math.floor(durationValue / 60);
  const secondsDuration = Math.floor(durationValue % 60);
  currentTime.textContent = `${minutesCurrent}:${secondsCurrent < 10 ? '0' : ''}${secondsCurrent}`;
  duration.textContent = `${minutesDuration}:${secondsDuration < 10 ? '0' : ''}${secondsDuration}`;
  songRange.value = (currentTimeValue / durationValue) * 100;
}

loadSong();

audio.addEventListener('ended', forward);
songRange.addEventListener('input', () => {
  audio.currentTime = (songRange.value / 100) * audio.duration;
});
