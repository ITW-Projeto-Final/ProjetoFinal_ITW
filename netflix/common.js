region_Id = 2; //EUA REGION
var typingTimer; //timer identifier
var doneTypingInterval = 1500; //1.5 segundos após o fim da digitação
$(document).ready(function () {
  $("#search-div").hide();
  $(".region").click(function () {
    region_Id = parseInt($(this).attr("value"));
    $(".region.active").removeClass("active");
    $(this).addClass("active");
    //Executa se estiver em Titles
    if (window.location.pathname == "/netflix/titles.html") {
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

  $("#search-input").keyup(function () {
    clearTimeout(typingTimer);
    typingTimer = setTimeout(doneTyping, doneTypingInterval);
  });

  $("#search-input").keydown(function () {
    clearTimeout(typingTimer);
  });

  function doneTyping() {
    $("#main-div").hide();
    renderSearch($("#search-input").val());
    $("#search-div").show();
    if ($("#search-input").val() == "") {
      $("#main-div").show();
      $("#search-div").hide();
    }
  }

  $(document).ajaxStart(function () {
    $("#loading").show();
  });

  $(document).ajaxStop(function () {
    $("#loading").hide();
  });
});

function fetchSearchImages() {
  $(".card-img-top").each(function (i, obj) {
    $.ajax({
      type: "get",
      url:
        "https://api.themoviedb.org/3/search/movie?api_key=a77315529945efa26b94400d99db398b&language=en-US&query=" +
        encodeURIComponent(obj.id) +
        "&page=1&include_adult=true",
      dataType: "json",
      success: (data) => {
        if (data.results.length > 0) {
          if (data.results[0].poster_path != null) {
            image_path =
              "https://image.tmdb.org/t/p/original/" +
              data.results[0].poster_path;
            $(this).attr("src", image_path);
          } else {
            $(this).attr("src", "../images/not-available.jpg");
          }
        } else {
          $(this).attr("src", "../images/not-available.jpg");
        }
      },
    });
  });
}
