// Flocking
// Daniel Shiffman
// https://thecodingtrain.com/CodingChallenges/124-flocking-boids.html
// https://youtu.be/mhjuuHl6qHM

// Thanks To Daniel for the code (Big Fan)
//Sorry , but will tick it to my needs :(
import Victor from 'victor';

export class Boid {
  private position: Victor;
  private velocity: Victor;
  private acceleration: Victor;
  private id: number;

  private maxForce: number = 0.2;
  private maxSpeed: number = 5;

  private allignmentWeight: number = 0.9; // 0-2 range
  private cohesionWeight: number = 1;
  private separationWeight: number = 1.3;

  private width: number;
  private height: number;
  private r: number = 5;
  private colors = ["#50DA4C","#DDBB8E","#C401C4"]
  private color_index =0;

  constructor(width: number, heigth: number, id: number) {
    this.color_index = Math.floor(this.getRandomArbitrary(0,this.colors.length));
    this.id = id;
    this.width = width;
    this.height = heigth;
    this.position = new Victor(this.getRandomArbitrary(0,width),this.getRandomArbitrary(0,heigth));
    this.velocity = new Victor(
      this.getRandomArbitrary(-this.maxSpeed / 2, this.maxSpeed / 2),
      this.getRandomArbitrary(-this.maxSpeed / 2, this.maxSpeed / 2)
    );
    this.acceleration = new Victor(0,0)
  }

  private getRandomArbitrary(min = 0, max: number): number {
    return Math.random() * (max - min) + min;
  }

  private limit(max: number, v: Victor): void {
    if (v.magnitude() > max) {
      v.normalize().multiplyScalar(max);
    }
  }

  edges() {
    if (this.position.x + this.r >= this.width) {
      this.position.x = this.r +1;
    } else if (this.position.x - this.r < 0) {
      this.position.x = this.width -this.r -1;
    }
    if (this.position.y + this.r >= this.height) {
      this.position.y = this.r + 1;
    } else if (this.position.y - this.r  < 0) {
      this.position.y = this.height -this.r -1;
    }
  }

  align(boids: Boid[]) {
    let perceptionRadius = 25;
    let steering = new Victor(0, 0);
    let total = 0;
    for (let other of boids) {
      let d = this.position.distance(other.position);
      if (other.id != this.id && d < perceptionRadius) {
        steering.add(other.velocity);
        total++;
      }
    }
    if (total > 0) {
      steering.divideScalar(total);
      steering.normalize().multiplyScalar(this.maxSpeed);
      steering.subtract(this.velocity);
      this.limit(this.maxForce, steering);
    }
    return steering;
  }

  separation(boids: Boid[]) {
    let perceptionRadius = 24;
    let steering = new Victor(0, 0);
    let total = 0;
    for (let other of boids) {
      let d = this.position.distance(other.position);
      if (other.id != this.id && d < perceptionRadius) {
        let temp = new Victor(this.position.x,this.position.y)
        let diff = temp.subtract(other.position);
        diff.divideScalar(d * d);
        steering.add(diff);
        total++;
      }
    }
    if (total > 0) {
      steering.divideScalar(total);
      steering.normalize().multiplyScalar(this.maxSpeed);
      steering.subtract(this.velocity);
      this.limit(this.maxForce, steering);
    }
    return steering;
  }

  cohesion(boids: Boid[]) {
    let perceptionRadius = 50;
    let steering = new Victor(0, 0);
    let total = 0;
    for (let other of boids) {
      let d = this.position.distance(other.position);
      if (other.id != this.id && d < perceptionRadius) {
        steering.add(other.position);
        total++;
      }
    }
    if (total > 0) {
      steering.divideScalar(total);
      steering.subtract(this.position);
      steering.normalize().multiplyScalar(this.maxSpeed);
      steering.subtract(this.velocity);
      this.limit(this.maxForce, steering);
    }
    return steering;
  }

  flock(boids: Boid[]) {
    let alignment = this.align(boids);
    let cohesion = this.cohesion(boids);
    let separation = this.separation(boids);

    alignment.multiplyScalar(this.allignmentWeight);
    cohesion.multiplyScalar(this.cohesionWeight);
    separation.multiplyScalar(this.separationWeight);

    this.acceleration.add(alignment);
    this.acceleration.add(cohesion);
    this.acceleration.add(separation);
  }

  update() {
    this.position.add(this.velocity);
    this.velocity.add(this.acceleration);
    this.limit(this.maxSpeed, this.velocity);
    this.acceleration.multiplyScalar(0);
  }

  show(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = this.colors[this.color_index];
    ctx.beginPath();
    ctx.arc(this.position.x, this.position.y, this.r, 0, 2 * Math.PI);
    ctx.fill();
  }
}
