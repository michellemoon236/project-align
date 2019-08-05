class UserProject < ApplicationRecord
  belongs_to :user 
  belongs_to :project

  def assign_project_creator
    self.project_creator = true
    self.save
  end

end

