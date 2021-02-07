import { makeRGB, colorValue } from './ColorFactory'

const drawing = []

for (let i = 31; i > 0; i--) {
  for (let j = 0; j < 31; j++) {
    drawing.push(makeRGB(colorValue[i],colorValue[j],colorValue[0]))
  }
}

export { drawing }