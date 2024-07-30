const container = document.querySelector(".container"),
  pwShowHide = document.querySelectorAll(".showHidePw"),
  pwFields = document.querySelectorAll(".password"),
  signUp = document.querySelector(".signup-link"),
  login = document.querySelector(".login-link");

document.getElementById("signup").addEventListener("submit", async (e) => {
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

document.getElementById("login").addEventListener("submit", async (e) => {
  e.preventDefault(); // Prevent the default form submission

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    const res = await fetch("/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (res.ok) {
      const data = await res.json();
      console.log("Login successful", data);
      localStorage.setItem("userData", JSON.stringify(data.userData));
      alert(data.message);
      console.log("Redirecting to /home");
      window.location.assign("/home");
    } else {
      const errorData = await res.json();
      alert(errorData.error);
    }
  } catch (error) {
    console.error("Error during login:", error);
    alert("Failed to login. Please try again later.");
  }
});

// js to show or hide password & change icon
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

// js code to appear signup and login form
// signUp.addEventListener("click", () => {
//   container.classList.add("active");
// });
// login.addEventListener("click", () => {
//   container.classList.remove("active");
// });
