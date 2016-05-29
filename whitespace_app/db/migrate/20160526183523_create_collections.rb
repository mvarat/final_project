class CreateCollections < ActiveRecord::Migration
  def change
    create_table :collections do |t|

      t.string :name, null: false
      t.string :is_private, :default => false
      t.integer :user_id  
      t.timestamps null: false
    end
  end
end
