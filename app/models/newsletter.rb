class Newsletter < ApplicationRecord
  validates :description, presence: true
  validates :title, presence: true

  mount_uploader :thumb_photo, PhotoUploader

  has_many :subscriptions
  has_many :users, through: :subscriptions
  has_many :entries

  belongs_to :founder, class_name: "User", foreign_key: "founder_id"

  def subscriber_info
    subscriber_info = []
    users.all.each do |user|
      subscriber_info << user.name_and_email
    end
    subscriber_info
  end
end
