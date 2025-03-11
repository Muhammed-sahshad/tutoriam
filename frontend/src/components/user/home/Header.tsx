import { Link, useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../ui/dropdown-menu";
import { Button } from "../../ui/button";
import {
  Bell,
  ChevronDown,
  Heart,
  LogOutIcon,
  Search,
  ShoppingCart,
  User,
} from "lucide-react";
import { Input } from "../../ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
import { userLogout } from "@/services/authService";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

const Header = () => {
  const user = useSelector((state: any) => state.auth.user);
  const isAdmin = localStorage.getItem("adminLoggedIn")
  const dispactch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = async () => {
    const resposne = await userLogout(dispactch);
    if (resposne.status === 200) {
      navigate("/");
      localStorage.clear()
    }
  };

  useEffect(() => {}, [user]);

  return (
    <header className="border-b">
      <div className="bg-black text-white px-[2%]">
        <div className="container flex h-10 items-center justify-between">
          <nav className="flex items-center space-x-6">
            <Link
              to="/"
              className="text-sm font-medium text-white hover:text-white/80"
            >
              Home
            </Link>
            <Link
              to="/courses"
              className="text-sm font-medium text-white/70 hover:text-white"
            >
              Courses
            </Link>
            <Link
              to="/about"
              className="text-sm font-medium text-white/70 hover:text-white"
            >
              About
            </Link>
            <Link
              to="/contact"
              className="text-sm font-medium text-white/70 hover:text-white"
            >
              Contact
            </Link>
            <Link
              to="/become-instructor"
              className="text-sm font-medium text-white/70 hover:text-white"
            >
              Become an Instructor
            </Link>
          </nav>
          <div className="flex items-center space-x-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  size="sm"
                  className="h-8 gap-1 text-white/70 hover:text-white bg-transparent hover:bg-transparent"
                >
                  English <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>English</DropdownMenuItem>
                <DropdownMenuItem>Spanish</DropdownMenuItem>
                <DropdownMenuItem>French</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
      <div className="container flex h-16 items-center justify-between px-[2%]">
        <div className="flex items-center space-x-4">
          <Link to="/" className="text-2xl font-bold">
            tutoriam
          </Link>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 gap-1 text-muted-foreground"
              >
                Browse <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>All Courses</DropdownMenuItem>
              <DropdownMenuItem>Popular</DropdownMenuItem>
              <DropdownMenuItem>New Releases</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <div className="relative flex w-full max-w-md items-center">
            <Search className="absolute left-3 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="What do you want learn..."
              className="pl-10 w-[450px]"
            />
          </div>
        </div>
        <div className="flex items-center space-x-4">
          {user && !isAdmin ? (
            <>
              <Button variant="ghost" size="icon" aria-label="Notifications">
                <Bell className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" aria-label="Wishlist">
                <Heart className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" aria-label="Cart">
                <ShoppingCart className="h-5 w-5" />
              </Button>
              <Link to="/profile">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Avatar className="h-10 w-10 border-2 border-white shadow-md cursor-pointer">
                      <AvatarImage src={user.profileImageUrl} alt="user" />
                      <AvatarFallback>{user.name.split("")[0]}</AvatarFallback>
                    </Avatar>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align="end"
                    className=" mt-1 px-2 pb-4 pt-2 flex flex-col gap-2"
                  >
                    <DropdownMenuItem asChild className="gap-3">
                      <Link to="/profile" className="text-sm">
                        <User className="mr-2 h-4 w-4" />
                        Profile
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={handleLogout}
                      className="text-sm text-red-600 gap-3"
                    >
                      <LogOutIcon className="mr-2 h-4 w-4" />
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </Link>
            </>
          ) : (
            <>
              <Link to="/login">
                <Button variant="outline">Create Account</Button>
              </Link>
              <Link to="/login">
                <Button className="">Sign In</Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
