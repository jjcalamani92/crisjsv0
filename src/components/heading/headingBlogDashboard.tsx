/* eslint-disable react/no-children-prop */
import { useRouter } from "next/router";
import { FC, Fragment, useState } from "react";
import { Menu, Transition, Dialog, Disclosure } from '@headlessui/react';
import { classNames, getQuery } from "../../utils/function";
import { ChildrenV2, SiteV2 } from "../../interfaces/siteV2";
import { ModalChildrenAntd } from "../formModal/formChildrenAntd";
import { getChildrenDashboard, sitePaths } from "../../utils/functionV2";
import { MoreOutlined } from "@ant-design/icons";
import { Button } from "antd";


interface HeadingBlogDashboard {
  title: string;
  
  site:SiteV2
}
const formPage = [
  { name: 'Add Blog', href: 'add-blog', current: false },
  // { name: 'Update Page ', href: 'update-page', current: false },
]

export const HeadingBlogDashboard: FC<HeadingBlogDashboard> = ({ title, site }) => {
  
  const { asPath, push, query } = useRouter()
  const datas = getChildrenDashboard(site, asPath)
  
  // console.log(datas);
  
  const [data, setData] = useState<any>()
  const [openMCD, setOpenMCD] = useState(false)
  const click = (data: string) => {
    if (data === 'add-page') {
      // setData(null)
      // setOpenMCD(true)
    } else {
      null
    }
  }

  return (
    <div className="flex items-baseline justify-between py-6">
      <h1 className="text-4xl font-extrabold tracking-tight text-gray-900">{title} </h1>

      <Menu as="div" className="relative z-10 text-left flex w-auto">
        <Menu.Button className=" justify-center  text-sm font-medium text-gray-700 hover:text-gray-900">
          <div className="inline-block text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-1.5" >
            {/* <Icon icon='dots-vertical' className="w-6 h-6" /> */}
            <MoreOutlined  style={{ fontSize: '25px' }}/>

          </div>
        </Menu.Button>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="origin-top-right absolute top-10 right-0 mt-2 w-40 rounded-md shadow-2xl bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="py-1">
              {formPage.map((data, i) => (
                <Menu.Item key={i}>
                  {({ active }) => (
                    <div
                      onClick={() => click(data.href)}
                      className={classNames(
                        data.current ? 'font-medium text-gray-900' : 'text-gray-500',
                        active ? 'bg-gray-100' : '',
                        'block px-4 py-2 text-sm'
                      )}
                    >
                      {data.name}
                    </div>
                  )}
                </Menu.Item>
              ))}
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
      
      {/* <ModalChildrenAntd openMCD={openMCD} setOpenMCD={setOpenMCD} children={data!} />  */}
    </div>
  )
}