import NewsletterList from '../../../app/javascript/components/NewsletterList'
import NewsletterDisplayTile from '../../../app/javascript/components/NewsletterDisplayTile'

describe ('NewsletterList', () => {
  let wrapper;
  let propData = [
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

  beforeEach(() => {
    wrapper = mount(
      <NewsletterList newsletters={propData}/>
    )
  })

  it ('renders a list of NewsletterDisplayTiles', () => {
    expect(wrapper.find(NewsletterDisplayTile).length).toEqual(propData.length)
  })
})
