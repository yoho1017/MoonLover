var backend = new Vue ({
    el : '#backend',
    data : {
        // ---------------留言清單---------------
        username : '碩哥',
        // 後台頁籤
        lists : ['公版留言管理','訂單管理','周邊景點管理','籤詩管理','商品管理','會員資料管理'],
    },
    mounted() {

        for (i = 0 ; i <= this.lists.length; i++) { //取得頁面title名字來綁定頁籤class
            if (this.lists[i] == document.title) {
                $('.listName').eq(i).addClass( "bold" );
            }
        }
    },
});
