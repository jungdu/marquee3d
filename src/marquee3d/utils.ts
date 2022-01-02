
export function getImageIndexInOrder(imageLength: number, rowCount: number, rowIndex: number, columnIndex: number){
  return (rowIndex + (columnIndex * rowCount)) % imageLength
}

export function getRandomImageIndex(imageLength: number){
  return Math.floor(Math.random() * imageLength)
}


export function getImageSize(ratio: number){
  const maxWidth = 1;
  const maxHeight = 1;
  
  if(ratio === 1){
    return {
      width: maxWidth,
      height: maxHeight,
    }
  }
  if(ratio > 1){
    return {
      width: maxWidth,
      height: maxWidth / ratio
    }
  }
  return {
    width: maxHeight * ratio,
    height: maxHeight,
  }
}