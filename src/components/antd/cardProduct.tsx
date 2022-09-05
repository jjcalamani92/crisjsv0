import { EditOutlined, EllipsisOutlined, SettingOutlined, DeleteOutlined } from '@ant-design/icons';
import { Avatar, Card } from 'antd';
import Image from 'next/image';
import React, { FC } from 'react';
import { graphQLClientP } from '../../react-query/graphQLClient';
import { useRouter } from 'next/router';
import Swal from "sweetalert2";
import { ProductV2 } from '../../interfaces/ecommerceV2';
import { DELETE_JEWELER_PRODUCT, DELETE_TEDDY_PRODUCT, DELETE_FURNITURE_PRODUCT, DELETE_GIFT_PRODUCT } from '../../graphql/mutation/ecommerceV2.mutation';
import { useQueryClient } from '@tanstack/react-query';

const { Meta } = Card;
interface CardProduct {
  product: ProductV2
}

export const CardProduct:FC<CardProduct> = ({product}) => {
  const { push, asPath, query} = useRouter()
  const queryClient = useQueryClient()
  
  const onEdit = () => {
    push(`${asPath}/${product.article.slug}`)
  }
  const onDelete =  async() => {
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
						text: 'El producto ha sido eliminado.',
						icon: 'success',
						timer: 1000,
						showConfirmButton: false,
					})
          let REMOVE!: string
          let PRODUCTS
          if (query.slug![2] ==='jeweler') {
            REMOVE = DELETE_JEWELER_PRODUCT 
            PRODUCTS = 'get-products-jeweler'
          } else 
          if (query.slug![2] ==='teddy') {
            REMOVE = DELETE_TEDDY_PRODUCT 
            PRODUCTS = 'get-products-teddy'
          } else 
          if (query.slug![2] ==='furniture') {
            REMOVE = DELETE_FURNITURE_PRODUCT 
            PRODUCTS = 'get-products-furniture'
          } else 
          if (query.slug![2] ==='gift') {
            REMOVE = DELETE_GIFT_PRODUCT
            PRODUCTS = 'get-products-gift'
          }
        await graphQLClientP.request(REMOVE,  {_id: product._id})
        queryClient.invalidateQueries([PRODUCTS])

        // mutate([PRODUCTS, { site: process.env.API_SITE }])
			}
		})
  }
  return (
        <Card
          size="small"
          cover={
            <Image
              width={400}
              height={400}
              src={product.article.image ? product.article.image[0].src : "/img.webp"}
              alt={product.article.image ? product.article.image[0].alt : "description image"}
            />
          }
          actions={[
            <EditOutlined key="edit" onClick={onEdit} />,
            <DeleteOutlined key="delete" onClick={() => onDelete()} />,
            // <PopConfirmComponent key="remove" />
          ]}
        >
          <Meta
            // avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
            title={product.article.name}
            description={product.article.mark}

          />
        </Card>
      
  )
}
