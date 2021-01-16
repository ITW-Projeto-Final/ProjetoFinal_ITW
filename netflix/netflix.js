region_Id = 2;

$(document).ready(() => {
  fetchInitial();
  $(".region").click(function () {
    region_Id = parseInt($(this).attr("value"));
    $(".region.active").removeClass("active");
    $(this).addClass("active");
    fetchInitial();
  });
});

function fetchInitial() {
  let moviesArray = [];
  let tvShowsArray = [];
  let arrayTitles = [];
  $.ajax({
    url: "http://192.168.160.58/netflix/api/Countries",
    type: "get",
    data: {
      id: region_Id,
      page: 1,
      pagesize: 3000,
    },

    success: (data) => {
      arrayTitles = data.Titles;
      arrayTitles.sort((a, b) => {
        return b.ReleaseYear - a.ReleaseYear;
      });

      let i = 0;
      while (moviesArray.length < 8) {
        if (arrayTitles[i].TypeName == "Movie") {
          moviesArray.push(arrayTitles[i]);
        }
        i += 1;
      }

      let j = 0;
      while (tvShowsArray.length < 8) {
        if (arrayTitles[j].TypeName == "TV Show") {
          tvShowsArray.push(arrayTitles[j]);
        }
        j += 1;
      }

      renderFirstDiv(moviesArray);
      fetchImages();
    },
    error: (err) => {
      console.log(err);
    },
  });
}

function fetchImages() {
  $(".carousel-tile").each(function (i, obj) {
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
              "https://image.tmdb.org/t/p/w500/" + data.results[0].poster_path;
            $(this).css("background-image", "url(" + image_path + ")");
          } else {
            $(this).css("background-image", "url(../images/not-available.jpg)");
          }
        } else {
          $(this).css("background-image", "url(../images/not-available.jpg)");
        }
      },
    });
  });
}

function renderFirstDiv(moviesArray) {
  let initialPageHTML = ``;

  initialPageHTML = `<div class="">
  `;

  const carouselHTML = `
    <div class="carousel">
    <div class="carousel-row">
      <div id="${moviesArray[0].Name}" class="carousel-tile"></div>
      <div id="${moviesArray[1].Name}" class="carousel-tile"> </div>
      <div id="${moviesArray[2].Name}" class="carousel-tile"> </div>
      <div id="${moviesArray[3].Name}" class="carousel-tile"> </div>
      <div id="${moviesArray[4].Name}" class="carousel-tile"></div>
      <div id="${moviesArray[5].Name}" class="carousel-tile"> </div>
      <div id="${moviesArray[6].Name}" class="carousel-tile"> </div>
      <div id="${moviesArray[7].Name}" class="carousel-tile"> </div>
    </div>
    </div>
      `;
  initialPageHTML += carouselHTML;

  $("#first-div").html(initialPageHTML);
}
