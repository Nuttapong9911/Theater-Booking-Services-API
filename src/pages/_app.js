import React from 'react'
import App from 'next/app'
import { Provider } from 'react-redux'
import withRedux from 'next-redux-wrapper'
import { ApolloProvider } from '@apollo/client/react';
import client from '../config/initApollo'
import store from '../pages/redux/store'

// import '../styles/globals.css'

class MyApp extends App {
  static async getInitialProps({Component, ctx}) {
    const pageProps = Component.getInitialProps ? await Component.getInitialProps(ctx) : {}
    return {pageProps: pageProps}
}
  render() {
    const { Component, pageProps } = this.props
    return (
      // <Provider store={store}>
      //   <Component {...pageProps} />
      // </Provider>
      
        <Provider store={store}>
          <ApolloProvider client={client}>
            <Component {...pageProps} />
          </ApolloProvider>
        </Provider>
      

    )
  }
}
const makeStore = () => store
export default withRedux(makeStore)(MyApp)
// export default MyApp