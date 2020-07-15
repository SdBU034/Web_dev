//用来处理导航条
function FrontBase() {

}

FrontBase.prototype.run = function () {
    var self = this;
    self.listenAuthBox();
};

FrontBase.prototype.listenAuthBox = function () {
    var authBox = $('.auth-box');
    var userMoreBox = $('.user-more-box')
    authBox.hover(function () {
        userMoreBox.show();
    }, function () {
        userMoreBox.hide();
    });
};


//登录弹出模态窗口
//用来处理登录
function Auth() {
    var self = this;
    self.maskWrapper = $('.mask-wrapper');
    self.scrollWrapper = $('.scroll-wrapper');
}

Auth.prototype.run = function () {
    var self = this;
    self.listenShowHideEvent();
    self.listenSwitchEvent();
    self.listenLoginEvent();
    self.listenImgCaptcha();
    self.listenRegisterEvent();
};

Auth.prototype.showEvent = function () {
  var self = this;
  self.maskWrapper.show();
};

Auth.prototype.hideEvent = function () {
  var self = this;
  self.maskWrapper.hide();
};

Auth.prototype.listenShowHideEvent = function () {
  var self = this;
  var loginBtn = $('.auth-box');
  var closeBtn = $('.close-btn');
  loginBtn.click(function () {
      self.showEvent();
  });

  closeBtn.click(function () {
     self.hideEvent();
  });
};

Auth.prototype.listenSwitchEvent = function () {
    var self = this;
    var switcher = $('.switch');
    switcher.click(function () {
       var currentLeft = self.scrollWrapper.css('left');
       currentLeft = parseInt(currentLeft);
       if(currentLeft < 0){
           self.scrollWrapper.animate({'left':'0'});
       }else{
           self.scrollWrapper.animate({'left':'-400px'});
       }
   });
};

Auth.prototype.listenImgCaptcha = function (){
    var imgCaptcha = $('.img-captcha');
    imgCaptcha.click(function () {
        imgCaptcha.attr('src', '/account/img_captcha/' + '?random=' + Math.random())
    });
};

Auth.prototype.listenLoginEvent = function () {
  var self = this;
  var loginGroup = $('.login');
  var telephoneInput = loginGroup.find('input[name="telephone"]');
  var passwordInput = loginGroup.find('input[name="password"]');
  var rememberInput = loginGroup.find('input[name="remember"]');

  var submitBtn = loginGroup.find('.submit-btn');
  submitBtn.click(function () {
      var telephone = telephoneInput.val();
      var password = passwordInput.val();
      var remember = rememberInput.prop('checked');

      sdbuajax.post({
          'url': '/account/login/',
          'data': {
              'telephone': telephone,
              'password': password,
              'remember': remember?1:0,
          },
          'success': function (result) {
              self.hideEvent();
              window.location.reload();
          },
      });
  })
};

Auth.prototype.listenRegisterEvent = function () {
    var self = this;
    var registerGroup = $('.register');
    var submitBtn = registerGroup.find('.submit-btn');
    
    submitBtn.click(function (event) {
        event.preventDefault();
        var telephoneInput = registerGroup.find('input[name="telephone"]');
        var usernameInput = registerGroup.find('input[name="username"]');
        var imgCaptchaInput = registerGroup.find('input[name="img_captcha"]');
        var pwd1Input = registerGroup.find('input[name="pwd1"]');
        var pwd2Input = registerGroup.find('input[name="pwd2"]');

        var telephone = telephoneInput.val();
        var username = usernameInput.val();
        var img_captcha = imgCaptchaInput.val();
        var pwd1 = pwd1Input.val();
        var pwd2 = pwd2Input.val();

        sdbuajax.post({
            'url': '/account/register/',
            'data': {
                'telephone': telephone,
                'username': username,
                'pwd1': pwd1,
                'pwd2': pwd2,
                'img_captcha': img_captcha,
            },
            'success': function () {
                self.hideEvent();
                window.location.reload();
            }
        })
    });
};

$(function () {
  var auth = new Auth();
  auth.run();
});

$(function () {
   var frontBase = new FrontBase();
   frontBase.run();
});