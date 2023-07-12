import { Breadcrumb, Menu, theme, Card, Space } from 'antd';
import {Layout, Header, Content, headerStyle, 
  contentStyle, CustomButton, CustomInput, Container, Footer} from 'src/config/styles/components'
import { useRouter } from 'next/router';
import React, { useState, useEffect, useCallback } from 'react'
import { MenuBar, AppHeader, AppFooter } from 'src/config/data/components';
import { useDispatch } from 'react-redux'

import { useQuery, gql } from '@apollo/client';
import client from 'src/config/initApollo'

const GET_ALL_MOVIES = gql`
  query GetAllMovie {
    getAllMovie {
      data {
        _movieID
        movie_name
        description
        genres
        movie_duration
        movie_image
      }
    }
  }
`

//staticly fetch data, then send to props
export const getServerSideProps = async ({ query }) => {
  const { data } = await client.query({
    query: GET_ALL_MOVIES,
  });
  return { props: { data } }
}


const moviesPage = ({data}) => {
  const router = useRouter()

  const {token: { colorBgContainer },} = theme.useToken();

  const { Meta } = Card;

  const dispatch = useDispatch()
  const setStoredMenu = useCallback((menu) => dispatch({ type: "SETMENU", menu: menu }),[dispatch])

  return (
    <Container>
      <Layout>
        <AppHeader/>
        <MenuBar router={router}/>
        
        <Content
          style={contentStyle}
        >      

        <br/>
        <strong style={{fontSize:"250%"}}>All Movies</strong>
        <br/>
          {
            (data) ?
            (
              <Space  wrap>
              {
                data.getAllMovie.data.map((item, index) => {
                  return <Card
                          key={index}
                          hoverable
                          style={{
                            width: 200,
                            height: 380,
                            margin: "20px"
                          }}
                          cover={<img alt={item._movieID} src={item.movie_image} height="250" />}
                          onClick={() => {
                            setStoredMenu("/movies")
                            router.push(`/movies/${item._movieID}`)
                          }}
                        >
                          <Meta title={item.movie_name} description={item.genres.reduce((str, genre) => {return str += ` ${genre}`})}  />
                        </Card>
                })
              }
              </Space>
            ): 
            (
              <div>movie detail</div>
            )
          }
          


          
        </Content>
      </Layout>

      <AppFooter/>
    </Container>
    
  );
};




export default moviesPage;