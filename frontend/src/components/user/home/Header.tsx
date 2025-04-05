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
  Menu,
  X,
} from "lucide-react";
import { Input } from "../../ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
import { userLogout } from "@/services/authService";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import ThemeToggle from "@/components/common/ThemeToggle";

const Header = () => {
  const user = useSelector((state: any) => state.auth.user);
  const isAdmin = localStorage.getItem("adminLoggedIn");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [sidebarOpen, setSidebarOpen] = useState(false); 

  const handleLogout = async () => {
    const response = await userLogout(dispatch);
    if (response.status === 200) {
      navigate("/");
      localStorage.clear();
    }
  };

  const handleCreateAccountClick = () => {
    navigate("/login", { state: { formState: "signup" } });
  };

  const handleSignInClick = () => {
    navigate("/login", { state: { formState: "signIn" } });
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <header className="border-b">
      <div className="bg-black text-white px-4 sm:px-[2%]">
        <div className="container flex h-10 items-center justify-between">
          <Button
            onClick={toggleSidebar}
            className="sm:hidden "
            aria-label="Menu"
          >
            <Menu className="h-6 w-6" />
          </Button>

          <nav className="hidden sm:flex items-center space-x-6 flex-wrap">
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

          <div className=" items-center space-x-4">
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
          <ThemeToggle/>
          </div>
        </div>
      </div>

      <div className="container flex h-16 items-center justify-between px-4 sm:px-[2%]">
        <div className="flex items-center space-x-4 flex-wrap">
          <Link to="/" className="text-xl font-bold">
            TUTORIAM
          </Link>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 gap-1 text-muted-foreground sm:flex hidden"
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

          <div className="relative w-full max-w-md items-center sm:flex hidden">
            <Search className="absolute left-3 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="What do you want to learn..."
              className="pl-10 w-[450px]"
            />
          </div>
        </div>

        <div className="flex items-center space-x-4">
          {user && !isAdmin ? (
            <>
              <Button variant="ghost" size="icon" aria-label="Notifications" className="sm:flex hidden">
                <Bell className="h-5 w-5" />
              </Button>
              <Link to={"/wishlist"}>
              <Button variant="ghost" size="icon" aria-label="Wishlist" className="sm:flex hidden">
                <Heart className="h-5 w-5" />
              </Button>
              </Link>
              <Link to={"/cart"}>
              <Button variant="ghost" size="icon" aria-label="Cart" className="sm:flex hidden">
                <ShoppingCart className="h-5 w-5" />
              </Button>
              </Link>

              <Link to={user.role === "instructor" ? "/instructor/dashboard" : "/profile"}>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Avatar className="h-10 w-10 border-2 border-white shadow-md cursor-pointer">
                      <AvatarImage src={user.profileImageUrl} alt="user" />
                      <AvatarFallback>{user.name[0]}</AvatarFallback>
                    </Avatar>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="mt-1 px-2 pb-4 pt-2 flex flex-col gap-2">
                    <DropdownMenuItem asChild className="gap-3">
                      <Link
                        to={user.role === "instructor" ? "/instructor/dashboard" : "/profile"}
                        className="text-sm"
                      >
                        <User className="mr-2 h-4 w-4" />
                        Profile
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={handleLogout} className="text-sm text-red-600 gap-3">
                      <LogOutIcon className="mr-2 h-4 w-4" />
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </Link>
            </>
          ) : (
            <>
              <Button variant="outline" onClick={handleCreateAccountClick}>
                Create Account
              </Button>
              <Button className="" onClick={handleSignInClick}>
                Sign In
              </Button>
            </>
          )}
        </div>
      </div>

      <div
        className={`fixed inset-0 z-10 bg-opacity-50 sm:hidden ${
          sidebarOpen ? "block" : "hidden"
        }`}
        onClick={toggleSidebar} 
      />
      <div
        className={`fixed top-0 left-0 w-2/3 h-full bg-white p-4 sm:hidden transform transition-transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <Button
          className="absolute top-4 right-4 "
          onClick={toggleSidebar}
        >
          <X className="h-6 w-6" />
        </Button>
        <nav className="flex flex-col space-y-4">
          <Link to="/" onClick={toggleSidebar} className="text-lg font-medium text-gray-800">
            Home
          </Link>
          <Link to="/courses" onClick={toggleSidebar} className="text-lg font-medium text-gray-800">
            Courses
          </Link>
          <Link to="/about" onClick={toggleSidebar} className="text-lg font-medium text-gray-800">
            About
          </Link>
          <Link to="/contact" onClick={toggleSidebar} className="text-lg font-medium text-gray-800">
            Contact
          </Link>
          <Link to="/become-instructor" onClick={toggleSidebar} className="text-lg font-medium text-gray-800">
            Become an Instructor
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
