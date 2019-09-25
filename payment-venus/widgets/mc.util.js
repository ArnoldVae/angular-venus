define([
    'angular',
    'layer'
], function (angular,layer) {

    if (!window.console) {
        window.console = {
            log: function () {
            }
        }
    }

    if (!Function.prototype.bind) {
        Function.prototype.bind = function (oThis) {
            if (typeof this !== "function") {
                throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");
            }
            var aArgs = Array.prototype.slice.call(arguments, 1),
                fToBind = this,
                fNOP = function () {
                },
                fBound = function () {
                    return fToBind.apply(this instanceof fNOP && oThis
                            ? this
                            : oThis,
                        aArgs.concat(Array.prototype.slice.call(arguments)));
                };
            fNOP.prototype = this.prototype;
            fBound.prototype = new fNOP();
            return fBound;
        };
    }

    //获取目标日期
    Date.prototype.getTargetDate = function (oF, oM, oD) {
        var _date = new Date(this);
        _date.setFullYear(_date.getFullYear() + oF);
        _date.setMonth(_date.getMonth() + oM);
        _date.setDate(_date.getDate() + oD);
        return _date;
    };

    //日期格式转换
    Date.prototype.dateConversion = function () {

        return this.getFullYear() + '-' + ( (this.getMonth() + 1) < 10 ? 0 : '') + (this.getMonth() + 1) + '-' +
            (this.getDate() < 10 ? 0 : '') + this.getDate();
    };

    //日期格式转化
    Date.prototype.dateConversionTime = function () {

        return this.getFullYear() + '-' + ( (this.getMonth() + 1) < 10 ? 0 : '') + (this.getMonth() + 1) + '-' +
            (this.getDate() < 10 ? 0 : '') + this.getDate() + ' ' + (this.getHours() < 10 ? 0 : '') + this.getHours() + ':' +
            (this.getMinutes() < 10 ? 0 : '') + this.getMinutes() + ':' + (this.getSeconds() < 10 ? 0 : '') + this.getSeconds();
    };

    //日期字符串转化为日期
    String.prototype.dateStringConversion = function () {

        return new Date(this.replace(/-/g, "/"));
    };

    //日期带小时分钟秒字符串转化为日期(兼容ie8)
    String.prototype.dateStringConversionTime = function () {

        return new Date(this.replace(/-/g,'/').replace(/T|Z/g,' ').trim());
    };

    //layer弹框提示
    Window.prototype.layerMsg = function(data,target){
        var icon = target == 'success'?"1":"2";
        layer.alert(data, {
            icon: icon,
            skin: 'layer-ext-moon' //该皮肤由layer.seaning.com友情扩展。关于皮肤的扩展规则，去这里查阅
        });
    };
    var translateEnter=function (str) {
        if(str){
            return str.replace(/\r?\n/g,",");
        }else return "";
    }
    //加
    var floatAdd =function(arg1,arg2){
        var r1,r2,m;
        try{r1=arg1.toString().split(".")[1].length}catch(e){r1=0}
        try{r2=arg2.toString().split(".")[1].length}catch(e){r2=0}
        m=Math.pow(10,Math.max(r1,r2));
        return (arg1*m+arg2*m)/m;
    }
    //减
    var floatSub =function (arg1,arg2){
        var r1,r2,m,n;
        try{r1=arg1.toString().split(".")[1].length}catch(e){r1=0}
        try{r2=arg2.toString().split(".")[1].length}catch(e){r2=0}
        m=Math.pow(10,Math.max(r1,r2));
        //动态控制精度长度
        n=(r1>=r2)?r1:r2;
        return ((arg1*m-arg2*m)/m).toFixed(n);
    }
    //乘
    var floatMul= function (arg1,arg2) {
        var m=0,s1=arg1.toString(),s2=arg2.toString();
        try{m+=s1.split(".")[1].length}catch(e){}
        try{m+=s2.split(".")[1].length}catch(e){}
        return Number(s1.replace(".",""))*Number(s2.replace(".",""))/Math.pow(10,m);
    }
    //除
    var floatDiv= function (arg1,arg2){
        var t1=0,t2=0,r1,r2;
        try{t1=arg1.toString().split(".")[1].length}catch(e){}
        try{t2=arg2.toString().split(".")[1].length}catch(e){}
        r1=Number(arg1.toString().replace(".",""));
        r2=Number(arg2.toString().replace(".",""));
        return (r1/r2)*Math.pow(10,t2-t1);
    }
    //证件验证的方法
    var vcity = ['11', '12', '13', '14', '15', '21', '22', '23', '31', '32', '33', '34', '35', '36', '37', '41', '42', '43', '44', '45', '46', '50', '51', '52', '53', '54', '61', '62', '63', '64', '65', '71', '81', '91']
    //检查号码是否符合规范，包括长度，类型
    var isCardNo = function (card, target) {
        var reg = "";
        if (target == '18') {
            //身份证号码18位
            reg = /(^\d{17}(\d|X)$)/;
        } else if (target == '15') {
            //身份证号码15位
            reg = /(^\d{15}$)/;
        } else {
            //身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X
            reg = /(^\d{15}$)|(^\d{17}(\d|X)$)/;
        }
        return reg.test(card);
    };
    //取身份证前两位,校验省份
    var checkProvince = function (card) {
        var province = card.substr(0, 2);
        return vcity.indexOf(province) >= 0;
    };
    //检查生日是否正确
    var checkBirthday = function (card) {
        var len = card.length;
        var ereg;
        //身份证15位时，次序为省（3位）市（3位）年（2位）月（2位）日（2位）校验位（3位），皆为数字
        if (len == '15') {
            if ((parseInt(card.substr(6, 2)) + 1900) % 4 == 0 || ((parseInt(card.substr(6, 2)) + 1900) % 100 == 0 && (parseInt(card.substr(6, 2)) + 1900) % 4 == 0 )) {
                ereg = /^[1-9][0-9]{5}[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))[0-9]{3}$/;//测试出生日期的合法性
            } else {
                ereg = /^[1-9][0-9]{5}[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|1[0-9]|2[0-8]))[0-9]{3}$/;//测试出生日期的合法性
            }
            if (ereg.test(card)) {
                return '19' + card.substr(6, 2) + '-' + card.substr(8, 2) + '-' + card.substr(10, 2);
            } else {
                return false;
            }

        }
        //身份证18位时，次序为省（3位）市（3位）年（4位）月（2位）日（2位）校验位（4位），校验位末尾可能为X
        else if (len == '18') {
            if (parseInt(card.substr(6, 4)) % 4 == 0 || (parseInt(card.substr(6, 4)) % 100 == 0 && parseInt(card.substr(6, 4)) % 4 == 0 )) {
                ereg = /^[1-9][0-9]{5}(20|19)[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))[0-9]{3}[0-9Xx]$/;//闰年出生日期的合法性正则表达式
            } else {
                ereg = /^[1-9][0-9]{5}(20|19)[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|1[0-9]|2[0-8]))[0-9]{3}[0-9Xx]$/;//平年出生日期的合法性正则表达式
            }
            if (ereg.test(card)) {
                return card.substr(6, 4) + '-' + card.substr(10, 2) + '-' + card.substr(12, 2);
            } else {
                return false;
            }
        } else {
            return false;
        }
    };
    //检查性别
    var sexShow;
    var checkSex = function (card) {
        if (card.length == '15') {
            sexShow = card.slice(14, 15) % 2 ? 'M' : 'W';
            return sexShow;
        }
        else if (card.length == '18') {
            sexShow = card.slice(16, 17) % 2 ? 'M' : 'W';
            return sexShow;
        } else {
            return false;
        }
    };
    //校验位的检测
    var checkParity = function (card) {
        //15位转18位
        card = changeFivteenToEighteen(card);
        var len = card.length;
        if (len == '18') {
            var arrInt = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2);
            var arrCh = new Array('1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2');
            var cardTemp = 0, i, valnum;
            for (i = 0; i < 17; i++) {
                cardTemp += card.substr(i, 1) * arrInt[i];
            }
            valnum = arrCh[cardTemp % 11];
            return valnum == card.substr(17, 1);
        }
        return false;
    };
    //15位转18位身份证号
    var changeFivteenToEighteen = function (card) {
        if (card.length == '15') {
            var arrInt = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2);
            var arrCh = new Array('1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2');
            var cardTemp = 0, i;
            card = card.substr(0, 6) + '19' + card.substr(6, card.length - 6);
            for (i = 0; i < 17; i++) {
                cardTemp += card.substr(i, 1) * arrInt[i];
            }
            card += arrCh[cardTemp % 11];
            return card;
        }
        return card;
    };
    //校验数字value为数字size为长度
    var checkInputNum = function(value){
        var reg = /^[0-9]*$/
        return reg.test(value);

    }
    //校验组织机构代码
    var checkOrganizeCode = function (value) {
        //校验长度与连字符
        if (value.length == 10 && value.charAt(8) == '-') {
            value = value.substring(0, 8) + value.charAt(9);
        } else {
            return false;
        }
        var reg = /^$|^[0-9|A-Z]{8}[0-9|X]$/;
        var str = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        var ws = [3, 7, 9, 10, 5, 8, 4, 2];
        var sum = 0;
        if (reg.test(value) == false) {
            return false;
        } else {
            for (var i = 0; i < value.length - 1; i++) {
                //取字符串前8位的每位数字
                var temp = value.charAt(i);
                //当数字为"0"到"9"时
                if (str.indexOf(temp) == -1) {
                    //当数字为0到9时,计算每位数字与参数的积并累加求和
                    sum = sum + parseInt(temp) * ws[i];
                } else {
                    //当数字为"A"到"Z"时,计算每位数字与参数的积并累加求和
                    sum = sum + (str.indexOf(temp) + 10) * ws[i];
                }
            }
            if ((value.length != 0)) {
                if (((11 - sum % 11) == 10) && (value.charAt(8) != "X")) {
                    return false;
                } else if (((11 - sum % 11) == 11) && (value.charAt(8) != "0")) {
                    return false;
                } else if ((11 - sum % 11) < 10 && (11 - sum % 11) != value.charAt(8)) {
                    return false;
                }
            }
        }

        return true;
    };

    angular.module('mc.util', [])
        .factory('$$util', [function () {

            var timestampGap;  //本地和服务器时间的差异

            var globals;        //全局变量

            /**
             * 验证字符串日期格式
             * @param _date 日期
             * @param isTime true带时间 false不带时间
             * @returns {boolean}
             */
            var verifyDate = function (_date, isTime) {

                var DATE_VALID1 = /^[0-9]{4}-(((0[13578]|(10|12))-(0[1-9]|[1-2][0-9]|3[0-1]))|((0[469]|11)-(0[1-9]|[1-2][0-9]|30))|(02-(0[1-9]|1[0-9]|2[0-8])))$/;
                var DATE_VALID2 = /^[0-9]{4}-(((0[13578]|(10|12))-(0[1-9]|[1-2][0-9]|3[0-1]))|((0[469]|11)-(0[1-9]|[1-2][0-9]|30))|(02-(0[1-9]|1[0-9]|2[0-9])))$/;

                var validationData = function (regex, data) {
                    return regex.test(data) ? true : false;
                };

                var result = false;
                var date = _date.replace(/-|\s|:/g, '');
                date = date.substring(0, 4) + '-' + date.substring(4, 6) + '-' + date.substring(6, 8);
                if (date.substring(0, 4) % 4 == 0) {
                    result = validationData(DATE_VALID2, date);
                } else {
                    result = validationData(DATE_VALID1, date);
                }
                return result;
            };

            return {

                /**
                 * 计算日期之间的差值
                 * @param beginTime
                 * @param endTime
                 * @param timeType day－天 sec－秒
                 */
                dateDiff: function (beginTime, endTime, timeType) {
                    var _time = '';//返回值

                    //确保日期非空／未定义
                    if (beginTime && endTime) {
                        beginTime = angular.isDate(beginTime) ? beginTime : verifyDate(beginTime, true) ? beginTime.dateStringConversion() : "";
                        endTime = angular.isDate(endTime) ? endTime : verifyDate(endTime, true) ? endTime.dateStringConversion() : "";
                        //不符合日期格式
                        if (beginTime == '' || endTime == '')
                            return false;

                        var newTime = Math.abs(endTime.getTime() - beginTime.getTime());//计算时间差毫秒
                        if (timeType == 'day') {
                            _time = Math.ceil(newTime / (24 * 3600 * 1000)) + 1;//计算相差天数
                        } else if (timeType == 'sec') {
                            _time = Math.ceil(newTime / 1000);//计算相差秒
                        }
                    } else {
                        return false;
                    }

                    return _time;
                },

                //设置服务器和本地时间戳的差异
                setTimestampGap: function (serverTimestamp) {
                    console.log('设置服务器时间');
                    timestampGap = serverTimestamp.dateStringConversionTime().getTime()- Date.now();
                    return timestampGap;
                },

                //获取服务器时间
                getServerTimestamp: function () {
                    var newDate= new Date(Date.now() + timestampGap);
                    return newDate;
                },

                //设置全局变量
                setGlobals: function (_globals) {
                    console.log('设置全局变量');
                    globals = _globals;
                },

                //获取指定全局变量
                getGlobal: function (key) {
                    return globals[key];
                },
                //
                checkInputNum:function(value){
                    return  checkInputNum(value);
                },
                //四则运算
                //除
                floatDiv:function(a,b){
                    return floatDiv(a,b)
                },
                //加
                floatAdd:function(arg1,arg2){
                    return floatAdd(arg1,arg2)
                },
                //减
                floatSub:function (arg1,arg2){
                    return floatSub(arg1,arg2)
                },
                //乘
                floatMul:function (arg1,arg2) {
                    return floatMul(arg1,arg2)
                },
                translateEnter:function (str) {
                    return translateEnter(str)
                }
            };

        }])
        /**
         * @ngdoc directive
         * @name $$cherry.directive:idCard
         * @description
         * 用于监听身份证ngModel，用来判断身份证号码是否符合规范
         * @restrict A
         * @scope
         * @param {string} idCard 证件类型
         * @param {string} ngModel ngModel绑定值
         * @param {string} isVerifyTerm 前置条件
         * @example
         <example module="cherry.directive">
         <file name="index.html">
         <input type="text"
         is-verify-term="proposal.infoToView.ownereQually"
         id-card="insuredIdentifyType"
         ng-model="proposal.BC.prpTinsured.insuredIdentifyNumber" />
         </file>
         </example>
         */
        .directive('idCard', ['$timeout', function ($timeout) {
            return {
                require: 'ngModel',
                scope: {
                    idCard: '=',
                    ngModel: '=',
                    isVerifyTerm: '='
                },
                restrict: 'A',
                compile: function () {
                    function validIdCard(value) {
                        //校验长度，类型
                        return isCardNo(value) && checkProvince(value) && checkBirthday(value) && checkSex(value) && checkParity(value);
                    }

                    //校验身份证
                    var _validFn = function (ctrl, element, attrs, $scope, target) {
                        if ($scope.ngModel == '') {
                            ctrl.$setValidity(attrs.name, true);
                            return;
                        }
                        if(attrs.warnText == '组织机构代码'){
                            if(('switchOragnizeCode') == '1'){
                                var _result = checkOrganizeCode($scope.ngModel);
                            }else{
                                return false;
                            }
                        }else{
                            var _result = validIdCard($scope.ngModel);
                        }
                        if (!_result && $scope.ngModel){
                            //$(element).blur();
                            $timeout(function(){
                                $scope.ngModel = "";
                                if(attrs.required){
                                    $(element).addClass('ng-invalid');
                                }
                                if(!$scope.isVerifyTerm){//校验前置条件,通过，或者不需要前置时验证
                                    $(element).focus();
                                    if(target != 'switch'){
                                        layerMsg(attrs.warnText+'不符合规范');
                                    }
                                }
                            });
                        }else{
                            $(element).removeClass('ng-invalid');
                        }
                    };
                    return function ($scope, element, attrs, ctrl) {
                        element.on('blur', function () {
                            _validFn(ctrl, element, attrs, $scope, 'normal');
                        });
                        $scope.$parent.$watch(attrs.idCard,function(newData,oldData){
                            if(newData == '01'){//证件类型是身份证
                                $timeout(function(){
                                    _validFn(ctrl, element, attrs, $scope, 'switch');
                                });                            }
                        });
                    }
                }
            }
        }])
        /**
         * @ngdoc directive
         * @name $$cherry.directive:dateFormat
         * @description
         * dateFormat，用于监听日期ngModel，用来处理 yyyy-mm-dd hh:mm:ss 显示 yyyy-mm-dd格式的日期
         * @restrict A
         * @example
         <example module="cherry.directive">
         <file name="index.html">
         <input type="text" ng-model="proposal.CI.prpTmain.immeValidStartDate"  date-format />
         </file>
         </example>
         */
        .directive('dateFormat', ['$filter',function($filter) {
            var dateFilter = $filter('date');
            return {
                require: 'ngModel',
                link: function(scope, elm, attrs, ctrl) {

                    function formatter(value) {
                        if(value){
                            if(angular.isDate(value)){
                                return dateFilter(value, 'yyyy-MM-dd'); //format
                            }else{
                                return dateFilter(value.dateStringConversionTime(), 'yyyy-MM-dd'); //format
                            }
                        }
                    }

                    function parser() {
                        return ctrl.$modelValue;
                    }

                    scope.$parent.$watch(attrs.ngModel,function(){
                        ctrl.$formatters.push(formatter);
                        ctrl.$parsers.unshift(parser);
                    });

                }
            };
        }]);
});