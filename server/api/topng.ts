import UPNG from 'upng-js'

export default defineEventHandler(async (event) => {
  const jsonData = await readBody(event)
  
  const IMG_SIZE = 300
  const { pixels, nbCases } = jsonData
  console.log(pixels, nbCases);
  
  const imageSize = IMG_SIZE + IMG_SIZE % nbCases // On veut une image de 300x300 pixels
  const pixelSize = imageSize / nbCases // Chaque case est un carré de 75x75 pixels si nbCases = 4

  const width = imageSize
  const height = imageSize

  // Création d'un tableau contenant les données RGBA pour chaque pixel
  const pixelData = new Uint8Array(width * height * 4) // 4 canaux (RGBA)

  // Remplir l'image avec les données des gros pixels
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

  // Tableau de frames (ici une seule frame avec nos données)
  const frames = [pixelData.buffer] // UPNG prend des ArrayBuffer pour les frames

  // console.log(UPNG);

  // Encode l'image avec UPNG (ici on utilise 0 pour "sans perte")
  const pngArrayBuffer = UPNG.encode(frames, width, height, 0)
  const png = new Uint8Array(pngArrayBuffer)

  // Sauvegarde l'image dans un buffer
  setResponseHeader(event, 'Content-Type', 'image/png')

  return png
})
