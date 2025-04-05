import React from "react";
import { Tabs } from "expo-router";
import { Home, Heart, User } from "lucide-react-native";
import Colors from "@/constants/colors";

export default function TabLayout() {
    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: Colors.primary,
                tabBarInactiveTintColor: Colors.textLight,
                tabBarStyle: {
                    backgroundColor: Colors.background,
                    borderTopColor: Colors.border,
                },
                headerStyle: {
                    backgroundColor: Colors.background,
                },
                headerTintColor: Colors.text,
                tabBarLabelStyle: {
                    fontSize: 12,
                    fontWeight: '500',
                },
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: "Discover",
                    tabBarIcon: ({ color, size }) => <Home size={size} color={color} />,
                }}
            />
            <Tabs.Screen
                name="favorites"
                options={{
                    title: "Favorites",
                    tabBarIcon: ({ color, size }) => <Heart size={size} color={color} />,
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    title: "Profile",
                    tabBarIcon: ({ color, size }) => <User size={size} color={color} />,
                }}
            />
        </Tabs>
    );
}