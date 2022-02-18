var controller = new ScrollMagic.Controller();
var boxs = document.querySelectorAll(".box");
var tl = new TimelineMax();

for (let i = 1; i < boxs.length; i++) {
  tl.from(boxs[i], 1, {
    xPercent: 100, ease: Linear.easeNone
  }, "+=1");
}

new ScrollMagic.Scene({
    triggerElement: "#AllBox", //스크롤 애니메이션 시작 지점
    triggerHook: "onLeave",
    duration: "200%" //애니메이션 재생 시간 end위치가 정해지는 것
  })
  .setPin("#AllBox")
  .setTween(tl)
  .addTo(controller);