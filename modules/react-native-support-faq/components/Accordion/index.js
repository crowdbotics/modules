import React, {Fragment} from 'react';
import { Text, View, Image } from 'react-native';
import options from "../../options";
// @ts-ignore
import chevronDown from "../../chevrondown.png";
// @ts-ignore
import arrow from "../../arrow.png";

const Accordion = () => {
  return <Fragment>
    {
      options.FAQList.map((FAQ, index) => (
        <View key={index} style={options.styles.faqCard}>
          <View style={options.styles.faqsection}>
            <Text style={options.styles.subHeading}>{FAQ.title}</Text>
            <Image style={options.styles.downIcon} resizeMode="contain" source={chevronDown} />
          </View>
          {
            FAQ.data.map((item, i) => (
              <View key={i} style={options.styles.accordian}>
                <View style={options.styles.accordianlist}>
                  <Image style={options.styles.arrowIcon} resizeMode="contain" source={arrow} />
                  <Text style={options.styles.smallHeading}>{item}</Text>
                </View>
              </View>
            ))
          }

        </View>
      ))
    }
  </Fragment>
}
export default Accordion