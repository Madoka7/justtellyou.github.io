var htClientSize;
var aItemAnimations = [];
var aItems = [];
var htParams;
var nItemCount;
var nItemSize; 

collie.util.addEventListener(window, "load", function () {
    htParams = collie.util.queryString();
    nItemCount = htParams.count ? htParams.count : 99;
    nItemSize = htParams.size ? htParams.size : 40;
    htClientSize = {
        width : document.body.clientWidth,
        height : document.body.clientHeight
        };

    var oLayer = new collie.Layer({
        width : htClientSize.width,
        height : htClientSize.height
        });

    collie.ImageManager.add({
        pic1: "pic/flower2.png",
        pic2: "pic/flower.png",
        pic3: "pic/flower1.png",
        pic4: "pic/leaf.png",
        pic5: "pic/pic2.png"
    });

    (function () {
        var oItem;
        for (var i = 0; i < nItemCount; i++){
            oItem = new collie.DisplayObject({
                x:-Math.floor(Math.random() * 700),
                y:-Math.floor(Math.random() * 500),
                backgroundImage: "pic"+Math.floor(Math.random()*6).toString()+""
            }).addTo(oLayer);
            aItems.push(oItem);
        }
            
        var aLayoutFunctions = [layoutFlower,layoutPoint,layoutLove, layoutPoint,layoutHeart,layoutPoint,layoutTest,layoutStart];
        var nLayoutSelectedIndex = -1;

        collie.Timer.repeat(function(oEvent){
            nLayoutSelectedIndex = (++nLayoutSelectedIndex) % aLayoutFunctions.length;
            aLayoutFunctions[nLayoutSelectedIndex]();
        }, 3000);//Timer类中的成员？负责重复调用其中的指令？
    })();
    //匿名函数的直接调用？

    new collie.FPSConsole({
                color : "#fff"
    }).load();//fps控制台

    collie.Renderer.addLayer(oLayer);
    collie.Renderer.load(document.getElementById("container"));
    collie.Renderer.start();
});

function arrangeItems(fGetTransitionInfo, fUpdateRepeatInfo){
    var nCenterX = htClientSize.width / 2;
    var nCenterY = htClientSize.height / 2;
    var htFrom, htTo;
    var aFrom, aTo, aSet, aEffects;
    var oItem;

    while (aItemAnimations.length)
        aItemAnimations.pop().stop();

    for (var i = 0; i < nItemCount; i++){
        oItem = aItems[i];
        htFrom = oItem.get();
        htTo = fGetTransitionInfo(i);
        aFrom = [];
        aTo = [];
        aSet = [];
        aEffects = [];

        if (typeof htTo.x != 'undefined') htTo.x += nCenterX;
        if (typeof htTo.y != 'undefined') htTo.y += nCenterY;

        for (var sKey in htTo){
            if (sKey == "originX" || sKey == "originY") {
                continue;
            }

            htFrom[sKey] = Math.round(htFrom[sKey]);
            aFrom.push(htFrom[sKey]);
            aTo.push(htTo[sKey]);
            aSet.push(sKey);
            aEffects.push(collie.Effect.easeOutSine);
        }

        var fRepeat = function(htAnimationParams){
            var htParams = arguments.callee.htParams;
            fUpdateRepeatInfo(htAnimationParams.frame, htParams.i, htParams.htTo);
            htParams.oItem.set(htParams.htTo);
        }

        fRepeat.htParams = {i:i, htTo:htTo, oItem:oItem};

        aItemAnimations.push(
            collie.Timer.queue().
                delay(function(){}, i * 8).
                transition(oItem, 600, {
                    from:aFrom,
                    to:aTo,
                    set:aSet,
                    effect: aEffects
                }).
                repeat(fRepeat, 3)
        );
    }
}

function getColor(){
    var rmax = 255;//read
    var rmin = 128;
    var gmax = 255;//gree
    var gmin = 0;
    var bmax = 128;//blue
    var bmin = 0;
    var a = 0.6;
     
    var r = Math.floor(Math.random() * (rmax - rmin) + rmin);       //math.random() 0~1之间的随机数
    var g = Math.floor(Math.random() * (gmax - gmin) + gmin);       //math.floor()  向下取整
    var b = Math.floor(Math.random() * (bmax - bmin) + bmin);

    return 'rgba(' + r + ',' + g + ',' + b + ',' + a + ')';
}
//Wifi keyword 09368674974