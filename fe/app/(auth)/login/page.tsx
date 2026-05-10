import { AuthContainer } from "@/components/auth/AuthContainer";
import { LoginForm } from "@/components/auth/LoginForm";


export default function AuthPage() {

  return (
    <AuthContainer children={<LoginForm />} />
  );
}