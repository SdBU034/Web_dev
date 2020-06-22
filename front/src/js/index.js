// 面向对象

function Banner() {
    this.bannerGroup = $('#banner-group');
    this.index = 0;
    this.leftArrow = $('.left-arrow');
    this.rightArrow = $('.right-arrow');
    this.bannerUl = $('#banner-ul');
    this.liList = this.bannerUl.children('li');
    this.bannerCount = this.liList.length;
    this.listenBannerHover();
}

Banner.prototype.toggleArrow = function (isShow) {
    var self = this;
    if(isShow){
        self.leftArrow.toggle();
        self.rightArrow.toggle();
    }else{
        self.leftArrow.hide();
        self.rightArrow.hide();
    }
};


Banner.prototype.listenBannerHover = function () {
    var self = this;
    this.bannerGroup.hover(function () {
        clearInterval(self.timer);
        self.toggleArrow(true);
    },function () {
        self.loop();
        self.toggleArrow(false);
    });
};

Banner.prototype.animate = function () {
    var self = this;
    this.bannerUl.animate({'left': -800*self.index}, 1000);
};

Banner.prototype.loop = function () {
    var self = this;
    self.timer = setInterval(function () {
        if(self.index >= 3){
            self.index = 0;
        }else{
            self.index += 1;
        }
        self.animate();
    }, 2000);
};

Banner.prototype.listenArrowClick = function () {
    var self = this;
    self.leftArrow.click(function () {
        if(self.index === 0){
            self.index = self.bannerCount - 1;
        }else{
            self.index--;
        };
        self.animate();
    });

    self.rightArrow.click(function () {
       if(self.index === self.bannerCount - 1){
           self.index = 0;
       } else{
           self.index ++;
       };
       self.animate();
    });
};

Banner.prototype.run = function () {
    this.loop();
    this.listenArrowClick();
};

$(function () {
    var banner = new Banner();
    banner.run();
});