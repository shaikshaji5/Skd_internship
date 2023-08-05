import './style.css'
import * as THREE from '/node_modules/three'
import { OrbitControls } from '/node_modules/three/examples/jsm/controls/OrbitControls'
import { DRACOLoader } from '/node_modules/three/examples/jsm/loaders/DRACOLoader'
import { GLTFLoader } from '/node_modules/three/examples/jsm/loaders/GLTFLoader'

const canvas = document.querySelector('canvas.webgl')

const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

const scene = new THREE.Scene()

const camera = new THREE.PerspectiveCamera(75,sizes.width / sizes.height)

camera.position.z = 5;
camera.position.x =0;
camera.position.y = 5;


scene.add(camera)

const dracoLoader = new DRACOLoader()
dracoLoader.setDecoderPath('draco/')

const gltfLoader = new GLTFLoader()
gltfLoader.setDRACOLoader(dracoLoader)

var spotLight = new THREE.SpotLight( 0xffffff )
spotLight.position.set(-40,60,-10)
scene.add(spotLight)

var SpotLight1 = new THREE.SpotLight( 0xffffff,2)
SpotLight1.position.set(40,10,20)
scene.add(SpotLight1)

var SpotLight2 = new THREE.SpotLight( 0xffffff,5)
SpotLight2.position.set(-100,100,-10)
scene.add(SpotLight2)

let mixer;
gltfLoader.load(
    'animated_teacher.glb',
    (gltf) =>
    {
        const model=gltf.scene;

        scene.add(model)



        mixer=new THREE.AnimationMixer(model);
        const clips=gltf.animations;
         clips.forEach(function(clip){
        const action=mixer.clipAction(clip);
        action.play()
        })
    }
)



const cursor ={x:0, y:0}
window.addEventListener('mousemove', (event) =>
{
    cursor.x = event.clientX / sizes.width - 0.5
    cursor.y = -( event.clientY / sizes.width - 0.5)
})


const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias:true,
    alpha:true
})
renderer.setSize(sizes.width, sizes.height)

const controls = new OrbitControls(camera, canvas)



window.addEventListener('resize', () => 
{
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()    

    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio,2))
})
// import { AnimationMixer } from 'three';
// const mixer = new AnimationMixer(model);
// const clips = model.animations;

// // // Play the animations
// clips.forEach((clip) => {
//   mixer.clipAction(clip).play();
// });

// function animate()
// {
//     requestAnimationFrame(animate)
//     renderer.render(scene, camera)
//     // const delta = clock.getDelta();
//     // mixer.update(delta);
//     scene.rotation.x +=0.005;
//     controls.update()
   

// }
// const clock=new THREE.Clock();
function animate() {
    // mixer.update(clock.getDelta());
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
  }
renderer.setAnimationLoop(animate);
// // Assuming you have a reference to the loaded model stored in the 'model' variable
// const mixer = new AnimationMixer(model);
// const clips = gltf.animations;

// // // Play the animations
// clips.forEach((clip) => {
//   mixer.clipAction(clip).play();
// });

// // Animation update loop
// const animate =()=>{

//     const delta = clock.getDelta();
//     mixer.update(delta);
//     window.requestAnimationFrame(animate);
//     renderer.render(scene, camera);
//     controls.update()
   

// }

// animate();
