import React from 'react';
import { StyleSheet, Text, TouchableOpacity, ActivityIndicator, ViewStyle, TextStyle } from 'react-native';
import Colors from '@/constants/colors';

interface ButtonProps {
    title: string;
    onPress: () => void;
    variant?: 'primary' | 'secondary' | 'outline';
    size?: 'small' | 'medium' | 'large';
    disabled?: boolean;
    loading?: boolean;
    icon?: React.ReactNode;
    style?: ViewStyle;
    textStyle?: TextStyle;
}

export default function Button({
    title,
    onPress,
    variant = 'primary',
    size = 'medium',
    disabled = false,
    loading = false,
    icon,
    style,
    textStyle,
}: ButtonProps) {
    const getBackgroundColor = () => {
        if (disabled) return Colors.border;

        switch (variant) {
            case 'primary':
                return Colors.primary;
            case 'secondary':
                return Colors.secondary;
            case 'outline':
                return 'transparent';
            default:
                return Colors.primary;
        }
    };

    const getTextColor = () => {
        if (disabled) return Colors.textLight;

        switch (variant) {
            case 'primary':
            case 'secondary':
                return '#FFFFFF';
            case 'outline':
                return variant === 'primary' ? Colors.primary : Colors.secondary;
            default:
                return '#FFFFFF';
        }
    };

    const getBorderColor = () => {
        if (disabled) return Colors.border;

        switch (variant) {
            case 'outline':
                return variant === 'primary' ? Colors.primary : Colors.secondary;
            default:
                return 'transparent';
        }
    };

    const getButtonSize = () => {
        switch (size) {
            case 'small':
                return {
                    paddingVertical: 8,
                    paddingHorizontal: 16,
                };
            case 'large':
                return {
                    paddingVertical: 16,
                    paddingHorizontal: 24,
                };
            default:
                return {
                    paddingVertical: 12,
                    paddingHorizontal: 20,
                };
        }
    };

    const getTextSize = () => {
        switch (size) {
            case 'small':
                return 14;
            case 'large':
                return 18;
            default:
                return 16;
        }
    };

    return (
        <TouchableOpacity
            style={[
                styles.button,
                {
                    backgroundColor: getBackgroundColor(),
                    borderColor: getBorderColor(),
                    ...getButtonSize(),
                },
                style,
            ]}
            onPress={onPress}
            disabled={disabled || loading}
            activeOpacity={0.8}
        >
            {loading ? (
                <ActivityIndicator color={getTextColor()} size="small" />
            ) : (
                <>
                    {icon && <>{icon}</>}
                    <Text
                        style={[
                            styles.text,
                            {
                                color: getTextColor(),
                                fontSize: getTextSize(),
                                marginLeft: icon ? 8 : 0,
                            },
                            textStyle,
                        ]}
                    >
                        {title}
                    </Text>
                </>
            )}
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 12,
        borderWidth: 1,
    },
    text: {
        fontWeight: '600',
    },
});