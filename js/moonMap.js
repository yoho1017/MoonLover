 //廟宇資料庫
 let pageId = window.location.hash.substr(1); //找到字串中數字位置
//  console.log(pageId);

const profilePath = './images/member/profile/';
 
 var params = new URLSearchParams(); //宣告params
 params.append('tid', pageId); //將值放入tid 變成tid=pageId

// var params = new URLSearchParams();
// params.append('tid', 1);

axios.post('./php/moonMap.php', params).then( response => {  // params變數放入Php
  var data = response.data;
  // console.log(data);
  dataToTemple (data);
 
  array = []; 
  for(let i= 0; i<data.length;i++){
     
    obj = {src: data[i].IMAGE,h3:data[i].LOC_NAME,p1:data[i].GUIDE,p2:data[i].OPEN_TIME,p3:data[i].LOC_ADDRESS,href:data[i].LOCATION_LINK}
    array.push(obj);
  }
  moonmap.$data.mesg = array;
  // console.log(array);

}).catch(() => { 
  console.log("錯誤 !") 
});

//更新廟宇title
window.onload=change_title;
function change_title(){  
  if(pageId==1){
    document.title="台南大天后宮";
  }else if(pageId==2){
    document.title="雲林北港朝天宮";
  }else if(pageId==3){
    document.title="台中慈德慈惠堂";
  }else if(pageId==4){
    document.title="台中樂成宮";
  }else if(pageId==5){
    document.title="台北艋舺龍山寺";
  }else if(pageId==6){
    document.title="台北霞海城隍廟";
  }else{
    document.title="六大廟宇";
  }
};

function dataToTemple(data){
  // console.log(data);
  let imgAll = data[0].IMG.split(',');
 
  // 寺廟照片*3
  document.getElementsByClassName('roundImg_temp1')[0].firstChild.src = imgAll[0];
  document.getElementsByClassName('roundImg_temp2')[0].firstChild.src = imgAll[1];
  document.getElementsByClassName('roundImg_temp3')[0].firstChild.src = imgAll[2];
  
  //寺廟名稱  
  document.getElementsByClassName('signInbox_map')[0].innerHTML = data[0].NAME;

  // 關於寺廟
  document.getElementsByClassName('empleContent_block')[0].innerHTML = data[0].INFO;
  
  // 寺廟map
  document.getElementsByClassName('goMap')[0].firstChild.src= data[0].GOOGLE_MAP;

  // 寺廟地址
  document.getElementsByClassName('empleContentAll')[0].innerHTML = data[0].ADDRESS;

  // 景點+美食地圖
  document.getElementsByClassName('sceneMap')[0].firstChild.src=data[0].LOCATION_MAP;

};
 
 
const bus = new Vue();

//貼文組件
 Vue.component('visitors-item',{ //訪客留言
   props:['id','text','img','nickname','date'], //設定要傳出去的值 訊息 ,img為使用者頭像
   
   methods:{   
   // 自訂檢舉燈箱事件
   light_block(id,text){
    //  console.log(id);     
     bus.$emit('light');
     bus.$emit('tmid',id);
     bus.$emit('tmsg',text);
   },
 },
   template:
   `<!-- 訪客留言區 -->   
      <li class="visitors-messagelist">
          <div class="visitors-img"><img :src="'./images/member/profile/'+ img" alt="留言訪客照"></div>
          <h4>{{nickname}}:</h4>
          <div class="visitors-message"><p>{{text}}</p><p class="date">{{date}}</p></div>
          <i class="fas fa-exclamation-circle fa-1x edit" @click="light_block(id,text)"></i> <!--設定屬性id值，要判定刪除的inedex-->
      </li>   
   `,
  
 });


 
