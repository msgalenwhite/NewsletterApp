require 'factory_bot'

FactoryBot.define do
  factory :invitation do
    newsletter
    association :host, factory: [:user]
    name 'name'
    sequence(:email) {|n| "invitation#{n}@example.com" }
  end
end
