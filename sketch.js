let ps = [];
let currentShape = 'sphere';
let rotationSpeed;
let video;
let brightnessThreshold = 150;

let states = {
  IDLE: 'idle',
  ACTIVE: 'active',
  EXPLODING: 'exploding'
};
let currentState = states.IDLE;

function setup() {
  createCanvas(innerWidth, innerHeight, WEBGL);
  colorMode(HSB, 255);
  frameRate(30);
  rotationSpeed = random(0.005, 0.02);

  video = createCapture(VIDEO);
  video.size(width, height);
  video.hide();
}

function draw() {
  background(0);

  rotateX(frameCount * rotationSpeed);
  rotateY(frameCount * rotationSpeed);

  video.loadPixels();
  let avgBrightness = calculateBrightness(video.pixels);

  updateState(avgBrightness);

  if (currentState === states.ACTIVE && frameCount % 15 === 0) {
    let numParticles = 5;
    for (let i = 0; i < numParticles; i++) {
      let x = random(-width / 2, width / 2);
      let y = random(-height / 2, height / 2);
      let z = random(-500, 500);
      ps.push(new System(x, y, z, currentShape));
    }
  } else if (currentState === states.IDLE && random() < 0.1) {
    let numParticles = 3;
    for (let i = 0; i < numParticles; i++) {
      let x = random(-width / 2, width / 2);
      let y = random(-height / 2, height / 2);
      let z = random(-500, 500);
      ps.push(new System(x, y, z, currentShape));
    }
  }

  for (let i = ps.length - 1; i >= 0; i--) {
    ps[i].update();
    ps[i].display();
    
    if (ps[i].done) {
      ps.splice(i, 1);
    }
  }
}

function calculateBrightness(pixels) {
  let totalBrightness = 0;
  let count = 0;
  
  for (let i = 0; i < pixels.length; i += 4) {
    let r = pixels[i];
    let g = pixels[i + 1];
    let b = pixels[i + 2];
    
    let brightness = (r + g + b) / 3;
    totalBrightness += brightness;
    count++;
  }
  
  return totalBrightness / count;
}

function updateState(avgBrightness) {
  if (avgBrightness > brightnessThreshold) {
    currentState = states.ACTIVE;
  } else if (avgBrightness < brightnessThreshold / 2) {
    currentState = states.EXPLODING;
  } else {
    currentState = states.IDLE;
  }
}

class Particle {
  constructor(x, y, shape) {
    this.pos = createVector(x, y, random(-100, 100));
    this.vel = createVector(0, 0, 0);
    this.acc = p5.Vector.random3D().mult(0.05);
    
    this.life = random(200, 400);
    this.initialLife = this.life;
    this.done = false;
    this.hueValue = 0;
    this.shape = shape;
  }

  update() {
    this.finished(); 

    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.mult(0);

    this.life -= 3;
    
    if (this.hueValue > 255) {
      this.hueValue = 0;
    }
    this.hueValue += 1;

    this.applyGravity();
    this.applyFriction();
  }

  applyGravity() {
    let gravity = createVector(0, 0.1, 0); 
    this.acc.add(gravity);
  }

  applyFriction() {
    let friction = this.vel.copy();
    friction.mult(-1);
    friction.normalize();
    friction.mult(0.01); 
    this.acc.add(friction);
  }
  
  display() {
    noStroke();
    fill(this.hueValue, 255, map(this.life, 0, this.initialLife, 0, 255));
    
    push();
    translate(this.pos.x, this.pos.y, this.pos.z);
    
    if (this.shape === 'sphere') {
      sphere(5);
    } else if (this.shape === 'cone') {
      cone(5, 10);
    } else if (this.shape === 'torus') {
      torus(5, 2);
    } else if (this.shape === 'ellipsoid') {
      ellipsoid(5, 5, 10);
    }
    
    pop();
  }
  
  finished() {
    if (this.life < 0) {
      this.done = true;
      if (currentState === states.EXPLODING) {
        this.explode();
      }
    }
  }

  explode() {
    let numExplosionParticles = 10;
    for (let i = 0; i < numExplosionParticles; i++) {
      let explosionParticle = new Particle(this.pos.x, this.pos.y, this.shape);
      explosionParticle.vel = p5.Vector.random3D().mult(2);
      ps.push(explosionParticle);
    }
  }
}

class System {
  constructor(x, y, z, shape) {
    this.x = x;
    this.y = y;
    this.z = z;
    
    this.particles = []; 
    this.num = 50;
    for (let i = 0; i < this.num; i++) {
      this.particles.push(new Particle(this.x, this.y, shape));
    }
    
    this.done = false;
  }
  
  update() {
    this.finished(); 
    for (let i = this.particles.length - 1; i >= 0; i--) {
      this.particles[i].update();

      if (this.particles[i].done) {
        this.particles.splice(i, 1);
      }
    }
  }
  
  display() {
    for (let i = 0; i < this.particles.length; i++) {
      this.particles[i].display();
    }
  }
  
  finished() {
    this.done = this.particles.length === 0;
  }
}
