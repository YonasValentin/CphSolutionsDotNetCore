import { Store } from 'vuex'
import { PublicClientApplication } from '@azure/msal-browser'
import Emitter from "tiny-emitter";
import { BaseState } from './types/base';

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $store: Store<BaseState>
    $msalInstance: PublicClientApplication;
    $emitter: Emitter.TinyEmitter;
  }
}