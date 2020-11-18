var member = new Vue ({
    el : '#member',

    data : {
        lists : ['個人資料','我的吉祥物','留言板','我的訂單'],
    },

    methods: {

    },
    
    computed: {
    },
    
    mounted() {
        for (i = 0 ; i <= this.lists.length; i++) { //取得頁面title名字來綁定會員頁籤class
            if (this.lists[i] == document.title) {
                $('.listName').eq(i).addClass( "bold" );
            }
        }
    },
})