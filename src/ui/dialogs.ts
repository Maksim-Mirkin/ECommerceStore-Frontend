import Swal from "sweetalert2";

/**
 * Displays a success alert with a custom message.
 *
 * @param message The message to display in the success alert.
 * @returns Promise A promise that resolves when the alert is closed.
 */
function success(message: string) {
  return Swal.fire({
    title: "Success!",
    text: message,
    icon: "success",
    showConfirmButton: true,
  });
}

/**
 * Displays an error alert. The message can be a string or an object containing a message property.
 * Defaults to a generic error message if no specific message is provided or extracted.
 *
 * @param message The error message or object containing a message property.
 * @returns Promise A promise that resolves when the alert is closed.
 */
function error(message: string | unknown = "something went wrong") {
  let msg = "something went wrong";
  if (
    message != null &&
    typeof message === "object" &&
    "message" in message &&
    typeof message.message === "string"
  ) {
    msg = message.message;
  }

  if (typeof message === "string") {
    msg = message;
  }

  return Swal.fire({
    icon: "error",
    title: "Error!",
    text: msg,
    showConfirmButton: true,
  });
}

/**
 * Displays a warning alert with a custom message.
 *
 * @param message The message to display in the warning alert.
 * @returns Promise A promise that resolves when the alert is closed.
 */
function warning(message: string) {
  return Swal.fire({
    icon: "warning",
    title: "Warning!",
    text: message,
    showConfirmButton: true,
  });
}

/**
 * Displays a confirmation dialog with a custom message. Executes different callbacks based on the user's choice.
 *
 * @param message The message to display in the confirmation dialog.
 * @param handleConfirm The callback function to execute if the user confirms the action.
 * @param handleCancel The callback function to execute if the user denies the action.
 * @returns Promise A promise that resolves with the result of the user's choice.
 */
function confirm(
  message: string,
  handleConfirm: () => void,
  handleCancel: () => void
) {
  return Swal.fire({
    title: "Are you sure?",
    text: message,
    icon: "warning",
    showDenyButton: true,
    confirmButtonText: "Let's do it!",
    denyButtonText: "Cancel",
  }).then((result) => {
    if (result.isConfirmed) {
      handleConfirm();
    } else if (result.isDenied) {
      handleCancel();
    }
  });
}

// Exporting all dialog functions as a grouped object
export const Dialogs = { success, error, warning, confirm };
