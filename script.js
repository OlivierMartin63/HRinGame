var score = 0;
var nbSubject = 3;
var subjectSelected = 0;
var gameLaucnhed = false;
var subject = ["Graphiste", "Développeur", "Commercial"];
var devTab = ["1", "2"];
var commercialTab = ["3", "4"];
var graphisteTab = ["5", "6"];

$(document).ready(function() {
  var animating = false;
  var cardsCounter = 0;
  var numOfCards = 6;
  var decisionVal = 80;
  var pullDeltaX = 0;
  var deg = 0;
  var $card, $cardReject, $cardLike;

  function pullChange() {
    animating = true;
    deg = pullDeltaX / 10;
    $card.css(
      "transform",
      "translateX(" + pullDeltaX + "px) rotate(" + deg + "deg)"
    );

    var opacity = pullDeltaX / 100;
    var rejectOpacity = opacity >= 0 ? 0 : Math.abs(opacity);
    var likeOpacity = opacity <= 0 ? 0 : opacity;
    $cardReject.css("opacity", rejectOpacity);
    $cardLike.css("opacity", likeOpacity);
  }

  function release() {
    if (pullDeltaX >= decisionVal) {
      $card.addClass("to-right");
      likedCard($card);
      // findIdhtmlElement($card);
      // on like
    } else if (pullDeltaX <= -decisionVal) {
      $card.addClass("to-left");
      dislikedCard($card);
      // on dislike
    }

    if (Math.abs(pullDeltaX) >= decisionVal) {
      $card.addClass("inactive");
      setTimeout(function() {
        $card.addClass("below").removeClass("inactive to-left to-right");
        cardsCounter++;
        if (cardsCounter === numOfCards) {
          cardsCounter = 0;
          $(".demo__card").removeClass("below");
          // On reset par rapport au nombre de carte
        }
      }, 300);
    }

    if (Math.abs(pullDeltaX) < decisionVal) {
      $card.addClass("reset");
    }

    setTimeout(function() {
      $card
        .attr("style", "")
        .removeClass("reset")
        .find(".demo__card__choice")
        .attr("style", "");

      pullDeltaX = 0;
      animating = false;
    }, 300);
  }

  $(document).on("mousedown touchstart", ".demo__card:not(.inactive)", function(
    e
  ) {
    if (animating) return;

    $card = $(this);
    $cardReject = $(".demo__card__choice.m--reject", $card);
    $cardLike = $(".demo__card__choice.m--like", $card);
    var startX = e.pageX || e.originalEvent.touches[0].pageX;

    $(document).on("mousemove touchmove", function(e) {
      var x = e.pageX || e.originalEvent.touches[0].pageX;
      pullDeltaX = x - startX;
      if (!pullDeltaX) return;
      pullChange();
    });

    $(document).on("mouseup touchend", function() {
      $(document).off("mousemove touchmove mouseup touchend");
      if (!pullDeltaX) return; // prevents from rapid click events
      release();
    });
  });

  // Création d'un talent
  function createCard(name, imgSrc, description) {
    var divDemoCard = document.createElement("div");
    divDemoCard.setAttribute("class", "demo__card");

    var divDemoCardTop = document.createElement("div");
    divDemoCardTop.setAttribute("class", "demo__card__top lime");
    var divDemoCardImg = document.createElement("div");
    divDemoCardImg.setAttribute("class", "demo__card__img");
    var divDemoCardName = document.createElement("p");
    divDemoCardName.setAttribute("class", "demo__card__name");
    divDemoCardName.innerText = name; // initialisation du nom

    var divDemoCardBtm = document.createElement("div");
    divDemoCardBtm.setAttribute("class", "demo__card__btm");
    var divDemoCardWe = document.createElement("p");
    divDemoCardWe.setAttribute("class", "demo__card__we");
    divDemoCardWe.innerText = description; // initialisation de la description

    var divDemoCardChoiceReject = document.createElement("div");
    divDemoCardChoiceReject.setAttribute(
      "class",
      "demo__card__choice m--reject"
    );
    var divDemoCardChoiceLike = document.createElement("div");
    divDemoCardChoiceLike.setAttribute("class", "demo__card__choice m--like");
    var divDemoCardDrag = document.createElement("div");
    divDemoCardDrag.setAttribute("class", "demo__card__drag");
    var divSwipInfo = document.createElement("p");
    divSwipInfo.setAttribute("class", "demo__tip");
    divSwipInfo.innerText = "swiper à droite ou à gauche";

    divDemoCardTop.appendChild(divDemoCardImg);
    divDemoCardTop.appendChild(divDemoCardName);

    divDemoCardBtm.appendChild(divDemoCardWe);

    divDemoCard.appendChild(divDemoCardTop);
    divDemoCard.appendChild(divDemoCardBtm);
    divDemoCard.appendChild(divDemoCardChoiceReject);
    divDemoCard.appendChild(divDemoCardChoiceLike);
    divDemoCard.appendChild(divDemoCardDrag);
    divDemoCard.appendChild(divSwipInfo);

    return divDemoCard;
  }

  function setAllCards() {
    var divDemo = document.getElementById("tabCard");
    divDemo.appendChild(createCard("1", "", "dev"));
    divDemo.appendChild(createCard("2", "", "dev"));
    divDemo.appendChild(createCard("3", "", "commercial"));
    divDemo.appendChild(createCard("4", "", "commercial"));
    divDemo.appendChild(createCard("5", "", "graphiste"));
    divDemo.appendChild(createCard("6", "", "graphiste"));
    // divDemo.appendChild(createCard("5", "", "RGPD"));
    // divDemo.appendChild(createCard("6", "", "Femme de ménage"));
    console.log(divDemo);
  }

  function checkIsDeveloper(id) {
    devTab.forEach(elem => {
      if (elem == id) {
        return true;
      }
    });
    return false;
  }

  function checkIsCommercial(id) {
    commercialTab.forEach(elem => {
      if (elem == id) {
        return true;
      }
    });
    return false;
  }

  function checkIsGraphiste(id) {
    graphisteTab.forEach(elem => {
      console.log(elem);
      if (elem.toString() == id.toString()) {
        return true;
      }
    });
    return false;
  }

  function findIdhtmlElement(element) {
    var str = element.context.innerHTML;
    var char = str.split("");
    return char[97];
  }

  function endGame() {
    gameLaucnhed = false;
  }

  function likedCard(card) {
    var id = findIdhtmlElement(card);
    console.log("id card liké : " + id);
    console.log("sujet sélectionné : " + subjectSelected);

    switch (subjectSelected) {
      case 0:
        console.log("graphiste" + checkIsGraphiste(id));
        if (checkIsGraphiste(id)) {
          console.log("ok graph");
          score++;
        }
        break;
      case 1:
        console.log("dev");
        if (checkIsDeveloper(id)) {
          console.log("ok dev");
          score++;
        }
        break;
      case 2:
        console.log("commercial");
        if (checkIsCommercial(id)) {
          console.log("ok commercial");
          score++;
        }
        break;
    }
    console.log(score);
  }

  function dislikedCard(card) {
    var id = findIdhtmlElement(card);
    console.log(id);

    switch (subjectSelected) {
      case 0: // Graphiste
        if (checkIsDeveloper(id) || checkIsCommercial(id)) {
          score++;
        }
        break;
      case 1: // Développeur
        if (checkIsGraphiste(id) || checkIsCommercial(id)) {
          score++;
        }
        break;
      case 2: // Commercial
        if (checkIsDeveloper(id) || checkIsGraphiste(id)) {
          score++;
        }
        break;
    }
    console.log(score);
  }

  setAllCards();
});

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

function launchTimer() {
  var timeleft = 60;
  var downloadTimer = setInterval(function() {
    document.getElementById("countdown").innerHTML =
      timeleft + " secondes restantes !";
    timeleft -= 1;
    if (timeleft <= 0) {
      clearInterval(downloadTimer);
      document.getElementById("countdown").innerHTML = "Fini !";
      endGame();
    }
  }, 1000);
}

function setGame() {
  subjectSelected = getRandomInt(nbSubject);
  document.getElementById("subject").innerText = subject[subjectSelected];
  score = 0;
  launchTimer();
  gameLaucnhed = true;
}
