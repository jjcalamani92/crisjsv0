/*
  This example requires Tailwind CSS v2.0+ 
  
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/aspect-ratio'),
    ],
  }
  ```
*/
const products = [
  {
    id: 1,
    name: 'Basic Tee',
    href: '#',
    imageSrc: 'https://terrakota.vercel.app/_next/image?url=https%3A%2F%2Fregalosterrakota.com%2Fwp-content%2Fuploads%2F2021%2F12%2FIMG-20211215-WA0010_copy_600x800.jpg&w=750&q=75',
    imageAlt: "Front of men's Basic Tee in black.",
    price: '$35',
    color: 'Black',
  },
  {
    id: 2,
    name: 'Basic Tee',
    href: '#',
    imageSrc: 'https://terrakota.vercel.app/_next/image?url=https%3A%2F%2Fregalosterrakota.com%2Fwp-content%2Fuploads%2F2021%2F12%2FIMG-20211215-WA0010_copy_600x800.jpg&w=750&q=75',
    imageAlt: "Front of men's Basic Tee in black.",
    price: '$35',
    color: 'Black',
  },
  {
    id: 3,
    name: 'Basic Tee',
    href: '#',
    imageSrc: 'https://terrakota.vercel.app/_next/image?url=https%3A%2F%2Fregalosterrakota.com%2Fwp-content%2Fuploads%2F2021%2F12%2FIMG-20211215-WA0010_copy_600x800.jpg&w=750&q=75',
    imageAlt: "Front of men's Basic Tee in black.",
    price: '$35',
    color: 'Black',
  },
  {
    id: 4,
    name: 'Basic Tee',
    href: '#',
    imageSrc: 'https://terrakota.vercel.app/_next/image?url=https%3A%2F%2Fregalosterrakota.com%2Fwp-content%2Fuploads%2F2021%2F12%2FIMG-20211215-WA0010_copy_600x800.jpg&w=750&q=75',
    imageAlt: "Front of men's Basic Tee in black.",
    price: '$35',
    color: 'Black',
  },
  // More products...
]

export default function MoreProduct() {
  return (
    <div className="bg-white">
      <div className="py-16 px-0 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-0">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">Productos Similares</h2>

        <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {products.map((product) => (
            <div key={product.id} className="group relative">
              <div className="w-full min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:h-80 lg:aspect-none">
                <img
                  src={product.imageSrc}
                  alt={product.imageAlt}
                  className="w-full h-full object-center object-cover lg:w-full lg:h-full"
                />
              </div>
              <div className="mt-4 flex justify-between">
                <div>
                  <h3 className="text-sm text-gray-700">
                    <a href={product.href}>
                      <span aria-hidden="true" className="absolute inset-0" />
                      {product.name}
                    </a>
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">{product.color}</p>
                </div>
                <p className="text-sm font-medium text-gray-900">{product.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
