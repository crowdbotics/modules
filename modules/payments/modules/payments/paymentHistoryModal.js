import React, { PureComponent, useState, useEffect } from 'react';
import { View, Text, Modal, StyleSheet, Pressable, Alert, RefreshControl } from 'react-native';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import { fetchPaymentHistory } from "./api";
import { Dimensions } from 'react-native'
let deviceWidth = Dimensions.get('window').width


const PaymentHistoryModal = (props) => {

    const [paymentHistory, setPaymentHistory] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [refresh, setRefresh] = useState(false);

    useEffect(() => {
        setRefresh(true);
        get_payments()
    }, [])

    const get_payments = () => {
        fetchPaymentHistory()
          .then(response => response.json())
          .then(json => {
            const { status, data } = json;
            setRefresh(false);
            setPaymentHistory({ status, data });
          });
    }
    const renderItem = ({ item }) => {
        if (!item) return;
        return (
            <View style={styles.listItemContainer}>
                <Text>{item.amount} cents {item.currency}</Text>
                <Text>
                    <Text style={styles.bold}>Payment Method:</Text> 
                    {item?.payment_method_details?.card?.brand} - 
                    {item?.payment_method_details?.card?.last4} - {item?.payment_method_details?.card?.wallet?.type}
                </Text>
                <Text><Text style={styles.bold}>Status:</Text> {item.status}</Text>
            </View>
        )
    }

    return (
        <View>
            <TouchableOpacity onPress={() => { setModalVisible(true) }}>
                <Text style={{ marginHorizontal: 15, marginTop: 15, paddingBottom: 10 }}>View Payment History</Text>
            </TouchableOpacity>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    Alert.alert("Modal has been closed.");
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={styles.modalView}>
                    <Pressable style={[styles.modalCloseBtn]}
                        onPress={() => setModalVisible(!modalVisible)}
                    >
                        <Text style={styles.modalCloseBtnTxt}>Close</Text>
                    </Pressable>
                    <View>
                        <FlatList
                            data={paymentHistory}
                            renderItem={renderItem}
                            keyExtractor={item => item.id}
                            onRefresh={get_payments}
                            refreshing={refresh}
                            style={{ width: deviceWidth - 60, paddingTop: 20 }}
                            refreshControl={
                                <RefreshControl
                                  refreshing={refresh}
                                  onRefresh={get_payments}
                                />
                              }
                        />
                    </View>
                </View>
            </Modal>
        </View>
    )
}

const styles = StyleSheet.create({

    modalView: {
        marginVertical: 80,
        marginHorizontal: 20,
        backgroundColor: "white",
        borderRadius: 20,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
    },
    modalCloseBtn: {
        position: "absolute",
        bottom: 8,
        right: 8,
        backgroundColor: "black",
        borderColor: "transparent",
        color: 'white',
        paddingHorizontal: 15,
        paddingVertical: 10,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 50,
        zIndex: 10
    },
    modalCloseBtnTxt: {
        color: 'white',
        fontSize: 10,
        fontWeight: 'bold',
        padding: 0
    },
    bold: {
        fontWeight: "600"
    },
    listItemContainer: {
        padding: 10,
        margin: 10,
        backgroundColor: "#c9c9c9c9",
        borderRadius: 10
    },
})

export default PaymentHistoryModal;