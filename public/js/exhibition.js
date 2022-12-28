function filter1(){

  var value, name, item, i;

  value = document.getElementById("exhibition_search_txt").value.toUpperCase();
  item = document.getElementsByClassName("exhibition_list");

  for(i=0;i<item.length;i++){
    name = item[i].querySelectorAll(".exhibition_list_text_box>h5");
    if(name[0].innerHTML.toUpperCase().indexOf(value) > -1){
      item[i].style.display = "";
    }else{
      item[i].style.display = "none";
    }
  }
}