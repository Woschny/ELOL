window.addEventListener("load", hdlLoad);
function hdlLoad() {
    let divActive = document.getElementById("active");
    let divLocation = document.getElementById("location");
    let divMenu = document.getElementById("menu");
    let divVideos = document.getElementById("videos");
    let divTest = document.getElementById("tests");
    let introBtn = document.getElementById("IntroMenu");
    let oneOneBtn = document.getElementById("1.1Menu");
    let oneTwoBtn = document.getElementById("1.2Menu");
    let oneThreeBtn = document.getElementById("1.3Menu");
    let oneFourBtn = document.getElementById("1.4Menu");
    let twoOneBtn = document.getElementById("2.1Menu");
    let twoTwoBtn = document.getElementById("2.2Menu");
    let twoThreeBtn = document.getElementById("2.3Menu");
    let twoFourBtn = document.getElementById("2.4Menu");
    let outroBtn = document.getElementById("OutroMenu");
    let testOneBtn = document.getElementById("T1");
    let testTwoBtn = document.getElementById("T2");
    let testThreeBtn = document.getElementById("T3");
    let testFourBtn = document.getElementById("T4");
    let testFiveBtn = document.getElementById("T5");
    let testSixBtn = document.getElementById("T6");
    let testSevenBtn = document.getElementById("T7");
    let testAightBtn = document.getElementById("T8");
    let videoIDArray = ["IntroVideo", "1.1Video", "1.2Video", "1.3Video", "1.4Video", "2.1Video", "2.2Video", "2.3Video", "2.4Video", "OutroVideo"];
    let testIDArray = ["test1", "test2", "test3", "test4", "test5", "test6", "test7", "test8"];
    let activeVideo;
    let activeTest;
    let score = 0;
    let rightAnswers = [];
    introBtn.addEventListener("click", () => moveVideoToActive("IntroVideo"));
    oneOneBtn.addEventListener("click", () => moveVideoToActive("1.1Video"));
    oneTwoBtn.addEventListener("click", () => moveVideoToActive("1.2Video"));
    oneThreeBtn.addEventListener("click", () => moveVideoToActive("1.3Video"));
    oneFourBtn.addEventListener("click", () => moveVideoToActive("1.4Video"));
    twoOneBtn.addEventListener("click", () => moveVideoToActive("2.1Video"));
    twoTwoBtn.addEventListener("click", () => moveVideoToActive("2.2Video"));
    twoThreeBtn.addEventListener("click", () => moveVideoToActive("2.3Video"));
    twoFourBtn.addEventListener("click", () => moveVideoToActive("2.4Video"));
    outroBtn.addEventListener("click", () => moveVideoToActive("OutroVideo"));
    testOneBtn.addEventListener("click", () => moveTestToActive("test1"));
    testTwoBtn.addEventListener("click", () => moveTestToActive("test2"));
    testThreeBtn.addEventListener("click", () => moveTestToActive("test3"));
    testFourBtn.addEventListener("click", () => moveTestToActive("test4"));
    testFiveBtn.addEventListener("click", () => moveTestToActive("test5"));
    testSixBtn.addEventListener("click", () => moveTestToActive("test6"));
    testSevenBtn.addEventListener("click", () => moveTestToActive("test7"));
    testAightBtn.addEventListener("click", () => moveTestToActive("test8"));
    moveVideoToActive("IntroVideo");
    const body = document.querySelector("body");
    let x = 0;
    let y = 0;
    window.addEventListener("mousemove", getCursorPositionMain);
    function getCursorPositionMain(event) {
        const rect = body.getBoundingClientRect();
        x = (event.clientX - rect.left);
        y = (event.clientY - rect.top);
        if (x < 250 && y > 200 && y < 750) {
            {
                divMenu.classList.remove("slide-in-from-right"), divMenu.classList.add("slide-in-from-left");
            }
        }
        else if (x > 250) {
            {
                divMenu.classList.remove("slide-in-from-left"), divMenu.classList.add("slide-in-from-right");
            }
        }
    }
    function moveVideoToActive(id) {
        if (divActive.children.length > 0) {
            if (divActive.children[0].className == "video") {
                activeVideo.pause();
                divVideos.appendChild(divActive.children[0]);
            }
            else if (divActive.children[0].className == "test") {
                divTest.appendChild(divActive.children[0]);
            }
        }
        divActive.appendChild(document.getElementById(id));
        activeVideo = document.getElementById(id);
        activeVideo.play();
        if (activeVideo.id != "OutroVideo") {
            activeVideo.addEventListener("ended", () => moveVideoToActive(videoIDArray[videoIDArray.indexOf(activeVideo.id) + 1]));
        }
    }
    function moveTestToActive(id) {
        if (divActive.children.length > 0) {
            if (divActive.children[0].className == "video") {
                activeVideo.pause();
                divVideos.appendChild(divActive.children[0]);
            }
            else if (divActive.children[0].className == "test") {
                divTest.appendChild(divActive.children[0]);
            }
        }
        divActive.appendChild(document.getElementById(id));
        activeTest = document.getElementById(id);
        testInstaller();
    }
    function testInstaller() {
        score = 0;
        rightAnswers = [];
        let inputs = activeTest.querySelectorAll("input");
        for (let input of inputs) {
            input.addEventListener("change", () => displayMessage(input.value, input.getAttribute("answer"), input.checked));
            input.checked = false;
            if (input.getAttribute("answer") == "right") {
                rightAnswers.push(input);
            }
        }
        if (activeTest.querySelector("textarea") != undefined) {
            activeTest.querySelector("textarea").value = "";
        }
    }
    function alt() {
        alert("Super du hast den Test erfolgreich gelöst! Auf zum nächsten Test!");
        moveTestToActive(testIDArray[testIDArray.indexOf(activeTest.id) + 1]);
    }
    function displayMessage(value, answer, ischecked) {
        if (ischecked == true) {
            activeTest.querySelector("textarea").value = value;
            if (answer == "right") {
                activeTest.querySelector("textarea").classList.remove("rounded-border-red");
                activeTest.querySelector("textarea").classList.remove("rounded-border-green");
                activeTest.querySelector("textarea").classList.remove("rounded-border-white");
                activeTest.querySelector("textarea").classList.add("rounded-border-green");
                score++;
            }
            else {
                activeTest.querySelector("textarea").classList.remove("rounded-border-green");
                activeTest.querySelector("textarea").classList.remove("rounded-border-red");
                activeTest.querySelector("textarea").classList.remove("rounded-border-white");
                activeTest.querySelector("textarea").classList.add("rounded-border-red");
                if (rightAnswers.length > 1) {
                    score--;
                }
            }
        }
        else {
            activeTest.querySelector("textarea").value = "";
            activeTest.querySelector("textarea").classList.remove("rounded-border-green");
            activeTest.querySelector("textarea").classList.remove("rounded-border-red");
            activeTest.querySelector("textarea").classList.add("rounded-border-white");
            if (answer == "right") {
                if (rightAnswers.length > 1) {
                    score--;
                }
            }
            else {
                score++;
            }
        }
        if (score == rightAnswers.length) {
            setTimeout(alt, 100);
        }
    }
    enableDragAndDrop();
    function enableDragAndDrop() {
        const cards = document.getElementsByClassName('card');
        const places = document.querySelectorAll('.place');
        Array.from(cards).forEach((card) => {
            card.draggable = true;
            card.addEventListener('dragstart', (event) => {
                var _a;
                (_a = event.dataTransfer) === null || _a === void 0 ? void 0 : _a.setData('text', card.dataset.cardId);
            });
        });
        Array.from(places).forEach((place) => {
            place.addEventListener('dragover', (event) => {
                event.preventDefault();
            });
            place.addEventListener('drop', (event) => {
                var _a;
                event.preventDefault();
                const cardId = (_a = event.dataTransfer) === null || _a === void 0 ? void 0 : _a.getData('text');
                const card = document.querySelector(`[data-card-id="${cardId}"]`);
                if (card) {
                    place.appendChild(card);
                    if (place.getAttribute("dest") == card.getAttribute("dest")) {
                        activeTest.querySelector("textarea").value = "Korrekt!";
                        activeTest.querySelector("textarea").classList.remove("rounded-border-red");
                        activeTest.querySelector("textarea").classList.remove("rounded-border-green");
                        activeTest.querySelector("textarea").classList.add("rounded-border-green");
                        if (card.getAttribute("false") == "false") {
                            score++;
                        }
                        if (card.getAttribute("false") == "true") {
                            score--;
                        }
                        card.setAttribute("false", "true");
                        score++;
                    }
                    else if (place.getAttribute("text")) {
                        activeTest.querySelector("textarea").value = place.getAttribute("text");
                        activeTest.querySelector("textarea").classList.remove("rounded-border-green");
                        activeTest.querySelector("textarea").classList.remove("rounded-border-red");
                        activeTest.querySelector("textarea").classList.add("rounded-border-red");
                        if (card.getAttribute("false") == "true") {
                            score--;
                        }
                        if (card.getAttribute("false") != "false") {
                            card.setAttribute("false", "false");
                            score--;
                        }
                    }
                    else {
                        activeTest.querySelector("textarea").value = card.getAttribute("text");
                        activeTest.querySelector("textarea").classList.remove("rounded-border-green");
                        activeTest.querySelector("textarea").classList.remove("rounded-border-red");
                        activeTest.querySelector("textarea").classList.add("rounded-border-red");
                        if (card.getAttribute("false") == "true") {
                            score--;
                        }
                        if (card.getAttribute("false") != "false") {
                            card.setAttribute("false", "false");
                            score--;
                        }
                    }
                    if (score == activeTest.getElementsByClassName('card').length) {
                        setTimeout(alt, 100);
                    }
                }
            });
        });
    }
    ;
}
//# sourceMappingURL=index.js.map