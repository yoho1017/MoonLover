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
            data.append('table', `merchandise`); //table
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
                })
        },        
        change() {
            var vm = this;

            if (vm.imgPreview == true) {


            // 建立canvas
            var canvas = document.createElement('canvas');
            var ctx = canvas.getContext('2d');

            // 測試用
            // document.body.appendChild(canvas);

            var imgWidth = document.getElementById('imgPreview').offsetWidth;
            var imgHeight = document.getElementById('imgPreview').offsetHeight;

            canvas.width = imgWidth;
            canvas.height = imgHeight;

            let img = document.getElementById('imgPreview');

            var il = (canvas.width / 2) - (imgWidth / 2);
            var it = (canvas.height / 2) - (imgHeight / 2);


            ctx.drawImage(img,il,it,imgWidth,imgHeight);
            var dataURL = canvas.toDataURL();
            




              vm.modify_data.push('newImg');
              vm.modify_data.push(dataURL);
            }else{
              vm.modify_data.push('oldImg');
            }

            let data = new FormData(); //建立資料表單
            data.append('data', JSON.stringify(vm.modify_data)); 

            let config = {
                header : {
                    'Content-Type' : 'multipart/form-data'
                }
            }        


            axios.post('./php/updateMerchandise.php',  data, config).then( response => {
                // console.log(response.data);

                vm.modify_data = [];
                vm.sql = [];
                vm.getMerchandise ();
                vm.imgPreview = false
                vm.menu = true;    
            })
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
            props: ['id', 'index' ,'name', 'price' , 'status'],
            template:
                `
            <tr :id=id>
                <td class="td_55"><h4>{{id}}</h4></td>
                <td class="td_80"><h4>{{name}}</h4></td>
                <td class="td_75"><h4>{{price}}</h4></td>
                <td class="td_75">
                    <select class="input_status" :id="index" @change="updateStatus($event,id,index)">
                        <option value="1" :selected="status == '1'">上架</option>
                        <option value="0" :selected="status == '0'">下架</option>
                    </select>
                </td>
                <td class="td_75"><i class="fas fa-edit" @click="modify(index)"></i></td>
            </tr>
            `,
            methods: {
                modify(index) {
                    window.scrollTo(0, 0);
                    backend.menu = false;
                    backend.modify_data = backend.sql[index];
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
