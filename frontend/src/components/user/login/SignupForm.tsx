import { Button } from '../../ui/button'
import { ArrowRight, Eye, EyeOff } from 'lucide-react'
import { Checkbox } from '../../ui/checkbox'
import { Input } from '../../ui/input'
import { Label } from '../../ui/label'
import { useState } from 'react'
import { register } from '@/services/authService'
import { AxiosResponse } from 'axios'
import { useNavigate } from 'react-router-dom'

const SignupForm = () => {
    const [showPassword, setShowPassword] = useState(false)
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  const  handleCreateAccount =  async(e:React.FormEvent<HTMLFormElement>) =>{
    e.preventDefault()
    const response:AxiosResponse = await register(`${firstName} ${lastName}`,email, password)
    if(response.status === 200){
      const data = {email, time:120, length:6}
      navigate('/verify-otp',{state:data})
    }else{
      console.log(response.data)
    }
  }

  return (
    <div className="flex flex-1 flex-col items-center justify-center px-6 py-6">
      <div className="mx-auto w-full max-w-sm space-y-5">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold">Create your account</h1>
      </div>
 <form className='' onSubmit={handleCreateAccount} >
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="fullName">Full Name</Label>
          <div className="grid grid-cols-2 gap-4">
            <Input type='text' value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="First name..." />
            <Input type='text' value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="Last name..." />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email address" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <div className="relative">
            <Input type={showPassword ? "text" : "password"} placeholder="Create password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              variant="ghost"
              size="icon"
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute right-0 top-0 h-full"
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </Button>
          </div>
        </div>

     

        <div className="flex items-center space-x-2">
          <Checkbox id="terms" />
          <label
            htmlFor="terms"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            I Agree with all of your{" "}
            <a href="#" className="text-[#000000]">
              Terms & Conditions
            </a>
          </label>
        </div>

      <Button className="w-full " type='submit'>
        Create Account
        <ArrowRight className="ml-2 h-4 w-4" />
      </Button>
      </div>
      </form>
      <div className="relative ">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-white px-2 text-muted-foreground">SIGN UP WITH</span>
        </div>
      </div>

      <div className=" w-full">
        <Button variant="outline" className="w-full">
          <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24">
            <path
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              fill="#4285F4"
            />
            <path
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              fill="#34A853"
            />
            <path
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              fill="#FBBC05"
            />
            <path
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              fill="#EA4335"
            />
            <path d="M1 1h22v22H1z" fill="none" />
          </svg>
          <span className="ml-2">Google</span>
        </Button>
        </div>
      </div>
    </div>
  )
}

export default SignupForm