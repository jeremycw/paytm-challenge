class User < ApplicationRecord
  has_secure_password
  validates :password, :length => { :minimum => 8 }
  validates_confirmation_of :password

  has_many :queries
end
