import Router from "./routes";
import ThemeConfig from "./theme";
import GlobalStyles from "./theme/globalStyles";

// hook
import { CommonContext } from "./context/CommonContext";

const HOST = "localhost:3000/api";
const serverUrlBase = `http://${HOST}`;

export default function App() {
  return (
    <CommonContext.Provider
      value={{
        serverUrlBase,
      }}
    >
      <ThemeConfig>
        <GlobalStyles />
        <Router />
      </ThemeConfig>
    </CommonContext.Provider>
  );
}
