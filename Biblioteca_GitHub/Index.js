// JavaScript code using Node.js to get some info about the image.
// We load the library that was installed using 'npm install image-js'
const { Image } = require('image-js');

const index = 255

getPixel(index);

// Loading an image is asynchronous and will return a Promise. 
Image.load('panda.jpg').then(function (image) {
    console.log('Width', image.width);
    console.log('Height', image.height);
    console.log('colorModel', image.colorModel);
    console.log('components', image.components);
    console.log('alpha', image.alpha);
    console.log('channels', image.channels);
    console.log('bitDepth', image.bitDepth);
  });