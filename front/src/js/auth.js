
//登录弹出模态窗口

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
              if(result['code'] == 200) {
                  self.hideEvent();
                  window.location.reload();
              }else{
                  var messageObject = result['message'];
                  if(typeof messageObject == 'string' || messageObject.constructor == String) {
                      console.log(messageObject);
                  }else {
                      for(var key in messageObject){
                          var messages = messageObject[key];
                          var message = messages[0];
                          console.log(message);
                      }
                  }
              }
          },
          'fail': function (error) {
              console.log(error);
          }
      });
  })
};

$(function () {
  var auth = new Auth();
  auth.run();
});