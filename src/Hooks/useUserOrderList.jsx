import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosPublic from "./useAxiosPublic";

const useUserOrderList = () => {
    const axiosPublic = useAxiosPublic();
    const { user } = useAuth();

    const { data: userOrderList = [], isLoading, refetch: userOrderRefetch } = useQuery({
        queryKey: ["userOrderList", user?.email,],
        queryFn: async () => {
            const res = await axiosPublic.get(`/user/order/list/${user?.email}`);
            console.log(res);
            return res?.data?.orders;
        },
    });

    return [userOrderList, isLoading, userOrderRefetch];
};

export default useUserOrderList;
