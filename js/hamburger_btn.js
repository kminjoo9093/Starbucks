// ======== RESPONSIVE JS : MENU BUTTON CLICK ========
$('.mob-menu-btn').click(function(){
    $('main, .mob-menu-bcg, .mob-menu-wrap').addClass('active');
  })
  $('.mob-close-btn').click(function(){
    $('main, .mob-menu-bcg, .mob-menu-wrap').removeClass('active');
  })

// ======== RESPONSIVE JS : MENU ACCORDION ========
$('.mob-menu-item').click(function(){
    $(this).next('ul').stop().slideToggle()
})