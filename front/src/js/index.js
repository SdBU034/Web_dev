// 面向对象

function Banner() {
    this.bannerWidth = 800;
    this.bannerGroup = $('#banner-group');
    this.index = 1;
    this.leftArrow = $('.left-arrow');
    this.rightArrow = $('.right-arrow');
    this.bannerUl = $('#banner-ul');
    this.liList = this.bannerUl.children('li');
    this.bannerCount = this.liList.length;
    this.pageControl = $('.page-control');
}

Banner.prototype.initBanner = function () {
    var self = this;
    var firstBanner = self.liList.eq(0).clone();
    var lastBanner = self.liList.eq(self.bannerCount - 1).clone();
    self.bannerUl.append(firstBanner);
    self.bannerUl.prepend(lastBanner);
    this.bannerUl.css({'width': this.bannerWidth * (self.bannerCount + 2), 'left': -self.bannerWidth});
};

Banner.prototype.initPageControl = function () {
    var self = this;
    for(var i=0; i<self.bannerCount; i++){
        var circle = $('<li></li>');
        self.pageControl.append(circle);
        if (i === 0){
            circle.addClass('active');
        }
    }
    self.pageControl.css({'width': 12 * self.bannerCount + 30 * self.bannerCount})
};

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

Banner.prototype.animate = function () {
    var self = this;
    this.bannerUl.animate({'left': -self.bannerWidth*self.index}, 1000);
    var index = self.index;
    if(index === 0){
        index = self.bannerCount - 1;
    }else if(index === self.bannerCount + 1){
        index = 0;
    }else{
        index = self.index - 1;
    }
    self.pageControl.children('li').eq(index).addClass('active').siblings().removeClass();
};

Banner.prototype.loop = function () {
    var self = this;
    self.timer = setInterval(function () {
        if(self.index >= self.bannerCount + 1){
            self.bannerUl.css({'left': -self.bannerWidth});
            self.index = 2;
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
            self.bannerUl.css({'left': -self.bannerCount*self.bannerWidth})
            self.index = self.bannerCount - 1;
        }else{
            self.index--;
        };
        self.animate();
    });

    self.rightArrow.click(function () {
       if(self.index === self.bannerCount + 1){
           self.bannerUl.css({'left': -self.bannerWidth});
           self.index = 2;
       } else{
           self.index ++;
       };
       self.animate();
    });
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

Banner.prototype.listenPageControl = function () {
    var self = this;
    self.pageControl.children('li').each(function (index, obj) {
        $(obj).click(function () {
            self.index = index + 1;
            self.animate();
        });
    })
};

Banner.prototype.run = function () {
    this.initBanner();
    this.initPageControl();
    this.loop();
    this.listenBannerHover();
    this.listenArrowClick();
    this.listenPageControl();
};

$(function () {
    var banner = new Banner();
    banner.run();
});