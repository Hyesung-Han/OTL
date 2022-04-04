/**
 * LDJ | 2022.03.17 | v1.0
 * @name InjectedConnector
 * @api {web3-react}
 * @des injectedConnector 인스턴스를 생성
 * (connector 들만 모아두고 관리하기 위해 lib/connectors.js 내부에 connector들 선언)
 */

import { InjectedConnector } from "@web3-react/injected-connector";
export const injected = new InjectedConnector();
