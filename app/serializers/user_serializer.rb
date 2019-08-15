class UserSerializer < ActiveModel::Serializer
  attributes :id, :name, :email
  has_many :projects, through: :user_projects
end
