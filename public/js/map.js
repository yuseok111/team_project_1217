let mapAddr =  document.querySelector('.map_addr');

window.addEventListener("scroll",()=>{
  resizeMap();
  resizeTraffic();
})

function resizeMap(){
    if (window.innerWidth >= 690){
      mapAddr.classList.add('map_addr_active');
      mapAddr.style.opacity = "1";
      mapAddr.style.top = "0";
      mapAddr.style.transition = "2s";
    } else{
      mapAddr.classList.remove('map_addr_active');
      mapAddr.style.opacity = "1";
      mapAddr.style.top = "0";
      mapAddr.style.transition = "none";
    }
}

let trafficWrap =  document.querySelector('.traffic_infor_wrap');
function resizeTraffic(){
  if(window.innerWidth >= 690){
    trafficWrap.classList.add('traffic_active');
    trafficWrap.style.opacity = "1";
    trafficWrap.style.top = "0";
    trafficWrap.style.transition = "2.5s";
  } else{
    trafficWrap.classList.remove('traffic_active')
    trafficWrap.style.opacity = "1";
    trafficWrap.style.top = "0";
    trafficWrap.style.transition = "none";
  }
}