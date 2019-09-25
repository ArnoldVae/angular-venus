var _printData;
var transmittingData = function (data) {
    if(data){
        _printData = data;
    }
};

require.config({
    baseUrl:'',
    paths: {
        'jquery':'../../../../../lib/jquery/jquery.min',
        'angular':'../../../../../lib/angular/angular1.2.20',
        'codes':'../../../../../mock/data/codes.dev',
        'ptcode':'../../../../../widgets/mc.pt.code'
    },
    shim: {
        'jquery':{
            exports:'jquery'
        },
        'angular':{
            exports:'angular'
        }
    },
    priority: [
        'jquery','angular'
    ],
    waitSeconds: 250
});

require([
    'jquery',
    'angular',
    'ptcode'
],function ($,angular) {
    var printDemo = angular.module('printDemo',['pt.code']);
    printDemo.controller('PrintCtrl',['$scope','$timeout','$http',function ($scope, $timeout,$http) {
        $(".spanShow").css("display","none");
        window.opener.VENUS.feedbackData();
        $scope.printData=_printData;
        $scope.printDataList=_printData.prpJunjfcdplanDtoList[0];
        var date = new Date;
        $scope.printData.date = date;//打印日期
        //收款单位
        $scope.printData.collectOrg = _printData.user.centerCode+"-"+_printData.user.centerName;
        //判断是否有银行信息
        $scope.selectData = {
            "bankAccountNo":"",
            "bankName":""
        };
        var sign = true;
        if($scope.printData.judgeSignAccount!=""){
            $(".selectHide").css("display","none");
            $(".spanShow").css("display","");
            $scope.selectData.bankAccountNo = $scope.printData.judgeSignAccount;
            $scope.selectData.bankName = $scope.printData.judgeSignBankName;
            sign = false
        }else{
            //获取收款信息
            var getBankDto=function () {
                $scope.printDto = {};
                $scope.printDto.centerCode = _printData.centerCode;
                $scope.printDto.payFlag = "1";
                var _data =$scope.printDto;
                $http({
                    method: "POST",
                    dataType: "JSON",
                    contentType: "application/json; charset=UTF-8",
                    url: "/api/payment/prpJTransactionMain/print",
                    headers: {},
                    data:_data
                })
                    .success(function (data) {
                        $scope.printInfo = data.content.content;
                    })
                    .error(function (e) {
                        alert("未获取到收款信息！")
                    });
            };
            getBankDto()
        }
        //打印
        $scope.printTest = function () {
            if($scope.selectData.bankAccountNo == ""){
                alert("请录入银行账号！")
                return false
            }
            savePrintDto();
            $(".selectHide").css("display","none");
            $(".spanShow").css("display","");
            $("#printImg").css("display","none");
            window.print();
            if(sign){
                $(".selectHide").css("display","");
                $(".spanShow").css("display","none");
            }
            $("#printImg").css("display","");
            return false;
        };
        //打印保存
        var savePrintDto=function () {
            $scope.printData.judgeSignAccount = $scope.selectData.bankAccountNo;
            $scope.printData.judgeSignBankName = $scope.selectData.bankName;
            var _data =$scope.printData;
            $http({
                method: "POST",
                dataType: "JSON",
                contentType: "application/json; charset=UTF-8",
                url: "/api/payment/prpJTransactionMain/printEndSave",
                headers: {},
                data:_data
            })
                .success(function (data) {
                   console.log(data);
                })
                .error(function (e) {

                });
        };

    }]);
    printDemo.filter('Chinese',function(){
        return function(input){
            var numberValue=new String(Math.round(input*100)); // 数字金额
            var chineseValue=""; // 转换后的汉字金额
            var String1 = "零壹贰叁肆伍陆柒捌玖"; // 汉字数字
            var String2 = "万仟佰拾亿仟佰拾万仟佰拾元角分"; // 对应单位
            var len=numberValue.length; // numberValue 的字符串长度
            var Ch1; // 数字的汉语读法
            var Ch2; // 数字位的汉字读法
            var nZero=0; // 用来计算连续的零值的个数
            var String3; // 指定位置的数值
            if(len>15){
                alert("超出计算范围");
                return "";
            }
            if (numberValue==0){
                chineseValue = "零元整";
                return chineseValue;
            }

            String2 = String2.substr(String2.length-len, len); // 取出对应位数的STRING2的值
            for(var i=0; i<len; i++){
                String3 = parseInt(numberValue.substr(i, 1),10); // 取出需转换的某一位的值
                if ( i != (len - 3) && i != (len - 7) && i != (len - 11) && i !=(len - 15) ){
                    if ( String3 == 0 ){
                        Ch1 = "";
                        Ch2 = "";
                        nZero = nZero + 1;
                    }
                    else if ( String3 != 0 && nZero != 0 ){
                        Ch1 = "零" + String1.substr(String3, 1);
                        Ch2 = String2.substr(i, 1);
                        nZero = 0;
                    }
                    else{
                        Ch1 = String1.substr(String3, 1);
                        Ch2 = String2.substr(i, 1);
                        nZero = 0;
                    }
                }
                else{ // 该位是万亿，亿，万，元位等关键位
                    if( String3 != 0 && nZero != 0 ){
                        Ch1 = "零" + String1.substr(String3, 1);
                        Ch2 = String2.substr(i, 1);
                        nZero = 0;
                    }
                    else if ( String3 != 0 && nZero == 0 ){
                        Ch1 = String1.substr(String3, 1);
                        Ch2 = String2.substr(i, 1);
                        nZero = 0;
                    }
                    else if( String3 == 0 && nZero >= 3 ){
                        Ch1 = "";
                        Ch2 = "";
                        nZero = nZero + 1;
                    }
                    else{
                        Ch1 = "";
                        Ch2 = String2.substr(i, 1);
                        nZero = nZero + 1;
                    }
                    if( i == (len - 11) || i == (len - 3)){ // 如果该位是亿位或元位，则必须写上
                        Ch2 = String2.substr(i, 1);
                    }
                }
                chineseValue = chineseValue + Ch1 + Ch2;
            }

            if ( String3 == 0 ){ // 最后一位（分）为0时，加上“整”
                chineseValue = chineseValue + "整";
            }

            return chineseValue;

        };
    });
    angular.element().ready(function () {
        angular.bootstrap($("#ng-app1"),['printDemo']);
    });
});