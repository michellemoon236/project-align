class UserProjectSerializer < ActiveModel::Serializer
  attributes :id
  belongs_to :user 
  belongs_to :project
end
