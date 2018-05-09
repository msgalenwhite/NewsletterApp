class Subscription < ApplicationRecord
  belongs_to :user
  belongs_to :newsletter

  validates :user_id, uniqueness: { scope: :newsletter_id }
end
