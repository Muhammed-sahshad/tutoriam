import { Button } from "../../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
import { useSelector } from "react-redux";
import { useEffect } from "react";

const ProfileHeader = () => {
  const user = useSelector((state: any) => state.auth.user);

  useEffect(() => {}, [user]);
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-2 flex items-center gap-4">
        <Avatar className="h-20 w-20 border-2 border-white shadow-md">
          <AvatarImage src={user.profileImageUrl} alt="Kevin Gilbert" />
          <AvatarFallback>{user.name.split("")[0]}</AvatarFallback>
        </Avatar>
        <div>
          <h1 className="text-xl font-bold">{user.name}</h1>
          <p className="text-sm text-muted-foreground">
            {user.title || "title"}
          </p>
        </div>
        <div className="ml-auto">
          <Button variant="outline" className="">
            Become Instructor
            <svg
              className="ml-1 h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
