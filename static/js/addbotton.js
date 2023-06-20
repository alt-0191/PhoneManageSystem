let add_btn = document.createElement('mainbutton');
    add_btn.href = '#';
    add_btn.className = 'add';
    add_btn.textContent = '添加';
    add_btn.addEventListener('click', function(event) {
        layer.open({
            type: 2,
            area: ['800px', '600px'],
            fixed: true, //不固定
            maxmin: true,
            content: 'http://127.0.0.1:5000/add_phone'
        });
    });
    document.getElementById("adbt").appendChild(add_btn);