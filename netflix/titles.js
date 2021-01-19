// VARIÁVEL GLOBAL E PAGE START
paginaAtual = 1;
$(document).ready(() => {
  renderPagination(1);
  $(".region").click(function () {
    reg = parseInt($(this).attr("value"));
    sessionStorage.setItem("region_Id", reg);
    renderPagination(1);
  });
  $(".btn-trailer").click(function () {});
});

function doneTyping() {
  $("#main-div").hide();
  $("#paginacao-div").hide();
  renderSearch($("#search-input").val());
  $("#search-div").show();
  if ($("#search-input").val() == "") {
    $("#main-div").show();
    $("#paginacao-div").show();
    $("#search-div").hide();
  }
}

function searchTitle(searchText) {
  $.ajax({
    url: "http://192.168.160.58/netflix/api/Titles",
    type: "get",
    data: {},

    success: (data) => {
      console.log(data.Titles);
    },
    error: (err) => {
      console.log(err);
    },
  });
}

function previousPage() {
  if (paginaAtual > 1) {
    renderPagination(paginaAtual - 1);
  }
}

function nextPage() {
  if (paginaAtual < 548) {
    renderPagination(paginaAtual + 1);
  }
}

function fetchTitles(pageNumber) {
  $.ajax({
    url: "http://192.168.160.58/netflix/api/Countries",
    type: "get",
    data: {
      id: sessionStorage.getItem("region_Id"),
      page: pageNumber,
      pagesize: 51,
    },

    success: (data) => {
      console.log(data);
      titlesArray = data.Titles;
      let titlesPageHTML = ``;

      titlesPageHTML = `<div class="titleCardsDiv">`;
      titlesArray.forEach((title) => {
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
          <a id="${Id}" class="btn btn-dark btn-details">Details</a>
          </label>
        </div>
        </div>
          `;
        titlesPageHTML += titleHTML;
      });

      titlesPageHTML += "</div>";

      $("#titlesDiv").html(titlesPageHTML);
      var idPagination = "#pagination" + String(pageNumber);
      $(".pages.active").removeClass("active");
      $(idPagination).addClass("active");
      fetchImages();
    },
    error: (err) => {
      console.log(err);
    },
  });
}
function fetchImages() {
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

function renderPagination(paginationNumber) {
  console.log("executou render page");
  $("#loading").show();
  paginaAtual = paginationNumber;

  $.ajax({
    url: "http://192.168.160.58/netflix/api/Countries",
    type: "get",
    data: {
      id: sessionStorage.getItem("region_Id"),
      page: paginationNumber,
      pagesize: 51,
    },

    success: (data) => {
      totalPages = 1;
      $.ajax({
        url: "http://192.168.160.58/netflix/api/Countries",
        type: "get",
        data: {
          id: sessionStorage.getItem("region_Id"),
        },
        success: (data) => {
          console.log(data);
          console.log(data.Titles.length);
          totalPages = parseInt(data.Titles.length / 51) + 1;
          console.log("PAGINAS TOTAIS: " + totalPages);
          let paginationHTML = ``;

          paginationHTML = `<div class="pagination" id="paginacao">
                            <a onclick='previousPage()'>&laquo;</a>`;

          if (totalPages < 15) {
            for (var i = 1; i <= totalPages; i++) {
              const pageHTML = `
                <a class='pages' id='pagination${i}' onclick='renderPagination(${i})'>${i}</a>        
              `;
              paginationHTML += pageHTML;
            }
          }

          if (totalPages >= 15) {
            for (var i = 1; i < 6; i++) {
              const pageHTML = `
                <a class='pages' id='pagination${i}' onclick='renderPagination(${i})'>${i}</a>        
              `;
              paginationHTML += pageHTML;
            }
            paginationHTML += "<a class='pages''>...</a>";

            if (paginationNumber >= 5 && paginationNumber <= 46) {
              if (paginationNumber == 5) {
                i = paginationNumber + 1;
                const pageHTML = `       
                <a class='pages' id='pagination${i}' onclick='renderPagination(${i})'>${i}</a>        
              `;
                paginationHTML += pageHTML;
              } else {
                if (paginationNumber == 46) {
                  i = paginationNumber;
                  const pageHTML = `       
                  <a class='pages' id='pagination${i}' onclick='renderPagination(${i})'>${i}</a>        
                `;
                  paginationHTML += pageHTML;
                } else {
                  h = paginationNumber;
                  i = paginationNumber + 1;
                  const pageHTML = `
                <a class='pages' id='pagination${h}' onclick='renderPagination(${h})'>${h}</a>        
                <a class='pages' id='pagination${i}' onclick='renderPagination(${i})'>${i}</a>        
              `;
                  paginationHTML += pageHTML;
                }
              }
            }
            paginationHTML += "<a class='pages''>...</a>";
            for (var i = totalPages - 5; i <= totalPages; i++) {
              const pageHTML = `
                <a class='pages' id='pagination${i}' onclick='renderPagination(${i})'>${i}</a>        
              `;
              paginationHTML += pageHTML;
            }
          }

          paginationHTML += `<a onclick='nextPage()'>&raquo;</a>
                              </div>`;

          $("#paginacao-div").html(paginationHTML);

          fetchTitles(paginationNumber);
          window.scrollTo(0, 0);
        },
      });
    },

    error: (err) => {
      console.log("ERRO => " + err);
    },
  });
}

function renderSearch(word) {
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
          <a class="btn btn-dark"">Details</a>
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
