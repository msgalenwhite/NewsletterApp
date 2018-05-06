require 'factory_bot'

FactoryBot.define do
  factory :user do
    sequence(:email) {|n| "user#{n}@example.com" }
    password 'password'
    password_confirmation 'password'
    first_name 'first-name'
    last_name 'last_name'
    pic_url 'pic_url'
    bio 'bio'
    current_city 'current_city'
    current_state 'current_state'
  end
end
