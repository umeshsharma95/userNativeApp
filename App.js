import Home from "./containers/Home";
import { Provider } from "react-redux";
import { store } from "./redux/store";

export default function App() {
  return (
    <Provider store={store}>
      <Home />
    </Provider>
  );
}