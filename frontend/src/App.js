import Router from "./routes";
import ThemeConfig from "./theme";
import GlobalStyles from "./theme/globalStyles";

/**
 * LDJ | 2022.03.22 | v1.0
 * @name App.js-CommonContext적용
 * @api -
 * @des 백엔드에 API호출을 위해 url 사용해야되니까, 미리 작성한 CommonContext.js를 전반적으로 등록시켜줌
 * @des Host(현재는 Swagger 주소), Provider를 넣어서 value를 속성으로 받아주게 설정
 */

import { CommonContext } from "./context/CommonContext";

const HOST = "j6a405.p.ssafy.io/api";
const serverUrlBase = `https://${HOST}`;

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
