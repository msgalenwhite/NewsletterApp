# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
orlando_lat = 28.5383
orlando_long = 81.3792

anaheim_lat = 33.8366
anaheim_long = 117.9143

gus = User.create!(
  email: 'gus-gus@test.com',
  password: 'password',
  password_confirmation: 'password',
  first_name: 'Gus',
  last_name: 'Gus',
  remote_profile_photo_url: 'https://i.pinimg.com/originals/e8/50/4c/e8504cbdf519c12aa21016d52e81e289.jpg',
  bio: 'Cheese always makes me happy.',
  current_city: 'Orlando',
  current_state: 'Florida',
  latitude: orlando_lat,
  longitude: orlando_long
)

jaq = User.create!(
  email: 'jaq@test.com',
  password: 'password',
  password_confirmation: 'password',
  first_name: 'Jaq',
  last_name: 'the Friendly Mouse',
  remote_profile_photo_url: 'https://i.pinimg.com/originals/d8/93/a8/d893a87fb19fab6d6449cf2c2c2d3bea.jpg',
  bio: 'You should never trust a cat.',
  current_city: 'Orlando',
  current_state: 'Florida',
  latitude: orlando_lat,
  longitude: orlando_long
)

cinderella = User.create!(
  email: 'cinderella@test.com',
  password: 'password',
  password_confirmation: 'password',
  first_name: 'Cinderella',
  last_name: 'Charming',
  remote_profile_photo_url: 'http://4.bp.blogspot.com/-5DcQEsKUVok/UyPubhot61I/AAAAAAAA2bM/RSPxGLpKjtQ/s1600/Cinderella_iconic.jpg',
  bio: 'A good pair of shoes is never a waste.',
  current_city: 'Anaheim',
  current_state: 'California',
  latitude: anaheim_lat,
  longitude: anaheim_long
)

newsletter = Newsletter.create!(
  description: 'To help everyone keep in touch!',
  title: 'Charming Family Newsletter',
  founder_id: cinderella.id,
  remote_thumb_photo_url: "https://vignette.wikia.nocookie.net/disney/images/2/2a/Cinderella_Redesign_8.jpg/revision/latest/scale-to-width-down/640?cb=20140503180006"
)

users = [gus, jaq, cinderella]

users.each do |user|
  Subscription.find_or_create_by!(
    newsletter_id: newsletter.id,
    user_id: user.id
  )
end

cinderella_entry = "I am so excited to share my new life with all of you!  You probably wouldn't enjoy life in the castle (it is far too well-maintained to allow any mice in the walls) but it is simply fantastic.  My wonderful prince indulges me in everything, and has invited you to come visit for our next ball.  He wants to thank all of you for getting me to the ball in the first place, or we never would have met!  I forgot to mention, no cats are allowed at any of the balls, so you don't have to worry."


gus_entry = "Cheese is still amazing.  Do you have cheese at the castle, Cinderella?  If not, you should definitely get some.  Do you want me to bring you some?  I can't carry much at once, but for you I would do anything.\n I had a really rough week last week - the cat kept chasing me around the courtyard and everyone just laughed when my shirt caught on her claws!"

jaq_entry = "It's still not easy keeping Gus out of trouble.  Did you know, he actually tried to make his own cheese this month?  We all thought he would never go through with it, but he gave it his best shot.  I've been busy or I would have seen the warning signs before the whole house smelled like your stepsister's feet."

Entry.find_or_create_by!(
  user_id: cinderella.id,
  newsletter_id: newsletter.id,
  title: "Notes from around the castle",
  body: cinderella_entry,
  photo: "http://disney.wikia.com/wiki/File:Cinderella-cinderella.jpg"
)

Entry.find_or_create_by!(
  user_id: gus.id,
  newsletter_id: newsletter.id,
  title: "Cheese!",
  body: gus_entry,
  photo: "https://giphy.com/gifs/disney-mouse-cheese-IBRObUYB3p9S0"
)

Entry.find_or_create_by!(
  user_id: jaq.id,
  newsletter_id: newsletter.id,
  title: "We miss you, Cinderella.",
  body: jaq_entry,
  photo: "https://ohmy.disney.com/wp-content/uploads/2013/05/Cinderella-Clutch_JG_keydoor.jpg"
)

### Previous Months' entries:

old_entry = Entry.find_or_create_by(
  user_id: cinderella.id,
  newsletter_id: newsletter.id,
  title: "So many boxes!",
  body: "We just moved into the castle last week, and there are still boxes everywhere!  Servants keep appearing and trying to put things away for me, but you know I wouldn't let people do those kinds of things for me!  I don't let anyone dress me but birds and mice... although even my prince thinks that's silly.  Of course, he doesn't know any birds or mice."
)
old_entry.created_at = DateTime.parse("2018-04-12T00:00:00")


old_entry2 = Entry.find_or_create_by!(
  user_id: jaq.id,
  newsletter_id: newsletter.id,
  title: "Just isn't the same around here.",
  body: "We really miss having you around, Cinderella.  No one else recognizes us when we try to give them fashion advice.  Why, just last week your stepsister left the house in an outfit so hideous, she spilled jam on herself and everyone thought it was an improvement!"
)
old_entry2.created_at = DateTime.parse("2018-04-12T00:00:00")
