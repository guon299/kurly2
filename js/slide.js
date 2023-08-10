(function($){
    const obj = {
        init(){
            this.header();
            this.section1();
            this.section2();
        },
        header(){

        },section1(){
            let cnt = 0;
            let setId = 0;
            let n = ($('#section1 .slide').length)-1;
            const slideContainer = $('#section1 .slide-container');
            const slideView = $('#section1 .slide-view');
            const slideWrap = $('#section1 .slide-wrap');
            const slideImg = $('#section1 .slide img');
            const slide = $('#section1 .slide');
            const pageBtn = $('#section1 .page-btn');
            const nextBtn = $('#section1 .next-btn');
            const prevBtn = $('#section1 .prev-btn');

            let mouseDown = null;
            let mouseUp = null;
            let dragStart = null;
            let dragEnd = null;
            let mDown = false;
            let winW = $(window).innerWidth();
            let sizeX = winW/2;

            const imgRate = 1.345244351;
            const transRate = 0.1265625;

            slideImg.css({width: imgRate * winW, transform: `translateX(${-(imgRate * winW)*transRate }px)`});

            // 즉각 반응형 함수
            $(window).resize(function(){
                winW = $(window).innerWidth();
                sizeX = 10;
                slideImg.css({width: imgRate * winW, transform: `translateX(${-(imgRate * winW)*transRate }px)`});
            })

            mainNextSlide();
            // 메인슬라이드 함수
            function mainNextSlide(){
                slide.css({zIndex:1,opacity:1});
                slide.eq(cnt).css({zIndex:2});
                slide.eq(cnt===0?n:cnt-1).css({zIndex:3}).stop().animate({opacity:0},1000);
                pageEvent();
            };
            function mainPrevSlide(){
                slide.css({zIndex:1,opacity:1});
                slide.eq(cnt===n?0:cnt+1).css({zIndex:2});
                slide.eq(cnt).css({zIndex:3}).stop().animate({opacity:0},0).animate({opacity:1},1000);
                pageEvent();
            };
            // 다음 카운트 함수
            function nextCount(){
                cnt++;
                mainNextSlide();
            };
            // 이전 카운트 함수
            function prevCount(){
                cnt--;
                mainPrevSlide();
            };
            // 자동 타이머
            function autoTimer(){
                setId = setInterval(nextCount,2000);
            };
            autoTimer();
            // 페이지 이벤트 함수
            function pageEvent(){
                pageBtn.removeClass('on');
                pageBtn.eq(cnt>n?0:cnt).addClass('on');
            };
            // 페이지 버튼클릭
            pageBtn.each(function(idx){
                $(this).on({
                    click(e){
                        e.preventDefault();
                        cnt=idx;
                        mainNextSlide();
                        mainPrevSlide();
                        clearInterval(setId);
                    }
                });
            });
            // 다음버튼 클릭
            nextBtn.on({
                    click(){
                        nextCount();
                        clearInterval(setId);
                    }
                });
            // 이전버튼 클릭
            prevBtn.on({
                    click(){
                        prevCount();
                        clearInterval(setId);
                    }
                });
            // 터치스와이프(데스크탑)
            slideContainer.on({
                mousedown(e){
                    winW = $(window).innerWidth();
                    sizeX = winW/2;
                    mouseDown = e.clientX;
                    dragStart = e.clientX -(slideWrap.offset().left+winW) ;
                    mDown = true;
                    slideView.css({cursor:'grabbing'});
                },
                mouseup(e){
                    mouseUp = e.clientX;
                    if(mouseDown-mouseUp > sizeX){
                        clearInterval(setId);
                        if(!slideWrap.is(':animated')){
                            nextCount();
                        }
                    }
                    if(mouseDown-mouseUp < -sizeX){
                        clearInterval(setId);
                        if(!slideWrap.is(':animated')){
                            prevCount();
                        }
                    }
                    mDown = false;
                    slideView.css({cursor:'grab'});
                },
            });
            $(document).on({
                mouseup(e){
                    if(!mDown) return;
                    mouseUp = e.clientX;
                    if(mouseDown-mouseUp > sizeX){
                        clearInterval(setId);
                        if(!slideWrap.is(':animated')){
                            nextCount();
                        }

                    }
                    if(mouseDown-mouseUp < -sizeX){
                        clearInterval(setId);
                        if(!slideWrap.is(':animated')){
                            prevCount();
                        }

                    }
                    mDown = false;
                    slideView.css({cursor : 'grab'});
                }
            });
            // 더치스와이프(모바일)
            slideContainer.on({
                touchstart(e){
                    winW = $(window).innerWidth();
                    sizeX = winW/2;
                    mouseDown = e.originalEvent.changedTouches[0].clientX;
                    dragStart = e.originalEvent.changedTouches[0].clientX -(slideWrap.offset().left+winW) ;
                    mDown = true;
                    slideView.css({cursor:'grabbing'});
                },
                touchEnd(e){
                    mouseUp = e.originalEvent.changedTouches[0].clientX;
                    if(mouseDown-mouseUp > sizeX){
                        clearInterval(setId);
                        if(!slideWrap.is(':animated')){
                            nextCount();
                        }
                    }
                    if(mouseDown-mouseUp < -sizeX){
                        clearInterval(setId);
                        if(!slideWrap.is(':animated')){
                            prevCount();
                        }
                    }
                    mDown = false;
                    slideView.css({cursor:'grab'});
                },
            });
        },
        section2(){
            let cnt = 0;

            const slideContainer = $('#section2 .slide-container');
            const slideView = $('#section2 .slide-view');
            const slideWrap = $('#section2 .slide-wrap');
            const slide = $('#section2 .slide');
            const nextBtn = $('#section2 .next-btn');
            const prevBtn = $('#section2 .prev-btn');

            let mouseDown = null;
            let mouseUp = null;
            let dragStart = null;
            let dragEnd = null;
            let mDown = false;
            let winW = $(window).innerWidth();
            let sizeX = winW/2;

            // 메인 슬라이드 함수
            function mainSlide(){
                slideWrap.stop().animate({left: `${-1068*cnt}px`},600,'easeInOutExpo',function(){
                    if(cnt>4) cnt=4;
                    if(cnt<0) cnt=0;
                    slideWrap.stop().animate({left: `${-1068*cnt}px`},0)
                })
            };
            // 다음카운트 함수
            function nextCount(){
                cnt++;
                mainSlide();
            };
            // 이전 카운트 함수
            function prevCount(){
                cnt--;
                mainSlide();
            };
            // 다음버튼 클릭
            nextBtn.on({
                click(){
                    nextCount();
                }
            });
            // 이전 버튼 클릭
            prevBtn.on({
                click(){
                    prevCount();
                }
            });
            // 터치스와이프(데스크탑)
            slideContainer.on({
                mousedown(e){
                    console.log(e.clientX);
                    winW = $(window).innerWidth();
                    sizeX = 100;
                    mouseDown = e.clientX;
                    dragStart = e.clientX -(slideWrap.offset().left+winW) ;
                    mDown = true;
                    slideView.css({cursor:'grabbing'});
                },
                mouseup(e){
                    console.log(e.clientX);
                    mouseUp = e.clientX;
                    if(mouseDown-mouseUp > sizeX){
                        if(!slideWrap.is(':animated')){
                            nextCount();
                        }
                    }
                    if(mouseDown-mouseUp < -sizeX){
                        if(!slideWrap.is(':animated')){
                            prevCount();
                        }
                    }
                    if((mouseDown-mouseUp) >= -sizeX && (mouseDown-mouseUp) <= sizeX){
                        mainSlide();
                    }
                    mDown = false;
                    slideView.css({cursor:'grab'});
                }
            });
            $(document).on({
                mouseup(e){
                    if(!mDown) return;

                    mouseUp = e.clientX;
                    if(mouseDown-mouseUp > sizeX){
                        if(!slideWrap.is(':animated')){
                            nextCount();
                        }

                    }
                    if(mouseDown-mouseUp < -sizeX){
                        if(!slideWrap.is(':animated')){
                            prevCount();
                        }

                    }
                    if((mouseDown-mouseUp) >= -sizeX && (mouseDown-mouseUp) <= sizeX){
                        mainSlide();
                    }
                    mDown = false;
                    slideView.css({cursor : 'grab'});
                }
            });
            // 더치스와이프(모바일)
            slideContainer.on({
                touchstart(e){
                    console.log(e);
                    winW = $(window).innerWidth();
                    sizeX = winW/2;
                    mouseDown = e.originalEvent.changedTouches[0].clientX;
                    dragStart = e.originalEvent.changedTouches[0].clientX -(slideWrap.offset().left+winW) ;
                    mDown = true;
                    slideView.css({cursor:'grabbing'});
                },
                touchEnd(e){
                    mouseUp = e.originalEvent.changedTouches[0].clientX;
                    if(mouseDown-mouseUp > sizeX){
                        if(!slideWrap.is(':animated')){
                            nextCount();
                        }
                    }
                    if(mouseDown-mouseUp < -sizeX){
                        if(!slideWrap.is(':animated')){
                            prevCount();
                        }
                    }
                    if((mouseDown-mouseUp) >= -sizeX && (mouseDown-mouseUp) <= sizeX){
                        mainSlide();
                    }
                    mDown = false;
                    slideView.css({cursor:'grab'});
                }
            });
        }
    }
    obj.init();
})(jQuery);