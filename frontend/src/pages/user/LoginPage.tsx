import Header from "@/components/user/login/Header";
import LoginForm from "@/components/user/login/LoginForm";
import LoginImage from "@/components/user/login/LoginImage";
import SignupForm from "@/components/user/login/SignupForm";
import { useState } from "react";

const LoginPage = () => {
  const [signState, setSignState] = useState<"signIn" | "signUp">("signIn");
  return (
    <div>
      <Header signState={signState} setSignState={setSignState} />
      <div className="flex flex-row w-full ">
        <div className="w-1/2 hidden justify-center items-center md:flex ">
          <LoginImage />
        </div>
        <div className="md:w-1/2 w-full">
          {signState === "signIn" ? <LoginForm /> : <SignupForm />}
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
