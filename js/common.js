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

// ======== RESPONSIVE jQuery : FOOTER ACCORDION ========
const screenWidth = $(window).width();
if (screenWidth < 780) {
  $(".footer-nav-col p").click(function () {
    $(this).next("ul").stop().slideToggle();
    $(this).toggleClass("active");
  });
}

// ======== RESPONSIVE jQuery : FOOTER AWARDS bxslider ========
// const footerSlider = $("footer .bxslider").bxSlider({
//   auto: true,
//   autoControls: true,
//   stopAutoOnClick: true,
//   pager: false,
//   controls: false,
//   slideWidth: 200,
//   minSlides: 1,
//   maxSlides: 3
// });
// $(window).resize(function () {
//   let screenWidth = $(window).width();
//   if (screenWidth > 640 && screenWidth < 1120) {
//     footerSlider.onSliderLoad({
//       slideWidth: 200,
//       minSlides: 3,
//       maxSlides: 3,
//       moveSlides: 3,
//       pager: false,
//       controls: false,
//     });
//   } else if (screenWidth < 640 && screenWidth > 0) {
//     footerSlider.onSliderLoad({
//       slideWidth: 300,
//       minSlides: 1,
//       maxSlides: 1,
//       moveSlides: 1,
//       pager: false,
//       controls: false,
//     });
//   }
// });

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
        pager: false,
        controls: false,
      });
    } else if (screenWidth < 640) {
      $(this).bxSlider({
        slideWidth: 400,
        minSlides: 1,
        maxSlides: 1,
        moveSlides: 1,
        pager: false,
        controls: false,
      });
    }
  },
});

// ======= line-notice section : notice headline slideUp =======
let linkContainer = document.querySelector(".notice-contents-ani");
let links = document.querySelectorAll(".notice-contents-ani a");
const linksArr = Array.from(links);
const countLinks = links.length;
const linkHeight = linkContainer.clientHeight / links.length;
const lastLinkPos = linkHeight * (links.length - 1); //마지막 요소의 Y위치

function slideUp() {
  // links를 배열로 변환하여 업데이트합니다.
  const linksArray = Array.from(
    document.querySelectorAll(".notice-contents-ani a")
  );

  linksArray.forEach((link, index) => {
    // 첫 번째 요소가 아닌 경우
    if (index > 0) {
      // 첫 번째 요소가 아닌 경우, 요소를 위로 이동시킵니다.
      link.style.transform = `translateY(-${linkHeight}px)`;
      link.style.transition = `transform 0.3s ease-in`;
      setTimeout(() => {
        link.style.transform = "translateY(0px)"; //올라온 링크들의 위치를 0으로 잡아줌
        linkContainer.appendChild(link);
      }, 500);
    }
  });

  // 링크 배열이 업데이트되었으므로, 다음 애니메이션 준비
  setTimeout(() => {
    // 첫 번째 링크가 맨 아래로 이동한 후, 애니메이션 초기화
    const firstLink = linksArray.shift(); // 첫 번째 요소를 제거
    linkContainer.appendChild(firstLink); // 링크 컨테이너에 다시 추가
    linksArray.push(firstLink); // 링크 배열에 다시 추가
    // 모든 링크의 위치를 초기화
    linksArray.forEach((link) => {
      link.style.transform = "translateY(0)";
    });
  }, 500); // 800ms: 애니메이션 시간 + 지연 시간
}

// slideUp();
setInterval(slideUp, 4000);

// ======= login page : alert 경고 =======
// form으로 작성한 코드라 form에서 유효성을 판단함으로 아래 코드 의미없음
const loginForm = document.querySelector(".login-form");
const inputId = loginForm.querySelector("#input-id");
const inputPwd = loginForm.querySelector("#input-pwd");
const btnLogin = loginForm.querySelector(".login-btn");

loginForm.addEventListener("submit", (event) => {
  event.preventDefault();
  if (inputId.value.length == 0) {
    alert("아이디를 입력해 주세요.");
  }
});
