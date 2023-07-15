import React, { useState } from 'react';
import { View, Text, TabBarIOS, StyleSheet } from 'react-native';

const TabList = () => {
    const [selectedTab, setSelectedTab] = useState('tab1');

    return (
        <TabBarIOS
            style={styles.container}
            tintColor="blue"
            barTintColor="white"
        >
            <TabBarIOS.Item
                title="Tab 1"
                selected={selectedTab === 'tab1'}
                onPress={() => setSelectedTab('tab1')}
            >
                <View style={styles.tabContent}>
                    <Text>Tab 1 content</Text>
                </View>
            </TabBarIOS.Item>

            <TabBarIOS.Item
                title="Tab 2"
                selected={selectedTab === 'tab2'}
                onPress={() => setSelectedTab('tab2')}
            >
                <View style={styles.tabContent}>
                    <Text>Tab 2 content</Text>
                </View>
            </TabBarIOS.Item>
        </TabBarIOS>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    tabContent: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default TabList;
