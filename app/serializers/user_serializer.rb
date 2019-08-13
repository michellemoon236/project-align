class UserSerializer < ActiveModel::Serializer
  attributes :id, :name
  has_many :user_projects
  has_many :projects, through: :user_projects
  has_many :tasks, through: :projects
end
