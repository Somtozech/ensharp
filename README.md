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
```
ensharp [options] [command]

Options:
  -V, --version             output the version number
  -h, --help                display help for command

Commands:
  convert <input> <output>  Convert an image from one format to another.
  resize [options] <input>  Resize image to a particular width or height or width x height
  help [command]            display help for command
```

## Convert
```
ensharp help convert 

Usage: ensharp convert [options] <input> <output>

Convert an image from one format to another.

Options:
  -h, --help  display help for command
```
## Resize
```
ensharp help resize

Usage: ensharp resize [options] <input>

Resize image to a particular width or height or width x height

Options:
  -w, --width <number>       width of the resulting image in pixel
  -h, --height <number>      height of the resulting image in pixel
  --sizes <widthxheight>     Specify multiple sizes for resizing eg `720x360,480x360,1080x720`
  --fit <type>               how resulting image should fit provided dimension. one of `cover, fill, contain, inside, outside`
  -pos,--position <type>     Position of image when fit is `cover` or `contain` (default is center). one of `top,right top,
                             right,right bottom,bottom,left bottom,left,left top, center`
  -bg, --background <color>  Background color when fit is `cover` or `contain`. Accepts hex color codes, RGB and HSL values
  --help                     display help for command
```

# Examples

## Convert
To convert a single image to a different format.
```
$ ensharp convert src/image.jpg output.png  
  This creates an image in png format in `src/converted/output.png`
```

```
$ ensharp convert image.jpg output.png  
  This creates an image in png format in `converted` folder in the current directory
```

You can also specify glob patterns for matching images
```
$ ensharp convert src/*.jpg *.png  
  This converts all the images with jpg format in `src/` to png formats found in `src/converted/`
```


Note: If any image has the same name with the output path, the image is overwritten.

## Resize
Resize an image to another with width 1080 and height 720
```
$ ensharp resize src/input.jpg output.png -w 1080 -h 720
```

Resize an image to multiple sizes
```
$ ensharp resize src/input.jpg output.png --sizes="1080x720,720x640,640x360,360x200"
```

You can also specify glob patterns for matching images
```
$ ensharp resize src/*.jpg *.png -w 1080 -h 720
  Resize all images with jpg format in `src/`

$ ensharp resize src/*.jpg *.png --sizes="1080x720,720x640,640x360,360x200"
  Resize all images with jpg format in `src/` to multiple sizes specified
```
Note: Resize creates a resized folder inside the specified directory or in the current directory (when a directory is not specified)


