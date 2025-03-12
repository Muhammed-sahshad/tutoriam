import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { getUsers } from '@/services/adminService'
import { MoreHorizontal } from 'lucide-react'
import { useEffect, useState } from 'react'

interface User {
    _id: string;
    name: string;
    email: string;
    courses: number;
    profileImageUrl:string
    status: "active" | "blocked"; 
    createdAt: Date;
  }
  

const UsersPage = () => {
    const [users, setUsers] = useState<User[]|[]>([])
    useEffect(()=>{
        const fetchUsers = async() =>{
          const response =  await getUsers()
          console.log(response)
          setUsers(response.data.users)
        }

        fetchUsers()
    },[])
  return (
    <div className="flex-1 space-y-4 md:pl-64">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Users</h2>
        <div className="flex items-center gap-2">
        </div>
      </div>
      <Card>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Courses Enrolled</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Joined Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className=''>
              {users.map((user) => (
                <TableRow key={user._id} className='h-15 '>
                  <TableCell className="font-medium flex gap-5 items-center">
                  <Avatar>
                      <AvatarImage src={user.profileImageUrl} alt={user.name} />
                      <AvatarFallback>
                        {user.name.split(" ").map((n) => n[0]).join("")}
                      </AvatarFallback>
                    </Avatar>
                    {user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.courses}</TableCell>
                  <TableCell>
                    <Badge variant={user.status === "active" ? "default" : "destructive"}>
                      {user.status === "active" ? "Active" : "Blocked"}
                    </Badge>
                  </TableCell>
                  <TableCell>{new Date(user.createdAt).toLocaleDateString()}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Open menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem>View details</DropdownMenuItem>
                        <DropdownMenuItem>Send email</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>{user.status === "active" ? "Block user" : "Unblock user"}</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

export default UsersPage