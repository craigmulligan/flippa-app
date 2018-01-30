import React, { Component } from 'react'
import { ActivityIndicator, FlatList, View } from 'react-native'
import { ListItem, Button } from 'react-native-elements'
import Expo from 'expo'
import get from 'lodash/get'
import gql from 'graphql-tag'
import { graphql } from 'react-apollo'
import uniqBy from 'lodash/uniqBy'
import { Empty, Follow, Invite } from '../components'
import constants from '../constants'
import store from '../redux'

const GET_USER = gql`
  query userByPhoneNumber($phoneNumber: String) {
    User(phoneNumber: $phoneNumber) {
      id
    }
  }
`

const ViewStore = ({ id }) => {
    return <Button buttonStyle={{ backgroundColor: constants.colors.green }} title={`view store`} onPress={() => store.getState().navigation.rootNavigation.navigate('Profile', { id: id }) } />
}

const FollowOrInvite = ({ phoneNumber, data: { User, loading } }) => {
  if (loading) {
    return <Button loading />
  }
  if (get(User, 'id')) {
    return (
      <View>
        <Follow id={User.id} />
        <ViewStore id={User.id} />
      </View>
    )
  }
  return <Invite phoneNumber={phoneNumber} />
}

const FollowOrInviteWithData = graphql(GET_USER, {
  options: ({ phoneNumber }) => ({
    variables: {
      phoneNumber: phoneNumber || ''
    }
  })
})(FollowOrInvite)



export default class Contacts extends Component {
  constructor() {
    super()
    this.state = {
      contacts: [],
      loading: false,
      offset: 0,
      hasNextPage: true
    }
  }

  _getContactsAsync = async () => {
    this.setState({ loading: true })
    // Ask for permission to query contacts.
    const permission = await Expo.Permissions.askAsync(
      Expo.Permissions.CONTACTS
    )
    if (permission.status !== 'granted') {
      // Permission was denied...
      return
    }

    const { data, hasNextPage } = await Expo.Contacts.getContactsAsync({
      fields: [
        Expo.Contacts.PHONE_NUMBERS,
        Expo.Contacts.EMAILS,
        Expo.Contacts.IMAGE,
        Expo.Contacts.THUMBNAIL
      ],
      pageSize: 10,
      pageOffset: this.state.offset
    })

    this.setState(prevState => {
      return {
        loading: false,
        offset: ++prevState.offset,
        contacts: uniqBy([...prevState.contacts, ...data], 'name'),
        hasNextPage
      }
    })
  }

  componentDidMount = async () => {
    try {
      await this._getContactsAsync()
    } catch (error) {
      console.log(error)
      this.setState({ error })
    }
  }

  _renderRow({ item }) {
    const pn = get(item, 'phoneNumbers[0].number')

    return (
      <ListItem
        roundAvatar
        avatar={item.imageAvailable && item.thumbnail.uri}
        title={get(item, 'name')}
        subtitle={pn}
        rightIcon={<FollowOrInviteWithData phoneNumber={pn} />}
      />
    )
  }

  _renderFooter = () => {
    if (!this.state.hasNextPage && !this.state.loading) {
      return <Empty />
    }

    if (!this.state.loading) return null

    return (
      <View
        style={{
          paddingVertical: 20,
          borderTopWidth: 1
        }}
      >
        <ActivityIndicator animating size="large" />
      </View>
    )
  }

  render() {
    const { contacts, loading } = this.state
    if (contacts.length > 0) {
      return (
        <FlatList
          extraData={this.state}
          data={contacts}
          keyExtractor={item => item.id}
          renderItem={this._renderRow}
          refreshing={loading}
          onEndReached={this._getContactsAsync}
          ListFooterComponent={this._renderFooter}
        />
      )
    }
    return <Empty />
  }
}
