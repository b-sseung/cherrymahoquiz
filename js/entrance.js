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


  const mToggle1 = document.getElementById("modalToggle1");
  const toggleBtn1 = document.querySelector(".toggleBtn1");
  const inside1 = document.querySelector(".inside1");
  const inside1Close1 = document.getElementById("close1");

  const mToggle2 = document.getElementById("modalToggle2");
  const toggleBtn2 = document.querySelector(".toggleBtn2");
  const inside2 = document.querySelector(".inside2");
  const inside1Close2 = document.getElementById("close2");

  const toggleBtn3 = document.querySelector(".toggleBtn3");

  mToggle1.addEventListener("change", function() {
    if (mToggle1.checked) {
      inside1.style.display = "block";
      inside1.style.animationName = "delayedFadeIn";
    }
  });

  toggleBtn1.addEventListener("animationend", function(){
    mToggle1.checked = false;
  });

  inside1Close1.addEventListener("click", function() {
    inside1.style.display = "none";
    inside1.style.opacity = 0;
  });

  mToggle2.addEventListener("change", function() {
    if (mToggle2.checked) {
      inside2.style.display = "block";
      inside2.style.animationName = "delayedFadeIn";
    }
  });

  toggleBtn2.addEventListener("animationend", function(){
    mToggle2.checked = false;
  });

  inside1Close2.addEventListener("click", function() {
    inside2.style.display = "none";
    inside2.style.opacity = 0;
  });

  toggleBtn3.addEventListener("click", function() {
    toggleBtn3.style.animationName = "btnExpand";
  });

  toggleBtn3.addEventListener("animationend", function(){
    window.location.href = "./main.html"
  });
}