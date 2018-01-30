import Upload from ''

export default class Carousel extends Component {
  _renderItem({ item, index }) {
    return (
      <View style={styles.slide}>
        <Text style={styles.title}>{item.title}</Text>
      </View>
    )
  }

  render() {
    return (
      <Carousel
        ref={c => {
          this._carousel = c
        }}
        data={this.state.entries}
        renderItem={this._renderItem}
        sliderWidth={sliderWidth}
        itemWidth={itemWidth}
      />
    )
  }
}
