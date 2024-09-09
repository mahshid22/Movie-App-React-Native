import React from "react";
import { Tabs } from "expo-router";
import { MaterialCommunityIcons } from '@expo/vector-icons';

const Layout = ()=>{
    return (
        <Tabs
        screenOptions={({ route }) => ({
            headerShown: false,
            tabBarIcon: ({ color, size }) => {
              let iconName;
              console.log(route);
              switch (route.name) {
                case 'index':
                  iconName = 'home';
                  break;
                case 'movies':
                  iconName = 'movie';
                  break;
                case 'tvshows':
                  iconName = 'television';
                  break;
                case 'user':
                  iconName = 'account';
                  break;
                case 'detail':
                  iconName = 'information';
                  break;
                case 'search':
                  iconName = 'magnify';
                  break;
                default:
                  iconName = 'help'; // Fallback icon
              }
              return <MaterialCommunityIcons name={iconName} color={color} size={size} />;
            },
            // tabBarActiveTintColor,
            // tabBarInactiveTintColor,
            // tabBarStyle: {
            //   backgroundColor: tabBarBackgroundColor,
            // },
          })}
        >
            <Tabs.Screen name="index" options={{title: "Home"}}/>
            <Tabs.Screen name="movies" options={{title: "Movies"}}/>
            <Tabs.Screen name="detail" options={{title: "Details", tabBarButton: ()=>null}}/>
            <Tabs.Screen name="tvshows" options={{title: "Tv Shows"}}/>
            <Tabs.Screen name="user" options={{title: "User"}}/>
            <Tabs.Screen name="search" options={{title: "Search", tabBarButton: ()=>null}}/>
        </Tabs>
    )
}

export default Layout;
