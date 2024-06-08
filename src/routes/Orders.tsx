import { useLocation, useNavigate } from "react-router-dom";
import { Order, RatingRequest } from "../@types/types";
import { IoArrowBackCircle } from "react-icons/io5";
import { Rating } from "@mui/material";
import { SyntheticEvent, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { RatingService } from "../services";
import { Dialogs } from "../ui/dialogs";

/**
 * Orders Route
 * Displays details for a specific order, allowing users to view and rate individual products within the order.
 * Utilizes navigation and location hooks from React Router to manage routing and state transitions.
 *
 * Features include:
 * - Displaying order details such as product images, names, quantities, and subtotals.
 * - Integrating a rating system for products within the order, where users can submit new ratings or update existing ones.
 * - Handling user interactions with confirm dialogs and displaying success or error messages accordingly.
 * - Using the RatingService to post or update product ratings and fetch existing ratings.
 */
const Orders = () => {
  const location = useLocation();
  const nav = useNavigate();
  const { specificOrder } = location.state as { specificOrder: Order };

  const onSubmitNewRaing = async (data: RatingRequest) => {
    Dialogs.confirm(
      "Do you want to change the rating of this product?",
      async () => {
        try {
          await RatingService.postRating(data);
          Dialogs.success("Rating updated successfully!");
        } catch (e) {
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
  const onSubmitUpdateRaing = async (data: RatingRequest) => {
    Dialogs.confirm(
      "Do you want to change the rating of this product?",
      async () => {
        try {
          await RatingService.updateRating(data);
          Dialogs.success("Rating updated successfully!");
        } catch (e) {
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
    <div className="relative">
      <button
        className="absolute -top-2 left-2 z-50"
        onClick={() => nav(-1)}
        aria-label="Go back"
      >
        <IoArrowBackCircle className="size-12 text-primary-regular dark:text-primary-light hover:scale-125" />
      </button>
      {specificOrder && (
        <div key={specificOrder.id}>
          <h2 className="text-center my-4">Order ID: {specificOrder.id}</h2>
          <div className="md:flex flex-wrap md:justify-center">
            {specificOrder.items.map((item) => {
              const [productRating, setProductRating] = useState(0);

              const fetchData = async () => {
                try {
                  const res = (
                    await RatingService.fetchRatingByProductId(item.product.id)
                  ).rating;
                  setProductRating(res);
                } catch (e) {
                  if (
                    e != null &&
                    typeof e == "object" &&
                    "status" in e &&
                    e["status"] === 404
                  ) {
                    console.clear(); //Api returns 404 if no rating is found
                  } else if (
                    e != null &&
                    typeof e == "object" &&
                    "message" in e &&
                    typeof e["message"] == "string"
                  ) {
                    Dialogs.error(e.message);
                  }
                }
              };

              useEffect(() => {
                fetchData();
              }, []);
              const { control } = useForm<RatingRequest>({
                mode: "onChange",
                defaultValues: {
                  rating: productRating.toString(),
                },
              });

              return (
                <div
                  key={item.id}
                  className="flex flex-col mb-4 mx-2 items-center border border-primary-regular dark:border-white
               shadow-lg shadow-primary-regular dark:shadow-white rounded-2xl hover:bg-slate-200 dark:hover:bg-slate-600 cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    nav(`/products/${item.product.id}`);
                  }}
                >
                  <div className="flex flex-col">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="size-64 object-scale-down mx-auto mb-2"
                    />
                    <div className="flex items-center gap-2 px-2">
                      <h2>Product: {item.product.name}</h2>
                      <p className="text-xl">x{item.quantity}</p>
                    </div>
                    <h2 className="px-2">Subtotal: {item.subTotal}$</h2>
                    <div className="self-center mb-4 mt-2 flex gap-2 items-center">
                      <h2>Your rating:</h2>
                      <Controller
                        name="rating"
                        control={control}
                        defaultValue={item.product.averageRating}
                        rules={{ required: true }}
                        render={() => (
                          <Rating
                            name="rating"
                            size="large"
                            value={productRating}
                            onClick={(e) => {
                              e.stopPropagation();
                            }}
                            onChange={(
                              _: SyntheticEvent<Element, Event>,
                              value: number | null
                            ) => {
                              if (productRating > 0) {
                                onSubmitUpdateRaing({
                                  productId: item.product.id,
                                  rating: value?.toString() ?? "0",
                                });
                              } else {
                                onSubmitNewRaing({
                                  productId: item.product.id,
                                  rating: value?.toString() ?? "0",
                                });
                              }
                            }}
                            sx={{
                              "& .MuiRating-iconFilled": { color: "#FBBF24" },
                            }}
                          />
                        )}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default Orders;
