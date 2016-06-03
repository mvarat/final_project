class AddColumnToCollections < ActiveRecord::Migration
  def change
    rename_column :collections, :name, :title
     add_column :collections, :description, :string
  end
end
