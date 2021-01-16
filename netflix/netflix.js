var moviesArray = [];
var tvShowsArray = [];

$(document).ready(() => {
  fetchInitial();
});

function fetchInitial() {
  $.ajax({
    url: "http://192.168.160.58/netflix/api/Countries",
    type: "get",
    data: {
      id: region_Id,
      page: 1,
      pagesize: 40,
    },

    success: (data) => {
      console.log(data);
      function sortByDate(a, b) {
        if (a.ReleaseYear > b.ReleaseYear) {
          return -1;
        }
        if (a.ReleaseYear < b.ReleaseYear) {
          return 1;
        }
        return 0;
      }
      titlesArray = data.Titles.sort(sortByDate);
      console.log(data.Titles);
      console.log(titlesArray[0]);
      let i = 0;
      // while (moviesArray.length < 8) {
      //   if (titlesArray[i].TypeName == "Movie") {
      //     moviesArray.push(titlesArray[i]);
      //     i += 1;
      //   }
      // }

      let j = 0;
      // while (tvShowsArray.length < 8) {
      //   if (titlesArray[j].TypeName == "TV Show") {
      //     tvShowsArray.push(titlesArray[j]);
      //     j += 1;
      //   }
      // }
      console.log(moviesArray);
      console.log(tvShowsArray);

      renderFirstDiv(moviesArray);
      renderSecondDiv(tvShowsArray);
      fetchImages();
    },
    error: (err) => {
      console.log(err);
    },
  });
}

function fetchImages() {
  $(".carousel-tile").each(function (i, obj) {
    console.log(obj.id);
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

  $("#first-div").append(initialPageHTML);
}

function renderSecondDiv(tvShowsArray) {
  let initialPageHTML = ``;

  initialPageHTML = `<div class="">
  `;

  const carouselHTML = `
    <div class="carousel">
    <div class="carousel-row">
      <div id="${tvShowsArray[0].Name}" class="carousel-tile">${tvShowsArray[0].Name}</div>
      <div id="${tvShowsArray[1].Name}" class="carousel-tile">${tvShowsArray[1].Name} </div>
      <div id="${tvShowsArray[2].Name}" class="carousel-tile">${tvShowsArray[2].Name} </div>
      <div id="${tvShowsArray[3].Name}" class="carousel-tile">${tvShowsArray[3].Name} </div>
      <div id="${tvShowsArray[4].Name}" class="carousel-tile">${tvShowsArray[4].Name}</div>
      <div id="${tvShowsArray[5].Name}" class="carousel-tile">${tvShowsArray[5].Name} </div>
      <div id="${tvShowsArray[6].Name}" class="carousel-tile">${tvShowsArray[6].Name} </div>
      <div id="${tvShowsArray[7].Name}" class="carousel-tile">${tvShowsArray[7].Name} </div>
    </div>
    </div>
      `;
  initialPageHTML += carouselHTML;

  $("#second-div").append(initialPageHTML);
}
