/**
 * 输入框格式转换字符
 */
define([
    'angular',
    'constants'
], function (angular, constants) {
    /**
     * @description
     * ui 指令
     *
     */
    angular.module('mc.checkInputCut', [])
        .directive('mcInputCut', [ '$compile', '$timeout', '$q',function ( $compile, $timeout, $q) {
                return {
                    restrict: 'A',
                    require: 'ngModel',
                    scope: true,
                    link: function (scope, element, attrs, ngModel) {
                        var inputId= 'mc-input-cut-' + scope.$id + '-' + Math.floor(Math.random() * 10000);
                        //显示model值
                        scope.inputValue = '';
                        var _value;

                        $timeout(function(){
                            _value = ngModel.$viewValue;
                        },10);
                        //如果存在最小值
                        function toClearString(Num) {
                            var _num=0;
                            if(attrs.minValue){
                                if(Number(Num)==Number(attrs.minValue)||Number(Num)<Number(attrs.minValue)){
                                    _num=''
                                }else {
                                    _num=Num
                                }
                            }else {
                                _num=Num
                            }
                            return _num
                        }
                        ngModel.$formatters.unshift(function(value){
                            console.log(toClearString(value))
                            _value = value;
                            scope.inputValue=value;
                            return value;
                        });
                        function capture(arg1) {
                            if(attrs.inputType=='float'){
                                arg1=arg1.replace(/[^\d.]/g,'');
                            }else {
                                arg1=arg1.replace(/[^0-9]+/,'');
                            }
                            if(arg1.split('.').length>2){
                                arg1=arg1.split('.')[0]+'.'+arg1.split('.')[1]
                            }
                            return arg1;
                        }
                        //隐藏输入框获取焦点
                        scope.onFocusInsurerName = function () {
                           console.log('获取焦点');
                            scope.showTypeAhead = true;
                            $timeout(function(){
                                //获取焦点
                                document.getElementById(inputId).focus();
                                //选中输入框文本
                                document.getElementById(inputId).select();
                                //将返回数据去除其他元素
                                console.log(attrs);
                                if(attrs.transmitType=='number'&&_value){
                                    var inputModel = capture(_value);
                                    ngModel.$setViewValue(inputModel);
                                }
                            },10);
                        };

                        //页面输入框失去焦点
                        scope.onBlur = function () {
                            $timeout(function () {
                                if(attrs.transmitType=='number'&&scope.inputValue){
                                    var inputModel = capture(scope.inputValue);
                                    scope.inputValue=inputModel;
                                    ngModel.$setViewValue(inputModel);
                                    // scope.showTypeAhead = false;
                                }
                            },10);
                        };
                        var inputEl = angular.element('<input ng-model="inputValue" />');
                        inputEl.attr({
                            'ng-show': '!showTypeAhead',
                            'ng-focus': 'onFocusInsurerName()',
                            'type': 'text',
                            'ng-mouseleave':'test()',
                            'class':attrs.class
                        });


                        var $input = $compile(inputEl)(scope);
                        element.removeAttr('mc-input-cut');
                        element.attr({
                            "id": inputId,
                            "ng-show": "showTypeAhead",
                            "ng-change": "onBlur()",
                            'ng-mouseleave':'test()',
                            "ng-blur":''
                        });
                        scope.test=function () {
                            if(attrs.minValue){
                                $timeout(function () {
                                    if(attrs.transmitType=='number'&&scope.inputValue){
                                        var inputModel = capture(scope.inputValue);
                                        if(attrs.minValue=='0'&&inputModel.indexOf('0')==0&&inputModel.indexOf('.')!=1){
                                            inputModel=inputModel.substr(1);
                                            inputModel='0.'+inputModel
                                        }
                                        scope.inputValue=inputModel;
                                        ngModel.$setViewValue(toClearString(inputModel));
                                        // scope.showTypeAhead = false;
                                    }
                                },10);
                            }
                        };

                        element = $compile(element)(scope);
                        element.after($input);






                    }
                }
            }]
        )
});
