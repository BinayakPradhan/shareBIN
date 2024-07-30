document.addEventListener("DOMContentLoaded", () => {
  const signOutButton = document.getElementById("sign-out");

  if (signOutButton) {
    signOutButton.addEventListener("click", async () => {
      // Clear user data from localStorage
      localStorage.removeItem("userData");

      // Make a request to the server to handle session invalidation
      try {
        const res = await fetch("/logout", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });

        if (res.ok) {
          alert("Logged out successfully");
          window.location.href = "/login"; // Redirect to login page
        } else {
          alert("Failed to logout. Please try again later.");
        }
      } catch (error) {
        console.error("Error during logout:", error);
        alert("Failed to logout. Please try again later.");
      }
    });
  } else {
    console.error("Sign out button not found");
  }

  // Existing code for displaying user data and other functionalities
  function displayUserData() {
    const userData = JSON.parse(localStorage.getItem("userData"));
    if (userData) {
      document.getElementById("user-name").textContent = userData.name;
      document.getElementById("user-email").textContent = userData.email;
    } else {
      document.getElementById("user-name").textContent = "User not logged in";
      document.getElementById("user-email").textContent =
        "Please log in to view your data";
    }
  }

  displayUserData();
});
