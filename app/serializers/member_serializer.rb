class MemberSerializer < ActiveModel::Serializer
  attributes: :email, :full_name
end
