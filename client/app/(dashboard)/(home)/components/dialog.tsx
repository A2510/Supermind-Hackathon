import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  // DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
// import Image from "next/image";
import { SourceData } from "@/types/types";
import { ArrowRight, Sparkles } from "lucide-react";

export function CTADialog({ cta }: { cta: SourceData["cta"] }) {
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
        <img
          src="https://img-cdn.thepublive.com/fit-in/640x430/filters:format(webp)/indianstartupnews/media/media_files/yyrPzhEhn2jan2PNjfYM.png"
          alt="Audi"
          width={150}
          height={425}
          className="h-full w-1/3 object-cover mr-4 rounded"
        />
      </DialogContent>
    </Dialog>
  );
}
