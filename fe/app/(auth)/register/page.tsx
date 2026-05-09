import { AuthContainer } from "@/components/auth/AuthContainer";
import { RegisterForm } from "@/components/auth/RegisterForm";


export default function AuthPage() {

  return (
    <AuthContainer children={<RegisterForm />} />
  );
}