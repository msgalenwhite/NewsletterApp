class Newsletter < ApplicationRecord
  validates :description, presence: true
  validates :title, presence: true

  mount_uploader :thumb_photo, PhotoUploader

  has_many :subscriptions
  has_many :users, through: :subscriptions
  has_many :entries

  belongs_to :founder, class_name: "User", foreign_key: "founder"
end
