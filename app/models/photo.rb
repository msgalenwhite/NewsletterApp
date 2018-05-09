class Photo < ApplicationRecord
  validates :picture, null: false
  belongs_to :entry

  mount_uploader :picture, PhotoUploader
end
