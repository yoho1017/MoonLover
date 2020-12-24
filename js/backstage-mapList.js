Vue.component('paginate', VuejsPaginate);
// 每一頁要顯示的筆數
const PAGE_SIZE = 10;

// const sqlData = [
//     [1, '迪化街', '台北霞海城隍廟', '美食','好吃好吃','11:00 - 15:00','台北市迪化街'],
//     [2, '顏記杏仁露', '台北霞海城隍廟', '美食','好吃好吃好吃好吃','11:00 - 15:00','台北市迪化街'],
//     [3, '剝皮寮', '台北艋舺龍山寺', '景點','好玩好玩好玩','11:00 - 15:00','台北市萬華區'],
//     [4, '福州元祖胡椒餅', '台北艋舺龍山寺', '美食','好吃好吃好吃好吃','11:00 - 15:00','台北市萬華區']
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
        change() {
            var vm = this;
            let id = this.modify_data[0];
            // console.log(id);
            if (id == 'n') {
                vm.modify_data[0] = vm.sql.length + 1;
                vm.sql.push(vm.modify_data);

                vm.axiosUpdate(vm.modify_data,'new'); 
            } else {
                data = id - 1;
                vm.sql[data] = vm.modify_data;

                vm.axiosUpdate(vm.modify_data,'old'); 
            }
        },
        axiosUpdate(newdata,type){
            var vm = this;
            let data = new FormData(); //建立資料表單
            if (type == 'new') {
                data.append('id', type);
            }else{
                data.append('id', newdata[0]);
            }
            data.append('NAME', newdata[1]);
            data.append('tName', newdata[2]); 
            data.append('TEMPLE_LOCATION_CATEGORY', newdata[3]);
            data.append('GUIDE', newdata[4]);
            data.append('OPEN_TIME', newdata[5]);
            data.append('ADDRESS', newdata[6]);
            data.append('IMAGE', newdata[7]);
            data.append('LOCATION_LINK', newdata[8]);
            data.append('LOCATION_STATUS', newdata[9]);

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
                
    
    
    
    
                    data.append('newImg','newImg');
                    data.append('img',dataURL);
            }else{
                    data.append('oldImg','oldImg');
            }
    

            let config = {
                header : {
                 'Content-Type' : 'multipart/form-data'
               }
            }

            axios.post('./php/updateTempleLocation.php', data, config).then( (res) => {
                data =res.data;
                // console.log(data);
                vm.modify_data = [];
                vm.imgPreview = false;
                vm.menu = true;
                nav.title = 'menu'    
            }).catch(() => { 
                console.log("錯誤 !") 
            })


        },
        add(id) {
            this.menu = false;
            nav.$data.title = 'add';
            this.modify_data = [id, '', '', '', '', '', '','','',0];
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
        }).catch(() => { 
            console.log("錯誤 !") 
        })        
        // pagination套件需要從外面傳入資料才會執行。以下請串axios以後把資料傳給vm.sql(串好後上面的sqldata可刪除)
        // vm.sql = sqlData;

        axios.post('./php/getTempleLocation.php').then( (res) => {
            data = res.data;
            // console.log(data);
            for (let i=0; i< data.length; i++){
                arr = [];
                arr.push(data[i].ID);
                arr.push(data[i].NAME);
                arr.push(data[i].tName);
                arr.push(data[i].TEMPLE_LOCATION_CATEGORY);
                arr.push(data[i].GUIDE);
                arr.push(data[i].OPEN_TIME);
                arr.push(data[i].ADDRESS);
                arr.push(data[i].IMAGE);
                arr.push(data[i].LOCATION_LINK);
                arr.push(data[i].LOCATION_STATUS);

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
