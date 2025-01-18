"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { toast } from "@/hooks/use-toast";
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
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";
import { SendHorizonal } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const FormSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
});

export function UserInputForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: "",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea
                  placeholder="Write your descriptive promt, topics, or keywords."
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Your prompt will be used to generate insights.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="username"
          render={() => (
            <FormItem>
              <FormLabel>Sources</FormLabel>
              <FormControl>
                <ToggleGroup
                  type="multiple"
                  variant="outline"
                  className="flex justify-start"
                >
                  <ToggleGroupItem
                    value="all"
                    aria-label="Toggle bold"
                    className="data-[state=on]:border-black border-2"
                  >
                    All
                  </ToggleGroupItem>
                  <ToggleGroupItem
                    value="bold"
                    aria-label="Toggle bold"
                    className="data-[state=on]:border-black border-2"
                  >
                    <Image
                      src="/search.png"
                      alt="google"
                      width={50}
                      height={50}
                      className="h-4 w-4"
                    />
                    Google
                  </ToggleGroupItem>
                  <ToggleGroupItem
                    value="yt"
                    className="data-[state=on]:border-black border-2"
                  >
                    <Image
                      src="/youtube.png"
                      alt="google"
                      width={50}
                      height={50}
                      className="h-4 w-4"
                    />
                    Youtube
                  </ToggleGroupItem>
                  <ToggleGroupItem
                    value="reddit"
                    className="data-[state=on]:border-black border-2"
                  >
                    <Image
                      src="/reddit.png"
                      alt="google"
                      width={50}
                      height={50}
                      className="h-4 w-4"
                    />
                    Reddit
                  </ToggleGroupItem>
                  <ToggleGroupItem
                    value="quora"
                    className="data-[state=on]:border-black border-2"
                  >
                    <Image
                      src="/quora.png"
                      alt="quora"
                      width={50}
                      height={50}
                      className="h-4 w-4"
                    />
                    Quora
                  </ToggleGroupItem>
                  <ToggleGroupItem
                    value="app"
                    className="data-[state=on]:border-black border-2 whitespace-nowrap"
                  >
                    <Image
                      src="/star.png"
                      alt="star"
                      width={50}
                      height={50}
                      className="h-4 w-4"
                    />
                    App Reviews
                  </ToggleGroupItem>
                </ToggleGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="username"
          render={() => (
            <FormItem>
              <FormLabel>Target</FormLabel>

              <FormControl>
                <Select>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select Ad Target" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="light">Get Views</SelectItem>
                    <SelectItem value="dark">Get Likes</SelectItem>
                    <SelectItem value="system">Get Clicks</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormDescription>
                Get personalized insights based on your ad target.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">
          Get Insights <SendHorizonal size={16} />
        </Button>
      </form>
    </Form>
  );
}
