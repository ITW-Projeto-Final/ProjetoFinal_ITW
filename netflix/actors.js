//VARIAVEIS GLOBAIS
paginaAtual = 1;

$(document).ready(function () {
  renderPagination(1);
  fetchActors(1);
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
      pagesize: 50,
    },

    success: (data) => {
      totalPages = data.TotalPages;
      let paginationHTML = ``;

      paginationHTML = `<div class="pagination" id="paginacao">
                        <a onclick='previousPage()'>&laquo;</a>`;

      for (var i = 1; i <= totalPages; i++) {
        const pageHTML = `
          <a class='pages' id='pagination${i}' onclick='renderPagination(${i})'>${i}</a>        
        `;

        paginationHTML += pageHTML;
      }
      paginationHTML += `<a onclick='nextPage()'>&raquo;</a>
                        </div>`;

      $("#paginacao").html(paginationHTML);

      fetchActors(paginationNumber);
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
      pagesize: 50,
    },

    success: (data) => {
      actorsArray = data.Actors;
      let actorsPageHTML = ``;

      actorsPageHTML = `<div>
      <div>
          <h3 class="center"> ${data.TotalActors} users found </h3>
      </div>
      `;
      actorsArray.forEach((actor) => {
        const { Id, Name, Titles } = actor;

        const actorHTML = `
            <div>
                <label> ${Name}, ${Id}, ${Titles}</label>
            </div>
        `;
        actorsPageHTML += actorHTML;
      });

      actorsPageHTML += "</div>";

      $("#actorsDiv").html(actorsPageHTML);
      var idPagination = "#pagination" + String(pageNumber);
      $(".pages.active").removeClass("active");
      $(idPagination).addClass("active");
    },
    error: (err) => {
      console.log(err);
    },
  });
}
