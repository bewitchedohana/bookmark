"use client";

import { LoginForm } from "@/components/development/LoginForm";
import { RegistrationForm } from "@/components/development/RegistrationForm";

const LoginPage = () => {
  return (
    <div className="flex justify-center min-h-screen align-middle">
      <div className="min-w-screen flex flex-row justify-around items-center">
        <section className="h-fit">
          <LoginForm />
        </section>

        <section className="h-fit">
          <RegistrationForm />
        </section>
      </div>
    </div>
  );
};

export default LoginPage;
