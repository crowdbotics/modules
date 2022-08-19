import * as React from "react"
import Svg, { Path } from "react-native-svg"

function BackButton(props) {
  const { bgColor } = props;
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
        opacity={0.5}
        d="M27.431 13.716c0 7.575-6.14 13.715-13.715 13.715S0 21.291 0 13.716 6.14 0 13.716 0C21.29 0 27.43 6.14 27.43 13.716z"
        fill={bgColor || "#F9D8D9"}
      />
      <Path
        d="M17.943 6.237c.372.288.406.737.101 1.054l-.101.091-8.41 6.488 8.41 6.488c.372.288.406.737.101 1.054l-.101.091c-.373.288-.956.314-1.367.079l-.117-.079-9.152-7.06c-.372-.288-.406-.738-.101-1.054l.101-.091 9.152-7.06c.41-.317 1.074-.317 1.484 0z"
        fill="#231F20"
      />
    </Svg>
  )
}

export default BackButton
