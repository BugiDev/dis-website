function initMap() {
    var uluru = {lat: 44.0051572, lng: 20.9024734};
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 18,
        center: uluru
    });
    var marker = new google.maps.Marker({
        position: uluru,
        map: map
    });
}

function calculateScroll() {
    var contentTop = [];
    var contentBottom = [];
    var winTop = $(window).scrollTop();
    var rangeTop = 200;
    var rangeBottom = 500;
    $('.navmenu').find('a').each(function() {
        contentTop.push($($(this).attr('href')).offset().top);
        contentBottom.push($($(this).attr('href')).offset().top + $($(this).attr('href')).height());
    });
    $.each(contentTop, function(i) {
        if (winTop > contentTop[i] - rangeTop && winTop < contentBottom[i] - rangeBottom) {
            $('.navmenu li')
                .removeClass('active')
                .eq(i).addClass('active');
        }
    })
}

function sdf_FTS(_number, _decimal, _separator) {
    var decimal = (typeof(_decimal) != 'undefined') ? _decimal : 2;
    var separator = (typeof(_separator) != 'undefined') ? _separator : '';
    var r = parseFloat(_number)
    var exp10 = Math.pow(10, decimal);
    r = Math.round(r * exp10) / exp10;
    rr = Number(r).toFixed(decimal).toString().split('.');
    b = rr[0].replace(/(\d{1,3}(?=(\d{3})+(?:\.\d|\b)))/g, "\$1" + separator);
    r = (rr[1] ? b + '.' + rr[1] : b);

    return r;
}

$(document).ready(function() {
    //Slick startup
    $('.dis-slick').slick({
        autoplay: true,
        arrows: false,
        dots: true,
        fade: true
    });

    //Slicknav startup
    $('#menu').slicknav();

    //Sticky menu
    var $menu = $("#menuF");
    var $logoImage = $('#logo-image');

    //Menu
    calculateScroll();
    $(window).scroll(function(event) {
        calculateScroll();
    });
    $('.navmenu ul li a').click(function() {
        $('html, body').animate({scrollTop: $(this.hash).offset().top - 80}, 800);
        return false;
    });

    $(window).scroll(function() {
        if ($(this).scrollTop() > 136 && $menu.hasClass("default")) {

            $menu.removeClass("default")
                .addClass("fixed transbg");

            $logoImage.removeClass('logo-home')
                .addClass('logo-header')
                .attr('src', 'images/logo_small.png');
        } else {
            if ($(this).scrollTop() <= 135 && $menu.hasClass("fixed")) {
                $menu.removeClass("fixed transbg")
                    .addClass("default");

                $logoImage.removeClass('logo-header')
                    .addClass('logo-home')
                    .attr('src', 'images/logo_white.png');
            }
        }
    });

    setTimeout(function() {
        var $counter = $('#counter');
        var $counter1 = $('#counter1');
        var $counter2 = $('#counter2');

        $counter.text('0');
        $counter1.text('0');
        $counter2.text('0');
        setInterval(function() {

            var curval = parseInt($counter.text());
            var curval1 = parseInt($counter1.text().replace(' ', ''));
            var curval2 = parseInt($counter2.text());
            if (curval <= 707) {
                $counter.text(curval + 1);
            }
            if (curval1 <= 12280) {
                $counter1.text(sdf_FTS((curval1 + 20), 0, ' '));
            }
            if (curval2 <= 245) {
                $counter2.text(curval2 + 1);
            }
        }, 2);

    }, 500);
});