Vue.component('visitor-input',{ //訪客輸入訊息
 data(){
   return{
     inputtask:'',
   };
 },
 props : ['tmid'],
 methods:{
   submiData(tmid){
     if( this.inputtask !==''){ //不輸入字就alert
       this.$emit('inputsub',this.inputtask);
       var newtext = this.inputtask;
      //  console.log(tmid.target.id);
       let data = new FormData(); //建立資料表單
       data.append('tmid', tmid);
       data.append('msg', this.inputtask);
       console.log(tmid);

       let config = {
           header : {
            'Content-Type' : 'multipart/form-data'
          }
       }

       // 送出
       axios.post('./php/createMsginMsg.php', data, config).then( response=> {
          console.log(response);
          FID = response.data;
          obj = {ID: FID,NICKNAME: moonmap.myName,text : newtext, img : moonmap.myImg.replace(/^.*[\\\/]/, ''), date: 'test'},
          this.$emit('newinmsg',obj);
       }).catch(() => { 
          console.log("錯誤 !") 
      });
     }else{
       alert('輸入訊息');
     }
    //  清空input
     this.inputtask='';

   },

 },
 template:`
 <form class="input-block" @submit.prevent="submiData(tmid)">
   <input type="text" class="visitors-input" placeholder="留各訊息吧?" v-model="inputtask">
   <i class="fas fa-location-arrow fa-1x arrow-but" @click.prevent="submiData(tmid)"></i>
 </form>
 `,
});

//----------檢舉燈箱組件-----------------------
Vue.component('block-light',{
 props:['id'],
 data(){
   return{
     block_block: false,
     newText:'',//暫存檢舉理由
     reportText:[],//檢舉理由
     rtmid:'',//要檢舉的貼文id
     rtmsg:'',//要檢舉的貼文內容
   };
 },
 methods:{
   closeBlock(){   //關閉檢舉燈箱    
     this.block_block = false;
   },

   submit(newText){ //檢舉留言送出
     if(newText!=''){

        // insert
        let params = new FormData(); //建立資料表單
    
        params.append('rtmid',this.rtmid);//貼文id
        params.append('rtmsg',this.rtmsg);//貼文內容
        params.append('msg', this.newText);//檢舉理由
  
        axios.post('./php/insertMsgReport.php', params).then((res) => {
          let data = res.data;
          console.log(data);
          console.log(res);
        });

       this.reportText.push(newText); 
       this.newText='';
       alert('檢舉送出(待審核)');
       this.block_block=false;
       
     }else{
       alert('輸入檢舉內容');
     }


   },
   
 },

 mounted() {
   bus.$on('light',()=>this.block_block = true); //收到send的檢舉燈箱事件,打開燈箱
   bus.$on('tmid', (id)=>{ this.rtmid = id;});//貼文id
   bus.$on('tmsg', (msg)=>{ this.rtmsg = msg;});//貼文內容
   
 },
 
 template:`
 <!-- 檢舉燈箱 --> 
 <div class="block_pop" v-bind:class="{block:block_block}" id="pop" >

     <div class="block_pop_in">
         <div class="blockPerson">
             <div class="inbox">
                 <h2 class="title">
                    檢舉
                 </h2>
                 <h3 class="string">
                     留言編號：{{rtmid}}
                 </h3>
                 <h3 class="string">
                     請填寫檢舉的理由
                 </h3>
                 <form action="" @keyup.enter="submit(newText)">
                     <i class="fas fa-times-circle fa-2x" @click="closeBlock"><i class="in_btn"></i></i>
                     <textarea class="text" cols="30" rows="5"  v-model="newText"></textarea>
                     <button class="btnRed_submit" @click.prevent="submit(newText,id)"><h3>送出</h3></button>
                 </form>
             </div>
         </div>          
     </div>
 </div>  
 `,
}),



