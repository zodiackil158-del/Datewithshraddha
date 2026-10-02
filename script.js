/* =========================================================
   SHRADDHA WEBSITE — FIXED JAVASCRIPT
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       CONFIGURATION
    ===================================================== */

    const CONFIG = {

        SECRET_PASSWORD: "shraddha",

        GOOGLE_SCRIPT_URL:
            "https://script.google.com/macros/s/AKfycbxsdwNkay5KC6Noj_l1kL44HZ6rztSlhbbxfTKjFGH1LkWhYtqV61O5uuStW7K7KKpY/exec",

        MUSIC_URL: ""

    };


    /* =====================================================
       VARIABLES
    ===================================================== */

    let currentPage = 1;

    let selectedDateType = "";

    let selectedDate = "";

    let selectedTime = "";

    let response = "";


    /* =====================================================
       ELEMENTS
    ===================================================== */

    const pages =
        document.querySelectorAll(".page");

    const progressBar =
        document.getElementById("progressBar");

    const bgMusic =
        document.getElementById("bgMusic");

    const musicBtn =
        document.getElementById("musicBtn");

    const yesBtn =
        document.getElementById("yesBtn");

    const noBtn =
        document.getElementById("noBtn");

    const dateCards =
        document.querySelectorAll(".date-type");

    const dateOptions =
        document.getElementById("dateOptions");

    const dateInput =
        document.getElementById("preferredDate");

    const timeInput =
        document.getElementById("preferredTime");

    const dateContinue =
        document.getElementById("dateContinue");

    const messageInput =
        document.getElementById("message");

    const messageContinue =
        document.getElementById("messageContinue");

    const passwordInput =
        document.getElementById("passwordInput");

    const passwordBtn =
        document.getElementById("passwordBtn");

    const passwordError =
        document.getElementById("passwordError");


    /* =====================================================
       MUSIC
    ===================================================== */

    function startMusic() {

        if (!bgMusic) return;

        if (
            CONFIG.MUSIC_URL &&
            CONFIG.MUSIC_URL.trim() !== ""
        ) {

            if (
                !bgMusic.src.includes(
                    CONFIG.MUSIC_URL
                )
            ) {

                bgMusic.src =
                    CONFIG.MUSIC_URL;

                bgMusic.load();
            }
        }

        bgMusic.volume = 0.45;

        const playPromise =
            bgMusic.play();

        if (playPromise) {

            playPromise
                .then(() => {

                    if (musicBtn) {

                        musicBtn.textContent =
                            "🔊";

                        musicBtn.classList.add(
                            "playing"
                        );
                    }

                })
                .catch(error => {

                    console.log(
                        "Music waiting for user interaction:",
                        error
                    );

                });
        }
    }


    /* =====================================================
       MUSIC BUTTON
    ===================================================== */

    if (musicBtn && bgMusic) {

        musicBtn.addEventListener(
            "click",
            () => {

                if (bgMusic.paused) {

                    startMusic();

                } else {

                    bgMusic.pause();

                    musicBtn.textContent =
                        "🔇";

                    musicBtn.classList.remove(
                        "playing"
                    );
                }

            }
        );
    }


    /* =====================================================
       SHOW MAIN PAGE
       FIXED — uses data-page
    ===================================================== */

    function showPage(number) {

        if (
            number < 1 ||
            number > 8
        ) {
            return;
        }

        pages.forEach(page => {

            page.classList.remove(
                "active"
            );

        });


        const target =
            document.querySelector(
                `.page[data-page="${number}"]`
            );


        if (!target) {

            console.error(
                "Page not found:",
                number
            );

            return;
        }


        target.classList.add(
            "active"
        );


        currentPage =
            number;


        updateProgress(
            number
        );


        if (number === 8) {

            resetNoButton();
        }


        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }


    /* =====================================================
       SHOW SPECIAL PAGE
    ===================================================== */

    function showSpecialPage(id) {

        pages.forEach(page => {

            page.classList.remove(
                "active"
            );

        });


        const target =
            document.getElementById(id);


        if (!target) {

            console.error(
                "Special page not found:",
                id
            );

            return;
        }


        target.classList.add(
            "active"
        );


        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }


    /* =====================================================
       PROGRESS BAR
    ===================================================== */

    function updateProgress(number) {

        if (!progressBar) return;

        const percentage =
            (number / 8) * 100;

        progressBar.style.width =
            `${percentage}%`;
    }


    /* =====================================================
       NORMAL CONTINUE BUTTONS
    ===================================================== */

    const nextButtons =
        document.querySelectorAll(
            ".next-btn"
        );


    nextButtons.forEach(button => {

        button.addEventListener(
            "click",
            () => {

                if (currentPage === 1) {

                    startMusic();
                }


                if (currentPage < 8) {

                    showPage(
                        currentPage + 1
                    );
                }

            }
        );

    });


    /* =====================================================
       START BUTTON
    ===================================================== */

    const startButton =
        document.querySelector(
            ".start-btn"
        );


    if (startButton) {

        startButton.addEventListener(
            "click",
            () => {

                /*
                 * IMPORTANT:
                 * Music starts directly from
                 * this user click.
                 */

                startMusic();

                showPage(2);

            }
        );
    }


    /* =====================================================
       YES BUTTON
    ===================================================== */

    if (yesBtn) {

        yesBtn.addEventListener(
            "click",
            () => {

                response = "YES";

                showSpecialPage(
                    "datePage"
                );

            }
        );
    }


    /* =====================================================
       NO BUTTON
    ===================================================== */

    function moveNoButton() {

        if (!noBtn) return;


        noBtn.style.position =
            "fixed";


        const width =
            noBtn.offsetWidth;

        const height =
            noBtn.offsetHeight;


        const padding = 20;


        const maxX =
            window.innerWidth -
            width -
            padding;


        const maxY =
            window.innerHeight -
            height -
            padding;


        const x =
            padding +
            Math.random() *
            Math.max(
                1,
                maxX - padding
            );


        const y =
            padding +
            Math.random() *
            Math.max(
                1,
                maxY - padding
            );


        noBtn.style.left =
            `${x}px`;

        noBtn.style.top =
            `${y}px`;
    }


    if (noBtn) {

        noBtn.addEventListener(
            "mouseenter",
            moveNoButton
        );


        noBtn.addEventListener(
            "pointerdown",
            event => {

                event.preventDefault();

                event.stopPropagation();

                moveNoButton();

            }
        );


        noBtn.addEventListener(
            "touchstart",
            event => {

                event.preventDefault();

                event.stopPropagation();

                moveNoButton();

            },
            {
                passive: false
            }
        );


        noBtn.addEventListener(
            "click",
            event => {

                event.preventDefault();

                event.stopPropagation();

                moveNoButton();

            }
        );
    }


    function resetNoButton() {

        if (!noBtn) return;

        noBtn.style.position = "";

        noBtn.style.left = "";

        noBtn.style.top = "";
    }


    /* =====================================================
       DATE TYPE SELECTION
    ===================================================== */

    dateCards.forEach(card => {

        card.addEventListener(
            "click",
            () => {

                dateCards.forEach(
                    item => {

                        item.classList.remove(
                            "selected"
                        );

                    }
                );


                card.classList.add(
                    "selected"
                );


                selectedDateType =
                    card.dataset.type || "";


                if (dateOptions) {

                    dateOptions.classList.remove(
                        "hidden"
                    );
                }

            }
        );
    });


    /* =====================================================
       DATE
    ===================================================== */

    if (dateInput) {

        dateInput.addEventListener(
            "change",
            () => {

                selectedDate =
                    dateInput.value;

            }
        );
    }


    /* =====================================================
       TIME
    ===================================================== */

    if (timeInput) {

        timeInput.addEventListener(
            "change",
            () => {

                selectedTime =
                    timeInput.value;

            }
        );
    }


    /* =====================================================
       DATE CONTINUE
    ===================================================== */

    if (dateContinue) {

        dateContinue.addEventListener(
            "click",
            () => {

                if (!selectedDateType) {

                    alert(
                        "Please choose what kind of date you'd like 🌸"
                    );

                    return;
                }


                selectedDate =
                    dateInput
                        ? dateInput.value
                        : "";


                selectedTime =
                    timeInput
                        ? timeInput.value
                        : "";


                if (!selectedDate) {

                    alert(
                        "Please choose a date ❤️"
                    );

                    return;
                }


                if (!selectedTime) {

                    alert(
                        "Please choose a time ✨"
                    );

                    return;
                }


                showSpecialPage(
                    "messagePage"
                );

            }
        );
    }


    /* =====================================================
       MESSAGE CONTINUE
    ===================================================== */

    if (messageContinue) {

        messageContinue.addEventListener(
            "click",
            () => {

                showSpecialPage(
                    "passwordPage"
                );

            }
        );
    }


    /* =====================================================
       PASSWORD
    ===================================================== */

    function checkPassword() {

        if (!passwordInput) return;


        const entered =
            passwordInput.value.trim();


        if (
            entered.toLowerCase() !==
            CONFIG.SECRET_PASSWORD.toLowerCase()
        ) {

            if (passwordError) {

                passwordError.textContent =
                    "That's not the password 😄 Try again.";
            }

            passwordInput.focus();

            return;
        }


        if (passwordError) {

            passwordError.textContent =
                "";
        }


        submitResponse();

    }


    if (passwordBtn) {

        passwordBtn.addEventListener(
            "click",
            checkPassword
        );
    }


    if (passwordInput) {

        passwordInput.addEventListener(
            "keydown",
            event => {

                if (event.key === "Enter") {

                    event.preventDefault();

                    checkPassword();
                }
            }
        );
    }


    /* =====================================================
       GOOGLE SHEETS DATA
    ===================================================== */

    function getFormData() {

        return {

            response:
                response || "YES",

            dateType:
                selectedDateType || "",

            preferredDate:
                selectedDate || "",

            preferredTime:
                selectedTime || "",

            message:
                messageInput
                    ? messageInput.value.trim()
                    : ""
        };
    }


    /* =====================================================
       GOOGLE SHEETS
    ===================================================== */

    async function submitToGoogleSheets(data) {

        if (
            !CONFIG.GOOGLE_SCRIPT_URL ||
            CONFIG.GOOGLE_SCRIPT_URL.includes(
                "PASTE_YOUR_GOOGLE_APPS_SCRIPT"
            )
        ) {

            console.log(
                "Google Sheets URL not configured."
            );

            return;
        }


        /*
         * text/plain avoids a CORS preflight.
         * Apps Script can read the JSON body.
         */

        await fetch(
            CONFIG.GOOGLE_SCRIPT_URL,
            {

                method: "POST",

                mode: "no-cors",

                headers: {
                    "Content-Type":
                        "text/plain;charset=utf-8"
                },

                body:
                    JSON.stringify(data)
            }
        );
    }


    /* =====================================================
       FINAL SUBMIT
    ===================================================== */

    async function submitResponse() {

        if (passwordBtn) {

            passwordBtn.disabled =
                true;

            passwordBtn.textContent =
                "Sending... ❤️";
        }


        const data =
            getFormData();


        try {

            await submitToGoogleSheets(
                data
            );


            setTimeout(
                () => {

                    showSpecialPage(
                        "thanksPage"
                    );

                    if (passwordBtn) {

                        passwordBtn.disabled =
                            false;

                        passwordBtn.textContent =
                            "Open the final page ✨";
                    }

                },
                700
            );


        } catch (error) {

            console.error(
                "Google Sheets error:",
                error
            );


            if (passwordError) {

                passwordError.textContent =
                    "Something went wrong. Please try again.";
            }


            if (passwordBtn) {

                passwordBtn.disabled =
                    false;

                passwordBtn.textContent =
                    "Open the final page ✨";
            }
        }
    }


    /* =====================================================
       FLOATING PARTICLES
    ===================================================== */

    const particleContainer =
        document.getElementById(
            "particles"
        );


    if (particleContainer) {

        for (
            let i = 0;
            i < 25;
            i++
        ) {

            const particle =
                document.createElement(
                    "span"
                );


            particle.className =
                "particle";


            particle.style.left =
                Math.random() * 100 +
                "%";


            particle.style.animationDuration =
                7 +
                Math.random() * 9 +
                "s";


            particle.style.animationDelay =
                Math.random() * 8 +
                "s";


            particleContainer.appendChild(
                particle
            );
        }
    }


    /* =====================================================
       FALLING PETALS
    ===================================================== */

    const petalContainer =
        document.querySelector(
            ".petals"
        );


    if (petalContainer) {

        const flowers = [
            "🌸",
            "🌷",
            "🌺",
            "✿"
        ];


        for (
            let i = 0;
            i < 14;
            i++
        ) {

            const petal =
                document.createElement(
                    "span"
                );


            petal.className =
                "petal";


            petal.textContent =
                flowers[
                    Math.floor(
                        Math.random() *
                        flowers.length
                    )
                ];


            petal.style.left =
                Math.random() * 100 +
                "%";


            petal.style.animationDuration =
                8 +
                Math.random() * 10 +
                "s";


            petal.style.animationDelay =
                Math.random() * 10 +
                "s";


            petalContainer.appendChild(
                petal
            );
        }
    }


    /* =====================================================
       INITIAL STATE
    ===================================================== */

    pages.forEach(page => {

        page.classList.remove(
            "active"
        );

    });


    const firstPage =
        document.querySelector(
            '.page[data-page="1"]'
        );


    if (firstPage) {

        firstPage.classList.add(
            "active"
        );
    }


    updateProgress(1);


    if (bgMusic) {

        bgMusic.pause();

        bgMusic.autoplay = false;
    }


    console.log(
        "🌸 Shraddha website loaded successfully."
    );

});