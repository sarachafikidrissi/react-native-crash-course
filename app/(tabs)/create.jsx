import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import tw from "twrnc";

import FormField from "../../components/FormField";
import { ResizeMode, Video } from "expo-av";
import { icons } from "../../constants";
import { Image } from "react-native";
import CustomButton from "../../components/CustomButton";
// import * as DocumentPicker from "expo-document-picker";
import * as ImagePicker from 'expo-image-picker';
import { router } from "expo-router";
import { createVideo } from '../../lib/appwrite'
import { useGlobalContext } from "../../context/GlobalProvider";


const Create = () => {
  const { user } = useGlobalContext();
  
  
  //* to know if we are currently uploading a video
  const [uploading, setUploading] = useState(false);
  //* here where value of inputs  will be stored
  const [form, setForm] = useState({
    title: "",
    video: null,
    thumbnail: "",
    prompt: "",
  });
  /**
   * a function that helps you pick images and videos from phone
   */
  const openPicker = async (selectType) => {
    // const result = await DocumentPicker.getDocumentAsync({
    //   type:
    //     selectType === "image"
    //       ? ["image/png", "image/jpg"]
    //       : ["video/mp4", "video/gif"],
    // });
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: selectType === 'image' 
    ? ['images'] 
    : ['videos'], 
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      if (selectType === "video") {
        setForm({ ...form, video: result.assets[0] });
      }
      if (selectType === "image") {
        setForm({ ...form, thumbnail: result.assets[0] });
      }
    }
  };


  const submit =  async () => { 
    if (!form.title || !form.video || !form.thumbnail) {
      Alert.alert("Please fill in all the fields");
    }
    if (!user) { // 🔥 Check if user is available
      Alert.alert("Error", "User not found. Please log in again.");
      return;
    }
    
    

    setUploading(true);
    try {
      await createVideo({...form, userId: user.$id})

      Alert.alert('Success', 'Post Uploaded Successfully')
      router.push('/home')

    } catch (error) {
      
      Alert.alert('Error', error.message)
    } finally {
      setForm({
        title: "",
        video: null,
        thumbnail: "",
        prompt: "",
      });
      setUploading(false);
    }
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView className="px-4 my-6 ">
        <Text className="text-white text-2xl font-psemibold ">
          Upload Video
        </Text>
        {/* Title Area */}
        <FormField
          title="Video Title"
          value={form.title}
          placeholder="give your video a catchy title..."
          handleChangeText={(e) =>
            setForm({
              ...form,
              title: e,
            })
          }
          otherStyles="mt-10"
        />
        {/* Area to click on and upload video */}
        <View className="mt-7 gap-y-2">
          <Text className="text-base text-gray-100 font-pmedium">
            Upload Video
          </Text>
          <TouchableOpacity onPress={() => openPicker("video")}>
            {form.video ? (
              <View>
                <Video
                  source={{ uri: form.video.uri }}
                  style={tw`w-full h-64 rounded-2xl`}
                  resizeMode={ResizeMode.COVER}
                />
              </View>
            ) : (
              <View className="w-full h-40 px-4 bg-black-100 rounded-2xl justify-center items-center">
                <View className="w-14 h-14 border border-dashed border-secondary-100 justify-center items-center">
                  <Image
                    source={icons.upload}
                    className="w-1/2 h-1/2"
                    resizeMode="contain"
                  />
                </View>
              </View>
            )}
          </TouchableOpacity>
        </View>
        {/* upload video thumbnail  Area*/}
        <View className="mt-7 gap-y-2 ">
          <Text className="text-base text-gray-100 font-pmedium">
            Thumbnail Image
          </Text>

          <TouchableOpacity onPress={() => openPicker("image")}>
            {form.thumbnail ? (
              <Image
                source={{ uri: form.thumbnail.uri }}
                resizeMode="cover"
                className="h-64 w-full rounded-2xl"
              />
            ) : (
              <View className="w-full h-16 px-4 bg-black-100 rounded-2xl justify-center items-center border-2 border-black-200 flex-row gap-x-2">
                <Image
                  source={icons.upload}
                  className="w-5 h-5"
                  resizeMode="contain"
                />
                <Text className="text-sm text-gray-100 font-pmedium">
                  Choose a file
                </Text>
              </View>
            )}
          </TouchableOpacity>
        </View>
        {/* Ai propmt Area */}
        <FormField
          title="AI Prompt"
          value={form.prompt}
          placeholder="The AI prompt of your video..."
          handleChangeText={(e) =>
            setForm({
              ...form,
              prompt: e,
            })
          }
          otherStyles="mt-7"
        />
        {/* render custom button */}
        <CustomButton
          containerStyles={"mt-7"}
          title="Sunmit & Publish"
          handlePress={submit}
          isLoading={uploading}
          disabled={!user}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Create;
