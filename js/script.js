$(document).ready(function () {

    // recent post slide
    $('.posts_list').bxSlider({
        minSlides: 1,
        maxSlides: 3,
        moveSlides: 1,
        slideWidth: 370,
        slideMargin: 30,
        pager: false,
        nextSelector: '.recent_posts .controls .next',
        prevSelector: '.recent_posts .controls .prev'
    });

     // Mobile 메뉴
     $(".toggle").click(function () {
        $(".main-menu").slideToggle();
    });


    // 사이즈변경시 메뉴
    $(window).resize(function () {
        if ($(window).width() > 768) {
            //참이면 할일
            $(".main-menu").show();
        } else {
            //거짓이면 할일
            $(".main-menu").hide();
        }
    });

    // 상단 메뉴고정
    var $header = $('header');
    var $services = $('.services');
    var $counters = $('.counters');
    var $counterData = $counters.find('h3'); // counterData에는 오브젝트가 저장되어있음

    var $serviceExecuted = false;
    var $countersExecuted = false;

    var $offset = 300;

    // 스크롤시 이벤트
    $(window).scroll(function() {
        var $currentSct = $(this).scrollTop();

        if($currentSct > 0) {
            $header.addClass('sticky');

        } else {
            $header.removeClass('sticky');
        }

        // service_item 나타내기
        var $serviceThreshold = $services.offset().top - $offset; // services의 top값에서 300px 만큼 못미쳤을때

        if(!$serviceExecuted) {
            if($currentSct > $serviceThreshold) {
                $services.addClass('active');
                $serviceExecuted = true;
            }
        }
    });    

    $.getJSON(
        "https://api.openweathermap.org/data/2.5/weather?q=Seoul&appid=b74274d21fb7d21b11f54b11005176a1&units=metric",
        function (result) {
            var wiconUrl =  '<img src="https://openweathermap.org/img/wn/' + result.weather[0].icon + '.png"/>';
            
            $(".weather-icon").html(wiconUrl);
            $('.description').append(result.weather[0].description);
            $('.ctemp').append(Math.round(result.main.temp) + '°C');
            $('.ftemp').append(Math.round(result.main.feels_like) + '°C');
            $('.mintemp').append(Math.round(result.main.temp_min) + '°C');
            $('.maxtemp').append(Math.round(result.main.temp_max) + '°C');

            // 시간
            function convertTime(t) {
                var ot = new Date(t*1000);
                var year = ot.getFullYear();
                var mon = ot.getMonth()+1;
                var d = ot.getDate();
                var h = ot.getHours();
                var m = ot.getMinutes();
                return year + "-" + mon + "-" + d +" " + h + ":" + m ;
            }
            
            var ct = result.dt;
            var currentTime = convertTime(ct);
            $('.time').append(currentTime);

        });

        $('.tab-section').tabs({
            show : {duration: 300},
            hide : {duration: 300}
        });

}); // function