import { useNavigate } from "react-router-dom";
import { ProductService } from "../../services";
import { Dialogs } from "../../ui/dialogs";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import InputField from "../InputField";
import { useState } from "react";
import { Product, ProductRequest } from "../../@types/types";
import { SubmitHandler, useForm } from "react-hook-form";
import { preventSymbols } from "../../utils/inputUtils";

import { DemoProduct } from "../Account";
import { IoMdClose } from "react-icons/io";
import AutoExpandingTextarea from "../AutoExpandingTextarea";

type AdminPanelProps = {
  product: Product;
};

const AdminPanel = ({ product }: AdminPanelProps) => {
  const nav = useNavigate();
  const [openDialog, setOpenDialog] = useState(false);
  const [price, setPrice] = useState<number | string>(product.price);
  const [imageURL, setImageURL] = useState<string>(product.image);
  const [name, setName] = useState<string>(product.name);
  const [openPreview, setOpenPreview] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ProductRequest>({
    mode: "onBlur",
  });

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleOpenPreview = () => {
    setOpenDialog(false);
    setOpenPreview(true);
  };

  const handleClosePreview = () => {
    setOpenPreview(false);
    setOpenDialog(true);
  };

  const deleteHandle = () => {
    Dialogs.confirm(
      "Do you want to delete this product?",
      async () => {
        try {
          await ProductService.deleteProduct(product.id);
          Dialogs.success("Product deleted successfully!");
          nav(-1);
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
    } else if (!isNaN(parseFloat(value))) {
      setPrice(value);
    }
  };

  const onSubmit: SubmitHandler<ProductRequest> = async (data) => {
    handleCloseDialog();
    Dialogs.confirm(
      "Are you sure you want to update your data? You will have to login again!",
      async () => {
        try {
          await ProductService.updateProduct(product.id, data);
          Dialogs.success("Product updated successfully!");
          window.location.reload();
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
        handleOpenDialog();
        return;
      }
    );
  };

  return (
    <div className="flex gap-4 mb-4">
      <button
        className="bg-accent-regular text-white rounded-xl flex-1 h-10 mb-4 min-w-32 max-w-40 hover-button"
        onClick={handleOpenDialog}
      >
        Change Product
      </button>
      <button
        className="bg-red-600 text-white rounded-xl flex-1 h-10 min-w-32 max-w-40 hover-button"
        onClick={deleteHandle}
      >
        Delete Product
      </button>
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        PaperProps={{
          component: "form",
          onSubmit: handleSubmit(onSubmit),
        }}
        classes={{ paper: "dark:bg-slate-600 sm:w-3/4" }}
      >
        <DialogTitle className="text-center">Update Product</DialogTitle>
        <DialogContent>
          <InputField
            register={register}
            errors={errors}
            name="name"
            aria-label="Name"
            minLength={2}
            maxLength={30}
            defaultValue={product.name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <InputField
            register={register}
            errors={errors}
            name="brand"
            aria-label="Brand"
            minLength={2}
            maxLength={30}
            defaultValue={product.brand}
            required
          />
          <InputField
            register={register}
            errors={errors}
            name="image"
            placeholder="Image URL"
            aria-label="Image URL"
            defaultValue={product.image}
            onChange={(e) => setImageURL(e.target.value)}
            required
          />
          <AutoExpandingTextarea
            register={register}
            errors={errors}
            name="description"
            minLength={2}
            maxLength={512}
            defaultValue={product.description}
            required
          />
          <InputField
            register={register}
            errors={errors}
            name="price"
            aria-label="Price"
            type="number"
            min={1}
            minLength={1}
            max={99999}
            step={0.01}
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
              {...register("category", { required: true })}
              defaultValue={product.category}
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
          <InputField
            register={register}
            errors={errors}
            defaultValue={product.memory}
            name="memory"
          />
          <InputField
            register={register}
            errors={errors}
            defaultValue={product.screenSize}
            name="screenSize"
          />
          <InputField
            register={register}
            errors={errors}
            defaultValue={product.batteryCapacity}
            name="batteryCapacity"
          />
          <InputField
            register={register}
            errors={errors}
            defaultValue={product.operatingSystem}
            name="operatingSystem"
          />
          <InputField
            register={register}
            errors={errors}
            defaultValue={product.color}
            name="color"
          />
        </DialogContent>
        <DialogActions className="flex justify-between">
          <button
            className="action-button"
            type="button"
            onClick={handleCloseDialog}
          >
            Cancel
          </button>
          <button className="action-button" type="submit">
            Update Product
          </button>
        </DialogActions>
        <DialogActions>
          <button
            className="action-button w-full"
            type="button"
            onClick={handleOpenPreview}
          >
            Preview
          </button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={openPreview}
        onClose={handleClosePreview}
        classes={{ paper: "dark:bg-slate-600 m-0 p-0" }}
      >
        <DialogTitle className="text-center flex w-full justify-between">
          <span className="text-3xl">Preview</span>
          <button className="justify-self-end" onClick={handleClosePreview}>
            <IoMdClose className="size-8 transition-all duration-300 ease-in-out hover:scale-125" />
          </button>
        </DialogTitle>
        <DialogContent className="p-0">
          <DemoProduct
            name={name}
            price={price}
            image={imageURL}
            averageRating={
              parseFloat(product.averageRating) === 0
                ? 4.9
                : parseFloat(product.averageRating)
            }
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminPanel;
