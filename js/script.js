const MAGNIFING_SIZE = 100;
const MAGNIFING_OFFSET = MAGNIFING_SIZE / 2;

const smallImg = document.getElementById("small-img");
const bigImg = document.getElementById("big-img");
const magnifingGlass = document.getElementById("magnifing-glass");

const fingerPrint = document.querySelector("#big-img .fingerprint-clue");

const popupModal = new bootstrap.Modal("#popup", {
  keyboard: false,
});

let fingerPrintFound = false;
let timerInterval;
let time = 15;

smallImg.addEventListener("touchmove", (e) => {
  moveMagnifyingGlass(e.touches[0].clientX, e.touches[0].clientY);
});
smallImg.addEventListener("mousemove", (e) => {
  moveMagnifyingGlass(e.clientX, e.clientY);
});

function moveMagnifyingGlass(clientX, clientY) {
  const xCoord = clientX;
  const yCoord = clientY - MAGNIFING_OFFSET;

  magnifingGlass.style.top = `${yCoord - MAGNIFING_OFFSET}px`;
  magnifingGlass.style.left = `${xCoord - MAGNIFING_OFFSET}px`;

  const fingerPrintBoundingClientRect = fingerPrint.getBoundingClientRect();
  if (fingerPrintBoundingClientRect.x > xCoord && fingerPrintBoundingClientRect.x < xCoord + MAGNIFING_SIZE && fingerPrintBoundingClientRect.y > yCoord && fingerPrintBoundingClientRect.y < yCoord + MAGNIFING_SIZE) {
    fingerPrintFound = true;
    $("#message").html("You Found it!").css({
      color: "blue",
    });
  }
  bigImg.style.top = `-${yCoord}px`;
  bigImg.style.left = `-${xCoord}px`;
  bigImg.style.clipPath = `circle(40px at ${xCoord * 2}px ${yCoord * 2}px)`;
}

$(".fingerprint-choose").on("click", function () {
  if (fingerPrintFound == false) {
  } else if ($(this).hasClass("correct") == false) {
    $(this).css({
      backgroundColor: "rgba(210, 0, 0,0.3)",
    });
    clearInterval(timerInterval);
    $(".modal-body").html("Wrong");
    popupModal.show();
  } else {
    clearInterval(timerInterval);
    $(this).css({
      backgroundColor: "rgba(0, 210, 0,0.3)",
    });
    $(".modal-body").html("Correct");
    popupModal.show();
  }
});

$(document).on("DOMContentLoaded", function () {
  $("#timer").html(moment(time * 1000).format("mm [:] ss"));
  timerInterval = setInterval(function () {
    time--;
    console.log(time);
    $("#timer").html(moment(time * 1000).format("mm [:] ss"));
    if (time <= 0) {
      clearInterval(timerInterval);
      $(".modal-body").html("Time Out");
      popupModal.show();
      return;
    }
  }, 1000);
  $("#playAgain").on("click", function () {
    location.reload();
  });
});
