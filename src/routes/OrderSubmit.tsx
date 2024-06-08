import { SubmitHandler, useForm } from "react-hook-form";
import { OrderItem } from "../components/Order";
import { Dialogs } from "../ui/dialogs";
import { useEffect, useState } from "react";
import { OrderService } from "../services";
import { useNavigate } from "react-router-dom";
import { InputField } from "../components";
import { useShoppingCart } from "../hooks";

type OrderSubmitProps = {
  address: string;
  city: string;
  phoneNumber: string;
  paymentInformation: string;
  postalCode: string;
};
/**
 * OrderSubmit Route
 * Manages the order submission process for users within the shopping cart context.
 * This route includes form handling for order details such as address, payment information,
 * and phone number. It integrates with the OrderService to create orders based on the cart items
 * and navigates the user to their order history upon successful submission.
 *
 * Features validation and dynamic form updates to handle various payment methods, although
 * credit card payments are currently not available. Uses the Dialogs utility for user confirmations
 * and error handling.
 */
const OrderSubmit = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setValue,
  } = useForm<OrderSubmitProps>({
    mode: "onBlur",
  });

  const { cartItems, removeItem } = useShoppingCart();
  const [paymentInformation, setPaymentInformation] = useState<string>("Cash");
  const nav = useNavigate();

  useEffect(() => {
    const updateFormValues = () => {
      const inputs = document.querySelectorAll("input");
      inputs.forEach((input) => {
        if (input.value) {
          setValue(input.name as keyof OrderSubmitProps, input.value);
        }
      });
    };
    window.addEventListener("input", updateFormValues);
    return () => {
      window.removeEventListener("input", updateFormValues);
    };
  }, [setValue]);

  const onSubmit: SubmitHandler<OrderSubmitProps> = (data) => {
    if (paymentInformation === "creditCard") {
      return Dialogs.error(
        "Credit Card payment is not available at the moment. We apologize for the inconvenience. Please try again later."
      );
    }
    Dialogs.confirm(
      "Is everything correct? Shall we go ahead and place your order?",
      async () => {
        const orderItems = cartItems.map((item) => {
          return { productId: item.id, quantity: item.quantity };
        });
        const orderRequest = { orderItems, ...data };
        try {
          await OrderService.createOrder(orderRequest);
          Dialogs.success("Order created successfully!");
          reset();
          cartItems.forEach((item) => removeItem(item.id));
          nav("/account/orders");
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

  return (
    <>
      <h1 className="text-center my-4">Your Order</h1>
      <div className="flex flex-col md:flex-row justify-around items-center md:items-start">
        <div className="flex-1">
          <h2 className="text-center mb-4">Order Summary</h2>
          <div>
            {cartItems.map((item, index) => (
              <div key={item.id} className="mx-4 w-full">
                <OrderItem {...item} />
                {index === cartItems.length - 1 ? null : (
                  <hr className="my-2 border border-gray-300 mr-4" />
                )}
              </div>
            ))}
          </div>
        </div>
        <form
          className="flex flex-col gap-2 items-center"
          noValidate
          onSubmit={handleSubmit(onSubmit)}
        >
          <h2 className="text-center mb-4">Order Details</h2>
          <InputField register={register} errors={errors} name="address" />
          <InputField register={register} errors={errors} name="city" />
          <InputField
            register={register}
            errors={errors}
            name="phoneNumber"
            type="number"
            pattern={/^05\d{8}$/gm}
          />
          <InputField
            register={register}
            errors={errors}
            name="postalCode"
            type="number"
            pattern={/^\d{7}$/gm}
          />
          <div className="px-4 w-full mb-4">
            <label htmlFor="paymentInformation">Payment Information</label>
            <select
              id="paymentInformation"
              {...register("paymentInformation", {
                required: "Payment Information is required",
              })}
              value={paymentInformation}
              onChange={(e) => setPaymentInformation(e.target.value)}
            >
              <option value="Cash">Cash</option>
              <option value="creditCard">Credit Card</option>
            </select>
            {errors.paymentInformation && (
              <span className="text-red-500">
                Payment Information is required
              </span>
            )}
          </div>
          {paymentInformation === "creditCard" && (
            <>
              <InputField
                register={register}
                errors={errors}
                name="creditCardNumber"
                value={"Not Available"}
                disabled
              />
              <InputField
                register={register}
                errors={errors}
                name="creditCardName"
                value={"Not Available"}
                disabled
              />
              <InputField
                register={register}
                errors={errors}
                name="expirationDate"
                value={"Not Available"}
                disabled
              />
              <InputField
                register={register}
                errors={errors}
                name="CVV"
                value={"Not Available"}
                disabled
              />
            </>
          )}
          <button className="action-button" type="submit">
            Submit Order
          </button>
        </form>
      </div>
    </>
  );
};

export default OrderSubmit;
