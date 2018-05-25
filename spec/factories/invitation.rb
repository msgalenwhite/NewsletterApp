require 'factory_bot'

FactoryBot.define do
  factory :invitation do
    association :host, factory: [:user]
    association :newsletter
    name 'name'
    sequence(:email) {|n| "invitation#{n}@example.com" }
  end
end
