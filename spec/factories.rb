Factory.define :player do |f|
  f.name 'John Bon'
  f.provider 'facebook'
  f.sequence(:uid) { |n| "UID_#{n}" }
end