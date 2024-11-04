import UPNG from 'upng-js'

const drawFrame = (pixels: number[], width: number, height: number, nbCases: number, pixelSize: number) => {
  const pixelData = new Uint8Array(width * height * 4) // 4 canaux (RGBA)

  for (let i = 0; i < nbCases; i++) {
    for (let j = 0; j < nbCases; j++) {
      // Récupérer la couleur RGB de la case correspondante
      const pixelIndex = (i * nbCases + j) * 3 // Chaque case a 3 valeurs (R, G, B)
      const r = pixels[pixelIndex]
      const g = pixels[pixelIndex + 1]
      const b = pixels[pixelIndex + 2]

      // Remplir chaque pixel correspondant à cette case
      for (let x = 0; x < pixelSize; x++) {
        for (let y = 0; y < pixelSize; y++) {
          const index = ((j * pixelSize + x) + (i * pixelSize + y) * width) * 4
          pixelData[index] = r // Rouge
          pixelData[index + 1] = g // Vert
          pixelData[index + 2] = b // Bleu
          pixelData[index + 3] = 255 // Alpha (opaque)
        }
      }
    }
  }

  return pixelData
}

const isOneFrame = (pixels) => {
  if (Array.isArray(pixels) && pixels.every(Number.isInteger)) {
    return true
  }
  else if (Array.isArray(pixels) && pixels.every(Array.isArray)) {
    // on a un tableau de tableaux de pixels
    return false
  }
  throw new Error('pixels should be an array of integers or an array of arrays of integers')
}
export const genPNG = async (jsonData: object) => {
  const IMG_SIZE = 350
  const { pixels, nbCases, duration } = jsonData

  const pixelData = isOneFrame(pixels) ? [pixels] : pixels

  const imageSize = IMG_SIZE - IMG_SIZE % nbCases // On veut une image de 300x300 pixels
  const pixelSize = imageSize / nbCases // Chaque case est un carré de 75x75 pixels si nbCases = 4

  const width = imageSize
  const height = imageSize

  console.log('imageSize, pixelSize, width, height:', imageSize, pixelSize, width, height)

  const toBeBuffered = pixelData.map(pxs => drawFrame(pxs, width, height, nbCases, pixelSize))
  // Tableau de frames (ici une seule frame avec nos données)
  const frames = toBeBuffered.map(tbf => tbf.buffer) // UPNG prend des ArrayBuffer pour les frames

  // console.log(UPNG);

  // Encode l'image avec UPNG (ici on utilise 0 pour "sans perte")
  const pngArrayBuffer = UPNG.encode(frames, width, height, 0, frames.map(el => duration))
  const png = new Uint8Array(pngArrayBuffer)

  return png
}
