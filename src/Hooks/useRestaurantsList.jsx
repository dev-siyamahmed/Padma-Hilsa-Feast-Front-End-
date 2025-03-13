import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
// import useAxiosSecure from "./useAxiosSecure";
import useAxiosPublic from "./useAxiosPublic";

const useRestaurantsList = () => {

    const axiosPublic = useAxiosPublic();
    const { user } = useAuth();

    const { data: restaurantsList = [], isLoading, refetch } = useQuery({
        queryKey: ["RestaurantsList", user?.email],
        queryFn: async () => {
            const res = await axiosPublic.get(`/admin/restaurants/list`);
            console.log(res.data);
            return res.data.data;
        },
    });

    return [ restaurantsList, isLoading, refetch ];
};

export default useRestaurantsList;
