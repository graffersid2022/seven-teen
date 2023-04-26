import React, { memo } from 'react'
import { FlatList, Dimensions } from 'react-native'

import Emoji from './Emoji';
import { emojisByCategory } from '../../constant/emojis'


const EmojiCategory = ({ category, onMsg }) => {
	return (
		<FlatList
			data={emojisByCategory[category]}
			renderItem={({ item }) => <Emoji item={item} onMsg={onMsg} />}
			keyExtractor={(item) => item}
			numColumns={8}
		/>
	)
}

export default memo(EmojiCategory);