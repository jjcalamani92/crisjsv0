/* This example requires Tailwind CSS v2.0+ */
import { ChangeEvent, FC, Fragment, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { AddProductImage, CreateProductInput, ImageProduct, Product } from '../../interfaces/ecommerceV1';
import { CREATE_WEAR_PRODUCT, ADD_IMAGES_FURNITURE } from '../../graphql/mutation/ecommerceV1.mutation';
import { useSWRConfig } from 'swr';
import { WEARS } from '../../graphql/query/ecommerceV1.query';
import Image from 'next/image';
import axios from "axios";
import { graphQLClient } from '../../react-query/graphQLClient';
import { Icon } from '../icon';
import { getURL } from '../../utils/function';
interface Props {
  openMI: boolean
  setOpenMI: React.Dispatch<React.SetStateAction<boolean>>
  product: Product;
}

export const ModalProductImage: FC<Props> = ({ openMI, setOpenMI, product }) => {
  const { asPath, query, push, replace } = useRouter()
  const [image, setImage] = useState(product.article.image ? product.article.image : [])
  const { mutate } = useSWRConfig()
  // console.log(product.article.image);

  const { register, handleSubmit, formState: { errors }, getValues, setValue, watch } = useForm<AddProductImage>({
    defaultValues: {}
  })

  const cancelButtonRef = useRef(null)
  const onSubmit = async (form: AddProductImage) => {
    // const data = { ...form, }

    await graphQLClient.request(ADD_IMAGES_FURNITURE, { _id: product._id, input: image })
    replace(`${getURL(asPath)}/${product.article.slug}`)
  }

  const filter = (inputValue: string, path: any[]) =>
    path.some(
      (option) =>
        option.label.toLowerCase().indexOf(inputValue.toLowerCase()) > -1
    );

  const onFileSelected = async ({ target }: ChangeEvent<HTMLInputElement>) => {
    // console.log('hi');
    if (!target.files || target.files.length === 0) {
      return;
    }
    try {
      for (const file of target.files) {
        const formData = new FormData();
        formData.append('file', file);

        const { data } = await axios.post(`${process.env.APIUP_URL}/api/upload/image`, formData)
        setImage([...image, { src: `${data.url}`, alt: `image of ${product.article.title}` }])
        // setValue(images, [...getValues(), {src:data.url, alt: 'description image'}], { shouldValidate: true })
      }
    } catch (error) {
      console.log({ error })
    }
  }
  const onDeleteImage = (i: number) => {
    image.splice(i,1);
    setImage([...image]);
  }
  return (
    <Transition.Root show={openMI} as={Fragment}>
      <Dialog as="div" className="relative z-30" initialFocus={cancelButtonRef} onClose={setOpenMI}>
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
                        Add Image
                      </Dialog.Title>
                    </div>
                  </div>
                  <form onSubmit={handleSubmit(onSubmit)} >
                    <div className="grid grid-cols-1 gap-3 ">
                      <div className="col-span-1">
                        {/* <label className="block text-xs md:text-sm font-medium text-gray-700 mb-2">Imagen</label> */}
                        <div className="">

                          <div className="flex items-center">
                            <div className=" rounded-lg overflow-hidden leading-none grid grid-cols-3 gap-3">
                              {
                                image ?
                                  image.map((image, i) => (
                                    <div key={i} className="relative border-2">

                                      <Image
                                        src={image.src}
                                        alt={image.alt}
                                        height={300}
                                        width={300}
                                        objectFit="cover"
                                      />
                                      <div onClick={() => onDeleteImage(i)}>
                                        <Icon icon="x" className='text-xs md:text-sm leading-none mx-1 text-gray-600 hover:text-gray-900 rounded focus:outline-none absolute bottom-1 right-1 w-5 h-5' />
                                      </div>
                                    </div>

                                  ))
                                  :
                                  null
                              }
                              <div className="flex justify-center p-3 border-2 border-gray-300 border-dashed rounded-md ">
                                <div className="space-y-1 text-center">
                                  <Icon icon="photograph" className='mx-auto h-12 w-12 text-gray-400' />

                                  <div className="flex flex-col text-xs md:text-sm text-gray-600">
                                    <label
                                      htmlFor="file-upload"
                                      className="relative cursor-pointer bg-white rounded-md font-medium text-red-500 hover:text-red-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-red-500"
                                    >
                                      <span>Cargar un archivo</span>
                                      <input id="file-upload" name="file-upload" accept="image/png, image/gif, image/jpeg, image/webp" type="file" className="sr-only" onChange={onFileSelected} />
                                    </label>
                                    <p className="pl-1">o arrastrar y soltar</p>
                                  </div>
                                  {/* <p className="text-xs md:text-sm text-gray-500">PNG, JPG, GIF hasta 5MB</p> */}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                    </div>

                    <div className=" px-0 py-3 sm:px-0 sm:flex sm:flex-row-reverse">
                      <button
                        type="submit"
                        className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-pink-600 text-base font-medium text-white hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 sm:ml-3 sm:w-auto sm:text-sm"
                        onClick={() => setOpenMI(false)}
                      >
                        Save
                      </button>
                      <button
                        type="button"
                        className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                        onClick={() => setOpenMI(false)}
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
