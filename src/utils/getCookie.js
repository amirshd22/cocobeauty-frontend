export default function getCookie(name) {
  const value = `; ${document.cookie}`;

  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
}

// const userInfoFromStorage = localStorage.getItem("userInfo")
//   ? JSON.parse(localStorage.getItem("userInfo"))
//   : null;
