import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import api from "@/helpers/axios";
import {Navigate, useNavigate} from "react-router-dom";

const login: React.FC = () => {
  const navigate = useNavigate()

  const isAuth: boolean = localStorage.getItem('isAuth') === 'true'

  if(isAuth) return <Navigate to={'/dashboard'}/>

  const formSchema = z.object({
    email: z.string().trim().email(),
    password: z.string().min(2).max(50),
  });

  type IForm = z.infer<typeof formSchema>;

  const form = useForm<IForm>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { setError } = form;

  const onSubmit = async (
    values: z.infer<typeof formSchema>
  ): Promise<void> => {
    const response = await api
      .post("/auth/login", {
        ...values,
      })
      .catch((err) => {
        if (err.status === 400) {
          const errors = err.response.data.errors;

          errors.forEach((err: any) => {
            setError(err.path, {
              type: "manual",
              message: err.msg,
            });
          });
        }
      });

      if(response?.status === 200) {
        localStorage.setItem('token', response?.data.access_token)
        localStorage.setItem('isAuth', 'true')

        navigate('/')
      }
  };

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="w-full max-w-[600px] bg-gray-200 px-6 py-8 m-4 h-full max-h-[600px] flex flex-col justify-center items-center">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 w-full max-w-[400px]"
          >
            <h1 className="text-3xl text-center">Sign in</h1>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Your Email</FormLabel>
                  <FormControl>
                    <Input
                      required
                      placeholder="example@gmail.com"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>This is your email address.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Your Password</FormLabel>
                  <FormControl>
                    <Input
                      required
                      placeholder="example1234"
                      type="password"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>This is your password.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit">Login</Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default login;
