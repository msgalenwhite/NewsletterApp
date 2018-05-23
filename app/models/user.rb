class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :omniauthable, omniauth_providers: %i[facebook]

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

  def name_and_email
    {name: full_name, email: email}
  end

  def self.from_omniauth(auth)
    binding.pry
    where(provider: auth.provider, uid: auth.uid).first_or_create do |user|
      user.email = auth.info.email
      user.password = Devise.friendly_token[0,20]
      name_array = auth.info.name.split(" ")
      if name_array.length > 1
        user.first_name = name_array[0]
        user.last_name = name_array[-1]
      else
        user.first_name = name_array[0]
        user.last_name = ' '
      end

      user.profile_photo = auth.info.image
    end
  end

  def self.new_with_session(params, session)
    binding.pry
    super.tap do |user|
      if data = session["devise.facebook_data"] && session["devise.facebook_data"]["extra"]["raw_info"]
        user.email = data["email"] if user.email.blank?
      end
    end
  end
end
