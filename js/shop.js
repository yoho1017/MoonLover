

// axios
axios.post('./php/MoonShop.php').then((res) => {
    // console.log(res);
    // console.log(res.data, 'QQ');
    data = res.data
    loading(data);
})

var lists;

function loading(data) {
    lists = data;
    document.getElementById('easyCard').innerHTML = lists[0].NAME;
    document.getElementById('easyCardImg').src = thing(lists[0].IMAGE);


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
let ImgList = document.querySelectorAll('.shopPic');
for (let i = 0; i < ImgList.length; i++) {
    ImgList[i].addEventListener('click', function (e) {
        for (let j = 0; j < ImgList.length; j++) {
            document.getElementsByClassName('acceptPic')[j].src = e.target.src;
            // 抓取圖片名稱
            let imgSrc = e.target.src.slice(-10);
            let shoppingInput = document.querySelectorAll('.shoppingCars input');
            //上面這裡要再詢問?
            //這裡為何要用-1(迴圈要在更懂)
            if (shoppingInput[j].value.indexOf("01") !== -1) {
                let repeatItem = shoppingInput[j].value.slice(0, -11);
                console.log(repeatItem, 'my fault');
                shoppingInput[j].value = repeatItem + '|' + imgSrc;
            }
            else {
                shoppingInput[j].value = shoppingInput[j].value + '|' + imgSrc
            }
        }

        // 把type放到html(為何要放type在這裡?)
        let picData = document.querySelectorAll('.shoppingCars');
        for (var i = 0; i < picData.length; i++) {
            picData[i].setAttribute("type", e.target.alt);
        }
    })
}

//吉祥物換圖片-----------------------------------------------end
// lightB[a].textContent(文字節點)>>>>燈箱使用
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
    if (storage['addItemList']) {
        getStorageItem();
    }
    else {
        document.getElementById("itemCount").innerText = 0;
    }
}

// 判斷是否已經加入購物車以及燈箱提醒------------------------
let idArray = [];
let imgArray = [];
function addItem(itemId, itemValue, item) {
    let ListItems = JSON.parse(localStorage.getItem('addItemList')) || [];
    if (ListItems.some(element => element === itemId)) {
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






