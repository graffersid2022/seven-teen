import React, { useState, memo } from 'react'
import { View, Text, useWindowDimensions } from 'react-native';
import { TabView } from 'react-native-tab-view';

import categories from '../../constant/categories';

import EmojiCategory from './EmojiCategory';
import TabBar from './TabBar';

const EmojiPicker = ({onMsg}) => {
	const layout = useWindowDimensions();
	const [index, setIndex] = useState(0);
	const [routes, setRoutes] = useState(categories.tabs.map(tab => ({ key: tab.category, title: tab.tabLabel })));

	const renderScene = ({ route }) => (
		<EmojiCategory 
			category={route.key}
			onMsg={onMsg}
		/>
	)

	return (
		<View style={{flex:1}}>
		<TabView
			renderTabBar={props => <TabBar setIndex={setIndex} {...props} />}
			navigationState={{index, routes}}
			onIndexChange={setIndex}
			renderScene={renderScene}
			initialLayout={{ width: layout.width }}
			// tabBarPosition='bottom'
		/>
		</View>
	)
}

export default memo(EmojiPicker);