var $window;
var prevWindowWidth = 0;
var windowWidth;

// First we get the viewport height and we multiple it by 1% to get a value for a vh unit
let vh = window.innerHeight * 0.01;
// Then we set the value in the --vh custom property to the root of the document
document.documentElement.style.setProperty('--vh', `${vh}px`);
//in selector we set style, for example
//height: calc(var(--vh, 1vh) * 100); for 100vh

function initVars() {
  $window = $(window);
  windowWidth = $window.width();
  windowHeight = $window.height();

  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
}

$(function () {
  initVars();

  if ($('.functionHeight').length) {
    var windowH = $(window).height();
    console.log('windowH ' + windowH);

    var headerH = $('.site__header').outerHeight();
    console.log('headerH ' + headerH);

    var centerH = $('.site__center').outerHeight();
    console.log('centerH ' + centerH);

    var footerH = $('.site__footer').outerHeight();
    console.log('footerH ' + footerH);

    var siteH = headerH + centerH + footerH;
    console.log('siteH ' + siteH);

    if (siteH < windowH) {
      var difH = windowH - siteH;
      var newCenterH = centerH + difH;
      $('.page__area').css('height', newCenterH);
      console.log(newCenterH);
    }
  }

  barnFirstScreen();

  $('a[data-fancybox]').fancybox({
    closeBtn: false,
    backFocus: false,
    arrows: true,
    keyboard: true,
    nextClick: true,
    infobar: true,
    protect: true,
    nextEffect: 'elastic',
    prevEffect: 'elastic',
    padding: 0,
    loop: true,
    animationEffect: 'zoom-in-out',
    transitionEffect: 'slide',
    touch: {
      vertical: true, // Allow to drag content vertically
      momentum: true, // Continue movement after releasing mouse/touch when panning
    },
  });

  const swiperOptions = {
    paginationClickable: true,
    autoplay: 7500,
    spaceBetween: 0,
    loop: true,
    effect: 'slide',
    loop: true,
    // pagination: {
    //   el: '.swiper-pagination1',
    // },
    pagination: {
      el: '.swiper-pagination1',
      type: 'bullets',
      dynamicBullets: true,
      clickable: true,
    },
    navigation: {
      nextEl: '.swiper-button-next1',
      prevEl: '.swiper-button-prev1',
    },
    on: {
      activeIndexChange: function () {
        console.log('activeIndexChange');

        $('.swiper-slide')
          .children('.swiper__cadr')
          .removeClass('animationBaretsky1')
          .fadeOut(500);

        setTimeout(function () {
          $('.swiper-slide-active')
            .children('.swiper__cadr')
            .fadeIn(500)
            .addClass('animated')
            .addClass('animationBaretsky1');
        }, 500);
      },
    },
  };

  const swiper1 = new Swiper('.swiper-container1', swiperOptions);

  swiper1.on('beforeSlideChangeStart', function () {
    console.log('beforeSlideChangeStart');
  });

  // if ($(".swiper-container1").length) {
  // 	const swiper1 = new Swiper(".swiper-container1", swiperOptions);
  // }

  if ($('.animCount__outer').length) {
    // Однократная анимация цифр при прокрутке страницы
    var showAnimateCounter = true;

    function numAnimate() {
      $('.animCount__numberOn').each(function () {
        $(this)
          .prop('Counter', 0)
          .animate(
            {
              Counter: $(this).text(),
            },
            {
              duration: 2000,
              easing: 'swing',
              step: function (now) {
                $(this).text(Math.ceil(now));
              },
            }
          );
      });
      showAnimateCounter = false;
    }

    $(window).on('scroll', function () {
      if (!showAnimateCounter) return false;
      var scrTop = $(window).scrollTop();
      if (scrTop > $('.animCount').offset().top - $(window).height()) {
        numAnimate();
      }
    });
  }

  var commentsOptions = {};
  if ($('.commentsCaroucel-container .commentsCaroucel-slide').length) {
    commentsOptions = {
      slidesPerView: 4,
      loop: false,
      spaceBetween: 0,
      // centeredSlides: true,
      speed: 600,
      autoplay: {
        delay: 15000,
        disableOnInteraction: true,
      },
      navigation: {
        nextEl: '.commentsCaroucel__right',
        prevEl: '.commentsCaroucel__left',
      },
      keyboard: true,
      watchOverflow: true,
      pagination: {
        el: '.commentsCaroucel__pagination',
        type: 'bullets',
        dynamicBullets: true,
        clickable: true,
      },
      breakpoints: {
        0: {
          slidesPerView: 1,
          spaceBetween: 0,
        },
        360: {
          slidesPerView: 1.5,
          spaceBetween: 0,
        },
        480: {
          slidesPerView: 2,
          spaceBetween: 0,
        },
        600: {
          slidesPerView: 3,
          spaceBetween: 0,
        },
        920: {
          slidesPerView: 4,
          spaceBetween: 0,
        },
      },
    };
  }
  var swiper = new Swiper('.commentsCaroucel-container', commentsOptions);

  $('.commentsCard__more').on('click', function () {
    var Parent = $(this).closest('.commentsCard__textArea');
    var AllText = Parent.find('.commentsCard__textAll');
    var ShortText = Parent.find('.commentsCard__text');
    if ($(this).hasClass('open')) {
      $(this).removeClass('open').text('Читать весь отзыв');
      AllText.slideUp();
      ShortText.slideDown();
    } else {
      $(this).addClass('open').text('Свернуть');
      AllText.slideDown();
      ShortText.slideUp();
    }
  });

  $('.menuButton').on('click', function () {
    $(this).toggleClass('open');
    $('.topMenu').slideToggle();
  });

  $('.phoneZ').mask('+7 (999) 999-9999');
  $('.phone1').mask('+7 (999) 999-9999');
  $('.phone2').mask('+7 (999) 999-9999');
  $('.phone3').mask('+7 (999) 999-9999');

  $('table').wrap('<div class="table_outer"></div>');

  $('.toTop').hide();
  $(window).on('scroll', function () {
    if ($(this).scrollTop() > 0) {
      $('.toTop').fadeIn();
    } else {
      $('.toTop').fadeOut();
    }
  });
  $('.toTop').click(function () {
    $('body,html').animate(
      {
        scrollTop: 0,
      },
      400
    );
    return false;
  });

  $('.form1').on('click', '.submit1', function (e) {
    e.preventDefault();
    var name = $('.name1').val();
    var phone = $('.phone1').val();
    var email = $('.email1').val();
    var workemail = $('.work_email1').val();
    var message = $('.message1').val();
    var r = /^[\w\.\d-_]+@[\w\.\d-_]+\.\w{2,4}$/i;
    if (name == '') {
      swal({
        title: 'Поле Имя пустое',
        text: 'Заполните поле имя',
        type: 'error',
        confirmButtonText: 'ок',
      });
      $('.name1').addClass('error');
      setTimeout(function () {
        $('.name1').removeClass('error');
      }, 3000);
    } else if (phone == '') {
      swal({
        title: 'Поле Телефон пустое',
        text: 'Заполните поле телефон',
        type: 'error',
        confirmButtonText: 'ок',
      });
      $('.phone1').addClass('error');
      setTimeout(function () {
        $('.phone1').removeClass('error');
      }, 3000);
    } else if (email == '') {
      swal({
        title: 'Ошибка Email',
        text: 'Заполните поле Email',
        type: 'error',
        confirmButtonText: 'ок',
      });
      $('.email1').addClass('error');
      setTimeout(function () {
        $('.email1').removeClass('error');
      }, 3000);
    } else if (!r.test(email)) {
      swal({
        title: 'Ошибка',
        text: 'Корректно заполните поле e-mail',
        type: 'error',
        confirmButtonText: 'ок',
      });
      $('.email1').addClass('error');
      setTimeout(function () {
        $('.email1').removeClass('error');
      }, 3000);
    } else if (message == '') {
      swal({
        title: 'Пустое сообщение',
        text: 'Заполните текст сообщения',
        type: 'error',
        confirmButtonText: 'ок',
      });
      $('.message1').addClass('error');
      setTimeout(function () {
        $('.message1').removeClass('error');
      }, 3000);
    } else if (workemail != '') {
      swal({
        title: 'Ах ты жулик',
        text: 'Уберите робота от компьютера',
        type: 'error',
        confirmButtonText: 'ок',
      });
    } else {
      $.post(
        'mail1.php',
        {
          name: name,
          phone: phone,
          email: email,
          message: message,
        },
        function () {
          swal({
            title: 'Спасибо',
            text: 'Ваше сообщение отправлено',
            type: 'success',
            confirmButtonText: 'ок',
          });
          $('.name1').val('').removeClass('error');
          $('.phone1').val('').removeClass('error');
          $('.email1').val('').removeClass('error');
          $('.message1').val('').removeClass('error');
        }
      );
    }
  });

  $('.js_btnZ').on('click', function (e) {
    e.preventDefault();
    e.stopPropagation();
    var self = $(this);
    if (self.hasClass('js_active')) {
      self.removeClass('js_active');
      $('.js_containerZ')
        .addClass('bounceOutUp')
        .removeClass('bounceInDown')
        .fadeOut(600);
      $('.overlay').fadeOut(200);
    } else {
      self.addClass('js_active');
      $('.js_containerZ')
        .removeClass('bounceOutUp')
        .addClass('bounceInDown')
        .fadeIn(200);
      $('.overlay').fadeIn(200);
    }
  });
  $('.overlay').on('click', function (e) {
    e.preventDefault();
    $('.js_containerZ')
      .addClass('bounceOutUp')
      .removeClass('bounceInDown')
      .fadeOut(600);
    $('.js_btnZ').removeClass('js_active');

    $('.overlay').fadeOut(600);
  });
  $('.formClose').on('click', function (e) {
    e.preventDefault();
    $('.js_containerZ')
      .addClass('bounceOutUp')
      .removeClass('bounceInDown')
      .fadeOut(600);
    $('.js_btnZ').removeClass('js_active');
    $('.overlay').fadeOut(600);
  });

  $('.formZ').on('click', '.submitZ', function (e) {
    e.preventDefault();
    var name = $('.nameZ').val();
    var phone = $('.phoneZ').val();
    var workemail = $('.work_emailZ').val();
    if (name == '') {
      swal({
        title: 'Поле Имя пустое',
        text: 'Заполните поле имя',
        type: 'error',
        confirmButtonText: 'ок',
      });
      $('.nameZ').addClass('nameZ');
      setTimeout(function () {
        $('.nameZ').removeClass('error');
      }, 3000);
    } else if (phone == '') {
      swal({
        title: 'Поле Телефон пустое',
        text: 'Заполните поле телефон',
        type: 'error',
        confirmButtonText: 'ок',
      });
      $('.phoneZ').addClass('phoneZ');
      setTimeout(function () {
        $('.phoneZ').removeClass('error');
      }, 3000);
    } else if (workemail != '') {
      swal({
        title: 'Ах ты жулик',
        text: 'Уберите робота от компьютера',
        type: 'error',
        confirmButtonText: 'ок',
      });
    } else {
      $.post(
        'mailz.php',
        {
          name: name,
          phone: phone,
        },
        function () {
          swal({
            title: 'Спасибо',
            text: 'Ваше сообщение отправлено',
            type: 'success',
            confirmButtonText: 'ок',
          });
          $('.nameZ').val('').removeClass('error');
          $('.phoneZ').val('').removeClass('error');
          $('.js_btn1').removeClass('js-Active');
          $('.js_containerZ')
            .addClass('bounceOutUp')
            .removeClass('bounceInDown')
            .fadeOut(600);
          $('.overlay').fadeOut(200);
        }
      );
    }
  });

  $('.directPrice').on('click', function (e) {
    e.preventDefault();
    e.stopPropagation();
    var self = $(this);
    var selfParent = $(this).parent();
    var formDirectTitle = selfParent.children('.project__infoTitle').text();
    console.log(formDirectTitle);
    $('.form2__title span').text(formDirectTitle);
    $('.form2 textarea').text(formDirectTitle);

    if (self.hasClass('js_active')) {
      self.removeClass('js_active');
      $('.js_container2')
        .addClass('bounceOutUp')
        .removeClass('bounceInDown')
        .fadeOut(600);
      $('.overlay').fadeOut(200);
    } else {
      self.addClass('js_active');
      $('.js_container2')
        .removeClass('bounceOutUp')
        .addClass('bounceInDown')
        .fadeIn(200);
      $('.overlay').fadeIn(200);
    }
  });
  $('.overlay').on('click', function (e) {
    e.preventDefault();
    $('.js_container2')
      .addClass('bounceOutUp')
      .removeClass('bounceInDown')
      .fadeOut(600);
    $('.directPrice').removeClass('js_active');

    $('.overlay').fadeOut(600);
  });
  $('.js_close').on('click', function (e) {
    e.preventDefault();
    $('.js_container2')
      .addClass('bounceOutUp')
      .removeClass('bounceInDown')
      .fadeOut(600);
    $('.directPrice').removeClass('js_active');

    $('.overlay').fadeOut(600);
  });
  $('.form2').on('click', '.submit2', function (e) {
    e.preventDefault();
    var name = $('.name2').val();
    var phone = $('.phone2').val();
    var subj = $('.form2__title span').text();
    var workemail = $('.work_email2').val();
    if (name == '') {
      swal({
        title: 'Поле Имя пустое',
        text: 'Заполните поле имя',
        type: 'error',
        confirmButtonText: 'ок',
      });
      $('.name2').addClass('error');
      setTimeout(function () {
        $('.name2').removeClass('error');
      }, 3000);
    } else if (phone == '') {
      swal({
        title: 'Поле Телефон пустое',
        text: 'Заполните поле телефон',
        type: 'error',
        confirmButtonText: 'ок',
      });
      $('.phone2').addClass('error');
      setTimeout(function () {
        $('.phone2').removeClass('error');
      }, 3000);
    } else if (workemail != '') {
      swal({
        title: 'Ах ты жулик',
        text: 'Уберите робота от компьютера',
        type: 'error',
        confirmButtonText: 'ок',
      });
    } else {
      $.post(
        'mail2.php',
        {
          name: name,
          phone: phone,
          subj: subj,
        },
        function () {
          swal({
            title: 'Спасибо',
            text: 'Ваше сообщение отправлено',
            type: 'success',
            confirmButtonText: 'ок',
          });
          $('.name2').val('').removeClass('error');
          $('.phone2').val('').removeClass('error');
          $('.directPrice').removeClass('js-Active');
          $('.js_container2')
            .addClass('bounceOutUp')
            .removeClass('bounceInDown')
            .fadeOut(600);
          $('.overlay').fadeOut(200);
        }
      );
    }
  });

  $('.directPriceBH').on('click', function (e) {
    e.preventDefault();
    e.stopPropagation();
    var self = $(this);
    var selfParent = $(this).parent();
    var formDirectTitle = selfParent.children('.offer__title').text();
    $('.form3__title span').text(formDirectTitle);
    $('.form3 textarea').text(formDirectTitle);

    if (self.hasClass('js_active')) {
      self.removeClass('js_active');
      $('.js_container3')
        .addClass('bounceOutUp')
        .removeClass('bounceInDown')
        .fadeOut(600);
      $('.overlay').fadeOut(200);
    } else {
      self.addClass('js_active');
      $('.js_container3')
        .removeClass('bounceOutUp')
        .addClass('bounceInDown')
        .fadeIn(200);
      $('.overlay').fadeIn(200);
    }
  });
  $('.overlay').on('click', function (e) {
    e.preventDefault();
    $('.js_container3')
      .addClass('bounceOutUp')
      .removeClass('bounceInDown')
      .fadeOut(600);
    $('.directPrice').removeClass('js_active');

    $('.overlay').fadeOut(600);
  });
  $('.js_close').on('click', function (e) {
    e.preventDefault();
    $('.js_container3')
      .addClass('bounceOutUp')
      .removeClass('bounceInDown')
      .fadeOut(600);
    $('.directPrice').removeClass('js_active');

    $('.overlay').fadeOut(600);
  });
  $('.form3').on('click', '.submit3', function (e) {
    e.preventDefault();
    var name = $('.name3').val();
    var phone = $('.phone3').val();
    var subj = $('.form3__title span').text();
    var message = $('.message3').text();
    var workemail = $('.work_email3').val();
    if (name == '') {
      swal({
        title: 'Поле Имя пустое',
        text: 'Заполните поле имя',
        type: 'error',
        confirmButtonText: 'ок',
      });
      $('.name3').addClass('error');
      setTimeout(function () {
        $('.name3').removeClass('error');
      }, 3000);
    } else if (phone == '') {
      swal({
        title: 'Поле Телефон пустое',
        text: 'Заполните поле телефон',
        type: 'error',
        confirmButtonText: 'ок',
      });
      $('.phone3').addClass('error');
      setTimeout(function () {
        $('.phone3').removeClass('error');
      }, 3000);
    } else if (workemail != '') {
      swal({
        title: 'Ах ты жулик',
        text: 'Уберите робота от компьютера',
        type: 'error',
        confirmButtonText: 'ок',
      });
    } else {
      $.post(
        'mail2.php',
        {
          name: name,
          phone: phone,
          subj: 'Барн-хаус - ' + subj,
        },
        function () {
          swal({
            title: 'Спасибо',
            text: 'Ваше сообщение отправлено',
            type: 'success',
            confirmButtonText: 'ок',
          });
          $('.name3').val('').removeClass('error');
          $('.phone3').val('').removeClass('error');
          $('.directPrice').removeClass('js-Active');
          $('.js_container3')
            .addClass('bounceOutUp')
            .removeClass('bounceInDown')
            .fadeOut(600);
          $('.overlay').fadeOut(200);
        }
      );
    }
  });
});

