import React from 'react'
import ReactDOM from 'react-dom/client'

import {ApolloClient, ApolloProvider, HttpLink, InMemoryCache} from '@apollo/client';
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx';

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
    uri: "http://localhost:4000/"
  })
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <ApolloProvider client={client}>
    <BrowserRouter>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </BrowserRouter>
  </ApolloProvider>
)
