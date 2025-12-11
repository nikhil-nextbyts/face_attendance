import './App.css'
import RecognizeFace from './components/RecognizeFace';
import EncodeFace from './components/EncodeFace';
import UsersAll from './components/UsersAll';

function App() {

  return (
    <>
      <UsersAll />
      < EncodeFace />
      <RecognizeFace />
    </>
  );
}

export default App
