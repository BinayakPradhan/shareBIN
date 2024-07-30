document.addEventListener("DOMContentLoaded", () => {
  const container = document.querySelector(".container"),
    pwShowHide = document.querySelectorAll(".showHidePw"),
    pwFields = document.querySelectorAll(".password"),
    signUp = document.querySelector(".signup-link"),
    login = document.querySelector(".login-link");

  // Handle signup form submission
  const signupForm = document.getElementById("signup");
  if (signupForm) {
    signupForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const name = document.getElementById("name").value;
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;

      try {
        const res = await fetch("/", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, password }),
        });

        const data = await res.json();
        if (res.ok) {
          alert(data.message); // Show success message
          window.location.href = "/login"; // Redirect to login page
        } else {
          alert(data.error); // Show error message
        }
      } catch (error) {
        console.error("Error submitting form:", error);
        alert("Failed to submit form. Please try again later.");
      }
    });
  } else {
    console.error("Signup form not found");
  }

  // Handle login form submission
  const loginForm = document.getElementById("login");
  if (loginForm) {
    loginForm.addEventListener("submit", async (e) => {
      e.preventDefault(); // Prevent the default form submission

      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;

      console.log(email, password); // Log values to debug

      try {
        const res = await fetch("/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        });

        const data = await res.json();
        if (res.ok) {
          console.log("Login successful", data);
          localStorage.setItem("userData", JSON.stringify(data.userData));
          alert(data.message);

          window.location.href = "/home"; // Redirect to /home
        } else {
          alert(data.error); // Handle error response
        }
      } catch (error) {
        console.error("Error during login:", error);
        alert("Failed to login. Please try again later.");
      }
    });
  } else {
    console.error("Login form not found");
  }

  // Show or hide password and change icon
  pwShowHide.forEach((eyeIcon) => {
    eyeIcon.addEventListener("click", () => {
      pwFields.forEach((pwField) => {
        if (pwField.type === "password") {
          pwField.type = "text";
          pwShowHide.forEach((icon) => {
            icon.classList.replace("uil-eye-slash", "uil-eye");
          });
        } else {
          pwField.type = "password";
          pwShowHide.forEach((icon) => {
            icon.classList.replace("uil-eye", "uil-eye-slash");
          });
        }
      });
    });
  });

  // Show and hide forms
  if (signUp) {
    signUp.addEventListener("click", () => {
      container.classList.add("active");
    });
  }

  if (login) {
    login.addEventListener("click", () => {
      container.classList.remove("active");
    });
  }
});
