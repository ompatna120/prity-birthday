/* =========================================
   LOADER
========================================= */

window.addEventListener("load", function () {
    setTimeout(function () {
        const loader = document.getElementById("loader");

        if (loader) {
            loader.classList.add("hidden");
        }
    }, 1200);
});


/* =========================================
   SCREEN NAVIGATION
========================================= */

function goToScreen(number) {

    const screens =
        document.querySelectorAll(".screen");

    screens.forEach(function (screen) {
        screen.classList.remove("active");
    });

    const target =
        document.getElementById("screen" + number);

    if (target) {
        target.classList.add("active");

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }
}


function startJourney() {

    startMusic();

    goToScreen(2);
}


/* =========================================
   BIRTHDAY COUNTDOWN
========================================= */

function updateBirthdayCountdown() {

    const now = new Date();

    const currentYear = now.getFullYear();

    const birthdayStart = new Date(
        currentYear,
        7,
        10,
        0,
        0,
        0
    );

    const birthdayEnd = new Date(
        currentYear,
        7,
        11,
        0,
        0,
        0
    );

    const isBirthday =
        now >= birthdayStart &&
        now < birthdayEnd;


    let birthday;

    if (isBirthday) {

        birthday = birthdayStart;

    } else if (now < birthdayStart) {

        birthday = birthdayStart;

    } else {

        birthday = new Date(
            currentYear + 1,
            7,
            10,
            0,
            0,
            0
        );
    }


    let difference =
        birthday.getTime() -
        now.getTime();


    /*
       On her birthday, keep countdown at zero
       and unlock the surprise.
    */

    if (isBirthday) {
        difference = 0;
    }


    const days =
        Math.floor(
            difference /
            (1000 * 60 * 60 * 24)
        );

    const hours =
        Math.floor(
            (difference /
                (1000 * 60 * 60)) % 24
        );

    const minutes =
        Math.floor(
            (difference /
                (1000 * 60)) % 60
        );

    const seconds =
        Math.floor(
            (difference / 1000) % 60
        );


    const daysElement =
        document.getElementById("countDays");

    const hoursElement =
        document.getElementById("countHours");

    const minutesElement =
        document.getElementById("countMinutes");

    const secondsElement =
        document.getElementById("countSeconds");


    if (daysElement) {
        daysElement.textContent =
            String(days).padStart(2, "0");
    }

    if (hoursElement) {
        hoursElement.textContent =
            String(hours).padStart(2, "0");
    }

    if (minutesElement) {
        minutesElement.textContent =
            String(minutes).padStart(2, "0");
    }

    if (secondsElement) {
        secondsElement.textContent =
            String(seconds).padStart(2, "0");
    }


    /*
       Surprise button
    */

    const surpriseBtn =
        document.getElementById("surpriseBtn");


    if (surpriseBtn) {

        if (isBirthday) {

            surpriseBtn.disabled = false;

            surpriseBtn.textContent =
                "🎁 Open Your Surprise ❤️";

        } else {

            surpriseBtn.disabled = true;

            surpriseBtn.textContent =
                "🔒 Opens at 12:00 AM";
        }
    }


    /*
       Birthday message
    */

    const message =
        document.getElementById(
            "birthdayMessage"
        );


    if (message) {

        if (isBirthday) {

            message.textContent =
                "IT'S YOUR DAY, MONTUU! 🎂❤️";

        } else {

            message.textContent =
                "Something special is waiting for you... ❤️";
        }
    }
}


updateBirthdayCountdown();

setInterval(
    updateBirthdayCountdown,
    1000
);


/* =========================================
   MUSIC
========================================= */

const music =
    document.getElementById("bgMusic");

const musicBtn =
    document.getElementById("musicBtn");


function startMusic() {

    if (!music) {
        return;
    }

    music.play()
        .then(function () {

            if (musicBtn) {
                musicBtn.textContent = "🔊";
            }

        })
        .catch(function () {

            if (musicBtn) {
                musicBtn.textContent = "🎵";
            }

        });
}


function toggleMusic() {

    if (!music) {
        return;
    }

    if (music.paused) {

        music.play()
            .then(function () {

                if (musicBtn) {
                    musicBtn.textContent = "🔊";
                }

            })
            .catch(function () {

                if (musicBtn) {
                    musicBtn.textContent = "🎵";
                }

            });

    } else {

        music.pause();

        if (musicBtn) {
            musicBtn.textContent = "🎵";
        }
    }
}


