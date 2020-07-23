function NewsCategory() {

};

NewsCategory.prototype.run = function () {
    var self = this;
    self.listenAddCategoryEvent();
    self.listenEditNewsCategoryEvent();
    self.listenDeleteNewsCategoryEvent();
};

NewsCategory.prototype.listenAddCategoryEvent = function () {
  var self = this;
  var addBtn = $('#add-category');
  addBtn.click(function () {
      sdbualert.alertOneInput({
          'title': '添加新闻分类',
          'placeholder': '请输入新闻分类',
          'confirmCallback': function (inputValue) {
              sdbuajax.post({
                  'url': '/cms/add_news_category/',
                  'data': {
                      'name': inputValue,
                  },
                  'success': function (result) {
                      if(result['code'] === 200){
                          console.log(result);
                          window.location.reload();
                      }else {
                          sdbualert.close();
                          window.messageBox.showError(result['message']);
                      }
                  }
              });

          }
      });
  });
};

NewsCategory.prototype.listenEditNewsCategoryEvent = function () {
    var editBtn = $('.edit-new-category');
    editBtn.click(function () {
        var currentBtn = $(this);
        var tr = currentBtn.parent().parent();
        var pk = tr.attr('data-pk');
        var name = tr.attr('data-name');
        sdbualert.alertOneInput({
            'title': '修改分类名称',
            'placeholder': '请输入新的分类名称',
            'value': name,
            'confirmCallback': function (inputValue) {
                sdbuajax.post({
                    'url': '/cms/edit_news_category/',
                    'data': {
                        'pk': pk,
                        'name': inputValue,
                    },
                    'success': function (result) {
                        if(result['code'] === 200) {
                            window.location.reload();
                        }
                    }
                })
            }
        })
    })
};

NewsCategory.prototype.listenDeleteNewsCategoryEvent = function () {
    var deleteBtn = $('.delete-new-category');
    deleteBtn.click(function () {
        var currentBtn = $(this);
        var tr = currentBtn.parent().parent();
        var pk = tr.attr('data-pk');
        var name = tr.attr('data-name');
        sdbualert.alertConfirm({
            'title': '确定要删除这个新闻分类吗？',
            'text': name,
            'confirmCallback': function () {
                sdbuajax.post({
                    'url': '/cms/delete_news_category/',
                    'data': {
                        'pk': pk,
                    },
                    'success': function (result) {
                        if(result['code'] === 200){

                            window.location.reload();
                        }
                    }
                })
            }
        })
    })
};

$(function () {
   var category = new NewsCategory();
   category.run();
});