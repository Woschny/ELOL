window.addEventListener("load", hdlLoad);
function hdlLoad(): void {
  let divActive: HTMLDivElement = <HTMLDivElement>document.getElementById("active");
  let divLocation: HTMLDivElement = <HTMLDivElement>document.getElementById("location");
  let divMenu: HTMLDivElement = <HTMLDivElement>document.getElementById("menu");
  let divVideos: HTMLDivElement = <HTMLDivElement>document.getElementById("videos");
  let divTest: HTMLDivElement = <HTMLDivElement>document.getElementById("tests");
  let introBtn: HTMLImageElement = <HTMLImageElement>document.getElementById("IntroMenu");
  let oneOneBtn: HTMLImageElement = <HTMLImageElement>document.getElementById("1.1Menu");
  let oneTwoBtn: HTMLImageElement = <HTMLImageElement>document.getElementById("1.2Menu");
  let oneThreeBtn: HTMLImageElement = <HTMLImageElement>document.getElementById("1.3Menu");
  let oneFourBtn: HTMLImageElement = <HTMLImageElement>document.getElementById("1.4Menu");
  let twoOneBtn: HTMLImageElement = <HTMLImageElement>document.getElementById("2.1Menu");
  let twoTwoBtn: HTMLImageElement = <HTMLImageElement>document.getElementById("2.2Menu");
  let twoThreeBtn: HTMLImageElement = <HTMLImageElement>document.getElementById("2.3Menu");
  let twoFourBtn: HTMLImageElement = <HTMLImageElement>document.getElementById("2.4Menu");
  let outroBtn: HTMLImageElement = <HTMLImageElement>document.getElementById("OutroMenu");
  let testOneBtn: HTMLImageElement = <HTMLImageElement>document.getElementById("T1");
  let testTwoBtn: HTMLImageElement = <HTMLImageElement>document.getElementById("T2");
  let testThreeBtn: HTMLImageElement = <HTMLImageElement>document.getElementById("T3");
  let testFourBtn: HTMLImageElement = <HTMLImageElement>document.getElementById("T4");
  let testFiveBtn: HTMLImageElement = <HTMLImageElement>document.getElementById("T5");
  let testSixBtn: HTMLImageElement = <HTMLImageElement>document.getElementById("T6");
  let testSevenBtn: HTMLImageElement = <HTMLImageElement>document.getElementById("T7");
  let testAightBtn: HTMLImageElement = <HTMLImageElement>document.getElementById("T8");
  let nextButton: HTMLButtonElement = <HTMLButtonElement>document.getElementById("nextButton")
  let videoIDArray: string[] = ["IntroVideo", "1.1Video", "1.2Video", "1.3Video", "1.4Video", "test1", "test2", "test3", "test4", "2.1Video", "2.2Video", "2.3Video", "2.4Video", "test5", "test6", "test7", "test8", "OutroVideo"]
  let activeVideo: HTMLVideoElement;
  let score: number = 0;
  let rightAnswers: HTMLInputElement[] = [];
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

  const body: HTMLBodyElement = <HTMLBodyElement>document.querySelector("body");
  let x: number = 0;
  let y: number = 0;
  window.addEventListener("mousemove", getCursorPositionMain);

  function getCursorPositionMain(event: MouseEvent): void {
    const rect: ClientRect = body.getBoundingClientRect();
    x = (event.clientX - rect.left);
    y = (event.clientY - rect.top);

    if (x < 50 && y > 200 && y < 750) {
      { divMenu.classList.remove("slide-in-from-right"), divMenu.classList.add("slide-in-from-left") }
    }
    else if (x > 250) {
      { divMenu.classList.remove("slide-in-from-left"), divMenu.classList.add("slide-in-from-right") }
    }
  }


  nextButton.addEventListener("click", () => moveVideoToActive(videoIDArray[videoIDArray.indexOf(activeVideo.id) + 1]));


  function moveVideoToActive(id: string): void {
    console.log(id);
    
    if(id == "test1" || id == "test2" ||id == "test3" ||id == "test4" ||id == "test5" ||id == "test6" || id == "test7" || id == "test8") {
      moveTestToActive(id);
    }
    else{
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
    activeVideo = <HTMLVideoElement>document.getElementById(id)
    activeVideo.play();
  }
  }

  function moveTestToActive(id: string): void {
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
    activeVideo = <HTMLVideoElement>document.getElementById(id)
    testInstaller();
  }

  function testInstaller(): void {
    score = 0;
    rightAnswers = [];
    let inputs: NodeListOf<HTMLInputElement> = <NodeListOf<HTMLInputElement>>activeVideo.querySelectorAll("input");
    for (let input of inputs) {
      input.addEventListener("change", () => displayMessage(input.value, input.getAttribute("answer"), input.checked))
      input.checked = false;
      if (input.getAttribute("answer") == "right") { rightAnswers.push(input); }
    }

    if (activeVideo.querySelector("textarea") != undefined) {
      activeVideo.querySelector("textarea").value = "";
    }
  }

  function alt(): void {
    alert("Super du hast den Test erfolgreich gelöst!");
    moveTestToActive(videoIDArray[videoIDArray.indexOf(activeVideo.id) + 1]);
  }


  function displayMessage(value: string, answer: string, ischecked: boolean): void {
    if (ischecked == true) {
      activeVideo.querySelector("textarea").value = value;
      if (answer == "right") {
        activeVideo.querySelector("textarea").classList.remove("rounded-border-red")
        activeVideo.querySelector("textarea").classList.remove("rounded-border-green")
        activeVideo.querySelector("textarea").classList.remove("rounded-border-white")
        activeVideo.querySelector("textarea").classList.add("rounded-border-green")
        score++;
      }
      else {
        activeVideo.querySelector("textarea").classList.remove("rounded-border-green")
        activeVideo.querySelector("textarea").classList.remove("rounded-border-red")
        activeVideo.querySelector("textarea").classList.remove("rounded-border-white")
        activeVideo.querySelector("textarea").classList.add("rounded-border-red")
        if (rightAnswers.length > 1) {
          score--;
        }
      }
    }
    else {
      activeVideo.querySelector("textarea").value = "";
      activeVideo.querySelector("textarea").classList.remove("rounded-border-green")
      activeVideo.querySelector("textarea").classList.remove("rounded-border-red")
      activeVideo.querySelector("textarea").classList.add("rounded-border-white")
      if (answer == "right") {
        if (rightAnswers.length > 1) {
          score--;
        }
      }
      else {
        score++
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

    Array.from(cards).forEach((card: HTMLElement) => {
      card.draggable = true;

      card.addEventListener('dragstart', (event: DragEvent) => {
        event.dataTransfer?.setData('text', card.dataset.cardId!);
      });
    });

    Array.from(places).forEach((place: HTMLElement) => {
      place.addEventListener('dragover', (event: DragEvent) => {
        event.preventDefault();
      });

      place.addEventListener('drop', (event: DragEvent) => {
        event.preventDefault();
        const cardId = event.dataTransfer?.getData('text');
        const card = document.querySelector(`[data-card-id="${cardId}"]`);
        if (card) {
          place.appendChild(card);
          if (place.getAttribute("dest") == card.getAttribute("dest")) {
            activeVideo.querySelector("textarea").value = "Korrekt!";
            activeVideo.querySelector("textarea").classList.remove("rounded-border-red")
            activeVideo.querySelector("textarea").classList.remove("rounded-border-green")
            activeVideo.querySelector("textarea").classList.add("rounded-border-green")
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
            activeVideo.querySelector("textarea").value = place.getAttribute("text");
            activeVideo.querySelector("textarea").classList.remove("rounded-border-green")
            activeVideo.querySelector("textarea").classList.remove("rounded-border-red")
            activeVideo.querySelector("textarea").classList.add("rounded-border-red")
            if (card.getAttribute("false") == "true") {
              score--;
            }
            if (card.getAttribute("false") != "false") {
              card.setAttribute("false", "false");
              score--;
            }
          }
          else {
            activeVideo.querySelector("textarea").value = card.getAttribute("text");
            activeVideo.querySelector("textarea").classList.remove("rounded-border-green")
            activeVideo.querySelector("textarea").classList.remove("rounded-border-red")
            activeVideo.querySelector("textarea").classList.add("rounded-border-red")
            if (card.getAttribute("false") == "true") {
              score--;
            }
            if (card.getAttribute("false") != "false") {
              card.setAttribute("false", "false");
              score--;
            }
          }
          if (score == activeVideo.getElementsByClassName('card').length) {
            setTimeout(alt, 100);
          }
        }
      });  

          });
  };
}

