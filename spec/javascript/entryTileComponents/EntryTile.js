import EntryTile from '../../../app/javascript/entryTileComponents/EntryTile'

describe ('entryTile', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(
      <EntryTile
        id={1}
        title='Sample Entry'
        body='This is a sample'
        authorPhoto={'../../../support/images/purple_flowers.jpg'}
        authorName='Entry Author'
        date='May 21'
        photo={Object}
        selfSubmitted={false}
        editEntry={jasmine.any(Function)}
      />
    )
  })

  it('renders the correct components', () => {
    const allDivs = wrapper.find('div')
    const expectedAuthorTag = `${wrapper.props().authorName}  ${wrapper.props().date}`

    expect(wrapper.find('img').props().src).toEqual(wrapper.props().authorPhoto)
    expect(wrapper.find('h5').text()).toEqual(wrapper.props().title)
    expect(wrapper.find('p').text()).toContain(wrapper.props().body)
    expect(wrapper.text()).toContain(expectedAuthorTag)
  })

  describe ('button renders conditionally', () => {
    it('creates a button if selfSubmitted is true', () => {
      wrapper.setProps({selfSubmitted: true})
      expect(wrapper.find('button')).toBePresent()
    })
    it('does not render a button if selfSubmitted is false', () => {
      wrapper.setProps({selfSubmitted: false})
      expect(wrapper.find('button').exists()).toEqual(false)
    })
  })
})
