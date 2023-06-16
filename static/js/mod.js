let objKeys = ["id", "phonebrand", "phonetype", "cpuinfo", "ramandrominfo"];
    $("#submit").click(function () {//提交按钮点击触发的动作
        let phone = {};
        let isEmpty = false;
        $("#asi").find("input").each(function (index, domEle) {
            if (!domEle.value) {//如果添加时表单内有值为空，则不进行添加
                isEmpty = true;
                /*return;*/
            }
            phone[objKeys[index]] = domEle.value;
        });
        if (!isEmpty) {
            students[stuNumber] = phone;
            stuNumber++;
            $("#en").text(stuNumber);
            let lpren = $("tbody tr").length - 1;//最后一页剩余的条目数;
            if (no + 10 > stuNumber && lpren < 10) {//增加一个append函数，如果显示的是最后一页那么需要更新界面。
                $("tbody tr:last").after("<tr>" + "<td><input type=\"checkbox\"></td>" + "<td>" + (no + lpren + 1) + "</td>" + "<td>" + phone.schoolNumber + "</td>" + "<td>" + phone.name + "</td>" + "<td>" + phone.academy + "</td>" + "<td>" + phone.major + "</td>" + "<td>"
                    + phone.grade + "</td>" + "<td>" + phone.class + "</td>" + "<td>" + phone.age + "</td>" + "<td><a href=\"javascript:;\" class=\"check\">查看</a> <a href=\"javascript:;\" class=\"modify\">修改</a></td>" + "</tr>");

            }
        }
        $("#sbg").removeClass("sbg");
        $("#asi").hide();

    });

    $("tbody").on("click", ".check", function () {//点击查看按钮触发的动作
        $("#sbg").addClass("sbg");
        $("#chesi").show();
        let stuIndex = $(this).parent().parent().find("td")[1].innerText - 1;
        // let i = 0;
        $("#chesi").find("input").each(function (index, domEle) {
            domEle.value = students[stuIndex][objKeys[index]];//index->i
        });
    });

    let modifyNumber;

    $("tbody").on("click", ".modify", function () {//点击修改按钮触发的动作,解决了jQuery出现的新添加元素点击事件无效问题
        $("#sbg").addClass("sbg");
        $("#chasi").show();
        modifyNumber = $(this).parent().parent().find("td")[1].innerText - 1;
        let i = 0;
        $("#chasi").find("input").each(function (index, domEle) {
            domEle.value = phone_json[modifyNumber][objKeys[i++]];
        });
    });


    $("#save").click(function () {//点击保存按钮触发的动作
        $("#chasi").find("input").each(function (index, domEle) {
            if (domEle.value)
                students[modifyNumber][objKeys[index]] = domEle.value;
        });
        $("tbody tr").eq(modifyNumber - no + 1).remove();
        $("tbody tr").eq(modifyNumber - no).after("<tr>" + "<td><input type=\"checkbox\"></td>" + "<td>" + (modifyNumber - no + 1) + "</td>" + "<td>" + students[modifyNumber].schoolNumber + "</td>" + "<td>" + students[modifyNumber].name + "</td>" + "<td>" + students[modifyNumber].academy + "</td>" + "<td>" + students[modifyNumber].major + "</td>" + "<td>"
            + students[modifyNumber].grade + "</td>" + "<td>" + students[modifyNumber].class + "</td>" + "<td>" + students[modifyNumber].age + "</td>" + "<td><a href=\"javascript:;\" class=\"check\">查看</a> <a href=\"javascript:;\" class=\"modify\">修改</a></td>" + "</tr>");
        /*$("tbody tr:first").siblings().remove();//清空界面
        for (let i = no; i < no+10; i++) {//初始页面信息显示
            let student = $("<tr>" + "<td><input type=\"checkbox\"></td>" + "<td>" + (i + 1) + "</td>" + "<td>" + students[i].schoolNumber + "</td>" + "<td>" + students[i].name + "</td>" + "<td>" + students[i].academy + "</td>" + "<td>" + students[i].major + "</td>" + "<td>"
                + students[i].grade + "</td>" + "<td>" + students[i].class + "</td>" + "<td>" + students[i].age + "</td>" + "<td><a href=\"javascript:;\" class=\"check\">查看</a> <a href=\"javascript:;\" class=\"modify\">修改</a></td>" + "</tr>");
            $("tbody").append(student);
        }
        $("tbody").trigger("create");*/
        $("#sbg").removeClass("sbg");
        $("#chasi").hide();
    });


    $(".cancel").click(function () {//多个取消按钮点击触发的动作
        $("#sbg").removeClass("sbg");
        $(".achaesi").hide();
    });

    $("tbody tr td:first").click(function () {//全选操作用到了JQuery的隐示迭代
        $("tbody tr td input").prop("checked", $("tbody tr:first td:first input").prop("checked"));
    });

    $("tbody").on("click", $("tbody tr:nth-of-type(1)").siblings().find("input"), function () {
        let isSelectAll = true;
        $("tbody tr:nth-of-type(1)").siblings().find("input").each(function (index, domEle) {
            if ($(domEle).prop("checked") == false)
                isSelectAll = false;
        });
        $("tbody tr:first td:first input").prop("checked", isSelectAll);
    })

    let update = (no) => {
        let i = 0;//用于增加信息条目的变量;
        $("tbody tr:first").siblings().remove();//清空界面
        while (i < 10 && no + i < stuNumber) {
            let student = $("<tr>" + "<td><input type=\"checkbox\"></td>" + "<td>" + (no + i + 1) + "</td>" + "<td>" + students[no + i].schoolNumber + "</td>" + "<td>" + students[no + i].name + "</td>" + "<td>" + students[no + i].academy + "</td>" + "<td>" + students[no + i].major + "</td>" + "<td>"
                + students[no + i].grade + "</td>" + "<td>" + students[no + i].class + "</td>" + "<td>" + students[no + i].age + "</td>" + "<td><a href=\"javascript:;\" class=\"check\">查看</a> <a href=\"javascript:;\" class=\"modify\">修改</a></td>" + "</tr>");
            $("tbody").append(student);
            i++;
        }
        $("tbody").trigger("create");
    }

    $("#delete").click(function () {
        if (confirm("确认要删除这些信息吗？")) {
            let delNumber = 0;//删除的信息条目数;
            let delIndexs = []; //删除信息条目的下标;用于后期处理避免“落空”导致移动无效
            // let i = 0;//用于增加信息条目的变量;
            $("tbody tr td input").each(function (index, domEle) {
                if (index != 0 && $(domEle).prop("checked")) {//index != 0,防止标题行被删除
                    delIndexs[delIndexs.length] = $(domEle).parent().next().text() - 1;
                    $(domEle).parent().parent().remove();
                    delNumber++;
                }
            });

            for (let j = delIndexs.length - 1; j >= 0; j--) {
                for (let k = delIndexs[j]; k < stuNumber - 1; k++) {//低效的代码，需要大量移动对象索引;对JS不太熟悉，还没有想到高效的解决办法!
                    students[k] = students[k + 1];
                }
            }

            stuNumber -= delNumber;//指向储存底层数据(学生对象)的数组尾部的指针“移动”
            $("#en").text(stuNumber);//更新条目数
            if (stuNumber == no) {
                no -= 10;
                page--;
                $("#pgn").text(page);
            }
            update(no);

            $("tbody tr td:first input").prop("checked", false);
        }
    });

    $("#nextpage").click(function () {
        if (no + 10 < stuNumber) {
            no += 10;
            page++;
            $("#pgn").text(page);
            update(no);
            $("tbody tr:first td:first input").prop("checked", false);

        } else {
            alert("已经是最后一页。");
        }
    });

    $("#lastpage").click(function () {
        if (no - 10 >= 0) {
            no -= 10;
            page--;
            $("#pgn").text(page);
            update(no);
            $("tbody tr:first td:first input").prop("checked", false);

        } else {
            alert("已经是第一页。");
        }
    });