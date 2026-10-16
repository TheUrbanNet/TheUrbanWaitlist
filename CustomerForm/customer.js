const form = document.getElementById("waitlistForm");
const submitButton = document.getElementById("submitBtn");
const mainContent = document.querySelector(".main-content");
const successMessage = document.getElementById("successMessage");

const backButton = document.getElementById("backToRoleSelection");
const fullNameInput = document.getElementById("full-name");
const emailInput = document.getElementById("email");
const postcodeInput = document.getElementById("postcode");

const GOOGLE_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbyLzcA1-lVa3OTawov1OS7U16qbYYRg6K03X8UOG8Ez2gf9FsbhLhVNl1iVOGwjVBi4fg/exec";

let pendingSubmissionData = null;

/*
 * Spam protection. The honeypot is a field people never see, so only bots
 * fill it in. form_elapsed_ms lets the Apps Script reject submissions sent
 * faster than a person could fill the form. Both are checked again in the
 * Apps Script, because a bot can post to the endpoint without this page.
 */
const honeypotInput = document.getElementById("company-fax");
const pageLoadedAt = Date.now();

/*
 * Wake the Apps Script while the form is being filled in. After a few idle
 * minutes Google can take ~20 seconds to start it; a quick GET (answered by
 * doGet) moves that wait off the submit button. Repeated at most every two
 * minutes while the person is still working on the form. no-cors because the
 * reply is never read.
 */
const WARM_UP_INTERVAL_MS = 120000;
let lastWarmUpAt = 0;

function warmUpEndpoint() {
  if (Date.now() - lastWarmUpAt < WARM_UP_INTERVAL_MS) {
    return;
  }

  lastWarmUpAt = Date.now();
  fetch(GOOGLE_SCRIPT_URL, { method: "GET", mode: "no-cors", cache: "no-store" }).catch(() => {});
}

warmUpEndpoint();
form.addEventListener("focusin", warmUpEndpoint);

  /* Back button */

backButton.addEventListener("click", () => {
  window.location.href = "../RoleSelection/roles.html";
});


/* Full name */

function validateFullName() {
  const name = fullNameInput.value.trim();

  fullNameInput.setCustomValidity(
    name.length < 2
      ? "Please enter your full name."
      : ""
  );
}

fullNameInput.addEventListener("input", validateFullName);


/* Email */

function validateEmail() {
  emailInput.setCustomValidity("");

  if (!emailInput.value.trim()) {
    emailInput.setCustomValidity(
      "Please enter your email address."
    );
  } else if (emailInput.validity.typeMismatch) {
    emailInput.setCustomValidity(
      "Please enter a valid email address."
    );
  }
}

emailInput.addEventListener("input", () => {
  emailInput.setCustomValidity("");
});

emailInput.addEventListener("blur", () => {
  emailInput.value = emailInput.value.trim();
  validateEmail();
});


/* UK postcode formatting */

postcodeInput.addEventListener("blur", () => {
  const postcode = postcodeInput.value
    .trim()
    .toUpperCase()
    .replace(/\s+/g, "");

  postcodeInput.value =
    postcode.length > 3
      ? `${postcode.slice(0, -3)} ${postcode.slice(-3)}`
      : postcode;
});


/* Checkbox questions */

