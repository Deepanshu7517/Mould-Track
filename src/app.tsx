import RouterProviderComponent from "./routes";
import { store } from './toolkit/store/store'
import { Provider } from 'react-redux'
import "./index.css"
import "./app/globals.css"
const App = () => {
  return (
    <Provider store={store}>
      <RouterProviderComponent />
    </Provider>
  );
}

export default App;