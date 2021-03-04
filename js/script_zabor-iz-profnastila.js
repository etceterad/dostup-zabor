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
    $('ul.main-catalog-tabs__ul').on('click', 'li:not(.active-tab)', function(e) {
        e.preventDefault();
      $(this)
        .addClass('active-tab-item').siblings().removeClass('active-tab-item')
        .closest('.main-catalog').find('.main-catalog__products').removeClass('active-tab').eq($(this).index()).addClass('active-tab');
    });
    $('ul.main-block-tabs__ul').on('click', 'li:not(.active-tab)', function(e) {
        e.preventDefault();
      $(this)
        .addClass('active-tab-price').siblings().removeClass('active-tab-price')
        .closest('.main-price__block-tabs').find('.main-price__block-content').removeClass('active-tab-price').eq($(this).index()).addClass('active-tab-price');
    });
    $('ul.main-parent-tabs__ul').on('click', 'li:not(.active-parent-tab)', function(e) {
        e.preventDefault();
      $(this)
        .addClass('active-parent-tab').siblings().removeClass('active-parent-tab')
        .closest('.main-colors__tabs').find('.main-colors__done-tabs').removeClass('active-palitre').eq($(this).index()).addClass('active-palitre');
    });
    $('ul#done').on('click', 'li:not(.active-color)', function(e) {
        e.preventDefault();
      $(this)
        .addClass('active-color').siblings().removeClass('active-color')
        .closest('.main-colors').find('.main-colors__img-block').removeClass('active-img')
        .closest('.main-colors').find('.main-colors__img-done').removeClass('active-img').eq($(this).index()).addClass('active-img');
    });
    $('ul#zakaz').on('click', 'li:not(.active-color)', function(e) {
        e.preventDefault();
      $(this)
        .addClass('active-color').siblings().removeClass('active-color')
        .closest('.main-colors').find('.main-colors__img-done').removeClass('active-img')
        .closest('.main-colors').find('.main-colors__img-block').removeClass('active-img').eq($(this).index()).addClass('active-img');
    });
    $('.popup-btn').magnificPopup();
    $('.header-info__hamburger').click( function (){
        $('.hidden-menu').addClass('show-menu');
    });
    $('.main-usefull__info-item').click(function () {
        $(this)
        .toggleClass('active-info').siblings().removeClass('active-info');
        $('.main-usefull__sub-info').addClass('active-info');
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