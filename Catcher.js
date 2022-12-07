// Ve Canvas
        var canvas = document.createElement("canvas");
        var ctx = canvas.getContext("2d");
        canvas.width = 512;
        canvas.height = 480;
        document.appendChild(canvas);
       
        // Anh Nen
        var bgReady = false;
        var bgImage = new Image();
        bgImage.onload = function () {
            bgReady = true;
        };
        bgImage.src = "images/background.png";
        
        // Anh Hung
        var heroReady = false;
        var heroImage = new Image();
        heroImage.onload = function () {
            heroReady = true;
        };
        heroImage.src = "images/hero.png";
        
        // Quai Vat
        var monsterReady = false;
        var monsterImage = new Image();
        monsterImage.onload = function () {
            monsterReady = true;
        };
        monsterImage.src = "images/monster.png";
        
        // Nhan Vat
        var hero = {
            speed: 256, //toc do di chuyen
            x: 0,
            y: 0
        };
        var monster = {
            x: 0,
            y: 0
        };
        var monsterCaught = 0
        // Dieu Khien
        var keysDown = {};

        addEventListener("keydown", function (e) {
            keysDown[e.keyCode] = true;
        }, false);

        addEventListener("keyup", function(e){
            delete keysDown[e.keyCode];
        }, false)
        
        // Khoi dong lai khi bat quai vat
        var reset = function (){
            hero.x = canvas.width / 2;
            hero.y = canvas.height / 2;

            //Vi tri cua quai vat
            monster.x = 32 + (Math.random() * (canvas.width - 64));
            monster.y = 32 + (Math.random() * (canvas.height - 64));
        };
        
        // Cap nhap vi tri cua nhan vat
        var update = function (modifier) {
            if (38 in keysDown) { // Nguoi chuoi di len
                hero.y -= hero.speed * modifier;
            }
            if (40 in keysDown) { // Nguoi chuoi di xuong
                hero.y += hero.speed * modifier;
            }
            if (37 in keysDown) { // Nguoi chuoi di sang trai
                hero.x -= hero.speed * modifier;
            }
            if (37 in keysDown) { // Nguoi chuoi di sang phai
                hero.x += hero.speed * modifier;
            }
            // Anh hung co cham quai ko ?
            if (
                hero.x <= (monster.x + 32)
                && monster.x <= (hero.x +32)
                && hero.y <= (monster.y +32)
                && monster.y <= (hero.y +32)
            ) {
                ++monsterCaught;
                reset();
            }
        };
        
        // Ket Xuat
        var render = function () {
            if (bgReady) {
                ctx.drawImage(bgImage, 0, 0);
            }
            if (heroReady) {
                ctx.drawImage(heroImage, hero.x, hero.y);
            }
            if (monsterReady) {
                ctx.drawImage(monsterImage, monster.x. monster.y);
            }
            
            //Diem
            ctx.fillStyle = "rgb(250, 250, 250)";
            ctx.font = "24px Helvetica";
            ctx.textAlign = "left";
            ctx.textBaseline = "top";
            ctx.fillText("Monsters caught: " + monsterCaught, 32, 32);
        };
        
        // Vong lop cua tro choi
        var main = function () {
            var now = Date.now();
            var delta = now - then;

            update(delta / 1000);
            render();

            then = now;
            
            // Khoi dong lai
            requestAnimationFrame(main);
            
            // Dam bao phu hop voi browser
            var w = window;
            requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;
        };
        
        // Bat dau tro choi
        var then = Date.now();
        reset();
        main();
