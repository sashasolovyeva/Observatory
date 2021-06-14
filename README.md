# Observatory
## Idea
Inspired by my visit to SAO RAN (Special Astrophysics Observatory of the Russian Academy of Science) this summer, and an opportunity to work on a material about the local scientists' lives and work, I wanted to create an experience that would let the user explore this unique place in an interactive, unconventional way, and learn more about what astrophysists do in their daily lives.

The user is able to navigate the experience by creating motion on either side of their camera. They can then teleport themselves to one of the three places in the observatory: the lab building, the telescope tower, or the Bukovo township.

Each of the locations tells a story about its importance for the life of the observatory. Additionally, in the telescope tower part of the experience, the user is able to rotate the tower around and take a peek at what the telescope looks like when it starts its work at the beginning of every night.

## Justification
Why motion detection? I was really impressed by an old remote controller that had been used to control telescope in a pre-digital era; with its long, full of switches and triggers body, the controller required a lot of motion and attention to operate. Using an image of the controller in the experience, and asking the user to make precise movements to explore the space around them seemed fitting to immerse them inside the life of the observatory.

I acknowledge that there might be better mediums out there for a more seamless UX, especially when it comes to reading long-form materials online, but I believe this is an interesting experiment in reimagining how we navigate the web, taking away regular scrolling (minimal amount of motion) and making the user physically and actively engage with the content.

## Technical implementation
Some of the techniques, frameworks and assets that are used in this project are:

- p5.js, AR.js, A-Frame
- Motion detecton algorithm
- Telescope sound recorded at the James Gregory Telescope in St. Andrews, Scotland from freesound.org
- Mountain and tree assets from Google Poly (rip Google Poly :( )
- The lab building texture (Adobe Photoshop) and the BTA tower (assembled by me out of 3D primitives)
- Object-Oriented Programming to construct entry points, stars, and some of the buildings

## Project iterations
This project was initiated as a virtual reality experience but eventually, the AR medium for experimentation purposes.

## Further development
I think there is quite a lot of possibilities of applying computer vision in scientific storytelling. For example, it would be great to use motion detection in 3D visualizations of actual space objects in order to let the user learn about astrophysists' methods and objects of research.
