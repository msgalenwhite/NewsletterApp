class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  validates :first_name, presence: true
  validates :last_name, presence: true
  validates :profile_photo, presence: true
  validates :bio, presence: true
  validates :current_city, presence: true
  validates :current_state, presence: true

  mount_uploader :profile_photo, PhotoUploader

  has_many :subscriptions
  has_many :newsletters, through: :subscriptions

  has_many :founded_newsletters, class_name: "Newsletter", foreign_key: "founder_id"
  has_many :entries

  has_many :invitations

  def full_name
    first_name + " " + last_name
  end
end
