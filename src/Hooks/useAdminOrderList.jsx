import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosPublic from "./useAxiosPublic";

const useAdminOrderList = () => {
    const axiosPublic = useAxiosPublic();
    const { user } = useAuth();

    const { data: adminOrderList = [], isLoading, refetch: AdminOrderRefetch } = useQuery({
        queryKey: ["adminOrderList", user?.email,],
        queryFn: async () => {
            const res = await axiosPublic.get(`/admin/order/list`);
            console.log(res);
            return res?.data?.orders;
        },
    });

    return [adminOrderList, isLoading, AdminOrderRefetch];
};

export default useAdminOrderList;
