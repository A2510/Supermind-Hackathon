import { ExternalLink, Lightbulb } from "lucide-react";
import Link from "next/link";
import { CTADialog } from "./components/dialog";

export default function Results() {
  return (
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

        <div>
          <div className="text-base font-bold">User Problems</div>
          <ul className="list-disc list-inside text-sm border p-2 rounded-lg">
            <li>Problem 1</li>
            <li>Problem 2</li>
          </ul>
        </div>

        <div>
          <div className="text-base font-bold">Key Triggers</div>
          <ul className="list-disc list-inside text-sm border p-2 rounded-lg">
            <li>Problem 1</li>
            <li>Problem 2</li>
          </ul>
        </div>

        <div>
          <div className="text-base font-bold">Hooks</div>
          <ul className="list-disc list-inside text-sm border p-2 rounded-lg">
            <li>Problem 1</li>
            <li>Problem 2</li>
          </ul>
        </div>

        <div>
          <div className="text-base font-bold">Meta Tags</div>
          <ul className="list-disc list-inside text-sm border p-2 rounded-lg">
            <li>Problem 1</li>
            <li>Problem 2</li>
          </ul>
        </div>

        <div>
          <div className="text-base font-bold">Keywords</div>
          <ul className="list-disc list-inside text-sm border p-2 rounded-lg">
            <span className="px-2 py-1 rounded-md bg-blue-100">food</span>
          </ul>
        </div>

        <div>
          <div className="text-base font-bold">References</div>
          <ul className="list-inside text-sm border p-2 rounded-lg text-sky-600">
            <li>
              <Link
                href="#"
                className="flex gap-1 items-center hover:underline"
              >
                Google for Good <ExternalLink size={16} />
              </Link>
            </li>
          </ul>
        </div>

        <CTADialog />
      </div>
    </div>
  );
}
