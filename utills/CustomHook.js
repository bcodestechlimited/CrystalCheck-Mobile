import { useSelector } from "react-redux";

export const useUserProfile = () => {
  const { user_profile_data } = useSelector((state) => state?.Auth);

  let userProfileData = user_profile_data?.data?.user;

  return { userProfileData };
};
