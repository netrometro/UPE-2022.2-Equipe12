import './style.css'
import { HiMusicNote, HiPlay, HiChevronLeft, HiChevronRight } from "react-icons/hi";
import api from "../../services/api";



export const PlayerMusic = () => {
  const player = document.querySelector("#player");
  const musicName = document.querySelector("#musicName");
  const playPauseButton = document.querySelector("#playPauseButton");
  const prevButton = document.querySelector("#prevButton");
  const nextButton = document.querySelector("#nextButton");
  const currentTime = document.querySelector("#currentTime");
  const duration = document.querySelector("#duration");
  const progressBar = document.querySelector(".progress-bar");
  const progress = document.querySelector(".progress");
  
  const textButtonPlay = "<HiChevronLeft size='70%'/>";
  const textButtonPause = "<HiChevronRight size='50%' />";
  
  let index = 0;
  let songs = [];
  
  const getMusics = async () => {
    await api.get("/list-music").then((response) => {
      console.log(response.data);
      songs = response.data.music.map((music) => ({
        src: response.data.url + music,
        name: music,
      }));
      prevNextMusic("init");
    }).catch((err) => {
      console.log(err.response)
    })
  }
  
  const prevNextMusic = (type = "next") => {
    if ((type === "next" && index + 1 === songs.length) || type === "init") {
      index = 0;
    } else if (type === "prev" && index === 0) {
      index = songs.length;
    } else {
      index = type === "prev" && index ? index - 1 : index + 1;
    }
  
    player.src = songs[index].src;
    musicName.innerHTML = songs[index].name;
    if (type !== "init") playPause();
  
    updateTime();
  };
  
  const playPause = () => {
    if (player.paused) {
      player.play();
      playPauseButton.innerHTML = textButtonPause;
    } else {
      player.pause();
      playPauseButton.innerHTML = textButtonPlay;
    }
  };
  
  player.ontimeupdate = () => updateTime();
  
  const updateTime = () => {
    const currentMinutes = Math.floor(player.currentTime / 60);
    const currentSeconds = Math.floor(player.currentTime % 60);
    currentTime.textContent = currentMinutes + ":" + formatZero(currentSeconds);
  
    const durationFormatted = isNaN(player.duration) ? 0 : player.duration;
    const durationMinutes = Math.floor(durationFormatted / 60);
    const durationSeconds = Math.floor(durationFormatted % 60);
    duration.textContent = durationMinutes + ":" + formatZero(durationSeconds);
  
    const progressWidth = durationFormatted
      ? (player.currentTime / durationFormatted) * 100
      : 0;
  
    progress.style.width = progressWidth + "%";
  };
  
  const formatZero = (n) => (n < 10 ? "0" + n : n);
  
  prevButton.onclick = () => prevNextMusic("prev");
  nextButton.onclick = () => prevNextMusic();
  playPauseButton.onclick = () => playPause();
  progressBar.onclick = (e) => {
    const newTime = (e.offsetX / progressBar.offsetWidth) * player.duration;
    player.currentTime = newTime;
  };
  


  return (
    <div class="Card">
      <div class="player">

        <div class="logo">
          <HiMusicNote size="50%"/>
        </div>

        <span id="musicName"></span>

        <audio id="player" src=""></audio>

        <div class="controls">

          <button id="prevButton" className="button"><HiChevronLeft size='70%'/></button>
          <button id="playPauseButton"className="button"><HiPlay size='70%' /></button>
          <button id="nextButton"className="button"><HiChevronRight size='70%' /></button>

        </div>

        <div class="footer">

          <div class="progress-bar">
            <div class="progress"></div>
          </div>

          <div class="time">
            <span id="currentTime">0:00</span>
            <span id="duration">0:00</span>
          </div>

        </div>
      </div>
    </div>

  )
}