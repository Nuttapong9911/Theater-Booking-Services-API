import { Breadcrumb, Menu, theme, Card } from 'antd';
import {Layout, Header, Content, headerStyle, 
  contentStyle, CustomButton, CustomInput, Container, Footer} from 'src/config/styles/components.js'
import { MenuBar, AppHeader, AppFooter } from 'src/config/data/components';

import React from 'react'
import { useRouter } from 'next/router'

import { useQuery, gql } from '@apollo/client';
import client from 'src/config/initApollo'


const GET_MOVIE_BY_ID = gql`
  query GetMovieByID($input: GetMovieByIDInput) {
    getMovieByID(input: $input) {
      _movidID
      movie_name
      description
      genres
      movie_duration
      movie_image
    }
}
`;

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

export default function movieDetail() {
    const router = useRouter()

    const {token: { colorBgContainer },} = theme.useToken();

    const {data, loading, error} = useQuery(GET_ALL_MOVIES)

    if (loading) return <div>Loading...</div>;
    if (error) return `Error! ${error.message}`;
    console.log(data.getAllMovie.data)

    return (
    <Container>
      <Layout>
        <AppHeader/>
        <MenuBar router={router} />
        
        <Content
          style={contentStyle}
        >     

        {/* <div>
            <img src={data.getMovieByID.movie_image} />
            <span>_movieID: {router.query._movieID}</span>
            <span>moviename: {data.getMovieByID.movie_name} (span)</span>
            <span>movie_duration: {data.getMovieByID.movie_duration}</span>
            <span>{
              data.getMovieByID.genres.reduce((str, genre) => {return str += ` ${genre}`})
            }</span>
        </div>  */}
        <div>
          HELLO
        </div>

        </Content>
      </Layout>
      <AppFooter/>
    </Container>
    )
}

