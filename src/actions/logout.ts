import { axiosPrivate } from "@/api/axios";

const logoutFunc = async () => {
  try {
    const response = await axiosPrivate.post("/logout/");
    if (response.status === 200 || response.status === 204) {
      console.log("Logout successful");
    }
  } catch (error) {
    console.error("Error logging out:", error);
  }
};

export default logoutFunc;
