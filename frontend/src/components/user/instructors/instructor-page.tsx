import { useEffect, useState } from "react"
import { InstructorsHeader } from "./instrucotrs-header"
import { InstructorsGrid } from "./instructors-grid"
import { IInstructor } from "@/types/instructor"
import { fetchEnrolledInstructors } from "@/services/instructorService"
import { GenericPagination } from "@/components/common/pagination"

export function InstructorsPage() {
    const [instructors, setInstructors] = useState<IInstructor[] | null> (null)
    const [searchQuery, setSearchQuery] = useState<string>("")
    // const [curretPage, setCurrentPage] = useState<number>(0)
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(1);
    const dataPerPage = 12

    const getEnrolledInstructors = async()=> {
        try {
            const data = await fetchEnrolledInstructors(currentPage, dataPerPage, searchQuery)
            setInstructors(data.instructorswithPagination.instructors)
            setTotalPages(data.instructorswithPagination.totalPages)
            console.log(data.instructorswithPagination.totalPages)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(()=> {
        getEnrolledInstructors()
    },[searchQuery])

  return (
    <div className="container mx-auto px-4 py-8">
      <InstructorsHeader setSearchQuery={setSearchQuery} count={instructors?.length as number} />
      <InstructorsGrid instructors={instructors } />
      <GenericPagination currentPage={currentPage} onPageChange={setCurrentPage} totalPages={totalPages} />
    </div>
  )
}
