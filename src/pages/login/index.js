import { Breadcrumb, Menu, theme, Card } from 'antd';
import {Layout, Header, Content, headerStyle, 
  contentStyle, CustomButton, CustomInput, Container, Footer} from 'src/config/styles/components.js'
import { MenuBar, AppHeader, AppFooter } from 'src/config/data/components';

import React, {useState} from 'react'
import { useRouter } from 'next/router'

export default function login() {
    const router = useRouter()

    const {token: { colorBgContainer },} = theme.useToken();

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const onUsernameChange = (e) => {
      console.log(`Usernamename: ${e.target.value}`)
      setUsername(e.target.value)
    }

    const onPasswordChange = (e) => {
      console.log(`Password: ${e.target.value}`)
      setPassword(e.target.value)
    }

    return (
    <Container>
      <Layout>
        <AppHeader/>
        <MenuBar router={router} defaultRoute="login"/>
        
        <Content
          style={contentStyle}
        >     

        <div style={{width: "30%", margin:"auto"}}>
            <h3 style={{margin: "0 0 0 0"}}>Username</h3>
            <CustomInput type='email' size="large" placeholder="username | email" value={username} onChange={onUsernameChange}/>
        </div> 

        <div style={{width: "30%", margin:"auto"}}>
            <h3 style={{margin: "0 0 0 0"}}>Password</h3>
            <CustomInput.Password size="large" placeholder="password" value={password} onChange={onPasswordChange}/>
        </div> 

        <CustomButton type='primary'>LOGIN</CustomButton>

          
        </Content>
      </Layout>
      <AppFooter/>
    </Container>
    )
}

