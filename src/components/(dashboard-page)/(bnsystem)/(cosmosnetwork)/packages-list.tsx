import Particles from "@/components/magicui/particles";
import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationLink,
  PaginationEllipsis,
  PaginationNext,
} from "@/components/ui/pagination";
import Image from "next/image";
import Link from "next/link";

export function PackagesList() {
  const products = [
    {
      id: 1,
      image: "/Earth.png",
      title: "Earth",
      href: "/dashboard/bnsystem/1/1",
      description: "UV protection",
      price: 5,
      width: 200,
      height: 200,
    },
    {
      id: 2,
      image: "/Moon.png",
      title: "Moon",
      description: "Stylish and practical",
      price: 10,
      width: 215,
      height: 200,
    },
    {
      id: 3,
      image: "/Mars.png",
      title: "Mars",
      description: "High-quality sound",
      price: 25,
      width: 200,
      height: 200,
    },
    {
      id: 4,
      image: "/Mecury.png",
      title: "Mercury",
      description: "Timeless design",
      price: 50,
      width: 200,
      height: 200,
    },
    {
      id: 5,
      image: "/Venus.png",
      title: "Venus",
      description: "Vintage charm",
      price: 100,
      width: 215,
      height: 200,
    },
    {
      id: 6,
      image: "/Jupiter.png",
      title: "Jupiter",
      description: "Durable and spacious",
      price: 250,
      width: 200,
      height: 200,
    },
    {
      id: 7,
      image: "/Saturn.png",
      title: "Saturn",
      description: "Soft and warm",
      price: 500,
      width: 400,
      height: 200,
    },
    {
      id: 8,
      image: "/Uranus.png",
      title: "Uranus ",
      description: "Decorative accent",
      price: 1000,
      width: 200,
      height: 200,
    },
    {
      id: 9,
      image: "/Neptune.png",
      title: "Neptune",
      description: "Soy-based, long-lasting",
      price: 2500,
      width: 200,
      height: 200,
    },
    {
      id: 10,
      image: "/Pluto.png",
      title: "Pluto",
      description: "Heirloom quality",
      price: 5000,
      width: 200,
      height: 200,
    },
  ];
  return (
    <div className="container mx-auto px-4 md:px-6 py-12">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-muted-foreground/20  rounded-lg overflow-hidden shadow-lg border  shadow-border"
          >
            <div
              style={{ width: 330, height: 250 }}
              className="relative bg-black flex items-center justify-center "
            >
              <Image
                src={product.image}
                alt="hi"
                width={product.width}
                height={product.height}
                className={`object-center absolute ${
                  product.id == 3 ? "scale-[135%]" : ""
                }`}
              />

              {/* <Particles
                className="absolute w-full inset-0 b"
                quantity={100}
                ease={80}
                color="#ffffff"
                refresh
              /> */}
            </div>
            <div className="p-2 flex items-center justify-between border">
              <div>
                <h3 className="text-lg font-semibold">{product.title}</h3>
                <div className="mt-4 font-semibold">${product.price}</div>
              </div>
              <div>
             <Link href={`/dashboard/bnsystem/1/${product.id}`}>   <Button variant="default">Upgrade</Button></Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    
    </div>
  );
}
