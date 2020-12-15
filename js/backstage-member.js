Vue.component('paginate', VuejsPaginate);
// 每一頁要顯示的筆數
const PAGE_SIZE = 10;

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
        username : '',
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
        sql:[],
        modify_data : '', //給空字串或空陣列都可以
        interest_data : '',
        Sdata : '',
        menu : true,
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
        // 更新狀態
        updateStatus (val,id,index) {
            var vm = this;
            vm.sql[index][6] = val;

            let data = new FormData(); //建立資料表單
            data.append('table', `member`); //table
            data.append('CNANE', `MEMBER_TYPE`); //columnName
            data.append('id', id); //資料id
            data.append('status', val); //更新狀態

            let config = {
                header : {
                    'Content-Type' : 'multipart/form-data'
                }
            }

            axios.post('./php/updateStatus.php',  data, config
            ).then( response=> {
                data = response.data;
                // console.log(response);
                })
        },
        // 確認會員公開資料
        checkData () {
            var vm = this;
            if (vm.modify_data[0].PAIR_PRIV == 0) {
                vm.modify_data[0].PAIR_PRIV = '否'
            }else {
                vm.modify_data[0].PAIR_PRIV = '是'
            };
            if (vm.modify_data[0].PUBLIC_PRIV == 0) {
                vm.modify_data[0].PUBLIC_PRIV = '否'
            }else {
                vm.modify_data[0].PUBLIC_PRIV = '是'
            }
        },    
        // 取得會員資料
        getMember () {
            var vm = this;
            axios.post('./php/getMember.php').then( response => {
                // console.log(response);
                // console.log(data);
                data = response.data;
                for ( i = 0 ; i <= data.length -1; i++) {
                    arr = [];
                    arr.push(data[i].ID);
                    arr.push(data[i].USERNAME);
                    arr.push(data[i].EMAIL);
                    arr.push(data[i].MEMBER_TYPE);
    
                    vm.sql.push(arr);
                }
            })            
        },
        // 搜尋功能
        search (Sdata) {
            // console.log(Sdata);
            var vm = this;
            vm.sql = [];
            if (Sdata != '') {
                let data = new FormData(); //建立資料表單
                data.append('username', Sdata); 
    
                let config = {
                    header : {
                        'Content-Type' : 'multipart/form-data'
                    }
                }        


                axios.post('./php/searchMember.php', data, config).then( response => {
                    // console.log(response);
                    // console.log(data);
                    data = response.data;
                    arr = [];
                    for ( i = 0 ; i <= data.length -1; i++) {
                        arr = [];
                        arr.push(data[i].ID);
                        arr.push(data[i].USERNAME);
                        arr.push(data[i].EMAIL);
                        arr.push(data[i].MEMBER_TYPE);
            
                        vm.sql.push(arr);
                    }
                })    
            }else{
                vm.getMember ();
            }
        }
    },
    components:{
        row:{
            props:['id','index','acct','pwd','email','status'],
            template:
            `<tr :id=id>
                <td class="td_10"><h4>{{id}}</h4></td>
                <td class="td_25"><h4>{{acct}}</h4></td>
                <td class="td_50"><h4>{{email}}</h4></td>
                <td class="td_25">
                    <select class="input_status" :id="index" @change="updateStatus($event,id,index)">
                        <option value="0" :selected="status == '0'">一般會員</option>
                        <option value="1" :selected="status == '1'">進階會員</option>
                        <option value="2" :selected="status == '2'">停權會員</option>
                        <option value="3" :selected="status == '3'">管理員</option>
                    </select>
                </td>
                <td class="td_25">
                  <h4 class="more" @click="modify(id)">更多</h4>
                </td>
            </tr>
            `,
            methods:{
                modify(id){
                    let data = new FormData(); //建立資料表單
                    data.append('id', id); 
        
                    let config = {
                        header : {
                            'Content-Type' : 'multipart/form-data'
                        }
                    }        


                    axios.post('./php/memberData.php',  data, config).then( response => {
                        // console.log(response.data);
                        backend.modify_data = response.data;
                        backend.checkData();

                        axios.post('./php/bs_selectInterestR.php',  data, config).then( response => {
                            // console.log(response.data);

                            interest = [];
                            for (i = 0; i <= response.data.length -1; i++) {
                                choose = response.data[i].name
                                interest.push(` ${choose} `)
                            }''
                            backend.interest_data = interest.join("|");            
    
                            window.scrollTo(0,0);
                            backend.menu = false;
                            nav.title = 'modify';    
                        })    
                    })
                },
                // 回傳給複層狀態
                updateStatus (e,id,index) {
                    var vm = this;
                    vm.$emit('update', e.target.value,id,index);
                }                
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
        vm.getMember();
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
