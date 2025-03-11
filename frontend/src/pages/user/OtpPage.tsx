import OtpVerification from '@/components/user/otp/OtpVerificaion'
import { useLocation } from 'react-router-dom';

const OtpPage = () => {
  const location = useLocation();
  const data = location.state;
  return (
    <div>
        <div className="flex min-h-screen flex-col">
      <div className="flex justify-between items-center p-6">
        <h1 className="text-2xl font-bold">tutoriam</h1>
      </div>

      <div className="flex-1 flex items-center justify-center">
        <OtpVerification length={data.length} initialTimerSeconds={data.time} email={data.email} />
      </div>
    </div>
    </div>
  )
}

export default OtpPage