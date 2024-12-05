document.getElementById("imageInput").addEventListener("change", function() {
  const fileName = document.getElementById("fileName");
  // Get the file name from the input
  const filePath = this.value.split("\\").pop();
  
  // If a file is selected, update the button text with file name
  if (filePath) {
    fileName.textContent = filePath;
  } else {
    fileName.textContent = "Choose File"; // Default text if no file is selected
  }
});

document.getElementById("convertButton").addEventListener("click", () => {
  const imageInput = document.getElementById("imageInput");
  const output = document.getElementById("output");
  
  // Display loading message when conversion starts
  output.textContent = "Processing... Please wait.";

  if (imageInput.files.length === 0) {
    output.textContent = "Please upload an image first.";
    return;
  }

  const imageFile = imageInput.files[0];
  const reader = new FileReader();

  reader.onload = () => {
    const imageSrc = reader.result;

    Tesseract.recognize(
      imageSrc,
      "eng",
      {
        logger: (info) => console.log(info), // Optional: Log progress to the console
      }
    )
    .then(({ data: { text } }) => {
      // After processing is done, display the extracted text
      output.textContent = text;
    })
    .catch((error) => {
      // If an error occurs during OCR, display the error message
      output.textContent = `Error: ${error.message}`;
    });
  };

  reader.readAsDataURL(imageFile);
});
