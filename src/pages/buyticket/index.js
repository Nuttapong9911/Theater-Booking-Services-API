import { Breadcrumb, Menu, theme, Card, Radio, Cascader } from 'antd';
import {Layout, Header, Content, headerStyle, 
  contentStyle, CustomButton, CustomInput, Container, Footer} from 'src/config/styles/components.js'
  import { MenuBar, AppHeader, AppFooter } from 'src/config/data/components';

import React, {useState} from 'react'
import { useRouter } from 'next/router'
import showtime from '@/src/services/models/showtime';

export default function buyticket() {
    const router = useRouter()

    const {token: { colorBgContainer },} = theme.useToken();

    const mockData =  {
      showtimes: [
        {_showID: "1" ,movie_name: "movie1", time: "11.30-13.30", theater: "THEATER 1"},
        {_showID: "2" ,movie_name: "movie2", time: "08.30-10.30", theater: "THEATER 1"},
        {_showID: "3" ,movie_name: "movie2", time: "08.30-10.30", theater: "THEATER 2"},
        {_showID: "4" ,movie_name: "movie3", time: "14.30-16.30", theater: "THEATER 2"},
        {_showID: "5" ,movie_name: "movie3", time: "08.30-10.30", theater: "THEATER 1"},
        {_showID: "6" ,movie_name: "movie1", time: "11.30-13.30", theater: "THEATER 3"},
      ]
    }

    // date pickers part
    // - create 7 days onward for Radio.group
    const dayOfWeeks = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"]
    const months = ["JAN", "FEB", "MAR", "APL", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"]
    let week = []
    for (let index = 0; index <= 6; index++) {
      const day = new Date(new Date().getTime() + index*24*60*60*1000)
      week.push({
        dateObj: day,
        dateLabel: `${dayOfWeeks[day.getDay()]} ${day.getDate()} ${months[day.getMonth()]} ${day.getFullYear()}`
      })
    }
    // - get picked date object by -> week[pickedDateIdx].dateObj
    const [pickedDateIdx, setPickedDateIdx] = useState(0)
    const onDateChange = (e) => {
      // console.log(e.target.value)
      setPickedDateIdx(e.target.value)
    }

    // movie, showtime,theater part
    // - create list of movie names for Cascader (input dropdown)
    let movienames = []
    mockData.showtimes.map((showtime) => {
      if(movienames.indexOf(showtime.movie_name) === -1){
        movienames.push(showtime.movie_name)
      }
    })

    // - useState showtimes [array] -> availble showtimes for picked movie
    // - get picked showtime by -> showtimes[pickedShowIdx]
    const [showtimes, setShowtimes] = useState([...mockData.showtimes])
    const [pickedShowIdx, setPickedShowIdx] = useState("")
    const [pickedMovie, setPickedMovie] = useState("")      //name

    // - filter showtimes when picked movie changes
    const onMovieChange = (value) => {
      setPickedMovie(value[0])
      setShowtimes([...mockData.showtimes].filter((showtime) => {
        return showtime.movie_name === value[0]
      }))
    }

    const onShowChange = (value) => {
      setPickedShowIdx(value)
    }

    const onClickConfirm = () => {
      console.log(week[pickedDateIdx].dateObj)
      console.log(pickedMovie)
      console.log(showtimes[pickedShowIdx])
      router.push(`/buyticket/${showtimes[pickedShowIdx]._showID}`)
    }

    return (
    <Container>
      <Layout>
        <AppHeader/>
        <MenuBar router={router} defaultRoute="buyticket"/>
        
        <Content
          style={contentStyle}
        >     

        <div>
            <h2>Select Date</h2>
            <Radio.Group onChange={onDateChange} defaultValue={0}>
              {
                week.map((day, index) => {
                  return (
                    <Radio.Button key={index} value={index}>{day.dateLabel}</Radio.Button>
                  )
                })
              }
            </Radio.Group>
        </div> 

        <div>
          <h2>Select Movie</h2>
          <Cascader onChange={onMovieChange} placeholder='select movie' 
            options={movienames.map((moviename) => {return {value: moviename, label: moviename}})}
            />
        </div>

        <div>
          <h2>Select Time and Theater</h2>
          <Cascader onChange={onShowChange} placeholder='select Time and Theater'  
            options={showtimes.map((showtime, index) => {
              return {value: index, label: `${showtime.time} ${showtime.theater}`}
              })}
            disabled={pickedMovie === ""}
          />
        
        </div>

        <CustomButton disabled={pickedShowIdx === ""} 
          type='primary'
          onClick={onClickConfirm}
          >CONFIRM</CustomButton>

        </Content>
      </Layout>
      <AppFooter/>
    </Container>
    )
}

