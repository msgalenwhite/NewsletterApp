import fetchMock from 'fetch-mock'

import UserHomePage from '../../../app/javascript/containers/UserHomePage'
import NewsletterList from '../../../app/javascript/components/NewsletterList'

describe ('UserHomePage', () => {
  let wrapper;
  let fetchedData;

  beforeEach(() => {
    fetchedData = [
      {
        "id": 1,
        "description": "desc",
        "thumb_photo": {
          "url": "https://newsletter-app-development.s3.amazonaws.com/uploads/newsletter/thumb_photo/1/blue_flowers.jpg"
        },
        "title": "New",
        "founder": {
          "id": 1,
          "email": "test@test.com",
          "created_at": "2018-05-07T16:26:11.940Z",
          "updated_at": "2018-05-07T17:51:11.270Z",
          "first_name": "test",
          "last_name": "user",
          "profile_photo": {
            "url": "https://newsletter-app-development.s3.amazonaws.com/uploads/user/profile_photo/1/purple_flowers.jpg"
          },
        "bio": "bio",
        "current_city": "Boston",
        "current_state": "MA"
        }
      }
    ]

    fetchMock.get('/api/v1/newsletters.json', {
      status: 200,
      body: fetchedData
    });
    wrapper = mount(<UserHomePage />)
  })

  afterEach(fetchMock.restore)

  // Testing State and its changes
  it ('initializes with the correct state', () => {
    expect(wrapper.state()).toEqual({
      foundedNewsletters: [],
      userInfo: {}
    })
  })

  // Testing rendered components
  it('contains a header', () => {
    expect(wrapper.text()).toContain('Newsletter Home Page')
  })
  it('has a "link" to create a Newsletter', () => {
    expect(wrapper.text()).toContain('Create a Newsletter')
    expect(wrapper.find('a').text()).toContain('Create a Newsletter')
  })
  it ('has a list of newsletters', () => {
    expect(wrapper.find(NewsletterList)).toBePresent()
  })

  // Test fetch call
  it ('changes state to reflect the content of an api call', (done) => {
    setTimeout(() => {
      expect(wrapper.state()).toEqual({
        foundedNewsletters: fetchedData,
        userInfo: fetchedData[0]["founder"]
      })
      done()
    }, 0)
  })

  it ('passes the correct props to NewsletterList', () => {
    setTimeout(() => {
      expect(wrapper.find(NewsletterList).props()).toEqual ({
        newsletters: fetchedData
      })
      done()
    }, 0)
  })
})
