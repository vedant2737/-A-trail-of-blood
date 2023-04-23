import React, { Component, useEffect, useState } from 'react';
import './App.scss';
import {Theme1,Theme2,Theme3,Theme4,Feed,Stages,Register,Login,Profile,WinPage} from './components'
import { BrowserRouter, Route, Routes} from 'react-router-dom';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    console.log(error)
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    }

    return this.props.children;
  }
}

function App() {
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1200) {
        setIsSmallScreen(true);
      } else {
        setIsSmallScreen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize(); 
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (isSmallScreen) {
    return <h2>Sorry, This website is not responsive, tihs is a desktop based game ,Please open it in desktop for best experience.</h2>;
  }
  return (
    <>  
      
      <ErrorBoundary>
      <BrowserRouter>
        <Routes>
          <Route path='/'>
            <Route index element={<Feed/>}/>
            <Route path='stages' element={<Stages/>}/>
            <Route path='theme1' element={<Theme3/>}/>
            <Route path='theme2' element={<Theme2/>}/>
            <Route path='theme3' element={<Theme1/>}/>
            <Route path='theme4' element={<Theme4/>}/>
            <Route path='WinPage' element={<WinPage/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
      <Profile />
    </ErrorBoundary>
    </>
  );
}

export default App;
