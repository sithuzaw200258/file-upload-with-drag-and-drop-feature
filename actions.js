// select all required elements

const dragArea = document.querySelector(".drag-area"),
    dragText = document.querySelector("header"),
    button = document.querySelector("button"),
    input = document.querySelector("input");

let file; // this is a global variable and we'll use it inside multiple functions

button.onclick = () => {
    input.click();
}

input.addEventListener("change", () => {
    //getting user select file and [0] this means if user select multiple files then we'll select only the first one
    file = input.files[0];
    showFile(); // calling function
    dragArea.classList.add("active");
});

// if user drag file over drag area
dragArea.addEventListener("dragover", (event) => {
    event.preventDefault(); // preventing from default behavior
    dragArea.classList.add("active");
    dragText.textContent = "Release To Upload File";
});


// if user leave dragged file from drag area
dragArea.addEventListener("dragleave", () => {
    dragArea.classList.remove("active");
    dragText.textContent = "Drag & Drop To Upload";
});


// if user drop file on drag area
dragArea.addEventListener("drop", (event) => {
    event.preventDefault(); // preventing from default behavior

    //getting user select file and [0] this means if user select multiple files then we'll select only the first one
    file = event.dataTransfer.files[0];
    showFile(); // calling function
});

function showFile() {
    let fileTyped = file.type;
    let validExtensions = ["image/jpeg", "image/jpg", "image/png"]; // adding some valid image extensions in array

    if (validExtensions.includes(fileTyped)) { // if user selected file is an image file

        let fileReader = new FileReader(); // creating new FileReader Object
        fileReader.onload = () => {
            let fileURL = fileReader.result; // passing user file source in fileURL variable
            // console.log(fileURL);

            let imgTag = `<img src="${fileURL}" alt="">`; // creating an img tag and passing user selected file source inside src attribute

            dragArea.innerHTML = imgTag; // adding that created img tag inside drop area container
        }

        fileReader.readAsDataURL(file);

    } else {
        alert("This is not an image file");
        dragArea.classList.remove("active");
        dragText.textContent = "Drag & Drop To Upload";
    }
}