//################ likeBlock

var isMobile = {
  Android: function () {
    return navigator.userAgent.match(/Android/i);
  },
  BlackBerry: function () {
    return navigator.userAgent.match(/BlackBerry/i);
  },
  iOS: function () {
    return navigator.userAgent.match(/iPhone|iPad|iPod/i);
  },
  Opera: function () {
    return navigator.userAgent.match(/Opera Mini/i);
  },
  Windows: function () {
    return navigator.userAgent.match(/IEMobile/i);
  },
  any: function () {
    return (
      isMobile.Android() ||
      isMobile.BlackBerry() ||
      isMobile.iOS() ||
      isMobile.Opera() ||
      isMobile.Windows()
    );
  },
};

if ($('.map__area').length) {
  ymaps.ready(init1);

  function init1() {
    var myMap = new ymaps.Map('map', {
      center: [51.53278464377675, 46.00511899140164],
      zoom: 17,
      controls: ['zoomControl'],
    });

    myMap.behaviors.disable('scrollZoom');
    if (isMobile.any()) {
      myMap.behaviors.disable('drag');
    }

    var myGeoObjects = [];

    myGeoObjects[0] = new ymaps.Placemark(
      [51.53278464377675, 46.00511899140164],
      {
        // Зададим содержимое заголовка балуна.
        balloonContentHeader:
          '<div class="baloon__top">Каркас 64</div>' +
          '<div class="baloon__description">каркасное строительство</div>',
        // Зададим содержимое основной части балуна.
        balloonContentBody:
          '<div class="baloon__content"><img src="assets/img/logo1c.png" height="83" width="150">' +
          '<a href="tel:778801">77-88-01</a>',
        // Зададим содержимое нижней части балуна.
        balloonContentFooter:
          '<div class="baloon__footer">Саратов, улица Слонова, 1</div>',
        clusterCaption: 'Каркас64',
        // Зададим содержимое всплывающей подсказки.
        hintContent: '<div class="baloon__top">Мы в Саратове</div>',
      },
      {
        iconLayout: 'default#image',
        iconImageHref: 'assets/img/marker.svg',
        iconImageSize: [31, 50],
        iconImageOffset: [-15, -50],
      }
    );
    var clusterIcons = [
      {
        href: '/images/pointer.png',
        size: [31, 40],
        offset: [0, 0],
      },
    ];

    var clusterer = new ymaps.Clusterer({
      clusterDisableClickZoom: false,
      clusterOpenBalloonOnClick: false,
      clusterBalloonContentLayout: 'cluster#balloonCarousel',
      clusterBalloonPanelMaxMapArea: 0,
      clusterBalloonContentLayoutWidth: 300,
      clusterBalloonContentLayoutHeight: 200,
      clusterBalloonPagerSize: 5,
      clusterBalloonPagerType: 'marker',
    });

    clusterer.add(myGeoObjects);
    myMap.geoObjects.add(clusterer);
  }
}