/* =========================================
   PRITY PHOTO GALLERY
========================================= */

const photos = [

    "images/Prity1.jpeg",

    "images/Prity2.jpeg",

    "images/Prity3.jpeg",

    "images/Prity4.jpeg",

    "images/Prity5.jpeg"

];


const captions = [

    "That smile... ❤️",

    "My favorite girl. 🥰",

    "My beautiful Montuu. 💕",

    "The person who makes ordinary days special. ✨",

    "And somehow... I still fall for you every day. ❤️"

];


let currentPhoto = 0;


function updateGallery() {

    const image =
        document.getElementById("galleryImage");

    const counter =
        document.getElementById("photoCounter");

    const caption =
        document.getElementById("photoCaption");


    if (!image || !counter || !caption) {
        return;
    }


    image.style.opacity = "0";


    setTimeout(function () {

        image.src =
            photos[currentPhoto];

        image.style.opacity = "1";

    }, 150);


    counter.textContent =
        `${currentPhoto + 1} / ${photos.length}`;


    caption.textContent =
        captions[currentPhoto];


    updateDots();
}


function nextPhoto() {

    currentPhoto++;

    if (
        currentPhoto >=
        photos.length
    ) {
        currentPhoto = 0;
    }

    updateGallery();
}


function previousPhoto() {

    currentPhoto--;

    if (currentPhoto < 0) {
        currentPhoto =
            photos.length - 1;
    }

    updateGallery();
}


function updateDots() {

    const dots =
        document.getElementById("photoDots");

    if (!dots) {
        return;
    }

    dots.innerHTML = "";


    photos.forEach(
        function (_, index) {

            const dot =
                document.createElement("span");

            dot.className =
                "photo-dot";


            if (
                index === currentPhoto
            ) {
                dot.classList.add("active");
            }


            dot.onclick = function () {

                currentPhoto = index;

                updateGallery();
            };


            dots.appendChild(dot);
        }
    );
}


updateGallery();


/* =========================================
   MEMORY SLIDER
========================================= */

const memories = [

    {
        image: "images/Memory1.jpeg",

        title: "A Memory I Treasure ❤️",

        caption:
            "Some moments are impossible to forget."
    },

    {
        image: "images/Memory2.jpeg",

        title: "Just You & Me 💕",

        caption:
            "Nothing special was needed. Being together was enough."
    },

    {
        image: "images/Memory3.jpeg",

        title: "My Favorite Memories 🥰",

        caption:
            "Every picture has a story, and every story has you."
    },

    {
        image: "images/Memory4.jpeg",

        title: "If I Could Pause Time... ❤️",

        caption:
            "I would choose one of these moments and stay there with you."
    }

];


let currentMemory = 0;


function updateMemory() {

    const image =
        document.getElementById("memoryImage");

    const title =
        document.getElementById("memoryTitle");

    const caption =
        document.getElementById("memoryCaption");

    const number =
        document.getElementById("memoryNumber");

    const slider =
        document.querySelector(".memory-slide");


    if (
        !image ||
        !title ||
        !caption ||
        !number ||
        !slider
    ) {
        return;
    }


    slider.classList.remove("zoom");

    image.style.opacity = "0";


    setTimeout(function () {

        const memory =
            memories[currentMemory];


        image.src =
            memory.image;

        title.textContent =
            memory.title;

        caption.textContent =
            memory.caption;

        number.textContent =
            `MEMORY ${String(currentMemory + 1).padStart(2, "0")} / 04`;


        image.style.opacity = "1";


        setTimeout(function () {

            slider.classList.add("zoom");

        }, 400);

    }, 250);


    updateMemoryNavigation();
}


function nextMemory() {

    currentMemory++;

    if (
        currentMemory >=
        memories.length
    ) {
        currentMemory = 0;
    }

    updateMemory();
}


function previousMemory() {

    currentMemory--;

    if (currentMemory < 0) {

        currentMemory =
            memories.length - 1;
    }

    updateMemory();
}


