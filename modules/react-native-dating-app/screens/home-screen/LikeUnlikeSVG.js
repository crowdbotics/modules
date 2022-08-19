import * as React from "react"
import Svg, { G, Path, Circle, Defs, ClipPath, Rect } from "react-native-svg"
/* SVGR has dropped some elements not supported by react-native-svg: filter */

let tickBG = "#fff"
let crossBG = "#fff"

const LikeUnlikeSVG = (props) => {
    const [bgTick, setBgTick] = React.useState(tickBG)
    const [tickColor, setTickColor] = React.useState("#00E096")

    const [bgCross, setBgCross] = React.useState("#FF2D55")
    const [crossColor, setCrossColor] = React.useState(crossBG)
    const { onPressTick, onPressCross } = props
    return (
    <Svg
    width={183}
    height={100}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <G filter="url(#a)">
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M66.998 9.292c14.285 6.618 36.113 6.15 49.924 0 .031 5.258 0 61.509 0 61.509s-27.468-10.245-49.924 0c.139-5.787-14.284-68.127 0-61.509Z"
        fill='#fff' stroke={"#f2f2f2"} 
      />
      <ClipPath id="cut-off-left">
        <Rect x={7} y={0} width={60} height={80}  />
      </ClipPath>
      <Circle clipPath="url(#cut-off-left)"  cx={50} cy={40} r={35} fill="#fff" stroke={"#f2f2f2"}  />
      
      <ClipPath id="cut-off-right">
        <Rect x={116} y={0} width={60} height={80}  />
      </ClipPath>
      <Circle clipPath="url(#cut-off-right)"  cx={133} cy={40} r={35} fill="#fff" stroke={"#f2f2f2"}  />
      
      <Circle  cx={50} cy={40} r={25} fill={bgCross}
      stroke={crossColor}
      onPress={onPressCross}
      onPressIn={() => {setBgCross('#fff');setCrossColor('#FF2D55')}}
      onPressOut={() => {setBgCross('#FF2D55');setCrossColor('#fff')}}
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        onPress={onPressCross}
        onPressIn={() => {setBgCross('#fff');setCrossColor('#FF2D55')}}
        onPressOut={() => {setBgCross('#FF2D55');setCrossColor('#fff')}}
        d="m50 39.117 5.183-5.184a.626.626 0 1 1 .885.885l-5.184 5.183 5.184 5.182a.626.626 0 0 1-.885.885L50 40.885l-5.182 5.183a.626.626 0 1 1-.885-.885l5.183-5.182-5.183-5.183a.626.626 0 1 1 .885-.885L50 39.117Z"
        fill={crossColor}
      />
      <Circle cx={133} cy={40} r={25} stroke={"#00E096"} 
        fill={bgTick}
        onPress={onPressTick}
        onPressIn={() => {setBgTick('#00E096');setTickColor('#fff')}}
        onPressOut={() => {setBgTick('#fff');setTickColor('#00E096')}}
        />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        onPress={onPressTick}
        onPressIn={() => {setBgTick('#00E096');setTickColor('#fff')}}
        onPressOut={() => {setBgTick('#fff');setTickColor('#00E096')}}
        d="m131.125 43.492 8.308-8.309a.626.626 0 1 1 .885.885l-8.75 8.75a.628.628 0 0 1-.885 0l-3.75-3.75a.625.625 0 1 1 .885-.885l3.307 3.309Z"
        fill={tickColor}
      />
    </G>
    <Defs></Defs>
  </Svg>
  )
}

export default LikeUnlikeSVG
