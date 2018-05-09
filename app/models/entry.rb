class Entry < ApplicationRecord
  belongs_to :user
  belongs_to :newsletter
  has_many :photos

  validates :title, presence: true
  validates :body, presence: true
end
