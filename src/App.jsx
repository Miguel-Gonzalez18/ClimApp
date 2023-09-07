import Main from "./components/Main"
import Header from "./components/Header"
import Footer from "./components/Footer"
//context
import { ClimaProvider } from "./context/ClimaProvider"
function App() {
  return (
    <ClimaProvider>                       
      <Header />
      <Main/>
      <Footer/>
    </ClimaProvider>
  )
}

export default App
