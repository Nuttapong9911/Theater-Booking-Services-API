import { Breadcrumb, Menu, theme, Card } from 'antd';
import {Layout, Header, Content, headerStyle, 
  contentStyle, CustomButton, CustomInput, Container, Footer} from 'src/config/styles/components.js'
import { MenuBar, AppHeader, AppFooter } from 'src/config/data/components';

import React, {useState} from 'react'
import { useRouter } from 'next/router'

export default function selectticket() {
    const router = useRouter()

    const {token: { colorBgContainer },} = theme.useToken();

    const mockData = {
      showtime: {
        movie_name: "movie1",
        date: "TUE 12 MAY 2023",
        time: "11.30-13.30",
        theater_name: "THEATER 1"
      },
      theate_seat: [{
        seat_type: "PREMIUM",
        rows: ["A", "B"],
        column: ["1", "2"],
        price: 300
      }]
    }

    return (
    <Container>
      <Layout>
        <AppHeader/>
        <MenuBar router={router} defaultRoute={`buyticket/${router.query._showID}`}/>
        
        <Content
          style={contentStyle}
        >     

        <div>
          select seat
        </div>

          
        </Content>
      </Layout>
      <AppFooter/>
    </Container>
    )
}

