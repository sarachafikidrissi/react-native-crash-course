import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { icons } from "../constants";
import { ResizeMode, Video } from "expo-av";

const VideoCard = ({ title, thumbnail, video, creator, avatar, username }) => {
  // ^ create a state to ensure wether the video is playing or not
  const [play, setPlay] = useState(false);


  

  return (
    <View className="flex-col items-center px-4 mb-14">
      {/* Top Video Components */}
      <View className="flex-row gap-3 items-start">
        <View className="flex justify-center items-center flex-row flex-1">
          {/* Show the avatar with creator username initials  */}
          <View className="w-[46px] h-[46px] rounded-lg border border-secondary flex justify-center items-center p-0.5">
            <Image
              source={{ uri: avatar }}
              className="w-full h-full rounded-lg"
              resizeMode="cover"
            />
          </View>
          {/* Display Title of video */}
          <View className="jusutify-center flex-1 ml-3 gap-y-1">
            <Text
              className="text-white font-psemibold text-sm"
              numberOfLines={1} //^ stops the text from going further if it is going longer
            >
              {title}
            </Text>
            <Text
              className="text-sm  text-gray-100 font-pregular "
              numberOfLines={1}
            >
              {username}
            </Text>
          </View>
        </View>
        {/* Display the menu icon */}
        <View className="pt-2">
          <Image source={icons.menu} resizeMode="contain" className="h-4 w-5" />
        </View>
      </View>
      {/* Show the video */}
        {play ? (
             <Video
                      source={{ uri: video }}
                      // className="w-full h-60 rounded-xl mt-3 bg-white/10"
                      style={{
                        width: '100%',
                        height: 288,
                        borderRadius: 35,
                        marginTop: 3,
                        
                      }}
                      resizeMode={ResizeMode.CONTAIN}
                      useNativeControls
                      shouldPlay
                      onPlaybackStatusUpdate={(status) => {
                        if(status.didJustFinish){
                          setPlay(false);
                        }
                      }}
                    />
        ) : (
            <TouchableOpacity
            activeOpacity={0.7} //^ to see what's happening once we hover it or click on it 
            onPress={() => setPlay(true)}
              className="w-full h-60 rounded-xl mt-3 relative items-center justify-center"
            >
                <Image 
                  source={{ uri: thumbnail }}
                  className="w-full h-full rounded-xl mt-3 "
                  resizeMode="cover"
                />
                <Image 
                  source={icons.play}
                  className="w-12 h-12 absolute"
                  resizeMode="contain"
                />
            </TouchableOpacity>
        )}
    </View>
  );
};

export default VideoCard;
