/* This example requires Tailwind CSS v2.0+ */
import { FC, Fragment, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { CreateProductInput, Product } from '../../interfaces/ecommerceV1';
import { Cascader } from 'antd';

import { graphQLClient } from '../../react-query/graphQLClient';
import { CREATE_FURNITURE_PRODUCT, CREATE_WEAR_PRODUCT, UPDATE_FURNITURE_PRODUCT } from '../../graphql/mutation/ecommerceV1.mutation';
import { useSWRConfig } from 'swr';
import { FURNITURIES, WEARS } from '../../graphql/query/ecommerceV1.query';
import { Site } from '../../interfaces/siteV1';
import { routes } from '../../utils/functionV1';
import { getURL, slug } from '../../utils/function';
// import 'antd/lib/cascader/style/index.less'
// import 'antd/lib/cascader/style/index.css';
// import 'antd/dist/antd.css'
export interface Option {
  value: string;
  label: string;
  children?: Option[];
}

interface Props {
  openMP: boolean
  setOpenMP: React.Dispatch<React.SetStateAction<boolean>>
  children?: React.ReactNode;
  product?: Product
  site:Site
}

export const ModalProduct: FC<Props> = ({ openMP, setOpenMP, children, product, site }) => {
  const { asPath, query, push, replace } = useRouter()
  const { mutate } = useSWRConfig()
  // console.log(query.slug![2]);

  const routesss:Option[] = routes(site) 
  // console.log('product', product);
  
  const { register, handleSubmit, formState: { errors }, getValues, setValue, watch } = useForm<CreateProductInput>({
    defaultValues: { 
      title: product ? product?.article.title : "", 
      mark: product ?  product?.article.mark : "",  
      featured: product ?  product?.article.featured.name : "", 
      route: product ?  product?.article.route : "", 
      description: product ?  product?.article.description : "", 
      price: product ?  product?.article.price : 0, 
      discountPrice: product ?  product?.article.discountPrice : 0, 
      inStock: product ?  product?.article.inStock : 0, 
    }
  })
  // console.log(getValues('route').slice(1).split('/'));
  
  const cancelButtonRef = useRef(null)
  const onSubmit = async (form: CreateProductInput) => {
    const data = { ...form, price: Number(form.price), discountPrice: Number(form.discountPrice), inStock: Number(form.inStock), route: route, site: process.env.API_SITE }
    // console.log(data);
    if (product) {
      // console.log('product exists', data);
      await graphQLClient.request(UPDATE_FURNITURE_PRODUCT, {_id: product._id, input: data })
      // mutate([FURNITURIES, { site: process.env.API_SITE }])
      replace(`${getURL(asPath)}/${slug(form.title)}`)
    } else {
      // console.log('product not exists', data);
      
      await graphQLClient.request(CREATE_FURNITURE_PRODUCT, { input: data })
      mutate([FURNITURIES, { site: process.env.API_SITE }])
    }
  }
  const filter = (inputValue: string, path: any[]) =>
    path.some(
      (option) =>
        option.label.toLowerCase().indexOf(inputValue.toLowerCase()) > -1
    );
  const onChangeRoute = (value: any, selectedOptions: any) => {
    {
      selectedOptions
    }
    // console.log(`/${value.join('/')}`)
    setRoute(`/${value.join('/')}`);
  };
  const [route, setRoute] = useState(getValues('route'))
  // console.log(getValues('route'));
  // console.log(getValues('route').slice(1).split('/'));
  
  return (
    <Transition.Root show={openMP} as={Fragment}>
      <Dialog as="div" className="relative z-30" initialFocus={cancelButtonRef} onClose={setOpenMP}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-lg sm:w-full">
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    {/* <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-pink-100 sm:mx-0 sm:h-10 sm:w-10">
                      <ExclamationIcon className="h-6 w-6 text-pink-600" aria-hidden="true" />
                    </div> */}
                    <div className="mt-3 text-center sm:mt-0 sm:text-left">
                      <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-gray-900">
                        New Product
                      </Dialog.Title>

                    </div>
                  </div>
                  <form onSubmit={handleSubmit(onSubmit)} >
                    <div className="grid grid-cols-2 gap-3 ">
                      <div className="relative col-span-2">
                        <label htmlFor="title" className="input-label">Nombre</label>
                        <input type="text" id="floating_filled" className="input-form peer" placeholder=" " {...register('title', {
                          onChange: (e) => { },
                          onBlur: (e) => { },
                          required: 'Este campo es requerido',
                          minLength: { value: 2, message: 'Mínimo 2 caracteres' }
                        })} />
                        <div>
                          {errors.title && <span className="text-xs md:text-sm text-pink-500">{errors.title.message}</span>}
                        </div>
                      </div>
                      <div className="relative col-span-1">
                        <label htmlFor="mark" className="input-label">Marca</label>
                        <input type="text" id="floating_filled" className="input-form peer" placeholder=" " {...register('mark', {
                          onChange: (e) => { },
                          onBlur: (e) => { },
                          required: 'Este campo es requerido',
                          minLength: { value: 2, message: 'Mínimo 2 caracteres' }
                        })} />
                        <div>
                          {errors.mark && <span className="text-xs md:text-sm text-pink-500">{errors.mark.message}</span>}
                        </div>
                      </div>
                      <div className="relative col-span-1">
                        <label htmlFor="featured" className="input-label">Featured</label>
                        <input type="text" id="floating_filled" className="input-form peer" placeholder=" " {...register('featured', {
                          onChange: (e) => { },
                          onBlur: (e) => { },
                          required: 'Este campo es requerido',
                          minLength: { value: 2, message: 'Mínimo 2 caracteres' }
                        })} />
                        <div>
                          {errors.featured && <span className="text-xs md:text-sm text-pink-500">{errors.featured.message}</span>}
                        </div>
                      </div>
                      <div className="col-span-2">
                        <label htmlFor="route" className="block text-xs md:text-sm font-medium text-gray-700">
                          Ruta
                        </label>
                        <Cascader    
                          options={routesss}
                          placeholder="Selecciona la ruta"
                          size={"large"}
                          allowClear={false}
                          fieldNames={{ label: "label", value: "value", children: "children" }}
                          defaultValue={getValues('route').slice(1).split('/')}
                          style={{ width: "100%", marginTop: 1, paddingTop: 2, fontSize: 15 }}
                          showSearch={{
                            filter
                          }}
                          onSearch={(value) => console.log(value)}
                          onChange={onChangeRoute}

                        />
                        {/* <div>
                          {errors.section && <span className="text-xs md:text-sm text-pink-500">{errors.section.message}</span>}
                        </div> */}
                      </div>
                      <div className="relative col-span-2">
                        <label htmlFor="description" className="input-label">Description</label>
                        <textarea rows={3} className="input-form peer" placeholder=" " {...register('description', {
                          onChange: (e) => { },
                          onBlur: (e) => { },
                          required: 'Este campo es requerido',
                          minLength: { value: 2, message: 'Mínimo 2 caracteres' }
                        })} />
                        <div>
                          {errors.description && <span className="text-xs md:text-sm text-pink-500">{errors.description.message}</span>}
                        </div>
                      </div>
                      <div className="relative col-span-1">
                        <label htmlFor="price" className="input-label">Precio</label>
                        <input type="number" className="input-form peer" placeholder=" " {...register('price', {
                          onChange: (e) => { },
                          onBlur: (e) => { },
                          required: 'Este campo es requerido',
                          min: { value: 0, message: 'Mínimo de valor cero' }
                        })} />
                        <div>
                          {errors.price && <span className="text-xs md:text-sm text-pink-500">{errors.price.message}</span>}
                        </div>
                      </div>
                      <div className="relative col-span-1">
                        <label htmlFor="discountPrice" className="input-label">Precio de descuento</label>
                        <input type="number" className="input-form peer" placeholder=" " {...register('discountPrice', {
                          onChange: (e) => { },
                          onBlur: (e) => { },
                          required: 'Este campo es requerido',
                          min: { value: 0, message: 'Mínimo de valor cero' }
                        })} />
                        <div>
                          {errors.discountPrice && <span className="text-xs md:text-sm text-pink-500">{errors.discountPrice.message}</span>}
                        </div>
                      </div>
                      <div className="relative col-span-1">
                        <label htmlFor="inStock" className="input-label">Precio de descuento</label>
                        <input type="number" className="input-form peer" placeholder=" " {...register('inStock', {
                          onChange: (e) => { },
                          onBlur: (e) => { },
                          required: 'Este campo es requerido',
                          min: { value: 0, message: 'Mínimo de valor cero' }
                        })} />
                        <div>
                          {errors.inStock && <span className="text-xs md:text-sm text-pink-500">{errors.inStock.message}</span>}
                        </div>
                      </div>
                    </div>

                    {/* <div className=" bg-white text-right mt-3">
                      <button
                        type="submit"
                        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-xs md:text-sm font-medium rounded-md text-white bg-pink-500 hover:bg-pink-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
                      >
                        {
                          `Crear`
                        }
                      </button>
                    </div> */}
                    <div className=" px-0 py-3 sm:px-0 sm:flex sm:flex-row-reverse">
                      <button
                        type="submit"
                        className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-pink-600 text-base font-medium text-white hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 sm:ml-3 sm:w-auto sm:text-sm"
                        onClick={() => setOpenMP(false)}
                      >
                        {
                        product ? 'Updated'
                        : 'Created'
                        }
                      </button>
                      <button
                        type="button"
                        className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                        onClick={() => setOpenMP(false)}
                        ref={cancelButtonRef}
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>

              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