Vue.component('send',{
   props:['myimg','name','msg','time','srcimg','tmid','userimg'],//屬性名稱

   data(){
     return{      
      msgin : [],
      block_block:true,//打開燈箱
     };
   }, 

  // 函式
  methods:{
   addText(item){
    //  alert('test');
    console.log(item);
    $('.visitors-messagelist').show(); //留言時強制打開訪客留言ul    
   },
   
     //刪除訪客留言
     removeTask(index){ //接收子層傳來的index值給父層
 
       this.visitorstext.splice(index,1); //刪除父層的index值
      
     },
     closeul(e){  //訪客留言收合
       let me = e.target;           
       $(me).find('li').slideToggle();  //vue中不能寫this,會指到data  
      
     },

     // 自訂檢舉燈箱事件
     light_block(id,msg){     
       bus.$emit('light');
       bus.$emit('tmid',id);
       bus.$emit('tmsg',msg);
       console.log(id);
       console.log(msg);
      
     },
     updatemsg (val) {
      this.msgin.unshift(val);
     },
     getinmsg () {
      // console.log(this.msgin);
      let msgin = new URLSearchParams();
      msgin.append('tmid', this.tmid);
      axios.post('./php/getTempleMsginMsg.php', msgin).then( (res) => {
        let iMsg = res.data;
        // console.log(iMsg);
        this.msgin = iMsg;
      });  
     }
 
  },

   template:`   
   <form  class="userForm" action="#"> 
      <i class="fas fa-exclamation-circle fa-1x end" id="edit" @click="light_block(tmid,msg)" :tmid="tmid"></i>
      <div class="user_block">
          <div class="userImg_block">
              <div class="userImg"><img :src=myimg alt="user01"></div>
              <h3 class="userName">{{name}}</h3>
             <!-- <h3 class="userName">{{tmid}}</h3> -->
          </div>
          
          <!-- 使用者已貼文 -->
          <div class="user-messBlock">
              <div id="user-message02">
                <p>{{msg}}</p>
                <h5>{{time}}</h5>
              </div>                                       
              <div class="imgBlock">
                  <!-- 貼文區圖片 -->
                  <ul class="imgList2">
                      <li v-for='value in srcimg'><div class="aboutImg"><img :src=value></div></li>                                                                         
                  </ul>                  
              </div>                                
          </div>
      </div>

      <!-- 訪客留言輸入框 -->
      <div>
         <visitor-input v-on:inputsub="addText" :tmid=tmid @newinmsg="updatemsg"></visitor-input>
      </div>
      <!--子留言-->
      <ul class="visitors-block" @click="closeul">...
         
           <visitors-item v-for="values in msgin" :text="values.text" :id="values.ID" :img="values.img" :nickname="values.NICKNAME" :date="values.date"></visitors-item>
          
       </ul>        
  </form>
  `,
  mounted () {
    this.getinmsg();
  },
});

 
 //moonMap 公版留言區 
 var moonmap = new Vue({
   el:'#moonMap',
   data:{ 
     mesg:[], //美食景點資料     
     myMsg:[],
     newText : '', 
     srcimg:[],//放圖
     images:[],//暫存圖
    //  block_id : 1, //
     myImg:'',
     myName:'',
     tmid: '',
   },
   methods : {
     submit(newText){
       if(newText.length != 0 && newText != '\n'){
         let src=this.srcimg;
         
         // insert
          let params = new FormData(); //建立資料表單
          let uploadImg = document.querySelector('#addImg');
          
          
          if(uploadImg.files.length == 0){
              params.append(`upload`, 'no');
              console.log('no');
          }else{
            params.append(`upload`, 'yes');
            for(let i=0; i<uploadImg.files.length; i++ ){
              params.append(`uploadImg${i+1}`, uploadImg.files[i]);
              console.log('yes');
              
            }
          }
          

          params.append('tId', pageId);
          params.append('msg', this.newText);

            let config = {
                header : {
                 'Content-Type' : 'multipart/form-data'
               }
            }

          axios.post('./php/insertTempleMsg.php', params, config).then((res) => {
            let data = res.data;
            console.log(typeof(data[0].ID));
            this.tmid = data[0].ID;
            console.log(this.tmid);

            // this.myMsg.unshift(
            //   // {myImg:this.myImg , name:this.myName , msg:newText,time:this.getTime(),srcimg:src, tmID:this.tmID,} //新增id
            //   {myImg:this.myImg , name:this.myName , msg:newText,time:this.getTime(),srcimg:src, tmid:this.tmid,} //新增id
            // );

            this.myMsg = [];
            this.getTempleMsg();
          });



         this.newText='';
         this.images=[];//清除圖片
         this.srcimg=[];
         uploadImg.value = ''; // input裡也要清空
       }
     },
     getTime () {
       today = new Date();
       date = today.getFullYear()+' '+ (today.getMonth()<10 ? '0' : '')  + (today.getMonth()+1)+' '+ (today.getDate()<10 ? '0' : '') + today.getDate() + ' ' + (today.getHours()<10 ? '0' : '') + today.getHours() + ':' + (today.getMinutes()<10 ? '0' : '') + today.getMinutes();
       return date;    
     },
     scrollTo () {
       document.querySelectorAll(".message_block")[0].scrollTo(0,document.querySelectorAll(".message_block")[0].scrollHeight);
     },

     

     // 傳照片
     fileChange(e){
       this.images;
       let files = e.target.files;  //取得File物件
       // console.log(files);//秀出物件陣列
       this.images.forEach.call(files,this.fileReader); //快速呼叫了 forEeah的方法
     },

     fileReader(file){
       let reader = new FileReader(); //建立FileReader 監聽 Load 事件
       reader.addEventListener("load", this.createImage);
       reader.readAsDataURL(file);      
     },
     createImage(e){
       
       let files =  this.images;  //陣列長度

       if(files.length >= 3){  //如果判斷大於等於三張就進alert

         alert('最多只能上傳三張'); 

       }else{
         let file = e.target;
         let image = {src:file.result};
         // console.log(image);
         this.images.push(image); //暫存圖
         if(this.srcimg.length<3){
           console.log(this.srcimg.length);
           this.srcimg.push(image.src);
         }      
       }      
     },
     deletebut(item){ //刪除陣列照片,因img為物件陣列,src為陣列,直接抓index
       
       console.log(item);
       let array=this.images; 
       array.splice(item,1); 
       let array2=this.srcimg;      
       array2.splice(item,1); 
     },
     getTempleMsg(){
      var params = new URLSearchParams();
      params.append('tId', pageId);

      axios.post('./php/getTempleMsg.php', params).then( (res) => {
        var data = res.data;
        console.log(data);

        // 計算收到的資料筆數
        let dataLength = 0;
        for (var i in data) {
          dataLength++;
        }

        let src=[];
        const imgPath = './images/upload/';
        
        // 撈到資料反著長回html
        for(i=dataLength-1;i>=0;i--){

          src = data[i].tmIMG;
          src = src.split("|");
          if(src != ''){
            for(let j=0;j<src.length;j++){
              src[j] = `${imgPath}${src[j]}`;
            }
          }
          
          let tmid = data[i].ID;
          console.log(tmid);

          let miMsg = new URLSearchParams();
          miMsg.append('tmid', tmid);
          axios.post('./php/getTempleMsginMsg.php', miMsg).then( (res) => {
            let iMsg = res.data;
            console.log(iMsg);
          });

          let memImg ='';
          if(data[i].myImg != null){
            memImg = `${profilePath}${data[i].myImg}`;
          }else{
            memImg = './images/MyInfo/profile.png';
          }

          
          this.myMsg.unshift(
            { myImg:memImg, 
              name:data[i].nName, 
              msg:data[i].MSG,
              time:data[i].MSG_DATE,
              srcimg: src,
              tmid: tmid,
            }
          );
        }


      
      });
    },
     getMemberImage(){
      axios.post('./php/getMemberImage.php').then( response => {
        var data = response.data;
        // console.log(data);
        let myImg ='';
        if(data.IMAGE != null){
          // myImg = atob(data.IMAGE);
          // images/member/profile
          myImg = `${profilePath}${data.IMAGE}`;
        }else{
          myImg = './images/MyInfo/profile.png';
        }
        console.log(myImg);
        let myName = data.NICKNAME;

        document.querySelector('.userName').innerText = myName;
        document.querySelector('.userImg img').src = myImg;

        this.myImg = myImg;
        this.myName = myName;
      
      });
    },      
   
   },
   mounted(){

    this.getMemberImage();
    this.getTempleMsg();
    




  },

 })