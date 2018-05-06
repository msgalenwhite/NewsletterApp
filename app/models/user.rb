class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  validates :first_name, presence: true
  validates :last_name, presence: true
  validates :bio, presence: true
  validates :current_city, presence: true
  validates :current_state, presence: true

  mount_uploader :profile_photo, PhotoUploader
end
