/*
 *author:FTD
 *day:2017-11-30
 */

(function($) {
    $(function() {
        mainSlide();
        scrollText();
        brandsSlide();
        fixedSearch();
        scrollSearch();
        rightSlider();
        switchNav();
    });
    //顶部搜索输入框
    function scrollSearch() {
        $('form.search').on('submit', function(event) {
            event.preventDefault();
        });

        $("#header .search input").keyup(function(e) {
            if (e.which == 13) {
                layer.open({
                    title: false,
                    type: 3,
                    content: '',
                    time: 1000
                });

            };
        });
        $("#header .search .submit").click(function() {
            layer.open({
                title: false,
                type: 3,
                content: '',
                time: 1000
            });
        });
    };
    //滚动搜索框
    function fixedSearch() {
        $(window).scroll(function() {
            var top = $(this).scrollTop();
            var sFloat = $("#header .searchFloat");
            if (top >= 100) {
                sFloat.show(1000);
            } else {
                sFloat.hide();
            }
        });
        $('form.fsearch').on('submit', function(event) {
            event.preventDefault();
        });
        $("#header .fsearch input").keyup(function(e) {
            if (e.which == 13) {
                layer.open({
                    title: false,
                    type: 3,
                    content: '',
                    time: 1000
                });

            };
        });
    };
    //右侧导航条
    function rightSlider() {
        $(window).scroll(function() {
            var top = $(this).scrollTop();
            var nTop = 950,
                i = Math.floor((top - 100) / nTop);
            var fixTool = $("#content .fixtool");
            var topArr = fixTool.find(".fixtoolItem a:nth-child(6)");
            if (top >= 300) {
                fixTool.animate({ top: "80px" });

                topArr.stop().show(500);

            } else {
                fixTool.stop(true).animate({ top: "300px" });
                // topArr.stop().animate({ "display": "none" }, 1000);
                topArr.stop().hide(500, function() {
                    $(this).css("display", "none");
                });

            }
            if (i <= 4 && i >= 0) {
                fixTool.find(".fixtoolItem a").eq(i).addClass("current").siblings().removeClass('current');

            }
            topArr.click(function() {
                $("body,html").animate({ scrollTop: 0 }, 1000, function() {
                    $(this).stop(true);
                });
                return false;
            })
        });
    };
    //网页换肤
    function switchNav() {
        var $li = $(".skin li");
        $li.click(function() {
            switchSkin(this.id);
        });
        var cookie_skin = $.cookie('MyCssSkin');
        if (cookie_skin) {
            switchSkin(cookie_skin);
        };

        function switchSkin(skinName) {
            $("#" + skinName).addClass('selected').siblings().removeClass("selected");
            $("#cssfile").attr('href', './styles/skin/' + skinName + ".css");
            $.cookie("MyCssSkin", skinName, { path: '/', expires: 10 });
        };
    };
    //主广告轮播
    function mainSlide() {
        var index = 0;
        var adTimer = null;
        var $textGuide = $(".jnImagescroll .textGuide a");
        $textGuide.mouseover(function() {
            index = $textGuide.index(this);
            showImg(index);
        }).eq(0).mouseover();

        function showImg(index) {
            $(".imgWrap a").eq(index).stop(true, true).fadeIn().siblings().fadeOut();
            $textGuide.eq(index).addClass('current').siblings().removeClass("current");

        };
        $('.jnImagescroll').hover(function() {
            if (adTimer) {
                clearInterval(adTimer);
            };
        }, function() {
            adTimer = setInterval(function() {
                showImg(index);
                index++;
                if (index == $textGuide.length) { index = 0; };
            }, 3000);
        }).trigger("mouseleave");
    };
    //最新动态自制提示及滚动效果
    function scrollText() {
        var x = 10;
        var y = 20;
        var $text = $(".jnNoticeInfo .textScroll");
        $text.find("a.tooltip").mouseover(function(e) {
            this.myTitle = this.title;
            this.title = "";
            var tooltip = "<div class='active'>" + this.myTitle + "</div>";
            $("body").append(tooltip);
            $("body").find("div.active").css({
                "top": (e.pageY + y) + "px",
                "left": (e.pageX + x) + "px"
            }).show('fast');
        }).mouseout(function() {
            this.title = this.myTitle;
            $("body").find("div.active").remove();
        }).mousemove(function(e) {
            $("body").find("div.active").css({
                "top": (e.pageY + y) + "px",
                "left": (e.pageX + x) + "px"
            });
        });
        var step = 2;
        var textTimer = null;

        function textMove() {
            textTimer = setInterval(function() {
                $text.animate({ top: "-=" + step }, function() {
                    if (this.style.top <= -102 + "px") {
                        $text.css("top", 0);
                    }
                });
            }, 50);
        }
        $(".jnNoticeInfo .aniwrap").hover(function() {
            if (textTimer) {
                clearInterval(textTimer);
                $text.stop(true);
            }
        }, function() {
            textMove();
        }).trigger("mouseleave");
    };
    //品牌图轮播效果
    function brandsSlide() {
        var page = 0,
            i = 4;
        var c_content = $(".jnBrandContent");
        var c_show = $(".jnBrandList");
        var c_width = c_content.width();
        var page_count = Math.ceil((c_show.find("li").length) / i);
        var c_tip = $(".jnBrandTab ul").find("a");
        var timer = null;

        function autoplay() {
            timer = window.setInterval(right, 3000);

        }
        autoplay();

        function right() {
            if (!c_show.is(":animated")) {
                c_show.animate({ left: "-=" + c_width }, function() {
                    page++;
                    if (page == (page_count - 2)) {
                        c_show.css({
                            left: -c_width
                        });
                        page = 0;
                    }
                    selectTip();
                })
            }
        };

        function selectTip() {
            c_tip.eq(page).addClass('current').parent().siblings().children().removeClass("current");

        };
        $(".jnBrand").hover(function() {
            clearInterval(timer);
        }, function() {
            autoplay();
        });
        c_tip.click(function() {
            var index = $(this).parent().index();
            c_show.animate({
                left: -(index + 1) * c_width
            });
            page = index;
            selectTip();
            return false;
        });

    };
})(jQuery);