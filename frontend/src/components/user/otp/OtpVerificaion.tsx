import type React from "react";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight, CheckCircle2, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { resendOtp, verifyOtp } from "@/services/authService";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

interface OtpVerificationProps {
  length?: number;
  onVerify?: (otp: string) => Promise<boolean>;
  onResend?: () => Promise<void>;
  initialTimerSeconds?: number;
  email?: string;
}

export default function OtpVerification({
  length = 6,
  initialTimerSeconds = 300,
  email = "example@email.com",
}: OtpVerificationProps) {
  const [otp, setOtp] = useState<string[]>(Array(length).fill(""));
  const [activeInput, setActiveInput] = useState<number>(0);
  const [timeLeft, setTimeLeft] = useState<number>(initialTimerSeconds);
  const [isResendDisabled, setIsResendDisabled] = useState<boolean>(true);
  const [isVerifying, setIsVerifying] = useState<boolean>(false);
  const [verificationStatus, setVerificationStatus] = useState<
    "idle" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const dispactch = useDispatch()
  const navigate = useNavigate()

  // Timer countdown effect
  useEffect(() => {
    if (timeLeft <= 0) {
      setIsResendDisabled(false);
      return;
    }

    const timer = setTimeout(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft]);

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const value = e.target.value;

    if (!/^\d?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < length - 1) {
      setActiveInput(index + 1);
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      setActiveInput(index - 1);
      inputRefs.current[index - 1]?.focus();
    }

    if (e.key === "ArrowRight" && index < length - 1) {
      setActiveInput(index + 1);
      inputRefs.current[index + 1]?.focus();
    }

    if (e.key === "ArrowLeft" && index > 0) {
      setActiveInput(index - 1);
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text/plain").trim();

    if (!/^\d+$/.test(pastedData)) return;

    const pastedOtp = pastedData.slice(0, length).split("");
    const newOtp = [...otp];

    pastedOtp.forEach((digit, index) => {
      newOtp[index] = digit;
    });

    setOtp(newOtp);

    const lastFilledIndex = Math.min(pastedOtp.length - 1, length - 1);
    setActiveInput(lastFilledIndex);
    inputRefs.current[lastFilledIndex]?.focus();
  };

  const onResend = async (email:string) => {
    const response = await resendOtp(email)
    return response
  }

  const handleResend = async () => {
    try {
      const response = await onResend(email);
      if(response?.status === 200){
      setTimeLeft(initialTimerSeconds);
      setIsResendDisabled(true);
      setVerificationStatus("idle");
      setOtp(Array(length).fill(""));
      setActiveInput(0);
      inputRefs.current[0]?.focus();
      }
    } catch (error) {
      console.error("Error resending OTP:", error);
    }
  };

  // Handle verify
  const handleVerify = async () => {
    const otpString = otp.join("");

    // Check if OTP is complete
    if (otpString.length !== length) {
      setVerificationStatus("error");
      setErrorMessage("Please enter all digits");
      return;
    }

    setIsVerifying(true);

    try {
      // const isValid = await onVerify(otpString);

      const response = await verifyOtp(email, otpString, dispactch)
      const isValid = response.status === 200
      if (isValid) {
        setVerificationStatus("success");
      } else {
        setVerificationStatus("error");
        setErrorMessage("Invalid verification code");
      }
    } catch (error) {
      setVerificationStatus("error");
      setErrorMessage("Verification failed");
      console.error("Error verifying OTP:", error);
    } finally {
      setIsVerifying(false);
      navigate("/")
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-6 space-y-8">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold">Verification</h2>
        <p className="text-muted-foreground">
          We've sent a verification code to{" "}
          <span className="font-medium">{email}</span>
        </p>
      </div>

      <div className="space-y-6">
        <div className="space-y-4">
          <div className="flex justify-center gap-2">
            {Array.from({ length }).map((_, index) => (
              <Input
                key={index}
                ref={(el) => {
                  inputRefs.current[index] = el;
                }}
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength={1}
                value={otp[index]}
                onChange={(e) => handleChange(e, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                onPaste={index === 0 ? handlePaste : undefined}
                onFocus={() => setActiveInput(index)}
                className={cn(
                  "w-14 h-14 text-center text-xl font-semibold",
                  activeInput === index && "border-[#000000]",
                  verificationStatus === "error" && "border-red-500"
                )}
                aria-label={`Digit ${index + 1}`}
              />
            ))}
          </div>

          {verificationStatus === "error" && (
            <div className="flex items-center justify-center text-red-500 gap-1">
              <AlertCircle className="h-4 w-4" />
              <span className="text-sm">{errorMessage}</span>
            </div>
          )}

          {verificationStatus === "success" && (
            <div className="flex items-center justify-center text-green-500 gap-1">
              <CheckCircle2 className="h-4 w-4" />
              <span className="text-sm">Verification successful</span>
            </div>
          )}

          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              Time remaining:{" "}
              <span className="font-medium">{formatTime(timeLeft)}</span>
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <Button
            onClick={handleVerify}
            disabled={isVerifying || verificationStatus === "success"}
            className="w-full hover:cursor-pointer"
          >
            {isVerifying ? "Verifying..." : "Verify Code"}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>

          <div className="text-center">
            <p className="text-sm">
              Didn't receive the code?{" "}
              <Button
                variant="link"
                onClick={handleResend}
                disabled={isResendDisabled}
                className={cn(
                  "p-0 h-auto text-[#ff7a59]",
                  isResendDisabled && "text-muted-foreground cursor-not-allowed"
                )}
              >
                Resend
              </Button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
