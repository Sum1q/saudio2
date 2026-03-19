const buttons = document.querySelectorAll(".types span");
const cards = document.querySelectorAll(".story-card");

buttons.forEach(btn => {
  btn.onclick = function () {

    let type = btn.dataset.type;

    cards.forEach(card => {

      if (type === "all" || card.dataset.type === type) {
        card.style.display = "block";
      } else {
        card.style.display = "none";
      }

    });

  };
});
// CREATE DEFAULT ADMIN
if (!localStorage.getItem("users")) {
    localStorage.setItem("users", JSON.stringify([
        { username: "admin", password: "1234" }
    ]));
}

// LOGIN
function login() {
    let user = document.getElementById("username").value;
    let pass = document.getElementById("password").value;

    let users = JSON.parse(localStorage.getItem("users"));

    let found = users.find(u => u.username === user && u.password === pass);

    if (found) {
        localStorage.setItem("loggedIn", "true");
        alert("Logged in!");
        document.getElementById("loginModal").style.display = "none";
    } else {
        alert("Wrong account!");
    }
}

// SIGNUP
function signup() {
    let user = document.getElementById("username").value;
    let pass = document.getElementById("password").value;

    let users = JSON.parse(localStorage.getItem("users"));

    users.push({ username: user, password: pass });
    localStorage.setItem("users", JSON.stringify(users));

    alert("Account created!");
}

// PAYWALL SYSTEM
document.querySelectorAll(".story-card").forEach(card => {
    card.addEventListener("click", function (e) {

        if (localStorage.getItem("loggedIn") !== "true") {
            e.preventDefault();
            document.getElementById("loginModal").style.display = "flex";
            return;
        }

        if (!localStorage.getItem("paid")) {
            e.preventDefault();
            document.getElementById("paywall").style.display = "flex";
        }
    });
});

// FAKE PAYMENT
function fakePay() {
    localStorage.setItem("paid", "true");
    alert("Төлбөр амжилттай! ");
    document.getElementById("paywall").style.display = "none";
}

// CLOSE PAYWALL
function closePaywall() {
    document.getElementById("paywall").style.display = "none";
}