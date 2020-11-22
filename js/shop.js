//購買商品數量

let btn = document.getElementsByClassName('qty_plus');
let btn1 = document.getElementById('minus');
let number = document.getElementById('number');

document.addEventListener('click', function (e) {
    if (e.target.classList == 'qty_plus') {
        let numberVal = e.target.closest('span').querySelector('.qty').value;
        let total = parseInt(numberVal) + 1;
        e.target.closest('span').querySelector('.qty').value = total;
    }
});

document.addEventListener('click', function (e) {
    let numberVal = e.target.closest('span').querySelector('.qty').value;
    if (numberVal > 0) {
        if (e.target.classList == 'qty_minus') {
            let total = parseInt(numberVal) - 1;
            e.target.closest('span').querySelector('.qty').value = total;
        }
    }
    // if (e.target.classList == 'qty_minus') {
    //     let numberVal = e.target.closest('span').querySelector('.qty').value;
    //     let total = parseInt(numberVal) - 1;
    //     e.target.closest('span').querySelector('.qty').value = total;
    // }
});