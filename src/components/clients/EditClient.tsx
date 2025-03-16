import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogCancel,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

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
import { Textarea } from "@/components/ui/textarea";

import { zodResolver } from "@hookform/resolvers/zod";
import { Pencil } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { z } from "zod";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {IClient} from "@/interfaces/clients.interface";
import {updateClient} from "@/api/clients.api";
import {AxiosError} from "axios";
import {IFormError} from "@/interfaces/errors.interface";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email(),
  phone: z.optional(z.string().min(2, {
    message: "Phone must be at least 2 characters.",
  })),
  address: z.optional(z.string().min(2, {
    message: "Address must be at least 2 characters.",
  })),
});

export type IFormUpdateClient = z.infer<typeof formSchema>;

interface IProps {
  item: IClient;
}

const EditClient: React.FC<IProps> = ({ item }) => {
  const [isOpen, setIsOpen] = useState(false);

  const onOpen = () => setIsOpen(true);
  const onClose = () => setIsOpen(false);

  const form = useForm<IFormUpdateClient>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: item.name,
      email: item.email,
      phone: item.phone,
      address: item.address,
    },
  });

  const {setError} = form

  const queryClient = useQueryClient();

  interface IParams {
    data: IFormUpdateClient,
    id: string
  }

  const {mutate, isPending} = useMutation({
    mutationFn: async ({data, id}: IParams) => await updateClient(data, id),
    mutationKey: ["clients"],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["clients"] });
      onClose()
    }, onError: (err) => {
      if(err instanceof AxiosError) {
        const errors = (err.response?.data.errors)
        errors.forEach((error: IFormError) => {
          setError(error.path as "name" | "email" | "phone" | "address", {
            message: error.msg
          })
        })
      }
    },
  });

  function onSubmit(values: IFormUpdateClient) {
    mutate({
      id: item.id as string,
      data: values
    })
  }

  return (
    <>
      <Button variant={"outline"} className="border-none" onClick={onOpen}>
        <Pencil />
      </Button>

      <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Edit Client</AlertDialogTitle>
          </AlertDialogHeader>
          <div>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input type="text" {...field} {...field}/>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input type="email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone</FormLabel>
                      <FormControl>
                        <Input type="text" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Address</FormLabel>
                      <FormControl>
                        <Textarea style={{height: '200px'}} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit">
                  { isPending ? "Updating..." : "Edit" }
                </Button>
              </form>
            </Form>
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={onClose}>Cancel</AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default EditClient;
