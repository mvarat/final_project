class AddForeignKeys < ActiveRecord::Migration
  def change

      add_foreign_key :collections, :users
      add_foreign_key :artworks, :collections
  end
end
