import { colorPlate } from './ColorFactory'

const drawing = []

colorPlate['red'].forEach(pixel => drawing.push(pixel))

console.log(drawing)

export { drawing }