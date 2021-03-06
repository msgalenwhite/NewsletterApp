class Entry < ApplicationRecord
  belongs_to :user
  belongs_to :newsletter

  validates :title, presence: true
  validates :body, presence: true

  mount_uploader :photo, PhotoUploader

  scope :with_year_and_month, ->(year, month) {
    where(created_at: Date.new(year,month,1)..Date.new(year,month,-1))
  }

  def info_with_author
    {
      author: user.full_name,
      title: title,
      body: body,
      photo: photo.url
    }
  end
end
