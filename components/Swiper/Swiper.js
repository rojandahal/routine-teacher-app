import React, { useState } from 'react';
import { View, Text } from 'react-native';
import Swiper from 'react-native-deck-swiper';


const cardData = [
    { id: 1, title: 'Card 1', description: 'This is card 1' },
    { id: 2, title: 'Card 2', description: 'This is card 2' },
    { id: 3, title: 'Card 3', description: 'This is card 3' },
];


const CardSwiper = () => {
    const [swiperIndex, setSwiperIndex] = useState(0);

    const handleSwiped = () => {
        setSwiperIndex(swiperIndex + 1);
    };

    return (
        <View style={{ flex: 1 }}>
            <Swiper
                cards={cardData}
                renderCard={(card) => (
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ fontSize: 24 }}>{card.title}</Text>
                        <Text>{card.description}</Text>
                    </View>
                )}
                onSwiped={handleSwiped}
                cardIndex={swiperIndex}
                stackSize={2}
                stackSeparation={10}
                disableTopSwipe
                disableBottomSwipe
            />
        </View>
    );
};

export default CardSwiper;
