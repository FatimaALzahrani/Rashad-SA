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

const db = firebase.database();
const auth = firebase.auth();

auth.onAuthStateChanged(function (user) {
  if (!user) {
    window.location.href = "../login/index.html";
  } else {
    const userId = user.uid;
    fetchSubscription(userId, user.email);
  }
});

function fetchSubscription(userId, userEmail) {
  const subscriptionRef = db.ref("subscriptions");

  subscriptionRef
    .once("value")
    .then((snapshot) => {
      if (snapshot.exists()) {
        const subscriptions = snapshot.val();
        let foundSubscription = null;
        let subscriptionType = null;

        Object.keys(subscriptions).forEach((type) => {
          const typeSubscriptions = subscriptions[type];

          Object.keys(typeSubscriptions).forEach((key) => {
            const subscription = typeSubscriptions[key];
            if (subscription.email === userEmail) {
              foundSubscription = subscription;
              subscriptionType = type;
            }
          });
        });

        if (foundSubscription) {
          let timeLimit = 15 * 60 * 1000;
          if (foundSubscription.status === "COMPLETED") {
            if (subscriptionType === "gold") {
              timeLimit = -1;
            } else if (subscriptionType === "silver") {
              timeLimit = 40 * 60 * 1000;
            } else if (subscriptionType === "bronze") {
              timeLimit = 25 * 60 * 1000;
            }
          }

          setupUserTime(userId, timeLimit, foundSubscription.status);
        } else {
          setupUserTime(userId, 15 * 60 * 1000, null);
        }
      } else {
        console.error("لم يتم العثور على أي بيانات في قاعدة البيانات.");
      }
    })
    .catch((error) => console.error("خطأ في جلب بيانات الاشتراك:", error));
}

function setupUserTime(userId, timeLimit, subscriptionStatus) {
  const userRef = db.ref("Users/" + userId);

  userRef.once("value").then((snapshot) => {
    let remainingTime = snapshot.val()?.remainingTime;
    let lastAccessTime = snapshot.val()?.lastAccessTime || Date.now();

    if (remainingTime === undefined || remainingTime === null)
      remainingTime = timeLimit;

    if (remainingTime === -1) {
      document.getElementById("remaining-time-message").innerText =
        "الوقت مفتوح دائمًا.";
      return;
    }

    if (Date.now() - lastAccessTime >= 24 * 60 * 60 * 1000) {
      remainingTime = timeLimit;
      lastAccessTime = Date.now();
      updateUserData(userId, { remainingTime, lastAccessTime });
    }

    displayRemainingTime(remainingTime);

    let interval = setInterval(() => {
      remainingTime -= 1000;
      displayRemainingTime(remainingTime);

      if (remainingTime <= 0) {
        clearInterval(interval);

        if (!subscriptionStatus) {
          alert(
            "لقد انتهى وقتك المجاني لليوم! قم بالاشتراك لتتمكن من الاستمرار."
          );
        } else {
          alert("لقد انتهى وقت اشتراكك لليوم!");
        }

        window.location.href = "../index.html#packages";
      } else {
        updateUserData(userId, { remainingTime });
      }
    }, 1000);

    window.addEventListener("beforeunload", () => {
      updateUserData(userId, {
        lastAccessTime: remainingTime > 0 ? lastAccessTime : Date.now(),
        remainingTime,
      });
    });
  });
}

function updateUserData(userId, updatedData) {
  const userRef = db.ref("Users/" + userId);
  userRef
    .update(updatedData)
    .catch((error) => console.error("خطأ أثناء تحديث البيانات:", error));
}

function displayRemainingTime(ms) {
  if (ms > 0) {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    document.getElementById(
      "remaining-time-message"
    ).innerText = `الوقت المتبقي: ${minutes} دقيقة و ${seconds} ثانية`;
  } else {
    document.getElementById("remaining-time-message").innerText =
      "لقد انتهى وقتك اليوم.";
  }
}
