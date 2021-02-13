// variable to hold a reference to our A-Frame world
var world;
var screen;
var container;
var lab;

var mtn, bld
var btaTopRight, btaTopLeft
var btaTelescope1
var btaTelescope2
var btaTelescope3
var btaTelescope4

var bukovo
var tree1, tree2
var bukovo1, bukovo2, bukovo3, bukovo4
var planetarium

var x = 250
var y = 250

let posOrNeg = [-1, 1]

let lengthSphere = 90

var direction = 'none'

let telescopeSound
var arkhyz

var control
var controlX = 250;
var controlY = 150

var threshold = 20
var capture, mergedFrame, compareFrame
var leftChange = 0
var rightChange = 0

var labMode = false
var btaMode = false
var bukovoMode = false
var allowMoveLab = false
var allowMoveBukovo = false

let xCoordLab = 100
let xCoordBta = 150
let xCoordBukovo = 100
let spinSpeed = .5

let labImg1, labImg2, labImg3
let labText1 = "A backbone to every process happening \nin the observatory, the Lab Building is \nwhere astrophysicists spend their long \nnights conducting observations. MAVR - a \ngroup of high-resolution methods in \nastronomy (lit. 'Methody Astronomii Vysokogo \nRazreshenia') - gathers in one of the offices \non the 5th floor at around 8:30 pm, right \nbefore it starts getting dark on a June night."
let labText2 = "The left wall of the room is all but covered \nin screens: 3 monitors, 2 laptops, 2 TV screens, \nall performing their role in data collection and processing. \nThe right side is equipped for an exhausting work night: \na large couch, a kettle, a coffee pot, a fridge, and a table covered \nwith everything from sausage to Oreo cookies. \nSee how no special equipment has been mentioned yet?"
let labText3 = "There is no telescope or, to be more accurate \nto the group's method, a long base optical \ninterferometer in sight. None of the objects you \nmight think of when you hear 'astrophysicist' are \nwithin a 15-minute car ride. You would have to drive up the \nmountain to the Big Altazimuth Telescope (BTA) to find all of \nthe special equipment pre-installed by the group in the afternoon."
let labText4 = "Here, there are only computers: with a remote control \nof the giant telescope at the top of the mountain, \nwith a live view of the said telescope, and with the Strasbourg University's \nVizieR Catalogue Service which they refer to for the current \ndata of the objects they are observing. There is another screen, \nin the middle of all the action. Unlike the control interface furnished \nwith yellows, reds and cyans, this one is almost \nentirely covered with black and white dots. \nThis greyscale pattern, however, is by far the most important sight in the room. \nIf you, of course, know how to read what you see there."
let labText5 = "\nEach of the 'dots' is, in fact, what is known as a speckle, \nand the pattern they form is an image of interference maxima \nof the light waves that the telescope assembled through the \nturbulence of the atmosphere ...to be continued, stay tuned!"

let btaText1 = "Out of the observatory's impressive \nensemble of four - one radio telescope, \ntwo smaller optical telescopes, \nand one 6-metre telescope - \nthe last one is the most \nwell-known in the outside world, \nremaining the largest telescope \nin Europe and Asia."
let btaText2 = "The way to the telescope lays through \na beech forest and some stunning mountain \nviews. This is the route astronomers take \nevery time they begin their observations. Since \nthere is a significant variety of \nastrophysical methods practiced \nwithin the observatory, \neach group has to bring and install \nequipment specific to their method."
let btaText3 = "After getting to the tower, \neach of the group members has to sign in \nbefore going through the maze of stairs, \nelevators and corridors to get \ninto the chilly dome room. There, one \nis met by an imposing multi-ton structure of \nthe telescope, with a 6-meter (20-feet) \nmirror at its core. ...to be continued"
let btaImg1, btaImg2, btaImg3

let starsEnable = false
let stars = []


