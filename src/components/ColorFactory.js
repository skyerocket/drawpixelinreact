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

const generatedColorFromBase = ([r, g, b], color) => {
    const blackMin = [getTheSpecifiedRGB(r*0.1),getTheSpecifiedRGB(g*0.1),getTheSpecifiedRGB(b*0.1)]
    const whiteMin = [getTheSpecifiedRGB(r*0.1+229.5),getTheSpecifiedRGB(g*0.1+229.5),getTheSpecifiedRGB(b*0.1+229.5)]

    range(blackMin[0], r).forEach(i => {
        if (i == g && g == b) {
            colorPlate['colorless'].add(makeRGB(i,g,b))
        } else {
            colorPlate[color].add(makeRGB(i,g,b))
        }
    })

    range(blackMin[1], g).forEach(j => {
        if (r == j && j == b) {
            colorPlate['colorless'].add(makeRGB(r,j,b))
        } else {
            colorPlate[color].add(makeRGB(r,j,b))
        }
    })

    range(blackMin[2], b).forEach(k => {
        if (r == g && g == k) {
            colorPlate['colorless'].add(makeRGB(r,g,k))
        } else {
            colorPlate[color].add(makeRGB(r,g,k))
        }
    })

    range(r,whiteMin[0]).forEach(i => {
        if (i == g && g == b) {
            colorPlate['colorless'].add(makeRGB(i,g,b))
        } else {
            colorPlate[color].add(makeRGB(i,g,b))
        }
    })

    range(g, whiteMin[1]).forEach(j => {
        if (r == j && j == b) {
            colorPlate['colorless'].add(makeRGB(r,j,b))
        } else {
            colorPlate[color].add(makeRGB(r,j,b))
        }
    })

    range(b, whiteMin[2]).forEach(k => {
        if (r == g && g == k) {
            colorPlate['colorless'].add(makeRGB(r,g,k))
        } else {
            colorPlate[color].add(makeRGB(r,g,k))
        }
    })

    for (let i = blackMin[0]; i <= r; i+=8) {
        for (let j = blackMin[1]; j <= g; j +=8) {
            for (let k = blackMin[2]; k <= b; k += 8) {
                if (i == j && j == k) {
                    colorPlate['colorless'].add(makeRGB(i,j,k))
                } else {
                    colorPlate[color].add(makeRGB(i,j,k))
                }
            }
        }
    }

    for (let i=r; i <= whiteMin[0]; i+=8) {
        for (let j=g; j <= whiteMin[1]; j += 8) {
            for (let k=b; k <= whiteMin[2]; k +=8) {
                if (i == j && j == k) {
                    colorPlate['colorless'].add(makeRGB(i,j,k))
                } else {
                    colorPlate[color].add(makeRGB(i,j,k))
                }
            }
        }
    }
}

const colorPlate = {
    red : new Set(),
    orange: new Set(),
    yellow: new Set(),
    green: new Set(),
    blue: new Set(),
    purple: new Set(),
    colorless: new Set(),
};

// red : (255, 0-55, 0) and (255, 0, 0-120)
range(0, 55).forEach(i => {
    colorPlate['red'].add(makeRGB(255, i, 0 ))
    generatedColorFromBase([255, i, 0], 'red')
});
range(0, 120).forEach(i => {
    colorPlate['red'].add(makeRGB(255, 0, i ))
    generatedColorFromBase([255, 0, i], 'red')
})

// orange : (255, 55-140, 0)
range(55,140).forEach(i => {
    colorPlate['orange'].add(makeRGB(255, i, 0 ))
    generatedColorFromBase([255, i , 0], 'orange')
})

// yellow: (255, 140-255, 0) and (200-255, 255, 0)
range(140,255).forEach(i => {
    colorPlate['yellow'].add(makeRGB(255, i, 0))
    generatedColorFromBase([255, i, 0], 'orange')
})
range(200,255).forEach(i => {
    colorPlate['yellow'].add(makeRGB(i, 255, 0))
    generatedColorFromBase([i, 255, 0], 'yellow')
})

// green: (0-200, 255,0) and (0, 255, 0-220)
range(0,200).forEach(i => {
    colorPlate['green'].add(makeRGB(i, 255, 0))
    generatedColorFromBase([i, 255, 0], 'green')
})
range(0,220).forEach(i => {
    colorPlate['green'].add(makeRGB(0, 255, i))
    generatedColorFromBase([0, 255, i], 'green')
})


// blue: (0, 255, 220-255) and (0, 0-255, 255)
range(220,255).forEach(i => {
    colorPlate['blue'].add(makeRGB(0, 255, i))
    generatedColorFromBase([0, 255, i], 'blue')
})
range(0,255).forEach(i => {
    colorPlate['blue'].add(makeRGB(0, i, 255))
    generatedColorFromBase([0, i, 255], 'blue')
})

// purple: (0-255, 0, 255) and (255, 0, 120 - 255)
range(0,255).forEach(i => {
    colorPlate['purple'].add(makeRGB(i, 0, 255))
    generatedColorFromBase([i, 0, 255], 'purple')
})
range(120,255).forEach(i => {
    colorPlate['purple'].add(makeRGB(255, 0, i))
    generatedColorFromBase([255, 0, i], 'purple')
})

export { colorPlate }