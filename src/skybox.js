import {TextureLoader, MeshBasicMaterial, BackSide, BoxGeometry, Mesh} from 'three'

const createPathString = (filename) => {
    const basePath = "img/skybox/";
    const baseFileName = basePath + filename
    const fileType = ".png"
    const sides = ["front", "back", "up", "down", "left", "right"]
    const pathStrings = sides.map(side => {
        return baseFileName + "/" + side + fileType
    })
    return pathStrings
}

const createSkyBoxMaterial = async (filename) => {
    const skyBoxImagePaths = createPathString(filename)
    const materialArray = []
    for(let imagePath of skyBoxImagePaths){
        let loader = new TextureLoader()
        let texture = await loader.loadAsync(imagePath)
        materialArray.push(
            new MeshBasicMaterial({map: texture, side: BackSide})
        )
    }
    return materialArray
}

const createSkyBox = async (filename, size) => {
    const skyboxGeo = new BoxGeometry(size, size, size)
    const skyArrayMaterial = await createSkyBoxMaterial(filename)
    return new Mesh(skyboxGeo, skyArrayMaterial)
}

export { createSkyBox }