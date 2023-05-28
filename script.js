let choose_img_Btn = document.querySelector(".choose_img button");
let choose_Input = document.querySelector(".choose_img input");
let imgSrc = document.querySelector(".view_img img");
let slider = document.querySelector(".slider input");
let slider_value = document.querySelector(".filter_info .value");
let filter_name = document.querySelector(".filter_info .name");
let filter_value = document.querySelector(".filter_info .value");
let rotate_btns = document.querySelectorAll(".icons_rooms1 button");
let reset = document.querySelector(".reset");
let save = document.querySelector(".save");


let filter_buttons = document.querySelectorAll(" .icons_rooms button");
let brightness = 100;
contrast = 100;
saturate = 100;
invert = 0;
blur = 0;
rotate = 0;
flip_x = 1;
flip_y = 1

// image upload krne ka code!
choose_img_Btn.addEventListener("click", () => choose_Input.click());
choose_Input.addEventListener("change", () => {
    let file = choose_Input.files[0];
    if (!file) return;
    imgSrc.src = URL.createObjectURL(file);
    imgSrc.addEventListener("load", () => {
        document.querySelector(".container").classList.remove("disabled");
    });
});

// filter background color ka code!
filter_buttons.forEach((elem) => {
    elem.addEventListener("click", () => {
        document.querySelector(".active").classList.remove("active");
        elem.classList.add("active");
        filter_name.innerText = elem.id;
        if (elem.id === "brightness") {
            slider.max = "200";
            slider.value = brightness;
            slider_value.innerText = `${brightness}`;
        }
        else if (elem.id === "contrast") {
            slider.max = "200";
            slider.value = contrast;
            slider_value.innerText = `${contrast}`;
        }
        else if (elem.id === "saturate") {
            slider.max = "200";
            slider.value = saturate;
            slider_value.innerText = `${saturate}`;
        }
        else if (elem.id === "invert") {
            slider.max = "100";
            slider.value = invert;
            slider_value.innerText = `${invert}`;
        }
        else if (elem.id === "blur") {
            slider.max = "100";
            slider.value = blur;
            slider_value.innerText = `${blur}`;
        }



    });
});

// brightness up/down code!
slider.addEventListener("input", () => {
    slider_value.innerText = `${slider.value}%`;
    let sliderState = document.querySelector(".icons_rooms .active");
    if (sliderState.id === "brightness") {
        brightness = slider.value;
    }
    else if (sliderState.id === "contrast") {
        contrast = slider.value;
    }
    else if (sliderState.id === "saturate") {
        saturate = slider.value;
    }
    else if (sliderState.id === "invert") {
        invert = slider.value;
    }
    else if (sliderState.id === "blur") {
        blur = slider.value;
    }
    imgSrc.style.filter = `brightness(${brightness}%) contrast(${contrast}%) saturate(${saturate}%) invert(${invert}%) blur(${blur}px)`;
})


// rotate ka code
rotate_btns.forEach((element) => {
    element.addEventListener("click", () => {
        if (element.id === "rotateleft") {
            rotate -= 90;
        }
        else if (element.id === "rotateright") {
            rotate += 90;
        }
        else if (element.id === "flip_x") {
            flip_x = flip_x === 1 ? -1 : 1;
        }
        else if (element.id === "flip_y") {
            flip_y = flip_y === 1 ? -1 : 1;

        }

        imgSrc.style.transform = `rotate(${rotate}deg) scale(${flip_x} , ${flip_y})`;
    });
});


// reset ka code!
reset.addEventListener("click", () => {
    brightness = "100";
    contrast = "100";
    saturate = "100";
    invert = "0";
    blur = "0";
    rotate = 0;
    flip_x = 1;
    flip_y = 1;
    imgSrc.style.transform = `rotate(${rotate}deg) scale(${flip_x} , ${flip_y})`;
    imgSrc.style.filter = `brightness(${brightness}%) contrast(${contrast}%) saturate(${saturate}%) invert(${invert}%) blur(${blur}px)`;

});

// save krne ka code!

// save.addEventListener("click", () => {
//     let canvas = document.createElement("canvas");
//     let ctx = canvas.getContext("2d");
//     canvas.width = imgSrc.naturalWidth;
//     canvas.height = imgSrc.naturalHeight;

//     ctx.filter = `brightness(${brightness}%) contrast(${contrast}%) saturate(${saturate}%) invert(${invert}%) blur(${blur}px)`;
//     ctx.translate(canvas.width / 2 , canvas.height / 2);
//     ctx.scale(flip_x, flip_y);

//     ctx.drawImage(imgSrc, -canvas.width / 2 , canvas.height / 2 , canvas.width , canvas.height)

//     let link = document.createElement("a");
//     link.download = "img.jpg";
//     link.href = canvas.toDataURL();
//     link.click();

// })


save.addEventListener("click", () => {
    let canvas = document.createElement("canvas");
    let ctx = canvas.getContext("2d");
    canvas.width = imgSrc.naturalWidth;
    canvas.height = imgSrc.naturalHeight;
    ctx.filter = `brightness(${brightness}%) contrast(${contrast}%) saturate(${saturate}%) invert(${invert}%) blur(${blur}px)`;
    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.scale(flip_x, flip_y);
    ctx.drawImage(
      imgSrc,
      -canvas.width / 2,
      -canvas.height / 2,
      canvas.width,
      canvas.height
    );
    const link = document.createElement("a");
    link.download = "image.jpg";
    link.href = canvas.toDataURL();
    link.click();
});