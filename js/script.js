$(function() {
    $(".owl-carousel").owlCarousel({
        loop:true,
        autoplay:true,
        autoplayTimeout:2500,
        autoplayHoverPause:true,
        center: true,
        dots: true,
        responsiveClass:true,
        responsive:{
        0:{
            items:2,
            nav:true
        },
        600:{
            items:3,
        },
        1000:{
            items:4,
            nav:true
        }
    }
    });
    $('ul.tabs__caption').on('click', 'li:not(.active)', function(e) {
        e.preventDefault();
      $(this)
        .addClass('active').siblings().removeClass('active')
        .closest('.main-works').find('div.main-works__slider').removeClass('active').eq($(this).index()).addClass('active');
    });
    $('ul.main-serv__tabs-btns').on('click', 'li:not(.active-tab)', function(e) {
        e.preventDefault();
      $(this)
        .addClass('active-tab').siblings().removeClass('active-tab')
        .closest('.main-serv').find('.main-serv__tabs-content').removeClass('active-tab').eq($(this).index()).addClass('active-tab');
    });
    $('.popup-btn').magnificPopup();
    $('.header-info__hamburger').click( function (){
        $('.hidden-menu').addClass('show-menu');
    });
    $('.hidden-menu__close').click(function () {
        $('.hidden-menu').removeClass('show-menu');
    });
    $('.main-tags__s-more').click( function() {
        $('.main-tags__more').removeClass('dnone');
        $('.main-tags__s-more').addClass('dnone');
    });
    $('.main-tags__less').click( function () {
        $('.main-tags__s-more').removeClass('dnone');
        $('.main-tags__more').addClass('dnone');
    });
    $("#sticker").sticky({
        topSpacing:0,
        zIndex: 999
    });
    $('.header-info__current-location').click( function() {
        $('.header-info__locations-list').toggleClass('active');
    });
    $('.locations-list__area').click( function() {
        $('.header-info__locations-list').removeClass('active');
    });
});