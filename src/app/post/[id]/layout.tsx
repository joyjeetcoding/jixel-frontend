import Navbar from "@/components/Navbar";

export default function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="md:max-w-3xl lg:max-w-6xl md:mx-auto ">
      
      <Navbar />
      {children}
    </main>
  );
}
