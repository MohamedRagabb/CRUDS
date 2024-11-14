let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let total = document.getElementById('total'); 
let count = document.getElementById('count'); 
let category = document.getElementById('category'); 
let submit = document.getElementById('submit');

function getTotal(){
   if(price.value != '') {
        let result = (+price.value + +taxes.value + +ads.value) - +discount.value;
        total.innerHTML = result;
        total.style.background = '#040';
   } else {
        total.innerHTML = '';
        total.style.background = '#d3292f';
   }
}

// Initialize dataPro array
let dataPro = localStorage.product ? JSON.parse(localStorage.product) : [];

// Add new product
submit.onclick = function() {
    let newPro = {
        title: title.value,
        price: price.value,
        taxes: taxes.value,
        ads: ads.value,
        discount: discount.value,
        total: total.innerHTML,
        count: count.value,
        category: category.value
    };

    // Add product to dataPro array and update localStorage
    dataPro.push(newPro);
    localStorage.setItem('product', JSON.stringify(dataPro));
    console.log(dataPro);

    clearData();
    showData();
};

// Clear input fields after adding data
function clearData(){
    title.value = '';
    price.value = '';
    taxes.value = '';
    ads.value = '';
    discount.value = '';
    total.innerHTML = '';
    count.value = '';
    category.value = '';
}

// Display data in the table
function showData() {
    let table = '';
    for(let i = 0; i < dataPro.length; i++) {
        table += `
            <tr>
                <td>${i + 1}</td>
                <td>${dataPro[i].title}</td>
                <td>${dataPro[i].price}</td>
                <td>${dataPro[i].taxes}</td>
                <td>${dataPro[i].ads}</td>
                <td>${dataPro[i].discount}</td>
                <td>${dataPro[i].total}</td>
                <td>${dataPro[i].category}</td>
                <td><button onclick="updateData(${i})">Update</button></td>
                <td><button onclick="deleteData(${i})">Delete</button></td>
            </tr>
        `;
    }
    document.getElementById('tbody').innerHTML = table;
    let BtndeleteAll = document.getElementById('deleteAll');
    if(dataPro.length>0){
        BtndeleteAll.innerHTML= `
           <button onclick="deleteAll()" >Delete All</button>
         
        `
    }else{
        BtndeleteAll.innerHTML= '';
    }
}

// Delete specific product
function deleteData(i) {
    dataPro.splice(i, 1);
    localStorage.setItem('product', JSON.stringify(dataPro));
    showData();
}

function deleteAll(){
    localStorage.clear();
    dataPro.splice(0);
    showData();
}


// Display data when page loads
showData();