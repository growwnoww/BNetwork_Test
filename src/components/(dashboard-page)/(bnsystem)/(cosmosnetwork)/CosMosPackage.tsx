import Link  from "next/link"
import Image from "next/image"

const products = [
  {
    id: 1,
    name: 'Earthen Bottle',
    href: '/dashboard/bnsystem/1/5',
    price: '$5',
    imageSrc: 'EarthImg',
    imageAlt: 'Tall slender porcelain bottle with natural clay textured body and cork stopper.',
  },
  {
    id: 2,
    name: 'Nomad Tumbler',
    href: '/dashboard/bnsystem/1/10',
    price: '$10',
    imageSrc: 'MoonImg',
    imageAlt: 'Olive drab green insulated bottle with flared screw lid and flat top.',
  },
  {
    id: 3,
    name: 'Focus Paper Refill',
    href: '/dashboard/bnsystem/1/25',
    price: '$25',
    imageSrc: 'MarImg',
    imageAlt: 'Person using a pen to cross a task off a productivity paper card.',
  },
  {
    id: 4,
    name: 'Machined Mechanical Pencil',
    href: '/dashboard/bnsystem/1/50',
    price: '$50',
    imageSrc: 'MercuryImg',
    imageAlt: 'Hand holding black machined steel mechanical pencil with brass tip and top.',
  },
  {
    id: 5,
    name: 'Focus Paper Refill',
    href: '/dashboard/bnsystem/1/100',
    price: '$100',
    imageSrc: 'VenusImg',
    imageAlt: 'Person using a pen to cross a task off a productivity paper card.',
  },
  {
    id: 6,
    name: 'Machined Mechanical Pencil',
    href: '/dashboard/bnsystem/1/250',
    price: '$250',
    imageSrc: 'JupiterImg',
    imageAlt: 'Hand holding black machined steel mechanical pencil with brass tip and top.',
  },
  {
    id: 7,
    name: 'Focus Paper Refill',
    href: '/dashboard/bnsystem/1/500',
    price: '$500',
    imageSrc: 'SaturnImg',
    imageAlt: 'Person using a pen to cross a task off a productivity paper card.',
  },
  {
    id: 4,
    name: 'Machined Mechanical Pencil',
    href: '/dashboard/bnsystem/1/1000',
    price: '$1000',
    imageSrc: 'UranusImg',
    imageAlt: 'Hand holding black machined steel mechanical pencil with brass tip and top.',
  },
  {
    id: 3,
    name: 'Focus Paper Refill',
    href: '#',
    price: '$2500',
    imageSrc: 'NeptuneImg',
    imageAlt: 'Person using a pen to cross a task off a productivity paper card.',
  },
  {
    id: 4,
    name: 'Machined Mechanical Pencil',
    href: '#',
    price: '$5000',
    imageSrc: 'PlutoImg',
    imageAlt: 'Hand holding black machined steel mechanical pencil with brass tip and top.',
  },

  // More products...
]

export default function CosMosPackage() {
  return (
    <div className="">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-full lg:px-10">
        <h2 className="sr-only">Products</h2>

        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 xl:gap-x-8 ">
          {products.map((product) => (
            <Link key={product.id} href={product.href} className="group ">
              <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 ">
                <Image
                  alt={product.imageAlt}
                  src={`/${product.imageSrc}.png`}
                  width={300}
                  height={300}
                  className="h-full w-full object-cover object-center group-hover:opacity-75"
                />
              </div>
              <h3 className="mt-4 text-sm ">{product.name}</h3>
              <p className="mt-1 text-lg font-medium ">{product.price}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
