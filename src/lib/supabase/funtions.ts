'use server'

import { loginFormSchema, registrationFormSchema } from "@/app/login/page";
import { z } from "zod";
import { createClient } from "./server";

export async function login(formData: z.infer<typeof loginFormSchema>) {
    const supabase = await createClient();

    const { email, password } = formData;
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    
    // TODO: Handle errors
    if (error) {
        throw error;
    }
}



export async function signUp(formData: z.infer<typeof registrationFormSchema>) {
  const supabase = await createClient();

  const { email, password, confirmPassword } = formData;
  if (password !== confirmPassword) {
    throw new Error("Passwords do not match");
  }

  const { error } = await supabase.auth.signUp({ email, password });

  // TODO: Handle errors
  if (error) {
    throw error;
  }
}