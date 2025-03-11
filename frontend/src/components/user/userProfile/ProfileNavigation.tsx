import { Tabs, TabsList, TabsTrigger } from '../../ui/tabs'
import AccountSettings from './AccountSettings'

const ProfileNavigation = () => {
  return (
    <Tabs defaultValue="settings" className="w-full">
          <TabsList className="mb-8 w-full justify-start border-b bg-transparent p-0">
            <TabsTrigger
              value="dashboard"
              className="rounded-none border-b-2 border-transparent px-4 py-2 data-[state=active]:border-black"
            >
              Dashboard
            </TabsTrigger>
            <TabsTrigger
              value="courses"
              className="rounded-none border-b-2 border-transparent px-4 py-2 data-[state=active]:border-black"
            >
              Courses
            </TabsTrigger>
            <TabsTrigger
              value="teachers"
              className="rounded-none border-b-2 border-transparent px-4 py-2 data-[state=active]:border-black"
            >
              Teachers
            </TabsTrigger>
            <TabsTrigger
              value="message"
              className="rounded-none border-b-2 border-transparent px-4 py-2 data-[state=active]:border-black"
            >
              Message
            </TabsTrigger>
            <TabsTrigger
              value="wishlist"
              className="rounded-none border-b-2 border-transparent px-4 py-2 data-[state=active]:border-black"
            >
              Wishlist
            </TabsTrigger>
            <TabsTrigger
              value="purchase-history"
              className="rounded-none border-b-2 border-transparent px-4 py-2 data-[state=active]:border-black"
            >
              Purchase History
            </TabsTrigger>
            <TabsTrigger
              value="settings"
              className="rounded-none border-b-2 border-transparent px-4 py-2 data-[state=active]:border-black"
            >
              Settings
            </TabsTrigger>
          </TabsList>
          <AccountSettings/>
      </Tabs>
  )
}

export default ProfileNavigation
