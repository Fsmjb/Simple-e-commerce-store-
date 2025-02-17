function previewImage(event) {
    const file = event.target.files[0];
    const preview = document.getElementById('imagePreview');

    if (file) {
        const reader = new FileReader();
        reader.onload = function () {
            preview.src = reader.result;
            preview.style.display = 'block';  // Show the image
        };
        reader.readAsDataURL(file);
    } else {
        preview.style.display = 'none';  // Hide the image if no file is selected
    }
}