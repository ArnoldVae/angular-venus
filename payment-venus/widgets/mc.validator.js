define(['angular','constants'], function (angular,constants) {

    angular.module('mc.validator', [])

        .directive('rangeValue',['$parse',function($parse){
            return{
                require: 'ngModel',
                restrict: 'A',
                scope:{
                    maxValue:'=',
                    minValue:'='
                },
                compile:function(tElement, tAttrs){
                    return function(scope, element, attrs, ctrl){
                        element.on('blur',function(){
                            if(parseFloat(ctrl.$viewValue)>parseFloat(scope.maxValue)){
                                ctrl.$setViewValue(scope.maxValue);
                                alert('不能大于'+scope.maxValue);
                                scope.$parent.$apply();
                                ctrl.$render();
                            }
                            if(parseFloat(ctrl.$viewValue)<parseFloat(scope.minValue)){
                                ctrl.$setViewValue(scope.minValue);
                                alert('不能小于'+scope.minValue);
                                scope.$parent.$apply();
                                ctrl.$render();
                            }
                        });
                        if(attrs.rangeValue!=''){
                            if(attrs.rangeValue.indexOf('lt')>-1){
                                scope.$watch('maxValue', function (newValue) {
                                    if(!newValue||newValue===''){
                                        return;
                                    }
                                    if(ctrl.$viewValue-scope.maxValue<=0)
                                        return false;
                                    ctrl.$setViewValue(scope.maxValue);
                                    ctrl.$render();
                                });
                            }
                            if(attrs.rangeValue.indexOf('init')>-1){
                                scope.$watch('default', function (newValue) {
                                    ctrl.$setViewValue(newValue);
                                    ctrl.$render();
                                });
                            }
                        }
                    }
                }
            }
        }])

        //强制转化大写
        .directive('uppercase', [function () {
            return {
                require: 'ngModel',
                restrict: 'A',
                link: function ($scope, element, attrs, ctrl) {

                    var capitalize = function (inputValue) {
                        inputValue = inputValue || '';

                        var capitalized = inputValue.toUpperCase();

                        if(capitalized !== inputValue) {
                            ctrl.$setViewValue(capitalized);
                            ctrl.$render();
                        }
                        return capitalized;
                    };

                    ctrl.$parsers.unshift (capitalize);

                    capitalize($scope[attrs.ngModel]);
                }
            };
        }])

        //warnText指令
        .directive('warnText', ['$parse', 'localStorageService', '$$util', function ($parse, localStorageService, $$util) {

            return {
                require: 'ngModel',
                restrict: 'A',
                compile: function () {
                    return function ($scope, element, attrs, ctrl) {

                        var _date = new Date();

                        element.on('blur', function () {
                            //判断
                            if (ctrl.$invalid) {
                                if (ctrl.$error.required) {
                                    //alert(attrs.warnText + '为必填项');//需求确认不需要每次离开做必填校验
                                } else if (ctrl.$error.minlength) {
                                    layerMsg(attrs.warnText + '最小长度为' + attrs.ngMinlength);
                                } else if (ctrl.$error.maxlength) {
                                    layerMsg(attrs.warnText + '最大长度为' + attrs.ngMaxlength);
                                } else if (ctrl.$error.email) {
                                    layerMsg(attrs.warnText + '为邮箱格式');
                                } else if (ctrl.$error.pattern) {
                                    layerMsg(attrs.warnText + '录入不符合规范');
                                }
                            }
                        });
                    }
                }
            }

        }]);


});