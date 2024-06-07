import React from "react";
import InputField from "../InputField";
import { SubmitHandler, useForm } from "react-hook-form";

import DemoProduct from "./DemoProduct";
import { preventSymbols } from "../../utils/inputUtils";
import { Dialogs } from "../../ui/dialogs";
import { ProductService } from "../../services";
import { ProductRequest } from "../../@types/types";
import { isImageURL } from "../../utils/utils";
import AutoExpandingTextarea from "../AutoExpandingTextarea";
const AddProduct = () => {
  const [imageURL, setImageURL] = React.useState<string>("");
  const [name, setName] = React.useState<string>("");
  const [price, setPrice] = React.useState<number | string>(1);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<ProductRequest>({
    mode: "onBlur",
  });

  const onSubmit: SubmitHandler<ProductRequest> = async (data) => {
    Dialogs.confirm(
      "Is your product data correct? Do you want to add it?",
      async () => {
        try {
          await ProductService.addProduct(data);
          Dialogs.success("Product added successfully!");
          reset();
          setImageURL("");
          setName("");
          setPrice(1);
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

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    let value = parseFloat(e.target.value);
    if (isNaN(value) || value < 1) {
      value = 1;
    } else if (value > 99999) {
      value = 99999;
    }
    setPrice(value);
    setValue("price", value, { shouldValidate: true, shouldDirty: true });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === "") {
      setPrice("");
    } else {
      setPrice(parseFloat(value));
    }
  };

  return (
    <div className="flex flex-col items-center pt-4 pb-8">
      <h2 className="mb-4">Add Product</h2>

      <form
        noValidate
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col items-center w-3/4 mb-4"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
          <InputField
            register={register}
            errors={errors}
            name="name"
            aria-label="Name"
            minLength={2}
            maxLength={30}
            required
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          <InputField
            register={register}
            errors={errors}
            name="brand"
            aria-label="Brand"
            minLength={2}
            maxLength={30}
            required
          />
          <div className="col-span-1 md:col-span-2">
            <InputField
              register={register}
              errors={errors}
              name="image"
              placeholder="Image URL"
              aria-label="Image URL"
              required
              onChange={(e) => {
                setImageURL(e.target.value);
              }}
            />
          </div>
          <div className="col-span-1 md:col-span-2">
            <AutoExpandingTextarea
              register={register}
              errors={errors}
              name="description"
              minLength={2}
              maxLength={512}
              required
            />
          </div>
          <InputField
            register={register}
            errors={errors}
            name="price"
            aria-label="Price"
            type="number"
            min={1}
            minLength={1}
            max={99999}
            required
            value={price}
            onWheel={(e) => (e.target as HTMLInputElement).blur()}
            onBlur={handleBlur}
            onChange={handleChange}
            onKeyDown={preventSymbols}
          />
          <div className="mb-4 w-full px-4">
            <label htmlFor="category">Category</label>
            <select
              id="category"
              {...register("category", { required: "Category is required" })}
            >
              <option value="Laptop">Laptop</option>
              <option value="Cellular">Cellular</option>
              <option value="TV">TV</option>
              <option value="Headphone">Headphone</option>
            </select>
            {errors.category && (
              <span className="text-red-500">Category is required</span>
            )}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full col-span-1 md:col-span-2">
            <InputField register={register} errors={errors} name="memory" />
            <InputField register={register} errors={errors} name="screenSize" />
            <InputField
              register={register}
              errors={errors}
              name="batteryCapacity"
            />
          </div>
          <InputField
            register={register}
            errors={errors}
            name="operatingSystem"
          />
          <InputField register={register} errors={errors} name="color" />
        </div>
        <div>
          <button className="action-button mt-4">Add Product</button>
        </div>
      </form>
      <h2 className="mb-4">Preview</h2>
      <DemoProduct
        name={name}
        price={price}
        image={isImageURL(imageURL) ? imageURL : ""}
        averageRating={4.9}
      />
    </div>
  );
};

export default AddProduct;
