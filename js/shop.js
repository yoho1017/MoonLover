
// const { createPopper } = require("@popperjs/core");

let $ = window.$

// axios
axios.post('./php/MoonShop.php').then((res) => {
    // console.log(res);
    // console.log(res.data);
    data = res.data;

    loading(data);
}).catch(() => {
    // console.log("錯誤 !")
})

axios.post('./php/selectMascotR.php').then((res) => {
    // console.log(res);
    // console.log(res.data);
    picData = res.data;
    showing(picData);
    if (picData != "") {
        showing(picData);
    } else {
        document.getElementById('cusPic').src = `./images/moonShop/old-01.png`;

        $('#customPic').css({
            pointerEvents: 'none',
        });
        document.getElementById('replaceWords').innerHTML = '未建立圖片';
    }
}).catch(() => {
    // console.log("錯誤 !")
})


function showing(picData) {
    document.getElementById('cusPic').src = `./images/member/macot/${picData}`;
    // console.log(picData);
}

var lists;

function loading(data) {

    lists = data;
    localStorage.setItem('Allitems', JSON.stringify(lists));
    // console.log(data, 'data');
    //悠遊卡
    document.getElementById('easyCard').innerHTML = lists[0].NAME;
    document.getElementById('easyCardImg').src = thing(lists[0].IMAGE);
    document.getElementById('easyCardPrice').innerHTML = lists[0].PRICE;


    //大抱枕
    document.getElementById('easyPillow').innerHTML = lists[1].NAME;
    document.getElementById('easyPillowImg').src = thing(lists[1].IMAGE);
    document.getElementById('easyPillowPrice').innerHTML = lists[1].PRICE;

    
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
    // console.log(lists[0].NAME);


    // console.log(document.getElementById('p1').value);
    //綁id在按鈕上,超連結部分綁上ID,NAME,PRICE,INTRODUCTION,IMAGE
    for (let i = 0; i < lists.length; i++) {
        document.querySelectorAll('.shopCars')[i].id += `${lists[i]["ID"]}`;
        document.querySelectorAll(".ImageContent1")[i].dataset.pdid = `${lists[i]["ID"]}`
        /// // go to detail page
        document.querySelectorAll('.ImageContent1')[i].dataset.pdtitle = lists[i].NAME;
        document.querySelectorAll('.ImageContent1')[i].dataset.pdprice = lists[i].PRICE;
        document.querySelectorAll('.ImageContent1')[i].dataset.pdintroduction = lists[i].INTRODUCTION;
        document.querySelectorAll('.ImageContent1')[i].dataset.pdImg = lists[i].IMAGE;
    }





    // console.log(document.getElementById('p1').value, '1213');
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
            // console.log(lists[i]);
        }
    }
});



// axios------------------end




//吉祥物換圖片-----------------------------------------------
//shopPic是那四張動物圖片
let ImgList = document.querySelectorAll('.shopPic');
for (let i = 0; i < ImgList.length; i++) {
    ImgList[i].addEventListener('click', function (e) {
        for (let j = 0; j < ImgList.length; j++) {
            document.getElementsByClassName('acceptPic')[j].src = e.target.src;
            // 抓取圖片名稱


            // let imgSrc = e.target.src.slice(-10);
            let imgSrc = e.target.src.split('/')[e.target.src.split('/').length - 1];
            // console.log(imgSrc, '123');
            let shoppingInput = document.querySelectorAll('.shoppingCars');
            shoppingInput[j].dataset.product = imgSrc;
            document.querySelectorAll('.ImageContent1')[j].dataset.pdLuckyImg = imgSrc;
           

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

    list.forEach((item, index) => {
        item.addEventListener("click", function (e) {
            let currentProd = lists.find(item => item["ID"] === e.target.id);
            currentProd.itemCount = '1';
            let cartItems = JSON.parse(localStorage.getItem("cartItems")) || []
            //id判斷
            if (cartItems.length >= 0) {
                if (!cartItems.some(element => element["ID"] === currentProd["ID"])) {
                    if (e.target.dataset) {
                        currentProd.animalImg = e.target.dataset.product
                    }
                    cartItems.push(currentProd)
                    localStorage.setItem("cartItems", JSON.stringify(cartItems))
                    // getStorageItem();
                    return addSuceess()

                } else {
                    //動物判斷
                    // 兔 !== 兔
                    let idItems = cartItems.filter(element => element["ID"] === currentProd["ID"]) || []
                    // console.log(idItems, 'ID');
                    if (!idItems.some(item => item.animalImg === e.target.dataset.product)) {
                        currentProd.animalImg = e.target.dataset.product
                        cartItems.push(currentProd)
                        localStorage.setItem("cartItems", JSON.stringify(cartItems));
                        // getStorageItem();
                        return addSuceess()
                    }
                    else {
                        return notSuceess();
                    }
                }
            }
        })
    })


    
}
// let swal = document.querySelector('.swal2-modal');
// swal.style.background = "#FFE4CA";
// swal.style.border = '5px solid #FF7575';
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

// 內頁綁定ID----------------------------------------------


$(".ImageContent1").each(function (index) {
    let detailItem = {};
    $(this).on("click", function () {
        // For the boolean value
        detailItem['title'] = $(this).attr('data-pdtitle');
        detailItem['price'] = $(this).attr('data-pdprice');
        detailItem['introduction'] = $(this).attr('data-pdintroduction');
        detailItem['img'] = $(this).attr('data-pd-img');
        detailItem['number'] = $(this).attr('data-pdid');
        if ($(this).attr('data-pd-lucky-img')) {
            detailItem['luckyImg'] = $(this).attr('data-pd-lucky-img');
        }
        // console.log(detailItem, 'object');
        localStorage.setItem('detailPageItem', JSON.stringify(detailItem));
    });
});







window.addEventListener('load', doFirst);