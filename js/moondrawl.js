$(document).ready(function(){
    // 第一步按鈕 求籤
    $('.btn_go1').on('click', function(){
        $('.duelbox').toggleClass('-on');
    });
    // 第二步按鈕 擲筊
    $('.btn_go2').on('click', function(){
 
        //按下去觸發動畫
        $(".duelboxe").addClass("animate__animated animate__backInDown");

        axios.post('./php/moondraw.php').then( response => {
            var data = response.data;
            // console.log(response);
            // console.log(data[0].NUM);
            // console.log(data);
            dataToDraw (data);
        }).catch(() => { 
            console.log("錯誤 !") 
        });


        function dataToDraw (data) {
            console.log(data);

            // 把資料丟給html

            //第三屏
            //第三屏籤的大吉結果
            document.getElementById('Lucky').innerHTML = data[0].DRAW_LUCKY;

            //第三屏的籤詩簡寫結果
            document.getElementById('Lucky_ins').innerHTML = data[0].DRAW_CONTENT;

            //第四屏
            //第四屏籤的大吉結果
            document.getElementById('Lucky_second').innerHTML = data[0].DRAW_LUCKY;

            //第四屏的籤詩簡寫結果
            document.getElementById('Lucky_ins_second').innerHTML = data[0].DRAW_CONTENT;

            //第四屏的籤詩聖意
            document.getElementById('result_one').innerHTML = data[0].DRAW_DETAIL;

            //第四屏的求得此籤
            document.getElementById('result_second').innerHTML = data[0].DRAW_ANSWER;








    
        }

        $('.duelbox').removeClass('-on'); // 一二屏消失
        $('.duelboxer').addClass('-on'); // 第三屏出現
        $('.god_talk').toggleClass('-on') // 換月老
    });

    // 第三四屏切換
    $('.dBoxSwitch').on('click', function(){

        $('.dBoxSwitch').toggleClass('-on');
        $('.god_talk').css({
            display: 'none',
        });      
    });
});