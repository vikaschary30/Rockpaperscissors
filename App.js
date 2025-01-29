import './App.css';
import ComputerGame from './computerGame';
import FriendGame from './friendGame';
import image from './images/bg.jpg';
import rock from './images/ROCK.png';
import scissors from './images/SCISSORS.png';
import { BrowserRouter as Router, Routes, Route, Link} from "react-router-dom";
import Login from './login';
import Signin from './signin';
import Start from './start';
// import HoverButton1 from './components/btn1';
// import HoverButton2 from './components/btn2';
const App= () => {
  const containerStyle = {
    position: 'relative',
    height: '100vh',
    width: '100vw',
    overflow: 'hidden'
  };
  const bg={
    backgroundImage: `url(${image})`,
    backgroundSize:'cover',
    backgroundRepeat: 'no-repeat',
    height: '100vh',
    width: '100%',
    backgroundPosition: 'center',
    position: 'absolute',
    filter: 'blur(3px)',
  };
  const contentStyle = {
    position: 'relative',
    zIndex: 1,
    textAlign: 'center',
    color: 'white',
    padding: '20px'
  };
  return (
    <Router>
      <div className="App" style={containerStyle}>
        <div style={bg}></div>
          <div style={contentStyle}>
            <Routes>
              <Route path="/signin" element={<Signin/>}></Route>
              <Route path="/login" element={<Login/>}></Route>
              <Route path="/computerGame" element={<ComputerGame/>}></Route>
              <Route path="/friendGame" element={<FriendGame/>}></Route>
              <Route path="/start" element={<Start/>}></Route>
            </Routes>
            <h1>ROCK PAPER SCISSORS</h1>
            <div className='cont'>
              <Link to="/signin" className='btn1'>SIGN UP</Link>
              <br></br>
              <br></br>
              <Link to="/login" className='btn2'>LOGIN</Link>
              <div className='images'>
                <img src={rock} className='rockimage' alt='rockimg'/>
                <img src={scissors} className='scissorsimage' alt='sciimg'/>
              </div>
            </div>
          </div>
        </div>
    </Router>
  );
}

export default App;