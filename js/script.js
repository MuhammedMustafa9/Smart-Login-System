// ////////////////////////////// SignUp ///////////////////////////////// //

var signupName = document.querySelector("#signupName");
var signupEmail = document.querySelector("#signupEmail");
var signupPass = document.querySelector("#signupPass");
var signupIncorrect = document.querySelector(".signupIncorrect");

var signinEmail = document.querySelector("#signinEmail");
var signinPass = document.querySelector("#signinPass");
var signinIncorrect = document.querySelector(".signinIncorrect");

var signupUsers = [];
if (localStorage.getItem("users") == null) {
  signupUsers = [];
} else {
  signupUsers = JSON.parse(localStorage.getItem("users"));
}

// say hi to user
var username = localStorage.getItem("userSession");
if (username) {
  document.querySelector(
    "#hiUser"
  ).innerHTML = `Welcome, ${localStorage.getItem("userSession")}`;
}

function isEmpty() {
  if (signupName.value == "" || signupEmail.value == "" || signupPass.value == "") {
    return false;
  } else {
    return true;
  }
}

function Signup() {
  if (isEmpty() == false) {
    signupIncorrect.classList.replace("text-success", "text-danger");
    signupIncorrect.innerHTML = "all fields are required";
    return false;
  }
  if (emailExists()) {
    signupIncorrect.classList.replace("text-success", "text-danger");
    signupIncorrect.innerHTML = "Email Already Exists!";
  } else {
    var user = {
      name: signupName.value,
      email: signupEmail.value,
      pass: signupPass.value,
    };
    signupUsers.push(user);
    localStorage.setItem("users", JSON.stringify(signupUsers));
    signupIncorrect.classList.replace("text-danger", "text-success");
    signupIncorrect.innerHTML = "Success";
  }
}

function emailExists() {
  for (let i = 0; i < signupUsers.length; i++) {
    if (signupEmail.value.toLowerCase() == signupUsers[i].email.toLowerCase()) {
      return true;
    }
  }
}

///////////////////////// Sign In //////////////////////
function isLoginEmpty() {
  if (signinEmail.value == "" || signinPass.value == "") {
    return false;
  } else {
    return true;
  }
}

function signIn() {
  if (isLoginEmpty() == false) {
    signinIncorrect.classList.replace("text-success", "text-danger");
    signinIncorrect.innerHTML = "All inputs is required!";
    return false;
  }
  for (let i = 0; i < signupUsers.length; i++) {
    if (
      signinEmail.value.toLowerCase() == signupUsers[i].email.toLowerCase() &&
      signinPass.value == signupUsers[i].pass
    ) {
      signinIncorrect.classList.replace("text-danger", "text-success");
      signinIncorrect.innerHTML = "Success";
      localStorage.setItem("userSession", signupUsers[i].name);
      location.pathname = "profile.html";
    } else {
      signinIncorrect.classList.replace("text-success", "text-danger");
      signinIncorrect.innerHTML = "Inccorect Email or Password!";
    }
  }
}

function logOut() {
  localStorage.removeItem("userSession");
  location.pathname = "index.html";
}
