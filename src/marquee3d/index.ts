import { Mesh, MeshBasicMaterial, PerspectiveCamera, PlaneGeometry, Scene, TextureLoader, WebGLRenderer } from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { getItemPositions, Position3D } from "./marqueePosition";

interface Marquee3DOption {
  canvas: HTMLCanvasElement,
  columnCount: number,
  radius: number,
  rowCount: number,
  rowOffset: number,
  rowHeight: number,
}

export class Marquee3D {
  scene:Scene;
  renderer:WebGLRenderer;
  camera:PerspectiveCamera;
  textureLoader = new TextureLoader();

  constructor(imageUrls: string[], option: Marquee3DOption){
    const {
      canvas,
      columnCount,
      radius,
      rowCount,
      rowOffset,
      rowHeight,  
    } = option;

    this.scene = new Scene();
    this.renderer = new WebGLRenderer({
      canvas
    });
    const {width, height} = canvas.getBoundingClientRect();

    this.camera = new PerspectiveCamera(45, width/height, 0.1, 100);
    this.renderer.setSize(width, height);

    this.camera.position.z = 3;

    const marqueePositions = getItemPositions({
      columnCount,
      radius,
      rowCount,
      rowOffset,
      rowHeight,
    })

    marqueePositions.forEach((column) => {
      column.forEach((position) => {
        const imageUrl = imageUrls[Math.floor(Math.random() * imageUrls.length)];
        this.getImagePlane(imageUrl, position).then((plane) => {
          plane.lookAt(0, plane.position.y, 0);
          this.scene.add(plane);
        })
      })
    })

    new OrbitControls(this.camera, this.renderer.domElement);
    this.renderer.render(this.scene, this.camera)
    this.tick()
  }

  private tick(){
    this.renderer.render(this.scene, this.camera);
    window.requestAnimationFrame(() => {
      this.tick()
    });
  }

  private getImagePlane(imageUrl: string, position: Position3D){
    return new Promise<Mesh<PlaneGeometry, MeshBasicMaterial>>((resolve) => {
      this.textureLoader.load(imageUrl, function(texture){
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
      })
    })
  }

  updateSize(width:number, height: number){
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();

    this.renderer.setSize(width, height);
  }
}

function getImageSize(ratio: number){
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