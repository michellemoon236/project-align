class Task < ApplicationRecord
  belongs_to :project
  validates :content, presence: true

  scope :completed, -> { where(complete: true) }
  scope :not_completed, -> { where(complete: false) }

  def status_change
    self.complete == false ? self.complete = true : self.complete = false
  end

  def date_created 
    self.created_at.in_time_zone('Eastern Time (US & Canada)').strftime("%m/%d/%Y %I:%M%P %Z")
  end

  def date_updated
    self.updated_at.in_time_zone('Eastern Time (US & Canada)').strftime("%m/%d/%Y %I:%M%P %Z")
  end

end
