import { Button } from "@/components/ui/button";
import { FcGoogle } from "react-icons/fc";
import axios from "../../api/axios";

const Social = () => {
  const onClick = async () => {
    try {
      const response = await axios.get("/auth/google/login/");
      const { auth_url } = response.data;
      if (auth_url) {
        window.location.href = auth_url;
      }
    } catch (error) {
      console.error("Google login error: ", error);
    }
  };

  return (
    <div className="flex w-full items-center gap-x-2">
      <Button
        size="lg"
        className="w-full"
        variant="outline"
        onClick={() => onClick()}
      >
        <FcGoogle className="h-5 w-5" />
      </Button>
      {/* <Button
        size="lg"
        className="w-full"
        variant="outline"
        onClick={() => onClick("github")}
      >
        <FaGithub className="h-5 w-5" />
      </Button> */}
    </div>
  );
};

export default Social;
