class ProjectSerializer < ActiveModel::Serializer
  attributes :id, :name, :description
  has_many :tasks
  has_many :users
end


