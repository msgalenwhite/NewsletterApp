class NewsletterSerializer < ActiveModel::Serializer
  attributes :id, :description, :thumb_photo, :title, :founder_name

  def founder_name
    User.find(object.founder_id).full_name
  end
end
