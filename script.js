var score = 0;
var nbSubject = 3;
var subjectSelected = 0;
var gameLaunched = false;
var subject = ["Graphiste", "Développeur", "Commercial"];
var devTab = [
  "Louise",
  "Gabriel",
  "Louis",
  "Jules",
  "Léa",
  "Chloé",
  "Anna",
  "Ambre"
];
var commercialTab = [
  "Maël",
  "Hugo",
  "Jade",
  "Alice",
  "Raphaël",
  "Camille",
  "Pauline"
];
var graphisteTab = ["Arthur", "Léo", "Lucas", "Nathan", "Emma"];

$(document).ready(function() {
  var animating = false;
  var cardsCounter = 0;
  var numOfCards = 20;
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
      if (gameLaunched) {
        likedCard($card);
      }
    } else if (pullDeltaX <= -decisionVal) {
      $card.addClass("to-left");
      if (gameLaunched) {
        dislikedCard($card);
      }
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
      // if (!gameLaunched) {
      //   alert("Veuillez lancer le jeu svp.");
      //   return;
      // }
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
    divDemoCardImg.style.backgroundImage =
      "url('https://workshop-i2-hringame.s3.eu-west-3.amazonaws.com/webapp-images/personnes/people" +
      imgSrc +
      ".jpg')";
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
    divSwipInfo.innerHTML = "<h2>Swiper à droite ou à gauche</h1>";

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
    divDemo.appendChild(createCard("Jules", "1", "C++, Java, Dropwizard"));
    divDemo.appendChild(
      createCard("Louis", "2", "HTML, CSS, Bootstrap, Angular")
    );
    divDemo.appendChild(createCard("Gabriel", "3", "SQL, PowerBI, Talend"));
    divDemo.appendChild(
      createCard("Raphaël", "4", "Vendeur chez Volvo pendant 2 ans")
    );
    divDemo.appendChild(createCard(" Maël ", "5", "à l'aise en comptabilité"));
    divDemo.appendChild(createCard(" Arthur ", "6", "Photoshop, Gimp"));
    divDemo.appendChild(createCard(" Hugo ", "7", "Excel"));
    divDemo.appendChild(createCard(" Léo ", "8", "Photoshop, Balsamiq"));
    divDemo.appendChild(createCard(" Lucas ", "9", "inDesign, Word"));
    divDemo.appendChild(createCard(" Nathan ", "10", "Photoshop, Illustrator"));
    divDemo.appendChild(createCard(" Emma ", "11", "Photoshop, Illustrator"));
    divDemo.appendChild(createCard(" Jade ", "12", "Excel, PowerPoint, Word"));
    divDemo.appendChild(createCard(" Alice ", "13", "Excel, PowerPoint, Word"));
    divDemo.appendChild(createCard(" Louise ", "14", "Ionic, Kotlin, Swift"));
    divDemo.appendChild(createCard(" Léa ", "15", "C++, Java"));
    divDemo.appendChild(createCard(" Chloé ", "16", "C#, XAML"));
    divDemo.appendChild(createCard(" Camille ", "17", "inDesign, Illustrator"));
    divDemo.appendChild(createCard(" Anna ", "18", "Ionic, Angular"));
    divDemo.appendChild(createCard(" Ambre ", "19", "HTML, CSS, JavaScript"));
    divDemo.appendChild(
      createCard(" Pauline ", "20", "Excel, Word Power Point")
    );
  }

  function checkIsDeveloper(id) {
    var res = false;
    devTab.forEach(elem => {
      if (elem == id) {
        res = true;
      }
    });
    return res;
  }

  function checkIsCommercial(id) {
    var res = false;
    commercialTab.forEach(elem => {
      if (elem == id) {
        res = true;
      }
    });
    return res;
  }

  function checkIsGraphiste(id) {
    var res = false;
    graphisteTab.forEach(elem => {
      if (elem == id) {
        res = true;
      }
    });
    return res;
  }

  function findIdhtmlElement(element) {
    var str = element.context.innerHTML;
    var char = str.split(" ");
    return char[7];
  }

  function likedCard(card) {
    var id = findIdhtmlElement(card);

    switch (subjectSelected) {
      case 0:
        if (checkIsGraphiste(id)) {
          score++;
        }
        break;
      case 1:
        if (checkIsDeveloper(id)) {
          score++;
        }
        break;
      case 2:
        if (checkIsCommercial(id)) {
          score++;
        }
        break;
    }
    console.log(score);
  }

  function dislikedCard(card) {
    var id = findIdhtmlElement(card);

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
var downloadTimer;
function launchTimer() {
  var timeleft = 30;

  clearInterval(downloadTimer);
  downloadTimer = setInterval(function() {
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
  document.getElementById("subject").innerText =
    "Trouver un " + subject[subjectSelected];
  score = 0;
  launchTimer();
  gameLaunched = true;
}

function endGame() {
  gameLaunched = false;
  document.getElementById("scoreId").innerText = score;
}
