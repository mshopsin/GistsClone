class Gist < ActiveRecord::Base
  attr_accessible :title, :user_id
  belongs_to :user
  has_many :favorites
  has_many :favoriting_users, through: :favorites, source: :user
end
