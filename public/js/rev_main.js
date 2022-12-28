var swiper = new Swiper(".mySwiperd", {
  breakpoints: {
    100: { slidesPerView: 1 },
    440: { slidesPerView: 1 },
    550: {
      slidesPerView: 1.5,
    },
    1000: {
      slidesPerView: 2,
    },
    1200: {
      slidesPerView: 3,
    },
  },
  slidesPerView: 4,
  loop: true,
  centeredSlides: true,
  spaceBetween: 100,
  freeMode: true,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
});
///탭호버 자바스크립트
var div2 = document.getElementsByClassName("fix_btnf,fix_btnt");

function handleClick(event) {
  console.log(event.target);
  // console.log(this);
  // 콘솔창을 보면 둘다 동일한 값이 나온다

  console.log(event.target.classList);

  if (event.target.classList[1] === "clicked") {
    event.target.classList.remove("clicked");
  } else {
    for (var i = 0; i < div2.length; i++) {
      div2[i].classList.remove("clicked");
    }

    event.target.classList.add("clicked");
  }
}

function init() {
  for (var i = 0; i < div2.length; i++) {
    div2[i].addEventListener("click", handleClick);
  }
}

init();
