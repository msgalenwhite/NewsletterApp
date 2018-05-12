class NewsletterSerializer < ActiveModel::Serializer
  attributes :id, :description, :thumb_photo, :title, :founder_name

  def founder_name
    object.founder.full_name
  end

  def entries
    object.entries
  end
end
