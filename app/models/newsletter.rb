class Newsletter < ApplicationRecord
  validates :description, presence: true
  validates :title, presence: true

  mount_uploader :thumb_photo, PhotoUploader

  has_many :subscriptions
  has_many :users, through: :subscriptions
  belongs_to :user
end
