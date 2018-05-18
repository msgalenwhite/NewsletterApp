# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
cali_lat = 36.7783
cali_lng = 119.4179

boston_lat = 42.361145
boston_lng = -71.057083

disney_lat = 28.3852
disney_lng = 81.5639

me = User.create!(
  email: 'me@test.com',
  password: 'password',
  password_confirmation: 'password',
  first_name: 'Galen',
  last_name: 'White',
  remote_profile_photo_url: 'https://i.imgur.com/l50XHk0.jpg',
  bio: 'Chocolate, Sugar, and Code, oh my!',
  current_city: 'Boston',
  current_state: 'MA',
  latitude: boston_lat,
  longitude: boston_lng
)

cat = User.create!(
  email: 'josephine@test.com',
  password: 'password',
  password_confirmation: 'password',
  first_name: 'Princess',
  last_name: 'Josephine',
  remote_profile_photo_url: 'https://scontent.fbed1-2.fna.fbcdn.net/v/t1.0-9/26229518_10101890518322968_8015679097110388212_n.jpg?_nc_cat=0&oh=9e5ffb1604693f7b4118883f36681c9a&oe=5B82B9A6',
  bio: 'Meow?',
  current_city: 'Boston',
  current_state: 'MA',
  latitude: boston_lat,
  longitude: boston_lng
)

brother = User.create!(
  email: 'eli@test.com',
  password: 'password',
  password_confirmation: 'password',
  first_name: 'Eli',
  last_name: 'White',
  remote_profile_photo_url: 'https://scontent.fbed1-2.fna.fbcdn.net/v/t1.0-9/26169579_1817761124901060_2694441482831658414_n.jpg?_nc_cat=0&oh=ddcbb63f2801e36cba74f253b0d84ed4&oe=5B9A929E',
  bio: 'You should never trust a cat.',
  current_city: 'Redwood City',
  current_state: 'CA',
  latitude: disney_lat,
  longitude: disney_lng
)

grandma = User.create!(
  email: 'grandma@test.com',
  password: 'password',
  password_confirmation: 'password',
  first_name: 'Miriam',
  last_name: 'White',
  remote_profile_photo_url: 'https://i.imgur.com/eR8J1yD.png',
  bio: 'Taking a walk in the garden is the most peaceful thing you can do - second only to walking with a loved one.',
  current_city: 'Anaheim',
  current_state: 'California',
  latitude: cali_lat,
  longitude: cali_lng
)

newsletter = Newsletter.create!(
  description: 'This newsletter began as a way for the Tompkins family to keep in touch once they had left the farm and scattered across the country.  Thankfully, we no longer have to copy each letter by hand!',
  title: 'Tompkins Family Newsletter',
  founder_id: grandma.id,
  remote_thumb_photo_url: "https://scontent.fbed1-2.fna.fbcdn.net/v/t1.0-9/30415285_10156309373472277_4734845743238479872_n.jpg?_nc_cat=0&oh=40e7a1387bf4e89e42684516b135a18e&oe=5B8942B8"
)

users = [me, brother, grandma, cat]

users.each do |user|
  Subscription.find_or_create_by!(
    newsletter_id: newsletter.id,
    user_id: user.id
  )
end

me_entry = "This month I graduated from my programming bootcamp!  I'm really excited to begin working as a developer full-time.  Thank you for cheering me on and for all of the support - let me know the next time you're in Boston.  We'll have to all get together for a game of Monopoly."


brother_entry = "I just left for Japan last night - or was it this morning?  I don't know, but my last meal was some fantastic ice cream.  @Galen - next time we get together, we should go over more Computer Science topics!  Last time it reminded me of when we were kids, and Dad would give us math problems at the dinner table."

grandma_entry = "Dear Folks-\n\nDecember was fast paced and great!  Bruce and Steve home an entire week bridge and food--- Barbara and Mike Turell entertained all of us (The Bay Area Clan) the night before the wedding.  We ate on Aunt Julia's china.  I do not recall ever seeing it before.  Carol Tomkins remembered it.  Barbara, as a young girl--always kept telling Aunt Julia how nice it was so she promised Barbara she could have it.  Mike has made a large beautiful china cabinet similar to the one Duane made for their home.\n\nBruce met his Bay Area cousins for the first time in 11 years.\n\nBert & Lori are back from Hawaii--their baggage came home later and I suppose they are in Tustin trying out all their Wedding presents and trying to balance a budget\n\nSorry we missed Carol & David when they were in Seattle, had hoped they would fly back this direction.  Our best for the great 1979 Everyone, P.S. Steve has applied for a job with the Peace Corps in Niger working with date palms."

cat_entry = "Purr Purr Mew Meow Purr Food Meow"

Entry.create!(
  user_id: me.id,
  newsletter_id: newsletter.id,
  title: "After 10 weeks of furiously learning about React and Rails... I'm ready to do it for real!",
  body: me_entry,
  remote_photo_url: "https://scontent.fbed1-2.fna.fbcdn.net/v/t1.0-9/31265226_10101997353858698_1446578116670521344_n.jpg?_nc_cat=0&oh=ad00a7021abe961e7030486fe351a702&oe=5B7D09A3"
)

Entry.create!(
  user_id: grandma.id,
  newsletter_id: newsletter.id,
  title: "A Throwback entry from 1979",
  body: grandma_entry,
  remote_photo_url: "https://scontent.fbed1-2.fna.fbcdn.net/v/t1.0-9/15747349_837569773065035_2032646559029738644_n.jpg?_nc_cat=0&oh=d7fccdd16201258f78e17eb9ff7f8a6e&oe=5B87A9AE"
)

Entry.create!(
  user_id: brother.id,
  newsletter_id: newsletter.id,
  title: "React is Awesome!",
  body: brother_entry,
  remote_photo_url: "https://scontent.fbed1-2.fna.fbcdn.net/v/t1.0-9/27654913_10159752822420136_3577068070488302447_n.jpg?_nc_cat=0&oh=6d20f57c851bc7f63049654a5e10ce1f&oe=5B8408BD"
)

Entry.create!(
  user_id: cat.id,
  newsletter_id: newsletter.id,
  title: "Meow Meow, Purrrr",
  body: cat_entry,
  remote_photo_url: "https://scontent.fbed1-2.fna.fbcdn.net/v/t1.0-9/28166576_10101936427051508_2358890169218290630_n.jpg?_nc_cat=0&oh=570dc5561826db3aa2e7206c812a01ac&oe=5B7AD72F"
)
