import { Main } from "./components/Main.component";
import { StyledEngineProvider } from "@mui/material/styles";

function App() {
  return (
    <StyledEngineProvider injectFirst>
      <Main />;
    </StyledEngineProvider>
  );
}

export default App;
