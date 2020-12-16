var storage = localStorage;
function doFirst() {
    let allItems = JSON.parse(storage.getItem("Allitems")) || [];
    let cartItems = JSON.parse(storage.getItem("detailPageItem")) || [];
    let { number, title, price, introduction, luckyImg, img } = cartItems;
    document.querySelector('.proTitle1').textContent = title;
    document.querySelector('.proPrice1').textContent = `單價 NT.${price}`;
    document.querySelector('.proContent1').textContent = introduction;
    document.querySelector('.btnRed').setAttribute('number', number);
    document.querySelector('.btnRed').dataset.product = luckyImg;

    if (luckyImg) {
        if (luckyImg !== 'fox-01.png' && luckyImg !== 'rab-01.png' && luckyImg !== 'mok-01.png') {
            document.querySelector('.proLuckyImg').setAttribute('src', `./images/member/macot/${luckyImg}`);
        }
        else {
            document.querySelector('.proLuckyImg').setAttribute('src', `./images/moonShop/${luckyImg}`);
        }
    }

    document.querySelector('.proImg').setAttribute('src', `./images/moonShop/${img}`);

    let itemCount = document.querySelector('.proWords #my_form input');

    document.querySelector('.proWords .fa-plus-square').addEventListener('click', function () {
        itemCount.value++;
        document.querySelector('.proWords .totalPri').textContent = parseInt(price) * parseInt(itemCount.value);
    })


    document.querySelector('.proWords .fa-minus-square').addEventListener('click', function () {
        if (itemCount.value > 1) {
            itemCount.value--;
            document.querySelector('.proWords .totalPri').textContent = parseInt(price) * parseInt(itemCount.value);
        }
    })

    document.querySelector('.proWords .totalPri').textContent = parseInt(price) * parseInt(itemCount.value);


    document.querySelector('.proWords .btnRed').addEventListener('click', function (e) {
        let currentProd = allItems.find(item => item["ID"] === this.getAttribute("number"));
        // let getCount = { 'itemNumber':  };
        currentProd.itemCount = itemCount.value;
        // 從外頁搬過來----------------------------------------
        let cartItems = JSON.parse(storage.getItem("cartItems")) || [];
        if (cartItems.length >= 0) {
            if (!cartItems.some(element => element["ID"] === currentProd["ID"])) {
                console.log(e.target.dataset, 'dataset');
                if (e.target.dataset) {
                    currentProd.animalImg = e.target.dataset.product
                    console.log(currentProd.animalImg, e.target.dataset.product, 'gun');

                }
                cartItems.push(currentProd);
                console.log(cartItems, 'cartItems');
                storage.setItem("cartItems", JSON.stringify(cartItems))
                getStorageItem();
                return addSuceess()

            } else {
                //動物判斷
                // 兔 !== 兔
                let idItems = cartItems.filter(element => element["ID"] === currentProd["ID"]) || []
                console.log(idItems, 'ID');
                if (!idItems.some(item => item.animalImg === e.target.dataset.product)) {
                    currentProd.animalImg = e.target.dataset.product
                    cartItems.push(currentProd)
                    storage.setItem("cartItems", JSON.stringify(cartItems));
                    getStorageItem();
                    return addSuceess()
                }
                else {
                    return notSuceess();
                }
            }
        }

    })


    function getStorageItem() {
        let storedArray = JSON.parse(storage.getItem("cartItems"));

        document.getElementById("itemCount").innerText = storedArray.length;
    }
    if (storage['cartItems']) {
        getStorageItem();
    }
    else {
        document.getElementById("itemCount").innerText = 0;
    }

    function notSuceess() {
        Swal.fire({
            icon: 'error',
            text: `購買過了喔`,
        })
    }
    function addSuceess() {
        Swal.fire({
            imageUrl: 'images/moonShop/old-01.png',
            text: ` 加入購物車囉`,
        })
    }




    // 刪除rwd框框---------------------------------------------
    document.querySelectorAll('img').forEach(function (img) {
        img.onerror = function () { this.style.display = 'none'; };
        if (img.src == '') {
            img.style.display = 'none'
        }
    })
    // 刪除rwd框框---------------------------------------------end



}
window.addEventListener('load', doFirst);