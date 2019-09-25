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
    angular.module('mc.formatSwitch', [])
        .directive('mcFormatSwitch', [ '$compile', '$timeout', '$q',function ( $compile, $timeout, $q) {
            return {
                restrict: 'A',
                require: 'ngModel',
                scope: true,
                link: function (scope, element, attrs, ngModel) {

                    //显示model值
                    scope.insurerName = '';
                    //为true展示底层，false展示添加层
                    scope.showTypeAhead = false;
                    var insurerCode;
                    scope.type = attrs.type;
                    scope.transmitType = attrs.transmitType;
                    scope.myClass=attrs.class;


                    $timeout(function(){
                        insurerCode = ngModel.$viewValue;
                    },10);
                    //
                    ////字符串强制保留小数点后俩位
                    //function toDecimal2(x) {
                    //    var f = parseFloat(x);
                    //    if (isNaN(f)) {
                    //        return '';
                    //    }
                    //    var f = Math.round(x*100)/100;
                    //    var s = f.toString();
                    //    var rs = s.indexOf('.');
                    //    if (rs < 0) {
                    //        rs = s.length;
                    //        s += '.';
                    //    }
                    //    while (s.length <= rs + 2) {
                    //        s += '0';
                    //    }
                    //    return s;
                    //}
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
                    function toDecimal2(rounding) {
                        if(isNaN(rounding) || rounding == ""){
                            if(!attrs.minValue){
                                rounding = "0.00";
                            }
                        }else{
                            //最多保留两位小数
                            var f = parseFloat(rounding);
                            if(String((rounding*100)).indexOf('.')>0){
                                if(String((rounding*100)).split('.')[1].length>6){
                                    var f = Math.round((Number(rounding)+Number(0.000001))*100)/100;
                                }else{
                                    var f = Math.round(rounding*100)/100;
                                }
                            }else{
                                var f = Math.round(rounding*100)/100;
                            }

                            var s = f.toString();
                            var rs = s.indexOf('.');
                            if(rs < 0){
                                s = s + ".00";
                            }else{
                                while(s.length <= rs + 2){s += '0';}
                            }
                            return toClearString(s);
                        }
                    }

                    // 给数字加入千位符
                    function toThousands(_data) {
                        //去掉传过来的 ，
                        //var data = _data.replace(/` | ~ | ! | @ | # | $ | ^ | & | * | ( | ) | = | | | { | } | ' | : | ; | ' | , | \\ | [\\] | . | < | > | ? | ~ | ！ | @ | % | # | ￥ | … | … | & | * | （ | ） | — | — | | | { | } | 【 | 】 | ‘ | ； | ： | ” | “ | ' | 。 | ， | 、 | ？/g,'');
                        var data = _data.replace(/,|，|。/g,'');
                        data = toDecimal2(data);
                        if(data.indexOf('.')>=0){
                            var num1 = data.split('.')[0];
                            var num2 = '.'+data.split('.')[1];
                            var num = (num1 || 0).toString(), result = '';
                        }else{
                            var num = (data || 0).toString(), result = '';
                            var num2 = '';
                        }

                        while (num.length > 3) {
                            result = ',' + num.slice(-3) + result;
                            num = num.slice(0, num.length - 3);
                        }
                        if (num) { result = num + result; }
                        return result+num2
                    }

                    ngModel.$formatters.unshift(function (inputValue) {
                        if(typeof(inputValue) == "number"){
                            var inputValue = inputValue.toString()
                        }
                        inputValue = inputValue || '';
                        var arr = inputValue.split(".");
                        var length = arr[0].length;
                        //判断输入的整数部分小于16，超过16位不可继续输入
                        if(length> 14){
                            scope.openPopups(constants.CONFIG.dialogMode.prompt, "整数部分不能超过14位");
                            $timeout(function(){
                                scope.showTypeAhead = false;
                            },10)
                        }else{

                            if(inputValue=='')
                                scope.insurerName = '';
                            else{
                                scope.insurerName = toThousands(inputValue);
                            }
                            insurerCode = inputValue;
                            return inputValue;
                        }
                    });

                    var inputId = 'mc-format-Switch-' + scope.$id + '-' + Math.floor(Math.random() * 10000);

                    var inputEl = angular.element('<input ng-model="insurerName" />');
                    inputEl.attr({
                        'ng-show': '!showTypeAhead',
                        'ng-focus': 'onFocusInsurerName()',
                        'type': 'text',
                        'class': attrs.class
                    });

                    //隐藏输入框获取焦点
                    scope.onFocusInsurerName = function () {
                        scope.showTypeAhead = true;
                        $timeout(function(){
                            //获取焦点
                            document.getElementById(inputId).focus();
                            //选中输入框文本
                            document.getElementById(inputId).select();
                            initialized = false;
                            //将返回数据强制转换为保留俩位小数
                            var inputModel = toDecimal2(insurerCode);
                            ngModel.$setViewValue(inputModel);
                        },10);
                    };

                    //页面输入框失去焦点
                    scope.onBlur = function () {
                        $timeout(function () {
                            var inputModel = scope.insurerName.replace(/,/g,'');
                            //如果需要数字类型数据，页面transmit-type=‘number’，格式化结束后，转化为number类型数据
                            if(scope.transmitType == 'number'){
                                inputModel = Number(inputModel)
                            }
                            scope.insurerName=toClearString(scope.insurerName);
                            ngModel.$setViewValue(toClearString(inputModel));
                            scope.showTypeAhead = false;
                        },10);

                    };

                    var $input = $compile(inputEl)(scope);
                    element.removeAttr('mc-format-Switch');
                    element.attr({
                        "id": inputId,
                        "ng-show": "showTypeAhead",
                        "ng-blur": "onBlur()"
                    });

                    element = $compile(element)(scope);
                    element.after($input);
                }
            }
        }]
    )
});
