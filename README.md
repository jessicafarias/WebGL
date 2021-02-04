# WebGL
Making a fantastic and interactive Front-End Website usign WebGL and GLSL

# WebGL
Making a fantastic and interactive Front-End Website usign WebGL and GLSL

## Run in local server:

```sh
npm install
```

## Getting started: go to the terminal and write
```sh
canvas-sketch src/sketch.js
```

Now you can se de website in port 9966
http://localhost:9966/



## Bundling to a Website

If you'd like to publish your artwork or interactive piece onto the web, here's how you can do it.

First, you have to bundle your sketch as a static website.

You can do this with the `--build` flag:

```sh
canvas-sketch mysketch.js --build --name=index
```

This will generate a JS and HTML file in `./public/`, and the `--name` flag will rename the output files to `index.html` and `index.js`.

### Hosting

You can use one of the following for free static hosting:

- [surge.sh](https://surge.sh/)
- [Netlify](https://www.netlify.com)
- [GitHub Pages](https://pages.github.com)
- [Neocities](https://neocities.org)

I suggest `surge`, which looks like this in your sketch repo:

```sh
# first install the tool locally
npm install surge --save-dev

# now you cn run it to upload the files
npx surge -p public -d mysketch.surge.sh
```

Where `-d` specifies the domain, so you can use `some-custom-url.surge.sh` and change it to your liking.

## 

#### <sup>[← Back to README](../README.md)