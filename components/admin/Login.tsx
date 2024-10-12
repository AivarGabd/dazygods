"use client";

import { Button } from "@nextui-org/react";
import EmailInput from "@/components/templates/EmailInput";
import { FormEvent, useState } from "react";
import PasswordInput from "@/components/templates/PasswordInput";
import { useRouter } from "next/navigation";
import { adminLogin } from "@/app/actions";

const AdminLogin = () => {
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);

  const [error, setError] = useState<string | null|undefined>(null);

  const isButtonDisabled = !isEmailValid || !isPasswordValid;

  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const result = await adminLogin(formData);


    if (result.success) {
      router.push("/admin/dashboard");
    } else {
      setError(result.error);
    }
  };


  
  return (
    <div className="flex min-h-screen max-w-screen flex-col gap-10 items-center justify-center">
      <div className="text-2xl font-bold">Вход в консоль администратора</div>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 w-full max-w-[400px]"
      >
        <EmailInput
          isEmailValid={isEmailValid}
          setIsEmailValid={setIsEmailValid}
        />
        <PasswordInput
          isPasswordValid={isPasswordValid}
          setIsPasswordValid={setIsPasswordValid}
        />
        <Button
          type="submit"
          className={`font-semibold ${isButtonDisabled ? "text-gray-500 opacity-50" : ""}`}
          disabled={isButtonDisabled}
          variant={"flat"}
        >
          Войти
        </Button>

        <div className="text-red-500">{error}</div>
      </form>
    </div>
  );
};

export default AdminLogin;
