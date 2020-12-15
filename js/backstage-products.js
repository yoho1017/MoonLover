Vue.component('paginate', VuejsPaginate);
// 每一頁要顯示的筆數
const PAGE_SIZE = 10;

var backend = new Vue({
    el: '#backend',
    data: {
        // ---------------留言清單---------------
        username: '',
        // 後台頁籤
        lists : [
            {list: '公版留言管理', href : "./backstage_publicMsg.html"},
            {list: '訂單管理', href : "./backstage_publicMsg.html"},
            {list : '周邊景點管理', href : "./backstage_mapList.html"},
            {list : '籤詩管理', href : "./backstage_draw.html"},
            {list : '商品管理', href : "./backstage_products.html"},
            {list : '會員資料管理', href : "./backstage_member.html"},
        ],
        // 預設顯示頁
        currentPage: 1,
        // 預設頁數
        pageCount: 1,
        sql: [],
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
    methods : {
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
        getMerchandise () {
            var vm = this;
            axios.post('./php/getMerchandise.php').then( response => {
                // console.log(response);
                // console.log(data);
                data = response.data;
                for ( i = 0 ; i <= data.length -1; i++) {
                    arr = [];
                    arr.push(data[i].ID);
                    arr.push(data[i].NAME);
                    arr.push(data[i].PRICE);
                    arr.push(data[i].IMAGE);
                    arr.push(data[i].INTRODUCTION);
                    arr.push(data[i].CUSTOMIZED);
                    arr.push(data[i].STATUS);
    
                    vm.sql.push(arr);
                }
            })
        }
    },
    components: {
        row: {
            props: ['id', 'name', 'price'],
            template:
                `
            <tr :id=id>
                <td class="td_55"><h4>{{id}}</h4></td>
                <td class="td_80"><h4>{{name}}</h4></td>
                <td class="td_75"><h4>{{price}}</h4></td>
                <td class="td_75">
                    <select class="input_status">
                        <option value="1">顯示</option>
                        <option value="0">隱藏</option>
                    </select>
                </td>
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
        created() {
            var vm =this;
            // 確認登入狀態
            axios.post('./php/sessionR.php').then( response => {
                // console.log(response);
                data = response.data;
                if (data != '') {
                    axios.get('./php/getMemberName.php', {
                        params: {
                        userId: data
                        }
                    })
                    .then( response=> {
                        vm.username = response.data;
                    })   
                }
            })        
            // 取得資料
            vm.getMerchandise();
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