let bukovoText1 = "Built as a residence for the astronomers, incoming \nstudents and academics, as well as \ncasual guests of the observatory, \nthe Bukovo (lit. 'the place of beech') township \nhas become its own independent town over the years."
let bukovoText2 = "With many residents moving in simply to be close \nto a good school or solid living conditions, this place \non one hand has people from a diverse set of backgrounds: \nmuseum workers, long-distance drivers, teachers, journalists, \nmany of whom are not affiliated with astrophysics at all."
let bukovoText3 = "On the other hand, it still remains a place \nlike no other, hidden away from the public eyes in \nthe mountains, its architecture and ways of life \nlargely unchanged from when it was a center \nof scientific life in the Southern Russia in the 80s."
let bukovoText4 = "After all, where else would you find a running \nplanetarium in the same building as many of the \nobservatory workers live? Constructed by the passionate \nresidents themselves, with the money fundraised \non their own efforts, the planetarium now invites \ntourists and locals as a break from skiing \nat a nearby resort or their lives \ndown the mountain. ... to be continued"
let bukovoImg1, bukovoImg2, bukovoImg3

let portal1, portal2, portal3, portalLab1, portalLab2, portalBta1, portalBta2, portalBukovo1, portalBukovo2

function preload(){
	arkhyz = loadImage('images/observatory.jpg')
	control = loadImage('images/control.png')
	labImg1 = loadImage('images/labMode1.png')
	labImg2 = loadImage('images/labMode2.jpg')
	labImg3 = loadImage('images/labMode3.png')
	btaImg1 = loadImage('images/btaMode1.png')
	btaImg2 = loadImage('images/btaMode2.png')
	btaImg3 = loadImage('images/btaMode3.png')
	bukovoImg1 = loadImage('images/bukovoMode1.png')
	bukovoImg2 = loadImage('images/bukovoMode2.png')
	bukovoImg3 = loadImage('images/bukovoMode3.png')
	telescopeSound = loadSound('sounds/telescope.mp3')
}

