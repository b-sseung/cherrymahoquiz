var controller = new ScrollMagic.Controller();
var boxs = document.querySelectorAll(".box");
var tl = new TimelineMax();
var offset = window.innerHeight;

for (let i = 1; i < boxs.length; i++) {
  tl.from(boxs[i], 1, {
    xPercent: 100, ease: Linear.easeNone
  }, "+=1");
}

new ScrollMagic.Scene({
    triggerElement: "#AllBox", //스크롤 애니메이션 시작 지점
    triggerHook: "onLeave",
    duration: "100%" //애니메이션 재생 시간 end위치가 정해지는 것
  })
  .setPin("#AllBox")
  .setTween(tl)
  .addTo(controller);

  
// $(".box").each(function(i){  //글자에 해당하는 애니메이션
//   let target = $(this).find(".inBox");
//   var tl = new TimelineMax();
//   tl.staggerFrom(
//     target,
//     0.5,
//     { opacity: 0, scale: 0.5, y: 0, ease: Linear.easeOut },
//     0.05
//   );

//   new ScrollMagic.Scene({
//     triggerElement: "#AllBox",
//     triggerHook: 0,
//     offset: i * offset
//   })
//     .setTween(tl)
//     .addTo(controller);
// });