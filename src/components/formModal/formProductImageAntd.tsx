/* This example requires Tailwind CSS v2.0+ */
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
import { graphQLClient, graphQLClientP } from '../../react-query/graphQLClient';
import { UPDATE_IMAGES_FURNITURE, UPDATE_IMAGES_GIFT, UPDATE_IMAGES_JEWELER, UPDATE_IMAGES_TEDDY} from '../../graphql/mutation/ecommerceV2.mutation';
import ImgCrop from 'antd-img-crop';
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface';
import { uuidv3 } from '../../utils/index';
import { ProductV2 } from '../../interfaces/ecommerceV2';
import { useQueryClient } from '@tanstack/react-query';

export interface Option {
  value: string;
  label: string;
  children?: Option[];
}

interface ModalProductImageAntd {
  openMI: boolean
  setOpenMI: React.Dispatch<React.SetStateAction<boolean>>
  product?: ProductV2
}

export const ModalProductImageAntd: FC<ModalProductImageAntd> = ({ openMI, setOpenMI, product }) => {
  const { asPath, query, push, replace } = useRouter()
  const queryClient = useQueryClient()

  const cancelButtonRef = useRef(null)
  // console.log(product?.article.image);
  const file = product?.article.image ?  product?.article.image.map(data => ({uid: uuidv3(), name:"1", url:data.src})) : []
  // console.log(file);
  const [image, setImage] = useState(product?.article.image ? product.article.image : [])
  // console.log('image', image.filter(data => data.src !== 'undefined'));
  
  const [fileList, setFileList] = useState<UploadFile[]>(file!);
  // console.log(fileList);
  
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
    setImage([...image, { src: `${newFile.response?.url}`, alt: `image of ${product?.article.name}` }])
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
    // console.log();
    const data = image.filter(data => data.src !== 'undefined')
    let IMAGES!: string
    let PRODUCTS
    if (query.slug![2] ==='jeweler') {
      IMAGES = UPDATE_IMAGES_JEWELER
      PRODUCTS = 'get-product-jeweler-by-slug'

    } else 
    if (query.slug![2] ==='teddy') {
      IMAGES = UPDATE_IMAGES_TEDDY
      PRODUCTS = 'get-product-teddy-by-slug'

    } else 
    if (query.slug![2] ==='furniture') {
      IMAGES = UPDATE_IMAGES_FURNITURE
      PRODUCTS = 'get-product-furniture-by-slug'

    } else 
    if (query.slug![2] ==='gift')  {
      IMAGES = UPDATE_IMAGES_GIFT
      PRODUCTS = 'get-product-gift-by-slug'

    }
    await graphQLClientP.request(IMAGES, { _id: product?._id, input: data })
    queryClient.invalidateQueries([PRODUCTS])
    
    // replace(`${getURL(asPath)}/${product?.article.slug}`)

    // console.log('Received values of form: ', values);
  };
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
                        Images
                      </Dialog.Title>

                    </div>
                  </div>
                  <Form
                    // {...formItemLayout}
                    form={form}
                    name="register"
                    onFinish={onFinish}
                    initialValues={{
                      title: product ? product?.article.name : "",
                      // mark: product ? product?.article.mark : "",
                      // featured: product ? product?.article.featured.name : "",
                      // route: product ? product?.article.route : "",
                      // description: product ? product?.article.description : "",
                      // price: product ? product?.article.price : 0,
                      // discountPrice: product ? product?.article.discountPrice : 0,
                      // inStock: product ? product?.article.inStock : 1,
                    }}
                    scrollToFirstError
                    className="grid grid-cols-2 gap-x-3"
                  >
                    {/* <Form.Item
                      name="upload"
                      label="Upload"
                      valuePropName="fileList"
                      getValueFromEvent={normFile}
                      className='col-span-2'
                    >
                      <Upload name="logo" action="/upload.do" listType="picture">
                        <Button icon={<UploadOutlined />}>Click to upload</Button>
                      </Upload>
                    </Form.Item> */}

                    <Form.Item
                      name="upload"
                      label=""
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
                          {fileList.length < 5 && '+ Upload'}
                        </Upload>
                      </ImgCrop>
                    </Form.Item>

                    {/* <Form.Item label="Dragger" className='col-span-2'>
                      <Form.Item name="dragger" valuePropName="fileList" getValueFromEvent={normFile} noStyle>
                        <Upload.Dragger name="files" action="/upload.do">
                          <p className="ant-upload-drag-icon">
                            <InboxOutlined />
                          </p>
                          <p className="ant-upload-text">Click or drag file to this area to upload</p>
                          <p className="ant-upload-hint">Support for a single or bulk upload.</p>
                        </Upload.Dragger>
                      </Form.Item>
                    </Form.Item> */}

                    

                  <div className=" col-span-2 px-0 py-3 sm:px-0 flex  justify-end">
                      <button
                        type="submit"
                        className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-pink-600 text-base font-medium text-white hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 sm:ml-3 sm:w-auto sm:text-sm"
                        onClick={() => setOpenMI(false)}
                      >
                        {
                          product ? 'Updated'
                            : 'Created'
                        }
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
