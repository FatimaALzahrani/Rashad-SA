// قاعدة البيانات
const firebaseConfig = {
  apiKey: "AIzaSyAtxTTq-xOO_Y2_viJ7Bypo5QVpVCiSiEA",
  authDomain: "your-broker-2b8a1.firebaseapp.com",
  databaseURL: "https://your-broker-2b8a1-default-rtdb.firebaseio.com",
  projectId: "your-broker-2b8a1",
  storageBucket: "your-broker-2b8a1.appspot.com",
  messagingSenderId: "1004261960328",
  appId: "1:1004261960328:web:0ea87aeb97302876cc4d3d",
  measurementId: "G-SF2SM5CSL8",
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

const loginForm = document.getElementById("login-form");
const errorMessage = document.getElementById("error-message");

loginForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  auth
    .signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      window.location = "../index.html";
    })
    .catch((error) => {
      console.error("Error:", error.message);
      errorMessage.textContent = "البريد الإلكتروني أو كلمة المرور غير صحيحة";
      errorMessage.style.color = "red";
    });
});

const togglePassword = document.querySelector("#togglePassword");
const password = document.querySelector("#password");

togglePassword.addEventListener("click", function (e) {
  // Toggle the type attribute
  const type =
    password.getAttribute("type") === "password" ? "text" : "password";
  password.setAttribute("type", type);

  // Toggle the eye icon
  this.textContent = this.textContent === "👁️" ? "🙈" : "👁️";
});
