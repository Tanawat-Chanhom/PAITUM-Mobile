// import คอมโพเนนต์ที่จำเป็น
import React from "react";
import { Image } from "react-native";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";
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
import CreatePost from "../screens/createPost";
import Setting from "../screens/setting";
import SettingProfile from "../screens/settingProfile";
import SettingAccount from "../screens/settingAccount";
import Restaurant from "../screens/restaurant";
import Promation from "../screens/promotion";
import RestaurantCoupon from "../screens/restaurantCoupon";
import Login from "../screens/login";
import Register from "../screens/register";

const RestaurantStack = createStackNavigator(
  {
    Restaurant: {
      screen: Restaurant,
    },
    CreatePost: {
      screen: CreatePost,
    },
    Promation: {
      screen: Promation,
    },
    RestaurantCoupon: {
      screen: RestaurantCoupon,
    },
  },
  {
    defaultNavigationOptions: {
      headerShown: false,
    },
  }
);

const ProfileStack = createStackNavigator(
  {
    Profile: {
      screen: Profile,
    },
    Setting: {
      screen: Setting,
    },
    SettingProfile: {
      screen: SettingProfile,
    },
    SettingAccount: {
      screen: SettingAccount,
    },
    RestaurantStack: {
      screen: RestaurantStack,
    },
  },
  {
    defaultNavigationOptions: {
      headerShown: false,
    },
  }
);

const HomeStack = createStackNavigator(
  {
    Home: {
      screen: Home,
    },
    RestaurantStack: {
      screen: RestaurantStack,
    },
  },
  {
    defaultNavigationOptions: {
      headerShown: false,
    },
  }
);

const MapStack = createStackNavigator(
  {
    Map: {
      screen: Map,
    },
    RestaurantStack: {
      screen: RestaurantStack,
    },
  },
  {
    defaultNavigationOptions: {
      headerShown: false,
    },
  }
);

const TabNavigator = createBottomTabNavigator(
  {
    Home: {
      screen: HomeStack,
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
      screen: MapStack,
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
      screen: CreatePost,
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
      screen: ProfileStack,
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

const LoginStack = createStackNavigator(
  {
    Login: Login,
    Register: Register,
  },
  {
    defaultNavigationOptions: {
      headerShown: false,
    },
  }
);

const RootNavigation = createBottomTabNavigator(
  {
    LoginStack: LoginStack,
    MainApp: TabNavigator,
  },
  {
    defaultNavigationOptions: {
      tabBarVisible: false,
    },
  }
);

export default createAppContainer(RootNavigation);
