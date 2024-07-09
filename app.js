document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('loginButton').addEventListener('click', function() {
        window.location.href = 'login.html';
    });
    document.getElementById('signupButton').addEventListener('click', function() {
        window.location.href = 'signup.html';
    });
});

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('loginForm').addEventListener('submit', function(event) {
        event.preventDefault();

        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value.trim();

        const hardcodedEmail = "anais.neacsudalu@dell.com";
        const hardcodedPassword = "pass1234";

        if (email === hardcodedEmail && password === hardcodedPassword) {
            alert("Login successful!");
            window.location.href = 'home.html';
        } else {
            displayError("Invalid email or password.");
        }
    });
});

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('signupForm').addEventListener('submit', function(event) {
        event.preventDefault();

        const firstName = document.getElementById('firstName').value.trim();
        const lastName = document.getElementById('lastName').value.trim();
        const email = document.getElementById('email').value.trim();

        if (!validateEmail(email)) {
            displayError("Invalid email format.");
            return;
        }

        alert(`Signup successful!\n\nFirst Name: ${firstName}\nLast Name: ${lastName}\nEmail: ${email}`);
        window.location.href = 'login.html';
    });
});

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function displayError(message) {
    const errorText = document.getElementById('errorText');
    errorText.textContent = message;
}

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('redirectGenerateButton').addEventListener('click', function() {
        window.location.href = 'generate.html';
    });

    document.getElementById('logoutButton').addEventListener('click', function() {

        window.localStorage.clear();
        window.sessionStorage.clear();
        window.location.replace('index.html');

        history.replaceState(null, null, 'index.html');
    });


    const dropArea = document.getElementById('dropArea');
    const fileInput = document.getElementById('fileInput');
    const fileButton = document.getElementById('fileButton');
    const imageGrid = document.getElementById('imageGrid');
    window.uploadedImages = [];

    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        dropArea.addEventListener(eventName, preventDefaults, false);
        document.body.addEventListener(eventName, preventDefaults, false);
    });

    ['dragenter', 'dragover'].forEach(eventName => {
        dropArea.addEventListener(eventName, highlight, false);
    });

    ['dragleave', 'drop'].forEach(eventName => {
        dropArea.addEventListener(eventName, unhighlight, false);
    });

    dropArea.addEventListener('drop', handleDrop, false);

    fileButton.addEventListener('click', () => fileInput.click());
    fileInput.addEventListener('change', handleFiles, false);

    function preventDefaults(e) {
        e.preventDefault();
        e.stopPropagation();
    }

    function highlight() {
        dropArea.classList.add('highlight');
    }

    function unhighlight() {
        dropArea.classList.remove('highlight');
    }

    function handleDrop(e) {
        const dt = e.dataTransfer;
        const files = dt.files;
        handleFiles({ target: { files } });
    }

    function handleFiles(e) {
        const files = e.target.files;
        imageGrid.innerHTML = '';
        window.uploadedImages = [];

        if (files.length > 0) {
            const fileArray = Array.from(files).slice(0, 3);
            fileArray.forEach(file => {
                if (file.type.startsWith('image/')) {
                    const reader = new FileReader();
                    reader.onload = function(event) {
                        const img = document.createElement('img');
                        img.src = event.target.result;
                        img.className = 'uploaded-image';
                        imageGrid.appendChild(img);
                        window.uploadedImages.push(event.target.result);

                        if (window.uploadedImages.length === 3) {
                            initializeP5Sketch();
                        }
                    };
                    reader.readAsDataURL(file);
                } else {
                    alert("Please upload image files only.");
                }
            });
        }
    }
});
