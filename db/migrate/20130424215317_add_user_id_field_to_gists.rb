class AddUserIdFieldToGists < ActiveRecord::Migration
  def change
    add_column :gists, :user_id, :integer
    add_index :gists, :user_id
  end
end
