class TaskSerializer < ActiveModel::Serializer
  attributes :id, :content, :project_id, :complete, :created_at, :date_created, :date_updated
  belongs_to :project
end
