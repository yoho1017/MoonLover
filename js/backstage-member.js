var nav = new Vue ({
    el: '#nav',
    data : {
        title : 'menu',
    },
});
var backend = new Vue ({
    el : '#backend',
    data : {
        // ---------------留言清單---------------
        username : '碩哥',
        // 後台頁籤
        lists : [
            {list: '公版留言管理', href : "./backstage_publicMsg.html"},
            {list: '訂單管理', href : "./backstage_publicMsg.html"},
            {list : '周邊景點管理', href : "./backstage_mapList.html"},
            {list : '籤詩管理', href : "./backstage_draw.html"},
            {list : '商品管理', href : "./backstage_products.html"},
            {list : '會員資料管理', href : "./backstage_member.html"},
        ],
        sql:[
            [1,'aabbc111','abc111','aaabbc111@gamil.com','小碩碩','鋼筆碩哥','30歲','旅遊|烹飪','新竹縣','工商服務/工程師','碩士/雲林科技大學','男性','女性','否','否'],
            [2,'aabbc222','abc222','aaabbc222@gamil.com','酪梨姊姊','來買科酪梨吧','30歲','聽音樂|繪畫','高雄市','自由業/設計師','大學/嘉義大學','女姓','男性','否','是'],
            [3,'aabbc333','abc333','aaabbc333@gamil.com','vue神','多拉A夢','27歲','跑步|喝咖啡|打code','新北市','工商服務/工程師','大學/高雄大學','男姓','女性','是','是'],
            [4,'aabbc444','abc444','aaabbc444@gamil.com','宗妹','微笑妹妹','24歲','繪畫|逛街','台北市','自由業/設計師','大學/台北大學','女姓','男性','否','是'],
            [5,'aabbc555','abc555','aaabbc555@gamil.com','展哥','購物車走起','30歲','打code','台中市','自由業/設計師','大學/美國大學','男姓','女性','是','是'],
            [4,'aabbc444','abc444','aaabbc444@gamil.com','宗妹','微笑妹妹','24歲','繪畫|逛街','台北市','自由業/設計師','大學/台北大學','女姓','男性','否','是'],
        ],
        modify_data : '', //給空字串或空陣列都可以
        menu : true,
    },
    components:{
        row:{
            props:['id','acct','pwd','email'],
            template:
            `<tr :id=id>
                <td class="td_10"><h4>{{id}}</h4></td>
                <td class="td_25"><h4>{{acct}}</h4></td>
                <td class="td_25"><h4>{{pwd}}</h4></td>
                <td class="td_50"><h4>{{email}}</h4></td>
                <td class="td_25">
                    <select class="input_status">
                        <option value="0">一般會員</option>
                        <option value="1">進階會員</option>
                        <option value="2">停權會員</option>
                    </select>
                </td>
                <td class="td_25">
                  <h4 class="more" @click="modify(id)">更多</h4>
                </td>
            </tr>
            `,
            methods:{
                modify(id){
                    window.scrollTo(0,0);
                    console.log(id);
                    data = id - 1;
                    backend.$data.menu = false;
                    nav.$data.title = 'modify';
                    backend.$data.modify_data = backend.$data.sql[data];
                    console.log(backend.$data.modify_data);
                }
            }
        },
   
    },
    mounted() {

        for (i = 0 ; i <= this.lists.length; i++) { //取得頁面title名字來綁定頁籤class
            if (this.lists[i] == document.title) {
                $('.listName').eq(i).addClass( "bold" );
            }
        }
    },
});
