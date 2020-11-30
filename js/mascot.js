var member = new Vue ({
    el : '#member',

    data : {
        // 會員中心頁籤
        lists : [
            {list: '個人資料', href : "./MyInfo.html"},
            {list: '我的吉祥物', href : "./MyMascot.html"},
            {list : '留言板', href : "./MyMsg.html"},
            {list : '我的訂單', href : "./MyOrder.html"}
        ],
        mascots : [
            {name: '好人猿', image : 'monkey.png', guide : '男性代表', id : 'monkey'},
            {name: '小狐仙', image : 'fox.png', guide : '女性代表',  id : 'fox'},
            {name: '兔兒神', image : 'rabbit.png', guide : '代表同志', id : 'rabbit'},
        ],
        mascot : {name: '好人猿', image : 'monkey.png', guide : '男性代表'},
        guiding : true,
        currentMascot : 'monkey',
        deco : 0,
    },

    methods: {
        choice (num) { //選擇吉祥物
            this.mascot = this.mascots[num];
            this.currentMascot = this.mascot.id;
            this.deco = 0;
        },
        clickHandler(event) { //判斷是否顯示文字框
            name = event.target.id;
            if (name != 'rabbit' && name != 'fox' && name != 'monkey') {
                this.guiding = false;
            }else {
                this.guiding = true;
            }
        },
        decoClick(num) { //點擊客製化類別
            this.deco = num;
        }
    },
    
    mounted() {

        window.addEventListener('click', this.clickHandler);

        for (i = 0 ; i <= this.lists.length -1; i++) {
            //取得頁面title名字來綁定會員頁籤class
            if (this.lists[i].list == document.title) {
                $('.listName').eq(i).addClass( "bold" );
            }
        }

    },

})