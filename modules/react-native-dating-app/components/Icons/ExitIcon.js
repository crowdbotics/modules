import * as React from "react"
import Svg, { Path } from "react-native-svg"

function ExitIcon(props) {
  return (
    <Svg
      width={28}
      height={28}
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M27.431 13.716c0 7.575-6.14 13.715-13.715 13.715S0 21.291 0 13.716 6.14 0 13.716 0C21.29 0 27.43 6.14 27.43 13.716z"
        fill="#fff"
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11.638 3.815A3 3 0 0115.5 6.688v14.624a3 3 0 01-3.862 2.873l-6-1.8A3 3 0 013.5 19.512V8.488a3 3 0 012.138-2.873l6-1.8zM16.5 6a1 1 0 011-1h3a3 3 0 013 3v1a1 1 0 01-2 0V8a1 1 0 00-1-1h-3a1 1 0 01-1-1zm6 12a1 1 0 011 1v1a3 3 0 01-3 3h-3a1 1 0 010-2h3a1 1 0 001-1v-1a1 1 0 011-1zm-12-5a1 1 0 100 2h.001a1 1 0 000-2H10.5z"
        fill="#EF7E78"
      />
      <Path
        d="M22.5 14l-2 2m-3-2h5-5zm5 0l-2-2 2 2z"
        stroke="#EF7E78"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}

export default ExitIcon
