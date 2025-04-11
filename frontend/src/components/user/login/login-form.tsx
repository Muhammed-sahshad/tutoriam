import { ArrowRight, Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { Button } from "../../ui/button";
import { Label } from "../../ui/label";
import { Input } from "../../ui/input";
import { googleLogin, login } from "@/services/authService";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useAppDispatch } from "@/redux/store";
import { fetchCartItems } from "@/redux/thunks/cartThunk";

const formSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
});

type FormData = z.infer<typeof formSchema>;

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const appDispatch = useAppDispatch()
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: FormData) => {
    const { email, password } = data;
    const role = "user";
    const response = await login(email, password, role, dispatch);
    appDispatch(fetchCartItems())
    console.log(response)
    if (response.status === 200) {
      navigate("/");
    } else {
      toast.error(response.data.message || "invalid credentials", {
        position: "top-right",
        style: {
          color: "red",
        },
        duration: 2000,
      });
    }
  };
  return (
    <main className="flex flex-1 flex-col items-center justify-center md:p-6 md:pt-3 md:pb-0">
      <div className="mx-auto w-full max-w-sm space-y-6">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold mb-10">Welcome Back!</h1>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="Username or email address..."
              {...register("email")}
            />
            {errors.email && (
              <p className="text-red-500 font-mono  text-xs">
                {errors.email.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Input
                id="password"
                className="pr-10"
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                {...register("password")}
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-0 top-0 h-full px-3 py-2 text-muted-foreground cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
                <span className="sr-only">
                  {showPassword ? "Hide password" : "Show password"}
                </span>
              </Button>
            </div>
            {errors.password && (
              <p className="text-red-500 font-mono text-xs">
                {errors.password.message}
              </p>
            )}
          </div>
          <Button type="submit" className="w-full mt-3 cursor-pointer ">
            Sign in
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </form>

        

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t"></span>
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">
              Sign in with
            </span>
          </div>
        </div>

        <div className="">
          <Button variant="outline" className="w-full cursor-pointer" onClick={googleLogin}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              className="h-5 w-5 mr-2"
            >
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            Google
          </Button>
        </div>
      </div>
      <div className=" text-center mt-3">
          <Link to="/forgot-password" >
          <Button variant="link" className="text-gray-400 cursor-pointer">
            forgot password ?
          </Button>
          </Link>
        </div>
    </main>
  );
};

export default LoginForm;
