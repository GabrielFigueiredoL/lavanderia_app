import StackNavigator from "./assets/components/StackNavigator"
import Toast, { BaseToast, ErrorToast } from "react-native-toast-message"

function App() {
  const toastConfig = {
    success: (props) => (
      <BaseToast
        {...props}
        style={{ borderLeftColor: "#2e8b57" }}
        text1Style={{
          fontSize: 15,
        }}
      />
    ),
    error: (props) => (
      <ErrorToast
        {...props}
        style={{ borderLeftColor: "#cd5c5c" }}
        text1Style={{
          fontSize: 15,
        }}
      />
    ),
  }
  return (
    <>
      <StackNavigator />
      <Toast config={toastConfig} />
    </>
  )
}

export default App
