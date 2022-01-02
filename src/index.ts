import {
	Mesh,
	TextureLoader,
	MeshBasicMaterial,
	PerspectiveCamera,
	PlaneGeometry,
	Scene,
	WebGLRenderer,
} from "three";
import { getItemPositions, Position3D } from "./Marquee3D/marqueePosition";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { Marquee3D } from "./Marquee3D";

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
	const mainCanvas = document.getElementById('mainCanvas') as HTMLCanvasElement;

	new Marquee3D(imageUrls, {
		canvas: mainCanvas,
		columnCount: 12,
	  radius: 3,
	  rowCount: 5,
	  rowOffset: 0.2,
	  rowHeight: 1,
	})
}

main();
