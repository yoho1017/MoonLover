Vue.component('paginate', VuejsPaginate);
// 每一頁要顯示的筆數
const PAGE_SIZE = 10;

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
        username: '碩哥',
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
    watch: {
        // 呼叫頁數設定函式
        sql: function (val) {
            this._setPage2Model();
        }
    },
    methods: {
        // 取消編輯
        cancel () {
            var vm = this;
            vm.menu = true;
        },
        // 修改或新增資料跳轉
        // 如果是textarea就需要把換行字元修改成<br>
        change(id) {
            var vm = this;
            vm.modify_data[2] = vm.modify_data[2].replace(/\n|\r\n/g,"<br>");
            vm.modify_data[3] = vm.modify_data[3].replace(/\n|\r\n/g,"<br>");
            vm.modify_data[4] = vm.modify_data[4].replace(/\n|\r\n/g,"<br>");
            vm.modify_data[5] = vm.modify_data[5].replace(/\n|\r\n/g,"<br>");
            // 如果是新增
            if (id == 'n') {
                // id
                vm.modify_data[0] = vm.sql.length + 1;
                // array index
                data = vm.sql.length;
                // array push
                vm.sql.push(vm.modify_data);
                vm.sql[data][6] = 0; //修改後預設顯示狀態是0
                vm.axiosUpdate(vm.modify_data,'new'); //axios函式
                // 如果是修改
            } else {
                // array index
                data = id - 1;
                vm.sql[data] = vm.modify_data;
                vm.sql[data][6] = 0; //修改後預設顯示狀態是0
                vm.axiosUpdate(vm.modify_data,'old'); //axios函式
            }
            vm.menu = true;
            nav.$data.title = 'menu';
        },
        // 傳送資料給axios
        axiosUpdate (newdata,type) {
            let data = new FormData(); //建立資料表單
            if (type == 'new') {
                data.append('id', type);
            }else{
                data.append('id', newdata[0]);
            }
            data.append('NUM', newdata[1]);
            data.append('DRAW_LUCKY', newdata[2]); 
            data.append('DRAW_CONTENT', newdata[3]);
            data.append('DRAW_DETAIL', newdata[4]);
            data.append('DRAW_ANSWER', newdata[5]);
            data.append('STATUS', 0); //修改後預設顯示狀態是0


            let config = {
                header : {
                 'Content-Type' : 'multipart/form-data'
               }
            }

            axios.post('./php/updateDraw.php',  data, config
            ).then( response=> {
                data = response.data;
                // console.log(response);
             }).catch(() => { 
                alert("錯誤 !") 
            })
        },
        // 送出新增資料
        add(id) {
            var vm = this;
            vm.menu = false;
            nav.$data.title = 'add';
            vm.modify_data = [id, '', '籤王', '', '', '', ''];
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
        // 更新狀態
        updateStatus (val,id,index) {
            var vm = this;
            vm.sql[index][6] = val;

            let data = new FormData(); //建立資料表單
            data.append('table', `draw`); //table
            data.append('CNANE', `STATUS`); //columnName
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
             }).catch(() => { 
                alert("錯誤 !") 
            })
        }
    },
    // v-html->如果是資料包含html語法需要用v-html渲染，如果是一般文字內容用{{}}即可
    components: {
        row: {
            props: ['id', 'index' ,'num', 'lucky', 'content', 'detail', 'answer','status'],
            template:
                `
            <tr :id=id>
                <td class="td_55"><h4 v-html="id"></h4></td>
                <td class="td_80"><h4 v-html="num"></h4></td>
                <td class="td_75"><h4 v-html="lucky"></h4></td>
                <td class="td_125"><h4 v-html="content"></h4></td>
                <td class="td_125"><h4 v-html="detail"></h4></td>
                <td class="td_125"><h4 v-html="answer"></h4></td>
                <td class="td_75">
                    <select class="input_status" name="status" @change="updateStatus($event,id,index)" :id=index>
                        <option value="1" :selected="status == '1'">顯示</option>
                        <option value="0" :selected="status == '0'">隱藏</option>
                    </select>
                </td>
                <td class="td_75"><i class="fas fa-edit" @click="modify(id)"></i></td>
            </tr>
            `,
            methods: {
                // 修改資料
                // 如果是textarea就需要把<br>換成換行字元
                modify(id) {
                    var vm = backend.$data;
                    window.scrollTo(0, 0);
                    data = id - 1;
                    vm.menu = false;
                    nav.$data.title = 'modify';
                    vm.modify_data = vm.sql[data];
                    vm.modify_data[3] = vm.modify_data[3].replace(/<br>/g,"\n");
                    vm.modify_data[4] = vm.modify_data[4].replace(/<br>/g,"\n");
                    vm.modify_data[5] = vm.modify_data[5].replace(/<br>/g,"\n");
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
        }).catch(() => { 
            alert("錯誤 !") 
        })        
        // 取得資料
        // 取得資料是select option的用的值，資料庫資料有<br>需要把它拿掉
        axios.post('./php/getDraw.php').then( response => {
            // console.log(response);
            // console.log(data);
            data = response.data;
            for ( i = 0 ; i <= data.length -1; i++) {
                arr = [];
                arr.push(data[i].ID);
                arr.push(data[i].NUM);
                arr.push(data[i].DRAW_LUCKY.replace(/<br>/g,""));
                arr.push(data[i].DRAW_CONTENT);
                arr.push(data[i].DRAW_DETAIL);
                arr.push(data[i].DRAW_ANSWER);
                arr.push(data[i].STATUS);

                vm.sql.push(arr);
            }
        }).catch(() => { 
            alert("錯誤 !") 
        })        
        // console.log(vm.sql);                  
    },
    mounted () {
        var vm = this;
        for (i = 0; i <= vm.lists.length -1; i++) { //取得頁面title名字來綁定頁籤class
            if (vm.lists[i].list == document.title) {
                $('.listName').eq(i).addClass("bold");
            }
        }
    },
});
