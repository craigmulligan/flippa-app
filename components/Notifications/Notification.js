import React from 'react'
import { View } from 'react-native'
import Like from './Like'
import Follow from './Follow'

export default ({ sourceType, user, actor, post, createdAt }) => {
  if (sourceType === 'FOLLOW') {
    return <Follow actor={actor} createdAt={createdAt} />
  } else if (sourceType === 'LIKE') {
    return <Like actor={actor} post={post} createdAt={createdAt}/>
  }
}
