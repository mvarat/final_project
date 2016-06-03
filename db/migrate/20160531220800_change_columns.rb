class ChangeColumns < ActiveRecord::Migration
  def change
    remove_column :artworks, :artist
    remove_column :artworks, :date
    remove_column :artworks, :height
    remove_column :artworks, :width
    remove_column :artworks, :dimension
    remove_column :artworks, :category
    remove_column :artworks, :blurb
    remove_column :artworks, :hometown
    remove_column :artworks, :birthday
    remove_column :artworks, :nationality
  end
end
