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

export function CTADialog({ cta }: { cta: SourceData["cta"] }) {
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
            <DialogDescription>
              {cta?.description}
            </DialogDescription>
          </DialogHeader>
          <Button type="submit" className="w-fit mt-auto">
            {cta?.cta_message}
          </Button>
        </div>
        <img
          src="https://stimg.cardekho.com/images/carexteriorimages/630x420/Audi/A4/10548/1732257078935/front-left-side-47.jpg"
          alt="Audi"
          width={150}
          height={425}
          className="h-full w-1/3 object-cover mr-4"
        />
      </DialogContent>
    </Dialog>
  );
}
