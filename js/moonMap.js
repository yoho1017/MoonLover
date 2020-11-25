
// moonMapList
// let maplist=new Vue({
//   el:'#Taiwan',
//   data:{
//     temples:[{name:'台北龍山寺',x:'130px',y:'185px'},{name:'台中慈德慈惠堂',x:'140px',y:'380px'},{name:'台中樂成宮',x:'0px',y:'10px'},{name:'雲林北港朝天宮',x:'0px',y:'10px'},{name:'台南大天后宮',x:'0px',y:'10px'}],
    
//   },
//   components:{
//     'my-component':{
//       props:["name"],
//       template:`
//       <ul class="line-block">
//         <li class="linkText"><a href="#">{{name}}</a></li>
//         <li class="roundLink"></li>
//         <li class="mapLine"></li>
//       </ul>`,
//     },
//   },
//   methods:{
//   },
// })

 
// 取得座標位置
// $(document).ready(function() {
//     $('.twMap').click(function(e) {
//       var offset = $(this).offset();
//       var x = e.pageX - offset.left;
//       var y = e.pageY - offset.top
//       alert("x=" + x);
//       alert("y=" + y);
//     });
//   });
  
  //moonMap 公版留言區 
  new Vue({
    el:'#moonMap',
    data:{
      tepmesg:['台北霞海城隍廟','台北龍山寺','台中慈德慈惠堂','台中樂成宮','雲林北港朝天宮','台南大天后宮'],
      mesg:
      [{src:'./images/moonMap/咖啡icon.svg',h3:'Share House Cafe',p1:'僻靜巷弄裡的老屋咖啡店，是個適合歇腳放鬆的好去處。',p2:'營業時間：週二至周日 09:00-18:30',p3:'地址：台南市中西區新美街111號'}
      ,{src:'./images/moonMap/餐廳icon.svg',h3:'福泰飯桌',p1:'有著許多人公認台南最好吃的蝦捲，還有晚來就點不到的紅燒肉，尖峰時刻總是座無虛席。',p2:'營業時間：周一至周五 07:30-14:30',p3:'地址：台南市中西區民族路二段240號'}
      ,{src:'./images/moonMap/餐廳icon.svg',h3:'松村煙燻滷味',p1:'獨特煙燻味，鹹香帶甜味的在地口味，價格實惠，是來台南必買的伴手禮之一 。',p2:'營業時間：周一至周日11：30-21：30',p3:'地址：台南市中西區民族路二段319號'}
      ,{src:'./images/moonMap/景點icon.svg',h3:'赤崁文化園區',p1:'早期台南舊城發展的中心，區內古蹟眾多，是台灣少數擁有荷蘭、鄭氏建築的文化園區。',p2:'營業時間：周一至週日08:30-21:30',p3:'地址：台南市中西區民族路二段212號'}
      ,{src:'./images/moonMap/景點icon.svg',h3:'開基武廟原正殿',p1:'為1669年全台灣首座興建的關帝廟，故名為「開基武廟」。又因該廟與祀典武廟同樣祭祀關公但且面積較小，因此一般人都稱此廟為小關帝廟。',p2:'營業時間：周一至周日 07:00-21:00',p3:'地址：台南市中西區新美街114號'}
      ,{src:'./images/moonMap/景點icon.svg',h3:'祀典武廟',p1:'台最早關帝廟，也是當時官建的祀典廟宇之一，裡面祀奉正氣凜然的關聖帝君，被稱為大關帝廟。',p2:'營業時間：周一至周日06:00~21:00',p3:'地址：台南市中西區永福路二段229號'}]
    },
   components:{
    newinboxmap:{
      props:["src","h3"],
      template:`<div class="newInBox_map">
      <div class="roundImg_map"><img :src=src alt="景點"></div>
      <div class="sceneText">
          <h3>{{h3}}</h3> 
          <p>有著許多人公認台南最好吃的蝦捲，還有晚來就點不到的紅燒肉，尖峰時刻總是座無虛席。</p> 
          <p>營業時間：周一至周五 07:30-14:30</p>
          <p>地址：台南市中西區民族路二段240號</p>
      </div>
   </div>`,   
    },
  },
  methods:{
  },
  })
  