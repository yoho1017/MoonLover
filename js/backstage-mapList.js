var nav = new Vue({
    el: '#nav',
    data: {
        title: 'menu',
    },
});

var backend = new Vue({
    el: '#backend',
    data: {
        // ---------------留言清單---------------
        username: '碩哥',
        // 後台頁籤
        lists : [
            {list: '公版留言管理', href : "./backstage_publicMsg.html"},
            {list: '訂單管理', href : "./backstage_publicMsg.html"},
            {list : '周邊景點管理', href : "./backstage_mapList.html"},
            {list : '籤詩管理', href : "./backstage_draw.html"},
            {list : '商品管理', href : "./backstage_products.html"},
            {list : '會員資料管理', href : "./backstage_member.html"},
        ],
        sql: [
            [1, '迪化街', '台北霞海城隍廟', '美食','好吃好吃','11:00 - 15:00','台北市迪化街'],
            [2, '顏記杏仁露', '台北霞海城隍廟', '美食','好吃好吃好吃好吃','11:00 - 15:00','台北市迪化街'],
            [3, '剝皮寮', '台北艋舺龍山寺', '景點','好玩好玩好玩','11:00 - 15:00','台北市萬華區'],
            [4, '福州元祖胡椒餅', '台北艋舺龍山寺', '美食','好吃好吃好吃好吃','11:00 - 15:00','台北市萬華區'],
            
        ],
        modify_data: '',
        menu: true,
    },
    methods: {
        change(id) {
            if (id == 'n') {
                this.modify_data[0] = this.sql.length + 1;
                this.sql.push(this.modify_data);
            } else {
                data = id - 1;
                this.sql[data] = this.modify_data;
            }
            this.menu = true;
            nav.$data.title = 'menu';
        },
        add(id) {
            this.menu = false;
            nav.$data.title = 'add';
            this.modify_data = [id, '', '籤王', '', '', '', ''];
        }
    },
    components: {
        row: {
            props: ['id', 'num', 'lucky', 'content', 'detail', 'answer'],
            template:
                `
            <tr :id=id>
                <td class="td_55"><h4>{{id}}</h4></td>
                <td class="td_125"><h4>{{num}}</h4></td>
                <td class="td_75"><h4>{{lucky}}</h4></td>
                <td class="td_75"><h4>{{content}}</h4></td>
                <td class="td_75"><i class="fas fa-edit" @click="modify(id)"></i></td>
            </tr>
            `,
            methods: {
                modify(id) {
                    window.scrollTo(0, 0);
                    data = id - 1;
                    backend.$data.menu = false;
                    nav.$data.title = 'modify';
                    backend.$data.modify_data = backend.$data.sql[data];
                },
            }
        },
    },
    mounted() {

        for (i = 0; i <= this.lists.length; i++) { //取得頁面title名字來綁定頁籤class
            if (this.lists[i] == document.title) {
                $('.listName').eq(i).addClass("bold");
            }
        }
    },
});
