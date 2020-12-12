let $ = window.$

// axios
axios.post('./php/MoonShop.php').then((res) => {
    console.log(res);
    console.log(res.data, 'QQ');
    data = res.data;

    loading(data);
})

var lists;

function loading(data) {

    lists = data;
    //悠遊卡
    document.getElementById('easyCard').innerHTML = lists[0].NAME;
    document.getElementById('easyCardImg').src = thing(lists[0].IMAGE);
    document.getElementById('easyCardPrice').innerHTML = lists[0].PRICE;
    //大抱枕
    document.getElementById('easyPillow').innerHTML = lists[1].NAME;
    document.getElementById('easyPillowImg').src = thing(lists[1].IMAGE);
    document.getElementById('easyPillowPrice').innerHTML = lists[1].PRICE;

    //.setAttribute('href', `./moonShopDev.html?ID=${lists[1].ID}`)

    // let pillowLink = document.getElementById('easyPillowA');
    // pillowLink.setAttribute('data-ID', lists[1].ID);
    // pillowLink.addEventListener('click', function (e) {
    // alert('123')
    //     e.preventDefault();
    //     let id = pillowLink.getAttribute('data-ID');
    //     $.ajax({
    //         type: 'GET',
    //         url: './php/MoonShopDev.php',
    //         data: { id },
    //         success: function (res) {
    //             console.log(res);
    //         }
    //     });
    // });
    //口罩
    document.getElementById('easyMask').innerHTML = lists[2].NAME;
    document.getElementById('easyMaskImg').src = thing(lists[2].IMAGE);
    document.getElementById('easyMaskPrice').innerHTML = lists[2].PRICE;
    //筆記本
    document.getElementById('easyNotebook').innerHTML = lists[3].NAME;
    document.getElementById('easyNotebookImg').src = thing(lists[3].IMAGE);
    document.getElementById('easyNotebookPrice').innerHTML = lists[3].PRICE;
    //姻緣線
    document.getElementById('easyLine').innerHTML = lists[4].NAME;
    document.getElementById('easyLineImg').src = thing(lists[4].IMAGE);
    document.getElementById('easyLinePrice').innerHTML = lists[4].PRICE;
    //面紙盒
    document.getElementById('easyBox').innerHTML = lists[5].NAME;
    document.getElementById('easyBoxImg').src = thing(lists[5].IMAGE);
    document.getElementById('easyBoxPrice').innerHTML = lists[5].PRICE;
    //紅包
    document.getElementById('easyRed').innerHTML = lists[6].NAME;
    document.getElementById('easyRedImg').src = thing(lists[6].IMAGE);
    document.getElementById('easyRedPrice').innerHTML = lists[6].PRICE;
    //杯墊
    document.getElementById('easyPad').innerHTML = lists[7].NAME;
    document.getElementById('easyPadImg').src = thing(lists[7].IMAGE);
    document.getElementById('easyPadPrice').innerHTML = lists[7].PRICE;
}


function thing(img) {
    src = "./images/moonShop/" + img;
    // console.log(img);
    // console.log(src);
    return src;
}

document.addEventListener("click", function (e) {
    let merchandise = document.querySelectorAll('.easyCard').length;
    for (i = 0; i <= merchandise - 1; i++) {
        if (e.target == document.querySelectorAll('.easyCard')[i]) {
            console.log(lists[i]);
        }
    }
});



// axios------------------end




function getStorageItem() {
    let storedArray = JSON.parse(storage.getItem("addItemList"))
    document.getElementById("itemCount").innerText = storedArray.length;
}
//吉祥物換圖片-----------------------------------------------
//shopPic是那四張動物圖片
let ImgList = document.querySelectorAll('.shopPic');
for (let i = 0; i < ImgList.length; i++) {
    ImgList[i].addEventListener('click', function (e) {
        for (let j = 0; j < ImgList.length; j++) {
            document.getElementsByClassName('acceptPic')[j].src = e.target.src;
            // 抓取圖片名稱
            let imgSrc = e.target.src.slice(-10);
            let shoppingInput = document.querySelectorAll('.shoppingCars input');
            //上面這裡要再詢問?
            //這裡為何要用-1(迴圈要在更懂)只要裡面有01就要放
            if (shoppingInput[j].value.indexOf("01") !== -1) {
                let repeatItem = shoppingInput[j].value.slice(0, -11);
                shoppingInput[j].value = repeatItem + '|' + imgSrc;
                console.log('123');
                //點小狐狸123不會出現
            }
            else {
                shoppingInput[j].value = shoppingInput[j].value + '|' + imgSrc
            }

        }

        // 把type放到html(為何要放type在這裡?)這裡type可以用來當圖檔名稱之前的名字
        let picData = document.querySelectorAll('.shoppingCars');
        for (var i = 0; i < picData.length; i++) {
            picData[i].setAttribute("type", e.target.alt);
        }
    })
}

//吉祥物換圖片-----------------------------------------------end
// lightB[a].textContent(文字節點)>>>>燈箱使用
//this就是這裡的八個按鈕
var storage = localStorage;
function doFirst() {
    let list = document.querySelectorAll('.shopCars');
    for (let a = 0; a < list.length; a++) {
        list[a].addEventListener('click', function () {
            let lightB = document.querySelectorAll('.easyCard');
            let productInfo = document.querySelector(`#${this.id} input`).value;
            if (this.getAttribute('type') === null) {
                addItem(this.id, productInfo, lightB[a].textContent);
            }
            else {
                addItem(`${this.getAttribute('type')}${this.id}`, productInfo, lightB[a].textContent);
            }
        })
    }

    //判斷addItemList裡面是否有東西1.有東西,2沒有東西
    //購物車商品數量
    if (storage['addItemList']) {
        getStorageItem();
    }
    else {
        document.getElementById("itemCount").innerText = 0;
    }
}


// 內頁綁定ID----------------------------------------------
$("#easyCardImg").click(function (e) {

    console.log('123');
})


// 判斷是否已經加入購物車以及燈箱提醒------------------------

function addItem(itemId, itemValue, item) {
    let idArray = JSON.parse(localStorage.getItem('addItemList')) || [];
    let imgArray = JSON.parse(localStorage.getItem('addItemImg')) || [];
    console.log((itemId), "0426");
    //element就是ListItems
    if (idArray.some(element => element === itemId)) {
        Swal.fire({
            icon: 'error',
            text: `${item}購買過了喔`,
        })
    } else {
        Swal.fire({
            imageUrl: 'images/moonShop/old-01.png',
            text: `${item}加入購物車囉`,
        })
        //放進去localStorage
        idArray.push(itemId);
        imgArray.push(itemValue);
        storage['addItemList'] = JSON.stringify(idArray);
        storage['addItemImg'] = JSON.stringify(imgArray);
    }
    let swal = document.querySelector('.swal2-modal');
    swal.style.background = "#FFE4CA";
    swal.style.border = '5px solid #FF7575';
    // 有多少商品項目在購物車----------------
    getStorageItem()

}



window.addEventListener('load', doFirst);






