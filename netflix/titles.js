paginaAtual = 1;
$(document).ready(() => {
  renderPagination(1);
  fetchTitles(1);
});

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
    url: "http://192.168.160.58/netflix/api/Titles",
    type: "get",
    data: {
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
        <img class="card-img-top" id="${Name}" src="" alt="Image Not Available">
        <div class="card-body">
          <h5 class="card-title">${Name}</h5>
          <p class="card-text">${Description}</p>
          <a href="#" class="btn btn-dark"">Watch Now</a>
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
    },
    error: (err) => {
      console.log(err);
    },
  });
  /*$(".card-img-top").attr("src") =
  $.ajax({
    type: "get",
    url:
      "https://api.themoviedb.org/3/search/movie?api_key=a77315529945efa26b94400d99db398b&language=en-US&query=" +
      encodeURIComponent(Name) +
      "&page=1&include_adult=true",
    dataType: "json",
    success: (data) => {
      console.log(data);
      if (data.results.length > 0) {
        image_path =
          "https://image.tmdb.org/t/p/original/" + data.results[0].poster_path;
      } else {
        console.log("NÃO POSSUI IMAGEM!");
      }
    },
  });*/
}

function renderPagination(paginationNumber) {
  $("#loading").show();
  paginaAtual = paginationNumber;

  $.ajax({
    url: "http://192.168.160.58/netflix/api/Titles",
    type: "get",
    data: {
      page: paginationNumber,
      pagesize: 51,
    },

    success: (data) => {
      totalPages = data.TotalPages;
      let paginationHTML = ``;

      paginationHTML = `<div class="pagination" id="paginacao">
                        <a onclick='previousPage()'>&laquo;</a>`;

      //PAGINAÇÃO PARA AS 5 PRIMEIRAS PÁGINAS
      for (var i = 1; i <= 5; i++) {
        const pageHTML = `
          <a class='pages' id='pagination${i}' onclick='renderPagination(${i})'>${i}</a>        
        `;
        paginationHTML += pageHTML;
      }
      paginationHTML += `
      <a class='pages''>...</a>        
    `;

      if (paginationNumber >= 5 && paginationNumber < 115) {
        for (var i = paginationNumber; i <= paginationNumber + 5; i++) {
          const pageHTML = `
            <a class='pages' id='pagination${i}' onclick='renderPagination(${i})'>${i}</a>        
          `;
          paginationHTML += pageHTML;
        }
      }

      paginationHTML += `
      <a class='pages''>...</a>        
    `;

      //PAGINAÇÃO PARA AS 5 ÚLTIMAS PÁGINAS
      for (var i = totalPages - 5; i <= totalPages; i++) {
        const pageHTML = `
          <a class='pages' id='pagination${i}' onclick='renderPagination(${i})'>${i}</a>        
        `;
        paginationHTML += pageHTML;
      }
      paginationHTML += `<a onclick='nextPage()'>&raquo;</a>
                        </div>`;

      $("#paginacao").html(paginationHTML);

      fetchTitles(paginationNumber);
      window.scrollTo(0, 0);
    },

    error: (err) => {},
  });
}
