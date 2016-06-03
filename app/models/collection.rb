class Collection < ActiveRecord::Base
    has_many :artworks, dependent: :destroy
    belongs_to :user
end
