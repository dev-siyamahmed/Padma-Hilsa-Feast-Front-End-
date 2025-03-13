import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
// import useAxiosSecure from "./useAxiosSecure";
import useAxiosPublic from "./useAxiosPublic";

const useCurrentUser = () => {

    const axiosPublic = useAxiosPublic();
    // const axiosSecure = useAxiosSecure()
    const { user } = useAuth();

    console.log("user" , user);

    const { data: currentUser = {}, isLoading: userLoading, refetch } = useQuery({
        queryKey: ["currentUser", user?.email],
        queryFn: async () => {
            const res = await axiosPublic.get(`/user/profile/${user?.email}`);
            // console.log(res.data);
            return res.data;

        },
    });

    return { currentUser, userLoading, refetch };
};

export default useCurrentUser;
