import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import { Provider } from "react-redux";
import { store } from "./app/store";
import NavBar from "./features/NavBar/NavBar";
import History from "./pages/History";

function App() {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/history" element={<History />} />
        </Routes>
      </Provider>
    </BrowserRouter>
  );
}

export default App;
