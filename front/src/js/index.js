// 面向对象

function Banner() {
    this.bannerGroup = $('#banner-group');
    this.index = 0;
    this.listenBannerHover();
}

Banner.prototype.listenBannerHover = function () {
    var self = this;
    this.bannerGroup.hover(function () {
        clearInterval(self.timer);
    },function () {
        self.loop();
    });
};

Banner.prototype.loop = function () {
    var self = this;
    var banneUl = $("#banner-ul");
    this.timer = setInterval(function () {
        if(self.index >= 3){
            self.index = 0;
        }else{
            self.index += 1;
        }
        banneUl.animate({'left': -800*self.index}, 1000);
    }, 2000);
};

Banner.prototype.run = function () {
    this.loop();
};

$(function () {
    var banner = new Banner();
    banner.run();
});