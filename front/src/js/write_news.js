function News() {

};

News.prototype.listenUploadFileEvent = function () {
    var uploadBtn = $('#thumbnail-btn');
    uploadBtn.change(function () {
        var file = uploadBtn[0].files[0];
        var formData = new FormData();
        formData.append('file', file);
        sdbuajax.post({
            'url': '/cms/upload_file/',
            'data': formData,
            'processData': false,
            'contentType': false,
            'success': function (result) {
                if(result['code'] === 200) {
                    var url = result.data.url;
                    var thumbnailInput = $('#InputImage');
                    thumbnailInput.val(url);
                }
            }
        })
    });
};

News.prototype.initUEditor = function () {
    window.ue = UE.getEditor('editor',{
        'initialFrameHeight': 400,
        'serverUrl': '/ueditor/upload/'
    });
};

News.prototype.listenSubmitEvent = function () {
    var submitBtn = $('#submit-btn');
    submitBtn.click(function (event) {
        // 阻止默认的按钮行为
        event.preventDefault();

        var title = $("input[name='title']").val();
        var category = $("select[name='category']").val();
        var desc = $("input[name='desc']").val();
        var thumbnail = $("input[name='thumbnail']").val();
        var content = window.ue.getContent();

       sdbuajax.post({
           'url': '/cms/write_news/',
           'data': {
               'title': title,
               'category': category,
               'desc': desc,
               'thumbnail': thumbnail,
               'content': content,
           },
           'success': function (result) {
               if(result['code'] === 200) {
                   sdbualert.alertSuccess('恭喜，新闻发表成功！', function () {
                       window.location.reload();
                   })
               }
           }
       })
    });
};

News.prototype.run = function () {
    var self = this;
    self.initUEditor();
    self.listenUploadFileEvent();
    self.listenSubmitEvent();
};


$(function () {
    var news = new News();
    news.run();
});