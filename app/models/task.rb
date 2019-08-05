class Task < ApplicationRecord
  belongs_to :project
  validates :content, presence: true

  scope :completed, -> { where(complete: true) }
  scope :not_completed, -> { where(complete: false) }

  def status_change
    self.complete == false ? self.complete = true : self.complete = false
  end
end
