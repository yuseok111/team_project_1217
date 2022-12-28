let floorMap1 =  document.querySelector('.floor_map1');
let floorMap2 =  document.querySelector('.floor_map2');
let floorMap3 =  document.querySelector('.floor_map3');

window.addEventListener("scroll",()=>{
  resizeF1();
  resizeF2();
  resizeF3();
})

function resizeF1(){
  if (window.innerWidth >= 690){
    floorMap1.classList.add('floor1_active');
    floorMap1.style.opacity = "1";
    floorMap1.style.left = "0";
    floorMap1.style.transition = "2s";
  } else{
    floorMap1.classList.remove('floor1_active');
    floorMap1.style.opacity = "1";
    floorMap1.style.left = "0";
    floorMap1.style.transition = "none";
  }
}

function resizeF2(){
  if (window.innerWidth >= 690){
    floorMap2.classList.add('floor2_active');
    floorMap2.style.opacity = "1";
    floorMap2.style.left = "0";
    floorMap2.style.transition = "2.3s";
  } else{
    floorMap2.classList.remove('floor2_active');
    floorMap2.style.opacity = "1";
    floorMap2.style.left = "0";
    floorMap2.style.transition = "none";
  }
}

function resizeF3(){
  if (window.innerWidth >= 690){
    floorMap3.classList.add('floor3_active');
    floorMap3.style.opacity = "1";
    floorMap3.style.left = "0";
    floorMap3.style.transition = "2.6s";
  } else{
    floorMap3.classList.remove('floor3_active');
    floorMap3.style.opacity = "1";
    floorMap3.style.left = "0";
    floorMap3.style.transition = "none";
  }
}