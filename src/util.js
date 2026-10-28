// RAWG serves resized images under /media/resize/<size>/-/...
// Some games have no image, so return an empty string instead of crashing.
export const smallImage= (imagePath,size)=>{
    if(!imagePath) return ""
    const image=imagePath.match(/media\/screenshots/)
    ?imagePath.replace("media/screenshots",`media/resize/${size}/-/screenshots`)
    : imagePath.replace('/media/games/',`/media/resize/${size}/-/games/`)
    return image
}
