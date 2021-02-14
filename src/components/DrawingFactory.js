import { colorPlate } from './ColorFactory'

const drawing = []
console.log(colorPlate['colorless'])

for (let key in colorPlate) {
    colorPlate[key].forEach(pixel => drawing.push(pixel))
}

export { drawing }