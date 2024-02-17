import Swal from "sweetalert2";
import { getPhotographers } from "../api";

const form = document.querySelector("form") as HTMLFormElement | null;
const urlParams = new URLSearchParams(window.location.search);
const photographerId = urlParams.get("id");



declare const Email: {
  send: (emailData: any) => Promise<string>;
};

function sendEmail() {
  const bodyMessage = `First Name:${inputFields.firstName.value}<br/> Last Name: ${inputFields.lastName.value}<br/> Email:${inputFields.email.value} <br/> Message:${inputFields.message.value}`;
  if (photographerId) {
    getPhotographers().then((photographers) => {
      // Find the photographer by ID
      const photographer = photographers.find(p => p.id === photographerId);

      console.log("Photographer's email found:", photographer?.email);

      Email.send({
        Host: "smtp.elasticemail.com",
        Username: "isildur64500@gmail.com",
        Password: "768EB06B108640684F9319C360DC46C97703",
        To: `${photographer?.email}`,
        From: "isildur64500@gmail.com",
        Subject: "FisheEye Contact Form",
        Body: bodyMessage,
      }).then((message: string) => {
        if (message == "OK") {
          Swal.fire({
            title: "Success!",
            text: "Message sent successfully",
            icon: "success",
          });
        } else {
          Swal.fire({
            title: "Error!",
            text: "Message not sent",
            icon: "error",
          });
        }
      });
    });
  }
}

const inputFields = {
  firstName: document.getElementById("firstname") as HTMLInputElement,
  lastName: document.getElementById("lastname") as HTMLInputElement,
  email: document.getElementById("email") as HTMLInputElement,
  message: document.getElementById("message") as HTMLInputElement,
};

const errorFields = {
  firstName: document.getElementById("firstNameError") as HTMLElement,
  lastName: document.getElementById("lastNameError") as HTMLElement,
  email: document.getElementById("emailError") as HTMLElement,
  message: document.getElementById("messageError") as HTMLElement,
};

const modal = document.getElementById("contact_modal");
function displayModal() {
  if (modal) {
    modal.style.display = "block";
    modal.focus();
  }
}

function closeModal() {
  if (modal) {
    modal.style.display = "none";
  }
}

// Generic function for adding input validation event listeners
function addInputValidation(
  input: HTMLInputElement,
  errorSpan: HTMLElement,
  validationFunction: () => void
) {
  input.addEventListener("input", function () {
    if (validationFunction) {
      validationFunction();
    } else {
      showError(input, errorSpan, "Validation function is missing.");
    }
  });
}

// Adding input validation event listeners
addInputValidation(
  inputFields.firstName,
  errorFields.firstName,
  validateFirstName
);
addInputValidation(
  inputFields.lastName,
  errorFields.lastName,
  validateLastName
);
addInputValidation(
  inputFields.email,
  errorFields.email,
  validateEmail
);
addInputValidation(
  inputFields.message,
  errorFields.message,
  validateMessage
);

function validateForm() {
  const validationFunctions = [
    validateFirstName,
    validateLastName,
    validateEmail,
    validateMessage,
  ];

  let isFormValid = true;

  for (const validationFunction of validationFunctions) {
    isFormValid = validationFunction() && isFormValid;
  }

  if (isFormValid) {
    sendEmail();
    clearRegistrationForm();
    console.log("OK");
    closeModal();
  } else {
    alert("Form is not valid");
  }
}

// Generic function to show error associated with an input field
function showError(
  input: HTMLInputElement,
  errorSpan: HTMLElement,
  message: string
) {
  errorSpan.textContent = message;
  errorSpan.classList.add("active");
  input.classList.add("error-input");
}

// Generic function to hide error associated with an input field
function hideError(input: HTMLInputElement, errorSpan: HTMLElement) {
  errorSpan.textContent = "";
  errorSpan.classList.remove("active");
  input.classList.remove("error-input");
}

// Validation functions for individual form fields
function validateFirstName() {
  const value = inputFields.firstName.value.trim();
  if (!/^[a-zA-Z]+$/.test(value) || value.length < 2) {
    showError(
      inputFields.firstName,
      errorFields.firstName,
      "Please enter at least 2 characters."
    );
    return false;
  } else {
    hideError(inputFields.firstName, errorFields.firstName);
    return true;
  }
}

function validateLastName() {
  const value = inputFields.lastName.value.trim();
  if (!/^[a-zA-Z]+$/.test(value) || value.length < 2) {
    showError(
      inputFields.lastName,
      errorFields.lastName,
      "Please enter at least 2 characters."
    );
    return false;
  } else {
    hideError(inputFields.lastName, errorFields.lastName);
    return true;
  }
}

function validateEmail() {
  const value = inputFields.email.value.trim();
  const emailRegex = /^[^\s@]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailRegex.test(value)) {
    showError(
      inputFields.email,
      errorFields.email,
      "You have to enter a valid email address."
    );
    return false;
  } else {
    hideError(inputFields.email, errorFields.email);
    return true;
  }
}
function validateMessage() {
  const value = inputFields.message.value.trim();
  if (value.length < 10) {
    showError(
      inputFields.message,
      errorFields.message,
      "Please enter at least 10 characters."
    );
    return false;
  } else {
    hideError(inputFields.message, errorFields.message);
    return true;
  }
}


function clearRegistrationForm() {
  form?.reset();
  console.log("Form cleared");
}




export { sendEmail, clearRegistrationForm, displayModal, closeModal, validateForm }