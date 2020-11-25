
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
$(document).ready(function() {
    $('.twMap').click(function(e) {
      var offset = $(this).offset();
      var x = e.pageX - offset.left;
      var y = e.pageY - offset.top
      alert("x=" + x);
      alert("y=" + y);
    });
  });
  
  //moonMap 公版留言區 
  new Vue({
    el:'#moonMap',
    data:{
      templemessage:[{name:'台北霞海城隍廟',},{name:'台北龍山寺'},{name:'台中慈德慈惠堂'},{name:'台中樂成宮'},{name:'雲林北港朝天宮'},{name:'台南大天后宮'}],
      mesg:[{src:'./images/moonMap/咖啡icon.svg',h3:'Share House Cafe'},{src:'./images/moonMap/餐廳icon.svg',h3:'福泰飯桌'},{src:'./images/moonMap/餐廳icon.svg',h3:'Share House Cafe'}]
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
  