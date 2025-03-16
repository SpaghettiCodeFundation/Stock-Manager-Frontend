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
import { useState } from "react";
import { useForm } from "react-hook-form";

import { z } from "zod";
import {storeProvider} from "@/api/providers.api";
import {useMutation, useQueryClient} from "@tanstack/react-query";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  contactInfo: z.string().min(2, {
    message: "Contact info must be at least 2 characters.",
  }),
});

export type IFormStoreProvider = z.infer<typeof formSchema>;

const CreateProvider: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const onOpen = () => setIsOpen(true);
  const onClose = () => setIsOpen(false);

  const form = useForm<IFormStoreProvider>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      contactInfo: '',
    },
  });

  const queryClient = useQueryClient();
  
  const {mutate, isPending} = useMutation({
    mutationFn: async (data: IFormStoreProvider) => await storeProvider(data),
    mutationKey: ["providers"],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["providers"] });
      onClose()
    },
    onError: (err) => {
      console.log(err)
    }
  });

  function onSubmit(values: IFormStoreProvider) {
    mutate(values)
  }

  return (
    <>
      <Button className="border-none" onClick={onOpen}>
        Create new provider 
      </Button>

      <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Register Provider</AlertDialogTitle>
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
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="contactInfo"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Contact Info</FormLabel>
                      <FormControl>
                        <Textarea style={{height: 200}} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit">
                  { isPending ? "Creating..." : "Create" }
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

export default CreateProvider;
