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
  RadioChangeEvent,
  Row,
  Select,
  Upload,
} from 'antd';
const { Option } = Select;
import { graphQLClientS } from '../../react-query/graphQLClient';
import ImgCrop from 'antd-img-crop';
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface';
import { getQuery, getURL, lastElement, slug } from '../../utils/function';
import type { DefaultOptionType } from 'antd/es/cascader';
import Swal from 'sweetalert2';
import { SiteV2, ChildrenV2 } from '../../interfaces/siteV2';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { ADD_CHILDREN_0, ADD_CHILDREN_1, ADD_CHILDREN_2, ADD_CHILDREN_3, ADD_CHILDREN_4, ADD_CHILDREN_5, UPDATE_CHILDREN_0, UPDATE_CHILDREN_1, UPDATE_CHILDREN_2, UPDATE_CHILDREN_3, UPDATE_CHILDREN_4, UPDATE_CHILDREN_5 } from '../../graphql/mutation/siteV2.mutation';


export interface Option {
  value: string;
  label: string;
  children?: Option[];
}

interface ModalChildrenAntd {
  openMCD: boolean
  setOpenMCD: React.Dispatch<React.SetStateAction<boolean>>
  children?: ChildrenV2
}

export const ModalChildrenAntd: FC<ModalChildrenAntd> = ({ openMCD, setOpenMCD, children }) => {

  
  
  const { asPath, push, replace } = useRouter()
  const query = getQuery(asPath)
  
  const queryClient = useQueryClient()
  const cancelButtonRef = useRef(null)
  const file = children ?  [{uid: '12', name: '2', url: children.seo.image.src}] : [{uid: '12', name: '2', url: "https://res.cloudinary.com/dvcyhn0lj/image/upload/v1655217461/14.1_no-image.jpg_gkwtld.jpg"}]
  // console.log(file);
  
  const [image, setImage] = useState(children ? [children.seo.image] : [{src:"https://res.cloudinary.com/dvcyhn0lj/image/upload/v1655217461/14.1_no-image.jpg_gkwtld.jpg", alt:'image description'}])
  const [radioValue, setRadioValue] = useState("page");
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
    setImage([{ src: `${newFile.response?.url}`, alt: `image of ${children?.seo.description}` }])
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
  // console.log(form);
  
  const onFinish = async (values: any) => {
    // console.log(values);
    
    if (children) {
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Update Children',
        showConfirmButton: false,
        timer: 2000
      })  
      let UPDATE!: string
      let data
      if( query.length === 9) {
        UPDATE = UPDATE_CHILDREN_5
        data = {...values, src: image[0].src, children_uid_0: query[3], children_uid_1: query[4], children_uid_2: query[5], children_uid_3: query[6], children_uid_4: query[7], children_uid_5: query[8]}
      } else
      if( query.length === 8) {
        UPDATE = UPDATE_CHILDREN_4
        data = {...values, src: image[0].src, children_uid_0: query[3], children_uid_1: query[4], children_uid_2: query[5], children_uid_3: query[6], children_uid_4: query[7]}
      } else
      if( query.length === 7) {
        UPDATE = UPDATE_CHILDREN_3
        data = {...values, src: image[0].src, children_uid_0: query[3], children_uid_1: query[4], children_uid_2: query[5], children_uid_3: query[6]}
      } else
      if( query.length === 6) {
        UPDATE = UPDATE_CHILDREN_2
        data = {...values, src: image[0].src, children_uid_0: query[3], children_uid_1: query[4], children_uid_2: query[5]}
      } else
      if( query.length === 5) {
        UPDATE = UPDATE_CHILDREN_1
        data = {...values, src: image[0].src, children_uid_0: query[3], children_uid_1: query[4]}
      } else
      if( query.length === 4) {
        UPDATE = UPDATE_CHILDREN_0
        data = {...values, src: image[0].src, children_uid_0: query[3]}
      }
      await graphQLClientS.request(UPDATE, { _id: query[2],  input: data })
      replace(`${getURL(asPath)}/${slug(values.name)}`)
    } else {
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Created Children',
        showConfirmButton: false,
        timer: 1500
      })  
      let ADD!: string
      let data
      if (query.length === 8) {
        ADD = ADD_CHILDREN_5
        data = {...values, src: image[0].src, children_uid_0: query[3], children_uid_1: query[4], children_uid_2: query[5], children_uid_3: query[6], children_uid_4: query[7]}
      } else 
      if (query.length === 7) {
        ADD = ADD_CHILDREN_4
        data = {...values, src: image[0].src, children_uid_0: query[3], children_uid_1: query[4], children_uid_2: query[5], children_uid_3: query[6]}
      } else 
      if (query.length === 6) {
        ADD = ADD_CHILDREN_3
        data = {...values, src: image[0].src, children_uid_0: query[3], children_uid_1: query[4], children_uid_2: query[5]}
      } else 
      if (query.length === 5) {
        ADD = ADD_CHILDREN_2
        data = {...values, src: image[0].src, children_uid_0: query[3], children_uid_1: query[4]}
      } else 
      if (query.length === 4) {
        ADD = ADD_CHILDREN_1
        data = {...values, src: image[0].src, children_uid_0: query[3]}
      } else 
      if( query.length === 3) {
        ADD = ADD_CHILDREN_0
        data = {...values, src: image[0].src}
      }
      await graphQLClientS.request(ADD, { _id: query[2],  input: data })
    }
    
    queryClient.invalidateQueries(["get-site"])
    form.resetFields();
    setRadioValue('page')
  };
  const filter = (inputValue: string, path: DefaultOptionType[]) =>
  path.some(
    option => (option.label as string).toLowerCase().indexOf(inputValue.toLowerCase()) > -1,
  );
  const onChangeRadio = (e: RadioChangeEvent) => {
    console.log('radio checked', e.target.value);
    setRadioValue(e.target.value);
  };
  return (
    <Transition.Root show={openMCD} as={Fragment}>
      <Dialog as="div" className="relative z-30" initialFocus={cancelButtonRef} onClose={setOpenMCD}>
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
                    {/* {
                      
                      children?.type === 'ecommerce' ?
                        :
                        
                    } */}
                        <Form.Item
                        name="type"
                        label="Type Page"
                        className='col-span-2'
                        rules={[{ required: true, message: 'Please pick an type!' }]}
                      >
                        <Radio.Group onChange={onChangeRadio} value={radioValue}>
                          <Radio.Button value="page">Page</Radio.Button>
                          <Radio.Button value="ecommerce">E-Commerce</Radio.Button>
                          <Radio.Button value="blog">Blog</Radio.Button>
                          <Radio.Button value="service">Services</Radio.Button>
                        </Radio.Group>
                      </Form.Item>
                      {
                        radioValue === "ecommerce" &&
                        <Form.Item name="type" label="" className='col-span-2'>
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
                        </Form.Item>
                        }

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
                        onClick={() => setOpenMCD(false)}
                      >
                        {
                          children ? 'Updated'
                            : 'Created'
                        }
                      </button>
                      <button
                        type="button"
                        className=" w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500  sm:w-auto sm:text-sm"
                        onClick={() => setOpenMCD(false)}
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
