class AddIsPrivateColumn < ActiveRecord::Migration
  def change
    add_column :collections, :is_private, :boolean, :default => false
  end
end
