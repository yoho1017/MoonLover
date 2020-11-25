var member = new Vue ({
    el : '#member',
    data : {
        // ---------------留言清單---------------
        // 會員中心頁籤
        lists : ['個人資料','我的吉祥物','留言板','我的訂單'],
        // 收到留言
        messages : [
            {id: 1, name : '小芳', msg: '張互賓', image: '../images/MyMsg/person1.png', newnum: 1},
            {id: 2, name : '蘋果姊姊', msg: '星期六我們去大稻埕霞海城隍廟', image: '../images/MyMsg/person2.png', newnum: 0},
            {id: 3, name : '酪梨姊姊', msg: '要揪團嗎?', image: '../images/MyMsg/person3.png', newnum: 2},
        ],
        // 新留言顯示
        newStr : '傳送一則新留言給你',
        // -----------------留言頁-----------------        
        // 打開留言內頁
        MsgMenu : true,
        // 朋友訊息
        frMsg : [
            {name : '小芳', msg: '互賓', image: '../images/MyMsg/person1.png', time: '2020 10 17 12:24'},
        ],
        // 自己訊息
        myMsg : [
            {msg: '= =??', image: '../images/MyMsg/person_special.jpg', time: '2020 10 17 12:24'},
        ],
        // 發送出去的訊息
        newText : '',
        // 封鎖燈箱(預設關閉)
        block_block : false
    },
    methods: {
        backmenu (list) {
           if (list == document.title) {
                location.reload();
           }
        },
        checkNewMsg () {
                // 如為新留言時出現提醒icon和文字function
            newMsg = document.querySelectorAll('.newMsg')
            newMsgStr = document.querySelectorAll('.newMsg h2')
            for (i = 0 ; i <= newMsg.length -1; i++) {
                if(newMsgStr[i].innerHTML == 0) {
                    newMsg[i].classList.add('none');
                }else{
                    Msgcontent = document.querySelectorAll('.msgh3')[i];
                    Msgcontent.innerHTML = this.newStr;
                    Msgcontent.style.fontWeight = "bold";
                }
            }
        },
        submit (newText) {
            if (newText != '') {
                this.myMsg.push( 
                    {msg: newText, image: '../images/MyMsg/person_special.jpg', time: this.getTime ()}
                );
                setTimeout(this.scrollTo, .1);
                this.newText = '';
            }
        },
        getTime () {
            today = new Date();
            date = today.getFullYear()+' '+ (today.getMonth()<10 ? '0' : '')  + (today.getMonth()+1)+' '+ (today.getDate()<10 ? '0' : '') + today.getDate() + ' ' + (today.getHours()<10 ? '0' : '') + today.getHours() + ':' + (today.getMinutes()<10 ? '0' : '') + today.getMinutes();
            return date;    
        },
        scrollTo () {
            document.querySelector(".msgbox").scrollTo(0,document.querySelector(".msgbox").scrollHeight);
        },
        close_block () {
            this.block_block = false;
        }
    },
    components : {
        // 訊息組件
        message : {
            props : ['id','name','msg','image','newnum'],
            template :
                `
                <div class="Msg">
                    <i class="fas fa-exclamation-circle" @click="open_block">
                    </i>

                    <div class="Mimage">
                        <div class="newMsg">
                            <h2>
                                {{newnum}}
                            </h2>
                        </div>
                        <img :src=image class="person_img">
                    </div>
    
                    <div class="Mcontent">
                        <div class="username">
                            <h2>{{name}}</h2>
                        </div>
                        <div class="receiveMsg">
                            <h3 class="msgh3">{{msg}}</h3>
                        </div>
                    </div>
                    
                    <div class="Mbtn">
                        <button class="btnBlue_read" @click="lookMsg(id)"><h3>查看</h3></button>
                    </div>
                </div>
                `
            ,
            methods: {
                lookMsg (id) {
                    member.$data.MsgMenu = false;
                    setTimeout(this.scrollTo, .1);
                },
                open_block () {
                    member.$data.block_block = true;
                },
            },
        },
        receive : {
            props : ['name','msg','image','time'],
            template :
                `
                <div class="reiceive">
                    <div class="img_box">
                        <img :src=image class="person_img">
                    </div>
                    <div class="textbox">
                        <span class="upspace"></span>
                        <h3 class="Mtext">{{name}}說: {{msg}}</h3>
                        <h5 class="Mtime">{{time}}</h5>
                    </div>
                </div>
                `
            ,
        },
        send : {
            props : ['msg','image','time'],
            template :
                `
                <div class="send">
                    <div class="textbox">
                        <span class="upspace"></span>
                        <h3 class="Mtext">我說: {{msg}}</h3>
                        <h5 class="Mtime">{{time}}</h5>
                    </div>
                    <div class="img_box">
                        <img :src=image class="person_img">
                    </div>
                </div>  
                `
            ,
        }
    },
    mounted() {

        for (i = 0 ; i <= this.lists.length; i++) { //取得頁面title名字來綁定會員頁籤class
            if (this.lists[i] == document.title) {
                $('.listName').eq(i).addClass( "bold" );
            }
        }

        this.checkNewMsg ();

    },

})