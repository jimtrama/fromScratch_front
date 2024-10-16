import { Boid } from './boid';

export class Rockets {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;

  private boids: Boid[] = [];

  public playing = true;

  private boidNum = 100;

  private countOut: number = 0;
  private until: number = 350;
  private untilOut: number = 850;

  constructor(canvasId: string) {
    this.canvas = document.getElementById(canvasId) as HTMLCanvasElement;
    this.ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D;
    for (let i = 0; i < this.boidNum; i++) {
      this.boids.push(new Boid(this.canvas.width, this.canvas.height, i));
    }
  }

  run() {
    this.playing = true;
    this.countOut = 0;
    this.start(0);
  }

  stop() {
    this.playing = false;
  }

  private start(timeStamp: number) {
    // Update game objects in the loop
    this.clear();
    this.draw();

    this.onTrasitionOut();
    this.onTrasitionIn();

    if (this.countOut < this.untilOut){
        window.requestAnimationFrame(this.start.bind(this));
    }else{
        this.countOut = 0 ;
    }
  }

  private clear() {
    // Clear the entire canvas
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.fillStyle = '#1C1C1C';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
  }

  private draw() {
    for (let boid of this.boids) {
      boid.edges();
      boid.flock(this.boids);
      boid.update();
      boid.show(this.ctx);
    }
  }

  private onTrasitionOut() {
    if (this.playing) return; 

    this.countOut++;
    this.ctx.fillStyle = '#1C1C1C';
    this.ctx.fillRect(0, 0, this.lerp(0,this.canvas.width,this.countOut/this.untilOut), this.canvas.height);
  }

  private onTrasitionIn() {
    if (this.countOut == this.until) return; 

    this.countOut++;
    this.ctx.fillStyle = '#1C1C1C';
    this.ctx.fillRect(0, 0, this.canvas.width - this.lerp(0,this.canvas.width,this.countOut/this.until), this.canvas.height);
  }


  private lerp(x: number, y: number, a: number) {
    return x * (1 - a) + y * a;
  }
}
