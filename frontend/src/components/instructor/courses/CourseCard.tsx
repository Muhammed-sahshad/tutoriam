import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Star, MoreHorizontal, Users } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import type { Course } from "@/types/course";
import { cn } from "@/lib/utils";
import { updateCoursePublishStatus } from "@/services/instructorService";
import { useCourses } from "@/hooks/useCourse";
import { toast } from "sonner";

interface CourseCardProps {
  course: Course;
}

export function CourseCard({ course:initialCourse  }: CourseCardProps) {
    const [course, setCourse] = useState<Course>(initialCourse); 
    const [showActions, setShowActions] = useState(false);
    const navigate = useNavigate();
    // const {setCourses, loading} = useCourses()
    
    const handleViewDetails = (e: React.MouseEvent) => {
        e.stopPropagation();
    navigate(`/instructor/my-courses/${course._id}`);
  };

  const handleEditCourse = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigate(`/instructor/my-courses/${course._id}/edit`);
  };
  
  const handlePublishToggle = async(e:React.MouseEvent) => {
      
     try {
         const res = await updateCoursePublishStatus(course._id)
         console.log(res)
         
        //  setCourses((prev:Course[]) => prev.map((c) => c._id === course._id ? res.data.course : c))
        setCourse(res.data.course)
        toast.success(res.data.message || 'course status changed successfully', {position:"top-right"})
         
        } catch (error:any) {
            console.log(error)
            toast.error("failed to change status", {position:"top-right"})
        }finally{
            console.log(course)
        }
  }
  // useEffect(()=>{
  // },[course])

  const handleCardClick = () => {
      navigate(`/instructor/my-courses/${course._id}`);
    };
    
    const rating = course.rating ?? 0;
    
//     if(loading){
//         return <div></div>
//   }

  return (
    <div
      className="rounded-lg overflow-hidden border shadow-sm hover:shadow-md transition-shadow relative cursor-pointer"
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => setShowActions(false)}
      onClick={handleCardClick}
    >
      <div className="relative aspect-video transition-transform transform hover:scale-105">
        {/* Replacing Next.js Image with a normal HTML img tag */}
        <img
          src={course.thumbnail || "/placeholder.svg"}
          alt={course.title}
          className="object-cover w-full h-full transition-all"
        />
      </div>

      <div className="p-4">
        <div className="uppercase text-xs font-semibold mb-2">{course.categoryId.name}</div>

        <h3 className="font-medium text-sm line-clamp-2 h-10 mb-2">{course.title}</h3>

        <div className="flex items-center gap-1 mb-2">
          <div className="flex">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={cn("h-4 w-4", i < Math.floor(rating) ? "text-black fill-black" : "text-gray-300")}
              />
            ))}
          </div>
          <span className="text-sm font-medium">{rating.toFixed(1)}</span>
        </div>

        <div className="flex items-center text-xs mb-3">
          <Users className="h-3 w-3 mr-1" />
          <span>{course.enrollmentCount} students</span>
        </div>

        <div className="flex items-center justify-between">
          <div>
            {Number(course.price) === 0  || course.isFree === true ? (
              <span className="font-bold">Free</span>
            ) : (
              <span className="font-bold">₹{course.price?.toLocaleString()}</span>
            )}
          </div>

          {/* Dropdown Menu for Options */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8" onClick={(e) => e.stopPropagation()}>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" onClick={(e) => e.stopPropagation()}>
              <DropdownMenuItem onClick={handleViewDetails}>View Details</DropdownMenuItem>
              <DropdownMenuItem onClick={handleEditCourse}>Edit Course</DropdownMenuItem>
              <DropdownMenuItem onClick={handlePublishToggle} className={!course.isPublic ? "text-green-500" : "text-red-500"}>{course.isPublic ? "Unlist" : "Publish"}</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
}
