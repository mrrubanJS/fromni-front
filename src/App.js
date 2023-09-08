import { Routes ,Route} from "react-router-dom";

import MessagePage from "./pages/MessagePage/MessagePage.jsx";
import ChannelPage from "./pages/ChannelPage/ChannelPage.jsx";
import Layout from "./components/Layout/Layout.jsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout/>}>
        <Route path="/" element={<MessagePage/>}/>
        <Route path="/channels" element={<ChannelPage/>}/>
      </Route>
    </Routes>
  );
}

export default App;
