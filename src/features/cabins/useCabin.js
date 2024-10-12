import { useQuery } from "@tanstack/react-query";
import { getCabins } from "../../services/apiCabins";

export default function useCabin() {
  const {
    isLoading,
    data: cabins,
    error,
  } = useQuery({
    queryKey: ["cabins"], // Updated query key to match with CreateCabinForm
    queryFn: getCabins,
  });

  return { isLoading, error, cabins };
}
