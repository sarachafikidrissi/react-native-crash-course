import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  ImageBackground,
} from "react-native";
import React, { useState } from "react";
import * as Animatable from "react-native-animatable";
import { icons } from "../constants";
// import { Video, ResizeMode } from "expo-av";
import { Video } from "expo-video";
const zoomIn = {
  0: {
    scale: 0.9,
  },
  1: {
    scale: 1.1,
  },
};

const zoomOut = {
  0: {
    scale: 1,
  },
  1: {
    scale: 0.9,
  },
};

const TrendingItem = ({ activeItem, item }) => {
  const [play, setPlay] = useState(false);


  return (
    // * view that allows us to do animations within it
    <Animatable.View
      className="mr-5"
      animation={activeItem === item.$id ? zoomIn : zoomOut}
      duration={500}
    >
      {play ? (
        <Video
          source={{ uri: item.video }}
          className="w-52 h-72 rounded-[35px] mt-3 bg-white/10"
        />
      ) : (
        <TouchableOpacity
          className="relative justify-center items-center "
          activeOpacity={0.7}
          onPress={() => {
           setPlay(true)
          }}
        >
          <ImageBackground
            source={{ uri: item.thumbnail }}
            className="w-52 h-72 rounded-[35px] my-5 overflow-hidden shadow-lg shadow-black/50 "
            resizeMode="cover"
          />
          <Image source={icons.play} className="w-12 h-12 absolute " />
        </TouchableOpacity>
      )}
   
    </Animatable.View>
  );
};
const Trending = ({ posts }) => {
  const [activeItem, setActiveItem] = useState(posts[1]);

  const onViewableItemsChanged = ({ viewableItems }) => {
    /**
     *
     * onViewableItemsChanged: function that tracks visible items
     * @viewableItems : An array of objects representing the items currently
     *                  visible in the list. Each object contains properties
     *                  like key (used to identify the item) and index.
     *
     */

    if (viewableItems.length > 0) {
      setActiveItem(viewableItems[0].key);
    }
  };
  return (
    <FlatList
      data={posts}
      keyExtractor={(item) => item.$id} //^ Generates a unique key for each item in the list using
      renderItem={({ item }) => (
        <TrendingItem activeItem={activeItem} item={item} />
      )}
      onViewableItemsChanged={onViewableItemsChanged} //^ a function that get's called whenever the visibility items in the Flatlist changes
      viewabilityConfig={{ itemVisiblePercentThreshold: 70 }} //^ Require 70% of the item to be visible
      contentOffset={{ x: 170 }} //^ Scrolls 170 dp to the right
      // initialScrollIndex={0}
      horizontal //^ sets the rendered items to be rendered horizentaly
    />
  );
};



export default Trending;
