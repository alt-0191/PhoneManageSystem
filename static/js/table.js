// Assuming your JSON data is stored in a variable called phone_json
let phone_json = [
    {
        "id":"1",
        "phonebrand":"华为",
        "phonetype":"mate40",
        "cpuinfo":"9000",
        "ramandrominfo":"8+256"
    },
    {
        "id":"2",
        "phonebrand":"华为",
        "phonetype":"mate50",
        "cpuinfo":"9000e",
        "ramandrominfo":"8 2561"
    }
];

// Get the table body element
let tbody = document.querySelector('tbody');

// Loop through the JSON data
for (let i = 0; i < phone_json.length; i++) {
    // Create a new table row
    let tr = document.createElement('tr');

    // Create table cells for each property in the JSON object
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
    let modify_btn = document.createElement('a');
    modify_btn.href = '#';
    modify_btn.className = 'modify';
    modify_btn.textContent = '修改';
    
    let delete_btn = document.createElement('a');
    delete_btn.href = '#';
    delete_btn.className = 'del';
    delete_btn.textContent = '删除';

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
