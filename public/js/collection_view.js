let topBtn =  document.querySelector('#topBtn');


window.onscroll = function(){
  scrollBtn();
}

function scrollBtn(){
  if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300){
    topBtn.classList.add('topbtnactive');
  }
}

topBtn.addEventListener('click',(e)=>{
  e.preventDefault();
  window.scrollTo({ top:0, behavior:'smooth'});
})



