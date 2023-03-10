import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js'
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader.js'
import { createSkyBox } from './skybox'
import { keyPress, key } from './keyboard'


const renderer = new THREE.WebGLRenderer({antialias: true})
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

const scene = new THREE.Scene()
scene.background = new THREE.Color(0x000000)

const camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 0.1, 1000)

camera.position.z = 1

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
}, false)

const controls = new OrbitControls(camera, renderer.domElement)

var light = new THREE.AmbientLight(0xffffff, 10)
scene.add(light)

var plight = new THREE.PointLight(0xffffff, 50, 50)
plight.position.set(0, 25, -10)
scene.add(plight)

let model
const modelPath = 'models/ironman/'
const mtlFile = 'myironman.mtl'
const objFile = 'myironman.obj'

const manager = new THREE.LoadingManager()
manager.onProgress = (item, loaded, total) => {
    console.log(item, loaded, total)
}

const mtlLoader = new MTLLoader(manager)
const objLoader = new OBJLoader()

mtlLoader.setPath(modelPath).load(mtlFile, (materials) => {
    materials.preload()
    objLoader.setMaterials(materials)
    objLoader.setPath(modelPath).load(objFile, (object) => {
        model = object
        model.scale.setScalar(.5)
        model.position.x = .01
        model.position.z = .5
        scene.add(model)
        createSkyBox('darknebula', 70).then(sky => {
            scene.add(sky)
            animate()
        }).catch(error => console.log(error))
    })
})

keyPress(window)

function animate(){
    controls.update()

    if(key == 'a'){
        model.rotation.y -= 0.1
    }

    if(key == 'd'){
        model.rotation.y += 0.1
    }

    if(key == 'w'){
        model.rotation.x -= 0.1
    }

    if(key == 's'){
        model.rotation.x += 0.1
    }

    renderer.render(scene, camera)
    requestAnimationFrame(animate)
}


