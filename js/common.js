// ===== header : search button =====
const searchBtn = document.querySelector('.top_search-btn');
const searchInput = document.querySelector('.search-input');
const searchIcon = document.querySelector('.top_search-icon');

searchBtn.addEventListener('click', addSearchInput);
function addSearchInput(){
    searchBtn.classList.add('active');
}

// ===== header : slide menu =====
$(function(){
    let dataNav;
    let selectedMenu;
    $('.main-nav-link').mouseover(function(){
        dataNav = $(this).attr('data-nav'); 
        selectedMenu = $('#' + dataNav);
        selectedMenu.stop().slideDown(400);
    })
    $('.main-nav-link').mouseleave(function(){
        selectedMenu.stop().slideUp(400);
    })
})

// ======== RESPONSIVE jQuery : MENU BUTTON CLICK ========
$(".mob-menu-btn").click(function () {
  $("main, .mob-menu-bcg, .mob-menu-wrap").addClass("active");
});
$(".mob-close-btn").click(function () {
  $("main, .mob-menu-bcg, .mob-menu-wrap").removeClass("active");
});

// ======== RESPONSIVE jQuery : MENU ACCORDION ========
$(".mob-menu-item").click(function () {
  $(this).next("ul").stop().slideToggle();
});

// ======= line-notice section : notice headline slideUp =======
function slideUp() {
  const linkContainer = document.querySelector(".notice-contents-ani");
  if(!linkContainer) return;
  const linksArray = Array.from(linkContainer.querySelectorAll("a"));
  const countLinks = linksArray.length;
  const linkHeight = linkContainer.clientHeight / countLinks;

  linksArray.forEach((link, index) => {
    if (index > 0) {
      // 첫 번째 요소가 아닌 경우, 위로 이동
      link.style.transform = `translateY(-${linkHeight}px)`;
      link.style.transition = `transform 0.3s ease-in`;
    }
  });

  setTimeout(() => {
    // 첫 번째 링크가 맨 아래로 이동한 후, 애니메이션 초기화
    const firstLink = linksArray.shift(); // 첫 번째 요소를 제거
    linksArray.push(firstLink); // 링크 배열에 다시 추가

    linksArray.forEach((link) => {
      // 실제 dom에 변경된 링크 순서를 반영
      linkContainer.appendChild(link);
      // 모든 링크의 위치를 초기화
      link.style.transform = "translateY(0)";
    });
  }, 300);
}

setInterval(slideUp, 4000);

// ======== footer year =======
const year = document.querySelector('.year');
const currentYear = new Date().getFullYear();
year.textContent = currentYear;

// ======== RESPONSIVE jQuery : FOOTER ACCORDION ========
const screenWidth = $(window).width();
if (screenWidth < 780) {
  $(".footer-nav-col p").click(function () {
    $(this).next("ul").stop().slideToggle();
    $(this).toggleClass("active");
  });
}

// ======== RESPONSIVE jQuery : FOOTER AWARDS bxslider ========
$("footer .bxslider").bxSlider({
  auto: true,
  autoControls: true,
  stopAutoOnClick: true,
  responsive: true,
  pager: false,
  controls: false,
  slideWidth: 200,
  minSlides: 1,
  maxSlides: 3,
  onSliderLoad: function () {
    if (screenWidth < 1120 && screenWidth < 640) {
      $(this).bxSlider({
        slideWidth: 200,
        minSlides: 3,
        maxSlides: 3,
        moveSlides: 1,
      });
    } else if (screenWidth < 640) {
      $(this).bxSlider({
        slideWidth: 400,
        minSlides: 1,
        maxSlides: 1,
        moveSlides: 1,
      });
    }
  },
});