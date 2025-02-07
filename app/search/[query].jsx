import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  RefreshControl,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../../constants";
import SearchInput from "../../components/SearchInput";
import EmptyState from "../../components/EmptyState";
import VideoCard from "../../components/VideoCard";
import { searchPosts } from "../../lib/appwrite";
import useAppwrite from "../../lib/useAppwrite";
import { useLocalSearchParams } from "expo-router";

const Search = () => {
  const { query } = useLocalSearchParams();

  const { data: posts, refetch } = useAppwrite(() => searchPosts(query));

  
  // const postArray = posts?._j;
  //* this will be called anytime the query changes
   useEffect(() => {
    
    refetch()
  
  }, [query]);

 

  return (
    <SafeAreaView className="bg-primary h-full">
      //* FlatList is designed for rendering dynamic lists based on data.
      <FlatList
        data={posts || []}
        // data={[]}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => (
          // <Text className="text-3xl text-white">{item.title}</Text>
          <VideoCard
            title={item.title}
            avatar={item.creator.avatar}
            username={item.creator.username}
            thumbnail={item.thumbnail}
            video={item.video}
          />
        )}
        ListHeaderComponent={() => (
          <View className="my-6 px-4  ">
            <Text className="text-sm font-pmedium text-gray-100">
              Search Results
            </Text>
            <Text className="text-2xl font-psemibold text-white">{query}</Text>
            <View className="mt-6 mb-8">
              <SearchInput  initialQuery={query} refetch={refetch} />
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="No videos Found"
            subtitle="No videos found for this search query"
          />
        )}
      />
    </SafeAreaView>
  );
};

export default Search;
