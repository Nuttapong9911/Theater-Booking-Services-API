import { Breadcrumb, Menu, theme, Card } from 'antd';
import {Layout, Header, Content, headerStyle, 
  contentStyle, CustomButton, CustomInput, Container, Footer} from 'src/config/styles/components.js'
import { MenuBar, AppHeader, AppFooter } from 'src/config/data/components';

import React, {useState} from 'react'
import { useRouter } from 'next/router'

export default function register() {
    const router = useRouter()

    const {token: { colorBgContainer },} = theme.useToken();

    const [firstname, setFirstname] = useState("")
    const [lastname, setLastname] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const onFirstnameChange = (e) => {
      console.log(`Firstname: ${e.target.value}`)
      setFirstname(e.target.value)
    }

    const onLastnameChange = (e) => {
      console.log(`Lastname: ${e.target.value}`)
      setLastname(e.target.value)
    }

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
        <MenuBar router={router} defaultRoute="register"/>
        
        <Content
          style={contentStyle}
        >     

        <div style={{width: "30%", margin:"auto"}}>
            <h3 style={{margin: "0 0 0 0"}}>Firstname</h3>
            <CustomInput type='text' size="large" placeholder="firstname" value={firstname} onChange={onFirstnameChange}/>
        </div> 

        <div style={{width: "30%", margin:"auto"}}>
            <h3 style={{margin: "0 0 0 0"}}>Lastname</h3>
            <CustomInput type='text' size="large" placeholder="lastname" value={lastname} onChange={onLastnameChange}/>
        </div> 

        <div style={{width: "30%", margin:"auto"}}>
            <h3 style={{margin: "0 0 0 0"}}>Username</h3>
            <CustomInput type='email' size="large" placeholder="username | email" value={username} onChange={onUsernameChange}/>
        </div> 

        <div style={{width: "30%", margin:"auto"}}>
            <h3 style={{margin: "0 0 0 0"}}>Password</h3>
            <CustomInput.Password size="large" placeholder="password" value={password} onChange={onPasswordChange}/>
        </div> 

        <CustomButton type='primary'>REGISTER</CustomButton>

          
        </Content>
      </Layout>
      <AppFooter/>
    </Container>
    )
}

