let objKeys = ["id", "phonebrand", "phonetype", "cpuinfo", "ramandrominfo"];


    let modifyNumber;

    $("tbody").on("click", ".modify", function () {//点击修改按钮触发的动作,解决了jQuery出现的新添加元素点击事件无效问题
        layer.open({
            type: 2,
            area: ['700px', '450px'],
            fixed: false, //不固定
            maxmin: true,
            content: 'https://layui.itze.cn'
        });
    });

    $("tbody").on("click", ".del", function () {
      if (confirm("确认要删除这条数据吗？")) {
          console.log(phone_json[i].id);
          let id = phone_json[i].id; // 获取对应索引的id值
        $("tbody tr td input").each(function (index, domEle) {
          $.ajax({
            url: "delete_phone", // 替换为您的服务器URL
            type: "POST", // 根据需要选择请求类型
            data: {id:id}, // 替换为您需要发送的数据
            success: function (response) {
              // 请求成功后的处理代码
              $(domEle).parent().parent().remove();
              delNumber++;
            },
            error: function (xhr, status, error) {
              // 请求失败后的处理代码
              console.log(error);
            }
          });
        });
      }
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
            })
