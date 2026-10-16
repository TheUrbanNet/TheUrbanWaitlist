const form = document.getElementById("waitlistForm");
const submitButton = document.getElementById("submitBtn");
const mainContent = document.querySelector(".main-content");
const successMessage = document.getElementById("successMessage");
const postcodeInput = document.getElementById("postcode");

const backButton = document.getElementById("backToRoleSelection");

const addCertificationButton = document.getElementById("add-certification");

const certificationList = document.getElementById("certification-list");

const primaryCategory = document.getElementById("primary-category");

const otherCategoryGroup = document.getElementById("otherCategoryGroup");

const otherCategoryInput = document.getElementById("otherCategory");

const businessNameInput = document.getElementById("business-name");

const businessEmailInput = document.getElementById("business-email");

const portfolioLinks = document.querySelectorAll(".portfolio-link");

/* Back button */

backButton.addEventListener("click", () => {
  window.location.href = "../RoleSelection/roles.html";
});

/* Certifications */

function updateCertificationAccessibility() {
  const certificationItems = certificationList.querySelectorAll(
    ".certification-item",
  );

  certificationItems.forEach((item, index) => {
    const number = index + 1;
    const input = item.querySelector('input[name="certifications[]"]');
    const label = item.querySelector("label");
    const removeButton = item.querySelector(".remove-certification");

    input.id = `certification-${number}`;
    label.htmlFor = input.id;
    label.textContent = `Certification ${number}`;
    removeButton.setAttribute("aria-label", `Remove certification ${number}`);
  });
}

addCertificationButton.addEventListener("click", () => {
  const certificationItem = document.createElement("div");

  certificationItem.className = "certification-item";

  certificationItem.innerHTML = `
    <label class="sr-only" for="certification-new">Certification</label>
    <input
      type="text"
      id="certification-new"
      name="certifications[]"
      placeholder="e.g. Certified Makeup Artist"
      maxlength="100"
    >

    <button type="button" class="remove-certification">
      Remove
    </button>
  `;

  certificationList.appendChild(certificationItem);
  updateCertificationAccessibility();
});

certificationList.addEventListener("click", (event) => {
  const removeButton = event.target.closest(".remove-certification");

  if (!removeButton) {
    return;
  }

  const certificationItems = certificationList.querySelectorAll(
    ".certification-item",
  );

  if (certificationItems.length > 1) {
    removeButton.closest(".certification-item").remove();
    updateCertificationAccessibility();
  }
});

updateCertificationAccessibility();

/* Main service: Other */

function updateOtherCategory() {
  const otherSelected = primaryCategory.value === "other";

  otherCategoryGroup.classList.toggle("hidden", !otherSelected);

  otherCategoryInput.required = otherSelected;

  if (!otherSelected) {
    otherCategoryInput.value = "";
  }
}

primaryCategory.addEventListener("change", updateOtherCategory);

updateOtherCategory();

/* Checkbox questions */

function setupCheckboxQuestions() {
  const questions = document.querySelectorAll(".checkbox-question");

  questions.forEach((question, questionIndex) => {
    const checkboxes = question.querySelectorAll('input[type="checkbox"]');

    const maximumSelections = Number(question.dataset.max);

    const minimumSelections = Number(question.dataset.min || 0);

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

    const otherCheckbox = question.querySelector(".other-option");

    const otherInputGroup = question.querySelector(".other-input-group");

    const otherInput = otherInputGroup?.querySelector("input");

    function updateSelectionValidity() {
      const selectedCount = question.querySelectorAll(
        'input[type="checkbox"]:checked',
      ).length;

      validationTarget.setCustomValidity(
        selectedCount < minimumSelections
          ? "Please select at least one option."
          : "",
      );
    }

    function updateOtherInput() {
      if (!otherCheckbox || !otherInputGroup || !otherInput) {
        return;
      }

      const otherSelected = otherCheckbox.checked;

      otherInputGroup.classList.toggle("hidden", !otherSelected);

      otherInput.required = otherSelected;

      if (!otherSelected) {
        otherInput.value = "";
      }
    }

    checkboxes.forEach((checkbox) => {
      checkbox.addEventListener("change", () => {
        const selectedCount = question.querySelectorAll(
          'input[type="checkbox"]:checked',
        ).length;

        if (selectedCount > maximumSelections) {
          checkbox.checked = false;

          setSelectionError(
            `Please select up to ${maximumSelections} options.`,
          );
        } else {
          setSelectionError("");
        }

        updateOtherInput();
        updateSelectionValidity();
      });
    });

    updateOtherInput();
    updateSelectionValidity();
  });
}
setupCheckboxQuestions();

