// import คอมโพเนนต์ที่จำเป็น
import React from "react";
import { Image } from "react-native";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { createDrawerNavigator } from "react-navigation-drawer";
import { createAppContainer } from "react-navigation";
import {
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
  FontAwesome,
  Foundation,
} from "@expo/vector-icons";

// Screens
import Home from "../screens/home";
import Map from "../screens/map";
import Coupon from "../screens/coupon";
import Profile from "../screens/profile";
import Create_Post from "../screens/createPost";

// const FiltersNavigator = createStackNavigator({
//   Filters: {
//     screen: FiltersScreen,
//   },
// });

// const FavNavigator = createStackNavigator(
//   {
//     Favorites: {
//       screen: FavoritesScreen,
//     },
//     MealDetail: {
//       screen: MealDetailScreen,
//     },
//   },
//   {
//     defaultNavigationOptions: {
//       headerStyle: { backgroundColor: "#4a148c" },
//       headerTintColor: "white",
//     },
//   }
// );

// const MealsNavigator = createStackNavigator(
//   {
//     S1: CategoriesScreen,
//     S2: CategoryMealsScreen,
//     S3: MealDetailScreen,
//   },
//   {
//     defaultNavigationOptions: {
//       headerStyle: { backgroundColor: "#4a148c" },
//       headerTintColor: "white",
//     },
//   }
// );

const TabNavigator = createBottomTabNavigator(
  {
    Home: {
      screen: Home,
      navigationOptions: {
        tabBarIcon: (tabInfo) => {
          return (
            <FontAwesome
              name="newspaper-o"
              size={24}
              color={tabInfo.tintColor}
            />
          );
        },
      },
    },
    Map: {
      screen: Map,
      navigationOptions: {
        tabBarIcon: (tabInfo) => {
          return (
            <MaterialCommunityIcons
              name="radar"
              size={24}
              color={tabInfo.tintColor}
            />
          );
        },
      },
    },
    CreatePost: {
      screen: Create_Post,
      navigationOptions: {
        tabBarIcon: (tabInfo) => {
          return (
            <Image
              source={require("../assets/tapIcon2.png")}
              style={{ width: 74, height: 74 }}
            ></Image>
          );
        },
      },
    },
    MyCoupon: {
      screen: Coupon,
      navigationOptions: {
        tabBarIcon: (tabInfo) => {
          return (
            <Foundation name="ticket" size={24} color={tabInfo.tintColor} />
          );
        },
      },
    },
    Profile: {
      screen: Profile,
      navigationOptions: {
        tabBarIcon: (tabInfo) => {
          return (
            <MaterialIcons
              name="person-outline"
              size={24}
              color={tabInfo.tintColor}
            />
          );
        },
      },
    },
  },
  {
    defaultNavigationOptions: {
      headerStyle: { backgroundColor: "#E9EEC9" },
      headerTintColor: "white",
    },
    tabBarOptions: {
      showLabel: false,
      activeTintColor: "#E29821",
      inactiveTintColor: "gray",
      tabStyle: {
        backgroundColor: "#E9EEC9",
      },
    },
  }
);

export default createAppContainer(TabNavigator);
