import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import React from "react";

const UserCard = ({ user, listing, setModalVisible }) => {
  const handlePress = () => {
    if (listing) {
      setModalVisible({
        isOpen: true,
        data: user,
      });
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handlePress} style={styles.userCard}>
        <Image source={{ uri: user.picture.medium }} style={styles.image} />
        <View>
          <Text style={styles.userName}>{user.name}</Text>
          <Text style={styles.fontStyle}>Email: {user.email}</Text>
          <Text style={styles.fontStyle}>City: {user.location.city}</Text>
          {Dimensions.get("window").width > 460 && (
            <>
              <Text style={styles.fontStyle}>Phone: {user.phone}</Text>
              <Text style={styles.fontStyle}>Id: {user.login.uuid}</Text>
            </>
          )}
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default UserCard;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    width: "90%",
    borderRadius: 15,
    marginTop: 20,
    justifyContent: "center",
    alignSelf: "center",
    padding: 15,
  },
  userCard: {
    alignSelf: "center",
  },
  image: {
    alignSelf: "center",
    height: Dimensions.get("window").width > 460 ? 80 : 60,
    width: Dimensions.get("window").width > 460 ? 80 : 60,
    resizeMode: "contain",
    borderRadius: Dimensions.get("window").width > 460 ? 40 : 30,
    marginRight: 15,
    marginBottom: 15
  },
  userName: {
    fontWeight: 600,
    fontSize: 20,
  },
  fontStyle: {
    fontSize: 16,
    margin: 3
  },
});
