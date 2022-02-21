import { Platform, StyleSheet } from "react-native";
export default StyleSheet.create({
    textInput: {
        paddingVertical: 4,
        paddingHorizontal: 4
    },
    section: {
        paddingHorizontal: 8,
        paddingVertical: 8,
        marginVertical: 8,
        marginHorizontal: 8,
        backgroundColor: 'white',
        borderRadius: 6
    }
});
export const NavigationStyle = StyleSheet.create({
    title: {
        fontSize: 16
    },
    headerRight: {
        paddingRight: Platform.OS === 'web' ? 16 : 0
    }
});
export const ChatStyle = StyleSheet.create({
    container: {
        paddingTop: 4
    }
});
export const ListViewStyle = StyleSheet.create({
    container: {
        paddingVertical: 8,
        paddingHorizontal: 8
    },
    title: {
        color: '#333',
        fontSize: 16,
        fontWeight: '600',
        paddingBottom: 4
    },
    subtitle: {
        color: '#3d3d3d',
        fontSize: 16,
        paddingBottom: 4,
        paddingTop: 6
    },
    circle: {
        backgroundColor: '#faa',
        borderRadius: 50,
        width: 50,
        height: 50,
        marginRight: 8
    },
    separator: {
        borderBottomWidth: 0.3,
        borderBottomColor: 'lightgrey',
        width: '100%',
        paddingBottom: 12,
    }
});
