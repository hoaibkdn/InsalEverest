class User < ApplicationRecord
  devise :database_authenticatable, :registerable, :recoverable, :rememberable, :trackable, :validatable

  belongs_to :role

  has_one :salary, dependent: :destroy

  validates :email, presence: true, format: {with: Settings.validations.email_regex}
  validates :name, presence: true, length: {maximum: Settings.validations.name.max_length}
  validates :password, presence: true
  validates :password_confirmation, presence: true, if: :password
end
