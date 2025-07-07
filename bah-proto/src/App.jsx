import "./App.css";
import MapComponent from "../components/mapComponent";
function App() {
  return (
    <>   <div id="a">
        <img id="svg" src="">
        <div id="other">
        <h4>ChatBot</h4>
        <h4>Backtracking</h4>
        <img id="o" src="icons8-language-50.png" alt="">
        <button id="pehla">SignUp</button>
        <button id="dusra">LogIn</button>
      </div>
    </div>
   <div class="navbar-placeholder">
    
  </div>

  <!-- Compact Sidebar -->
  <div class="sidebar">
    <h2 style="color: black;">PM</h2>
    <button class="btn">PM 2.5</button>
    <button class="btn">PM 10</button>
  </div>
      

      <div>
        <h1>HIII</h1>
      </div>
      <div>
        <MapComponent />
      </div>
    </>
  );
}

export default App;
