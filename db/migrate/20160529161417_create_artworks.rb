class CreateArtworks < ActiveRecord::Migration
  def change
    create_table :artworks do |t|
      t.string :title, null: false
      t.string :artist, null: false
      t.integer :date
      t.string :url, null: false
      t.timestamps null: false
    end
  end
end
