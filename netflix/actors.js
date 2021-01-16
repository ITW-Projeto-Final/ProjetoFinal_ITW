//VARIAVEIS GLOBAIS
paginaAtual = 1;

$(document).ready(function () {
  renderPagination(1);
});

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

function renderPagination(paginationNumber) {
  paginaAtual = paginationNumber;

  $.ajax({
    url: "http://192.168.160.58/netflix/api/Actors",
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

      fetchActors(paginationNumber);
      window.scrollTo(0, 0);
    },

    error: (err) => {},
  });
}

function fetchActors(pageNumber) {
  $.ajax({
    url: "http://192.168.160.58/netflix/api/Actors",
    type: "get",
    data: {
      page: pageNumber,
      pagesize: 51,
    },

    success: (data) => {
      actorsArray = data.Actors;
      let actorsPageHTML = ``;

      actorsPageHTML = `<div class="actorCardsDiv">
      `;
      actorsArray.forEach((actor) => {
        const { Id, Name, Titles } = actor;

        const actorHTML = `
        <div class="card actorCard" style="; background-color:black">
        <img class="card-img-top" id="${Name}" src="" alt="Image Not Available">
        <div class="card-body">
          <h5 class="card-title">${Name}</h5>
          <p class="card-text">Appears in ${Titles} titles</p>
          <a href="#" class="btn btn-dark"">See more</a>
        </div>
      </div>
          `;
        actorsPageHTML += actorHTML;
      });

      actorsPageHTML += "</div>";

      $("#actorsDiv").html(actorsPageHTML);
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
        "https://api.themoviedb.org/3/search/person?api_key=a77315529945efa26b94400d99db398b&language=en-US&query=" +
        encodeURIComponent(obj.id) +
        "&page=1&include_adult=false",
      dataType: "json",
      success: (data) => {
        if (data.results.length > 0) {
          if (data.results[0].profile_path != null) {
            image_path =
              "https://image.tmdb.org/t/p/original/" +
              data.results[0].profile_path;
            $(this).attr("src", image_path);
          } else {
            $(this).attr("src", "../images/profile_ntFound.jpg");
          }
        } else {
          $(this).attr("src", "../images/profile_ntFound.jpg");
        }
      },
    });
  });
}
