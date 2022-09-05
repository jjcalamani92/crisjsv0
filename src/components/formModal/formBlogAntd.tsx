import { FC, Fragment, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { useRouter } from 'next/router';
import {
  AutoComplete,
  Button,
  Cascader,
  Checkbox,
  Col,
  Form,
  Input,
  InputNumber,
  Radio,
  Row,
  Select,
  Upload,
} from 'antd';
const { Option } = Select;
import { graphQLClient, graphQLClientP, graphQLClientS } from '../../react-query/graphQLClient';
import ImgCrop from 'antd-img-crop';
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface';
import { routes } from '../../utils/functionV2';
import { getQuery, getURL, lastElement, slug } from '../../utils/function';
import type { DefaultOptionType } from 'antd/es/cascader';
import Swal from 'sweetalert2';
import { SiteV2, ChildrenV2 } from '../../interfaces/siteV2';
import { ProductV2 } from '../../interfaces/ecommerceV2';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { ADD_CHILDREN_0, ADD_CHILDREN_1 } from '../../graphql/mutation/siteV2.mutation';


export interface Option {
  value: string;
  label: string;
  children?: Option[];
}

interface ModalBlogAntd {
  openMPD: boolean
  setOpenMPD: React.Dispatch<React.SetStateAction<boolean>>
  children?: ChildrenV2
  product?: ProductV2
  site: SiteV2
}

export const ModalBlogAntd: FC<ModalBlogAntd> = ({ openMPD, setOpenMPD, children, product, site }) => {
  // console.log(children);
  // console.log(['1', '2'].length);
  
  
  const { asPath, query, push, replace } = useRouter()
  const route: Option[] = routes(site)
  const queryClient = useQueryClient()
  const cancelButtonRef = useRef(null)
  const file = children ?  [{uid: '12', name: '2', url: children.seo.image.src}] : []
  // console.log(file);
  
  const [image, setImage] = useState(children ? [children.seo.image] : [])
  const [fileList, setFileList] = useState<UploadFile[]>(file!);
  const normFile = (e: any) => {
    // console.log('images delete', e);
    // console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
    
  };
  const props: UploadProps = {
    onRemove: file => {
      const index = fileList.indexOf(file);
      const newFileList = fileList.slice();
      newFileList.splice(index, 1);
      setFileList(newFileList);
      image.splice(index,1);
      // console.log('image index', index);
      // console.log('remove image', fileList);
    },
    // beforeUpload: file => {
    //   setFileList([...fileList, file]);

    //   return false;
    // },
    fileList,
    
  };
  const onChange: UploadProps['onChange'] = ({ file: newFile, fileList: newFileList , event: newEvent}) => {
    setFileList(newFileList);
    // setFileList([...fileList, {url: newFile.response?.url, uid: "1", name:"image"}]);
    setImage([{ src: `${newFile.response?.url}`, alt: `image of ${product?.article.name}` }])
    // console.log(newEvent);
    
    // console.log(newFile.response?.url);
  };

  const onPreview = async (file: UploadFile) => {
    let src = file.url as string;
    if (!src) {
      src = await new Promise(resolve => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj as RcFile);
        reader.onload = () => resolve(reader.result as string);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  };
  
  const [form] = Form.useForm();
  const onFinish = async (values: any) => {
    // const data = image.filter(data => data.src !== 'undefined')
    

    // if (product) {
    //   Swal.fire({
    //     position: 'center',
    //     icon: 'success',
    //     title: 'Updated Product',
    //     showConfirmButton: false,
    //     timer: 1500
    //   })
    //   let UPDATE!: string
    //   let PRODUCTS

    //   if (query.slug![2] ==='jeweler') {
    //     UPDATE = UPDATE_JEWELER_PRODUCT
    //     PRODUCTS = 'get-product-jeweler-by-slug'
    //   } else 
    //   if (query.slug![2] ==='teddy') {
    //     UPDATE = UPDATE_TEDDY_PRODUCT
    //     PRODUCTS = 'get-product-teddy-by-slug'
    //   } else 
    //   if (query.slug![2] ==='furniture') {
    //     UPDATE = UPDATE_FURNITURE_PRODUCT
    //     PRODUCTS = 'get-product-furniture-by-slug'
    //   } else 
    //   if (query.slug![2] ==='gift') {
    //     UPDATE = UPDATE_GIFT_PRODUCT
    //     PRODUCTS = 'get-product-gift-by-slug'
    //   }
    //   await graphQLClientP.request(UPDATE, { _id: product._id, input: data })
    //   replace(`${getURL(asPath)}/${slug(values.name)}`)
    //   queryClient.invalidateQueries([PRODUCTS])
    //   console.log('update', data);
      
    // } else {
    //   Swal.fire({
    //     position: 'center',
    //     icon: 'success',
    //     title: 'Created Product',
    //     showConfirmButton: false,
    //     timer: 1500
    //   })
    //   let CREATED!: string
    //   let PRODUCTS
    //   if (query.slug![2] ==='teddy') {
    //     CREATED = ADD_TEDDY_PRODUCT
    //     PRODUCTS = 'get-products-teddy'
    //   } else 
    //   if (query.slug![2] ==='jeweler') {
    //     CREATED = ADD_JEWELER_PRODUCT
    //     PRODUCTS = 'get-products-jeweler'
    //   } else 
    //   if (query.slug![2] ==='furniture') {
    //     CREATED = ADD_FURNITURE_PRODUCT
    //     PRODUCTS = 'get-products-furniture'
    //   } else 
    //   if (query.slug![2] ==='gift') {
    //     CREATED = ADD_GIFT_PRODUCT
    //     PRODUCTS = 'get-products-gift'
    //   }
    //   await graphQLClientP.request(CREATED, { input: data })
    //   queryClient.invalidateQueries([PRODUCTS])
    //   mutate([PRODUCTS, { site: process.env.API_SITE }])
    // }
    if (children) {
      
    } else {
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Created Product',
        showConfirmButton: false,
        timer: 1500
      })  
      let ADD!: string
      let data
      if (query.slug?.length === 3) {
        ADD = ADD_CHILDREN_1
        data = {...values, src: image[0].src, children_uid_0: query.slug[2]}
      } else 
      if( query.slug?.length === 2) {
        ADD = ADD_CHILDREN_0
        data = {...values, src: image[0].src}
      }
      await graphQLClientS.request(ADD, { _id: process.env.API_SITE, input: data })
    }
    
    queryClient.invalidateQueries(["get-site"])
    
  };
  const filter = (inputValue: string, path: DefaultOptionType[]) =>
  path.some(
    option => (option.label as string).toLowerCase().indexOf(inputValue.toLowerCase()) > -1,
  );
  return (
    <Transition.Root show={openMPD} as={Fragment}>
      <Dialog as="div" className="relative z-30" initialFocus={cancelButtonRef} onClose={setOpenMPD}>
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
                        {
                          children ? "Update Page" : "New Page"
                        }
                      </Dialog.Title>

                    </div>
                  </div>
                  <Form
                    // {...formItemLayout}
                    form={form}
                    name="register"
                    onFinish={onFinish}
                    initialValues={{
                      name: children ? children.seo.name : "",
                      description: children ? children.seo.description : "",
                      type: children ? children.type : "",
                      alt: children ? children.seo.image.alt : "",
                     
                    }}
                    scrollToFirstError
                    className="grid grid-cols-2 gap-x-3"
                  >
                    <Form.Item
                      name="name"
                      label="Name"
                      className="col-span-2"
                      rules={[
                        {
                          required: true,
                          message: 'Please input your Product Name!',
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>
                    

                    <Form.Item
                      name="description"
                      label="Description"
                      className='col-span-2'
                      rules={[{ required: true, message: 'Please input Description' }]}
                    >
                      <Input.TextArea rows={5}  showCount maxLength={1000} />
                    </Form.Item>
                    
                    <Form.Item
                      name="type"
                      label="Type Page"
                      className='col-span-2'
                      rules={[{ required: true, message: 'Please pick an type!' }]}
                    >
                      <Radio.Group>
                        <Radio.Button value="page">Page</Radio.Button>
                        <Radio.Button value="ecommerce">E-Commerce</Radio.Button>
                        <Radio.Button value="blog">Blog</Radio.Button>
                        <Radio.Button value="service">Services</Radio.Button>
                      </Radio.Group>
                    </Form.Item>

                    {/* <Form.Item name="type2" label="Type Product" className='col-span-2'>
                      <Radio.Group>
                        <Radio value="wear">Ropa</Radio>
                        <Radio value="furniture">Muebles</Radio>
                        <Radio value="teddy">Peluches</Radio>
                        <Radio value="jeweler">Joyeros</Radio>
                        <Radio value="gift">Regalos</Radio>
                        <Radio value="1">item 3</Radio>
                        <Radio value="2">item 1</Radio>
                        <Radio value="3">item 2</Radio>
                        <Radio value="4">item 3</Radio>
                        <Radio value="5">item 1</Radio>
                        <Radio value="6">item 2</Radio>
                        <Radio value="7">item 3</Radio>
                      </Radio.Group>
                    </Form.Item> */}

                    <Form.Item
                      label="Add Image"
                      valuePropName="fileList"
                      getValueFromEvent={normFile}
                      className='col-span-2'
                    >
                      <ImgCrop rotate>
                        <Upload
                          action={`${process.env.APIUP_URL}/api/upload/image`}
                          listType="picture-card"
                          fileList={fileList}
                          onChange={onChange}
                          onPreview={onPreview}
                          {...props}
                        >
                          {fileList.length < 1 && '+ Upload'}
                        </Upload>
                      </ImgCrop>
                    </Form.Item>

                    <Form.Item
                      name="alt"
                      label="Image Description"
                      className='col-span-2'
                      rules={[{ required: true, message: 'Please input Image Description' }]}
                    >
                      <Input.TextArea rows={5}  showCount maxLength={1000} />
                    </Form.Item>
                    

                  <div className=" col-span-2 flex  justify-end gap-3">
                      <button
                        type="submit"
                        className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-pink-600 text-base font-medium text-white hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500  sm:w-auto sm:text-sm"
                        onClick={() => setOpenMPD(false)}
                      >
                        {
                          product ? 'Updated'
                            : 'Created'
                        }
                      </button>
                      <button
                        type="button"
                        className=" w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500  sm:w-auto sm:text-sm"
                        onClick={() => setOpenMPD(false)}
                        ref={cancelButtonRef}
                      >
                        Cancel
                      </button>
                    </div>
                  </Form>

                </div>

              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
