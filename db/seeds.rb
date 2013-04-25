# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

ActiveRecord::Base.transaction do
  User.create!(name: "hal");
  User.create!(name: "cat");
  User.create!(name: "dogy");
  Gist.create!(title:"Say Cyber Again", user_id: 1);
  Gist.create!(title:"Spark Capital will now pay their own legal bills", user_id: 2);
  Gist.create!(title:"Marketing Software, For People Who Would Rather Be Building It", user_id: 3);
end