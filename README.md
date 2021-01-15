# ensharp
Ensharp is a command line tool that can be used to convert images in common formats to other formats of varying dimensions.

# Installation
You need node.js and npm. It's Recommended you install the package globally
```
$ npm install --global ensharp
```

### Manual Installation
```
git clone https://github.com/Somtozech/ensharp.git
cd ensharp
npm install # Local dependencies if you want to hack
npm install -g # Install globally
```

# Usage
To convert a single image to a different format.
```
$ ensharp convert <file-path>/image.jpg output.png  
```
This creates an image in png format in `<file-path>/converted/output.png`

You can also specify glob patterns for matching images
```
$ ensharp convert <file-path>/*.jpg *.png  
```
This converts all the images with jpg format in `<file-path>` to png formats found in `<file-path>/converted/`
