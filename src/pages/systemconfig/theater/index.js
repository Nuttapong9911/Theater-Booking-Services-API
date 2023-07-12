import { Breadcrumb, Menu, theme, Card } from 'antd';
import {Layout, Header, Content, headerStyle, 
  contentStyle, CustomButton, CustomInput, Container, Footer} from 'src/config/styles/components.js'
import { MenuBar, AppHeader, AppFooter } from 'src/config/data/components';

import React from 'react'
import { useRouter } from 'next/router'

export default function configTheater() {
    const router = useRouter()

    const {token: { colorBgContainer },} = theme.useToken();

    return (
    <Container>
      <Layout>
        <AppHeader/>
        <MenuBar router={router} defaultRoute="systemconfig/theater"/>
        
        <Content
          style={contentStyle}
        >     

        <div>
            config theater
        </div> 

          
        </Content>
      </Layout>
      <AppFooter/>
    </Container>
    )
}

