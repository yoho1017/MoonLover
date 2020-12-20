var member = new Vue ({
    el : '#member',
    data : {
        // 明細燈箱
        pop_block : false,
        // 會員中心頁籤
        lists : [
            {list: '個人資料', href : "./MyInfo.html"},
            {list: '我的吉祥物', href : "./MyMascot.html"},
            {list : '留言板', href : "./MyMsg.html"},
            {list : '我的訂單', href : "./MyOrder.html"}
        ],
        // 訂單資料
        orders : [],
        // 選取訂單明細id取得
        Odetail_data : '',
        // 訂單明細資料
        Odetails : [
            {itemName: '客製化悠遊卡', image : "./images/moonShop/悠遊卡.png" , price: '$ 300', count: 1}
        ]
    },
    methods: {
        Odetail (index) { //點擊訂單明細
            var vm = this;
            id = vm.orders[index][0];
            vm.pop_block = true;
            vm.Odetail_data = vm.orders[index];
            vm.getOdetail (id);
        },
        getOdetail (id) {
            var vm = this;
            let data = new FormData(); //建立資料表單
            // console.log(id);
            data.append('id', id); 

            let config = {
                header : {
                 'Content-Type' : 'multipart/form-data'
               }
            }

            axios.post('./php/selectOdetail.php' , data, config).then( response=> {
                // 更新資料
                data = response.data;

                for (i = 0; i <= data.length -1; i++) {
                    data[i].image = `./images/moonShop/${data[i].image}`;
                }

                // console.log(response);
                // console.log(data);
                vm.Odetails = data;
            }).catch(() => { 
                alert("錯誤 !") 
            });
        },
        close () { //關閉訂單明細
            this.pop_block = false
        },
        cancel(id) {
            var vm = this;
            if (vm.Odetail_data.status == '出貨中') {
                if (confirm("確定要取消嗎 ?") == true) {
                    var vm = this;
                    let data = new FormData(); //建立資料表單
                    // console.log(id);
                    data.append('id', id); 

                    axios.post('./php/cancelOrder.php' , data).then( response=> {
                        // 更新資料
                        data = response.data;
                
                        // console.log(response);
                        // console.log(data);
                        alert("已取消訂單");
                        vm.getOrder ();

                    }).catch(() => { 
                        alert("錯誤 !") 
                    });
        
                }
            }else if (vm.Odetail_data.status == '已出貨'){
                if ( prompt("商品已出貨 ! \n 如有問題請填寫原由提交給客服") ) {
                    alert("感謝您的提交，客服會盡快回覆您")
                }
            }
        },
        getOrder () {
            var vm = this;
            axios.post('./php/selectOrder.php').then( res=> {
                // 更新資料
                data = res.data;
                // console.log(res);
                // console.log(data);
                for (i = 0 ; i <= data.length -1 ; i++) {
    
                    if (data[i].id.length == 1) {
                        data[i].id = 'ML000000' + data[i].id;
                    }else if (data[i].id.length == 2) {
                        data[i].id = 'ML00000' + data[i].id;
                    }else if (data[i].id.length == 3) {
                        data[i].id = 'ML0000' + data[i].id;
                    }else if (data[i].id.length == 4) {
                        data[i].id = 'ML000' + data[i].id;
                    }else if (data[i].id.length == 5) {
                        data[i].id = 'ML00' + data[i].id;
                    }else if (data[i].id.length == 6) {
                        data[i].id ='ML0' + data[i].id;
                    }

                    // 已出貨時間
                    let orderOut = (new Date(Date.parse(data[i].date.replace(/-/g, "/"))+60000));
                    let now = new Date();
                    if (now > orderOut) {
                        data[i].status = 1;
                    }

                    // 消除秒數
                    data[i].date = data[i].date.substring(0, 16)

                    if (data[i].status == 0) {
                        data[i].status = '出貨中'
                    }else if (data[i].status == 1) {
                        data[i].status = '已出貨'
                    }else if (data[i].status == 2) {
                        data[i].status = '已取消'
                    }
    
                }
    
                vm.orders = data;
            }).catch(() => { 
                alert("錯誤 !") 
            });
        }
    },
    created() {
        this.getOrder ();
    },
    mounted() {

        for (i = 0 ; i <= this.lists.length -1; i++) {
            //取得頁面title名字來綁定會員頁籤class
            if (this.lists[i].list == document.title) {
                $('.listName').eq(i).addClass( "bold" );
            }
        }
    },

})