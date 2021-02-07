/*  Color Rule     
    Requirement: RGB step 8 / all distinct color in the plate, 256 * 128 in total

    base color (in hsv model = hue)
    red : (255, 0-55, 0) and (255, 0, 0-120)
    orange: (255, 55-140, 0)
    yellow: (255, 140-255, 0) and (200-255, 255, 0)
    green: (0-200, 255,0) and (0, 255, 0-220)
    blue: (0, 255, 220-255) and (0, 0-255, 255)
    purple: (0-255, 0, 255) and (255, 0, 120 -255)

    white black and grey
    all color that matches (x, x, x) with three equal value x

    generated color, meaning tinted / toned / shaded color from based color
    add blackness（in hsv model = value) or whiteness (in hsv model = saturation)
    red min      add 90% white(255) or 90% black(0) at most, others are colorless
    orange min   e.g.whiteness (255, 100, 0)  255 * 0.1 + 255 * 0.9 = 255; 10 + 255 * 0.9 = 240 230
    yellow min
    green min
    blue min
    purple min

    colorless
    white black and grey and all colors excluded by generated color
*/

const makeRGB = (R, G, B) => `rgb(${R},${G},${B})`
const range = (start,end) => new Array(Math.ceil((end - start)/8)+1).fill()
.map((_, i) => start === 0 ? i === 0 ? 0:  start - 1 + i * 8: start + i * 8); //inclusive, step 8

const getTheSpecifiedRGB = num => Math.round(num/8)*8-1 === -1 ? 0 : Math.round(num/8)*8-1 // has to be 0, 7 , 15...

const generatedColorFromBase = ([r, g, b]) => {
    const blackMin = [getTheSpecifiedRGB(r*0.1),getTheSpecifiedRGB(g*0.1),getTheSpecifiedRGB(b*0.1)]
    const whiteMin = [getTheSpecifiedRGB(r*0.1+229.5),getTheSpecifiedRGB(g*0.1+229.5),getTheSpecifiedRGB(b*0.1+229.5)]
    console.log(blackMin, whiteMin ,r,g,b)
    return []
}

const colorPlate = {
    red : [],
    orange: [],
    yellow: [],
    green: [],
    blue: [],
    purple: [],
    colorless: [],
};

// red : (255, 0-55, 0) and (255, 0, 0-120)
console.log(range(0, 55))
range(0, 55).forEach(i => {
    colorPlate['red'].push(makeRGB(255, i, 0 ))
    generatedColorFromBase([255, i, 0]).forEach(color => colorPlate['red'].push(color))
});
range(0, 120).forEach(i => {
    colorPlate['red'].push(makeRGB(255, 0, i ))
})


const colorValue = [...Array(256).keys()].reduce((acc, elem, i) => (i + 1 ) % 8 === 0 ? [...acc, elem] : acc, [0]).reverse()
// [[255, 247, 239, 231, 223, 215, 207, 199, 191, 183, 175, 167, 159, 151, 143, 135, 127, 119, 111, 103, 95, 87, 79, 71, 63, 55, 47, 39, 31, 23, 15, 7, 0]]

export { colorPlate }