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

import { ICategory } from "@/interfaces/categories.interface";

import { zodResolver } from "@hookform/resolvers/zod";
import { Pencil } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { z } from "zod";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {updateCategory} from "@/api/categories.api";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  description: z.string().min(2, {
    message: "Description must be at least 2 characters.",
  }),
});

export type IFormUpdateCategory = z.infer<typeof formSchema>;

interface IProps {
  item: ICategory;
}

const EditCategory: React.FC<IProps> = ({ item }) => {
  const [isOpen, setIsOpen] = useState(false);

  const onOpen = () => setIsOpen(true);
  const onClose = () => setIsOpen(false);

  const form = useForm<IFormUpdateCategory>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: item.name,
      description: item.description,
    },
  });

  const queryClient = useQueryClient();

  interface IParams {
    data: IFormUpdateCategory,
    id: string
  }

  const {mutate, isPending} = useMutation({
    mutationFn: async ({data, id}: IParams) => await updateCategory(data, id),
    mutationKey: ["categories"],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      onClose()
    },
  });

  function onSubmit(values: IFormUpdateCategory) {
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
            <AlertDialogTitle>Edit Category</AlertDialogTitle>
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
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea style={{height: 200}} {...field} />
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

export default EditCategory;
