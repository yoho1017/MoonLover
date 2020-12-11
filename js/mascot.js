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
        selectItem : {face: 1, head: 1, dress: 1,tail: 1},
        // 吉祥物圖片顯示客製化物件區塊
        itemshow : [false,false,false,false],
    },

    methods: {
        choice (num) { //選擇吉祥物
            this.mascot = this.mascots[num];
            this.currentMascot = this.mascot.id;
            this.deco = 0;
            this.reset ();
        },
        clickHandler(event) { //判斷是否顯示文字框
            name = event.target.id;
            if (name != 'rabbit' && name != 'fox' && name != 'monkey') {
                this.guiding = false;
            }else {
                this.guiding = true;
            }
        },
        decoClick(num) { //點擊客製化類別
            this.deco = num;
        },
        select (num,deco) { //點擊客製化物件
            this.itemshow[deco] = true;
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
            this.itemshow = [false,false,false,false];
            this.selectItem = {face: 1, head: 1, dress: 1,tail: 1};
        },
        dragover (e) {
            e.preventDefault();
        },
        dragend (e) { //拖曳放置客製化物件
            let mascot = document.querySelector('.mascots');
            rect = mascot.getBoundingClientRect();
            var x = e.pageX,
            y = e.pageY;
            if (( x <= rect.right && x >= rect.left) && (y >= rect.top && y <= rect.bottom)) {
                e.target.click();
            }
        },
        submit () { //確定送出

            // document.querySelector('.chat').style.display="none";

            // var divContent = document.getElementById("mascots").innerHTML;

            // var svg = "<svg xmlns='http://www.w3.org/2000/svg' width='300' height='300'>" 
            // +
            // "<foreignObject width='100%' height='100%'>" 
            // +
            // "<div xmlns='http://www.w3.org/1999/xhtml' style='font-size:16px;font-family:Helvetica'>" 
            // +
            // divContent 
            // +
            // "</div>" 
            // +
            // "</foreignObject>" 
            // +
            // "</svg>";
       
            // // document.getElementById('mascots').innerHTML = svg;

            // let data = new FormData(); //建立資料表單
            // data.append('mascot', svg); //配對ID

            // let config = {
            //     header : {
            //      'Content-Type' : 'multipart/form-data'
            //    }
            // }
            
            // axios.post('./php/createMascot.php', data, config).then(function (response) {
            //     // 更新資料
            //     data = response.data;
            //     // console.log(response);
            //     // console.log(data);
            // }).finally(() => {  
            // });

            

            var canvas = document.createElement('canvas');
            var ctx = canvas.getContext('2d');
            canvas.width = 500;
            canvas.height = 500;
            document.body.appendChild(canvas);
            var img = document.getElementById('mascot');

            var divWidth = document.querySelector('.mascotimg').offsetWidth;
            var divHeight = document.querySelector('.mascotimg').offsetWidth;

            var masWidth = document.getElementById('mascot').offsetWidth;
            var masHeight = document.getElementById('mascot').offsetHeight;

            // var masLeft = document.getElementById('mascot').offsetLeft;
            // var masTop = document.getElementById('mascot').offsetTop;

            var scale = Math.min(canvas.width / masWidth, canvas.height / masHeight);

            var mw = masWidth * scale;
            var mh = masHeight * scale;

            var masLeft = canvas.width / 2 - mw / 2;
            var masTop = canvas.height / 2 - mh / 2;

            console.log(masLeft);
       
            var face = document.getElementById('face');
            var faceWidth = document.querySelector('.face').offsetWidth;
            var faceHeight = document.querySelector('.face').offsetHeight;
            var faceLeft = document.querySelector('.face').offsetLeft;
            var faceTop = document.querySelector('.face').offsetTop;

            // var faceLeft = document.querySelector('.face').offsetLeft;
            // var faceTop = document.querySelector('.face').offsetTop;

            // var fw = faceWidth * scale;
            // var fh = faceHeight * scale;

            // var faceLeft =  canvas.width / 2 - fw / 2;
            // var faceTop = canvas.height / 2 - fh / 2;

            
            var head = document.getElementById('head');
            var headWidth = document.querySelector('.head').offsetWidth;
            var headHeight = document.querySelector('.head').offsetHeight;
            var headLeft = document.querySelector('.head').offsetLeft;
            var headTop = document.querySelector('.head').offsetTop;            

            var dress = document.getElementById('dress');
            var dressWidth = document.querySelector('.dress').offsetWidth;
            var dressHeight = document.querySelector('.dress').offsetHeight;
            var dressLeft = document.querySelector('.dress').offsetLeft;
            var dressTop = document.querySelector('.dress').offsetTop;

            var tail = document.getElementById('tail');
            var tailWidth = document.querySelector('.tail').offsetWidth;
            var tailHeight = document.querySelector('.tail').offsetHeight;
            var tailLeft = document.querySelector('.tail').offsetLeft;
            var tailTop = document.querySelector('.tail').offsetTop;

            ctx.drawImage(img,masLeft,masTop,masWidth,masHeight);
            ctx.drawImage(face,faceLeft,faceTop,faceWidth,faceHeight);
            ctx.drawImage(head,headLeft,headTop,headWidth,headHeight);
            ctx.drawImage(dress,dressLeft,dressTop,dressWidth,dressHeight);
            ctx.drawImage(tail,tailLeft,tailTop,tailWidth,tailHeight);

        }
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