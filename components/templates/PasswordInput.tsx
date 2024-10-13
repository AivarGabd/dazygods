"use client";

import { Input } from "@nextui-org/react";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

export default function PasswordInput({
  isPasswordValid,
  setIsPasswordValid,
}: {
  isPasswordValid: boolean;
  setIsPasswordValid: (value: boolean) => void;
}) {
  const [isVisible, setIsVisible] = useState(false);
  const [password, setPassword] = useState("");
  const toggleVisibility = () => setIsVisible(!isVisible);


  return (
    <Input
      label="Пароль"
      name="password"
      placeholder="Введите пароль"
      onChange={(e) => {
        setPassword(e.target.value);
        setIsPasswordValid(e.target.value.length > 0);
      }}
      isInvalid={password.length > 0 && !isPasswordValid}
      color={password.length > 0 ? (isPasswordValid ? "success" : "danger") : "default"}
      endContent={
        <button
          className="focus:outline-none"
          type="button"
          onClick={toggleVisibility}
          aria-label="toggle password visibility"
        >
          {isVisible ? (
            <Eye className="text-2xl text-default-400 pointer-events-none" />
          ) : (
            <EyeOff className="text-2xl text-default-400 pointer-events-none" />
          )}
        </button>
      }
      type={isVisible ? "text" : "password"}
    />
  );
}
