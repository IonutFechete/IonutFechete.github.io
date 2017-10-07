function Tree() {
    this.gap = random(4 * jellyfish.r + 4, 8 * jellyfish.r);
    this.top = random(0, height - 8 * jellyfish.r);
    this.bottom = height - (this.top + this.gap);
    this.x = width;
    this.w = 26;
    this.highlight = false;

    this.hits = function (jellyfish) {
        score = document.getElementById('score');
        number = score.innerHTML;

        if (jellyfish.y - jellyfish.r < this.top || jellyfish.y + jellyfish.r > height - this.bottom) {
            if (jellyfish.x + jellyfish.r > this.x && jellyfish.x - jellyfish.r < this.x + this.w) {
                score.innerHTML = parseInt(number) - 100;
                this.highlight = true;
                return true;
            }
        }

        return false;
    };

    this.show = function () {
        fill(255);


        if (!this.highlight) {
            image(downtree, this.x - this.w, 0, 3 * this.w, this.top);
            image(uptree, this.x - this.w, height - this.bottom, 3 * this.w, this.bottom);
        }
    };

    this.update = function () {
        this.x -= speed;
        this.highlight = false;
    };

    this.offscreen = function () {
        return this.x < -this.w;
    }
}
