import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { SourceData } from "@/types/types";

export function CTADialog({ cta }: { cta: SourceData["cta"] }) {
  // State to manage image URL
  // const imageUrl = await fetchPhoto({ query: cta?.title || null }) || "/audi.jpg";

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">View CTA</Button>
      </DialogTrigger>

      <DialogContent className="flex sm:max-w-[500px] h-72">
        <div className="flex flex-col h-full w-2/3">
          <DialogHeader>
            <span className="uppercase text-blue-600 text-lg font-bold opacity-60">
              Logo
            </span>
            <DialogTitle>{cta?.title}</DialogTitle>
            <DialogDescription>{cta?.description}</DialogDescription>
          </DialogHeader>
          <Button type="submit" className="w-fit mt-auto">
            {cta?.cta_message}
          </Button>
        </div>
        <Image
          src="/audi.jpg"
          alt={cta?.title || "Logo"}
          width={150}
          height={425}
          className="h-full w-1/3 object-cover mr-4"
        />
      </DialogContent>
    </Dialog>
  );
}
