import React, { useState } from "react";
import { SafeAreaView, Text, TextInput, TouchableOpacity, View, FlatList } from "react-native";
import Feather from "react-native-vector-icons/Feather";
import { useQuery } from "@apollo/client";

import styles from "../style/SearchBar.style";
import { gql } from "@apollo/client";

const SearchBar = ({ iconColor, placeHolders }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const SEARCH_USER = gql`
    query SearchUsers($search: String!) {
      searchUsers(search: $search) {
        _id
        name
        username
        email
        password
      }
    }
  `;

  const { loading, error, data } = useQuery(SEARCH_USER, {
    variables: {
      search: searchQuery,
    },
  });

  const handleSearch = () => {
    console.log("Search Query:", searchQuery);
    console.log("Loading:", loading);
    console.log("Error:", error);
    if (!loading && !error) {
      console.log("Data:", data);
      console.log(searchQuery);
    }
  };

  return (
    <SafeAreaView>
      <View>
        <TextInput
          placeholder={"Search..."}
          placeholderTextColor="grey"
          style={styles.input}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />

        <TouchableOpacity onPress={handleSearch}>
          <Feather name="search" size={20} color="white" style={styles.iconContainer} />
        </TouchableOpacity>

        {data && searchQuery && (
          <FlatList
            data={data.searchUsers}
            renderItem={({ item }) => (
              // <TouchableOpacity onPress={() => console.log(item)} style={styles.dropdownItem}>
              <Text style={styles.dropdownText}>
                {item.name}
                <Text onPress={() => console.log(item)} style={{ color: "grey" }}>
                  {"  "}+ Follow
                </Text>
              </Text>
              // </TouchableOpacity>
            )}
            keyExtractor={(item) => item._id.toString()}
            style={styles.dropdown}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default SearchBar;
