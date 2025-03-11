import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { MoreHorizontal } from 'lucide-react'


const users = [
    {
      id: "u1",
      name: "Sophia Chen",
      email: "sophia.chen@example.com",
      courses: 3,
      status: "active",
      joinedDate: "2023-01-15",
    },
    {
      id: "u2",
      name: "Jackson Lee",
      email: "jackson.lee@example.com",
      courses: 2,
      status: "active",
      joinedDate: "2023-02-20",
    },
    {
      id: "u3",
      name: "Isabella Nguyen",
      email: "isabella.nguyen@example.com",
      courses: 5,
      status: "active",
      joinedDate: "2022-11-05",
    },
    {
      id: "u4",
      name: "Oliver Martinez",
      email: "oliver.martinez@example.com",
      courses: 1,
      status: "blocked",
      joinedDate: "2023-03-10",
    },
    {
      id: "u5",
      name: "Emma Kim",
      email: "emma.kim@example.com",
      courses: 4,
      status: "active",
      joinedDate: "2022-12-18",
    },
    {
      id: "u6",
      name: "Noah Wilson",
      email: "noah.wilson@example.com",
      courses: 0,
      status: "active",
      joinedDate: "2023-04-22",
    },
    {
      id: "u7",
      name: "Ava Johnson",
      email: "ava.johnson@example.com",
      courses: 2,
      status: "blocked",
      joinedDate: "2023-01-30",
    },
    {
      id: "u8",
      name: "Liam Garcia",
      email: "liam.garcia@example.com",
      courses: 3,
      status: "active",
      joinedDate: "2022-10-15",
    },
  ]

const UsersPage = () => {
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
                <TableRow key={user.id} className='h-15 '>
                  <TableCell className="font-medium flex gap-5 items-center">
                  <Avatar>
                      <AvatarImage src={`/avatars/tutor-${user.id}.png`} alt={user.name} />
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
                  <TableCell>{user.joinedDate}</TableCell>
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