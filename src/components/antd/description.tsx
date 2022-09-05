import { Badge, Descriptions } from 'antd';
import React, { FC } from 'react';
import { DetailProduct } from '../../interfaces/ecommerceV2';

interface Description {
  details: DetailProduct
}

export const Description:FC<Description> = ({details}) => { 
  // console.log(details);
  
  return(
  <Descriptions title="" bordered>
    <Descriptions.Item label="Material" span={3} >{details.material}</Descriptions.Item>
    <Descriptions.Item label="Color" span={3} >{details.color}</Descriptions.Item>
    <Descriptions.Item label="Acabado" span={3} >{details.finishing}</Descriptions.Item>
    <Descriptions.Item label="Logo" span={3} >{details.logo}</Descriptions.Item>
    <Descriptions.Item label="Accesorios" span={3} >{details.accessories}</Descriptions.Item>
    <Descriptions.Item label="Dimensiones">
      
      Alto: {details.dimensions[0]} [cm]
      <br />
      Ancho: {details.dimensions[1]} [cm]
      <br />
      Profundidad: {details.dimensions[2]} [cm]
      <br />
      
    </Descriptions.Item>
  </Descriptions>
);}
