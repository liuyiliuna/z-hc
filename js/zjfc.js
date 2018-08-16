$(function(){
  $(".dpt-slide-list").css({"display":"none"});
  $(".dpt-item >div").removeClass("sidebar-title");
  $(".dpt-item >div").click(function(){
    $(this).addClass("sidebar-title");
  })
 })