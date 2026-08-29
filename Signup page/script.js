function togglePassword(inputId, button) {

    const input = document.getElementById(inputId);

    if (input.type === "password") {

        input.type = "text";
        button.innerText = "Hide";

    } else {

        input.type = "password";
        button.innerText = "Show";
    }
}

function validEmail(email) {

    const emailPattern =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return emailPattern.test(email);
}
const signupForm =
    document.getElementById("signupForm");


if (signupForm) {

    signupForm.addEventListener("submit", function(event) {

        event.preventDefault();

        const fullName =
            document.getElementById("fullName").value.trim();

        const email =
            document.getElementById("signupEmail").value.trim();

        const password =
            document.getElementById("signupPassword").value;

        const confirmPassword =
            document.getElementById("confirmPassword").value;

        const terms =
            document.getElementById("terms").checked;


        const error =
            document.getElementById("signupError");

        const success =
            document.getElementById("signupSuccess");
        error.innerText = "";
        success.innerText = "";

        if (
            fullName === "" ||
            email === "" ||
            password === "" ||
            confirmPassword === ""
        ) {

            error.innerText =
                "Please fill all fields.";

            return;
        }

        if (!validEmail(email)) {

            error.innerText =
                "Please enter a valid email.";

            return;
        }

        if (password.length < 6) {

            error.innerText =
                "Password must be at least 6 characters.";

            return;
        }

        if (password !== confirmPassword) {

            error.innerText =
                "Password and Confirm Password do not match.";

            return;
        }


        if (!terms) {

            error.innerText =
                "Please accept Terms & Conditions.";

            return;
        }

         const user = {

            fullName: fullName,
            email: email,
            password: password

        };


        localStorage.setItem(
            "user",
            JSON.stringify(user)
        );



        success.innerText =
            "Account created successfully!";

        signupForm.reset();

        setTimeout(function() {

            window.location.href = "login.html";

        }, 1500);

    });
}

  

        const loginForm =
    document.getElementById("loginForm");


if (loginForm) {

    loginForm.addEventListener("submit", function(event) {

        event.preventDefault();


        const email =
            document.getElementById("loginEmail").value.trim();

        const password =
            document.getElementById("loginPassword").value;


        const error =
            document.getElementById("loginError");

        const success =
            document.getElementById("loginSuccess");


        error.innerText = "";
        success.innerText = "";

        if (email === "" || password === "") {

            error.innerText =
                "Please enter email and password.";

            return;
        }


       

        const savedUser =
            JSON.parse(localStorage.getItem("user"));


        if (!savedUser) {

            error.innerText =
                "Account not found. Please Sign Up first.";

            return;
        }


        if (
            email === savedUser.email &&
            password === savedUser.password
        ) {

            
            success.innerText =
                "Login successful!";


           
            localStorage.setItem(
                "isLoggedIn",
                "true"
            );


            setTimeout(function() {

                window.location.href =
                    "dashboard.html";

            }, 1000);

        } else {
            error.innerText =
                "Wrong email or password.";

        }

    });
}


if (
    window.location.pathname.includes("dashboard.html")
) {

    const isLoggedIn =
        localStorage.getItem("isLoggedIn");

    if (isLoggedIn !== "true") {

        window.location.href =
            "login.html";

    } else {

        const savedUser =
            JSON.parse(localStorage.getItem("user"));


        if (savedUser) {

            document.getElementById("welcomeUser").innerText =
                "Welcome, " + savedUser.fullName + "!";

        }
    }
}



function logout() {
    localStorage.removeItem("isLoggedIn");

    window.location.href =
        "login.html";
}

