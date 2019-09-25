define(['angular', 'constants'], function (angular, constants) {

    angular.module('mc.date', [])

        .directive('mcDate', ['$parse', function ($parse) {
            return {
                require: 'mcDate',
                replace: true,
                restrict: 'AE',
                templateUrl: 'template/directive/date.directive.html',
                controller: 'dateCtrl',
                controllerAs: '$date',
                scope: {
                    dData: '=',//数据
                    dDayClick: '&',//日点击事件
                    dMonthChange: '&',//月点击事件
                    dDateFormatSymbol: '@',// 日期格式区分符号（"-"、"/"等）
                    dInitDate: '@',//初始化时间
                    dSize: "@", // 组件大小
                    dIsSetDate: "=", // 是否设置工作日
                    dSetDate: "&",
                    dReSetDate: "&"
                },
                compile: function (tElement, tAttrs) {
                    return function (scope, element, attrs, $date) {
                        //赋值到控制器中
                        $date.data = scope.dData;
                        $date.dateFormatSymbol = scope.dDateFormatSymbol || '-';
                        $date.onMonthClick = function (date) {
                            scope.dMonthChange({date: date});
                        };

                        //日期内容div
                        var dateContent = undefined;
                        // 日期总高度
                        var dateHeight = undefined;
                        // “日”高和宽,默认30px, 减去6根线和2边
                        var daySize = scope.dSize ? (parseInt(scope.dSize) - 6 - 2) / 7 : 34;
                        // 字体大小
                        var textSize = daySize / 3;
                        var textMargin = textSize / 2;
                        // 非工作日数组
                        var nonWorkingDays = [];
                        // 非工作日节点数组
                        var nonWorkingDayNodes = [];
                        // 节点原背景
                        var nodeOldBackground = [];
                        // 一直存在的非工作日数据
                        var alwaysNonWorkingDay = {};

                        /**
                         * 记录非工作日
                         * @param date
                         */
                        function saveColor(date) {
                            // 拆分日期
                            var dateArr = dateSplit(date);
                            var dateArr1 = [];
                            // 循环数据，判断是否存在对应数据
                            for (var i = 0; i < $date.data.length; i++) {
                                // 拆分日期
                                dateArr1 = dateSplit($date.data[i].date);
                                // 保证不会出错
                                if (dateArr.length === 3 && dateArr1.length === 3) {
                                    // 同一天
                                    if (dateArr[0] == dateArr1[0] && dateArr[1] == dateArr1[1] && dateArr[2] == dateArr1[2]) {
                                        $date.data[i].color = "red";
                                        return
                                    }
                                }
                            }
                            // 存放数据
                            $date.data.push({
                                date: dateArr[0] + scope.dDateFormatSymbol + dateArr[1] + scope.dDateFormatSymbol + dateArr[2],
                                color: "red"
                            });
                        }

                        /**
                         * 非工作日期-提交
                         */
                        $date.nonWorkingDaySubmit = function () {
                            scope.dSetDate({data: nonWorkingDays});
                            // 循环修改节点
                            for (var i = 0; i < nonWorkingDays.length; i++) {
                                // 替换标记
                                nonWorkingDayNodes[i].setAttribute("target", nonWorkingDayNodes[i].getAttribute("target").replace(";nonWorkingDay", ""));
                                if (nonWorkingDayNodes[i].children[0].textContent === "") {
                                    // 设置为原本颜色
                                    nonWorkingDayNodes[i].children[1].style.color = "red";
                                } else {
                                    // 设置为原本颜色
                                    nonWorkingDayNodes[i].children[0].style.color = "red";
                                }
                                // 记录颜色的改变
                                saveColor(nonWorkingDays[i].date);
                                // 设置为原本颜色
                                nonWorkingDayNodes[i].style.background = nodeOldBackground[i];
                            }

                            //数据用后端的 暂时不需要记录数据 modify by zhangwei
                            // 指令不消，保存不止
                            // alwaysNonWorkingDay[$date.date.year + "-" + $date.date.month] = angular.copy(nonWorkingDays);
                            // 清空数组数据
                            nonWorkingDays = [];
                            nonWorkingDayNodes = [];
                            nodeOldBackground = [];
                        };

                        $date.nonWorkingDayCancel = function () {
                            //回调方法 add by zhangwei
                            scope.dReSetDate({data:this.date.year+'-'+(parseInt(this.date.month)+1)});

                            // 循环修改节点
                            for (var i = 0; i < nonWorkingDays.length; i++) {
                                // 替换标记
                                nonWorkingDayNodes[i].setAttribute("target", nonWorkingDayNodes[i].getAttribute("target").replace(";nonWorkingDay", ""));
                                // 设置为原本颜色
                                nonWorkingDayNodes[i].style.color = nodeOldBackground[i];
                            }
                            // 清空数组数据
                            nonWorkingDays = [];
                            nonWorkingDayNodes = [];
                            nodeOldBackground = [];
                        };

                        /**
                         * 设置非工作日到数组
                         * @param data
                         */
                        function setNonWorkingDay(data, node) {
                            var target = node.getAttribute("target");
                            for (var i = 0; i < nonWorkingDays.length; i++) {
                                // 数组是否已经存在数据，并且节点属性设置为"true"
                                if (nonWorkingDays[i].date === data.date && target && target.indexOf(";nonWorkingDay") >= 0) {
                                    // 替换标记
                                    node.setAttribute("target", target.replace(";nonWorkingDay", ""));
                                    // 设置为原本颜色
                                    node.style.background = nodeOldBackground[i];
                                    // 删除数据
                                    nonWorkingDays.splice(i, 1);
                                    // 删除节点
                                    nonWorkingDayNodes.splice(i, 1);
                                    // 删除颜色
                                    nodeOldBackground.splice(i, 1);
                                    return
                                }
                            }
                            var targetStr = "";
                            if (target && target.value) {
                                targetStr = target.value + ";nonWorkingDay"
                            } else {
                                targetStr = ";nonWorkingDay"
                            }
                            // 设置标记
                            node.setAttribute("target", targetStr);
                            // 存储原本颜色
                            nodeOldBackground.push(node.style.background || "");
                            //是日期才执行
                            if(!isNaN(parseInt(node.innerText,10))){
                                // 修改颜色
                                node.style.background = "#FFD766";
                                // 存储数据
                                nonWorkingDays.push(data);
                                // 存储节点
                                nonWorkingDayNodes.push(node);
                            }
                        }

                        /**
                         * 创建日期内容框架
                         */
                        function creatDateContentBox() {
                            if (dateContent) {
                                $("#dateBox")[0].removeChild(dateContent);
                            }
                            dateContent = document.createElement('div');
                            dateContent.setAttribute("style", "border-top: 1px grey solid");
                            $("#dateBox")[0].appendChild(dateContent);
                        }

                        /**
                         * 获取取月份天对应位置数组
                         * @param date
                         * @param myData
                         * @returns {Array}
                         */
                        function getMyDate(date, myData) {
                            // 日期位置--以二维数组形式展现
                            var table = [];
                            // 获取月份总天数
                            var totalDays = new Date(date.year, date.month + 1, 0).getDate();
                            // 获取月份一号是星期几
                            var oneWeek = new Date(date.year, date.month, 1).getDay();
                            // 纠正日期(0是星期天)
                            oneWeek = oneWeek === 0 ? 7 : oneWeek;
                            // 获取月份最后一天是星期几
                            var lastWeek = new Date(date.year, date.month, totalDays).getDay();
                            // 纠正日期(0是星期天)
                            lastWeek = lastWeek === 0 ? 7 : lastWeek;
                            // 总共多少周
                            var weeks = (totalDays + oneWeek - 1 + 7 - lastWeek) / 7;
                            // 当前日期索引
                            var currentIndex = 1;
                            //周一到周日备注
                            var remark=[
                                {content:'一'},
                                {content:'二'},
                                {content:'三'},
                                {content:'四'},
                                {content:'五'},
                                {content:'六'},
                                {content:'日'}
                            ];
                            for (var i = 0; i < weeks; i++) {
                                // 一周日期位置
                                var week = [];
                                // 剩余几天
                                var lastDays = 0;
                                // 第一周
                                if (i === 0) {
                                    // 剩余几天
                                    lastDays = 7 - (oneWeek - 1);
                                    while (oneWeek > 1) {
                                        oneWeek--;
                                        // 数据
                                        var data = {
                                            content: ""
                                        };
                                        week.push(data);
                                    }
                                    while (lastDays > 0) {
                                        lastDays--;
                                        // 数据
                                        var data = {
                                            content: currentIndex
                                        };
                                        week.push(addDataToDate(data, myData));
                                        currentIndex++;
                                    }
                                } else if (i === weeks - 1) {// 最后一周
                                    // 剩余几天
                                    lastDays = 7 - lastWeek;
                                    while (lastWeek > 0) {
                                        lastWeek--;
                                        // 数据
                                        var data = {
                                            content: currentIndex
                                        };
                                        week.push(addDataToDate(data, myData));
                                        currentIndex++;
                                    }
                                    while (lastDays > 0) {
                                        lastDays--;
                                        var data = {
                                            content: ""
                                        };
                                        week.push(data);
                                    }
                                } else {// 中间几周
                                    lastDays = 7;
                                    while (lastDays > 0) {
                                        lastDays--;
                                        // 数据
                                        var data = {
                                            content: currentIndex
                                        };
                                        week.push(addDataToDate(data, myData));
                                        currentIndex++;
                                    }
                                }
                                // 将周放入
                                table.push(week);
                            }


                            table.unshift(remark);
                            return table;
                        }

                        /**
                         * 添加数据到日期相应位置
                         * @param date
                         * @param data
                         */
                        function addDataToDate(date, data) {
                            if (data && data instanceof Array) {
                                data.forEach(function (item, index, self) {
                                    if (item.date) {
                                        var dateArr = dateSplit(item.date);
                                        if (dateArr[2] == date.content &&
                                            dateArr[1] == ($date.date.month + 1) &&
                                            dateArr[0] == $date.date.year) {
                                            date.data = item;
                                            return false
                                        }
                                    }
                                });
                                //数据用后端的 暂时不需要记录数据 modify by zhangwei
                                // var nonWorkingDays = alwaysNonWorkingDay[$date.date.year + "-" + $date.date.month];
                                // 非工作日数据存在
                                // if (nonWorkingDays && nonWorkingDays.length > 0) {
                                //     $.each(nonWorkingDays, function (index, nonWorkingDay) {
                                //         var dateArr = dateSplit(nonWorkingDay.date);
                                //         if (dateArr[2] == date.content &&
                                //             dateArr[1] == ($date.date.month + 1) &&
                                //             dateArr[0] == $date.date.year) {
                                //             if (date.data) {
                                //                 date.data.color = nonWorkingDay.color;
                                //             } else {
                                //                 date.data = {color: nonWorkingDay.color};
                                //             }
                                //             return false
                                //         }
                                //     });
                                // }
                            }
                            return date
                        }

                        /**
                         * 创建日期
                         * @param datePosition
                         */
                        function creatDateTable(datePosition) {
                            for (var i = 0; i < datePosition.length; i++) {
                                // 创建行框架
                                var tr = document.createElement('div');
                                // 设置属性
                                tr.setAttribute("style", "text-align: center;width: 100%;height: " + daySize + "px;");
                                // 添加列
                                addTd(tr, datePosition[i]);
                                // 将行添加到div中
                                dateContent.appendChild(tr);
                                // 不是最后则添加横线
                                if (i !== datePosition.length - 1) {
                                    var rowLine = document.createElement('div');
                                    // 设置属性
                                    rowLine.setAttribute("style", "border-top: 1px grey solid;width: 100%;height: 1px;");
                                    dateContent.appendChild(rowLine);
                                }
                                // 计算日历总高度
                                dateHeight += tr.style.height;
                            }
                        }

                        /**
                         * 添加列
                         * @param trNode
                         * @param tdData
                         */
                        function addTd(trNode, tdData) {
                            for (var i = 0; i < tdData.length; i++) {
                                var data = tdData[i];
                                // 创建列框架
                                var td = document.createElement('div');
                                // 设置属性
                                td.setAttribute("style", "text-align: center;width: " + daySize + "px;height: " + daySize + "px;float: left");
                                // 添加点击事件
                                td.onclick = function () {
                                    //如果选中的不是有效日期则不往下执行 add by zhangwei
                                    if(this.innerText.indexOf("今") == -1){//如果不是今，进行下一层判断
                                        if(isNaN(parseInt(this.innerText,10))){
                                            return false
                                        }
                                    }

                                    $(".hasBorder").attr("class", '');
                                    // 改变当前天  去除回车符modify by zhangwei
                                    $date.date.currentDay = this.innerText.replace(/[\r\n]/g, '');
                                    // 赋值需要类型当前日期
                                    data.currentDate = $date.date.year + $date.dateFormatSymbol + ($date.date.month + 1) + $date.dateFormatSymbol + $date.date.currentDay;
                                    // 调用外部函数 change by zhangwei
                                    scope.$apply(function () {
                                        scope.dDayClick({data: data});
                                    });

                                    this.className = 'hasBorder';//选中样式添加 add by zhangwei
                                    if (scope.dIsSetDate) {
                                        // 设置非工作日
                                        setNonWorkingDay({date: data.currentDate, color: "red"}, this);
                                    }
                                };

                                if (data.content === $date.date.today.day &&
                                    $date.date.month === $date.date.today.month &&
                                    $date.date.year === $date.date.today.year) {
                                    // td.style.background = "#00B9FB";
                                    // td.className='isToday';
                                }
                                errOrWaringStyle(td, data);

                                // 添加内容
                                td.appendChild(textContent(data));
                                // 将行添加到tr中
                                trNode.appendChild(td);
                                // 不是最后则添加竖线
                                if (i !== tdData.length - 1) {
                                    var verticalLine = document.createElement('span');
                                    // 设置属性
                                    verticalLine.setAttribute("style", "float: left;border-left: 1px grey solid;width: 1px;height: 100%;");
                                    trNode.appendChild(verticalLine);
                                }
                            }
                        }

                        /**
                         * 判断样式
                         * @param tdNode
                         * @param data
                         */
                        function errOrWaringStyle(tdNode, data) {
                            if (data.data && data.data.type) {
                                // 判断是否为字符串
                                if (data.data.type instanceof Array) {
                                    for (var i = 0; i < data.data.type.length; i++) {
                                        setStyle(tdNode, data.data.type[i]);
                                    }
                                } else {// 字符串
                                    setStyle(tdNode, data.data.type);
                                }
                            }
                        }

                        /**
                         * 设置样式
                         * @param tdNode
                         * @param type
                         */
                        function setStyle(tdNode, type) {
                            switch (type) {
                                case "error": // 冲突
                                    // 添加圆点
                                    tdNode.appendChild(circle());
                                    break;
                                case "warning": // 异常数据
                                    tdNode.style.background = "#FAEB00";
                                    break;
                                case "ok": // 完成
                                    tdNode.style.background = "#12b72b";
                                    break;
                                case "fail": // 失败
                                    tdNode.style.background = "#ea6b78";
                                    break;
                            }
                        }

                        /**
                         * 添加内容
                         * @param data
                         * @returns {Element}
                         */
                        function textContent(data) {
                            var style = "text-align: center;font-size: " + textSize + "px;height: 100%;padding-top: " + textMargin + "px;";
                            var textContent = document.createElement('div');

                            textContent.innerText = data.content;
                            if (data.content === $date.date.today.day &&
                                $date.date.month === $date.date.today.month &&
                                $date.date.year === $date.date.today.year) {
                                textContent.textContent = "今";
                            }
                            // 设置颜色
                            if (data.data && data.data.color) {
                                style += "color: " + data.data.color;
                            }
                            // 设置属性
                            textContent.setAttribute("style", style);
                            return textContent
                        }

                        /**
                         * 画圆点
                         * @returns {Element}
                         */
                        function circle() {
                            var circle = document.createElement('div');
                            // 设置属性
                            circle.setAttribute("style", "margin-top: " + textMargin + "px;margin-right: " + textMargin + "px;width: 6px;height: 6px;background: red;-moz-border-radius: 3px;-webkit-border-radius: 3px;border-radius: 3px;float:right;");
                            return circle
                        }

                        /**
                         * 设置日历表高度
                         */
                        function setTotalHeight() {
                            // 获取头部高度
                            var dateHeadHeight = document.getElementById("dateHead").offsetHeight;
                            // 设置高度
                            $("#dateBox")[0].style.height = dateContent.offsetHeight + dateHeadHeight + 1 + "px";
                            $("#dateBox")[0].style.width = element[0].style.width = (scope.dSize || 246) + "px";
                        }

                        /**
                         * 创建日期内容
                         * @param data
                         */
                        $date.creatDayContent = function (data) {
                            // 创建日期内容框架
                            creatDateContentBox();
                            // 获取取月份天对应位置数组
                            var datePosition = getMyDate($date.date, data);
                            // 创建日历表
                            creatDateTable(datePosition);
                            // 设置日历表高度
                            setTotalHeight();

                        };
                        /**
                         * 创建日期内容
                         * 监听数据变化后重渲染标记
                         * add by zhangwei
                         */
                        scope.$parent.$watch(attrs.dData, function (newValue) {
                            if (newValue) {
                                $date.creatDayContent(newValue);
                            }
                        });
                        /**
                         * 分割日期
                         * @param date
                         * @returns {Array}
                         */
                        function dateSplit(date) {
                            if (date) {
                                var dateFormatSymbol = undefined;
                                // 存在日期格式区分字符
                                if (date.indexOf($date.dateFormatSymbol) >= 0) {
                                    dateFormatSymbol = $date.dateFormatSymbol;
                                } else if (date.indexOf("-") >= 0) {
                                    dateFormatSymbol = "-"
                                } else if (date.indexOf("/") >= 0) {
                                    dateFormatSymbol = "/"
                                }
                                // 存在分隔符
                                if (dateFormatSymbol) {
                                    // 拆分日期为数组
                                    return date.split(dateFormatSymbol);
                                } else if (date.length === 8) {// 没有分隔符并且为8位
                                    dateSplit(date.replace(/^(\d{4})(\d{2})(\d{2})$/, "$1-$2-$3"));
                                }
                            }
                        }

                        function init() {
                            if (scope.dInitDate) {
                                // 分割日期
                                var dateArray = dateSplit(scope.dInitDate);
                                // 初始化日期
                                $date.date.year = parseInt(dateArray[0]);
                                $date.date.month = parseInt(dateArray[1]) - 1;
                                $date.date.currentDay = parseInt(dateArray[2]);
                            }
                            // 开始创建日期内容
                            $date.creatDayContent();
                        }

                        init();
                    }
                }
            }
        }])
        .controller('dateCtrl', ['$scope', function ($scope) {
            var ctrl = this;
            // 数据
            ctrl.data = undefined;
            // 日期
            ctrl.date = undefined;
            /**
             * 下个月
             */
            ctrl.nextMonth = function () {
                // 12月
                if (ctrl.date.month === 11) {
                    ctrl.date.year++;
                    ctrl.date.month = 0;
                } else {
                    ctrl.date.month++;
                }
                var toDate = angular.copy(ctrl.date);
                toDate.month++;
                // 回调方法
                ctrl.onMonthClick(toDate.year + ctrl.dateFormatSymbol + toDate.month);
                // 创建日历
                ctrl.creatDayContent();
            };
            /**
             * 上个月
             */
            ctrl.beforeMonth = function () {
                // 12月
                if (ctrl.date.month === 0) {
                    ctrl.date.year--;
                    ctrl.date.month = 11;
                } else {
                    ctrl.date.month--;
                }
                var toDate = angular.copy(ctrl.date);
                toDate.month++;
                // 回调方法
                ctrl.onMonthClick(toDate.year + ctrl.dateFormatSymbol + toDate.month);
                // 创建日历
                ctrl.creatDayContent();
            };
            function init() {
                var myDate = new Date();
                ctrl.date = {
                    year: myDate.getFullYear(),// 获取完整的年份
                    month: myDate.getMonth(),// 获取当前月份(0-11,0代表1月)
                    currentDay: myDate.getDate(),// 获取当前日(1-31)
                    today: {// 今天
                        year: myDate.getFullYear(),// 获取完整的年份
                        month: myDate.getMonth(),// 获取当前月份(0-11,0代表1月)
                        day: myDate.getDate()// 获取当前日(1-31)
                    }
                };
            }

            init();
        }]);
});