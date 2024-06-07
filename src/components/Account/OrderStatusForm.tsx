import React from "react";
import { useForm } from "react-hook-form";
import { StatusRequest } from "../../@types/types";
import { Status } from "../../enums/enums";

interface OrderStatusFormProps {
  orderId: number;
  initialStatus: string;
  onSubmit: (data: StatusRequest) => void;
}

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
