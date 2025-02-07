import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";

import FormField from "../../components/FormField";
import { ResizeMode, Video } from "expo-av";
import { icons } from "../../constants";
import { Image } from "react-native";
import CustomButton from "../../components/CustomButton";

const Create = () => {
  //* to know if we are currently uploading a video
  const [uploading, setUploading] = useState(false);
  //* here where value of inputs  will be stored
  const [form, setForm] = useState({
    title: "",
    video: null,
    thumbnail: "",
    prompt: "",
  });
  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView className="px-4 my-6 ">
        <Text className="text-white text-2xl font-psemibold ">
          Upload Video
        </Text>
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
        <View className="mt-7 space-y-2">
          <Text className="text-base text-gray-100 font-pmedium">
            Upload Video
          </Text>
          {/* Area to click on and upload video */}
          <TouchableOpacity>
            {form.video ? (
              <Video
                source={{ uri: form.video.uri }}
                className="w-full h-64 rounded-2xl "
                useNativeControls
                resizeMode={ResizeMode.COVER}
                isLooping
              />
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
        {/* for the upload video thumbnail */}
        <View className="mt-7 space-y-2 ">
          <Text className="text-base text-gray-100 font-pmedium">
            Thumbnail Image
          </Text>

          <TouchableOpacity>
            {form.thumbnail ? (
              <Image
                source={{ uri: form.thumbnail.uri }}
                resizeMethod="cover"
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
        <CustomButton containerStyles={'mt-7'} title='Sunmit & Publish' isLoading={uploading}/>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Create;
