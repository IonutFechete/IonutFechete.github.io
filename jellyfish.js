function Jellyfish() {
    this.y = height / 2;
    this.x = 200;
    this.r = 24 * height / 600;

    this.gravity = speed > 7 ? 1 : 0.8;
    this.lift = -18;
    this.velocity = 0;

    this.show = function () {
        fill(255);
        imageMode(CENTER);
        if (userimg) jelly = userimg;
        else
            switch (pic) {
                case 0:
                    jelly = s1;
                    break;
                case 1:
                    jelly = s2;
                    break;
                case 2:
                    jelly = s3;
                    break;
                case 3:
                    jelly = torus;
            }
        image(jelly, this.x, this.y, 2 * this.r, 2 * this.r);
    };

    this.up = function () {
        this.velocity += this.lift;
    };

    this.update = function () {
        this.velocity += this.gravity;
        this.velocity *= 0.9;
        this.y += this.velocity;
        this.y = constrain(this.y, this.r, height - this.r);
    }
}
