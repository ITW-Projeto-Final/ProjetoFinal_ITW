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
//fetchTitleImage("Inception");

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
        <img class="card-img-top" src="..." alt="Image Not Available">
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
}

function renderPagination(paginationNumber) {
  paginaAtual = paginationNumber;

  $.ajax({
    url: "http://192.168.160.58/netflix/api/Titles",
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

      fetchTitles(paginationNumber);
    },

    error: (err) => {},
  });
}
