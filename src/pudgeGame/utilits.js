



//  * Высчитывает ШАГ и УГОЛ
export const moveImageBy = (pX, pY, tX, tY, widthImage, heightSegment, image) => {
    const info = start(pX, pY, tX, tY, widthImage, heightSegment);
    const arrayImage = [];
    for (let i = 0; i < info.n; i++) {
        arrayImage.push(image);
        arrayImage[i].
    }
    
};


//вызвав интервал подвинуть на этот шаг и угол, учитывая ТИК  

export const start = (pX, pY, tX, tY, widthImage, heightSegment) => {
    let x = pX - tX;
    let y = pY - tY;
    let d = Math.sqrt(x * x + y * y);
    let sin = y / d;
    let a;
    if (tX < 50) a = (Math.asin(sin) / Math.PI) * 180;
    else a = (-Math.asin(sin) / Math.PI) * 180;
    let dPIX = d * heightSegment / 100;
    // let n = 0;
    if (widthImage > dPIX) {
        return {
            a,
            n: 1,
            widthImage: dPIX,
        }
    } else {
        return {
            a,
            n: dPIX / widthImage,
            widthImage: dPIX % widthImage,
        }
    }

};
export const sad = () => {

};