function setupCheckboxQuestions() {
  const questions =
    document.querySelectorAll(".checkbox-question");

  questions.forEach((question, questionIndex) => {
    const checkboxes = [
      ...question.querySelectorAll('input[type="checkbox"]')
    ];

    if (!checkboxes.length) {
      return;
    }

    const minimumSelections =
      Number(question.dataset.min || 0);

    const maximumSelections =
      Number(question.dataset.max || checkboxes.length);

    const validationTarget = checkboxes[0];
    const errorId = `checkbox-question-error-${questionIndex}`;
    let selectionError = document.getElementById(errorId);

    if (!selectionError) {
      selectionError = document.createElement("p");
      selectionError.id = errorId;
      selectionError.className = "checkbox-error hidden";
      selectionError.setAttribute("role", "alert");
      question.appendChild(selectionError);
    }

    checkboxes.forEach((checkbox) => {
      const describedBy = (
        checkbox.getAttribute("aria-describedby") || ""
      ).split(/\s+/).filter(Boolean);

      if (!describedBy.includes(errorId)) {
        checkbox.setAttribute(
          "aria-describedby",
          [...describedBy, errorId].join(" ")
        );
      }
    });

    function setSelectionError(message) {
      const hasError = Boolean(message);

      selectionError.textContent = message;
      selectionError.classList.toggle("hidden", !hasError);

      checkboxes.forEach((checkbox) => {
        checkbox.setAttribute("aria-invalid", String(hasError));
      });
    }

    const otherCheckbox =
      question.querySelector(".other-option");

    const otherGroup =
      question.querySelector(".other-input-group");

    const otherInput =
      otherGroup?.querySelector("input");

    function updateQuestion() {
      const selectedCount =
        checkboxes.filter((checkbox) => checkbox.checked).length;

      validationTarget.setCustomValidity(
        selectedCount < minimumSelections
          ? "Please select at least one option."
          : ""
      );

      if (!otherCheckbox || !otherGroup || !otherInput) {
        return;
      }

      const otherSelected = otherCheckbox.checked;

      otherGroup.classList.toggle(
        "hidden",
        !otherSelected
      );

      otherInput.required = otherSelected;

      if (!otherSelected) {
        otherInput.value = "";
        otherInput.setCustomValidity("");
      } else {
        otherInput.setCustomValidity(
          otherInput.value.trim()
            ? ""
            : "Please provide an answer."
        );
      }
    }

    checkboxes.forEach((checkbox) => {
      checkbox.addEventListener("change", () => {
        const selectedCount =
          checkboxes.filter(
            (option) => option.checked
          ).length;

        if (selectedCount > maximumSelections) {
          checkbox.checked = false;

          setSelectionError(
            `Please select up to ${maximumSelections} options.`
          );
        } else {
          setSelectionError("");
        }

        updateQuestion();
      });
    });

    otherInput?.addEventListener("input", updateQuestion);

    updateQuestion();
  });
}

setupCheckboxQuestions();


/* Form submission */

/* Prepare form data */

function createSubmissionData() {
  const formData = new FormData(form);
  const submissionData = new URLSearchParams();

  submissionData.append("form_type", "customer");
  submissionData.append(
    "form_elapsed_ms",
    String(Date.now() - pageLoadedAt)
  );
  submissionData.append(
    "submission_id",
    window.crypto?.randomUUID?.() || `${Date.now()}-${Math.random()}`
  );

  const groupedFields = new Map();

  for (const [name, value] of formData.entries()) {
    const cleanedValue = String(value).trim();

    /*
     * Converts names such as certifications[]
     * into certifications if brackets are ever used.
     */
    const normalisedName = name.endsWith("[]")
      ? name.slice(0, -2)
      : name;

    if (!groupedFields.has(normalisedName)) {
      groupedFields.set(normalisedName, []);
    }

    if (cleanedValue) {
      groupedFields.get(normalisedName).push(cleanedValue);
    }
  }

  for (const [name, values] of groupedFields.entries()) {
    submissionData.append(name, values.join(", "));
  }

  return submissionData;
}


/*
 * Submission reliability. The Apps Script can take several seconds to answer,
 * and under load Google sometimes returns an error page instead of the JSON
 * confirmation. Each attempt is capped at SUBMIT_TIMEOUT_MS and a failed
 * attempt is retried with the same submission_id, which the Apps Script uses
 * to ignore repeats, so a retry can never save the sign-up twice.
 */
const SUBMIT_TIMEOUT_MS = 25000;
const RETRY_DELAYS_MS = [1500, 4000];
const SLOW_NOTICE_MS = 5000;

function wait(milliseconds) {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}

/* The Apps Script must return CORS-enabled JSON: { "success": true }. */

