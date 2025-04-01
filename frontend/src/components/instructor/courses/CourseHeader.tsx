import { useNavigate } from "react-router-dom"; // Replaced useRouter with useNavigate
import { Star, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Course } from "@/types/course";
import { formatDate } from "@/utils/formatDate";
import { updateCoursePublishStatus } from "@/services/instructorService";
import { useEffect, useState } from "react";
import { toast } from "sonner";

// Dummy Course Data
const dummyCourse = {
  _id: "12345",
  title: "React for Beginners",
  description: "Learn the fundamentals of React and build dynamic web applications.",
  createdAt: new Date(),
  updatedAt: new Date(),
  thumbnail: "/placeholder.svg",
  rating: 4.5,
  ratingCount: 200,
  price: 1000,
  totalRevenue: 50000,
  instructors: [
    {
      id: "1",
      name: "John Doe",
      avatar: "/placeholder.svg?height=32&width=32",
    },
  ],
};

interface CourseHeaderProps {
  course: Course | null;
}

const CourseHeader: React.FC<CourseHeaderProps> = ({ course }) => {
  const navigate = useNavigate();
  const [courseDetails, setCourseDetails] = useState(course)
  const [loading, setLoading] = useState(false)

  useEffect(()=> {
  },[courseDetails])

   const handlePublishToggle = async(e:React.MouseEvent) => {
        
       try {
        if(courseDetails){
          setLoading(true)
          const res = await updateCoursePublishStatus(courseDetails._id)
          
         //  setCourses((prev:Course[]) => prev.map((c) => c._id === course._id ? res.data.course : c))
         setCourseDetails(res.data.course)
         toast.success(res.data.message || 'course status changed successfully', {position:"top-right"})
        }
           
          } catch (error:any) {
              console.log(error)
              toast.error("failed to change status", {position:"top-right"})
          }finally{
            setLoading(false)
          }
    }

  // Handle null or missing course
  if (!course) {
    return (
      <div className="text-center p-6">
        <p className="text-lg text-red-500">Course not found or failed to load.</p>
      </div>
    );
  }

  const handleEditCourse = () => {
    navigate(`/instructor/my-courses/${course._id}/edit`);
  };

  if(loading){
    return <div></div>
  }

  return (
    <div className=" rounded-lg overflow-hidden border shadow-sm">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <div className="relative aspect-video md:aspect-square md:p-5 md:pr-0">
            <img
              src={course.thumbnail || "/placeholder.svg"}
              alt={course.title}
              className="object-cover w-full h-full rounded-md"
            />
          </div>
        </div>

        <div className="p-6 md:col-span-2">
          <div className="flex flex-col h-full">
            <div className="mb-4">
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-500">
                  <span>Published: {formatDate(course.createdAt)}</span>
                  <span className="mx-2">•</span>
                  <span>Last Updated: {formatDate(course.updatedAt)}</span>
                </div>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={handleEditCourse}>Edit Course</DropdownMenuItem>
                    <DropdownMenuItem onClick={handlePublishToggle} className={!course.isPublic ? "text-green-500" : "text-red-500"}>{course.isPublic ? "Unlist" : "Publish"}</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              <h1 className="text-2xl font-bold mt-2">{course.title}</h1>
              <p className="text-gray-600 mt-2">{course.description}</p>
            </div>

            <div className="mt-auto">
              <div className="flex flex-wrap items-center gap-4 mb-4">
                <div className="flex items-center">
                  <div className="flex mr-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`h-5 w-5 ${i < Math.floor(course.rating ?? 0) ? "text-black fill-black" : "text-gray-300"}`}
                      />
                    ))}
                  </div>
                  <span className="font-bold">{(course.rating ?? 0).toFixed(1)}</span>
                  {/* <span className="text-gray-500 ml-1">({course.ratingCount.toLocaleString()} Rating)</span> */}
                </div>

                <div className="flex items-center gap-2">
                  {/* <div key={course.instructors[0].id} className="flex items-center"> */}
                    <div className="relative h-8 w-8 rounded-full overflow-hidden mr-2">
                      {/* <img
                        src={course.instructors[0].avatar || "/placeholder.svg?height=32&width=32"}
                        alt={course.instructors[0].name}
                        className="object-cover w-full h-full"
                      /> */}
                    </div>
                    {/* <span>{course.instructors[0].name}</span> */}
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div>
                <div>
            {Number(course.price) === 0 ? (
              <span className="font-bold">Free</span>
            ) : (
              <span className="font-bold">₹{course.price?.toLocaleString()}</span>
            )}
          </div>
                  <div className="text-sm text-gray-500">Course price</div>
                </div>

                {/* <div className="text-right">
                  <div className="text-3xl font-bold">₹{course.totalRevenue.toLocaleString()}</div>
                  <div className="text-sm text-gray-500">USD total revenue</div>
                </div> */}

                <div className="flex gap-2">
                  <Button className="" onClick={handleEditCourse}>
                    Edit Course
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
};

export default CourseHeader;
