Vue.component('paginate', VuejsPaginate);
// 每一頁要顯示的筆數
const PAGE_SIZE = 10;

// const sqlData = [
//     [1,'F001','BiBiOTA','2020-06-06','不雅文字','這網站真的好爛啊！',1],
//     [2,'M001','Yoho','2020-11-03','不雅文字','這網站好爛！',0],
//     [3,'M003','AsoJi','2020-11-04','不雅文字','這網站好爛！',1],
//     [4,'M003','BiBiOTA','2020-11-05','不雅文字','這網站好爛！',0],
//     [5,'M003','AsoJi','2020-12-01','不雅文字','這網站好爛！',1],
//     [6,'M003','Yoho','2020-12-02','不雅文字','這網站好爛！',0],
// ];

var nav = new Vue ({
    el: '#nav',
    data : {
        title : 'menu',
    },
    methods: {
        logout () {
            axios.post('./php/logoutR.php').then(function () {
                window.location.href="./index.html";
            }).catch(() => { 
                console.log("錯誤 !") 
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
                console.log("錯誤 !") 
                window.location.href="./index.html";
            })                
        }())
    },
});

var backend = new Vue ({
    el : '#backend',
    data : {
        // ---------------留言清單---------------
        username : '',
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
        cancel () {
            this.menu = true;
            nav.title = 'menu';
        },
        change () {
            var params = new URLSearchParams();            
            params.append('tmId', this.modify_data[1]);
            params.append('status', this.modify_data[7]);

            axios.post('./php/updateMsgStatus.php', params).then( response => {
                let result = response.data;
                // console.log(result);
            }).catch(() => { 
                console.log("錯誤 !") 
            });

            this.menu = true;
            nav.$data.title = 'menu';
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
                    // window.scrollTo(0,0);
                    // data = id -1;
                    backend.$data.menu = false;
                    nav.$data.title = 'modify';
                    // backend.$data.modify_data = backend.$data.sql[data];
                    let data = new FormData();
                    data.append('id', id);

                    let config = {
                        header : {
                            'Content-Type' : 'multipart/form-data'
                        }
                    }
                    
                    axios.post('./php/getMsgReportM.php', data, config).then( response => {
                        re = response.data;
                        backend.$data.modify_data = re;
                        console.log(re);
                    });

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
        }).catch(() => { 
            console.log("錯誤 !") 
        })        
        // pagination套件需要從外面傳入資料才會執行。以下請串axios以後把資料傳給vm.sql(串好後上面的sqldata可刪除)
        // vm.sql = sqlData;

        axios.post('./php/getMsgReport.php').then( (res) => {
            data = res.data;
            console.log(data);
            for (let i=0; i< data.length; i++){
                arr = [];
                arr.push(data[i].ID);
                arr.push(data[i].MSG_ID);
                arr.push(data[i].USERNAME);
                arr.push(data[i].MSG_REPORT_TIME);
                arr.push(data[i].REPORT_REASON);

                vm.sql.push(arr);
            }

        }).catch(() => { 
            alert("錯誤 !") 
        })
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
