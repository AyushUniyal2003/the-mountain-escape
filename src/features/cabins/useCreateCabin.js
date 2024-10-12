import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addEditCabins } from "../../services/apiCabins";
import toast from "react-hot-toast";

export function useCreateCabin(isEditSession, reset) {
  const queryClient = useQueryClient();

  const { mutate: createOrEditCabin, isLoading } = useMutation({
    mutationFn: ({ newCabin, id }) => addEditCabins(newCabin, id),
    onSuccess: () => {
      toast.success(
        isEditSession ? "Cabin successfully edited" : "New cabin created"
      );
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
      reset();
    },
    onError: (err) => toast.error(err.message),
  });

  return { createOrEditCabin, isLoading };
}
