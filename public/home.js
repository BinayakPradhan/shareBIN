// Function to fetch and display user data
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

// Call displayUserData when the page loads
document.addEventListener("DOMContentLoaded", displayUserData);
