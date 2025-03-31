// ===== promotion-area : 프로모션 배너 bxslider =====
$('.promotion-slider').bxSlider({
    auto: true,
    autoControls: true,
    stopAutoOnClick: true,
    autoControlsCombine: true,
    pager: true,
    slideWidth: 800,
    minSlides: 1,
    maxSlides: 1,
    moveSlides: 1,
    slideMargin: 10,
    onSliderLoad: function(){
        const allSlides = document.querySelectorAll('.promotion-slider .slide');
        allSlides[1].classList.add('active');
    },
    onSlideAfter: function($slideElement, oldIndex, newIndex) {
        $('.promotion-slider .slide').removeClass('active');
        $slideElement.addClass('active');
    }
})

// ===== promotion-area : 프로모션 더보기 =====
const promotionArea = $('.promotion-area');
$('.notice-right-inner').click(function(){
    promotionArea.toggleClass('active')
    $('.view-promotion-btn').toggleClass('active')
})

// 열기 닫기 버튼 화살표 변경
function rotateArrow(arrowImg){
    if(arrowImg.style.transform === 'rotate(180deg) translateY(-8px)'){
      arrowImg.style.transform = 'rotate(0) translateY(8px)'
    }else{
    arrowImg.style.transform = 'rotate(180deg) translateY(-8px)'
    };
  }

//===== special bean section : slide-animation ======
//slide in/out 따로 animation 만드는 방법
window.addEventListener('scroll', function(){
    const beanImg = document.querySelector('.bean-img-box');
    const beanText = this.document.querySelector('.bean-text-wrap');
    let value = window.scrollY;
    if(value > 500){
        beanImg.style.animation = 'bean-img-ani 1s ease-out forwards';
        beanText.style.animation = 'bean-text-ani 1s ease-out forwards';
    }
    if(value < 200){
        beanImg.style.animation = 'bean-img-disappear 1s ease-in';
        beanText.style.animation = 'bean-text-disappear 1s ease-in';
    }
})

//===== pick favorite section : text-slide-animation ======
const favSection = document.querySelector('.favorite-wrap'); //관찰할 섹션
const favFirstCont = document.querySelector('.fav-text-L img:first-child');
const favSecCont = document.querySelector('.fav-text-L img:nth-child(2)');

const favObserver = new IntersectionObserver(function(entries){
    entries.forEach((entry)=>{
        if(entry.isIntersecting){
            favFirstCont.style.right =  `0`;
            favFirstCont.style.transition = `3s`;
            favSecCont.style.right = `0`;
            favSecCont.style.transition = `2s`;
        } else {
            favFirstCont.style.right = `120%`;
            favSecCont.style.right = `100%`;
        }
    })
});
favObserver.observe(favSection);

//===== pick favorite section : text fade in/out (responsive) ======
const mobFavTextBox = document.querySelector('.mob-fav-text');

const mobFavObserver = new IntersectionObserver(function(entries){
    entries.forEach((entry)=>{
        if(entry.isIntersecting){
            const mobFavTextEl = mobFavTextBox.querySelectorAll('*');
            mobFavTextEl.forEach((el, index)=>{
                el.style.animation = `mob-fav-text 1s ${index - 0.7}s ease-in-out forwards`;
            })
        } else {
            const mobFavTextEl = mobFavTextBox.querySelectorAll('*');
            mobFavTextEl.forEach((el)=>{
                el.style.animation = `mob-fav-fadeOut 1s forwards`;
            })
        }
    })
})

mobFavObserver.observe(mobFavTextBox);

//===== store section : slide-animation ======
// 슬라이드 줘야하는 요소들을 묶어서 배열로 만들고, forEach로 슬라이드아웃되는 클래스를 만든 방법 - a에는 안먹힘
// 배열 forEach로 애니메이션주는걸로 변경
const storeSection = document.querySelector('.store-wrap'); //관찰 섹션 선택
const storeContents = document.querySelectorAll('.store-text-box img, .store-text-box a');
const mobStoreText01 = document.querySelector('.mob-store-text-1');
const mobStoreText02 = document.querySelector('.mob-store-text-2');

const storeObserver = new IntersectionObserver(function(entries){
    entries.forEach((e)=>{
        if(e.isIntersecting){
            storeContents.forEach((content)=>{
                content.style.animation = 'store-slide 1.5s ease-in-out forwards'
            })
            mobStoreText01.style.animation = 'mob-store-text01 1s ease-in-out forwards'
            mobStoreText02.style.animation = 'mob-store-text02 1s 1s ease-in-out forwards'
        } else {
            storeContents.forEach((content)=>{
                content.style.animation = 'store-slide-disappear 1.5s ease-in-out forwards'
            })
            mobStoreText01.style.animation = 'mob-store-text01-disappear 1.5s ease-in-out forwards'
            mobStoreText02.style.animation = 'mob-store-text02-disappear 1.5s 1.5s ease-in-out forwards'
        }
    })
})

storeObserver.observe(storeSection); //관찰자 관찰대상 연결하며 관찰명령