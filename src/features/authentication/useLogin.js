import { useMutation } from "@tanstack/react-query";
import { login as loginApi } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export function useLogin() {
  const navigate = useNavigate();
  const { mutate: login, isLoading } = useMutation({
    mutationFn: async ({ email, password }) => {
      try {
        return await loginApi({ email, password });
      } catch (error) {
        throw new Error(
          error?.response?.data?.message || "An unknown error occurred"
        );
      }
    },
    onSuccess: () => {
      toast.success("Login successful!");
      navigate("/dashboard");
    },
    onError: (err) => {
      console.log("Error", err);
      toast.error("Provided email or password are incorrect");
    },
  });

  return { login, isLoading };
}
