// 收到留言組件
Vue.component('receive',{  
    props : ['name','msg','time','image'],
    template :
        `
        <div class="reiceive">
            <div class="img_box">
                <img :src=image class="person_img">
            </div>
            <div class="textbox">
                <h3 class="Mtext">{{name}}說: {{msg}}</h3>
                <h5 class="Mtime">{{time}}</h5>
            </div>
        </div>
        `
    ,
});
// 送出留言組件
Vue.component('send',{  
    props : ['msg','time','image'],
    template :
        `
        <div class="send">
            <div class="textbox">
                <h3 class="Mtext">我說: {{msg}}</h3>
                <h5 class="Mtime">{{time}}</h5>
            </div>
            <div class="img_box">
                <img :src=image class="person_img">
            </div>
        </div>  
        `
    ,
});

var member = new Vue ({
    el : '#member',
    data : {
        // ---------------留言清單---------------
        // 會員中心頁籤
        lists : [
            {list: '個人資料', href : "./MyInfo.html"},
            {list: '我的吉祥物', href : "./MyMascot.html"},
            {list : '留言板', href : "./MyMsg.html"},
            {list : '我的訂單', href : "./MyOrder.html"}
        ],
        // 如果未註冊時的連結
        link : {name : "先填寫會員資料" , href : "./MyInfo.html"},
        // 個人頭像
        profile : "./images/MyInfo/profile.png",
        // 收到留言
        messages : [],
        // 好友關係
        relationship : true,
        // 新留言顯示
        newStr : '傳送一則新留言給你',
        // -----------------留言頁-----------------        
        // 打開留言內頁
        MsgMenu : true,
        // 留言
        msgs : '',
        // 暫存舊留言
        oldmsg : 'template',
        // 配對編號
        currentPid : '',
        // 配對者id
        targetid : '',
        // 查看的配對留言index編號
        index : '',
        // 發送出去的訊息
        newText : '',
        // 封鎖燈箱(預設關閉)
        block_block : false
    },
    methods: {
        submit (newText) { //送出留言
            if (newText != '') {
                let data = new FormData(); //建立資料表單
                data.append('pid', this.currentPid); //配對ID
                data.append('msg', newText); //留言
                data.append('targetid', this.targetid); //配對好友ID

                let config = {
                    header : {
                     'Content-Type' : 'multipart/form-data'
                   }
                }
                // 送出
                axios.post('./php/createMsg.php', data, config).then(function (response) {
                    // 更新資料
                    data = response.data;
                    // console.log(response);
                    // console.log(data);
                    msgs = [];
                    name = member.$data.messages[member.$data.index].name;
                    friendImg = member.$data.messages[member.$data.index].image;
                    myImg = member.$data.profile;
                    for (i = 0 ; i <= data.length -1; i++) {
                        if (data[i].MSG_SEND_CONTENT == '' || data[i].MSG_SEND_CONTENT == null) {
                            object = {nickname: name,image: friendImg, msg: data[i].MSG_RECEIVE_CONTENT, time : cutSec(data[i].MSG_TIME), from : 'friend'};
                            msgs.push(object);
                        }else{
                            object = {msg: data[i].MSG_SEND_CONTENT, image : myImg, time : cutSec(data[i].MSG_TIME), from : 'me'};
                            msgs.push(object);
                        }
                    }
                    // 時間刪除秒數
                    function cutSec(date) {
                        return date.substring(0, 16)
                    }
                    // 放進data
                    member.$data.msgs = msgs;
                }).finally(() => {  
                    if (member.$data.msgs != '') {
                        document.querySelector(".msgbox").scrollTo(0,document.querySelector(".msgbox").scrollHeight);
                    }
                 });

                this.newText = '';
            }
        },
        getdata () { //取得配對關係資料
            axios.post('./php/selectRelationshipR.php').then(function (response) {
                data = response.data;
                // console.log(data);
                if (data[0] == undefined) {
                    member.$data.relationship = false;

                    axios.post('./php/checkMemberType.php').then(function (response) {
                        data = response.data;
                        if (data == 0) {
                            member.$data.link = {name : "先填寫會員資料" , href : "./MyInfo.html"};
                        }else if (data == 1) {
                            member.$data.link = {name : "前往月老牽線" , href : "./moonMatch.html"};
                        }
                    });

                }else{
                    for (i = 0 ; i <= data.length -1; i++) {
                        msg = {id: data[i].ID, targetid: data[i].memberID, name : data [i].NICKNAME, msg : data[i].NEWMSG ,newnum : data[i].NOTREAD , image : data[i].IMAGE};
                        if (msg.image == null) {
                            msg.image = "./images/MyInfo/profile.png"
                        }else{
                            msg.image =atob(msg.image)
                        }
                        member.$data.messages.push(msg)
                    }    
                }
            })
        },
        getImage (){ //取得會員頭像
            axios.post('./php/selectImageR.php').then(function (response) {
                data = response.data;
                // console.log(response);
                // console.log(data);
                if (data != '') {
                    member.$data.profile = data;
                    // console.log(member.$data.profile);
                }
            });
        },
    },
    watch : {
    },
    components : {
        // 留言表組件
        message : {
            props : ['id','index','name','msg','image','newnum'],
            template :
                `
                <div class="Msg">
                    <i class="fas fa-exclamation-circle" @click="open_block">
                    </i>

                    <div class="Mimage">
                        <div class="newMsg" v-if="newnum != null">
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
                            <h3 class="msgh3" v-if="newnum == null">{{msg}}</h3>
                            <h3 class="msgh3" style="font-weight :bold" v-else="newnum != null">傳送一則新留言給你</h3>
                        </div>
                    </div>
                    
                    <div class="Mbtn">
                        <button class="btnBlue_read" @click="lookMsg(id,index)"><h3>查看</h3></button>
                    </div>
                </div>
                `
            ,
            methods: {
                startInterval (id,index) {   //每隔1秒更新資訊 
                    setInterval(() => {    
                        this.getMsg (id,index);    
                    }, 1000);    
                },
                lookMsg (id,index) { //查看留言
                    // console.log(index);
                    member.$data.MsgMenu = false;
                    this.getMsg(id,index);

                    this.startInterval(id,index); 
                },
                getMsg (id,index) { //取得資料

                    if (member.$data.msgs == '') {
                        firsttime (id,index);
                    }else{
                        reload (id,index)
                    }
        
                    // 傳遞資料

                    function firsttime (id,index) {
                        var params = new URLSearchParams();
                        params.append('pid', id); //配對關係編號
                        
    
                        axios.post('./php/selectPersonMsgR.php', params).then(function (response) {
                            data = response.data;
                            // console.log(data);
                            msgs = [];
                            name = member.$data.messages[index].name;
                            friendImg = member.$data.messages[index].image;
                            myImg = member.$data.profile;
                            for (i = 0 ; i <= data.length -1; i++) {
                                if (data[i].MSG_SEND_CONTENT == '' || data[i].MSG_SEND_CONTENT == null) {
                                    object = {nickname: name,image: friendImg, msg: data[i].MSG_RECEIVE_CONTENT, time : stringTotime(data[i].MSG_TIME), from : 'friend'};
                                    msgs.push(object);
                                }else{
                                    object = {msg: data[i].MSG_SEND_CONTENT, image : myImg, time : stringTotime(data[i].MSG_TIME), from : 'me'};
                                    msgs.push(object);
                                }
                            }
                            function stringTotime(date) {
                                return date.substring(0, 16)
                            }                
                            
                            member.$data.currentPid = id;  //目前查看留言配對關係編號
                            member.$data.msgs = msgs; //留言
                            member.$data.index = index; //留言表index
                            member.$data.currentname = member.$data.messages[index].name; //好友名字
                            member.$data.friendImg = friendImg; //好友照片
                            member.$data.targetid = member.$data.messages[index].targetid; //好友ID
                            // console.log(member.$data.msgs)
                            ;
        
                        }).finally(() => {  
                            if (member.$data.msgs != '') {
                                document.querySelector(".msgbox").scrollTo(0,document.querySelector(".msgbox").scrollHeight);
                                scrollDistance = document.querySelector(".msgbox").scrollHeight - document.querySelector(".msgbox").scrollTop;
                            }                            
                         });
                    }

                    function reload (id,index) {
                        var params = new URLSearchParams();
                        params.append('pid', id); //配對關係編號

                        // 原始訊息數
                        msglength = document.querySelectorAll('.textbox').length;
    
                        axios.post('./php/selectPersonMsgR.php', params).then(function (response) {
                            data = response.data;
                            // console.log(data);
                            msgs = [];
                            name = member.$data.messages[index].name;
                            friendImg = member.$data.messages[index].image;
                            myImg = member.$data.profile;
                            for (i = 0 ; i <= data.length -1; i++) {
                                if (data[i].MSG_SEND_CONTENT == '' || data[i].MSG_SEND_CONTENT == null) {
                                    object = {nickname: name,image: friendImg, msg: data[i].MSG_RECEIVE_CONTENT, time : stringTotime(data[i].MSG_TIME), from : 'friend'};
                                    msgs.push(object);
                                }else{
                                    object = {msg: data[i].MSG_SEND_CONTENT, image : myImg, time : stringTotime(data[i].MSG_TIME), from : 'me'};
                                    msgs.push(object);
                                }
                            }
                            function stringTotime(date) {
                                return date.substring(0, 16)
                            }
                            
                            member.$data.currentPid = id;  //目前查看留言配對關係編號
                            member.$data.msgs = msgs; //留言
                            member.$data.index = index; //留言表index
                            member.$data.currentname = member.$data.messages[index].name; //好友名字
                            member.$data.friendImg = friendImg; //好友照片
                            member.$data.targetid = member.$data.messages[index].targetid; //好友ID
                            // console.log(member.$data.msgs)
                            ;
        
                        }).finally(() => {
                            // 如果收到新訊息就scroll到底
                            if (document.querySelectorAll('.textbox').length != msglength) {
                                document.querySelector(".msgbox").scrollTo(0,document.querySelector(".msgbox").scrollHeight);
                            }
                         });;
                    }

                    // console.log(data);

                },
                open_block () { //打開封鎖燈箱
                    member.$data.block_block = true;
                },
            },
        },
        // 留言組件
        msg : {
            props : ['name','msg','time','from','image'],
            methods: {
            },        
            template : 
            `
            <receive v-if="from =='friend'" :msg="msg" :time="time" :name="name" :image="image"></receive>
            <send v-else="from =='me'" :msg="msg" :time="time" :image="image"></send>
            `
            ,
        },
    },
    mounted() {
        for (i = 0 ; i <= this.lists.length -1; i++) {
            //取得頁面title名字來綁定會員頁籤class
            if (this.lists[i].list == document.title) {
                $('.listName').eq(i).addClass( "bold" );
            }
        }

        this.getImage (); //取得會員頭像
        this.getdata (); //取得留言表

    },

})