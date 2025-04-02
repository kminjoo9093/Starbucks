// Coffee Page : Banner bxSlider
$(function(){
    $('.sub-wrap .bxslider').bxSlider({
      mode: 'fade',
      captions: false,
      auto: true,
      autoControls: true,
      stopAutoOnClick: true,
      autoControlsCombine: true,
      pager: true,
      minSlides: 1,
      maxSlides: 1,
      moveSlides: 1,
    });
  });

// Menu Page : Banner view product button
$('.view-product-btn').click(function(){
  const currentImage = $('.view-product-btn img').attr('src')
  const viewImage = 'https://image.istarbucks.co.kr/common/img/menu/product_view_down.png';
  const closeImage = 'https://image.istarbucks.co.kr/common/img/menu/product_view_up.png'
  $('.view-product-btn img').attr('src', currentImage === viewImage?closeImage:viewImage)
  $('.menu-products-area').stop().slideToggle()
})

// Corporate Sales Page : Tab Menu & Tab Content Change
const productTabMenus = document.querySelectorAll('.product-tabMenu li');
productTabMenus.forEach((menu)=>{
  menu.addEventListener('click', ()=>{
    // menu style change
    productTabMenus.forEach((tab)=>{
      tab.classList.remove('active');
    })
    menu.classList.add('active');
    // content change
    const tabId = menu.getAttribute('data-tab');
    document.querySelectorAll('.product-tab-content .tab').forEach((tab)=>{
      tab.style.display = 'none';
    })
    document.getElementById(tabId).style.display = 'block';
  })
})

//cor-sales-page : side navigation accordion
$('.cor-sales-subNav > li span').click(function(){
  $(this).next().stop().slideToggle()
  $(this).parent().toggleClass('active')
})

// what's new page : 전체보기 클릭 -> 프로모션 보기 닫기 토글
function toggleVisibility(section){
  section.classList.toggle('active');
}