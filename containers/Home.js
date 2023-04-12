import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TextInput,
  Modal,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import React, { useEffect, useState } from "react";
import UserCard from "../components/UserCard";
import Icon from "react-native-vector-icons/Feather";
import { setUserData } from "../redux/actions";
import { connect } from "react-redux";

const Home = (props) => {
  const { users, setUserData } = props;
  const [usersList, setUsersList] = useState([]);
  const [searchString, setSearchString] = useState("");
  const [modalVisible, setModalVisible] = useState({
    isOpen: false,
    data: null,
  });

  useEffect(() => {
    setUsersList(users || []);
  }, [users]);

  useEffect(() => {
    getUserData();
  }, []);

  useEffect(() => {
    let debounce = null;
    if (searchString.length !== 0) {
      debounce = setTimeout(() => {
        filteredResult(searchString);
      }, 500);
    } else {
      filteredResult("");
    }

    return () => clearTimeout(debounce);
  }, [searchString]);

  const getUserData = async () => {
    try {
      const res = await fetch("https://randomuser.me/api/?results=60");
      const data = await res.json();
      const userData = data?.results?.map((item) => {
        const { title, first, last } = item.name;
        return { ...item, name: title + " " + first + " " + last };
      });
      setUserData(userData || []);
    } catch (error) {
      setUserData([]);
      console.log("error", error);
    }
  };

  const filteredResult = (value) => {
    const data = users.filter((item) =>
      item?.name?.toLowerCase()?.includes(value?.toLowerCase())
    );
    setUsersList(data);
  };

  return (
    <>
      <View style={styles.container}>
        <View style={styles.searchBox}>
          <Icon name="search" size={20} style={styles.icon} />
          <TextInput
            placeholder="Search by name"
            style={styles.input}
            value={searchString}
            onChangeText={(text) => setSearchString(text)}
          />
        </View>
        <FlatList
          data={usersList}
          renderItem={({ item }) => (
            <UserCard
              user={item}
              setModalVisible={setModalVisible}
              listing={true}
            />
          )}
          keyExtractor={(item) => item.cell}
        />
      </View>
      <Modal transparent visible={modalVisible.isOpen}>
        <TouchableOpacity
          onPressOut={() => {
            setModalVisible({
              isOpen: false,
              data: null,
            });
          }}
        >
          <View style={styles.modalView}>
            {modalVisible?.data && <UserCard user={modalVisible?.data} />}
          </View>
        </TouchableOpacity>
      </Modal>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    users: state.users,
  };
};

const mapDispatchToProps = (dispatch) => ({
  setUserData: (val) => dispatch(setUserData(val)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#eee",
    marginTop: 80,
    position: 'relative'
  },
  searchBox: {
    width: "86%",
    height: 50,
    backgroundColor: "#eee",
    alignSelf: "center",
    flexDirection: "row",
    borderRadius: 15,
    paddingLeft: 15,
    paddingRight: 15,
    position: 'fixed',
    top: 15,
    zIndex: 1
  },
  icon: {
    alignSelf: "center",
  },
  input: {
    width: "100%",
    marginLeft: 10,
    outlineStyle: 'none'
  },
  modalView: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
    backgroundColor: "rgba(0,0,0,.8)",
    justifyContent: "center",
    alignItems: "center",
  },
});
