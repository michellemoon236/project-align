class TaskSerializer < ActiveModel::Serializer
  attributes :id, :content, :complete, :created_at, :date_created, :date_updated
  belongs_to :project
end
