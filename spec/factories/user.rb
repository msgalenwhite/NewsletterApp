require 'factory_bot'

FactoryBot.define do
  factory :user do
    sequence(:email) {|n| "user#{n}@example.com" }
    password 'password'
    password_confirmation 'password'
    first_name 'first-name'
    last_name 'last_name'
    profile_photo { Rack::Test::UploadedFile.new(Rails.root.join('spec', 'support', 'images', 'purple_flowers.jpg')) }
    bio 'bio'
    current_city 'current_city'
    current_state 'current_state'

    factory :user_with_subscriptions do
      transient do
        subscriptions_count 3
      end

      after(:create) do |user, evaluator|
        create_list(:subscription, evaluator.subscriptions_count, user: user)
      end
    end
  end
end
