$(document).ready(function () {
  //$(".navbar-collapse").css({
  //  maxHeight: $(document).height(50) - $(".navbar-header").height() + "px",
  //});
  $("#src-btn").click(function (event) {
    event.preventDefault();
    //if($("#search-input").)
    $("#search-input").css("display", "block");
    $("#src-logo-1").css("display", "block");
    $("#src-logo-2").css("display", "none");
    $("#search-input").focus();
  });
  $("body").dblclick(function () {
    $("#search-input").css("display", "none");
    $("#src-logo-1").css("display", "none");
    $("#src-logo-2").css("display", "block");
  });

  $(document).ajaxStart(function () {
    $("#loading").show();
  });

  $(document).ajaxStop(function () {
    $("#loading").hide();
  });
});
