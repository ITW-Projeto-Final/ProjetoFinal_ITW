region_Id = 2; //EUA REGION
$(document).ready(function () {
  $(".region").click(function () {
    region_Id = parseInt($(this).attr("value"));
    $(".region.active").removeClass("active");
    $(this).addClass("active");
    //Executa se estiver em Titles ou Actors
    if (
      window.location.pathname == "/netflix/titles.html" ||
      window.location.pathname == "/netflix/actors.html"
    ) {
      renderPagination(1);
    }
    //Executa se estiver na Index page
    if (window.location.pathname == "/netflix/index.html") {
      fetchInitial();
    }
    console.log(region_Id);
  });

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
