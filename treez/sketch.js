

var tree = [];
var leaves = [];
var particles = [];
var count = 0;
let physics;
class Particle extends toxi.physics2d.VerletParticle2D {
  constructor(position) {
    super(position);
  }
  display() {
    stroke(255);
    ellipse(this.x, this.y, 8, 8);
  }
}


function setup() {
  createCanvas(640,360);
  physics = new toxi.physics2d.VerletPhysics2D();
  physics.addBehavior(new toxi.physics2d.behaviors.GravityBehavior(new toxi.geom.Vec2D(0, 0.001)));
//  physics.setWorldBounds(new toxi.geom.Rect(0, 0, width, height));

  var a = createVector((width / 2), (height));
  var b = createVector((width / 2), (height - 100));
  var root = new Branch(a, b);
  tree[0] = root;
  knob = new Particle(new toxi.geom.Vec2D(b.x, b.y));
  particles[0] = knob;
  physics.addParticle(knob);
//  knob.lock();
  background(100);
}

function draw() {
  background(100);
  physics.update();
  for (var i = 0; i < tree.length; i++) {
   tree[i].show();
   particles[i].display();
  }
}
setInterval(growTree,400);
//function mousePressed() {
function growTree() {
  for (var i = tree.length - 1; i >= 0; i--) {
      if ((!tree[i].finished) && (i < 30)) {
        tree.push(tree[i].branchA().newBranch);
        tree.push(tree[i].branchB().newBranch);
        particles.push(tree[i].branchA().newParticle);
        particles.push(tree[i].branchB().newParticle);
        let pA = tree[i].branchA().newParticle;
        let pB = tree[i].branchB().newParticle;
        let p = particles[i];
        let springA = new toxi.physics2d.VerletSpring2D(p, pA, pA.newLength, 0.1);
        let springB = new toxi.physics2d.VerletSpring2D(p, pB, pB.newLength, 0.1);
        physics.addSpring(springB);
        count++;
      }
      tree[i].finished = true;
  }
//  console.log("count" + count);
//  console.log("tree length" + tree.length);
  if (tree.length > 6) {
//      console.log("delete" + Math.round((Math.random() * 6)));
      let index2delete = Math.round(Math.random() * count);
      tree.splice(index2delete, 1);
      particles.splice(index2delete,1);
      count--;
  }
}
