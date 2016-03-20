function layoutTest(){
    var nOffsetX = -800;
    var nOffsetY = -500;
    var arrayX = myTestXs;
    var arrayY = myTestYs;
    arrangeItems(function(i){
        return {
            x: nOffsetX + arrayX[i%arrayX.length],
            y: nOffsetY + arrayY[i%arrayY.length],
            angle: 0,
            originX: "center",
            originY: "center"
        }
    }, function(nFrame, nIdx, htInfo){
        htInfo.angle++;
    });
}
function layoutFlower(){
    var nOffsetX = -800;
    var nOffsetY = -500;
    var arrayX = myFlowerXs;
    var arrayY = myFlowerYs;
    arrangeItems(function(i){
       return {
            x: nOffsetX + arrayX[i%arrayX.length],
            y: nOffsetY + arrayY[i%arrayY.length],
            angle: 0,
            originX: "center",
            originY: "center"
        }
    }, function(nFrame, nIdx, htInfo){
        htInfo.angle++;

    });
}
function layoutStart(){
    var nOffsetX = -800;
    var nOffsetY = -500;
    var arrayX = myStartXs;
    var arrayY = myStartYs;
    arrangeItems(function(i){
       return {
            x: nOffsetX + arrayX[i%arrayX.length],
            y: nOffsetY + arrayY[i%arrayY.length],
            angle: 0,
            originX: "center",
            originY: "center"
        }
    }, function(nFrame, nIdx, htInfo){
        htInfo.angle++;

    });
}
function layoutLove(){
    var nOffsetX = -800;
    var nOffsetY = -500;
    var arrayX = myLoveXs;
    var arrayY = myLoveYs;
    arrangeItems(function(i){
       return {
            x: nOffsetX + arrayX[i%arrayX.length],
            y: nOffsetY + arrayY[i%arrayY.length],
            angle: 0,
            originX: "center",
            originY: "center"
        }
    }, function(nFrame, nIdx, htInfo){
        htInfo.angle++;

    });
}
function layoutPoint(){
    arrangeItems(function(i){
        return{
            x: -Math.floor(Math.random() * 1000)+500,
            y: -Math.floor(Math.random() * 800)+400,
            angle: 0,
            originX: "left",
            originY: "top"
        }
    },function(nFrame, nIdx, htInfo){
        htInfo.angle++;
        htInfo.y+=5;
        htInfo.x++;

    });
}
function layoutHeart(){      
    var nOffsetX =0;
    var nOffsetY =0;
    arrangeItems(function(i){
        return{
            x: nOffsetX + (10 * Math.pow(Math.sin(i), 3))*nItemSize,
            y: nOffsetY + parseInt(-(8 * Math.cos(i) - 4 * Math.cos(2 * i) - 2 * Math.cos(3 * i) - Math.cos(4 * i)))*nItemSize,
            angle: 0,
            originX: "left",
            originY: "top"
        }
    },function(nFrame, nIdx, htInfo){
        htInfo.angle++;

    });
};




