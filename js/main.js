// المتغيرات الأساسية
let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let category = document.getElementById('category');
let submit = document.getElementById('submit');
let moode = 'create';
let temp;

// حساب الإجمالي
function getTotal() {
    if (price.value !== '') {
        let result = (+price.value + +taxes.value + +ads.value) - +discount.value;
        total.innerHTML = result;
        total.style.background = '#040';
    } else {
        total.innerHTML = '';
        total.style.background = '#d3292f';
    }
}

// جلب البيانات من التخزين المحلي
let dataPro = localStorage.product ? JSON.parse(localStorage.product) : [];

// إضافة منتج جديد
submit.onclick = function () {
    let newPro = {
        title: title.value.toLowerCase(),
        price: price.value,
        taxes: taxes.value,
        ads: ads.value,
        discount: discount.value,
        total: total.innerHTML,
        count: count.value,
        category: category.value.toLowerCase()
    };

    if (moode === 'create') {
        if (newPro.count > 1) {
            for (let i = 0; i < newPro.count; i++) {
                dataPro.push(newPro);
            }
        } else {
            dataPro.push(newPro);
        }
    } else {
        dataPro[temp] = newPro;
        moode = 'create';
        submit.innerHTML = 'Create';
        count.style.display = 'block';
    }

    localStorage.setItem('product', JSON.stringify(dataPro));
    clearData();
    showData();
};

// تفريغ الحقول بعد الإضافة
function clearData() {
    title.value = '';
    price.value = '';
    taxes.value = '';
    ads.value = '';
    discount.value = '';
    total.innerHTML = '';
    count.value = '';
    category.value = '';
}

// عرض البيانات في الجدول
function showData() {
    getTotal();
    let table = '';
    for (let i = 0; i < dataPro.length; i++) {
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

    let deleteAllBtn = document.getElementById('deleteAll');
    if (dataPro.length > 0) {
        deleteAllBtn.innerHTML = `<button onclick="deleteAll()">Delete (${dataPro.length} Products)</button>`;
    } else {
        deleteAllBtn.innerHTML = '';
    }
}

// حذف منتج معين
function deleteData(i) {
    dataPro.splice(i, 1);
    localStorage.setItem('product', JSON.stringify(dataPro));
    showData();
}

// حذف جميع المنتجات
function deleteAll() {
    localStorage.clear();
    dataPro = [];
    showData();
}

// تحديث منتج
function updateData(i) {
    title.value = dataPro[i].title;
    price.value = dataPro[i].price;
    taxes.value = dataPro[i].taxes;
    ads.value = dataPro[i].ads;
    discount.value = dataPro[i].discount;
    getTotal();
    category.value = dataPro[i].category;
    count.style.display = 'none';
    submit.innerHTML = 'Update';
    moode = 'update';
    temp = i;
    scroll({
        top: 0,
        behavior: 'smooth'
    });
}

// إعداد وضع البحث
let searchMood = 'title';

function getSearchMood(id) {
    let search = document.getElementById('Search');
    if (id === 'searshtitle') {
        searchMood = 'title';
        search.placeholder = 'Search By Title';
    } else {
        searchMood = 'category';
        search.placeholder = 'Search By Category';
    }
    search.focus();
    search.value = '';
    showData();
}

// البحث عن منتج
function searchdata(value) {
    let table = '';
    for (let i = 0; i < dataPro.length; i++) {
        if (
            (searchMood === 'title' && dataPro[i].title.includes(value.toLowerCase())) ||
            (searchMood === 'category' && dataPro[i].category.includes(value.toLowerCase()))
        ) {
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
    }
    document.getElementById('tbody').innerHTML = table;
}

// عرض البيانات عند تحميل الصفحة
showData();
