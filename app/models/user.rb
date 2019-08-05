class User < ApplicationRecord
  has_many :user_projects
  has_many :projects, through: :user_projects
  has_many :tasks, through: :projects

  devise :database_authenticatable, :registerable,
  :recoverable, :rememberable, :validatable, :omniauthable
  
  validates :name, presence: true
  validates :name, :email, uniqueness: true
  validates :name, length: {minimum: 3}
  validate :is_title_case 
 
  before_validation :make_title_case

  def self.from_omniauth(auth)
    where(provider: auth.provider, uid: auth.uid).first_or_create do |user|
      user.provider = auth.provider
      user.name = auth.info.name
      user.uid = auth.uid
      user.email = auth.info.email
      user.password = Devise.friendly_token[0,20]
    end
  end
  
  private
 
  def is_title_case
    if name.split.any?{|w|w[0].upcase != w[0]}
      errors.add(:name, "Name must be in title case")
    end
  end
 
  def make_title_case
    self.name = self.name.titlecase
  end 
end
