import { StyleSheet } from "react-native"

export const Color = {
  malibu: "#46E1FD",
  pink: "#e97d77",
  white: "#fff",
  whiteOff: "#F4F5F9",
  steel: "#CCCCCC",
  black: "#060606",
  facebook: "#3b5998",
  red: "red",
  gray: "#6A6A6A"
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    marginVertical: 20,
    width: "100%"
  },
  content: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
    textAlign: "center"
  },
  header: {
    fontSize: 25,
    color: Color.gray
  },
  profileIcon: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 5
  },
  label: { color: Color.gray, fontSize: 12, fontWeight: "bold" },
  text: { color: Color.black, fontSize: 16, marginTop: 3, marginBottom: 12 }
})

export const inputStyles = {
  input: {
    borderColor: Color.steel,
    borderWidth: 0.9,
    borderRadius: 6,
    fontSize: 15,

    marginVertical: 10,
    paddingHorizontal: 15,
    paddingVertical: 7,
    color: Color.black
  },
  date: { width: "100%", paddingVertical: 0 },
  label: { color: Color.gray, fontSize: 12, fontWeight: "bold" },
  error: { color: Color.red, fontSize: 9 }
}

export const buttonStyles = {
  view: {
    backgroundColor: Color.pink,
    borderRadius: 10,
    justifyContent: "center",
    marginHorizontal: 10,
    marginBottom: 10,
    height: 44
  },
  text: {
    fontSize: 16,
    textAlign: "center",
    color: Color.white,
    marginHorizontal: 40,
    marginVertical: 10
  }
}
