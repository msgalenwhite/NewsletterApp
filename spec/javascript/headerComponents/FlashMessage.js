import FlashMessage from '../../../app/javascript/headerComponents/FlashMessage'

describe('Flash Message', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(
      <FlashMessage flashMessage='Wooo!'/>
    )
  })

  it('contains a div with the message', () => {
    expect(wrapper.find('div').text()).toContain(wrapper.props().flashMessage)
    expect(wrapper.find('div').props().className).toEqual('alert-box')
  })

  it('contains an a tag with the right attributes', () => {
    let aTagAttributes = wrapper.find('a').props()

    expect(aTagAttributes.href).toEqual('#')
    expect(aTagAttributes.className).toEqual('close')
  })
})
