define(['angular', 'constants'], function (angular, constants) {

    angular.module('mc.okButton', [])
    /**
     * <mc-ok-button b-value="{{myValue}}" b-selected-color="#4E3121" b-on-click="okOnClick(index,data)"></mc-ok-button>
     * value：内容
     * isCilck：是否选中，默认不选中
     * b-selected-color: 选中时颜色，默认#53AB6E
     * b-on-click：选择按钮是进行回调
     * 例子：
     * $scope.myValue = [{value:"1111",isCilck:true},"222222","33333333"];
     * $scope.myValue = {value:"1111",isCilck:true};
     * $scope.myValue = "222222";
     */
        .directive('mcButtonGroup', ['$parse', function ($parse) {
            return {
                replace: true,
                restrict: 'AE',
                templateUrl: 'template/mc/buttonGroup/button.group.tpl.html',
                scope: {
                    bValue: "@", // 内容
                    bSelectedColor: "@", // 选中颜色
                    bOnClick: "&" // 点击回调
                },
                link: function (scope, element, attrs) {
                    // 界面使用的数组
                    scope.myData = [];
                    // 解析bValue所得数据
                    var data = undefined;
                    // 按钮样式
                    var btnStyle = undefined;
                    // 对勾样式
                    var okStyle = undefined;
                    // 最后一次的选择
                    var lastIndex = undefined;
                    // 是否为数组
                    var isArray = false;

                    /**
                     * 按钮样式
                     * @param isCilck
                     * @returns {{position: string, padding-top: string, padding-bottom: string, padding-left: string, padding-right: string, background: string, border: string}}
                     */
                    function getBStyle(isCilck) {
                        var color = scope.bSelectedColor || "#53AB6E";
                        return {
                            "position": "relative",
                            // "padding-top": "10px",
                            // "padding-bottom": "10px",
                            "padding": "6px 30px",
                            // "padding-right": "30px",
                            "margin":"0 0 0 30px",
                            "background": "white",
                            "border": isCilck ? "3px solid " + color : "3px rgb(183, 183, 183) solid"
                        }
                    }

                    /**
                     * 获取对勾样式
                     * @returns {{position: string, padding: string, top: string, left: string, color: string, background-color: (string|string)}}
                     */
                    function getOKStyle() {
                        return {
                            "position": "absolute",
                            "padding": "2px",
                            "top": "0px",
                            "left": "0px",
                            "color": "white",
                            "background-color": scope.bSelectedColor || "#53AB6E"
                        }
                    }

                    /**
                     * 鼠标点击事件
                     * @param index
                     */
                    scope.onMousedown = function (index) {
                        var item = undefined;
                        var selectedColor = "#53AB6E";
                        // 不是数组或不是选择自己的情况下
                        if (!isArray || index !== lastIndex) {
                            item = scope.myData[index];
                            scope.myData[index].isCilck = !item.isCilck;
                            selectedColor = scope.bSelectedColor || "#53AB6E";
                            // 更改颜色
                            scope.myData[index].btnStyle.border = item.isCilck ? "3px solid " + selectedColor : "3px rgb(183, 183, 183) solid";
                            // 方法回调
                            scope.bOnClick({index: index, data: scope.myData[index].data});
                        }
                        // 数组并且存在选择
                        if (isArray && lastIndex !== undefined && index !== lastIndex) {
                            item = scope.myData[lastIndex];
                            scope.myData[lastIndex].isCilck = !item.isCilck;
                            selectedColor = scope.bSelectedColor || "#53AB6E";
                            // 更改颜色
                            scope.myData[lastIndex].btnStyle.border = item.isCilck ? "3px solid " + selectedColor : "3px rgb(183, 183, 183) solid";
                        }
                        lastIndex = index;
                    };
                    // 数据为数组
                    if (scope.bValue.indexOf("[") >= 0 && scope.bValue.indexOf("]") >= 0) {
                        isArray = true;
                        data = JSON.parse(scope.bValue);
                        // 循环添加数据
                        for (var i = 0; i < data.length; i++) {
                            // 初始化索引
                            if (data[i].isCilck) {
                                lastIndex = i;
                            }
                            // 得到样式
                            btnStyle = getBStyle(data[i].isCilck);
                            okStyle = getOKStyle();
                            // 放入数组
                            scope.myData.push({
                                value: data[i].value || data[i], // 内容,不是对象就是字符串
                                isCilck: data[i].isCilck, // 是否点击
                                btnStyle: btnStyle,// 按钮样式
                                okStyle: okStyle,// 对勾样式
                                data: data[i]
                            });
                        }
                    } else if (scope.bValue.indexOf("{") >= 0 && scope.bValue.indexOf("}") >= 0) { // 传入对象
                        lastIndex = 0;
                        data = JSON.parse(scope.bValue);
                        // 得到样式
                        btnStyle = getBStyle(data.isCilck);
                        okStyle = getOKStyle();
                        // 放入数组
                        scope.myData.push({
                            value: data.value, // 内容
                            isCilck: data.isCilck, // 是否点击
                            btnStyle: btnStyle, // 按钮样式
                            okStyle: okStyle,// 对勾样式
                            data: data
                        });
                    } else {// 数据为字符串
                        lastIndex = 0;
                        // 得到样式
                        btnStyle = getBStyle(false);
                        scope.myData.push({
                            value: scope.bValue, // 内容
                            isCilck: false, // 是否点击
                            btnStyle: btnStyle,
                            data: scope.bValue
                        });
                    }
                }
            }
        }]);
});
