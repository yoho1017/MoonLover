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



 

t1.fromTo(['.lantern.left'],1,{rotation:10,transformOrigin:'left top',ease:Power0.easeNone,className:"+=light"},{rotation:-10,transformOrigin:'left top',ease:Power0.easeNone});
t2.fromTo(['.lantern.right'],1,{rotation:-10,transformOrigin:'right top',ease:Power0.easeNone,className:"+=light"},{rotation:10,transformOrigin:'right top',ease:Power0.easeNone});

t3.fromTo(['.backCloud'],4,{
    scale:1,ease:Power0.easeNone,opacity: .6},{scale:1.5,ease:Power0.easeNone,opacity:0});

t4.fromTo(['#cloudLeft'],2,{ transformOrigin:'right bottom',rotation:0,ease:Power0.easeNone},{ rotation:10,ease:Power0.easeNone});
t5.fromTo(['#cloudRight'],2,{ transformOrigin:'left bottom',rotation:0,ease:Power0.easeNone},{ rotation:-10,ease:Power0.easeNone});
