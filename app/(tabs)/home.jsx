import { View, Text, FlatList, Image, RefreshControl, Alert } from "react-native";
import React, { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../../constants";
import SearchInput from "../../components/SearchInput";
import Trending from "../../components/Trending";
import EmptyState from "../../components/EmptyState";
import { useState } from "react";
import { getAllPosts } from "../../lib/appwrite";
import useAppwrite from "../../lib/useAppwrite";

const Home = () => {
  const [refreshing, setRefreshing] = useState(false);

  //* calling customized hook to fetch posts data
  const {data: posts, refetch} = useAppwrite
  (getAllPosts());


  const onRefresh = async () => {
    setRefreshing(true);

    // re call videos -> if new videos appeared
    await refetch();

    setRefreshing(false);
  };
console.log(posts);

  
  return (
    <SafeAreaView className="bg-primary h-full">
      //* FlatList is designed for rendering dynamic lists based on data.
      <FlatList
        data={posts}
        // data={[]}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => (
          <Text className="text-3xl text-white">{item.title}</Text>
        )}
        ListHeaderComponent={() => (
          <View className="my-6 px-4 space-y-6 ">
            <View className="justify-between items-start flex-row mb-6 ">
              <View>
                <Text className="text-sm font-pmedium text-gray-100">
                  Welcome again
                </Text>
                <Text className="text-2xl font-psemibold text-white">
                  First App
                </Text>
              </View>
              <View classNamemt="mt-1.5">
                <Image
                  source={images.logoSmall}
                  className="w-9 h-10"
                  resizeMode="contain"
                />
              </View>
            </View>
            <SearchInput placeholder="Search for a video topic" />
            <View className="w-full flex-1 pt-5 pb-8">
              <Text className="text-lg text-gray-100 font-pregular">
                Latest Videos
              </Text>
            </View>
            <Trending posts={[{ id: 1 }, { id: 2 }, { id: 3 }] ?? []} />
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="No videos Found"
            subtitle="Be the first one to upload a video"
          />
        )}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor="white"
          />
        }
      />
    </SafeAreaView>
  );
};

export default Home;
