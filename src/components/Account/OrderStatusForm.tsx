import React from "react";
import { useForm } from "react-hook-form";
import { StatusRequest } from "../../@types/types";
import { Status } from "../../enums/enums";

interface OrderStatusFormProps {
  orderId: number;
  initialStatus: string;
  onSubmit: (data: StatusRequest) => void;
}

/**
 * `OrderStatusForm` Component
 * Provides a form for updating the status of an order. It is primarily used within the admin interface to allow quick status changes directly from the order list view.
 *
 * Features:
 * - Allows selection of a new status for an order from a dropdown menu.
 * - Automatically submits the form upon status selection to immediately apply changes.
 * - Stops propagation of click events to prevent triggering any parent element's onClick actions.
 * - Uses `react-hook-form` for form handling with `onChange` mode for immediate feedback and controlled component behavior.
 * - Dynamically sets the form's orderId to ensure the correct order is updated.
 * - Supports status values from the `Status` enum, ensuring type safety and correctness.
 */

const OrderStatusForm = ({ orderId, onSubmit }: OrderStatusFormProps) => {
  const { handleSubmit, register, setValue } = useForm<StatusRequest>({
    mode: "onChange",
    defaultValues: {
      orderId: orderId,
      status: "",
    },
  });

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setValue("orderId", orderId, {
      shouldValidate: true,
      shouldDirty: true,
    });
    setValue("status", event.target.value as Status, {
      shouldValidate: true,
      shouldDirty: true,
    });
    handleSubmit(onSubmit)();
  };

  const handleClick = (event: React.MouseEvent) => {
    event.stopPropagation();
  };

  return (
    <form
      className="dark:text-white flex-1 p-2 md:p-0"
      onClick={handleClick}
      onSubmit={handleSubmit(onSubmit)}
    >
      <input type="hidden" {...register("orderId")} />
      <select
        className="md:my-1"
        {...register("status")}
        defaultValue=""
        onChange={handleChange}
        onClick={handleClick}
      >
        <option value="" disabled>
          Select status
        </option>
        <option value={Status.PENDING}>{Status.PENDING}</option>
        <option value={Status.APPROVED}>{Status.APPROVED}</option>
        <option value={Status.DECLINED}>{Status.DECLINED}</option>
      </select>
    </form>
  );
};

export default OrderStatusForm;
