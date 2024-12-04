document.addEventListener("DOMContentLoaded", () => {
  const videoEl = document.getElementById("sm-video");
  const statusElement = document.getElementById("status-text");

  if (!videoEl) {
    console.error("عنصر الفيديو غير موجود.");
    return;
  }

  try {
    const scene = new Scene({
      videoElement: videoEl,
      apiKey:
        "eyJzb3VsSWQiOiJkZG5hLXJhc2hhZDNhYzYtLXJhc2hhZCIsImF1dGhTZXJ2ZXIiOiJodHRwczovL2RoLnNvdWxtYWNoaW5lcy5jbG91ZC9hcGkvand0IiwiYXV0aFRva2VuIjoiYXBpa2V5X3YxX2Y4MDI4ZDFkLTZkZDYtNGUzOS04YWQwLTNmYWYwZGRiODE0YiJ9", // استبدل بـ مفتاح API الخاص بك
    });

    scene
      .connect()
      .then(() => {
        console.log("تم الاتصال بنجاح.");
        if (statusElement) {
          statusElement.textContent = "تم الاتصال بنجاح.";
        }
      })
      .catch((error) => {
        console.error("فشل الاتصال:", error);
        if (statusElement) {
          statusElement.textContent = "فشل الاتصال.";
        }
      });

    scene.addEventListener("connected", () => {
      console.log("تم الاتصال بالحدث: connected");
    });

    scene.addEventListener("error", (err) => {
      console.error("حدث خطأ:", err);
    });
  } catch (err) {
    console.error("فشل تهيئة المشهد:", err);
    if (statusElement) {
      statusElement.textContent = "فشل تهيئة المشهد.";
    }
  }
});

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
const remainingTimeMessage = document.getElementById("remaining-time-message");

const FREE_TRIAL_TIME = 15 * 60 * 1000;
let intervalId = null;

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    checkSubscription(user.uid);
  } else {
    window.location.href = "../login.html";
  }
});

// التحقق من الاشتراك
function checkSubscription(userId) {
  db.ref(`subscriptions/${userId}`).once("value", (snapshot) => {
    const subscription = snapshot.val();

    if (!subscription || subscription.status !== "COMPLETED") {
      remainingTimeMessage.innerText =
        "الاشتراك غير مكتمل أو غير موجود، لديك 15 دقيقة مجانية.";
      handleGuestAccess(userId);
    } else {
      const { plan, username } = subscription;
      console.log("مرحبًا، " + username);

      if (plan === "gold") {
        remainingTimeMessage.innerText = "لديك اشتراك ذهبي! الوصول غير محدود.";
        checkUsageLimit(userId, Infinity);
      } else if (plan === "silver") {
        remainingTimeMessage.innerText =
          "لديك اشتراك فضي! الوقت المتاح: 40 دقيقة.";
        checkUsageLimit(userId, 40);
      } else if (plan === "bronze") {
        remainingTimeMessage.innerText =
          "لديك اشتراك برونزي! الوقت المتاح: 25 دقيقة.";
        checkUsageLimit(userId, 25);
      }
    }
  });
}

function handleGuestAccess(userId) {
  const currentTime = Date.now();

  db.ref(`users/${userId}`).once("value", (snapshot) => {
    const userData = snapshot.val() || {};
    const lastAccessTime = userData.lastAccessTime || 0;
    const dailyUsage = userData.dailyUsage || 0;

    const dayStartTime = new Date(currentTime).setHours(0, 0, 0, 0);

    if (lastAccessTime < dayStartTime) {
      db.ref(`users/${userId}`).set({
        dailyUsage: 0,
        lastAccessTime: currentTime,
      });
    }

    const elapsedTime = currentTime - lastAccessTime;
    const remainingTime = Math.max(0, FREE_TRIAL_TIME - elapsedTime);

    if (remainingTime > 0) {
      startTimeCountdown(remainingTime);
    } else {
      alert("انتهت المدة المجانية. يجب الاشتراك للاستمرار.");
      window.location.href = "../index.html#packages";
    }
  });
}

function checkUsageLimit(userId, maxTime) {
  db.ref(`users/${userId}/dailyUsage`).once("value", (snapshot) => {
    const dailyUsage = snapshot.val() || 0;

    if (dailyUsage >= maxTime) {
      alert("لقد وصلت إلى الحد الأقصى لاستخدام اليوم.");
      window.location.href = "../index.html#packages";
    } else {
      const remainingTime = maxTime - dailyUsage;
      remainingTimeMessage.innerText = `الوقت المتبقي اليوم: ${remainingTime} دقيقة.`;
      startUsageTracking(userId, remainingTime);
    }
  });
}

function startUsageTracking(userId, remainingTime) {
  const startTime = Date.now();

  window.addEventListener("beforeunload", () => {
    const endTime = Date.now();
    const usageTime = Math.ceil((endTime - startTime) / 60000);
    const totalUsage = Math.min(usageTime, remainingTime);

    db.ref(`users/${userId}/dailyUsage`).transaction((currentUsage) => {
      return (currentUsage || 0) + totalUsage;
    });
  });
}

function startTimeCountdown(remainingTime) {
  let timeLeft = remainingTime;
  intervalId = setInterval(() => {
    if (timeLeft <= 0) {
      clearInterval(intervalId);
      remainingTimeMessage.innerText =
        "انتهت المدة المجانية. يجب الاشتراك للاستمرار.";
    } else {
      const remainingMinutes = Math.ceil(timeLeft / 60000);
      remainingTimeMessage.innerText = `الوقت المتبقي: ${remainingMinutes} دقيقة.`;
      timeLeft -= 1000;
    }
  }, 1000);
}
