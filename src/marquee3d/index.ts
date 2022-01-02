import { Group, Mesh, MeshBasicMaterial, PerspectiveCamera, PlaneGeometry, Scene, TextureLoader, WebGLRenderer, Clock } from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { getItemPositions, Position3D } from "./marqueePosition";
import Timer from "./Timer";
import { getImageIndexInOrder, getImageSize, getRandomImageIndex } from "./utils";

type ImageOrder = "sequence" | "random";
interface Marquee3DOption {
  canvas: HTMLCanvasElement,
  columnCount: number,
  radius: number,
  rowCount: number,
  rowOffset: number,
  imageOrder: ImageOrder,
  spinSpeed?: number,
}

const ROW_HEIGHT = 1;

export class Marquee3D {
  scene:Scene;
  renderer:WebGLRenderer;
  camera:PerspectiveCamera;
  textureLoader = new TextureLoader();
  timer = new Timer();
  
  // Options
  imageOrder: ImageOrder;
  rowCount: number;
  spinSpeed: number;

  imageGroup = new Group();

  constructor(private imageUrls: string[], option: Marquee3DOption){
    const {
      canvas,
      columnCount,
      radius,
      rowCount,
      rowOffset,
      imageOrder,
      spinSpeed,
    } = option;
    
    this.rowCount = rowCount;
    this.imageOrder = imageOrder;
    this.spinSpeed = spinSpeed || 0;

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
      rowHeight: ROW_HEIGHT,
    })

    marqueePositions.forEach((column, rowIndex) => {
      column.forEach((position, columnIndex) => {
        const imageUrl = imageUrls[this.getImageIndex(rowIndex, columnIndex)];
        this.getImagePlane(imageUrl, position).then((plane) => {
          plane.lookAt(0, plane.position.y, 0);
          this.imageGroup.add(plane);
        })
      })
    })
    this.scene.add(this.imageGroup);

    new OrbitControls(this.camera, this.renderer.domElement);
    this.renderer.render(this.scene, this.camera)
    this.tick()
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

  private getImageIndex(rowIndex: number, columnIndex: number):number{
    switch(this.imageOrder){
      case "sequence":
        return getImageIndexInOrder(this.imageUrls.length, this.rowCount, rowIndex, columnIndex);
      case "random":
        return getRandomImageIndex(this.imageUrls.length);
      default:
        throw new Error("Invalid imageOrder type")
    }
  }

  private spin(){
    const deltaTime = this.timer.getDeltaTime();
    this.imageGroup.rotation.y += deltaTime * this.spinSpeed;
  }

  private tick(){
    this.renderer.render(this.scene, this.camera);
    this.spin();
    window.requestAnimationFrame(() => {
      this.tick()
    });
  }

  updateSize(width:number, height: number){
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();

    this.renderer.setSize(width, height);
  }
}
