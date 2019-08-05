class Project < ApplicationRecord
  has_many :user_projects
  has_many :users, through: :user_projects
  has_many :tasks
  accepts_nested_attributes_for :tasks, reject_if: proc { |attributes| attributes['content'].blank? }

  validates :name, :description, presence: true
  validates :user_ids, presence: { message: ": At least one team member must be selected" }
  validate :is_title_case 

  before_validation :make_title_case

  private
 
  def is_title_case
    if name.split.any?{|w|w[0].upcase != w[0]}
      errors.add(:name, " must be in title case")
    end
  end
 
  def make_title_case
    self.name = self.name.titlecase
  end
end