function setup() {

	textFont('Poppins')

	createCanvas(displayWidth, displayHeight);
	// start up our web cam
  capture = createCapture({
    video: {
			mandatory: {
        minWidth: 320,
        minHeight: 240,
				maxWidth: 320,
        maxHeight: 240
      },
    }
  });
  capture.hide();

	// empty image that will hold a previous frame of video
	compareFrame = new p5.Image(320, 240);
	// empty image that will hold our final image that we want to display to the user
	mergedFrame = new p5.Image(320, 240);

	portal1 = new EntryPoint(100, 125, 100, 50, "Move the control \ninside the box to \nenter the building");
	portalLab1 = new EntryPoint(xCoordLab - 90, 125, 190, 50, "Move the control \ninside the box to \nleave the lab building");
	portalLab2 = new EntryPoint(xCoordLab + 3000, 125, 190, 50, "Move the control \ninside the box to \nleave the lab building");

	portal2 = new EntryPoint(300, 125, 100, 50, "Move the control \ninside the box to \nenter the tower")
	portalBta1 = new EntryPoint(xCoordBta - 200, 125, 190, 50, "Move the control \ninside the box to \nleave the BTA");
	portalBta2 = new EntryPoint(xCoordBta + 3000, 125, 190, 50, "Move the control \ninside the box to \nleave the BTA");

	portal3 = new EntryPoint(600, 125, 100, 50, "Move the control \ninside the box to \nenter the township")
	portalBukovo1 = new EntryPoint(xCoordBukovo - 90, 125, 190, 50, "Move the control \ninside the box to \nleave Bukovo");
	portalBukovo2 = new EntryPoint(xCoordBukovo + 3000, 125, 190, 50, "Move the control \ninside the box to \nleave Bukovo");

	world = new World('ARScene');
	container = new Container3D({
		x: 0,
		y: -1.5,
		z: -10
	})

	mtn = new OBJ({
		asset: 'mtn_obj',
		mtl: 'mtn_mtl',
		x: 0,
		y: 0,
		z: 0,
		rotationX:0,
		rotationY:0,
		scaleX:.006,
		scaleY:.006,
		scaleZ:.006,
	})

	container.addChild(mtn);

	lab = new Box({
		x: -2,
		y: .4,
		z: 3.2,
		height: .8,
		width: 1.2,
		depth: .6,
		asset: 'lab_texture',
		repeatX: 2,
		repeatZ: 1,
		rotationY:45,
	})

	container.addChild(lab)

	bukovo = new OBJ({
		x: 2.5, y: .2, z: 3.5
	})

	bukovo1 = new Bldg(0, 0, 0, .5)
	bukovo2 = new Bldg(.3, .3, -1.5, .6)
	bukovo3 = new Bldg(.6, .15, -1, .5)

	planetarium = new OBJ({
		x: -.5, y: .4, z: -1
	})

	planetCyl = new Cylinder({x:0, y:0, z:0,
			red: 200, green: 200, blue: 200,
			radius:.3, height: .2
	});

	planetTop = new Sphere({
		x:0, y:.1, z:0,
		red: 200, green: 200, blue: 200,
		radius:.2
	})

	tree1 = new OBJ({
		asset: 'tree_obj',
		mtl: 'tree_mtl',
		x: -.4,
		y: 0,
		z: 0,
		rotationX:0,
		rotationY:0,
		scaleX:.03,
		scaleY:.03,
		scaleZ:.03
	})

	bukovo.addChild(tree1)

	tree2 = new OBJ({
		asset: 'tree_obj',
		mtl: 'tree_mtl',
		x: -.3,
		y: .2,
		z: .3,
		rotationX:0,
		rotationY:0,
		scaleX:.03,
		scaleY:.03,
		scaleZ:.03
	})

	bukovo.addChild(tree2)

	planetarium.addChild(planetCyl)
	planetarium.addChild(planetTop)

	bukovo.addChild(planetarium)
	container.addChild(bukovo)


	tower = new OBJ({
		x:-.25, y:1.75, z:.5,
		// scaleX:2,
		// scaleY:2,
		// scaleZ:2
	})

	btaCyl = new Cylinder({x:0, y:0, z:0,
			red:155, green:155, blue:155,
			radius:.475, height: .3,
	});

	tower.addChild(btaCyl)

	btaTopLeft = new Sphere({x:0, y:.2, z:0,
		red:145, green:145, blue:145,
		radius:.432,
		thetaLength:90,
		phiLength: 360,
		rotationY: 10,
		rotationZ: 90,
		side: 'double'
	});
	tower.addChild(btaTopLeft)

	btaTopRight = new Sphere({x:0, y:.2, z:0,
		red:145, green:145, blue:145,
		radius:.432,
		thetaLength:90,
		phiLength: 360,
		rotationY: 190,
		rotationZ: 90,
		side: 'double'
	});
	tower.addChild(btaTopRight)

	btaTelescope1 = new Cylinder(
		{x:0, y:.2, z:0,
		radius: .01,
		blue: 255,
		green: 255, red: 255,
		height: .7,
		rotationX: 50,
		rotationY: 2
	})
	tower.addChild(btaTelescope1)

	btaTelescope2 = new Cylinder(
		{x:0, y:.2, z:0,
		radius: .01,
		blue: 255,
		green: 255, red: 255,
		height: .7,
		rotationX: 50,
		rotationY: 20
	})
	tower.addChild(btaTelescope2)

	btaTelescope3 = new Ring({
		x:.05, y:.4, z: .3,
		radiusInner: .03,
		radiusOuter: .06,
		blue: 255,
		green: 0, red: 0,
		side: 'double',
		rotationX: -30,
		rotationY: 10
	})
	tower.addChild(btaTelescope3)

	btaTelescope4 = new Cone({
		x:.05, y: .4, z: .3,
		radiusBottom: .028,
		radiusTop: .01,
		height: .03,
		blue: 128,
		green: 0, red: 0,
		side: 'double',
		rotationX: 50,
		rotationY: 10,
	})
	tower.addChild(btaTelescope4)

	container.addChild(tower)

	for(let i = 0; i < 700; i++){
			temp = new Star()
			stars.push(temp)
	}

	world.scene.appendChild(container.tag)
}

//____________________________________________________________________________________________________________________________________________________________________

