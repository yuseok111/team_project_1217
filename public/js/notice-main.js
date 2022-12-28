function noticeTabOpen2(event, tabName) {

  let noticeTabContent = document.getElementsByClassName('notice_tabcont');
  for (i = 0; i < noticeTabContent.length; i++) {
    noticeTabContent[i].style.display = 'none';
  }
  document.getElementById(tabName).style.display = "block";

  let noticeTabLink = document.getElementsByClassName("notice_tablink1");
  for (i = 0; i < noticeTabLink.length; i++) {
    noticeTabLink[i].className = noticeTabLink[i].className.replace(' notice_tab_active', '');
  }
  event.currentTarget.className += ' notice_tab_active';
}

function noticeTabOpen1(event, tabName) {

  // let noticeTabContent = document.getElementsByClassName('notice_tabcont');
  // for (i = 0; i < noticeTabContent.length; i++) {
  //   noticeTabContent[i].style.display = 'none';
  // }
  // document.getElementById(tabName).style.display = "block";

  let noticeTabLink = document.getElementsByClassName("notice_tablink1");
  for (i = 0; i < noticeTabLink.length; i++) {
    noticeTabLink[i].className = noticeTabLink[i].className.replace(' notice_tab_active', '');
  }
  event.currentTarget.className += ' notice_tab_active';
}

$("#file-input").on('change', function () {
  var fileName = $("#file-input").val();
  $(".upload-name").val(fileName);
});