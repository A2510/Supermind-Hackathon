"use client";
import { useState } from "react";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getDashboard } from "../server/actions/getDashboard";
import { ExternalLink, Lightbulb } from "lucide-react";
import Link from "next/link";
import { CTADialog } from "../components/dialog";
import { DashboardData } from "@/types/types";


const FormSchema = z.object({
  query: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  sources: z.array(z.string()).nonempty("Please select at least one source."),
  target: z.string().nonempty("Please select an ad target."),
});

export function UserInputForm() {
  const [results, setResults] = useState<DashboardData | null>(null);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      query: "",
      sources: ['google', 'yt', 'reddit', 'quora', 'app'],
      target: "",
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    const response = await getDashboard(data);
    console.log(response.data, "response");
    if (response.status === "error") {
      toast({
        title: "An error occurred",
        description: response.message,
      });
      return;
    }
    setResults(response.data);
  }

  return (
    <>
      {results ?
        <div className="flex flex-1 flex-col items-center gap-4 px-4 py-10">
          <h1 className="flex items-center gap-2 text-xl font-bold">
            Results <Lightbulb />
          </h1>
          <p>Generated Title for Ad</p>
          <div className="mx-auto w-full p-4 space-y-4 items-center">
            <div>
              <div className="text-base font-bold">Summary</div>
              <p className="text-sm">Lorem Ispum </p>
            </div>

            <Tabs defaultValue="google">
              <TabsList>
                {Object.keys(results).map((source, index) => (
                    <TabsTrigger key={index} value={source}>
                      {source.charAt(0).toUpperCase() + source.slice(1)}
                    </TabsTrigger>
                  ))}
              </TabsList>
              {Object.keys(results).map((source, index) => (
                  <TabsContent value={source} key={index}>
                    <div>
                      <div className="text-base font-bold">User Problems</div>
                      <ul className="list-disc list-inside text-sm border p-2 rounded-lg">
                        {results?.[source]?.key_pain_points?.map((point, idx) => (
                          <li key={idx}>{point}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <div className="text-base font-bold">Key Triggers</div>
                      <ul className="list-disc list-inside text-sm border p-2 rounded-lg">
                        {results?.[source]?.key_triggers?.map((trigger, idx) => (
                          <li key={idx}>{trigger}</li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <div className="text-base font-bold">Hooks</div>
                      <ul className="list-disc list-inside text-sm border p-2 rounded-lg">
                        {results?.[source]?.hooks?.map((hook, idx) => (
                          <li key={idx}>{hook}</li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <div className="text-base font-bold">Meta Tags</div>
                      <ul className="list-disc list-inside text-sm border p-2 rounded-lg">
                        {results?.[source]?.meta_tags?.map((tag, idx) => (
                          <li key={idx}>{tag}</li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <div className="text-base font-bold">Keywords</div>
                      <ul className="list-disc list-inside text-sm border p-2 rounded-lg">
                        {results?.[source]?.keywords?.map((keyword, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-1 rounded-md bg-blue-100 inline-block mr-2"
                          >
                            {keyword}
                          </span>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <div className="text-base font-bold">References</div>
                      <ul className="list-inside text-sm border p-2 rounded-lg text-sky-600">
                        {results?.[source]?.references?.map((ref, idx) => (
                          <li key={idx}>
                            <Link
                              href={ref}
                              className="flex gap-1 items-center hover:underline"
                            >
                              {ref} <ExternalLink size={16} />
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <CTADialog cta={results?.[source]?.cta}/>
                  </TabsContent>
                ))}
            </Tabs>
          </div>
        </div>
        :
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="query"
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
              name="sources"
              render={() => (
                <FormItem>
                  <FormLabel>Sources</FormLabel>
                  <FormControl>
                    <ToggleGroup
                      type="multiple"
                      variant="outline"
                      value={form.getValues("sources")}
                      onValueChange={(value) => {
                        if (value.length > 0) {
                          form.setValue("sources", value as [string, ...string[]]);
                        }
                      }}
                      className="flex justify-start"
                    >
                      <ToggleGroupItem
                        value="google"
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
              name="target"
              render={() => (
                <FormItem>
                  <FormLabel>Target</FormLabel>
                  <FormControl>
                    <Select value={form.getValues("target")} onValueChange={(value) => form.setValue("target", value)}>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select Ad Target" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="views">Get Views</SelectItem>
                        <SelectItem value="likes">Get Likes</SelectItem>
                        <SelectItem value="clicks">Get Clicks</SelectItem>
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
            <Button type="submit" onSubmit={form.handleSubmit(onSubmit)}>
              Get Insights <SendHorizonal size={16} />
            </Button>
          </form>
        </Form>
      }
    </>
  )
}
