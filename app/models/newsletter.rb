class Newsletter < ApplicationRecord
  validates :description, presence: true
  validates :title, presence: true

  mount_uploader :thumb_photo, PhotoUploader
end
