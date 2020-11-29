var t1 = new TimelineMax({
    repeat : -1,
    yoyo: true,
});

var t2 = new TimelineMax({
    repeat : -1,
    yoyo: true   
});

var t3 = new TimelineMax({
    repeat : -1,
    yoyo: true 
});

var t4 = new TimelineMax({
    repeat : -1,
    yoyo: true 
});
var t5 = new TimelineMax({
    repeat : -1,
    yoyo: true 
});

var t6 = new TimelineMax({
    repeat : -1,
    yoyo: true 
});
var t7 = new TimelineMax({
    repeat : -1,
    yoyo: true 
});





 

t1.fromTo(['.lantern.left'],1,{rotation:10,transformOrigin:'left top',ease:Power0.easeNone,className:"+=light"},{rotation:-10,transformOrigin:'left top',ease:Power0.easeNone});
t2.fromTo(['.lantern.right'],1,{rotation:-10,transformOrigin:'right top',ease:Power0.easeNone,className:"+=light"},{rotation:10,transformOrigin:'right top',ease:Power0.easeNone});

t3.fromTo(['.backCloud'],4,{
    scale:1,ease:Power0.easeNone,opacity: .8},{scale:1.5,ease:Power0.easeNone,opacity:0});

t4.fromTo(['#cloudLeft'],2,{ transformOrigin:'right bottom',rotation:0,ease:Power0.easeNone},{ rotation:10,ease:Power0.easeNone});
t5.fromTo(['#cloudRight'],2,{ transformOrigin:'left bottom',rotation:0,ease:Power0.easeNone},{ rotation:-10,ease:Power0.easeNone});

t6.fromTo(['#cloudaheadL'],2,{ transformOrigin:'right bottom',rotation:0,ease:Power0.easeNone},{ rotation:-5,ease:Power0.easeNone});
t7.fromTo(['#cloudaheadR'],2,{ transformOrigin:'left bottom',rotation:0,ease:Power0.easeNone},{ rotation:5,ease:Power0.easeNone});

// 太田使用

var c1 = new TimelineMax({
    repeat : -1,
    yoyo: true 
});

var c2 = new TimelineMax({
    repeat : -1,
    yoyo: true 
});

var c3 = new TimelineMax({
    repeat : -1,
    yoyo: true 
});

var c4 = new TimelineMax({
    repeat : -1,
    yoyo: true 
});

var c5 = new TimelineMax({
    repeat : -1,
    yoyo: true 
});

c1.fromTo(['#c1'],6,{ transformOrigin:'right bottom',rotation:0, y: 170,ease:Power0.easeNone},{ x : 100, rotation:-6,ease:Power0.easeNone});

c2.fromTo(['#c2'],6,{ transformOrigin:'right bottom',rotation:0, y: 340, ease:Power0.easeNone},{ x : -80, rotation:6,ease:Power0.easeNone});

c3.fromTo(['#c3'],6,{ transformOrigin:'right bottom',rotation:0,x: -150, y: 240, ease:Power0.easeNone},{ x : -150, rotation:6,ease:Power0.easeNone});

c4.fromTo(['#c4'],6,{ transformOrigin:'right bottom',rotation:0, x: -100, y : 270, ease:Power0.easeNone},{ x : -150, rotation:6,ease:Power0.easeNone});

c5.fromTo(['#c5'],6,{ transformOrigin:'right bottom',rotation:0, x: -150, y: 240, ease:Power0.easeNone},{ x : -250, rotation:6,ease:Power0.easeNone});
