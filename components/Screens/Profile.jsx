import React, { useEffect, useState } from "react";
import { View, Text, TextInput, Image, TouchableOpacity, StyleSheet } from "react-native";
import TextInputField from "../InputTextField/TextInputField";
import { useRecoilState } from "recoil";
import profileSelector from "../../selector/profileSelctor";
import { globalVar } from "../../styles/global";

import {getFile} from '../../api/apiClient'
import { FlatList } from "react-native-gesture-handler";
const ProfileScreen = () => {
  const [profile, setProfile] = useRecoilState(profileSelector);
  const [name, setName] = useState(profile.profile.name);
  const [email, setEmail] = useState(profile.profile.email);
  const [abbre, setAbbreviation] = useState(profile.profile.abbreviation);
  const [isEditing, setIsEditing] = useState(false);
  const [data, setData] = useState([]);

  console.log(profile)

  // Update the profile data
  const updateProfileData = () => {
    setProfile(prevProfile => ({
      ...prevProfile,
      profile: {
        name: name,
        email: email,
        abbreviation: abbre,
      },
    }));
  };

  useEffect(() => {
    // You can perform any necessary actions to fetch the profile data
  }, []);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    updateProfileData();
    setIsEditing(false);
    // You can perform any necessary actions to save the updated profile data
  };

  function capitalizeString(string) {
    if (typeof string !== 'string') {
      return '';
    }
    
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const [fileType, setFileType] = useState('PDF')

  const changeFileType = async (type) => {
    setFileType(type)
    try {
      const response = await getFile({type});
      console.log(response?.data?.results);
      setData(response?.data?.results);
      // setSelectedBatch(response.data[0]);
    } catch (error) {
      console.error(error);
      return error;
    }
  }


  
  console.log({fileType})
  console.log(data && data?.length !== 0)

  return (
    // <View style={{display: 'flex', flexDirection: 'row'}}>
    //   <TouchableOpacity
    //     onPress={() => changeFileType('pdf')}
    //     style={styles.filterButton}
    //   >
    //     <Text style={{ fontSize: 18, textAlign: "center" }}>PDF</Text>
        
    //   </TouchableOpacity>
    //   <TouchableOpacity
    //     onPress={() => changeFileType('xlxs')}
    //     style={styles.filterButton}
    //   >
    //     <Text style={{ fontSize: 18, textAlign: "center" }}>EXCEL</Text>
        
    //   </TouchableOpacity>
    //   <TouchableOpacity
    //     onPress={() => changeFileType('doc')}
    //     style={styles.filterButton}
    //   >
    //     <Text style={{ fontSize: 18, textAlign: "center" }}>DOCS</Text>
        
    //   </TouchableOpacity>
    //   <TouchableOpacity
    //     onPress={() => changeFileType('ppt')}

    //     style={styles.filterButton}
    //   >
    //     <Text style={{ fontSize: 18, textAlign: "center" }}>PPT</Text>
        
    //   </TouchableOpacity>
    //   <TouchableOpacity
    //     onPress={() => changeFileType('images')}
    //     style={styles.filterButton}
    //   >
    //     <Text style={{ fontSize: 18, textAlign: "center" }}>IMAGES</Text>
        
    //   </TouchableOpacity>
    //   {data && data?.length !== 0 ? (
    //     <FlatList
    //       data={data}
    //       renderItem={({ item }) => <></>}
    //       keyExtractor={item => item.id}
    //     />
    //   ) : (
    //     <Text style={{ textAlign: "center", marginTop: 20, color: 'black' }}>
    //       No data found
    //     </Text>
    //   )}
    //   </View>
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: '#fff'}}>
      <Image
        source={{ uri: "https://reactnative.dev/img/tiny_logo.png" }}
        style={{ width: 100, height: 100, borderRadius: 50, marginBottom: 10 }}
      />
      <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 10 }}>
        {capitalizeString(profile?.profile.role)} Profile
      </Text>
      <View style={{ width: "100%", marginBottom: 10, display: 'flex',gap: 20, justifyContent: 'center', alignItems: 'center' }}>
      <View style={styles.inputView}>
        <Text style={styles.labelInput}>Email</Text>

        <TextInput
          style={styles.TextInput}
          value={email}
          placeholderTextColor='#003f5c'
          editable={false}

        />
      </View>
      <View style={styles.inputView}>
        <Text style={styles.labelInput}>Name</Text>

        <TextInput
          style={styles.TextInput}
          value={profile.profile.firstname + " " + profile.profile.lastname}
          placeholderTextColor='#003f5c'
          editable={false}

        />
      </View>
      <View style={styles.inputView}>
        <Text style={styles.labelInput}>Batch</Text>

        <TextInput
          style={styles.TextInput}
          value={profile?.profile?.batch_name}
          placeholderTextColor='#003f5c'
          editable={false}
        />
      </View>
      <View style={styles.inputView}>
        <Text style={styles.labelInput}>Group</Text>

        <TextInput
          style={styles.TextInput}
          value={profile?.profile?.group}
          placeholderTextColor='#003f5c'
          editable={false}
        />
      </View>
      </View>
      {/* {profileValues.map(=> (
        <TextInputField
          key={item.id}
          name={item.name}
          value={item.value}
          setValue={item.setValue}
          isEditing={isEditing}
        />
      ))} */}

      {/* {isEditing ? (
        <TouchableOpacity
          onPress={handleSave}
          style={{ paddingVertical: 10 }}
        >
          <Text style={{ fontSize: 15, textDecorationLine: "underline" }}>
            Save
          </Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          onPress={handleEdit}
          style={{ paddingVertical: 10 }}
        >
          <Text style={{ fontSize: 15, textDecorationLine: "underline" }}>
            Edit
          </Text>
        </TouchableOpacity>
      )} */}
    </View>
  );
};

export default ProfileScreen;



const styles = StyleSheet.create({
  heading: {
    fontSize: 25,
    fontWeight: "bold",
    color: globalVar.primaryColor,
  },
  subHeading: {
    fontSize: 15,
  },
  flexer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  filterButton: {
    marginTop: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    width: "20%",
    borderRadius: 8,
    padding: 10,
    marginEnd: 10,
    marginStart: 10,
    marginBottom: 10,
  },
  container: {
    display: "flex",
    flexDirection: "column",
    gap: 20,
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  dropdown: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: globalVar.primaryColor,
    width: "32%",
  },
  image: {
    marginBottom: 40,
  },
  labelInput: {
    position: "absolute",
    top: -9,
    left: 10,
    backgroundColor: "#fff",
  },
  inputView: {
    position: "relative",
    borderWidth: 1,
    borderColor: globalVar.primaryColor,
    borderRadius: 5,
    width: "70%",
    height: 45,
    // marginBottom: 20,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
  },

  TextInput: {
    height: 50,
    flex: 1,
		borderWidth: 0,
    fontWeight: "bold",
    color: 'black'
  },

  toggleButton: {
    marginLeft: 10,
  },

  toggleButtonText: {
    color: "#003f5c",
  },

  forgot_button: {
    height: 30,
    marginBottom: 30,
  },

  errorText: {
    color: "red",
    marginBottom: 10,
  },

  loginBtn: {
    width: "80%",
    borderRadius: 5,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: globalVar.primaryColor,
  },
  loginText: {
    color: "white",
    fontWeight: "bold",
  },
});
