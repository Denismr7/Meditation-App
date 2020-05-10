const app = () => {
    const controlButton = document.querySelector(".play");
    const timeButton = document.querySelectorAll(".time-select button");
    const song = document.querySelector(".song");
    const outline = document.querySelector(".moving-outline circle");
    const sounds = document.querySelectorAll(".sound-picker button");
    const timeDisplay = document.querySelector(".time-countdown");
    const outlineLength = outline.getTotalLength();

    let selectedDuration = 10;

    outline.style.strokeDasharray = outlineLength;
    outline.style.strokeDashoffset = outlineLength;

    controlButton.addEventListener("click", () => {
        checkSound(song);
    })

    // Function to control the sound
    const checkSound = song => {
        if (song.paused) {
            song.play();
            controlButton.src = "./svg/pause.svg";
        } else {
            song.pause();
            controlButton.src = "./svg/play.svg";
        }
    }

    song.ontimeupdate = () => {
        let currentTime = song.currentTime;
        let remainingTime = selectedDuration - currentTime;
        let seconds = Math.floor(remainingTime % 60);
        let minutes = Math.floor(remainingTime / 60);

        // Animate the circle
        let progress = outlineLength - (currentTime / selectedDuration) * outlineLength;
        outline.style.strokeDashoffset = progress;

        // Time countdown
        timeDisplay.textContent = `${minutes}:${seconds}`;
        if (minutes < 10) {
            timeDisplay.textContent = `0${minutes}:${seconds}`
        }
        if (seconds < 10) {
            timeDisplay.textContent = `00:0${seconds}`;
        } 
        if (currentTime >= selectedDuration) {
            song.pause();
            outline.style.strokeDashoffset = 0;
            timeDisplay.textContent = "00:00"
            controlButton.src = "./svg/play.svg";
        }
    }

    // Change selected time
    timeButton.forEach(button => {
        button.addEventListener("click", function() {
            selectedDuration = this.getAttribute("data-time");
            timeDisplay.textContent = `${Math.floor(selectedDuration / 60)}:00`;
            if (Math.floor(selectedDuration / 60) < 10) {
                timeDisplay.textContent = `0${Math.floor(selectedDuration / 60)}:00`
            }
        })
    })

    // Change selected sound
    sounds.forEach(sound => {
        sound.addEventListener("click", function() {
            song.src = this.getAttribute("data-sound");
        })
    })
}

app();