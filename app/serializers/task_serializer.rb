class TaskSerializer < ActiveModel::Serializer
  attributes :id, :content, :complete
  belongs_to :project
end
