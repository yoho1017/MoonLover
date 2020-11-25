$(document).ready(function(){

    //頁籤
    $('.list_map > li').click(function(e){
        $(this).closest('ul').find('li').removeClass('on');
        $(this).addClass('on');
      
        
        $('div.inBox_map').removeClass('on');
        $('div.inBox_map.'+$(this).attr('data-target')).addClass('on');

        $('div.YueLao_block').removeClass('on');
        $('div.YueLao_block.'+$(this).attr('data-target')).addClass('on');
    });
   

  //header_nav點擊
  $("button.hamburger").on("click", function(){
    $(this).toggleClass("is-active");
    let t = $(this).hasClass("is-active");
    if(t){    
      $('.barList').css('right','0');
    }else{
        $('.barList').removeAttr('style');
        
       } 
  });
 
  //只for首頁
  // $('body').css('overflow','hidden');
 

});

// moonMapList
let maplist=new Vue({
  el:'#Taiwan',
  data:{
    temples:[{name:'台北龍山寺',x:'130px',y:'185px'},{name:'台中慈德慈惠堂',x:'140px',y:'380px'},{name:'台中樂成宮',x:'0px',y:'10px'},{name:'雲林北港朝天宮',x:'0px',y:'10px'},{name:'台南大天后宮',x:'0px',y:'10px'}],
    
  },
  components:{
    'my-component':{
      props:["name"],
      template:`
      <ul class="line-block">
        <li class="linkText"><a href="#">{{name}}</a></li>
        <li class="roundLink"></li>
        <li class="mapLine"></li>
      </ul>`,
    },
  },
  methods:{
  },
})

 
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
let moonmap=new Vue({
  el:'#emple-message',
  data:{
    message:'',
  },
  methods:{

  },
});










