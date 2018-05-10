class Invitation < ApplicationRecord
  belongs_to :host, class_name: "User"
  belongs_to :newsletter

  validates :email, presence: true
  validates :name, presence: true

  validates :email, uniqueness: { scope: :newsletter_id }
  validates_format_of :email,
    with: /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}/i
end
