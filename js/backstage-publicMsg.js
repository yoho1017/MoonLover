var nav = new Vue ({
    el: '#nav',
    data : {
        title : 'menu',
    },
});

var backend = new Vue ({
    el : '#backend',
    data : {
        // ---------------留言清單---------------
        username : '碩哥',
        // 後台頁籤
        lists : [
            {list: '公版留言管理', href : "./backstage_publicMsg.html"},
            {list: '訂單管理', href : "./backstage_publicMsg.html"},
            {list : '周邊景點管理', href : "./backstage_mapList.html"},
            {list : '籤詩管理', href : "./backstage_draw.html"},
            {list : '商品管理', href : "./backstage_products.html"},
            {list : '會員資料管理', href : "./backstage_member.html"},
        ],
        sql : [
            [1,'F001','BiBiOTA','2020-06-06','不雅文字','這網站真的好爛啊！','顯示'],
            [2,'M001','Yoho','2020-11-03','不雅文字','這網站好爛！','顯示'],
            [3,'M003','AsoJi','2020-11-04','不雅文字','這網站好爛！','顯示'],
            [4,'M003','BiBiOTA','2020-11-05','不雅文字','這網站好爛！','顯示'],
            [5,'M003','AsoJi','2020-12-01','不雅文字','這網站好爛！','顯示'],
            [6,'M003','Yoho','2020-12-02','不雅文字','這網站好爛！','顯示'],
  
        ],
        modify_data : '',
        menu : true,
    },
    methods : {
        change (id) {
            if (id == 'n') {
                this.modify_data[0] = this.sql.length +1;
                this.sql.push(this.modify_data);
            }else{
                data = id -1;
                this.sql[data] = this.modify_data;
            }
            // this.menu = true;
            // nav.$data.title = 'menu';
        },
    },
    components: {
        row : {
            props : ['id','num','lucky','answer'],
            template : 
            `
            <tr :id=id>
                <td class="td_55"><h4>{{id}}</h4></td>
                <td class="td_80"><h4>{{num}}</h4></td>
                <td class="td_75"><h4>{{lucky}}</h4></td>
                <td class="td_125"><h4>{{answer}}</h4></td>
                <td class="td_75"><h4 class="more" @click="modify(id)">更多</h4></td>
            </tr>
            `,
            methods: {
                modify (id) {
                    window.scrollTo(0,0);
                    data = id -1;
                    backend.$data.menu = false;
                    nav.$data.title = 'modify';
                    backend.$data.modify_data = backend.$data.sql[data];
                },
            }
        },
    },
    mounted() {

        for (i = 0 ; i <= this.lists.length; i++) { //取得頁面title名字來綁定頁籤class
            if (this.lists[i] == document.title) {
                $('.listName').eq(i).addClass( "bold" );
            }
        }
    },
});
