var storage = localStorage;

function doFirst() {
    //從localStorage拿出資料
    let cartItems = JSON.parse(storage.getItem("cartItems")) || [];
    //計算總金額------------------------------------------------------------------------------------
    //item是cartItems裡面的數值
    total = 0;
    cartItems.forEach(item => {
        createCarList(item)
        console.log(item, '11111111');
    })

    // 組裝動態新增-----------------------------------------------------------------------------------
    // let newMoonTotal = document.createElement('div');
    // newMoonTotal.className = "moontotal";

    function createCarList(cartItem) {

        //要先選到最外圍綁定起來
        let newMoonTotal = document.querySelector('.moontotal');
        let newMcontent = document.createElement('div');
        newMcontent.className = "mcontent";
        newMoonTotal.appendChild(newMcontent);
        for (let index = 0; index < document.querySelectorAll('.mcontent').length; index++) {
            newMoonTotal.insertBefore(document.querySelectorAll('.mcontent')[index], newMoonTotal.children[1])
        }
        let newPimage = document.createElement('div');
        newPimage.className = "pImage";
        let newpwords = document.createElement('div');
        newpwords.className = "pwords";
        let newpwords2 = document.createElement('div');
        newpwords2.className = "pwords2";
        newMcontent.appendChild(newPimage);
        newMcontent.appendChild(newpwords);
        newMcontent.appendChild(newpwords2);
        // 建立每個div------------------
        // 商品圖片把商品放在外層div

        let itemimg = document.createElement('img');
        let itemppicture = document.createElement('div');
        //放動物動態綁定---------------------------------------
        let itemAnimals = document.createElement('img');
        let animalsDiv = document.createElement('div');
        animalsDiv.className = 'eCard';
        itemAnimals.className = 'acceptPic';
        itemppicture.className = "ppicture";
        itemppicture.appendChild(itemimg);
        newPimage.appendChild(itemppicture);
        animalsDiv.appendChild(itemAnimals);
        itemppicture.appendChild(animalsDiv);
        itemimg.setAttribute('src', `./images/moonShop/${cartItem["IMAGE"]}`);
        itemimg.style.width = "100%";
        itemimg.style.height = "100%";

        // 判斷 是否有 animal 圖片
        if (cartItem["animalImg"]) {
            itemAnimals.setAttribute('src', "./images/moonShop/" + cartItem["animalImg"])
        };

        // console.log(itemppicture);
        //商品名稱和價格,把悠遊卡和單價放在外層
        let itempwords_inner = document.createElement('div');
        itempwords_inner.className = 'pwords_inner';

        let item_pwordsEasyCard = document.createElement('div');
        item_pwordsEasyCard.className = 'pwords_easyCard';
        item_pwordsEasyCard.textContent = cartItem["NAME"];
        let item_pwordsPrice = document.createElement('div');
        item_pwordsPrice.className = 'pwds_price';
        item_pwordsPrice.textContent = cartItem["PRICE"];
        itempwords_inner.appendChild(item_pwordsEasyCard);
        itempwords_inner.appendChild(item_pwordsPrice);
        newpwords.appendChild(itempwords_inner);

        //數量加減
        let itempwords2_inner = document.createElement('div');
        itempwords2_inner.className = 'pwords2_inner';
        let itemproAmount = document.createElement('div');
        itemproAmount.className = 'proAmount';
        let itemForm = document.createElement('span');
        itemForm.className = 'proForm';
        let itemMinus = document.createElement('i');
        itemMinus.classList.add("fas", "fa-minus-square", "qty_minus");
        let itemQuant = document.createElement('input');
        itemQuant.className = 'qty';
        itemQuant.value = 1;
        let itemQuantValue = document.querySelector('.qty');
        let itemPlus = document.createElement('i');
        itemPlus.classList.add("fas", "fa-plus-square", "qty_plus");
        //數量加減組裝--------------------------------------------------------------
        itemForm.appendChild(itemMinus);
        itemForm.appendChild(itemQuant);
        itemForm.appendChild(itemPlus);
        itemproAmount.appendChild(itemForm);
        itempwords2_inner.appendChild(itemproAmount);
        newMcontent.appendChild(itempwords2_inner);


        // 小計價格--------------------------------------------------

        let itemTotalprice = document.createElement('div');
        itemTotalprice.className = 'proTotalprice';
        itempwords2_inner.appendChild(itemTotalprice);
        newpwords2.appendChild(itempwords2_inner);
        newMcontent.appendChild(newpwords2);


        //刪除按鈕------------------------------------------------

        let delitems = document.createElement("div");
        delitems.innerText = '刪除';
        delitems.className = "m_del";
        delitems.setAttribute('data-animal', cartItem["animalImg"] || "");
        delitems.setAttribute('data-pdid', cartItem["ID"]);

        // let delword = document.createElement('p');
        // delword.textContent = '刪除';


        // delitems.appendChild(delword);
        newMcontent.appendChild(delitems);
        // delButton.addEventListener('click', deleteItem);

        //RWD刪除按鈕

        let rwdDelitems = document.createElement('i');
        rwdDelitems.classList.add('fas', 'fa-trash-alt', 'fa-2x', 'garbageCan');
        newMcontent.appendChild(rwdDelitems);
        // rwdDelitems.setAttribute('data-img', itemValue);
        // rwdDelitems.setAttribute('data-list', getItemList);

        // function deleteItem() {

        // }

    }


    // 物件依序放進去購物車-----------------------


    // function createCarList(itemId, itemValue) {
    //     let itemTitle = itemValue.split('')[0];
    //     let itemImage = 
    // }

    numberCount();

}

