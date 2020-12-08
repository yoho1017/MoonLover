var backend = new Vue({
    el: '#backend',
    data: {
        // ---------------留言清單---------------
        username: '碩哥',
        // 後台頁籤
        lists: ['公版留言管理', '訂單管理', '周邊景點管理', '籤詩管理', '商品管理', '會員資料管理'],
        sql: [
            [1, 'BiBiOTA', '499', '2020-11-01 13:56', '', '來創建角色屬於自己的角色與製作悠遊卡,既實用又美麗。'],
            [2, 'AsoJi', '100000000', '2020-11-01 13:56', '', '舒服的客製化大抱枕讓顧客有一個好的睡眠。'],
            [3, 'AsoJi', '100000000', '2020-11-01 13:56', '', '客製化口罩不只美觀還可以抵抗空氣汙染,每一次的呼吸都有乾淨的空氣。'],
            [4, 'AsoJi', '100000000', '2020-11-01 13:56', '', '可以讓顧客隨時記錄生活中的大小事情。'],
            [5, 'AsoJi', '100000000', '2020-11-01 13:56', '', '顧客可以透過姻緣線找到想要的姻緣。'],
            [6, 'AsoJi', '100000000', '2020-11-01 13:56', '', '讓每一張衛生紙都有祝福,好看的圖樣讓顧客滿意。'],
            [7, 'AsoJi', '100000000', '2020-11-01 13:56', '', '設計的紅包讓顧客可以珍藏或是成為收藏品。'],
            [8, 'AsoJi', '100000000', '2020-11-01 13:56', '', '美觀的杯墊讓顧客可以墊著冷熱飲品,漂亮又實用。'],
            // [9, '第九籤', '上', '則父母國人皆賤之。', '則父母。亦即使君爾之椿萱也。皆輕視君汝之意。繇此可之。為人子弟者。為合受父母疏遠。唾棄。賤之。原因多矣。最大之原因。不出不慎交友。如一己之不慎。一失足成千古恨之時。後果堪虞者。爰之。必須慎行之。婚姻同之。終生之伴侶。必須慎擇之', '目前福緣不足，須得神佛及貴人之助方能圓滿，為人子女者，需謹慎交友，聽從父母及長輩或貴人的意見，不可一意孤行。'],
            // [10, '第十籤', '下', '有道是養兒防老，積穀防饑。', '自古以來有兩大古訓。養兒為了一己之防老。老了以後。可繇伊等侍奉。貽娛老年。平素則省吃儉用。積穀可防饑。尤其是養兒耶。必須善教之。婚事同之。結髮成伉儷之後。老境亦能相互照顧也。', '目前福緣俱足，奉子之助更加圓滿，種福田積後福，問緣份，得貴助。問婚姻，伉儷情深。'],
        ],
        modify_data: '',
        menu: true,
    },
    methods: {
        change(id) {
            if (id == 'n') {
                this.modify_data[0] = this.sql.length + 1;
                this.sql.push(this.modify_data);
            } else {
                data = id - 1;
                this.sql[data] = this.modify_data;
            }
            this.menu = true;
        },
        add(id) {
            this.menu = false;
            this.modify_data = [id, '', '', '', '', '', ''];
        }
    },
    components: {
        row: {
            props: ['id', 'membership', 'order_price', 'order_date'],
            template:
                `
            <tr :id=id>
                <td class="td_55"><h4>{{id}}</h4></td>
                <td class="td_80"><h4>{{membership}}</h4></td>
                <td class="td_75"><h4>{{order_price}}</h4></td>
                <td class="td_75"><h4>{{order_date}}</h4></td>
                <td class="td_75"><i class="fas fa-edit" @click="modify(id)"></i></td>
            </tr>
            `,
            methods: {
                modify(id) {
                    window.scrollTo(0, 0);
                    data = id - 1;
                    backend.$data.menu = false;
                    backend.$data.modify_data = backend.$data.sql[data];
                },
            }
        },
    },
    mounted() {

        for (i = 0; i <= this.lists.length; i++) { //取得頁面title名字來綁定頁籤class
            if (this.lists[i] == document.title) {
                $('.listName').eq(i).addClass("bold");
            }
        }
    },
});