function draw(){
	world.clearDrawingCanvas()

	if(!labMode && !btaMode && !bukovoMode){
		if(controlX < 250){
			fill('rgba(0,255,0, 0.25)')
			noStroke()
			rect(0, 0, 250, height)
			fill(0)
			textSize(17)
			text("Lab Building", 100, 220)
			portal1.display()
			portal1.checkhit()
				if(portal1.time <= 0){
					labMode = true
					controlX = 250
					// controlY = 50
				}

		} else if(controlX >= 250 && controlX < 500){
			fill('rgba(0,255,0, 0.25)')
			noStroke()
			rect(250, 0, 250, height)
			fill(0)
			textSize(17)
			text("BTA (Large \nAltazimuth \nTelescope)", 400, 200)
			portal2.display()
			portal2.checkhit()
				if(portal2.time <= 0){
					btaMode = true
					controlX = 250
					// controlY = 100
					telescopeSound.play()
				}
		} else if(controlX >= 500 && controlX < width){
			fill('rgba(0,255,0, 0.25)')
			noStroke()
			rect(500, 0, width-500, height)
			fill(0)
			textSize(17)
			text("Bukovo \ntownship", 600, 220)
			portal3.display()
			portal3.checkhit()
			if(portal3.time <= 0){
				bukovoMode = true
				controlX = 250
				// controlY = 100
			}
		}
	} else if(labMode || btaMode || bukovoMode) {
		fill('rgba(0,0,0, 0.8)')
		noStroke()
		rect(0, 0, width, height)
	}

	// ADDING THE CONTROL
	imageMode(CENTER)
	image(control, controlX, controlY, 100, 55)


	// MOTION DETECTION
	//____________________________________________________________________________________________________________________________________________________________________
	capture.loadPixels();
  compareFrame.loadPixels();
  mergedFrame.loadPixels();

	if (capture.pixels.length > 0 && compareFrame.pixels.length > 0) {

	// assume that we have no motion pixels
	leftChange = 0;
	rightChange = 0;

	// examine all pixels
	for (var x = 0; x < 320; x++) {
		for (var y = 0; y < 240; y++) {
			// compute 1D location here
			var location = int((x + y * 320) * 4);

			// see if this is a changed pixel
			if (x < 50 && dist(capture.pixels[location], capture.pixels[location + 1], capture.pixels[location + 2], compareFrame.pixels[location], compareFrame.pixels[location + 1], compareFrame.pixels[location + 2]) > threshold) {
				leftChange += 1;
				mergedFrame.pixels[location] = 0;
				mergedFrame.pixels[location + 1] = 255;
				mergedFrame.pixels[location + 2] = 0;
				mergedFrame.pixels[location + 3] = 255;
			} else if (x > 240 && dist(capture.pixels[location], capture.pixels[location + 1], capture.pixels[location + 2], compareFrame.pixels[location], compareFrame.pixels[location + 1], compareFrame.pixels[location + 2]) > threshold) {
				rightChange += 1;
				mergedFrame.pixels[location] = 0;
				mergedFrame.pixels[location + 1] = 255;
				mergedFrame.pixels[location + 2] = 0;
				mergedFrame.pixels[location + 3] = 255;
			}
		}
	}

	// update pixels and draw our merged frame
	mergedFrame.updatePixels();


	// MOVING THINGS, SCROLLING THINGS
	if (leftChange > 1000) {
		if(labMode && allowMoveLab){
			xCoordLab -= 20;
			lab.nudge(-.1, 0, 0)
			controlX += (width * 20) / 6000
			portalLab1.moveLeftWithScroll()
			portalLab2.moveLeftWithScroll()

		} else if(btaMode){
			controlX += (width * 20) / 6000
			container.spinY(spinSpeed)
			spinSpeed *= 1.01
			xCoordBta -= 20
			portalBta1.moveLeftWithScroll()
			portalBta2.moveLeftWithScroll()

		} else if(bukovoMode && allowMoveBukovo){
			xCoordBukovo -= 20;
			bukovo.nudge(-.1, 0, 0)
			controlX += (width * 20) / 6000
			portalBukovo1.moveLeftWithScroll()
			portalBukovo2.moveLeftWithScroll()

		} else if(!labMode && !btaMode && !bukovoMode) {
			controlX += 5;

		}
	} else if (rightChange > 1000) {
		if(labMode && allowMoveLab){
			xCoordLab += 20;
			lab.nudge(.1, 0, 0)
			controlX -= (width * 20) / 6000
			portalLab1.moveRightWithScroll()
			portalLab2.moveRightWithScroll()

		} else if(btaMode){
			controlX -= (width * 20) / 6000
			container.spinY(-spinSpeed)
			spinSpeed *= .99
			xCoordBta += 20
			portalBta1.moveRightWithScroll()
			portalBta2.moveRightWithScroll()

		} else if(bukovoMode && allowMoveBukovo){
			xCoordBukovo += 20;
			bukovo.nudge(.1, 0, 0)
			controlX -= (width * 20) / 6000
			portalBukovo1.moveRightWithScroll()
			portalBukovo2.moveRightWithScroll()

		} else if(!labMode && !btaMode && !bukovoMode) {
			controlX -= 5;
		}
	} else {

	}

	// wrap-around logic
	if(controlX - control.width/2 >= width){
		controlX = control.width/2;
	} else if (controlX + control.width/2 <= 0){
		controlX = width - control.width/2;
	}


	// important - this frame of video becomes our comparision frame for the next iteration of 'draw'
	compareFrame.copy(capture, 0, 0, 320, 240, 0, 0, 320, 240);
}


	// container.spinY(.5)

	//____________________________________________________________________________________________________________________________________________________________________
	// MODE BOOLEANS
	if(labMode){
		mtn.hide()
		tower.hide()
		bukovo.hide()

		if(lab.getX() <= 1.4 && !allowMoveLab){
			lab.nudge(.05, .01, .03)
		} else if(lab.getX() > 1.4){
			allowMoveLab = true
		}

		textFont('Poppins')
		textSize(14)
		textLeading(20);
		fill(255)
		text(labText1, xCoordLab, 200)
		imageMode(CORNER)
		image(labImg1, xCoordLab + 500, 150, labImg1.width/3, labImg1.height/3)
		text(labText2, xCoordLab + 900, 150)
		text(labText3, xCoordLab + 900, 300)
		image(labImg2, xCoordLab + 1400, 150, labImg2.width/3, labImg2.height/3)
		text(labText4, xCoordLab + 1800, 150)
		text(labText5, xCoordLab + 1800, 340)
		image(labImg3, xCoordLab + 2500, 115, labImg3.width/3, labImg3.height/3)

		portalLab1.display()
		portalLab1.checkhit()

		portalLab2.display()
		portalLab2.checkhit()

		if(portalLab1.time <= 0 || portalLab2.time <= 0){
			reverseWorld()
		}

	}


	if(btaMode){
		if(container.getZ() < -4.5){
			container.nudge(0, -.006, .1)
		}
		btaTopRight.setThetaLength(lengthSphere)
		btaTopLeft.setThetaLength(lengthSphere)
		if(btaTopRight.getThetaLength() > 80){
			lengthSphere -= .1
			starsEnable = true
		}
		for(let i = 0; i < stars.length; i++){
			stars[i].showStars()
		}

		textFont('Poppins')
		textSize(14)
		textLeading(20);
		fill(255)
		imageMode(CORNER)
		text(btaText1, xCoordBta, 150)
		image(btaImg1, xCoordBta + 500, 100, btaImg1.width/3, btaImg1.height/3)
		text(btaText2, xCoordBta + 900, 150)
		image(btaImg2, xCoordBta + 1400, 100, btaImg2.width/3, btaImg2.height/3)
		text(btaText3, xCoordBta + 1800, 150)
		image(btaImg3, xCoordBta + 2300, 90, btaImg3.width/3, btaImg3.height/3)

		portalBta1.display()
		portalBta1.checkhit()

		portalBta2.display()
		portalBta2.checkhit()

		if(portalBta1.time <= 0 || portalBta2.time <= 0){
			reverseWorld()
		}
	}


	if(bukovoMode){
		mtn.hide()
		tower.hide()
		lab.hide()

		if(bukovo.getX() >= -1.4 && !allowMoveBukovo){
			bukovo.nudge(-.05, .01, .03)
		} else if(bukovo.getX() < 1.4){
			allowMoveBukovo = true
		}

		textFont('Poppins')
		textSize(14)
		textLeading(20);
		fill(255)
		imageMode(CORNER)
		text(bukovoText1, xCoordBukovo + 100, 150)
		image(bukovoImg1, xCoordBukovo + 500, 100, bukovoImg1.width/3, bukovoImg1.height/3)
		text(bukovoText2, xCoordBukovo + 900, 150)
		text(bukovoText3, xCoordBukovo + 900, 300)
		image(bukovoImg2, xCoordBukovo + 1400, 100, bukovoImg2.width/3, bukovoImg2.height/3)
		text(bukovoText4, xCoordBukovo + 1800, 150)
		image(bukovoImg3, xCoordBukovo + 2300, 90, bukovoImg3.width/3, bukovoImg3.height/3)

		portalBukovo1.display()
		portalBukovo1.checkhit()

		portalBukovo2.display()
		portalBukovo2.checkhit()

		if(portalBukovo1.time <= 0 || portalBukovo2.time <= 0){
			reverseWorld()
		}
	}

	imageMode(CENTER)

}

