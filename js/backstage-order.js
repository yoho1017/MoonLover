Vue.component('paginate', VuejsPaginate);
// 每一頁要顯示的筆數
const PAGE_SIZE = 10;

// const sqlData = [
//     {ID : 1, USERNAME: 'BiBiOTA', PRICE: '299', ORDER_TIME: '2020-11-01 23:59', CANCEL_DATE : '',  ORDER_STATUS: 1},
//     {ID : 1, USERNAME: 'BiBiOTA', PRICE: '299', ORDER_TIME: '2020-11-01 23:59', CANCEL_DATE : '',  ORDER_STATUS: 1},
//     {ID : 1, USERNAME: 'BiBiOTA', PRICE: '299', ORDER_TIME: '2020-11-01 23:59', CANCEL_DATE : '',  ORDER_STATUS: 1},
//     {ID : 1, USERNAME: 'BiBiOTA', PRICE: '299', ORDER_TIME: '2020-11-01 23:59', CANCEL_DATE : '',  ORDER_STATUS: 1},
// ];

var nav = new Vue({
    el: '#nav',
    data: {
        title: 'menu',
    },
    methods: {
        logout () {
            axios.post('./php/logoutR.php').then(function () {
                window.location.href="./index.html";
            }).catch(() => { 
                alert("錯誤 !") 
            })        
        }
    },
    beforeCreate() {
        (function(){
            axios.post('./php/sessionMemberType.php').then( response=> {
                data = response.data;
                if (data != 3) {
                    document.body.style.display= "none";
                    alert('未登入');
                    window.location.href="./index.html";
                }
            }).catch(() => { 
                alert("錯誤 !") 
                window.location.href="./index.html";
            })                
        }())
    },

});

var backend = new Vue({
    el: '#backend',
    data: {
        // ---------------留言清單---------------
        username: '',
        // 後台頁籤
        lists : [
            {list: '公版留言管理', href : "./backstage_publicMsg.html"},
            {list: '訂單管理', href : "./backstage_order.html"},
            {list : '周邊景點管理', href : "./backstage_mapList.html"},
            {list : '籤詩管理', href : "./backstage_draw.html"},
            {list : '商品管理', href : "./backstage_products.html"},
            {list : '會員資料管理', href : "./backstage_member.html"},
        ],
        // 預設顯示頁
        currentPage: 1,
        // 預設頁數
        pageCount: 1,
        // 取得資料
        sql: [],
        // 訂單明細
        products: [],        
        // 修改的資料
        modify_data: '',
        // 清單顯示(預設為true)
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
        cancel () {
            this.menu = true,
            nav.title = 'menu'
        },
        change (modify) {
            // console.log(modify);
            var vm = this;

            let data = new FormData(); //建立資料表單
            data.append('id', modify.ID);
            data.append('STATUS', modify.ORDER_STATUS);

            let config = {
                header : {
                 'Content-Type' : 'multipart/form-data'
               }
            }    

            axios.post('./php/updateOrder.php', data, config).then( response => {
                // console.log(response.data);
                data = response.data;
                vm.sql = [];
                vm.sql = data;
                vm.menu = true;
                nav.title = 'menu';
                
            }).catch(() => { 
                alert("錯誤 !") 
            });                    
        },
    },
    components: {
        row: {
            props: ['id', 'index', 'name', 'price', 'date'],
            template:
                `
            <tr :id=id>
                <td class="td_55"><h4>{{id}}</h4></td>
                <td class="td_80"><h4>{{name}}</h4></td>
                <td class="td_75"><h4>{{price}}</h4></td>
                <td class="td_75"><h4>{{date}}</h4></td>
                <td class="td_75"><i class="fas fa-edit" @click="modify(id)"></i></td>
            </tr>
            `,
            methods: {
                modify(id) {
                    var vm = this;
                    window.scrollTo(0, 0);
                    data = id - 1;
                    backend.menu = false;
                    nav.title = 'modify';
                    backend.modify_data = backend.sql[data];
                    vm.getDetail(id);
                },
                getDetail (id) {
                    let data = new FormData(); //建立資料表單
                    data.append('id', id);
    
                    let config = {
                        header : {
                         'Content-Type' : 'multipart/form-data'
                       }
                    }    

                    axios.post('./php/getOrderDetail.php', data, config).then( response => {
                        // console.log(response.data);
                        products = response.data;
                        backend.products = products;
                    }).catch(() => { 
                        alert("錯誤 !") 
                    });                    
                },
            },
        },
        products : {
            props : ['name','num','price'],
            template :
            `
            <tr>
                <td class="td_25">
                    <h4>訂單明細</h4>
                </td>
                <td class="td_25">
                    {{name}}
                </td>
                <td class="td_25">
                    數量:{{num}}
                </td>
                <td class="td_25">
                    金額:{{price}}
                </td>
            </tr>
            `
        },
    },
    created() {
        var vm = this;
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
        }).catch(() => { 
            alert("錯誤 !") 
        });
        
        axios.post('./php/getOrder.php').then( response => {
            // console.log(response);
            data = response.data;
            vm.sql = data;
        }).catch(() => { 
            alert("錯誤 !") 
        });        

        // pagination套件需要從外面傳入資料才會執行。以下請串axios以後把資料傳給vm.sql(串好後上面的sqldata可刪除)
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
