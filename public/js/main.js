//header에 포지션 주기

let header = document.querySelector('#header');

window.addEventListener('wheel', () => {
  header.style.position = 'sticky';
  header.style.top = '0';
  header.style.left = '0';
  header.style.zIndex = '9999';
  header.style.backgroundColor = '#fff';
})





//mobile nav 관련

let mNav = document.querySelector('.m-nav');
let mLnb = document.querySelector('.m-lnb');


//모바일 네브 x자로 변경

let mnf = document.querySelector('.m-navf');
let mns = document.querySelector('.m-navs');
let mnt = document.querySelector('.m-navt');


function mnavch() {
  if (mLnb.classList.contains('m-active')) {
    mns.style.display = 'none';
    mnf.style.transform = 'rotate(45deg)';
    mnf.style.transition = '1s';
    mnf.style.position = 'relative';
    mnf.style.top = '6px';
    mnt.style.transform = 'rotate(-45deg)';
    mnt.style.transition = '1s';
    mnt.style.position = 'relative';
    mnt.style.top = '-6px';
  } else {
    mns.style.display = 'block';
    mnf.style.transform = 'rotate(0deg)';
    mnf.style.transition = '1s';
    mnf.style.top = '0';
    mnt.style.transform = 'rotate(0deg)';
    mnt.style.transition = '1s';
    mnt.style.position = '0';
    mnt.style.top = '0';
  }
}

//클릭시 모바일 네브 숨겨진페이지 등장
mNav.addEventListener('click', () => {
  mLnb.classList.toggle('m-active');
  mnavch();
});

let acc = document.querySelectorAll('.m-lnb-title-txt');

for (i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function () {
    this.classList.toggle("active");
    var next = this.nextElementSibling;
    if (next.style.display === "block") {
      next.style.display = "none";
    } else {
      let act = document.querySelectorAll('.m-lnb-title-txt.active');
      for (j = 0; j < act.length; j++) {
        act[j].classList.remove('active');
        act[j].nextElementSibling.style.display = "none";
      }
      this.classList.add('active');
      next.style.display = "block";
    }
  });
}


window.addEventListener('wheel', () => {
  mLnb.classList.remove(`m-active`);
  mnavch();
})

/* 브라우저 창의 innerwidth 가 1024 이상일경우 모바일nav가 사라지도록 설정 */

window.onresize = function (e) {
  var winwidht = window.innerWidth;
  // console.log(winwidht);
  if (winwidht > 1024) {
    mLnb.classList.remove('m-active');
    mnavch();
  }
}

//gnb-lnb 관련

let glnb = document.querySelector('.gnb');
let glnb2 = document.querySelectorAll('.gnb_lnb');
let gnb_bg = document.querySelector('#gnb_bg');
glnb.addEventListener('mouseenter', () => {
  gnb_bg.style.height = '300px';
  gnb_bg.style.borderBottom = '1px solid #000';
  for (i = 0; i < glnb2.length; i++) {
    glnb2[i].style.display = 'block';
    // glnb2[i].style.borderTop = '1px solid #000';
  }
})
gnb_bg.addEventListener('mouseleave', () => {
  gnb_bg.style.height = '0px';
  gnb_bg.style.borderBottom = '0';
  for (i = 0; i < glnb2.length; i++) {
    glnb2[i].style.display = 'none';
  }
})






//main1 스와이퍼
var swiper1 = new Swiper(".mySwiper1", {
  loop: true,
  // spaceBetween: 30,
  centeredSlides: true,
  autoplay: {
    delay: 4000,
    disableOnInteraction: false,
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});

//main2
const txt = document.querySelector('.main2-txt');

const textArr = 'Chang Ucchin Museum of Art    '.split(' ');

function initTxt(e, txtArray) {
  txtArray.push(...txtArray);
  for (let i = 0; i < txtArray.length; i++) {
    e.innerText += `${txtArray[i]}\u00A0`
  }
}

initTxt(txt, textArr);

let count = 0;

function marqueeText(count, e, direction) {
  if (count > e.scrollWidth / 2) {
    e.style.transform = 'translateX(0)'
    count = 0
  }
  e.style.transform = `translateX(${count * direction}px)`
  return count
}

function animate() {
  count++


  count = marqueeText(count, txt, -1)

  window.requestAnimationFrame(animate)
}
animate();


//main4
var swiper = new Swiper(".exhibitionSwiper", {
  slidesPerView: 4,
  spaceBetween: 30,
  slidesPerGroup: 4,
  loop: true,
  loopFillGroupWithBlank: true,
  pagination: {
    el: ".exhibition_pagination",
    type: "fraction", //버튼 숫자로 만든것
  },
  navigation: {
    nextEl: ".slide_next",
    prevEl: ".slide_prev",
  },
  breakpoints: {
    1440: { //1441 이상일 경우
      spaceBetween: 30, //slidesPerview 여백
      slidesPerView: 4, //레이아웃 뷰 개수
      slidesPerGroup: 4,
    },
    769: { //767 경우
      spaceBetween: 20,
      slidesPerView: 3,
      slidesPerGroup: 1,
    },
    691: { //767 경우
      spaceBetween: 20,
      slidesPerView: 2,
      slidesPerGroup: 2,
    },
    0: {
      // spaceBetween: 20,
      slidesPerView: 1,
      slidesPerGroup: 1,
    }
  }
});


//main5
function noticeTabOpen(event, tabName) {

  let noticeTabContent = document.getElementsByClassName('notice_tabcont');
  for (i = 0; i < noticeTabContent.length; i++) {
    noticeTabContent[i].style.display = 'none';
  }
  document.getElementById(tabName).style.display = "block";

  let noticeTabLink = document.getElementsByClassName("notice_tablink");
  for (i = 0; i < noticeTabLink.length; i++) {
    noticeTabLink[i].className = noticeTabLink[i].className.replace(' notice_tab_active', '');
  }
  event.currentTarget.className += ' notice_tab_active';
}


var swiper = new Swiper(".main6_collection", {
  slidesPerView: 5,
  scrollbar: {
    el: ".swiper-scrollbar",
    hide: false,
  },
});