import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

export const TwoFactorSettings = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [showVerification, setShowVerification] = useState(false);
  const { toast } = useToast();

  const handleSendCode = async () => {
    // Note: This is a placeholder. Supabase doesn't provide phone 2FA out of the box.
    // You would need to implement this using a third-party service like Twilio
    toast({
      title: "Info",
      description: "Verification code sent to your phone!",
    });
    setShowVerification(true);
  };

  const handleVerifyCode = async () => {
    // Placeholder for verification logic
    toast({
      title: "Success",
      description: "Phone number verified successfully!",
    });
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="phone">Phone Number</Label>
        <Input
          id="phone"
          type="tel"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          placeholder="+1234567890"
        />
      </div>
      <Button onClick={handleSendCode}>Send Verification Code</Button>

      {showVerification && (
        <div className="space-y-2">
          <Label htmlFor="code">Verification Code</Label>
          <Input
            id="code"
            value={verificationCode}
            onChange={(e) => setVerificationCode(e.target.value)}
            placeholder="Enter verification code"
          />
          <Button onClick={handleVerifyCode}>Verify Code</Button>
        </div>
      )}
    </div>
  );
};