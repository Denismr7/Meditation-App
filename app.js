const app = () => {
    const controlButton = document.querySelector(".play");
    const song = document.querySelector(".song");
    const outline = document.querySelector(".moving-outline circle");
    const sounds = document.querySelectorAll(".sound-picker button");
    const timeDisplay = document.querySelector(".time-countdown");
    const outlineLength = outline.getTotalLength();

    let selectedDuration = 300;

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
}

app();