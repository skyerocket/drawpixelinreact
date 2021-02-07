// base color 
// red : (255, 0-55, 0) and (255, 0, 0-120)
// orange: (255, 55-140, 0)
// yellow: (255, 140-255, 0) and (200-255, 255, 0)
// green: (0-200, 255,0) and (0, 255, 0-220)
// blue: (0, 255, 220-255) and (0, 0-255, 255)
// purple: (0-255, 0, 255) and (255, 0, 120 -255)

// white black and grey
// all color that matches (x, x, x) with three equal value x

// generated color, meaning tinted / toned / shaded color from based color
// add blackness（in hsv model = value) or whiteness (in hsv model = saturation)
// red min 
// orange min   (255, 100, 0)  255 * 0.1 + 255 * 0.9 = 255; 10 + 255 * 0.9 = 240 230
// yellow min
// green min
// blue min
// purple min

export const makeRGB = (R, G, B) => `rgb(${R},${G},${B})`

export const colorValue = [...Array(256).keys()].reduce((acc, elem, i) => (i + 1 ) % 8 === 0 ? [...acc, elem] : acc, []).reverse()
// [[255, 247, 239, 231, 223, 215, 207, 199, 191, 183, 175, 167, 159, 151, 143, 135, 127, 119, 111, 103, 95, 87, 79, 71, 63, 55, 47, 39, 31, 23, 15, 7]]

const colorPlate = {
    red : [],
    orange: [],
    yellow: [],
    green: [],
    blue: [],
    purple: [],
    colorless: [],
}

// red
for (let i = 0; i < 55; i++) {
    
}