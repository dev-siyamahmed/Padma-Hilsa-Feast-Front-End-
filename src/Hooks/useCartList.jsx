import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosPublic from "./useAxiosPublic";

const useCartList = () => {
    const axiosPublic = useAxiosPublic();
    const { user } = useAuth();

    const { data: cartList = [], isLoading, refetch } = useQuery({
        queryKey: ["cartList", user?.email],
        queryFn: async () => {
            if (!user?.email) return [];
            const res = await axiosPublic.get(`/user/cart/list/${user.email}`);
            return res?.data?.cart?.items || [];
        },
        enabled: !!user?.email, // Only run query if user email is available
        refetchOnMount: true, // ✅ Ensures cart refetches on component mount
        refetchOnWindowFocus: true, // ✅ Ensures cart refetches when switching tabs
        staleTime: 0, // ✅ Forces fresh data every time
    });

    return [cartList, isLoading, refetch];
};

export default useCartList;

