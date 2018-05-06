class Newsletter < ApplicationRecord
  validates :description, presence: true

  mount_uploader :thumb_photo, PhotoUploader
end
