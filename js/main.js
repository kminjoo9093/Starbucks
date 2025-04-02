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
function rotateArrow(item){
    item.classList.toggle('active');
}

// ====== special-bean / favorite / store slide animation =======
setSlideAniObserver('.special-bean-wrap');
setSlideAniObserver('.favorite-wrap');
setSlideAniObserver('.store-wrap');

function setSlideAniObserver(observeTarget){
    const targetSection = document.querySelector(observeTarget);
    const observer = new IntersectionObserver(function(entries){
        console.log(entries)
        entries.forEach((entry)=>{
            if(entry.isIntersecting){
                targetSection.classList.add('active');
            } else {
                targetSection.classList.remove('active');
            }
        })
    });
    observer.observe(targetSection);
}