class CreateTasks < ActiveRecord::Migration[5.2]
  def change
    create_table :tasks do |t|
      t.integer :project_id
      t.string :content
      t.boolean :complete, default: false

      t.timestamps
    end
  end
end
