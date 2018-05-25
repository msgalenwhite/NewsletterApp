require 'factory_bot'

FactoryBot.define do
  factory :subscription do
    newsletter
    user
  end
end