if ($('.map__area').length) {
  ymaps.ready(init2);

  function init2() {
    var myMap = new ymaps.Map('map2', {
      center: [51.467929973539924, 46.101787816399735],
      zoom: 16,
      controls: ['zoomControl'],
    });

    myMap.behaviors.disable('scrollZoom');
    if (isMobile.any()) {
      myMap.behaviors.disable('drag');
    }

    var myGeoObjects = [];

    myGeoObjects[0] = new ymaps.Placemark(
      [51.467929973539924, 46.101787816399735],
      {
        // Зададим содержимое заголовка балуна.
        balloonContentHeader:
          '<div class="baloon__top">Каркас 64</div>' +
          '<div class="baloon__description">каркасное строительство</div>',
        // Зададим содержимое основной части балуна.
        balloonContentBody:
          '<div class="baloon__content"><img src="assets/img/logo1c.png" height="83" width="150">' +
          '<a href="tel:778801">77-88-01</a>',
        // Зададим содержимое нижней части балуна.
        balloonContentFooter:
          '<div class="baloon__footer">Энгельс, улица Мельничная, <br>ГСК Волжский. Строение 222</div>',
        clusterCaption: 'Каркас64',
        // Зададим содержимое всплывающей подсказки.
        hintContent: '<div class="baloon__top">Мы в Энгельсе</div>',
      },
      {
        iconLayout: 'default#image',
        iconImageHref: 'assets/img/marker.svg',
        iconImageSize: [31, 50],
        iconImageOffset: [-15, -50],
      }
    );
    var clusterIcons = [
      {
        href: '/images/pointer.png',
        size: [31, 40],
        offset: [0, 0],
      },
    ];

    var clusterer = new ymaps.Clusterer({
      clusterDisableClickZoom: false,
      clusterOpenBalloonOnClick: false,
      clusterBalloonContentLayout: 'cluster#balloonCarousel',
      clusterBalloonPanelMaxMapArea: 0,
      clusterBalloonContentLayoutWidth: 300,
      clusterBalloonContentLayoutHeight: 200,
      clusterBalloonPagerSize: 5,
      clusterBalloonPagerType: 'marker',
    });

    clusterer.add(myGeoObjects);
    myMap.geoObjects.add(clusterer);
  }
}
