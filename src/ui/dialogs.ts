import Swal from "sweetalert2";

function success(message: string) {
  return Swal.fire({
      title: "Success!",
      text: message,
      icon: "success",
      showConfirmButton: true,
    });
}

function error(message: string | unknown = "something went wrong") {
  let msg = "something went wrong";
  if (
    message != null &&
    typeof message == "object" &&
    "message" in message &&
    typeof message.message == "string"
  ) {
    msg = message.message;
  }

  if (typeof message == "string") {
    msg = message;
  }

  return Swal.fire({
    icon: "error",
    title: "Error!",
    text: msg,
    showConfirmButton: true,
  });
}

function warning(message: string) {
  return Swal.fire({
    icon: "warning",
    title: "Warning!",
    text: message,
    showConfirmButton: true,
  });
}

function confirm(message: string, handleConfirm: () => void, handleCancel: () => void) {
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


export const Dialogs = { success, error, warning,confirm };
