Hexwar
======

Hexwar is a simple turn based, hexagon map, strategy game in the tradition of *Panzer
General*, [*Uniwar*](http://uniwar.com), and [Battle for Wesnoth](www.wesnoth.org).

It's backend is in Ruby on Rails, but most of game is written in pure javascript 
with jQuery. The graphics are taken from the excellent opensourced game 
[Battle for Wesnoth](http://svn.wesnoth.org/).

Setting Up Development Environment
----------------------------------

First, [install Ruby on Rails](http://guides.rubyonrails.org/getting_started.html)

Next, you'll want to rename `config/database.yml.example` to plain ole `database.yml`.
The dev settings in there should be fine.

You'll also need to create a [Facebook App](http://developers.facebook.com/).  Set
the address to *localhost*.  Rename `config/facebook.yml.example` and enter you apps
data here.

Finally, from within your project directory, run :

 *   `bundle install` This should install all the dependencies.
 *   `rake db:migrate` This will create the schema of the database.
 *   `rake db:seed` This will add some seed data (for units and tiles) to your database.
 *   `rails s` This will start your test server!

That should be all you need.  I'll _hopefully_ update these instructions soon as I try
it on a fresh VM or two.

