import React from "react"
import { View, Text } from "react-native"
import { Avatar } from "react-native-elements"
import { Color, styles } from "./styles"
import { getInitials, transformLabel } from "./utils"

const UserInfo = props => (
  <View>
    <Text style={styles.label}>{transformLabel(props.label)}</Text>
    <Text style={styles.text}>
      {props.value ? props.value : "Not available"}
    </Text>
  </View>
)

const ViewUser = props => {
  const { user } = props
  const initials = getInitials(user)
  return (
    <View>
      {user.id ? (
        <View>
          <View style={styles.profileIcon}>
            <Avatar
              size="large"
              rounded
              icon={{ name: "user", type: "font-awesome" }}
              title={initials}
              containerStyle={{ backgroundColor: Color.pink }}
            />
          </View>
          <UserInfo
            label="Name"
            value={`${user.first_name} ${user.last_name}`}
          />
          <UserInfo label="Email" value={user.email} />
          <UserInfo label="Biography" value={user.bio} />
        </View>
      ) : (
        <Text style={styles.label}>No user information available.</Text>
      )}
    </View>
  )
}

export default ViewUser