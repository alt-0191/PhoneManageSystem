// Get the table body element
let tbody = document.querySelector('tbody');

// Loop through the JSON data
for (let i = 0; i < phone_json.length; i++) {
    // Create a new table row
    let tr = document.createElement('tr');

    // Create table cells for each property in the JSON object
    let id_td = document.createElement('td');
    id_td.textContent = phone_json[i].id;
    tr.appendChild(id_td);

    let brand_td = document.createElement('td');
    brand_td.textContent = phone_json[i].phonebrand;
    tr.appendChild(brand_td);

    let type_td = document.createElement('td');
    type_td.textContent = phone_json[i].phonetype;
    tr.appendChild(type_td);

    let cpu_td = document.createElement('td');
    cpu_td.textContent = phone_json[i].cpuinfo;
    tr.appendChild(cpu_td);

    let storage_td = document.createElement('td');
    storage_td.textContent = phone_json[i].ramandrominfo;
    tr.appendChild(storage_td);

    // Create the modify and delete buttons
    let modify_btn = document.createElement('buttonblue');
    modify_btn.href = '#';
    modify_btn.className = 'modify';
    modify_btn.textContent = '修改';
        modify_btn.addEventListener('click', function(event) {
        layer.open({
          type: 2,
          area: ['800px', '600px'],
          fixed: true, //不固定
          maxmin: true,
          content: 'http://127.0.0.1:5000/add_phone'
});
        });

    let delete_btn = document.createElement('buttonred');
    delete_btn.href = '#';
    delete_btn.className = 'del';
    delete_btn.textContent = '删除';
    // Add event listener to delete button
    delete_btn.addEventListener('click', function(event) {
      event.preventDefault();
      if (confirm("确认要删除这条数据吗？")) {
        // Send AJAX request to server with id of row to be deleted
        $.ajax({
          url: "delete_phone", // 替换为您的服务器URL
          type: "POST", // 根据需要选择请求类型
          data: {id: phone_json[i].id}, // 替换为您需要发送的数据
          success: function (response) {
            // 请求成功后的处理代码
            tr.remove();
          },
          error: function (xhr, status, error) {
            // 请求失败后的处理代码
            console.log(error);
          }
        });
      }
    });


    // Create a table cell to hold the buttons
    let action_td = document.createElement('td');
    action_td.appendChild(modify_btn);
    action_td.appendChild(document.createTextNode(' '));
    action_td.appendChild(delete_btn);
    
    // Append the action cell to the row
    tr.appendChild(action_td);

    // Append the new row to the table body
    tbody.appendChild(tr);
}
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


    $(".cancel").click(function () {//多个取消按钮点击触发的动作
        $("#sbg").removeClass("sbg");
        $(".achaesi").hide();
    });
// Add event listener to delete button


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
