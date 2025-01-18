import { Sparkles } from "lucide-react";
import { UserInputForm } from "./components/form";

export default function Page() {
  return (
    <div className="flex flex-1 flex-col items-center gap-4 px-4 py-10">
      <h1 className="flex items-center gap-2 text-xl font-bold">
        Get Quick Insights <Sparkles />
      </h1>
      <div className="mx-auto w-full max-w-3xl rounded-xl border p-4 items-center">
        <UserInputForm />
      </div>
    </div>
  );
}