function selectMemory(index) {

    if (
        index < 0 ||
        index >= memories.length
    ) {
        return;
    }

    currentMemory = index;

    updateMemory();
}


function updateMemoryNavigation() {

    const thumbnails =
        document.querySelectorAll(
            ".memory-thumb"
        );

    const dots =
        document.querySelectorAll(
            ".memory-dot"
        );


    thumbnails.forEach(
        function (thumb, index) {

            thumb.classList.toggle(
                "active",
                index === currentMemory
            );
        }
    );


    dots.forEach(
        function (dot, index) {

            dot.classList.toggle(
                "active",
                index === currentMemory
            );
        }
    );
}


let memoryAutoSlide;


function startMemoryAutoSlide() {

    clearInterval(memoryAutoSlide);


    memoryAutoSlide =
        setInterval(function () {

            const storyScreen =
                document.getElementById("screen3");


            if (
                storyScreen &&
                storyScreen.classList.contains("active")
            ) {
                nextMemory();
            }

        }, 5000);
}


startMemoryAutoSlide();

updateMemory();


/* =========================================
   LETTER
========================================= */

function openLetter() {

    const envelope =
        document.getElementById("envelope");

    const letter =
        document.getElementById("letterContent");


    if (!envelope || !letter) {
        return;
    }


    envelope.classList.add("opened");

    letter.classList.add("visible");
}


/* =========================================
   QUIZ
========================================= */

const quizQuestions = [

    {
        question:
            "Where did our story begin? ❤️",

        answers: [
            "India Gate",
            "Connaught Place",
            "Hauz Khas Metro Station",
            "Noida"
        ],

        correct: 2,

        message:
            "Of course! Hauz Khas Metro Station. ❤️"
    },

    {
        question:
            "What is Prity's special nickname? 😘",

        answers: [
            "Baby",
            "Montuu",
            "Sweety",
            "Princess"
        ],

        correct: 1,

        message:
            "My Montuu! ❤️"
    },

    {
        question:
            "When did Sonu meet Prity? ❤️",

        answers: [
            "18 August 2024",
            "21 August 2024",
            "19 August 2024",
            "19 September 2024"
        ],

        correct: 2,

        message:
            "19 August 2024 — a date I'll never forget. ❤️"
    },

    {
        question:
            "What does Sonu love about Prity the most? 🥰",

        answers: [
            "Her dikhawa",
            "Her simplicity",
            "Her attitude",
            "Her fashion"
        ],

        correct: 1,

        message:
            "Your simplicity and the fact that you don't do dikhawa. ❤️"
    },

    {
        question:
            "What does Sonu actually want from the future? 💕",

        answers: [
            "Lots of money",
            "Lots of travel",
            "You, me and together always",
            "Nothing"
        ],

        correct: 2,

        message:
            "You. Me. Together. Always. ❤️"
    },

    {
        question:
            "Who is Sonu's favorite girl? 😏",

        answers: [
            "A Bollywood actress",
            "His celebrity crush",
            "Prity Singh",
            "Nobody"
        ],

        correct: 2,

        message:
            "Obviously YOU, Montuu! ❤️"
    },

    {
        question:
            "What does Sonu call Prity sometimes? ❤️",

        answers: [
            "Bauwaa",
            "Boss",
            "Madam",
            "Queen"
        ],

        correct: 0,

        message:
            "My Bauwaa! 🥰❤️"
    }

];


let currentQuestion = 0;

let quizScore = 0;


function loadQuiz() {

    const question =
        quizQuestions[currentQuestion];


    const quizNumber =
        document.getElementById("quizNumber");

    const quizQuestion =
        document.getElementById("quizQuestion");

    const answers =
        document.getElementById("quizAnswers");

    const feedback =
        document.getElementById("quizFeedback");

    const progress =
        document.getElementById("progressBar");


    if (
        !quizNumber ||
        !quizQuestion ||
        !answers ||
        !feedback ||
        !progress
    ) {
        return;
    }


    quizNumber.textContent =
        `Question ${currentQuestion + 1} / ${quizQuestions.length}`;


    quizQuestion.textContent =
        question.question;


    answers.innerHTML = "";

    feedback.textContent = "";


    const percentage =
        (
            currentQuestion /
            quizQuestions.length
        ) * 100;


    progress.style.width =
        `${percentage}%`;


    question.answers.forEach(
        function (answer, index) {

            const button =
                document.createElement("button");


            button.className =
                "quiz-answer";


            button.type = "button";


            button.textContent =
                answer;


            button.onclick =
                function () {

                    selectAnswer(
                        index,
                        button
                    );
                };


            answers.appendChild(button);
        }
    );
}


