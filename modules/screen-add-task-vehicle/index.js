import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  ScrollView,
  Pressable
} from "react-native";

const AddTaskVehicle = () => {
  const [taskerProfile, setTaskerProfile] = useState({});
  const [task, setTask] = useState({});
  const [vehicles, setVehicles] = useState([]);
  const [selectedVehicles, setSelectedVehicles] = useState([]);
  useEffect(() => {
    setTaskerProfile({
      name: "Tasker name",
      rate: "$40/hr",
      rating: "4.9",
      reviews: "15",
      job: "Cleaning Jobs",
      image: require("./assets/profileImage.png")
    });
    setTask({
      title: "The Task",
      description:
        "Fast and has great attention to details, that describes my work! "
    });
    setVehicles([
      {
        type: "Motorcycle",
        image: require("./assets/motorcycleIcon.png"),
        size: "Small",
        description: "For Takeouts and small tasks"
      },
      {
        type: "Car",
        image: require("./assets/carIcon.png"),
        size: "Medium",
        description: "For Takeouts and small tasks"
      },
      {
        type: "Eco Car",
        image: require("./assets/ecoCarIcon.png"),
        size: "Medium",
        description: "For Takeouts and small tasks"
      }
    ]);
  }, []);
  const handleVehiclePress = vehicle => {
    const newSelectedVehicles = [...selectedVehicles];
    if (newSelectedVehicles.includes(vehicle)) {
      newSelectedVehicles.splice(newSelectedVehicles.indexOf(vehicle), 1);
    } else {
      newSelectedVehicles.push(vehicle);
    }
    setSelectedVehicles(newSelectedVehicles);
  };
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.taskerProfile}>
          <Image source={taskerProfile.image} style={styles.profileImage} />
          <View style={styles.taskerInfo}>
            <Text style={styles.taskerName}>{taskerProfile.name}</Text>
            <Text style={styles.rating}>
              {taskerProfile.rating}{" "}
              <Text style={styles.grey}>({taskerProfile.reviews} Reviews)</Text>
            </Text>
            <Text>
              {taskerProfile.reviews} {taskerProfile.job}
            </Text>
          </View>
          <Text style={styles.rateText}>{taskerProfile.rate}</Text>
        </View>
        <View style={styles.taskInfo}>
          <Text style={styles.taskTitle}>{task.title}</Text>
          <Text style={styles.taskDescription}>{task.description}</Text>
        </View>
      </View>
      <View style={styles.separator}>
        <Text style={styles.separatorText}>Set Vehicle</Text>
      </View>
      <View style={styles.vehicleList}>
        <ScrollView>
          {vehicles.map((vehicle, index) => (
            <VehicleTile
              vehicle={vehicle}
              key={index}
              selected={selectedVehicles.includes(vehicle)}
              onPress={() => handleVehiclePress(vehicle)}
            />
          ))}
        </ScrollView>
      </View>
      <View style={styles.button}>
        <Button buttonText={"Confirm"} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  header: {
    backgroundColor: "rgba(218, 218, 218, 0.15)",
    paddingHorizontal: 20,
    paddingBottom: 30
  },
  taskerProfile: {
    flexDirection: "row",
    paddingVertical: 10,
    alignItems: "center"
  },
  taskerInfo: {
    flex: 1,
    marginLeft: 10,
    justifyContent: "space-around",
    marginVertical: 10
  },
  rateText: {
    fontSize: 30
    // fontWeight: "bold"
  },
  grey: {
    color: "#8e8e93"
  },
  profileImage: {
    borderRadius: 12,
    width: 80,
    height: 80,
    resizeMode: "cover"
  },
  taskInfo: {},
  taskTitle: {
    fontSize: 18
  },
  taskDescription: {
    fontSize: 14,
    color: "#7E7D7D",
    marginTop: 5
  },
  separator: {
    paddingHorizontal: 20,
    paddingVertical: 15
  },
  separatorText: {
    fontSize: 18,
    color: "#284752"
  },
  vehicleList: {
    paddingHorizontal: 30,
    backgroundColor: "rgba(218, 218, 218, 0.15)"
  },
  button: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0
  }
});

export default AddTaskVehicle;

const VehicleTile = props => {
  return (
    <View style={vehicleTileStyles.vehicleTile}>
      <Image
        source={props.vehicle.image}
        style={vehicleTileStyles.vehicleImage}
      />
      <View style={vehicleTileStyles.vehicleInfo}>
        <Text style={vehicleTileStyles.vehicleType}>{props.vehicle.type}</Text>
        <Text>{props.vehicle.size} size</Text>
        <Text style={vehicleTileStyles.vehicleDescription}>
          {props.vehicle.description}
        </Text>
      </View>
      <Checkbox
        value={props.selected}
        setValue={() => props.onPress()}
        style={vehicleTileStyles.checkbox}
      />
    </View>
  );
};

const vehicleTileStyles = StyleSheet.create({
  vehicleTile: {
    flexDirection: "row",
    height: 100,
    alignItems: "center",
    borderBottomColor: "#E0E0E0",
    borderBottomWidth: 1
  },
  vehicleInfo: {
    flex: 1,
    marginLeft: 15
  },
  vehicleType: {
    fontSize: 10
  },
  vehicleDescription: {
    fontSize: 14,
    color: "#7E7D7D",
    justifyContent: "space-between"
  },
  vehicleImage: {
    height: 30,
    width: 30,
    resizeMode: "contain"
  },
  checkbox: {
    width: 25,
    height: 25
  }
});

const Button = params => {
  const btnStyle = {
    backgroundColor: params.outline ? "#fff" : "#000",
    borderColor: params.outline ? "#000" : "#fff",
    borderWidth: 1
  };
  const btnText = {
    color: params.outline ? "#000" : "#fff"
  };
  return (
    <View style={buttonStyles.btnContainer}>
      <Pressable style={[buttonStyles.btn, btnStyle]} onPress={params.onPress}>
        <Text style={[buttonStyles.btnText, btnText]}>{params.buttonText}</Text>
        <View style={styles.childrenContainer}>{params.children}</View>
      </Pressable>
    </View>
  );
};

const buttonStyles = StyleSheet.create({
  btnContainer: {
    paddingHorizontal: 40,
    justifyContent: "center",
    marginVertical: 20
  },
  btn: {
    backgroundColor: "black",
    height: 50,
    width: "100%",
    padding: 10,
    paddingHorizontal: 25,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "rgba(0, 0, 0, 0.2)",
    elevation: 10,
    flexDirection: "row"
  },
  btnText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold"
  },
  childrenContainer: {
    justifyContent: "center",
    alignItems: "center"
  }
});

const Checkbox = props => {
  return (
    <Pressable
      onPress={() => {
        props.setValue(!props.value);
      }}>
      <Image
        source={
          props.value
            ? require("./assets/checkboxIconActive.png")
            : require("./assets/checkboxIcon.png")
        }
        style={[checkboxStyles.checkbox, props.style]}
      />
    </Pressable>
  );
};

const checkboxStyles = StyleSheet.create({
  checkbox: {
    height: 20,
    width: 20
  }
});
