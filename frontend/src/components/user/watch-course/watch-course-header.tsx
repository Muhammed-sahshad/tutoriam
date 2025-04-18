import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, CircleCheckBig, CircleX, Download, SendHorizontal, Star } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { EnrolledCourse } from "@/types/enrollment";
import { addReview } from "@/services/reviewService";
import { toast } from "sonner";
import ReviewDialog from "../course-review/course-review-dialog";

interface CourseHeaderProps {
  title: string;
  sections: number;
  lectures: number;
  duration: string;
  enrollment: EnrolledCourse;
}

export function CourseHeader({
  title,
  sections,
  lectures,
  duration,
  enrollment,
}: CourseHeaderProps) {
  const navigate = useNavigate();
  const handleBackClick = () => navigate(-1);
  const [dialogOpen, setDialogOpen] = useState(false)


  const handleSubmit = async(rating:number, review:string) => {
    try {
        const data = await addReview(enrollment.courseId as string, rating.toString(), review.trim())
        toast.success(data.message)
    } catch (error:any) {
        toast.warning(error.message)
    }
  };

  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div className="flex items-start gap-3">
        <Link to="#" className="mt-1">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={handleBackClick}
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-lg font-medium leading-tight">{title}</h1>
          <div className="flex items-center gap-3 text-sm text-muted-foreground mt-1">
            <span>{sections} Sections</span>
            <span className="inline-block h-1 w-1 rounded-full bg-muted-foreground"></span>
            <span>{lectures} lectures</span>
            <span className="inline-block h-1 w-1 rounded-full bg-muted-foreground"></span>
            <span>{duration}</span>
          </div>
        </div>
      </div>
      {enrollment.completed && (
        <div className="flex gap-3">
        <Button variant="outline" size="sm" onClick={()=> setDialogOpen(true)}>Write A Review</Button>
        <Button variant="secondary" size="sm" className="gap-2">
          <Download/>
          Certificate 
        </Button>
        </div>
      )}
      {
        enrollment.completed && dialogOpen &&
        <ReviewDialog 
        isOpen={true}
        onOpenChange={()=> setDialogOpen(prev => !prev)} 
        onSubmit={(rating, review) => handleSubmit(rating, review)}
        initialRating={0}
        initialReview={""}
        mode="create"
        />

      }

      {/* {enrollment.completed && (
        <ReviewDialog 
        isOpen={i}
        onOpenChange={}
        />
        // <Dialog>
        //   <DialogTrigger asChild>
        //     <Button variant="outline">Write A Review</Button>
        //   </DialogTrigger>
        //   <DialogContent className="sm:max-w-md">
        //     <DialogHeader>
        //       <DialogTitle>Write a Review</DialogTitle>
        //     </DialogHeader>

        //     <div className="flex flex-col gap-4 py-2">
        //       <div>
        //         <Label className="mb-4">Rating</Label>
        //         <div className="flex items-center gap-1 mt-1">
        //           {[1, 2, 3, 4, 5].map((star) => (
        //             <Star
        //               key={star}
        //               className={`w-5 h-5 cursor-pointer ${
        //                 star <= rating
        //                   ? "fill-yellow-400 stroke-yellow-400"
        //                   : "stroke-muted"
        //               }`}
        //               onClick={() => setRating(star)}
        //             />
        //           ))}
        //         </div>
        //       </div>

        //       <div>
        //         <Label className="mb-4">Review</Label>
        //         <Textarea
        //           placeholder="Share your thoughts..."
        //           value={review}
        //           onChange={(e) => setReview(e.target.value)}
        //           rows={4}
        //         />
        //       </div>
        //     </div>

        //     <DialogFooter className="gap-2">
        //       <DialogClose asChild>
        //         <Button variant="outline">Cancel</Button>
        //       </DialogClose>
        //       <Button onClick={handleSubmit} className="flex items-center gap-2">
        //         Submit
        //         <SendHorizontal size={12} strokeWidth={1}/>
        //         </Button>
        //     </DialogFooter>
        //   </DialogContent>
        // </Dialog>
        
      )} */}
    </div>
  );
}
