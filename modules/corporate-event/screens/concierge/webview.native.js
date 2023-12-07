import { React } from "react"
import { WebView } from "react-native-webview"

const Webview = ({uri}) => {
  return (
    <WebView 
      source={{ uri: 'https://forms.office.com/pages/responsepage.aspx?id=3rHyHwOoOUuL6SH2rqsAsMQ7BHK8KD1NvOoXH8ikO6tUMzQ2RFQ0V0ZJUUJOU0ZMWkc1TklVRkdCVS4u' }} 
      javaScriptEnabled={true}
      domStorageEnabled={true}
      startInLoadingState={true}
      style={{ flex: 1 }} />
  )
}

export default Webview