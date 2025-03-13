import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { signUp } from "@/lib/supabase/funtions";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

export const registrationFormSchema = z
  .object({
    email: z.string().email({ message: "Invalid email address" }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" })
      .max(32, { message: "Password must be at most 32 characters" }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const RegistrationForm = () => {
  const onSubmit = async (values: z.infer<typeof registrationFormSchema>) => {
    await signUp(values);
    // TODO: Add a toast to tell user to confirm
  };

  const form = useForm<z.infer<typeof registrationFormSchema>>({
    resolver: zodResolver(registrationFormSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  return (
    <div>
      <h3 className="mb-5 font-bold text-2xl text-slate-700 tracking-wide">
        Sign Up
      </h3>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="min-w-80">
          <FormField
            control={form.control}
            name="email"
            render={({ field, formState }) => (
              <FormItem>
                {formState.errors.email && (
                  <FormMessage>{formState.errors.email.message}</FormMessage>
                )}
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" {...field} />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field, formState }) => (
              <FormItem className="mt-5">
                <FormLabel>Password</FormLabel>
                {formState.errors.password && (
                  <FormMessage>{formState.errors.password.message}</FormMessage>
                )}
                <FormControl>
                  <Input type="password" {...field} />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field, formState }) => (
              <FormItem className="mt-5">
                <FormLabel>Confirm Password</FormLabel>
                {formState.errors.confirmPassword && (
                  <FormMessage>
                    {formState.errors.confirmPassword.message}
                  </FormMessage>
                )}
                <FormControl>
                  <Input type="password" {...field} />
                </FormControl>
              </FormItem>
            )}
          />

          <Button type="submit" className="cursor-pointer mt-5">
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
};
