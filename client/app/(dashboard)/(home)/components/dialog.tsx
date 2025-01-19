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
import { ArrowRight, Sparkles } from "lucide-react";

export function CTADialog({ cta }: { cta: SourceData["cta"] }) {
  // State to manage image URL
  // const imageUrl = await fetchPhoto({ query: cta?.title || null }) || "/audi.jpg";

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="mt-8">
          Personalized CTA <Sparkles size={12} />
        </Button>
      </DialogTrigger>

      <DialogContent className="flex sm:max-w-[500px] h-72">
        <div className="flex flex-col h-full w-2/3">
          <DialogHeader>
            <DialogTitle>{cta?.title}</DialogTitle>
            <DialogDescription>{cta?.description}</DialogDescription>
          </DialogHeader>
          <Button type="submit" className="w-fit mt-auto">
            {cta?.cta_message} <ArrowRight size={16} />
          </Button>
        </div>
        <Image
          src="/zepto.jpeg"
          alt={cta?.title || "Logo"}
          width={150}
          height={425}
          className="h-full w-1/3 object-cover mr-4 rounded"
        />
      </DialogContent>
    </Dialog>
  );
}
