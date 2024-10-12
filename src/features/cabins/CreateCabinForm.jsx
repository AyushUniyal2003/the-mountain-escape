import { useForm, useWatch } from "react-hook-form";
import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import FormRowMain from "../../ui/FormRowMain";
import PropTypes from "prop-types";
import { useCreateCabin } from "./useCreateCabin";

export default function CreateCabinForm({ cabinToEdit = {}, onCloseModal }) {
  const { id: editId, ...editValues } = cabinToEdit;

  const isEditSession = Boolean(editId);

  const { register, handleSubmit, reset, control, formState } = useForm({
    defaultValues: isEditSession ? editValues : {},
  });

  const { errors } = formState;
  const regularPrice = useWatch({ control, name: "regularPrice" });

  // Use custom hook
  const { createOrEditCabin, isLoading } = useCreateCabin(isEditSession, reset);

  const isWorking = isLoading;

  async function onSubmit(data) {
    const image = typeof data.image === "string" ? data.image : data.image[0];
    // Await the result to ensure the cabin is created before closing the modal
    await createOrEditCabin({ newCabin: { ...data, image }, id: editId });

    // Call the onCloseModal function after successful submission
    onCloseModal?.();
  }

  return (
    <Form
      onSubmit={handleSubmit(onSubmit)}
      type={onCloseModal ? "modal" : "regular"}
    >
      {/* Form Fields */}
      <FormRowMain label="Cabin Name" error={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          disabled={isWorking}
          {...register("name", { required: "This field is required" })}
        />
      </FormRowMain>

      <FormRowMain label="Max Capacity" error={errors?.maxCapacity?.message}>
        <Input
          type="number"
          id="maxCapacity"
          disabled={isWorking}
          {...register("maxCapacity", {
            required: "This field is required",
            min: { value: 1, message: "Capacity should be at least 1" },
          })}
        />
      </FormRowMain>

      <FormRowMain label="Regular Price" error={errors?.regularPrice?.message}>
        <Input
          type="number"
          id="regularPrice"
          disabled={isWorking}
          {...register("regularPrice", {
            required: "This field is required",
            min: { value: 1, message: "Price should be at least 1" },
          })}
        />
      </FormRowMain>

      <FormRowMain label="Discount" error={errors?.discount?.message}>
        <Input
          type="number"
          id="discount"
          disabled={isWorking}
          defaultValue={0}
          {...register("discount", {
            required: "This field is required",
            validate: (value) =>
              value <= regularPrice ||
              "Discount should be less than regular price",
          })}
        />
      </FormRowMain>

      <FormRowMain
        label="Description for Website"
        error={errors?.description?.message}
      >
        <Textarea
          id="description"
          disabled={isWorking}
          {...register("description", { required: "This field is required" })}
        />
      </FormRowMain>

      <FormRowMain label="Cabin Photo" error={errors?.image?.message}>
        <FileInput
          id="image"
          accept="image/*"
          type="file"
          disabled={isWorking}
          {...register("image", {
            required: isEditSession ? false : "This field is required",
          })}
          name="image"
        />
      </FormRowMain>

      <FormRowMain>
        <Button
          variation="secondary"
          type="reset"
          disabled={isWorking}
          onClick={() => onCloseModal?.()}
        >
          Cancel
        </Button>
        <Button disabled={isWorking} type="submit">
          {isEditSession ? "Edit Cabin" : "Create new Cabin"}
        </Button>
      </FormRowMain>
    </Form>
  );
}

CreateCabinForm.propTypes = {
  cabinToEdit: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    maxCapacity: PropTypes.number,
    regularPrice: PropTypes.number,
    discount: PropTypes.number,
    description: PropTypes.string,
    image: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  }),
  onCloseModal: PropTypes.func.isRequired,
};