function selectAnswer(
    selected,
    clickedButton
) {

    const question =
        quizQuestions[currentQuestion];


    const allButtons =
        document.querySelectorAll(
            ".quiz-answer"
        );


    allButtons.forEach(
        function (button) {
            button.disabled = true;
        }
    );


    if (
        selected ===
        question.correct
    ) {

        clickedButton.classList.add(
            "correct"
        );

        quizScore++;


        const feedback =
            document.getElementById(
                "quizFeedback"
            );


        if (feedback) {

            feedback.textContent =
                "❤️ " +
                question.message;
        }

    } else {

        clickedButton.classList.add(
            "wrong"
        );


        if (
            allButtons[question.correct]
        ) {

            allButtons[
                question.correct
            ].classList.add(
                "correct"
            );
        }


        const feedback =
            document.getElementById(
                "quizFeedback"
            );


        if (feedback) {

            feedback.textContent =
                "Almost! But you know Sonu better than this 😏❤️";
        }
    }


    setTimeout(function () {

        currentQuestion++;


        if (
            currentQuestion <
            quizQuestions.length
        ) {

            loadQuiz();

        } else {

            showQuizResult();
        }

    }, 1800);
}


function showQuizResult() {

    const percentage =
        Math.round(
            (
                quizScore /
                quizQuestions.length
            ) * 100
        );


    const progress =
        document.getElementById(
            "progressBar"
        );

    const number =
        document.getElementById(
            "quizNumber"
        );

    const question =
        document.getElementById(
            "quizQuestion"
        );

    const feedback =
        document.getElementById(
            "quizFeedback"
        );

    const answers =
        document.getElementById(
            "quizAnswers"
        );


    if (progress) {
        progress.style.width = "100%";
    }


    if (number) {
        number.textContent =
            "Quiz Complete ❤️";
    }


    if (question) {

        question.textContent =
            `You scored ${quizScore} / ${quizQuestions.length}!`;
    }


    let message;


    if (percentage === 100) {

        message =
            "Perfect! ❤️ You really know your Sonu. Now there's only one thing left...";

    } else if (percentage >= 70) {

        message =
            "Not bad, Montuu! 😘 You know your Sonu pretty well.";

    } else {

        message =
            "Looks like we need more time together. 😏❤️";
    }


    if (feedback) {
        feedback.textContent = message;
    }


    if (answers) {

        answers.innerHTML = `
            <button
                class="primary-btn"
                type="button"
                onclick="goToScreen(6)"
            >
                Catch My Heart ❤️
            </button>
        `;
    }
}


loadQuiz();


/* =========================================
   HEART GAME
========================================= */

let heartScore = 0;

let gameRunning = false;

let heartTimer = null;


function startHeartGame() {

    heartScore = 0;

    gameRunning = true;


    const score =
        document.getElementById(
            "heartScore"
        );

    const message =
        document.getElementById(
            "gameMessage"
        );

    const startButton =
        document.getElementById(
            "startGameBtn"
        );

    const game =
        document.getElementById(
            "heartGame"
        );


    if (
        !score ||
        !message ||
        !startButton ||
        !game
    ) {
        return;
    }


    clearTimeout(heartTimer);


    score.textContent = "0";

    message.textContent = "";

    startButton.style.display = "none";

    game.innerHTML = "";


    spawnGameHeart();


    heartTimer =
        setTimeout(
            endHeartGame,
            15000
        );
}


