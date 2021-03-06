/***********************************************************************
     
 Copyright (c) 2008, 2009, Ayush Mishra, www.Ayushmishra.design
 *** Ayush Mishra Designs ***
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 *     * Redistributions of source code must retain the above copyright
 *       notice, this list of conditions and the following disclaimer.
 *     * Redistributions in binary form must reproduce the above copyright
 *       notice, this list of conditions and the following disclaimer in the
 *       documentation and/or other materials provided with the distribution.
 *     * Neither the name of MSA Visuals nor the names of its contributors
 *       may be used to endorse or promote products derived from this software
 *       without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO,
 * THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
 * ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE
 * FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS
 * OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY
 * OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE
 * OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED
 * OF THE POSSIBILITY OF SUCH DAMAGE.
 *
 * ***********************************************************************/

let kMax;
let step;
let n = 80; // number of blobs
let radius = 20; // diameter of the circle
let inter = 1; // difference between the sizes of two blobs
let maxNoise = 250;

let noiseProg = (x) => (x);

function setup() {
  createCanvas(1200, 520);
  //colorMode(HSB, 1);
	angleMode(DEGREES);
  noFill();
	//noLoop();
	kMax = random(0.6, 1.0);
	step = 0.01;
	noStroke();
}

function draw() {
	blendMode(BLEND);
  background(0);
	blendMode(ADD);
  let t = frameCount/150;
  for (let i = n; i > 0; i--) {
		let alpha = pow(1 - noiseProg(i / n), 3);
		let size = radius + i * inter;
		let k = kMax * sqrt(i/n);
		let noisiness = maxNoise * noiseProg(i / n);
		
		fill(255, 0, 0, alpha*255);
    blob(size, width/2, height/2, k, t - i * step, noisiness);
		
		fill(0, 255, 0, alpha*255);
    blob(size, width/2, height/2, k, t - i * step + 0.2, noisiness);
		
		fill(0, 0, 255, alpha*255);
    blob(size, width/2, height/2, k, t - i * step + 0.4, noisiness);
  }
}

function blob(size, xCenter, yCenter, k, t, noisiness) {
  beginShape();
	let angleStep = 360 / 8;
  for (let theta = 0; theta <= 360 + 2 * angleStep; theta += angleStep) {
    let r1, r2;
		/*
    if (theta < PI / 2) {
      r1 = cos(theta);
      r2 = 1;
    } else if (theta < PI) {
      r1 = 0;
      r2 = sin(theta);
    } else if (theta < 3 * PI / 2) {
      r1 = sin(theta);
      r2 = 0;
    } else {
      r1 = 1;
      r2 = cos(theta);
    }
		*/
		r1 = cos(theta)+1;
		r2 = sin(theta)+1;
    let r = size + noise(k * r1,  k * r2, t) * noisiness;
    let x = xCenter + r * cos(theta);
    let y = yCenter + r * sin(theta);
    curveVertex(x, y);
  }
  endShape();
}