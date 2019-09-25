/**
 * 过滤器
 */
define(['angular', 'config', 'codes'], function (angular, config, codes) {

    angular.module('mc.filters', [])


        .filter('propsFilter', function () {
            return function (items, props) {
                var out = [];

                if (angular.isArray(items)) {
                    var keys = Object.keys(props);

                    items.forEach(function (item) {
                        var itemMatches = false;

                        for (var i = 0; i < keys.length; i++) {
                            var prop = keys[i];
                            var text = props[prop].toString().toLowerCase();
                            if (item[prop]&&item[prop].toString().toLowerCase().indexOf(text) !== -1) {
                                itemMatches = true;
                                break;
                            }
                        }

                        if (itemMatches) {
                            out.push(item);
                        }
                    });
                } else {
                    // Let the output be the input untouched
                    out = items;
                }

                return out;
            };
        })

        .filter('menuFilter',function () {

            var menus=config.menus;
            var result;

            var checkTitle = function(data,val){
                $.each(data,function(index,target){
                    if(target.actionURL==val){
                        result = target.menuCName;
                    }else if(target.nodes && target.nodes.length){
                        return checkTitle(target.nodes,val);
                    }
                });
                return result;
            };

            return function (value) {
                return checkTitle(menus,value);
            };
        })
        .filter('mcDate',function () {

          var checkDate=function(date){
              var _date=new Date(date);
              return _date.getFullYear() + '-' + ( (_date.getMonth() + 1) < 10 ? 0 : '') + (_date.getMonth() + 1) + '-' +
                  (_date.getDate() < 10 ? 0 : '') + _date.getDate();
          }
            return function (date) {
                if(date==""||date==null){
                    return date
                }else {
                    return checkDate(date);
                }
            };
        })
        .filter('mcSuperDate',function () {

            var checkDate=function(date){
                var _date=new Date(date);
                return _date.getFullYear() + '-' + ( (_date.getMonth() + 1) < 10 ? 0 : '') + (_date.getMonth() + 1) + '-' +
                    (_date.getDate() < 10 ? 0 : '') + _date.getDate()+' '+(_date.getHours() < 10 ? "0" + _date.getHours() : _date
                        .getHours())+':'+(_date.getMinutes() < 10 ? "0" + _date.getMinutes() : _date
                        .getMinutes())+':'+(_date.getSeconds() < 10 ? "0" + _date.getSeconds() : _date
                        .getSeconds());
            }
            return function (date) {
                if(date==""||date==null){
                    return date
                }else {
                    return checkDate(date);
                }
            };
        })
        .filter('mcSmallDate',function () {

            var checkDate=function(date){
                var _date=new Date(date);
                return(_date.getHours() < 10 ? "0" + _date.getHours() : _date
                        .getHours())+':'+(_date.getMinutes() < 10 ? "0" + _date.getMinutes() : _date
                        .getMinutes())+':'+(_date.getSeconds() < 10 ? "0" + _date.getSeconds() : _date
                        .getSeconds());
            }
            return function (date) {
                if(date==""||date==null){
                    return date
                }else {
                    return checkDate(date);
                }
            };
        })



        //千分位过滤器
        .filter('format',function () {

            var format = function (num) {
                return (Number(num).toFixed(2) + '').replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g, '$&,');
            };

            return function(num) {
                if(num||num == 0)
                return format(num)
            }


        })

        .filter('codeFilter',function () {
            var baseCode={
                '0':'否',
                '1':'是'
            };
            return function (value) {
                return baseCode[value];
            };
        })



});