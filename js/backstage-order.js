Vue.component('paginate', VuejsPaginate);
// 每一頁要顯示的筆數
const PAGE_SIZE = 10;

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
            [1, 'BiBiOTA', '499', '2020-11-01 13:56', '', '來創建角色屬於自己的角色與製作悠遊卡,既實用又美麗。'],
            [2, 'AsoJi', '100000000', '2020-11-01 13:56', '', '舒服的客製化大抱枕讓顧客有一個好的睡眠。'],
            [3, 'AsoJi', '100000000', '2020-11-01 13:56', '', '客製化口罩不只美觀還可以抵抗空氣汙染,每一次的呼吸都有乾淨的空氣。'],
            [4, 'AsoJi', '100000000', '2020-11-01 13:56', '', '可以讓顧客隨時記錄生活中的大小事情。'],
            [5, 'AsoJi', '100000000', '2020-11-01 13:56', '', '顧客可以透過姻緣線找到想要的姻緣。'],
            [6, 'AsoJi', '100000000', '2020-11-01 13:56', '', '讓每一張衛生紙都有祝福,好看的圖樣讓顧客滿意。'],
            [7, 'AsoJi', '100000000', '2020-11-01 13:56', '', '設計的紅包讓顧客可以珍藏或是成為收藏品。'],
            [8, 'AsoJi', '100000000', '2020-11-01 13:56', '', '美觀的杯墊讓顧客可以墊著冷熱飲品,漂亮又實用。'],
        ],
        modify_data: '',
        menu: true,
    },
    computed: {
        // 回傳頁數
        pagedListdata: function () {
            var vm = this;
            if (vm.sql && vm.sql.length > 0) {
                return vm.sql.filter(function (x) {
                    return x.page === vm.currentPage;
                })
            }
            else {
                return [];
            }
        }
    },
    watch: {
        // 呼叫頁數設定函式
        sql: function (val) {
            this._setPage2Model();
        }
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
        },
        add(id) {
            this.menu = false;
            this.modify_data = [id, '', '', '', '', '', ''];
        },
        // 計算分頁
        _setPage2Model: function () {
            var vm = this;

            if (!vm.sql || vm.sql.length <= 0) {
                vm.pageCount = 1;
            }
            else {
                vm.pageCount = parseInt(vm.sql.length / PAGE_SIZE) + (vm.sql.length % PAGE_SIZE > 0 ? 1 : 0);
                for (let i = 0; i < vm.sql.length; i++) {
                    vm.$set(vm.sql[i], "page", parseInt(i / PAGE_SIZE) + 1);
                }
            }
        },
        // 點擊分頁連結時換分頁
        pageCallback: function (page) {
            var vm = this;
            this.$set(vm, 'currentPage', page);
            // // 換分頁時卷軸到最上方
            window.scrollTo(0,0);
        },
    },
    components: {
        row: {
            props: ['id', 'membership', 'order_price', 'order_date'],
            template:
                `
            <tr :id=id>
                <td class="td_55"><h4>{{id}}</h4></td>
                <td class="td_80"><h4>{{membership}}</h4></td>
                <td class="td_75"><h4>{{order_price}}</h4></td>
                <td class="td_75"><h4>{{order_date}}</h4></td>
                <td class="td_75"><i class="fas fa-edit" @click="modify(id)"></i></td>
            </tr>
            `,
            methods: {
                modify(id) {
                    window.scrollTo(0, 0);
                    data = id - 1;
                    backend.$data.menu = false;
                    backend.$data.modify_data = backend.$data.sql[data];
                },
            }
        },
    },
    mounted() {

        var vm = this;
        for (i = 0; i <= vm.lists.length -1; i++) { //取得頁面title名字來綁定頁籤class
            if (vm.lists[i].list == document.title) {
                $('.listName').eq(i).addClass("bold");
            }
        }
    },
});
