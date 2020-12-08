//購買商品數量

// let btn = document.getElementsByClassName('qty_plus');
// let btn1 = document.getElementById('minus');
// let number = document.getElementById('number');

// document.addEventListener('click', function (e) {
//     if (e.target.classList == 'qty_plus') {
//         let numberVal = e.target.closest('span').querySelector('.qty').value;
//         let total = parseInt(numberVal) + 1;
//         e.target.closest('span').querySelector('.qty').value = total;
//     }
// });

// document.addEventListener('click', function (e) {
//     let numberVal = e.target.closest('span').querySelector('.qty').value;
//     if (numberVal > 0) {
//         if (e.target.classList == 'qty_minus') {
//             let total = parseInt(numberVal) - 1;
//             e.target.closest('span').querySelector('.qty').value = total;
//         }
//     }
// if (e.target.classList == 'qty_minus') {
//     let numberVal = e.target.closest('span').querySelector('.qty').value;
//     let total = parseInt(numberVal) - 1;
//     e.target.closest('span').querySelector('.qty').value = total;
// }
// });

//吉祥物換圖片-----------------------------------------------

let ImgList = document.querySelectorAll('.shopPic');
for (let i = 0; i < ImgList.length; i++) {
    ImgList[i].addEventListener('click', function (e) {
        console.log(ImgList[i]);
        for (let j = 0; j < ImgList.length; j++) {
            document.getElementsByClassName('acceptPic')[j].src = e.target.src;
        }
    })
}

//吉祥物換圖片-----------------------------------------------end

