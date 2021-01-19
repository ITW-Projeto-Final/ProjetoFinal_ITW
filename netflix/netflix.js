$(document).ready(() => {
  if (sessionStorage.getItem("region_Id") == 2) {
    $(".region.active").removeClass("active");
    $("#flag2").addClass("active");
  }
  if (sessionStorage.getItem("region_Id") == 19) {
    $(".region.active").removeClass("active");
    $("#flag19").addClass("active");
  }
  if (sessionStorage.getItem("region_Id") == 11) {
    $(".region.active").removeClass("active");
    $("#flag11").addClass("active");
  }
  fetchInitial();
  $(".region").click(function () {
    reg = parseInt($(this).attr("value"));
    sessionStorage.setItem("region_Id", reg);
    $(".region.active").removeClass("active");
    $(this).addClass("active");
    fetchInitial();
  });
});

function fetchInitial() {
  let moviesArray = [];
  let arrayTitles = [];
  $.ajax({
    url: "http://192.168.160.58/netflix/api/Countries",
    type: "get",
    data: {
      id: sessionStorage.getItem("region_Id"),
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

function changeModal(title_id) {
  $.ajax({
    url: "http://192.168.160.58/netflix/api/Titles/" + title_id,
    type: "get",
    data: {},

    success: (data) => {
      console.log(data);
      $("#modal-title").text(data.Name);
      let content_table = ``;
      let actors_table = `<td>`;
      data.Actors.forEach((actor) => {
        const { Id, Name } = actor;
        actors_table += `${Name}`;
        actors_table += `</br>`;
      });
      actors_table += "</td>";
      content_table = `<table class="table table-striped">
      <thead>
        <tr>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th scope="row">Description</th>
          <td>${data.Description}</td>
        </tr>
        <tr>
          <th scope="row">Release Year:</th>
          <td>${data.ReleaseYear}</td>
        </tr>
        <tr>
          <th scope="row">Actors:</th>
          ${actors_table}
        </tr>
      </tbody>
    </table>`;
      $("#modal-body").html(content_table);
    },
    error: (err) => {
      console.log(err);
    },
  });
}

function renderFirstDiv(moviesArray) {
  let initialPageHTML = ``;

  initialPageHTML = `<div class="">
  `;

  const carouselHTML = `
    <div class="carousel">
    <div class="carousel-row">
      <div id="${moviesArray[0].Name}" class="carousel-tile" 
      onclick="changeModal(${moviesArray[0].Id})"
        data-toggle="modal" 
        data-target="#modalBox"></div>
      <div id="${moviesArray[1].Name}" class="carousel-tile"
      onclick="changeModal(${moviesArray[1].Id})"
        data-toggle="modal" 
        data-target="#modalBox"> </div>
      <div id="${moviesArray[2].Name}" class="carousel-tile"
      onclick="changeModal(${moviesArray[2].Id})"
        data-toggle="modal" 
        data-target="#modalBox"> </div>
      <div id="${moviesArray[3].Name}" class="carousel-tile"
      onclick="changeModal(${moviesArray[3].Id})"
        data-toggle="modal" 
        data-target="#modalBox"> </div>
      <div id="${moviesArray[4].Name}" class="carousel-tile"
      onclick="changeModal(${moviesArray[4].Id})"
        data-toggle="modal" 
        data-target="#modalBox"></div>
      <div id="${moviesArray[5].Name}" class="carousel-tile"
      onclick="changeModal(${moviesArray[5].Id})"
        data-toggle="modal" 
        data-target="#modalBox"> </div>
      <div id="${moviesArray[6].Name}" class="carousel-tile"
      onclick="changeModal(${moviesArray[6].Id})"
        data-toggle="modal" 
        data-target="#modalBox"> </div>
      <div id="${moviesArray[7].Name}" class="carousel-tile"
      onclick="changeModal(${moviesArray[7].Id})"
        data-toggle="modal" 
        data-target="#modalBox"> </div>
    </div>
    </div>
      `;
  initialPageHTML += carouselHTML;

  $("#first-div").html(initialPageHTML);
}

function renderSearch(word) {
  console.log(word);
  console.log(encodeURIComponent(word));
  $.ajax({
    url:
      "http://192.168.160.58/netflix/api/Search/Titles?name=" +
      encodeURIComponent(word),
    type: "get",
    data: {},

    success: (data) => {
      console.log(data);
      console.log(data[0]);
      let titlesPageHTML = ``;

      titlesPageHTML = `<div class="titleCardsDiv">`;
      data.forEach((title) => {
        const { Id, Name, Description } = title;

        const titleHTML = `
        <div class="card titleCard" style="; background-color:black">
        <img class="card-img-top" id="${Name}" src="../images/ajaxLoader.gif" alt="Image Not Available">
         <div class="card-body">
           <h5 class="card-title">${Name}</h5>
          <p class="card-text">${Description}</p>
          <label class="btn-titles">
          <a id="${Id}" 
          href="https://www.youtube.com/results?search_query=${encodeURIComponent(
            Name
          )}+official trailer" 
          target="_blank"
          class="btn btn-dark btn-trailer">
          Trailer
          </a>
          <a href="#" class="btn btn-dark"">Details</a>
           </label>
         </div>
         </div>
           `;
        titlesPageHTML += titleHTML;
      });

      titlesPageHTML += "</div>";

      $("#search-div").html(titlesPageHTML);
      fetchSearchImages();
    },
    error: (err) => {
      console.log(err);
    },
  });
}
