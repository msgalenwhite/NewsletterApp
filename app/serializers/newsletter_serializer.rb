class NewsletterSerializer < ActiveModel::Serializer
  attributes :id, :description, :photo, :title, :founder_name

  def founder_name
    object.founder.full_name
  end

  def photo
    object.thumb_photo.url
  end
end
