/* eslint-disable react/no-children-prop */
import { useRouter } from "next/router";
import { FC, Fragment, useState } from "react";
import { CreateProductInput, Product } from "../../interfaces/ecommerceV1";
import { Menu, Transition, Dialog, Disclosure } from '@headlessui/react';
import { Icon } from "../icon";
import { classNames, getQuery } from "../../utils/function";
import { Site } from "../../interfaces/siteV1";
import { ModalProductAntd } from '../formModal/formProductAntd';
import { ModalProductImageAntd } from "../formModal/formProductImageAntd";
import { ProductV2 } from '../../interfaces/ecommerceV2';
import { ChildrenV2, SiteV2 } from "../../interfaces/siteV2";
import { ModalChildrenAntd } from "../formModal/formChildrenAntd";
import { getChildrenDashboard, sitePaths } from "../../utils/functionV2";
import { MoreOutlined } from "@ant-design/icons";
import { ModalSiteAntd } from "../formModal/formSiteAntd";
import { ModalSiteImageAntd } from "../formModal/formSiteImageAntd";
interface HeadingSiteDashboard {
  title: string;
  
  sites:SiteV2[]
}
const formSite = [
  { name: 'Add Site', href: 'add-site', current: false},
  { name: 'Delete Sites', href: 'delete-sites', current: false},
  { name: 'Update Images', href: 'update-image', current: true },
  // { name: 'Update Page ', href: 'update-page', current: true },
  // { name: 'Add Tags', href: 'update-tag', current: true },
  // { name: 'Add Specs', href: 'new', current: true },
  // { name: 'Add Colors', href: 'new', current: true },
  // { name: 'Add Sizes', href: 'new', current: true },
  // { name: 'Updated Site', href: 'updated', current: true },
  // { name: 'Delete Site', href: 'delete', current: true },
]

export const HeadingSiteDashboard: FC<HeadingSiteDashboard> = ({ title, sites }) => {
  
  const { asPath, push, query } = useRouter()
  // const datas = getChildrenDashboard(site, asPath)
  // console.log(sitePaths(sites));
  
  // console.log(datas);
  
  const [data, setData] = useState<any>()
  const [site, setSite] = useState<any>()
  const [openMSI, setOpenMSI] = useState(false)
  const [openMSD, setOpenMSD] = useState(false)
  const click = (data: string) => {
    if (data === 'add-site') {
      // console.log('update-product');
      setOpenMSD(true)
      setData(null)
    } else if (data === 'update-image') {
      setOpenMSI(true)
      // setData(datas)
      // console.log('update-image');
      
    } else {
      null
    }
  }
  
  return (
    <div className="flex items-baseline justify-between py-6">
      <h1 className="text-4xl font-extrabold tracking-tight text-gray-900">{title}</h1>

      <Menu as="div" className="relative z-10 text-left flex w-auto">
      {
        getQuery(asPath)[1] === 'products' ? null :

        <Menu.Button className=" justify-center  text-sm font-medium text-gray-700 hover:text-gray-900">
          <div className="inline-block text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-1.5" >
            {/* <Icon icon='dots-vertical' /> */}
            <MoreOutlined  style={{ fontSize: '25px' }}/>
          </div>
        </Menu.Button>
      }
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
              {formSite.map((data, i) => (
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
      
      <ModalSiteAntd openMSD={openMSD} setOpenMSD={setOpenMSD} site={site} children={data!} /> 
      <ModalSiteImageAntd openMSI={openMSI} setOpenMSI={setOpenMSI} /> 
    </div>
  )
}