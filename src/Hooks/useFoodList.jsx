import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosPublic from "./useAxiosPublic";

const useFoodList = (restaurantId) => {
    const axiosPublic = useAxiosPublic();
    const { user } = useAuth();

    const { data: FoodList = [], isLoading, refetch } = useQuery({
        queryKey: ["FoodList", user?.email, restaurantId], // ✅ Query Key Updated
        queryFn: async () => {
            if (!restaurantId) return []; // ✅ Restaurant ID না থাকলে ফেচ করো না
            const res = await axiosPublic.get(`/admin/restaurant/${restaurantId}/foods`);
            return res.data.data;
        },
        enabled: !!restaurantId, // ✅ Restaurant ID না থাকলে Query চালু হবে না
    });

    return [FoodList, isLoading, refetch];
};

export default useFoodList;
