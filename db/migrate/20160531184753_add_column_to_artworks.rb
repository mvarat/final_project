class AddColumnToArtworks < ActiveRecord::Migration
  def change
         add_column :artworks, :collection_id, :integer
  end
end
