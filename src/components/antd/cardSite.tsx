import { EditOutlined, EllipsisOutlined, SettingOutlined, DeleteOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { Avatar, Card } from 'antd';
import Image from 'next/image';
import React, { FC } from 'react';
import { graphQLClientP, graphQLClientS } from '../../react-query/graphQLClient';
import { useRouter } from 'next/router';
import Swal from "sweetalert2";
import { useQueryClient } from '@tanstack/react-query';
import { SiteV2 } from '../../interfaces/siteV2';
import { DELETE_SITE } from '../../graphql/mutation/siteV2.mutation';
import { getQuery, getURL } from '../../utils/function';

const { Meta } = Card;
interface CardSiteDashboard {
  site: SiteV2
}

export const CardSiteDashboard:FC<CardSiteDashboard> = ({ site}) => {
  const { push, asPath, query} = useRouter()
  const queryClient = useQueryClient()
  
  // const { mutate } = useSWRConfig()

  const onEdit = () => {
    push(`${asPath}/${site._id}`)
  }
  const onDelete =  async () => {
    // console.log('onClick Delete');
    
    Swal.fire({
			title: 'Está seguro?',
			text: "No podrás revertir esto!",
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Si, bórralo!'
		}).then( async (result) => {
			if (result.isConfirmed ) {
				Swal.fire({ 
						title: 'Eliminado!',
						text: 'El sitio ha sido eliminado.',
						icon: 'success',
						timer: 1000,
						showConfirmButton: false,
					})
          // let REMOVE!: string
          // let PRODUCTS
          // if (query.slug![2] ==='jeweler') {
          //   REMOVE = DELETE_JEWELER_PRODUCT 
          //   PRODUCTS = 'get-products-jeweler'
          // } else 
          // if (query.slug![2] ==='teddy') {
          //   REMOVE = DELETE_TEDDY_PRODUCT 
          //   PRODUCTS = 'get-products-teddy'
          // } else 
          // if (query.slug![2] ==='furniture') {
          //   REMOVE = DELETE_FURNITURE_PRODUCT 
          //   PRODUCTS = 'get-products-furniture'
          // } else 
          // if (query.slug![2] ==='gift') {
          //   REMOVE = DELETE_GIFT_PRODUCT
          //   PRODUCTS = 'get-products-gift'
          // }
        await graphQLClientS.request(DELETE_SITE,  {_id: site?._id})
        queryClient.invalidateQueries(["get-sites"])

        // mutate([PRODUCTS, { site: process.env.API_SITE }])
			}
		})
  }
  return (
        <Card
          size="small"
          className='drop-shadow-lg'
          cover={
            <Image
              width={400}
              height={400}
              src={"/img.webp"}
              alt={"description image"}
            />
          }
          actions={ getQuery(asPath)[1] !== 'products' ? [
            <EditOutlined key="edit" onClick={onEdit} />,
            <DeleteOutlined key="delete" onClick={() => onDelete()} />,
          ]: [
            <PlusCircleOutlined key="products" onClick={onEdit}/>
          ]}
        >
          <Meta
            title={site.data.name}
            description={site.data.description}

          />
        </Card>
      
  )
}
