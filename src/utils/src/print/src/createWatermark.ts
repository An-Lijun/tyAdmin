// @ts-nocheck
export function createWaterMark(
  doc,
  markName,
  fontColor = 'rgba(210,210,230,1)',
  fontSize = '25',
  fontFamily = 'Arial'
) {
  let markDiv = doc.querySelector('.base-printBody')

  const canvas = doc.createElement('canvas')
  canvas.width = 300
  canvas.height = 300
  const ctx = canvas.getContext('2d')
  ctx.fillStyle = fontColor
  ctx.font = `${fontSize}px`
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.rotate((-30 * Math.PI) / 180)
  ctx.fillText(markName, 0, 300)
  let imageUrl = canvas.toDataURL('image/png')
  markDiv.style.backgroundImage = 'url(' + imageUrl + ')'

  // return markDiv
}
