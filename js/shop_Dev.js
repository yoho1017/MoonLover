function doFirst() {

    let cartItems = JSON.parse(localStorage.getItem("detailPageItem")) || [];
    let { title, price, introduction, luckyImg, img } = cartItems;
    document.querySelector('.proTitle1').textContent = title;
    document.querySelector('.proPrice1').textContent = `單價 NT.${price}`;
    document.querySelector('.proContent1').textContent = introduction;
    if (luckyImg) {
        if (luckyImg !== 'fox-01.png' && luckyImg !== 'rab-01.png' && luckyImg !== 'mok-01.png') {
            document.querySelector('.proLuckyImg').setAttribute('src', `./images/member/macot/${luckyImg}`);
        }
        else {
            document.querySelector('.proLuckyImg').setAttribute('src', `./images/moonShop/${luckyImg}`);
        }
    }

    document.querySelector('.proImg').setAttribute('src', `./images/moonShop/${img}`);

    let itemCount = document.querySelector('#my_form input');

    document.querySelector('.fa-plus-square').addEventListener('click', function () {
        itemCount.value++;
        document.querySelector('.totalPri').textContent = parseInt(price) * parseInt(itemCount.value);
    })


    document.querySelector('.fa-minus-square').addEventListener('click', function () {
        if (itemCount.value > 1) {
            itemCount.value--;
            document.querySelector('.totalPri').textContent = parseInt(price) * parseInt(itemCount.value);
        }
    })

    document.querySelector('.totalPri').textContent = parseInt(price) * parseInt(itemCount.value);


















}
window.addEventListener('load', doFirst);