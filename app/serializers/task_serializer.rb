class TaskSerializer < ActiveModel::Serializer
  attributes :id, :content, :complete, :created_at
  belongs_to :project
end
