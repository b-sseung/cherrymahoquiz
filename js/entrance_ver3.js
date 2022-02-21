window.onload = function() {
  const firstDiv = document.querySelector(".first");
  const secondDiv = document.querySelector(".second");
  const secondImage = document.querySelector(".second-image");

  const firstDivHeight = firstDiv.offsetHeight;
  secondDiv.style.height = firstDivHeight + "px";

  secondDiv.style.transform = "scaleX(1)";

  secondDiv.addEventListener("transitionend", function() {
    const imageMove = firstDivHeight/2 * (-1) + secondImage.offsetHeight/2;   
    secondImage.style.transform = "translate(0px," + imageMove + "px)";
  });
  
  secondImage.addEventListener("transitionend", function() {
    firstDiv.style.visibility = "visible";
    secondDiv.style.display = "none";
  });
}