import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col gap-2">
      <div className="p-2 flex gap-1 justify-between items-center">
        <div className="md:text-lg xl:text-4xl font-bold ">
          Tadabbur Buddies
        </div>
        <div className="flex gap-2 items-center">
          <div className="text-lg ">Profile</div>
          <Button>My Pofile</Button>
        </div>
      </div>
      <Separator />
      {children}
    </div>
  );
}
