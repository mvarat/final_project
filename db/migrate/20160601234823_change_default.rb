class ChangeDefault < ActiveRecord::Migration
  def change
   remove_column :collections, :is_private
  end
end
