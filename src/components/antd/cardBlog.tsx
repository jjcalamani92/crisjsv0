import { EditOutlined, EllipsisOutlined, SettingOutlined, DeleteOutlined } from '@ant-design/icons';
import { Avatar, Card } from 'antd';
import Image from 'next/image';
import React, { FC } from 'react';
import { graphQLClientP, graphQLClientS } from '../../react-query/graphQLClient';
import { useRouter } from 'next/router';
import Swal from "sweetalert2";
import { ProductV2 } from '../../interfaces/ecommerceV2';
import { DELETE_JEWELER_PRODUCT, DELETE_TEDDY_PRODUCT, DELETE_FURNITURE_PRODUCT, DELETE_GIFT_PRODUCT } from '../../graphql/mutation/ecommerceV2.mutation';
import { useQueryClient } from '@tanstack/react-query';
import { ChildrenV2, SiteV2 } from '../../interfaces/siteV2';
import { DELETE_SITE, DELETE_CHILDREN_0, DELETE_CHILDREN_1, DELETE_CHILDREN_2, DELETE_CHILDREN_3, DELETE_CHILDREN_4, DELETE_CHILDREN_5 } from '../../graphql/mutation/siteV2.mutation';
import { getQuery } from '../../utils/function';
import { BlogV2 } from '../../interfaces/blogV2';

const { Meta } = Card;
interface CardBlogDashboard {
  article: BlogV2
}

export const CardBlogDashboard:FC<CardBlogDashboard> = ({article}) => {
  const { push, asPath } = useRouter()
  const queryClient = useQueryClient()

  
  const onEdit = () => {
    push(`${asPath}/${article?.data.slug}`)
  }
  const onDelete =  async () => {
    
    // Swal.fire({
		// 	title: 'Está seguro?',
		// 	text: "No podrás revertir esto!",
		// 	icon: 'warning',
		// 	showCancelButton: true,
		// 	confirmButtonColor: '#3085d6',
		// 	cancelButtonColor: '#d33',
		// 	confirmButtonText: 'Si, bórralo!'
		// }).then( async (result) => {
		// 	if (result.isConfirmed ) {
		// 		Swal.fire({ 
		// 				title: 'Eliminado!',
		// 				text: 'El sitio ha sido eliminado.',
		// 				icon: 'success',
		// 				timer: 1000,
		// 				showConfirmButton: false,
		// 			})
    //       let REMOVE!: string
    //       let VARIABLES

    //       if (getQuery(asPath).length === 8) {
    //         REMOVE = DELETE_CHILDREN_5
    //         VARIABLES = {_id: getQuery(asPath)[2], input: {children_uid_0: getQuery(asPath)[3], children_uid_1: getQuery(asPath)[4], children_uid_2: getQuery(asPath)[5], children_uid_3: getQuery(asPath)[6], children_uid_4: getQuery(asPath)[7], children_uid_5: children.uid}}
    //       }
    //       if (getQuery(asPath).length === 7) {
    //         REMOVE = DELETE_CHILDREN_4
    //         VARIABLES = {_id: getQuery(asPath)[2], input: {children_uid_0: getQuery(asPath)[3], children_uid_1: getQuery(asPath)[4], children_uid_2: getQuery(asPath)[5], children_uid_3: getQuery(asPath)[6], children_uid_4: children.uid}}
    //       }
    //       if (getQuery(asPath).length === 6) {
    //         REMOVE = DELETE_CHILDREN_3
    //         VARIABLES = {_id: getQuery(asPath)[2], input: {children_uid_0: getQuery(asPath)[3], children_uid_1: getQuery(asPath)[4], children_uid_2: getQuery(asPath)[5], children_uid_3: children.uid}}
    //       }
    //       if (getQuery(asPath).length === 5) {
    //         REMOVE = DELETE_CHILDREN_2
    //         VARIABLES = {_id: getQuery(asPath)[2], input: {children_uid_0: getQuery(asPath)[3], children_uid_1: getQuery(asPath)[4], children_uid_2: children.uid}}
    //       }
    //       if (getQuery(asPath).length === 4) {
    //         REMOVE = DELETE_CHILDREN_1
    //         VARIABLES = {_id: getQuery(asPath)[2], input: {children_uid_0: getQuery(asPath)[3], children_uid_1: children.uid}}
    //       }
    //       if (getQuery(asPath).length === 3) {
    //         REMOVE = DELETE_CHILDREN_0
    //         VARIABLES = {_id: getQuery(asPath)[2], input: {children_uid_0: children.uid}}
    //       }
    //     await graphQLClientS.request(DELETE_CHILDREN_0, VARIABLES )
    //     queryClient.invalidateQueries(["get-site"])

		// 	}
		// })
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
          actions={[
            <EditOutlined key="edit" onClick={onEdit} />,
            <DeleteOutlined key="delete" onClick={() => onDelete()} />,
            // <PopConfirmComponent key="remove" />
          ]}
        >
          <Meta
            // avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
            title={article?.data.title}
            // description={c.data.description}

          />
        </Card>
      
  )
}
