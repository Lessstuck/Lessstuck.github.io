function Branch(begin, end) {
  this.begin = begin;
  this.end = end;
  this.finished = false;

  this.show = function() {
    stroke(200);
    line(this.begin.x, this.begin.y, this.end.x, this.end.y);
  }

  this.branchA = function() {
    var dir = p5.Vector.sub(this.end, this.begin);
    dir.rotate(PI / 6);
    dir.mult(0.67);
    var newEnd = p5.Vector.add(this.end, dir);
    var b = new Branch(this.end, newEnd);
    var p = new Particle(newEnd);
    var newBranch;
    var newParticle;
    physics.addParticle(p);
    var len = p5.Vector.dist(this.end, newEnd);
    return {newBranch: b, newParticle: p, newLength: len};
  }

  this.branchB = function() {
    var dir = p5.Vector.sub(this.end, this.begin);
    dir.rotate(-PI / 4);
    dir.mult(0.67);
    var newEnd = p5.Vector.add(this.end, dir);
    var b = new Branch(this.end, newEnd);
    var p = new Particle(newEnd);
    var newBranch;
    var newParticle;
    physics.addParticle(p);
    var len = p5.Vector.dist(this.end, newEnd);
    var newLength;
    return {newBranch: b, newParticle: p, newLength: len};
  }
}
