class Entry < ApplicationRecord
  belongs_to :user
  belongs_to :newsletter

  validates :title, presence: true
  validates :body, presence: true

  mount_uploader :photo, PhotoUploader
end