function numberCount() {
    let mcontentAll = document.querySelectorAll('.mcontent');
    let numberPlus = document.querySelectorAll('.qty_plus');
    let numberInput = document.querySelectorAll('.qty');
    let numberMinus = document.querySelectorAll('.qty_minus');
    let itemPrice = document.querySelectorAll('.pwds_price');
    let itemTotal = document.querySelectorAll('.proTotalprice');
    let delitems = document.querySelectorAll('.m_del');


    // 小計金額計算--------------------------------------------------------------
    mcontentAll.forEach((element, i, array) => element.addEventListener('click', function (e) {
        // e.stopPropagation();
        total = 0;
        // console.log(e.target.className, numberPlus[i].className, '0500');
        let arrayFromList = Array.from(e.target.classList);
        console.log(arrayFromList);
        //加號連擊
        if (arrayFromList.includes('fa-plus-square')) {
            numberInput[i].value++;
        }
        //減號連擊
        if (arrayFromList.includes('fa-minus-square') && numberInput[i].value > 1) {
            numberInput[i].value--;
        }
        itemTotal[i].textContent = parseInt(numberInput[i].value) * parseInt(itemPrice[i].textContent);
        //刪除商品
        function deleteItems() {
            console.log(e.target.dataset);
            if (arrayFromList.includes('m_del') || arrayFromList.includes('fa-trash-alt')) {
                let cartItems = JSON.parse(localStorage.getItem("cartItems"))
                let afterCartItems = cartItems.filter(item => item["ID"] !== e.target.dataset.pdid && item["animalImg"] !== e.target.dataset.animal)
                console.log(afterCartItems);
                localStorage.setItem('cartItems', JSON.stringify(afterCartItems))
                element.remove();
            }
        }

        deleteItems();

        accountTotal();
    }
    )
    )



}

function accountTotal() {
    let total = 0;
    let mcontentAll = document.querySelectorAll(".mcontent");
    let itemTotal = document.querySelectorAll(".proTotalprice");
    let numberInput = document.querySelectorAll('.qty');
    let itemPrice = document.querySelectorAll('.pwds_price');
    for (let j = 0; j < mcontentAll.length; j++) {
        //先將textcontent 設值
        itemTotal[j].textContent = parseInt(numberInput[j].value) * parseInt(itemPrice[j].textContent);
        // 再加總小計
        total = total + parseInt(itemTotal[j].textContent);
    }

    let totalPPrice = document.getElementById('payTotal');
    totalPPrice.textContent = total;
}
window.addEventListener('load', function () {
    doFirst()
    accountTotal();
});