function filter(){

  var value, name, item, i;

  value = document.getElementById("collection_search_txt").value.toUpperCase();
  item = document.getElementsByClassName("collection_gallery_cont");

  for(i=0;i<item.length;i++){
    name = item[i].querySelectorAll(".collection_gallery_txt_box>h5");
    if(name[0].innerHTML.toUpperCase().indexOf(value) > -1){
      // item[i].style.display = "flex";
      // item[i].style.display = "block";
      item[i].style.display = "";
      // item[i].style.display = "inline-block";
    }else{
      item[i].style.display = "none";
    }
  }
}