//____________________________________________________________________________________________________________________________________________________________________
// REVERSE FUNCTION
function reverseWorld(){
	labMode = false
	btaMode = false
	bukovoMode = false
	lab.setX(-2);
	lab.setY(.4)
	lab.setZ(3.2)
	mtn.show()
	tower.show()
	lab.show()
	bukovo.show()
	controlX = 250;
	controlY = 150
	container.setX(0)
	container.setY(-1.5)
	container.setZ(-10)
	container.rotateX(0)
	container.rotateY(0)
	container.rotateZ(0)
	starsEnable = false
	for(let i = 0; i < stars.length; i++){
		stars[i].showStars()
	}
	bukovo.setX(2.5)
	bukovo.setY(.2)
	bukovo.setZ(3.5)
	telescopeSound.stop()
}


//____________________________________________________________________________________________________________________________________________________________________
// OBJECTS
class Bldg{
	constructor(x, y, z, scale){

		this.building = new Box({
			x: x,
			y: y,
			z: z,
			scaleX: scale,
			scaleY: scale,
			scaleZ: scale,
			height: .8,
			width: .4,
			depth: .3,
			red: 125, green: 125, blue: 125,
		})
		bukovo.addChild(this.building)
	}

}

class EntryPoint {
  // store our working values
	constructor(x, y, w, h, myString){
	  this.x = x;
	  this.y = y;
	  this.w = w;
	  this.h = h;
		this.myString = myString;

		this.strokeGreen = 0

	  // keep track of how many times this object has been hit
	  this.time = 6;
	}

  display() {
    noFill();
    stroke(0, this.strokeGreen, 0);
    rect(this.x, this.y, this.w, this.h);
		textSize(8)
		fill(0, 0, 0)
		noStroke()
    text(this.myString, this.x, this.y - 30);
  }

  checkhit() {
		if(controlX >= this.x && controlX <= this.x + this.w && this.time >= 0){
			this.time -= .1
			this.strokeGreen = 120
			stroke(255, 0, 0);
			text("Transporting in:\n" + int(this.time), this.x, this.y + this.h + 10)
		} else {
			this.time = 5
			this.strokeGreen = 0
		}
  }

	moveLeftWithScroll(){
		this.x -= 20
	}

	moveRightWithScroll(){
		this.x += 20
	}
}

class Star{
	constructor(){

		this.star = new Sphere({
			x: random(-600, 600),
			y: random(50, 200),
			z: random(-600, 600),
			radius: 1,
			red: 255, green: 255, blue: 255,
		})

		this.star.hide()
		container.addChild(this.star)
	}

	showStars(){
		if(starsEnable){
			this.star.show()
		} else {
			this.star.hide()
		}

	}
}
