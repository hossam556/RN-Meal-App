import React from 'react'
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import {createBottomTabNavigator} from 'react-navigation-tabs'

import {Platform} from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import Colors from '../constants/Colors'
import CategoryMealsScreen from '../screens/CategoryMealsScreen';
import CategoriesScreen from '../screens/CategoriesScreen';
import MealDetailScreen from '../screens/MealDetailScreen';
import FavouritesScreen from '../screens/FavouritesScreen'

const MealsNavigator = createStackNavigator({
  Categories: CategoriesScreen,
  CategoryMeals: {
    screen: CategoryMealsScreen
  },
   MealDetail: MealDetailScreen
} ,
{
  defaultNavigationOptions : {
    headerStyle: {
      backgroundColor: Platform.OS === 'android' ? Colors.primaryColor : ''
    },
    headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primaryColor
  }
});

const MealsFavTabNavigator = createBottomTabNavigator({
  Meals : {screen : MealsNavigator , navigationOptions : {
        tabBarIcon : tabInfo => {
          return <Ionicons  
                  name="ios-restaurant"
                  size={25}
                  color={tabInfo.tintColor}/>
        }
  }} ,
  Favourites : {
        screen: FavouritesScreen,
        navigationOptions: {
        tabBarLabel: 'Favorites!',
        tabBarIcon: tabInfo => {
          return (
            <Ionicons name="ios-star" size={25} color={tabInfo.tintColor} />
          );
        }
      }
  } 
},
{
   tabBarOptions : {
     activeTintColor : Colors.accentColor
   }
})

export default createAppContainer(MealsFavTabNavigator);
