import * as React from "react"
import Svg, { Path } from "react-native-svg"

function LoveChat(props) {
  return (
    <Svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M9.6 24a9.6 9.6 0 110-19.2 9.6 9.6 0 010 19.2zm0-2.4a7.199 7.199 0 005.091-12.291A7.2 7.2 0 109.6 21.6zm3.6-6a3.6 3.6 0 11-7.2 0h7.2zm-6-2.4a1.2 1.2 0 100-2.4 1.2 1.2 0 000 2.4zm4.8 0a1.2 1.2 0 110-2.4 1.2 1.2 0 010 2.4zm7.95-6c-.992-.216-4.05-1.908-4.05-4.95A2.25 2.25 0 0119.95.9 2.25 2.25 0 0124 2.25c0 3.042-3.058 4.734-4.05 4.95z"
        fill="#000"
      />
    </Svg>
  )
}

export default LoveChat
