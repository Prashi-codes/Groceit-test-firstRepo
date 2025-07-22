document.addEventListener("DOMContentLoaded", () => {
  const signupForm = document.getElementById("signup-form");

  signupForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("signup-name").value.trim();
    const email = document.getElementById("signup-email").value.trim();
    const password = document.getElementById("signup-password").value;
    const confirmPassword = document.getElementById("signup-confirm-password").value;

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        const user = userCredential.user;

        // Set display name
        return user.updateProfile({
          displayName: name
        }).then(() => {
          alert("Signup successful! Redirecting to login...");
          window.location.href = "index.html";
        });
      })
      .catch((error) => {
        alert("Signup error: " + error.message);
        console.error(error);
      });
  });
});
