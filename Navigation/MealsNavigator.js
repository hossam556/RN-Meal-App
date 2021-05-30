import React from 'react'
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import {createBottomTabNavigator} from 'react-navigation-tabs'
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import {createDrawerNavigator} from 'react-navigation-drawer'

import {Platform ,Text} from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import Colors from '../constants/Colors'
import CategoryMealsScreen from '../screens/CategoryMealsScreen';
import CategoriesScreen from '../screens/CategoriesScreen';
import MealDetailScreen from '../screens/MealDetailScreen';
import FavouritesScreen from '../screens/FavouritesScreen'
import FiltersScreen from '../screens/FiltersScreen'

const defaultStackNavOptions = {
  headerStyle: {
    backgroundColor: Platform.OS === 'android' ? Colors.primaryColor : ''
  },
  headerTitleStyle: {
    fontFamily : 'open-sans-bold'
  } ,
  headerBackTitleStyle: {
    fontFamily : 'open-sans'
  } ,
  headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primaryColor,
  headerTitle: 'A Screen'
};

const MealsNavigator = createStackNavigator({
  Categories: CategoriesScreen,
  CategoryMeals: {
    screen: CategoryMealsScreen
  },
   MealDetail: MealDetailScreen
} ,
{
  defaultNavigationOptions : defaultStackNavOptions
});

const FavNavigator = createStackNavigator(
  {
    Favorites: FavouritesScreen,
    MealDetail: MealDetailScreen
  },
  {
    // initialRouteName: 'Categories',
    defaultNavigationOptions: defaultStackNavOptions
  }
);


const tabScreenConfig = {
  Meals : {screen : MealsNavigator , navigationOptions : {
        tabBarIcon : tabInfo => {
          return <Ionicons  
                  name="ios-restaurant"
                  size={25}
                  color={tabInfo.tintColor}/>
        },

        tabBarColor: Colors.primaryColor,
        tabBarLabel : Platform.OS === "android" ? <Text style={{fontFamily :"open-sans"}}> Meals</Text> : 'Meals'
  }} ,
  Favourites : {
        screen: FavNavigator,
        navigationOptions: {
        tabBarLabel: 'Favorites!',
        tabBarIcon: tabInfo => {
          return (
            <Ionicons name="ios-star" size={25} color={tabInfo.tintColor} />
          );
        },
        tabBarColor: Colors.accentColor,
        tabBarLabel : Platform.OS === "android" ? <Text style={{fontFamily :"open-sans"}}> Favorites</Text> : 'Favorites'
      }
  } 
};

const MealsFavTabNavigator = Platform.OS =="android" ? 
createMaterialBottomTabNavigator( tabScreenConfig ,
    {
      activeColor: 'white',
      shifting: true,
      barStyle: {
        backgroundColor: Colors.primaryColor
      }
    }

   
) 
: createBottomTabNavigator( tabScreenConfig ,
{
   tabBarOptions : {
    labelStyle: {
      fontFamily : 'open-sans'
    } ,
     activeTintColor : Colors.accentColor
   }
})

const FiltersNavigator = createStackNavigator(
  {
    Filters: FiltersScreen
  },
  {
    // navigationOptions: {
    //   drawerLabel: 'Filters!!!!'
    // },
    defaultNavigationOptions: defaultStackNavOptions
  }
);

const MainNavigator = createDrawerNavigator(
  {
    MealsFavs: {
      screen: MealsFavTabNavigator,
      navigationOptions: {
        drawerLabel: 'Meals'
      }
    },
    Filters: FiltersNavigator
  },
  {
    contentOptions: {
      activeTintColor: Colors.accentColor,
      labelStyle: {
        fontFamily: 'open-sans-bold'
      }
    }
  }
);

export default createAppContainer(MainNavigator);
