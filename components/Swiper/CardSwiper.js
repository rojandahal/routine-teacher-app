import React, { useRef, useState } from 'react';
import { View, Animated, PanResponder, StyleSheet, Dimensions, FlatList } from 'react-native';
import RoutineCard from '../Card/RoutineCard';

const CardSwiper = ({ cards }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const pan = useRef(new Animated.Value(0)).current;

    const screenWidth = Dimensions.get('window').width;
    const cardWidth = screenWidth * 0.8;

    const panResponder = useRef(
        PanResponder.create({
            onMoveShouldSetPanResponder: (_, gestureState) => Math.abs(gestureState.dx) > 10,
            onPanResponderMove: (_, gestureState) => {
                pan.setValue(gestureState.dx);
            },
            onPanResponderRelease: (_, gestureState) => {
                if (Math.abs(gestureState.dx) > cardWidth * 0.35) {
                    const newIndex = gestureState.dx > 0 ? Math.max(0, currentIndex - 1) : Math.min(cards.length - 1, currentIndex + 1);
                    setCurrentIndex(newIndex);
                    Animated.spring(pan, { toValue: 0, useNativeDriver: false }).start();
                } else {
                    Animated.spring(pan, { toValue: 0, useNativeDriver: false }).start();
                }
            },
        })
    ).current;

    const renderCard = ({ item, index }) => {
        const animatedCardStyle = {
            transform: [
                {
                    translateX: pan.interpolate({
                        inputRange: [-cardWidth, 0, cardWidth],
                        outputRange: [-cardWidth, 0, cardWidth],
                        extrapolate: 'clamp',
                    }),
                },
            ],
        };

        return (
            <Animated.View
                style={[styles.cardContainer, animatedCardStyle]}

            >
                <RoutineCard data={item} id={item?.id} />
            </Animated.View>
        );
    };

    return (
        <View style={styles.container}>
            <FlatList
                data={cards}
                renderItem={renderCard}
                keyExtractor={(item) => item.id.toString()}
                pagingEnabled
                scrollEnabled={cards.length > 1}
                removeClippedSubviews={false}
                contentContainerStyle={styles.cardsContainer}
                onScroll={(event) => {
                    const { contentOffset, layoutMeasurement } = event.nativeEvent;
                    const newIndex = Math.floor(contentOffset.x / layoutMeasurement.width);
                    setCurrentIndex(newIndex);
                }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    // container: {
    //     flex: 1,
    //     justifyContent: 'center',
    //     alignItems: 'center',
    // },
    // cardsContainer: {
    //     flexGrow: 1,
    //     justifyContent: 'center',
    //     alignItems: 'center',
    // },
    // cardContainer: {
    //     width: '80%',
    //     justifyContent: 'center',
    //     alignItems: 'center',
    // },
});

export default CardSwiper;
