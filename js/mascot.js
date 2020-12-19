var member = new Vue ({
    el : '#member',

    data : {
        // 會員中心頁籤
        lists : [
            {list: '個人資料', href : "./MyInfo.html"},
            {list: '我的吉祥物', href : "./MyMascot.html"},
            {list : '留言板', href : "./MyMsg.html"},
            {list : '我的訂單', href : "./MyOrder.html"}
        ],
        // 吉祥物物件
        mascots : [
            {name: '好人猿', image : 'monkey.png', guide : '男性代表', id : 'monkey'},
            {name: '小狐仙', image : 'fox.png', guide : '女性代表',  id : 'fox'},
            {name: '兔兒神', image : 'rabbit.png', guide : '代表同志', id : 'rabbit'},
        ],
        // 吉祥物引導文字
        mascot : {name: '好人猿', image : 'monkey.png', guide : '男性代表'},
        // 吉祥物引導(初始為開啟)
        guiding : true,
        // 現在顯示吉祥物
        currentMascot : 'monkey',
        // 現在顯示客製化物件欄
        deco : 0,
        // 已選擇客製化物件編號(預設為空)
        selectItem : {face: 'null', head: 'null', dress: 'null',tail: 'null'},
        // 顯示物件
        showobj : [false,false,false,false],
        // 物件引導文字
        obj : false,
        // 完成後跳出燈箱
        success : false,
        // 客製化吉祥物圖片
        custom : '',
    },

    methods: {
        choice (num) { //選擇吉祥物
            this.mascot = this.mascots[num];
            this.currentMascot = this.mascot.id;
            this.deco = 0;
            this.guiding = true;
            this.reset ();
        },
        clickHandler(event) { //判斷是否顯示文字框
            name = event.target.id;
            if (name != 'rabbit' && name != 'fox' && name != 'monkey') {
                this.guiding = false;
            }
            if (name != 'list_face' && name != 'list_head' && name != 'list_dress' && name != 'list_tail') {
                this.obj = false;
            }
        },
        decoClick(num) { //點擊客製化類別
            this.deco = num;
            this.obj = true;
        },
        select (num,deco) { //點擊客製化物件
            this.showobj[deco] = true;
            name = this.deconum (deco);
            this.selectItem[name] = num;
        },
        deconum (deco) { //判斷客製化物件是哪一個類別
            if (deco == 0) {
                return 'face'
            }else if (deco == 1) {
                return 'head'
            }else if (deco == 2) {
                return 'dress'
            }else{
                return 'tail'
            }    
        },
        reset () { //重設按鈕
            this.selectItem = {face: 'null', head: 'null', dress: 'null',tail: 'null'};
            this.showobj = [false,false,false,false];
        },
        dragover (e) {
            e.preventDefault();
        },
        dragend (e) { //拖曳放置客製化物件
            e.preventDefault();
            e.dataTransfer.getData('img1');
            let mascot = document.querySelector('.mascots');
            rect = mascot.getBoundingClientRect();
            var x = e.pageX,
            y = e.pageY;
            if (( x <= rect.right && x >= rect.left) && (y >= rect.top && y <= rect.bottom)) {
                e.target.click();
            }
        },
        close () { //關閉燈箱
            this.success = false;
        },
        submit () { //確定送出
            
            // 建立canvas
            var canvas = document.createElement('canvas');
            var ctx = canvas.getContext('2d');
            canvas.width = 500;
            canvas.height = 500;
            // document.body.appendChild(canvas);
            var img = document.getElementById('mascot');

            // 吉祥物圖片
            var masWidth = document.getElementById('mascot').offsetWidth;
            var masHeight = document.getElementById('mascot').offsetHeight;
            var masLeft = document.getElementById('mascot').offsetLeft;
            var masTop = document.getElementById('mascot').offsetTop;

            // 原始div比例計算
            // var scale = Math.min(canvas.width / masWidth, canvas.height / masHeight);
            // console.log(canvas.width);
            // console.log(masWidth);

            // 面飾
            var face = document.getElementById('face');
            var faceWidth = document.querySelector('.face').offsetWidth;
            var faceHeight = document.querySelector('.face').offsetHeight;
            var faceTop = document.querySelector('.face').offsetTop;
            var faceLeft = document.querySelector('.face').offsetLeft;


            // 頭飾
            var head = document.getElementById('head');
            var headWidth = document.querySelector('.head').offsetWidth;
            var headHeight = document.querySelector('.head').offsetHeight;
            var headTop = document.querySelector('.head').offsetTop;              
            var headLeft = document.querySelector('.head').offsetLeft;

            // 配件
            var dress = document.getElementById('dress');
            var dressWidth = document.querySelector('.dress').offsetWidth;
            var dressHeight = document.querySelector('.dress').offsetHeight;
            var dressTop = document.querySelector('.dress').offsetTop;              
            var dressLeft = document.querySelector('.dress').offsetLeft;


            // 尾巴
            var tail = document.getElementById('tail');
            var tailWidth = document.querySelector('.tail').offsetWidth;
            var tailHeight = document.querySelector('.tail').offsetHeight;
            var tailTop = document.querySelector('.tail').offsetTop -6;              
            var tailLeft = document.querySelector('.tail').offsetLeft;

            var ml = (canvas.width / 2) - (masWidth / 2);
            var mt = (canvas.height / 2) - (masHeight / 2);

            var ft = faceTop + mt  - 2;
            var fl = faceLeft - masLeft + ml;
    
            var ht = headTop + mt;              
            var hl = headLeft - masLeft + ml;
    
            var dt = dressTop + mt;              
            var dl = dressLeft - masLeft + ml;
    
            var tt = tailTop + mt;              
            var tl = tailLeft - masLeft + ml;

            ctx.drawImage(img,ml,mt,masWidth,masHeight);
            ctx.drawImage(head,hl,ht,headWidth,headHeight);
            ctx.drawImage(dress,dl,dt,dressWidth,dressHeight);
            ctx.drawImage(tail,tl,tt,tailWidth,tailHeight);
            ctx.drawImage(face,fl,ft,faceWidth,faceHeight);

            // 出圖
            var dataURL = canvas.toDataURL();
            // console.log(dataURL);

            let data = new FormData(); //建立資料表單
            data.append('mascot', dataURL); 

            let config = {
                header : {
                 'Content-Type' : 'multipart/form-data'
               }
            }
            
            axios.post('./php/createMascot.php', data, config).then( response => {
                // 更新資料
                data = response.data;
                // console.log(response);
                // console.log(data);
                if (response.status == 200) {
                    this.success = true;
                    this.custom = dataURL;
                }
            }).catch(() => { 
                alert("錯誤 !") 
            });
        },
    },
    computed : {
        // 以下為吉祥物客製化物件區塊class設定
        getFace : function () {
            return {
                monkey_face : true && this.currentMascot == 'monkey',
                fox_face : true && this.currentMascot == 'fox',
                rabbit_face : true && this.currentMascot == 'rabbit',
            }
        },
        getHead : function () {
            return {
                monkey_head : true && this.currentMascot == 'monkey',
                fox_head : true && this.currentMascot == 'fox',
                rabbit_head : true && this.currentMascot == 'rabbit',
            }
        },
        getDress : function () {
            return {
                monkey_dress : true && this.currentMascot == 'monkey',
                fox_dress : true && this.currentMascot == 'fox',
                rabbit_dress : true && this.currentMascot == 'rabbit',
            }
        },
        getTail : function () {
            return {
                monkey_tail : true && this.currentMascot == 'monkey',
                fox_tail : true && this.currentMascot == 'fox',
                rabbit_tail : true && this.currentMascot == 'rabbit',
            }
        },
    },
    mounted() {

        window.addEventListener('click', this.clickHandler);

        for (i = 0 ; i <= this.lists.length -1; i++) {
            //取得頁面title名字來綁定會員頁籤class
            if (this.lists[i].list == document.title) {
                $('.listName').eq(i).addClass( "bold" );
            }
        }

    },

})