function spawnGameHeart() {

    if (!gameRunning) {
        return;
    }


    const game =
        document.getElementById(
            "heartGame"
        );


    if (!game) {
        return;
    }


    const heart =
        document.createElement("div");


    heart.className =
        "game-heart";


    const hearts = [
        "❤️",
        "💕",
        "💗",
        "💖"
    ];


    heart.textContent =
        hearts[
            Math.floor(
                Math.random() *
                hearts.length
            )
        ];


    const maxX =
        Math.max(
            0,
            game.clientWidth - 50
        );


    const maxY =
        Math.max(
            0,
            game.clientHeight - 50
        );


    heart.style.left =
        Math.random() *
        maxX +
        "px";


    heart.style.top =
        Math.random() *
        maxY +
        "px";


    heart.onclick =
        function () {

            if (!gameRunning) {
                return;
            }


            heartScore++;


            const score =
                document.getElementById(
                    "heartScore"
                );


            if (score) {
                score.textContent =
                    heartScore;
            }


            heart.remove();


            if (heartScore >= 10) {

                winHeartGame();

            } else {

                spawnGameHeart();
            }
        };


    game.appendChild(heart);


    setTimeout(
        function () {

            if (
                heart.parentElement
            ) {

                heart.remove();


                if (gameRunning) {
                    spawnGameHeart();
                }
            }

        },
        1200
    );
}


function winHeartGame() {

    gameRunning = false;

    clearTimeout(heartTimer);


    const message =
        document.getElementById(
            "gameMessage"
        );


    if (!message) {
        return;
    }


    message.innerHTML = `
        You caught 10 hearts! ❤️

        <br><br>

        But you know what?

        <br>

        You caught mine long ago. 😘

        <br><br>

        <button
            class="primary-btn"
            type="button"
            onclick="showFinalSurprise()"
        >
            One Last Surprise 🎂
        </button>
    `;
}


function endHeartGame() {

    if (!gameRunning) {
        return;
    }


    gameRunning = false;


    const message =
        document.getElementById(
            "gameMessage"
        );


    if (!message) {
        return;
    }


    message.innerHTML = `
        Time's up! ❤️

        <br>

        You caught ${heartScore} hearts.

        <br><br>

        But don't worry...

        <br>

        My heart is already yours. 😘

        <br><br>

        <button
            class="primary-btn"
            type="button"
            onclick="showFinalSurprise()"
        >
            One Last Surprise 🎂
        </button>
    `;
}


/* =========================================
   FINAL SURPRISE
========================================= */

function showFinalSurprise() {

    goToScreen(7);

    createConfetti();
}


/* =========================================
   CONFETTI
========================================= */

function createConfetti() {

    const container =
        document.getElementById(
            "confetti"
        );


    if (!container) {
        return;
    }


    container.innerHTML = "";


    const symbols = [
        "❤️",
        "💕",
        "💗",
        "✨",
        "💖",
        "🎉"
    ];


    for (
        let i = 0;
        i < 80;
        i++
    ) {

        const piece =
            document.createElement("div");


        piece.className =
            "confetti-piece";


        piece.textContent =
            symbols[
                Math.floor(
                    Math.random() *
                    symbols.length
                )
            ];


        piece.style.left =
            Math.random() *
            100 +
            "%";


        piece.style.fontSize =
            (
                10 +
                Math.random() * 18
            ) +
            "px";


        piece.style.animationDuration =
            (
                3 +
                Math.random() * 4
            ) +
            "s";


        piece.style.animationDelay =
            (
                Math.random() * 2
            ) +
            "s";


        container.appendChild(piece);
    }
}


/* =========================================
   RESTART
========================================= */

function restartJourney() {

    currentPhoto = 0;

    currentMemory = 0;

    currentQuestion = 0;

    quizScore = 0;

    heartScore = 0;

    gameRunning = false;


    clearTimeout(heartTimer);


    updateGallery();

    updateMemory();

    loadQuiz();


    const envelope =
        document.getElementById(
            "envelope"
        );

    const letter =
        document.getElementById(
            "letterContent"
        );

    const gameMessage =
        document.getElementById(
            "gameMessage"
        );

    const startGameBtn =
        document.getElementById(
            "startGameBtn"
        );

    const heartGame =
        document.getElementById(
            "heartGame"
        );


    if (envelope) {
        envelope.classList.remove(
            "opened"
        );
    }


    if (letter) {
        letter.classList.remove(
            "visible"
        );
    }


    if (gameMessage) {
        gameMessage.innerHTML = "";
    }


    if (startGameBtn) {
        startGameBtn.style.display =
            "inline-block";
    }


    if (heartGame) {
        heartGame.innerHTML = "";
    }


    goToScreen(1);
}