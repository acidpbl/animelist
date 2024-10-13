import { Outlet } from "react-router-dom";
import { ThemeProvider } from "./ThemeContext";
import { Header } from "./components/Header";

const App = () => {
  return (
    <ThemeProvider>
      <Header />
      <Outlet />
    </ThemeProvider>
  );
};

export default App;