// Form Input Validation
function validateBusinessName() {
  const businessName = businessNameInput.value.trim();

  let errorMessage = "";

  if (!businessName) {
    errorMessage = "Please enter your business name.";
  } else if (businessName.length < 2) {
    errorMessage = "Business name must be at least 2 characters.";
  } else if (businessName.length > 80) {
    errorMessage = "Business name must be 80 characters or fewer.";
  }

  businessNameInput.setCustomValidity(errorMessage);

  return !errorMessage;
}

businessNameInput.addEventListener("input", validateBusinessName);

function validateBusinessEmail() {
  businessEmailInput.setCustomValidity("");

  const email = businessEmailInput.value.trim();

  if (!email) {
    businessEmailInput.setCustomValidity("Please enter your business email.");
  } else if (businessEmailInput.validity.typeMismatch) {
    businessEmailInput.setCustomValidity("Please enter a valid email address.");
  }

  return businessEmailInput.checkValidity();
}

businessEmailInput.addEventListener("input", () => {
  businessEmailInput.setCustomValidity("");
});

businessEmailInput.addEventListener("blur", () => {
  businessEmailInput.value = businessEmailInput.value.trim();

  validateBusinessEmail();
});

postcodeInput.addEventListener("blur", () => {
  const postcode = postcodeInput.value.trim().toUpperCase().replace(/\s+/g, "");

  postcodeInput.value =
    postcode.length > 3
      ? `${postcode.slice(0, -3)} ${postcode.slice(-3)}`
      : postcode;
});

otherCategoryInput.addEventListener("input", () => {
  const isEmpty = !otherCategoryInput.value.trim();

  otherCategoryInput.setCustomValidity(
    primaryCategory.value === "other" && isEmpty
      ? "Please specify your main service."
      : "",
  );
});

function validatePortfolioLinks() {
  const hasLink = [...portfolioLinks].some((input) => input.value.trim());

  portfolioLinks[0].setCustomValidity(
    hasLink
      ? ""
      : "Please provide at least one portfolio or social media link.",
  );
}

portfolioLinks.forEach((input) => {
  input.addEventListener("input", validatePortfolioLinks);
});

validatePortfolioLinks();

/* Form submission */

/* Google Apps Script web app URL */

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

/* Prepare form data */

function createSubmissionData() {
  const formData = new FormData(form);
  const submissionData = new URLSearchParams();

  submissionData.append("form_type", "business");
  submissionData.append(
    "form_elapsed_ms",
    String(Date.now() - pageLoadedAt),
  );
  submissionData.append(
    "submission_id",
    window.crypto?.randomUUID?.() || `${Date.now()}-${Math.random()}`,
  );

  /*
   * Group fields that can have multiple values,
   * such as checkboxes and certifications.
   */
  const groupedFields = new Map();

  for (const [name, value] of formData.entries()) {
    const cleanedValue = String(value).trim();

    // Converts certifications[] into certifications
    const normalisedName = name.endsWith("[]") ? name.slice(0, -2) : name;

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
  "(prefers-reduced-motion: reduce)",
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

  mainContent.classList.add("hidden");
  successMessage.classList.remove("hidden");

  successMessage.focus();

  successMessage.scrollIntoView({
    behavior: prefersReducedMotion.matches ? "auto" : "smooth",
    block: "center",
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

  validateBusinessName();
  validateBusinessEmail();
  validatePortfolioLinks();

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

    updateOtherCategory();
    validatePortfolioLinks();

    await showSuccessMessage();
  } catch (error) {
    clearTimeout(slowNotice);
    console.error("Waitlist submission failed:", error);

    resetSubmitButton();
    showSubmissionError();
  }
});
