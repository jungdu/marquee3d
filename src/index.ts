import {
	Mesh,
	TextureLoader,
	MeshBasicMaterial,
	PerspectiveCamera,
	PlaneGeometry,
	Scene,
	WebGLRenderer,
} from "three";
import { getItemPositions, Position3D } from "./marquee3d/marqueePosition";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const imageUrls = [
	"./josh-hild-RR7j6oX_3lk-unsplash.jpg",
  "./brad-fickeisen-Yf1dL-A92dI-unsplash.jpg",
  "./piotr-skrzynski-gye1IvUaG1E-unsplash.jpg",
  "./iuliu-illes-z8OA6hXYg10-unsplash.jpg",
  "./micha-frank-P5EF4V-wGc8-unsplash.jpg",
  "./kai-bossom-CAyCw3yrDjs-unsplash.jpg",
  "./marek-piwnicki-kDm08xoR56c-unsplash.jpg",
	"./mateusz-klein-X9EpOqEhxBA-unsplash.jpg",
	"./marc-wieland-lH3zFaBhT_Q-unsplash.jpg",
	"./ethan-chan-ZV3VcGHZIlM-unsplash.jpg"
];

function main() {
	const scene = new Scene();
	const renderer = new WebGLRenderer();
	const textureLoader = new TextureLoader();

	const camera = new PerspectiveCamera(
		40,
		window.innerWidth / window.innerHeight,
		0.1,
		1000
	);
	renderer.setSize(window.innerWidth, window.innerHeight);

	document.body.appendChild(renderer.domElement);
	addWindowResize();

	camera.position.z = 3.2;



	const marqueePositions = getItemPositions({
	  columnCount: 12,
	  radius: 3,
	  rowCount: 3,
	  rowOffset: 0.3,
	  rowHeight: 1,
	})


  marqueePositions.forEach((column, rowIndex) => {
    column.forEach((position, celIndex) => {
      const imageUrl = imageUrls[Math.floor(Math.random() * imageUrls.length)];
      getImagePlane(imageUrl, position).then((plane) => {
        plane.lookAt(0, plane.position.y, 0);
        scene.add(plane);
      });
    })
  })

	new OrbitControls(camera, renderer.domElement);
	renderer.render(scene, camera);
	tick();

	function addWindowResize() {
		window.addEventListener("resize", () => {
			const { innerWidth, innerHeight } = window;

			camera.aspect = innerWidth / innerHeight;
			camera.updateProjectionMatrix();

			renderer.setSize(innerWidth, innerHeight);
		});
	}

	function tick() {
		renderer.render(scene, camera);
		window.requestAnimationFrame(tick);
	}

	function getImagePlane(imageUrl: string, position: Position3D) {
		return new Promise<Mesh<PlaneGeometry, MeshBasicMaterial>>((resolve) => {
			textureLoader.load(imageUrl, function (texture) {
				const material = new MeshBasicMaterial({
					map: texture,
				});

        const ratio = texture.image.width / texture.image.height;
        const {
          width,
          height
        } = getImageSize(ratio)

				const geometry = new PlaneGeometry(width, height);
				const plane = new Mesh(geometry, material);
        
        plane.position.x = position[0];
        plane.position.y = position[1];
        plane.position.z = position[2];

				resolve(plane);
			});
		});
	}

  function getImageSize(ratio:number){
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
}

main();
