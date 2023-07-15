import { useEffect, useRef } from "react";
import { Animated } from "react-native"

export const CustomeAnimation = ({ text, fontSize, marginTop = '8%' }) => {
    const fadeAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 2000,
            useNativeDriver: true,
        }).start();
    }, [fadeAnim]);

    return (
        <Animated.Text style={[{
            marginTop: marginTop,
            color: '#f4511e',
            fontSize: fontSize,
            textAlign: 'center',

            fontWeight: 'bold',
        }, { opacity: fadeAnim }]}>
            {text}
        </Animated.Text>
    )
}