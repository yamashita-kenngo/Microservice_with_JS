const express = require('express');
const sharp = require('sharp');
const app = express();

app.get(/\/thumbnail\.(jpg|png)/, (req, res, next) => {
    let format = (req.params[0] == 'png' ? 'png' : 'jpeg');
    let width = 300;
    let height = 200;
    let border = 5;
    let bgcolor = '#fcfcfc';
    let fgcolor = '#ddd';
    let textcolor = "#aaa";
    let textsize = 24;
    let image = sharp({
        create: {
            width: width,
            height: height,
            channels: 4,
            background: { r: 0, g: 0, b: 0 },
        }
    });
    /// svg処理未完了
    const thumbnail = new Buffer(
        `<svg width="${width}" height="${height}">
         <rect
            x="0" y="0"
            width="${width}" height="${height}"
            fill="${fgcolor}" />
        </svg>`
    );

    image.overlayWith(thumbnail)[format]().pipe(res);
});

app.listen(3000, () => {
    console.log('ready');
})