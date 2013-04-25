class CreateFavorites < ActiveRecord::Migration
  def change
    create_table :favorites do |t|
      t.references :user
      t.references :gist

      t.timestamps
    end
    add_index :favorites, :user_id
    add_index :favorites, :gist_id
    add_index :favorites, [:user_id, :gist_id], unique: true
  end
end
