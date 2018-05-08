class NewsletterSerializer < ActiveModel::Serializer
  attributes :description, :thumb_photo, :title, :founder_name

  def founder_name
    object.founder.full_name
  end
end