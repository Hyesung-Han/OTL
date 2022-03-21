import Router from "./routes";
import ThemeConfig from "./theme";
import GlobalStyles from "./theme/globalStyles";

// hook
import { CommonContext } from "./context/CommonContext";

const HOST = "localhost:3000/api";
const serverUrl = `http://${HOST}/v1`; // 사용 X, 큰 의미 없음
const serverUrlBase = `http://${HOST}`;

export default function App() {
  return (
    <CommonContext.Provider
      value={{
        serverUrl,
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
