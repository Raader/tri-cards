export function collides(point,area){
    return area.x <= point.x && point.x <= area.x + area.width && area.y <= point.y && point.y <= area.y + area.height;
}

export function intersects(area1,area2){
    const x = area1.x
    const y = area1.y
    const width = area1.width;
    const height = area1.height;
    const corners = [
        {x: x,y: y},
        {x: x + width ,y: y },
        {x: x + width,y: y + height},
        {x: x ,y: y + height},
    ]
    for(let corner of corners){
        if(collides(corner,area2)){
            return true;
        }
    }
    return false;
}
export function pointOutOfArea(point,area) {
    return point.x < area.x || point.x > area.x + area.width || point.y < area.y || point.y > area.y + area.height
}

export function areaOutOfArea(area1,area2){
    const x = area1.x
    const y = area1.y
    const width = area1.width;
    const height = area1.height;
    const corners = [
        {x: x,y: y},
        {x: x + width ,y: y },
        {x: x + width,y: y + height},
        {x: x ,y: y + height},
    ]
    for(let corner of corners){
        if(pointOutOfArea(corner,area2)){
            return true;
        }
    }
    return false;
}