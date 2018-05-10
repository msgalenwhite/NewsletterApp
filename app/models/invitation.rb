class Invitation < ApplicationRecord
  belongs_to :host, class_name: "User"
  belongs_to :newsletter

  validates :email, presence: true
  validates :name, presence: true

  validates :email, uniqueness: { scope: :newsletter_id }
end
