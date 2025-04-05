import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ChefHat } from 'lucide-react-native';
import Colors from '@/constants/colors';

interface EmptyStateProps {
    title: string;
    message: string;
    icon?: React.ReactNode;
}

export default function EmptyState({ title, message, icon }: EmptyStateProps) {
    return (
        <View style={styles.container}>
            <View style={styles.iconContainer}>
                {icon || <ChefHat size={48} color={Colors.primary} />}
            </View>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.message}>{message}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 24,
    },
    iconContainer: {
        marginBottom: 16,
    },
    title: {
        fontSize: 20,
        fontWeight: '600',
        color: Colors.text,
        marginBottom: 8,
        textAlign: 'center',
    },
    message: {
        fontSize: 16,
        color: Colors.textLight,
        textAlign: 'center',
        lineHeight: 22,
    },
});