import './App.css';
import Canvas from './components/Canvas'
import { drawing } from './components/DrawingFactory'

function App() {
  return (
    <Canvas drawing={drawing}/>
  );
}

export default App;
