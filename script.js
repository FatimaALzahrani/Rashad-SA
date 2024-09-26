// تقييم النجوم
document.getElementById("feedbackType").addEventListener("change", function () {
  var ratingContainer = document.getElementById("ratingContainer");
  if (this.value === "رأي/تقييم") {
    ratingContainer.style.display = "block";
  } else {
    ratingContainer.style.display = "none";
  }
});

// القائمة
$(document).ready(() => {
  $("#menu-toggle").click(() => {
    $("#mynavbar").toggleClass("show");
    $(".menu-icon").toggle();
    $(".close-icon").toggle();
  });

  $(".nav-link").click(() => {
    $("#mynavbar").removeClass("show");
    $(".menu-icon").show();
    $(".close-icon").hide();
  });
});

// انميشن
const animateElements = (elements, className) => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        entry.target.classList.toggle(className, entry.isIntersecting);
      });
    },
    { root: null, rootMargin: "0px", threshold: 0.5 }
  );

  elements.forEach((el) => observer.observe(el));
};

animateElements(document.querySelectorAll(".anim"), "show");
animateElements(document.querySelectorAll(".anim2"), "show3");
animateElements(document.querySelectorAll(".anim1"), "show3");
animateElements(document.querySelectorAll(".anim3"), "show3");
animateElements(document.querySelectorAll(".anim4"), "show4");
animateElements(document.querySelectorAll(".anim5"), "show4");

// زر تسجيل الدخول/الخروج
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

auth.onAuthStateChanged((user) => {
  const authButton = document.getElementById("auth-button");
  if (user) {
    authButton.innerHTML = `<a class="nav-link" href="#" onclick="logout()">تسجيل الخروج</a>`;
  } else {
    authButton.innerHTML = `<a class="nav-link" href="login/index.html">تسجيل الدخول</a>`;
  }
});

function logout() {
  auth.signOut().then(() => {
    window.location = "index.html";
  });
}

var db = firebase.database().ref("messages");

document.getElementById("contactForm").addEventListener("submit", submitForm);

function submitForm(e) {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const username = document.getElementById("username").value;
  const title = document.getElementById("title").value;
  const message = document.getElementById("message").value;
  const feedbackType = document.getElementById("feedbackType").value;
  const ratingContainer = document.querySelector(
    'input[name="rating"]:checked'
  );
  rating = ratingContainer.value;

  const msg = {
    email: email,
    username: username,
    message: message,
    feedbackType: feedbackType,
    rating: rating,
    title: title,
    // timestamp: firebase.database.FieldValue.serverTimestamp(),
  };

  db.push(msg)
    .then(function () {
      console.log("تمت!");
    })
    .catch(function (error) {
      console.error("Error adding event to Firebase: ", error);
    });
  sendMail();
}

function sendMail() {
  var params = {
    name: document.getElementById("username").value,
    email: document.getElementById("email").value,
    message: document.getElementById("message").value,
  };

  const serviceID = "service_Rashad";
  const templateID = "template_8qnxkc6";

  emailjs
    .send(serviceID, templateID, params)
    .then((res) => {
      document.getElementById("username").value = "";
      document.getElementById("email").value = "";
      document.getElementById("message").value = "";
      document.getElementById("title").value = "";
      document.getElementById("feedbackType").value = "";
      console.log(res);
      alert("تم إرسال رسالتك بنجاح!");
    })
    .catch((err) => console.log(err));
}

// اظهار التقييمات
const database = firebase.database();
document.addEventListener("DOMContentLoaded", function () {
  const reviewsContainer = document.getElementById("reviews-container");

  database
    .ref("messages")
    .orderByChild("feedbackType")
    .equalTo("رأي/تقييم")
    .on("value", (snapshot) => {
      const reviews = snapshot.val();
      reviewsContainer.innerHTML = "";

      for (let key in reviews) {
        const review = reviews[key];
        const reviewElement = document.createElement("div");
        reviewElement.classList.add("swiper-slide");

        reviewElement.innerHTML = `
          <div class="box">
            <img src="images/person.png" >
            <h3>${review.username}</h3>
            <p>${review.message}</p>
            <div class="stars">${generateStars(review.rating)}</div>
          </div>
        `;

        reviewsContainer.appendChild(reviewElement);
      }

      const swiper = new Swiper(".review-slider", {
        slidesPerView: 1,
        spaceBetween: 10,
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
        },
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
      });
    });

  function generateStars(rating) {
    let stars = "";
    for (let i = 1; i <= 5; i++) {
      stars +=
        i <= rating
          ? '<i class="fas fa-star"></i>'
          : '<i class="far fa-star"></i>';
    }
    return stars;
  }
});

// var swiper = new Swiper(".review-slider", {
//   spaceBetween: 20,
//   loop: true,
//   autoplay: {
//     delay: 2500,
//     disableOnInteraction: false,
//   },
//   breakpoints: {
//     640: {
//       slidesPerView: 1,
//     },
//     768: {
//       slidesPerView: 2,
//     },
//     1024: {
//       slidesPerView: 3,
//     },
//   },
// });
