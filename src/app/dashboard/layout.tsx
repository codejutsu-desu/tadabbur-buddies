import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col gap-2">
      <div className=" p-2 flex gap-1 justify-end">
        <div className="text-lg ">Profile</div>
        <Button>My Pofile</Button>
      </div>
      <Separator />
      {children}
    </div>
  );
}
