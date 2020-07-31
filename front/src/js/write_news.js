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


News.prototype.run = function () {
    var self = this;
    this.listenUploadFileEvent();
};


$(function () {
    var news = new News();
    news.run();
});