class AddColumnToCollection < ActiveRecord::Migration
  def change
    add_column :collections, :default_image, :string, :default => "black"
  end
end
