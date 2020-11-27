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
        orders : [
            {id: 000001, date: '2020-10-16', price: '$ 300', status: '未出貨'},
            {id: 000002, date: '2020-10-18', price: '$ 600', status: '已完成'},
            {id: 000003, date: '2020-10-20', price: '$ 2000', status: '運送中'},
            {id: 000003, date: '2020-10-20', price: '$ 2000', status: '運送中'},
            {id: 000003, date: '2020-10-20', price: '$ 2000', status: '運送中'},
            {id: 000003, date: '2020-10-20', price: '$ 2000', status: '運送中'},
            {id: 000003, date: '2020-10-20', price: '$ 2000', status: '運送中'},
            {id: 000003, date: '2020-10-20', price: '$ 2000', status: '運送中'},

        ],
        // 選取訂單明細id取得
        Odetail_data : '',
        // 訂單明細資料
        Odetails : [
            {image : "./images/moonShop/悠遊卡.png", itemName: '客製化悠遊卡', price: '$ 300', count: 1}
        ]
    },
    methods: {
        Odetail (i) { //點擊訂單明細
            data = i -1;
            this.pop_block = true;
            this.Odetail_data = this.orders[data];
        },
        close () { //關閉訂單明細
            this.pop_block = false
        }
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