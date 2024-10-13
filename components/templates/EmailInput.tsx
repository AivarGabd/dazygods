"use client";

import { Input } from "@nextui-org/react";
import { useState } from "react";

export default function EmailInput({
  isEmailValid,
  setIsEmailValid,
}: {
  isEmailValid: boolean;
  setIsEmailValid: (value: boolean) => void;
}) {
  const [email, setEmail] = useState("");



  return (
    <Input
      onChange={(e) => {
        setEmail(e.target.value);
        setIsEmailValid(
          e.target.value.includes("@") && e.target.value.length > 0
        );
      }}
      isClearable
      onClear={() => {
        setEmail("");
        setIsEmailValid(false);
      }}
      name="email"
      type="email"
      label="Почта"
      placeholder="Введите почту"
      isInvalid={email.length > 0 && !isEmailValid}
      color={
        email.length > 0 ? (isEmailValid ? "success" : "danger") : "default"
      }
    />
  );
}
