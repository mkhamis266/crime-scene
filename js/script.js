const MAGNIFING_SIZE = 100;
const MAGNIFING_OFFSET = MAGNIFING_SIZE / 2;

const smallImg = document.getElementById("small-img");
const bigImg = document.getElementById("big-img");
const magnifingGlass = document.getElementById("magnifing-glass");

const fingerPrint = document.querySelector("#big-img .fingerprint-clue");

let fingerPrintFound = false;
let timerInterval;
let time = 5;

smallImg.addEventListener("touchmove", (e) => {
  const xCoord = e.touches[0].clientX;
  const yCoord = e.touches[0].clientY - MAGNIFING_OFFSET;

  magnifingGlass.style.top = `${yCoord - MAGNIFING_OFFSET}px`;
  magnifingGlass.style.left = `${xCoord - MAGNIFING_OFFSET}px`;

  const fingerPrintBoundingClientRect = fingerPrint.getBoundingClientRect();
  if (fingerPrintBoundingClientRect.x > xCoord && fingerPrintBoundingClientRect.x < xCoord + MAGNIFING_SIZE && fingerPrintBoundingClientRect.y > yCoord && fingerPrintBoundingClientRect.y < yCoord + MAGNIFING_SIZE) {
    fingerPrintFound = true;
  }
  bigImg.style.top = `-${yCoord}px`;
  bigImg.style.left = `-${xCoord}px`;
  bigImg.style.clipPath = `circle(40px at ${xCoord * 2}px ${yCoord * 2}px)`;
});

$(".fingerprint-choose").on("click", function () {
  if (fingerPrintFound == false) {
    alert("search for a clue");
  } else if ($(this).hasClass("correct") == false) {
    alert("wrong");
  } else {
    alert("correct");
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
      alert("timeout");
      return;
    }
  }, 1000);
});
