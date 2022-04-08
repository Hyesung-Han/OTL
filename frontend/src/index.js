import "simplebar/src/simplebar.css";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import App from "./App";

import { StrictMode } from "react";
import { Web3ReactProvider } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";

import store from "./redux/configStore";
import { Provider } from "react-redux";
import persistStore from "redux-persist/es/persistStore";
import { PersistGate } from "redux-persist/integration/react";

const persistor = persistStore(store);

/**
 * LDJ | 2022.03.17 | v1.0
 * @name getLibrary(provider)
 * @api -
 * @des MetaMask 지갑 주소를 기반으로 연동하기 위한 기본 설정
 */

function getLibrary(provider) {
  const library = new Web3Provider(provider, "any");
  return library;
}

/**
 * LDJ | 2022.03.17 | v1.0
 * @name ReactDOM.render
 * @api {}
 * @des 설치한 @web3-react/core에서 제공하는 Web3ReactProvider 를 App root의 provider로 제공하고
 * web3 객체를 인스턴스화 하는 getLibrary 함수를 정의하여 prop로 전달
 */

ReactDOM.render(
  <StrictMode>
    <Web3ReactProvider getLibrary={getLibrary}>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <HelmetProvider>
            <BrowserRouter>
              <App />
            </BrowserRouter>
          </HelmetProvider>
        </PersistGate>
      </Provider>
    </Web3ReactProvider>
  </StrictMode>,
  document.getElementById("root")
);
