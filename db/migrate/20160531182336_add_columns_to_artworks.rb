class AddColumnsToArtworks < ActiveRecord::Migration
  def change

     add_column :artworks, :height, :integer
     add_column :artworks, :width, :integer
     add_column :artworks, :dimension, :string
     add_column :artworks, :category, :string
     add_column :artworks, :blurb, :string
     add_column :artworks, :hometown, :string
     add_column :artworks, :birthday, :string
     add_column :artworks, :nationality, :string

  end
end
