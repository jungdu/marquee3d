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
	"./ethan-chan-ZV3VcGHZIlM-unsplash.jpg",
	"./cristi-ursea-_FZPIDFlyRI-unsplash.jpg",
	"./julia-koi-uKqqr61gGJ8-unsplash.jpg",
	"./masahiro-miyagi-cXJPNhzyWfE-unsplash.jpg",
	"./sean-boyd-7vTHB7ddXTQ-unsplash.jpg",
	"./tangerine-newt-q2PMPo8gBBk-unsplash.jpg",
	"./markus-spiske-203kEfTORcw-unsplash.jpg",
	"./jonny-gios-JmNBY1QEpvE-unsplash.jpg",
	"./susan-wilkinson-wo6nIu-_maQ-unsplash.jpg",
	"./andrew-haimerl-andrewnef-NgYS0emuJQM-unsplash.jpg"
];

function main() {
	const mainCanvas = document.getElementById('mainCanvas') as HTMLCanvasElement;

	const marquee3D = new Marquee3D(imageUrls, {
		canvas: mainCanvas,
		columnCount: 15,
	  radius: 2.5,
	  rowCount: 4,
	  rowOffset: 0.1,
		imageOrder: "sequence",
		spinSpeed: 0.3,
	})

	window.addEventListener('resize', () => {
		const width = window.innerWidth;
		const height = window.innerHeight;

		marquee3D.updateSize(width, height);
	})
}

main();
