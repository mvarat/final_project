class AddColumn < ActiveRecord::Migration
  def change
    add_column :artworks, :thumbnail, :string
  end
end
