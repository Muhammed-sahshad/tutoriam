import Header from '@/components/user/home/Header'
import ProfileHeader from '@/components/user/userProfile/ProfileHeader'
import ProfileNavigation from '@/components/user/userProfile/ProfileNavigation'

const UserProfile = () => {
  return (
    <div>
        <Header/>
        <div className='w-full'>
        <div className='px-[10%]'>
        <ProfileHeader/>
        <ProfileNavigation/>
        </div>
        </div>
    </div>
  )
}

export default UserProfile