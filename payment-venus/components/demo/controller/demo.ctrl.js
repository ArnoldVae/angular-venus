/**
 * Created by martin on 2017/4/16.
 */
define([
],function () {
    'use strict';
    function DemoCtrl($scope,$q,$timeout,$http,$$venus,$modal,$state,$translatePartialLoader,$translate){
        //国际化
        $scope.person = {
            name:'太阳',
            age:'20'
        };
        //加载本部分语言包
        $translatePartialLoader.addPart('demo');
        //选择语言
        $scope.switchLanguage = function (key) {
            $translate.use(key);
            //变量显示，模拟接口返回
            if(key == 'en-us'){
                $scope.person = {
                    name:'sun',
                    age:'twenty'
                };
            }

            if(key == 'zh-cn'){
                $scope.person = {
                    name:'太阳',
                    age:'20'
                };
            }
        };

        //点击查看控制器使用国际化
        $scope.goTranslate = function () {
            layerMsg($translate.instant("modalMessage"),"success");//通过key值获取value值
        };

        $scope.test="打印了";
        var testTime=1478152925667;
        console.log(new Date(testTime).getTargetDate(1,0,0).dateConversionTime().dateStringConversionTime())
        //双击域测试数据
        $scope.martin={
            companyCode:''
        };
        //多选表格测试
        $scope.deleteTarget=function(){
            console.log(this.data);
            layerMsg('删除成功','success')
        }
        $scope.modifyTarget=function () {
            console.log(this.data);
            layerMsg('修改成功','success')
        }
        $scope.showTarget=function () {
            console.log(this.data);
            layerMsg('调用成功','success')
        }
        $scope.titleNames=[
            {
                "name":"表单名称1"
            },
            {
                "name":"表单名称2"
            },
            {
                "name":"表单名称3"
            },
            {
                "name":"表单名称4"
            },
            {
                "name":"表单名称5"
            },
            {
                "name":"表单名称6"
            },
            {
                "name":"表单名称7"
            },
        ]
        $scope.lists=[
            {
                "name1":"数值1",
                "name2":"数值2",
                "name3":"数值3",
                "name4":"数值4",
                "name5":"数值5",
                "name6":"数值6",
                "name7":"数值7",
            },
            {
                "name1":"胡大大8",
                "name2":"胡大大9",
                "name3":"胡大大10",
                "name4":"胡大大11",
                "name5":"胡大大12",
                "name6":"胡大大13",
                "name7":"胡大大14",
            },
            {
                "name1":"啦啦啦15",
                "name2":"啦啦啦16",
                "name3":"啦啦啦17",
                "name4":"啦啦啦18",
                "name5":"啦啦啦19",
                "name6":"啦啦啦20",
                "name7":"啦啦啦21",
            },
            {
                "name1":"张伟22",
                "name2":"张伟23",
                "name3":"张伟24",
                "name4":"张伟25",
                "name5":"张伟26",
                "name6":"张伟27",
                "name7":"张伟28",
            },
            {
                "name1":"雪飞29",
                "name2":"雪飞30",
                "name3":"雪飞31",
                "name4":"雪飞32",
                "name5":"雪飞33",
                "name6":"雪飞34",
                "name7":"雪飞35",
            },
            {
                "name1":"ee36",
                "name2":"ee37",
                "name3":"ee38",
                "name4":"ee39",
                "name5":"ee40",
                "name6":"ee41",
                "name7":"ee42",
            },
            {
                "name1":"ee782132132143",
                "name2":"ee782132132144",
                "name3":"ee782132132145",
                "name4":"ee782132132146",
                "name5":"ee782132132147",
                "name6":"ee782132132148",
                "name7":"ee782132132149",
            },
        ]
        $scope.reloadData=function(){
            alert('reload')
        };

        $scope.data={
            payData:{
                "transactionNo": "2000",
                "centerCode": "2000",
                "comName":"北京银行",
                "operatorCode": "2000",
                "operatorName": "2000",
                "operatorDate": "2017/9/11",
                "currenCY": "CNY",
                "sumFee": 2000,
                "exchangeRate": 2000,
                "sumFeeCny": 2000,
                "tranoStatus": "1",
                "tranoDate": "2017/9/11",
                "payWay": "1",
                "validStatus": "1",
                "branchCode": "2000",
                "accbookType": null,
                "accbookCode": null,
                "yearMonth": null,
                "voucherNo": null,
                "payRefDate": null,
                "centerName": null,
                "payNoticeNo": null,
                "preoperatorCode": null,
                "preoperatorName": null,
                "preoperatorDate": null,
                "prepayWay": null,
                "pretranoStatus": null,
                "checkAccount": null,
                "checkDate": null,
                "checkBank": null,
                "registerDate": null,
                "jfcdFlag": null,
                "printFlag": "1",
                "inputDate": "2017/9/11",
                "appliCode": null,
                "appliName": "李阳",
                "prpJunjfcdplanDtoList":[
                    {
                        "certiID":"1003",
                        "certiType":"1",
                        "certiNo":"1000",
                        "policyNo":"1000",
                        "planserialNo":1,
                        "payRefreaSon":"HED",
                        "classCode":"1",
                        "riskCode":"1",
                        "contractNo":"1",
                        "appliCode":"1",
                        "appliName":"杜月笙",
                        "insuredCode":"戴先生",
                        "insuredName":"蒋先生",
                        "startDate":"2017-09-11",
                        "endDate":"2017-09-11",
                        "validDate":"2017-09-11",
                        "payNo":1,
                        "currenCY1":"CNY",
                        "premiumPlanFee":789,
                        "planFee":789,
                        "planDate":"2017-11-9",
                        "comCode":"00000000",
                        "makeCom":"00000000",
                        "agentCode":"00000000",
                        "agentName":"军统",
                        "agreementNo":"123456",
                        "handler1Code":"1234567",
                        "handler1Name":"江南一枝花",
                        "handlerCode":"123456",
                        "underwriteDate":"2017-09-11",
                        "centerCode":"00000000",
                        "currenCY2":"CNY",
                        "exchangeRate":null,
                        "prepayrefFee":null,
                        "certiStatus":"0",
                        "operateDate":"2017-09-11",
                        "poaType":null,
                        "poaCode":null,
                        "itemStatus":"1",
                        "taskID":null,
                        "attribute1":null,
                        "attribute2":null,
                        "attribute3":null,
                        "attribute4":null,
                        "attribute5":null,
                        "attribute6":null,
                        "insuredType":null,
                        "inputDate":null,
                        "validNo":null,
                        "demandNo":null,
                        "uFlag":null,
                        "extProposalNo":null,
                        "accountName":null,
                        "account":null,
                        "dataSource":null,
                        "subsidyCode":null,
                        "transactionNo":null,
                        "transnobackDate":null
                    },
                    {
                        "certiID":"1004",
                        "certiType":"1",
                        "certiNo":"1000",
                        "policyNo":"1000",
                        "planserialNo":1,
                        "payRefreaSon":"HED",
                        "classCode":"1",
                        "riskCode":"1",
                        "contractNo":"1",
                        "appliCode":"1",
                        "appliName":"杜月笙",
                        "insuredCode":"戴先生",
                        "insuredName":"蒋先生",
                        "startDate":"2017\/9\/1 08:31:47",
                        "endDate":"2017\/12\/11 08:31:53",
                        "validDate":"2017\/9\/1 08:32:05",
                        "payNo":1,
                        "currenCY1":"CNY",
                        "premiumPlanFee":789,
                        "planFee":789,
                        "planDate":null,
                        "comCode":"00000000",
                        "makeCom":"00000000",
                        "agentCode":"00000000",
                        "agentName":"军统",
                        "agreementNo":"123456",
                        "handler1Code":"1234567",
                        "handler1Name":"江南一枝花",
                        "handlerCode":"123456",
                        "underwriteDate":"2017\/9\/1 08:34:44",
                        "centerCode":"00000000",
                        "currenCY2":"CNY",
                        "exchangeRate":null,
                        "prepayrefFee":null,
                        "certiStatus":"0",
                        "operateDate":"2017\/9\/1 08:36:51",
                        "poaType":null,
                        "poaCode":null,
                        "itemStatus":"1",
                        "taskID":null,
                        "attribute1":null,
                        "attribute2":null,
                        "attribute3":null,
                        "attribute4":null,
                        "attribute5":null,
                        "attribute6":null,
                        "insuredType":null,
                        "inputDate":null,
                        "validNo":null,
                        "demandNo":null,
                        "uFlag":null,
                        "extProposalNo":null,
                        "accountName":null,
                        "account":null,
                        "dataSource":null,
                        "subsidyCode":null,
                        "transactionNo":null,
                        "transnobackDate":null
                    }
                ]
            }
        }
        //打印测试
        /**
         * 打印选择表单
         * @param target
         * @param proposalNo
         */
        var printer=undefined;
        var _printData = undefined;
        window.VENUS.feedbackData = function(){
            if(printer)
                printer.transmittingData(_printData);
        };
        $scope.printTest=function(){
            _printData ={
               test:"111"
            };
            $scope.url = 'components/demo/print/printTest.html';
            printer = window.open($scope.url);
            //window.print();
        }
        $scope.printQuote=function(){

        }
       /* angular.element().ready(function () {
            //模块手动加载
            angular.bootstrap($("#ng-app"),["DemoCtrl"]);
        });*/

        /**
         * 双击域绑定数据
         */
        $scope.a={
            businessCode:'T',
            businessValue:'比例合同'
        };
        $scope.insuredIdentifyType='';
        $scope.IdentifyNumber='';


        /**
         * 焦点定位测试
         */
        $scope.ltest=function(){
            $$venus.Focus(
                "selectTest"
            ).then(
                function (Ele) {
                    if (angular.isDefined(Ele)) {
                        $timeout(function () {
                            Ele.focus();
                        },1000)
                    } else {
                        layerMsg('ok')
                    }
                }
            );
        };
        $scope.modalTest=function(){
            $modal.open({
                templateUrl: 'components/demo/tpl/modal/modalTest.html',
                resolve: {

                },
                controller: function ($scope, $modalInstance) {
                    $scope.test1=function(){
                        $$venus.Focus(
                            "modalTest"
                        ).then(
                            function (Ele) {
                                if (angular.isDefined(Ele)) {
                                    $timeout(function () {
                                        Ele.focus();
                                    },1000)
                                } else {
                                    layerMsg('ok')
                                }
                            }
                        );
                    }



                }
            }).result.then(function (record) {

            });

        };
        //end






        // $scope.test=function(){
        //     var deferred = $q.defer();
        //     deferred.promise.cancel=function(){
        //         alert('done')
        //     };
        //     $timeout(function(){
        //         deferred.resolve('12313');
        //
        //     },3000);
        //     return deferred.promise
        //
        // };

        // mc-action-button
        $scope.test = function() {
            var deferred = $q.defer();

            var _t= $timeout(function() {

                $scope.showFlag=false;

                deferred.resolve();
            },1000);

            deferred.promise.cancel = function(){
                $timeout.cancel(_t);
            };

            return deferred.promise;
        };



        $scope.jiekou=function(){
            var canceller=$q.defer();

            var result =
                $http({
                    method: "POST",
                    dataType: "JSON",
                    contentType: "application/json; charset=UTF-8",
                    // url: 'http://database.duapp.com/jupiter/fcoCAbstracts/query',
                    url: '/payment-web/prpJVoucherController/queryPayRef',
                    headers: {},
                    data: {"certiNo":"","contractNo":"","policyNo":"","riskCode":"","appliName":"","startDate":"","insuredName":"","operateDate":"","comCode":"","agentCode":"","handler1Code":"","businessNature":"","currency1":"","jfeeflag":"","pageNo":1,"pageSize":"20"},
                    timeout:canceller.promise
                })
                    .success(function (data) {
                        // data = $$adapter.imports('addView', data);
                        console.log(data);
                        // alert(data)
                    })
                    .error(function (e) {
                        console.log(e);
                    });

            result.cancel = function() {
                console.log('canceld');
                canceller.resolve();
            };
            return result;
        };







        $scope.showFlag=true;
        $scope.deleteFn=function(){
            var deferred = $q.defer();

            var _t=function(){
                $scope.showFlag=false;
                deferred.resolve();

            };

            deferred.promise.cancel = function(){
                $scope.showFlag=false;
            };

            return deferred.promise;

        };

        //action-button
        $scope.demo111=function(){
            console.log('demo');

            var _t=$http({
                method: "POST",
                dataType: "JSON",
                contentType: "application/json; charset=UTF-8",
                url: '/demo',
                headers: {},
                data: '123'
            })
                .success(function (data) {
                    // data = $$adapter.imports('addView', data);
                    console.log(data);
                    alert(data)
                })
                .error(function (e) {
                    console.log(e);
                });
            _t.cancel = function(){
                // _t.cancel(_t);
                // deferred.resolve();
                return _t.error
            };
            return _t;

        };
        //end action-button




        $scope.demo={
            demo:'H'
        };
        //比例合约
        $scope.digest1 = {
            basic: {
                "abstractType":'',//关联相关摘要表类型
                "id": "",  //基本信息
                "traceId": "",//轨迹Id
                "relateAbstractNo": "",//相关摘要表号
                "abstractNo": "",//摘要表号
                "businessType": 'F',//业务类型
                "businessYear": "",//业务年度
                "classCode": "H",//险类
                "riskCode": "H00",//险种
                "inReinsCode": "001",//分出公司代码
                "inReinsName": "泰康人寿",//分出公司
                "contractName": "泰康人寿",//合同名称
                "brokerRefNo": "",//经纪人参考号
                "inReinsBussnessNo": "",//分出人业务编号
                "accPeriodType": "月度账单",//账单期类型
                "startDate": "2017-2-10",//起期
                "endDate": "",//止期
                "extendDate": "",//延期
                "inReinsEPI": "",//合同EPI
                "brokerEPI": "",//保险经纪EPI
                "cashLossValue": "",//现金赔款限额
                "commitDate": "",//确认日期
                "premiumAdjustTime": "",//保费调整时间
                "gNEPI": "",//GNEPI
                "taxRate": "",//税率
                "state": "",//主档状态
                "closeFlag": "",//是否关卷
                "createUserCode": "",//创建人代码
                "createDate": "",//创建日期
                "operateUserCode": "",//更新人代码
                "operateDate": ""//,更新日期
            },
            //layers: [{}],
            subitems: [{},{}],
            reinsurers: [
                {
                    reinsName:"中国人寿",
                    color:'red',
                    percentage:"20%"
                },{
                    reinsName:'中国平安',
                    color:"yellow",
                    percentage:"30%"
                }]
        };

        /**
         * button-group
         */
        //数据
        $scope.btns=[
            {title:"tab1",index:"1",active:false,btnStyle:{'border-radius': "50%"}},
            {title:"tab2",index:"2",active:false,btnStyle:{'border-radius': "50%"}},
            {title:"tab3",index:"3",active:true,btnStyle:{'border-radius': "50%"}},
            {title:"tab4",index:"4",active:false,btnStyle:{'border-radius': "50%"}},
            {title:"tab5",index:"5",active:false,btnStyle:{'border-radius': "50%"}}
        ];

        //回调函数
        $scope.changeMenu=function(index){
            $scope.showFlag=index;
        };





        function getNodes(data,comCode){
            var nodes=[];
            $.each(data,function(index,target){
                //如果相等则为第一层
                if(index<data.length){
                    if(target.upperComCode==target.comCode){
                        var first=target;
                        //放到nodes里面
                        nodes.push(first);
                        //然后删除此节点防止死循环
                        data.splice(index,1);
                        first.nodes=getNodes(data,first.comCode);
                    }
                    else if(target.upperComCode==comCode){
                        console.log(target,"target");
                        target.nodes=getNodes(data,target.comCode);
                        nodes.push(target)
                    }
                }


            });
            console.log(nodes,'nodes');
            return nodes;
        }



        $scope.todoList=[
            {checked:false},
            {checked:true},
            {checked:false},
            {checked:false}
        ];
        $scope.toggleItem=function(data){
            alert(data.checked);
        };

        $scope.sexCodes = [
            {"code": 'M', "value": '男'},
            {"code": 'F', "value": '女'}
        ];

        /**
         * 初始化函数
         */
        var init=function () {
            $scope.infoToView={
                //勾选状态
                'checkStatus':{
                    'checkedSceneAll':false,//收付场景
                    'checkedTypeAll':false
                },
                "payReason":false,
                //收付原因维护数据
                "paymentMaintenance":[
                    {
                        "PayRefReason": "PayRefReason",//收付类型代码
                        "PayRefReasonCode": "收付原因",//收付类型名称
                        "PayReason": "R10",//收付原因代码
                        "PayReasonCode": "签单收保费",//收付原因名称
                        "fountCode": "r10",//外部代码
                        "isValid": "是",//是否有效
                        "createTime":"2017/1/1" //创建日期
                    }
                ],
                //收付场景查询条件
                'paymentRecScene':{
                    'payType':'',//收付类型
                    'payName':'',//收付类型名称
                    'payItem':'',//场景代码
                    'payItemName':'',//场景名称
                    'validStatus':'0'//是否有效
                },
                //收付场景查询结果模拟数据（暂时）
                'sceneDataList':[
                    {
                        'payType':'A01',//收付类型
                        'payName':'保费挂账',//收付类型名称
                        'payItem':'A222',//场景代码
                        'payItemName':'保费挂账-保费',//场景名称
                        'validStatus':'1',//是否有效
                        'createDate':'2017-01-01',
                        'checked':false
                    },
                    {
                        'payType':'A02',//收付类型
                        'payName':'保费挂账',//收付类型名称
                        'payItem':'A222',//场景代码
                        'payItemName':'保费挂账-保费',//场景名称
                        'validStatus':'1',//是否有效
                        'createDate':'2017-01-01',
                        'checked':false
                    },
                    {
                        'payType':'A03',//收付类型
                        'payName':'保费挂账',//收付类型名称
                        'payItem':'A222',//场景代码
                        'payItemName':'保费挂账-保费',//场景名称
                        'validStatus':'0',//是否有效
                        'createDate':'2017-01-01',
                        'checked':false
                    }, {
                        'payType':'A04',//收付类型
                        'payName':'保费挂账',//收付类型名称
                        'payItem':'A222',//场景代码
                        'payItemName':'保费挂账-保费',//场景名称
                        'validStatus':'0',//是否有效
                        'createDate':'2017-01-01',
                        'checked':false
                    }, {
                        'payType':'A05',//收付类型
                        'payName':'保费挂账',//收付类型名称
                        'payItem':'A222',//场景代码
                        'payItemName':'保费挂账-保费',//场景名称
                        'validStatus':'',//是否有效
                        'createDate':'2017-01-01',
                        'checked':false
                    }, {
                        'payType':'A06',//收付类型
                        'payName':'保费挂账',//收付类型名称
                        'payItem':'A222',//场景代码
                        'payItemName':'保费挂账-保费',//场景名称
                        'validStatus':'',//是否有效
                        'createDate':'2017-01-01',
                        'checked':false
                    }
                ],
                //收付类型查询条件
                'paymentRecType':{
                    'payType':'',//收付类型
                    'payName':'',//收付类型名称
                    'validStatus':'0'//是否有效
                },
                //收付类型查询结果模拟数据（暂时）
                'typeDataList':[
                    {
                        'payType':'A01',//收付类型
                        'payName':'保费挂账',//收付类型名称
                        'cashFlowCode':'A222',//场景代码
                        'cashFlowName':'保费挂账-保费',//场景名称
                        'redFlag':'1',//红冲标识
                        'fundDcFlag':'1',
                        'createDate':'2017-01-01',
                        'validStatus':'1',
                        'checked':false
                    },
                    {
                        'payType':'A02',//收付类型
                        'payName':'保费挂账',//收付类型名称
                        'cashFlowCode':'A222',//场景代码
                        'cashFlowName':'保费挂账-保费',//场景名称
                        'redFlag':'1',//红冲标识
                        'fundDcFlag':'1',
                        'createDate':'2017-01-01',
                        'validStatus':'1',
                        'checked':false
                    },
                    {
                        'payType':'A03',//收付类型
                        'payName':'保费挂账',//收付类型名称
                        'cashFlowCode':'A222',//场景代码
                        'cashFlowName':'保费挂账-保费',//场景名称
                        'redFlag':'1',//红冲标识
                        'fundDcFlag':'1',
                        'createDate':'2017-01-01',
                        'validStatus':'1',
                        'checked':false
                    },
                    {
                        'payType':'A04',//收付类型
                        'payName':'保费挂账',//收付类型名称
                        'cashFlowCode':'A222',//场景代码
                        'cashFlowName':'保费挂账-保费',//场景名称
                        'redFlag':'1',//红冲标识
                        'fundDcFlag':'1',
                        'createDate':'2017-01-01',
                        'validStatus':'1',
                        'checked':false
                    },
                    {
                        'payType':'A05',//收付类型
                        'payName':'保费挂账',//收付类型名称
                        'cashFlowCode':'A222',//场景代码
                        'cashFlowName':'保费挂账-保费',//场景名称
                        'redFlag':'1',//红冲标识
                        'fundDcFlag':'1',
                        'createDate':'2017-01-01',
                        'validStatus':'1',
                        'checked':false
                    },
                    {
                        'payType':'A06',//收付类型
                        'payName':'保费挂账',//收付类型名称
                        'cashFlowCode':'A222',//场景代码
                        'cashFlowName':'保费挂账-保费',//场景名称
                        'redFlag':'1',//红冲标识
                        'fundDcFlag':'1',
                        'createDate':'2017-01-01',
                        'validStatus':'1',
                        'checked':false
                    }
                ],
                //银行账号维护数据
                'BankAccountData':[
                    {
                        "accountCode":"200601040009956", //账户代码
                        "comCode":"212",  //归属机构代码
                        "comName":"总公司",   //归属机构名称
                        "accountAttribute":"业务支出户",   //账户属性
                        "currency":"CNY",    //币别
                        "bankCode":"1001",    //银行代码
                        "bankName":"农行",   //银行名称
                        "bankAccount":"北京市分行崇文区支行南三环支行",  //开户行名称
                        "bankaddress":"北京",   //银行地址
                        "accountKye":"1002010101",  //科目代码
                        "validity":"有效"    //有效性
                    }
                ]
            };
        };
        init();

    }
    return DemoCtrl;
});
// define([
//     'app'
// ],function (app) {
//     'use strict';
//     app.registerController('CollectionCtrl', ['$scope',
//         function ($scope) {
//
//
//         }
//
//     ])
// });
