import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { login } from "@/lib/supabase/funtions";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

export const loginFormSchema = z.object({
    email: z.string().email({ message: "Invalid email address" }),
    password: z.string().min(8, {
      message: "Password must be at least 8 characters",
    }),
  });
  
  export const LoginForm = () => {
    const router = useRouter();
  
    const form = useForm<z.infer<typeof loginFormSchema>>({
      resolver: zodResolver(loginFormSchema),
      defaultValues: {
        email: "",
        password: "",
      },
    });
  
    const onSubmit = async (values: z.infer<typeof loginFormSchema>) => {
      try {
        await login(values);
        // TODO: Create the user password to encrypt data
        router.push('/')
      } catch {
        // TODO: Add a toast to show error
        console.error("Error while logging in");
      }
    };
  
    return (
      <div>
        <h3 className="mb-5 font-bold text-2xl text-slate-700 tracking-wide">
          Sign In
        </h3>
  
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="min-w-80">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
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
              render={({ field }) => (
                <FormItem className="mt-5">
                  <FormLabel>Password</FormLabel>
  
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
  
            <Button
              variant={"default"}
              type="submit"
              className="cursor-pointer mt-5"
            >
              Submit
            </Button>
          </form>
        </Form>
      </div>
    );
  };