class AddIndexes < ActiveRecord::Migration[5.1]
  def change
    add_index :queries, :user_id
  end
end
