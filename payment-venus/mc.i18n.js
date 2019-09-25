/**
 *  数据字典
 */
define(['angular', 'config'], function (config) {

    angular.module('mc.i18n', [])
        .factory('$$i18n', ['$http', '$q', '$timeout',
            function ($http, $q, $timeout) {

                return function (options) {
                    var title = options.title;
                    console.log(title+'--这是自定义加载工厂');
                    var deferred = $q.defer(),
                        translations;

                    /***************此处可请求网络获取，结果为一下形式即可**************/

                    if (options.key === 'en-us') {
                        translations = {
                            "title": "internationalization demo，{{name}}",
                            "name": "名字:{NAME, select, male{ermao} female{sun} other{figer}}"
                        };
                    } else {
                        translations = {
                            "title": "国际化测试，{{name}}",
                            "name": "名字:{MYNAME, select, male{杨浩田} female{杨维超} other{韩纪远}}",
                            "age": "{{number}}",
                            "btn_en": "English",
                            "btn_zh": "汉语"
                        };
                    }

                    //等两秒在发送结果
                    $timeout(function () {
                        deferred.resolve(translations);
                    }, 2000);

                    return deferred.promise;
                };
            }])
});
