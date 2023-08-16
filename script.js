const header = document.querySelector(".header");
window.addEventListener("scroll", fixNav);

window.addEventListener("contextmenu", function (e) {
  e.preventDefault();
});

function fixNav() {
  if (window.scrollY > header.offsetHeight + 150) {
    header.classList.add("active");
  } else {
    header.classList.remove("active");
  }
}

window.onscroll = function () {
  myFunction();
};

function myFunction() {
  var winScroll = document.body.scrollTop || document.documentElement.scrollTop;
  var height =
    document.documentElement.scrollHeight -
    document.documentElement.clientHeight;
  var scrolled = (winScroll / height) * 98.5;
  document.getElementById("scrollIndicator").style.width = scrolled + "%";
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
    } else {
      entry.target.classList.remove("show");
    }
  });
});

window.onload = function () {
  const menu_btn = document.querySelector(".hamburger");
  const mobile_menu = document.querySelector(".mobile-nav");
  const mobile_menu_option = document.querySelector(
    ".mobile-nav .mobile-options"
  );

  mobile_menu_option.addEventListener("click", () => {
    mobile_menu.classList.toggle("is-active");
    menu_btn.classList.toggle("is-active");
  });

  menu_btn.addEventListener("click", () => {
    menu_btn.classList.toggle("is-active");
    mobile_menu.classList.toggle("is-active");
  });
};

const hiddenElements = document.querySelectorAll(".hidden");
hiddenElements.forEach((element) => observer.observe(element));

// JavaScript Function to Send Email
document.getElementById("contact-form").addEventListener("submit", function (event) {
  event.preventDefault(); // Prevent the form from submitting by default

  // Extract form data
  const formData = new FormData(event.target);

  let name = formData.get("name");
  let surname = formData.get("surname");
  let email = formData.get("email");
  let message = formData.get("message");

  let errorMessages = [];

  if (!name || name === "" || name.length < 2) {
    errorMessages.push("The name should be between 2-20 characters long!");
    document.getElementById("name").style.border = "1px solid red";
  } else {
    document.getElementById("name").style.border = "1px solid green";
  }

  if (!surname || surname === "" || surname.length < 2) {
    errorMessages.push("Invalid surname!");
    document.getElementById("surname").style.border = "1px solid red";
  } else {
    document.getElementById("surname").style.border = "1px solid green";
  }

  if (!email || email === "" || !email.includes("@") || email.length < 12) {
    errorMessages.push("Invalid email!");
    document.getElementById("email").style.border = "1px solid red";
  } else {
    document.getElementById("email").style.border = "1px solid green";
  }

  if (!message || message === "" || message.length < 20) {
    errorMessages.push("The message should be at least 20 characters long!");
    document.getElementById("message").style.border = "1px solid red";
  } else {
    document.getElementById("message").style.border = "1px solid green";
  }

  if (errorMessages.length > 0) {
    showErrors(errorMessages);
    return;
  }

  const emailData = {
    firstName: name,
    lastName: surname,
    email: email,
    message: message,
  };

  showLoader(); // Show the loader when the form is submitted

  // Send email using fetch
  fetch("https://h7ev3gmfp7.execute-api.eu-west-1.amazonaws.com/prod/mails", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(emailData),
  })
    .then((response) => {
      hideLoader(); // Hide the loader when the email response is received

      if (response.ok) {
        console.log("Email sent successfully");
        showSuccessMessage();
        setTimeout(() => {
          // Reset form fields and remove error messages
          event.target.reset();
          document.getElementById("name").style.border = "1px solid #ccc";
          document.getElementById("surname").style.border = "1px solid #ccc";
          document.getElementById("email").style.border = "1px solid #ccc";
          document.getElementById("message").style.border = "1px solid #ccc";
          document.getElementById("error-container").innerHTML = ""; // Remove the error messages
        }, 2000);
      } else {
        console.error("Failed to send email");
        // Show error message or handle errors
      }
    })
    .catch((error) => {
      hideLoader(); // Hide the loader when an error occurs
      console.error("Error occurred:", error);
      // Handle fetch errors
    });
});

function showErrors(messages) {
  // Display the error messages in the error container
  const errorContainer = document.getElementById("error-container");
  errorContainer.innerHTML = "";

  const alertDiv = document.createElement("div");
  alertDiv.className = "alert";
  errorContainer.appendChild(alertDiv);

  const closeSpan = document.createElement("span");
  closeSpan.className = "closebtn";
  closeSpan.innerHTML = "&times;";
  closeSpan.onclick = function () {
    errorContainer.style.display = "none";
  };
  alertDiv.appendChild(closeSpan);

  const errorList = document.createElement("ul");
  errorList.style.listStyle = "inside"
  alertDiv.appendChild(errorList);

  messages.forEach((message) => {
    const listItem = document.createElement("li");
    listItem.innerHTML = message;
    listItem.style.margin = "5px"
    errorList.appendChild(listItem);
  });

  errorContainer.style.display = "block";
}

// Rest of your existing functions (showSuccessMessage, etc.)

function showLoader() {
  // Create the loader element and add it to the page
  const loaderContainer = document.createElement("div");
  loaderContainer.classList.add("loader-container");
  const loader = document.createElement("div");
  loader.classList.add("loader");
  loaderContainer.appendChild(loader);
  document.body.appendChild(loaderContainer);
}

function hideLoader() {
  // Find and remove the loader element from the page
  const loaderContainer = document.querySelector(".loader-container");
  if (loaderContainer) {
    document.body.removeChild(loaderContainer);
  }
}

function showSuccessMessage() {
  // Get the success message element
  const successMessage = document.querySelector(".success-message");
  // Display the success message
  successMessage.style.display = "block";

  // Hide the success message after 3 seconds (3000 ms)
  setTimeout(() => {
    successMessage.style.display = "none";
  }, 3000);
}

