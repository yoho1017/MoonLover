Vue.component('paginate', VuejsPaginate);
// 每一頁要顯示的筆數
const PAGE_SIZE = 10;

const sqlData = [
    [1, '迪化街', '台北霞海城隍廟', '美食','好吃好吃','11:00 - 15:00','台北市迪化街'],
    [2, '顏記杏仁露', '台北霞海城隍廟', '美食','好吃好吃好吃好吃','11:00 - 15:00','台北市迪化街'],
    [3, '剝皮寮', '台北艋舺龍山寺', '景點','好玩好玩好玩','11:00 - 15:00','台北市萬華區'],
    [4, '福州元祖胡椒餅', '台北艋舺龍山寺', '美食','好吃好吃好吃好吃','11:00 - 15:00','台北市萬華區']
];

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
        // 修改的資料
        modify_data: '',
        // 上傳圖片預覽(預設為false)
        imgPreview : false,
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
            this.menu = true;
            nav.title = 'menu';
        },
        upload () {
            document.getElementById('upload').click();
        },
        uploadImg () {
            var vm = this;
            let file = document.getElementById('upload').files[0];
            let readFile = new FileReader();
            readFile.readAsDataURL(file);
            // console.log(readFile);
            readFile.addEventListener('load',function(){        
            document.getElementById('imgPreview').src = this.result;
            });
            vm.imgPreview = true;
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
        })        
        // pagination套件需要從外面傳入資料才會執行。以下請串axios以後把資料傳給vm.sql(串好後上面的sqldata可刪除)
        vm.sql = sqlData;
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
