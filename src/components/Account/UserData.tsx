import { useContext, useState } from "react";
import { AuthContext } from "../../contexts";
import {
  ChangePasswordRequest,
  UpdateUserDataRequest,
} from "../../@types/types";
import { SubmitHandler, useForm } from "react-hook-form";
import InputField from "../InputField";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { Dialogs } from "../../ui/dialogs";
import { Auth } from "../../services";

interface UserDataForm {
  username: string;
  email: string;
  userImage: string;
}

const UserData = () => {
  const { user, logout } = useContext(AuthContext);

  const [openDialog, setOpenDialog] = useState(false);

  const handleClickOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserDataForm>({
    mode: "onBlur",
  });

  const onSubmit: SubmitHandler<UserDataForm> = async (data) => {
    Dialogs.confirm(
      "Are you sure you want to update your data? You will have to login again!",
      async () => {
        const updateData: UpdateUserDataRequest = {
          oldUsername: user?.username as string,
          newUsername: data.username,
          email: data.email,
          userImage: data.userImage,
        };

        try {
          await Auth.updateUserDetails(updateData);
          Dialogs.success(
            "Your data updated successfully! Now you have to login again."
          );
          logout();
        } catch (e: unknown) {
          if (
            e != null &&
            typeof e == "object" &&
            "message" in e &&
            typeof e["message"] == "string"
          ) {
            Dialogs.error(e.message);
          } else {
            Dialogs.error("An unexpected error occurred. Please try again.");
          }
        }
      },
      () => {
        return;
      }
    );
  };

  const {
    register: registerDialog,
    handleSubmit: handleSubmitDialog,
    formState: { errors: dialogErrors },
  } = useForm<ChangePasswordRequest>({
    mode: "onBlur",
  });

  const onDialogSubmit: SubmitHandler<ChangePasswordRequest> = async (data) => {
    if (data.newPassword !== data.confirmNewPassword) {
      handleCloseDialog();
      Dialogs.error("Password and confirm password do not match");
      return;
    }
    data.username = user?.username as string;
    try {
      await Auth.changePassword(data);

      Dialogs.success("Password changed successfully!");
    } catch (e: unknown) {
      if (
        e != null &&
        typeof e == "object" &&
        "message" in e &&
        typeof e["message"] == "string"
      ) {
        Dialogs.error(e.message);
      } else {
        Dialogs.error("An unexpected error occurred. Please try again.");
      }
    } finally {
      handleCloseDialog();
    }
  };

  return (
    <div className="flex flex-col items-center">
      <h2 className="my-4">Personal Data</h2>
      <img
        src={user?.userImage}
        alt="User Avatar"
        className="size-48 sm:size-80 rounded-full"
      />
      <form
        noValidate
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col items-center my-4 sm:w-3/4 md:grid md:grid-cols-2"
      >
        <InputField
          register={register}
          errors={errors}
          name="username"
          placeholder="Username"
          defaultValue={user?.username}
          aria-label="Username"
          className="md:col-span-1"
        />
        <InputField
          pattern={{
            message: "Email must be valid",
            value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
          }}
          register={register}
          errors={errors}
          name="email"
          placeholder="Email"
          defaultValue={user?.email}
          aria-label="Email"
          className="md:col-span-1"
        />
        <InputField
          register={register}
          errors={errors}
          name="userImage"
          placeholder="User Avatar"
          defaultValue={user?.userImage}
          aria-label="User Avatar"
          className="md:col-span-2"
        />
        <div className="md:col-span-2 mt-4 w-full flex justify-around flex-col md:flex-row">
          <button className="action-button md:w-40" type="submit">
            Update Data
          </button>
          <button
            className="action-button md:w-40"
            type="button"
            onClick={handleClickOpenDialog}
          >
            Change Password
          </button>
        </div>
      </form>
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        PaperProps={{
          component: "form",
          onSubmit: handleSubmitDialog(onDialogSubmit),
        }}
        classes={{ paper: "dark:bg-slate-600" }}
      >
        <DialogTitle className="text-center">Change Password</DialogTitle>
        <DialogContent>
          <InputField
            register={registerDialog}
            errors={dialogErrors}
            name="oldPassword"
            type="password"
            pattern={{
              value:
                /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[*!@$%^&_]).{8,32}$/,
              message:
                "Your password must be 8-32 characters long and include at least one lowercase letter, one uppercase letter, one digit, and one special character.",
            }}
            placeholder="Old Password"
            aria-label="Old Password"
          />
          <InputField
            register={registerDialog}
            errors={dialogErrors}
            name="newPassword"
            type="password"
            pattern={{
              value:
                /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[*!@$%^&_]).{8,32}$/,
              message:
                "Your password must be 8-32 characters long and include at least one lowercase letter, one uppercase letter, one digit, and one special character.",
            }}
            placeholder="New Password"
            aria-label="New Password"
          />
          <InputField
            register={registerDialog}
            errors={dialogErrors}
            name="confirmNewPassword"
            type="password"
            placeholder="Confirm New Password"
            aria-label="Confirm New Password"
          />
        </DialogContent>
        <DialogActions className="flex justify-center">
          <button className="action-button" onClick={handleCloseDialog} type="button">
            Cancel
          </button>
          <button className="action-button" type="submit">
            Change Password
          </button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default UserData;
