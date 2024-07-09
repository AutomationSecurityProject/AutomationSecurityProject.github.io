let imageUrls = [
    "https://cdn.pixabay.com/photo/2017/09/14/11/25/water-2748695_640.png",
    "https://cdn.pixabay.com/photo/2016/02/24/17/30/fruit-1220361_640.png",
    "https://cdn.pixabay.com/photo/2017/06/04/23/57/stem-2372543_640.png",
    "https://cdn.pixabay.com/photo/2016/11/25/07/00/diamond-1857736_640.png",
    "https://cdn.pixabay.com/photo/2021/08/18/05/24/eye-6554659_640.png",
    "https://cdn.pixabay.com/photo/2017/09/14/11/17/water-2748670_640.png",
    "https://cdn.pixabay.com/photo/2017/05/26/16/08/glass-2346358_640.png",
    "https://cdn.pixabay.com/photo/2017/09/03/00/44/png-2709031_640.png",
    "https://cdn.pixabay.com/photo/2017/06/05/00/01/poppy-2372550_640.png"
];

let pictureList;

function preload() {
    pictureList = [];
    let imgCount = imageUrls.length;

    for (let i = 0; i < imgCount; i++) {
        pictureList[i] = loadImage(imageUrls[i]);
    }
}

function setup() {
    createCanvas(600, 600);
    noLoop();
}

function draw() {
    background(219, 190, 187);

    let n = 2000;

    for (let i = 0; i < n; i++) {
        let r = int(random(200, 250));
        let g = int(random(160, 195));
        let b = int(random(170, 190));

        fill(r, g, b);
        noStroke();

        let x = int(random(0, 400));
        let y = int(random(0, 400));
        let w = random(1, 5);
        let h = random(1, 5);

        rect(x, y, w, h);
    }

    n = 500;

    for (let i = 0; i < n; i++) {
        let r = int(random(pictureList.length));
        let randomImage = pictureList[r];

        let x = int(random(-100, 300));
        let y = int(random(-100, 300));

        image(randomImage, x, y, randomImage.width, randomImage.height);
        rotate(HALF_PI / 3.0);
    }
}
