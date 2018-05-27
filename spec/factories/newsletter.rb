require 'factory_bot'

FactoryBot.define do
  factory :newsletter do
    title 'title'
    description 'description'
    thumb_photo { Rack::Test::UploadedFile.new(Rails.root.join('spec', 'support', 'images', 'purple_flowers.jpg')) }
    association :founder, factory: [:user]

    factory :newsletter_with_entries do
      transient do
        entries_count 3
        subscriptions_count 5
      end

      after(:create) do |newsletter, evaluator|
        create_list(:entry, evaluator.entries_count, newsletter: newsletter)
        create_list(:subscription, evaluator.subscriptions_count, newsletter: newsletter)
      end
    end
  end
end