async function submitOnce(submissionData) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), SUBMIT_TIMEOUT_MS);

  try {
    const response = await fetch(GOOGLE_SCRIPT_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
      },
      body: submissionData,
      signal: controller.signal
    });

    if (!response.ok) {
      throw new Error(`The server returned ${response.status}.`);
    }

    let result;

    try {
      result = await response.json();
    } catch {
      throw new Error("The server did not return a valid confirmation.");
    }

    if (result?.success !== true) {
      throw new Error("The server did not confirm the submission.");
    }
  } finally {
    clearTimeout(timeout);
  }
}

async function submitWaitlist(submissionData) {
  for (let attempt = 0; ; attempt += 1) {
    try {
      await submitOnce(submissionData);
      return;
    } catch (error) {
      if (attempt >= RETRY_DELAYS_MS.length) {
        throw error;
      }

      console.warn(`Waitlist submission attempt ${attempt + 1} failed, retrying:`, error);
      await wait(RETRY_DELAYS_MS[attempt]);
    }
  }
}


/* Display success screen */

const prefersReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
);

/*
 * Waits for a CSS transition to finish, with a timer as a backstop so the
 * swap still happens if the transition never fires (reduced motion, a
 * backgrounded tab, or a browser that skips it).
 */
function afterTransition(element, fallbackDelay) {
  return new Promise((resolve) => {
    if (prefersReducedMotion.matches) {
      resolve();
      return;
    }

    let settled = false;

    function finish() {
      if (settled) {
        return;
      }

      settled = true;
      element.removeEventListener("transitionend", finish);
      resolve();
    }

    element.addEventListener("transitionend", finish);
    setTimeout(finish, fallbackDelay);
  });
}

async function showSuccessMessage() {
  /* Fade the form out first so it does not disappear in a single frame */
  mainContent.classList.add("is-leaving");
  await afterTransition(mainContent, 350);

  document.body.classList.add("showing-success");
  mainContent.classList.add("hidden");
  successMessage.classList.remove("hidden");

  successMessage.focus();

  successMessage.scrollIntoView({
    behavior: prefersReducedMotion.matches ? "auto" : "smooth",
    block: "center"
  });
}


/* Restore submit button */

function resetSubmitButton() {
  submitButton.disabled = false;
  submitButton.classList.remove("is-submitting");
  submitButton.textContent = "Join the Waitlist";
}


function showSubmissionError() {
  const submissionError = document.getElementById("submissionError");

  submissionError.classList.remove("hidden");
  submitButton.textContent = "Try Again";
  submissionError.focus();
}

function clearSubmissionError() {
  document.getElementById("submissionError").classList.add("hidden");
}

/* A changed form is a new submission, so it gets a new idempotency key. */
form.addEventListener("input", () => {
  pendingSubmissionData = null;
  clearSubmissionError();
});

form.addEventListener("change", () => {
  pendingSubmissionData = null;
  clearSubmissionError();
});


/* Form submission */

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  validateFullName();
  validateEmail();

  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }

  /* A filled honeypot means a bot: show success so it moves on, send nothing */
  if (honeypotInput.value) {
    await showSuccessMessage();
    return;
  }

  submitButton.disabled = true;
  submitButton.classList.add("is-submitting");
  submitButton.textContent = "Submitting...";

  /* Reassure people who are left waiting, so they don't leave or resubmit */
  const slowNotice = setTimeout(() => {
    submitButton.textContent = "Still saving...";
  }, SLOW_NOTICE_MS);

  const submissionData = pendingSubmissionData || createSubmissionData();
  pendingSubmissionData = submissionData;
  clearSubmissionError();

  try {
    await submitWaitlist(submissionData);
    clearTimeout(slowNotice);

    form.reset();
    pendingSubmissionData = null;

    await showSuccessMessage();
  } catch (error) {
    clearTimeout(slowNotice);
    console.error("Customer waitlist submission failed:", error);

    resetSubmitButton();
    showSubmissionError();
  }
});
