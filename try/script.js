// // ----- الشخصية الافتراضية -----
// // تحديد عنصر الفيديو
const videoEl = document.getElementById("sm-video");

// إنشاء كائن Scene
const scene = new Scene({
  videoElement: videoEl,
  apiKey:
    "eyJzb3VsSWQiOiJkZG5hLXJhc2hhZDNhYzYtLXJhc2hhZCIsImF1dGhTZXJ2ZXIiOiJodHRwczovL2RoLnNvdWxtYWNoaW5lcy5jbG91ZC9hcGkvand0IiwiYXV0aFRva2VuIjoiYXBpa2V5X3YxX2Y4MDI4ZDFkLTZkZDYtNGUzOS04YWQwLTNmYWYwZGRiODE0YiJ9",
  requestedMediaDevices: { microphone: true },
  requiredMediaDevices: {}, // اجعل الوسائط اختيارية لتجنب حجب المستخدمين
  sendMetadata: {
    pageUrl: true, // إرسال بيانات الصفحة لمحرك NLP
  },
});

// عرض حالة الاتصال
const statusDiv = document.getElementById("status");

// معالجة نجاح الاتصال
scene
  .connect()
  .then((sessionId) => {
    console.log("تم الاتصال بنجاح. معرف الجلسة:", sessionId);
    statusDiv.textContent = "تم الاتصال بنجاح!";
    return scene.startVideo(); // بدء عرض الفيديو
  })
  .then((videoState) => {
    console.log("تم تشغيل الفيديو بالحالة:", videoState);
    statusDiv.textContent += " الفيديو قيد التشغيل!";
  })
  .catch((error) => {
    console.error("فشل الاتصال:", error);
    statusDiv.textContent = `خطأ: ${error.name}`;
  });

// معالجة أخطاء الاتصال
scene.on("error", (error) => {
  console.error("خطأ:", error);
});

// ----- تهيئة Firebase -----
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

// تهيئة Firebase
firebase.initializeApp(firebaseConfig);

// المتغيرات العامة
const db = firebase.database();
const auth = firebase.auth();
const remainingTimeMessage = document.getElementById("remaining-time-message");

// الوقت المجاني للمستخدمين غير المشتركين
const FREE_TRIAL_TIME = 15 * 60 * 1000; // 15 دقيقة بالميلي ثانية
let intervalId = null; // معرف المؤقت

// التحقق من تسجيل الدخول
firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    checkSubscription(user.uid); // التحقق من الاشتراك
  } else {
    window.location.href = "../login.html"; // التوجيه إلى تسجيل الدخول
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

// التعامل مع المستخدمين غير المشتركين
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

// التحقق من الحد الأقصى للاستخدام
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

// تتبع وقت الاستخدام
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

// العد التنازلي للوقت المتبقي
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
