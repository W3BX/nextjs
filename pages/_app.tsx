import type { AppProps } from 'next/app'
import "@/styles/globals.css"
import store from "@/redux/store"
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { persistStore } from 'redux-persist'

let persistor = persistStore(store);
// persistor.purge().then(() => {
//   //Persisted state has been cleared
// });

export default function App({ Component, pageProps }: AppProps) {
  return <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <Component {...pageProps} />
    </PersistGate>
  </Provider>
}
