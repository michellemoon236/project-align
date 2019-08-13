class ProjectSerializer < ActiveModel::Serializer
  attributes :id, :name, :description
  # has_many :user_projects
  has_many :users, through: :user_projects
  has_many :tasks
end


