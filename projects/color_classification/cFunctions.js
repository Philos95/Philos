function rightColor(r,g,b){
    let distance = Infinity;
    let nearestColor;
    for(let color of colorArray){
        if(color.getDistance(r,g,b)<distance){
            distance = color.getDistance(r,g,b);
            nearestColor=color;
        }
    }

    return nearestColor.name;
    
}

function printColor(color,type,y_off,W,H){
    let x;
    let y;
    switch(color){
        //1 1
        case "red":
            x= W/8;
            y = H/6;
        break;
        //1 2
        case "green":
            x= W/8;
            y = H/2;
        break;
        //1 3
        case "blue":
            x= W/8;
            y = H*5/6;
        break;
        //2 1
        case "yellow":
            x= W*3/8;
            y = H/6;
        break;
        //2 2 
        case "pink":
            x= W*3/8;
            y = H/2;
        break;
        //2 3
        case "azure":
            x= W*3/8;
            y = H*5/6;
        break;

        //3 1
        case "orange":
        x= W*5/8;
        y = H/6;
        break;
        //3 2
        case "purple":
            x= W*5/8;
            y = H/2;
        break;
        //3 3
        case "brown":
            x= W*5/8;
            y = H*5/6;
        break;

        //4 1
        case "grey":
            x= W*7/8;
            y = H/6;
        break;
        //4 2
        case "black":
            x= W*7/8;
            y = H/2;
        break;
        //4 2
        case "white":
            x= W*7/8;
            y = H*5/6;
        break;
    }
    fill(type);
    ellipse(x,y+y_off,20,20);
}
