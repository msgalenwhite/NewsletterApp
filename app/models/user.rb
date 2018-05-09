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

  has_many :founded_newsletters, class_name: "Newsletter"
  has_many :entries

  has_many :sent_invitations, class_name: "Invitation", foreign_key: :host_id
  has_many :guests, through: :sent_invitations, source: :guest

  has_many :received_invitations, class_name: "Invitation", foreign_key: :guest_id
  has_many :hosts, through: :received_invitations, source: :host

  def full_name
    first_name + " " + last_name
  end
end
