// import React, { useEffect, useState } from "react";
// import { View, Text, TextInput, Image, TouchableOpacity } from "react-native";
// import TextInputField from "../InputTextField/TextInputField";
// import { useRecoilState } from "recoil";

// const ProfileScreen = () => {
//   const [name, setName] = useState(profile.profile.name);
//   const [email, setEmail] = useState(profile.profile.email);
//   const [abbre, setAbbreviation] = useState(profile.profile.abbreviation);
//   const [isEditing, setIsEditing] = useState(false);

//   // Update the profile data
//   const updateProfileData = () => {
//     setProfile(prevProfile => ({
//       ...prevProfile,
//       profile: {
//         name: name,
//         email: email,
//         abbreviation: abbre,
//       },
//     }));
//   };

//   useEffect(() => {
//     // You can perform any necessary actions to fetch the profile data
//   }, []);

//   const handleEdit = () => {
//     setIsEditing(true);
//   };

//   const handleSave = () => {
//     updateProfileData();
//     setIsEditing(false);
//     // You can perform any necessary actions to save the updated profile data
//   };

//   return (
//     <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
//       <Image
//         source={{ uri: "https://reactnative.dev/img/tiny_logo.png" }}
//         style={{ width: 100, height: 100, borderRadius: 50, marginBottom: 10 }}
//       />
//       <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 10 }}>
//         Teacher's Profile
//       </Text>
//       {profileValues.map(item => (
//         <TextInputField
//           key={item.id}
//           name={item.name}
//           value={item.value}
//           setValue={item.setValue}
//           isEditing={isEditing}
//         />
//       ))}

//       {isEditing ? (
//         <TouchableOpacity
//           onPress={handleSave}
//           style={{ paddingVertical: 10 }}
//         >
//           <Text style={{ fontSize: 15, textDecorationLine: "underline" }}>
//             Save
//           </Text>
//         </TouchableOpacity>
//       ) : (
//         <TouchableOpacity
//           onPress={handleEdit}
//           style={{ paddingVertical: 10 }}
//         >
//           <Text style={{ fontSize: 15, textDecorationLine: "underline" }}>
//             Edit
//           </Text>
//         </TouchableOpacity>
//       )}
//     </View>
//   );
// };

// export default ProfileScreen;


import React from 'react';
import { View } from 'react-native';
import CardSwiper from '../Swiper/CardSwiper';


const ProfileScreen = () => {
  return (
    <View style={{ flex: 1 }}>
      {/* <CardSwiper /> */}
    </View>
  );
};

export default ProfileScreen;